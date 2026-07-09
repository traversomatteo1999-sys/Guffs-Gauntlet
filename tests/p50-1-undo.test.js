// P50.1: a visible ↩ Undo button in the Turn-flow box (surfaces the existing undo()).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");
ev("render()");

// the button exists in the Turn-flow row and is wired to undo()
ok(ev("!!document.getElementById('undoBtn')"), 'P50.1: #undoBtn exists in the DOM');
ok(/undo\(\)/.test(ev("document.getElementById('undoBtn').getAttribute('onclick')||''")), 'P50.1: #undoBtn onclick calls undo()');
ok(ev("document.getElementById('undoBtn').closest('.flowbtns')!==null"), 'P50.1: #undoBtn lives inside the .flowbtns turn-flow row');

// disabled when there is nothing to undo
ev("_hist=[];render()");
ok(ev("document.getElementById('undoBtn').disabled")===true, 'P50.1: disabled when _hist is empty');

// enabled once history exists
ev("_hist=[{s:JSON.stringify(S),label:'a move'}];render()");
ok(ev("document.getElementById('undoBtn').disabled")===false, 'P50.1: enabled when _hist has an entry');

// disabled during a paused cutscene even with history
ev("S.paused=true;render()");
ok(ev("document.getElementById('undoBtn').disabled")===true, 'P50.1: disabled while S.paused (cutscene)');
ev("S.paused=false;render()");

// clicking it (undo) reverts S to the snapshot and empties the history
ev("fresh('standard')");
ev("window._snap=JSON.stringify(S)");        // snapshot at youLife 40
ev("S.youLife=13");                          // mutate the live state
ev("_hist=[{s:window._snap,label:'test move'}]");
ev("document.getElementById('undoBtn').onclick ? document.getElementById('undoBtn').onclick() : undo()");
ok(ev("S.youLife")===40, 'P50.1: invoking the button reverts S (youLife 13→40)');
ok(ev("_hist.length")===0, 'P50.1: undo popped the history entry');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.1 FAILED':'P50.1 PASSED');
process.exit(fail?1:0);
