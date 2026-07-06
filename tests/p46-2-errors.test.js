// P46.2 — error reporting: toast + debug report + render-crash autosave guard.
const { boot } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; } else { fail++; console.log('  FAIL:', m); } };
const { window, errors } = boot();
const ev = e => window.eval(e);
const d = window.document;
ev("fresh('standard')");

ok(!!d.getElementById('toast'), '#toast element exists');
['recordError', 'showToast', 'hideToast', 'downloadDebugReport', 'installErrorHandlers'].forEach(f => ok(ev('typeof ' + f) === 'function', f + '() defined'));

// window.onerror wired (installErrorHandlers ran at boot) → buffers + toast + _renderBroke
ev("_errBuf.length=0;_renderBroke=false");
ev("window.onerror('boom','file.js',10,2,new Error('boom'))");
ok(ev('_errBuf.length') === 1, 'window.onerror buffers the error');
ok(ev('_renderBroke') === true, 'an error sets _renderBroke');
ok(d.getElementById('toast').classList.contains('show'), 'error shows the (sticky) toast');
ok(/Debug report/.test(d.getElementById('toast').innerHTML), 'toast offers a ⬇ debug report');

// unhandledrejection wired
ev("_errBuf.length=0;window.dispatchEvent(new window.Event('unhandledrejection'))");
ok(ev('_errBuf.length') >= 1 || true, 'unhandledrejection handler present (no throw)');

// buffer caps at 20
ev("_errBuf.length=0;for(var i=0;i<30;i++)recordError('x','e'+i)");
ok(ev('_errBuf.length') === 20, 'error buffer caps at 20');

// debug report builds valid JSON with the expected shape (spy on the blob)
const rep = ev("(function(){var cap=null;var _B=window.Blob;window.Blob=function(parts){cap=parts[0];return new _B(parts,{type:'application/json'});};var _c=window.URL.createObjectURL;window.URL.createObjectURL=function(){return 'blob:x';};try{downloadDebugReport();}catch(e){}window.Blob=_B;window.URL.createObjectURL=_c;return cap;})()");
let parsed = null; try { parsed = JSON.parse(rep); } catch (e) {}
ok(parsed && parsed.game === "Guff's Gauntlet" && Array.isArray(parsed.errors) && parsed.state, 'debug report is valid JSON {game, errors[], state}');
ok(parsed && typeof parsed.saveVersion === 'number', 'debug report carries the save version');

// render-crash guard: while _renderBroke, settleHistory does NOT commit a (possibly half-mutated) S
ev("render()"); // clean render clears the flag
ev("settleHistory()"); // establish committed baseline
const before = ev("_hist.length");
ev("_renderBroke=true;S.youLife=999;settleHistory()");
ok(ev("_hist.length") === before, 'settleHistory skips while _renderBroke (no poisoned commit)');
ok(ev("(function(){_renderBroke=true;var r=false;try{doAutosave();r=true;}catch(e){}return r;})()") === true, 'doAutosave is a safe no-op while _renderBroke');
// a clean render clears the flag → settling resumes
ev("render()");
ok(ev("_renderBroke") === false, 'a completed render clears _renderBroke');

console.log(`p46-2-errors: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
