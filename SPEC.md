# Guff's Gauntlet — Build Spec & Progress Tracker

> Living document. Work **phase by phase, top to bottom**. After every task the game must still
> boot, start a run, walk a full turn cycle, and win/lose without a console error — that is the
> implicit acceptance criterion on *every* task. Update the **STATUS** block below as work lands.

---

## STATUS (update as you go)

- **Branch:** `phase-0-foundations`
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
| **Phase 9 — Player toolbox + instruction overhaul** | 🔨 **IN PROGRESS** (branch `phase-9-toolbox`) |
| &nbsp;&nbsp;P9.1 Universal move-to-zone engine (incl. return-to-hand) | 🔨 **board→zone done & verified** (↩ return-to-hand + tuck/clean-exile/graveyard, both boards, death-safe); reanimate-from-zone + player-exile-return paths next |
| &nbsp;&nbsp;P9.2 Change control (steal / give) | ⬜ planned |
| &nbsp;&nbsp;P9.3 Per-permanent extras (copy · flip · markers · direct dmg) | ⬜ planned |
| &nbsp;&nbsp;P9.4 Enemy hand &amp; library completeness (tutor / reanimate / draw) | ⬜ planned |
| &nbsp;&nbsp;P9.5 Instruction overhaul (LAST — documents Phase 8 + 9) | ⬜ planned |

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
**Still TODO for P9.1: zone→battlefield reanimate (enemy gy/exile → board; today only player `myGyReturn`),
the player exile-return paths (your exile is still a dead end for some routes), and folding the one-off zone
fns into one `moveCard`.**

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

## Open questions (non-blocking — assume the stated default unless overridden)

- **Passive item duration (P7.4):** are any satchel items meant to last >1 descent? *Default:* all single-descent (counter shows 1).
- **Plane die contents (P7.7):** which planar/chaos outcomes? *Default:* generic chaos roll the player interprets.
- **Sound palette (P7.8):** vibe? *Default:* soft, low, synthesized UI/combat cues.
- **Enemy "play this card" mana (P6.5):** spend vs free override? *Default:* offer both.
- **Stack popup (P1.10):** docked-dismissible panel vs full modal overlay? *Default (unless you say):* a docked, auto-surfacing popup that doesn't block the board, openable on demand.
