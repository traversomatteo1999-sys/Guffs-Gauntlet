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
| **Phase 1 — UI restructure** | 🔨 in progress |
| &nbsp;&nbsp;P1.1 four cornice tabs + satchel popup | ✅ **DONE** (disposition locked, see §3b) |
| &nbsp;&nbsp;P1.2 background covers viewport | ✅ **DONE** (user-confirmed) |
| &nbsp;&nbsp;P1.3–P1.9 visual polish | ⬜ (P1.3 next) |
| &nbsp;&nbsp;**P1.10 Stack-as-popup** (NEW) | ⬜ |
| **Phase 2 — Card creation & library UX** | ⬜ |
| **Phase 3 — Commander & emblems** | ⬜ |
| **Phase 4 — Stack & turn-phase engine** | ⬜ |
| **Phase 5 — Enemy mana & deck rework** | ⬜ |
| **Phase 6 — AI intelligence & balance** | ⬜ |
| **Phase 7 — Tokens, battles, sounds, satchel, logging, polish** | ⬜ |

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
- **State `S`** (declared ~543, built in `fresh()`): `diff, youLife/youMax, roomIndex, boss, cmd` (enemy commander, has `baseP/baseT`), `tokens` (enemy board, each `baseP/baseT/expires`), `rules`, `pw` (enemy walker), `my:{creatures,artifacts,enchants,walkers,emblems}` (your board — creatures carry `baseP/baseT/expires`), `pcmd` (your commander in command zone), `plays` (the stack), `lib/hand/gy/exile` (enemy deck zones), `myGy/myExile`, `counters`, `deckColors`, `bossMana/bossManaMax/bossManaMod`, `bossManaFrozen`, `emblemsEnemy`, `battles`, `plane`, `ui:{tabs}`, `phase/activeTurn/turn`, `inv` (satchel), flags (`over/paused/phase2done/phoenixUsed/…`).
- **`DB`** (persisted to `localStorage[SKEY]`): `{profiles:{name:{wins,losses,gold,library,tokens,created}}, active, save}`. **`DB.save`** = the autosaved live game `{v:SAVE_V(38), ts, profile, room, turn, S:<deep copy>}`.
- **Undo (P0.1):** `render()`→`scheduleSettle()`→ a microtask `settleHistory()` runs once per synchronous action; if `stripJSON(S)` changed vs the last committed snapshot it pushes the PRIOR full snapshot (capped 80) with a label (the action's own log line via `_lastLog`, or `actionLabel()`). `stripJSON` omits `_drawer/_atk/combat/ui` so pure-UI churn never makes an undo step. `undo()` pops, restores full `S`, clears `S.combat`, closes transient UI. **Checklist for new mutating actions: just call `render()` at the end.**
- **Save (P0.2):** `autosave()` debounced + guarded (`_liveGame && !S.over`); `continueLastGame()` restores `migrate(DB.save.S)`; `migrate()` backfills missing fields (base stats, ui, scalars) so old saves never throw. Library I/O: `exportLibrary/importLibrary` (cards+tokens only, dedup by lid/tid; cross-reject full saves).
- **Tabs (P1.1):** static `.tab` shells in HTML; `buildTabs()` reparents existing panel nodes into them at init (selects by stable inner id via `.closest('.panel')`). `toggleTab()`→`S.ui.tabs`, re-applied in `render()` via `applyTabs()`.
- **Data tables:** `DIFF` (per-difficulty hp/mana/gold) · `FX` (enemy card pool: `{n,cost,type,color,text,…effect}`) · `DUNGEON` (3 rooms: Grakk R, Murglax B, Vael RB; Vael has `pw`+`epilogue`) · `BOONS`/`STORE`.
- **Turn/phase engine:** `PHASES`=untap→upkeep→draw→main1→combat→main2→end. `flowClick`→`advancePhase`→`enterPhase` dispatches to `vael*`/`you*`. Enemy casting: `vaelMain`; instant reactions: `enemyInstant`, `enemyRespondToCast`.
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
- **A2 — Satchel is a POPUP (supersedes P7.4 "satchel in menu").** ✅ done. A 🎒 button on the You panel, **under the commander box**, opens `openSatchel()` (shared `#overlay` modal) listing items with Use controls. The passive-item **duration counter** (original P7.4) can be added inside that popup later.
- **A3 — Stack is a POPUP (NEW → task P1.10).** See P1.10.

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

### P1.3 — Kill the white right-edge border on images
Diagnose & remove the white sliver on lore art / `openArt` popup (`display:block;max-width:100%;border:0;outline:0`; check baked-in margin / `object-fit`). **Accept:** no white edge desktop or phone. Touchpoints: `.loreframe img`, `openArt`.

### P1.4 — Menu entrance animation
Menu falls from the top and opens up (keyframe on `.menubox` when `#menu` gains `.show`; respect reduced-motion). Touchpoints: `.overlay.menu`/`.menubox`, `showMenu`.

### P1.5 — Victory & defeat as animated popups
Replace inline `.banner` victory/defeat with big modal popups (reuse `.cutbox`): **encounter-cleared / victory / defeat** modes, the enemy's last quote (`deathQuote` on win, `quote` on loss), animate in, and a **"Save & quit to Menu"** button (`autosave()` then `showMenu`). Remove old banner markup. Touchpoints: banners, `bossDown`/`win`/`lose`, `showCutscene`. Depends: P0.2, P1.4.

### P1.6 — Parchment log restyle
Pure CSS: aged-parchment surface + inked serif for entries, keep `Space Mono` timestamp as a faint stamp; channel colours stay AA-legible. Touchpoints: `.log`/`.entry`.

### P1.7 — Player commander box mirrors the enemy's
Render the player commander into the You panel with the **same `.cmdbox` UI** as the enemy (name, P/T or loyalty, tax/deaths, Deploy when in command zone). Relocation already done in P1.1 (`pcmdBox` lives in You); finish the mirror + verify death-return repopulates it. Touchpoints: `renderCmd`/`renderPlayerCmd`, `sendCmdToZone`. Depends: P1.1, P3.1.

### P1.8 — ⓘ info popups beside labels
One `infoBtn(key)` helper + `INFO_TEXT` map + shared modal. Place on tab labels and tricky controls (stack, freeze mana, ward/tax, threat hint, commander, battles).

### P1.9 — Noise reduction, hierarchy, animations, phone nav
Visual-hierarchy convention (primary/secondary/tertiary), subtle per-surface backgrounds, small transitions, dead-code/ID sweep, tighter phone layout. A *pass*, not a redesign — no game-logic changes.

### P1.10 — The Stack as an on-screen popup (NEW — amendment A3)
**Goal.** The stack (`#plays` / "The Stack") becomes a persistent **on-screen popup** instead of an inline panel buried in the Action tab. The popup header carries a **✦ Cast a spell** button and the **⚡ Quick cast** button (to implement in P2.4), so casting is always reachable. It shows pending/resolved/countered items with their resolve / counter / redirect controls.
**Approach.** Move `#plays` into a floating/docked popup overlay (or a pinned, dismissible panel) that **auto-surfaces** whenever there are items on the stack (player casts or the enemy responds) and can be **opened on demand** to cast even when empty. Keep all existing controls and the top-down resolve order. Coordinate with P4.1 (resolve clears the stack without skipping a phase) and P4.2 (enemy responses appear here). Wire the Quick-cast button to P2.4 when built (until then it can route to the full cast form or be hidden).
**Accept.** From anywhere the player can open the stack popup and cast (full now, quick later); stack contents + resolve/counter/redirect work as before; reachable on phone; auto-surfaces when the enemy adds to the stack; nothing about resolution order changes.
**Touchpoints.** `#plays` markup (currently inside the turn-flow panel), `showPlays`/`renderPlays`, `openCast`, and P2.4's quick-cast. **Depends.** P1.1; interplays with P2.4, P4.1, P4.2.

---

# PHASE 2 — Card creation & library UX

- **P2.1 — Windowed, type-first card creator.** Pick a type first, then a focused form showing only that type's fields. `readCastForm` stays the single config builder, reading only visible fields. Preserve save-to-library / set-as-commander / can't-be-countered / library quick-pick.
- **P2.2 — Colours via mana symbols, not typed text.** Replace `castColor`/`castProt` text inputs with the `colorToggles` symbol pills (also in quick-cast).
- **P2.3 — Prominent yellow AI-threat indicator.** Promote the threat selector to a gold/yellow control near the top of the creature/permanent form, with an ⓘ; feeds the P6.1 threat hierarchy.
- **P2.4 — Quick-cast.** Fast path: name, colours (symbols), stats, counters, threat — all optional — into the **same** config→stack-item function as the full creator; editable afterward. Surfaced from the **stack popup (P1.10)** and "Cast a spell".
- **P2.5 — Search bars** for the Library and the cast-from-library picker; library UI polish.
- **P2.6 — Reset card to original** (player & enemy): restore base P/T (`baseP/baseT` from P0.4), clear counters (all or selected kinds).
- **P2.7 — Planeswalkers legendary by default** (never prompt; remove the toggle).

---

# PHASE 3 — Commander & emblems

- **P3.1 — Commander = only cards saved as commander.** Filter the chooser by `cfg.commander===true` (plumbed in P0.4); add a "save as commander" toggle + a **+ commander** board button; re-ask on restart; rewrite the `_cmdChooseActive` mobile dismissal trap.
- **P3.2 — Enemy emblems** with classic templates + optional automation (store on `S.emblemsEnemy`; automatable ones fire on enemy upkeep and log; others are reminders; render in Enemy Board).

---

# PHASE 4 — Stack & turn-phase engine

- **P4.1 — "Resolve" clears the stack without skipping a phase**; allow multiple stacks per phase. Split `toAssault`: a **Resolve stack** button resolves+clears, leaving phase untouched; phase advance stays solely on **Continue ▸**. (Interacts with the P1.10 stack popup.)
- **P4.2 — Enemy proposes a stack response after every player cast** — including "let it resolve" — as a visible proposal (like the attack/block flow), respecting affordability and target validity (P6.2).
- **P4.3 — Phases gate what you can do (soft)** + a **◂ back a phase** button; out-of-phase actions are de-emphasised and warn but never hard-block; re-entering a phase must not re-fire one-time effects.

---

# PHASE 5 — Enemy mana & deck rework (D2)

- **P5.1 — Enemy colours, freeze-mana, player effects on the pool.** Keep `bossMana()` ramp; show `S.boss.colors`; add **freeze** (`S.bossManaFrozen`) lowering usable mana with badge+log; route "search a land" → temporary `+N`; centralise "usable mana now" in one accessor.
- **P5.2 — Enemy deck rework.** Per-room deck identity (Grakk explosive mono-red aggro/burn; Murglax grindy mono-black attrition; Vael R/B midrange + walker); curate `FX` usage + `DUNGEON.pool` + copy counts; balanced so even Easy threatens. Effects stay within what the engine resolves.

---

# PHASE 6 — AI intelligence & balance

- **P6.1 — Threat hierarchy drives assessment:** planeswalkers > creatures > enchantments/artifacts > instants/sorceries, layered over High/Mid/Low (`strength`). Generalise `threatScore` to score any object; feed removal/counter targeting + combat priorities.
- **P6.2 — The AI thinks before casting:** extract `wouldDoSomething(card)` (reuse `applyTarget` legality); all casting sites filter through it and choose by value (P6.1), not just cost — no fizzle-casts.
- **P6.3 — Respect haste:** verify haste handling across all enemy creature sources; AI attacks with hasty creatures the turn they arrive when EV-positive.
- **P6.4 — Difficulty = strategic by default + luck knobs:** add `luck` to `DIFF`; Easy slightly unlucky / Brutal slightly lucky on the enemy's decision rolls and dice it rolls *against you*; baseline logic stays smart at all difficulties; keep hp/mana/gold multipliers.
- **P6.5 — Inspect enemy cards → play them;** show cost+colours; full deck actions incl. scry-to-bottom (mostly exists). "Play this" puts an enemy card on the stack via `mkPlay`; offer spend-vs-free mana.

---

# PHASE 7 — Tokens, battles, sounds, satchel, logging, instructions, polish

- **P7.1 — Tokens deleted on death (both sides);** token/treasure **expiry** infra (`expires` from P0.4); enemy can hold expiring tokens. Fix `killMy`: a dying token ceases to exist (no graveyard entry).
- **P7.2 — Logging refinement:** the Grakk "Whelp spell → graveyard while its token enters" clarity (log both facts; distinguish spell card from token).
- **P7.3 — Single-click "select all attackers."**
- **P7.4 — Satchel duration counter.** *(Satchel placement already done as a popup — A2.)* Add the passive-item "lasts N game(s)" counter inside the satchel popup.
- **P7.5 — Zones UI clarity** (enemy + player): labels, counts, per-card affordances, cost/colour on enemy cards.
- **P7.6 — Rules & instructions rewrite:** explain the loop, role-play expectation, optional save, quick-cast, threat importance, stack/phases (incl. P1.10 popup, P4.x), enemy mana/freeze, emblems, battles/plane. **Remove enemy general names from the menu/landing** (keep them in earned in-game lore).
- **P7.7 — Battles + plane die (player) and enemy battles for Vael** (D3): defense-counter tracker, plane die, Vael battle the AI defends/attacks with priority (feeds P6.1). Murglax/deeper Planechase deferred (P7.7-opt).
- **P7.8 — Sounds:** synthesized WebAudio SFX + persisted mute; first-gesture unlock; try/catch; default-quiet.
- **P7.9 — Final polish:** subtle per-type backgrounds, tasteful transitions, dead-code sweep, reduced-motion re-verify.

---

## Open questions (non-blocking — assume the stated default unless overridden)

- **Passive item duration (P7.4):** are any satchel items meant to last >1 descent? *Default:* all single-descent (counter shows 1).
- **Plane die contents (P7.7):** which planar/chaos outcomes? *Default:* generic chaos roll the player interprets.
- **Sound palette (P7.8):** vibe? *Default:* soft, low, synthesized UI/combat cues.
- **Enemy "play this card" mana (P6.5):** spend vs free override? *Default:* offer both.
- **Stack popup (P1.10):** docked-dismissible panel vs full modal overlay? *Default (unless you say):* a docked, auto-surfacing popup that doesn't block the board, openable on demand.
