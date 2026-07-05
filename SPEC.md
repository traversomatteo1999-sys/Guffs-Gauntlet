# Guff's Gauntlet — Build Spec & Progress Tracker

> Living document. Work **phase by phase, top to bottom**. After every task the game must still
> boot, start a run, walk a full turn cycle, and win/lose without a console error — that is the
> implicit acceptance criterion on *every* task. Update the **STATUS** block below as work lands.

---

## STATUS (update as you go)

- **Branch:** `main` (== `origin/main` == `0af2bb0`, 2026-07-02 — the Phase 40 merge; the old `satchel-lock-commander-scryfall` feature branch no longer exists). **Phases 0–40 ALL BUILT, merged & pushed** (each: per-task jsdom driver + syntax gate + id-diff + adversarial review, full regression green at every merge). **NEW (specced 2026-07-04, NOT built): Phases 41–46 — the full-game rework:** Guff red-beard lore fix (41) · item duration & economy coherence, incl. the immortal-passives root-cause fix (42) · **Campaign & Sandbox two-mode + multi-level infrastructure** (43) · enemy realism & balance pass 2 (44) · UI/animation/sound overhaul (45) · completeness & hardening + the final clean-up/validation gate (46). Platform decision **D4 (stay web/PWA — no engine port)** and app-strategy decision **D5 (one responsive app)** adopted in §3.
- **Canonical file:** `index.html` (the deployed PWA build). ⚠ **Line 614 is a ~1.6 MB single-line base64 `ART` blob — never Read/print any range spanning line 614** (it drifted from the old line 456; re-check with `grep -n 'const ART='` before trusting this number). The one `<script>` block runs ~613→3247 (real JS from ~615); CSS ~18–336; HTML body ~337–612. `guffs-gauntlet-level1.html` was deleted 2026-06-27 — `index.html` only.
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
| **Phase 8 — Real MTG card import (Scryfall)** | ✅ **DONE & merged + live-verified** — P8.1–P8.5 shipped in `index.html`; **live-online smoke PASSED 2026-07-02** against the real `api.scryfall.com` both headless (`sfSearch`/`sfFetch`/`buildImportedCard` — Lightning Bolt → instant·dmgBoss 3·cost 1) and in a real chromium browser (✦ Cast → searched "goblin guide" → fetched + rendered the card with art, 2/2 haste, ready to Cast/Save; offline banner hidden; 0 console errors). Note: Scryfall now requires a `User-Agent`, which every browser sends automatically. |
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
| **Phase 15 — Economy, rewards & difficulty balance** | ✅ **DONE & merged** — end-of-level gold wheel-spin · store/loot overhaul (fix Tonic of Vigor dup · +legendary rarity · item variety · gold tuning) · persist unused satchel items across runs · difficulty-scaled heal on descend. See Phase 15 below |
| &nbsp;&nbsp;P15.1 End-of-level gold wheel-spin (%/double/rare-legendary item) | ✅ **DONE & verified** (`WHEEL` d100 slices 50/100/150%/2×/rare/legendary; `spinWheel(roll,base)` headless-safe core + `pickByRarity`; Fortune-Wheel overlay on `win()` → Claim applies + runs the victory cutscene; backdrop-dismiss still claims (no lost reward). 15-check jsdom + adversarial review, 1 finding fixed) |
| &nbsp;&nbsp;P15.2 Store & loot overhaul (Tonic fix · legendary tier · variety · gold tuning) | ✅ **DONE & verified** (Tonic = legendary heal-20/+5-max (no longer dup of Spark); `legendary` rarity recognized in satchel+store with violet accent CSS; +6 items filling category/rarity gaps (acid·buckler·tome·surge·rally·comet); every category has a rare; prices on rarity bands (Tonic a deliberate 28g budget-legendary). 12-check jsdom) |
| &nbsp;&nbsp;P15.3 Persist unused satchel items across runs (profile stash) | ✅ **DONE & verified** (`p.stash`; `saveUnusedItems()` in win/lose before `clearSave`; `applyStashItems()` after `applyPendingPurchases` in restart/startNewDescent; separate bucket, no double-count. 7-check jsdom) |
| &nbsp;&nbsp;P15.4 Difficulty-scaled healing on descend | ✅ **DONE & verified** (`DESCENT_HEAL` table: easy ½ missing <70%, std ⅓ <50%, brutal ¼ <25%; in `advance()` after `enterRoom`, strict `<`, floor, capped; only on room transitions. 9-check jsdom) |
| **Phase 16 — Token variety (treasure/blood/utility · enemy tokens · enemy uses them) + between-boss life reset to 40** | ✅ **DONE & merged** — enemy can be given tokens (creatures share the player's token library) · resource tokens (Treasure · Blood · Clue · Food) for both sides, with expiry · enemy actively sacrifices Treasure for mana · descending past a boss resettles life >40 back to 40 (spent magic, not damage). See Phase 16 below |
| &nbsp;&nbsp;P16.1 Deploy tokens to the enemy board (creatures share the player's token library) | ✅ **DONE** |
| &nbsp;&nbsp;P16.2 Resource-token types — Treasure · Blood · Clue · Food (both sides, with expiry) | ✅ **DONE** |
| &nbsp;&nbsp;P16.3 Enemy actively uses its tokens (sacrifices Treasure for mana; temporary tokens expire) | ✅ **DONE** |
| &nbsp;&nbsp;P16.4 Between-boss life reset: life above 40 resettles to 40 on descend (spent magic, not damage) | ✅ **DONE** |
| &nbsp;&nbsp;P16.5 Info/instructions for the new token + life-reset rules | ✅ **DONE** |
| **Phase 17 — Enemy engine overhaul: lands-only mana · opening hand & mulligan · max-hand discard · attack-tax targeting** | ✅ **DONE & merged** — enemy starts with **0** mana, no scrounge floor, mana only from played lands (finalizes P14.10) · shuffle + draw a **7-card** opening hand, mulligan (reshuffle/redraw) while fewer than 3 lands · max hand size **7**, discard wisely at end of turn unless "no maximum hand size" · attack-tax **target selector** (player / planeswalkers / both) + **enemy-side** attack tax (Propaganda/Ghostly Prison/Oathkeeper the enemy controls). See Phase 17 below |
| &nbsp;&nbsp;P17.1 Enemy mana strictly from played lands — remove opening pre-seed + scrounge floor (finalizes P14.10) | ✅ **DONE** |
| &nbsp;&nbsp;P17.2 Shuffle + 7-card opening hand + mulligan while &lt;3 lands | ✅ **DONE** |
| &nbsp;&nbsp;P17.3 Max hand size 7 — discard-to-7 wisely at end of turn (unless "no maximum hand size") | ✅ **DONE** |
| &nbsp;&nbsp;P17.4 Attack-tax target selector (player/walkers/both) + enemy-side attack tax | ✅ **DONE** |
| **Phase 18 — Combat correctness: menace enforcement + keyword automation audit** | ✅ **DONE & merged** — **⚠ CONFIRMED BUG: enemy menace creatures are blockable by ONE** (works for player creatures — asymmetry). Fix `minBlockers` short-circuit + enemy-keyword carry, then audit deathtouch · lifelink · trample · first/double strike · vigilance · indestructible · protection so they auto-resolve identically for **player and enemy**, both directions. See Phase 18 below |
| &nbsp;&nbsp;P18.0 Diagnostic FIRST — pin the exact cause of the enemy-menace bug + capture regression tests (both directions) | ✅ **DONE** |
| &nbsp;&nbsp;P18.1 Fix menace: blockable only by 2+, counts as blocked only when ≥2 (enemy + player) — `minBlockers` short-circuit + keyword carry | ✅ **DONE** |
| &nbsp;&nbsp;P18.2 Combat keyword automation audit (deathtouch · lifelink · trample · strikes · vigilance · indestructible · protection) | ✅ **DONE** |
| **Phase 19 — Symmetric enemy counters: poison · commander damage · energy · experience** | ✅ **DONE & merged** — the enemy tracks the same counters the player does (today `S.counters` is player-only): poison (10 = enemy dies), commander damage (your commander dealing 21 = enemy dies), energy, experience — with adjusters, render, win-condition wiring, and auto-accrual of your commander's combat damage to the enemy. See Phase 19 below |
| &nbsp;&nbsp;P19.1 Enemy counter state + Tools-panel UI/adjusters/render (poison/10 · cmd-dmg/21 · energy · exp) | ✅ **DONE** |
| &nbsp;&nbsp;P19.2 Win-condition wiring + auto-accrual (enemy poison 10 / your cmd-dmg 21 → boss falls; commander combat dmg accrues) | ✅ **DONE** |
| **Phase 20 — Combat-count restrictions: blockable-by-N (creatures, both sides) · attackable-by-N (planeswalkers) · enemy max-blockers box** | ✅ **DONE & merged** — per-creature "blockable only by N" on the unified drawer (player + enemy; the existing `block:{min,max}`, surfaced/confirmed) · per-planeswalker "attackable only by N" cap on how many creatures may attack it · a "max blockers" box in the enemy box, mirroring the existing "max attackers". See Phase 20 below |
| &nbsp;&nbsp;P20.1 Creatures: "blockable only by N" (min/max) on the unified player+enemy drawer | ✅ **DONE** |
| &nbsp;&nbsp;P20.2 Planeswalkers: "attackable only by N" — cap attackers assignable to a walker (player + enemy) | ✅ **DONE** |
| &nbsp;&nbsp;P20.3 Enemy "max blockers" box mirroring "max attackers" (global cap on enemy blockers) | ✅ **DONE** |
| **Phase 21 — Items reliably expire after use (consumables consumed; no stale-index mis-removal)** | ✅ **DONE & merged** — user reports items not expiring after use. `useBoon` does splice the consumed item, so the prime suspect is a **stale array-index** in the satchel Use handler (removing the wrong/no item). Diagnose, switch to a stable item identity, add a regression test. See Phase 21 below |
| &nbsp;&nbsp;P21.1 Consumables reliably consumed on use (stable uid instead of array index) | ✅ **DONE** |
| **Phase 22 — Editable enemy emblem value (tune the magnitude: +2/+2 vs +1/+1, drain/gain/draw N)** | ✅ **DONE & merged** — each enemy emblem/artifact/enchant carries `auto:{k,n}` but `n` isn't editable in the row. Add a value field so the magnitude can be tuned (anthem/buff +N/+N, drain/gain/draw N), with an optional split power/toughness for buff effects. See Phase 22 below |
| &nbsp;&nbsp;P22.1 Per-emblem value editor for `auto.n` (all auto sources; optional p/t split) | ✅ **DONE** |
| **Phase 23 — Phase-out for planeswalkers + player emblems as a full system (mirror the enemy's, with target→colour)** | ✅ **DONE & merged** — add the "phase out" toggle to planeswalkers (the engine already honors `w.phased`; only the UI is missing) · give player emblems the same automation the enemy's have (templates · auto/static/trigger · effects), targetable at player or enemy, with a **blue** box when targeting the enemy and **uncoloured** when targeting the player (mirror of the enemy's red-box convention). See Phase 23 below |
| &nbsp;&nbsp;P23.1 "Phase out" toggle on planeswalkers (player walkers; enemy walker parity) | ✅ **DONE** |
| &nbsp;&nbsp;P23.2 Player emblems: full automation system mirroring the enemy's (templates · auto/static/trigger · effect engine · fire hooks) | ✅ **DONE** |
| &nbsp;&nbsp;P23.3 Player emblem targeting (player/enemy) + colour coding (enemy = blue box · player = uncoloured) | ✅ **DONE** |
| &nbsp;&nbsp;P23.4 Enemy emblem **functional** target toggle (redirect which side the effect hits; unify with the cosmetic vsYou flag) | ✅ **DONE & merged** (`emblemTarget` model · target-aware `emblemEffect`/`applyStaticEmblems` · functional `toggleEmblemVsYou`/`setEmblemTarget` · migrate `vsYou`→`target` · boss-death check when retargeted; 14-check jsdom) |
| **Phase 24 — Player spell-card zone routing: instants/sorceries → graveyard; X-button permanent removal asks graveyard/exile/none** | ✅ **DONE & merged** — a resolved player instant/sorcery goes to the player graveyard (today it vanishes) · removing a player permanent via the ✕ button opens a popup: graveyard · exile · none. See Phase 24 below |
| &nbsp;&nbsp;P24.1 Player instants/sorceries route to the graveyard on resolve | ✅ **DONE** |
| &nbsp;&nbsp;P24.2 ✕-button removal popup for permanents (graveyard / exile / none) | ✅ **DONE** |
| **Phase 25 — Refresh tab/info descriptions + open the "Your attack" box by default** | ✅ **DONE & merged** — P25.1 (Your-attack box opens by default) + P25.2 (tab notes + ⓘ INFO_TEXT + help refreshed to the built feature set). See Phase 25 below |
| &nbsp;&nbsp;P25.1 "Your attack" box starts open by default | ✅ **DONE** |
| &nbsp;&nbsp;P25.2 Refresh tab notes + ⓘ INFO_TEXT panels (+ instructions) to match current features | ✅ **DONE & merged** (tab notes + all ⓘ popups (action/enemy/player/commander/battles) + help sections (combat/enemy/emblems) refreshed for P16–P39; every infoBtn key resolves; 20-check jsdom) |
| **Phase 26 — Slay asks graveyard or exile (enemy creature death destination)** | ✅ **DONE & merged** — clicking ✦ Slay on an enemy creature opens a popup: graveyard or exile (still a death → Pit's Tithe fires; tokens cease regardless). Enemy-side, death-flavoured analog of P24.2. See Phase 26 below |
| &nbsp;&nbsp;P26.1 Slay → graveyard/exile popup (death routing; tokens cease; commander → command zone) | ✅ **DONE** |
| **Phase 27 — Collapsible Cards & Tokens sections in the Library** | ✅ **DONE & merged** — make the Library's "Cards" and "Tokens" lists expand/collapse (with a count badge when collapsed) to cut noise, reusing the P12.1 collapse idiom. See Phase 27 below |
| &nbsp;&nbsp;P27.1 Expand/collapse the Library "Cards" and "Tokens" lists (state persisted) | ✅ **DONE** |
| **Phase 28 — Base-life model + heal items (Grand Elixir +25/25g · Tonic of Vigor +10 base/36g legendary) · item automation · gold rebalance** | ✅ **DONE & merged** — a permanent base-life stat (`youMax`) that Tonic of Vigor raises +10 (and the P16.4 reset + P15.4 descent-heal both track it) · Grand Elixir heals +25 (25g) · automate items where possible · rebalance store gold prices. Refines P15.2; pairs with P16.4. See Phase 28 below |
| &nbsp;&nbsp;P28.1 Base-life model: `adjLife` stops inflating `youMax`; only max-boons raise base; reset + descent-heal track it | ✅ **DONE** |
| &nbsp;&nbsp;P28.2 Grand Elixir (+25 life · 25g) · Tonic of Vigor (+10 base · 36g legendary band) · automate items · gold rebalance | ✅ **DONE** |
| **Phase 29 — Commander zone distinction: command zone (recast tax) vs hand (base cost)** | ✅ **DONE & merged** — distinguish where the enemy commander sits: from the **command zone** it recasts at base + the +2-per-death tax (current); if it's been returned to **hand** it casts at **base cost, no tax** (standard MTG). Add a ↩-hand affordance + zone-aware cost; player-commander parity. See Phase 29 below |
| &nbsp;&nbsp;P29.1 Enemy commander hand vs command zone — base cost from hand, base+tax from command zone (+ ↩ hand, player parity) | ✅ **DONE** |
| **Phase 30 — Permanent option parity: every permanent gets the options for its kind (both sides)** | ✅ **DONE & merged** — ALL permanents (creature · artifact · enchantment · planeswalker, player AND enemy) get the full option set for their kind: protection-from-colour, **hexproof/shroud** (+ indestructible), markers/deal/copy, and **return-to-hand / exile / graveyard** — with protection/hexproof/shroud actually honoured in targeting. See Phase 30 below |
| &nbsp;&nbsp;P30.1 Protection-from-colour on planeswalkers — drawer toggles + honoured in targeting/removal | ✅ **DONE** |
| &nbsp;&nbsp;P30.2 Walker option parity sweep (token · markers/deal/copy · threat · attack-tax targeted · enemy walker) | ✅ **DONE** |
| &nbsp;&nbsp;P30.3 Artifact & enchantment drawer parity (protection · hexproof/shroud/indestructible · markers · threat) | ✅ **DONE** |
| &nbsp;&nbsp;P30.4 Universal guarantees — every permanent (both sides) can go to hand/exile/graveyard; prot/hexproof/shroud honoured wherever targetable | ✅ **DONE** |
| &nbsp;&nbsp;P30.5 Bulk "return all permanents to library" (scope yours/enemy/both · top/bottom/shuffle · tokens cease) | ✅ **DONE** |
| &nbsp;&nbsp;P30.6 Counters on ALL permanents (both sides): give +1/+1 (−1/−1 · named) · ⊖ remove · ↺ reset | ✅ **DONE** |
| &nbsp;&nbsp;P30.7 Enemy commander gets ↺ reset + ⧉ copy (the gap; `copyPermanent` must handle the `cmd` scope) | ✅ **DONE** (built within the P30 sweep — `cmdFieldCard` shows ↺ reset + ⧉ copy; `copyPermanent` handles the `cmd` scope → non-commander token copy; verified 2026-07-01) |
| **Phase 31 — Expandable enemy cards in the deck-tools (full stats + effects)** | ✅ **DONE & merged** — when looking at the enemy's library (and hand/graveyard/exile) in 🂠 Manipulate enemy deck, each card row expands to show its full stats (P/T + keywords for creatures), cost, colours, oracle text, and mechanical effect — collapsed by default to cut noise. See Phase 31 below |
| &nbsp;&nbsp;P31.1 Expandable card rows in enemy deck-tools — reveal stats/keywords/effect on click | ✅ **DONE & merged** (`fxItem` collapses to a summary; `dtToggleCard`/`_dt.expanded` + `dtExpandAll`; `fxExpandBody`/`fxEffectSummary`; `_movedCard` ids; 15-check jsdom) |
| **Phase 32 — Per-combat: negate an attacker / prevent its combat damage (one-shot)** | ✅ **DONE & merged** — in the combat resolver, per attacker: 🚫 **negate** (remove it from this combat) or 🛡 **prevent its combat damage** (one-shot Fog on that attacker) — for the enemy's attackers (and yours). The transient counterpart to P14.2's persistent Fog-Bank markers. See Phase 32 below |
| &nbsp;&nbsp;P32.1 Resolver actions: negate attacker · prevent its combat damage (this combat only) | ✅ **DONE & merged** (`combatNegate`/`combatPreventDmg` + `S.combat.prevented`; reuses P14.2's `attPrev`/attPow gate in `resolveAttack`; both directions; predict + no-leak; 9-check jsdom) |
| **Phase 33 — Auto-register enemy spawned creatures as tokens (`token:true`)** | ✅ **DONE & merged** (Phase A `77c8446`) — `applyRun` `spawn` case sets `token:true`; migrate backfills spawned bodies (no key, not `_controlled`). See Phase 33 below |
| &nbsp;&nbsp;P33.1 `spawn` case sets `token:true`; migrate backfills existing enemy tokens | ✅ **DONE & merged** (11-check jsdom `t_p33`) |
| **Phase 34 — Smarter enemy combat AI: strategic attacking, targeting & blocking** | ✅ **DONE & merged** — extend the P6.x combat AI: attack with lethal/race awareness + defensive hold-back when behind + smarter face/walker targeting; block survival-first against lethal, gang-block to kill, don't chump tramplers, exploit deathtouch/first-strike, preserve key blockers. Difficulty-scaled. See Phase 34 below |
| &nbsp;&nbsp;P34.1 Smarter attacking & targeting (lethal/race push · defensive hold-back · face vs walker) | ✅ **DONE & merged** (`vaelAttackers` lethal-push + hold-back + deathtouch-value; `aiTargets` face-lethal guard; `estimateSwingDamage`/`playerAttackPotential`; difficulty-gated) |
| &nbsp;&nbsp;P34.2 Smarter blocking (survival-first vs lethal · gang-block to kill · trample/deathtouch/first-strike-aware · preserve bombs) | ✅ **DONE & merged** (`aiBlocks` survival-first + `gangToKill` (resolveAttack-verified) + trample/FS/deathtouch-aware + bomb-preserving; 23-check jsdom; 3-lens adversarial review, all findings fixed) |
| **Phase 35 — Realistic enemy decks: real permanents · ramp/mana base · faithful card design · graveyard strategies** | ✅ **DONE & merged** — rebuild the enemy decks as believable MTG decks now that they must build mana: real (non-token) creature permanents, colour-appropriate **ramp** (rocks/dorks/rituals/lands), faithful real-card-style design with a proper curve/removal/threats/finishers (per-difficulty swaps already exist), all spells using the full player option set, and **graveyard strategies** (reanimation/recursion/aristocrats) giving black enemies — Murglax especially — a real identity. See Phase 35 below |
| &nbsp;&nbsp;P35.1 Enemy creatures as real non-token permanents (close the asymmetry; foundation for graveyard play) | ✅ **DONE & merged** (`resolveEnemyCreature` — creature cards enter real (token:false, keyed), die to `S.gy`; `removeRef` gy-routes non-tokens; 18-check jsdom) |
| &nbsp;&nbsp;P35.2 Real mana base + ramp (lands · rocks · dorks · rituals as legit sources — reconciles P17.1) | ✅ **DONE & merged** (rocks persist via `ramp`→`bossLands`; `enemyDorkMana`/`enemyManaSources`; `ritual` one-shot; dorks held back from attacking; 12-check jsdom) |
| &nbsp;&nbsp;P35.3 Faithful real-MTG-style card design + coherent balanced decks per enemy (curve · removal · threats · finishers) | ✅ **DONE & merged** (additive faithful design; all 3 decks build ~99-104/37-39 lands on every diff; every enemy card resolves without throwing; 25-check jsdom) |
| &nbsp;&nbsp;P35.4 Graveyard strategies (reanimation · recursion · aristocrats) — Murglax identity; black/Rakdos enemies | ✅ **DONE & merged** (`reanimate`/`recur`/`sac` engine + castValue/wouldDoSomething; Murglax package: raisedead/reclaim/feedpit/cullharvest; Vael reanimation; 20-check jsdom; recur-recursion HIGH fixed) |
| &nbsp;&nbsp;P35.5 Enemy spells use the full real-spell option set (parity with player mechanics) | ✅ **DONE & merged** (verified: enemy removal honours hexproof/shroud/protection/ward/indestructible; creature ETB triggers fire on resolve; 10-check jsdom) |
| **Phase 36 — Undo resets at each descent (can't undo past a descent)** | ✅ **DONE & merged** — once you descend to the next boss, the undo history clears to that point; you can't undo back into the previous battle. `advance()` calls `histReset()` (today only game-start/continue reset). See Phase 36 below |
| &nbsp;&nbsp;P36.1 `advance()` resets the undo history at the descent | ✅ **DONE & merged** (`histReset()` before the final `render()` in `advance()`; 11-check jsdom) |
| **Phase 37 — Enemy mana-box UI reflects the lands-only model** | ✅ **DONE & merged** — update the enemy box mana readout to match the built lands-only mana (P17.1): show usable mana + **mana sources (lands/ramp) count**, an honest next-turn projection, frozen, and no text implying free/pre-seeded mana. See Phase 37 below |
| &nbsp;&nbsp;P37.1 Enemy box shows usable mana · sources count · projection · frozen (lands-only) | ✅ **DONE & merged** (`manaLine`: "N usable · K source(s)"; dropped the "/ max" pool cap; "usable of pool" only under freeze; 11-check jsdom) |
| **Phase 38 — Enemy planeswalkers as cards/permanents; Vael's commander becomes a planeswalker (ult = overpowered Avatar)** | ✅ **DONE & merged** — retire the hardcoded auto-firing `S.pw`: enemy planeswalkers are **cast cards** that resolve to real walker permanents with AI-activated loyalty abilities (like the player's). Support an enemy **commander that IS a planeswalker**, and redesign Vael so his **commander is the planeswalker** whose **ultimate spawns Vael's Avatar — an overpowered bomb** (replacing the separate Nyx walker + the 5/5 Cinder Wraith ult). See Phase 38 below |
| &nbsp;&nbsp;P38.1 Enemy planeswalkers = cast cards → real walker permanents with AI-activated loyalty abilities (retire `pwAct` auto-fire) | ✅ **DONE & merged** (`S.enemyWalkers` + `mkEnemyWalker`/`enemyWalkerAct`/`enemyWalkersAct`; sorcery-speed 1/turn/empty-stack; 0→gy recastable; migrate `S.pw`→walker; 13-check jsdom) |
| &nbsp;&nbsp;P38.2 Enemy commander-as-planeswalker (parity with the player's walker-commander) | ✅ **DONE & merged** (`S.cmd.isWalker` + `wplus/wminus/wult`; cast from command zone; no attack/block; 0→command zone +tax +loyalty reset; `cmdFieldCard`/`renderCmd` loyalty render; 20-check jsdom) |
| &nbsp;&nbsp;P38.3 Vael redesign: planeswalker commander whose ult spawns an overpowered Vael's Avatar | ✅ **DONE & merged** (Vael, the Ember Tyrant — PW commander loy4/ult7; ult "Avatar of Ash" forges an 8/8 trample+haste+lifelink; Nyx/room.pw folded in; reborn 2nd life kept, no double-avatar) |
| &nbsp;&nbsp;P38.4 Sorcery-speed loyalty (main-phase, empty stack, 1/turn, player picks when) + enemy sequences stacks & reserves plays for main2 | ✅ **DONE & merged** (enemy sorcery-speed gate enforced; sequential stacks via P4.1; removal held without a target = reserve; player walkers homebrew — manual controls stay) |
| &nbsp;&nbsp;P38.5 Enemy loyalty strategy — manage +/−/ult toward the finisher, defend the walker, avoid 0 (abilities fully listed · red box · 0→gy/command-zone) | ✅ **DONE & merged** (`pickWalkerAbility`: build toward ult · snipe real ≥5 bombs · commit near ult · avoid self-destruct; difficulty-scaled; red enemy-walker box; all abilities listed; 9-check jsdom; HIGH ult-reachability review-fix) |
| **Phase 39 — Attack-target selection: swing at the enemy, its planeswalkers, or its sieges/battles (+ enemy blocks battle attacks)** | ✅ **DONE & merged** — when a boss siege/battle is in play, each of your attackers picks its target (enemy face · planeswalker · siege/battle) via a per-attacker select in the combat resolver (like the enemy-attack target panel); damage routes to the chosen target (face/loyalty/defense counters, breaking a siege at 0); the enemy can choose to block — or not — attacks aimed at its sieges/battles. See Phase 39 below |
| &nbsp;&nbsp;P39.1 Per-attacker target select on your swing (enemy · walker · siege/battle) + damage routing | ✅ **DONE & merged** (`renderCombat` you-dir select boss/`w:id`/`b:id`; `approveCombat` routes to life/loyalty/def via `perAtt.toFace`; siege break payoff; `predictCombat` split; hidden when only the face; 11-check jsdom, review clean) |
| &nbsp;&nbsp;P39.2 Enemy can block attacks aimed at its sieges/battles (aiBlocks defends them; chooses to or not) | ✅ **DONE & merged** (`enemyDefendSiege` — value-chosen legal blocker for a worthwhile siege on target-set; standard+ defends, easy lets it through) |
| **Phase 40 — Deferred keyword backlog: enters-tapped · prowess · flash + rare-evasion/goad recognition** | ✅ **DONE & merged** — clear the coverage-audit deferred backlog: real **enters-tapped** + **prowess**, and import-recognition for **flash** + the rare-evasion family so nothing is silently dropped. See Phase 40 below |
| &nbsp;&nbsp;P40.1 Enters-tapped (parse "enters tapped" → the permanent enters tapped; player + enemy creatures) | ✅ **DONE & merged** (`inferEffects`→`props.entersTapped`; `resolvePlayerItem`/`resolveEnemyCreature` honour it; 4-check jsdom) |
| &nbsp;&nbsp;P40.2 Prowess (noncreature spell → controller's prowess creatures +1/+1 EOT; both sides) | ✅ **DONE & merged** (`firePlayerProwess`/`fireEnemyProwess` on noncreature resolve; `youEnd` clears the player's until-EOT buffs like `vaelEnd` does the enemy's) |
| &nbsp;&nbsp;P40.3 Recognise flash + rare evasion (shadow/horsemanship/skulk/daunt/fear/intimidate) on import | ✅ **DONE & merged** (added to `KW_LIST` (flash/prowess) + `RECOGNISED_KW` (all) so imports round-trip + display; rare evasion is a display-only badge — no block-eligibility engine, a manual note; goad stays the existing `◐` marker; draw/tutor one-shots stay reminders — no player library) |
| **Phase 41 — Lore fix: Guff is red-bearded (MTG canon)** | ✅ **DONE & verified** — `DUNGEON[2].guffFreed[0]` recoloured to red-bearded; P11 spec echo (~1034) swapped; STORY.md §5 appearance note added; index.html has 0 old-colour hits; jsdom cutscene assert + syntax gate green |
| **Phase 42 — Item duration & economy coherence** | ⬜ **PLANNED** (specced 2026-07-04) — passives REALLY last 1 descent (stash-loop root cause) · Sapper's-Map row consumption · Scholar/Tome price-invert · heal/damage price curves (user anchor: Healing Draught 7g) |
| &nbsp;&nbsp;P42.1 Passives really expire — `saveUnusedItems` stashes consumables only (+ drop dead `descents` field) | ⬜ PLANNED |
| &nbsp;&nbsp;P42.2 Sapper's Map row consumed when the −4 fires | ⬜ PLANNED |
| &nbsp;&nbsp;P42.3 Scholar's Token ↔ Arcane Tome price-invert (premium engine vs cheap burst) | ⬜ PLANNED |
| &nbsp;&nbsp;P42.4 Price-curve rebalance (heals bulk-discount · damage premium-per-point · wheel label · Ember Sigil hook · wording) | ⬜ PLANNED |
| **Phase 43 — Campaign & Sandbox: two game modes + multi-level infrastructure** | ⬜ **PLANNED** (specced 2026-07-04) — mode select · per-profile per-mode buckets (gold/items/saves) · LEVELS registry with `DUNGEON` alias · campaign carry-over + forward-only runs · sandbox per-enemy battle select · persistent lore progress |
| &nbsp;&nbsp;P43.1 Data model & migration: per-profile `camp`/`sand` buckets + per-mode save slots (fixes the cross-profile Continue bug) | ⬜ PLANNED |
| &nbsp;&nbsp;P43.2 `LEVELS[]` registry; `DUNGEON`/`ROOM_ART` become aliases via `setLevel()`; stable per-battle ids | ⬜ PLANNED |
| &nbsp;&nbsp;P43.3 Menu rework: mode choice (⚔ Campaign / 🏟 Sandbox) + campaign screen + sandbox battle grid | ⬜ PLANNED |
| &nbsp;&nbsp;P43.4 Campaign rules: sequential level unlock · HP/gold/items carry between levels · forward-only · new run erases old | ⬜ PLANNED |
| &nbsp;&nbsp;P43.5 Sandbox rules: per-enemy unlock (flat) · single battles, no dungeon walk · HP refresh · own gold+inventory | ⬜ PLANNED |
| &nbsp;&nbsp;P43.6 Persistent progress & lore: `cleared` ledger feeds sandbox unlocks + a lore panel that no longer re-locks | ⬜ PLANNED |
| **Phase 44 — Enemy realism & balance pass 2** | ⬜ **PLANNED** (specced 2026-07-04) — mana hold-up · mid-combat trick window · dual-mode burn · walker defense/ult safety · counterspells & card advantage · deck discipline · Gate-Meteor fix · dead knobs |
| &nbsp;&nbsp;P44.1 Instant-speed realism: mana hold-up budget + the deferred P4.4 mid-combat trick window | ⬜ PLANNED |
| &nbsp;&nbsp;P44.2 Burn & removal realism: dual-mode burn (face OR creature) + threat-based removal selectors | ⬜ PLANNED |
| &nbsp;&nbsp;P44.3 Planeswalker play: defensive minus, ult safety gate, blocker-aware split attack targeting | ⬜ PLANNED |
| &nbsp;&nbsp;P44.4 Interaction & card advantage: counterspells (dormant `counter` case) + `draw` run-op + multi-kill valuation | ⬜ PLANNED |
| &nbsp;&nbsp;P44.5 Deck discipline: Murglax 103→99 · Grakk manabase/removal · curve audit · mulligan v2 (flood-aware, per-difficulty) · deeper difficulty swaps | ⬜ PLANNED |
| &nbsp;&nbsp;P44.6 Bugs & dead knobs: Gate-Meteor +2 rider · delete `DIFF.manaBonus`/`room.landStart`/`deckCopies` · bloodpact-as-permanent (optional) | ⬜ PLANNED |
| **Phase 45 — UI, animation & sound overhaul** (Moxfield-inspired desktop · card art · FX layer · fuller soundscape) | ⬜ **PLANNED** (specced 2026-07-04; governed by D5 — one responsive app) |
| &nbsp;&nbsp;P45.1 Foundation: token expansion · self-hosted fonts (offline PWA typography) · desktop legibility pass | ⬜ PLANNED |
| &nbsp;&nbsp;P45.2 Card art on board/stack/library tiles (Scryfall images already stored per card) | ⬜ PLANNED |
| &nbsp;&nbsp;P45.3 Animation/FX layer decoupled from the innerHTML-rebuild render (damage numbers · life flash · tap/move motion) | ⬜ PLANNED |
| &nbsp;&nbsp;P45.4 Sound design: wire the orphan `heal` cue + ~12 missing cues · volume slider · optional ambient pad (off by default) | ⬜ PLANNED |
| &nbsp;&nbsp;P45.5 Moxfield-style ≥1100px desktop layout (multi-pane battlefield + side rail) over the same panels | ⬜ PLANNED |
| &nbsp;&nbsp;P45.6 Stack popup stops occluding the board (dockable) + log legibility rework | ⬜ PLANNED |
| **Phase 46 — Completeness & hardening + FINAL CLEAN-UP & VALIDATION** | ⬜ **PLANNED** (specced 2026-07-04; runs LAST — the validation gate for the whole 41–45 rework) |
| &nbsp;&nbsp;P46.1 Checked-in regression suite (`package.json` + `tests/` jsdom drivers + full-descent driver; `npm test`) | ⬜ PLANNED |
| &nbsp;&nbsp;P46.2 Error reporting: `window.onerror`/`unhandledrejection` → player-visible toast + downloadable debug dump | ⬜ PLANNED |
| &nbsp;&nbsp;P46.3 ⚙ Settings panel (volume · text size · animation level · mute; consolidates exports) | ⬜ PLANNED |
| &nbsp;&nbsp;P46.4 Accessibility: `aria-live` log · dialog focus management · contrast/touch audit | ⬜ PLANNED |
| &nbsp;&nbsp;P46.5 First-run onboarding (auto-offer the tutorial once per profile) | ⬜ PLANNED |
| &nbsp;&nbsp;P46.6 Deploy pipeline: `netlify.toml` + GitHub continuous deploy + SW-bump checklist (retire manual drag-drop) | ⬜ PLANNED |
| &nbsp;&nbsp;P46.7 Code clean-up: dead `pwAct` body · legacy `S.pw` field · any 41–45 leftovers | ⬜ PLANNED |
| &nbsp;&nbsp;P46.8 FINAL VALIDATION: full regression + live browser smoke + multi-agent adversarial review + balance playtest checklist + PWA/offline/deploy verification | ⬜ PLANNED |

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
- **D4 — Platform: stay web (single-file PWA); no game-engine port (decided 2026-07-04, before the Phase 41–46 rework).** The facts: game state `S` is already a pure JSON object (`fresh()` ~874; save AND undo both `JSON.stringify` it), and the rules/AI layer is ~465 KB of working, regression-hardened JS (~576 top-level functions). A Godot/Unity port would rewrite ALL of that plus the entire UI (~81 KB HTML/CSS, ~395 inline handlers across ~215 distinct global functions, a dozen overlay dialogs), the WebAudio SFX, and the Scryfall REST client — reusing only the art, the data tables (`DUNGEON`/`FX`/`BOONS`/`STORE`) and the copy. That is months of rework for zero gameplay gain; the "real game" look/feel/sound the port would buy is achievable in place (Phase 45). **App stores stay reachable via Capacitor** wrapping this folder nearly as-is (needs a Node scaffold — none exists — plus self-hosted fonts; see P45.1/P46.6). Revisit ONLY if a future feature genuinely needs an engine (3D, heavy particle counts, controller-first play) — if so, extract the `S`-mutating logic first (its three DOM tendrils: `log()` writes, `sfx()` calls, `$()` form reads).
- **D5 — One responsive app, not separate PC/phone apps (decided 2026-07-04).** Today every screen is a single codepath (single-column flow; `.wrap` max-width 1140px; the only splits are the ≥780/680/640px duo grids, the ≤560/480/380px phone reflows, + the `pointer:coarse` touch-target block). Phase 45 adds a ≥~1100px Moxfield-style multi-pane desktop layer **over the same panel nodes** (the `buildTabs()` node-relocation pattern is the in-repo precedent for re-homing live panels without touching handlers). Two separate apps would double every future phase's build+QA for no user gain.

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
  - **Part 3e — AI polish. ✅ done** (`a073856`, `ec184b3`). **Pass 1 — cast-guard** (`enemyCastUseless` in `vaelMain`): the enemy HOLDS removal until you present a valid target (was wasting it on an empty board), and only fires an anthem with a board to buff + in main1 (where it can swing), not main2. **Pass 2 — lethal awareness** (`enemyLethalReach`): when affordable unpreventable burn/drain ≥ your life it goes for the throat, casting those spells first (and in main2, so post-combat burn finishes a chipped player). Found that the enemy's **combat was already smart** — `aiBlocks` makes favorable trades / chumps only when threatened / spares the commander; `aiTargets` kills a planeswalker when it can else goes face — so no combat changes. **Pass-review fixes** (`91a75e8`): `enemyLethalReach` now excludes variable `dieLoss` burn (Gate-Meteor's d6) so lethal is only declared on deterministic damage; `enemyCastUseless` delegates removal-target validity to the precise `enemyInstantWouldDo` (hexproof/indestructible/protection-aware) so it won't cast into a fizzle. 29-assertion AI driver + regressions green. **Remaining ⬜ = BALANCE, which genuinely needs playtest** (difficulty life/mana, card/finisher costs — can't be tuned blind). Sequencing is low-value (enemy casts resolve on the stack later, so same-turn order barely matters); instant-window gate (`Math.random()>0.4`) is the P6 placeholder. **AI LOGIC pass is functionally complete; balance is a playtest-driven follow-up.**
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

# PHASE 8 — Real MTG card import (Scryfall) ✅ DONE & merged + live-verified

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

# PHASE 9 — Complete the player's toolbox + instruction overhaul ✅ DONE & merged

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
 "Past the guttering throne the Warren narrows to one last vault — grave-cold, lit only by dying goblin-fire. In a cage of ember-iron a broad-shouldered man waits: red-bearded, seamed with old scars, and in all this dark he has not knelt.",
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

# PHASE 12 — UI & card-mechanic upgrades (collapsible panels · combat block-restrictions · clone) ✅ DONE

**Specced 2026-06-29, NOT built.** Three independent, additive features. All hooks grounded in the current `index.html` (re-grep names; line numbers drift). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**STATUS-table rows (now slotted into the table at the top of this doc — kept here too for reference):**
```
| **Phase 12 — UI & card-mechanic upgrades** | ✅ **DONE & merged** — collapsible tab panels · combat block-restrictions (+ Scryfall auto-parse + mechanic audit) · enter-as-a-copy clone |
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

**"Don't leave out any mechanic" — full coverage audit (from the 3-agent research).** The block-restriction family is the headline build; this table records EVERY card mechanic's status so nothing is silently dropped. Legend: ✅ modeled+parsed · ◐ partial · ⬜ gap. **(Reconciled 2026-07-02: every P12.2-scoped item — the two block-count families, lure enforcement, `haste` in `KW_LIST`, "can't attack", and vigilance — is now ✅ built & verified. The remaining ⬜ are the genuine deferred backlog.)**
- **Evasion:** flying ✅ · reach ✅ · menace ✅ (→ unified into min) · **can't-be-blocked-except-by-N ✅** (P12.2 `block.min`) · **can't-be-blocked-by-more-than-N ✅** (P12.2 `block.max`) · can't-be-blocked / unblockable ✅ (kw) · lure ✅ (P12.2 — enforced at approve + honoured by `aiBlocks`) · shadow / horsemanship / skulk / daunt / landwalk / fear / intimidate ⬜ (rare — deferred backlog; model as conditional block-eligibility or a manual note).
- **Combat:** trample / deathtouch / first & double strike / lifelink ✅ · vigilance ✅ (attacks without tapping — enforced in `approveCombat`, both directions; audited P18.2).
- **Static/defensive:** defender ✅ · indestructible ✅ · hexproof ✅ · protection ✅ · ward ✅.
- **Other:** haste ✅ (in `KW_LIST` + engine, added in P12.2) · "can't attack" ✅ (P12.2 — parsed + gated in `vaelAttackers` / the attack picker) · goad ◐ (manual status marker — used in play, not auto-parsed from imports) · flash ⬜ · enters-tapped ⬜ · prowess ⬜ · draw / tutor one-shots ⬜ (not parsed from card text — the enemy AI has draw/reanimate/recur via P35.4, but generic card-parsed one-shots remain deferred).
- **Scoped INTO P12.2 — ✅ all built & merged (P12.2 DONE):** (a) the two block-count families (core); (b) `haste` added to `KW_LIST`; (c) **lure** enforced ("all creatures able to block this do") at approve time + honoured by `aiBlocks`; (d) **"can't attack"** alongside "can't block" (parsed + gated in `vaelAttackers` and the your-attack picker). Everything else (shadow/flash/enters-tapped/prowess/goad-parse/draw-tutor) remains the **explicit deferred backlog** cataloged above — listed, not silently omitted.

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


# PHASE 13 — Symmetric enemy board: enemy-card editing + first-class artifacts/enchantments + deeper automation ✅ DONE

**Specced 2026-06-29, NOT built.** Two additive features the user asked for after P12. Grounded in the current `index.html` (re-grep names; line numbers drift). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**STATUS-table rows (already slotted into the table at the top of this doc — kept here for reference):**
```
| **Phase 13 — Full enemy-card editing + deeper persistent-effect automation** | ✅ **DONE & merged** — modify the enemy's spells/cards (keywords·P/T·counters·markers·stack-edit) at full parity with your own toolbox · fuller enemy artifact/enchantment automation |
| &nbsp;&nbsp;P13.1 Edit enemy permanents & stack spells (owner-agnostic editor) | ✅ **DONE** |
| &nbsp;&nbsp;P13.2 Fuller enemy artifact/enchantment automation | ✅ **DONE** |
| &nbsp;&nbsp;P13.3 Enemy artifacts/enchantments as first-class board permanents | ✅ **DONE** |
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


# PHASE 14 — Fixes & QoL: combat-damage prevention, bulk tools, enemy-card normalization ✅ DONE

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
3. **Ramp rocks (obol/altar):** ~~under the rule they're non-land mana → remove/neutralize.~~ **⤴ REVISED by the user (Phase 35.2):** ramp is *wanted* — rocks/dorks/rituals the enemy **plays** are legitimate mana sources (real decks ramp). The lands-only rule means "no **free/pre-seeded** mana" (no opening pool, no scrounge), NOT "no ramp." Keep ramp permanents as real sources per **P35.2**; only the pre-seed (#1) and the non-card `enemyMana` emblem (#3) are removed.
4. **Remove the `enemyMana` emblem template** (~1401/1422) — non-land mana.
5. **De-duplicate:** delete or clearly rename the `bossMana()` projection function so it can't be confused with the `S.bossMana` field (e.g. `projectedBossMana()`, used only for the player-turn display at ~1198/1231-1232/1646); make any kept path consistent; `usableMana()` stays the single affordability accessor.
6. **migrate:** for old saves, recompute `bossLands` to reflect lands-only (don't inflate from a stale `bossManaMax`).

**ACs:** the enemy begins a room with 0 mana and grows its pool only by playing lands (+ the anti-screw floor); ramp rocks and the mana emblem no longer grant free mana (per the chosen option); difficulty no longer changes starting mana; exactly one source of truth for current mana (`S.bossMana`/`usableMana()`), no shadowing function; freeze still works; old saves migrate without inflated mana.
**Verify:** jsdom — fresh room → `bossMana===0` until a land is played; playing a land raises usable mana by 1; ramp/emblem no longer add mana (per option); no `bossMana()` function shadowing the field; freeze/thaw intact; migrate; syntax + id-diff. **(Balance tradeoff: removing manaBonus/landStart scaling + ramp is significant — confirm the difficulty re-tune with the user before building.)**


# PHASE 15 — Economy, rewards & difficulty balance ✅ DONE

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
1. **Fix Tonic of Vigor** — make it a distinct heal that doesn't dup Spark. **⤴ SUPERSEDED by P28.2 (user, 2026-06-29):** Tonic = **+10 permanent base life** (`S.youMax+=10; S.youLife+=10;`), legendary, **36g** (legendary band floor) — build per P28.2, not this line. (Original P15.2 draft was "Restore 20 life and +5 max" at ~28g; keep `spark` as the uncommon "+5 max/heal 5" instant.)
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


# PHASE 16 — Token variety (treasure/blood/utility · enemy tokens · enemy uses them) + between-boss life reset ✅ DONE

> **✅ BUILT & verified (adversarially reviewed; 3 findings fixed).** **P16.1:** `deployTokenCfg(cfg,n,scope)` deploys a saved creature token to either board (target selector on the board + Library); default `mine` unchanged. **P16.2:** `RESOURCE_TOKENS` (Treasure/Blood/Clue/Food/custom) on dedicated `S.my.resources`/`S.enemyResources` arrays (per-board reset, migrate backfill); make/sacrifice/expire chips on both boards; player Food auto-heals, others remind. **P16.3:** `enemySacForMana` cracks enemy Treasure for mana (hooked in `vaelMain`; freeze-aware so it never wastes Treasures), enemy Food/Clue automate on sacrifice. **P16.4:** between-boss reset trims life above the **base (`youMax`)** in `advance()` before the P15.4 heal — dynamic base (post-Tonic trims to 50). **P16.5:** `INFO_TEXT` tokens + life-reset entries + ⓘ buttons. **Review fixes:** resource sacrifice no longer pays the Pit's Tithe (artifacts, not creatures — manual + AI now consistent); `enemySacForMana` freeze-guarded against wasting Treasures; player Food single-log. 24-check jsdom + full regression; id-diff adds only the 8 resource/target ids.


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

> **⤴ REVISED by the user (2026-06-29) — baseline is the player's BASE life, not a literal 40.** The reset target tracks the player's permanent base HP (`youMax` under the Phase 28 life-model), which starts at 40 and is **raised permanently by max-life boons (e.g. Tonic of Vigor +10)**. So after a Tonic the between-boss reset trims excess life down to 50, not 40 — the cap "always reflects the updated player base." See **Phase 28** for the base-life model + the items. The literal-40 design below is superseded; read it as "reset to `youMax`."

**How:**
1. In `advance()` (~1494), after `enterRoom(next)` and **before** the P15.4 descent-heal block: `if(S.youLife>S.youMax)S.youLife=S.youMax;` — trim excess **temporary** life down to the permanent base (`youMax`); never raise life, never touch life ≤ base, never lower `youMax` itself.
2. **Ordering with P15.4:** cap to base **first**, then run the missing-HP heal against the post-cap value — so a player who overhealed to 55 (base 40) starts the next boss at 40, and only *then* is "missing HP" (relative to `youMax`) considered for the descent heal. Document this in both P15.4 and here.
3. **Log** the reset distinctly from healing/damage, e.g. `✨ Temporary vigor fades — your life settles to {base} between battles.` (only when a trim actually happened). Keep the existing "life carries over" log for the at-or-below-base case.
4. **Baseline = `youMax` (dynamic), not a constant.** The reset reads the live permanent base each descent, so any Tonic-of-Vigor increase is reflected automatically (Phase 28 fixes `adjLife` so ordinary healing doesn't permanently inflate `youMax` — only explicit max-life boons do, keeping "base" meaningful).

**ACs:** descending with life > base trims it to exactly the base (`youMax`), logged as fading magic; life ≤ base is unchanged and not logged as a reset; `youMax` is never lowered; after a Tonic of Vigor (+10 base) the reset trims to the new base (e.g. 50); the reset runs only on `advance()` (not game start/restart); with P15.4 present, the base-cap applies before the missing-HP heal.
**Verify:** jsdom — base 40, `youLife=55` → 40 + reset log; base 50 (post-Tonic), `youLife=60` → 50; life ≤ base unchanged, no log; `youMax` not lowered; `enterRoom(0,true)`/restart never reset; with P15.4 stubbed, cap precedes heal; syntax + id-diff. **(Pairs with Phase 28.)**

## P16.5 — Info & instructions for the new token + life-reset rules

**Goal:** surface the new mechanics where the player will look for them — the ⓘ info popups (P1.8), the in-game instructions/help, and the lore/help copy — so nothing is undocumented (principle #5 spirit: visible, not silent).

**Grounded building blocks:** the `INFO` map + ⓘ buttons (P1.8, ~1878 area — e.g. `action:{t,h}` entries); the instructions/help sections (~1999+ "The loop", ~2008 library bullet). New tooltips reuse the existing `INFO` entry shape.

**How:**
1. **Token info:** add/extend an ⓘ entry covering token kinds (creature vs Treasure/Blood/Clue/Food), that creature tokens share one library and deploy to either board (P16.1), how to make/sacrifice resource tokens, the `expires` flag, and that the enemy will spend its own Treasure for mana (P16.3).
2. **Life-reset info:** add a short note (ⓘ near the life total and/or in the descend cutscene/help) explaining the between-boss reset to 40 and that it differs from damage — temporary magic fades; damage must still be healed with items (P16.4).
3. **Instructions/help:** add a bullet to the help/instructions section for both features. Keep copy terse, in the established voice.

**ACs:** the relevant ⓘ popups describe token kinds, dual-board deploy, resource-token use/sacrifice, expiry, the enemy's Treasure-for-mana behavior, and the 40-life reset rule; the help/instructions mention both features; no new game state.
**Verify:** jsdom/string-check — the `INFO`/help strings include the new token + life-reset copy; syntax + id-diff.


# PHASE 17 — Enemy engine overhaul: lands-only mana · opening hand & mulligan · max-hand discard · attack-tax targeting ✅ DONE

> **✅ BUILT & verified — all four.** P17.1: lands-only enemy mana (0 opening, no scrounge, `enemyMana` template removed/inert, ramp rocks kept, `bossMana()`→`projBossMana()` de-dup); finalizes P14.10. P17.2: `dealOpeningHand()` 7-card hand + mulligan-to-3-lands (cap 10). P17.3: `enemyDiscardToMax()` wise discard-to-7 + "no max hand" exemption. **P17.4** (user-reconciled): the boolean `catk.tgt` was **repurposed** to the enum `{player,walkers,both}` (`catkTgtSel` in the creature/walker drawers + cast form; migrate normalizes old booleans→`both`); `attackTax` honours `tgt` (a walkers-only tax bites only when you control a walker); the **enemy-side** attack tax (`enemyAttackTax`) sums **both** enemy-permanent `catk` (per-permanent `setObjCatk` drawer rows) **and** a generic enemy rule (`setEnemyAtkRule` + a board control), surfaced as a **reminder** when the player declares attackers. 16+16-check jsdom + full 30/30 regression; id-diff adds only `enAtkAmt/enAtkType/enAtkTgt`.


**Specced 2026-06-29, NOT built.** Requested by the user to make the enemy play by real Magic rules for mana and hand management, and to support Propaganda/Ghostly-Prison/Oathkeeper-style attack taxes the enemy controls. **This phase finalizes the open balance question in P14.10** (the user has decided: lands-only mana, no free opening, no scrounge floor). Grounded in the current `index.html` (re-grep names; line numbers drift — line 456 is the base64 `ART` blob, real JS 457→end). Each ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded enemy deck/mana/hand audit (read once for all of P17.1–P17.3):**
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
4. **Non-land mana:** remove only the **free** sources — the pre-seed (#2 above) and the non-card **`enemyMana` emblem** (~1436). **Ramp permanents the enemy plays (rocks/dorks/rituals, `run:["ramp",N]`) STAY as legitimate sources** — see the P35.2 reconciliation (real decks ramp; "lands-only" meant no *free* mana, not no ramp). `bossManaMod` (admin ritual/stax modifier) and `bossManaFrozen` (freeze) stay.
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

## P17.4 — Attack-tax target selector (player / planeswalkers / both) + enemy-side attack tax

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


# PHASE 18 — Combat correctness: menace enforcement + keyword automation audit ✅ DONE

> **✅ BUILT & verified.** **P18.0** diagnostic pinned the cause: `minBlockers`'s `||` let an explicit `block.min` (1, or 0 falling through) LOWER menace below 2. **P18.1:** `minBlockers = Math.max(explicitMin, menace?2:1)` (raises but never lowers menace, symmetric player/enemy) + a `resolveAttack` guard treating an under-min/menace partial as UNBLOCKED. **P18.2:** keyword audit → rewrote `resolveAttack` as a proper **two-step first-strike model** (simultaneous within each step), fixing 3 confirmed adversarial-review defects: (1) blocker-side first/double strike (a first-strike blocker now deals before a non-FS attacker and can kill it before taking damage / survive), (2) commander-damage counter now = the commander's ACTUAL face dealt (respects double strike, trample-over even when blocked, ward soak, "deals no combat dmg"), (3) lifelink counts only damage actually dealt (0 over a protected/prevented blocker). 29-check jsdom (every keyword, both directions) + full regression; id-diff clean. **Prereq for Phase 20 (now satisfied).**


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


# PHASE 19 — Symmetric enemy counters: poison · commander damage · energy · experience ✅ DONE

> **✅ BUILT & verified.** **P19.1:** `S.enemyCounters={poison,energy,experience,cmdDmg}` reset per-battle in `enterRoom` + per-game in `freshGameForDungeon`, backfilled in `migrate`; Tools-panel enemy row (`eqPoison/eqCmd/eqEnergy/eqExp`); generalized `cnt(k,n,side)` (enemy side logs to `dm` + checks the enemy out); `renderCounters` maps both sides. Player counters byte-for-byte unaffected. **P19.2:** `checkEnemyOut()` (mirror of `checkLose`) routes a 10-poison / 21-cmd-damage enemy through `bossDown` (Vael phase-2 + loot/clear identical to a life death; no Phoenix save); your unblocked commander's combat damage auto-accrues to `S.enemyCounters.cmdDmg` in the `dir==='you'` branch (via `perAtt.toFace`, so double-strike/"deals no combat dmg" are honored), then `checkEnemyOut`. **Prereq for P23.2 satisfied.** 17-check jsdom + full regression; id-diff adds only the 4 enemy chip ids.


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


# PHASE 20 — Combat-count restrictions: blockable-by-N (creatures) · attackable-by-N (planeswalkers) · enemy max-blockers box ✅ DONE

> **✅ BUILT & verified.** **P20.1:** creature block-by-N parity confirmed (both drawers expose the min/max steppers via `setBlockMy`/`setObjBlock`); added a `max<min` warning (`_blockWarn`, counts menace's implied 2) and a compact `blockBadge` on both boards' creature tiles. **P20.2:** planeswalker `attackableBy` cap — `setWalkerCap(id,n)` (0=unlimited), walker-drawer editor, enforced in `combatTarget` (refuse a 2nd attacker onto a cap-1 walker) + a hard guard at approve + a `predictCombat` ⚠; absent = unlimited (no migrate). Enemy walker `S.pw` stores the field (drawer parity is a follow-up — no player→enemy-walker targeting yet). **P20.3:** enemy **Max blockers** box (`#maxBlk`, mirrors `#maxAtk`) enforced in `aiBlocks` via a running `used`/`room()` cap; a menace attacker that can't reach its min within the cap is left UNBLOCKED, never partially. 15-check jsdom + full combat regression (P12.2/P14.2/P18); id-diff adds only `#maxBlk`.


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


# PHASE 21 — Items reliably expire after use ✅ DONE

> **✅ BUILT & verified (P21.1):** stable `uid` on every satchel item (`newUid()`) stamped at all creation sites (grantBoon · applyPendingPurchases · stash save/restore) + migrate backfill; `useBoon(uid)` resolves by `uid` (numeric-index fallback kept), so the Use button removes exactly that item regardless of `S.inv` mutation since render; bomb/acid/pyre/comet lethal still fires `bossDown` then removes. 7-check jsdom (incl. the stale-index diagnostic) + item regression.


**Specced 2026-06-29, NOT built.** User reports satchel items **not expiring after use**. Diagnose-then-fix (the P18-style approach). Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit (what the code does today):**
- **Consumption already exists:** `useBoon(i)` (~1610) reads `S.inv[i]`, applies the effect per `it.id` (heal5/heal10/elixir/tonic/antidote/bomb/pyre), logs "Used …", and **`S.inv.splice(i,1)`** — then `render()`. So a consumable *is* meant to be removed.
- **The Use button (prime suspect):** `satchelHTML` (~2671) renders `onclick="useBoon(${i});openSatchel()"`, where `i` is the **array index captured at render time** from `items.map((it,i)=>…)` (`items=S.inv`, unfiltered). **Risk:** the index is stale if `S.inv` changed since render (loot dropped, another item used, a re-order) — `splice(i,1)` then removes the *wrong* item (or none), leaving the just-"used" item sitting in the satchel. Items have **no stable identity** today (`{id,descents}` only), so index is the sole handle.
- **Passives/reminders:** non-consumables (ward/aegis/scholar/map) aren't "used" — they last exactly one descent and are wiped when `fresh()` clears `S.inv` at the next descent (P14.5). Not the reported problem, but verify they don't linger across descents.
- **Instants:** `spark` etc. apply in `grantBoon` and never enter `S.inv` — nothing to expire.

## P21.1 — Consumables reliably consumed on use (stable identity, not array index)

**Goal:** using a consumable **always** removes exactly that item from the satchel, every time, regardless of what else changed in `S.inv` — and the satchel reflects it immediately.

**How:**
1. **Diagnose first (capture the failing case):** a jsdom test that builds `S.inv` with several items, renders `satchelHTML`, then simulates using a consumable whose render-time index no longer matches (e.g., an earlier item removed / loot pushed) → assert today's `useBoon(i)` removes the wrong item or none. Record the exact failure.
2. **Stable item identity:** stamp a unique `uid` on every satchel item at creation — `grantBoon` (~1611, `S.inv.push({id,descents:1,uid:…})`) and `applyPendingPurchases` (~2052). `migrate()` (~2267) backfills a `uid` on existing `S.inv` items. (No `Date.now()`/random constraints here — this is game code, not a workflow script.)
3. **Remove by uid, not index:** change the Use button to pass the uid (`useBoon('${it.uid}')`) and have `useBoon` resolve `const i=S.inv.findIndex(x=>x.uid===uid)` before applying/splicing. Keep a numeric-index fallback for safety only if needed. This makes consumption robust to any `S.inv` mutation between render and click.
4. **Guaranteed re-render:** ensure the satchel view refreshes after use — `useBoon` already calls `render()`; keep the `openSatchel()` re-render (or fold it in) so the modal always shows the post-use list. Confirm the You-panel `satchelCount` (~1305) updates too.
5. **Audit every consumable id** in `useBoon` (~1610) reaches the splice (no early `return` before it for any consumable branch) and that bomb/pyre's post-`bossDown` path still removes the item (it splices before the `bossDown` check — verify).

**ACs:** using any consumable removes exactly that item (verified even when `S.inv` changed since the satchel was rendered); the satchel + You-panel count update immediately; passives/reminders still expire at descent end (not lingering); instants never enter the satchel; old saves get uids via migrate; using a consumable that drops the boss to 0 (bomb/pyre) still both fires `bossDown` and removes the item.
**Verify:** jsdom — the diagnostic from step 1 now passes (correct item removed by uid under a mutated `S.inv`); each consumable id decrements `S.inv.length` by exactly 1 and applies its effect once; bomb/pyre lethal still calls `bossDown` and removes the item; passives cleared on `fresh()`/new descent; migrate backfills `uid`; syntax + id-diff.


# PHASE 22 — Editable enemy emblem value (tune the magnitude) ✅ DONE

> **✅ BUILT & verified (P22.1):** every auto emblem/artifact/enchant row shows a kind-labelled value input (`emblemValueInput` → `setEmblemValue(id,n)` via `findEnemyFx`, clamp ≥0) bound to `auto.n`, across all three enemy auto arrays; reminders (no auto) show no input. Live: a tuned drain/gain drains/gains the new `n` on its trigger, a static anthem reflects +N/+N in `effP/effT`, a buff adds +N/+N counters on fire. Symmetric `n` only (no p/t split, per the user's decision). Round-trips via `S`. **Prereq for P23.3.** 10-check jsdom + P13.2 regression; id-diff clean.


**Specced 2026-06-29, NOT built.** The user wants to tune an enemy emblem's numeric strength — e.g., make an anthem/buff **+2/+2** instead of +1/+1, or change a drain/gain/draw amount. Today the magnitude is fixed at the template's value with no in-row editor. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Where the value lives:** every automated enemy persistent-effect carries `auto:{k,n}` — `k` is the effect kind, **`n` is the magnitude**. Templates in `ENEMY_EMBLEMS` (~1469, e.g. `{n:'Growth +1/+1…',auto:{k:'buffEnemyCreatures',n:1}}`); `addEnemyEmblem` (~1490) deep-copies the template's `auto` so each instance owns its `n`.
- **How `n` is consumed:** `emblemEffect(em)` (~1497) reads `n=a.n` — `enemyGain` heals `n`, `youLose` drains `n`, `enemyDraw` draws `n`, `buffEnemyCreatures` adds `+n/+n` counters; `applyStaticEmblems` (~1512) applies `_stp+=n;_stt+=n` for `anthemEnemy`/`buffEnemyCreatures` (continuous, symmetric p/t).
- **Row controls (the gap):** `renderEnemyEmblems` (~1530-1543) renders per-row: ⚡ auto/⟳ static toggle, attach select (`emblemAttachSel`), trigger select (`emblemTriggerSel`), vsYou, ▸ fire, remove, and inline name/note via `setEnemyEmblem(id,f,v)` (~1494, sets a **top-level** field). **No control edits `em.auto.n`.**
- **Persistence:** `auto` is part of `S.emblemsEnemy`/`S.enemyArtifacts`/`S.enemyEnchants` → editing `auto.n` round-trips through save/undo for free; no migrate needed (existing `n` preserved). The auto engine spans all three arrays via `enemyAutoSources()` (~1506).

## P22.1 — Per-emblem value editor for `auto.n` (all auto sources; optional power/toughness split)

**Goal:** every automated enemy emblem/artifact/enchant row shows a numeric **value** control that edits its magnitude, so the player can tune it (e.g. anthem/buff +1/+1 → +2/+2, drain 2 → 4, draw 1 → 2). Applies to all three enemy auto arrays uniformly.

**How:**
1. **Nested setter:** add `setEmblemValue(id,n)` (mirror of `setEnemyEmblem`, via `findEnemyFx`) that writes `em.auto.n = Math.max(0, n|0)` (guard non-negative; allow 0), logs the change to `dm` (e.g. `✦ {name}: value set to N`), and `render()`s.
2. **Row UI:** in `renderEnemyEmblems` (~1539+), for any row where `em.auto` exists, render a small number input (e.g. `<input type="number" min="0" value="${em.auto.n}" onchange="setEmblemValue(${em.id},+this.value)">`) with a context label that adapts to the kind — "+N/+N" for `buffEnemyCreatures`/`anthemEnemy`, "N life" for `enemyGain`/`youLose`, "N cards" for `enemyDraw`. Reminder rows (no `auto`) show no value field.
3. **Live effect:** because `emblemEffect`/`applyStaticEmblems` already read `auto.n`, changing it immediately changes the result — a static anthem re-applies the new `_stp/_stt` next render; a triggered drain/gain/draw uses the new `n` on its next fire. Confirm the template label text (the fixed "+1/+1" string in `em.name`) doesn't mislead after tuning — either update the displayed name to reflect `n`, or show the live value beside it so the row reads truthfully.
4. **Optional power/toughness split (buff/anthem):** to allow **+2/+1**-style asymmetry, optionally extend `auto` with `np`/`nt` (default both = `n`); `buffEnemyCreatures`/`anthemEnemy` use `np` for power and `nt` for toughness when present, else fall back to `n`. **Default: keep the single symmetric `n`** (matches the user's +2/+2 example); ship the split only if asymmetry is wanted — flag it as the open choice.

**ACs:** an auto emblem/artifact/enchant row shows a value editor bound to `auto.n`; raising a buff/anthem to 2 yields +2/+2 (counter on fire, or `_stp/_stt` if static); raising a drain to 4 drains 4 on its next trigger; draw/gain likewise; the row label reads truthfully after tuning (no stale "+1/+1"); reminders show no value field; value persists through save/undo; player emblems (`S.my.emblems`) are out of scope (note-only today).
**Verify:** jsdom — `setEmblemValue(id,2)` sets `auto.n===2`; firing a `buffEnemyCreatures` emblem then adds +2/+2; a static anthem reflects +2/+2 in `effP/effT` via `applyStaticEmblems`; a `youLose` at n=4 drains 4 on trigger; value round-trips through serialize; reminder rows render no input; syntax + id-diff.


# PHASE 23 — Phase-out for planeswalkers + player emblems as a full system (mirror the enemy's) ✅ DONE

> **✅ BUILT & verified (adversarially reviewed; 5 findings fixed).** **P23.1:** walker phase-out toggle (`flagMy('walkers',id,'phased')`) + dimmed `.brow.phased` + badge; `applyTarget` also now filters phased walkers (parity with the other two targeting paths). **P23.2:** `PLAYER_EMBLEMS` + `addPlayerEmblem` (template select), structured `S.my.emblems`, `playerEmblemEffect`/`firePlayerEmblems` (fired from `youUpkeep`/`youEnd`/`vaelUpkeep`), `applyStaticEmblems` extended with a player-static pass; migrate backfills old emblems. **P23.3:** `renderMyEmblems` full row parity + a blue `.brow.vsenemy` when the emblem targets the enemy; static emblems derive colour from the effect kind (toggle locked) so the box can't lie; the turn-phase guards stop on `S.over||S.paused` (a player emblem felling a mini-boss no longer lets enemy automation run on a cleared encounter). **Prereqs P19 + P22 satisfied.** 21+6-check jsdom + full regression; id-diff adds only `#pEmbTemplate`.


**Specced 2026-06-29, NOT built.** Two requests: (a) let planeswalkers phase out like creatures; (b) give the player's emblems the same automation the enemy's have, targetable at player or enemy, with a colour convention mirroring the enemy's red box. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

## P23.1 — "Phase out" toggle on planeswalkers

**Goal:** a planeswalker can be phased out (and back) like a creature; while phased it's absent from combat/targeting.

**Grounded findings:** `phased` is a creature flag toggled in the drawer flags row (`flagMy('${cat}',${id},'phased')`, ~1394). **The engine already honors `w.phased` for walkers** — `aiTargets` (~1440) and `renderCombat` (~1196) both `S.my.walkers.filter(w=>!w.phased)`. The gap is purely UI: `walkerDrawer(w)` has no phase-out toggle, and a phased walker isn't visually marked (the `.crea.phased` dim style ~146 is for creature tiles; walkers render as `.brow` rows ~1348).

**How:**
1. **Walker drawer toggle:** add a "phase out" flag button to `walkerDrawer(w)` (reuse `flagMy('walkers',id,'phased')`), matching the creature/artifact flags row.
2. **Visual mark:** show a "phased" badge on the walker row and/or dim it (a `.brow.phased`/`tapped`-style class) so the state is visible, like creatures.
3. **Confirm engine coverage:** `aiTargets`/`renderCombat` already skip phased walkers; verify no other walker path (loyalty-damage assignment, pwAct for the enemy walker) mis-treats a phased walker. The player walker is the focus.
4. **Enemy walker parity:** `S.pw` (the enemy planeswalker) — expose the same toggle where its editor is reachable (P13.1 owner-agnostic editing); if `S.pw` has no drawer yet, note it as a parity follow-up rather than building a new editor here. `phased` defaults false; `migrate`/`fresh` need nothing new (absent = not phased).

**ACs:** a player walker can be toggled phased/unphased from its drawer; while phased it can't be attacked (enemy `aiTargets`/combat skip it) and is visually marked; unphasing restores it; round-trips through save/undo; the enemy walker gets the same toggle where editable (or a noted follow-up).
**Verify:** jsdom — `flagMy('walkers',id,'phased')` sets `w.phased`; `aiTargets`/`renderCombat` exclude it; the row shows the phased mark; round-trip; syntax + id-diff.

## P23.2 — Player emblems: full automation system mirroring the enemy's

**Goal:** the player's emblems gain the same machinery the enemy's have (today `S.my.emblems` are plain `{id,name,note}` text rows with no automation) — template picker, optional auto/static effects, trigger windows, and a real effect engine — so a player emblem can actually *do* something each turn, not just remind.

**Grounded building blocks (mirror these):** enemy side = `ENEMY_EMBLEMS` templates (~1487), `addEnemyEmblem` (~1508), `emblemEffect` (~1515, kinds: `enemyGain`/`youLose`/`enemyDraw`/`anthemEnemy`/`buffEnemyCreatures`/`spawnToken`), `fireEnemyEmblems(window)` (~1528) called from `vaelUpkeep`/`vaelEnd`/`youUpkeep`, `applyStaticEmblems` (~1531) for continuous buffs (`_stp/_stt`), `findEnemyFx`/`setEnemyEmblem`/`toggleEmblemAuto`/`emblemTriggerSel`. Player static buffs already share the `_stp/_stt` fields on `S.my.creatures` (`effP/effT` read them, ~976).

**How:**
1. **`PLAYER_EMBLEMS` templates** — the mirror set, each `{n,note,auto:{k,n},static?,trigger?}`: `youGain` (you gain N), `enemyLose` (enemy loses N), `youDraw` (you draw N — reminder, you draw physically), `anthemYou`/`buffYourCreatures` (+N/+N to YOUR creatures, static or counter), `debuffEnemyCreatures` (−N/−N to enemy creatures), plus an anthem-you static. Templates carry a default target (see P23.3).
2. **`addPlayerEmblem()`** mirrors `addEnemyEmblem` — deep-copy the template's `auto`, push to `S.my.emblems` with `{auto,autoOn,static,trigger,attachId,target}` (replacing the bare `{name,note}`). Add a template `<select>` + "+ add" beside the player Emblems sub-head (~435), like the enemy one (~411). Keep blank `addEm()` as a manual/reminder option.
3. **`playerEmblemEffect(em)`** mirrors `emblemEffect` for the player's benefit/offense: `youGain`→`adjLife('you',n)`; `enemyLose`→`S.boss.life-=n` (+ `checkEnemyOut()` per P19 if present); `youDraw`→reminder log; `anthemYou`/`buffYourCreatures`→ counter `+n/+n` on `S.my.creatures` (and the on-board commander); `debuffEnemyCreatures`→ `minus` on enemy creatures. Log to the `you` channel.
4. **`firePlayerEmblems(window)`** mirrors `fireEnemyEmblems` — iterate `S.my.emblems` auto, non-static, matching trigger; call from **`youUpkeep`** (~1773, window `upkeep`) and **`youEnd`** (window `endStep`); optionally an `enemyUpkeep` window. `checkLose`/`checkEnemyOut` after.
5. **Static:** extend `applyStaticEmblems` (~1531) to also walk `S.my.emblems` static entries and apply `_stp/_stt` to `S.my.creatures` (player anthem), mirroring the enemy block — recomputed each render.
6. **migrate:** backfill the new fields on existing `S.my.emblems` (`auto:null,autoOn:false,static:false,trigger:'upkeep',attachId:null,target:'player'`) so old saves don't break; round-trips for free (all in `S.my`).

**ACs:** a player emblem from a template fires its effect on the chosen trigger (you gain / enemy loses / you draw / your creatures get +N/+N); a static player anthem shows continuously in your creatures' `effP/effT`; manual/reminder emblems still supported; everything round-trips + migrates; the enemy emblem system is unchanged.
**Verify:** jsdom — `addPlayerEmblem` builds the structured object; `firePlayerEmblems('upkeep')` applies `youGain`/`enemyLose`/buff; a static `anthemYou` reflects in `effP`; fires from `youUpkeep`/`youEnd`; migrate backfills old emblems; enemy emblems untouched; syntax + id-diff.

## P23.3 — Player emblem targeting (player/enemy) + colour coding

**Goal:** each player emblem is flagged as targeting the **player** or the **enemy**; the row is coloured **blue** when it targets the enemy and **uncoloured** when it targets the player — mirroring the enemy convention (an enemy emblem that hits *you* is red; one that affects the enemy itself is uncoloured).

**Grounded building blocks:** enemy uses `vsYou` (red) — set on add (`vsYou=t.auto.k==='youLose'||'debuffYou'`, ~1509), toggled by `toggleEmblemVsYou` (~1539), rendered as `.brow.vsyou` (red CSS ~77). The player needs the symmetric `.brow.vsenemy` (blue).

**How:**
1. **Target field** `target ∈ {player,enemy}` on player emblems (or a `vsEnemy` boolean). Default derived from the effect kind on add — `enemyLose`/`debuffEnemyCreatures` → `enemy`; `youGain`/`youDraw`/`anthemYou` → `player` — and manually toggleable (`togglePlayerEmblemTarget`, mirror of `toggleEmblemVsYou`).
2. **Colour CSS:** add `.brow.vsenemy{border-color:var(--azor);background:linear-gradient(180deg,rgba(77,168,218,.12),var(--ink-3))}` (blue, mirroring the red `.vsyou` at ~77 using the existing `--azor` blue token). Apply `vsenemy` to the row when `target==='enemy'`; no class when `target==='player'`.
3. **Row UI parity:** upgrade the player emblem render (~1349) to the full control set used by `renderEnemyEmblems` — name/effect edit, value editor (P22-style), auto/static toggle, trigger select, attach select (for anthems), a **target toggle** (player/enemy), fire, remove — so player and enemy emblem rows are at parity. (Factor the shared row renderer if practical, or mirror it.)
4. **Label** the target on the row ("targets enemy"/"targets you") and log target changes to the `you` channel.

**ACs:** a player emblem targeting the enemy shows a blue box; targeting the player shows uncoloured; the target can be toggled; the default target matches the effect kind; player rows have the same controls as enemy rows; round-trips + migrates; the enemy red-box behavior is unchanged.
**Verify:** jsdom — a player emblem with `target='enemy'` renders `.brow.vsenemy` (blue), `target='player'` renders no colour class; toggling flips it; default target derives from kind; the row exposes the full control set; syntax + id-diff (only the new `.vsenemy` class + player-emblem control ids).

## P23.4 — Enemy emblem **functional** target toggle (redirect which side the effect hits)

**Goal:** an enemy emblem's target can be **changed**, and changing it actually **redirects which side the effect acts on** — the mirror of P23.3 for the player. Today the enemy's `vsYou` toggle is **cosmetic only** (just the red box, `toggleEmblemVsYou` ~1539); the effect kind is fixed. Make it functional and unify the color with the target.

**Grounded building blocks:** `emblemEffect(em)` (~1515) applies `enemyGain`→`bossHealLife`, `youLose`→`S.youLife-=n`, `enemyDraw`→`vaelDraw`, `buffEnemyCreatures`/`anthemEnemy`→ enemy creatures; `applyStaticEmblems` (~1530) applies the static buffs to enemy creatures. `vsYou` flag + `toggleEmblemVsYou` set the red `.brow.vsyou` box. P23.3 introduces the same `target` model for player emblems.

**How:**
1. **Model an emblem as (effect, target-side):** add a `target ∈ {you, enemy}` field to enemy emblems (unify the existing `vsYou` into it — `vsYou` becomes `target==='you'`). The **kind** says what the effect does (gain life / lose life / buff creatures / draw); the **target** says **whose** life/creatures/draw it touches. So a drain can hit **you** or the **enemy itself**; a +N/+N buff can target **enemy** creatures or **your** creatures (a debuff-style use); a life-gain can heal the enemy or you; a draw can fill the enemy's hand or be a reminder for yours.
2. **Effect engine honours target:** update `emblemEffect`/`applyStaticEmblems` so each kind reads `target` and applies to that side (e.g. `loseLife` → `target==='you'?S.youLife-=n : bossDown-aware S.boss.life-=n`; `buffCreatures` → the chosen side's creature array via the P30.6/`setCtr` plumbing). Keep the default target = the kind's natural side (so existing emblems behave unchanged unless retargeted).
3. **Functional toggle + colour:** generalize `toggleEmblemVsYou` into a target toggle (`setEmblemTarget`/keep the name) that flips `target` AND the box colour — `target==='you'` → red `.brow.vsyou` (hits you), `target==='enemy'` → uncoloured (affects the enemy itself). This makes the red box mean what it shows.
4. **Symmetry with P23.3:** player and enemy emblems now share the **same (kind, target) model** — player target player(uncoloured)/enemy(blue); enemy target enemy(uncoloured)/you(red). Factor the shared logic if practical.
5. **migrate:** backfill `target` on existing `S.emblemsEnemy` from `vsYou` (`target = vsYou ? 'you' : 'enemy'`); round-trips for free.

**ACs:** an enemy emblem's target can be toggled and the effect follows (a drain retargeted to the enemy now reduces `S.boss.life`; a +N/+N retargeted to your creatures buffs yours; etc.); the box colour matches the target (red = hits you, uncoloured = affects the enemy); defaults preserve current behavior; old saves migrate `vsYou`→`target`; player-emblem targeting (P23.3) and enemy-emblem targeting share one model.
**Verify:** jsdom — `setEmblemTarget(id,'enemy')` on a `youLose` emblem → firing it reduces `S.boss.life` (not yours) and the row is uncoloured; `'you'` → reduces `S.youLife` + red box; a buff retargeted to your creatures raises their `effP/effT`; migrate maps `vsYou`→`target`; syntax + id-diff. **(Mirror of P23.3; pairs with it.)**


# PHASE 24 — Player spell-card zone routing: instants/sorceries → graveyard; ✕-removal asks graveyard/exile/none ✅ DONE

> **✅ BUILT & verified.** **P24.1:** a resolved player instant/sorcery is pushed to `S.myGy` as a `{name,color,ctype,_spell:true}` record (after its effect resolves); the gy row shows a "spell" badge with no battlefield-return button, and `myGyReturn` guards `_spell` (returns to hand, never re-enters as a creature). **P24.2:** `rmMy` on a real permanent opens a graveyard/exile/none popup → `removeMyTo` routes via the **non-death** `moveBoardCard` (no Pit's Tithe; stamps `_cat` so a return restores the right kind) or plain-splices for "none"; commanders still go to the command zone, tokens cease without a prompt. 15-check jsdom + full regression; id-diff clean (popup uses no ids).


**Specced 2026-06-29, NOT built.** Make the player's spell cards end up in a real zone like the enemy's do: a resolved instant/sorcery goes to the graveyard, and removing a permanent from the board (incl. the manual ✕) asks where it goes. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Player graveyard/exile exist:** `S.myGy` / `S.myExile`, rendered in the "Your zones" panel with return/exile chips (`renderMyZones` ~1418, `myGyReturn`/`myGyToExile` ~1421-1422, `moveZoneCard` for `pGy`/`pExile` ~1426).
- **Permanents already route on *death*:** `killMy` (~1073) sends a dead player permanent to `S.myGy` (or `S.myExile` if `dies==='exile'`), with the token-ceases short-circuit. P9.1 `moveBoardCard(obj,'graveyard'|'exile')` (~1095-1096) is the **non-death** clean mover (no Pit's Tithe).
- **Gap 1 — instants/sorceries vanish:** `resolvePlayerItem` (~1864) handles creature/artifact/enchantment/planeswalker by pushing a board object; the final `else` (~1869) for **instant/sorcery** applies the auto effect / logs "resolves" but **never pushes to `S.myGy`** — the spell card simply disappears. (Enemy spell cards do route to the enemy graveyard on resolve.)
- **Gap 2 — ✕ just deletes:** `rmMy(cat,id)` (~1567) routes a commander to the command zone, else **splices the permanent with no zone choice** — it's gone, no graveyard/exile/none prompt. The `$("overlay")`/`$("modalBody")` modal (used by `openClonePicker`) is the popup infra to reuse.

## P24.1 — Player instants/sorceries route to the graveyard on resolve

**Goal:** when a player instant or sorcery resolves, its card goes to the player graveyard (`S.myGy`), so every spell card ends up in a zone — matching the enemy.

**How:**
1. In `resolvePlayerItem` (~1869), after the non-permanent spell resolves (the `else` branch covering instant/sorcery), push a card record to `S.myGy`: `{name:p.name, color:(p.color||[]).slice(), ctype:p.ctype, _spell:true}` (a minimal shape `renderMyZones`/`colorDots` can render). Log "→ your graveyard" on the `you` channel.
2. **Scope:** only spells that don't become a permanent — i.e., `ctype==='instant'||ctype==='sorcery'` (and any non-permanent that hits the `else`). Permanents are unaffected (they live on the board; they route to a zone later via death/P24.2). Clones/copies (`pr.clone`) and token spells are permanents — unchanged.
3. **Return semantics:** an instant/sorcery in the graveyard should sensibly return **to hand**, not the battlefield — `myGyReturn` (~1421) pushes to `S.my[_cat||'creatures']`. Guard it: a `_spell` graveyard card uses the return-to-hand path (`moveZoneCard('pGy',i,'hand')`) and is **excluded** from "return to battlefield" (or returning it to the board is blocked/hidden). Keep `_cat` unset on spell records so they never wrongly enter as creatures.
4. **Flashback-style note:** no flashback mechanic is implied — the card just rests in the graveyard (manual tools can move it). Round-trips for free (`S.myGy` serializes).

**ACs:** resolving a player instant or sorcery adds it to `S.myGy` (visible in Your zones, with colour dots), logged; a resolved permanent does NOT add a duplicate graveyard entry; a `_spell` graveyard card returns to hand (not as a creature) and isn't offered "return to battlefield"; round-trips through save/undo.
**Verify:** jsdom — resolve an instant → `S.myGy.length` +1 with `_spell:true`; resolve a creature → no spell graveyard entry; `myGyReturn` refuses/omits a `_spell` card to the battlefield while hand-return works; serialize round-trip; syntax + id-diff.

## P24.2 — ✕-button removal popup for permanents (graveyard / exile / none)

**Goal:** removing a player permanent from the board — including the manual ✕ button — prompts for where it goes: **graveyard**, **exile**, or **none** (removed without entering a zone).

**How:**
1. **Popup on ✕:** change `rmMy(cat,id)` (~1567) so that for a real (non-token) permanent it opens a small modal (reuse `$("overlay")`/`$("modalBody")`) titled "Remove {name} —" with three buttons: **⚰ graveyard**, **⊘ exile**, **✕ none (remove)**, plus cancel. Each calls `removeMyTo(cat,id,where)` then closes the modal.
2. **`removeMyTo(cat,id,where)`** — `graveyard`/`exile` reuse the **P9.1 non-death** `moveBoardCard(obj,'graveyard'|'exile')` (clean move, no Pit's Tithe — manual bookkeeping, not a combat death); `none` plain-splices the permanent off `S.my[cat]` (ceases / removed from game). Log each to the `you` channel.
3. **Special cases:**
   - **Commander:** keep the current behavior — a commander goes to the **command zone** (`sendCmdToZone`), not the gy/exile popup (or include "→ command zone" as a 4th option). Don't strand the commander in a graveyard.
   - **Tokens:** graveyard/exile don't apply (a token ceases). Either skip the popup for tokens (straight cease, as today's token rules) or show only "remove (cease)". Default: tokens cease without the 3-way prompt.
4. **Consistency:** this is a *non-death* removal path (matches the ✕'s "I'm correcting/cleaning the board" intent), so it must NOT fire death triggers (Pit's Tithe). If the user wants a *death* (with triggers), that's the existing slay/kill paths — note the distinction in the popup copy ("clean removal — no death triggers").

**ACs:** clicking ✕ on a player creature/artifact/enchant/walker opens a graveyard/exile/none popup; graveyard → `S.myGy`, exile → `S.myExile`, none → gone, each via the non-death path (no Pit's Tithe); commander still goes to the command zone; tokens cease without the prompt; the popup is cancelable (no change); all paths log + re-render.
**Verify:** jsdom — `removeMyTo` sends a permanent to `myGy`/`myExile`/nowhere per choice without firing `bloodTithe`; commander ✕ → command zone; a token ✕ ceases (no graveyard entry); cancel leaves state unchanged; syntax + id-diff (only the new popup ids).


# PHASE 25 — Refresh tab/info descriptions + open the "Your attack" box by default ✅ DONE & merged (P25.1 + P25.2)

**Specced 2026-06-29, NOT built.** Documentation/UX polish: the tab notes and ⓘ info popups predate the recent feature work and under-describe what the game now does, and the "Your attack" box starts collapsed. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

## P25.1 — "Your attack" box starts open by default ✅ DONE & verified (`defaultPanelStates` opens `p-attack` too; one-time migrate nudge opens it for existing players only when unset, never overriding an explicit collapse; 11-check jsdom + P12.1 panel regression updated)

**Goal:** the "Your attack" panel opens by default (alongside the turn-flow box), instead of starting collapsed.

**Grounded findings:** collapsible boxes default via `defaultPanelStates()` (~2684) — `out[panelKey]=(i===0)`, i.e. **only the first box** of each tab opens; the rest start closed. In the Action tab the DOM order is turn-flow (`p-turnflow`, i=0 → open), then **Your attack (`p-attack`, i=1 → closed)**, tools, battles. State persists on `S.ui.panels` (excluded from undo); `applyPanels` (~2685) seeds the defaults only when `S.ui.panels` is empty.

**How:**
1. **Default open:** change `defaultPanelStates()` so `p-attack` is open in addition to each tab's first box — e.g. `out[el.dataset.panel]=(i===0)||el.dataset.panel==='p-attack';`. Keep all other boxes' "first-open, rest-closed" behavior.
2. **Existing saves:** `S.ui.panels` already-populated saves won't change (the default only seeds an empty map). Add a **one-time migrate nudge** so `p-attack` opens for current players too — only if the player hasn't explicitly set it: in `migrate`, `if(s.ui&&s.ui.panels&&s.ui.panels['p-attack']===undefined)s.ui.panels['p-attack']=true;` (don't override an explicit `false` the user chose). Flag this as optional if we'd rather not touch saved UI prefs.
3. No schema change beyond the UI map already in `S.ui`.

**ACs:** a fresh game shows both the turn-flow and Your-attack boxes open in the Action tab; other boxes keep their first-open/rest-closed defaults; a player who explicitly collapsed Your-attack keeps it collapsed; toggling still works and persists.
**Verify:** jsdom — `defaultPanelStates()['p-attack']===true` and other non-first boxes `false`; the migrate nudge opens `p-attack` only when unset (leaves an explicit `false`); `togglePanel('p-attack')` round-trips; syntax + id-diff.

## P25.2 — Refresh tab notes + ⓘ INFO_TEXT panels (and instructions) to match current features

**Goal:** the tab subtitles and ⓘ info popups accurately and completely describe what the game now does — kept in sync as the recent feature phases land.

**Grounded findings:** tab notes are the `.tabnote` spans (~362-365): Info "you · foe · log", Action "turn flow · attack · tools", Enemy "creatures · walker · zones", Your Board "board · zones · enchantments". The ⓘ popups are `INFO_TEXT` (~2084-2095): `info/action/enemy/player/stack/commander/threat/ward/freeze/battles`. The in-game help/instructions also carry feature copy (the menu instructions + the help section). Several recently-specced/added systems are **not** reflected: token variety + resource tokens (P16), enemy counters (P19), player emblems with targeting/colour (P23), attack-tax targeting (P17.4), combat-count restrictions (P20), spell-card graveyard routing + ✕ removal popup (P24), editable emblem values (P22).

**How:**
1. **Audit each tab note + `INFO_TEXT` entry against the live feature set** and rewrite for accuracy/completeness — e.g. Enemy Board note/popup should mention emblems/counters/artifacts-enchants and the deck tools; Your Board should mention emblems-with-automation, counters, zones routing; the Action/threat/ward popups should reflect the current combat options (block-count limits, attack taxes, max attackers/blockers).
2. **Only describe what's actually built** at the time this task runs — so it should land **after** the feature phases it documents (P16–P24), or be re-run as those land. Treat it as a **living sync pass** (like P9.5's instruction overhaul), not a one-time write — note in the spec that any future feature phase includes "update P25.2 copy."
3. **Keep the voice** (terse, lore-flavored) and the existing `infoBtn`/`showInfo` mechanism; add new `INFO_TEXT` keys only if a new ⓘ button is warranted (e.g. counters, emblems, tokens).
4. Update the menu **instructions/help** copy in the same pass so all three surfaces (tab notes · ⓘ popups · help) agree.

**ACs:** every tab note and ⓘ popup reflects the current, built feature set with no stale/missing descriptions; new ⓘ entries exist where a new system warrants one; the help/instructions agree with the popups; copy stays in the established voice; no behavior change (text/UI only).
**Verify:** string/jsdom checks — each `INFO_TEXT` entry and tab note is present and mentions its system; new keys resolve via `showInfo`; no `infoBtn('key')` points at a missing entry; syntax + id-diff. **Run/refresh after P16–P24 land (living doc).**


# PHASE 26 — Slay asks graveyard or exile (enemy creature death destination) ✅ DONE

> **✅ BUILT & verified (P26.1).** `slay(id)` on a real (non-token) enemy creature opens a graveyard/exile popup → `slayTo(id,where)` fires the **Pit's Tithe** (`bloodTithe`) once, then routes the body to `S.gy`/`S.exile` as a reanimatable record via `moveBoardCard(...,quiet)`. Tokens still cease (death + Tithe, no popup); the commander still uses `slayCmdBtn`→`removeRef` (command zone). This is the **death**-flavoured counterpart to P24.2's non-death ✕ (graveyard/exile, no "none"). 9-check jsdom + full regression; id-diff clean.


**Specced 2026-06-29, NOT built.** Clicking ✦ Slay on an enemy creature should ask where the slain creature goes — graveyard or exile — instead of silently ceasing. This is the enemy-side, **death-flavoured** counterpart to P24.2 (the player's non-death ✕ popup). Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Slay path:** `slay(id)` (~1622) finds the enemy creature in `S.tokens`, logs "Slew …", and calls `removeRef(c)`. The commander uses `slayCmdBtn` (~1584) → `removeRef(S.cmd)`. Slay is wired from the enemy creature card (`enemyCard`, ~1269) and the commander card (`cmdFieldCard`, ~1807).
- **What `removeRef` does today (~1072):** commander → command zone + rising tax + `bloodTithe()`; an `S.tokens` creature → **splice (ceases) + `bloodTithe()`**; a player creature → `killMy`. So a slain enemy creature **never routes to `S.gy`/`S.exile`** — it just disappears (the Pit's Tithe death trigger still fires).
- **Zone infra to reuse:** the P9.1 non-death mover `moveBoardCard(obj,'graveyard'|'exile')` (~1095-1096) already pushes an enemy board body to `S.gy`/`S.exile` as a card record (`erec()`), and **ceases tokens** — but it does NOT fire the Pit's Tithe (it's a clean move). Enemy graveyard/exile render with reanimate/return chips (`gyToExile`/`exToGy` ~1804-1805), so a slain creature in `S.gy` can be reanimated. The `$("overlay")`/`$("modalBody")` modal is the popup infra.

## P26.1 — Slay → graveyard/exile popup (death routing)

**Goal:** ✦ Slay opens a popup asking **⚰ graveyard** or **⊘ exile**; the slain enemy creature routes there as a **death** (Pit's Tithe still fires). Tokens cease regardless; the commander still goes to the command zone.

**How:**
1. **Popup on Slay:** change `slay(id)` (~1622) so that for a real (non-token) enemy creature it opens a modal (reuse `$("overlay")`/`$("modalBody")`) titled "Slay {name} —" with **⚰ graveyard** / **⊘ exile** buttons (+ cancel). Each calls `slayTo(id,where)` then closes.
2. **`slayTo(id,where)` — death + route:** fire the death trigger once (`bloodTithe()`, matching today's `removeRef` for enemy creatures), then route the body to the chosen zone. Reuse the P9.1 push logic (graveyard → `S.gy`, exile → `S.exile`, as a card record carrying name/key so it can be reanimated) — i.e. do `bloodTithe()` then the zone-push half of `moveBoardCard` (NOT the whole mover, since that skips the Tithe). Log "✦ {name} is slain → {enemy}'s graveyard/exile."
3. **Tokens cease (no popup, or single confirm):** a `token:true`/keyless body can't go to a zone — it ceases (splice + Pit's Tithe), exactly as today. Either skip the popup for tokens (straight slay→cease) or show a single "token — ceases" confirm. **Default: skip the popup for tokens** (preserve current behavior); only real enemy cards get the graveyard/exile choice. (Note: enemy creatures spawned from cards are `token:true`, so in practice many enemy "creatures" will cease — flag this so the popup only appears for non-token enemy permanents, e.g. a creature card moved onto the board or a controlled real card.)
4. **Commander unchanged:** `slayCmdBtn`/`removeRef(S.cmd)` still routes the commander to the command zone with rising tax — no graveyard/exile popup (MTG commander replacement). Optionally note "→ command zone" in its tooltip.
5. **Consistency with P24.2:** P24.2 (player ✕) is a *non-death* clean removal with a graveyard/exile/**none** choice; P26 (enemy Slay) is a *death* with a graveyard/**exile** choice (no "none" — a slay kills it into a zone; tokens cease as the natural "none"). Keep the two popups visually similar but labelled for their semantics.

**ACs:** clicking Slay on a non-token enemy creature opens a graveyard/exile popup; choosing routes it to `S.gy`/`S.exile` as a reanimatable record AND fires the Pit's Tithe; a token slay ceases (no zone entry) as today, still firing the Tithe; the commander slay still goes to the command zone; cancel leaves state unchanged; all paths log + re-render.
**Verify:** jsdom — `slayTo(id,'graveyard')` pushes the creature to `S.gy` and calls `bloodTithe` once; `slayTo(id,'exile')` → `S.exile`; a `token:true` slay ceases with no `S.gy` entry but still Tithes; commander slay → command zone (unchanged); cancel no-ops; syntax + id-diff (only the new slay-popup ids).


# PHASE 27 — Collapsible Cards & Tokens sections in the Library ✅ DONE

> **✅ BUILT & verified (P27.1):** clickable Cards/Tokens `.subh` headers with a `pchev` chevron (▾/▸) + count tags (new `libTokenCount`); `toggleLibSection('cards'|'tokens',ev)` (button-click guarded) flips `S.ui.lib` (default both open; persisted via autosave, excluded from undo); `applyLibSections` hides the list + sets the chevron; an active `#libSearch` query auto-reveals collapsed sections so hits aren't hidden. 11-check jsdom; id-diff adds only the 3 new ids.


**Specced 2026-06-29, NOT built.** The Library lists every card and every token flat, which gets noisy. Make the "Cards" and "Tokens" sections expand/collapse so the player can hide whichever they're not using. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded findings:**
- **Library modal (~567-588):** a `.subh` "Cards" header (with the `#libCardCount` tag + add buttons, ~572) over the `#libCards` `.liblist` (~573); a `.subh` "Tokens" header (~574) over `#libTokens` (~575); then the quick-make token form. Filled by `renderLibrary()` (~2287 area). No collapse today.
- **Collapse idiom to reuse (P12.1):** `.panel.collapsed>:not(h2){display:none}` + a `pchev` chevron + `togglePanel(key)` with state on `S.ui.panels` (persisted via autosave, excluded from undo). The Library is a modal (not a tab panel), so adapt the pattern with a lightweight per-section toggle rather than the `data-panel` machinery.

## P27.1 — Expand/collapse the Library "Cards" and "Tokens" lists

**Goal:** each Library section ("Cards", "Tokens") can be collapsed to just its header (showing a count) and expanded again; the choice persists.

**How:**
1. **Toggle headers:** make the two `.subh` headers clickable with a chevron (▾ open / ▸ collapsed), reusing the `pchev` visual. Clicking the header (but not its action buttons — guard `event.target.closest('button,a,input,select')` like `togglePanel` does) toggles its list's visibility. A new `toggleLibSection('cards'|'tokens')`.
2. **State:** store on `S.ui.lib={cards:true,tokens:true}` (open booleans), seeded if absent; persisted via autosave, excluded from undo like the other `S.ui` flags. Default **both expanded** (collapsing is opt-in to cut noise). *(Open option: default Tokens collapsed since it's secondary — flag for the user; default = both open.)*
3. **Apply on render:** `renderLibrary()` (and on open) hides `#libCards`/`#libTokens` (and the Cards add-button row / token quick-make form as appropriate) when their section is collapsed, and sets the chevron state. When collapsed, keep the header's **count visible** — `#libCardCount` already shows the card count; add a token count tag to the Tokens header so a collapsed section still tells you how many it holds.
4. **Search interaction:** when a `#libSearch` query is active, auto-expand (or keep expanded) any section with matches so a filtered result isn't hidden behind a collapsed header — don't let a collapse swallow search hits. (Or: searching temporarily overrides collapse.)
5. Pure UI/state; no card-data or schema change beyond the `S.ui.lib` flag (migrate-free: absent → default open).

**ACs:** clicking the Cards or Tokens header collapses/expands its list with a chevron; collapsed sections still show their count; the state persists across reopening the Library and across saves; an active search reveals matching sections rather than hiding hits; the quick-make token form's behavior is preserved; no change to card/token data.
**Verify:** jsdom — `toggleLibSection('tokens')` flips `S.ui.lib.tokens` and hides/shows `#libTokens`; the chevron + count reflect state; reopening the Library preserves it; a search with token matches keeps the Tokens section visible; header action buttons still work (toggle guard); syntax + id-diff (only the new chevron/handler ids).


# PHASE 28 — Base-life model + heal items + item automation + gold rebalance ✅ DONE

> **✅ BUILT & verified — P28.1 (base-life model).** Removed the `youMax` inflation from all three ordinary-lifegain points (`adjLife`, the `youGain` emblem, the `gainLife` spell resolve), so ordinary healing/lifelink may push `youLife` ABOVE the base temporarily but never raises it; only explicit max-life items (Spark +5; Tonic in P28.2) raise the base. The bar shows `youLife`/`youMax` honestly (overheal visible, clamped at 100%). P15.4 descent-heal already reads the live `youMax`; the between-boss trim is P16.4 (next). Confirmed by the user: ordinary heal-above-base trims on descent; a max-booster sets the new base. 8-check jsdom + full regression (P23 FIX1 assertion updated to the new model).
> **✅ BUILT & verified — P28.2 (heal items + automation + gold bands).** Grand Elixir (`elixir`) now heals **25** @ **25g** (rare anchor); Tonic of Vigor (`tonic`) raises the **base +10** and heals **15** (user's chosen amount) @ **36g** (legendary band floor) — the only ordinary-store item that moves `youMax` (per P28.1), so the reset/descent-heal immediately track the new base. Audited automation: every consumable auto-applies + is consumed on use (reminders only where unmodelable). Every store price now sits in its rarity band (common 5-8 · uncommon 12-20 · rare 18-34 · legendary 36+). 10-check jsdom + full regression (P15.2 tonic/band assertions updated to the new values).


**Specced 2026-06-29, NOT built.** Establish a coherent **permanent base-life** stat so heal items, the between-boss reset (P16.4), and the descent heal (P15.4) all agree, then add the two heal items the user specified and rebalance prices. **Refines P15.2; pairs with P16.4/P15.4.** Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit (the current life model + the bug it creates):**
- `S.youLife` / `S.youMax` start at 40 ([HTML ~375]; `migrate` defaults ~2295). There is **no separate base stat** — `youMax` is the base/cap.
- **`adjLife('you',n)` (~1585) raises `youMax` on overheal:** `S.youLife+=n; if(S.youLife>S.youMax)S.youMax=S.youLife;`. So *any* lifegain that overshoots permanently inflates the base — which would make a "temporary heal" permanent and the P16.4 between-boss shrink meaningless (nothing ever sits above base).
- **Explicit max-boons:** `spark` (Spark of Vigor) in `grantBoon` (~1629) does `S.youMax+=5;S.youLife+=5` (permanent base bump); the P15.2-era `tonic` used `S.youMax+=5;adjLife('you',...)`.
- **Consumers of the base:** P16.4 reset (trim life above base) and **P15.4 descent heal** (`heal=floor((S.youMax-S.youLife)*frac)` ~1635) both read `S.youMax` — so once the base is correct and live, both track it automatically.
- **Items:** `BOONS`/`useBoon` (~1610) auto-apply most consumables (heal5/heal10/elixir/tonic/antidote/bomb/pyre); `STORE` prices (~814-821) — `elixir` 20g, `tonic` 28g, etc.; rarity→price bands defined in P15.2.

## P28.1 — Base-life model: `youMax` is the permanent base; ordinary healing stops inflating it

**Goal:** `youMax` becomes a true **permanent base** that only explicit max-life boons change; ordinary healing/lifegain may push `youLife` *above* it temporarily (so the P16.4 shrink has something to trim), and the P15.4 descent heal computes "missing HP" against the **updated** base.

**How:**
1. **Fix `adjLife` (~1585):** remove the `if(S.youLife>S.youMax)S.youMax=S.youLife;` line so ordinary lifegain no longer permanently raises the base. Life may now exceed `youMax` temporarily (lifelink, life-gain emblems, Grand Elixir overheal); the life bar already clamps display at 100% (`youLife/youMax*100`, ~1305) — keep that, optionally show "55/40" text so overheal is visible.
2. **Only max-boons raise the base:** Spark (+5), Tonic of Vigor (+10) explicitly do `S.youMax+=N` (P28.2). `setLife`/admin tools may still set both. No other path mutates `youMax`.
3. **P16.4 reset tracks the base:** the between-boss trim is `if(youLife>youMax)youLife=youMax` (already revised in P16.4) — reads the live, possibly-raised base.
4. **P15.4 descent heal tracks the updated base (user's explicit ask):** the missing-HP fraction must be computed against the **current** `youMax` — `heal=floor((S.youMax - S.youLife)*frac)` after any base change — so raising the base with Tonic immediately widens "missing HP" and the heal scales to the new base. Confirm the ordering in `advance()`: **(a)** P16.4 trims to base, **(b)** P15.4 heals `floor((youMax−youLife)*frac)` off the post-trim, current-base value. Document in P15.4 + P16.4.
5. **migrate:** existing saves keep `youMax` (default `max(40,youLife)` ~2295). No new field needed — `youMax` *is* the base. (Optional: an explicit `youBase` alias if clearer, but reusing `youMax` avoids a schema change.)

**ACs:** healing no longer permanently raises `youMax`; life can exceed `youMax` temporarily and is shown honestly; the P16.4 reset trims to the live base; the P15.4 descent heal uses the updated base for its missing-HP fraction (post-Tonic, a deeper heal); admin/setLife still work; old saves unaffected.
**Verify:** jsdom — `adjLife('you',30)` at 40/40 → `youLife=70, youMax=40` (base unchanged); P16.4 trims 70→40; after `youMax=50` (Tonic), descent heal computes off 50 (`floor((50−youLife)*frac)`); ordering in `advance()` (trim then heal); migrate default; syntax + id-diff.

## P28.2 — Grand Elixir (+25/25g) · Tonic of Vigor (+10 base/30g) · item automation · gold rebalance

**Goal:** add/define the two heal items with the user's exact values, make every item auto-apply where it can, and rebalance store prices.

**How:**
1. **Grand Elixir** — a consumable that heals **+25 life**, cost **25g**. Define `BOONS.grandelixir={n:"Grand Elixir",r:"rare",kind:"consumable",t:"Restore 25 life."}`; `useBoon` case → `adjLife('you',25)` (overheal allowed per P28.1; the excess trims at the next descent). `STORE` entry at 25g. (Relationship to the existing `elixir` heal-15: keep `elixir` as the mid heal, or retire it — pick one; default keep, so the ladder is heal5 · heal10 · elixir 15 · Grand Elixir 25.)
2. **Tonic of Vigor** — cost **36g** (legendary, at the P15.2 legendary band floor of 36g+), **+10 to base life (permanent)**. `BOONS.tonic={n:"Tonic of Vigor",r:"legendary",kind:"consumable",t:"Permanently raise your maximum life by 10 (and heal 10)."}`; `useBoon` case → `S.youMax+=10; S.youLife+=10;` (base permanently up; current life follows). `STORE` 36g (raise from the current 28g to sit in the legendary band). Because the base rose, the P16.4 reset cap and the P15.4 missing-HP heal both immediately reflect 50 (P28.1).
3. **Automate items where possible:** audit `BOONS`/`useBoon` — anything currently a passive/reminder that *could* auto-apply should (e.g. ward/aegis damage-soak already auto-apply in combat; scholar's draw is an inherent manual draw → stays a reminder). Each item that can't be modeled keeps its reminder, but consumables and stat changes must fire automatically on use. List per-item: auto vs reminder.
4. **Gold rebalance (refines P15.2 bands):** set prices to the rarity bands — common 5-8g · uncommon 12-20g · rare 18-34g · legendary 36g+, with the two anchors **Grand Elixir 25g (rare)** and **Tonic of Vigor 36g (legendary, at the band floor)**. Adjust other `STORE` outliers to fit; verify a player can afford ~1-2 commons/uncommons per room and save toward a rare/legendary across a couple rooms (`goldReward` curve ~838).

**ACs:** Grand Elixir heals 25 (consumable, 25g) and its overheal trims at the next descent; Tonic of Vigor permanently raises `youMax` by 10 (heals 10), 36g (legendary band), and the reset/descent-heal track the new base; every consumable/stat item auto-applies on use, reminders only where unmodelable; store prices follow the bands (Grand Elixir 25 / Tonic 36 anchored) and round-trip through buy/pending; items consumed on use (P21).
**Verify:** jsdom — `useBoon` Grand Elixir → `youLife+25` (base unchanged), trims next descent; Tonic → `youMax+10,youLife+10`, reset trims to 50 and descent-heal computes off 50; each `BOONS` id resolves without throwing; prices within bands (Grand Elixir 25 / Tonic 36 anchored); syntax + id-diff.


# PHASE 29 — Commander zone distinction: command zone (recast tax) vs hand (base cost) ✅ DONE

> **✅ BUILT & verified (P29.1, enemy + player parity).** Added `S.cmd.inHand` (meaningful only when `!inPlay`; migrate backfill). `cmdCastCost()` = base from hand, base + tax from the command zone — used in `vaelMain` (affordability + spend, cast log names the zone) and the dormant box (zone label + cost + a ↩hand / →command-zone toggle). `cmdToHand`/`cmdToZone` clear board modifiers (tapped/sick/phased/plus/minus/other) without touching tax/deaths (a bounce isn't a death); the `_enemyCmd` resolve clears `inHand`; a battlefield death still routes to the command zone with +tax via `removeRef`. `cmdFieldCard` gains a ↩hand button. Player commander mirrors it (`S.pcmd.cmdInHand`, `pcmdToHand`/`pcmdToZone`, zone-aware cost reminders in `deployCmd`/`resolveCmdToBoard`). 13-check jsdom + full regression; id-diff clean.


**Specced 2026-06-29, NOT built.** Standard MTG: commander tax (+{2} per cast from the command zone) applies **only** when casting from the **command zone**. If the commander is returned to **hand**, it casts at its plain mana cost — no tax. Today the enemy commander only ever sits in the command zone (or on the battlefield) and always recasts at base + tax. Add the hand state. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Enemy commander `S.cmd`:** state is binary — `inPlay:true` (battlefield) or `!inPlay` (command zone). Fields `baseCost`, `tax`, `deaths`, `cost` (= `baseCost+tax`, set on death in `removeRef` ~1072). No hand state.
- **Death → command zone (+tax):** `removeRef(S.cmd)` (~1072) increments `deaths`, adds the tax increment (`CMD_TAX_BASE`, doubling if `CMD_TAX_DOUBLE`), sets `inPlay=false`, recomputes `cost=baseCost+tax`.
- **Cast (always "from command zone"):** `vaelMain` (~1736) — `if(!S.cmd.inPlay && usableMana()>=S.cmd.cost){spend S.cmd.cost; push _enemyCmd stack item; log "casts from its command zone (spent cost)"}`. The dormant box (~1278) shows `Needs ${c.cost}` with `(base ${baseCost} + tax ${tax})`.
- **No bounce-to-hand path:** the enemy commander isn't in `S.tokens`/`S.my`, so `moveBoardCard`/`moveBoardById` don't reach it; `cmdFieldCard` (~1807) offers only Slay. So there's currently no way it lands in hand.
- **Player commander `S.pcmd`** (parity): `sendCmdToZone(c,died)` (~1410) always routes to the command zone (`died` → `cmdTax += inc`); `castCmd`/`deployCmd` pay base + `cmdTax`. Also no hand state.

## P29.1 — Enemy commander: base cost from hand, base + tax from the command zone

**Goal:** track whether the (enemy) commander is in the **command zone** or in **hand**, and charge accordingly — command zone = base + accumulated tax; hand = base cost only, with no tax added by casting from hand. Provide a way for it to be returned to hand.

**How:**
1. **Zone flag:** add `S.cmd.inHand` (bool), meaningful only when `!inPlay` — `inPlay` → battlefield; `!inPlay && inHand` → hand; `!inPlay && !inHand` → command zone. Default `false` (starts in the command zone). `migrate` backfills `if(S.cmd && S.cmd.inHand==null) S.cmd.inHand=false`. Keep `inPlay` exactly as-is so every existing `S.cmd.inPlay` read (combat/emblems/etc.) is unchanged.
2. **Zone-aware cast cost:** define `cmdCastCost() = (!S.cmd.inPlay && S.cmd.inHand) ? S.cmd.baseCost : (S.cmd.baseCost + (S.cmd.tax||0))`. Use it in `vaelMain` (~1736) for both the affordability check and the spend, and in the dormant-box display (~1278) — label it "from hand — {base}" vs "from command zone — {base} + tax {tax}". Cast log says which zone.
3. **Casting from hand adds no tax:** when cast from hand it resolves to the battlefield (`inPlay=true; inHand=false`) and **does not** increment `deaths`/`tax` (MTG: only command-zone casts carry the tax; this game's tax model keys off battlefield→command-zone deaths, so a hand cast simply skips it). A later death still routes to the command zone with +tax via `removeRef` (unchanged).
4. **Return-to-hand affordance:** add a **↩ hand** control on the enemy commander card (`cmdFieldCard` ~1807) and the dormant command-zone box → `cmdToHand()`: set `inPlay=false; inHand=true`, and **clear board-state modifiers** as a zone change does (tapped/sick/phased/plus/minus/other reset, like `sendCmdToZone`), **without** incrementing tax/deaths (a bounce is not a death). Log "♛ {cmd} returns to {enemy}'s hand." From hand, the existing cast path picks it up at base cost.
5. **Player-commander parity:** mirror for `S.pcmd` — a `pcmdInHand` state, a "↩ hand" option, and `castCmd`/`deployCmd` charging base (hand) vs base + `cmdTax` (command zone). Keep `sendCmdToZone(c,died)` (death → command zone + tax) unchanged; add the hand path alongside it. *(If scope must be trimmed, do the enemy side first per the user's ask and note player parity as a fast follow.)*
6. **Reset:** `freshGameForDungeon`/`enterRoom` start the commander in the command zone (`inHand=false`) as today.

**ACs:** an enemy commander in the command zone recasts at base + tax (current behavior); returned to hand (↩ hand) it casts at base cost with no tax, and casting from hand adds no tax/death; a later battlefield death still routes to the command zone with +2 tax; the dormant box + cast log name the correct zone and cost; bouncing to hand clears its counters/tapped/sick like a zone change; player commander mirrors this; round-trips through save/undo + migrate.
**Verify:** jsdom — set `S.cmd` in command zone with tax 4 → `cmdCastCost()===baseCost+4`; `cmdToHand()` → `inHand=true`, modifiers cleared, tax unchanged; `cmdCastCost()===baseCost`; cast-from-hand resolves to battlefield without bumping `deaths`/`tax`; subsequent `removeRef` → command zone, tax +inc; dormant box text reflects zone; migrate backfills `inHand`; player `S.pcmd` parity; syntax + id-diff.


# PHASE 30 — Permanent option parity: every permanent gets the options for its kind (both sides) ✅ DONE

> **✅ BUILT & verified (adversarially reviewed; 5 findings fixed incl. 1 HIGH).** Shared **`commonPermRow(scope,id,o)`** — protection-from-colour, hexproof/shroud/indestructible (`togglePermKw`), ↺ reset, and named markers — added to the walker, player artifact/enchant, and enemy artifact/enchant drawers (creatures already had these). **P30.1:** walker protection honoured in targeting — `applyTarget` + the two AI removal scorers filter walkers through the same `safe` predicate (protection/hexproof/shroud/phased); `aiTargets` (combat) stays `!phased`. **P30.5:** `returnAllToLibrary(scope,where)` bulk-returns all permanents (enemy→`S.lib`, player→physical, tokens cease, commander left in play; shuffle once, enemy-lib only) — NON-death. **P30.7:** enemy commander ↺ reset + ⧉ copy (`copyPermanent('cmd')` → token copy). migrate backfills `prot`/`kw`/`other`. **Review fixes:** copy button passes `null` (was an unquoted `cmd` bareword → ReferenceError, HIGH); `dealDmg` routes `eart`/`eench` off the enemy board (killMy would corrupt state, MEDIUM); dropped the inert P/T +1/+1 buttons on non-creature drawers (named markers carry tracked counters); shuffle gated to the modelled enemy library. 20-check jsdom + full regression; id-diff adds only `rtlScope/rtlWhere`. **Note:** P30.2/30.6 walker/perm option breadth covered via `commonPermRow` + existing P17.4/P20.2/P23.1 controls; non-creature P/T +1/+1 intentionally omitted (no P/T) in favour of named markers.


**Specced 2026-06-29, NOT built.** The user's rule: **every permanent — creature, artifact, enchantment, planeswalker, on the player's board AND the enemy's — must offer all the options appropriate to its kind.** Concretely: every permanent can be **returned to hand / exiled / sent to graveyard**, given **protection-from-colour** and **hexproof/shroud** (and indestructible), and the common controls (markers, dies-to, ward); each kind also keeps its kind-specific options (creatures: P/T, blocked-by, combat keywords; walkers: loyalty, attackable-by-N; etc.). Protection/hexproof/shroud must be **honoured in targeting**, not cosmetic. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Implementation note:** the clean approach is a shared **`commonPermRow(scope,id,obj)`** helper emitting the universal options (move-to-zone, protection-from-colour, hexproof/shroud/indestructible keywords, markers, dies-to, ward) that every drawer (`creatureDrawer`/`permDrawer`/`walkerDrawer`/`enemyDrawer`) calls, plus per-kind rows on top. Factor it once and reuse, rather than copy-pasting rows into four drawers.

**Grounded audit (per drawer, what exists vs missing):**
- `creatureDrawer` (~1396): the most complete — has protection-from-colour (~1401), markers (~1400), keywords via `kwSelect` on the card (~1342, incl. hexproof/shroud), move-to-zone, dies, ward, attack-tax(+tgt), threat, etc. **Reference for parity.**
- `permDrawer` (artifacts/enchants, ~1411): has flags(legendary/token/phase), colour, move-to-zone, dies, attack-tax, ward. **MISSING: protection-from-colour, hexproof/shroud/indestructible keywords, markers, threat.**
- `walkerDrawer` (~1418): see P30.1/P30.2 (missing protection + token/markers/threat/etc.).
- **Enemy permanents:** `enemyDrawer` (~1387) has protection (~1390) + the P13.1 owner-agnostic editors for `S.tokens`/`S.cmd`/enemy artifacts/enchants; the enemy walker `S.pw` and enemy artifacts/enchants need the same universal set + move-to-zone parity.
- **Keywords on non-creatures:** only creatures get `kwSelect`; artifacts/enchants/walkers have no keyword UI, so hexproof/shroud can't be set on them today.
- **Move-to-zone (`moveRow`)** exists on player creature/perm/walker drawers and enemy creatures; verify it reaches the enemy walker + enemy artifacts/enchants (P13.3) so *every* permanent can be bounced/exiled/graveyarded.

**Grounded audit (walker drawer vs creature drawer):**
- `walkerDrawer(w)` (~1418) has: legendary (static "always"), colour, move-to-zone, dies-to, attack-tax, ward, set-as-commander.
- `creatureDrawer(c)` (~1396) additionally has: **protection from {colour}** (`colorToggles('creatures',id,'prot')` ~1401), token flag, **phase out**, defender, **markers + deal-damage + copy + flip** (`markerRow` ~1400), blocked-by min/max, abilities, taps-for-mana, **threat (AI hint)**, the attack-tax **`targeted` toggle** (P17.4), give-control.
- **Walker objects already carry `prot`** when cast (`resolvePlayerItem` planeswalker branch ~1886 sets `prot:(pr.prot||[]).slice()`); the **manual add-walker path + `migrate`** must guarantee `prot:[]` too.
- **Functional gap (must fix):** in `applyTarget` (~1047) `wk=S.my.walkers` is **unfiltered** — `walkerMinLoy3` (~1054) checks only ward (`payWard`), NOT `prot`/hexproof/shroud/phased. So walker protection would be cosmetic unless targeting honors it. (`hasProtFrom` ~1061 already reads `.prot` on any object; the `safe` predicate ~1047 is the creature filter to mirror.)

## P30.1 — Protection-from-colour on planeswalkers (drawer + honoured in targeting)

**Goal:** a planeswalker can be given protection from one or more colours, and a protected walker can't be targeted by enemy removal of those colours — matching how creature protection works.

**How:**
1. **Drawer UI:** add a "protection from" row to `walkerDrawer` (~1418) — `<div class="drow"><span class="dlab">protection from</span><div class="setbtns">${colorToggles('walkers',id,'prot')}</div></div>` (identical to the creature row).
2. **Ensure the field exists:** the manual add-walker path initializes `prot:[]`; `migrate` backfills `if(!Array.isArray(w.prot))w.prot=[]` on `S.my.walkers` (and the enemy `S.pw`). Cast already sets it.
3. **Honour it in targeting (the functional half):** in `applyTarget` (~1047) filter the walker pool through the same `safe` predicate the creatures use — `const wk=S.my.walkers.filter(safe);` — so `walkerMinLoy3` (and any future walker-targeting effect) skips a walker that is protected-from-the-source-colour / hexproof / shroud / phased. A fully-protected lone walker → the effect is warded/can't-target (return the existing "warded off / no target" message), not a silent hit. Keep ward (`payWard`) behavior on top.
4. **Scope note:** match creature semantics exactly (protection blocks *targeting* by that colour, as `hasProtFrom`/`safe` model today). Don't newly model combat-damage prevention by protection for walkers — creatures don't model that either; staying at parity avoids inconsistency. Note this explicitly.

**ACs:** a walker drawer offers protection-from-colour toggles; a walker with protection-from-the-enemy's-colour can't be hit by `walkerMinLoy3` (warded/no-target message, loyalty unchanged); an unprotected walker is hit as before; hexproof/shroud/phased walkers are likewise skipped; the field round-trips + migrates; creature targeting is unchanged.
**Verify:** jsdom — set `prot:['B']` on a walker vs a black `walkerMinLoy3` → not targeted (message, loyalty intact); `prot:['R']` vs black source → still hit; phased/hexproof walker skipped; `migrate` backfills `prot`; syntax + id-diff (only the new prot row).

## P30.2 — Walker option parity sweep

**Goal:** the planeswalker drawer offers the rest of the options that make sense for a walker, so it's not a second-class permanent.

**How (add to `walkerDrawer`, reusing the creature helpers; ensure fields + migrate):**
1. **Token flag:** `flagMy('walkers',id,'token')` (token planeswalkers exist) — a token walker ceases on leaving the battlefield per the existing token rules.
2. **Phase out:** the P23.1 toggle (`flagMy('walkers',id,'phased')`) — **cross-ref P23.1**; ensure it lands in this drawer if not already.
3. **Markers + deal-damage + copy + flip:** add `markerRow('walkers',id)` — deal-damage to a walker reduces loyalty (wire `dealDmg`/`getObj` for the `walkers` scope so ⚔ damage subtracts loyalty and a lethal hit routes through `killMy`), copy makes a token walker, flip handles DFC walkers. (Drop creature-only markers that make no sense on a walker, or leave the generic set — pick one and note it.)
4. **Threat (AI hint):** `strength` select (`infoBtn('threat')`) so the enemy AI's walker targeting can weigh it.
5. **Attack-tax `targeted` toggle:** add the P17.4 `tgt` toggle to the walker's attack-tax row for parity with creatures.
6. **Attackable-by-N:** the P20.2 walker cap — **cross-ref P20.2** (ensure it's reachable from this drawer).
7. **Fields + migrate:** initialize/backfill `token`, `phased`, `other`, `strength`, `block`/`attackableBy`, `catk.tgt` on walker objects so the controls work and round-trip.
8. **Enemy walker (`S.pw`) parity:** expose the same option set on the enemy walker where its editor is reachable (P13.1 owner-agnostic editing); if `S.pw` lacks a drawer, note it as the follow-up rather than building a new editor here.

**ACs:** the walker drawer exposes protection (P30.1), token, phase-out, markers/deal-damage/copy, threat, attack-tax (+targeted), and attackable-by-N; dealing lethal damage to a walker routes through `killMy`; token walkers cease correctly; all fields round-trip + migrate; the enemy walker reaches the same options (or a noted follow-up); creature/artifact drawers unchanged.
**Verify:** jsdom — each new walker control mutates the right field; `dealDmg('walkers',id,n)` reduces loyalty and kills at ≤0; token-walker cease; migrate backfills the fields; syntax + id-diff. (Cross-ref P17.4, P20.2, P23.1.)

## P30.3 — Artifact & enchantment drawer parity (protection · hexproof/shroud/indestructible · markers · threat)

**Goal:** artifacts and enchantments (player and enemy) get the universal permanent options they currently lack — protection-from-colour, hexproof/shroud/indestructible, markers, and a threat hint — so they're editable at parity with creatures.

**How:**
1. **Protection-from-colour:** add the `colorToggles(cat,id,'prot')` row to `permDrawer` (~1411) and the enemy artifact/enchant editor. Ensure artifact/enchant objects carry `prot:[]` (`addP` ~1501 already does; cast `resolvePlayerItem` artifact/enchant branch ~1885 does; `migrate` backfills).
2. **Keywords (hexproof/shroud/indestructible):** give non-creature permanents a **relevant keyword subset** — at minimum hexproof, shroud, indestructible (the combat keywords like flying/trample don't apply). Either a compact `kwSelect` limited to that subset, or dedicated toggles. Ensure `kw(obj,'hexproof')` etc. read correctly (the `kw` helper already reads `obj.kw`).
3. **Markers + deal/copy/flip:** add `markerRow(cat,id)` to `permDrawer` so an artifact/enchant can take status markers, be dealt-with (⚔ destroy via `dealDmg`→`killMy`), copied, or flipped (DFC). Drop creature-only markers that don't fit, or keep the generic set (note which).
4. **Threat (AI hint):** add the `strength` select for consistency (even if the AI rarely targets non-creatures today).
5. **Shared helper:** implement via the `commonPermRow` helper from the phase intro so creature/perm/walker drawers share one source of truth.
6. **Fields + migrate:** backfill `prot`, `other`, `kw`, `strength` on existing artifacts/enchants (both boards).

**ACs:** artifact/enchant drawers (player + enemy) expose protection-from-colour, hexproof/shroud/indestructible, markers/deal/copy, and threat; setting hexproof/shroud on an enchantment is readable by `kw()`; fields round-trip + migrate; creature/walker drawers unchanged in behavior (or share the new helper without regression).
**Verify:** jsdom — `permDrawer` emits the prot + keyword + marker rows; `kw(enchant,'hexproof')` true after toggling; `dealDmg('enchants',id,big)` routes to `killMy`; migrate backfills; syntax + id-diff.

## P30.4 — Universal guarantees: every permanent can go to hand/exile/graveyard; protection honoured wherever targetable

**Goal:** close the two universal gaps — (a) **every** permanent on **both** boards can be returned to hand, exiled, or sent to the graveyard; (b) protection/hexproof/shroud is **honoured** anywhere a permanent of that kind can be targeted (not just creatures).

**How:**
1. **Move-to-zone everywhere:** verify `moveRow`/`moveBoardCard` (P9.1) is present and correct on every permanent drawer/card — player creatures/artifacts/enchants/walkers (have it), enemy creatures (have it), **enemy artifacts/enchants (P13.3)** and the **enemy walker `S.pw`** (add it if missing). Owner-aware routing already exists (enemy → modelled `S.hand/lib/gy/exile`; player → physical hand / `S.myGy`/`S.myExile`; tokens cease). The deliverable is *coverage*: no permanent type lacks return-to-hand / exile / graveyard on either side.
2. **Honour protection in targeting (all kinds):** wherever an enemy (or player) effect can *target* a permanent, filter by the shared `safe` predicate (`!hexproof && !shroud && !phased && !prot-matches-source-colour`): creatures (already), walkers (P30.1), and any artifact/enchant-targeting path (e.g. a destroy-enchantment effect, or `dealDmg`-as-removal) must skip a hexproof/shroud/protected permanent. Reuse `hasProtFrom`/`safe`.
3. **Consistency:** keep semantics identical across kinds — protection blocks *targeting* by the matching colour (as today); don't introduce per-kind divergence. Token permanents still cease when they leave the battlefield regardless of the chosen zone.
4. **Audit deliverable:** a short matrix (permanent kind × {to-hand, exile, graveyard, prot, hexproof, shroud}) confirming each cell is wired on both boards, so nothing is silently missing.

**ACs:** every permanent kind on both boards can be returned to hand, exiled, and graveyarded (tokens cease); a hexproof/shroud/colour-protected permanent of any kind is skipped by a targeting effect that would otherwise hit it; the matrix shows full coverage; round-trips + migrate; no regression to existing creature/zone behavior.
**Verify:** jsdom — for each permanent kind (player + enemy) a move to hand/exile/graveyard lands in the right zone (or ceases for tokens); a hexproof/protected non-creature is skipped by a targeting effect; coverage matrix asserted in the driver; syntax + id-diff. (Cross-ref P9.1, P13.3, P24.2, P26.1.)

## P30.5 — Bulk "return all permanents to library" (enemy and/or player)

**Goal:** one action that returns **all permanents** (creatures + artifacts + enchantments + walkers) to the library, for the **enemy**, the **player**, or **both** — the library counterpart of P14.6 (return-all-to-hand).

**Grounded building blocks:** the P9.1 mover already supports library destinations — `moveBoardCard(obj,'libtop'|'libbottom'|'libshuffle')` (~1089-1096): an **enemy** card goes to the modelled `S.lib` (top/bottom, with shuffle), a **player** card's library is physical (logged "to your library" — it leaves the app), a **token ceases**, a **commander** routes to the command zone. P14.6's `returnAllToHand(scope,what)` is the bulk precedent (slice-loop + summary log); the Tools panel (near Boardwipe ~457 / the P14.6 control) is the home.

**How:**
1. **`returnAllToLibrary(scope, where)`** — `scope ∈ {yours, enemy, both}`, `where ∈ {top, bottom, shuffle}`. Loop `slice()` copies of the relevant permanent arrays (player `S.my.{creatures,artifacts,enchants,walkers}`; enemy `S.tokens` + enemy artifacts/enchants (P13.3) + `S.pw`/`S.cmd` per the commander/walker rules) and call `moveBoardCard(obj,'lib'+where)` on each. Tokens cease automatically; the commander routes to the command zone (or is skipped — pick one and log it), consistent with P14.6.
2. **Shuffle once:** if `where==='shuffle'`, do the enemy `S.lib` Fisher-Yates **once after** all cards are placed (not per-card) so the result is a proper shuffle; the player side stays a logged physical action.
3. **NON-death** (no `killMy`/`removeRef`) → no Pit's Tithe / death triggers, matching P14.6. One summary log: `🔀 Returned N permanents to {who} library (M tokens ceased).` Single `render()`.
4. **UI:** a "Return all to library" row in Tools beside P14.6's "Return to hand" — `scope` + `where` selectors + a button.

**ACs:** the action returns every non-token permanent to the chosen library position for the chosen side(s); enemy cards land in `S.lib` (top/bottom/shuffled once); player permanents log as returned to the physical library; tokens cease; commander handled deliberately (command zone or skip) and logged; no life change / no death triggers; collapses to one undo step.
**Verify:** jsdom — `returnAllToLibrary('enemy','top')` moves all enemy permanents to `S.lib` top (count matches, tokens ceased, no `S.gy` entries); `'shuffle'` shuffles `S.lib` once; player scope logs + empties the board without `S.myGy` changes; commander to command zone; one undo step; syntax + id-diff. (Cross-ref P14.6, P9.1.)

## P30.6 — Counters on ALL permanents (both sides): give +1/+1 · ⊖ remove · ↺ reset

**Goal:** every permanent kind — creature, artifact, enchantment, planeswalker, on the player's board AND the enemy's — can be given **+1/+1** counters (and −1/−1 and named/custom), have counters **removed** (⊖), and be **reset** (↺ restore to base, clear all counters). Today only creatures (and enemy creature tokens / commander) have the full counter row; artifacts/enchants/walkers don't.

**Grounded building blocks:** counters live on `obj.plus` (+1/+1), `obj.minus` (−1/−1), `obj.other[]` (named). Existing per-kind helpers: `myctr`/`myctrCustom` (player creatures ~?), `cctr`/`cctrCustom` (enemy tokens ~1446/1448), `cmdCtr` (commander), `remCtr(scope,id)` (~1449), `resetCard(scope,id)` (~1515 — restores `baseP/baseT`/`baseLoy`, zeroes `plus/minus`, empties `other[]`, clears until-EOT buffs, logs to the right channel). Generic accessor `getObj(scope,id)` (~1354) already resolves any scope (`creatures/artifacts/enchants/walkers/token/cmd/eart/eench`). `effP/effT` read `plus/minus` for creatures; for non-creatures `plus/minus` are just tracked values (no P/T) — and **named counters via `other[]` still display** (charge, etc.).

**How:**
1. **Generic counter setter:** add (or generalize to) a scope-aware `setCtr(scope,id,kind,n)` over `getObj` — `kind∈{plus,minus}` → `o[kind]=Math.max(0,(o[kind]||0)+n)`; named → push/pop on `o.other`. Reuse for every board via the **`commonPermRow` helper** (the phase-intro shared row), so a single counter control set (`+1/+1 · −1/−1 · ＋ctr · ⊖ ctr`) appears on creature/artifact/enchant/walker drawers, player and enemy alike. Keep the existing creature/token row behavior (don't regress `myctr`/`cctr`).
2. **Remove (⊖):** `remCtr(scope,id)` already works via scope; ensure it's wired on every kind's controls (removes the most-recent / a chosen counter, as today).
3. **Reset (↺):** ensure `resetCard(scope,id)` handles non-creature permanents — for an artifact/enchant (no `baseP/baseT`) it simply zeroes `plus/minus` and empties `other[]` (and clears markers/until-EOT buffs); for a walker it restores `baseLoy` and clears counters; for creatures unchanged. Add a ↺ reset control to the artifact/enchant/walker rows (creatures + enemy tokens already have it).
4. **Both boards:** the enemy artifact/enchant (P13.3) and enemy walker (`S.pw`) get the same counter + remove + reset controls via the owner-agnostic editors (P13.1). Named counters (`other[]`) render as removable badges on every kind (the creature pattern).
5. **Note (non-creature +1/+1):** +1/+1 on an artifact/enchant doesn't change a P/T it doesn't have — it's a tracked counter (meaningful if it becomes a creature, or for cards that count counters). Display the counter; don't fabricate stats. `migrate` backfills `plus/minus/other` on any permanent missing them.

**ACs:** every permanent kind on both boards exposes give +1/+1 (−1/−1, named), ⊖ remove, and ↺ reset; counters live on `plus/minus/other` and round-trip; reset restores base (P/T or loyalty) and clears all counters for every kind (no-op-safe for artifacts/enchants without base stats); named counters render as removable badges everywhere; creatures/tokens/commander behavior is unchanged; the bulk version (P14.4) is unaffected.
**Verify:** jsdom — `setCtr('enchants',id,'plus',2)` sets `plus=2` and renders the counter; `setCtr('walkers',id,'minus',1)`; `remCtr` removes one; `resetCard('artifacts',id)` clears `plus/minus/other` (and `resetCard('walkers',id)` restores `baseLoy`); enemy artifact/enchant + `S.pw` get the same; migrate backfills fields; syntax + id-diff. (Cross-ref P14.4 bulk counters, P13.1.)

## P30.7 — Enemy commander: ↺ reset + ⧉ copy (close the last gap)

**Goal:** the enemy commander gets the same **↺ reset-to-base** and **⧉ copy** the player's commander and the enemy's other permanents have. (Enemy creatures/tokens already have both; walkers/artifacts/enchants are covered by P30.2/P30.3/P30.6 — the commander is the lone omission.)

**Grounded findings:**
- **Reset works via `getObj` but isn't exposed:** `resetCard(scope,id)` resolves `'cmd'` through `getObj` (→ `S.cmd`) and restores `baseP/baseT` + clears counters — but `cmdFieldCard` (~1807, the enemy commander's on-board card) renders **no ↺ reset button** (it has slay/tap/counters/kw/drawer only).
- **Copy isn't wired for the commander:** `copyPermanent(scope,id)` reads `_boardArr(scope)`, which handles `token`/`eart`/`eench`/`S.my[*]` but **not `'cmd'`** — so `copyPermanent('cmd',…)` finds no array and no-ops.

**How:**
1. **↺ reset button:** add a ↺ reset control to `cmdFieldCard` (~1807) calling `resetCard('cmd',null)` (the commander uses the `id=null`/`'cmd'` scope convention) — restores base P/T and clears counters/markers/until-EOT buffs, logging to `dm`. (Don't touch tax/deaths — reset is the card's printed state, not a zone change.)
2. **⧉ copy support for `cmd`:** extend `copyPermanent` (or `_boardArr`) so the `'cmd'` scope deep-copies `S.cmd` into a **token copy on the enemy creature board** (`S.tokens`, `token:true`, `sick:true`, `isCmd:false`/no `_cmd`, new id) — a copy is not the commander, so it drops command-zone identity (and the recast tax). Add a ⧉ copy control to `cmdFieldCard`.
3. **Parity note:** this matches the player commander (a creature with the full reset+copy row) and the enemy tokens; the result is every enemy permanent — creature, **commander**, artifact, enchantment, walker — has reset + copy.

**ACs:** the enemy commander card shows ↺ reset (restores base P/T, clears counters, leaves tax/deaths alone) and ⧉ copy (makes a non-commander `token:true` copy on the enemy board); `copyPermanent('cmd',…)` works; player commander + other enemy permanents unchanged; round-trips through save/undo.
**Verify:** jsdom — `resetCard('cmd',null)` restores `S.cmd` base P/T + clears counters without changing `tax`/`deaths`; `copyPermanent('cmd',S.cmd.id)` pushes a `token:true`, non-`_cmd` copy to `S.tokens`; the buttons render in `cmdFieldCard`; syntax + id-diff. (Completes the P30 permanent-parity set.)


# PHASE 31 — Expandable enemy cards in the deck-tools (full stats + effects) ✅ DONE & merged

**Specced 2026-06-29, NOT built.** When inspecting the enemy's library (and other hidden zones) in 🂠 Manipulate enemy deck, each card should expand to reveal its full stats and effect, collapsed by default so a long list isn't a wall of text. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Card row renderer:** `fxItem(c,actions)` (~914) in `deckToolsHTML` renders `name · cost · typechip · colour dots`, the action buttons, and `fx.text` (oracle text) **always shown inline**. It does **not** show creature **P/T or keywords**, the flavour, or the mechanical effect — and there's no collapse.
- **Where it's used:** the look views (`dtLook` top/bottom ~964), the P14.7 "browse library by type" view, and the hand/graveyard/exile reveal lists — all render cards via `fxItem`/`playRow`. State lives on the transient `_dt` object (mode/n/reveal…), rebuilt by `dtRender`.
- **Where the stats live:** an FX creature card encodes P/T + keywords in its spawn run — `run:["spawn",name,p,t,kw,color]` (so `p=run[2]`, `t=run[3]`, `kw=run[4]`); some cards have **combined runs** (array of runs). Cost/type/colour/text/flav are top-level FX fields. Non-creature cards (burn/removal/rule/ramp) describe themselves via `text` + `run`/`target`.

## P31.1 — Expandable card rows in the enemy deck-tools

**Goal:** each enemy card row in the deck-tools is collapsed to a one-line summary by default and expands on click to show full stats (P/T + keywords for creatures), cost, colours, oracle text, flavour, and a plain-language effect summary.

**How:**
1. **Collapse by default:** change `fxItem` (~914) so the row shows the summary line (name · cost · typechip · colours) plus a **▸/▾ expand toggle**; the `fx.text` and the rest move into an expandable body hidden until expanded. Track expanded rows on a transient `_dt.expanded` Set (card `id`s), toggled by `dtToggleCard(id)` → `dtRender()`. (Not persisted — it's modal view state, like the rest of `_dt`.)
2. **Stats in the expanded body:** derive and show, for a **creature** card, its **P/T and keywords** from the spawn run (`run[2]/run[3]/run[4]`; handle combined-run cards — list each spawned body); for any card, show cost, colours, type, the oracle `text`, and `flav` if present.
3. **Effect summary:** render a short plain-language line from `run`/`target` (e.g. "spawns a 3/2 menace", "deals N", "−2/−2 your board", "ramp +N") reusing existing descriptors where available, so the *mechanical* effect is visible, not just flavour text.
4. **Keep actions:** the existing tutor/move/spawn action buttons stay on the row (collapsed or expanded). An optional "expand all / collapse all" toggle for the current view.
5. **Applies across the deck-tools views** that use `fxItem` (look top/bottom, P14.7 browse, hand/gy/exile reveals) since they share the renderer — note the win is broadest there.

**ACs:** enemy card rows start collapsed (summary only) and expand on click to show P/T + keywords (creatures), cost, colours, oracle text, flavour, and an effect summary; combined-run cards list each body; collapse/expand persists across `dtRender` within the open modal; the action buttons still work; non-creature cards show their effect sensibly; no game-state change (view only).
**Verify:** jsdom — `fxItem` for a creature card renders a collapsed summary, and after `dtToggleCard(id)` the body shows the right P/T + keywords (from the spawn run) + text; a combined-run card lists multiple bodies; a burn card shows its effect summary; toggling re-renders; action buttons present; syntax + id-diff (only the new expand toggle ids). (Refines P14.7 / P9.4.)


# PHASE 32 — Per-combat: negate an attacker / prevent its combat damage ✅ DONE & merged

**Specced 2026-06-29, NOT built.** During a combat the player should be able to **negate** an attacking creature (take it out of this combat) or **prevent its combat damage** (a one-shot Fog on that single attacker) — primarily for the enemy's attackers, and symmetrically for yours. This is the **per-combat** counterpart to **P14.2** (which adds *persistent* "deals no combat dmg" / "prevents combat dmg to it" markers): same effect, but a one-time action in the resolver rather than a standing marker. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Combat object:** `openCombat(dir,attackers,pool,assign,target)` (~1210) sets `S.combat={dir,attackers,pool,assign,target}`. The enemy-attack direction (`dir==='vael'`) is where the player faces the enemy's attackers.
- **Resolver render:** `renderCombat` (~1213) draws one row per attacker (name/P-T/keywords, target select for walkers, blocker assignment); `combatDel` (~1231) edits assignments; `predictCombat` (~1232) previews; `approveCombat` (~1243) resolves via `resolveAttack` (~1067).
- **Damage source:** `resolveAttack` computes each attacker's `out = effP(att)*(double strike?2:1)`, then face/trample/lifelink. To **prevent** an attacker's damage, zero its `out` (no face, no trample, no lifelink) — exactly the gate **P14.2** introduces for the `'deals no combat dmg'` marker. To **negate**, the attacker shouldn't be in the combat at all.

**How:**
1. **Per-attacker resolver controls (in `renderCombat` ~1213):** add to each attacker row, for the enemy-attack direction (and yours, for symmetry):
   - **🚫 negate** → `combatNegate(attId)`: remove the attacker from `S.combat.attackers` and clean its `assign`/`target` entries, then `renderCombat()`. It no longer deals or takes combat damage this combat (it's simply not attacking). Log "🚫 {name}'s attack is negated."
   - **🛡 prevent damage** → `combatPreventDmg(attId)`: add the attacker id to a transient `S.combat.prevented` Set (toggle), re-render. The attacker stays in combat (can still be blocked / die to blockers) but **deals no combat damage**. Log "🛡 {name}'s combat damage is prevented."
2. **Honor prevention in `resolveAttack` (~1067):** if `att.id ∈ S.combat.prevented`, set its `out=0` (no face, no trample, no attacker-lifelink) — reuse P14.2's `'deals no combat dmg'` gate if that's built, else add the equivalent check. The attacker can still be destroyed by blockers (its toughness is unchanged), matching MTG fog-on-one-attacker semantics. (Note: `resolveAttack` reads `S.combat.prevented` only in the resolver context; keep it a combat-scoped set, cleared when combat ends.)
3. **Prediction mirrors it:** `predictCombat` (~1232) shows the negated attacker gone and the prevented attacker contributing 0, with a note ("🛡 {name} — damage prevented") so the preview matches the resolution.
4. **Transient only:** `S.combat.prevented` and negation live for the current combat; they vanish when `S.combat` is cleared (no persisted markers — that's P14.2). `cancelCombat` discards them.
5. **Both directions:** primarily the enemy's attackers (the player negating/fogging incoming attacks); offer the same on your own attackers for completeness (e.g. to model an effect that stops your creature's damage). Note which side each control shows on.

**ACs:** in the combat resolver, a player can negate any attacker (removed from this combat — deals/takes no combat damage) or prevent a specific attacker's combat damage (stays, can still die to blockers, deals 0 — no face/trample/lifelink); the prediction reflects both; both are logged; they apply this combat only and don't persist; works on enemy attackers (and yours); resolving/cancelling clears them.
**Verify:** jsdom — `combatNegate(id)` drops the attacker from `S.combat.attackers` (resolveAttack ignores it); `combatPreventDmg(id)` → `resolveAttack` gives it `out=0` (no face/trample/lifelink) while a lethal blocker still kills it; `predictCombat` reflects both; `cancelCombat`/resolve clears `prevented`; enemy + player directions; syntax + id-diff. (Complements P14.2; reuses its damage-prevention gate.)


# PHASE 33 — Auto-register enemy spawned creatures as tokens (`token:true`) ✅ DONE & merged

**Specced 2026-06-29, NOT built.** The token mechanics already work (P7.1: a token ceases when it leaves the battlefield — no graveyard); the gap is that **enemy spawned bodies aren't flagged `token:true`**, so those mechanics don't recognise them. Set the flag automatically at creation (and backfill old saves); nothing else needs changing. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded findings:**
- **The bug:** `applyRun` `case "spawn"` (~1036) builds the enemy body `{id,name,p,t,baseP,baseT,kw,color,sick,tapped,plus,minus,other,expires:false}` and pushes to `S.tokens` — **no `token:true`**. All enemy creature spawns flow through here (creature cards, **Resurgence** ~1778, reanimation, Vael's phase-2 revival).
- **Why it matters:** `moveBoardCard(obj,to)` ceases a body via `if(obj.token){…ceases…}`; without the flag, bouncing an enemy creature pushes it to `S.hand`/library/exile (the "↩ hand" button on `enemyCard`) instead of ceasing — the reported bug. (Death via `removeRef`/`slay` splices `S.tokens` directly, so it *looked* fine — only the zone-move path is wrong.)
- **Already-correct creators (for reference):** the emblem `spawnToken` sets `token:true`; `copyPermanent` sets `token:true`. So `spawn` is the outlier.
- **Not everything in `S.tokens` is a token:** `giveControl` pushes a *player* creature onto `S.tokens` preserving its own `token` flag (a real creature you donate is NOT a token). So token-ness must stay the **explicit `token` flag**, not "is in `S.tokens`" — don't blanket-cease the array.

**How:**
1. **Flag at creation:** add `token:true` to the object built in the `spawn` case (~1036). Every spawn path (cards, Resurgence, reanimation, phase-2) inherits it. (Confirm `applyRun` is the single choke point; if any other code pushes a spawned body to `S.tokens`, flag it there too.)
2. **Migrate backfill:** for existing saves, set `token:true` on `S.tokens` entries that are spawned bodies — i.e. lack an FX `key` AND aren't `_controlled` (a donated real creature). Conservative rule so a donated non-token isn't wrongly flagged; log nothing (silent normalize). Document the heuristic.
3. **No mechanic changes:** the P7.1 cease-on-leave / no-graveyard / expiry logic and the P9.1 `moveBoardCard` token branch already do the right thing once the flag is present — verify, don't rewrite.
4. **Sanity sweep:** confirm the other enemy-token affordances (slay→cease, expiry sweep, return-to-hand/library/exile→cease, copy) all key off `obj.token` and now behave for spawned enemy bodies.

**ACs:** an enemy creature spawned by any path is `token:true`; bouncing it (↩ hand) or moving it to library/exile/graveyard makes it **cease** (no zone entry), like player tokens; death/slay still ceases; a donated real (non-token) creature on the enemy board is unaffected (still goes to a zone); old saves backfill spawned bodies to `token:true` without flagging donated creatures; no change to token mechanics themselves.
**Verify:** jsdom — `applyRun(["spawn","X",2,2,[],"R"])` yields an `S.tokens` entry with `token===true`; `moveBoardById('token',id,'hand')` ceases it (no `S.hand` push); a `_controlled` non-token on `S.tokens` still moves to hand; migrate backfills spawned bodies only; slay/expiry still cease; syntax + id-diff (one-field change + migrate). (Fixes the P7.1/P9.1 enemy-token gap.)


# PHASE 34 — Smarter enemy combat AI: strategic attacking, targeting & blocking ✅ DONE & merged

**Specced 2026-06-29, NOT built.** Make the enemy reason about combat like a thinking opponent — when to attack vs hold back, what to attack, and how to block — extending the existing P6.x AI rather than replacing it. **Depends on Phase 18** (correct menace/keyword resolution): the AI's EV math must read a correct `resolveAttack`, so build P34 *after* P18. Difficulty-scaled via the existing knobs. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit (what the AI does today):**
- **`vaelAttackers` (~1213):** eligible attackers → drops any with a `profitableBlock` (player has a blocker that kills it and survives/trades-up) **unless** it must-attack, is evasive (flyer vs no flyer/reach), or the enemy is going **wide** (more ground attackers than blockers); sorts by power; caps by `maxAtk`. **No lethal/race push, no defensive hold-back, no value on trample/deathtouch.**
- **`aiTargets` (~1501):** every attacker targets **you**; assigns some to a player **walker** only if walkers exist. Simplistic walker logic.
- **`aiBlocks` (~1185):** sorts player attackers by `threatScore`, processes biggest first; for each, picks a blocker that **kills + survives**, else a killer (trade) if `combatThreat≥4`, else a **chump** if the threat is big (`≥max(5,bossLife*0.4)`), else a commander-killer; menace → a group of the smallest blockers if `ts≥4`; respects `maxBlk`/lure. **No survival-first-vs-lethal, no gang-block-to-kill-a-too-big attacker, chumps a trampler pointlessly, no first-strike/deathtouch nuance, can trade a bomb for a small attacker.**
- **Metrics available:** `threatScore` (~1042, enriched), `combatThreat` (effP+strength, gate metric), `strengthVal`, `effP/effT`, `kw`, `enemyLethalReach` (burn-lethal detector — reuse the "what's lethal" idea), difficulty knobs `enemyLuck()`/`enemyActThreshold()`.

## P34.1 — Smarter attacking & targeting

**Goal:** the enemy attacks with awareness of lethal, racing, and its own survival, and aims attackers sensibly at the player vs their planeswalkers.

**How (extend `vaelAttackers` ~1213 + `aiTargets` ~1501):**
1. **Lethal push:** if declaring an attack (accounting for the player's likely blocks) deals **≥ player's life**, attack all-in regardless of profitable-block holdbacks — a lethal alpha strike beats "good trades." Estimate post-block damage with a lightweight version of the resolver (evasive/trample connect; ground damage minus best blocks).
2. **Race awareness:** when both are low, weight *pushing damage* higher than preserving creatures — attack with EV-neutral creatures the enemy would otherwise hold, if it's ahead in the race. Conversely, **defensive hold-back:** when the enemy is **behind** (low life and the player has a board that threatens lethal back next turn), keep enough blockers home rather than tapping out attacking — don't attack into a lethal crack-back.
3. **Value evasion/trample/deathtouch:** an evasive or trampling attacker that connects for real damage attacks even if "blockable"; a **deathtouch** attacker is happy to be blocked (it trades up) so it shouldn't be held by `profitableBlock`. Fold these into the attack filter.
4. **Smarter targeting (`aiTargets`):** send attackers at a player **planeswalker** when it's a real threat (high loyalty / about to ultimate) or when killing it is more valuable than chip damage to the player; otherwise the face (or split to push the player toward lethal). Keep it bounded/simple.
5. **Difficulty-scaled:** easy plays straighter (closer to today), brutal uses the full lethal/race/holdback reasoning — gate the new behaviors on `enemyLuck()`/difficulty so the smarts scale.

**ACs:** the enemy goes all-in when it has lethal (even into blocks); it holds blockers back when attacking would let the player crack back for lethal; deathtouch/evasive/trample attackers attack appropriately; attackers aim at a threatening walker when that's better than face; difficulty scales the sophistication; existing EV/go-wide behavior is preserved at the low end.
**Verify:** jsdom — a board with lethal alpha → all attack; a behind-on-life enemy facing a lethal crack-back → holds blockers; a deathtoucher isn't held by `profitableBlock`; `aiTargets` sends an attacker at a high-loyalty walker; easy vs brutal differ; P6.3 regressions still pass; syntax + id-diff.

## P34.2 — Smarter blocking

**Goal:** the enemy blocks to survive and to trade up — never dies holding usable blockers, gangs up to kill an over-large threat, and stops wasting blockers on tramplers or its bombs on chaff.

**How (extend `aiBlocks` ~1185):**
1. **Survival-first vs lethal:** if the incoming attack (unblocked) is **≥ enemy life**, block to bring damage **below lethal** even with unfavorable/chump blocks — prioritize not dying over preserving creatures. Compute the incoming total and assign blocks greedily to the biggest unblocked attackers until safe.
2. **Gang-block to kill:** when no single blocker kills a high-threat attacker, **double/triple-block** to kill it (sum of blockers' power ≥ its toughness, or a deathtoucher in the group), when the trade is worth it (its `threatScore` ≥ the blockers spent). Respect `maxBlk`/menace caps already in place.
3. **Trample-aware:** **don't chump a trampler** — it tramples the excess over the chump anyway; prefer to take the hit, or gang it enough to kill it. Account for trample when valuing a block.
4. **Deathtouch / first-strike nuance:** a **deathtouch** blocker trades up — send it at the biggest attacker; a **first-strike** blocker that kills before taking damage is a free block (prefer it); avoid blocks where the enemy's blocker dies to first strike without killing.
5. **Preserve key blockers:** when **not** under lethal pressure, don't trade a high-value creature (bomb/commander) for a small attacker — chump with the cheapest or take the damage instead. Keep the existing commander-as-last-resort behavior.
6. **Difficulty-scaled:** easy blocks roughly as today; brutal uses survival-first + gang + trample logic fully (`enemyLuck()`/difficulty gate).

**ACs:** facing lethal, the enemy blocks down below lethal (chumping if needed) rather than dying; it gang-blocks to kill an attacker no single blocker can; it won't chump a trampler pointlessly; deathtouch/first-strike blockers are used well; it preserves bombs when safe; menace/`maxBlk`/lure rules from P12.2/P20.3 still hold; difficulty scales it.
**Verify:** jsdom — lethal incoming → blocks reduce damage below `S.boss.life`; a 6/6 attacker with two 3/x blockers → gang-blocked dead; a trampler isn't chumped; a deathtouch blocker is assigned to the biggest attacker; a bomb isn't traded for a 1/1 when not under pressure; P6.x/P12.2/P20.3 regressions pass; easy vs brutal differ; syntax + id-diff.


# PHASE 35 — Realistic enemy decks: real permanents · ramp/mana base · faithful card design · graveyard strategies ✅ DONE & merged

**Specced 2026-06-29, NOT built.** Now that the enemy must **build its mana** like a player (P17.1), its decks should play like believable MTG decks — real creature permanents, colour-appropriate ramp, a coherent curve with removal/threats/finishers, spells that use the full option set, and graveyard strategies that give black enemies (Murglax above all) a real identity. **Large creative + balance effort — build it via the multi-agent workflow** (deck-design + adversarial-balance agents), in the task order below. **Depends on:** P17 (lands-only mana), P33 (token flag), P13.3 (real enemy artifacts/enchants), P30 (full permanent options). Grounded in the current `index.html` (re-grep names; line numbers drift). Each task ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Decks are data-driven:** `buildDeck(room)` (~876) assembles from `room.pool` (array = cost-based copies via `deckCopies` ~618, or `{key:count}` map = singleton) + `room.lands` + per-difficulty `room.swaps[diff]` (cut/add). Shuffled on build. So a deck rework is largely **data** (FX entries + room pools) plus a few engine effects.
- **Every enemy creature is a spawned token today** (confirmed: all 63 `type:"creature"` FX have a `run:["spawn",…]`; the card goes to graveyard on resolve, P7.2). The commander (`S.cmd`) is the only real enemy creature; artifacts/enchants (P13.3) are real permanents.
- **Mana:** P17.1 makes enemy mana lands-only and leans toward **removing** ramp rocks/dorks (`run:["ramp",N]` ~1054) as "non-land mana." Real decks need ramp — this phase **reconciles** that (see P35.2).
- **Graveyard hooks:** `S.gy` holds resolved enemy cards; deck-tools already allow **manual** reanimation (gy card → battlefield via spawn, P9.4). `bloodpact` (Pit's Tithe ~1056) is the existing aristocrats-style death payoff. No AI-driven reanimation/recursion yet.
- **Effects:** `applyRun` (spawn/ramp/rule/bossrule/anthem/cmdBuff/bloodpact/bossHeal/…), `applyTarget` (removal shapes), `castValue` (AI valuation) — the toolbox a realistic deck draws on.

## P35.1 — Enemy creatures as real, non-token permanents (foundation)

**Goal:** an enemy creature **card** resolves as a **real non-token permanent** on the enemy board (dies to the graveyard as a recurable card, can be bounced to hand, copied, edited — full parity), while explicit token-makers still spawn `token:true` bodies. This closes the last big board asymmetry and is the substrate for graveyard play (P35.4).

**How:**
1. **Two resolution paths:** a creature **card** (the FX entry the enemy cast) enters the enemy creature array as a real object carrying its `key`, `token:false`, `dies:'graveyard'`, full stats/keywords — NOT via `spawn`. Reserve `run:["spawn",…]` for cards/effects that genuinely **make tokens** (Goblin Warband, Resurgence, anthem bodies). Distinguish in `resolvePlay`: if the card *is* a creature, put the card itself onto the board; if its effect *creates* tokens, spawn those.
2. **Death → graveyard as a real card:** a real enemy creature dying routes its **card** to `S.gy` (recurable), not "ceases"; tokens still cease (P33). `removeRef`/`killMy`-equivalent for the enemy board handles both per the `token` flag.
3. **Keep `S.tokens` as the enemy creature board** (real creatures + tokens coexist there, distinguished by `token`), or introduce `S.enemyCreatures` — pick the lower-churn option; many reads (`vaelAttackers`/`aiBlocks`/emblems) already iterate `S.tokens`, so extending it is likely cleaner. Migrate accordingly.
4. **Full options:** real enemy creatures get the P30 option set (bounce/exile/graveyard, prot/hexproof/shroud, counters, edit) already wired for the enemy board.
5. **Balance-neutral first:** this is a representation change — the *same* creatures, now real. Verify combat/AI/emblems still behave; then P35.3 redesigns the actual card lists.

**ACs:** an enemy creature card enters as a real `token:false` permanent that dies to `S.gy` as a recurable card and can be bounced/edited; token-makers still spawn `token:true` bodies that cease; combat/AI/emblems unaffected by the representation; saves migrate.
**Verify:** jsdom — casting an enemy creature card yields a real board permanent (`token:false`, has `key`); it dies to `S.gy` (card present, reanimatable); a token-maker still yields `token:true` ceasing bodies; `vaelAttackers`/`aiBlocks` still work; migrate; syntax + id-diff.

## P35.2 — Real mana base + ramp (reconciles P17.1)

**Goal:** enemy decks have a believable mana base and **ramp** appropriate to their colours — lands plus mana **rocks** (artifacts), mana **dorks** (creatures that tap for mana, where colour/flavour permit), and **rituals** — so the curve actually functions now that mana is built, not free.

**How:**
1. **Reconcile P17.1:** the lands-only rule's intent was "no **free/pre-seeded** mana" (no opening pool, no scrounge) — **not** "no ramp." A ramp permanent the enemy **plays** (rock/dork/ritual) is a *legitimate* source. So: mana grows from **played mana sources** = lands + resolved ramp permanents. Update P17.1's ramp step (which leaned toward removing rocks) to **keep ramp as real sources**, and make `bossLands`/the mana pool count them consistently (a dork taps like a land; a rock adds; a ritual is one-shot). Flag the small balance retune.
2. **Colour-appropriate ramp:** red = rituals (one-shot burst, e.g. "add RR this turn") + the occasional rock; black = rituals + a mana rock/altar (sacrifice-for-mana fits the aristocrats theme); avoid green-style mass ramp (off-colour). Mana **dorks** only where a creature tapping for mana fits the colour's flavour. Model each via a clean effect (`ramp`/a tap-for-mana creature property `mana>0` the engine already supports on creatures).
3. **Curve + land count:** each deck gets a real land count (~17-18 in a 40-ish, scale to the ~99 singleton) + a few ramp pieces, tuned so the enemy hits its curve without flooding/screwing (the P17.2 mulligan helps). Per-difficulty `swaps` adjust land/ramp density (brutal smoother, easy rougher) — reuse the existing lever.
4. **Consistency with the mana engine:** ramp sources integrate with `usableMana()`/`bossMana`/`vaelUntap` so the AI spends them correctly; a tapped dork/used ritual is tracked.

**ACs:** each enemy deck has a functioning land base + colour-appropriate ramp; ramp permanents the enemy plays add to its usable mana consistently (rock/dork persistent, ritual one-shot); difficulty swaps tune mana density; no free/pre-seed mana (P17.1 intent preserved); the enemy reliably curves out.
**Verify:** jsdom — a played rock/dork raises usable mana; a ritual gives a one-turn burst that doesn't persist; lands-only "no free mana" still holds (no pre-seed/scrounge); difficulty swaps change land/ramp counts; syntax + id-diff. **(Reconciles P17.1 — confirm the ramp re-allow with the user; default per this request = ramp is in.)**

## P35.3 — Faithful real-MTG-style card design + coherent, balanced decks per enemy

**Goal:** redesign each enemy's deck as a believable, balanced archetype — cards designed from scratch but **working like real MTG cards** (and may be modeled on real cards) — with a proper curve, interaction (removal/answers), threats, and a finisher, so each enemy is a worthwhile, characterful fight.

**How:**
1. **Per-enemy identity & curve:** give each boss a clear archetype with a real mana curve (1-drops → finisher), interaction, and inevitability — Grakk = aggro/go-wide burn; Murglax = black attrition/aristocrats/graveyard (P35.4); Vael = Rakdos midrange with reanimation. Build the card lists as faithful, self-consistent cards (cost matches effect, colours match the pie — red burns/haste, black removal/drain/recursion; no off-colour effects).
2. **Faithful card modeling:** cards may be **inspired by or modeled on real MTG cards** (or designed fresh) but must obey real card rules — proper cost, type, colour identity, and effects expressed through the existing engine (`run`/`target`/keywords). Add the few **new engine effects** a faithful design needs (e.g. reanimation, recursion — P35.4) rather than fudging.
3. **Balance:** tune so each deck is beatable but threatening at standard, with the **per-difficulty `swaps`** (existing) making easy gentler and brutal sharper. Adversarially balance-test (a workflow agent plays/evaluates curves, threat density, answer count).
4. **Immersion/character:** flavour names + oracle-style text + `flav` lines that fit the Warren-of-Embers setting, reinforcing each boss's personality.
5. **Data-first:** most of this is FX entries + `room.pool`/`lands`/`swaps` edits via `buildDeck`; keep changes data-driven and the deck size/structure (singleton ~99 per P5.2) intact unless intentionally revised.

**ACs:** each enemy deck is a coherent archetype with a real curve, colour-faithful cards, interaction, threats, and a finisher; cards behave like real MTG cards via the engine; standard is balanced (beatable, threatening) with difficulty swaps scaling it; flavour reinforces character; every card resolves without error and builds to the intended size on every difficulty.
**Verify:** jsdom — each deck builds to its target size on easy/std/brutal; every FX entry resolves (cast/spawn/effect) without throwing; curve/colour sanity asserted (no off-colour effects; cost bands sane); finisher present; adversarial balance review; regressions green; syntax + id-diff.

## P35.4 — Graveyard strategies (reanimation · recursion · aristocrats) — Murglax's identity

**Goal:** black (and Rakdos) enemies interact with the graveyard — reanimating creatures, recurring spells, and exploiting deaths — so Murglax plays a real attrition/graveyard game (and Vael uses reanimation where it fits his Rakdos midrange). This is why P35.1 (real creatures → recurable cards) matters.

**How:**
1. **Reanimation effect:** a new `applyRun` case (e.g. `reanimate`) that returns a creature **card** from `S.gy` to the enemy battlefield as a real permanent (P35.1) — the AI picks the best target (highest `castValue`/threat). Cards like "Raise the Pyre" / a Murglax bomb-reanimator. (Manual reanimation already exists in deck-tools; this is the AI/card-driven version.)
2. **Recursion:** an effect to return a spell/card from `S.gy` to hand (regrowth-style), letting Murglax rebuy removal/drain — attrition inevitability.
3. **Aristocrats/sacrifice:** lean on the existing `bloodpact` (Pit's Tithe death drain) plus a sacrifice-for-value outlet (sac a creature/token → drain or draw) so deaths feed the engine — pairs with go-wide tokens (the enemy sacrifices its own spawned tokens for value, tying into P16.3's "enemy uses tokens").
4. **AI usage:** `vaelMain`/`castValue` value reanimating a big creature from the yard, recurring an answer, and sacrificing chaff for value — so the AI actually pursues the graveyard plan, not just holds the cards.
5. **Scope by enemy:** Murglax = full graveyard/attrition; Vael = a reanimation finisher angle (he already has reanimation flavour, P5.2); Grakk = none (mono-red aggro). Colour-gate the effects.

**ACs:** Murglax reanimates a creature card from `S.gy` onto the board (real permanent), recurs an answer to hand, and sacrifices chaff for value; the AI chooses these when they're the best play; Vael uses reanimation where it fits; Grakk doesn't; effects are colour-gated and resolve cleanly; pairs with P35.1 (creatures die as recurable cards) and P16.3 (enemy sacrifices tokens).
**Verify:** jsdom — a `reanimate` run returns the best `S.gy` creature to the enemy board as `token:false`; recursion returns a card to `S.hand`; a sacrifice outlet drains/draws and feeds `bloodpact`; the AI fires them via `castValue` when best; colour-gated (Grakk has none); regressions green; syntax + id-diff. (Builds on P35.1; uses `bloodpact`/P16.3.)

## P35.5 — Enemy spells use the full real-spell option set (parity with player mechanics)

**Goal:** the enemy's spells and permanents use the same real-spell mechanics and options the player's do — keywords, protection/ward, counters, targeting rules, ETB/triggers — so "enemy cards" aren't a reduced subset.

**How:**
1. **Audit the enemy card effects** against the player's full option set (P13/P30): keywords (incl. hexproof/shroud/protection), counters, attack/block restrictions, triggers, zone behavior. Ensure enemy cards can carry and use them (the symmetric-board work P13.x/P30 provides the substrate).
2. **Real targeting/resolution:** enemy removal/effects obey the same targeting rules (protection/hexproof/shroud/ward honoured both ways — P30.4) and resolve through the shared engine, not bespoke shortcuts.
3. **ETB/triggered abilities:** where a faithful card has an enters-the-battlefield or triggered ability, model it through the engine (a `run` on resolve / a trigger window) consistently for enemy and player.
4. **No reduced subset:** any option the player has on a card, an enemy card of the same type can have — verified by the P30 parity work; this task is the deck-design-side guarantee that the new cards actually exercise it.

**ACs:** enemy cards use the full keyword/counter/protection/targeting/trigger option set; enemy removal honours protection/hexproof/shroud/ward; ETB/triggers resolve through the shared engine; no player option is unavailable to an equivalent enemy card.
**Verify:** jsdom — a designed enemy creature with hexproof/protection is honoured in targeting; an enemy ETB trigger fires on resolve; enemy removal respects ward/protection both ways; parity matrix (player option ↔ enemy card) asserted; syntax + id-diff. (Leans on P13.x / P30.)


# PHASE 36 — Undo resets at each descent (can't undo past a descent) ✅ DONE & merged

**Specced 2026-06-29, NOT built.** Once you descend to face a new enemy, the undo button should reset to that point — you can't undo back into the previous battle. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded findings:**
- **Undo stack:** `_hist` (snapshots `{s,label}`, cap 80); `settleHistory()` (~1352) pushes the prior committed state on each settled action and **re-inits `_committed` when it's null** (~1353); `undo()` (~1359) pops; `histReset()` (~1358) clears `_hist`/`_committed`/`_actLabel`.
- **Where it resets today:** `fresh()` (game start, ~865) and continue-last-game (~2491) call `histReset()`. **`advance()` (~1786) — the mid-run descent to the next boss — does NOT.** So the undo stack carries across a descent, letting you undo back into the prior (now-wiped) battle, which is incoherent (the board/enemy were reset by `freshGameForDungeon`).
- `restart`/`startNewDescent` go through `fresh()`, so they already reset — only the in-run `advance()` is the gap.

**How:**
1. **Reset on descent:** in `advance()` (~1786), after `enterRoom(next)` and the post-descent life adjustments (P16.4 cap / P15.4 heal) and just before/at the final `render()`, call **`histReset()`**. The next `settleHistory()` (post-render microtask) re-anchors `_committed` at the new battle's start, so the earliest undoable point is the new battle — undo can't cross the descent.
2. **Cap-friendly:** this also keeps `_hist` from accumulating a whole prior battle (it's discarded at the boundary).
3. **No state/schema change** — `_hist` is module state, already excluded from save/undo; nothing persisted.

**ACs:** after descending (`advance()`), `_hist` is empty and undo reports "Nothing to undo" until you act in the new battle; actions within the new battle undo normally but can never reach the previous battle; game-start/restart/continue behavior unchanged.
**Verify:** jsdom — build some `_hist` in battle 1, call `advance()`, assert `_hist.length===0` and `_committed` re-anchors at the new room on next settle; an action in battle 2 is undoable but undo never restores battle-1 state; `fresh`/restart still reset; syntax + id-diff (one `histReset()` call).


# PHASE 37 — Enemy mana-box UI reflects the lands-only model ✅ DONE & merged

**Specced 2026-06-29, NOT built.** The enemy now opens at 0 mana and builds it only from played lands/ramp (P17.1, built). The enemy-box mana readout should make that model legible — current usable mana, how many **mana sources** it has, an honest next-turn projection, and frozen — with no copy implying free/pre-seeded mana. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded findings:**
- **Current readout (~1371-1372):** `manaPips` shows `usableMana()` (enemy turn) / `projBossMana()` (your turn); `manaLine` = "Mana remaining: `usableMana()` / `bossManaMax`" (enemy turn) or "Mana next turn: `projBossMana()`" (your turn) + a ❄ frozen note. Already uses the P17.1/freeze accessors — but it **doesn't surface the number of mana SOURCES** (`S.bossLands`), and "/ `bossManaMax`" reads as a pool cap rather than "sources."
- **The model:** mana = lands/ramp played; `S.bossLands` = source count; `usableMana()` = pool − frozen; `projBossMana()` = next-turn projection (+1 only if a land is in hand — no scrounge). The play-a-land log already says "N mana source(s)."

**How:**
1. **Show sources:** add the **source count** to the enemy box — e.g. "Mana: `usableMana()` · `S.bossLands` source(s)" (and the next-turn projection on your turn), so it's clear mana comes from played lands/ramp now, not a pre-seed. Keep the ❄ frozen note and the usable-vs-pool distinction under freeze.
2. **Honest projection:** keep `projBossMana()` for "next turn" (already no-scrounge); label it so it reads as "if it plays a land it holds."
3. **De-stale copy:** remove/----adjust any label that implies free or pre-developed mana (e.g. a bare "/ max" that suggested a fixed pool); the box should read as a growing source count. Tighten `manaPips` if needed (pips = usable, with a subtle marker for frozen).
4. **No logic change** — display only, reading the existing `S.bossLands`/`usableMana()`/`projBossMana()`/`S.bossManaFrozen`. (Pairs with P17.1; if P35.2 ramp lands later, "sources" already counts rocks/dorks since they bump `bossLands`.)

**ACs:** the enemy box shows current usable mana, the mana-source count, an honest next-turn projection, and frozen; nothing implies free/pre-seeded mana; under freeze it shows usable vs pool correctly; no mana logic changes; the readout matches the log's "N mana sources."
**Verify:** jsdom/string-check — `manaLine` includes `S.bossLands` source count and `usableMana()`; your-turn shows `projBossMana()`; frozen note present when `bossManaFrozen>0`; no "free/pre-seed"-implying text; syntax + id-diff. (Pairs with P17.1; forward-compatible with P35.2.)


# PHASE 38 — Enemy planeswalkers as cards/permanents; Vael's commander becomes a planeswalker ✅ DONE & merged

**Specced 2026-06-29, NOT built.** Enemy planeswalkers should work like everything else — **cast cards** that resolve to real walker permanents with **activated loyalty abilities at sorcery speed**, not a hardcoded auto-firing `S.pw`. The enemy commander may itself be a planeswalker, and **Vael** is redesigned so his **commander is the planeswalker** whose **ultimate spawns an overpowered Vael's Avatar**. **Depends on:** P35.1 (real enemy creatures — the spawned Avatar is a real permanent), P29 (command-zone/tax — a walker commander uses it), P30.2 (walker options), and mirrors the **player walker** model (the template). Grounded in the current `index.html` (re-grep names; line numbers drift). Large rework — build carefully (workflow-friendly); each task ships behind the standard per-task workflow.

> **Refinement (user, 2026-06-29):** the enemy planeswalker is **exactly the player's planeswalker** mechanically — same loyalty, same +/−/ult abilities, same rules — even when it's the **commander** (the only visual difference: the **box is red**, the enemy convention). Two specifics: (1) it's rendered **fully, with all its loyalty abilities listed/visible** (not a hidden card — the player can read what it does); (2) it's a **legal swing target** (P39) and the enemy may **defend it** with blockers (P39.2). When its **loyalty hits 0** it leaves like any walker — to the **graveyard** if it's a normal PW card, or to the **command zone** (with recast tax, P29) if it's the commander — and is recurable/recastable accordingly. The enemy must **manage its loyalty strategically** — see P38.5.

**Grounded audit:**
- **Hardcoded enemy walker:** `S.pw` (~871) = `{name,loy,baseLoy,colors,ultThreshold,plus,minus,ult}`, set from `room.pw`; `pwAct()` (~1826) **auto-fires** one ability each enemy upkeep (from `vaelUpkeep`); manual `adjLoy`/`damagePW` (~1766/1777) edit/kill it; `walkerMinLoy3` (~) targets it. It is **not** a card and does **not** resolve through the stack.
- **Player walkers (the template):** real cast cards → `resolvePlayerItem` planeswalker branch (~2041) → `S.my.walkers` permanent with `loyalty`/`baseLoy`; manual loyalty +/−; can be a **commander** (`kind:'walkers'`, `castCmd` casts a walker, ~1485).
- **Vael today (~782-788):** `cmd:{n:"Vael's Avatar",p:5,t:5,kw:["trample"],cost:5}` (a creature commander) **plus** a separate `pw:{name:"Nyx, Voice of Cinders",loy:3,ultThreshold:7, …ult: spawn 5/5 Cinder Wraith…}`. Two separate threats. There are also `ashreborn` ("The Avatar Reborn", 6/6) and `embershape` (Cinder Avatar) cards in the pool.
- **Multi-stack already supported:** P4.1 lets either side cast → resolve → cast again within a phase (multiple stacks); `vaelMain` runs in **main1 and main2** (`which===1`/main2).

## P38.1 — Enemy planeswalkers = cast cards → real walker permanents (sorcery-speed loyalty; retire `pwAct` auto-fire)

**Goal:** an enemy planeswalker is a **card** the enemy casts (from its deck or command zone), resolving onto a **real walker permanent** on the enemy board; each turn the enemy **activates one loyalty ability** (+/−/ult) **at sorcery speed** (its main phase, empty stack, once per turn per walker), chosen strategically — replacing the auto-firing `S.pw`.

**How:**
1. **Real permanent:** planeswalker cards (FX `type:'planeswalker'` with loyalty + `plus`/`minus`/`ult` abilities) resolve to an **enemy walker permanent** (a real object like the player's `S.my.walkers`, on the enemy board — reuse/parallel `S.pw` as a real permanent, or an `S.enemyWalkers` array; pick the lower-churn path). It carries `loyalty`/`baseLoy`, gets the P30.2 option set, takes loyalty damage from combat/`walkerMinLoy3`, and dies to the graveyard as a recurable card (P35.1).
2. **Sorcery-speed activated abilities (replaces `pwAct`):** the enemy activates **one** loyalty ability per walker **per turn**, only in its **main phase with an empty stack** (not on upkeep, not at instant speed). Move the decision out of `vaelUpkeep`/`pwAct` into the main-phase AI (`vaelMain`), choosing +/−/ult by board state + loyalty (build loyalty when safe; fire minus/removal at a real threat; ult at threshold) — leaning on the P34 "smarter" valuation. Loyalty changes by the ability's `sign`.
3. **Cast like a spell:** the walker card goes on the stack (the player may respond) before resolving — like any enemy spell (`dtPlayCard`/`vaelMain` cast path).
4. **Migrate the old `S.pw`:** convert an in-flight hardcoded `S.pw` to the new permanent representation (preserve loyalty); old saves don't break.
5. **Player walkers unchanged** — they already work this way; this brings the enemy to parity.

**ACs:** an enemy planeswalker enters as a real permanent via a cast (stack-respondable); the enemy activates exactly one loyalty ability per walker per turn, only in a main phase with an empty stack; abilities raise/lower loyalty per `sign`; it takes loyalty damage and dies to the graveyard; the old upkeep auto-fire is gone; saves migrate.
**Verify:** jsdom — casting an enemy PW card yields a real walker permanent; in main-phase the AI fires one ability (empty stack) and loyalty changes; it cannot fire on upkeep / with a non-empty stack / twice in a turn; `walkerMinLoy3`/combat reduce loyalty and lethal routes to graveyard; migrate old `S.pw`; syntax + id-diff.

## P38.2 — Enemy commander-as-planeswalker (parity with the player's walker-commander)

**Goal:** the enemy commander may itself be a planeswalker — cast from the command zone, resolving as a walker permanent, with the commander recast-tax model on death (P29) — exactly as a player can designate a planeswalker commander.

**How:**
1. **Commander kind:** let `S.cmd` represent a **planeswalker** (loyalty/`baseLoy`/abilities) as well as a creature — a `kind`/`isWalker` distinction (mirror the player's `kind:'walkers'` commander). `room.cmd` may specify a planeswalker commander.
2. **Cast from command zone:** the `_enemyCmd` resolve path (~) puts a walker commander onto the enemy board with loyalty; the P29 hand/command-zone cost model applies (base from hand, base+tax from the command zone); death → command zone with rising tax (loyalty reset to base).
3. **Loyalty abilities:** the walker commander activates abilities at sorcery speed per P38.1 while on the battlefield.
4. **Rendering:** the enemy commander box/card shows loyalty + abilities for a walker commander (vs P/T for a creature commander), reusing the walker render.

**ACs:** an enemy planeswalker commander casts from the command zone, resolves as a walker permanent with loyalty, activates one ability/turn at sorcery speed, and on death returns to the command zone with +tax (loyalty reset); the creature-commander path is unchanged; mirrors the player's walker-commander.
**Verify:** jsdom — a walker `S.cmd` casts from the command zone → walker permanent with loyalty; fires a loyalty ability in main; dies → command zone, tax +inc, loyalty reset; hand vs command-zone cost (P29) holds; syntax + id-diff.

## P38.3 — Vael redesign: planeswalker commander whose ult spawns an overpowered Vael's Avatar

**Goal:** rebuild Vael so his **commander is the planeswalker** (consolidating the old creature-commander + separate Nyx walker into one), and its **ultimate creates Vael's Avatar — a genuinely overpowered bomb** (replacing the 5/5 Cinder Wraith ult).

**How:**
1. **Commander = planeswalker:** replace Vael's `cmd:{n:"Vael's Avatar",5/5 creature}` + separate `pw:{Nyx…}` with a **single planeswalker commander** (e.g. "Vael, the Ember Tyrant" as a walker) in `room.cmd`, using P38.2. Drop the standalone `room.pw` (or fold its identity into the commander).
2. **Overpowered Avatar ult:** the ult (`sign` to threshold) **spawns "Vael's Avatar" as a real, overpowered creature** (P35.1/P35.4) — much bigger than the old 5/5 (e.g. a 7-8/7-8 with trample + haste + lifelink/deathtouch, or scaling) so it's a real finisher; keep a life cost on the ult for flavour. Tune so it's threatening but beatable, scaled by difficulty (room HP/`reborn` already scale).
3. **Plus/minus abilities:** give the walker a sensible +ability (build loyalty / chip the player / make a small body) and a −ability (removal/drain) so it plays as a planeswalker, not just an ult-bot. Colour-faithful R/B.
4. **Reconcile the two-phase boss:** Vael's `reborn` second phase (~782) and the existing `ashreborn`/`embershape` avatar cards — make the avatar ult and the phase-2 revival coherent (the Avatar is the ult payoff; the reborn mechanic stays the boss's second life). Avoid double-avatars unless intended.
5. **Flavour:** name/oracle/`flav` fitting Vael — the planeswalker *is* the Tyrant; the Avatar is the fire given a body.

**ACs:** Vael fields a single **planeswalker commander** (no separate Nyx walker); its ultimate spawns an overpowered Vael's Avatar (a real bomb, far beyond the old 5/5); the +/− abilities play sensibly; difficulty scales the threat; the reborn second phase stays coherent (no unintended double-avatar); flavour fits.
**Verify:** jsdom — Vael's room yields a planeswalker commander (loyalty, no separate `S.pw`); reaching the ult threshold + firing it spawns the overpowered Avatar (correct big stats/keywords, real permanent); +/− abilities resolve; reborn phase intact; builds on every difficulty; syntax + id-diff.

## P38.4 — Sorcery-speed loyalty for the player + enemy strategic stack sequencing (reserve for main2)

**Goal:** formalize loyalty-ability timing as **sorcery speed** for both sides (main phase, empty stack, once per turn per walker, the controller chooses *when*), and let the enemy **sequence multiple stacks** across its turn and **strategically reserve** plays for its **second main** phase.

**How:**
1. **Sorcery-speed gate (both sides):** a loyalty ability can be activated only in a **main phase** of its controller's turn, with an **empty stack**, **once per turn per walker** (track a per-turn "activated" flag, cleared each turn). The **player chooses when/which** to activate (a UI affordance on the player walker — pick the ability in main1 or main2). The enemy AI obeys the same gate (P38.1).
2. **Enemy sequential stacks:** the enemy already supports multiple stacks per phase (P4.1) — make `vaelMain` deliberately **propose stacks one after another** (cast → let it resolve → cast again) within a main phase, rather than dumping everything at once, so the player can respond to each.
3. **Reserve for main2 (strategy):** the enemy AI decides what to **hold for the second main** — e.g. develop threats in main1, **reserve removal / a combat trick / a walker ult / mana** for after combat (main2) when it's more valuable (kill a blocker post-combat, push a finisher, answer what the player committed). Drive this with the P34 valuation: a play whose value is higher post-combat is reserved. Keep instant-speed answers for the player's turn (the existing `enemyInstant` windows).
4. **Logging/clarity:** the enemy narrates when it holds back ("{enemy} holds {card} for after combat") so the sequencing reads intentionally, not as passivity.

**ACs:** loyalty abilities (player + enemy) are activatable only at sorcery speed (main, empty stack, 1/turn/walker), and the player picks when; the enemy casts in sequential stacks the player can respond to; the enemy reserves higher-post-combat-value plays (removal/trick/ult/mana) for main2 and uses them there; held-back plays are logged; instant-speed windows still work.
**Verify:** jsdom — a loyalty ability is rejected outside a main / with a non-empty stack / on a second activation that turn; the player can fire in main1 or main2; the enemy proposes ≥2 sequential stacks in a turn when it has plays; a post-combat-valuable removal is reserved for main2 and fired there; held-back log present; syntax + id-diff. (Builds on P4.1, P34, P38.1.)

## P38.5 — Enemy loyalty strategy (manage toward the finisher, protect the walker, avoid 0) + full render

**Goal:** the enemy plays its planeswalker like a real opponent would — spending and building loyalty deliberately toward its **ultimate/finisher**, while **defending the walker** so it doesn't hit 0; and the walker is **rendered fully** (all abilities listed, red box) so the player can read and target it.

**How:**
1. **Loyalty management AI:** each turn the enemy picks the loyalty ability (P38.1) by a real plan, not just "ult at threshold":
   - **Build (+):** raise loyalty when the walker is **threatened** (the player can attack it down) or when banking toward the **ult** is worth more than acting now.
   - **Defend/answer (−):** use the minus (removal/drain/body) when there's a real threat or to remove an attacker that would kill the walker.
   - **Ult:** fire the finisher when loyalty reaches the threshold **and** it's safe/impactful (don't ult into a board that immediately kills the now-low walker unless it's lethal/decisive).
   - **Avoid 0:** weigh each spend against the player's ability to attack the walker to 0 next turn — prefer a line that keeps it alive (build, or kill the attacker) over a greedy minus that leaves it killable, unless the payoff is worth trading the walker.
2. **Defend it in combat:** the enemy assigns blockers to attackers aimed at the walker (P39.2 / the existing combat-AI) when the walker is worth protecting — tie the block decision to the loyalty plan (protect a walker about to ult; let a spent one go if blocking costs too much).
3. **Full render (red box):** the enemy walker shows its **current loyalty** and **all its loyalty abilities** (+/−/ult with costs + text), like the player's walker card, in a **red** enemy box — the player can read exactly what it does and plan around it. (Abilities are public info, unlike the enemy's hidden hand.)
4. **0-loyalty routing (confirm):** at 0 loyalty (from combat, removal, or its own minus) it leaves to the **graveyard** (normal PW card — recurable via P35.4) or the **command zone** (commander — recast tax per P29); never lingers at 0.
5. **Difficulty-scaled:** easy spends loosely (closer to today's auto-fire feel); brutal plays the full protect-and-build-to-ult line (`enemyLuck()`/difficulty gate), per the P34 convention.

**ACs:** the enemy builds loyalty when its walker is threatened, uses the minus to answer/defend, ults when safe and impactful, and generally avoids letting the walker reach 0 (unless trading it is clearly worth it); it defends the walker with blocks when worthwhile; the walker renders fully (loyalty + all abilities, red box); at 0 it routes to graveyard/command-zone; difficulty scales the sophistication.
**Verify:** jsdom — given a threatened walker the AI builds loyalty (or kills the attacker) rather than greedily spending to a killable state; ults at threshold when safe; the render lists all abilities in a red box; 0 loyalty → graveyard (card) / command zone (commander); easy vs brutal differ; syntax + id-diff. (Builds on P38.1/P38.2, P39.2, P34.)


# PHASE 39 — Attack-target selection: swing at the enemy, its planeswalkers, or its sieges/battles ✅ DONE & merged

**Specced 2026-06-29, NOT built.** When a boss siege/battle is on the field, the player should be able to send each attacker at the **enemy**, an **enemy planeswalker**, or a **siege/battle** — chosen per-attacker in the combat resolver, like the panel the enemy uses to target your walkers — and the enemy should be able to **block (or not) attacks aimed at its sieges/battles**. Grounded in the current `index.html` (re-grep names; line numbers drift). Ships behind the standard per-task workflow (syntax gate → id-diff → jsdom driver → adversarial review).

**Grounded audit:**
- **Battles/sieges:** `S.battles` (`{id,name,def,maxDef,side:'you'|'boss',tick,defeated,_vael,note}`). **Boss-side** entries are sieges — `fieldVaelBattle` (~1538) adds "Siege of the Ember Throne" (def 6, heals Vael 2/upkeep via `tickBossBattles` ~1539); breaking it (def→0) is meant to deal 6 to Vael (per its note). Today battles are attacked **manually** in the Battles panel (⚔/±), **not** through the combat resolver.
- **Combat resolver target select (the template):** `renderCombat` (~1213) builds a per-attacker target `<select>` **only for the enemy-attack direction** (`vael`), listing you + your walkers → `combatTarget(attId,val)` into `S.combat.target`; `approveCombat` (~1243, `vael` branch) splits `perAtt` by target and applies to your life / walker loyalty. **Your-attack direction (`dir==='you'`) has no target select — all damage hits `S.boss.life`.**
- **Blocking:** `aiBlocks` (~1185) assigns the enemy's blockers to your attackers (threat-sorted); it has no notion of an attacker aimed at a siege/battle.

## P39.1 — Per-attacker target select on your swing (enemy · walker · siege/battle) + damage routing

**Goal:** when you swing and a boss siege/battle (or enemy planeswalker) is in play, each attacker row shows a **target select** — enemy face · each enemy planeswalker · each boss-side siege/battle — and damage routes to the chosen target.

**How:**
1. **Target select for your attackers:** in `renderCombat` (~1213), for `dir==='you'`, render a per-attacker target `<select>` (mirroring the `vael`-direction `tsel`) whose options are: **the enemy** (face, default), each enemy **planeswalker** (`S.pw`/enemy walkers — real & targetable once P38 lands), and each **boss-side `S.battles` siege/battle** that isn't `defeated`. Store in `S.combat.target[attId]` via `combatTarget`. Only show the select when there's more than the face to choose (a siege/battle or walker exists) — otherwise plain face attack as today.
2. **Damage routing in `approveCombat` (`dir==='you'` branch):** split `perAtt` by target (mirror the enemy-direction split): face → `S.boss.life` (+ commander-damage/counters as today), walker → loyalty, **siege/battle → reduce its `def`** by the attacker's damage; clamp at 0 and mark `defeated`. When a **boss siege** breaks (def→0), fire its payoff (e.g. Vael's "deal 6 to Vael" per its note / stop the upkeep heal). Log each routing.
3. **Trample/keywords:** if a creature attacking a siege/battle is blocked, normal combat applies (it fights the blocker); unblocked, its damage goes to the chosen target. Trample over a blocker spills to the **targeted** object (face or battle), per MTG.
4. **Prediction:** `predictCombat` reflects per-target damage (X to enemy, Y to walker, Z to the siege) so the preview matches.
5. **Keep the manual Battles panel** as a fallback/bookkeeping tool; this adds the *combat* path.

**ACs:** with a siege/battle (or enemy walker) in play, each of your attackers can pick its target; damage routes correctly (face/loyalty/defense counters); a siege at 0 def is defeated and fires its break payoff (Vael takes 6 / heal stops); prediction matches; with nothing but the face to hit, the select is hidden and it behaves as today.
**Verify:** jsdom — your attacker targeting a boss siege reduces its `def` and breaks it at 0 (firing the payoff); targeting the face hits `S.boss.life`; targeting a walker hits loyalty; `predictCombat` splits by target; no select when only the face exists; syntax + id-diff. (Pairs with P38 for walker targets; P7.7 for sieges.)

## P39.2 — Enemy can block attacks aimed at its sieges/battles

**Goal:** the enemy may assign blockers to defend a siege/battle — choosing whether to block an attacker pointed at it — just as it blocks attackers aimed at its face.

**How:**
1. **`aiBlocks` considers battle-targeted attackers:** extend `aiBlocks` (~1185) so an attacker whose `S.combat.target` is a boss siege/battle is a **blockable** target — the enemy decides whether to block it (protect the siege) or let the defense counters be removed. Value the decision: block to **save the siege** when the siege is worth more than the trade (e.g. Vael's siege still healing/about to matter), else let it through (don't waste a blocker on a near-dead siege or a cheap chip). Reuse the P34 valuation.
2. **Block resolution:** a blocked attacker fights the blocker (normal combat); if it survives/tramples, the remainder still reduces the siege per P39.1. An unblocked battle-attacker removes defense as chosen.
3. **Menace/min-block/`maxBlk` rules** (P12.2/P20.3) apply identically to a battle-targeted attacker.
4. **Player-side parity (optional):** if the player ever fields a battle the enemy attacks, the player already assigns blockers via the resolver — note symmetry; the focus is the enemy defending its sieges.

**ACs:** the enemy can block an attacker aimed at its siege/battle (chosen by value — protect a worthwhile siege, let a doomed/low-value one through); a blocked battle-attacker fights the blocker and only its excess/trample reaches the siege; menace/`maxBlk` rules hold; an unblocked battle-attacker removes defense; difficulty scales the choice.
**Verify:** jsdom — an attacker targeting the enemy siege can be assigned an enemy blocker by `aiBlocks`; the enemy blocks when the siege is worth saving and declines when not; a blocked battle-attacker's excess still hits the siege; `maxBlk`/menace respected; syntax + id-diff. (Builds on P39.1, P34, P12.2/P20.3.)


# PHASE 40 — Deferred keyword backlog: enters-tapped · prowess · flash + rare-evasion recognition ✅ DONE & merged

**Built 2026-07-02.** Clears the P12.2 coverage-audit's remaining deferred items so no card mechanic is silently dropped. Two real mechanics + import recognition for the rest.

## P40.1 — Enters-tapped
`inferEffects` parses `"enters (the battlefield) tapped"` → `props.entersTapped`. A player creature with the flag resolves `tapped:true` (`resolvePlayerItem`); an enemy creature card resolves tapped if its FX carries `entersTapped` (`resolveEnemyCreature`, forward-compatible). Scoped to creatures (the meaningful case — a tapped creature can't block the turn it arrives). **Verify:** jsdom — parse; a flagged player creature enters tapped, a normal one untapped.

## P40.2 — Prowess
`prowess` is a real keyword: when a **noncreature spell resolves**, its controller's prowess creatures get **+1/+1 until end of turn** (`firePlayerProwess` on a player noncreature resolve in `resolvePlayerItem`; `fireEnemyProwess` on an enemy noncreature resolve in `resolvePlay` — enchant/artifact, planeswalker, and spell paths). Buffs ride the temp `_tp/_tt` channel; **`youEnd` now clears the player's until-EOT buffs** (mirror of `vaelEnd` for the enemy), so prowess expires correctly. A creature spell does NOT trigger it. **Verify:** jsdom — a noncreature spell buffs a prowess creature +1/+1; a creature spell doesn't; the buff expires at end of turn; both sides.

## P40.3 — Flash + rare-evasion recognition
Added `flash`/`prowess` to `KW_LIST` (creator toggles) and `flash`/`prowess`/`shadow`/`horsemanship`/`skulk`/`daunt`/`fear`/`intimidate` to the importer's `RECOGNISED_KW`, so imported cards **round-trip and display** these keywords instead of dropping them. **flash** is a cast-at-instant reminder (this sandbox already casts freely); the **rare-evasion family** is a display-only badge — full block-eligibility (which needs creature-subtype tracking) is left as a manual note. **goad** stays the existing manual `◐` status marker; **draw/tutor one-shots** stay reminders (the player has no library to draw from). **Verify:** jsdom — a Scryfall-style import carrying these keywords maps them onto the card.


---

# THE PHASE 41–46 REWORK (specced 2026-07-04 — all ⬜ PLANNED, none built)

> **Scope.** The user's full-game rework request: fix Guff's lore colour; make item durations real and the economy coherent; build **Campaign & Sandbox** as two proper game modes on a multi-level foundation; push enemy decks/AI to a second realism pass; overhaul UI/animation/sound (Moxfield-inspired on desktop); and close everything a *complete* game still lacks — ending in a **final clean-up & validation gate**.
> **Platform decided first (per the user):** D4 — stay web/PWA, no engine port; D5 — one responsive app (see §3). The rework happens **in place**.
> **Build order = phase order** (41 trivial → 42 small-but-load-bearing → 43 the big infrastructure → 44 gameplay → 45 presentation → 46 hardening + the validation gate over everything).
> **Grounding.** Every symbol/line below is from a 6-agent research sweep of the CURRENT `index.html` (2026-07-04, HEAD `0af2bb0`). Line numbers drift — **re-grep the symbol before building**; never Read a range spanning the `ART` blob line (~614).

# PHASE 41 — Lore fix: Guff is red-bearded (MTG canon) ✅ DONE

> **Goal.** The Guff-freed cutscene calls Guff "grey-bearded". Canon Commodore Guff (Invasion-era novels; Commander Masters #706 art) has **reddish hair and beard** — the MTG Wiki: *"a raft of reddish-blond hair, an aggressive beard … perfectly matching his hair and beard."* One-string recolour + doc echo.

**Grounded findings.** Exactly ONE colour-bearing appearance string exists in the whole project: `DUNGEON[2].guffFreed[0]` (index.html ~807, inside `const DUNGEON` ~778): *"…In a cage of ember-iron a broad-shouldered man waits: **grey-bearded**, seamed with old scars, and in all this dark he has not knelt."* The identical sentence is echoed in this spec's P11 section (~1034 — grep `grey-bearded`). STORY.md contains **no** physical description of Guff — its grey/gray hits (~40/59/166) are moral "grayness" and must NOT be touched. The game's broad-shouldered, scarred-founder Guff is an intentional reimagining of the comical monocled librarian of canon — recolour ONLY; do not import the monocle/waistcoat look.

**How:**
1. index.html ~807: `grey-bearded` → **`red-bearded`** (rest of the sentence intact).
2. This spec, P11 section ~1034: the quoted copy gets the same swap so the tracker matches the shipped string.
3. STORY.md §5 (Guff's character sheet, ~85–86): ADD one canon-appearance line — *"Appearance: red — a raft of reddish hair and an aggressive red beard (canon); in Ashveil, broad-shouldered and scarred by the war."* — so future copy stays red.

**ACs:** the cutscene reads "red-bearded"; `grey-bearded` appears nowhere in index.html, and in SPEC.md survives ONLY inside this Phase-41 section's own prose (the P11 quoted copy at ~1034 is swapped); STORY.md's moral-grayness lines are untouched and §5 carries the appearance note.
**Verify:** grep — index.html has 0 `grey-bearded`/`gray-bearded` hits outside the ART blob; SPEC.md's only remaining hits sit inside this section; jsdom boot + `winCutscene` beat-2 renders the new line; syntax gate.


# PHASE 42 — Item duration & economy coherence ⬜ PLANNED

> **Goal.** Passives/reminders REALLY last exactly 1 descent (today they are immortal); Sapper's Map stops leaving dead rows; Scholar's Token / Arcane Tome stop duplicating each other; prices follow coherent curves — **user anchor: Healing Draught = 7g / heal 5** alongside Greater Draught 12g / heal 10.

**Grounded findings (re-grep before building).** The satchel promises "Passives & reminders last exactly one descent" (~3211) and P14.5 made duration *structural* (`fresh()` wipes `S.inv`; `carryInvForward()` ≡ `[]` ~2533) — but the **P15.3 stash loop defeats it**: `win()` (~2485) and `lose()` (~2520) call `saveUnusedItems()` (~2725), which stashes EVERY surviving `S.inv` item with **no kind filter**. Passives/reminders can never be "used" (`useBoon` ~1968 hard-rejects `kind!=="consumable"`), so every Ward Stone / Aegis / Buckler / Phoenix / Scholar / Sigil bought once returns via `applyStashItems()` (~2726) at every descent start, **forever** (only escape: a Phoenix that actually fires is consumed — `checkLose` ~2484). The soak relics are priced sanely ONLY at true 1-descent life (buckler 8g/1 · ward 18g/2 · aegis 34g/4; stack read at ~1459) — at lifetime duration, a one-time 60g buys 7 soak per assault every run and Phoenix 40g = a free life every run. **Sapper's Map:** `grantBoon` sets `S.weakenNext` AND pushes a row (~1969); `enterRoom` consumes the flag but never the row (~875); a stash-returned map never re-sets the flag → a dead row recycles forever (`applyPendingPurchases`' map special-case ~2535 applies the −4 for mid-run purchases; `lootRoll`'s final-room map→heal10 guard ~1970). **Scholar's Token** (common, 8g, "extra card each turn", also loot d20 9–11) **strictly dominates Arcane Tome** (uncommon, 14g, "extra card on each of your first two turns") — a worse effect at a higher price AND rarity. **Damage g/dmg zig-zags:** acid 7g/3 = 2.33 · bomb 12g/4 = 3.00 · pyre 20g/8 = 2.50 · comet 38g/12 = 3.17 (the uncommon pyre beats the uncommon bomb on value AND burst). The `descents` field is written in six places (grantBoon ~1969 · applyPendingPurchases ~2535 · buyStore ~2899 · saveUnusedItems/applyStashItems ~2725–2726 · migrate ~2769) and **read nowhere** — dead data. The Fortune Wheel's "rare/legendary **relic**" labels (~860) can pay a consumable via `pickByRarity` (~863). `advance()`'s heal log says "between descents" (~1977) but fires between rooms *within* one descent.

## P42.1 — Passives really expire: filter the stash to consumables
1. `saveUnusedItems()` (~2725): the keep-filter gains `&& BOONS[it.id].kind==="consumable"` — passives/reminders die with the run; unused consumables still persist (the P15.3 intent).
2. `applyStashItems()` (~2726): add the same defensive filter so profiles with already-polluted stashes self-clean on next apply (equivalently a one-time `migrate` sweep of `p.stash` — pick one, comment which).
3. Delete the dead `descents` field from the six write sites + the migrate backfill (~2769) — duration is structural (P14.5); the field is noise. (`uid` STAYS — P21.1 consumption depends on it.)
**ACs:** win/lose with an unused Ward Stone + a Healing Draught → the next descent starts with ONLY the draught back; polluted old stashes are cleaned; no inv/pending/stash item carries `descents`; the satchel text (~3211) is finally true.
**Verify:** jsdom — passive+consumable at `win()` → stash holds only the consumable; `applyStashItems` restores it and drops a polluted passive; the fired-Phoenix path unchanged; migrate old-save; syntax + id-diff.

## P42.2 — Sapper's Map: the row is consumed when the −4 fires
1. `enterRoom` (~875): when `S.weakenNext` is spent, also remove the map row from `S.inv` (by id) + log "🗺 The Sapper's Map is spent."
2. Mirror the row-consumption in `applyPendingPurchases`' map special-case (~2535).
3. With P42.1, a spent/unspent map can no longer stash-return dead. (`lootRoll`'s map→heal10 final-room guard unchanged.)
**ACs:** a bought/looted map weakens exactly the next villain and its satchel row disappears at that moment; no dead map rows ever.
**Verify:** jsdom — map → next `enterRoom` boss −4 + row gone; pending-purchase path same; two maps stack (−8) or the second is refused (state which at build); syntax + id-diff.

## P42.3 — Scholar's Token ↔ Arcane Tome: price-invert into clear roles
1. **Scholar's Token = the premium engine:** keep "Draw an extra card each turn (apply yourself)"; move to **uncommon · 18g** (BOONS ~823, STORE ~843).
2. **Arcane Tome = the cheap burst:** keep "an extra card on each of your first two turns"; move to **common · 7g** (BOONS ~827, STORE ~845).
3. Loot d20 9–11 keeps granting `scholar` (loot may be generous). Optional cosmetic: identical reminder rows merge in the satchel with a ×N badge.
**ACs:** the two items have visibly distinct roles and coherent price/rarity (always-on > 2-turn burst); store + satchel render the new rarities.
**Verify:** jsdom — table assert over BOONS/STORE; store + satchel render; syntax + id-diff.

## P42.4 — Price-curve rebalance (user anchor: Healing Draught 7g)
1. **Heals — bulk-discount curve (g/hp falls as size rises):** Healing Draught **7g / heal 5** (1.4 — user-specified) · Greater Draught **12g / heal 10** (1.2, unchanged) · Grand Elixir **25g / heal 25** (1.0 — the P28.2 anchor, unchanged) · Tonic of Vigor 36g legendary unchanged. Cleansing Antidote 8g → **6g** (situational).
2. **Damage — premium-per-point curve (g/dmg RISES with burst size):** Acid Flask **7g / 3** (2.33) · Cinder Bomb **11g / 4** (2.75) · Pyre Charge **24g / 8** (3.0) · Falling Comet **42g / 12** (3.5) — fixes pyre-beats-bomb; big one-shots cost more per point.
3. **Wheel label honesty:** relabel the item slices "a rare/legendary **treasure**" (~860) — cheaper than restricting `pickByRarity` (~863).
4. **Ember Sigil gets real (or goes):** wire "+1 direct damage to the boss" into the `dmgBoss` apply path (the freeform direct-damage input, ~392) so the 6g common does something mechanical; if not wired at build, CUT it — no dead items (§1 principle 6).
5. **Wording:** `advance()`'s heal log (~1977) "between descents" → **"between battles"** (a *descent* = the whole run, per TUTORIAL_HTML ~2675).
6. Store-only items (acid/antidote/bomb/whet/buckler/tome) stay store exclusives — deliberate; say so in the store ⓘ.
**ACs:** every price matches the tables above; both curves are monotone in the stated direction; the wheel never announces "relic" for a consumable; Ember Sigil is functional or absent; log wording fixed.
**Verify:** jsdom — table-driven assert over BOONS/STORE prices+effects; a `dmgBoss` hit with ember in inv deals +1 (or ember absent); wheel slice text; syntax + id-diff.


# PHASE 43 — Campaign & Sandbox: two game modes + multi-level infrastructure ⬜ PLANNED

> **Goal.** A **mode choice** after profile select: **⚔ Campaign** — the story. Levels unlock in order; a run walks each level's dungeon; **life/max-life, gold and unused (unexpired) items carry BETWEEN levels**; the run is **forward-only** (no replaying a cleared level inside a run); **one campaign run at a time — starting a new one erases the old**; the story unfolds and is tracked on the 📖 Lore panel. **🏟 Sandbox** — replay freely. Every **battle (enemy)** beaten in Campaign unlocks **individually** (a flat per-enemy ledger — NOT grouped/stored by level); pick any unlocked enemy + difficulty and fight a single battle with **no dungeon walk**; **HP refreshes every battle**; Sandbox keeps its **own gold and inventory**, fully separate from Campaign's. Both live inside the existing profiles, so profiles stay the save-file layer with a campaign and a sandbox inside each.
> **Relation to prior plans:** this SUPERSEDES the old level-II memory sketch (CAMPAIGNS[]-alias). Its key move survives — the registry + `DUNGEON`-alias — but carry-over rules changed (HP/gold/items now carry between levels) and the whole two-mode layer is new. Level II content itself is still out of scope until its content spec (decks/wardens/lore) exists; this phase builds the INFRASTRUCTURE with Level I as the only entry.

**Grounded findings (re-grep before building).** Persistence is one localStorage key (`SKEY` ~2719) holding `DB={profiles,active,save}`; a profile = `{name,wins,losses,gold,library,tokens,pending,stash,created}` (`blankProfile` ~2723). **`DB.save` is a single GLOBAL autosave slot** (`doAutosave` ~2739, `SAVE_V=40` ~2736) and `continueLastGame()` (~2780) **never checks `sv.profile`** — switching profiles and pressing Continue resumes another profile's run (latent bug this phase fixes structurally). Gold lives ONLY on the profile through exactly 3 accessors (`getGold/addGold/spendGold` ~2792–2794) + ONE stray direct read (`renderMenu` ~2873). The menu (~551–574) hardcodes `h1` "Level I — The Warren of Embers" (~554); Descend → `startGame` (~2863) → `confirmNewDescent` (~2865) / `startNewDescent` (~2869); `restart()` (~2536) duplicates the same `fresh()→enterRoom(0,true)→applyPendingPurchases()→applyStashItems()` chain. Progression is the hardcoded 3-room `DUNGEON` (~778) walked by `advance()` (~1973, with `DESCENT_HEAL` ~617) and ended by `bossDown/win/lose` (~1972/2485/2520); `winCutscene` (~2498) **hardcodes `DUNGEON[2]`** and the beat-2 eyebrow "The Cage Breaks · Level I" (~2504); `showEncounterClear` (~2669) reads `DUNGEON[S.roomIndex+1]`. `enterRoom(i)`/`buildDeck` (~875/~886) are already self-contained per room — a Sandbox battle is essentially `enterRoom(i)` without `advance()`. **No persistent progress record exists**: `openLore` (~2624) computes `seen=i<=S.roomIndex` from the LIVE run, so lore re-locks every new descent; the only lasting traces are `p.wins/p.losses` (`recordResult` ~2790). `descentInProgress()` (~2744) gates the Merchant off the one global slot; `saveUnusedItems`/`applyStashItems`/`applyPendingPurchases` (~2725/2726/2535) run unconditionally at every run end/start — with two modes these buckets would leak across modes unless keyed. NO multi-level/mode scaffolding exists (grep CAMPAIGNS/setCampaign/levelSelect/LEVELS/currentLevel = 0 hits). `fresh()` (~874) hardcodes `youLife:40,youMax:40` and carries no mode/level field. TUTORIAL_HTML hardcodes "One descent is three encounters" (~2675).

## P43.1 — Data model & migration: per-mode buckets + per-profile per-mode saves
**The shape (initialise in `blankProfile`, backfill in a profile-level migrate):**
- `p.camp = { gold, pending:[], stash:[], cleared:{}, level:0, run:null }` — `cleared` = the flat battle ledger (P43.6); `level` = highest unlocked level index; `run` = the campaign autosave slot (was `DB.save`).
- `p.sand = { gold, pending:[], stash:[], save:null, stats:{} }` — its own purse/inventory; `stats` optional per-battle W/L.
- **Migration:** move `p.gold→p.camp.gold`, `p.pending→p.camp.pending`, `p.stash→p.camp.stash`; a legacy `DB.save` moves into `DB.profiles[sv.profile].camp.run` (fixing the cross-profile Continue bug); bump `SAVE_V`; `S` gains `mode:'campaign'|'sandbox'` + `levelIdx` (init in `fresh()`, backfill in `migrate()` → `{mode:'campaign',levelIdx:0}`).
- **Accessor re-point:** `getGold/addGold/spendGold` (~2792–2794) read the ACTIVE MODE's bucket (a tiny `bucket()` helper off `S.mode`; from the menu the store is only reachable INSIDE a mode screen — P43.3 item 5 — which hard-keys it, so no ambient "menu mode" fallback exists); fix the one direct `p.gold` read (~2873). `applyPendingPurchases/applyStashItems/saveUnusedItems/descentInProgress/buyStore/renderStore` all go mode-keyed the same way.
**ACs:** a fresh profile has both buckets; an old profile migrates losslessly (gold/pending/stash land in `camp`; an in-flight `DB.save` becomes that profile's `camp.run`); campaign and sandbox purchases/stashes/purses never mix; Continue on profile A can no longer resume profile B's run.
**Verify:** jsdom — migrate matrix (old profile ± old DB.save); gold accessor round-trip per mode; buyStore in each mode lands in the right pending; cross-profile continue blocked; syntax + id-diff.

## P43.2 — `LEVELS[]` registry: `DUNGEON`/`ROOM_ART` become aliases; stable battle ids
1. `const LEVELS=[ {id:'warren', levelNo:1, name:'The Warren of Embers', subtitle, unlock:null, teaser, rooms:<the existing 3 DUNGEON rooms verbatim>, art:['grakk','murglax','vael']} ]` — room shape (name/villain/colors/hp/cmd/pool/lands/swaps/lore/intro/isVael/…) is UNTOUCHED so deck-building/AI/combat never notice.
2. `const DUNGEON` → `let DUNGEON`; `let ROOM_ART`; `setLevel(idx)` re-points both from `LEVELS[idx].rooms/.art` and sets `S.levelIdx`. Every existing engine reference keeps working. `migrate()` validates `levelIdx` the way it clamps `roomIndex` (~2777). ⚠ **`const ROOM_ART=` is declared ON the ART-blob line (~614)** — NEVER Read that line; convert it with a blind surgical Edit on the unique substring `const ROOM_ART=[` → `let ROOM_ART=[` (or leave line 614 untouched and declare the alias elsewhere, re-pointing its one non-blob consumer, `openLore` ~2627).
3. **Stable battle ids** for the ledger: `battleId(level,room)` = `` `${LEVELS[level].id}:${room.villain}` `` (e.g. `warren:Grakk the Gatewarden`) — flat keys, deliberately NOT nested under levels (per the user: sandbox unlocks are per-enemy, not per-level).
4. De-hardcode the level-finale plumbing: `winCutscene` (~2498) takes the active level's final room instead of `DUNGEON[2]`; its "· Level I" eyebrow (~2504) reads `LEVELS[S.levelIdx]`; `showEncounterClear`'s next-room read is already alias-safe.
**ACs:** with only Level I registered the game behaves byte-identically; `setLevel(0)` is a no-op alias; battle ids are stable strings; nothing reads the old const directly at parse time before `setLevel` runs.
**Verify:** jsdom — full 3-room descent green post-alias; winCutscene fires from the alias; battleId table; syntax + id-diff (no id changes expected).

## P43.3 — Menu rework: mode choice + campaign screen + sandbox battle grid
1. Menu `h1` (~554) → **"Guff's Gauntlet"** (the game's name; the level name moves into the campaign screen + the in-game header, which already shows it). Replace the single "Descend ▸" (~574) with **⚔ Campaign ▸** and **🏟 Sandbox ▸**; Continue (~573) becomes mode-aware (labels which mode's save it resumes).
2. **Campaign screen** (a `.cutbox`-family overlay, like the existing confirm dialogs): one card per `LEVELS[]` entry — cover art, "Level N — name", state ✓ cleared / ▶ current (Continue run / New run) / 🔒 locked (`unlock` gate: previous level cleared). "New run" routes through the EXISTING abandon-save confirm (`confirmNewDescent` ~2865 — "erases the old run" for free). With one level it's a one-card screen — cheap, and Level II drops in as data.
3. **Sandbox screen:** a battle grid — one tile per battle in `p.camp.cleared` order across all levels (portrait via the level's `art` key when earned, 🔒 + "???" silhouette when not; villain names hidden until earned, matching the lore page's convention) + a difficulty seg per launch (`S.diff` is per-run state already — `menuSetDiff` pattern ~2870).
4. Both screens converge on a parametrized starter: `startBattle({mode, levelIdx, roomIdx, diff})` wrapping the `fresh()→setLevel→enterRoom→apply*` chain (today duplicated in `restart`/`startNewDescent` — collapse them onto it).
5. **The Merchant moves off the main menu** (today a main-menu button, ~572) into BOTH mode screens — the campaign screen and the sandbox grid — each opening the store hard-keyed to that screen's bucket, with a "Buying for: ⚔ Campaign / 🏟 Sandbox" line in the store header. This pins which purse pays and which `pending` receives; there is no mode-less store entry. The mode-aware Continue reads the same context: the campaign screen continues `p.camp.run`, the sandbox grid continues `p.sand.save`.
**ACs:** the menu offers both modes; campaign cards gate on the previous level; sandbox tiles gate on the per-enemy ledger; a new campaign run still triple-confirms over a live save; the retired "Level I" `h1` text lives on the campaign card + in-game header only.
**Verify:** jsdom — menu renders both buttons; locked/unlocked states from a seeded profile; `startBattle` boots each mode; abandon-confirm still fires; syntax + id-diff (new ids expected — record them).

## P43.4 — Campaign rules: carry-over, forward-only, story flow
1. **Within a level:** exactly today's behaviour (advance/DESCENT_HEAL/loot/merchant-lock).
2. **Between levels (new):** clearing a level's finale offers **"Descend to Level N+1 ▸"** (when a next level exists) alongside "Return to the surface": the level transition is a SUPER-`advance()` — `setLevel(n+1); enterRoom(0)` with `freshGameForDungeon()` semantics — **life, max life, gold and unexpired unused items all carry** (satisfied structurally: gold/stash live on `p.camp`; `S.inv` consumables ride along; P42.1 already killed passive carry). The Fortune Wheel (P15.1) spins at EACH level clear (it is "end-of-level"); `recordResult(true)` fires per level clear. **Run-end bookkeeping is scoped:** `saveUnusedItems()` + `clearSave()` fire ONLY at campaign end (the FINAL level's win) or `lose()` — a mid-campaign level clear instead `doAutosave()`s the run at Level N+1 Room 0, with items riding in `S.inv` (never the stash — no duplication at the next `applyStashItems`). "Return to the surface" at a level boundary **PARKS** the run at that autosave (Continue resumes Level N+1 Room 0); it does not end the run or stash items.
3. **Forward-only:** no UI path re-enters a cleared level during a run (`p.camp.run` stores `levelIdx+roomIndex`; the campaign screen's cleared cards offer no "replay" — that's Sandbox's job). New run = wipe `p.camp.run`, start at Level 1 Room 0 (ledger/`level` unlocks are NOT wiped).
4. **Story:** each level's intro/win cutscenes fire in sequence; the final level's finale runs the full escape/Guff/epilogue chain. With only Level I, "campaign complete" = today's `win()`.
**ACs:** finishing Level I with a next level registered offers the onward descent carrying HP/gold/items; without one it ends the campaign as today; a new run never resurrects the old run's position but keeps unlocks; no path replays a cleared level inside a run.
**Verify:** jsdom — two-level fixture (a tiny test level II): carry-over of life/max/gold/consumables across the boundary; forward-only; new-run wipe semantics; single-level regression byte-green; syntax + id-diff.

## P43.5 — Sandbox rules: single battles, own economy, HP refresh
1. `startBattle({mode:'sandbox', levelIdx, roomIdx, diff})`: `fresh()` (HP always 40/40 base — max-life boons used IN a sandbox battle last that battle only), `setLevel`, `enterRoom(roomIdx,true)`, sandbox `pending`/`stash` applied (its own inventory per the user), merchant reachable BETWEEN battles only (`descentInProgress` mode-keyed per P43.1).
2. **End of battle:** a mode-aware wrapper around `bossDown/win/lose` — victory pays `goldReward(roomIdx)` + `lootRoll()` into the **sandbox** purse/satchel, records `p.sand.stats[battleId]`, then returns to the sandbox grid. **No** `advance()`, **no** story cutscenes (straight victory/defeat popup), **no** Fortune Wheel, and Vael's second-life reborn phase STAYS (it's part of his battle). Unused consumables stash to `p.sand.stash`.
3. Boss-specific plumbing that assumes the walk (`showEncounterClear`'s next-room read, the map→heal10 loot guard, `winCutscene`) must all take the mode branch.
4. Tutorial/ⓘ copy: "One descent is three encounters" (~2675) gains the two-mode explanation.
**ACs:** any unlocked enemy is playable at any difficulty; each battle starts 40/40 regardless of the previous battle; sandbox gold/items never touch campaign's; winning/losing returns to the grid with the ledgerless campaign state untouched; Vael in sandbox still runs both lives + his Siege.
**Verify:** jsdom — sandbox Grakk win pays the sandbox purse only; HP resets between two consecutive battles; campaign run in progress is untouched by a sandbox detour (and vice versa — merchant lock per mode); Vael sandbox both-lives; syntax + id-diff.

## P43.6 — Persistent progress & lore: the `cleared` ledger + a lore panel that stops re-locking
1. **Write the ledger:** `bossDown()` (mid-level bosses) and the level-finale path both set `p.camp.cleared[battleId(S.levelIdx,room)]=true` + bump `p.camp.level` on a finale — the SINGLE source for sandbox unlocks AND lore.
2. **`openLore` (~2624):** `seen = cleared-in-ledger OR i<=S.roomIndex-in-a-live-campaign` — lore earned once stays earned (from the menu too, after runs end); the per-level sections render from `LEVELS[]` so Level II lore slots in as data; keep the ??? convention for the unseen.
3. The lore panel becomes the **story track** the user asked for: per level, show beaten wardens + that level's story beats unlocked so far (the existing fixed entries — Merchant/Ember/Guff — stay).
**ACs:** beating Grakk once (campaign) permanently unlocks his lore entry and his sandbox tile, across sessions and after the run ends; sandbox wins do NOT write the ledger (unlocks come from campaign only, per the user); the lore page works from the menu with no live game.
**Verify:** jsdom — ledger write on bossDown/finale; openLore from menu with a seeded ledger; sandbox win writes stats but not `cleared`; persistence round-trip through saveDB/loadDB; syntax + id-diff.


# PHASE 44 — Enemy realism & balance pass 2 ⬜ PLANNED

> **Goal.** Beyond the built P34/P35/P38/P17: the enemy should FEEL like a real opponent — holding up instants, tricking during your combat, using burn on creatures, defending its planeswalker, playing counterspells and card advantage — and the decks/difficulty should be disciplined, with the known bugs and dead knobs cleared.

**Grounded findings (re-grep before building).** `vaelMain`'s cast loop (~2128) is **greedy — taps out every turn**; the instant windows (`enemyInstant` ~2189, `enemyRespondToCast` ~2429) can only spend leftovers, so interaction on your turn is accidental. The **mid-combat trick window is still the documented deferred P4.4 follow-up** (comment ~2188; `openCombat` ~1367 closes every proposal; `youCombat` ~2182 fires before attackers are even picked). `dealOpeningHand` (~895) guards screw ONLY and at the 10-attempt cap keeps the hand with the MOST lands (~901–902) — the inverse of real mulligan logic; `playEnemyLand` (~2007) plays the first land found. `pickWalkerAbility` (~2028) **ults unconditionally at threshold** and only minuses offensively vs a ≥5-power bomb (~2031) — no defensive line despite the P38.5 comment (~2024). `aiTargets` (~1694) is all-or-nothing on walkers (raw power ≥ loyalty, blocker-blind). **Zero counterspells** — `bestTargetThreat`'s `case 'counter'` (~2458) is dormant; the only draw effect is `cullharvest`; `destroyTop2`-style valuation scores only the best victim (`top()` ~2452). **All red burn is face-only `selfLoss`** (e.g. `FX.bolt` ~635) — Grakk has ONE removal card in 99 (`pyro` ~639) and no instant-speed removal; black removal is fixed heuristic selectors (power-based, not threat-based). **Gate-Meteor bug (live):** `FX.meteor` (~683) has `selfLoss:2` + `die:6/dieLoss:true` but `mkPlay` (~2239) overwrites `selfLoss` with the roll — the +2 never happens (documented at SPEC ~446 — the P6.2 "deferred to P5.2 balance" bullet; never fixed). **Dead knobs (confirmed):** `DIFF.manaBonus` (~615) and `room.landStart` (~779/785/791) are defined, read nowhere (retirement comment ~882); `deckCopies` (~622) only serves legacy array pools — all three rooms use maps. **Decks:** Grakk 99 (37 lands on a 2.35 curve — flood-heavy; ~33% is aggro-typical), Murglax **103** and Vael **100** (both over the 99 norm; avg cost 3.05 / 3.41); per-difficulty swaps are 1–3 cards. Special-run enchants like `bloodpact` still resolve into `S.rules`, not a destroyable permanent (~2307–2308). Phase 5's balance line still says "pending playtest".

## P44.1 — Instant-speed realism: mana hold-up + the mid-combat trick window
1. **Hold-up budget:** in `vaelMain` (~2117), before the greedy loop — if the hand holds an instant whose projected `castValue` ≥ `enemyActThreshold()` and the board is not in a lethal race (`enemyLethalReach` ~2116 says no), reserve its cost: stop casting when `usableMana()` would dip below the reserve. Difficulty-gated (`enemyLuck()>=0`; easy stays tap-happy).
2. **The P4.4 mid-combat window (finally):** after blocks are set but before `resolveAttack` — one instant proposal (reuse `buildEnemyCandidates`/the `S.stackProposal` flow) whose value clears the bar (kill a blocker/attacker, pump, burn); on resolution, prune dead combatants + re-run `predictCombat`. One window per combat.
**ACs:** the enemy visibly holds mana on turns where it has a live instant (log hint optional); a trick can fire after your blocks with combat re-predicted; no proposal deadlock with the existing P4.2/P4.4 windows; easy unchanged.
**Verify:** jsdom — hold-up leaves ≥cost unspent when a candidate exists (and doesn't when racing); mid-combat proposal fires once, prunes a killed blocker, re-predicts; regression on the P4.2 cast-response flow; syntax + id-diff.

## P44.2 — Burn & removal realism: dual-mode burn + threat-based selectors
1. **Dual-mode burn:** a `burn:N` FX shape — resolves as EITHER face damage OR lethal-to-a-creature, chosen by value: `castValue` scores `max(face value, best killable creature's threatScore)`; resolution routes through the existing target machinery (honouring hexproof/shroud/protection). Convert the bolt-family (`bolt/twinbolt/crackle/emberblast`…) where flavour fits — Grakk & Vael gain real removal AND instant-speed interaction in one move.
2. **Threat-based selectors:** the `destroyMaxPow`-family picks victims by `threatScore` (already exists) instead of raw power, so removal snipes the most DANGEROUS creature.
**ACs:** a bolt kills your 2-toughness bomb instead of going face when that's worth more; selectors take the scarier of two equal-power creatures; player-side protections still respected; Grakk's effective removal count rises without new cards.
**Verify:** jsdom — burn chooses face vs creature per constructed boards; hexproof/protection fizzle-guards; selector picks by threat; syntax + id-diff.

## P44.3 — Planeswalker play: defense + ult safety + split attack targeting
1. `pickWalkerAbility` (~2028): fold in `estimateSwingDamage`/`playerAttackPotential` — prefer the MINUS defensively when incoming damage threatens the walker's loyalty or `S.boss.life`; gate the ULT on surviving the crack-back (don't fire at threshold if it leaves a lethal board unanswered); keep the bomb-snipe.
2. `aiTargets` (~1694): split pressure — divert only enough expected (blocker-discounted) damage to kill the walker's target, send the rest at the face; account for your untapped blockers instead of raw `effP` sums.
**ACs:** Vael minuses your lethal attacker instead of blindly plussing; the ult waits a turn when firing would lose the game; walker attacks no longer over/under-commit vs blockers; easy keeps the simple lines.
**Verify:** jsdom — defensive-minus scenario; unsafe-ult deferral; split-targeting expected-damage math; syntax + id-diff.

## P44.4 — Interaction & card advantage: counterspells + draw + multi-kill valuation
1. **Counterspells:** a `counter` FX effect wired through the dormant `bestTargetThreat` case (~2458) + the P4.2 response flow (the enemy proposes countering your cast when its value clears the bar); 1–2 cards in Murglax + Vael pools (black/Rakdos flavour: "Dark Refusal"-style); respects "can't be countered" (P13.1). **Hold-up interplay:** a counterspell has no stack target at the enemy's main time, so `castValue` would project ~0 — special-case its hold-up value to `enemyActThreshold()` (difficulty-scaled; 0 on easy) whenever the player holds ≥1 card, so P44.1's single reserve check sees it (the reserve logic stays defined ONCE, in P44.1). Actually the counterspell are very rare out of the blue colour so we if we put them in they need to be rare and stylised on the mana colour of the enemy, Grakk doesn't have counters, maybe only vael does?
2. **Draw:** a `run:['draw',N]` op + 1–2 draw spells per deck; `castValue` values it by hand-size need.
3. **Multi-kill valuation:** `destroyTop2`/board-sweep effects value as the SUM of victims (`top()` ~2452 → a sum), so 2-for-1s are preferred like a real player would.
**ACs:** the enemy can counter a high-value player cast via the visible proposal (approvable/editable as ever); it draws with its new spells; a sweep is preferred over a single kill when it nets more threat; hold-up (P44.1) reserves for counters too.
**Verify:** jsdom — counter proposal on a fat cast + fizzle on can't-be-countered; draw resolves; sum-valuation ordering; syntax + id-diff.

## P44.5 — Deck discipline: sizes, manabases, curves, mulligan v2, deeper difficulty
1. **Normalize:** Murglax 103 → **99** and Vael 100 → **99** (trim the flabbiest by castValue-at-curve audit); Grakk stays 99 while its land share drops 37 → **~33**, the freed slots becoming interaction/gas (the P44.2 burn conversions may satisfy this); audit each deck's avg cost vs land count (Vael's 3.41 curve may justify keeping 36–37 lands *within* his 99).
2. **Mulligan v2 (`dealOpeningHand` ~895):** keep-window = 2–5 lands (reject flood, not just screw); tie-break by curve fit (a 1–2 drop present), NOT max-lands; per-difficulty quality — brutal keeps only 3–4-land hands with an early play — a REAL lever replacing the dead `manaBonus`. *(Deliberately SUPERSEDES the P17.2 open-question default of "no flood mulligan" — flag for the user's nod at build.)*
3. **Deeper difficulty swaps:** beyond the current 1–3 cards — easy cuts the top-end finishers; brutal swaps clunkers for gas (± the interaction package) so difficulties play differently, not just tankier (room.swaps ~781/787/797).
4. **Land-drop choice:** `playEnemyLand` (~2007) prefers the level's flavored duals/utility land when meaningful (cosmetic today, future-proofs colored mana if ever adopted).
**ACs:** all three decks are 99 ± stated exceptions with audited curves; the enemy mulligans a 6-land hand; brutal feels sharper by DESIGN (hands+swaps), not just stats; no deck-out regressions.
**Verify:** jsdom — deck-size/land-count table per room per difficulty; mulligan matrix (screw/flood/curve hands); swap application; full-descent regression per difficulty; syntax + id-diff.

## P44.6 — Bugs & dead knobs
1. **Gate-Meteor:** `mkPlay` (~2239) → `p.selfLoss = p.roll + (fx.selfLoss||0)` when both present; bump `castValue`'s die branch to `(die+1)/2 + selfLoss`. (`lash` — die-only, in Grakk's & Vael's pools — unaffected.)
2. **Delete dead knobs:** `DIFF.manaBonus` (~615), `room.landStart` (all three rooms), `deckCopies` (~622) + their retirement comments — principle 6.
3. **Optional (build if cheap): bloodpact as a permanent** — resolve The Pit's Tithe into a real `S.enemyEnchants` permanent whose rider fires from the permanent (the resolver currently skips special-runs, ~2307–2308), so destroying it is board-visible like everything else post-P13.3.
**ACs:** Gate-Meteor deals roll+2; greps for the three dead knobs return nothing; (if built) the Tithe sits on the enemy board and destroying it stops the drain.
**Verify:** jsdom — meteor damage math; knob greps; (opt) tithe permanent lifecycle; syntax + id-diff.


# PHASE 45 — UI, animation & sound overhaul (Moxfield-inspired desktop · one responsive app per D5) ⬜ PLANNED

> **Goal.** Make the game LOOK and SOUND like a game: card art on the board, real motion feedback (damage, taps, movement), a fuller soundscape with audible cues for every meaningful action, desktop screens that use their width (Moxfield-style multi-pane), and legible type everywhere — all in the one responsive app (D5), keeping the CSS-first/reduced-motion and default-quiet conventions.

**Grounded findings (re-grep before building).** CSS = one ~45 KB inline block (~18–336) on a 13-token `:root` (~19); 4 Google-hosted font families (~17) that are NOT in sw.js's shell cache → **the installed PWA loses all typography offline**. Breakpoints: ≥780/680/640 duo grids; ≤560/480/380 phone reflows; one `pointer:coarse` touch block (~265–278); `prefers-reduced-motion` is a nuclear all-off (~335). **`render()` (~1515) is a wholesale innerHTML rebuild** (104 `.innerHTML` sites; `creaField` wiped each call ~1538) — the `.crea` spawn animation re-fires on every tile every action, and per-element motion (damage numbers, tap rotation, movement) is impossible without keyed DOM or an overlay FX layer; `log()` (~1057) is the only append-only renderer. **Art:** the `ART` blob (line ~614) holds exactly 5 jpegs (warren bg + 3 warden portraits + merchant); board tiles are text-only — yet **Scryfall imports already store `image_uris.normal` per card** (`SCRY.faceObj` ~3058), rendered today only as 34px thumbnails in search rows (~3143, ~2948). **Sound:** 10 synth cues with 10 call sites; `heal` is defined-but-never-called (~3228); silent: store purchase, loot, satchel use, token deploy, draw, phase/turn change, descend, wheel spin, cutscenes, enemy casts, loyalty, counters. **Legibility:** `.badge` = .52rem (~73), `.tiny` = .6rem (~52) on desktop; the log is a fixed 114px window (~120); the stack popup is a full-screen `inset:0` overlay (~89) that hides the board while you respond; every icon is an emoji in a button label; ~395 inline `onclick=` sites (129 in the static HTML; ~215 distinct global handler functions) pin functions global. Layout is single-column everywhere (`.wrap` max 1140px ~24); `buildTabs()` (~3180) relocation is the precedent for re-homing panels.

## P45.1 — Foundation: tokens, self-hosted fonts, legibility
1. Extend `:root` with spacing + font-size + font-family tokens; sweep hardcoded sizes onto them.
2. **Self-host the 4 typefaces** as woff2 (subset), add to sw.js's SHELL — offline PWA keeps its face; drop the Google CDN link (the last non-Scryfall external dependency).
3. **Desktop legibility pass:** `.badge` .52→≥.66rem, `.tiny` .6→≥.7rem, fixed 110px name inputs → minmax, contrast check vs --bone-dim; touch targets already conform via `pointer:coarse` — keep new controls in that block (§1 principle 7).
**ACs:** offline (SW-served) load renders the correct typefaces; no external font requests; smallest interactive text ≥.7rem desktop; token sweep leaves zero hardcoded font sizes in new code.
**Verify:** id-diff; offline jsdom/SW cache-list assert; CSS grep for orphan px font sizes; visual pass at 380/768/1280px.

## P45.2 — Card art on the board, stack, and library
1. Imported cards render their stored `image` as tile art (a `background-image` art strip or corner thumb on `.crea`/`.brow`/`.playcard`/library rows — pick ONE consistent treatment); homebrew cards get a per-type accent frame fallback (the P7.9 accents already exist).
2. Lazy-load + cache-aware: art is network-fetched (Scryfall passthrough in sw.js) — degrade to the text tile offline; never block render on images.
3. The 3 warden portraits already in `ART` join the boss panel header (they exist and are shown ONLY in the lore page today).
**ACs:** a Scryfall-imported creature is visually identifiable on the board; offline shows clean text tiles; no layout shift when art arrives; boss panel carries its portrait.
**Verify:** jsdom — tile markup carries the img/style when `image` present, absent otherwise; offline fallback; id-diff.

## P45.3 — The FX layer: motion decoupled from the innerHTML rebuild
1. **A body-level `#fx` overlay** (position:fixed, pointer-events:none): floating damage/heal numbers, life-change flashes on the You/Boss bars, attack "lunge" lines, card-travel ghosts (board→graveyard etc.) — spawned imperatively by the mutation sites (`adjLife`, `resolveAttack`, `moveBoardCard`…), animated by CSS, self-removing; render() rebuilds never touch it.
2. **Stop the spawn-replay:** key the `.crea` spawn animation to genuinely-new permanents (an `data-uid` diff or a `_born` flag) instead of every rebuild.
3. **Tiered reduced-motion:** the OS query keeps killing decorative motion, but functional feedback (life-bar width, damage numbers static-fade) survives via a `.motion-soft` class — replacing today's all-or-nothing nuke (~335) — plus a P46.3 settings override.
**ACs:** damage to either life total shows a floating number + bar flash; tiles no longer re-fade on unrelated actions; reduced-motion still communicates damage (statically); no FX element ever intercepts a tap; FPS stays healthy on a phone-sized DOM.
**Verify:** jsdom — fx nodes spawn on adjLife/combat + self-clean; spawn-anim fires once per new uid; reduced-motion class matrix; id-diff (+`#fx`).

## P45.4 — Sound design: complete the cue map
1. Wire the orphan **`heal`** (~3228) into `adjLife('you', n>0)` / heal items.
2. New cues (same `_tone` synth palette, default-quiet ≤0.10): **purchase/coin-spend** (buyStore), **loot** (grantBoon/lootRoll), **item use** (useBoon), **token/creature deploy**, **draw**, **phase tick** (soft, once per phase — NOT per render), **descend** (advance), **wheel spin + land**, **cutscene sting**, **enemy cast** (a darker `cast` variant), **loyalty click**, **counter placed**. Every cue behind `sfx()` + mute as today.
3. **Volume slider** (0–100 → the master gain) persisted next to `DB.muted` (surfaced in P46.3's settings).
4. **Optional ambient pad** (OFF by default; a slow synth drone per level, WebAudio-generated, no assets — respects mute/volume; decide at build whether it earns its battery cost on phones).
**ACs:** every listed action has an audible, distinct, quiet cue; nothing fires on mere re-renders; mute/volume govern everything incl. the pad; headless runs stay silent-safe (existing null-context guards).
**Verify:** jsdom — mock AudioContext counts oscillators per action path (the P7.8 test pattern); volume/mute persistence; no cue on a pure render(); syntax + id-diff.

## P45.5 — Moxfield-style desktop layout (≥~1100px)
1. A new `@media(min-width:1100px)` layer: **left rail** (You/Foe panels + log), **center battlefield** (enemy board above, player board below — both boards VISIBLE at once, the Moxfield/Arena mental model), **right rail** (turn flow, attack, tools, stack dock). **Prefer CSS grid over the existing tab containers** (no JS — the media query handles live 1100px boundary crossings from resize/rotation for free); fall back to a `buildDesktop()` node re-homer (sibling of `buildTabs()` ~3180) ONLY if grid can't express it — and then it MUST pair with a `matchMedia('(min-width:1100px)')` change listener that re-homes panels in BOTH directions (`buildTabs` runs once at boot today; a bare re-homer strands panels on resize). Handlers untouched, per D5.
2. Below 1100px NOTHING changes (the tab system stays the phone/tablet UI).
3. The in-game header shows level + room (per P43.3's h1 move).
**ACs:** at 1280×800 both battlefields, the log, and the turn controls are simultaneously visible without scrolling for common board states; phone layout is pixel-unchanged; every existing id survives (id-diff clean); tab state still persists.
**Verify:** id-diff; jsdom at two viewport widths (panel parentage matrix) + a live resize crossing of the 1100px boundary both ways (no stranded panels); the full-descent driver green in both layouts; live browser pass at 1280/1440.

## P45.6 — Stack dock + log rework
1. **The stack stops occluding the board:** ≤1100px it becomes a bottom-docked sheet (~40vh, board visible above; full modal only via expand); ≥1100px it lives in the right rail (P45.5). Approve/pass controls stay one tap away (the P4.2 proposal flow must remain obvious).
2. **Log:** entries get channel icons + tighter type hierarchy; height presets (compact/half/full — extending `S.ui.logExpanded` ~A5); `aria-live="polite"` (with P46.4).
**ACs:** you can see your battlefield while responding to an enemy proposal on every form factor; the log reads comfortably at 380px; no resolver/stack z-fights (the ladder at ~151 holds).
**Verify:** jsdom — dock/expanded state matrix + proposal approve path; z-order asserts; id-diff.


# PHASE 46 — Completeness & hardening + FINAL CLEAN-UP & VALIDATION ⬜ PLANNED (runs LAST)

> **Goal.** Everything a *complete* game still lacks that isn't gameplay: a PERMANENT regression suite (every phase's tests to date were throwaway), error visibility, a settings screen, accessibility, first-run onboarding, an automated deploy pipeline — then the code clean-up and the **final validation gate** the user asked for, run across the whole 41–45 rework.

**Grounded findings (verified absences, 2026-07-04).** The repo tracks 11 files — game + spec + story + README + sw.js(v48) + manifest + 5 icons. **NO package.json, NO tests/, NO CI, NO netlify.toml, NO .gitignore, NO LICENSE**; the SPEC's jsdom harnesses were never committed. **Zero error reporting** (`window.onerror`/`unhandledrejection`: 0 matches — a crashed run tells nobody anything). **No settings surface** beyond mute (`toggleMute` ~3236) + difficulty + save/library export-import. **A11y:** 9 `aria-` attributes / 6 `role=` total; no `aria-live` on the log; no focus management on the overlay dialogs (positives: reduced-motion honored ~335/~2799; `infoBtn` is keyboard-accessible ~2563). **Onboarding:** the tutorial is opt-in only (`openTutorial` ~2547; 2 call sites — no first-run trigger). **No music** (SFX only — P45.4 addresses). **No telemetry/balance data** despite "balance needs playtest". **Deploy** = manual Netlify drag-drop (README; GitHub CD described but never configured). **Dead code:** `pwAct()`'s unreachable legacy body (~2048–2055) whose own comment (~2047) promised removal; `fresh()` still carries the retired `pw:null` schema field (~874, kept for migrate). The stale spec-header facts (ART-blob line, branch, Phase-8 header, P5 "in progress") were fixed in THIS spec commit — not repeated here.

## P46.1 — Checked-in regression suite (the permanence fix)
1. `package.json` (private; `jsdom` devDependency) + `tests/`: **the full-descent driver** (boot → 3 rooms → Vael both lives → win, zero console errors — the P7.9 pattern, finally committed), per-system drivers seeded from the 41–45 phase verifies (items/modes/enemy/UI-state), a **syntax gate** (vm.Script over the extracted `<script>`), and the **id-set diff** helper. `npm test` runs all.
2. A tiny `tests/README` documenting the extract-script-from-index.html pattern so future phases ADD drivers instead of rebuilding them.
3. `.gitignore` (node_modules) + LICENSE (user's choice — default: no license file, private).
**ACs:** a fresh clone + `npm i` + `npm test` passes green with no network; every 41–45 phase lands with its driver COMMITTED under `tests/`.
**Verify:** run it — that's the point. CI proves it in P46.6.

## P46.2 — Error reporting: nothing fails silently
1. `window.onerror` + `unhandledrejection` handlers: log to the dungeon log (`sys` channel), show a small non-blocking toast ("Something broke — your save is safe; ⬇ debug report"), and buffer the last N errors.
2. **⬇ Debug report:** a button (settings + the toast) downloading `{version, ts, errors[], stripped save snapshot}` as JSON — the "attach this file" support path for playtesters.
3. Autosave is already debounced/guarded — assert the handler never autosaves a corrupted `S` (guard on a throw inside render → skip the settle).
**ACs:** a thrown error in any handler surfaces the toast + log line instead of vanishing; the report downloads valid JSON; a render-crash doesn't poison the autosave.
**Verify:** jsdom — synthetic throw in a handler → toast + buffer + report content; save integrity after an induced render error.

## P46.3 — ⚙ Settings panel
One overlay (the `#overlay` modal family): **SFX volume slider + mute** (P45.4), **text size** (S/M/L → root font-size), **animation level** (full / soft / off — the P45.3 tiers, overriding the OS query in both directions), and the existing **export/import save + library** buttons consolidated; persisted on `DB.settings` (backfilled). Reachable from the menu + the in-game controls bar.
**ACs:** every setting applies live + persists across reload; text-size never breaks the 380px layout; animation-off still shows static damage feedback.
**Verify:** jsdom — set/reload/assert matrix; layout smoke at 380px per size; id-diff.

## P46.4 — Accessibility pass
1. `#log` gets `aria-live="polite"` `aria-relevant="additions"` (append-only already — ~1057).
2. **Dialog focus management:** overlays trap focus while open + restore it on close; **Esc closes them all EXCEPT the combat resolver** (satchel/stack/store/library/cutscene get Esc; the resolver keeps A6's no-accidental-dismiss rule — Approve/Cancel only).
3. Contrast audit of --bone-dim on --ink surfaces (≥4.5:1 for body text); label-only-emoji buttons gain `aria-label`s.
**ACs:** a screen reader announces log entries; Tab cycles inside an open dialog and returns on close; Esc closes non-combat overlays; contrast documented.
**Verify:** jsdom — focus-trap matrix + aria attributes; axe-style contrast spot-checks recorded in the test.

## P46.5 — First-run onboarding
On a profile's FIRST game ever (fresh `blankProfile` flag `seenTutorial:false`): after the arrival cutscene, offer — not force — the tutorial ("📖 Learn the ropes / ▶ Just play"); either choice sets the flag. The existing 2 opt-in entry points stay.
**ACs:** exactly one offer per profile, never during a continued run; declining never re-prompts; the flag migrates.
**Verify:** jsdom — first-run offer, second-run silence, migrate backfill.

## P46.6 — Deploy pipeline (retire the manual drag-drop)
1. `netlify.toml` (publish root, no build command) + the README rewrite are buildable in-repo; **the CD connection itself is a ONE-TIME user action** in their Netlify dashboard (Build & deploy → Continuous deployment → link this GitHub repo, empty build command, publish `/`) — hand the user that exact checklist; until they flip it, this phase's AC and P46.8 step 6 are **blocked-on-user** and drag-drop stays the fallback. Once connected: **push to main = deploy**.
2. **SW-bump checklist** codified: any shipped change bumps `gg-cache-v*` (sw.js ~5) + the README line — add a `tests/` assert that README's version matches sw.js (cheap drift guard).
3. README rewritten for the pipeline (drag-drop demoted to fallback).
**ACs:** a push to main reaches the live site with no manual step; version drift fails `npm test`; the user's installed PWA picks up a deploy on next online relaunch (network-first nav + bumped cache — the established model).
**Verify:** one real push → live-site check (the user's Netlify); the drift test.

## P46.7 — Code clean-up
1. Delete `pwAct()`'s dead body (~2048–2055) — the retire-comment (~2047) promised it.
2. Retire `fresh()`'s legacy `pw:null` field (~874) with a `migrate()` note (old saves carrying `pw` still load).
3. Sweep any 41–45 leftovers: orphaned functions/ids (id-diff history), retired comments, dead CSS — one pass, grep-verified.
**ACs:** greps for the removed symbols return comments-at-most; migrate still loads a v40 save; no console errors.
**Verify:** jsdom regression + old-save migrate + grep list in the test log.

## P46.8 — FINAL VALIDATION (the gate — nothing ships un-validated)
Run, in order, across the WHOLE rework:
1. **Full regression:** `npm test` green (every 41–46 driver + full-descent, all difficulties, both modes).
2. **Syntax + id-diff:** the standing gates over the final diff.
3. **Live browser smoke:** serve locally → real Chromium: boot cinematic → campaign Level I full clear (cutscenes, wheel, carry-over) → sandbox battle → Scryfall import online → offline reload (fonts/art fallbacks) → 380px viewport pass.
4. **Multi-agent adversarial review** of the final state (the established 3–5-lens workflow; every finding repro'd as a jsdom test before it counts).
5. **Balance playtest checklist** handed to the user (per difficulty: clear rate, gold pressure, item usage — the data P44 can't tune blind; note answers in the spec).
6. **Deploy + PWA verification:** push → CD → live site → installed-PWA refresh confirmed (SW bump).
**ACs:** all six steps recorded in this spec's STATUS with dates; zero known-open defects at ship; the user has the playtest checklist.
**Verify:** this section IS the verification; its output is the STATUS update + a dated validation note here.

---

## Open questions (non-blocking — assume the stated default unless overridden)

- **Passive item duration (P7.4):** ~~are any satchel items meant to last >1 descent?~~ **RESOLVED by P14.5** — all passive items last exactly 1 descent; the player-set duration stepper is removed.
- **Plane die contents (P7.7):** which planar/chaos outcomes? *Default:* generic chaos roll the player interprets.
- **Sound palette (P7.8):** vibe? *Default:* soft, low, synthesized UI/combat cues.
- **Enemy "play this card" mana (P6.5):** spend vs free override? *Default:* offer both.
- **Stack popup (P1.10):** docked-dismissible panel vs full modal overlay? *Default (unless you say):* a docked, auto-surfacing popup that doesn't block the board, openable on demand.
- **Resource-token representation (P16.2):** dedicated arrays (`S.my.resources`/`S.enemyResources`) vs. tagging existing artifact tokens? *Default:* dedicated arrays (cleaner, recommended).
- **Life-reset baseline (P16.4):** ~~literal 40 vs. the player's starting/max life?~~ **DECIDED by the user (Phase 28)** — the baseline is the player's **dynamic base** (`youMax`), which starts at 40 and rises permanently with max-life boons (Tonic of Vigor +10). The between-boss reset always trims to the current base.
- **Enemy resource-token automation depth (P16.3):** how much beyond Treasure-for-mana to auto-model? *Default:* Treasure-for-mana is must-have; Food/Clue auto where clean, Blood + anything unclear as a manual reminder (nothing silently dropped).
- **Lands-only mana balance (P14.10 / P17.1):** ~~removing the opening mana + scrounge floor is a significant difficulty swing — confirm before building?~~ **DECIDED by the user (Phase 17)** — zero opening mana, no scrounge floor, mana strictly from played lands; the 7-card hand + mulligan (P17.2) and difficulty levers move onto HP/luck/land-density instead of free mana.
- **Mulligan land threshold (P17.2):** ~~keep mulligan-while-`<3` lands, or also mulligan a land-flooded hand (e.g. `>5`)? *Default:* low-end only (`<3` lands) per the user; no flood mulligan.~~ **SUPERSEDED by P44.5 (mulligan v2)** — flood hands are rejected too and keep-quality becomes a per-difficulty lever; confirm with the user at build.
- **Enemy discard AI (P17.3):** how "wise" should the discard-to-7 pick be? *Default:* reuse the existing cast-value/threat scale — discard the lowest-value, most-redundant card (excess land beyond what it needs, then lowest `castValue`); never discard its last/needed land.
- **Campaign gold across campaign runs (P43.4):** does starting a NEW campaign run reset the campaign purse/stash, or only the run position? *Default:* only the run is erased — gold + stashed consumables persist on `p.camp` (matches today's account-gold model); a "hard reset" stays a per-profile delete.
- **Sandbox base life (P43.5):** 40/40 every battle, or carry a profile-permanent base? *Default:* 40/40 every battle; max-life boons used in a sandbox battle last that battle only.
- **Sandbox rewards (P43.5):** loot/gold on a sandbox win? *Default:* yes — `goldReward(roomIdx)` + `lootRoll()` into the sandbox purse/satchel; NO Fortune Wheel (that's a campaign level-clear ceremony).
- **Ambient music (P45.4):** ship the synth pad? *Default:* build it OFF by default with a settings toggle; drop it if it costs noticeable phone battery.
- **Enemy colored mana (P44):** adopt real colored costs? *Default:* NO — costs stay generic numbers; colors remain identity/flavour (a full pip system would ripple through every FX entry + castValue for little play value in a solo sandbox).
- **License (P46.1):** add one? *Default:* none (private repo, all-rights-reserved) until the user says otherwise.
