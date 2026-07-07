# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Guff's Gauntlet is a **solo Magic: The Gathering Commander game** shipped as a single-file,
installable **Progressive Web App**. You bring your own deck; the app plays a themed AI warden
and does all the rules bookkeeping for both sides. It is deployed at `guffsgauntlet.com`
(Netlify, continuous deploy from `main`).

The entire game — engine, UI, art, and fonts — lives in **`play.html`**. Everything else exists
only to make it installable, offline-capable, deployable, and testable.

## ⚠ Critical facts before you edit

- **`play.html` is the game.** `index.html` is a separate, tiny **SEO/marketing landing page** —
  do NOT edit it for gameplay. (The game moved `index.html`→`play.html`; some in-file comments and
  `tests/README.md` still say "index.html" but they read `play.html`.)
- **`play.html` contains a ~1.5 MB single-line base64 blob** (`const ART=…` near line 695) plus
  inlined woff2 fonts as data-URIs in the CSS. **Never Read or print a line range that spans the ART
  blob.** Re-grep `const ART=` to confirm its line before trusting any number. Real JS runs from the
  `<script>` (~line 694) to the end.
- **Line numbers drift constantly** as code is inserted. Always re-grep for a function name rather
  than trusting a remembered line number. Grepping raw function-definition patterns will match inside
  the ART blob — use the `Grep` tool with anchored patterns (`^\s*function name\(`) or filter out long
  lines.
- **Every shipped change must bump the service-worker cache name** in `sw.js` (`gg-cache-vNN` →
  `vNN+1`) **and** the matching version line in `README.md`. The `sw-version` test fails if they
  drift. Without the bump, installed players never receive the new build.

## Commands

```
npm install          # jsdom (dev-only; node_modules is git-ignored)
npm test             # the full offline regression suite (tests/run.js)
node tests/<name>.test.js          # run a single driver directly
node tests/harness.js              # boot + turn-cycle + undo + autosave smoke test
node tests/idset.test.js --update  # rebaseline the element-id snapshot (only when intentionally removing an id)
```

`npm test` runs entirely **offline** and is deterministic. It boots the real `play.html` in jsdom,
drives turn cycles / full descents, and asserts per-system behaviour. The flaky-RNG enemy-run driver
is excluded by design.

**Local play/visual check:** `python3 -m http.server 8000` from the repo root, open
`http://localhost:8000/play.html` (incognito to dodge a cached service worker). A raw headless
screenshot of the boot never reaches the menu (the intro canvas loops), so board-level visual checks
need Playwright or a synthetic harness that skips `beginIntro()`.

## Architecture

**One IIFE-scoped `<script>`.** The engine is plain lexical JavaScript in a single script block. The
central mutable state object is **`S`** (declared `let S;`, populated by `fresh()`). `S` is **lexical,
not a `window` property** — in tests read it with `window.eval('S')`; engine functions like `render`,
`fresh`, `advancePhase` ARE on `window`.

Key structures and flow:

- **`S`** — the whole live game: life totals, mana, the stack (`S.plays`), both boards (`S.tokens`,
  `S.enemyArtifacts`, `S.enemyEnchants`, `S.enemyWalkers`, …), command zone (`S.cmd`), combat
  (`S.combat`), difficulty, mode, level/room index, and UI toggles (`S.ui`).
- **Turn/phase model** — `const PHASES=["untap","upkeep","draw","main1","combat","main2","end"]`.
  `beginVaelTurn()`/`beginYourTurn()` start a side's turn; `advancePhase()`→`enterPhase()` walk the
  phases; `vaelMain()` is the enemy AI's main-phase brain.
- **Card/effect engine** — enemy cards are data with `run:[…]` (resolved by `applyRun`) and
  `target:…` (resolved by `applyTarget`) verbs; these are the colour-agnostic mechanics library.
  Adding a new enemy card is ideally pure data reusing existing verbs.
- **Combat** — `resolveAttack(attackers, assign)` is a two-step first-strike model;
  `approveCombat()` applies the player's block/target choices; `aiBlocks`/`vaelAttackers` are the
  enemy combat AI.
- **Persistence** — `DB` (all profiles) ↔ `localStorage`; per-profile **and** per-mode economy
  buckets (`p.camp` / `p.sand`). Saves carry `SAVE_V`; `migrate(s)` upgrades old save-state and
  `migrateProfiles()` upgrades old profiles, so older saves never throw. **`_liveGame`** = a real run
  is in memory; **`_uiMode`** = which mode the menu/store is browsing (deliberately decoupled from the
  live game's `S.mode` so a menu peek can't corrupt a parked run).
- **Undo/history** — `_hist`/`_committed` + `settleHistory()`/`scheduleSettle()` snapshot `S` after
  each settled action; `render()` clears `_renderBroke` on success so a mid-render crash never
  autosaves a half-mutated `S`.
- **Content data** — `DUNGEON` (rooms), `LEVELS` (registry), `DIFF` (easy/standard/brutal), the three
  wardens (Grakk / Murglax / Vael), `WHEEL`/store items/loot tables. `ART` maps keys → base64 images.
- **Boot sequence** (end of script): `loadDB(); … loadSettings(); fresh(); … buildTabs(); …
  beginIntro();` then SW registration.

## Development workflow (SPEC-driven)

`SPEC.md` is the authoritative living build spec; its **STATUS table** at the top tracks per-task
progress. Work proceeds **phase by phase, top to bottom**. The established per-task loop:

1. Implement the change in `play.html`.
2. **Syntax gate** — the suite's `syntax.test.js` `vm.Script`-compiles the inline script.
3. **jsdom acceptance test** — add a `tests/<feature>.test.js` (don't rebuild the harness; follow an
   existing driver, e.g. `p45-*.test.js` for UI/CSS asserts, `full-descent.test.js` for a whole run).
   End with `process.exit(fail?1:0)` so `run.js` picks it up.
4. **id-set guard** — `idset.test.js` fails if any element `id` is removed vs `tests/ids.snapshot.txt`
   (adds are fine).
5. Adversarial review for risky changes (combat, state-copy, core-stat math); self-review for
   contained data/UI tasks.
6. Bump `sw.js` cache version + `README.md` version line.
7. `npm test` green, then commit.

**Implicit acceptance criterion on every task:** the game must still boot, start a run, walk a full
turn cycle, and win/lose without a console error.

## Deploy

Static site, no build step — Netlify publishes the repo root (`netlify.toml`). Once the one-time
Import-from-Git connection exists, **every push to `main` redeploys the same site automatically**.
`sw.js`, `index.html`, and `play.html` are served `no-cache` so version bumps reach installed apps.
`.assetsignore` keeps dev files (tests, node_modules, `*.md`) out of the uploaded site.
