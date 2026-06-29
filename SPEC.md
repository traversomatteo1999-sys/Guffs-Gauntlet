# Guff's Gauntlet — Build Spec & Progress Tracker

> Living document. Work **phase by phase, top to bottom**. After every task the game must still
> boot, start a run, walk a full turn cycle, and win/lose without a console error — that is the
> implicit acceptance criterion on *every* task. Update the **STATUS** block below as work lands.

---

## STATUS (update as you go)

- **Branch:** `main` (== `origin/main`; latest built `025fe9d`). *(Active feature branch: `satchel-lock-commander-scryfall`, also at `025fe9d`.)* **Phases 14 & 15 specced 2026-06-29 (PLANNED, not built).**
- **Canonical file:** `index.html` (the deployed PWA build; line 456 is a ~1.3 MB base64 `ART` blob — never open that line; real JS is 457→end). `guffs-gauntlet-level1.html` is a stale pre-embed copy — ignore it.
- **Verification harness:** headless engine smoke test (Node + DOM shim) drives boot→turn-cycle→undo→save; syntax gate via `node -e` + `vm.Script` over the `<script>` body; **id-set diff** (`grep -oE 'id="[^"]+"'` before/after) after any DOM restructure — nothing may be removed. For visual phases, review live at `http://localhost:8000/` (`python -m http.server 8000` from the repo; incognito to dodge a cached service worker).

