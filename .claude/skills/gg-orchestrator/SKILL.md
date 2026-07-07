---
name: gg-orchestrator
description: >-
  The operating playbook for ALL Guff's Gauntlet code work. Invoke FIRST for any change to
  play.html / sw.js / tests/ or any SPEC.md task — features, fix batches, balance, new enemy
  cards, UI, refactors. Covers: premise-check before building, risk triage, serialized-edit rules
  for the 2.5 MB play.html, jsdom driver authoring, multi-agent adversarial review (ready-to-run
  Workflow scripts in references/), the ship checklist (SW bump, idset, npm test, SPEC STATUS,
  memory), and the known-traps list. Not needed for pure questions or read-only exploration.
---

# gg-orchestrator — the per-task operating method for Guff's Gauntlet

This playbook is how Phases 0–49 were actually built. It is the **capability equalizer**: the
premise-check catches stale specs, independent adversarial review catches what the first pass
missed (every multi-lens review on this repo found 1–8 real bugs), and the ship checklist stops
silent breakage (SW version, removed ids, unmigrated saves). Whatever model is driving: **follow
the process; when in doubt, do more verification, not less.**

Supporting files (read on demand):
- `references/review-workflows.md` — copy-paste Workflow scripts (multi-lens adversarial review,
  investigation fan-out) + the single-agent review prompt for medium-risk work.
- `references/driver-template.md` — `tests/*.test.js` skeleton, jsdom harness API and gotchas,
  and the headless visual-check recipe.

## 0. Session start (once)

1. Read auto-memory (loaded automatically) and the top ~15 lines of `SPEC.md` (the STATUS block).
2. `git status` + `git log --oneline -5`. If the tree has changes you didn't make, leave them
   alone and never sweep them into your commits. Note unpushed commits before any push.
