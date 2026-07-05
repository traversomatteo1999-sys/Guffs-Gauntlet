# tests/ — the offline regression suite

`npm test` (from the repo root) runs `run.js`, which executes every `tests/*.test.js`
as an isolated Node process and aggregates pass/fail. It needs `npm install` once
(jsdom, a dev dependency) and then runs **entirely offline**.

## How a driver works

The game is one ~2.5 MB `index.html` (a big base64 `ART`/font blob + one `<script>`).
`harness.js` boots that real file in jsdom (`runScripts:'dangerously'`), stubs
`AudioContext` + a no-op canvas + `matchMedia`/`rAF`, and returns `{window, errors}`.

```js
const { boot } = require('./harness.js');
const { window, errors } = boot();          // errors[] = any jsdom console/script error
const ev = e => window.eval(e);             // S is a lexical `let`, read it via eval
ev("fresh('standard')");                    // start a game
// ... call engine fns directly (render, adjLife, resolveAttack, migrate, ...) and assert
process.exit(fail ? 1 : 0);                 // non-zero exit = the runner marks it FAILED
```

`window.eval('S')` reads engine state; `window.render`, `window.fresh`, etc. are on
`window`. Source-level checks (CSS/markup) read `index.html` via
`path.join(__dirname,'..','index.html')`.

## Adding a test when you build a feature

**ADD a `tests/<feature>.test.js`** — don't rebuild the harness. Follow an existing
driver (`p45-*.test.js` for UI/CSS asserts, `full-descent.test.js` for a whole run).
End with `process.exit(fail?1:0)`. The runner picks it up automatically.

## The non-driver guards

- `syntax.test.js` — extracts the inline `<script>` and `vm.Script`-compiles it.
- `idset.test.js` — fails if any element id is REMOVED vs `ids.snapshot.txt`
  (adds are fine). Regenerate intentionally: `node tests/idset.test.js --update`.
- `sw-version.test.js` — fails if `sw.js`'s `gg-cache-v*` and the README version drift.