| Phase | State |
|---|---|
| **Phase 0 — Foundations** (undo, save/continue, schema, logging) | ✅ **DONE** + committed + reviewed |
| **Phase 1 — UI restructure** | ✅ **DONE** |
| &nbsp;&nbsp;P1.1 four cornice tabs + satchel popup | ✅ **DONE** (disposition locked, see §3b) |
| &nbsp;&nbsp;P1.2 background covers viewport | ✅ **DONE** (user-confirmed) |
| &nbsp;&nbsp;P1.3 kill white image edge | ✅ **DONE** (user-confirmed) |
| &nbsp;&nbsp;P1.4 cinematic intro + menu drop | ✅ **DONE** (user-confirmed) |
| &nbsp;&nbsp;P1.5 victory/defeat/cleared popups | ✅ **DONE** |
| &nbsp;&nbsp;P1.6 parchment log restyle | ✅ **DONE** |
| &nbsp;&nbsp;P1.7 player commander box mirrors enemy | ✅ **DONE** |
| &nbsp;&nbsp;P1.8 ⓘ info popups | ✅ **DONE** |
| &nbsp;&nbsp;P1.9 noise reduction / hierarchy pass | ✅ **DONE** |
| &nbsp;&nbsp;**P1.10 Stack-as-popup** (NEW) | ✅ **DONE** |
| **Phase 2 — Card creation & library UX** | ✅ **DONE** |
| &nbsp;&nbsp;P2.1 type-first card creator | ✅ **DONE** |
| &nbsp;&nbsp;P2.2 colours via mana-symbol pills | ✅ **DONE** |
| &nbsp;&nbsp;P2.3 prominent gold AI-threat control | ✅ **DONE** |
| &nbsp;&nbsp;P2.4 quick-cast | ✅ **DONE** |
| &nbsp;&nbsp;P2.5 library + picker search | ✅ **DONE** |
| &nbsp;&nbsp;P2.6 reset card to original | ✅ **DONE** |
| &nbsp;&nbsp;P2.7 planeswalkers legendary by default | ✅ **DONE** |
| **Phase 3 — Commander & emblems** | ✅ **DONE** |
| &nbsp;&nbsp;P3.1 commander = saved-as-commander + trap rewrite | ✅ **DONE** |
| &nbsp;&nbsp;P3.2 enemy emblems | ✅ **DONE** |
| &nbsp;&nbsp;P3.3 player-commander fixes (walker parity · blue board · zone routing) | ✅ **DONE** |
| **Phase 4 — Stack & turn-phase engine** | ✅ **DONE** (P4.1–P4.4) |
| &nbsp;&nbsp;P4.1 Resolve clears the stack without skipping a phase | ✅ **DONE** |
| &nbsp;&nbsp;P4.2 Enemy proposes a visible stack response per player cast | ✅ **DONE** (flow now, smart selection deferred to P6) |
| &nbsp;&nbsp;P4.3 Soft phase gating + ◂ back-a-phase | ✅ **DONE** (light gating) |
| &nbsp;&nbsp;P4.4 Enemy casts instants at instant speed in any phase (event-hooked) | ✅ **DONE (v1)** — window proposals; mid-resolver hook deferred |
| **Phase 5 — Enemy mana & deck rework** | ✅ **DONE** *(balance estimates pending playtest)* |
| &nbsp;&nbsp;P5.1 Enemy colours · freeze-mana · `usableMana()` accessor | ✅ **DONE** |
| &nbsp;&nbsp;P5.2 Enemies as real Commander decks (land-driven mana, singleton, archetypes) | ✅ mana · 3 decks @99 · deck-out · AI logic · blind balance pass *(playtest to validate)* |
| **Phase 6 — AI intelligence & balance** | ✅ **DONE** |
| &nbsp;&nbsp;P6.1 Threat hierarchy drives assessment (generalized `threatScore`) | ✅ **DONE** |
| &nbsp;&nbsp;P6.2 AI thinks before casting (`wouldDoSomething`, value selection, act/hold) | ✅ **DONE** |
| &nbsp;&nbsp;P6.3 Respect haste + EV-positive attacking | ✅ **DONE** |
| &nbsp;&nbsp;P6.4 Difficulty = strategic + luck knobs | ✅ **DONE** |
| &nbsp;&nbsp;P6.5 Inspect enemy cards → play them | ✅ **DONE** |
| **Phase 7 — Tokens, battles, sounds, satchel, logging, polish** | ✅ **DONE** |
| &nbsp;&nbsp;P7.1 Tokens cease to exist on death + until-EOT expiry | ✅ **DONE** |
| &nbsp;&nbsp;P7.2 Spell-card vs spawned-token logging | ✅ **DONE** |
| &nbsp;&nbsp;P7.3 One-click select-all attackers | ✅ **DONE** |
| &nbsp;&nbsp;P7.4 Satchel duration counter (lasts N descents) | ✅ **DONE** |
| &nbsp;&nbsp;P7.5 Zones UI clarity (counts · cost/colour · play-from-zone) | ✅ **DONE** |
| &nbsp;&nbsp;P7.6 Instructions rewrite + villain names hidden until earned | ✅ **DONE** |
| &nbsp;&nbsp;P7.7 Battles + planar die + Vael's Siege | ✅ **DONE** |
| &nbsp;&nbsp;P7.8 Synthesized WebAudio SFX + persisted mute | ✅ **DONE** |
| &nbsp;&nbsp;P7.9 Final polish (per-type accents · dead-code · review) | ✅ **DONE** |
| **Phase 8 — Real MTG card import (Scryfall)** | 🔨 **built & verified** on branch `phase-8-card-import` (search+decklist+launcher rework); live-online smoke + P9.5 doc overhaul pending |
| &nbsp;&nbsp;P8.1 Scryfall service layer + descriptive mapper (+DFC faces) | ✅ **built & verified in `index.html`** (`SCRY` IIFE · `sfFetch/Search/Autocomplete/Collection` · offline gating · `sw.js` v43); live online smoke pending (manual) |
| &nbsp;&nbsp;P8.2 Effect-inference layer (AI bits + on-cast effects) | ✅ **built & verified** (`inferEffects` · `buildImportedCard` · inline review chips in result rows) |
| &nbsp;&nbsp;P8.3 ✦ Cast a spell = combined launcher (retire ⚡ Quick Cast) | ✅ **done** — all 3 board ✦ Cast buttons → `openCardSearch`; ⚡ Quick Cast retired (functions + buttons deleted) |
| &nbsp;&nbsp;P8.4 ✎ Create a card (homebrew creator, Library-homed) | ✅ **done** — creator relabeled **✎ Create a card** in the Library + reachable from the launcher's "can't find it?" link *(creator's now-redundant From-library row left as minor cleanup → P9.5)* |
| &nbsp;&nbsp;P8.5 Decklist paste-import (bulk, vendor-neutral) | ✅ **built & verified** (📋 Paste-a-decklist mode in the launcher; resolve → review → add-all; lands skipped+counted) |
| **Phase 9 — Player toolbox + instruction overhaul** | ✅ **DONE & verified** (branch `phase-9-toolbox`, P9.1–P9.5; adversarially reviewed) |
| &nbsp;&nbsp;P9.1 Universal move-to-zone engine (incl. return-to-hand) | ✅ **done & verified** — board→zone (↩ return-to-hand · tuck · clean exile/graveyard) **+** zone-card moves (**player-exile dead-end fixed**, reanimate, bounce/tuck-from-zone), both boards, death-safe *(direct enemy gy→battlefield still uses the existing ▸ play; one-off fn refactor deferred)* |
| &nbsp;&nbsp;P9.2 Change control (steal / give) | ✅ **done & verified** — `takeControl`/`giveControl` move a creature across boards (stats/keywords intact, ⇄ controlled badge, round-trips); ⇄ take on enemy cards, ⇄ give in the player creature drawer |
| &nbsp;&nbsp;P9.3 Per-permanent extras (copy · flip · markers · direct dmg) | ✅ **done & verified** — `copyPermanent` (token clone) · status markers (goad/monarch/initiative/can't-block/day/night) · `dealDmg` (⚔ deathtouch/lethal-aware) · `flipPermanent` for DFCs (`_faces` carried import→board) |
| &nbsp;&nbsp;P9.4 Enemy hand &amp; library completeness (tutor / reanimate / draw) | ✅ **done & verified** — `dtMoveObj` (a card from any enemy zone → hand/library/gy/exile, or a creature → battlefield via spawn) · `dtRevealMove` (👁 look / 🤚 hand-reveal now actionable) · `dtDraw` (🃏 enemy draws N); disclaimer updated |
| &nbsp;&nbsp;P9.5 Instruction overhaul (LAST — documents Phase 8 + 9) | ✅ **done** — tutorial rewritten for Phase 8 (launcher/search/decklist/Create-a-card) + Phase 9 (new 🔀 Moving-cards section: move-to-zone/return-to-hand · control · copy · flip · markers · damage · tutor/reanimate/draw); no stale Quick Cast ref *(deferred cosmetic: remove the creator's redundant From-library row)* |
| **Phase 10 — Enemy retune & loot/store rebalance** | ✅ **DONE** + committed (`acd6a7c`/`42efed6`) — explicit per-difficulty boss HP (hpMult retired) · loot heal-floor + cool tier · Brutal-luck loot nudge · 2 new boons (Pyre Charge · Spellbreaker Sigil) · store restock (ember/scholar/pyre/breaker) |
| **Post-P10 build — Satchel-lock · Scryfall commander · enemy abilities/artifacts** | ✅ **DONE** + committed (`afbffe4`/`6bdc57a`/`9f829f8`) — Merchant locked mid-descent + pending-purchase bucket applied at next descent · Scryfall commander search · cmdBuff permanent-target fix + ⚜ enemy Abilities popup · enemy **artifacts/enchantments/emblems** on the board (⚡ auto-on-upkeep + ⚠ red box for effects that hit you) |
| **Phase 11 — Chapter I: Story foundation (L1 re-lore)** | ✅ **DONE** + committed/merged (`0063a2e`) — Arrival cutscene · Vael **death→escape** (3-beat `win()` chain) · Guff-freed · L2-bridge epilogue · 📖 Lore-page · framing copy + new `shroud` keyword. **Text-only deck/stat-wise.** Built, verified & merged; see Phase 11 below |
| **Phase 12 — UI & card-mechanic upgrades** | ✅ **DONE & verified** — collapsible panels · combat block-restrictions · enter-as-a-copy clone. See Phase 12 below |
| &nbsp;&nbsp;P12.1 Collapsible boxes inside tabs | ✅ **DONE & verified** (per-panel `.collapsed`; `S.ui.panels`; `applyPanels`/`togglePanel`; first-box-open defaults; migrate backfill; jsdom 12-check pass) |
| &nbsp;&nbsp;P12.2 Block-restriction infrastructure + mechanic audit | ✅ **DONE & verified** (`block:{min,max}` + `minBlockers`/`maxBlockers`; menace folded in; `combatAdd` max-cap + `approveCombat` min/lure gates; `aiBlocks` honors min/max + lure-aware; Scryfall auto-parse → `props.block`; haste+can't-attack in KW_LIST & enforced; round-trips. 17-check jsdom + 3-agent adversarial review, 7 findings fixed) |
| &nbsp;&nbsp;P12.3 Enter-as-a-copy (clone) with on-board picker | ✅ **DONE & verified** (`props.clone` toggle → `openClonePicker`→`cloneInto`; lists your+enemy permanents; non-token copy, reset state, anthem-kw stripped; legendary gating via "copy won't be legendary"; empty-board fallback; deferred-resolve recoverable. 20-check jsdom + 3-agent review, 2 findings fixed) |
| **Phase 13 — Symmetric enemy board: full enemy-card editing + first-class artifacts/enchantments + deeper automation** | ✅ **DONE & verified** — owner-agnostic editing (P13.1) · fuller automation (P13.2) · first-class enemy artifacts/enchants (P13.3). See Phase 13 below |
| &nbsp;&nbsp;P13.1 Edit enemy permanents & stack spells (owner-agnostic editor) | ✅ **DONE & verified** (owner-agnostic `setObjF`/`setObjBlock`; enemy drawer reaches parity — blocked-by/abilities/dies/threat (kw·counters·markers already existed); stack editor `editStackItem`/`stackEditor` — kw·P/T·can't-be-countered·note before resolution, edits flow to the board on resolve; `counterPlay` now honors can't-be-countered; `_edit` stripped from undo. 16-check jsdom + Phase-12 regression) |
| &nbsp;&nbsp;P13.2 Fuller enemy artifact/enchantment automation (static auras · more triggers · manual-reminder fallback) | ✅ **DONE & verified** (trigger windows upkeep/endStep/yourUpkeep via `fireEnemyEmblems(window)`; continuous static buffs via `_stp`/`_stt` in effP/effT recomputed by `applyStaticEmblems`; attach-to-creature auras that go inert on host death; spawnToken/enemyScry autos; ⚠ manual badge; migrate backfill. 16-check jsdom + 2-agent review, 4 findings fixed) |
| &nbsp;&nbsp;P13.3 Enemy artifacts/enchantments as first-class board permanents (symmetric enemy board) | ✅ **DONE & verified** (`S.enemyArtifacts`/`S.enemyEnchants` real permanents; scopes `eart`/`eench` in getObj/_boardArr/_detachBoard/moveBoardById; toolbox ↩ bounce/✖ destroy(dies-aware)/⊘ exile/⧉ copy/⇄ take-control/✎ edit; cast-to-stack via ⊕; automation rides on them; destroyed perms preserved in-zone + reanimatable via dtMoveObj; migrate converts emblem artifact/enchant entries; enterRoom clears them. 22-check jsdom + 3-agent review, 4 findings fixed) |
| **Phase 14 — Fixes & QoL: combat-damage prevention · bulk tools · enemy-card normalization** | ✅ **DONE & verified** — P14.1–P14.9 built, reviewed & pushed (cmd-name · Fog Bank · enchant-normalization · bulk counters · 1-descent items · return-all-to-hand · library browser · emblem-only adder · stack-response fix). **P14.10 (enemy mana=lands-only) is superseded by P17.1 — built in Phase 17.** See Phase 14 below |
| &nbsp;&nbsp;P14.1 Enemy commander name in attackers popup (bug) | ✅ **DONE & verified** (`cnm(c)=c.name\|\|c.n` accessor used across renderCombat/predictCombat/approveCombat/vaelCombat; 6-check jsdom) |
| &nbsp;&nbsp;P14.2 Prevent combat damage dealt by/to any creature (Fog Bank) | ✅ **DONE & verified** (markers `deals no combat dmg` / `prevents combat dmg to it` + `hasMarker`; gated in `resolveAttack` — out=0, blocker-not-killed but trample still assigns, strike-back/deathtouch/lifelink zeroed, attacker can't die; both boards; preview mirrors via predictCombat→resolveAttack. 11-check jsdom) |
| &nbsp;&nbsp;P14.3 Enchantments as normal permanents + enemy special-ability audit (Resurgence) | ✅ **DONE & verified** (`_enemyCardToPerm` routes enemy enchant/artifact CARDS → real permanents on resolve, mapping rule→youLose/yourUpkeep + bossrule→enemyGain automation; ramp still ramps + a body; special runs like bloodpact keep S.rules; Resurgence guard audited. 12-check jsdom + 2-agent review, 2 cosmetic findings fixed) |
| &nbsp;&nbsp;P14.4 Bulk counters (give counters/types to many cards at once) | ✅ **DONE & verified** (`bulkCtr` over yours/enemy/all-creatures/all-permanents; +1/+1, −1/−1, or custom ×N into `other`; Tools-panel row; one summary log. 6-check jsdom) |
| &nbsp;&nbsp;P14.5 Item duration fixed at 1 descent (no player-set reminders/duration) | ✅ **DONE & verified** (durRow stepper → read-only "⏳ lasts 1 descent"; `invDuration` retired; `grantBoon`/`applyPendingPurchases` force `descents=1`; `migrate` clamps; `carryInvForward`→`[]`. 8-check jsdom. Resolves P7.4 open Q) |
| &nbsp;&nbsp;P14.6 Return all board / all creatures to hand (tokens deleted) | ✅ **DONE & verified** (`returnAllToHand(scope,what)` reuses `moveBoardCard` with a new `quiet` flag → one summary log + one undo step; tokens cease, commanders stay, enemy cards→`S.hand`, NON-death no Pit's Tithe; Tools-panel row. 8-check jsdom + move regression) |
| &nbsp;&nbsp;P14.7 Browse enemy library, searchable by card type | ✅ **DONE & verified** (`_dt.mode='browse'` + `_dt.typeFilter`; lists all `S.lib` with per-type filter+counts; move actions by REAL `S.lib` index via `dtBrowseMove`; ▸ board for creatures only; 🔀 shuffle-on-exit `dtBrowseExit`. 9-check jsdom) |
| &nbsp;&nbsp;P14.8 Emblems addable by either side; artifacts/enchants are enemy-cast (adder = emblems only) | ✅ **DONE & verified** (`#embKind` selector removed; `addEnemyEmblem` always `kind='emblem'`; ⊕-to-stack + dead `_enemyPerm` path retired; enemy artifacts/enchants come from deck casts → P14.3. Paired with P14.3) |
| &nbsp;&nbsp;P14.9 Enemy reliably proposes a stack response (bug) | ✅ **DONE & verified** (`buildEnemyCandidates` scores with `castValue` not `bestTargetThreat` so non-targeted burn/heal get real value; gate relaxed to only HOLD a weak *targeted* removal, always offer a do-something non-targeted response; no fizzles; window path safe. 5-check jsdom) |
| &nbsp;&nbsp;P14.10 Enemy mana = lands only; de-duplicate mana code | ⤴ **SUPERSEDED by P17.1** — built in Phase 17 (enemy engine overhaul) |
| **Phase 15 — Economy, rewards & difficulty balance** | ⬜ **PLANNED** — end-of-level gold wheel-spin · store/loot overhaul (fix Tonic of Vigor dup · +legendary rarity · item variety · gold tuning) · persist unused satchel items across runs · difficulty-scaled heal on descend. See Phase 15 below |
| &nbsp;&nbsp;P15.1 End-of-level gold wheel-spin (%/double/rare-legendary item) | ⬜ planned |
| &nbsp;&nbsp;P15.2 Store & loot overhaul (Tonic fix · legendary tier · variety · gold tuning) | ⬜ planned |
| &nbsp;&nbsp;P15.3 Persist unused satchel items across runs (profile stash) | ⬜ planned |
| &nbsp;&nbsp;P15.4 Difficulty-scaled healing on descend | ✅ **DONE & verified** (`DESCENT_HEAL` table: easy ½ missing <70%, std ⅓ <50%, brutal ¼ <25%; in `advance()` after `enterRoom`, strict `<`, floor, capped; only on room transitions. 9-check jsdom) |
| **Phase 16 — Token variety (treasure/blood/utility · enemy tokens · enemy uses them) + between-boss life reset to 40** | ⬜ **PLANNED** — enemy can be given tokens (creatures share the player's token library) · resource tokens (Treasure · Blood · Clue · Food) for both sides, with expiry · enemy actively sacrifices Treasure for mana · descending past a boss resettles life >40 back to 40 (spent magic, not damage). See Phase 16 below |
| &nbsp;&nbsp;P16.1 Deploy tokens to the enemy board (creatures share the player's token library) | ⬜ planned |
| &nbsp;&nbsp;P16.2 Resource-token types — Treasure · Blood · Clue · Food (both sides, with expiry) | ⬜ planned |
| &nbsp;&nbsp;P16.3 Enemy actively uses its tokens (sacrifices Treasure for mana; temporary tokens expire) | ⬜ planned |
| &nbsp;&nbsp;P16.4 Between-boss life reset: life above 40 resettles to 40 on descend (spent magic, not damage) | ⬜ planned |
| &nbsp;&nbsp;P16.5 Info/instructions for the new token + life-reset rules | ⬜ planned |
| **Phase 17 — Enemy engine overhaul: lands-only mana · opening hand & mulligan · max-hand discard · attack-tax targeting · draw-N** | ⬜ **PLANNED** — enemy starts with **0** mana, no scrounge floor, mana only from played lands (finalizes P14.10) · shuffle + draw a **7-card** opening hand, mulligan (reshuffle/redraw) while fewer than 3 lands · max hand size **7**, discard wisely at end of turn unless "no maximum hand size" · manual "enemy draws N" control · attack-tax **target selector** (player / planeswalkers / both) + **enemy-side** attack tax (Propaganda/Ghostly Prison/Oathkeeper the enemy controls). See Phase 17 below |
| &nbsp;&nbsp;P17.1 Enemy mana strictly from played lands — remove opening pre-seed + scrounge floor (finalizes P14.10) | ⬜ planned |
| &nbsp;&nbsp;P17.2 Shuffle + 7-card opening hand + mulligan while &lt;3 lands | ⬜ planned |
| &nbsp;&nbsp;P17.3 Max hand size 7 — discard-to-7 wisely at end of turn (unless "no maximum hand size") | ⬜ planned |
| &nbsp;&nbsp;P17.4 Manual "enemy draws N cards" control | ⬜ planned |
| &nbsp;&nbsp;P17.5 Attack-tax target selector (player/walkers/both) + enemy-side attack tax | ⬜ planned |
| **Phase 18 — Combat correctness: menace enforcement + keyword automation audit** | ⬜ **PLANNED** — **⚠ CONFIRMED BUG: enemy menace creatures are blockable by ONE** (works for player creatures — asymmetry). Fix `minBlockers` short-circuit + enemy-keyword carry, then audit deathtouch · lifelink · trample · first/double strike · vigilance · indestructible · protection so they auto-resolve identically for **player and enemy**, both directions. See Phase 18 below |
| &nbsp;&nbsp;P18.0 Diagnostic FIRST — pin the exact cause of the enemy-menace bug + capture regression tests (both directions) | ⬜ planned |
| &nbsp;&nbsp;P18.1 Fix menace: blockable only by 2+, counts as blocked only when ≥2 (enemy + player) — `minBlockers` short-circuit + keyword carry | ⬜ planned |
| &nbsp;&nbsp;P18.2 Combat keyword automation audit (deathtouch · lifelink · trample · strikes · vigilance · indestructible · protection) | ⬜ planned |
| **Phase 19 — Symmetric enemy counters: poison · commander damage · energy · experience** | ⬜ **PLANNED** — the enemy tracks the same counters the player does (today `S.counters` is player-only): poison (10 = enemy dies), commander damage (your commander dealing 21 = enemy dies), energy, experience — with adjusters, render, win-condition wiring, and auto-accrual of your commander's combat damage to the enemy. See Phase 19 below |
| &nbsp;&nbsp;P19.1 Enemy counter state + Tools-panel UI/adjusters/render (poison/10 · cmd-dmg/21 · energy · exp) | ⬜ planned |
| &nbsp;&nbsp;P19.2 Win-condition wiring + auto-accrual (enemy poison 10 / your cmd-dmg 21 → boss falls; commander combat dmg accrues) | ⬜ planned |
| **Phase 20 — Combat-count restrictions: blockable-by-N (creatures, both sides) · attackable-by-N (planeswalkers) · enemy max-blockers box** | ⬜ **PLANNED** — per-creature "blockable only by N" on the unified drawer (player + enemy; the existing `block:{min,max}`, surfaced/confirmed) · per-planeswalker "attackable only by N" cap on how many creatures may attack it · a "max blockers" box in the enemy box, mirroring the existing "max attackers". See Phase 20 below |
| &nbsp;&nbsp;P20.1 Creatures: "blockable only by N" (min/max) on the unified player+enemy drawer | ⬜ planned |
| &nbsp;&nbsp;P20.2 Planeswalkers: "attackable only by N" — cap attackers assignable to a walker (player + enemy) | ⬜ planned |
| &nbsp;&nbsp;P20.3 Enemy "max blockers" box mirroring "max attackers" (global cap on enemy blockers) | ⬜ planned |

---

## 1. Engineering principles (apply to every task)

1. **No spaghetti.** Each behaviour in one named function with one responsibility; shared logic gets extracted into a helper, not copy-pasted.
2. **Single state object.** `S` holds all per-game state and must stay **JSON-serialisable** (no functions/DOM/circular refs) — save & undo depend on it. Cross-run data lives on `DB`.
3. **Render is a pure projection of state.** `render()` reads `S` and rebuilds the DOM. Never store gameplay truth in the DOM. New UI = new state field + new render branch.
4. **Mutate, then render once.** A user action mutates `S` and calls `render()` exactly once at the end.
5. **Log every state change a player can't see for themselves** (life, mana, board, zones, loyalty, counters, stack). Silent mutations are bugs.
6. **Dead code goes** in the same task that replaces a mechanism.
7. **Mobile is first-class.** New controls ≥36px touch target, legible at 380px, no horizontal scroll.
8. **Degrade gracefully.** Wrap `localStorage`, `URL.createObjectURL`, audio, etc. in try/catch.

---

## 2. Architecture primer (CURRENT — re-grep function names; line numbers drift)

- **File layout:** 1–17 head/PWA meta · 18–~235 CSS (tokens at `:root`; `.tab` cornice styles; touch/responsive at the bottom) · ~227–~460 HTML body · `<script>` from ~455; **line 456 = base64 `ART` blob**; real JS 457→end.
- **State `S`** (declared ~543, built in `fresh()`): `diff, youLife/youMax, roomIndex, boss, cmd` (enemy commander, has `baseP/baseT`), `tokens` (enemy board, each `baseP/baseT/expires`), `rules`, `pw` (enemy walker), `my:{creatures,artifacts,enchants,walkers,emblems}` (your board — creatures carry `baseP/baseT/expires`), `pcmd` (your commander in command zone), `plays` (the stack), `stackProposal` (P4.2 transient enemy-response proposal `{forId,forName,candidates,choice}`; excluded from `stripJSON`), `lib/hand/gy/exile` (enemy deck zones), `myGy/myExile`, `counters`, `deckColors`, `bossMana/bossManaMax/bossManaMod`, `bossManaFrozen`, `emblemsEnemy`, `battles`, `plane`, `ui:{tabs}`, `phase/activeTurn/turn`, `inv` (satchel), flags (`over/paused/phase2done/phoenixUsed/…`).
- **`DB`** (persisted to `localStorage[SKEY]`): `{profiles:{name:{wins,losses,gold,library,tokens,created}}, active, save}`. **`DB.save`** = the autosaved live game `{v:SAVE_V(38), ts, profile, room, turn, S:<deep copy>}`.
- **Undo (P0.1):** `render()`→`scheduleSettle()`→ a microtask `settleHistory()` runs once per synchronous action; if `stripJSON(S)` changed vs the last committed snapshot it pushes the PRIOR full snapshot (capped 80) with a label (the action's own log line via `_lastLog`, or `actionLabel()`). `stripJSON` omits `_drawer/_atk/combat/ui` so pure-UI churn never makes an undo step. `undo()` pops, restores full `S`, clears `S.combat`, closes transient UI. **Checklist for new mutating actions: just call `render()` at the end.**
- **Save (P0.2):** `autosave()` debounced + guarded (`_liveGame && !S.over`); `continueLastGame()` restores `migrate(DB.save.S)`; `migrate()` backfills missing fields (base stats, ui, scalars) so old saves never throw. Library I/O: `exportLibrary/importLibrary` (cards+tokens only, dedup by lid/tid; cross-reject full saves).
- **Tabs (P1.1):** static `.tab` shells in HTML; `buildTabs()` reparents existing panel nodes into them at init (selects by stable inner id via `.closest('.panel')`). `toggleTab()`→`S.ui.tabs`, re-applied in `render()` via `applyTabs()`.
- **Data tables:** `DIFF` (per-difficulty hp/mana/gold) · `FX` (enemy card pool: `{n,cost,type,color,text,…effect}`) · `DUNGEON` (3 rooms: Grakk R, Murglax B, Vael RB; Vael has `pw`+`epilogue`) · `BOONS`/`STORE`.
- **Turn/phase engine:** `PHASES`=untap→upkeep→draw→main1→combat→main2→end. `flowClick`→`advancePhase`→`enterPhase` (P4.3: gates one-time effects via `S.phasesFired` so each phase fires once/turn, dispatching through `firePhase`→`vael*`/`you*`); `backPhase` (◂ Back) steps the cursor back without re-firing. Enemy casting: `vaelMain`; instant reactions: `enemyInstant` (P4.4 — proactive instant-speed *window* proposals at your upkeep/combat-entry/end, possibility-gated; `buildEnemyCandidates` shared), `enemyRespondToCast` (P4.2 — now builds a **visible `S.stackProposal`** the player approves/edits via `renderStackProposal`/`approveStackProposal`/`passStackProposal`, gated by `proposalLive()`; was auto-cast).
- **Stack:** `S.plays[]`; `mkPlay` builds, `resolvePlay` resolves one; `toAssault` resolves all pending then `advancePhase()` (the "resolve skips a phase" behaviour P4.1 changes); `resolveLeftoverPlays` auto-resolves enemy items at phase edges.
- **AI:** `threatScore` (creatures only — P6.1 generalises) · `aiBlocks` · `aiTargets` · `pwAct` · `vaelAttackers` · `payAttackTax`.
- **Combat/targeting:** `applyTarget`, `resolveAttack`, `killMy` (routes a dead permanent; today sends tokens to graveyard — the P7.1 bug), `removeRef`.
- **Card creation:** one form `castFormHTML`→`readCastForm` (colours still typed as text — P2.2 moves to symbol pills). Board drawers (`creatureDrawer`/`permDrawer`/`walkerDrawer`) already use the `colorToggles` symbol pills — reuse that pattern.
- **Commander:** `S.pcmd` (yours)/`S.cmd` (enemy). `chooseCommander` lists library by *type* (P3.1 switches to a saved-as-commander flag, already plumbed as `cfg.commander`). `_cmdChooseActive` reopen-on-dismiss is the mobile trap to rewrite (P3.1).

---

## 3. Decisions adopted (D1/D2/D3 + lighter defaults)

- **D1 — Save/Continue = exact resume via continuous autosave.** ✅ implemented in Phase 0.
- **D2 — Enemy mana = keep the turn-ramp, layer on colours + freeze + player-effects.** `bossMana()` stays baseline; surface `S.boss.colors`; add **freeze** (`S.bossManaFrozen`); route "search a land" → small temporary `+N` via `bossManaMod`.
- **D3 — Battles & plane = player helpers + enemy battles for Vael only.** Battle tracker + neutral plane die; Vael can field a Battle the AI defends/attacks with priority. Murglax battles / deeper Planechase deferred (P7.7-opt).
- **Lighter defaults:** sounds = synthesized WebAudio SFX + mute (no assets); easy/brutal = a luck % on the enemy's rolls (not just stats); enemy emblems = template dropdown + optional automation; phase enforcement = **soft** (gates/warns, never hard-blocks) + a "◂ back a phase" button; the Grakk "Whelp → graveyard" item — fix the **logging**, not the behaviour.

---

## 3b. Amendments from playtesting (authoritative — override the original where they conflict)

- **A1 — Tab disposition (LOCKED, P1.1 done).**
  - **Info tab:** the You/Player panel (life · deck-colour pills · commander box · 🎒 Satchel button) and the Foe panel **side-by-side**; **Dungeon Log** at the bottom.
  - **Action tab:** Turn-flow panel + Your-attack panel on **one row**; **Tools** panel full-width beneath.
  - **Enemy Board tab:** enemy creatures · enemy planeswalker · enemy zones.
  - **Player Board tab:** your board · your zones · enchantments-in-play.
- **A2 — Satchel is a POPUP (supersedes P7.4 "satchel in menu").** ✅ done. A 🎒 button on the You panel, **above the commander box**, opens `openSatchel()` (shared `#overlay` modal) listing items with Use controls. The passive-item **duration counter** (original P7.4) can be added inside that popup later.
- **A3 — Stack is a POPUP (NEW → task P1.10).** See P1.10.
- **A4 — Descend confirms when a save exists (done).** Clicking **Descend** on the menu while a continuable autosave exists *and* no game is in progress yet (`!S._introShown && hasSave()`) opens a confirmation popup (reusing the `.cutbox` decision modal) naming the saved room + turn, with **▶ Continue saved descent / ✦ Start new — abandon save / Cancel** — so a fresh run never silently overwrites a save. Cancel leaves the menu untouched; the confirm layers above the menu (cutscene `z-50` > menu `z-40`). Touchpoints: `startGame`→`confirmNewDescent`/`startNewDescent`. Verified by jsdom TEST I.
- **A5 — Dungeon Log is expandable (playtest 06-25, done).** The log no longer grows: `#log` (the entries) has a **fixed compact height (114px) + internal scroll** so it's *always the same size* (the text always scrolls inside; it never grows with the first messages); the parchment header `.log h2` stays fixed, and a **tab-like ⤢/⤡ toggle** (`#logToggle`→`toggleLog`) expands/collapses it (default `114px` ↔ a taller fixed `62vh` — **both definite-height scroll containers, so the log scrolls in either state**). State on **`S.ui.logExpanded`** (saved/restored with `ui`, excluded from undo like the tabs; re-applied each render via `applyLog`). Touchpoints: `.log`/`#log`/`.logtoggle` CSS, `#logBox` markup, `applyLog`/`toggleLog`. Verified by jsdom (LOG-1…4).
- **A6 — Attack-resolution is a body-level popup (playtest 06-25, done).** The combat resolver (`#resolver`) was moved **out of the Turn-flow panel to body level** (a sibling of `#plays`, so a collapsed Action tab can never hide it) and restyled as a **centered modal like the stack** — a darkening scrim (`rgba(3,4,7,.93)`, **darker than the stack's** `.82`, + blur) with a `.resolvermodal` box (`z-39`, above the stack/board, below menu/cutscene). **No launcher/FAB** — it opens only via attacks (`openCombat`, the `scrollIntoView` dropped) and dismisses via its own **Approve/Cancel** (no backdrop-dismiss, to avoid an accidental combat cancel). Touchpoints: `.resolver`/`.resolvermodal` CSS, the relocated `#resolver` markup, `openCombat`. Verified by jsdom (RES-1…3).

---

## 4. Cross-cutting conventions

- **`log(who,html)` channels:** `sys` (system), `you` (your actions), `dm` (enemy), `cbt` (combat), `loot` (rewards).
- **Undo:** new mutating actions just end with `render()` (the settle/checkpoint is automatic). For a nice label, call `actionLabel('…')` or rely on the action's own log line.
- **Animations:** CSS-first, 150–450ms, must respect `@media (prefers-reduced-motion:reduce)` (rule already exists).
- **Info affordance:** the ⓘ pattern (P1.8) = one `infoBtn(key)` helper + one `INFO_TEXT` map + one popup.
- **Colour pickers:** always the `colorToggles`/`.manapip` symbol pills. Typed-letter colours are being removed.
- **New `S` fields:** initialise in `fresh()` AND backfill in `migrate()`.

---

# PHASE 0 — Foundations ✅ DONE

- **P0.1 Undo** — one snapshot per *action* (capture-after-render, microtask-deduped; UI churn excluded; named via log line). ✅
- **P0.2 Save** — continuous autosave + "Continue last game" exact resume + `migrate()`; export filename carries profile+timestamp. ✅
- **P0.3 Library export/import** — cards+tokens only, dedup, cross-reject full saves. ✅
- **P0.4 Schema groundwork** — `baseP/baseT` (creatures/tokens/cmd), `expires` (tokens), `commander` (lib cfg), `bossManaFrozen`, `emblemsEnemy`, `battles`, `plane`, `ui`. ✅
- **P0.5 Logging spine** — life/zone/heal/buff logged; undo names the action. ✅

---

# PHASE 1 — UI restructure & visual foundation

### P1.1 — Four labelled, collapsible cornice tabs ✅ DONE
Regroup the body into four bordered, collapsible "cornice" frames per disposition **A1**. Implemented by reparenting existing panel nodes into tab shells (`buildTabs`), preserving every id (verified by id-diff). Collapse state on `S.ui.tabs` (`toggleTab`/`applyTabs`), persisted & restored. **Satchel popup** delivered here too (A2).

### P1.2 — Background covers the whole screen ✅ DONE
`#bgart` fully covers the viewport behind the game (`background-size:cover`, slight scale so edges never show; scrim/glow layers stretch to `inset:0`). **Accept:** no bare `#0b0c10` gap at any size / tall phone. Touchpoints: `#bgart` CSS, `warrenBgCss`/`setWarrenArt`.
**Done:** art layer switched `auto 140% no-repeat fixed` → `cover no-repeat` (cover guarantees coverage at any aspect ratio); `#bgart` given `inset:-2%` overscan (the "slight scale"); dropped `attachment:fixed` (the iOS tall-phone bug — fixed-attachment is sized to document height there). User-confirmed across wide/tall/phone widths.

### P1.3 — Kill the white right-edge border on images ✅ DONE
Diagnose & remove the white sliver on lore art / `openArt` popup (`display:block;max-width:100%;border:0;outline:0`; check baked-in margin / `object-fit`). **Accept:** no white edge desktop or phone. Touchpoints: `.loreframe img`, `openArt`.
**Root cause (diagnosed by decoding the assets):** the 5 `ART` images are JPEGs mislabeled `data:image/png`, each with a **baked-in solid-white line** on one edge (right for grakk/murglax/vael/warren, bottom for merchant; 8–25px). Not a CSS issue. **Fixed at source:** cropped that edge + margin and re-encoded via Pillow (libjpeg `optimize`, q90), re-embedded as proper `data:image/jpeg`; all four edges re-scanned to 0.0% white. The interim CSS crops (`transform:scale` / `clip-path`) were reverted — images display at true size. `openArt` kept the harmless `max-width:100%`+`outline:0` cleanups. Disk 1.46→1.73 MB.

### P1.4 — Menu entrance animation ✅ DONE
Menu falls from the top and opens up (keyframe on `.menubox` when `#menu` gains `.show`; respect reduced-motion). Touchpoints: `.overlay.menu`/`.menubox`, `showMenu`.
**Done — expanded into a full first-boot cinematic** (per playtest feedback): (1) a black `#intro` curtain in the markup so the board never flashes on load; (2) a **center-out canvas fire** (`runBurn` + `buildFbm`, `#introfire`) — a fiery hole ignites mid-screen and burns outward with a ragged fbm edge, ember sparks, and additive bloom — turning transparent to reveal (3) the **warren art as the menu backdrop** (`menuBgCss`/`setMenuArt`, lighter scrim than `#bgart`, replacing the flat ink); then (4) the menubox **drops from above with a double rebound** (`menuBounce`). Orchestrated by `beginIntro()` (called at init instead of `showMenu`); `#menu.bootdrop` delays the drop until the burn clears (cleared in `startGame`). Reduced-motion path skips the curtain/fire and shows the menu instantly (guards against the global `animation:none` freezing the curtain). Tunables live as constants in `runBurn` (DUR/RMAX/RAGGED/MAXW/col ramp) + the bootdrop `animation-delay`.

### P1.5 — Victory & defeat as animated popups ✅ DONE
Replace inline `.banner` victory/defeat with big modal popups (reuse `.cutbox`): **encounter-cleared / victory / defeat** modes, the enemy's last quote (`deathQuote` on win, `quote` on loss), animate in, and a **"Save & quit to Menu"** button (`autosave()` then `showMenu`). Remove old banner markup. Touchpoints: banners, `bossDown`/`win`/`lose`, `showCutscene`. Depends: P0.2, P1.4.
**Done.** Deleted the three `.banner` divs (`clearBanner`/`victory`/`defeat`) + their dead CSS; the `#cutscene`/`.cutbox` overlay is now the single end-state vehicle. Generalised `showCutscene` with `opts.spoils` (a `.loot` line, `#cutSpoils`) and `opts.buttons` (a rebuilt `#cutBtns` row → `renderCutButtons`/`cutAct`/`_cutActs`; first button keeps id `cutBtn` so intros are byte-identical). New helpers: `quitToMenu()` (`doAutosave`→`closeCutscene`→`showMenu`), `showEncounterClear()`. `bossDown` (non-Vael) stashes the loot summary on **`S._spoils`** (init in `fresh()`+`migrate()`) and shows the cleared popup [Descend → / Save & quit]; `win` folds the old `#victory` banner into one epilogue popup [↻ Descend again / Quit to Menu] with `deathQuote`+spoils; `lose` shows a defeat popup [↻ Try again / Quit to Menu] with the villain's living `quote`. **Resume fix:** quitting from a cleared (paused, not-over) state autosaves and `continueLastGame` re-surfaces the cleared popup (`if(S.paused&&!S.over)`), so the player is never stranded mid-descent. "Save" label kept only where a save actually persists (cleared); the two terminal popups say "Quit". Positive popups get a gold eyebrow (`opts.eyebrowAcc`); defeat keeps ember. Verified: JS syntax gate, id-set diff (only the 6 banner ids removed, `cutSpoils`/`cutBtns` added), and a 49-assertion **jsdom** boot+end-state driver (clear/win/lose popups, advance, quit-saves, resume, restart, turn-cycle+undo+autosave — zero console errors). **Adversarially reviewed** (4 dimensions × verify): 3 findings, all nits, all fixed.

### P1.6 — Parchment log restyle ✅ DONE
Pure CSS: aged-parchment surface + inked serif for entries, keep `Space Mono` timestamp as a faint stamp; channel colours stay AA-legible. Touchpoints: `.log`/`.entry`.
**Done** (revised twice per playtest: dimmer, then darker & fire-consumed — not a bright scroll). `.log` is now an **old, fire-consumed parchment** dark enough to sit deep in the dark UI — a `#c2ad74→#a8945c` field with **charred/scorched corners** (near-black radial burns eating inward), a faint fibre grain, a near-black `#2e2210` worn border, and a strong vignette + inner-char inset shadow; `.log h2` is sepia `#4a3410` with a hairline rule. Entries use **IM Fell English** (an authentic inked-print serif, added to the font link) at `.95rem`, inked `#241b0f`; the `Space Mono` timestamp stays a faint stamp `#6e5c36`. Channel inks re-tuned for the darker field and **contrast-checked**: on the central reading column all clear AA / AA-large (body ink `#241b0f` ≥ AA; dm `#5e1a0c`, you `#123a52`, sys `#523609`, loot `#56340a` ≥3:1), with the charred corners intentionally dark — a deliberate trade for the consumed look. Extra padding keeps the text column off the burnt corners. Also **fixed the boot log copy**: the menu-style "Welcome… pick a profile… ☰ Menu" line (which read wrong inside the in-level Dungeon Log) is now an in-world chronicle opener. id-set diff & syntax gate unchanged; 49-assertion jsdom driver still green.

### P1.7 — Player commander box mirrors the enemy's ✅ DONE
Render the player commander into the You panel with the **same `.cmdbox` UI** as the enemy (name, P/T or loyalty, tax/deaths, Deploy when in command zone). Relocation already done in P1.1 (`pcmdBox` lives in You); finish the mirror + verify death-return repopulates it. Touchpoints: `renderCmd`/`renderPlayerCmd`, `sendCmdToZone`. Depends: P1.1, P3.1.
**Done.** `renderPlayerCmd` rewritten to mirror the enemy `.cmdbox`: a big `.cpt` shows **P/T (creatures) or loyalty (walkers)** like the enemy's dormant box, with recast **tax/deaths** in `.cstat` and the **Cast to Stack / Deploy direct** actions when in the command zone (on-battlefield state mirrors the enemy's "controls on the card" line). Added a **`.cmdbox.mine`** azor variant (+ `.cptsub` loyalty label) so the player's box reads blue against the enemy's ember — same layout, player identity. The empty state now hides *and clears* the box. **Death-return verified**: `killMy`→`sendCmdToZone(c,true)`→`S.pcmd=c` repopulates the box with `deaths+1` and the new recast tax (jsdom TEST H drives deploy→kill→return for both creature and walker commanders). CSS + one function; id-set diff & syntax gate unchanged; 62-assertion jsdom driver green. **Adversarially reviewed** (3 dimensions): 1 nit — the on-battlefield recast line was tightened to a compact, azor-bolded mirror of the enemy box — fixed. *(Noted pre-existing, out-of-scope: countering the player's own commander on the stack drops `_pcmdObj` instead of returning it to the zone — a `counterPlay` gap for the P4.x stack work.)*

### P1.8 — ⓘ info popups beside labels ✅ DONE
One `infoBtn(key)` helper + `INFO_TEXT` map + shared modal. Place on tab labels and tricky controls (stack, freeze mana, ward/tax, threat hint, commander, battles).
**Done.** `infoBtn(key)` returns a small bordered-"i" `.ibtn` badge (a `<span role="button">` rather than a nested `<button>`; `stopPropagation` so it doesn't toggle the tab; Enter/Space support). `showInfo(key)` fills the shared `#overlay` modal from the `INFO_TEXT` map. Placed (8 keys): the **4 tab labels** + the **stack** header (injected once in `buildTabs`), both **commander** boxes (`renderCmd`/`renderPlayerCmd`), the **threat** drawer label, and every **ward** drawer label (one `replace_all`). **Deferred to their phases:** `freeze` mana (P5.1) and `battles` (P7.7). **Adversarially reviewed** (2 dims): 4 findings, all minor/nit — fixed: `.ibtn` grows to 34px under `@media(pointer:coarse)` (matching the project's touch-target convention); the tab ⓘ is injected into `.tabnote` (inside `.tablabel`) so it can't orphan onto its own line at phone widths; `text-transform:none` keeps the glyph a lowercase "i" inside the uppercase `.dlab` labels. *Accepted as a benign conformance nit:* the focusable span sits inside the tab-header `<button>` (works in every browser; no clean fix without restructuring the header). id-set diff & syntax gate unchanged; 82-assertion jsdom driver green (TEST J).

### P1.9 — Noise reduction, hierarchy, animations, phone nav ✅ DONE
Visual-hierarchy convention (primary/secondary/tertiary), subtle per-surface backgrounds, small transitions, dead-code/ID sweep, tighter phone layout. A *pass*, not a redesign — no game-logic changes.
**Done** (scope chosen by user: full normalization). Driven by an adversarial audit workflow (verified-dead sweep + hierarchy/phone punch-list). **Dead-code/ID sweep:** removed orphan `.atkpanel`, dead `.taxnote`, the no-op `histCapture()`, a cascade-shadowed duplicate `.brow.tapped`, a `${''}` no-op, the superseded hidden `#invPanel` (with `invCount`/`invField`), and the `atkHint` orphan id — each verified zero-reference. **Hierarchy:** a single `button.big.inline` primary modifier replaces ~10 ad-hoc `width:auto;padding` overrides and unifies Cast/Swing/Resolve/Approve/cutscene/commander buttons; a 3-step radius scale (`--r-tile:11px` / `--r-ctl:9px`) settles the 9–14px jitter across `.playcard/.zone/.libitem/.loreent/.menucard/.storeitem`; board tiles (`.crea/.item/.libitem/.playcard`) gain the subtle hover the store/lore tiles already had; the destructive **Restart** button takes the existing ember caution colour. **Phone:** an `overflow-x` guard + `word-break` stops a long token scrolling the whole page, a new `@media(max-width:380px)` block reclaims padding, the control bar + `.deckmeta` tighten, `.brow` inputs go fluid, and long boss-control labels take their own line. CSS + one template (`renderCutButtons`); id-set diff shows only the intended dead-id removals; syntax gate + 82-assertion jsdom driver green. *(Deferred: the per-creature 11-button `.ctr` density — the clean fix is moving low-use controls behind the ⚙ drawer, a UI change beyond this no-logic pass.)*

### P1.10 — The Stack as an on-screen popup (NEW — amendment A3) ✅ DONE
**Done.** `#plays` was lifted out of the turn-flow panel into a **centered modal** — a full-screen darkening scrim (`.stackpop`, `rgba(6,7,10,.82)` + blur) with an opaque, centered `.stackmodal` (`var(--ink-2)`), dismissible by clicking the backdrop (per playtest preference: a legible centered modal, not the originally-planned docked translucent panel). Header carries **✦ Cast a spell**, **⚡ Quick** (placeholder → `quickCast()` routes to the full cast form until P2.4), and a **✕ dismiss**. A floating launcher **`#stackFab`** (🜟 with a pending-count badge, `.hot` glow when non-empty) shows during a live game when the popup is closed and **opens it on demand** (`toggleStack`); the popup still **auto-surfaces** via the existing `showPlays()` calls (player casts, enemy responses, pw abilities). All existing controls (resolve / counter / redirect / copy / save / remove) and the top-down order are unchanged (`renderPlays` untouched). `renderStackFab()` runs in `render()`. z-order: popup `z-38` / FAB `z-37` sit above the board but below the menu (40) / cutscene (50) / cast-form overlay (60), so casting from the header layers correctly. Dead `.plays` class retired (the `.resolver` combat panel keeps its inline styling). Verified: syntax gate, id-set diff (only `stackFab`/`stackFabN` added; `#plays`/`#playCards` preserved), 93-assertion jsdom driver incl. TEST K (dock, FAB visibility/count, open/close, render). **Adversarially reviewed** (2 dims): 2 findings (minor + nit) — fixed: the launcher is now a **labeled pill** ("🜟 Stack") so it stays discoverable if the alchemical glyph is missing on a mobile WebView, and `.stackbody` got `overscroll-behavior:contain` so the bottom-sheet can't chain-scroll the board. **Defers** to P2.4 (quick-cast), P4.1 (resolve-without-skip), P4.2 (enemy stack proposals).
**Goal.** The stack (`#plays` / "The Stack") becomes a persistent **on-screen popup** instead of an inline panel buried in the Action tab. The popup header carries a **✦ Cast a spell** button and the **⚡ Quick cast** button (to implement in P2.4), so casting is always reachable. It shows pending/resolved/countered items with their resolve / counter / redirect controls.
**Approach.** Move `#plays` into a floating/docked popup overlay (or a pinned, dismissible panel) that **auto-surfaces** whenever there are items on the stack (player casts or the enemy responds) and can be **opened on demand** to cast even when empty. Keep all existing controls and the top-down resolve order. Coordinate with P4.1 (resolve clears the stack without skipping a phase) and P4.2 (enemy responses appear here). Wire the Quick-cast button to P2.4 when built (until then it can route to the full cast form or be hidden).
**Accept.** From anywhere the player can open the stack popup and cast (full now, quick later); stack contents + resolve/counter/redirect work as before; reachable on phone; auto-surfaces when the enemy adds to the stack; nothing about resolution order changes.
**Touchpoints.** `#plays` markup (currently inside the turn-flow panel), `showPlays`/`renderPlays`, `openCast`, and P2.4's quick-cast. **Depends.** P1.1; interplays with P2.4, P4.1, P4.2.

---

# PHASE 2 — Card creation & library UX

- **P2.1 — Windowed, type-first card creator.** ✅ **DONE.** Pick a type first, then a focused form showing only that type's fields. `readCastForm` stays the single config builder, reading only visible fields. Preserve save-to-library / set-as-commander / can't-be-countered / library quick-pick.
  **How:** the form opens with a prominent **type picker** (`.typepick` — 6 `.typebtn`s for the real card types, "1 · Pick a type") above the `.castgrid`; a hidden `<select id="castType">` still backs `readCastForm`. `setCastType(t)` sets that value, swaps the grid class (`ct-<type>`), and highlights the button. Each field carries a visibility class — **`cf-cre`** (P/T, keywords, attack-tax, defender), **`cf-pw`** (loyalty), **`cf-perm`** (the permanent-properties block) — and CSS shows only the right group per `ct-*` (creature → cf-cre+cf-perm; walker → cf-pw+cf-perm; artifact/enchantment → cf-perm; instant/sorcery/ability → common only). `readCastForm` is unchanged (reads every field; `ctype` gates what's used downstream, so hidden fields' defaults are harmless). `loadCastFromLibrary` calls `setCastType(c.ctype)` so a loaded card focuses its type. Save-to-library / set-as-commander / can't-be-countered / library quick-pick untouched. id-set diff: only `typePick`/`castGrid` added. Verified: syntax gate, 103-assertion jsdom driver incl. TEST L (picker, default focus, field tags, setCastType updates grid/select/button, readCastForm ctype).
- **P2.2 — Colours via mana symbols, not typed text.** ✅ **DONE.** Replace `castColor`/`castProt` text inputs with the `colorToggles` symbol pills (also in quick-cast).
  **How:** the board drawers' `colorToggles` mutates a board *object* via `toggleColorField`, but the cast form has no object — so a **form-local** variant: `castColorPicker(id)` renders the six `.manapip` pills (W/U/B/R/G/C) that just `this.classList.toggle('on')`; `readColorPills(id)` returns the lit colours and `setColorPills(id,arr)` lights them. `readCastForm` now reads `readColorPills('castColorPills')` / `'castProtPills'` instead of parsing typed text; `loadCastFromLibrary` calls `setColorPills` for `color` and `prot`. `castColor`/`castProt` text inputs removed (id-set diff: those two ids gone, replaced by the dynamically-built `castColorPills`/`castProtPills`). Verified: syntax gate, 110-assertion jsdom driver incl. TEST M (inputs replaced, 6 pills, set/read round-trip into `color` + `props.prot`).
- **P2.3 — Prominent yellow AI-threat indicator.** ✅ **DONE.** Promote the threat selector to a gold/yellow control near the top of the creature/permanent form, with an ⓘ; feeds the P6.1 threat hierarchy.
  **How:** the old `Threat (AI hint)` dropdown buried near the bottom of `cf-perm` is replaced by a **gold `.threatrow`** placed right after Name/Colours (so it's near the top): a gold-bordered box ("⚠ AI threat — enemy targeting priority" + `infoBtn('threat')`) containing a gold `.threatseg` segmented control (low/mid/top). It's backed by a hidden `<select id="castStrength">`, so **`readCastForm` is unchanged** — `setThreat(v)` sets the select + highlights the segment, and `loadCastFromLibrary` calls `setThreat(pr.strength)`. The row is `cf-perm`, so it shows for creature/artifact/enchantment/walker and hides for instant/sorcery. **Also fixed (the threat ⓘ exposed it):** `showInfo` used to write into the shared `#overlay`/`#modalBody`, so opening any ⓘ from inside the cast form destroyed the form — `showInfo`/`closeInfo` now use a dedicated **`#infoOverlay`/`#infoBody` (z-70, above `#overlay` z-60)** so info layers over the form and dismisses back to it. id-set diff: `threatSeg`/`infoOverlay`/`infoBody` added (`castStrength` preserved). Verified: syntax gate, 120-assertion jsdom driver incl. TEST N (3-button seg, default mid, ⓘ present, sits above P/T, set/read into `props.strength`, ⓘ keeps the cast form intact).
- **P2.4 — Quick-cast.** ✅ **DONE.** Fast path: name, colours (symbols), stats, counters, threat — all optional — into the **same** config→stack-item function as the full creator; editable afterward. Surfaced from the **stack popup (P1.10)** and "Cast a spell".
  **How:** the stack-push logic was extracted from `submitCast` into **`castConfig(cfg)`** (assign id/`_player`/`status`, push, log, close, render, enemy-respond, surface the stack); `submitCast`=`castConfig(readCastForm())` and **`submitQuickCast`=`castConfig(readQuickForm())`** — the *same* pipeline. `quickCast()` — reachable from a gold **⚡ Quick** button beside each of the three `openCast` launch points (the player-board "Cast a spell" row, the turn-flow row, and the stack header) — now renders a compact **`quickCastHTML`**: a type picker + name + reused colour pills (`castColorPicker('qcColorPills')`) + P/T (cf-cre) / loyalty (cf-pw) + the gold threat seg, reusing the same `ct-*` visibility CSS; helpers `setQuickType`/`setQuickThreat`; **⚙ Full editor** re-renders `#modalBody` via `openCast`. `readQuickForm` returns a `readCastForm`-shaped cfg with sensible defaults (no wards/keywords/abilities — those live in the full editor). *Counters are board-time (added after a creature resolves), so neither form sets them at cast — consistent with the full creator.* "Editable afterward" = the resolved permanent is editable via the board's ⚙ drawers. Verified: syntax gate, id-set diff (only new `qc*` ids added), 128-assertion jsdom driver incl. TEST O (form renders, type focus, shared pipeline pushes a stack item carrying name/type/stats/colour/threat).
- **P2.5 — Search bars** for the Library and the cast-from-library picker; library UI polish. ✅ **DONE.**
  **How:** Library modal gets a `#libSearch` box (`oninput="renderLibrary()"`); `renderLibrary` filters cards **and** tokens by name/type/colour/keyword via an `lmatch` predicate, while **preserving original indices** (`lib.map((c,i)=>({c,i})).filter(...)` then `rows.forEach(({c,i})=>…)`) so `libCast/libDeploy/editLibrary/libDelete(i)` still address the right entry — plus a live `#libCardCount` ("matched/total"). The cast-form picker's option list was extracted into **`castLibOptions(q)`** (index-preserving) and given a `#castLibSearch` box (`filterCastLib()` rebuilds `#castLibSel`). Verified: syntax gate, id-set diff (only `libSearch`/`libCardCount`/`castLibSearch` added), 137-assertion jsdom driver incl. TEST P (filter by name + colour, original-index preservation in both list and picker).
- **P2.6 — Reset card to original** (player & enemy): restore base P/T (`baseP/baseT` from P0.4), clear counters (all or selected kinds). ✅ **DONE.**
  **How:** `resetCard(scope,id)` (via the generic `getObj`) restores `baseP→p`/`baseT→t` (and `baseLoy→loyalty`), zeroes `plus`/`minus`, empties `other[]`, logs to the right channel (`dm` for enemy `token`/`cmd`, else `you`), and re-renders. A **↺ reset** button sits on the player creature card's action row (`scope='creatures'`) and the enemy creature card after its properties toggle (`scope='token'`). "Selected kinds" remains available through the existing granular controls (click a counter badge / ⊖ ctr / P/T ±); reset clears everything. Verified: syntax gate, 142-assertion jsdom driver incl. TEST Q (player creature + enemy token both restore base P/T and clear counters; buttons present in the rendered DOM).
- **P2.7 — Planeswalkers legendary by default** (never prompt; remove the toggle). ✅ **DONE.**
  **How:** the rule *"a planeswalker is always legendary"* is enforced at every walker **creation site** — `resolvePlayerItem` (the resolve path for *all* player walkers: openCast, quickCast, libCast/libDeploy via `cfgToItem`), `cmdObjFromCfg` (commander-from-library / `setStartCommander`), and `saveBoardToLibrary` now hardcode `legendary:true` (was `pr.legendary!==false`/`o.legendary!==false`); `addW` already did. The cfg producers stay honest too: `readCastForm` and `readQuickForm` yield `legendary:true` for `ctype==='planeswalker'` (non-walkers still read the toggle). **Toggle removed from both surfaces:** the cast-form `#castLeg` button gains a **`cf-leg`** class shown for creature/artifact/enchantment but **not** planeswalker (one CSS rule), and in its place a static gold **"★ always legendary"** note (`cf-legpw`, shown only for `ct-planeswalker`) mirrors the board treatment so the removal isn't silent; the **walker board drawer** replaces its `flagMy('walkers',…,'legendary')` button with the same static indicator (zero `flagMy('walkers',…,'legendary')` calls remain). **`migrate()`** backfills any pre-P2.7 save (`s.my.walkers[].legendary=true` + a `kind:'walkers'` `pcmd`). Non-walker permanents are untouched (creature toggle still governs). Verified: syntax gate, **id-set diff empty** (no ids added/removed), 34-assertion jsdom driver incl. **TEST R** (cast-form + quick-cast walkers force legendary with toggle off; creature regression both ways; resolve / `cmdObjFromCfg` / `saveBoardToLibrary` / end-to-end pipeline all force true; walker drawer has no toggle + shows the indicator; `migrate` normalizes walkers + walker-pcmd while leaving creatures alone; `getComputedStyle` confirms `cf-leg`/`cf-legpw` visibility per type; boot/turn-cycle/undo/autosave clean). **Adversarially reviewed** (4 dimensions × refute-each-finding workflow): 13 findings, all nit/minor, 0 confirmed defects — one minor UX inconsistency (silent toggle-hide in the cast form) was addressed with the `cf-legpw` affordance above.

---

# PHASE 3 — Commander & emblems

- **P3.1 — Commander = only cards saved as commander.** ✅ **DONE.**
  **How:** **Chooser by flag, not type:** `cmdChooseHTML` now lists `commander===true` creatures/walkers; when **none** are marked (fresh/legacy library) it **falls back to all eligible** cards so the chooser is never an empty dead-end (sub-label flips between "Saved as commander" / "Eligible cards — toggle ♛ commander…"). Index preservation kept (`map((c,i)) → filter → pickCommanderFromLib(i)`). **Save-as-commander toggle:** a new `#castCommander` button (`cf-cmd`, shown only for creature/planeswalker via one CSS rule) in the cast-form flags row; `readCastForm`/`loadCastFromLibrary` already referenced `#castCommander`, so the element makes Save persist `commander:true`. Also fixed `saveBoardToLibrary` **walkers** branch to carry `commander:!!o.isCmd` (was creature-only — a board planeswalker couldn't be saved as commander). **+ commander board button:** a gold `♛ + commander` button in the Your-board controls row opens the chooser any time (mid-game re-pick is undo-safe). **Re-ask on restart:** `restart()` ends with `chooseCommander()` (since `fresh()` clears `S.pcmd`); `proceedAfterCommander` shows the gate intro when `!S._introShown`. **Mobile dismissal-trap rewrite:** the old `closeOverlay` reopened the chooser on every dismiss. New: a `_cmdCreating` flag distinguishes *cancel the create sub-form → back to chooser* from *dismiss the chooser → `skipCommander` (set one later)*, so the modal is always dismissible; and a separate `closeOverlayCommit()` (used by `castConfig` and `castFromLibSel`) makes a **committed cast a clean exit** from the commander flow rather than bouncing back to the chooser. Verified: syntax gate, id-set diff (only the intended `castCommander` id added, nothing removed), **57-assertion jsdom TEST S** (chooser strict+fallback+index-preservation, toggle drives & persists the flag via `getComputedStyle` cf-cmd visibility, board button, dismiss-skips / cancel-returns / committed-cast-exits, walker save parity, restart re-ask shows intro once, boot/turn/undo/autosave). **Adversarially reviewed** (4 dims → refute-each): **4 real bugs found & fixed** — cast-to-stack and cast-from-library inside the create sub-form re-trapped the user (fixed via `closeOverlayCommit`); legacy libraries showed an empty chooser (fixed via the fallback); the walker save-as-commander asymmetry (fixed). A **focused re-review** of the fixes returned **allClean** (0 issues across commit-exit completeness, fallback/parity, and a regression sweep).
- **P3.2 — Enemy emblems** with classic templates + optional automation (store on `S.emblemsEnemy`; automatable ones fire on enemy upkeep and log; others are reminders; render in Enemy Board). ✅ **DONE.**
  **How:** a new **Enemy emblems** panel (its own `.panel` reparented into the Enemy Board tab via `buildTabs` `mv(tbEnemy,enemyEmb)`, header using the already-wired `#enemyName2`) with a **classic-template `<select>`** (`#embTemplate`, populated once by `fillEmblemTemplates`) + **+ add**. `ENEMY_EMBLEMS` (8 templates: lifegain / drain / card-advantage / mana / growth — automatable — plus anthem / menace / custom — reminders). `addEnemyEmblem` pushes a **plain-data** `{id,name,note,auto:{k,n}|null,autoOn}` to `S.emblemsEnemy` (auto sub-object **deep-copied** from the template, never aliased) and logs to `dm`. **Optional automation:** `emblemEffect(em)` applies one effect — `enemyGain`→`bossHealLife`, `youLose`→`S.youLife`, `enemyDraw`→`vaelDraw`, `enemyMana`→`S.bossMana`+`bossManaMax` (added *after* `vaelUntap` resets the pool, so it's truly +N **this** turn and resets next), `buffEnemyCreatures`→`+plus` on `S.tokens` and `S.cmd` when in play. `fireEnemyEmblems()` runs the enabled-`autoOn` ones then `checkLose()`, and is called from **`vaelUpkeep`** (the enemy's upkeep only). Each row offers a per-emblem **⚡ auto/off toggle** (`toggleEmblemAuto`), a **▸ fire** manual trigger (`fireOneEmblem`), inline name/effect edits, and remove; reminders show a "reminder" badge. `S.emblemsEnemy` was already in `fresh`/`migrate`/per-room reset (a new enemy starts with none). Verified: syntax gate, id-set diff (only the intended `embTemplate`/`enemyEmbList`/`enemyName2` ids added), **30-assertion jsdom TEST U** (template fill + enemy-tab placement, add-from-template structure, all five auto effects fire on `vaelUpkeep`, `autoOn=false`/reminder suppression, toggle + manual fire, drain→`checkLose`→game-over, migrate, regression). **Adversarially reviewed** (4 dims): **1 real bug fixed** — a drain emblem killing you on the enemy upkeep let `pwAct()` still run afterward (loyalty mutation + stack opened over the defeat screen); guarded `vaelUpkeep`/`pwAct`/`fireOneEmblem` on `S.over` (matching the `enemyInstant`/`vaelCombat` convention), with a new TEST U6b. Remaining notes were nits/out-of-scope (raw-HTML logging is the codebase-wide pre-existing pattern).
- **P3.3 — Player-commander fixes (planeswalker parity + command-zone routing).** ✅ **DONE** — *playtest-reported 2026-06-25, implemented same day.* Five tightly-coupled fixes so a player commander — especially a **planeswalker** commander — behaves like a creature commander.
  1. **Show the player commander as BLUE on the board.** The player's commander on the battlefield must read **azor/blue** (player identity), mirroring the command-zone box (`.cmdbox.mine`, line ~60). Today the on-board commander **creature** card just adds the shared `.crea.cmdcard` class (~line 925) — the *same* style the enemy commander uses, not blue — and a commander **walker** renders as a plain `.brow` row (~line 937) with only a `♛` badge. *Fix:* add a player/azor `.cmdcard.mine` (or equivalent) variant and apply it when the card belongs to the player's `isCmd` permanent; give the commander walker the same blue treatment.
  2. **Planeswalker commander = creature-commander parity: leaving the battlefield → command zone.** `killMy(c)` (line 758) already routes ANY `isCmd` permanent to the command zone (`sendCmdToZone(c,true)`), so death-by-combat/effects already works for walkers. The real gaps are the **other exit paths** (items 3 & 5) that don't route through `killMy`.
  3. **Walker auto-defeat at 0 loyalty, from ANY source.** Today only enemy combat (~line 843) and effects (~line 728, `walkerMinLoy3`) test `loyalty<=0 → killMy`. The **manual** loyalty control `adjMy('walkers',id,'loyalty',-1)` (line 1053) just clamps at 0 (`Math.max(0,…)`) and never defeats. *Fix:* whenever a walker's loyalty reaches 0 by any path (manual `−`, P/T-style edits, effects), auto-defeat it via `killMy(w)`. Centralising loyalty damage in one accessor is the clean approach.
  4. **A defeated commander walker → command zone (NOT graveyard/exile).** Falls out of item 3 + `killMy(isCmd)→sendCmdToZone` automatically, *provided* the 0-loyalty defeat routes through `killMy`.
  5. **The ✕ (remove) button routes a commander → command zone.** `rmMy(cat,id)` (line 1054) currently just splices the permanent out and re-renders. *Fix:* if the removed permanent `isCmd`, call `sendCmdToZone` instead (creature OR walker).
  - **Open decision:** does manual ✕-removal of your own commander count as a **death** (`sendCmdToZone(c,true)` → `cmdDeaths`+1 and recast tax) or a **clean return** (`sendCmdToZone(c,false)`, no tax, like the existing "→ command zone" button `cmdToZone`)? *Default unless overridden:* 0-loyalty **defeat** = death (tax); manual **✕** = clean return (no tax).
  - **Touchpoints:** `renderMy` (creature card ~925, walker row ~937), `.cmdcard` CSS, `killMy` (758), `adjMy` (1053), `rmMy` (1054), `sendCmdToZone`/`cmdToZone` (983-984), `renderPlayerCmd` (988). **Related (fold in if cheap):** the P1.7 note that **countering the player's own commander on the stack** drops `_pcmdObj` instead of returning it to the command zone (a `counterPlay` gap). Verify on implementation with a new jsdom TEST, the id-set diff, and an adversarial review.
  - **Done.** Six edits — CSS + four functions, no markup-id churn:
    - **Blue on board (1):** new **`.crea.cmdcard.mine`** (azor) overrides the enemy's ember `.crea.cmdcard` by specificity (3 classes > 2); the commander **creature** card adds `cmdcard mine` and the commander **walker** row adds **`.brow.cmdmine`** (+ a `♛ cmd` badge). The enemy commander field card (`.crea cmdcard`, no `mine`) stays ember.
    - **0-loyalty defeat from any path (3) + walker→command-zone parity (2,4):** `adjMy('walkers',…,'loyalty',…)` now routes a walker at **≤0 loyalty** through `killMy` — commander → `sendCmdToZone(.,true)` (death: `cmdDeaths`+1, recast tax +2, loyalty reset to `baseLoy`); non-commander → graveyard (or **exile** if `dies:'exile'`). Combat (`vaelCombat` ~843) and effects (`walkerMinLoy3` ~728) already defeated through `killMy`; this closes the **manual `−`** gap. `killMy`/`sendCmdToZone` own the destination wording — `adjMy` logs only the neutral trigger ("falls to 0 loyalty"), matching the combat/effect convention.
    - **✕ → command zone (5):** `rmMy` routes an `isCmd` permanent (creature **or** walker) via `sendCmdToZone(.,false)` = **clean return** (no tax/death) per the adopted default; non-commanders splice as before.
    - **Counter gap (folded in):** `counterPlay` gains a **`_pcmd`** branch → restores `S.pcmd` and **splices** the item off the stack (undo-safe; mirrors `removeStackItem`, avoiding a `_pcmdObj` double-reference), so a countered player commander returns to the command zone instead of vanishing — forward-cover for **P4.2** (enemy counters).
    - **Decisions applied:** 0-loyalty **defeat = death** (tax); manual **✕** and **counter = clean return** (no tax). Added defensive `if(!o)return`/`if(!p)return` guards.
    - **Verified:** JS syntax gate, **id-set diff empty** (CSS-class + logic only, no ids added/removed), **37-assertion jsdom driver** (all five fixes; blue-on-board class checks ± negatives; exile-routing; no double-existence; enemy-cmd & generic counter regressions; turn-cycle + serialize) — all green, zero console errors. **Adversarially reviewed** (4 dims × refute-verify): **0 fix-now defects**; the one confirmed nit — `adjMy` logging a contradictory destination for a non-commander walker explicitly set to `dies:'exile'` — was fixed by deferring the destination word to `killMy`.

---

# PHASE 4 — Stack & turn-phase engine

- **P4.1 — "Resolve" clears the stack without skipping a phase**; allow multiple stacks per phase. Split `toAssault`: a **Resolve stack** button resolves+clears, leaving phase untouched; phase advance stays solely on **Continue ▸**. (Interacts with the P1.10 stack popup.) ✅ **DONE.**
  **How:** the old `toAssault()` (resolve-all-then-`advancePhase`) is **removed** and replaced by **`resolveStack()`** — resolves every pending item top-down via `resolvePlay`, then `S.plays=S.plays.filter(p=>p.status==='pending')` to **clear** resolved/countered items, `hidePlays()` if the stack is now empty, `render()`; it never advances the phase. The stack-popup footer button is rewired from "Resolve remaining & continue ▸" to **"▸ Resolve the stack"** with a hint that *the phase advances only on Continue ▸*. `flowClick`/`advancePhase` keep sole ownership of phase advance (and `flowClick` still blocks the advance while a player spell is pending, surfacing the stack). So you can **cast → resolve → cast again within one phase** (multiple stacks per phase). **Also fixed (review-found, same domain):** a pending **enemy** instant cast during *your* turn (`enemyInstant` in `youCombat`/`youEnd`) used to be silently dropped on Continue because `resolveLeftoverPlays` was gated to the enemy's turn — `advancePhase` now calls `resolveLeftoverPlays()` unconditionally (it only touches pending non-player items, and `vaelEnd` already called it), so leftover enemy items resolve before the phase advances in **both** turns. Verified: syntax gate, id-set diff (no id changes), **25-assertion jsdom TEST W** (resolve w/o phase change, multiple stacks per phase, mixed player+enemy stack, `flowClick` blocks-then-advances, empty-resolve clears/closes, the leftover-enemy-on-your-turn fix, regression). **Adversarially reviewed** (4 dims): **0 confirmed defects**; the major out-of-scope note (the leftover-enemy drop) was fixed anyway as it's squarely in the stack-resolution domain. Remaining notes were nits (countered-item undo-after-resolve is a coherent lifecycle; granular vs bulk resolve coexistence).
- **P4.2 — Enemy proposes a stack response after every player cast** — including "let it resolve" — as a visible proposal (like the attack/block flow), respecting affordability and target validity (P6.2). ✅ **DONE** (decision: *"flow now, smart later"* — build the visible propose→approve/edit flow with a lightweight guard; deeper threat/value selection deferred to P6.1/P6.2).
  **How.** `enemyRespondToCast(item)` (the existing entry point from `castConfig`/`libCast`/`castCmd`) was rewritten from "auto-cast a random affordable instant 45% of the time" into a **visible proposal builder**: it filters `S.hand` for **affordable** (`fx.cost<=S.bossMana`) instants that **would actually do something** (`enemyInstantWouldDo` — a non-mutating target-validity guard mirroring `applyTarget`'s "is there a legal target?" branches, so the enemy never proposes a fizzle; ward affordability is the deferred P6.2 bit), dedupes by FX key, and stashes **`S.stackProposal={forId,forName,candidates:[{key,n,cost,target}],choice}`** (JSON-serialisable — stores FX *keys*, not object refs; default `choice`=costliest as a placeholder for P6 value-selection), then `showPlays()` to auto-surface. **`renderStackProposal()`** draws an ember box (`#stackProposal` in the stack modal) with a `<select>` of candidates + **⚡ responds ▸** (`approveStackProposal`) and **▸ let it resolve** (`passStackProposal`); `setProposalChoice` edits the pick. Approve re-finds the key in hand, re-checks affordability, spends mana, splices the card, `mkPlay`→pushes with `_card/_instant/_respondingTo`, clears the proposal — the **resolution path is unchanged** (resolvePlay's non-player branch → applyTarget). New `S` field initialised in `fresh()`, backfilled in `migrate()`, and **excluded from `stripJSON`** so proposal/choice churn makes no undo step (the full undo snapshot still carries it, mirroring `combat`). **Response-window lifecycle (review-found major bug, fixed):** a proposal is valid **only while its `forId` spell is still pending** — enforced by a **`proposalLive()`** gate on both render (hide) and approve (void, no cast), plus explicit clears at every window-close point (`resolvePlay`/`resolvePlayOn`/`removeStackItem`/`counterPlay` when `forId` matches; `advancePhase`/`enterRoom`/`resolveStack` unconditionally) so a stale proposal can never render, fire an out-of-window enemy response (e.g. on the enemy's own turn after `vaelUntap` refills mana), or be acted on after restore. **Verified:** syntax gate, id-set diff (`+stackProposal` only), **56-assertion jsdom driver** (contents/affordability/target-validity filtering, approve/pass/edit, render show/hide, `castConfig` integration, `resolveStack`-clears, approved-instant-resolves-&-destroys, fresh/migrate/stripJSON, turn-cycle+serialize, **+14 lifecycle assertions** for the dangling-proposal fix), zero console errors. **Adversarially reviewed** (4 dims × refute-verify): **1 real major bug** (proposal dangling past its window) found & fixed; **focused re-review** of the fix → **allClean** (0 fix-now). *(Behavior change: the old 45%-random auto-cast is replaced; the enemy now proposes every time it has a valid, affordable response and the player approves/edits.)*
- **P4.3 — Phases gate what you can do (soft)** + a **◂ back a phase** button; out-of-phase actions are de-emphasised and warn but never hard-block; re-entering a phase must not re-fire one-time effects. ✅ **DONE** (light gating).
  **How.** Each phase's one-time start effects now fire **at most once per turn**: a new **`S.phasesFired`** (array of fired phase indices, reset to `[]` at each turn start in `beginVaelTurn`/`beginYourTurn` *before* `enterPhase`) gates the dispatch — `enterPhase` does `if(S.phasesFired.indexOf(S.phase)<0){push;firePhase(ph)}`, where the old `vael*`/`you*` dispatch was extracted into **`firePhase(ph)`**. So re-entering a phase via **◂ Back → Continue ▸** never re-untaps / re-draws / re-casts / re-fires emblems or planeswalker abilities (verified incl. a *refill-and-skip* case: even with mana restored, a re-entered main phase does not re-cast). New **`backPhase()`** (the **◂ Back** button beside Continue ▸) steps the phase cursor back within the turn — purely navigational (does **not** call `enterPhase`, so nothing fires on the way back) — guarded against over/paused/**combat**, the turn's first phase, and (mirroring `flowClick`) an **unresolved player spell on the stack**. **Soft gate (light):** `swing()` (already early-returns on the enemy's turn / mid-combat) now logs a *non-blocking* warn when you attack outside your Combat phase, then proceeds; the **Swing button** dims (`.offphase`) whenever it isn't *your* Combat step (enemy turn or your non-combat phase), bright only when attacking is the intended action. `S.phasesFired` is in undo/save (gameplay state); `fresh()` inits it, `migrate()` backfills. **Verified:** syntax gate, id-set diff (`+backBtn`/`+swingBtn`), **29-assertion jsdom driver** (back-nav + all guards; draw & main-cast idempotent on re-entry; `phasesFired` reset per turn; soft warn present out-of-combat / absent in-combat / never blocks; renderFlow back-disable & swing off-phase across turns/phases; fresh/migrate; turn-cycle+serialize), zero console errors; P3.3 (37) & P4.2 (56) regressions green. **Adversarially reviewed** (3 dims × refute-verify): **2 minor fix-now** — `backPhase` was missing `flowClick`'s pending-player-spell guard (soft-stuck), and the swing cue read *inverted* on the enemy turn (bright when you can't attack) — both fixed; the room-transition `phasesFired` concern was dismissed (works-as-designed — the next turn-start resets it).
- **P4.4 — Enemy plays instants at instant speed in ANY phase, hooked to game events (not just responding to your casts).** ✅ **DONE (v1)** — *playtest-requested & built 2026-06-25.* Generalises P4.2 from "respond to your cast" to "the enemy can proactively play **instants / flash / any-time-playable cards whenever it wants**, in any phase."
  - **Goal.** Beyond the P4.2 respond-to-your-cast window, the enemy may act at instant speed at meaningful **event windows** — headline being **combat** (e.g. cast a removal instant to kill an attacker or blocker mid-combat and swing the result), and also your **attack/block declaration**, **upkeep / draw / end** steps, and reactions to **board changes** (you deploying a threat, gaining life, etc.). Whenever the enemy chooses to act it **surfaces the stack** as a *visible proposal* — reusing the P4.2 `S.stackProposal` propose→approve/edit flow — so you always see and confirm what it's doing and why. **This is a *possibility, not an obligation*** — the enemy has the **same freedom you do**: if it has the mana and a card worth playing, it *may* act, but it frequently won't (it holds removal for a better moment, or simply has no instants). It is NOT an every-window event; the *when/whether* is a judgment call that belongs to the AI (see P6).
  - **Approach.** Add **event hooks** at the instant-speed windows and funnel each through one `enemyConsiderInstant(context)` that reuses the P4.2 machinery: filter the hand for **affordable** + `enemyInstantWouldDo` instants relevant to that `context`, build a proposal (default pick by value), pop the stack. **Combat is the headline hook:** after attackers/blockers are declared but **before `approveCombat` applies damage** (in `openCombat`/`renderCombat`), give the enemy a chance to propose a trick/removal that changes the math; if approved, resolve it and **re-`predictCombat`** so the player sees the new outcome before approving combat. Generalise the existing phase-edge `enemyInstant` into these hooks rather than duplicating.
  - **Tuning (REQUIRED — don't let it spam).** Gate every hook hard: **affordability** (`S.bossMana`), **target validity** (`enemyInstantWouldDo` — never a fizzle), **deck identity** (*not every enemy is instant-heavy* — Grakk = burn, Murglax = attrition, Vael = R/B tricks; the actual instant counts are curated in **P5.2**, and an instant-light or instant-less enemy simply never proposes), and **value/timing judgment** — act **only when it clearly changes the outcome**, not "whenever possible" (leans on **P6.1** threat hierarchy / **P6.2** `wouldDoSomething`, plus a per-difficulty aggression/luck knob from **P6.4**: Easy holds back, Brutal jumps on every opening). The `proposalLive()` lifecycle from P4.2 applies (no out-of-window ghosts).
  - **Accept.** During combat (and other phases) the enemy can propose an instant that *visibly* changes the game (kills a blocker so its attacker connects; burns a creature before it deals damage); the stack pops up to approve/edit/decline; the result feeds back into the current step (combat re-predicts); affordability + target validity always respected; **an instant-light enemy stays quiet** (no nagging proposals); nothing fires out of window.
  - **Touchpoints.** `enemyInstant` (generalise the phase-edge version), `enemyRespondToCast` / `S.stackProposal` / `renderStackProposal` / `approveStackProposal` / `passStackProposal` / `proposalLive` / `enemyInstantWouldDo` (reuse), the combat flow (`openCombat` / `renderCombat` / `predictCombat` / `approveCombat`), phase dispatch (`enterPhase` / `advancePhase` / `vael*` / `you*`). **Depends/refines:** P4.2 (✅ infra), **P5.2** (which enemies carry instants & how many), **P6.1/P6.2** (smart timing & selection), **P6.4** (difficulty/luck aggression). *(Flow-now-smart-later again: the event hooks + visible proposals can land on current heuristics; deep timing/value selection rides Phases 5–6.)*
  - **Done (v1).** `enemyInstant(win)` was rewritten from the old ~45%-auto-cast into a visible **`context:'window'` proposal** that reuses the P4.2 flow, hooked at your **upkeep**, **combat-entry**, and **end** windows. It's a **possibility, not an obligation**: gated by affordability + `enemyInstantWouldDo` (no fizzles) + a `Math.random()>0.4` placeholder for the P6 judgment + "skip while a proposal is already up or a combat resolver is open" — so **instant-light enemies stay quiet**. A new **`context`** field generalises `proposalLive()` (cast → its spell is still pending; window → live until acted on / a boundary clears it via `advancePhase`/`enterRoom`/`resolveStack`/`openCombat`; combat → reserved for the follow-up); `buildEnemyCandidates()` was extracted and shared with P4.2; render/approve/pass copy is context-aware ("weighs an instant"/"acts" vs "responds"). **Headline delivered:** at your **combat-phase ENTRY** (before you declare attackers, before any resolver opens) the enemy can propose removal — approve + resolve kills your creature so it can't attack ("removal during combat changes your attack"), with no open combat state to reconcile. **Verified:** syntax gate, **empty id-set diff** (pure JS), **29-assertion jsdom driver** (window build/contents/live; possibility-gate-holds; instant-light/unaffordable/would-fizzle → quiet; guards not-your-turn/combat-open/existing-proposal; approve/pass + context-aware copy; `openCombat` closes the window; the combat-entry headline kills the creature; cast-response regression; upkeep/end hooks; turn-cycle+serialize), zero console errors; P3.3/P4.2/P4.3 regressions green. **Adversarially reviewed** (3 dims × refute-verify): **1 minor fix-now** (the approve log said "responds" for proactive window plays — made context-aware) fixed; **tuning confirmed sane** (no over-proposal at 0.4); two dismissed (works-as-designed: window proposals rely on boundary clears; cast-during-open-combat layering is a *pre-existing P4.2* gap, not a P4.4 regression).
  - **Deferred follow-up (documented).** The **mid-resolver** hook — the enemy killing a **blocker AFTER blocks are declared** (or an attacker after you commit) to change a combat already in progress — needs combat-state **pruning + re-prediction** and stack-popup/resolver overlay handling; v1 acts at *phase-entry* windows and is skipped while a resolver is open (the `S.combat` guard). It also covers the symmetric *cast-a-spell-during-an-open-resolver* layering. Pick this up with P5.2 (richer enemy instant pools) / P6 (smart timing).

---

# PHASE 5 — Enemy mana & deck rework (D2)

- **P5.1 — Enemy colours, freeze-mana, player effects on the pool.** Keep `bossMana()` ramp; show `S.boss.colors`; add **freeze** (`S.bossManaFrozen`) lowering usable mana with badge+log; route "search a land" → temporary `+N`; centralise "usable mana now" in one accessor. ✅ **DONE.**
  **How.** A single **`usableMana()` = `max(0, S.bossMana − S.bossManaFrozen)`** is the one source of truth, and **every** enemy affordability check routes through it — `payWard`, `buildEnemyCandidates` (instant offers), `approveStackProposal`, `vaelMain` (commander + the cast loop), and `payAttackTax` (changed to `S.bossMana -= pm` so only the *paid* amount leaves the pool and the **frozen portion is preserved**). **Freeze** is player-set from a boss-panel row (`bossFreezeAdj`/`bossFreezeClear`, clamp ≥0, log) with a ⓘ (`INFO_TEXT.freeze`); it lowers usable mana (the frozen mana stays in the pool, just unusable) and **thaws automatically at `vaelEnd`** (re-apply each turn for a lasting lock; `enterRoom` resets it per room). A **`#bossFrozen` header badge** ("❄ N frozen") plus manaPips / manaLine / flowMana / the **commander box** / the **stack-proposal panel** all show **usable** mana (with a ❄ note) during the enemy turn — so no readout contradicts what the enemy can actually spend. **Colours** were already surfaced (`#bossColors`); **player mana effects** use the existing controls — `bossManaMod` (persistent per-turn ramp, e.g. a searched land) and `bossManaAdj` (temporary this-turn boost, e.g. a ritual). `S.bossManaFrozen` is in undo/save; `fresh`/`migrate` init it. **Verified:** syntax gate, id-diff (+`bossFrozen`/`bossFrozenVal`), **29-assertion jsdom driver** (usableMana clamp; freeze respected by every spend site with the frozen portion preserved; `vaelEnd` thaw; controls clamp/clear; all displays show usable+frozen; fresh/migrate; turn-cycle+serialize), zero console errors; P3.3/P4.2/P4.3/P4.4/UX regressions green. **Adversarially reviewed** (3 dims × refute-verify): **3 minor fix-now** (the commander box & the stack-proposal panel still showed the raw pool under freeze) — all fixed; the completeness, freeze-lifecycle, and `payAttackTax`-arithmetic dimensions came back clean (routing complete, invariant holds, tax math identical with no freeze).
- **P5.2 — Enemies become real Commander decks** *(scope expanded by the user 2026-06-25).* Not just curated pools — each enemy plays a **singleton ~99-card deck with real mana** (lands abstracted to a mana count, + mana rocks/dorks), built like a real archetype that reflects its lore, with **difficulty card-swaps** (weaker↔stronger) and a **combo/"ultimate" finisher** for Standard/Brutal. Lore archetypes: **🔥 Grakk** = mono-R Goblin aggro/burn (RDW), finisher = anthem + sac-for-damage; **☠ Murglax** = mono-B aristocrats/attrition/drain, finisher = Blood-Artist drain loop + big Exsanguinate; **♛ Vael** = Rakdos midrange + sacrifice/**reanimation** (two phases), finisher = recursion loop ("the embers choose a new shape"). Cards may copy real MTG or be invented, kept balanced/realistic; shared cards reused across same-colour decks. **Multi-part build (checkpoint between parts):**
  - **Part 1 — land-driven mana engine. ✅ DONE** (`339ecb2`). Lands are real cards (`FX.mtn`/`swp`, `type:'land'`) drawn into the enemy's hand and **played as a mana source** (`+1`), never shown as permanents — only the mana count is; mana rocks/dorks ramp via `run:["ramp",N]`. New `S.bossLands`/`S.bossLandPlayed`; **`bossMana()` = sources + mod (+ the land it'll play next turn**, so the commander-readiness projection stays honest); `vaelUntap` refills from sources; `enterRoom` seeds `bossLands = landStart ± difficulty`. **`playEnemyLand()`** plays one land/turn from hand with an **anti-screw floor** (scrounge when behind) so games never stall; `vaelMain` plays a land then casts (cast loop excludes lands); **freeze now taps real sources**. `buildDeck(room)` reads `room.pool` (spells) + `room.lands`. 35-assertion driver + 3-dim review (1 major fix-now — projection omitted the played land — fixed). *(Spell decks are still the old multi-copy pools until Parts 2–3.)*
  - **Part 3a — 🔥 GRAKK deck. ✅ DONE** (`da2c848`, user-approved "tight ~80"). The first full singleton archetype (the template for Murglax/Vael): **32 new cards** (haste goblins, token-makers, burn, a War-Banner enchant, 2 flavour lands) + 13 reused red = **45 singleton spells + 35 lands** (~80, lands counted in). Finisher **Warren Overrun** — a new `run:["anthem",p,t,kw]` effect: every enemy creature gets +p/+t and the keywords **until end of turn** (temp `_tp`/`_tt` in `effP`/`effT`, cleared at `vaelEnd`). **`buildDeck`** upgraded: `{key:count}` map pools = singleton (array pools stay cost-based); `room.swaps[diff]` = `{cut,add}` per-difficulty (Easy cuts top-end for lands; Brutal tightens). Designed + adversarially verified via a deck-design workflow; 20-assertion integration driver (every card resolves, singleton 80, swaps, anthem+cleanup, legacy pools, turn cycle) + all regressions green. *(Mono-black/Rakdos finishers — Murglax's aristocrats drain loop, Vael's reanimation — may need 1–2 more engine effects when those decks land.)*
  - **Part 3b — ☠ MURGLAX deck. ✅ DONE** (`dc52e01`). 31 new cards (deathtouch/lifelink/menace value bodies + the densest removal/drain suite + 2 mana rocks + 2 flavour lands) + 13 reused black = 44 singleton spells + 36 lands (~80). Engine: **The Pit's Tithe** — a new `run:["bloodpact",N]` death-drain (a destroyable `S.rules` entry; `bloodTithe()` fires on every creature death via `killMy`/`removeRef`, draining the player N + healing the enemy N — so the enemy's own board wipes become a drain torrent). Finisher **Maw of the Pit** (big scaled Exsanguinate, no new effect). 20-assertion driver + review. *(The pool format `{key:count}` + difficulty swaps reused from Grakk; bloodpact lives in `S.rules` so it's destroyable + saved.)*
  - **Part 3c — ♛ VAEL deck. ✅ DONE** (`d1fdf79`). The final boss, built reuse-heavy from the red+black pool with **no new engine effect**: 6 new R/B cards (Cinder Wraith, Rakdos Fiend, Ashwing Terror, Emberglut, The Avatar Reborn) + the finisher **Embers Choose a New Shape** (6/6 trample-haste avatar + a 3-drain) + 2 dual lands + 40 reused red/black keys = 46 singleton + 34 lands (~80). Multi-angle finish (Embers + Warren Overrun anthem + Maw drain + The Pit's Tithe). First **two-colour tokens** (`"RB"` → `["R","B"]` via the engine's `split`). 17-assertion driver + review. *(Workflow design failed the structured-output cap; hand-authored from the now-large R+B pool instead.)*
  - **Part 3d — DECK-OUT + full ~99 expansion. ✅ DONE** (`8a93d8d`, `ea20675`, `12c0494`). **Deck-out:** `vaelDraw` no longer reshuffles the graveyard — if the enemy must draw from an empty library it loses (via `bossDown`, so Vael's 2nd phase still triggers); milling the enemy out (`deckMill`) is now a real win path. **~99 expansion** (user reconsidered the earlier "tight 80": a well-built singleton Commander deck keeps its identity, and deck-out makes size a real resource): all three decks → **62 singleton spells + 37 lands = 99**. Grakk +17 new red (cheap haste goblins/token-makers + a War-Horn mini-anthem; curve stays low), Murglax +18 new black (removal/drain instants, DT/LL bodies, 2 upkeep taxes, a 7/7 Undying Glut), Vael +16 reused R/B keys. 35 new cards designed+verified via workflows. Drivers updated to 99 (every card resolves, builds to exactly 99 on every difficulty, combined-effect cards apply both halves); 312+ assertions green.
  - **All three decks done at full ~99.**
  - **Part 3e — AI polish. 🔨 in progress** (`a073856`, `ec184b3`). **Pass 1 — cast-guard** (`enemyCastUseless` in `vaelMain`): the enemy HOLDS removal until you present a valid target (was wasting it on an empty board), and only fires an anthem with a board to buff + in main1 (where it can swing), not main2. **Pass 2 — lethal awareness** (`enemyLethalReach`): when affordable unpreventable burn/drain ≥ your life it goes for the throat, casting those spells first (and in main2, so post-combat burn finishes a chipped player). Found that the enemy's **combat was already smart** — `aiBlocks` makes favorable trades / chumps only when threatened / spares the commander; `aiTargets` kills a planeswalker when it can else goes face — so no combat changes. **Pass-review fixes** (`91a75e8`): `enemyLethalReach` now excludes variable `dieLoss` burn (Gate-Meteor's d6) so lethal is only declared on deterministic damage; `enemyCastUseless` delegates removal-target validity to the precise `enemyInstantWouldDo` (hexproof/indestructible/protection-aware) so it won't cast into a fizzle. 29-assertion AI driver + regressions green. **Remaining ⬜ = BALANCE, which genuinely needs playtest** (difficulty life/mana, card/finisher costs — can't be tuned blind). Sequencing is low-value (enemy casts resolve on the stack later, so same-turn order barely matters); instant-window gate (`Math.random()>0.4`) is the P6 placeholder. **AI LOGIC pass is functionally complete; balance is a playtest-driven follow-up.**
  - **Part 3f — blind balance pass. ✅ DONE** (`19fc819`, via a 3-analyst balance-analysis workflow → synthesis). Only the two consensus changes applied: **Vael phase-2 revival `0.34→0.30`** (trims the run's sharpest spike — 2nd health bar at lowest carried-over life; std P2 12→11, brutal 16→14, easy unchanged; base 36 kept) and **Grakk `landStart 0→1`** (fixes a dead lever — `max(0,landStart+manaBonus)` floored easy's −1 to 0, so easy/std opened identically; now a clean 1/2/3 easy/std/brutal + an on-curve aggro start). Rejected as non-consensus: player-life 40→45 (keeps the gauntlet's core tension), Murglax life, Nyx-ult nerfs, brutal hpMult. 11-assertion balance driver. **These are estimates — validate in playtest.** **P5.2 functionally COMPLETE; only playtest-driven balance validation remains.**

---

# PHASE 6 — AI intelligence & balance

- **P6.1 — Threat hierarchy drives assessment:** planeswalkers > creatures > enchantments/artifacts > instants/sorceries, layered over High/Mid/Low (`strength`). Generalise `threatScore` to score any object; feed removal/counter targeting + combat priorities. ✅ **DONE.**
  **How** (design locked by a 3-design × 6-judge × synthesis workflow; the key risk — regressing the body-tuned combat AI — is eliminated structurally). **`threatScore(o)` now scores ANY object or stack-spell** on one hierarchy: a type tier relative to a **creature baseline of 0** (`THREAT_TIER={walker:+4,creature:0,perm:-3,spell:-6}`), layered over the legacy `{low:-2,mid:0,top:3}` strength offset, **enriched for creatures** with keyword/evasion value (`creatureKwVal`: flying +1.5, double strike +2, deathtouch +1.5, lifelink +1, … defender −2). Walkers add loyalty + a *grown* term + an ult-proximity band; permanents/stack-spells get small bodies. `objKind(o)` does the shape detection — **declared `ctype` first** (stack items), else infer from board fields (`loyalty`→walker, `p&&t`→creature, else perm). Pure read; robust to missing fields (`strengthOf` defaults to `'mid'`; `null/undefined→0`). The hierarchy is a **soft band** (a big enough creature outranks a fresh walker — correct threat assessment), explicitly adopted.
  - **Combat no-regression (the load-bearing property):** a separate **`combatThreat(c)=effP(c)+strengthVal(c)`** is the *verbatim legacy `threatScore` body*, and **`aiBlocks`' numeric GATES read `combatThreat`** while only its **SORT key** uses the enriched `threatScore`. So `combatThreat(c) ≡ legacy threatScore(c)` for **every** creature → the gates (`ts>=4` trade, `ts>=max(5,life·0.4)` chump, menace `ts>=4`) are byte-identical to pre-P6.1; the only combat change is **which scarier attacker a scarce blocker is matched to first** (the intended "feed combat priorities"). Proven across a 60-variant matrix in the driver.
  - **Wiring:** `aiTargets` now attacks the **highest-threat walker** (was raw loyalty); `applyTarget`'s `byT` (unchanged call) now ranks removal **keyword-aware**; a new **`bestTargetThreat(fx,item)`** values a candidate response by the max `threatScore` it can legally ANSWER (removal → best board victim; the dormant `counter` case → `threatScore(item)`, forward-wired for P6.2); **`buildEnemyCandidates(item)`** orders by **value then cheapest**, replacing the P4.2 "costliest" placeholder, so the enemy's default response is the smartest answer (face-burn = value 0 sinks below real removal). `enemyRespondToCast` passes the cast item; the P4.4 window passes `null`.
  - **Strength now persisted** on resolved artifacts/enchants/walkers (was dropped) + the manual `addC/addP/addW` literals + `cmdObjFromCfg` (walker) + `saveBoardToLibrary` (artifact/enchant/walker now round-trip `o.strength`, were hardcoded `'mid'`); `migrate()` backfills any missing `strength` to `'mid'` (behavior-neutral). **`SAVE_V` 38→39.**
  - **Verified:** syntax gate, **empty id-set diff** (pure JS), **62-assertion jsdom driver** (combat-gate invariance matrix; creature keyword enrichment; cross-type soft band; walker grown/ult; `aiTargets`/`applyTarget`/`aiBlocks` priority; `bestTargetThreat`+value-ordering; strength preservation at resolve + save-to-library round-trip + migrate backfill; objKind/robustness; serialize), turn-cycle + P4.2/P4.4 regression smoke — zero console errors. **Adversarially reviewed** (5 dimensions × refute-verify): **0 combat/cross-type/value-logic/scope defects**; the 5 confirmed findings were all **strength round-trip completeness** gaps (`cmdObjFromCfg` walker, `saveBoardToLibrary` artifact/enchant/walker) + one contract-clarity nit (`buildEnemyCandidates()`→`(null)`) — all fixed and re-covered by the driver. *(Out of scope, per sequencing: WHETHER/WHEN to respond/counter = P6.2+P6.4; `vaelMain` casting-by-value + `wouldDoSomething` = P6.2.)*
- **P6.2 — The AI thinks before casting:** extract `wouldDoSomething(card)` (reuse `applyTarget` legality); all casting sites filter through it and choose by value (P6.1), not just cost — no fizzle-casts. **Includes the opportunistic instant-speed plays of P4.4:** at each event window the AI decides *whether* taking the freedom to act is worth it (hold vs use), by threat/value (P6.1) and the difficulty aggression knob (P6.4) — so an enemy with mana + a usable instant still often passes, exactly like a thinking player. ✅ **DONE.**
  **How** (design locked by a 3-design × 6-judge × synthesis workflow). Everything is valued in **one comparable unit — threat points (~1 pt = 1 power of a fair creature)**, the same scale P6.1's `threatScore`/`bestTargetThreat` already speak in, so cross-type casting choices are meaningful.
  - **`wouldDoSomething(fx)`** is the single fizzle filter (subsumes & deletes `enemyCastUseless`): a pure board-legality read — `false` only for lands, removal with no legal victim (`enemyInstantWouldDo`), an anthem with no creatures, or a recurring `rule`/`bossrule` engine **already in play** (`applyRun` dedupes by name). Phase-deadness/“not worth it” are **value** concerns, kept out of the fizzle gate.
  - **`castValue(fx,ctx)`** sums every shape on a card in threat units: removal → `bestTargetThreat` (P6.1); spawn → `bodyValue` (a token scored on the same hierarchy); burn → `selfLoss` 1:1; variable burn → expected roll `(die+1)/2`; **drain → life-aware** (`bossHeal` worth 0 at full life); `cmdBuff` → +N power (×0.6 while the commander is in the zone); **anthem → `perCreature × boardCount`, but 0 in main2** (no combat left); ramp/rule/bossrule/bloodpact get small engine bands.
  - **`vaelMain` chooses by VALUE, not cost:** filter to affordable non-fizzles, score with `castValue`, **hold premium removal** unless it clears `enemyActThreshold()` (mirrors the instant windows), else develop with the best body; tie-break cheaper, then a true tie at random. (Land / commander cast / `enemyLethalReach` lethal pass / Resurgence unchanged.)
  - **Whether to act at instant windows is now a value judgment, not a coin flip:** `enemyInstant` (P4.4) and `enemyRespondToCast` (the deferred P4.2 “WHETHER to respond”) **hold unless `cands[0].value ≥ enemyActThreshold()`** — so an enemy with mana + a usable instant but no worthy target stays quiet. The threshold reads a **difficulty-independent baseline 3** via a `enemyAggression()` **seam returning 0** — the single injection point P6.4 will use to add difficulty/luck (kept constant here so baseline logic stays difficulty-independent).
  - **Verified:** syntax gate, **empty id-set diff** (pure JS), **52-assertion jsdom driver** (fizzle filter incl. the mixed-rule case; per-type value magnitudes & worked examples; vaelMain removal-over-develop / empty-board-develops / removal-floor-on-a-chump / value-ordering / no-fizzle / lethal & commander regressions; `enemyInstant` & `enemyRespondToCast` act/hold; aggression seam; serialize), turn-cycle smoke (16 phases, live value-casting) + P6.1 (62) regression — zero console errors. **Adversarially reviewed** (5 dims × refute-verify): core verified clean (P6.4 seam, `enemyCastUseless` removal, P4.2/P4.4 integration, P6.1 reuse). **2 real fixes applied** — a mixed dupe+new `rule` card wrongly fizzling (now fizzles only when *every* effect is an all-dupe engine), and `castValue` leaking into the cast log (removed, matching the other cast sites). **Rejected/deferred:** `cmdBuff` "fizzle" (it's a real discounted effect on a command-zone commander); the `_card`→graveyard `undoPlay` reference fragility is **pre-existing** (predates P6.2; a delicate undo-subsystem concern); the `rule` magnitude approximation (reminder rules carry no mechanized amount) is an accepted nit.
  - **Pre-existing bug surfaced (deferred to P5.2 balance):** **Gate-Meteor** ("roll d6, then +2") has `selfLoss:2` *and* `dieLoss:true`, but `mkPlay` overwrites `selfLoss` with the roll — so the **+2 is dropped at resolution** (the card deals roll-only). `castValue`'s 3.5 correctly matches the *actual* behavior; fixing the card to deal roll+2 (and valuing it 5.5) is a P5.2 card-balance follow-up, not bundled into this AI commit.
- **P6.3 — Respect haste:** verify haste handling across all enemy creature sources; AI attacks with hasty creatures the turn they arrive when EV-positive. ✅ **DONE.**
  **How.** **Haste audit — already correct** (the P5.2 `30fa772` fix): every enemy creature source honors haste — spawn tokens set `sick:!run[4].includes('haste')` (`applyRun`), the commander's innate haste (e.g. Ashmaw) and **anthem-granted** haste (`_grantKw` from Warren Overrun / War Horn) and reanimation spawns all flow through `vaelAttackers`' `(!c.sick||kw(c,'haste'))` gate, so a hasty creature can attack the turn it arrives. No haste change was needed.
  - **EV-positive attacking (the real work):** `vaelAttackers` used to swing with *every* ready creature (`effP>0`) — throwing a lone 2/1 into a wall of blockers. It now **holds a creature back only when the player has a PROFITABLE block** for it — a legal blocker that **kills it** (damage or deathtouch, but **never an indestructible attacker**) **and** either **survives** or **trades up** (`threatScore(blocker) < threatScore(attacker)`, reusing the P6.1 primitive) — **UNLESS** it `must attack`, is **evasive** (a flyer with no flyer/reach blocker), or the enemy is going **wide** (more ground attackers than the player has blockers, so the excess connects). **Menace** is handled via a `need=2` legal-blocker-count gate (a menace creature past a single blocker is unblockable → it attacks). The bias is intentionally toward **aggression** (this is an aggro-heavy gauntlet — passivity would be the worse failure): go-wide alpha strikes, evasion, even-trades, and must-attack all still swing; only clearly-suicidal lone attacks are held. Models the player as a rational blocker, mirroring `aiBlocks`.
  - **Verified:** syntax gate, **empty id-set diff** (pure JS, one function), **25-assertion jsdom driver** (haste from token/commander/anthem sources + the non-hasty negatives; held-vs-profitable-block; go-wide alpha strike; evasion vs ground/reach; menace vs 1 vs 2 blockers; must-attack; deathtouch trade-up; indestructible-attacker-always-attacks; even-trade attacks; no-blockers attacks all; hasty arrival EV+/EV−), turn-cycle smoke (live EV combat) + P6.1 (62) / P6.2 (52) regressions — zero console errors. **Adversarially reviewed** (3 dims × refute-verify): the aggression/passivity & haste-integration dims came back clean; **1 real fix** — `profitableBlock` treated an **indestructible attacker** as killable (it isn't, per `resolveAttack`), wrongly holding it. Fixed in `profitableBlock`, and the **identical pre-existing bug folded-in at `aiBlocks`** (the enemy can't kill an indestructible *player* attacker either — same combat-AI domain).
- **P6.4 — Difficulty = strategic by default + luck knobs:** add `luck` to `DIFF`; Easy slightly unlucky / Brutal slightly lucky on the enemy's decision rolls and dice it rolls *against you*; baseline logic stays smart at all difficulties; keep hp/mana/gold multipliers. ✅ **DONE.**
  **How.** `DIFF` gains a `luck` field (**easy −1 · standard 0 · brutal +1**) layered *on top of* the unchanged hp/mana/gold mults. A single `enemyLuck()` reads it. Luck is applied at exactly the spec's two surfaces:
  - **Decision threshold (the P6.2 seam):** `enemyAggression()` now returns `enemyLuck()`, so `enemyActThreshold()=3−luck` — **brutal 2** (acts on smaller threats), **easy 4** (holds more), **standard 3** (the smart baseline, *byte-identical* to pre-P6.4). This shifts every cast/instant-window/response act-or-hold decision. Plus `pwAct`'s removal-vs-build roll nudges `0.55 → 0.65/0.45` (brutal likelier to fire its planeswalker removal at your threat).
  - **Dice it rolls against you:** a new `enemyRoll(n)=clamp(d(n)+luck, 1, n)` — a lucky enemy nudges the roll up, an unlucky one down, slight and bounded — wired into `mkPlay`'s `dieLoss` damage (the enemy's d6 burn like Cinder Lash / Gate-Meteor). The player's own rolls (loot d20, manual dice, the direction-ambiguous reminder `rollRule`) and neutral shuffles/tie-breaks are deliberately **untouched**.
  - **Baseline stays smart:** at standard, `luck=0` ⇒ threshold 3, `pwAct` 0.55, `enemyRoll`≡`d` — the P6.1–P6.3 logic is unchanged; only the *bar* and the *dice* move by difficulty. **Verified:** syntax gate, **empty id-set diff** (pure JS), **28-assertion jsdom driver** (DIFF.luck values + mults kept; threshold shift per difficulty + the live 2/2-board act/hold behavior; `enemyRoll` clamp + bias direction over 4000 samples, standard ≈ unbiased; `mkPlay` wiring; `pwAct` probability bounds; standard-baseline regression; serialize) + P6.1 (62) / P6.2 (52) / P6.3 (25) regressions — zero console errors. **Adversarially reviewed** (focused, given the small knob-wiring surface): **0 defects** — standard byte-identical confirmed, clamping safe, no player-roll contamination, scope correct (no luck on loot/shuffles/reminders).
- **P6.5 — Inspect enemy cards → play them;** show cost+colours; full deck actions incl. scry-to-bottom (mostly exists). "Play this" puts an enemy card on the stack via `mkPlay`; offer spend-vs-free mana. ✅ **DONE.**
  **How.** A new **🎴 Inspect & play a card** mode in the enemy deck-tools modal (`openDeckTools`, reached from the Enemy-zones panel). **Inspect:** every card row now shows **cost + a type chip + colour dots** (`fxColorDots`) and its **full rules text** — the `fxItem` helper used across all deck-tools views was enriched, so look/scry/mill/discard all read clearer too. **Play:** `dtPlayCard(zone,i)` plays a card from the enemy's **hand**, the **top of the library** (cast-from-deck), or the **graveyard** (recursion) — it builds `mkPlay(fx)`, stamps `_card` (so it routes to the graveyard on resolve via the existing non-player `resolvePlay` branch) + `_fromZone`, pushes to `S.plays`, and `showPlays()`. So a played removal hits your board, burn/drain applies, a creature spawns — all through the **normal enemy-spell resolution path** (no new resolve code). **Spend-vs-free mana:** a per-session toggle (`_dt.payMana`, default spend) — spend mode subtracts `fx.cost` from `S.bossMana` (clamped ≥0); free mode is a pure override that pays nothing. **Lands** are special-cased: playing one adds a mana source (`S.bossLands`/pool +1) instead of going on the stack. Verified: syntax gate, **empty id-set diff** (the mode renders into `#modalBody`, no static ids), **22-assertion jsdom driver** (inspect shows cost/colours/text + spend toggle; play burn from hand spends mana + resolves for 3 + card→graveyard; play removal from hand destroys a threat; play a land adds a source without touching the stack; free mode spends nothing; library-top & graveyard plays; serialise), smoke green.

---

# PHASE 7 — Tokens, battles, sounds, satchel, logging, instructions, polish

- **P7.1 — Tokens deleted on death (both sides);** token/treasure **expiry** infra (`expires` from P0.4); enemy can hold expiring tokens. Fix `killMy`: a dying token ceases to exist (no graveyard entry). ✅ **DONE.**
  **How.** **Death (fix):** `killMy` now short-circuits on `c.token` — after splicing the permanent off the board it logs "*(token) is destroyed and ceases to exist*" and **returns before the graveyard/exile routing**, so a dying player token leaves no zone entry (the bug). The Pit's-Tithe charge still fires (it's evaluated before the splice and a token death is still a death). Enemy tokens were already correct (`removeRef` splices `S.tokens`). The token rule beats the `dies:'exile'` setting (a token can't be exiled into a zone — it ceases). **Expiry infra:** `clearExpiringTokens()` sweeps **both boards** for `token && expires` creatures and removes them — *ceasing, not dying* (no graveyard, no Tithe) — wired into **both end steps** (`youEnd` and `vaelEnd`), so an "until-end-of-turn" token vanishes at the next end step regardless of whose turn it is. **Enemy can hold expiring tokens:** the `expires` flag is a manual ⚙-drawer toggle on **both** the player creature drawer (`flagMy`) and the enemy token drawer (`flagObj`, shown only for `scope==='token'`, not the commander), with a **⌛ EOT badge** on the board (player `propBadges` + enemy `enemyCard`) so an expiring token is visible. *(Treasure note: the `expires` infra covers temporary/until-EOT tokens generically; a dedicated Treasure-for-mana mechanic was out of scope — no current card needs it, and the manual board tools already cover sacrificing-for-value.)* Verified: syntax gate, **empty id-set diff** (drawer toggles + badges only), **18-assertion jsdom driver** (token ceases with no gy/exile entry; non-token still routes to graveyard; token beats dies:exile; enemy removeRef regression; expiry at both end steps for both boards leaving no graveyard; drawer toggles present, commander excluded; ⌛ badge; turn-cycle + serialise), smoke green.
- **P7.2 — Logging refinement:** the Grakk "Whelp spell → graveyard while its token enters" clarity (log both facts; distinguish spell card from token). ✅ **DONE.**
  **How.** Two facts that were both silent are now logged. **(1)** `applyRun`'s **`spawn`** case logs the token entering — `🜂 A <b>Goblin Whelp</b> token enters … — 1/1 (haste), summoning-sick.` — so every spawn (enemy casts, Resurgence, Vael's phase-2 revival, the walker ult) narrates the body it makes, with P/T, keywords, and sickness. **(2)** When an enemy creature/token **spell** resolves, `resolvePlay` now logs that the **spell card** goes to the graveyard *while its token remains* — but only for spells that actually spawned (`p.run` contains `"spawn"`), so the confusing same-named pair ("Goblin Whelp" on the board **and** in the graveyard) is explicit, while burn/removal/drain spells stay quiet (their card still routes to the graveyard silently, as before — no added log noise). Verified: syntax gate, **empty id-set diff** (logging only), **13-assertion jsdom driver** (Whelp: token-enters line + spell-card-to-graveyard line + "stays on the battlefield" + token on board + card in graveyard + no duplication; Warband distinguishes its differently-named tokens; Ember Bolt adds no spawn line but still graveyards; direct applyRun spawn logs keywords), smoke green.
- **P7.3 — Single-click "select all attackers."** ✅ **DONE.**
  **How.** `selectAllAttackers()` flips `_atk` on **every eligible attacker** in one click — eligible = the same `!tapped && !sick && !phased && !defender` set `swing()` reads, so tapped/sick/defender creatures are never auto-picked. It's a **toggle**: if everything eligible is already selected it **clears all** instead, so the one button is both "select all" and "clear all". A new **`#selAllAtk`** button sits above the attacker tiles; `renderAtkPick` keeps its label in sync (`✓ Select all attackers` ↔ `✕ Clear all attackers`) and **disables** it when there are no eligible attackers. Verified: syntax gate, **id-set diff `+selAllAtk`** (intended), **14-assertion jsdom driver** (selects only eligible; excludes tapped/sick/defender; label flips; second click clears; partial→all; swing consumes the selection; disabled when none), smoke green. *(Harness note: the boot smoke driver now also drives the enemy combat resolver + stack so a full multi-turn play-through is deterministic.)*
- **P7.4 — Satchel duration counter.** *(Satchel placement already done as a popup — A2.)* Add the passive-item "lasts N game(s)" counter inside the satchel popup. ✅ **DONE.**
  **How.** Each satchel item carries a **`descents`** field (default **1** = this descent only — the spec's adopted default). Inside the satchel popup, every **passive/reminder** item shows a **⏳ lasts N descent(s)** row with **− / +** adjusters (`invDuration`, floored at 1); consumables (one-shot) show no duration. **The counter is functional, not decorative:** `carryInvForward()` collects items with `descents>1`, decrements them, and **`restart()` / `startNewDescent()`** re-inject them after `fresh()` wipes `S.inv` — so a relic the player extends survives into the next descent (logged "🎒 N lasting relic(s) carry into this descent"), while default single-descent items are spent. `grantBoon` stamps `descents:1`; `migrate()` backfills it on old saves. *(Decision: duration unit = **descents** (a whole gauntlet run, the satchel's natural lifetime — items already persist room-to-room within a descent), per the open-question default; a Treasure-style per-room counter wasn't needed.)* Verified: syntax gate, **empty id-set diff** (the controls render inside the satchel modal), **18-assertion jsdom driver** (default 1; passive shows controls + consumable doesn't; bump/decrement/floor; carryInvForward keeps >1 decremented and drops =1; full `restart()` carries the relic and spends the consumable; migrate backfill; serialise), smoke green.
- **P7.5 — Zones UI clarity** (enemy + player): labels, counts, per-card affordances, cost/colour on enemy cards. ✅ **DONE.**
  **How.** **Counts everywhere:** the enemy deckmeta line gained **Graveyard / Exile** counts (`gyCount`/`exCount`) beside Library/Hand, and the player-zones panel headers now show **Graveyard N / Exile N** (`myGyCount`/`myExCount`) — all live-updated in `renderZones`/`renderMyZones`. **Cost + colour on enemy cards:** a new `enemyZoneChip(c,i,kind)` renders each graveyard/exile card with **colour dots + mana cost + a full-card-text tooltip** (name · type · cost · text) — previously the chips showed a bare name. **Per-card affordances:** an enemy graveyard card can now be **▸ played** straight from the chip (recursion, reusing P6.5's `dtPlayCard('gy',i)`) as well as **⊘ exiled**; an exiled card can be **↩ returned**. Because the chip's ▸ play can fire while the deck-tools modal is closed, `dtPlayCard` now refreshes that modal via **`dtRenderIfOpen()`** (only when it's actually open) — so a zone play cleanly removes the card, puts it on the stack, and surfaces the stack popup without touching a hidden modal. Player zone chips already carried colour dots + return/exile affordances (kept). Verified: syntax gate, **id-set diff `+gyCount +exCount +myGyCount +myExCount`** (the four count fields), **20-assertion jsdom driver** (all counts; enemy chip dots+cost+name; graveyard ▸ play + ⊘ exile; exile ↩ only, not playable; play-from-chip with deck-tools closed removes card + surfaces stack; player chips keep dots/affordances; serialise), smoke green.
- **P7.6 — Rules & instructions rewrite:** explain the loop, role-play expectation, optional save, quick-cast, threat importance, stack/phases (incl. P1.10 popup, P4.x), enemy mana/freeze, emblems, battles/plane. **Remove enemy general names from the menu/landing** (keep them in earned in-game lore). ✅ **DONE** *(done after P7.7/P7.8 so it documents the finished battles/plane/sounds).*
  **How.** **Tutorial fully rewritten** (`TUTORIAL_HTML`) into scannable sections that now cover the whole game: the **role-play expectation** (you play a real Commander game; the app is opponent + bookkeeper, trusts your inputs), **the loop** (three encounters, life/loot/gold carry), **commander/colours/board setup + difficulty luck**, the **⚙ drawer incl. expires/ward + ⚠ threat importance** ("set it honestly — the AI removes your top threats first"), the **🜟 Stack + ✦ cast / ⚡ quick-cast + enemy response proposals + counter/redirect**, **phases incl. ◂ Back + soft gating**, **combat incl. ✓ Select-all**, **enemy mana / ❄ freeze / emblems / deck inspect-&-play**, **🜨 battles + planar die**, **zones/satchel ⏳ duration/loot/gold/store**, and **💾 autosave + 🔊 sound**. **Villain names removed from the menu/landing:** the menu subtitle and the landing "How it plays" list now describe the three generals by **archetype, not name** ("you learn each one's name only by beating it"); `renderTrack` **masks an unseen room's name as `???`** (hiding "Vael's Throne" until reached); the tutorial names no general. **Earned lore preserved:** the 📖 Lore panel still reveals a general's name once its room is **seen** (and masks the rest as `???`), and the boss panel / cutscenes name the foe you're actually fighting — so the names are earned, not given. Verified: syntax gate, **empty id-set diff** (copy + one render expression), **27-assertion jsdom driver** (menu / landing help / header subtitle / tutorial name no general; track masks future rooms + reveals a reached room; tutorial covers 15 topic keywords incl. role-play; Lore still reveals the seen general and masks unseen), smoke green.
- **P7.7 — Battles + plane die (player) and enemy battles for Vael** (D3): defense-counter tracker, plane die, Vael battle the AI defends/attacks with priority (feeds P6.1). Murglax/deeper Planechase deferred (P7.7-opt). ✅ **DONE.**
  **How.** A new **🜨 Battles & Planes** panel (reparented into the Action tab tools via `buildTabs`, with an ⓘ `infoBtn('battles')`). **Battle tracker** (`S.battles`): `addBattle`/`battleDmg`/`battleAdjDef`/`battleDealInput`/`battleDefeat`/`rmBattle` — each battle has **defense counters** you remove by attacking (⚔ hit N, or −/+); at **0** it's **defeated** (flips). A player battle's reward is the player's to apply (note). **Vael's Siege** (`fieldVaelBattle`, called from `enterRoom` when `room.isVael`): a boss-side battle (`_vael`, def 6) that **heals Vael 2 each upkeep** while it stands (`tickBossBattles`, wired into `vaelUpkeep` with an `S.over` guard) — the AI's "defend with priority" pressure — and when the player **breaks it**, the siege's defenses **deal 6 to Vael** (routing through `bossDown` if lethal). **Planar die** (`rollPlaneDie`): a neutral Planechase roll — **1 planeswalk · 1 chaos · 4 blank** (matching the real die) the player interprets; plus a free-text **current plane** (`setPlaneName`→`S.plane.name`, render-safe against cursor jump). **Feeds P6.1:** `objKind`/`threatScore` gained a **`battle`** branch (perm-tier + `def×0.4`, monotonic in defense) so battles are first-class in the threat hierarchy — a forward hook for AI battle priority. **Decisions:** (1) battles are a *manual defense-counter tracker* (the app bookkeeps; the player applies their own attack damage) rather than wiring battles into the creature-combat engine — consistent with the rest of the app and far lower risk; (2) "the AI defends with priority" is modelled as the Siege's **per-upkeep heal** (a real clock you must break) + scorability, with deep combat integration deferred alongside Murglax battles (P7.7-opt); (3) the planar die uses the **generic chaos** default from the open questions. Verified: syntax gate, **id-set diff** `+battlesPanel +battlesInfoSlot +battleList +planeName +planeOut` (the panel), **25-assertion jsdom driver** (panel reparented + ⓘ; add/attack/deal-input/defeat a player battle; planar-die logs + face symbols + a 600-roll distribution where blanks dominate and both planeswalk & chaos occur; current-plane stored; Vael fields the siege on arrival; it heals on upkeep; breaking it deals 6 to Vael; a defeated siege stops healing; objKind/threatScore battle branch monotonic; migrate-safe; a full Vael turn-cycle with a siege in play; serialise), smoke green ×3.
- **P7.8 — Sounds:** synthesized WebAudio SFX + persisted mute; first-gesture unlock; try/catch; default-quiet. ✅ **DONE.**
  **How.** A tiny **WebAudio synth** (no audio assets): `_tone(freq,dur,type,vol,when,glideTo)` plays one soft oscillator with an attack/decay gain envelope (low volume ≤0.10 — *default-quiet*), and `sfx(name)` composes those into cues — **cast** (two-note chime), **resolve** (down-glide), **strike**/**hit** (low thuds), **coin**/**die** (blips), **victory** (rising arpeggio), **defeat** (falling). Wired into the events that matter: player cast (`castConfig`), `resolvePlay`, combat damage both ways (`approveCombat`), encounter clear + final win (`bossDown`/`win`), defeat (`lose`), and the dice/coin tools — *not* every phase tick (kept un-naggy). **Persisted mute:** `_muted` ↔ **`DB.muted`** (saved via `saveDB`); `loadMute()` reads it at boot; a **🔊 Sound / 🔇 Muted** toggle (`toggleMute`/`renderMuteBtn`) sits in both the controls bar (`muteBtn`) and the menu (`menuMuteBtn`). **First-gesture unlock:** the audio context is created lazily and `unlockAudio()` resumes it on the first `pointerdown`/`keydown`/`touchstart` (browsers block autoplay until then). **Everything is wrapped** — no `AudioContext`, a suspended context, or a headless run silently no-ops (`audioCtx()` returns null; `_tone` early-returns unless the context is `running`). Default = **sound on, soft**. Verified: syntax gate, **id-set diff `+muteBtn +menuMuteBtn`**, **17-assertion jsdom driver** (default unmuted + buttons; sfx/_tone never throw with no context; toggle flips + persists to `DB.muted` + relabels; `loadMute` reads DB; a **mock AudioContext proves the synth path builds oscillators+gains** for cast/victory; muted produces no oscillators; a live resolve emits a cue; serialise), smoke green.
- **P7.9 — Final polish:** subtle per-type backgrounds, tasteful transitions, dead-code sweep, reduced-motion re-verify. ✅ **DONE.**
  **How.** **Dead-code sweep** of the Phase 6.5/7 additions: removed the unreferenced `battlesInfoSlot` id (the battles ⓘ is injected into the panel `<h2>` in `buildTabs`, not that span) and the write-only `p._fromZone` field on played stack items — both verified zero-reference. **Subtle per-type backgrounds:** stack cards (`renderPlays`) gain a `ty-<type>` class and a faint **inset left-accent bar** colour-keyed by type (creature green · instant azor · sorcery ember · artifact bone · enchantment purple · walker gold) — implemented as `box-shadow:inset` so it never fights the existing `.resolved`/`.countered`/`.mine` borders. **Transitions** already conform (the P1.9 `.15s` tile/button transitions); **no new animations** were introduced, so **reduced-motion** is unaffected (the global `@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}` still covers everything — re-verified). **`SAVE_V` 39→40** to match the new migrate backfill (`descents`) + the functional `expires`/`battles`/`plane`, and to align with the "Engine v40" label. **Adversarially reviewed** (5-dimension workflow — logic · state/persistence · render · combat/AI-flow · edge-cases — each finding **verified by writing & running a real jsdom repro test** against the booted engine): **0 confirmed defects, 0 nits** (four dimensions returned no findings; the one flow concern — "a non-spawn enemy spell disappears from the stack" — was **refuted** by a jsdom test showing the card correctly routes to the graveyard while the play stays `resolved`). Final verification: syntax gate, id-set diff (only the intended Phase-7 additions; the dead `battlesInfoSlot` removed), and a **full reusable jsdom test suite** — 11 feature drivers (**192 assertions**) plus a **full 3-room descent driver** (boot → clear all rooms → Vael's Siege fielded → phase-2 ENRAGED → final win, zero console errors, deterministic over repeated runs).

---

# PHASE 8 — Real MTG card import (Scryfall) ⬜ PLANNED

> **Goal.** Let the player play from *real Magic cards* instead of hand-typing every one — and in doing
> so **collapse the casting UX**. `✦ Cast a spell` becomes one **combined search** over your library +
> all of Scryfall; `⚡ Quick Cast` retires; the full creator becomes `✎ Create & Cast` for homebrew.
> A bulk **decklist paste** rides on the same backend. Acquisition runs an **effect-inference layer** so
> imported cards carry the bits the AI and resolution need (on-cast damage/lifegain, mana, ward, a threat
> hint), with a manual fallback. Everything resolves against **[Scryfall](https://scryfall.com/docs/api)**
> and feeds the **existing** library-card schema — *the card model, board, stack, and resolution engine
> are untouched; only the entry points and an additive inference layer are new.*
>
> **Why this is low-risk.** The game's card model is a deliberately small abstraction: descriptive fields
> the engine reads (`name, ctype, cost→`*see note*`, color, p/t, loy, kw[]`) plus a *freeform `note`* that
> already carries any rules text the engine doesn't mechanise. Complex behaviour is **already** resolved
> manually from the note — so import only ever auto-fills the descriptive 80%, and the two things that
> were always human (**AI threat** and the optional **engine-effect verb**) stay human. Import is purely
> **additive**: a new entry point + a pure mapping function. The engine is untouched.

### Design decisions (adopted unless overridden)

- **D8.1 — Backend = Scryfall, queried live; never bundled.** Free, no API key, **CORS-enabled** (browser
  `fetch` works directly, no proxy), permissive for low volume. We store only the handful of cards the
  player adds, in *our* format — never the bulk database (100–450 MB, a non-starter for a no-build PWA).
- **D8.2 — Vendor-neutral, not Moxfield/Goldfish APIs.** Moxfield has restricted API scraping (ToS
  friction) and MTGGoldfish has no clean public API. Both, however, **export the same universal plain-text
  decklist** (`1 Lightning Bolt` per line). P8.3 consumes *that text* + Scryfall name-resolution — robust,
  free, and independent of either vendor.
- **D8.3 — Two front doors, one mapper.** P8.2 (search) and P8.3 (decklist) share **P8.1**'s
  `scryfallToCard(card)` mapper and fetch helpers. Build P8.1+P8.2 first; P8.3 is a thin add-on.
- **D8.4 — Online to import, offline to play.** Searching/resolving are live calls → require connectivity.
  Once added, a card lives in `prof().library` and works offline forever. The import UI is **gated on
  `navigator.onLine`** and degrades gracefully on fetch failure (never a silent hang).
- **D8.5 — Card art is search-only, hotlinked.** Real WotC art (`image_uris`) is shown **only transiently
  in search results** to help recognition (hotlinking, which Scryfall's guidelines allow). The stored
  library card keeps the game's own text style — we never persist or redistribute WotC image assets.
- **D8.6 — Best-effort effect inference + AI bits (NOT all-manual).** *(Supersedes the earlier all-manual
  stance.)* Acquisition builds an **inference layer** (`inferEffects`) that best-effort reads `oracle_text`
  and populates the engine bits the AI and resolution actually use — on-cast one-shots
  (`auto.dmgBoss/gainLife/loseLife`), mana abilities (`props.mana`), `Ward N` (`props.cward`), `Defender`,
  and a **threat hint** (suggested `strength` from P/T + impact) — leaving anything it can't confidently
  parse to the **`note` + manual** path. Every auto-detection is **shown for review** before the card is
  used (no silent guesses). The full `run`/`target` removal grammar stays manual (it's the enemy-deck
  authoring vocabulary, not exposed on player cards).
- **D8.7 — Three entry points collapse to two (retire Quick Cast).** **`✦ Cast a spell`** becomes a pure
  **cast launcher** (no form): a **single combined search** over *your library + all of Scryfall*, your
  saved cards first. **`⚡ Quick Cast` is removed** — the launcher is the quick path. **`✎ Create & Cast`**
  (today's full creator) **moves into the Library** as the homebrew path and is also reachable from the
  launcher ("can't find it? create a custom card"). Casting a real card is now ≤2 taps.
- **D8.8 — Lands are excluded from the cast path.** The launcher search appends `-type:land` (and hides
  pure lands from the library list); decklist import **skips lands** by default (counted). You don't cast
  lands in this engine. The escape hatch for *"treat a land as a creature/permanent"* is **Create & Cast**
  (manual type override), per the user's note.
- **D8.9 — Double-faced cards: the player picks the face.** For DFC / MDFC / transform / modal cards
  (`sc.card_faces[]`), the add/cast flow shows a **face toggle**; the mapper + inferrer run on the
  **chosen face**, and the other face's name+text is stashed in `note` for reference.
- **D8.10 — Both surfaces share the two classic toggles.** The launcher's per-card cast **and** the
  Create & Cast form both expose **★ Save to library** and **"can't be countered"** (`cantCounter`),
  exactly as the cast form does today.

### Scryfall → library-card field map (the heart of P8.1)

The library-card object (`readCastForm`'s `cfg`, saved to `prof().library` with a `lid`) is the target.
`scryfallToCard(sc)` builds one from a Scryfall card object `sc`:

| Library field | Source | Mapping rule |
|---|---|---|
| `name` | `sc.name` | direct (use `sc.card_faces[0].name` for DFCs) |
| `ctype` | `sc.type_line` | parse the dash-split front; pick the engine type by priority **creature → planeswalker → instant → sorcery → artifact → enchantment**; **land → `artifact`** (engine has no player land type) with the real type kept in `note` |
| **cost** | `sc.cmc` | **`cfg.cost = Math.round(cmc)`** — *code-verified additive*: `cfg` has no native cost, but `renderPlays` already shows `p.cost` when present and nothing reads it for resolution, so it's display-only (DFC: use the selected face's cmc) |
| `color` | `sc.colors` | `["W","U","B","R","G"]` subset → same pills; **empty (colorless) → `["C"]`** (`COLORS=["W","U","B","R","G","C"]`) |
| `p` / `t` | `sc.power`/`toughness` | numeric → int; non-numeric (`"*"`, `"1+*"`) → `0` and append the literal to `note` |
| `loy` | `sc.loyalty` | int when present (planeswalkers); else form default `3` |
| `kw` | `sc.keywords` | lowercase; the engine acts on the ones it recognises (flying, lifelink, deathtouch, trample, haste, menace, hexproof, indestructible, defender, vigilance, reach, first strike, double strike…), the rest ride along harmlessly |
| `note` | `sc.oracle_text` | full rules text as the player's reference (join `card_faces[].oracle_text` for DFCs); prepend the real `type_line` when it was lossy (lands, tribal, `*` stats) |
| `props.legendary` | `sc.type_line` | `true` if it contains `Legendary` (planeswalkers already forced legendary by the form) |
| `props.defender` | `sc.keywords` | `true` if `Defender` present |
| `props.prot` | `sc.oracle_text` | *(nice-to-have)* parse `Protection from {color}` → pills; default `[]` |
| `props.strength` | — | **always `'mid'`** on import (D8.6); player adjusts |
| `props` (rest) | — | form defaults (`token:false, dies:'graveyard', cward:null, catk:null, abilP/A:0, mana:0`) |
| `auto` | — | **omitted** (manual resolution); player may add a one-shot later |
| `commander`, `cantCounter` | — | `false`; player toggles |
| `lid` | — | stamped on save via `lidStamp()`, exactly like every other library add |

*Mapper is **pure** (Scryfall JSON in → `cfg` out) so it unit-tests headlessly with fixture JSON — no DOM, no network.*

**Effect inference (`inferEffects(face)` → partial `cfg`).** A small, ordered **pattern table** over
`oracle_text` (lower-cased, reminder-text in parens stripped) sets engine bits only on a **high-confidence**
match; first match wins, ambiguous text sets **nothing** (falls to manual). **`auto` attaches ONLY to
instant/sorcery** — code-verified that `resolvePlayerItem` ignores `auto` on creatures/permanents (it's
dead there), so an ETB-damage creature keeps its text in `note` and resolves manually:

| Pattern (oracle text) | Sets |
|---|---|
| `deal(s) N damage to … (player / opponent / them / each opponent)`, or `… loses N life` | `auto:{k:'dmgBoss',n:N}` |
| `you gain N life` | `auto:{k:'gainLife',n:N}` |
| `you lose N life` / `pay N life` | `auto:{k:'loseLife',n:N}` |
| `{T}: Add {…}` (one mana) / `add one mana of any color` | `props.mana:1` |
| `Ward {N}` / `Ward — Pay N life` | `props.cward:{amt:N,type:'mana'|'life'}` |
| `Defender` (keyword) | `props.defender:true` |
| **threat hint** — big body / evasive / repeatable impact | suggested `props.strength` (`top` for ≥5 power or game-ending text · `low` for ≤1 power / defender · else `mid`) |
| anything else (targeted removal, draw, counters, tutor, ETB triggers…) | **nothing** → full text in `note`, manual resolution |

**DFC handling (`facesOf(sc)` → face array).** Each entry: `{name,type_line,oracle_text,colors,cmc,power,
toughness,loyalty,keywords,image}` (normal cards return one synthetic face). The UI offers a face toggle and
runs `scryfallToCard`/`inferEffects` on the **selected** face.

### Build progress — pure data layer ✅ (2026-06-27, verified in isolation)

The pure, DOM-free core of P8.1+P8.2 is **built and headlessly verified** in the session scratchpad
(`scryimport.js` + `fixtures.js` + `test.js`, **124 assertions green**), ready to transplant into
`index.html`'s `<script>` (drop the `module.exports` tail). Functions: `facesOf` · `scryfallToCard` ·
`inferEffects` · `buildImportedCard` · `parseDecklist` (+ helpers `cmcFromCost`, `manaProduced`,
`cleanCardName`). **Code-verified contract decisions baked in:** `cfg.cost = cmcFromCost(face.mana_cost)`
(per-face, falls back to `cmc`; additive/display-only); `auto` attached **only** for instant/sorcery;
`kw` ⊆ `KW_LIST`+`haste` with ward/protection routed to `props`. A **5-lens adversarial review** (Scryfall
schema · cfg-contract · inference · decklist · purity) found **8 real defects, all fixed + regression-tested**:
adventure/flip P/T (read from `card_faces[0]`, not 0/0); MDFC back-face cost from `mana_cost`; drain
`"…or planeswalker loses N life"`→`dmgBoss`; multi-mana counting (`Add {C}{C}`→2); decklist strip robust to
trailing tags/foil-glyphs/`[SET]` while preserving in-name parens (`"Hazmat Suit (Used)"`); per-face keyword
attribution + reminder-text stripping (no cross-face leak).

**Integration landed (2026-06-27, branch `phase-8-card-import`).** The verified pure layer is transplanted
into `index.html` as the **`SCRY` IIFE** (no global collisions — its private `COLORS`/`RECOGNISED_KW` stay
inside), plus the **network layer** (`sfFetch`/`sfSearch` with `-type:land`/`sfAutocomplete`/`sfCollection`
≤75 batch) + **`importOnline()`** gating, and the **"📥 Add real cards" launcher** (`openCardSearch`): one
combined search over your library **and** Scryfall, result rows with image · cost · type · P/T · colour ·
**inferred-effect/threat review chips**, a **low/mid/top** threat control, a **DFC face toggle**, a
**can't-be-countered** modifier, and **✦ Cast / ★ Save / ✦+★**. Casting routes through the existing
`castConfig` (enemy-response window + stack popup fire) and resolves identically to a hand-made card. **All
ADDITIVE** — opened from the 🃏 Library beside *✦ New card*; existing cast / quick-cast / creator flows are
untouched this pass. **`sw.js`** got the cross-origin early-return + `CACHE v42→v43`. **Verified:** syntax
gate clean · id-diff = only the 8 launcher ids added, nothing removed · **36 jsdom integration assertions**
(boot 0-error; launcher renders; results + DFC toggle; save persists w/ inferred auto + lid; threat-override
cast → real player stack-item; **imported creature resolves to a 2/2, imported burn deals 3 to the boss**;
offline note; `sfSearch` URL/`-type:land`) · **124 pure-layer unit assertions** · **adversarial integration
review** (1 medium found & fixed: launcher casts now `closeLibrary()` so the stack/enemy-response window
aren't occluded by the z50 library overlay). **Next:** entry-point rewire (P8.3 repoint ✦ Cast a spell →
launcher; P8.4 retire ⚡ Quick Cast + Create & Cast relocation).
*(Dev harness in scratchpad: `scryimport.js`/`fixtures.js`/`test.js` + `boot.js`/`gate.js`/`iddiff.js`.)*

**P8.5 decklist mode landed (2026-06-27).** A **📋 Paste a decklist** tab inside the launcher: paste a
Moxfield/MTGGoldfish export → **Resolve & review** (`parseDecklist` → `sfCollection` batch) → a review list
of ✓ matched (preview) · ⛰ N lands skipped (with an *include lands* checkbox) · ✗ not-found names → **★ Add
N to library** (each via `buildImportedCard` with one global threat). Built entirely on the already-verified
parser + batch endpoint + combiner. **Verified:** syntax gate · id-diff (only new deck-mode ids added,
nothing removed) · **44 jsdom assertions** (now incl. mode toggle, land-skip, not-found, add-all).

**P8.3/P8.4 entry-point rework landed (2026-06-27).** All three board **✦ Cast a spell** buttons (action
panel · empty-stack · stack hacts) now open the launcher (`openCardSearch`); **⚡ Quick Cast is retired**
(buttons + `quickCast`/`quickCastHTML`/`readQuickForm`/`submitQuickCast`/`setQuickType`/`setQuickThreat`
deleted). The creator (`openCast`) is relabeled **✎ Create a card**, homed in the 🃏 Library and reachable
from a "can't find it? ✎ Create a card" link in the launcher (so homebrew + land-as-creature stay reachable
from the board). Stale Library/tutorial copy referencing Quick Cast was fixed (full doc overhaul = P9.5).
**Verified:** syntax gate · id-diff = launcher ids added, the **`qc*` quick-cast ids removed (intended)**,
nothing else removed · **48 jsdom assertions** (now incl. quick-cast retired + a Cast-a-spell button →
`openCardSearch`). **Phase 8 import is now FEATURE-COMPLETE** — remaining: a manual live-online Scryfall
smoke, the optional removal of the creator's redundant From-library row, and the P9.5 doc overhaul.

### P8.1 — Scryfall service layer + pure descriptive mapper (+ DFC faces)

A small, self-contained module (clearly-commented, near the library I/O fns):
- **`facesOf(sc)`** — normalise normal vs double-faced cards into a **face array** (D8.9); normal cards
  return a single synthetic face.
- **`scryfallToCard(sc, faceIndex=0)`** — the pure **descriptive** mapper (field-map table) over the
  selected face. Shared by every import path.
- **`sfFetch(path)`** — thin `fetch('https://api.scryfall.com'+path,{headers:{Accept:'application/json'}})`
  wrapper; parsed JSON or a typed error. **All callers wrapped in try/catch** (principle 8). *(Browsers
  can't set `User-Agent`; Scryfall doesn't require it at this volume.)*
- **`sfSearch(q)`** → `GET /cards/search?q=<q> -type:land&unique=cards` (lands excluded per D8.8; first
  page, paginate lazily). **`sfAutocomplete(q)`** → `GET /cards/autocomplete?q=<q>`. **`sfCollection(ids)`**
  → `POST /cards/collection` (≤**75**/request; `{data,not_found}`).
- **Rate-limit courtesy** ~75–100 ms between sequential requests (only the paginated bulk path).
- **Offline gating** `importOnline()` (`navigator.onLine`) disables the Scryfall affordances with
  *"Card search needs a connection — your saved cards still work offline."*
- **`sw.js` bump:** add an **early `return` for cross-origin requests**
  (`new URL(req.url).origin !== self.location.origin`) so Scryfall calls hit the network with a real error
  instead of the cached HTML shell; **`CACHE v42→v43`**. Same-origin shell caching unchanged.

### P8.2 — Effect-inference layer (the AI / on-cast infrastructure)

The infrastructure that *"makes the AI know the needed bits and the on-cast effects."*
- **`inferEffects(face)`** — the pure, ordered **pattern table** above → a partial `cfg`
  (`auto`, `props.mana/cward/defender`, a suggested `props.strength`). High-confidence matches only;
  ambiguous text sets nothing.
- **`buildImportedCard(sc,{faceIndex=0, strength, cantCounter})`** — the **one combiner** used by P8.3 &
  P8.5: `{...scryfallToCard(sc,faceIndex), ...inferEffects(face)}`, then apply the player's threat
  override + `cantCounter`; `lid` stamped on save. Pure → headless unit tests.
- **Review-before-use:** whatever was auto-detected (effect, threat hint, mana, ward) is surfaced in the
  add/cast UI as **editable chips** — the player confirms or clears them. No silent guesses (principle 5).
- *Why a layer, not inline:* the launcher (P8.3) and decklist import (P8.5) need identical bits, and the
  pattern set will grow — one tested function keeps it honest and extensible.

### P8.3 — "✦ Cast a spell" = combined launcher (retire ⚡ Quick Cast)

Replace `openCast`'s form-first behaviour and **delete `quickCast`** (dead code goes — principle 6):
- **One combined search box** (`openCastLauncher`): typing filters **your library** *and* queries
  **Scryfall** together (D8.7 / "combined single search"), **your saved cards listed first**, lands
  excluded (D8.8). Debounced (~250 ms); the library half matches instantly **offline**.
- **Result rows:** thumbnail (Scryfall hotlink) · name · cost · type · P/T-or-loyalty. DFC cards show a
  **face toggle** (D8.9). A row exposes: a **low/mid/top** threat control (prefilled from the inferred
  hint), **✦ Cast** and **✦ Cast + ★ Save**, and a **"can't be countered"** modifier (D8.10).
- **Cast** = `castConfig(buildImportedCard(...))`; library cards reuse `libCast`/`cfgToItem`. **Cast +
  Save** also `library.push` + `saveDB`. Permanents resolve to the board; the enemy gets its
  `enemyRespondToCast` window — **unchanged downstream**.
- A **"✎ can't find it? Create a custom card"** link opens P8.4 (e.g. casting a land as a creature).
- Offline → the box still searches the **library only**, with a quiet "Scryfall offline" note.

### P8.4 — "✎ Create & Cast" (homebrew creator, now Library-homed)

Repurpose the existing `castFormHTML`/`readCastForm` (no rebuild — it already emits the exact `cfg`):
- Reached as **"✎ Create & Cast" / "＋ Create a card"** from the **Library** (and the launcher's create
  link). Keeps **full manual control** — including the **land-as-creature / any-type override** the user
  called out — plus **★ Save to library**, **"can't be countered"**, and **♛ set as commander**.
- The form's old inline **"From library" cast row is removed** (that job is now the launcher's), so the
  creator is purely *create / edit*. **⚡ Quick Cast's minimal form is retired** (folded away here).
- Everything it produces is a normal `cfg` — identical downstream to today.

### P8.5 — Decklist paste-import (bulk, vendor-neutral)

A **"📋 Paste a decklist"** mode in the launcher / library:
- `parseDecklist(text)` accepts both sites' export shapes: `1 Lightning Bolt`, `1x …`, set/collector
  suffix `(2X2) 117`, `SB:`/sideboard, `//` comments, blanks skipped → `[{qty,name}]` (dedupe by name).
- Resolve via `sfCollection` (≤75 batched, throttled). **Lands skipped by default** with the count
  reported (D8.8; an *"include lands"* checkbox for the rare want). **Review list:** ✓ matched (mapped
  preview) vs **✗ not found**, nothing dropped silently (principle 5 / "no silent caps").
- **One global threat default** + *"add all matched"* → each runs `buildImportedCard` and pushes to the
  library. Built entirely on P8.1 / P8.2 — parser + batch-resolve + the shared combiner.

### Acceptance criteria (Phase 8)

1. **Cast launcher:** `✦ Cast a spell` opens one combined search; typing shows **library hits first**, then
   Scryfall matches (**no lands**). Casting a result puts it on the stack with correct
   name/type/cost/colours/P-T/keywords; **Cast + Save** also lands it in the library. **Quick Cast is gone.**
2. **Effect inference:** a burn spell ("deals 3 damage to target player") imports with
   `auto:{k:'dmgBoss',n:3}`; a mana dork with `props.mana:1`; a `Ward 2` creature with `props.cward`; a
   vanilla 6/6 pre-suggests `strength:'top'` — each **shown for review** and editable before use; an
   un-parseable removal spell sets **no** effect and keeps full text in `note`.
3. **DFC:** adding a double-faced card lets the player **pick the face**; the stored/cast card is built from
   the chosen face with the other face noted.
4. **Create & Cast:** the homebrew creator lives in the Library, still allows any-type overrides (e.g. a
   land cast as a creature), and keeps Save / can't-be-countered / commander.
5. **Decklist:** pasting a ~60-card Moxfield/Goldfish export **adds all matched non-land cards** in one pass
   (lands skipped + counted); unmatched names are **listed, not dropped**.
6. **Parity:** imported cards are indistinguishable downstream — they cast, resolve, save, `exportLibrary`
   round-trip, and survive `migrate()` with **no new `cfg` keys** that break old saves.
7. **Offline:** with the network off the launcher searches the **library only** (clear note) and import is
   disabled; existing cards still play; a mid-search disconnect errors cleanly, never the HTML shell.
8. **Headless tests** cover `scryfallToCard`, `inferEffects`, `facesOf`, and `parseDecklist` over fixtures
   (creature, instant, planeswalker, multicolour, colorless, DFC, `*`-power, land; the inference templates;
   the decklist format variants).

### Verification (matches the house harness)

- **Pure-function unit tests** (Node, no DOM): `scryfallToCard`, `inferEffects`, `facesOf`,
  `buildImportedCard` over fixture JSON (the card archetypes + the inference templates + a DFC). The bulk
  of the safety net; no network.
- **`parseDecklist` unit tests:** the format variants in P8.5 (plain, `x`, set-suffix, comments, blanks,
  `SB:`), incl. dedupe, qty, and land-skip.
- **jsdom driver:** open the launcher / import modal, **stub `sfFetch`/`sfSearch`/`sfCollection`** with
  fixtures (no live network in CI), drive *cast*, *cast+save*, *paste→add-all*, and a **DFC face toggle**;
  assert `prof().library` grew / the stack received the cast, `saveDB` called, library re-rendered, and the
  offline path searches library-only.
- **Syntax gate** (`node -e` + `vm.Script`) and **id-set diff** after the DOM changes (new launcher/import
  ids appear; the **Quick-Cast button id is removed** — the one intended deletion; nothing else removed).
- **`sw.js`:** confirm cross-origin early-return (a stubbed cross-origin request is **not** answered from
  cache and **not** given the shell) and that same-origin shell caching is unchanged; `CACHE` is `v43`.
- **Live smoke (manual, online):** one real search + one real ~60-card paste against Scryfall to confirm
  field mapping holds against the live schema before shipping.

### Open questions (Phase 8) — defaults assumed unless overridden

- **Lands:** **Decided (D8.8):** excluded from the cast path and **skipped on decklist import** (counted),
  with an *"include lands"* checkbox; treat-a-land-as-a-creature goes through Create & Cast.
- **Cost storage:** **RESOLVED (2026-06-27, code-verified).** A *player* `cfg` carries **no** top-level
  cost (`readCastForm` never sets one), but `renderPlays` (index.html ~1613) already renders `p.cost` when
  present, and nothing reads `cost` for player resolution. So imported cards set **`cfg.cost = Math.round(cmc)`**
  — purely **additive, display-only**; hand-made cards stay costless (unchanged). Implemented in the pure
  mapper.
- **Inference depth:** the starter set (D8.6 table) covers burn / lifegain / lifeloss / mana / ward /
  defender / threat-hint. **Open:** how far to extend (draw, +N/+N buffs, ETB triggers)? **Default:** ship
  the starter set, every match **player-reviewable**, and grow it from playtest misses.
- **DFC default face:** **Default:** preselect the **front face**; the toggle switches to the back (modal
  DFCs where both faces are castable still default front).

---

# PHASE 9 — Complete the player's toolbox + instruction overhaul ⬜ PLANNED

> **Goal.** The app is the *bookkeeper for a real Commander game* — so the player must be able to represent
> **any** board action a physical card produces, not just the subset wired today. Audit the current
> affordances, fill the zone-move / control / state gaps (headline: **return an enemy permanent to hand**),
> then **thoroughly rewrite the instructions** to cover the finished game (incl. Phase 8). Additive UI over
> the existing state — no engine rewrite. *(Independent of Phase 8; can build in either order, but the
> instruction overhaul P9.5 runs **last** so it documents everything.)*

### Current toolbox vs gaps (audit — grep-verified 2026-06-27)

**Already covered:** tap/untap (`tapT`), summoning-sick toggle (`sickMy`), phase out (`phased`), ±1/+1 &
−1/−1 & custom & remove counters (`cctr`/`cctrCustom`/`remCtr`), P/T adjust (`cp`/`adjMy`), keyword
grant/remove (`kwSelect`/`toggleKwMy`), the per-permanent drawer (legendary/token/expires/defender/colour/
protection/abilities/mana/dies-to/threat/attack-tax/ward/commander), reset-to-original (`resetCard`),
destroy→graveyard/exile per `dies` (`killMy`/`slay`→`removeRef`, Tithe-aware), your graveyard → battlefield
(`myGyReturn`) / → exile (`myGyToExile`), enemy graveyard → play-to-stack (`dtPlayCard`) / → exile
(`gyToExile`), enemy exile → graveyard (`exToGy`), deck tools (scry/look/mill/exile-from-library/discard/
shuffle/reveal/inspect-&-play), set/return commander (`setCommander`/`sendCmdToZone`).

| Gap (a player needs it; missing today) | Fix |
|---|---|
| **Return a permanent to hand (bounce)** — *requested* | enemy permanent → `S.hand` (AI can recast it); your permanent → off-board (you hold the card) |
| Return a permanent to **library** (top / bottom / shuffle) — tuck/Terminus | enemy → `S.lib` at chosen position; yours → off-board |
| **Your exile is a dead end** — `myExList` chips are inert | exile → battlefield / hand / graveyard (blink, "return at end of turn", cast-from-exile) |
| Enemy exile only → graveyard | also → battlefield / hand / library |
| **Reanimate directly** (gy → battlefield, no stack) for the enemy | enemy graveyard → battlefield |
| **Flicker / blink** your own permanent (exile then return; resets auras/counters) | one-tap blink |
| **Change control** (steal an enemy creature / donate yours) — Threaten, Mind Control | move the object across boards, stats preserved |
| **Copy / clone** a *specific* permanent (not just blank tokens) | token copy of any card |
| **Transform / flip** a DFC permanent on the battlefield | flip the active face (ties to P8.9) |
| Common **status markers** (goad, monarch, the initiative, can't-block, day/night) | quick toggles atop the existing custom `other` markers |
| **Tutor / move a named card** library → hand or battlefield (deck tools disclaim this today) | extend deck tools with a per-card destination |

### P9.1 — Universal "move to zone" engine + affordance (the core)

One shared mover replaces the scattered one-off zone fns and closes most gaps at once:
- **`moveCard(obj, from, to, opts)`** — owner-aware routing between `battlefield · hand · library(top/
  bottom/shuffle) · graveyard · exile · command-zone`. **Enemy** cards route into the modeled
  `S.hand/S.lib/S.gy/S.exile/S.tokens` (so a bounced/tucked card re-enters the AI's real deck/hand);
  **your** cards route into `S.my*`/`S.myGy`/`S.myExile` or **off-board** (your hand/library are physical —
  log "returned to your hand", drop it from the app). **Death semantics preserved:** destroy & sacrifice
  fire death + Pit's-Tithe (route through `killMy`/`removeRef`); **bounce / tuck / hand / library do NOT**
  (not deaths). Commander replacement still intercepts (a bounced/dying commander offers the command zone).
- **Affordance:** a compact **"move ▾"** menu on every board permanent (player + enemy) and every zone chip
  (both graveyards/exiles), listing only the **legal destinations** for that object. The headline **↩ Return
  to hand** sits at the top for board permanents. The existing one-tap shortcuts (↑ return, ⊘ exile, ▸ play)
  stay; the menu is the complete set.
- **Refactor, don't duplicate** (principles 1 & 6): `myGyReturn`/`myGyToExile`/`gyToExile`/`exToGy`/
  `dtPlayCard` become thin callers of `moveCard`; dead one-offs removed.

**P9.1a landed (2026-06-27, branch `phase-9-toolbox`).** The **board→zone** half is built & verified:
`moveBoardCard(obj,to)` + `moveBoardById(scope,id,to)` route a board permanent to `hand · library
(top/bottom/shuffle) · exile · graveyard`, **owner-aware** (enemy → modelled `S.hand/lib/gy/exile`, the
keyless body carried by `name`; player hand/library are **physical** → leaves the app; player graveyard/exile
→ `S.myGy/myExile`). **NON-death** — no Pit's Tithe (destroy/sacrifice via `killMy`/`removeRef`/`slay` still
fire it); a **token ceases** when it leaves the battlefield; a **commander** routes to the command zone
(`sendCmdToZone`). Affordance: a one-tap **↩ hand** on enemy cards + a **"move to" row** (`moveRow`) in the
enemy drawer (token only) and all three player drawers. Zone chips (`libNames`/`enemyZoneChip`/dt reveal/
`gyToExile`/`exToGy`) gained a **`c.name` fallback** so a keyless moved card still labels — and that fixed a
**real crash** (`gyToExile`/`exToGy` did unguarded `FX[c.key].n`). **Verified:** syntax gate · id-diff = no
ids changed (handler-only UI) · **26 jsdom assertions** (return-to-hand no-Tithe + name; tuck top/bottom/
shuffle; clean exile/graveyard; death still bleeds; player physical hand + clean gy/exile; token cease; zone
buttons don't crash on a moved card; drawers render the row) · **adversarial review (3 lenses) = 0 findings**.
**P9.1b landed (2026-06-27) — the zone-card half.** `moveZoneCard(from,i,to)` moves a card *from* a
graveyard/exile zone elsewhere: **player exile is no longer a dead end** (its chips now offer ↑ battlefield ·
↩ hand · ⚰ graveyard — player gy/exile hold full objects, so reanimate restores them); player gy gained
↩ hand; **enemy gy/exile** chips gained ✋ return-to-hand (a keyed card re-enters the deck **recastable**) and
⤴ tuck-to-library-top (the existing ▸ play / ⊘ exile / ↩ graveyard stay). Non-death; refreshes the deck-tools
modal via `dtRenderIfOpen`. **Verified:** gate · id-diff clean · **+6 jsdom assertions (32 total)**. *(Deferred:
direct enemy gy→battlefield — the ▸ play path already reanimates via the stack; and folding the one-off zone
fns into a single `moveCard` — cosmetic.)* **P9.1 is complete.**

### P9.2 — Change control (steal / give)

- **`changeControl(obj)`** moves a permanent across boards: enemy creature → `S.my.creatures` (Threaten/
  Mind Control), your permanent → `S.tokens` (Donate), **preserving** P/T, counters, keywords, tapped/sick.
  Sets a **⇄ controlled** marker + a reminder that control may end. A *"return control"* flips it back. (A
  stolen token still ceases per the token rules at the relevant step.)

### P9.3 — Per-permanent extras

- **Copy/clone:** "⧉ copy" makes a **token copy** of *this* permanent (stats/keywords/colour cloned,
  `token:true`, summoning-sick) on the same board — beyond today's blank-token quick-make.
- **Transform/flip:** for DFC permanents (P8.9 `faces`), a **⤺ flip** swaps the active face (P/T, types,
  text, colour) and logs it.
- **Status markers:** quick toggles for common metagame states (**goad · monarch · the initiative · can't
  block · day/night**) layered on the existing custom-`other` badges (one shared list, so the free-text
  `＋ctr` still covers anything exotic).
- **Direct damage to a creature:** a "⚔ deal N" quick action (deathtouch-/lethal-aware) for fights/pings,
  instead of hand-counting T−.

### P9.4 — Enemy hand & library completeness

Make the things the deck-tools model currently disclaims ("tutoring a card into play, casting from their
deck, transforming") representable:
- From a **library look / scry**, a card can move **→ hand / → battlefield / → graveyard / → exile** (tutor,
  reanimate, mill-with-choice), not only stay/bottom.
- From the **hand reveal**, a card can move **→ battlefield / → library / → exile** (cheat-into-play, bounce,
  exile).
- A **"make the enemy draw N"** control (inverse of discard) for forced-draw / wheel effects.
- Update the deck-tools disclaimer copy (it currently says these "simply don't apply").

### P9.5 — Instruction overhaul (do LAST — documents the finished game)

A thorough rewrite of `TUTORIAL_HTML` (+ the landing "How it plays" + the ⓘ `INFO_TEXT` entries) so the docs
match the shipped game **after Phase 8 + P9.1–P9.4**:
- The **role-play contract** sharpened: *the app is opponent + bookkeeper; for anything not auto-resolved you
  tell it what happened — and the new **move ▾ / control / copy / flip** tools now let you represent
  literally any board action.*
- **New in Phase 8:** the **combined Cast launcher** (library + Scryfall, lands excluded), **Create & Cast**
  for homebrew, decklist import, DFC face pick, the effect-review chips — and that **Quick Cast is gone**.
- **New in Phase 9:** the **universal move-to-zone toolbox** (bounce/tuck/reanimate/blink), **steal/give
  control**, **copy/flip**, **status markers**, the **richer deck tools**.
- Keep it **scannable** (the P7.6 sectioning), keep **villain names earned-only**, and re-verify every named
  control still exists (grep) so the tutorial never references a removed affordance.

### Acceptance criteria (Phase 9)

1. **Return to hand:** an enemy creature on the board is **returned to the enemy's hand** in one menu pick —
   it leaves the board, enters `S.hand`, and the AI can recast it. Your own permanent's "return to hand"
   removes it from the board with a clear log (you hold the physical card).
2. **Every zone reachable:** from any board permanent or zone chip the **move ▾** menu offers all and only
   the legal destinations (hand / library±pos / graveyard / exile / battlefield); your exile is no longer a
   dead end.
3. **Death semantics:** destroy/sacrifice fire death + Pit's-Tithe; **bounce/tuck/hand/library do not** —
   asserted by a driver counting Tithe fires.
4. **Control:** stealing an enemy creature moves it to your board with stats intact and a ⇄ marker; giving
   one back reverses it.
5. **Docs:** the tutorial covers Phase 8 + the new toolbox, names no unearned villain, and references no
   removed control (Quick Cast gone) — grep-checked.
6. **No regressions:** boot → full turn cycle → undo → autosave green; **id-set diff** shows only intended
   additions (and any retired one-off zone-button ids intentionally removed); existing one-tap shortcuts
   still work (they now delegate to `moveCard`).

### Verification

- **jsdom drivers:** `moveCard` over each (object × destination) pair on both boards (enemy bounce → `S.hand`
  recastable; tuck → `S.lib` at position; your exile → battlefield/hand/graveyard; enemy reanimate);
  `changeControl` round-trip with stat preservation; copy/flip/markers; the death-vs-bounce Tithe assertion.
- **Refactor safety:** assert the legacy shortcuts (`myGyReturn` etc.) produce identical state via the new
  `moveCard` path (no behavioural drift), plus **id-set diff** + the **syntax gate**.
- **Docs:** a string-presence test over `TUTORIAL_HTML` (Phase-8 + Phase-9 topic keywords; names no general),
  like the P7.6 driver.

### Open questions (Phase 9) — defaults assumed unless overridden

- **Menu vs buttons:** a single **move ▾** dropdown per object (less clutter) vs more one-tap shortcut
  buttons (faster, busier)? **Default:** dropdown for the full set + keep today's 2–3 most-used shortcuts.
- **Control-change duration:** auto-revert at end of turn, or purely manual? **Default:** manual (the player
  flips it back) with a reminder badge — consistent with the app's "you drive the timing" model.
- **Player hand/library stay physical:** confirm we **don't** model a player hand/library (returns just
  leave the app). **Default:** yes — only the enemy's hidden zones are modeled.

---

---

# PHASE 11 — Chapter I: Story Foundation (Level 1 re-lore) ✅ DONE (built, verified & merged — `0063a2e`)

**Goal.** Re-lore Level 1 ("re-lore, not rebuild") to establish Chapter I canon: the player is an **off-plane planeswalker** drawn to **Ashveil** with nothing to gain, descending the **Warren of Embers** to free **Commodore Guff** (caged founder of **the Conclave**) from the Ember-tyrant **Vael**. The marquee change is the victory flip — Vael does **not die**; his deathless **Ember** relights him elsewhere and he **flees weakened**, while Guff walks free. All text-only: new Arrival cutscene, a 3-beat victory chain, a Lore-page rewrite, and four framing strings.

**HARD OUT OF SCOPE (do not touch):** every `pool` / `lands` / `swaps` / `hp` / `cmd` / `pw` / `reborn` / `colors` field; the two-phase Vael fight mechanics (`bossDown()`, reborn/enrage, decks, stats); the warden-card `forEach` hidden-until-earned loop logic; Grakk/Murglax/Vael **intros, quotes, deathQuotes, lore, decks, stats** stay VERBATIM. Only **TEXT fields** and the listed `function` bodies (text/flow) are edited.

**Canon enforced across this phase:** `plane`/`Multiverse` only, never "realm" · player is deck-agnostic (no colors assigned to the player) · Vael deathless **because he forged the Ember**; bond is NEVER severed in L1 (that is L3) · the two on-board deaths = the Ember relighting him; the final fall = his **escape**, not his end · Guff is 100% sympathetic — no winks, cracks, or foreshadowing of his Level-4 turn · faction = "the Conclave"; "Drowned Conclave" = the L2 **place** only, framed as ally/cause, never a target · warden names stay hidden until beaten.

Verified anchors (current `C:\Users\trave\Documents\Guffs-Gauntlet\index.html`): `win()` = line 1790 · `lose()` = 1791 · `DUNGEON[2].epilogue` = 758 · `openLore()` = 1831–1839 · `proceedAfterCommander()` = 2109 (existing `if(!S._introShown){S._introShown=true; …}` guard) · resume forces `S._introShown=true` = 1960 · `SAVE_V=40` = 1935 · Engine eyebrows = 324 & 518 · header subtitle = 326 · how-it-plays item 7 = 339 · menu subtitle = 520 · tutorial loop `<p>` = 1880 · `villainCutOpts(room,quote)` = 1854 · `sw.js` `CACHE='gg-cache-v45'` = line 5 (comment line 2).

---

### P11.1 — Arrival opening cutscene
**Do:** Fire a new ARRIVAL cutscene once per descent **before** the Ember-Gate intro, then chain into it. Reuse the existing `S._introShown` once-per-descent guard (it is rebuilt falsy by `fresh()` each new descent and forced `true` only on resume at line 1960, which never calls `proceedAfterCommander()`), so **no new persisted field is needed** and there is no double-fire risk. Add a module-level `ARRIVAL_LINES` const beside `DUNGEON`. The Continue button's `on:()` calls the existing `showCutscene(DUNGEON[0].intro,…,"Ember Gate · Level I",…)`.

**Touchpoints:** `ARRIVAL_LINES` (new const), `proceedAfterCommander()` (line 2109), `showCutscene`, `villainCutOpts(DUNGEON[0])`.

**Canon enforced:** establishes outsider-nothing-to-gain, the deathless Ember **forged by its maker** (critic fix applied: "maker," not "keeper"), Guff caged as keystone, zero Guff foreshadowing, no Vael-death/escape content (reserved for victory). `<em>` only on the three load-bearing nouns.

`ARRIVAL_LINES`:
```js
const ARRIVAL_LINES=[
 "Your spark wakes between worlds and will not be argued with. A plea catches it — thin, far, the way water finds a crack — and drags you down through dark after dark to a plane you have never walked. <em>Ashveil</em>, where you have nothing to win and no reason to stay.",
 "The air reeks of old smoke. Beneath your boots the rock splits into a downward maze of goblin-fire and grave-cold, and at its heart a flame is burning that will not die. They call it the <em>Ember</em>; they call its maker Vael; and Vael has already won the war.",
 "Yet something dragged you to this exact wound, and now you know its name. Caged in the deep, in iron of Vael's own forging, the founder of the beaten Conclave still breathes — <em>Commodore Guff</em>. Free him, and a lost cause has its keystone again.",
 "You owe this plane nothing. You go down anyway. Below, the Ember Gate yawns open, breathing heat up into the cold."
];
```

Refactored `proceedAfterCommander()`:
```js
function proceedAfterCommander(){_cmdChooseActive=false;_cmdCreating=false;$("overlay").classList.remove("show");
  if(!S._introShown){S._introShown=true;
    showCutscene(ARRIVAL_LINES,"Nothing to Gain","Arrival · Ashveil","Descend into the Warren ▸",{
      sigil:'✦',accent:'var(--gold)',speaker:"the Conclave's plea",
      quote:"Find Guff. Free him. He is the last of us who can still build.",
      buttons:[{label:"Descend into the Warren ▸",cls:"big",on:()=>{
        if(DUNGEON[0].intro)showCutscene(DUNGEON[0].intro,DUNGEON[0].villain,"Ember Gate · Level I","Enter the gate ▸",villainCutOpts(DUNGEON[0]));
      }}]
    });
  }
}
```
*(Alternative only if a distinct persisted `S.arrivalSeen` is wanted instead of `S._introShown`: add `arrivalSeen:false` to the `fresh()` S-literal, append `'arrivalSeen'` to the migrate boolean-coerce `.forEach(...)` list, and bump `SAVE_V` per P11.7. The reuse-`_introShown` form above is preferred — fewer moving parts, no save-version churn, gate intro reachable ONLY via the arrival button.)*

---

### P11.2 — Vael death→escape: `win()` 3-beat chain (beat 1 = escape)
**Do:** Refactor `win()` into a chained `showCutscene` finale: **beat 1 escape → beat 2 Guff freed → beat 3 L2 bridge**. Keep `recordResult(true)`, `S.boss.life=0`, `lootRoll()`, `goldReward()`, `addGold()` at the **TOP** of `win()` (fire exactly once); capture `lr` and `gold` in closure. Attach `opts.spoils` to **beat 3 only** (where restart/quit live) so the styled spoils banner survives. **Re-lore the surviving `sys` log line** (both critics, MAJOR) so the log no longer prints "VAEL FALLS." Beat 1 reuses Vael's verbatim death-line as an **escape taunt/curse**. Restart/quit buttons move to beat 3.

**Touchpoints:** `win()` (line 1790), `lootRoll`, `goldReward`, `addGold`, `getGold`, `recordResult`, `showCutscene`, `restart`, `quitToMenu`; new TEXT fields `DUNGEON[2].vaelEscape` / `.guffFreed` and repurposed `.epilogue` (P11.3/P11.4).

**Canon enforced:** death→escape flip; survival-not-flex ("could not kill the deathless thing, only broke its hold here"); Ember stays Vael's; eyebrow carries no "Falls"/"dies"; loot/gold/record fire once (no double-fire inside callbacks).

Beat-1 TEXT field `DUNGEON[2].vaelEscape`:
```js
vaelEscape:[
 "You put Vael down a second time — and a second time the slag-throne should cradle a corpse. It does not.",
 "His own Ember will not let its maker end. Somewhere past the Warren's reach a flame catches, drags him out through the back of his own death, and leaves only heat-shimmer and the cold print of where a tyrant stood.",
 "You could not kill the deathless thing. You only broke its hold on this place — and that, tonight, is enough. The Warren's cages have gone quiet, and one of them is not empty."
],
```

Refactored `win()` (note the re-lored `sys` log — the MAJOR fix from both critics):
```js
function win(){if(S.over)return;S.over=true;sfx('victory');
  recordResult(true);S.boss.life=0;
  const lr=lootRoll();const gold=goldReward(S.roomIndex);addGold(gold);
  log("loot",`💰 You claim <b>${gold} gold</b> from the Tyrant's abandoned hoard (account balance ${getGold()}).`);
  log("sys",`🏆 <b>THE WARREN BREAKS — VAEL FLEES.</b> You could not kill the deathless thing; the Ember relit him beyond your reach. You broke his hold here — and freed the prisoner.`);
  render();const v=DUNGEON[2];
  /* BEAT 1 — Vael escapes */
  showCutscene(v.vaelEscape,"The Ember Keeps Its Own","The Tyrant slips the leash","Find Guff ▸",{
    sigil:'🔥',accent:'var(--ember)',speaker:'Vael',quote:"Embers... do not... choose... twice...",
    buttons:[{label:"Find Guff ▸",cls:"big ember",on:()=>
      /* BEAT 2 — Guff freed */
      showCutscene(v.guffFreed,"The Commodore Rises","The Cage Breaks · Level I","Climb out of the dark ▸",{
        sigil:'✦',accent:'var(--azor)',eyebrowAcc:'var(--gold)',speaker:'Commodore Guff',
        quote:"I did not call for a weapon. I called into the dark — and a friend answered. I will not forget which you chose to be.",
        buttons:[{label:"Climb out of the dark ▸",cls:"big ok",on:()=>
          /* BEAT 3 — L2 bridge (carries spoils + restart/quit) */
          showCutscene(v.epilogue,"The Long Way Back","Level I complete · The road ahead",null,{
            sigil:'✦',accent:'var(--gold)',eyebrowAcc:'var(--gold)',speaker:'Commodore Guff',
            quote:"The Conclave is not dead while one of us still stands. Walk with me.",
            spoils:`🎲 Spoils: ${lr.names.join(" + ")}!  ·  💰 +${gold} gold (account ${getGold()})`,
            buttons:[{label:"↻ Descend again",on:restart,cls:"big ok"},{label:"Quit to Menu",on:quitToMenu,cls:"big"}]
          })
        }]
      })
    }]
  });
}
```

---

### P11.3 — Guff-freed cutscene (beat 2 of `win()`)
**Do:** Store the beat-2 lines as a new TEXT field `DUNGEON[2].guffFreed`; rendered by the beat-2 `showCutscene` in P11.2 (accent `var(--azor)`, `eyebrowAcc:'var(--gold)'`, sigil `✦`, speaker/quote in `opts`).

**Touchpoints:** `DUNGEON[2].guffFreed` (new TEXT field), `win()` beat-2 callback.

**Canon enforced:** Guff magnificent/gracious/grateful, principled; off-plane outsider honored; "plane"/"off-plane" only; no Vael death and no Ember-severing here (he already fled in beat 1); zero foreshadowing — "I will not forget which you chose to be" is gratitude for the player's choice, not a self-hint.

`DUNGEON[2].guffFreed`:
```js
guffFreed:[
 "Past the guttering throne the Warren narrows to one last vault — grave-cold, lit only by dying goblin-fire. In a cage of ember-iron a broad-shouldered man waits: grey-bearded, seamed with old scars, and in all this dark he has not knelt.",
 "The lock yields to your spark. The bars fall away, and <b>Commodore Guff</b> rises to his full height — slow and certain, the way a tide is certain of its shore.",
 "He closes a broad, scarred hand around your wrist — not to be lifted, but to be certain you are real. He takes your measure — an outsider, off-plane, owed nothing on this burning ground — and bows his head to you all the same."
],
```

---

### P11.4 — L2-bridge epilogue rewrite (beat 3 of `win()`)
**Do:** **Replace** the existing `DUNGEON[2].epilogue` (line 758) text with the L2-bridge beat (this reuses the field so it does not go dead). Beat 3 carries the spoils banner + restart/quit (see P11.2). **Apply the anti-telegraph MAJOR fix:** the old "almost smiles … turned toward the deep water" enigmatic half-smile is removed; warmth is now unmistakable and grief-driven.

**Touchpoints:** `DUNGEON[2].epilogue` (replace TEXT only — leave any sibling stat fields on the row untouched), `win()` beat-3 callback.

**Canon enforced:** Vael lives, fled with the Ember to recover ("nurses his deathless Ember and waits to burn again") — no clean kill/flex; Ember stays his; Conclave = ally/cause ("a cause to put back together"), not a target; "Drowned Conclave" = the L2 **place**; L2 hook = the scattered generals; Guff hopeful/principled with no wink.

`DUNGEON[2].epilogue` (replaces line 758 text):
```js
epilogue:[
 "The Warren's fires gutter at your back, and for the first time in an age they warm nothing. <b>Guff</b> climbs free beside you, and the dark you carved through feels thinner now — a road out instead of a grave.",
 "Somewhere in the plane's deeper dark, <b>Vael</b> nurses his deathless <b>Ember</b> and waits to burn again. Let him. You have the founder at your side now, and a cause to put back together.",
 "Far below, in the cold halls of the <b>Drowned Conclave</b>, the remnant still holds — and its scattered generals wait to be found. Guff turns toward the deep water, and for the first time in an age the grief eases out of his face — something like hope settles there instead."
]
```

---

### P11.5 — Lore page rewrite (`openLore()`)
**Do:** In `openLore()` (lines 1831–1839) replace the premise `<p>` (1832) and the wardens lead-in `<p>` (1833) inside the opening `let h=` template; improve the merchant `h+=` (1837); insert two NEW `h+=` concept cards (Ember, Conclave/Guff) after the merchant card; and replace the L2 teaser `h+=` (1838). **Do NOT touch** the `DUNGEON.forEach` warden-card loop (1834–1836) — hidden-until-earned (`seen`, `???`, "A foe you have not yet faced", gated ART frame + lore) stays intact. New cards reuse `.loreent.has-art` + `.loreframe.locked` (glyph icon, no art). Keep the literal `<b>${who}</b>` token. Page title stays `📖 The Warren of Embers` (line 1831).

**Touchpoints:** `openLore()` template + `h+=` blocks only; `ART` guards reused; warden loop untouched.

**Canon enforced:** off-plane planeswalker, nothing to gain, drawn by the Conclave's grief; Ember = Vael's forged deathless flame (kill only relights him; bond intact in L1); Guff W/U/R, 100% sympathetic, zero foreshadow; faction = "the Conclave", "Drowned Conclave" = place; L2 flipped to cause-not-conquest; "plane"/"Multiverse" only. **Lead-in MINOR fix applied:** the absolute "You do not know their names yet" (which contradicted naming Vael on the same page) is replaced with "Their names are not given freely."

Premise `<p>` (replaces line 1832 — keep inside `let h=`):
```html
  <p style="color:var(--bone-dim);font-style:italic">You are <b>${who}</b> — a planeswalker from off this plane, with nothing to win on Ashveil and no reason to stay. But grief travels between worlds, and this one's had a name: <b>Commodore Guff</b>, founder of the Conclave — his war lost, his city drowned, himself caged alive beneath the throne of the tyrant who beat him. Ashveil belongs to <b>Vael</b> now, and he keeps it by fire, by fear, and by an ember that will not let him die. You crossed the Multiverse to break one good man out of the worst place on this plane. The only road to him runs down — into the Warren of Embers.</p>
```

Wardens lead-in `<p>` (replaces line 1833; ends `;` to close the template and thread into the loop):
```html
  <p class="manaline" style="margin:-2px 0 10px">Three wardens hold the dark between you and Guff's cage, each set there to make the next step down cost more than the last. Their names are not given freely — the Warren surrenders a name only to the one who beats it out of its keeper. The wardens of the descent:</p>`;
```

Merchant entry (replaces line 1837):
```js
  h+=`<div class="loreent has-art">${(typeof ART!=='undefined'&&ART.merchant)?`<div class="loreframe" style="--acc:var(--gold)" onclick="openArt('merchant','The Wandering Merchant')" title="Open The Wandering Merchant — full art in a new window"><img src="${ART.merchant}" alt="The Wandering Merchant"><span class="lf-hint">⤢ view</span></div>`:`<div class="loreframe locked"><span>?</span></div>`}<div class="lorebody"><div class="loretitle">The Wandering Merchant <span class="lorecol">[?]</span></div><div class="loredom">Between the gates</div><div class="loretext">No one sells torches to people walking into a fire — unless the torches are the point. The Merchant keeps no name and is always one step further down than you last saw them, trading the gold of the dead back to the living. Spend it freely: gold is the one thing the Warren cannot take back from you.</div></div></div>`;
```

NEW — Ember card (insert after merchant, before L2 teaser):
```js
  h+=`<div class="loreent has-art"><div class="loreframe locked"><span>🔥</span></div><div class="lorebody"><div class="loretitle">The Ember <span class="lorecol">[the deathless flame]</span></div><div class="loredom">Vael's forged masterwork</div><div class="loretext">Vael's masterwork, and his leash. He forged the Ember with his own hands — a flame that does not consume and does not gutter, fed on death the way lesser fires are fed on wood. It is the well of his power and the root of his deathlessness: smith and fire are bound as one thing, so while the Ember burns, Vael cannot truly be killed. Cut him down and it only lights him again, somewhere the killing did not reach.</div></div></div>`;
```

NEW — Conclave/Guff card (insert after the Ember card):
```js
  h+=`<div class="loreent has-art"><div class="loreframe locked"><span>⚓</span></div><div class="lorebody"><div class="loretitle">Commodore Guff &amp; the Conclave <span class="lorecol">[W/U/R]</span></div><div class="loredom">The caged founder · your cause</div><div class="loretext">Two powers warred for Ashveil, and the Conclave were the ones worth saving — keepers of law, of learning, of a stubborn decent hope — and they lost. Their capital sank; their armies scattered; their banner went under the water. Only their founder was taken alive: <b>Commodore Guff</b> — brilliant, gracious, unbowed — the keystone of everything the Conclave might still become. Vael did not kill him. He caged him in the Warren, where hope could be made to sit in the dark and watch. Free him, and the Conclave has a future again.</div></div></div>`;
```

L2 teaser (replaces line 1838):
```js
  h+=`<p class="manaline" style="margin-top:12px">Break the Warren and you still will not kill its tyrant — the Ember saves him, and <b>Vael</b> flees with his flame to heal in the deep. But <b>Guff</b> walks out at your side, and you carry him home to where the Conclave still breathes: a flooded ruin called the <b>Drowned Conclave</b>, Level II. Not a place to conquer — a cause to raise. There the real work begins: gathering the Conclave's scattered generals, one drowned road at a time.</p>`;
```

---

### P11.6 — Framing copy (4 line-for-line replacements)
**Do:** Replace four strings; indentation matches the target line so each is a literal paste. Every mechanical/teaching clause is preserved word-for-word — only story is added.

**Touchpoints:** menu subtitle (line 520, 6-space indent), header subtitle (line 326, 4-space indent), how-it-plays item 7 (line 339, 6-space indent), tutorial loop `<p>` (line 1880, column 0).

**Canon enforced:** off-plane planeswalker drawn by the Conclave's plight; Vael named only as the premise tyrant, deathless via the Ember "of his own forging"; objective = free Guff (sympathetic, no foreshadow); ending = "driven off, not slain" / "break his hold here"; names-hidden preserved (guardians unnamed; reveal phrasing scoped to "each warden"); "plane" only; Conclave = ally. *(Item 7 uses "generals" for the L1 **enemy** trio — the established correct use; see Open Questions re: ally-side "generals.")*

Menu subtitle (line 520):
```html
      <p class="subtitle">A solo Commander dungeon-crawl. You are an off-plane planeswalker, pulled to the plane of Ashveil by the Conclave's last cry — their founder, Commodore Guff, lies caged in the Warren of Embers, the downward maze of the tyrant Vael, who reigns by a deathless flame of his own forging. Build a library of your own cards, choose your difficulty, and descend to break Guff out. Three wardens hold the dark between you and his cage, and you learn each one's name only by beating it out of them.</p>
```

Header subtitle (line 326):
```html
    <p class="subtitle">One descent into the Warren of Embers to free the caged Commodore Guff — three wardens, no road back up. Each room is a fresh game against a foe you have not yet met — you declare attacks and it blocks; it strikes and you answer. Only your life and your loot carry deeper into the dark.</p>
```

How-it-plays item 7 (line 339):
```html
      <li><b>The descent:</b> you go down into the Warren of Embers to free <b>Commodore Guff</b>, the caged founder of the Conclave. Three generals bar the way to his cage — two wardens (a mono-red aggro warlord, then a mono-black attrition tyrant) and finally <b>Vael</b> himself, a red-black final boss and the only one fielding a planeswalker. You learn each warden's name only by beating it. Vael cannot be truly killed — the deathless Ember he forged keeps relighting him — but break his hold here and the founder walks free. Between rooms your <b>life and loot carry over</b>; the battlefield, counters, and the enemy reset to a fresh game, and your commander waits in the command zone. Tap <b>📖 Lore</b> or <b>❓ Tutorial</b> any time.</li>
```

Tutorial loop `<p>` (line 1880, column 0):
```html
<p>One <b>descent</b> is three encounters, each a fresh game against a different enemy general — a fire-wild aggro warlord, a patient attrition tyrant, and a red-black final boss. You descend to free <b>Commodore Guff</b>, founder of the Conclave, caged at the Warren's heart. <b>You learn each warden's name only by beating it.</b> Between rooms the battlefield, the enemy, and your counters reset, but your <b>life, loot, and gold carry over</b> — life is the through-line that makes the crawl a campaign. Clear all three to free Guff and win Level I — the final boss is driven off, not slain, for the Ember he forged will not let him die.</p>
```

---

### P11.7 — Housekeeping
**Do:**
- **SW cache bump:** `sw.js` `const CACHE='gg-cache-v45'` → `'gg-cache-v46'` (line 5) and the version mention in the comment (line 2); update `README` (~line 62) v45→v46 if present. Required so returning PWA users get the new HTML.
- **SAVE_V:** Using the preferred P11.1 approach (reuse `S._introShown`, no new persisted field), `SAVE_V` stays **40** and the two "Engine v40" eyebrows (lines 324, 518) stay. **Only if** a persisted `S.arrivalSeen` (or any new persisted S field) is added: bump `SAVE_V` 40→41, update both Engine eyebrows to v41, and add the field to `fresh()` + the `migrate()` boolean-coerce list (keep S JSON-serializable).
- **No dead fields:** `DUNGEON[2].epilogue` is **reused** for beat 3 (P11.4); beats 1 & 2 are the new `.vaelEscape` / `.guffFreed` TEXT fields. No `pool`/`lands`/`swaps`/`hp`/`cmd`/`pw`/`reborn` edited anywhere.
- **Mobile:** confirm the lengthened menu subtitle (line 520, ~2× prior length) does not overflow the menu box on a narrow viewport.
- **Run the verification harness** (below).

**Touchpoints:** `sw.js`, `README`, `SAVE_V` (1935), eyebrows (324/518), `fresh()`, `migrate()`, `DUNGEON[2]`.

---

### Acceptance criteria (Phase 11)
1. New game: Arrival cutscene ("Nothing to Gain" · "Arrival · Ashveil", gold/✦) shows **once**; its Continue chains into the existing "Ember Gate · Level I" intro. It does not re-show after resume or on subsequent rooms; it re-shows on a fresh descent.
2. Descent 1–3 (Grakk, Murglax, Vael) intros/quotes/deathQuotes/lore/decks/stats are **byte-identical** to pre-phase.
3. Vael two-phase fight is mechanically unchanged (dies once, revives enraged, second kill).
4. On the second Vael kill: the `sys` log reads the new "THE WARREN BREAKS — VAEL FLEES" line (NO "VAEL FALLS" anywhere); then the **3-beat chain** plays escape → Guff freed → L2 bridge.
5. Beat 1 reuses "Embers... do not... choose... twice..." as the escape taunt; ember/🔥. Beat 2 = Guff freed (azor/✦). Beat 3 = L2 bridge (gold/✦) and is the ONLY beat with the **spoils banner** and the **↻ Descend again / Quit to Menu** buttons.
6. `lootRoll()`, `goldReward()`/`addGold()`, `recordResult(true)` fire **exactly once** (verify gold delta and stats increment by one); no double-fire in any beat callback. Loot items still log via the loot channel; the styled spoils banner renders on beat 3.
7. Lore page: new premise + Ember + Conclave/Guff cards render; warden cards still show `???` / "A foe you have not yet faced" (+ locked art) for unbeaten wardens and reveal correctly once beaten; lead-in reads "Their names are not given freely…"; L2 teaser frames the Conclave as a cause, not a conquest.
8. Final L1 line (beat 3, line 3) contains **no "almost smiles"** and no enigmatic/withheld beat aimed at the deep water — warmth is unambiguous.
9. Framing: menu subtitle, header subtitle, item 7, tutorial loop all updated; all prior mechanical clauses intact; ending described as "driven off, not slain".
10. Full-text sweep: zero occurrences of "realm"; the faction is "the Conclave" (never "Drowned Conclave"); "Drowned Conclave" appears only as the L2 place; no Guff foreshadowing anywhere.
11. `sw.js` is `gg-cache-v46`; restart-difficulty + resume-from-autosave paths still work.

### Verification (Phase 11)
- **Static / canon lint (scripted):** grep the file for `realm` (expect 0); `VAEL FALLS` (expect 0); `Drowned Conclave` (each hit is a place, never the faction); `almost smile` (expect 0); confirm `gg-cache-v46` in `sw.js`. Confirm no diff touched any `pool`/`lands`/`swaps`/`hp`/`cmd`/`pw`/`reborn`/`colors` line (diff review).
- **Node/jsdom harness (extend the existing P8–P10 suite):** assert `ARRIVAL_LINES.length===4`, `DUNGEON[2].vaelEscape.length===3`, `.guffFreed.length===3`, `.epilogue.length===3`; assert Grakk/Murglax/Vael `intro`/`quote`/`deathQuote`/`lore` strings unchanged vs. a saved snapshot; simulate `win()` and assert `recordResult`/`addGold`/`lootRoll` each called once and `spoils` is present on the third `showCutscene` call only; assert `proceedAfterCommander()` shows the Arrival cutscene when `!S._introShown` and chains DUNGEON[0].intro via the button, and is a no-op when `S._introShown`.
- **Manual smoke:** new descent → Arrival → gate; clear all three; verify the 3-beat finale, spoils banner + restart/quit on beat 3, and the re-lored log; open 📖 Lore before/after beating each warden (hidden→revealed); resume-from-autosave does not replay Arrival; narrow-viewport check of the menu subtitle.

### Open questions (Phase 11)
1. **"generals" collision (narrative + technical MINOR, deferred):** the game uses "enemy general" for room bosses, yet the brief/chosen copy calls the Conclave's allies "scattered generals" (beat 3 + Lore L2 teaser). Kept "generals" per brief; surrounding cues ("Not a place to conquer — a cause to raise," "the remnant still holds") disambiguate. Option to reserve "general" for enemies by renaming the ally-side to "**captains**" in those two lines — approve before applying.
2. **Menu-subtitle name softening (narrative MINOR, not applied):** the menu names Vael while saying "learn each one's name only by beating it out of them." This is the mild, non-absolute form and the brief requires naming Vael in the menu, so left as-is. Optionally soften to "…and the Warren gives up a name only to the one who beats it out of its keeper." — confirm preference.
3. **Lore premise names Vael above his hidden `???` card (technical MINOR, accepted):** sanctioned by the brief (Vael is the headline tyrant, not an earned reveal); do NOT unhide his card (that would leak his art + earned lore). Flagging only.
4. **Arrival guard choice:** spec'd to reuse `S._introShown` (no save-version churn). Confirm we do not want a distinct persisted `S.arrivalSeen` (which would force the `SAVE_V`→41 + Engine-eyebrow bump in P11.7).
5. **Loot-log wording:** changed to "Tyrant's **abandoned** hoard" to fit the escape (he fled, left it). Confirm acceptable vs. original "Tyrant's hoard."

# PHASE 12 — UI & card-mechanic upgrades (collapsible panels · combat block-restrictions · clone) ⬜ PLANNED

**Specced 2026-06-29, NOT built.** Three independent, additive features. All hooks grounded in the current `index.html` (re-grep names; line numbers drift). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**STATUS-table rows (now slotted into the table at the top of this doc — kept here too for reference):**
```
| **Phase 12 — UI & card-mechanic upgrades** | ⬜ **PLANNED** — collapsible tab panels · combat block-restrictions (+ Scryfall auto-parse + mechanic audit) · enter-as-a-copy clone |
| &nbsp;&nbsp;P12.1 Collapsible boxes inside tabs | ✅ DONE & verified |
| &nbsp;&nbsp;P12.2 Block-restriction infrastructure + mechanic audit | ✅ DONE & verified |
| &nbsp;&nbsp;P12.3 Enter-as-a-copy (clone) with on-board picker | ✅ DONE & verified |
```

## P12.1 — Collapsible boxes inside tabs

**Goal:** every box (panel) inside a tab can expand/collapse. On a fresh load the **first (main) box of each tab is open and the rest are closed** — e.g. in the Action tab, **Turn flow** is open while **Your attack**, **Tools**, and **Battles & Planes** start closed. A tab that contains **only one box is left unchanged** (no collapse chrome).

**Current structure (grounded):**
- Tabs: `const TABS=['info','action','enemy','player']` (~2379). `buildTabs()` (~2381) reparents `.panel` nodes into `.tab` shells; `applyTabs()` (~2396) toggles `.collapsed` on each `.tab` from `S.ui.tabs[k]`; `toggleTab(k)` (~2397).
- **Precedent to mirror:** the Dungeon Log's own collapse — `S.ui.logExpanded`, `applyLog()`/`toggleLog()` (~2399-2400), `#logToggle` button (HTML ~486), CSS `.log.expanded #log` (~117-118). Reuse this exact shape one level down (per-panel instead of per-log).
- **Panel inventory (boxes per tab):**
  - **Info** (2): the You/Boss vitals duo (`grid.duo`, ~362-383) · Dungeon Log (`#logBox`, ~486).
  - **Action** (4): Turn flow (~475-484) · Your attack (~429-435) · Tools (~448-465) · Battles & Planes (`#battlesPanel`, ~467-473).
  - **Enemy** (4): Enemy's creatures (~393) · Planeswalker (`#pwPanel`, ~385) · Enemy artifacts/enchantments/emblems (~399) · Enemy's zones (~405).
  - **Player** (3): Your board (~415) · Your zones (`#myZonesPanel`, ~437) · Enchantments in play (`#rulesPanel`, ~445).
  - NOTE: all four tabs currently hold multiple boxes, so the "single-box tab stays unchanged" rule is **future-proofing** — encode it (skip the toggle when a `.tab` has exactly one `.panel`).

**How:**
1. Give every collapsible `.panel` a stable `id`/`data-panel` (several already have ids; add to the ones that don't: the You/Boss duo, Turn flow, Your attack, Tools, Enemy's creatures, Your board). Hide content below the `<h2>` when collapsed — either wrap each panel body in `.panelbody`, or CSS `.panel.collapsed > :not(h2){display:none}`.
2. State: `S.ui.panels = {[panelId]: open(bool)}`. When empty, compute defaults from DOM order within each `.tab`: first `.panel` open, the rest closed.
3. `togglePanel(id)` — flip `S.ui.panels[id]`, `applyPanels()`, `scheduleAutosave()` (mirrors `toggleTab`).
4. `applyPanels()` — toggle `.collapsed` on each known panel; call from `render()` right after `applyTabs()` (~1226) and from `buildTabs()` init.
5. UI: add a chevron toggle into each panel `<h2>` (reuse the `#logToggle` look + CSS rotation); clicking the header toggles. Single-`.panel` tabs: no chevron.
6. Persist: backfill in `migrate()` (~2021) — `if(!s.ui.panels||typeof s.ui.panels!=='object')s.ui.panels={};`.
7. Coexistence: panels already hidden when empty (`#pwPanel`, `#myZonesPanel`, `#rulesPanel`) keep that `display:none` behavior — collapse only affects a *shown* panel.
8. **Info-duo decision:** treat the You+Boss `grid.duo` as the single "main" box of the Info tab (always open — core vitals stay visible); only the Dungeon Log collapses. (Rejected alt: independently collapse You vs Boss — a half-collapsed side-by-side grid looks broken and hides vitals.)

**ACs:** fresh load → first box of each multi-box tab open, rest collapsed; toggles persist across reload (autosave/migrate); single-box tabs show no chevron; empty `display:none` panels stay hidden; the You/Boss duo never breaks layout.
**Verify:** jsdom — default first-open-per-tab, `togglePanel` flips+autosaves, `applyPanels` sets `.collapsed`, migrate backfill; id-diff (only new panel ids); syntax gate.

## P12.2 — Combat block-restriction infrastructure (+ Scryfall auto-parse + mechanic audit)

**Goal:** model cards blockable only by a certain NUMBER of creatures — the menace family: **"can't be blocked except by N or more creatures"** (min blockers) and **"can't be blocked by more than N creatures"** (max blockers). Auto-detect from Scryfall oracle text, surface/edit in card details, enforce in combat for both sides, and fold the existing menace handling into it.

**Data model:** add `block:{min:N|null, max:N|null}` to the creature object + `cfg.props.block`. Helpers:
- `minBlockers(c) = (c.block&&c.block.min) || (kw(c,'menace')?2:1)` — menace folds in as min 2.
- `maxBlockers(c) = (c.block&&c.block.max) || Infinity`.
Round-trip the field wherever the other per-permanent props go: `cmdObjFromCfg` (~2170), `resolvePlayerItem` creature branch (~1679), `saveBoardToLibrary` (~2161), `buildImportedCard`/import (~2289), `migrate` backfill (default null).

**Enforcement (grounded):**
- **Player blocking — `combatAdd(attId)` (~1120):** before pushing a blocker, if `assign[attId].length >= maxBlockers(att)` → reject + `log("sys", …"can be blocked by at most N")`. Hard cap.
- **Min/menace at approve time:** when the player approves combat, a creature with `minBlockers>1` blocked by `1..(min-1)` is an ILLEGAL partial block → warn and refuse approval until it is blocked by `≥min` or by `0`. This **finally enforces menace in the player UI too** (today menace is only enforced for the AI — see audit).
- **`legalBlock(att,b)` (~971):** optional secondary guard (reject when already at max). Keep the primary cap in `combatAdd`.
- **AI blocking — `aiBlocks` (~1051-1065):** replace hardcoded `const need=kw(att,'menace')?2:1` with `const need=minBlockers(att)` and respect `maxBlockers(att)` when committing blockers — so when the PLAYER's attacker carries a restriction, the enemy honors it.
- **`resolveAttack` (~972):** no change — resolves whatever assignment passes the gates.
- **Combat UI — `renderCombat`/attacker row (~1103/1111):** show the restriction next to the attacker (`[blocked by 2+]`, `[max 1 blocker]`).

**Scryfall auto-parse — `inferEffects` (~2278):** add regexes → `out.props.block` (+ a small `word2num` for one…five and digits):
- `/can't be blocked except by (\w+) or more creatures/` and `/can only be blocked by (\w+) or more creatures/` → `block.min`.
- `/can't be blocked by more than (\w+) creatures?/` → `block.max`.
- Leave `menace` as the recognized keyword (don't double-count — the helper already maps it to min 2).

**Card-details UI:** add a "blocked by min/max" pair of number inputs to `castFormHTML` (~1709, permanent-properties area) and the live `creatureDrawer` (~1269); read into `cfg.props.block` in `readCastForm` (~2137). Import-review chips (`scryRow` ~2341) auto-show the parsed restriction.

**"Don't leave out any mechanic" — full coverage audit (from the 3-agent research).** The block-restriction family is the headline build; this table records EVERY card mechanic's status so nothing is silently dropped. Legend: ✅ modeled+parsed · ◐ partial · ⬜ gap.
- **Evasion:** flying ✅ · reach ✅ · menace ✅ (→ unified into min) · **can't-be-blocked-except-by-N ⬜→BUILD** · **can't-be-blocked-by-more-than-N ⬜→BUILD** · can't-be-blocked / unblockable ✅ (kw) · lure ◐ (parsed as kw but NOT enforced) · shadow / horsemanship / skulk / daunt / landwalk / fear / intimidate ⬜ (rare — model later as conditional block-eligibility, else manual note).
- **Combat:** trample / deathtouch / first & double strike / lifelink ✅ · vigilance ◐ (label only, no attack-without-tapping logic).
- **Static/defensive:** defender ✅ · indestructible ✅ · hexproof ✅ · protection ✅ · ward ✅.
- **Other:** haste ✅ in engine but **MISSING from `KW_LIST` (~583)** though present in `RECOGNISED_KW` (~2254) → add to KW_LIST · "can't attack" ⬜ (only "can't block" exists) · flash ⬜ · enters-tapped ⬜ · prowess ⬜ · goad ◐ (manual marker, not parsed) · draw / tutor one-shots ⬜ (not parsed).
- **Scoped INTO P12.2 (so the block-adjacent set isn't "left out"):** (a) the two block-count families (core); (b) add `haste` to `KW_LIST`; (c) enforce **lure** ("all creatures able to block this do") at approve time — require every legal untapped player blocker to block a lure attacker; (d) add **"can't attack"** alongside "can't block" (parse + gate in `vaelAttackers` ~1076 and the your-attack picker). Everything else (shadow/flash/enters-tapped/prowess/goad-parse/draw-tutor) is **cataloged above as an explicit deferred backlog** — listed, not silently omitted.

**ACs:** a min-2 creature can't be approved blocked by 1 (player) and the AI won't single-block it; a max-1 creature can't get a 2nd blocker assigned; importing a "can't be blocked except by two or more" / "can't be blocked by more than one creature" card auto-fills `props.block` and the chip shows it; menace still works via the unified helper; the field round-trips through save/library/import.
**Verify:** jsdom — `minBlockers`/`maxBlockers`; `combatAdd` cap; AI honors min/max on a player attacker; `inferEffects` parses each phrasing → `props.block`; round-trip; menace parity; syntax + id-diff.

## P12.3 — Enter as a copy of an on-board permanent (clone)

**Goal:** a card can be set to **enter as a copy of a permanent already on the battlefield** (the MTG Clone mechanic). On resolve, a **popup lists the copyable on-board permanents**; the player picks one and the card enters as a copy of it. **Legendary permanents are NOT copyable unless the player ticks "copy won't be legendary" in the popup** — the copy then enters non-legendary, sidestepping the legend rule.

**Current building blocks (grounded):**
- `copyPermanent(scope,id)` (~1030) already deep-copies a board permanent as a TOKEN clone (new id, `token:true`, `sick:true`, `isCmd:false`) — reuse its copy logic.
- Player spells resolve into play via `resolvePlayerItem(p)` (~1678); `legendary` lives on `cfg.props.legendary` and on board objects; cast-form toggles `castLeg`/`castTok`/`castDef` are the pattern for a new toggle. Permanents live in `S.my.creatures/artifacts/enchants/walkers` (yours) + `S.tokens` and `S.cmd` (enemy).

**How:**
1. **Cast-form flag:** add a "⧉ enters as a copy" toggle to `castFormHTML` (~1709) → `cfg.props.clone=true` via `readCastForm` (~2137). Applies to creature / artifact / enchantment / planeswalker card types.
2. **Resolve hook:** in `resolvePlayerItem` (~1678), if `pr.clone`, skip building from cfg and call `openClonePicker(p)`.
3. **Picker popup `openClonePicker(p)`** (reuse the overlay/modal): list every on-board permanent — "Your permanents" (`S.my.creatures/artifacts/enchants/walkers`) and "Enemy permanents" (`S.tokens` + `S.cmd` when `inPlay`) — each row: name · type · P/T or loyalty · legendary badge · "⧉ copy" button. A top checkbox **"copy won't be legendary"** (`#cloneNoLeg`). Legendary rows: copy button DISABLED unless `#cloneNoLeg` is ticked (hint: "legendary — tick 'copy won't be legendary' to clone"). No copyable permanents → "nothing on the battlefield to copy" + an "enter as a plain card / cancel" choice.
4. **On pick `cloneInto(p, scope, id, noLeg)`:** deep-copy the chosen permanent's COPIABLE characteristics (name, p/t + baseP/baseT, kw, color, abilP/abilA, prot, cward, catk, dies, strength, kind) into a NEW player permanent of the matching array; `legendary = noLeg ? false : target.legendary`; reset non-copiable state (`plus/minus=0, other=[], tapped:false, sick:true, isCmd:false, _controlled:false`) and **`token:false`** — unlike `copyPermanent`, the clone is a REAL permanent so it routes to graveyard/exile on death. Log "⧉ <card> enters as a copy of <target>"; then `checkLose();renderPlays();render()`.
5. **Legend rule:** because legendaries are only copyable as non-legendary, a clone never triggers the legend rule — no extra handling. (A future "legendary copy" opt-in + manual legend-rule resolution is out of scope.)

**ACs:** a creature card with "enters as a copy" → on resolve, popup lists on-board permanents; picking a non-legendary creature makes the card enter as a 1:1 copy (summoning-sick, untapped, non-token, dies to graveyard); legendary targets unselectable until "copy won't be legendary" is ticked, after which the copy enters non-legendary; empty board → graceful "nothing to copy" path; the copy is independent (later buffs to the original don't affect it).
**Verify:** jsdom — clone flag round-trips; resolving a clone card opens the picker (overlay shown + permanents listed); `cloneInto` yields a non-token copy with copied P/T+kw and reset counters; legendary gating (button disabled → enabled with `noLeg`, result `legendary:false`); empty-board path; syntax + id-diff.


# PHASE 13 — Symmetric enemy board: enemy-card editing + first-class artifacts/enchantments + deeper automation ⬜ PLANNED

**Specced 2026-06-29, NOT built.** Two additive features the user asked for after P12. Grounded in the current `index.html` (re-grep names; line numbers drift). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**STATUS-table rows (already slotted into the table at the top of this doc — kept here for reference):**
```
| **Phase 13 — Full enemy-card editing + deeper persistent-effect automation** | ⬜ **PLANNED** — modify the enemy's spells/cards (keywords·P/T·counters·markers·stack-edit) at full parity with your own toolbox · fuller enemy artifact/enchantment automation |
| &nbsp;&nbsp;P13.1 Edit enemy permanents & stack spells (owner-agnostic editor) | ⬜ planned |
| &nbsp;&nbsp;P13.2 Fuller enemy artifact/enchantment automation | ⬜ planned |
| &nbsp;&nbsp;P13.3 Enemy artifacts/enchantments as first-class board permanents | ⬜ planned |
```

## P13.1 — Modify the enemy's spells & cards (parity with your own toolbox)

**Goal:** as the game's bookkeeper the player can edit the ENEMY's cards the same way they edit their own — give/remove **keywords**, adjust **P/T**, add/remove **counters** and **status markers**, rename/retype, and **edit a spell while it is on the stack** — covering enemy permanents (`S.tokens`, `S.cmd`) and enemy spells on the stack (`S.plays`). Today the player can take-control / copy / damage / move-zone an enemy creature (P9.2–P9.4) but **cannot edit an enemy card's intrinsic characteristics in place, nor touch a spell mid-stack**.

**Grounded building blocks:**
- Player-permanent editors already exist in the per-permanent drawer: `toggleKwMy`/`kwSelect` (keywords), `cp`/`adjMy` (P/T), `cctr`/`cctrCustom`/`remCtr` (counters), `toggleMarker` (markers on `obj.other`), `resetCard`. These currently assume a player object in `S.my.*`.
- Enemy permanents: `S.tokens` (keyless spawned bodies — guard `FX[c.key]&&` on any FX read), `S.cmd` (enemy commander). The enemy creature row + `.cmdbox` already render and host the P9 actions (⇄ take, ⧉ copy, ⚔ damage, ↩ move).
- The stack is `S.plays` (both sides while resolving), rendered by `renderPlays`; items carry a `cfg`-shaped body + `cantCounter`/`auto`/keywords.

**How:**
1. **Owner-agnostic editor `editPermanent(scope,id)`** — extract the drawer's edit controls into a shared core that mutates any object (`setKw(obj,kw,on)`, `setPT(obj,dp,dt)`, counter/marker helpers) regardless of which array it lives in. The existing player drawer calls into it unchanged; add `S.tokens`/`S.cmd` as valid scopes.
2. **Entry points:** an **✎ edit** control on each enemy board creature row, the enemy `.cmdbox`, and each enemy artifact/enchantment/emblem row.
3. **Stack editing:** in `renderPlays`, add **✎ edit** on each stack item (either side) → open `castFormHTML` bound to that item (or a compact inline editor) to change keywords / P/T / `auto` / `cantCounter` / note **before it resolves**; re-render the stack. The player keeps the existing "can't-be-countered" affordance.
4. **Log** every edit (principle #5: silent mutations are bugs). `S.tokens`/`S.cmd`/`S.plays` already serialize → round-trips through save/undo for free; no schema bump, no migrate.

**ACs:** give an enemy creature flying → it shows and combat/AI honor it; add a +1/+1 counter or a marker to an enemy permanent; edit an enemy spell on the stack to add "can't be countered" or change its P/T before resolution; player-side editing is byte-for-byte unchanged; every edit round-trips through undo + save.
**Verify:** jsdom — `editPermanent` mutates an enemy token's kw/PT/counters; a stack-item edit changes `S.plays[i]` and the resolved board result; player-drawer regression; syntax gate + id-diff (only new ✎ controls).

## P13.2 — Fuller enemy artifact/enchantment automation

**Goal:** extend the enemy persistent-effects system so MORE of each artifact/enchantment's behavior is automated, with anything that can't be modeled clearly flagged as a manual reminder (so nothing is silently dropped). Today auto effects = `enemyGain`/`youLose`/`enemyDraw`/`enemyMana`/`buffEnemyCreatures` firing **once on the enemy upkeep** via `fireEnemyEmblems` (~1496); anthem/menace/custom are manual.

**Grounded building blocks:** `S.emblemsEnemy` (each `{kind∈artifact|enchantment|emblem, auto:{k,n}, autoOn, vsYou, note}`), templates `ENEMY_EMBLEMS`/`ENEMY_FX_KINDS`, `addEnemyEmblem`/`setEnemyEmblem`/`toggleEmblemAuto`/`toggleEmblemVsYou`, `fireEnemyEmblems` (iterates the whole array on upkeep), `migrate()` backfill. The existing anthem precedent applies a **continuous** buff via `_tp/_tt` in `effP/effT`.

**How:**
1. **More auto templates:** add common effects — `tokenEachUpkeep` (spawn a token via `applyRun`), `enemyScry`, `damageYou` (=`youLose` framed as damage), `youMill`/`youDiscard`-reminder — each tagged with the `kind` it usually belongs to (label-only).
2. **Trigger windows:** add a `trigger∈{upkeep,endStep,yourUpkeep}` field (default `upkeep`); `fireEnemyEmblems` is invoked from the matching step hook. Backwards-compatible (missing → `upkeep`).
3. **Static (continuous) effects:** a `static:true` entry (e.g. "+1/+1 to all enemy creatures", "your creatures get −1/−0") contributes in the **render/`effP` path each frame** (like the anthem `_tp/_tt`), not fire-once — so the AI/combat always see the modified stats.
4. **Attach-to-permanent auras:** allow an enchantment entry to carry an `attachId` targeting one enemy creature; its bonus applies to that creature only and the aura **falls off (logged) when the creature leaves** (checked in render/cleanup).
5. **Manual-reminder fallback (explicit):** when an effect can't be auto-modeled, the row keeps its reminder text and shows a **"⚠ apply manually"** badge — documented as the deliberate catch-all so no card behavior is silently lost.

**ACs:** an artifact "each upkeep you lose 2" auto-fires on the right step; a `static` "+1/+1 to all enemy creatures" shows on every render and combat/AI use the buffed stats; an aura attached to one enemy creature buffs only it and detaches on its death; non-modelable effects show the ⚠ manual badge; all new fields round-trip through save + `migrate` backfill.
**Verify:** jsdom — each new auto template fires on its trigger; static buff reflected in `effP/effT`; aura attach/detach; manual-reminder fallback present; migrate backfill; syntax gate + id-diff.

## P13.3 — Enemy artifacts & enchantments as first-class board permanents (symmetric enemy board)

**Goal:** the enemy's artifacts and enchantments behave like **normal MTG cards / any other spell** — real permanents on a board that mirrors the player's, NOT special entries in the persistent-effects tracker. An enemy enchantment or artifact can be **cast onto the stack, resolve onto the enemy battlefield, and then be returned to hand (bounced), destroyed, exiled, moved to any zone, copied, controlled, or edited** exactly like an enemy creature or any player permanent. The whole enemy board becomes **symmetric with the player's**.

**Why / current gap:** today enemy artifacts/enchantments live ONLY in `S.emblemsEnemy` (the persistent-effects/emblem panel, each tagged `kind`) — display+automation entries, NOT real permanents — so the universal move/destroy/zone toolbox (P9.1 `moveBoardCard`/`moveCard`) and per-card editing (P13.1) can't touch them. Enemy creatures (`S.tokens`), the enemy walker (`S.pw`), and the commander (`S.cmd`) are already real board objects; artifacts/enchantments are the asymmetry to close. **This task partially supersedes the P13.2 representation:** P13.2's automation rides on these real permanents instead of standalone tracker rows.

**Grounded building blocks:**
- Player parity to mirror: `S.my.artifacts`, `S.my.enchants` (real permanents, full toolbox), rendered in the Player tab.
- The universal owner-aware zone engine `moveBoardCard(obj,to)`/`moveBoardById(scope,id,to)`/`moveZoneCard` (P9.1) already routes enemy creatures to the modelled `S.hand/lib/gy/exile`.
- Enemy real-object precedent: `S.tokens` flows cast (`applyRun` `case "spawn"`) → board → death/move; replicate for non-creature permanents. `dtPlayCard` (P6.5) already puts an enemy card on the stack.

**How:**
1. **New enemy permanent arrays** `S.enemyArtifacts` / `S.enemyEnchants` (parallel to `S.tokens`), holding real permanent objects (player-permanent shape: name/type/kw/color/`other`/markers; keyless like `S.tokens` → guard `FX[c.key]&&`). Add to `fresh()`, save/`stripJSON`, and `migrate()`.
2. **Render** them on the **Enemy board** in their own panels mirroring the player's artifact/enchant panels, each row hosting the full action set: ↩ return-to-hand · ⤓ move-to-zone · ✖ destroy→gy/exile · ⧉ copy (P9.3) · ⇄ take-control (P9.2) · ✎ edit (P13.1).
3. **Lifecycle:** an enemy artifact/enchant cast routes through the stack like any spell (player can respond/counter) then resolves onto its array. Destroy/bounce/move reuse the **P9.1 engine** with the SAME rules as enemy creatures (enemy → modelled zones; tokens cease off-battlefield; death fires Pit's Tithe, bounce/tuck do not).
4. **Reframe the tracker:** `S.emblemsEnemy` keeps **true emblems** (not permanents, can't be destroyed); **artifacts/enchantments become real permanents** (this task). A real enemy artifact/enchant may still carry **automation** (P13.2: auto-on-upkeep / static buff / attach-to-creature) as a property on the permanent, active only while it is on the battlefield. `migrate()` converts existing `S.emblemsEnemy` artifact/enchant entries into real permanents (carrying `auto`/`note`/`vsYou`), leaving genuine emblems behind.
5. **No special-casing:** every toolbox action that works on an enemy creature (or the player's own artifact/enchant) now works on enemy artifacts/enchants identically.

**ACs:** an enemy enchantment can be bounced to the enemy's hand, destroyed to its graveyard, exiled, tucked into the library, copied, taken control of, and edited — identical to an enemy creature; casting an enemy artifact puts it on the stack (player can respond) before it resolves; a destroyed enemy artifact routes to the enemy graveyard and can be reanimated (P9.1/P9.4); existing saves migrate emblem artifact/enchant entries to real permanents without losing automation; true emblems still live in the tracker; player board behavior unchanged.
**Verify:** jsdom — enemy artifact/enchant create→stack→resolve→board; each toolbox action (bounce/destroy/exile/move/copy/control/edit) on an enemy enchant matches the enemy-creature path; migrate converts old emblem artifact/enchant entries (auto preserved) and leaves emblems; round-trips through save/undo; syntax gate + id-diff.


# PHASE 14 — Fixes & QoL: combat-damage prevention, bulk tools, enemy-card normalization ⬜ PLANNED

**Specced 2026-06-29, NOT built.** Eight requested fixes/QoL items, grounded in the current `index.html` (re-grep names; line numbers drift — line 456 is the base64 `ART` blob, real JS 457→end). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review). **P14.3 and P14.8 reinforce/refine the already-planned P13.3** (enemy artifacts/enchantments as first-class permanents) — read them together; P13.3 is the architecture, P14.3/P14.8 are the requirements layered on it.

## P14.1 — Enemy commander shows as "undefined" in the attackers popup (BUG)

**Goal:** when the enemy commander attacks, the attackers popup + combat logs show its real name, not "undefined".

**Root cause (grounded):** the enemy commander `S.cmd` stores its name in **`.n`** (built ~811: `S.cmd={id:'cmd',n:room.cmd.n,…}`), while enemy creatures `S.tokens` and player creatures use **`.name`**. `vaelAttackers()` (~1096) pushes `S.cmd` into the attacker list, but `renderCombat()` (~1131) and the combat logs read `${a.name}` → `undefined` for the commander.

**How:** add a name accessor (e.g. `cnm(c)=c.name||c.n||'creature'`, or reuse an existing helper if one fits) and use it everywhere combat renders/logs an attacker/blocker/dead creature — pure display/log change, no schema/state touch:
- `renderCombat()` attacker label (~1131) — **PRIMARY**.
- `predictCombat()` dead list (~1146).
- `approveCombat()` per-attacker log + losses (~1152, ~1160-1161, ~1177-1178).
- `vaelCombat()` "holds back …" (~1619).
Player creatures keep `.name`; the fallback is a no-op for them.

**ACs:** enemy commander attacks → popup + logs show its name; held-back-by-tax log names it; it dies in combat → loss log names it; tokens/player creatures unchanged.
**Verify:** jsdom — push `S.cmd` into a combat and assert the rendered/logged name === `S.cmd.n`; a token attacker still uses `.name`; syntax + id-diff.

## P14.2 — Prevent combat damage dealt BY and/or dealt TO any creature (Fog Bank)

**Goal:** any creature (enemy **or** player) can be flagged to prevent all combat damage it would **deal** and/or all combat damage dealt **to** it — Fog Bank = both. Player-controlled bookkeeping on either board.

**Grounded building blocks:** combat math is `resolveAttack()` (~992-1011); `predictCombat()` (~1142) mirrors it for the preview. The per-permanent status-marker system already exists — `STATUS_MARKERS` (~1051), `toggleMarker` (~1052), `markerRow` (~1057) renders a toggle per marker for **both** boards (P9.3); markers live in `obj.other` (round-trips for free). `effP/effT` (~925-926); `hasProtFrom` already early-returns for protection.

**How:**
1. Add two markers to `STATUS_MARKERS` (~1051): e.g. `'deals no combat dmg'` and `'prevents combat dmg to it'`. They auto-render as toggles in `markerRow` for every creature on both boards (no UI code).
2. Helper `hasMarker(c,m)=(c.other||[]).includes(m)`.
3. Gate inside `resolveAttack()`:
   - attacker outgoing (~996): if `hasMarker(att,'deals no combat dmg')` → `out=0` (no face/trample/blocker damage; lifelink keys off `out` so it also zeroes).
   - blocker death (~1000): a blocker that `hasMarker(b,'prevents combat dmg to it')` isn't killed (takes 0; deathtouch deals 0 → survives). Trample still **assigns** lethal over it per MTG before trampling.
   - blocker strike-back (~1006): if `hasMarker(b,'deals no combat dmg')` → its `bp=0` (no `defLifelink`).
   - attacker death (~1007): if `hasMarker(att,'prevents combat dmg to it')` it can't die to combat damage (ignores blocker deathtouch, since damage is 0).
4. Mirror the same gates in `predictCombat()` so the preview matches the resolution.

**Interactions to honor:** deathtouch (0 damage → no kill), trample (prevented damage still "assigned" so it doesn't trample through a damage-prevented blocker), lifelink (no damage → no gain), first/double strike (ordering unchanged, damage 0). Indestructible stays independent.

**ACs:** a both-flagged creature deals and takes no combat damage (Fog Bank) — survives a deathtoucher, blocks without dying and without killing; a "deals no dmg" attacker hits face for 0; flags work on player **and** enemy creatures and the prediction matches resolution; markers round-trip through save/undo.
**Verify:** jsdom — each gate in `resolveAttack` + `predictCombat`; deathtouch/trample/lifelink interactions; both boards; round-trip; syntax + id-diff (only 2 new marker toggles).

## P14.3 — Enchantments are normal permanents; enemy special abilities bug-free (no special cards outside the deck)

**Goal:** (a) enchantment cards like **Warren War-Banner** are treated as **normal enchantments** (real permanents dealable like any card), not bespoke `S.rules` entries; (b) confirm/enforce that enemies have **no special cards outside their deck** — only their deck cards, **items** (e.g. a Vael "ember stone" concept), and special **abilities**; (c) audit the enemy special abilities (**Resurgence** et al.) so they work without bugs.

**Grounded findings:**
- `warbanner` (~649) is `type:'enchant'` whose `run:['rule','Warren War-Banner','Your upkeep: lose 2 life.',0]` resolves (applyRun `case 'rule'`, ~971) into an `S.rules` entry (the "Enchantments in play" `#rulesPanel`, ~445) — **not** a destroyable/bounceable enemy permanent — and it's excluded from the graveyard at resolve (~1696). Several enemy `enchant`/`artifact` cards behave this way (`run:['rule'|'bossrule'|'ramp',…]`).
- **Resurgence** is the hardcoded empty-board 1/1 spawn in `vaelMain` (~1612: `if(which===1&&S.tokens.length===0&&!S.cmd.inPlay&&!summonedCmd&&!S.plays.some(p=>p._enemyCmd&&…)) applyRun(["spawn",rn,1,1,…])`) — an **ability**, not a card or a literal `resurgent` keyword. "Warren Overrun" (`overrun` ~656, the until-EOT anthem cleaned up at ~1624-1625), Pit's Tithe (`bloodpactAmount` ~1013), and `cmdBuff` are other ability-shaped effects.

**How:**
1. **Enchantment normalization** — route enemy (and player) enchantment/artifact *cards* through the **P13.3** real-permanent path (`S.enemyEnchants`/`S.enemyArtifacts`) instead of the `run:['rule']`→`S.rules` shortcut. The card becomes a destroyable/bounceable/copyable permanent; its persistent effect rides on the permanent (P13.2 automation) and falls off when it leaves. Keep `S.rules` **only** for genuine non-card rules (battle/plane house-rules); collapse the duplicate enchantment representation (see P14.8). This item is the *requirement*; P13.3 is the architecture that delivers it.
2. **Enemy special-ability audit** — review hardcoded enemy abilities for bugs: Resurgence (~1612 — fire **once per turn**, never through a pending commander cast, never double-spawn, correct color fallback), the Warren Overrun anthem cleanup (~1624-1625), Pit's Tithe (~1013), `cmdBuff`. Fix anything found; add jsdom coverage.
3. **No special cards outside the deck** — confirm no code path hands the enemy a card not built by `buildDeck` (~818); enemy extras are limited to items + abilities. (A "Vael ember stone" item, if desired, is a **data-driven boss item/ability**, not a card — modeling it is out of scope here; record the pattern.)

**ACs:** an enemy enchantment card can be destroyed/bounced like any permanent (via P13.3); Resurgence fires exactly once on an empty board and never double-spawns or fires through a pending commander; no enemy card originates outside the deck; existing saves keep the War-Banner effect after migration.
**Verify:** jsdom — Resurgence single-fire guard; an enchantment resolves to a real permanent (P13.3), not a stray `S.rules` row; ability-audit regression; syntax + id-diff. (Cross-ref P13.2/P13.3, P14.8.)

## P14.4 — Give counters (and counter types) to cards in bulk

**Goal:** apply a counter — +1/+1, −1/−1, or a named/custom type — to **many** permanents at once (all your creatures / all enemy creatures / all creatures / all permanents), instead of one card at a time.

**Grounded building blocks:** counters live on the object — `c.plus` (+1/+1), `c.minus` (−1/−1), `c.other[]` (named/custom, shared with markers). Per-card helpers: `myctr` (~1442), `myctrCustom` (~1443), `cctr` (~1447), `cctrCustom` (~1448), `remCtr` (~1449), `cmdCtr` (~1455); generic accessor `getObj` (~1274). `effP/effT` (~925-926) read plus/minus. The Tools panel (HTML ~448-465) and **Boardwipe** (~1471-1481 — already a bulk board op with skip-token/skip-legendary) are the precedent + home.

**How:**
1. `bulkCtr(target, kind, n)` — loop the chosen arrays (`S.my.creatures` / `S.tokens` / +`S.cmd` when `inPlay`) and apply: `kind==='plus'|'minus'` → `o[kind]=(o[kind]||0)+n`; named → push the type to `o.other` n times. `target ∈ {yours, enemy, all-creatures, all-permanents}`.
2. UI: a "Bulk counters" row in the Tools panel (near Boardwipe ~457) — target select + type select (+1/+1, −1/−1, or custom text) + qty + apply.
3. One summary log line (e.g. `✦ +1/+1 on 5 creatures.`); single `render()` at end. No schema change (counters already on objects → round-trips free).

**ACs:** bulk +1/+1 raises `effP/effT` on every targeted creature; a custom counter is added to each; yours/enemy/all targeting works; one log line; round-trips through undo/save; `remCtr` still removes one at a time.
**Verify:** jsdom — `bulkCtr` mutates plus/minus/other across the target set; `effP/effT` reflect it; summary log; round-trip; syntax + id-diff.

## P14.5 — Item duration is fixed at 1 descent; the player can't set item reminders/duration (BUG)

**Goal:** every passive/reminder satchel item lasts **exactly one descent**; remove the player's ability to change that (the ⏳ duration stepper). Reminders/duration on items are not player-set.

**Grounded findings:** `satchelHTML()` (~2461-2465) renders, for passive/reminder items, a `durRow` with `invDuration(i,-1)` / `invDuration(i,1)` steppers (~2463); `invDuration()` (~2467) mutates `it.descents`. Items are created `descents:1` (`grantBoon` ~1490; `applyPendingPurchases` ~1862). `carryInvForward()` (~1860) carries `descents>1` to the next descent — the path that lets a player-bumped item persist. The satchel intro copy (~2462) tells the player to "set the ⏳ duration to keep a passive across more descents." (`BOONS[id].t` oracle text is fixed, not player-editable — leave it.)

**How:**
1. Remove the `durRow` steppers in `satchelHTML()` (~2463); replace with read-only text "⏳ lasts 1 descent".
2. Delete `invDuration()` (~2467) and its call sites.
3. Force `descents=1`: hard-set in `grantBoon` (~1490) and `applyPendingPurchases` (~1862); clamp in `migrate()` (any `it.descents>1` → 1) so old saves normalize.
4. Update the satchel intro copy (~2462) to drop the "set the duration" line.
5. `carryInvForward()` (~1860) becomes a no-op (nothing >1) — keep with a clarifying comment, or inline-retire; don't break `restart()`/`startNewDescent()`.

**ACs:** every item shows "lasts 1 descent" read-only; no +/- stepper; items never carry to the next descent; old saves with `descents>1` normalize to 1; consumables/instants unaffected; `BOONS` oracle text unchanged.
**Verify:** jsdom — `satchelHTML` emits no `invDuration` call; `grantBoon`/`applyPendingPurchases` yield `descents===1`; `migrate` clamps >1; `carryInvForward` returns `[]`; syntax + id-diff. **Resolves the P7.4 open question.**

## P14.6 — Return the whole board / all creatures to hand (tokens deleted)

**Goal:** one action to return all creatures (or all permanents) to hand; tokens can't go to hand → they **cease to exist**.

**Grounded building blocks:** the P9.1 zone engine — `moveBoardCard(obj,to)` (~1031) / `moveBoardById` (~1040): commander → `sendCmdToZone` (command zone, ~1032); token → ceases (~1034); enemy card → `S.hand.push(_movedCard)` (~1035); player card → "returns to your hand" log then leaves the app (no `S.hand` object). `Boardwipe` (~1471) is the bulk precedent (`slice()`-loop + summary log). Player arrays `S.my.{creatures,artifacts,enchants,walkers}`; enemy `S.tokens` (+ `S.cmd`).

**How:**
1. `returnAllToHand(scope, what)` — `what ∈ {creatures, permanents}`, `scope ∈ {yours, enemy, both}`. Loop `slice()` copies of the relevant arrays and call `moveBoardCard(obj,'hand')` on each (tokens cease automatically; commander → command zone via the `isCmd` branch, **or** skip — pick one and log it).
2. UI: a "Return to hand" row in Tools (near Boardwipe ~457) — `what` + `scope` + ↩ button.
3. **NON-death** (no `killMy`/`removeRef`) → no Pit's Tithe / death triggers. One summary log: `↩ Returned N to hand (M tokens ceased).` Single `render()`.

**ACs:** return-all-creatures bounces every non-token creature (yours logs+leaves; enemy → `S.hand`), tokens cease, no life change / no death triggers; return-all-permanents also handles artifacts/enchants/walkers; commander handled deliberately (command zone or skipped) and logged; collapses to one undo step.
**Verify:** jsdom — the loop bounces all; tokens removed without graveyard; `S.myGy/myExile` untouched; life unchanged; enemy cards land in `S.hand`; one undo step; syntax + id-diff.

## P14.7 — Browse the enemy's whole library, searchable by card TYPE

**Goal:** view the enemy's **entire** library and filter it by card **type** (land / creature / enchant / artifact / sorcery / instant) — not by name — with the existing tutor/move actions on each card.

**Grounded building blocks:** the deck-tools modal — `openDeckTools`/`deckToolsHTML` (~842/858), state `_dt={mode,n,reveal,scry,payMana}`; today it only "Looks at top/bottom N" (`dtLook` ~896). `fxItem(c,actions)` (~860) renders a card row with a `.typechip` from `FX[key].type`; `dtMoveObj`/`dtRevealMove` (~900/906) move a card to hand/board/gy/exile/lib. FX types are `'creature'|'sorcery'|'instant'|'artifact'|'enchant'|'land'` — **note `'enchant'`, not `'enchantment'`.**

**How:**
1. New `_dt.mode='browse'` branch in `deckToolsHTML` (+ `_dt.typeFilter`): list **all** of `S.lib` with type-filter buttons showing counts; render each via `fxItem` with the existing move actions. Pass the **real** index `S.lib.indexOf(c)` (not the filtered index) to the move handlers.
2. Entry: a "📖 Browse library" button in the main deck-tools row (~881-891).
3. Hidden-info: an explicit "🔀 Shuffle & back" (peeking the whole library shuffles on exit); log the browse. View-only — no new game-state arrays.
4. Board action: enabled for creatures (spawn path) and — once P13.3 lands — artifacts/enchants; hidden/disabled for sorcery/instant/land.

**ACs:** open browse → see the full library, grouped/filterable by type; switching the filter narrows the list; each row can tutor the card to hand/gy/exile/lib (and board for creatures); the correct card moves (right index); exiting shuffles + logs.
**Verify:** jsdom — browse lists all `S.lib`; the type filter subsets correctly; move uses `S.lib.indexOf`; shuffle-on-exit; syntax + id-diff. (Refines P9.4; orthogonal to P13.3.)

## P14.8 — Emblems addable by either side; enemy artifacts/enchantments are enemy-cast cards (not player-added)

**Goal:** mirror MTG — **emblems** may be added by either side (keep the player-add affordance for emblems). Enemy **artifacts and enchantments** are **cards the enemy plays** through the normal lifecycle; the player does **not** add them via the tracker. Remove the duplicate artifact/enchant representation.

**Grounded findings (the "broken code that duplicates artifacts gameplay"):** the emblem adder lets the player create enemy artifacts/enchantments as tracker rows — the `#embKind` selector (HTML ~401) offers Enchantment / Artifact / Emblem; `addEnemyEmblem()` (~1409) stores `kind` into `S.emblemsEnemy`; `ENEMY_FX_KINDS` (~1427) groups by artifact/enchantment/emblem. Meanwhile an enemy enchantment **card** resolves via `run:['rule']` → `S.rules` (a separate panel), and an enemy artifact **card** resolves via `run:['ramp']` → just `S.bossMana` with no permanent. So an enchantment can exist in **two** places at once (player tracker row + `S.rules`), and artifacts have no real permanent — exactly the P13.3 asymmetry.

**How:**
1. **Restrict the adder to emblems (immediate, pre-P13.3):** drop the enchantment/artifact `<option>`s from `#embKind` (~401); hardcode `kind='emblem'` in `addEnemyEmblem` (~1409-1414); reduce `ENEMY_FX_KINDS` (~1427) to the emblem group; simplify `renderEnemyEmblems`/`rmEnemyEmblem` accordingly. Emblems stay addable by either side.
2. **One representation for artifacts/enchants (P13.3):** enemy artifact/enchant **cards** become real permanents (`S.enemyArtifacts`/`S.enemyEnchants`) via cast→stack→resolve, dealable like any card (bounce/destroy/move/copy/control/edit); the `run:['rule']`/`['ramp']` shortcut stops creating duplicate `S.rules`/tracker state for cards. `migrate()` converts old `S.emblemsEnemy` artifact/enchant rows into real permanents (carrying `auto`/`note`/`vsYou`), leaving true emblems in the tracker.
3. `S.rules` narrows to genuine non-card rules; the **enemy** plays its own artifacts/enchants (AI / `dtPlayCard`), not the player.

**ACs:** the emblem adder offers **only** emblem; emblems still addable by both sides; the player can no longer create enemy artifact/enchant tracker rows; an enemy enchantment/artifact exists as exactly one real permanent (no duplicate `S.rules` + tracker); old saves migrate emblem artifact/enchant rows to real permanents with automation intact; true emblems stay in the tracker.
**Verify:** jsdom — `#embKind` has only the emblem option; `addEnemyEmblem` always `kind='emblem'`; no duplicate representation for a resolved enchantment; `migrate` converts old rows; syntax + id-diff. (Forms the requirement layer for P13.2/P13.3; pairs with P14.3.)

## P14.9 — The enemy reliably proposes a stack response (BUG)

**Goal:** when the player casts a spell, the enemy actually offers its P4.2 stack-response proposal whenever it has a meaningful instant-speed play — today it almost never appears.

**Root cause (grounded):** `enemyRespondToCast(item)` (~1769) builds candidates via `buildEnemyCandidates` (~1768) — which only accepts `fx.type==='instant'` cards (enemy decks are creature/sorcery-heavy, so the pool is often empty) — then scores each with **`bestTargetThreat`** (~1787), which returns **0 for every non-targeted instant** (burn/heal/spawn/rule). The gate `if(!cands.length||(cands[0].value||0)<enemyActThreshold()){S.stackProposal=null;return;}` (~1770) then suppresses anything below the act bar (3 std / 2 brutal / 4 easy), so a 0-value burn/heal response is never proposed. Main-phase casting uses `castValue` (~1569), which DOES value burn/heal/spawn — the response path is inconsistent with it.

**How:**
1. In `buildEnemyCandidates` (~1768), value each candidate with **`castValue(fx,{item})`** instead of `bestTargetThreat` — non-targeted instants then get their real value (a 2-damage bolt → 2), matching `vaelMain`.
2. Relax the gate (~1770) to mirror `vaelMain` (~1605): **always offer a non-targeted response that does something; only HOLD a *targeted* response below the act bar** — e.g. `const best=cands[0]; if(!best){S.stackProposal=null;return;} if(best.target&&(best.value||0)<enemyActThreshold()){S.stackProposal=null;return;}`.
3. Keep `enemyInstantWouldDo` (~1773) target-validity so the enemy never proposes a fizzle; ensure the `enemyInstant` window path (item=null) still works (no crash). Optionally a brief "⚡ {enemy} has no response" log so the player sees the system ran.

**ACs:** casting while the enemy holds an affordable instant (targeted removal that answers a real threat, OR any non-targeted burn/heal) surfaces the proposal box; the enemy still HOLDS a weak targeted removal with no good victim; difficulty still scales via `enemyActThreshold`; no fizzles.
**Verify:** jsdom — give the enemy a non-targeted burn instant, player casts → `S.stackProposal` is set + `renderStackProposal` shows it; a low-value targeted removal with no target stays held; `enemyInstant` window path (item=null) no crash; syntax + id-diff.

## P14.10 — Enemy mana comes only from lands it plays (+ de-duplicate the mana code)

> **⤴ SUPERSEDED / FINALIZED by P17.1 (Phase 17).** The user has now *decided* the balance tradeoff this task flagged: the enemy starts with **zero** mana, the anti-screw scrounge floor is **removed**, and mana grows **only** by playing land cards — paired with a 7-card opening hand + a mulligan-on-too-few-lands so the lands-only rule is playable. The grounded mana-path audit below stays as reference; build the rule per **P17.1**, the de-duplication parts here still apply.

**Goal:** the enemy's mana derives **solely from land cards it has played** — remove the non-land mana sources and consolidate the fragmented/duplicate mana logic.

**Grounded audit (every mana path):**
- **Legit (a land was played):** `playEnemyLand()` (~1523-1525, the per-turn land + anti-screw scrounge) and the `dtPlayCard` land branch (~852) each do `bossLands++ / bossMana++ / bossManaMax++`; the enemy-untap refill in `vaelUntap` (~1521) sets `bossManaMax=bossLands(+bossManaMod)` then `bossMana=bossManaMax`.
- **NOT from a land (to remove/rework):** (1) the **pre-seed** at `enterRoom` (~814) `S.bossLands=max(0,(room.landStart||0)+(DIFF[S.diff].manaBonus||0))` → free pre-developed mana (room `landStart` 1/2/3 + difficulty `manaBonus` −1/0/+1); (2) **ramp rocks** `run:["ramp",N]` (~966, obol/altar) which add mana AND inconsistently bump `bossLands`; (3) the **`enemyMana` emblem** ("Ramp +1 mana") in `emblemEffect` (~1422), which adds mana but NOT `bossLands`.
- **"Double code":** a **`bossMana()` FUNCTION** (~922 — a display-only next-turn projection `bossLands+bossManaMod+(willLand?1:0)`) coexists with the **`S.bossMana` state FIELD** — leftover from the function→field refactor; confusing and easy to misread. Ramp's `bossLands++` vs the emblem's non-`bossLands` add are inconsistent. `bossManaMod` is an admin modifier (keep); `bossManaFrozen` is the freeze (keep).

**How:**
1. **Lands are the only thing that grows `bossLands`.** Keep `playEnemyLand`/`dtPlayCard`-land + the `vaelUntap` refill (`bossManaMax=bossLands(+bossManaMod)`, `bossMana=bossManaMax`) as the whole engine.
2. **Remove the pre-seed:** at `enterRoom` (~814) start `bossLands=bossManaMax=bossMana=0`; drop `room.landStart` (rooms ~739/745/751) and `DIFF.manaBonus` (~582) as mana levers. Move difficulty scaling off mana onto the already-explicit HP knobs (P10) / luck / land draw — **flag as a balance decision (confirm with the user).**
3. **Ramp rocks (obol/altar):** under the rule they're non-land mana → either remove them from the decks or reclassify as real lands. **Flag for the user** (mana rocks are arguably legit MTG); default per the rule = remove/neutralize their mana.
4. **Remove the `enemyMana` emblem template** (~1401/1422) — non-land mana.
5. **De-duplicate:** delete or clearly rename the `bossMana()` projection function so it can't be confused with the `S.bossMana` field (e.g. `projectedBossMana()`, used only for the player-turn display at ~1198/1231-1232/1646); make any kept path consistent; `usableMana()` stays the single affordability accessor.
6. **migrate:** for old saves, recompute `bossLands` to reflect lands-only (don't inflate from a stale `bossManaMax`).

**ACs:** the enemy begins a room with 0 mana and grows its pool only by playing lands (+ the anti-screw floor); ramp rocks and the mana emblem no longer grant free mana (per the chosen option); difficulty no longer changes starting mana; exactly one source of truth for current mana (`S.bossMana`/`usableMana()`), no shadowing function; freeze still works; old saves migrate without inflated mana.
**Verify:** jsdom — fresh room → `bossMana===0` until a land is played; playing a land raises usable mana by 1; ramp/emblem no longer add mana (per option); no `bossMana()` function shadowing the field; freeze/thaw intact; migrate; syntax + id-diff. **(Balance tradeoff: removing manaBonus/landStart scaling + ramp is significant — confirm the difficulty re-tune with the user before building.)**


# PHASE 15 — Economy, rewards & difficulty balance ⬜ PLANNED

**Specced 2026-06-29, NOT built.** Requested QoL/economy/balance items, grounded in the current `index.html` (re-grep; `BOONS`/`STORE`/`DIFF` are single long lines). Spec text only; build later behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

## P15.1 — End-of-level gold wheel-spin

**Goal:** on clearing the level (final boss), the player spins a wheel that lands on a gold reward — a **percentage** of a base amount (most slices), **double** gold (small chance), or a **rare/legendary item** (very small chance).

**Grounded building blocks:** the level-clear path — `bossDown()` (~1493, per-room: `lootRoll()`+`goldReward()`+`addGold()`+`showEncounterClear()`), `win()` (~1822, final Vael victory). `goldReward(roomIdx)` (~802) = `12+roomIdx*10` ×`goldMult`. `addGold`/`getGold` (~2096-2097). `grantBoon(id)` (~1490) + `BOONS`. `lootRoll`/`LOOT_D20` (~804/1491 — the d20 range-tuple weighting pattern to mirror). `showEncounterClear` (~1990) / the victory popup host the UI.

**How:**
1. Define a weighted `WHEEL` table (mirror `LOOT_D20` range tuples) over a d100, e.g.: 1-25 → 50% gold · 26-55 → 100% · 56-78 → 150% · 79-90 → **2× gold** (small) · 91-97 → **random rare item** · 98-100 → **random legendary item** (very small). Percentages are of a `wheelBase` (reuse/scale `goldReward` for the level).
2. `spinWheel()` — roll, pick the slice, apply: gold slices → `addGold(round(base*pct))`; double → `addGold(base*2)`; item → `grantBoon(pickByRarity('rare'|'legendary'))`; log in the loot channel; single render. (`Math.random` is fine in the game; only workflow scripts forbid it.)
3. UI: a wheel overlay (reuse the modal/overlay infra) with a short spin animation landing on the slice, then "claim ▸" → the victory popup. Degrade gracefully (no animation → instant result).
4. Hook at **end of level = `win()`** (the Vael clear). *(Open question: also give each room-clear `bossDown` a smaller wheel, or only the level end? **Default: level-end only**; per-room keeps the existing loot+gold.)*

**ACs:** beating the final boss opens the wheel; it lands on a slice and applies exactly that reward (gold to the profile, or an item to the satchel); double + item slices are rare; result logged; the victory popup follows; the headless path applies a result without animation.
**Verify:** jsdom — `spinWheel` over a stubbed roll hits each slice type and calls `addGold`/`grantBoon` correctly; ranges are contiguous and cover 1-100; the wheel fires on `win()`; syntax + id-diff.

## P15.2 — Store & loot overhaul (fix Tonic of Vigor · legendary rarity · variety · gold tuning)

**Goal:** fix the Tonic-of-Vigor/Spark duplication, add a **legendary** rarity tier, broaden item variety across categories and rarities (some categories lack rare/legendary items), and tune gold prices.

**Grounded findings (current matrix):** `BOONS` (~783) = 16 items, rarities only **common/uncommon/rare** (no legendary). **Tonic of Vigor** (`tonic`, uncommon consumable, "+5 max life, heal 5", STORE 16g) is a near-duplicate of **Spark of Vigor** (`spark`, uncommon instant, "+5 max life, heal 5"). `STORE` (~785-801): Potions (5, all healing), Utility (6, **no rare**), Relics (4, all 20-44g, **no low-cost entry**). Rarity is read in only 3 places — `grantBoon` log (~1490), `renderStore` CSS class (~2196), `satchelHTML` (~2461, only `r==='rare'` gets a class). `goldReward` (~802) `12+roomIdx*10` ×goldMult (0.8/1/1.3); STORE costs 6-44g.

**How:**
1. **Fix Tonic of Vigor** — make it a distinct, stronger heal: `tonic:{n:"Tonic of Vigor",r:"legendary",kind:"consumable",t:"Restore 20 life and +5 maximum life."}`; `useBoon` case → `S.youMax+=5; adjLife('you',20);`; STORE cost ~28g (or wheel/loot-only). Keep `spark` as the uncommon "+5 max/heal 5" instant. (Ladder: spark +5/+5 · elixir heal 15 · tonic heal 20 +5 max.)
2. **Legendary tier** — add `'legendary'` as a recognized rarity: `satchelHTML` class for `r==='rare'||r==='legendary'` (+ a `.item.legendary` / `.storeitem.legendary` CSS with a distinct accent); loot/wheel can grant legendaries; keep them scarce (wheel/jackpot or premium-store only).
3. **More items / fill gaps** — add several new `BOONS` to broaden each category and rarity, grounded in existing `useBoon`/`grantBoon` mechanisms (flag which need a new `useBoon` case). Target a fuller matrix: every category has ≥1 rare, plus a few legendaries as chase items. (Research-suggested seeds: a damage Potion, a lower-cost stacking-ward Relic, a draw Utility reminder, a deploy-buff Relic, 1-2 legendaries — finalize names/effects at build.)
4. **Gold tuning** — set a rarity→price band: common 5-8g · uncommon 12-20g · rare 18-34g · legendary 36g+ (or non-store). Adjust outliers (e.g. pyre 24→20). Keep the `goldReward` curve but verify a player can afford ~1-2 commons/uncommons per room and save for a rare across a couple rooms.

**ACs:** Tonic of Vigor no longer duplicates Spark (different effect + rarity); a legendary item renders with its own styling in satchel + store; each store category has ≥1 rare and the matrix has no empty rare cells; new items resolve via `useBoon`/`grantBoon` without error; prices follow the rarity bands and round-trip through `buyStore`/`p.pending`.
**Verify:** jsdom — every `BOONS` id resolves (use/grant) without throwing; legendary styling applied; STORE prices within bands; Tonic = heal 20 + 5 max; syntax + id-diff.

## P15.3 — Persist unused satchel items across runs (profile stash)

**Goal:** unused satchel items are no longer lost when a run ends — they persist on the profile and return next descent. *(The earlier "show the satchel button in the menu" idea is **dropped** — the in-game You-panel satchel stays exactly as-is.)*

**Grounded findings:** today `win()` (~1822)/`lose()` (~1849) end a run and `clearSave()` (~2061) wipes the live save; `S.inv` unused items are simply lost. Only `descents>1` items survive via `carryInvForward` (~1860). Merchant purchases use the profile `p.pending` bucket applied at descent start by `applyPendingPurchases` (~1862). Profiles come from `blankProfile` (~2045); `migrate` (~2064) backfills.

**How:**
1. Add `stash:[]` to `blankProfile` (~2045) + `migrate` backfill (`if(!Array.isArray(p.stash))p.stash=[]`).
2. `saveUnusedItems()` — at run end, move remaining `S.inv` (the `{id,descents}` shape) into `p.stash`; call it in `win()` and `lose()` **before** `clearSave()`.
3. `applyStashItems()` — at descent start, pour `p.stash` back into `S.inv` (after `applyPendingPurchases`) and clear it; call from `restart`/`startNewDescent`.
4. Reconcile with the satchel-lock model: stash items (looted, kept) auto-apply like `carryInvForward`; stack/merge identical consumables in the satchel UI if desired. No menu button.

**ACs:** finishing a run with unused items keeps them — they reappear in the satchel on the next descent; a fresh profile has `stash:[]`; old saves migrate; consumables aren't double-counted vs `p.pending`/`carryInvForward`; the in-game satchel button placement is unchanged.
**Verify:** jsdom — unused `S.inv` → `p.stash` on win/lose **before** `clearSave`; `applyStashItems` restores them next descent and empties the stash; migrate backfill; round-trips through save; syntax + id-diff.

## P15.4 — Difficulty-scaled healing on descend

**Goal:** when clearing a room and descending to the next boss, heal a fraction of the player's MISSING HP, gated by a per-difficulty HP% threshold.

**The rule (authoritative):**
- **Easy:** heal **1/2** of missing HP, only if current HP **< 70%** of max.
- **Normal (std):** heal **1/3** of missing HP, only if current HP **< 50%** of max.
- **Brutal:** heal **1/4** of missing HP, only if current HP **< 25%** of max.

**Grounded building blocks:** `advance()` (~1494) is the sole room-transition path (`freshGameForDungeon()`→`enterRoom(next)`, then the "your life carries over" log). `DIFF` (~582) holds per-difficulty knobs. `adjLife('you',n)` (~1458) heals and caps at `S.youMax`. Game start/restart use `enterRoom(0,true)` (not `advance`), so they never heal — full life as intended; no double-heal with the P10 Vael-win `map→heal10` guard (that's loot on the final win, a different path).

**How:**
1. Add `descentHealFrac` + `descentHealThreshold` to each `DIFF` entry (easy `.5/.7`, std `.333/.5`, brutal `.25/.25`) — or a small `DESCENT_HEAL` table keyed by difficulty.
2. In `advance()` (~1494) right after `enterRoom(next)`: `const k=DIFF[S.diff]; if(S.youMax>0 && S.youLife/S.youMax < k.descentHealThreshold){ const heal=Math.floor((S.youMax-S.youLife)*k.descentHealFrac); if(heal>0) adjLife('you',heal); }` — `adjLife` caps at max; log "🌿 You recover {heal} between descents."
3. Use strict `<` on the threshold; `floor` never overheals.

**ACs:** descending while below the difficulty threshold heals the right fraction of missing HP (never above max); at/above the threshold heals nothing; only fires on room transitions (not game start/restart); each difficulty uses its own frac+threshold; no conflict with the Vael-win heal.
**Verify:** jsdom — per-difficulty: below threshold heals `floor(missing*frac)`, at/above heals 0, cap respected; `advance` triggers it, `fresh`/`restart` don't; syntax + id-diff. **Interacts with P16.4** (the between-boss life-reset-to-40 cap): order them so the cap applies to >40 life *first*, then the missing-HP heal runs against the post-cap value — see P16.4.


# PHASE 16 — Token variety (treasure/blood/utility · enemy tokens · enemy uses them) + between-boss life reset ⬜ PLANNED

**Specced 2026-06-29, NOT built.** Requested by the user after Phase 15. Two themes: (A) richer **token** support — give the *enemy* tokens too (creature tokens drawing from the same library the player's do), add **resource tokens** (Treasure · Blood · Clue · Food) for both sides with expiry, and let the **enemy actively use** them (sacrifice Treasure for mana); (B) a **between-boss life reset** — descending past a boss resettles any life above 40 back to 40 (spent magic, distinct from damage you must heal). Grounded in the current `index.html` (re-grep names; line numbers drift — line 456 is the base64 `ART` blob, real JS 457→end). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded token-infra audit (read once for all of P16.1–P16.3):**
- **Player creature tokens:** `deployTokenCfg(cfg,n)` (~2277) pushes `n` token objects onto **`S.my.creatures`** (`token:true, sick:true, expires:false, …`). Saved tokens live on the profile in **`p.tokens`** (`{tid,name,p,t,kw,color}`), built by `readTokenForm()` (~2276), deployed/saved/copied via `quickDeployToken`/`saveTokenToLibrary`/`libDeployToken`/`libCopyToken`/`deploySavedToken` (~2279–2284) and rendered in the Library modal (`renderLibrary` ~2290) + the board "deploy saved token" row (`renderBoardTokens` ~2278).
- **Enemy creature tokens:** live on **`S.tokens`** (keyless bodies — guard `FX[c.key]&&`); created today only by the engine (`applyRun` `case "spawn"`, Resurgence, reanimation). **There is no player-facing way to put a token onto the enemy board.**
- **Expiry (P7.1):** `clearExpiringTokens()` (~1062) sweeps **both** boards for `token && expires` and removes them (cease, no graveyard, no Pit's Tithe); wired into `youEnd` (~1635) and `vaelEnd`. The per-permanent `expires` flag already toggles on both boards (drawers). **The infra for "temporary token that vanishes at end of turn" already exists** — P16.2/P16.3 reuse it.
- **Enemy mana:** `S.bossMana` / `usableMana()` (~924). The player casts freely (no player mana pool), so a player-side resource token is a **manual reminder/value tool**, while an enemy Treasure is **functional** (feeds `S.bossMana`).
- **Death/sacrifice routing:** tokens cease via `removeRef` (enemy) / `killMy` token-short-circuit (player); a sacrifice IS a death (fires Pit's Tithe). `slay`/`removeRef` (~1483/enemy), `killMy` (~1017).

## P16.1 — Deploy tokens to the enemy board (creature tokens share the player's token library)

**Goal:** the player (as bookkeeper) can put **creature tokens onto the ENEMY board** too, not just their own. Standard creature tokens behave exactly like player ones and are drawn from the **same saved-token library** (`p.tokens`) — one token catalogue, deployable to either side.

**Grounded building blocks:** `deployTokenCfg(cfg,n)` (~2277) — today hardcodes `S.my.creatures`. The enemy creature object shape is `S.tokens`' (keyless, `token:true`); `colorsOf` (~987) already falls back to the boss colours for keyless enemy bodies, so an enemy creature token with no explicit colour inherits the enemy identity. The board "deploy saved token" row (`renderBoardTokens` ~2278, `deploySavedToken` ~2279) and the Library deploy buttons (`libDeployToken` ~2282) are the entry points.

**How:**
1. **Parameterize the deployer:** `deployTokenCfg(cfg,n,scope='mine')` — `scope==='mine'` → `S.my.creatures` (unchanged default, so every existing call is byte-for-byte identical); `scope==='enemy'` → `S.tokens`, building the enemy-shaped object (no `_cat`, colour defaulting to boss colours when blank, `expires:false`, summoning-sick). Log to the right channel (`you` vs `dm`).
2. **Entry points:** add an **"into → [your board | enemy board]"** selector beside the existing deploy controls — the board quick-deploy row (`renderBoardTokens`/`deploySavedToken`) and the Library token rows (`libDeployToken` ~2282, `quickDeployToken` ~2280). One library, a target toggle. Default = your board.
3. **Parity:** an enemy creature token then flows through every existing enemy-board tool (slay/move/copy/edit/expire) and combat (`vaelAttackers`/`vaelDefenders`) identically to an engine-spawned token — no new per-token code.
4. **No schema change** — `S.tokens` already serializes; `p.tokens` is unchanged.

**ACs:** a saved token can be deployed ×N onto the enemy board and appears as a normal enemy creature (attacks/blocks, slayable, movable, can be flagged `expires`); the same token library feeds both sides; deploying to your own board is unchanged; the target defaults to your board; round-trips through save/undo.
**Verify:** jsdom — `deployTokenCfg(cfg,2,'enemy')` adds 2 bodies to `S.tokens` with boss-colour fallback + `token:true`; `scope='mine'` (default) still hits `S.my.creatures`; an enemy token attacks via `vaelAttackers`; syntax + id-diff (only the target selector ids added).

## P16.2 — Resource-token types: Treasure · Blood · Clue · Food (both sides, with expiry)

**Goal:** beyond creature tokens, support the common **resource/artifact token** types for **both** boards: **Treasure** (sacrifice for one mana), **Blood** (sacrifice + discard a card to draw), **Clue** (sacrifice + pay to draw), **Food** (sacrifice + pay to gain 3 life). Each is a real token permanent that can be made, sat on the board, sacrificed for its value, and — like any token — flagged to **expire** at end of turn.

**Grounded building blocks:** tokens already carry arbitrary fields and round-trip; the `expires` sweep (`clearExpiringTokens` ~1062) and the per-permanent drawer toggles cover temporary tokens for free (P7.1). Resource tokens are **non-creature artifact tokens**, so they want their own light representation rather than riding `S.my.creatures` (P/T) — but a minimal first cut can store them as a small array on each side. The player has no mana pool (cast freely), so a player Treasure is a **manual reminder** ("sacrifice → +1 mana available, apply as you cast"); the enemy Treasure is **functional** (P16.3 spends it into `S.bossMana`).

**How:**
1. **Token-kind catalogue** `RESOURCE_TOKENS` — data table keyed by kind, each `{name, glyph, sac:<what sacrificing does>, note}`: `treasure` (💰, "Sacrifice: add one mana of any colour"), `blood` (🩸, "Sacrifice + discard a card: draw a card"), `clue` (🔍, "Sacrifice, pay 2: draw a card"), `food` (🍖, "Sacrifice, pay 2: gain 3 life"). Extensible — a `custom` entry with a free-text note covers any other kind so nothing is blocked.
2. **Representation:** add parallel resource-token arrays per board (e.g. `S.my.resources` / `S.enemyResources`) holding `{id,kind,name,glyph,note,expires,token:true}` — or, if simpler at build time, reuse the artifact arrays with a `resKind` tag. Add to `fresh()`, save/`stripJSON`, and `migrate()` backfill (`if(!Array.isArray(...))=[]`). **Decision to confirm at build:** dedicated arrays (cleaner, recommended) vs. tagging existing artifact tokens.
3. **Make:** a "Make token" control gains a **kind picker** (creature | Treasure | Blood | Clue | Food | custom) + count + **target board** (reusing the P16.1 selector). Creature → existing path; resource kinds → push resource-token objects onto the chosen side's array. Log to the right channel.
4. **Render + sacrifice:** each board shows its resource tokens as small chips (glyph · name · `expires` ⌛ badge) with a **"⚑ sacrifice"** button. Sacrificing is a **death** (ceases like any token — and per the rules can pay the Pit's Tithe). The button applies the kind's effect where it's automatable: player Food → `adjLife('you',3)`; player Blood/Clue → draw is the player's physical/library action so it logs a reminder; player Treasure → reminder ("+1 mana available this cast"). Enemy resource sacrifice is driven by P16.3 (and a manual "⚑ sac" for the bookkeeper).
5. **Expiry:** resource tokens honor the same `expires` flag and are swept by `clearExpiringTokens()` (extend its sweep to the new arrays) — so a "Treasure until end of turn" vanishes at the end step on either board.

**ACs:** the player can make Treasure/Blood/Clue/Food on either board; each renders as a token chip with a sacrifice button and an optional ⌛ expire flag; sacrificing a Food heals 3, a Treasure/Clue/Blood logs its reminder (player) or feeds the enemy engine (P16.3); resource tokens cease on sacrifice/expiry leaving no graveyard; all new arrays round-trip through save + `migrate` backfill; creature tokens (P16.1) are unaffected.
**Verify:** jsdom — make each kind on both boards; `clearExpiringTokens` removes an expiring resource token from each new array; sacrificing Food calls `adjLife('you',3)`; sacrifice ceases the token (no graveyard entry); migrate backfills the arrays; round-trip; syntax + id-diff.

## P16.3 — The enemy actively uses its tokens (sacrifices Treasure for mana; temporary tokens expire)

**Goal:** the enemy isn't just *given* tokens — it **uses** them. When the enemy needs mana to cast and has Treasure tokens, it sacrifices them for mana; its temporary tokens expire on schedule like the player's.

**Grounded building blocks:** enemy casting decides affordability against `usableMana()` (~924) / `S.bossMana`; `vaelMain` (~1605+) is where the enemy chooses and pays for a play. Enemy resource tokens live on the P16.2 array. Expiry already runs in `vaelEnd` via `clearExpiringTokens` (P7.1).

**How:**
1. **Treasure → mana:** a helper `enemySacForMana(need)` — when the enemy wants to cast a spell it can't quite afford, sacrifice enemy Treasure tokens (each +1 to `S.bossMana`, one colour) up to what closes the gap, ceasing each and logging it (`dm`). Hook it into the `vaelMain` affordability check **before** abandoning a desired cast (so a 1-mana-short enemy cracks a Treasure rather than passing). Cap at the tokens available; never go negative.
2. **Other resource kinds (optional automation, bounded):** Food → enemy gains 3 (`bossHealLife`) when low; Clue → enemy draws (`vaelDraw`) when flooded/low-on-gas; Blood is loot-filtering — model as a reminder if not cleanly automatable. **Each effect that can't be modeled cleanly keeps a manual reminder (principle: nothing silently dropped).** Keep automation conservative — Treasure-for-mana is the primary, must-have behavior; the rest are nice-to-have and may ship as reminders.
3. **Expiry:** confirm enemy resource + creature tokens flagged `expires` are swept at `vaelEnd` (P16.2 extends the sweep) so the enemy's temporary tokens vanish correctly.
4. **Log** every enemy sacrifice/use (silent mutation = bug). No new persisted state beyond P16.2's arrays.

**ACs:** an enemy 1 mana short of a castable spell, holding ≥1 Treasure, sacrifices exactly enough Treasure to cast (logged) and then casts; with no Treasure it behaves as before; enemy Food/Clue automation (or reminders) fire on the right window; enemy expiring tokens cease at `vaelEnd`; never spends below 0 or beyond tokens held.
**Verify:** jsdom — enemy with `bossMana` one short + 1 Treasure casts after `enemySacForMana` (+1 mana, Treasure ceased, logged); no Treasure → no cast/no crash; Food heal / Clue draw fire when triggered; expiring enemy token swept at end step; syntax + id-diff.

## P16.4 — Between-boss life reset: life above 40 resettles to 40 on descend (spent magic, not damage)

**Goal:** when advancing through the dungeon from one boss to the next, any life **above 40** resettles **down to 40**. This represents temporary magical life-boosts wearing off between battles — it is **distinct from damage** (damage you still have to heal back with items; this only trims *excess* life above the 40 baseline). Life **at or below 40 is never touched** by this rule.

**Grounded building blocks:** `advance()` (~1494) is the **sole** room-transition path — `freshGameForDungeon()` → `enterRoom(next)` → the "your life (N) … carry over" log. Game start/restart use `enterRoom(0,true)` (not `advance`), so they're unaffected. `S.youLife` / `S.youMax`. **P15.4** (difficulty-scaled descent heal) also hooks `advance()` right after `enterRoom(next)` — these two MUST be ordered.

**How:**
1. In `advance()` (~1494), after `enterRoom(next)` and **before** the P15.4 descent-heal block: `if(S.youLife>40)S.youLife=40;` — trim only the excess; never raise life, never touch ≤40, never change `S.youMax`.
2. **Ordering with P15.4:** cap to 40 **first**, then run the missing-HP heal against the post-cap value — so a player who ends a boss at 55 starts the next boss assessment from 40 (excess magic gone), and only *then* is "missing HP" (relative to `youMax`) considered for the descent heal. Document this in both P15.4 and here.
3. **Log** the reset distinctly from healing/damage, e.g. `✨ Temporary vigor fades — your life settles to 40 between battles.` (only when a trim actually happened). Keep the existing "life carries over" log for the ≤40 case.
4. **Baseline constant:** define `LIFE_RESET_BASELINE=40` (single source) rather than a magic number, so it's tunable. (Open question: should the baseline equal the player's *starting* life rather than a literal 40? **Default: literal 40** per the user's instruction; flag if `youMax`/start-life ever diverges from 40.)

**ACs:** descending with life >40 sets it to exactly 40 (logged as fading magic, not as damage/heal); life ≤40 is unchanged and not logged as a reset; `youMax` is never altered; the reset runs only on `advance()` (not on game start/restart); when P15.4 is also present, the 40-cap applies before the missing-HP heal.
**Verify:** jsdom — `advance()` with `youLife=55` → 40 + reset log; `youLife=40`/`30` → unchanged, no reset log; `youMax` untouched; `enterRoom(0,true)`/restart never reset; with P15.4 stubbed, cap precedes heal (heal computed off 40); syntax + id-diff.

## P16.5 — Info & instructions for the new token + life-reset rules

**Goal:** surface the new mechanics where the player will look for them — the ⓘ info popups (P1.8), the in-game instructions/help, and the lore/help copy — so nothing is undocumented (principle #5 spirit: visible, not silent).

**Grounded building blocks:** the `INFO` map + ⓘ buttons (P1.8, ~1878 area — e.g. `action:{t,h}` entries); the instructions/help sections (~1999+ "The loop", ~2008 library bullet). New tooltips reuse the existing `INFO` entry shape.

**How:**
1. **Token info:** add/extend an ⓘ entry covering token kinds (creature vs Treasure/Blood/Clue/Food), that creature tokens share one library and deploy to either board (P16.1), how to make/sacrifice resource tokens, the `expires` flag, and that the enemy will spend its own Treasure for mana (P16.3).
2. **Life-reset info:** add a short note (ⓘ near the life total and/or in the descend cutscene/help) explaining the between-boss reset to 40 and that it differs from damage — temporary magic fades; damage must still be healed with items (P16.4).
3. **Instructions/help:** add a bullet to the help/instructions section for both features. Keep copy terse, in the established voice.

**ACs:** the relevant ⓘ popups describe token kinds, dual-board deploy, resource-token use/sacrifice, expiry, the enemy's Treasure-for-mana behavior, and the 40-life reset rule; the help/instructions mention both features; no new game state.
**Verify:** jsdom/string-check — the `INFO`/help strings include the new token + life-reset copy; syntax + id-diff.


# PHASE 17 — Enemy engine overhaul: lands-only mana · opening hand & mulligan · max-hand discard · attack-tax targeting · draw-N ⬜ PLANNED

**Specced 2026-06-29, NOT built.** Requested by the user to make the enemy play by real Magic rules for mana and hand management, and to support Propaganda/Ghostly-Prison/Oathkeeper-style attack taxes the enemy controls. **This phase finalizes the open balance question in P14.10** (the user has decided: lands-only mana, no free opening, no scrounge floor). Grounded in the current `index.html` (re-grep names; line numbers drift — line 456 is the base64 `ART` blob, real JS 457→end). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded enemy deck/mana/hand audit (read once for all of P17.1–P17.4):**
- **Deck build + shuffle:** `buildDeck(room)` (~824) assembles the library and **already shuffles** it (Fisher-Yates ~830). `enterRoom` (~814) sets `S.lib=buildDeck(room); S.hand=[]; S.gy=[]; S.exile=[];` then **`vaelDraw(4)`** (~821) — today the opening hand is **4**, not 7, and there is **no mulligan**.
- **Mana pre-seed (to remove):** `enterRoom` (~820) `S.bossLands=Math.max(0,(room.landStart||0)+(DIFF[S.diff].manaBonus||0)); S.bossManaMax=S.bossLands; S.bossMana=S.bossLands;` → free pre-developed mana. Room `landStart` 1/2/3 (~745/751/757), `DIFF.manaBonus` −1/0/+1 (~588).
- **Scrounge floor (to remove):** `playEnemyLand()` (~1540) plays a land from hand if present (`FX[c.key]&&FX[c.key].type==='land'`), else **scrounges** a free source when mana-light (`if((S.bossLands||0)<S.turn-1&&S.turn>1){…+1…}`, ~1542).
- **Untap refill:** `vaelUntap()` (~1538) sets `bossManaMax=bossLands+bossManaMod; bossMana=bossManaMax`.
- **Draw:** `vaelDraw(n)` (~831) shifts `n` off `S.lib` into `S.hand`, decking out via `bossDeckOut`→`bossDown` on empty. `vaelDrawStep` (~1554) = draw 1. Deck-tools `dtDraw()` (~905) + `dtN` input already give a manual "draw N".
- **End of turn:** `vaelEnd()` (~1640) — currently no max-hand-size / discard step.
- **Land detection (reuse everywhere):** a card is a land iff `FX[c.key] && FX[c.key].type==='land'`.

## P17.1 — Enemy mana strictly from played lands (remove opening pre-seed + scrounge floor)

**Goal:** the enemy begins every battle with **0 mana** and grows its pool **only** by playing land cards from hand — exactly like the player would. No free opening mana, no anti-screw scrounge. This **finalizes P14.10** (whose open balance question the user has now decided).

**How:**
1. **Zero opening:** in `enterRoom` (~820) set `S.bossLands=S.bossManaMax=S.bossMana=0` (drop the `room.landStart`/`DIFF.manaBonus` pre-seed). Retire `room.landStart` (rooms ~745/751/757) and `DIFF.manaBonus` (~588) as mana levers.
2. **Remove the scrounge floor:** delete the `if((S.bossLands||0)<S.turn-1…)` branch in `playEnemyLand()` (~1542). The enemy plays a land **only** when it actually has one in hand; mana-screw is now a real outcome (mitigated by the 7-card hand + mulligan in P17.2, not by free mana).
3. **Keep the legit engine:** `playEnemyLand` (land-from-hand), the `dtPlayCard` land branch (~858), and the `vaelUntap` refill (`bossManaMax=bossLands+bossManaMod; bossMana=bossManaMax`) remain the whole mana system.
4. **Non-land mana (per P14.10):** ramp rocks (`run:["ramp",N]` ~972) and the `enemyMana` emblem (~1436) are non-land mana — neutralize/remove per the decided rule (default: remove their mana grant; reclassify mana rocks as lands only if the user wants them kept). `bossManaMod` (admin ritual/stax modifier) and `bossManaFrozen` (freeze) stay.
5. **De-duplicate (carry from P14.10):** rename the display-only projection so it can't shadow the `S.bossMana` field; `usableMana()` stays the single affordability accessor.
6. **Difficulty re-tune:** difficulty no longer scales starting mana — push the swing onto HP (P10), luck, and **land density in the deck** (a per-difficulty land count / mulligan strictness is the natural new lever; see P17.2).
7. **migrate:** recompute `bossLands` for old saves to a lands-only basis (don't inflate from a stale `bossManaMax`).

**ACs:** a fresh battle starts at `bossMana===0`; the pool rises by 1 only when the enemy plays a land it actually holds; no scrounge ever fabricates a source; ramp/emblem grant no free mana (per the chosen option); difficulty doesn't change starting mana; freeze/mod intact; old saves migrate without inflated mana.
**Verify:** jsdom — `enterRoom` → `bossMana===0`; play a land → +1; an empty-of-lands hand never scrounges; ramp/emblem add no mana; `usableMana` single source; migrate; syntax + id-diff. **Supersedes the P14.10 balance flag.**

## P17.2 — Shuffle, draw a 7-card opening hand, mulligan while fewer than 3 lands

**Goal:** at the start of every battle the enemy **shuffles** its deck and draws a **7-card** opening hand; if that hand has **fewer than 3 lands**, it **reshuffles and redraws** a fresh 7 (a simple mulligan) until it has at least 3 lands. This keeps the now-strict lands-only rule (P17.1) playable.

**Grounded building blocks:** `buildDeck` already shuffles; `enterRoom` (~821) currently `vaelDraw(4)`. `deckShuffle` (~841) is the Fisher-Yates the manual tool uses. Land test = `FX[c.key]&&FX[c.key].type==='land'`.

**How:**
1. **7-card hand:** in `enterRoom` (~821) replace `vaelDraw(4)` with a new **`dealOpeningHand()`** that draws 7.
2. **Mulligan loop:** `dealOpeningHand()` — build/shuffle, draw 7, count lands (`S.hand.filter(c=>FX[c.key]&&FX[c.key].type==='land').length`); while `< 3`, **reshuffle the whole deck** (put the hand back, Fisher-Yates `S.lib`) and redraw 7. **Cap the attempts** (e.g. 10) so a pathological low-land deck can't infinite-loop — on giving up, keep the best hand seen and `log` it (no silent cap, per principle #5).
3. **Land floor as the difficulty lever (optional):** allow the threshold/attempts or the deck's land count to vary by difficulty (replacing the retired `manaBonus`) — e.g. brutal decks run slightly more lands or mulligan to a stricter floor. Flag the exact numbers for the user; **default: a flat `≥3` lands, attempt cap 10, no per-difficulty change** beyond existing land counts.
4. **Log** the opening (`🂠 {enemy} draws a 7-card hand`) and any mulligan (`{enemy} mulligans a {n}-land hand and redraws`) to the `dm` channel.
5. This is **battle-start only** (the `enterRoom` path); mid-game draws (`vaelDrawStep`, emblems, deck-tools) are unchanged. A pure no-card-state change beyond using existing zones → no schema bump.

**ACs:** every battle opens with a 7-card enemy hand; a hand with `<3` lands triggers a reshuffle+redraw; once `≥3` lands it stops; the attempt cap prevents an infinite loop and logs if hit; the opening + mulligans are logged; mid-game draws unaffected; deck-out rules (P5.2) still hold for an empty library mid-game.
**Verify:** jsdom — stub a deck and assert a 7-card hand with `≥3` lands after `dealOpeningHand`; a forced low-land deck mulligans then succeeds (or hits the cap + logs); `enterRoom` uses it; mid-game `vaelDraw` unchanged; syntax + id-diff.

## P17.3 — Max hand size 7: discard-to-7 wisely at end of turn (unless "no maximum hand size")

**Goal:** like a real player, if the enemy ends its turn holding **more than 7** cards it **discards down to 7**, choosing **wisely** (not at random) — **unless** it controls a card/effect granting **no maximum hand size**.

**Grounded building blocks:** `vaelEnd()` (~1640) is the enemy end step. `deckDiscard(indices)` (~845) already moves chosen hand cards to `S.gy` and logs. `castValue(fx,ctx)` (~1569 area, per P14.9) + `bestTargetThreat` are the existing value scales the AI already speaks in. Hand = `S.hand`.

**How:**
1. **Hook:** in `vaelEnd()` (~1640), after the existing cleanup, a new **`enemyDiscardToMax()`**.
2. **"No maximum hand size" exemption:** define the flag — a keyword/marker on an enemy permanent or emblem (e.g. `kw 'no max hand size'`, or an `S.emblemsEnemy`/rule entry). If any such effect is active, **skip** the discard entirely (and optionally log "no maximum hand size"). Document the exact flag at build; default = check a `'no max hand'` keyword on any enemy permanent + a same-named rule/emblem.
3. **Wise discard:** while `S.hand.length>7`, pick the **lowest-value, most-redundant** card to pitch — order: surplus lands beyond what it needs to hit its curve, then the lowest `castValue` spell (cheap redundant filler before bombs/answers); **never** discard its only/last land if it still needs lands. Reuse the cast-value scale so "wise" matches how the enemy already evaluates cards. Compute the indices and route through `deckDiscard()` so it logs and graveyards correctly.
4. **Log** one summary line (`{enemy} discards to 7: …`); single render. No schema change (uses `S.hand`/`S.gy`).

**ACs:** an enemy ending its turn with >7 cards discards exactly down to 7, pitching the lowest-value/redundant cards (surplus land, then cheapest filler) and keeping bombs/answers/needed lands; with a "no maximum hand size" effect active it discards nothing; the discard logs and routes to the graveyard; ≤7 cards → no-op; round-trips through save/undo.
**Verify:** jsdom — a 9-card hand discards to 7 choosing the two lowest-value cards (and not its last needed land); a hand under the "no max" flag is untouched; discards land in `S.gy` and log; ≤7 no-op; syntax + id-diff.

## P17.4 — Manual "enemy draws N cards" control

**Goal:** an explicit control to make the enemy draw **N** cards on demand (for cards/abilities that say "the enemy draws N").

**Grounded building blocks:** `vaelDraw(n)` (~831) already draws N (with deck-out). `dtDraw()` (~905) + the `dtN` input in the deck-tools modal ("🂠 Manipulate enemy deck", ~414) **already provide a manual draw-N** — this task mostly **surfaces it** and confirms it's robust.

**How:**
1. **Surface a quick draw-N:** add a compact "🃏 Draw N" control (number input + button → `vaelDraw(n)` + log + render) to the enemy zones/deck panel (near the `libCount`/`handCount` display, `renderZones` ~1675), so it's reachable without opening the full deck-tools modal. Reuse `dtDraw`'s logic (or call a shared `enemyDrawN(n)`).
2. **Robustness:** guard `n>=1`; on empty library mid-draw, the existing `bossDeckOut`/deck-out (P5.2) applies — confirm a partial draw + deck-out is logged sanely (no crash).
3. **Log** `🃏 {enemy} draws N (hand … · library …)` (matches `dtDraw`). No schema change.

**ACs:** the player can make the enemy draw any N from a visible control; it draws min(N, library) and decks out correctly if the library empties; hand/library counts update; logs; no crash on an empty library.
**Verify:** jsdom — `enemyDrawN(3)` moves 3 from `S.lib` to `S.hand` + logs; drawing past an empty library triggers deck-out without throwing; the control renders in the zones panel; syntax + id-diff. *(Note: the deck-tools `dtDraw` path may already satisfy this — verify before adding a duplicate; if so, this task just adds the convenience entry point.)*

## P17.5 — Attack-tax target selector (player / planeswalkers / both) + enemy-side attack tax

**Goal:** support Propaganda / Ghostly Prison / Norn's Annex / "Oathkeeper"-style taxes with two additions: (a) a **target selector** on an attack tax — does it tax attacks aimed at the **player**, at **planeswalkers**, or **both**; (b) an **enemy-side** attack tax (the enemy controls the Propaganda, so the **player** must pay mana/and-or life to attack the enemy face and/or its planeswalkers) — mirroring today's player-side tax (where the enemy pays to attack you).

**Grounded building blocks (the existing one-directional tax):**
- Player permanents carry `catk={amt,type:'mana'|'life'}` ("attack tax — enemy pays"), set in the drawer (`setCatk` ~1325/1332) and the cast form (`castAtkN`/`castAtkType` ~1773-1774). `attackTax()` (~1361) sums all un-phased player permanents' `catk`; `payAttackTax(cands)` (~1362) makes the **enemy** pay mana/life from `S.bossMana`/`S.boss.life` to keep its attackers, used in `vaelCombat` (~1634) — the enemy **holds back** attackers it can't pay for, logged (~1635-1636).
- **Gap:** the tax is untyped by target (it taxes *all* enemy attacks regardless of whether they'd hit you or your walkers), and there is **no** enemy-controlled tax on the player's attacks.

**How:**
1. **Target field:** add `catk.tgt ∈ {player, walkers, both}` (default `both` for back-compat). Surface it in the drawer (`setCatk` rows ~1325/1332) and cast form (~1773-1775) as a small select next to amount/type. `migrate()` backfills missing `tgt='both'`.
2. **Honor the target on the player-side tax:** in `attackTax()`/`payAttackTax` (~1361-1362), only count a tax against an enemy attacker whose **declared target** matches (`player`/your `S.my.walkers`/either). (Requires the combat flow to know an attacker's target — if attacker→target isn't modeled yet, scope this to: tax applies when the enemy attacks **you** by default, and a `walkers`-only tax applies when your walkers are the legal target. Flag the exact integration point at build.)
3. **Enemy-side attack tax (the mirror):** add an enemy attack-tax source — either `catk` on enemy permanents (`S.tokens`/`S.cmd`/enemy artifacts-enchants per P13.3) or an enemy emblem/rule entry — summed by a new **`enemyAttackTax()`** with the same `{amt,type,tgt}` shape. When the **player declares attackers** (the player's attack step), surface the cost: "Pay {N mana and/or N life} per attacker to attack {the enemy / its planeswalkers}." Since the player has **no mana pool**, mana is a **reminder** the player applies; **life** can be auto-deducted (`adjLife('you',-N)`) with confirmation, or left as a reminder — pick one and log it. The tax gates by `tgt` (attacking the enemy face vs its walker).
4. **UI:** an "enemy attack tax" editor (mirrors the player drawer's tax row) on the enemy board / a Tools control, with amount + type + target.
5. **Log** every tax applied/owed (silent mutation = bug). New `tgt` field + enemy-tax source round-trip through save; `migrate` backfills.

**ACs:** an attack tax can be set to apply to the player only, planeswalkers only, or both, on either side; the player-side tax (enemy pays) honors the target type; an enemy-side Propaganda makes the player pay (life auto/reminder, mana reminder) to attack the enemy and/or its walkers per the target; existing untyped taxes default to `both` and behave as today; everything round-trips through save + migrate backfill.
**Verify:** jsdom — `catk.tgt` round-trips and `attackTax` filters by target; an enemy-side tax via `enemyAttackTax()` surfaces a player cost gated by `tgt` (life deducted/reminder); a legacy `catk` with no `tgt` acts as `both`; migrate backfill; syntax + id-diff.


# PHASE 18 — Combat correctness: menace enforcement + keyword automation audit ⬜ PLANNED

**Specced 2026-06-29, NOT built.** The user wants combat to honor menace strictly and to confirm the combat keywords actually auto-resolve. The P12.2 infrastructure exists (grounded below) but **user testing confirmed a real bug**: an enemy menace creature is blockable by one (the rule works for the player's creatures only). So this phase is a **fix + symmetry-audit** pass: repair the confirmed menace bug, then prove every combat keyword resolves identically for **player and enemy** in BOTH directions (your attack → enemy blocks; enemy attack → you block). Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

> **⚠ CONFIRMED BUG (user-tested 2026-06-29): an enemy creature with menace is currently blockable by ONE creature.** The menace block-count rule is **not** firing for the enemy direction (it appears to work for the player's own menace creatures — an asymmetry that must be closed: enemy and player menace creatures must behave identically). The `approveCombat` refuse-loop (~1168) is direction-agnostic *by construction*, so the failure is upstream of it — almost certainly in **`minBlockers()`** or in the **keyword data on enemy creatures**. Two grounded prime suspects (the P18.0 diagnostic pins which):
> 1. **`minBlockers` short-circuit (~999):** `(c&&c.block&&c.block.min)||(kw(c,'menace')?2:1)` — an explicit `c.block.min` *overrides* menace via `||`. Enemy creatures can now carry `block.min` (the P13.1 owner-agnostic drawer, `setObjBlock` ~1308 / row ~1313); a `block.min===1` returns **1** even when the creature has menace. The fix is `Math.max(explicitMin||1, kw(c,'menace')?2:1)` so menace can never be *lowered* by an explicit min.
> 2. **Menace keyword not on the enemy object:** `kw(c,'menace')` reads `c.kw`. If an enemy creature **card** (not a `run:["spawn",…,["menace"],…]` token) resolves onto `S.tokens` without copying its `kw` array, menace is invisible and `minBlockers` returns 1. Verify the enemy-card→board path carries `kw` (compare to the player cast path, which does).
>
> **P18.0 (diagnostic) still runs first** to confirm the exact cause and guard against regressions, but the finding is no longer "maybe" — the fix is required. Do NOT assume the player side is correct either; test both.

**Grounded combat audit (read once for P18.1–P18.2):**
- **Resolution core:** `resolveAttack(attackers,assign)` (~1002) computes face/lifelink/dead lists and already models — outgoing `effP×(double strike?2:1)`; deathtouch (`lethal=1`); trample (`left>0` spills to face); first/double-strike (`attFirst` skips dead blockers' strike-back); blocker strike-back (`blkPow`/`blkDT`); lifelink both sides (`attLifelink`/`defLifelink`); protection (`hasProtFrom` zeroes); indestructible (no death from damage/deathtouch). Returns `{face,deadAtt,deadBlk,attLifelink,defLifelink,perAtt}`.
- **Block-count rules (P12.2):** `minBlockers(c)` (~999) = `(c&&c.block&&c.block.min)||(kw(c,'menace')?2:1)` — **⚠ buggy: the `||` lets an explicit `block.min` override (and thus *lower*) menace** (see the confirmed-bug banner). `maxBlockers(c)` (~1000) = `c.block.max || Infinity`. `approveCombat` (~1168) **refuses** an attacker blocked by `1..min-1` (correct *if* `minBlockers` returns 2); `combatAdd` (~1152) enforces the max cap; `predictCombat` (~1162) flags the illegal partial. **Net:** the refuse-loop is fine; whatever lets a single blocker through is upstream in `minBlockers`/keyword data.
- **Both directions:** your attack → `swing()`→`aiBlocks(attackers)` (~1081, respects `minBlockers`/`maxBlockers`) → `openCombat('you',…)`; enemy attack → `vaelAttackers`/`openCombat('vael',…)` → you assign via `renderCombat`/`combatAdd`. Resolution (`approveCombat` ~1165) applies face/lifelink/deaths/tap for both `dir==='you'` and `dir==='vael'`, incl. walker-target split + commander damage.
- **Vigilance:** `approveCombat` taps attackers unless `kw(a,'vigilance')` (~1178/1194). **Legality:** `legalBlock(att,b)` gates flying/reach (used in `renderCombat`/`aiBlocks`/`combatAdd`).

## P18.0 — Diagnostic FIRST: reproduce the menace + keyword scenarios in BOTH directions and record actual behavior

**Goal:** before any code change, establish the **current, real** behavior of the combat engine — especially the user's exact observation (a single blocker assigned to an **enemy** menace attacker) — so P18.1/P18.2 fix only what is genuinely broken and never "fix" something that already works. This is the methodology guard the user asked for.

**Grounded scenarios to reproduce (jsdom, both directions, asserting current behavior — these are diagnostics, not yet fixes):**
1. **Enemy menace attacker, player assigns 1 blocker** (`dir==='vael'`): set up `S.combat` with an enemy menace attacker + assign exactly 1 player blocker → call `approveCombat`. **Record:** does it refuse (`return`, state unchanged, log emitted) or does it resolve as "blocked"? Assert whichever actually happens.
2. **Player menace attacker, enemy/you assign 1 blocker** (`dir==='you'`): the mirror — does `approveCombat` refuse it identically?
3. **`minBlockers` symmetry + short-circuit:** assert `minBlockers(enemyMenaceToken)===2`, `minBlockers(playerMenaceCreature)===2`, and `minBlockers(S.cmd)` when the commander has menace — confirm the helper reads `kw` off every object shape (`S.tokens`, `S.cmd`, `S.my.creatures`). **Critically, assert the suspect case:** a menace creature that *also* has `block={min:1}` → today returns **1** (bug), should be **2**. Also probe an enemy creature whose menace came from a resolved **card** (not a `spawn` token) — does its board object carry `kw:['menace']`?
4. **`combatAdd` UI gap:** confirm whether the assign control lets a single blocker be added to a menace attacker (it does today — only the max cap is enforced at `combatAdd` ~1152; min is an Approve-time check). Record this as the likely source of the user's confusion (the UI permits the assignment; the engine is supposed to reject at Approve).
5. **Keyword spot-checks (both directions):** quick `resolveAttack` probes for deathtouch (1-damage lethal), lifelink (correct side), trample spill, indestructible survival — record which already pass.

**Deliverable:** a short findings note appended to this phase (✅ works / ❌ broken / ⚠ UI-only gap, per scenario) that **pins the exact cause** of the confirmed enemy-menace bug (short-circuit vs. missing `kw` vs. both) and **scopes P18.1/P18.2**. The enemy-menace failure is already confirmed; this task converts "it's broken" into "here is the line and the reason," and captures the regression tests so the fix can't silently regress later.
**Verify:** the diagnostic jsdom driver runs and reports per-scenario actual behavior; no production code changed in this task (pure investigation + tests).

## P18.1 — Menace: blockable only by 2+, counts as blocked only when ≥2 assigned (both directions)

**Goal:** a creature with **menace** (or any `block.min≥2`) can be blocked **only** by two or more creatures, and is treated as **blocked only when at least its min are assigned** — assigning a single blocker is **invalid** (the attacker is not "blocked by one"; it's either blocked by 2+ or unblocked). **Applies identically to enemy and player menace creatures** — the engine must not enforce it for one side only.

**How (the bug is confirmed — fix it, then harden symmetry, per the P18.0 findings):**
1. **Fix `minBlockers` (~999) — primary:** replace the `||` short-circuit so menace can never be *lowered* by an explicit min: `const explicit=(c&&c.block&&c.block.min)||0; return Math.max(explicit, kw(c,'menace')?2:1);`. This guarantees a menace creature is always `≥2` regardless of any `block.min` an editor set, on **either** side. (A `block.min` *higher* than 2 still raises the requirement, as intended.)
2. **Ensure enemy creatures actually carry their keywords:** if P18.0 shows an enemy creature **card** resolves onto `S.tokens` without its `kw` array (so `kw(c,'menace')` is false), fix the enemy-card→board resolve path to copy `kw` (parity with the player cast path). Menace on the data is the precondition for every menace rule.
3. **Symmetry verification:** with (1)+(2) done, confirm the `approveCombat` refuse-loop (~1168) now triggers identically for an **enemy** menace attacker blocked by 1 and a **player** one; `aiBlocks` (~1084) still won't *propose* `<min`; `predictCombat` (~1162) warns before approve in both directions.
4. **Close the UI gap (user-visible):** since the user *saw* a single blocker get assigned, give immediate feedback at assign time — block the assignment in `combatAdd` (~1152) when it would leave a menace attacker under-blocked with no path to reach min, or surface the ⚠ inline on the block row — so the player isn't surprised at Approve. (Keep the Approve-time refusal as the hard guard.)
5. **"Counts as blocked only if ≥2":** verify `resolveAttack` treats a menace attacker with `<min` blockers correctly — since approve refuses `<min`, the only resolvable states are 0 blockers (unblocked → full face/trample) or ≥min (blocked). Add an explicit guard/test so a menace attacker can never deal "blocked" math against a single blocker.
6. **Max cap honored:** `combatAdd` (~1152) blocks assigning beyond `maxBlockers`; confirm for both directions.
7. **AI side:** `aiBlocks` (~1084) must never assign exactly 1 to a menace attacker (it uses the `need===1` vs else-group branch) — verify the group branch assigns `need` blockers or none.
8. **Decision to confirm:** when the player tries to under-block (assign 1 to a menace attacker), current behavior = **refuse at approve with a log**. Keep that (clear + reversible) rather than silently dropping the blocker — flag if the user prefers auto-treating it as unblocked instead.

**ACs:** a menace attacker shows "blocked by 2+"; assigning 1 blocker is rejected at approve (logged) in both directions; assigning 0 → resolves as unblocked (full damage/trample); assigning ≥2 → resolves as blocked; the AI never proposes a single blocker for a menace attacker; the max-blocker cap holds; `block.min` from a non-menace source behaves identically.
**Verify:** jsdom — menace attacker + 1 blocker → `approveCombat` refuses (state unchanged, log emitted); + 0 → unblocked damage; + 2 → blocked resolution; `aiBlocks` assigns 2-or-0 to a menace player attacker; both `dir` paths covered; syntax + id-diff.

## P18.2 — Combat keyword automation audit (deathtouch · lifelink · trample · strikes · vigilance · indestructible · protection)

**Goal:** confirm every combat keyword **auto-resolves** correctly on combat resolution (no manual bookkeeping needed) and fix any incorrect interaction — for **both player and enemy creatures**, as both attacker and blocker (the user specifically called out first/double strike working the same on each side). The menace fix (P18.1) showed enemy creatures can diverge from player ones; treat that as the warning that every keyword must be tested on the enemy side too, not just the player side.

**How (audit `resolveAttack` ~1002 + the two `approveCombat` apply-branches ~1173/1183, add coverage, fix bugs):**
1. **Deathtouch:** any nonzero combat damage is lethal (`lethal=1`); a deathtouch blocker kills the attacker (`blkDT`); deathtouch + trample assigns only **1** to each blocked creature before trampling the rest (verify the `left` math spills correctly after a 1-point lethal assignment — this is the classic bug site).
2. **Lifelink:** attacker lifelink gains its **full damage dealt** (incl. to blockers + trample), routed to the right side (you on `dir==='you'`, enemy via `bossHealLife` on `dir==='vael'`); blocker lifelink likewise (`defLifelink`). Confirm the gain side flips correctly per direction (~1175-1176 vs ~1191-1192).
3. **Trample:** lethal assigned to blockers (deathtouch-aware), remainder to face; prevented/indestructible blockers still have lethal **assigned** over them before spill (MTG rule).
4. **First / double strike:** double strike doubles outgoing; an attacker with first/double strike that kills a non-first-strike blocker takes no strike-back from it (`attFirst&&dies&&!bFirst`); double-strike blocker strike-back doubles. Verify the ordering doesn't double-count.
5. **Vigilance:** non-vigilant attackers tap, vigilant stay untapped — both directions (~1178/1194).
6. **Indestructible:** never added to `deadAtt`/`deadBlk` from combat damage or deathtouch (verify both attacker and blocker sides).
7. **Protection (`hasProtFrom`):** a protected blocker takes 0 (not killed, not assigned damage); a protected attacker takes 0 from that blocker. Confirm both `forEach` guards (~1010/1016).
8. **Walker-target + commander damage (enemy attack):** `perAtt` splits to `you`/walkers per `S.combat.target`; unblocked commander adds to `cmdDmg/21` (~1189-1190) — confirm lifelink/trample still compute right when targeting a walker.
9. Fix anything the tests expose; **log** each resolved effect (lifelink gains, deaths) as today (no silent mutation).

**ACs:** in both directions, deathtouch kills with 1 damage (and assigns 1-then-tramples), lifelink gains the correct side full damage, trample spills correctly past lethal/indestructible/protection, first/double strike ordering is correct, vigilant attackers don't tap, indestructible never dies to combat, protection zeroes the right damage; the resolver popup + logs reflect each; no keyword requires manual application.
**Verify:** jsdom — targeted unit tests per keyword in `resolveAttack` (deathtouch+trample assignment, lifelink side/amount per direction, double-strike strike-back, indestructible survives lethal+DT, protection zeroes, vigilance tap) + an end-to-end `approveCombat` for each direction; regressions on the existing P6/P12.2 combat drivers; syntax + id-diff.


# PHASE 19 — Symmetric enemy counters: poison · commander damage · energy · experience ⬜ PLANNED

**Specced 2026-06-29, NOT built.** The player can accrue poison / commander-damage / energy / experience counters, but the **enemy can't** — so poison-out and commander-damage kills only work in one direction. Make the counters symmetric: the enemy tracks the same set, with the same lethal thresholds, adjusters, rendering, and (for commander damage) auto-accrual from combat. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded counter audit:**
- **State:** `S.counters={poison,energy,experience,cmdDmg}` (player-only), reset per-game in `freshGameForDungeon` (~1740) and backfilled in `migrate` (~2190). **No enemy equivalent.**
- **UI:** the 🧰 Tools panel renders the player chips — `poison <b id=cPoison>/10`, `cmd-dmg <b id=cCmd>/21`, `energy <b id=cEnergy>`, `exp <b id=cExp>` — each with `cnt('poison'|'cmdDmg'|'energy'|'experience', ±1)` adjusters (~465-468).
- **Render/adjust:** `renderCounters()` (~1971) maps the chip ids to `S.counters`; `cnt(k,n)` (~1972) clamps `≥0`, re-renders, calls `checkLose()`.
- **Lose conditions (player):** `checkLose()` (~1940) fires `lose()` on `youLife≤0 || poison≥10 || cmdDmg≥21` (with the Phoenix Charm save).
- **Win/boss-death path:** `bossDown()` (~1557) handles the enemy "falling" (Vael phase-2, else loot+gold+clear). Enemy death today is driven only by `S.boss.life<=0`.
- **Commander damage to the player (the auto-accrual precedent to mirror):** in `approveCombat` `dir==='vael'` (~1189-1190): `cmdToYou=S.cmd.inPlay && attackers.includes(S.cmd) && no blockers && target==='you'` → `S.counters.cmdDmg+=effP(S.cmd)`. **The player-attack branch (`dir==='you'`, ~1173) has no symmetric accrual** for *your* commander hitting the enemy.

## P19.1 — Enemy counter state + Tools-panel UI, adjusters, and render

**Goal:** the enemy has its own `poison / cmdDmg / energy / experience` counters, visible and adjustable beside the player's, persisted and migrated.

**How:**
1. **State:** add `S.enemyCounters={poison:0,energy:0,experience:0,cmdDmg:0}` parallel to `S.counters`. Reset per battle in `enterRoom`/`freshGameForDungeon` alongside `S.counters` (~1740) — poison and commander damage are per-game in MTG, so a new boss starts clean. `migrate()` (~2190) backfills (`if(!s.enemyCounters||typeof…!=='object')…` then the four keys default to 0). It lives in `S` → serializes/undo for free.
2. **UI:** add an enemy counter row in the 🧰 Tools panel (mirroring ~465-468) — `poison /10 · cmd-dmg /21 · energy · exp` with new chip ids (e.g. `eqPoison/eqCmd/eqEnergy/eqExp`), labelled for the enemy (use `ENs()`), each with adjusters. **Generalize the setter** rather than duplicate: `cnt(k,n,side='you')` → writes `S.counters` or `S.enemyCounters`; the enemy buttons pass `side='enemy'`. Keep the existing player calls working (default arg).
3. **Render:** extend `renderCounters()` (~1971) to also map the enemy chip ids to `S.enemyCounters`.
4. **Log** enemy counter changes to the `dm` channel (player ones stay on their channel), per the no-silent-mutation principle.

**ACs:** the Tools panel shows an enemy counter row with the same four counters + adjusters; adjusting them mutates `S.enemyCounters` (clamped ≥0); they render correctly; a fresh battle starts the enemy at 0 on all four; old saves migrate; player counters are byte-for-byte unaffected; everything round-trips through save/undo.
**Verify:** jsdom — `cnt('poison',3,'enemy')` sets `S.enemyCounters.poison===3` and leaves `S.counters` untouched; `renderCounters` reflects both sides; `enterRoom` resets enemy counters; migrate backfills; player `cnt('poison',1)` unchanged; syntax + id-diff (only the new enemy chip ids added).

## P19.2 — Win-condition wiring + commander-damage auto-accrual to the enemy

**Goal:** the enemy can actually **lose** to its counters (10 poison, or 21 commander damage from *your* commander), exactly mirroring the player's loss conditions — and your commander's unblocked combat damage to the enemy accrues automatically.

**How:**
1. **Enemy "out" check:** add `checkEnemyOut()` (mirror of `checkLose` ~1940) — if `S.enemyCounters.poison>=10 || S.enemyCounters.cmdDmg>=21` and `!S.over`, log the reason to `dm` (e.g. "☠ 10 poison — {enemy} falls." / "☠ 21 commander damage — {enemy} falls.") and route through **`bossDown()`** (so Vael's phase-2 still triggers, loot/clear still fires — same path as life-based death). Call it from `cnt()` after an enemy-counter change (the way `cnt` already calls `checkLose`), and after combat accrual.
2. **Commander-damage auto-accrual (your commander → enemy):** in `approveCombat` `dir==='you'` (~1173), mirror the enemy-side logic: if your designated commander is among `attackers`, is **unblocked** (`(assign[cmd.id]||[]).length===0`), and is dealing face damage, add its `effP` to `S.enemyCounters.cmdDmg` and log `Commander damage to {enemy}: N/21.` Identify your commander via `isCmd`/`S.pcmd` (the on-board commander object). Then `checkEnemyOut()`.
3. **Poison from combat (optional, consistent):** if a player attacker has infect/toxic-style behavior it's manual today; keep poison primarily a manual adjuster for both sides (no infect keyword exists yet) — note it as the manual path so nothing's implied that isn't built.
4. **Phoenix-style saves:** none on the enemy side — the enemy simply falls (no equivalent of the player's Phoenix Charm).

**ACs:** setting the enemy to 10 poison (or 21 cmd-dmg) makes the boss fall through `bossDown` (Vael still gets phase-2; a normal boss drops loot/gold/clear); your unblocked commander's combat damage to the enemy accrues to `S.enemyCounters.cmdDmg` and a 21 total ends the fight; the player's own loss conditions are unchanged; counters reset between battles so damage doesn't carry to the next boss.
**Verify:** jsdom — `S.enemyCounters.poison=10; checkEnemyOut()` → `bossDown` path (assert phase-2 for Vael, clear for a normal boss); an unblocked player-commander swing adds `effP` to `enemyCounters.cmdDmg` and 21 triggers the fall; a blocked/again-non-commander swing doesn't accrue; `checkLose` (player) untouched; reset on `enterRoom`; syntax + id-diff.


# PHASE 20 — Combat-count restrictions: blockable-by-N (creatures) · attackable-by-N (planeswalkers) · enemy max-blockers box ⬜ PLANNED

**Specced 2026-06-29, NOT built.** The user wants per-card combat-count limits, unified across player and enemy. **Clarified meaning (user, 2026-06-29):** for a **creature**, "attackable only by N" *means blockable only by N* (the existing `block:{min,max}`); for a **planeswalker**, it means the walker can be *attacked* by at most N creatures. Plus a global enemy "max blockers" box mirroring the existing "max attackers". Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Creature block-count (already exists):** `block:{min,max}` per P12.2 — `minBlockers`/`maxBlockers` (~999/1013), enforced in `aiBlocks`/`combatAdd`/`approveCombat`. Editable on the **unified drawer**: player via `setBlockMy` (~1303, row ~1324), enemy via the P13.1 owner-agnostic `setObjBlock` (~1308, row ~1313). **⚠ Depends on the P18.1 `minBlockers` fix** (the `||` short-circuit bug) to behave correctly when menace + an explicit min coexist.
- **Planeswalker attack-targeting (the basis for "attackable by N"):** only the **enemy-attack** direction assigns attackers to walkers today — `renderCombat` (~1167) shows a target `<select>` (you / each `S.my.walker`) per enemy attacker, set by `combatTarget` (~1177) into `S.combat.target[attId]`; `approveCombat`/`predictCombat` split damage by target. So **the enemy attacks YOUR walkers**; there is **no** path for you to attack the **enemy** walker `S.pw` in combat (the `wks` list is empty when `dir==='you'`).
- **Max attackers box (the mirror target):** `<input id="maxAtk">` in the enemy box (~382) caps the enemy's declared attackers in `vaelAttackers` (~1155: `if(maxA>0&&a.length>maxA)a=a.slice(0,maxA)`). There is **no** equivalent cap on enemy blockers in `aiBlocks` (~1108).

## P20.1 — Creatures: "blockable only by N" (min/max) on the unified player + enemy drawer

**Goal:** confirm/surface, on every creature (player and enemy alike), the ability to set how many creatures may block it — min and max — so a creature can be made "blockable only by N."

**How:**
1. **Mostly exists** — `block:{min,max}` with `setBlockMy` (player) and `setObjBlock` (enemy, P13.1) already render min/max steppers on both drawers (~1313/1324) and resolve through the combat engine. This task is to **verify parity** (the enemy creature drawer offers the identical control), tidy the labels (e.g. "blockable by min N / max N · 0 = none · menace = min 2"), and ensure the `blockLabel` board badge (~1014) shows the restriction on both boards.
2. **Hard dependency:** lands **after P18.1** so `minBlockers` uses `Math.max(explicitMin, menace?2:1)` — otherwise setting `max < menace`'s implied min (or `min=1` on a menace creature) misbehaves. Add a guard/log if a user sets `max < min`.
3. No schema change (`block` already serializes); pure UI-parity + validation.

**ACs:** both player and enemy creature drawers expose min/max "blockable by" steppers that drive `aiBlocks`/`combatAdd`/`approveCombat` identically; the board badge shows the limit on both sides; `max<min` is rejected/clamped with a log; behavior is correct alongside menace (post-P18.1).
**Verify:** jsdom — `setObjBlock('token',id,'max',1)` makes an enemy creature blockable by ≤1 and `setBlockMy` does the same for a player creature; combat honors both; `max<min` guarded; menace interaction correct; syntax + id-diff.

## P20.2 — Planeswalkers: "attackable only by N" — cap how many creatures may attack a walker

**Goal:** a planeswalker can be flagged so that **at most N creatures may attack it** in a single combat. Unified across the player's walkers (`S.my.walkers`, attacked by the enemy today) and the enemy walker (`S.pw`, for if/when you can attack it).

**How:**
1. **New field** `attackableBy` (max attackers, default unset = no limit) on walker objects; editable in the walker drawer (player walker drawer + the enemy walker, via the P13.1 owner-agnostic editor where the walker is reachable). `migrate()` needs no backfill (absent = unlimited). Serializes for free.
2. **Enforce on assignment (enemy → your walkers):** in `combatTarget` (~1177), when assigning an attacker to a walker target, refuse (log + keep prior target) if that walker already has `attackableBy` attackers pointed at it — count `Object.values(S.combat.target)` equal to that walker id. Mirror the check at `approveCombat` as the hard guard (reject if any walker exceeds its cap), and flag it in `predictCombat` so the player sees it before approving.
3. **Enemy walker (`S.pw`):** since there's no player→enemy-walker attack-targeting today, the cap is **defined and stored** on `S.pw` but only takes effect if/when that targeting is added — note this explicitly (don't build a new attack-targeting mode here; that's a separate feature). The field still round-trips and shows in the drawer for parity.
4. **Label/badge:** show "attackable by ≤N" on the walker.

**ACs:** a player walker set to "attackable by 1" can have at most 1 enemy attacker assigned to it (the 2nd assignment is refused with a log; approve rejects an over-cap state; prediction warns); an unset walker is unlimited (today's behavior); the field exists symmetrically on the enemy walker (stored, drawer-visible) pending player→enemy-walker targeting; round-trips through save/undo.
**Verify:** jsdom — set `attackableBy=1` on a player walker; assigning a 2nd enemy attacker to it via `combatTarget` is refused; `approveCombat` rejects a hand-built over-cap `S.combat.target`; unset = unlimited; field persists on `S.pw`; syntax + id-diff.

## P20.3 — Enemy "max blockers" box mirroring "max attackers"

**Goal:** add a global cap on how many of the enemy's creatures may be declared as blockers, exactly paralleling the existing "Max attackers" box.

**How:**
1. **UI:** add `<input id="maxBlk" min="0" value="0">` beside the "Max attackers" box (~382), labelled e.g. "Max blockers (Silent Arbiter → 1)" with the same `onchange="render()"`.
2. **Enforce in `aiBlocks` (~1108):** read `const maxB=parseInt($("maxBlk").value,10)||0;` and stop assigning new blockers once the total assigned blockers reach `maxB` (when `maxB>0`) — count across all attackers in the `assign` map as the loop proceeds, so the enemy never commits more than `maxB` blockers total. Respect it alongside the existing per-attacker `minBlockers`/`maxBlockers` (if honoring a menace attacker's min would exceed the global cap, that attacker simply goes unblocked — log it; don't form an illegal partial).
3. **0 = unlimited** (matches `maxAtk` semantics). No schema change (it's a transient UI input like `maxAtk`, read at block time).

**ACs:** with "Max blockers" = 1, the enemy assigns at most 1 blocker total across the whole combat; = 0 means unlimited (today's behavior); it composes with menace (a menace attacker that can't reach its min within the cap is left unblocked, logged); the "Max attackers" box is unchanged.
**Verify:** jsdom — set `maxBlk=1`, give the enemy several blockers + several player attackers → `aiBlocks` assigns ≤1 blocker total; `maxBlk=0` unlimited; menace-vs-cap leaves the attacker unblocked with a log; `maxAtk` regression intact; syntax + id-diff.

---

## Open questions (non-blocking — assume the stated default unless overridden)

- **Passive item duration (P7.4):** ~~are any satchel items meant to last >1 descent?~~ **RESOLVED by P14.5** — all passive items last exactly 1 descent; the player-set duration stepper is removed.
- **Plane die contents (P7.7):** which planar/chaos outcomes? *Default:* generic chaos roll the player interprets.
- **Sound palette (P7.8):** vibe? *Default:* soft, low, synthesized UI/combat cues.
- **Enemy "play this card" mana (P6.5):** spend vs free override? *Default:* offer both.
- **Stack popup (P1.10):** docked-dismissible panel vs full modal overlay? *Default (unless you say):* a docked, auto-surfacing popup that doesn't block the board, openable on demand.
- **Resource-token representation (P16.2):** dedicated arrays (`S.my.resources`/`S.enemyResources`) vs. tagging existing artifact tokens? *Default:* dedicated arrays (cleaner, recommended).
- **Life-reset baseline (P16.4):** literal 40 vs. the player's starting/max life? *Default:* literal 40 per the user's instruction (flag if `youMax`/start-life ever diverges from 40).
- **Enemy resource-token automation depth (P16.3):** how much beyond Treasure-for-mana to auto-model? *Default:* Treasure-for-mana is must-have; Food/Clue auto where clean, Blood + anything unclear as a manual reminder (nothing silently dropped).
- **Lands-only mana balance (P14.10 / P17.1):** ~~removing the opening mana + scrounge floor is a significant difficulty swing — confirm before building?~~ **DECIDED by the user (Phase 17)** — zero opening mana, no scrounge floor, mana strictly from played lands; the 7-card hand + mulligan (P17.2) and difficulty levers move onto HP/luck/land-density instead of free mana.
- **Mulligan land threshold (P17.2):** keep mulligan-while-`<3` lands, or also mulligan a land-flooded hand (e.g. `>5`)? *Default:* low-end only (`<3` lands) per the user; no flood mulligan, card-count penalty optional (see P17.2).
- **Enemy discard AI (P17.3):** how "wise" should the discard-to-7 pick be? *Default:* reuse the existing cast-value/threat scale — discard the lowest-value, most-redundant card (excess land beyond what it needs, then lowest `castValue`); never discard its last/needed land.
