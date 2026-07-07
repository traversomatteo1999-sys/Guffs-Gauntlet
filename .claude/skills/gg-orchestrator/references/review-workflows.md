# Review & investigation workflows (ready to run)

These are the exact multi-agent patterns used to build this project. Pick by the SKILL.md §1
risk triage. Being told to run them by the skill is the opt-in for the Workflow tool — but
still tell the user you're launching one and roughly how many agents it will spawn.

Historical yield, so you know they're worth the tokens: P43 4-lens → 8 confirmed bugs fixed
(incl. two HIGH save-corruption paths) · P44 5-lens → 5 · P34 3-lens → 5 · P45 3-lens → 3+4 ·
P46 4-lens → 1 confirmed + 3 refuted. Refutations matter as much as confirmations — they stop
you from "fixing" working code.

---

## A. Multi-lens adversarial review (HIGH-risk diffs)

Invoke the Workflow tool with the script below and args like:

```json
{
  "task": "P49.9: enemy coloured/colourless mana + London mulligan penalty",
  "diffCmd": "git diff main...build/p49-9 -- play.html sw.js tests/",
  "lenses": ["mana-accounting and projBossMana correctness",
             "save migration and legacy-save load",
             "AI decision quality across all 3 difficulties",
             "interaction with combat and the stack"]
}
```

Choose 3–5 lenses that match the diff's blast radius. The proven lens menu: combat math ·
state-copy/undo · save-migration/legacy-load · mode-leak (`_uiMode` vs `S.mode`, per-mode
purses) · battle-flow (turn/phase/stack ordering) · AI decision quality per difficulty ·
economy/balance bands · render/layout regression · a11y/focus/Esc · deck realism/colour pie.

