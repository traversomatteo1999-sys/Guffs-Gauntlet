# Writing an acceptance driver + verification recipes

Every task ships with a `tests/<task>.test.js` jsdom driver. `npm test` (repo root) runs every
`tests/*.test.js` as an isolated Node process via `run.js` — a new file is picked up
automatically. Also see `tests/README.md`.

## Commands

```
npm install                        # once; jsdom devDep (node_modules git-ignored)
npm test                           # full offline deterministic suite
node tests/<name>.test.js          # one driver, full output
node tests/harness.js              # bare boot + turn-cycle + undo + autosave smoke
node tests/idset.test.js --update  # rebaseline ids ONLY for an intentional id removal
```

## Harness API (tests/harness.js)

`boot()` loads the real `play.html` in jsdom (`runScripts:'dangerously'`), stubs
`AudioContext`/canvas-2D/`matchMedia`/`requestAnimationFrame`, and returns `{window, errors}`
(`errors[]` collects every console/script error — assert it stays empty).

- `S` is a lexical `let`, NOT on `window` → read/mutate via `window.eval`:
  `ev("S.bossLands=3")`, `const S = ev('S')`.
- Engine functions ARE on `window`: `ev("fresh('standard')")`, `ev("advancePhase()")`,
  `ev("resolveAttack(...)")`, `window.render()`.
- DOM asserts: `ev("render()")` first, then read `window.document.getElementById(...)`.
- Source-level checks (CSS rules, markup, data tables) read the file text:
  `fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8')`.

## Driver skeleton (house style — copy this shape)

```js
// P50.1: <one line: the behavior this driver locks in>.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");                 // boot a run (or fresh('brutal') / campaign setup)

// 1. Arrange: set exact state — never depend on RNG
ev("S.bossLands=3;S.bossMana=3;");

// 2. Act: call the engine functions under test
ev("advancePhase()");

// 3. Assert behavior end-to-end (state -> action -> state), not "function exists"
ok(ev("S.phase")==='upkeep', 'phase advanced to upkeep');

// 4. If the task touched save shape: feed a LEGACY-shaped save through migrate()
//    e.g. ok(!ev("(()=>{try{migrate(JSON.parse('<old-shape-json>'));return false}catch(e){return true}})()"),
//         'legacy save migrates without throwing');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.1 FAILED':'P50.1 PASSED');
process.exit(fail?1:0);
```

Rules:
- **Deterministic only.** Set state directly; if a path genuinely rolls dice, pin it inside the
  window: `ev("Math.random=()=>0.42")` (affects only this jsdom instance). Never commit a driver
  that flakes — the RNG enemy-run driver is excluded from the suite for exactly that reason.
- Exit code is the contract: `process.exit(fail?1:0)`.
- Assert `errors.length===0` at the end — a console error anywhere during the drive is a failure.
- Model on neighbors: `p45-*.test.js` for UI/CSS asserts, `full-descent.test.js` for a whole-run
  drive, `p49-cmd-migrate.test.js`-style for migration checks.

## The three standing guards (never work around them)

- `syntax.test.js` — `vm.Script`-compiles the inline `<script>`; the cheapest smoke after any edit.
- `idset.test.js` — fails if any element id is REMOVED vs `ids.snapshot.txt` (adds are fine).
  Intentional removal ⇒ `--update` rebaseline AND call it out in your report.
- `sw-version.test.js` — fails if `sw.js` `gg-cache-v*` and the `README.md` version line drift.

## Visual verification (layout/art/animation tasks)

- **Live eyeball:** `python -m http.server 8000` from the repo root →
  `http://localhost:8000/play.html` in an incognito window (a cached service worker will
  otherwise serve the OLD build).
- **Headless screenshots:** MS Edge works —
  `msedge --headless=new --screenshot=<abs>.png --window-size=1440,900 --virtual-time-budget=8000 <url-or-file>`
  BUT a raw `play.html` shot never gets past the intro (the `beginIntro()` canvas loops forever).
  Two proven workarounds, built in the scratchpad (never in the repo):
  1. **Board harness:** copy `play.html` to the scratchpad and replace the literal `beginIntro();`
     boot call with board-setup code (`fresh('standard'); enterRoom(0); render();` etc.). The
     replacement must live INSIDE the same `<script>` — a separate script tag cannot see the
     lexical `S`.
  2. **Style harness:** a small synthetic page that reuses the real `<style>` block plus sample
     tiles — enough for font/legibility/palette checks without booting the engine.
  Playwright is the fully-scripted alternative when clicking through real flows matters.
- Screenshot at both widths when layout changed: desktop ~1440px and phone ~400px.