3. Confirm `npm test` was green recently (run it if you're about to build on top of the tree).

## 1. Intake & risk triage

- Locate the task in `SPEC.md` (STATUS row + its `# PHASE N` section). Net-new work gets a new
  phase section + STATUS rows FIRST — SPEC.md is the single source of truth for what/why.
- Check recorded decisions before asking anything: `### … decisions` blocks in SPEC.md and
  auto-memory. **Never silently reverse a recorded decision** — if the task requires it, flag it
  to the user and get confirmation (reversals do happen: P49.3 reversed P4.2/4.4, P49.10
  reversed P38 — but always explicitly).
- Ask open questions **inline, per sub-task, at build time** (user's standing preference — not
  batched upfront). Give a recommended default with each question.
- Classify risk — this sets review depth and how much planning to do first:

| Risk | The diff touches | Required review (step 6) |
|---|---|---|
| **HIGH** | combat math (`resolveAttack`/`aiBlocks`/`vaelAttackers`/`approveCombat`), undo/state-copy (`_hist`, `settleHistory`, clone/copy), save shape (`migrate`/`migrateProfiles`/`SAVE_V`), economy (gold, prices, wheel, loot), mode separation (`_uiMode`/`S.mode`/`p.camp`/`p.sand`), stack/counter logic, cross-cutting render or boot restructure | Multi-lens adversarial **Workflow** (3–5 lenses, per-finding verification) — script in `references/review-workflows.md` |
| **MEDIUM** | a new `applyRun`/`applyTarget` verb, AI decision functions, phase/turn flow, a11y/focus/Esc handling, service worker | Single fresh-context adversarial subagent (prompt template in references) |
| **LOW** | pure-data enemy cards reusing existing verbs, CSS/copy, prices within existing bands, log text | Self-review: re-read the full diff hunk-by-hunk against §9 Known traps |

## 2. Premise check — ALWAYS, before writing any code

SPEC.md and memory go stale. On this repo, tasks have been found **already built** (P42 sat
uncommitted in the tree; P30.7 shipped inside the P30 sweep), **mis-specced** ("imports already
store image" was false), or **in conflict with a decision**. So:

1. Re-grep the live `play.html` for every function/behavior the task description assumes
   (anchored patterns — `^\s*function name\(` — to dodge the ART blob; line numbers drift).
2. If cheap, confirm current behavior in jsdom: boot the harness, `window.eval` the state, call
   the function (see `references/driver-template.md`).
3. If the premise is wrong (already built / conflicts / spec stale): **stop and report before
   building.** Re-scope with the user if it changes the task.

## 3. Plan the diff

- Prefer **pure data**: a new enemy card should be data reusing existing `run:[…]`/`target:…`
  verbs. Add a new engine verb only when no existing verb fits.
- Reuse before writing: `applyRun`, `applyTarget`, `moveBoardCard`, `commonPermRow`, `mkPlay`,
  `fxItem`, `enemyBodyFromFX`, `migrate`. Grep for an existing helper before inventing one.
- List every function you will touch. For anything beyond ~3 functions, write the plan down
  (TodoWrite) before editing.
- Branch: `git checkout -b build/<task-id>` (e.g. `build/p49-6`). One branch per task.

## 4. Build rules (serialized)

- **Exactly one agent edits `play.html`.** Never fan out parallel edits to it — it is one 2.5 MB
  file and merge conflicts are unrecoverable. Subagents are for **read-only** work only:
  exploration, design alternatives, review, drafting test drivers.
- Navigate by grep, not remembered line numbers. Never Read/print a range spanning
  `const ART=` (~1.5 MB single line; re-grep `const ART=` for its current line first).
- Any change to save shape ⇒ extend `migrate()` (and `migrateProfiles()` for profile-level
  fields), bump `SAVE_V`, and make old saves load without throwing. Test with a legacy-shaped
  save object in your driver.
- Removing an element `id` breaks `idset.test.js`. If intentional: rebaseline with
  `node tests/idset.test.js --update` and say so explicitly in your report. Adds are free.
- New enemy "smarts" default-gate on `enemyLuck()>=0` so easy difficulty keeps legacy behavior
  (established pattern from P34).
- Difficulty/economy knobs live in `DIFF` / `WHEEL` / store item data — change data, not call sites.

## 5. Verify (offline, deterministic — no exceptions)

1. `npm test` from the repo root — the full suite must be green (jsdom devDep; `npm install`
   once). It includes the syntax gate (`vm.Script` compile), the id-set guard, and the
   sw-version drift guard.
2. **Add `tests/<task>.test.js`** — a real acceptance driver for the new behavior, following
   `references/driver-template.md`. Assert end-to-end behavior (state → action → state), not just
   "function exists". End with `process.exit(fail?1:0)`; `run.js` picks it up automatically.
3. The implicit criterion on EVERY task: the game still boots, starts a run, walks a full turn
   cycle, and wins/loses with **zero console errors** (`full-descent.test.js` and
   `modes-difficulties.test.js` cover this — keep them green).
4. Drivers must be deterministic: set state directly or stub RNG inside the window; never commit
   a driver that depends on raw enemy-run randomness (that class of test is excluded by design).
5. Visual/layout work: the headless recipe in `references/driver-template.md` (a raw headless
   screenshot of `play.html` never gets past the intro canvas — use the synthetic-harness trick
   or Playwright), or eyeball at `http://localhost:8000/play.html` via
   `python -m http.server 8000` (incognito to dodge a cached service worker).

## 6. Review (depth per the §1 triage — do not downgrade HIGH)

- **HIGH** → run the multi-lens adversarial Workflow from `references/review-workflows.md`.
  Announce to the user that you're launching it and roughly how many agents (N lenses + ~M
  verifiers). Fix CONFIRMED findings, re-run step 5, and list refuted findings with reasons in
  your report. Never "fix" a refuted claim.
- **MEDIUM** → one fresh-context adversarial subagent (read-only tools) with the refute-oriented
  prompt template in references. Same post-processing: fix confirmed, report refuted.
- **LOW** → self-review: re-read the complete diff hunk-by-hunk, check each §9 trap, run your
  driver twice.
- Escalation rule: if a fix fails `npm test` twice **for the same cause**, stop iterating blind —
  re-read the relevant engine section end-to-end, or run the investigation workflow to re-ground.

## 7. Ship checklist (in order, no skips)

1. `npm test` green (including your new driver).
2. Bump `sw.js` cache name `gg-cache-vNN` → `vNN+1` **and** the matching version line in
   `README.md` (`sw-version.test.js` guards the drift; without the bump, installed players never
   receive the build).
3. `npm test` again (cheap; catches the guard and any last edit).
4. Commit on the build branch (message style: `P49.8: short title — what changed`), then
   `git merge --no-ff build/<task-id>` into `main`, then push `origin main`.
   **Pushing `main` deploys the live site** (Cloudflare watches `main`). Never push red; never
   push someone else's uncommitted work.
5. Flip the task's `SPEC.md` STATUS row (and its per-phase header) to ✅ with a one-line summary.
6. Update auto-memory (`gg-build-progress`): what shipped, commit hash, review findings, anything
   the next session must know that the repo doesn't record.

## 8. Report & communication

- Lead with the outcome ("P49.6 shipped: … — npm test 37/37, review found 2, fixed 2"), then
  supporting detail. Complete sentences; no invented shorthand.
- Report failures faithfully: failing test names + output, what was skipped, what's deferred.
- **Stop and ask "continue?" at phase boundaries** unless the user pre-authorized a batch
  ("continue until the end"). Within an authorized batch, proceed task by task without asking.
- Budget: when the user mentions usage limits, order work small→large, defer mega-tasks to their
  own windows, and downgrade MEDIUM reviews to self-review only for genuinely contained tasks.
  Never downgrade HIGH.

## 9. Known traps (check your diff against every one)

1. **`index.html` is the SEO landing page, not the game.** The game is `play.html`.
2. **`S` is lexical** — in jsdom read it with `window.eval('S')`; engine functions (`render`,
   `fresh`, `resolveAttack`, …) ARE on `window`.
3. **`_uiMode` vs `S.mode`**: the menu/store browse `_uiMode`; the live battle uses `S.mode`.
   Menu/store/economy paths must take the mode parameter (`getGold(_uiMode)` bug class) — leaking
   live `S.mode` into menu code corrupts parked runs or the wrong purse.
4. **`_liveGame`** means a real run is in memory; `quitToMenu` clears it and cancels the autosave
   timer (parked ≠ live).
5. **Undo/autosave**: `settleHistory`/`scheduleSettle` snapshot `S`; `render()` clears
   `_renderBroke` on success so a mid-render crash never autosaves a half-mutated `S`. Don't
   bypass these.
6. **Saves must never throw on load**: every shape change goes through `migrate()` /
   `migrateProfiles()` + `SAVE_V` bump; `importSave` must migrate too (past HIGH bug).
7. **Enemy permanents**: real deck creatures are keyed `token:false` permanents that die to
   `S.gy` via `removeRef`; `token:true` spawns cease. Manual reanimation must produce real
   permanents (`enemyBodyFromFX`).
8. **Stack/counter rules**: a punisher-countered player spell stays ON the stack flagged
   `_awaitPunisher` (autosave-safe); resolve a pending responder FIRST (LIFO); countered player
   spells route to `S.myGy`. Enemy instants auto-cast (`_castEnemyInstant`, P49.3) but stay
   counterable; enemy walker abilities resolve inline off-stack (P49.10, enemy-only).
9. **Commander tax is real MTG** (user decision): `base + 2×(command-zone casts)`; hand casts
   untaxed; death/bounce/counter do NOT bump it.
10. **Passives expire on descend; the stash keeps consumables only** (user decision — do not
    widen the stash filter).
11. **Esc must not close progression-gating overlays** (`S.paused||S.over` cutscenes, the combat
    resolver) — buttons only, or the run strands.
12. **Reduced motion**: `html.motion-*` classes override the OS media query both ways; damage
    numbers must stay communicative at every level.
13. **Economy bands**: heal ≈ gold/HP and damage ≈ gold/dmg curves exist (P42/P49.5); price or
    reward changes outside the bands are HIGH risk, not cosmetic.
14. **Wardens**: Grakk (R aggro, 34-land exception, owns the Siege), Murglax (B, graveyard),
    Vael (R/B, the walker-commander "Vael, the Ember Tyrant"; his PW is "Ash the Guardian";
    reborn second life is intentional).

## 10. Multi-agent quick reference

- **Workflow tool** = deterministic fan-out. This skill's instruction to run the review /
  investigation workflows for HIGH-risk diffs constitutes the opt-in for those runs; still
  announce each launch and its rough agent count. Scripts: `references/review-workflows.md`.
- **Agent tool**: `Explore` subagents for parallel read-only grounding of a big task; `Plan` for
  architecture options; `general-purpose` for drafting a test driver. Run independent subagents
  in one message so they parallelize. Never give a subagent write access to `play.html` while you
  hold it.
- **Serialize the file, parallelize the thinking**: design, review, investigation fan out;
  `play.html` edits never do.