```js
export const meta = {
  name: 'gg-adversarial-review',
  description: 'Multi-lens adversarial review of a Guffs Gauntlet diff; every finding independently verified',
  phases: [
    { title: 'Review', detail: 'one adversarial reviewer per lens' },
    { title: 'Verify', detail: 'one skeptic per finding, prompted to refute' },
  ],
}

const FINDINGS = {
  type: 'object', required: ['findings'],
  properties: { findings: { type: 'array', items: {
    type: 'object', required: ['title', 'severity', 'claim', 'evidence'],
    properties: {
      title:    { type: 'string' },
      severity: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
      claim:    { type: 'string', description: 'concrete failure: exact state/inputs -> wrong behavior the player sees' },
      evidence: { type: 'string', description: 'function names + the code paths you actually read' },
      fix:      { type: 'string', description: 'suggested minimal fix' },
    } } } },
}

const VERDICT = {
  type: 'object', required: ['confirmed', 'reason'],
  properties: {
    confirmed: { type: 'boolean' },
    reason:    { type: 'string', description: 'the traced path that proves or refutes it' },
    severity:  { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
  },
}

const ctx = `Repo root = the current working directory (Guff's Gauntlet). The whole game engine is ONE
inline <script> in play.html (~2.5 MB). HARD RULES: never Read/print a line range spanning the
~1.5 MB single-line "const ART=" base64 blob — grep anchored patterns (e.g. ^\\s*function name\\()
and read narrow ranges around hits. State S is lexical: in jsdom read it via window.eval('S');
engine functions (render, fresh, resolveAttack, migrate, ...) ARE on window. The committed test
suite runs with "npm test" (offline jsdom; tests/harness.js boots the real play.html).
Task under review: ${args.task}
Get the diff with: ${args.diffCmd}`

const reviews = await pipeline(
  args.lenses,
  lens => agent(
    `${ctx}

You are an adversarial code reviewer with exactly ONE lens: **${lens}**.
1. Run the diff command and read the whole diff.
2. Read the SURROUNDING engine code each hunk integrates with — follow callers and callees by
   grep; do not judge hunks in isolation.
3. Hunt only for REAL defects reachable in actual play: broken invariants, missed callers,
   save/migration gaps, mode leaks (_uiMode vs S.mode), combat-math errors, undo/autosave
   interactions, stack-ordering bugs. NO style nits, NO speculative "might be nice".
4. For each defect, state the concrete failure scenario (state -> action -> wrong outcome).
If the diff is clean through your lens, return zero findings — do not invent any.`,
    { label: `review:${lens.slice(0, 32)}`, phase: 'Review', schema: FINDINGS }),
  (rev, lens) => parallel((rev?.findings || []).map(f => () =>
    agent(
      `${ctx}

A reviewer (lens: ${lens}) claims this defect:
TITLE: ${f.title}
SEVERITY: ${f.severity}
CLAIM: ${f.claim}
EVIDENCE: ${f.evidence}

Your job is to REFUTE it. Read the actual code paths yourself (grep play.html, read narrow
ranges). Mark confirmed=true ONLY if you can trace the concrete failure end-to-end and it is
reachable in real play. If a guard, migrate step, caller, or test the reviewer missed prevents
it, mark confirmed=false and name that code in reason.`,
      { label: `verify:${f.title.slice(0, 32)}`, phase: 'Verify', schema: VERDICT })
      .then(v => ({ ...f, lens, verdict: v }))))
)

const flat = (reviews || []).filter(Boolean).flat().filter(Boolean)
const confirmed = flat.filter(x => x.verdict && x.verdict.confirmed)
const refuted = flat.filter(x => x.verdict && !x.verdict.confirmed)
log(`${confirmed.length} confirmed, ${refuted.length} refuted`)
return {
  confirmed: confirmed.map(x => ({ title: x.title, severity: x.verdict.severity || x.severity, lens: x.lens, claim: x.claim, fix: x.fix, proof: x.verdict.reason })),
  refuted: refuted.map(x => ({ title: x.title, lens: x.lens, whyRefuted: x.verdict.reason })),
}
```

**Afterwards (you, the main agent):** fix every CONFIRMED finding (HIGH/MEDIUM always; LOW at
your judgment, say so), re-run `npm test` + your driver, and report both lists — confirmed→fixed
and refuted→left alone with the refutation reason. Never patch a refuted claim.

---

## B. Investigation fan-out (grounding a spec / fix batch)

Used to ground Phase 49's 30 user bullets before speccing (11 agents). Run it when the user
hands you a batch of reported issues or a big new spec, BEFORE writing SPEC sections: one agent
per question greps the live code and reports what's actually there.

Args: `{ "questions": ["bullet 1 …", "bullet 2 …", …] }`

```js
export const meta = {
  name: 'gg-investigate',
  description: 'One read-only agent per question: what does the live code actually do today?',
  phases: [{ title: 'Investigate', detail: 'one agent per question' }],
}

const REPORT = {
  type: 'object', required: ['currentBehavior', 'evidence', 'alreadyHandled'],
  properties: {
    currentBehavior: { type: 'string', description: 'what the live code does today, concretely' },
    evidence:        { type: 'string', description: 'function names / data structures you read' },
    alreadyHandled:  { type: 'boolean', description: 'true if the ask is already implemented' },
    conflicts:       { type: 'string', description: 'any recorded decision or existing feature this would reverse' },
    recommendation:  { type: 'string', description: 'smallest sound change, or "no change needed"' },
  },
}

const ctx = `Repo = Guff's Gauntlet, cwd. The game is ONE inline <script> in play.html (~2.5 MB).
Never read a range spanning the single-line "const ART=" base64 blob; grep anchored patterns
(^\\s*function name\\() and read narrow ranges. SPEC.md holds decisions ("### ... decisions"
blocks); check whether the ask conflicts with one. You are READ-ONLY: do not edit anything.`

const out = await parallel(args.questions.map((q, i) => () =>
  agent(`${ctx}\n\nQuestion/report #${i + 1}: ${q}\n\nInvestigate the live code and answer the schema.`,
        { label: `q${i + 1}`, phase: 'Investigate', schema: REPORT })
    .then(r => ({ question: q, ...r }))))
return out.filter(Boolean)
```

---

## C. Single-agent adversarial review (MEDIUM-risk diffs)

No Workflow needed — spawn one subagent with the Agent tool (`subagent_type: "Explore"` keeps it
read-only; `run_in_background: false` to wait for the verdict). Prompt template:

```
Adversarially review a diff in Guff's Gauntlet (cwd). The game is ONE inline <script> in
play.html (~2.5 MB); NEVER read a range spanning the single-line "const ART=" base64 blob —
grep anchored patterns (^\s*function name\() and read narrow ranges around hits. S is lexical
(window.eval('S') in jsdom); engine fns are on window.

Task: <one-line description>
Diff: run `git diff main...<branch> -- play.html sw.js tests/`

Read every hunk AND the surrounding engine code it integrates with (follow callers/callees by
grep). Hunt only for real, reachable defects: broken invariants, missed callers, save-migration
gaps, _uiMode/S.mode leaks, combat/undo/stack interactions. No style nits. For each defect:
severity (HIGH/MED/LOW), the concrete failure scenario (state -> action -> wrong outcome), the
code evidence, and a minimal fix. If it's clean, say "no real findings" — do not invent.
```

Treat its findings like the workflow's: verify each against the code yourself before fixing
(you are the skeptic pass), fix what you confirm, report what you refute and why.
