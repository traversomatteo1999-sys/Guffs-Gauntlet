// P51.11: Vael's first death reborns him at 5 HP on every difficulty (was 1).
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

// 1. Source: reborn data is 5/5/5, no 1/1/1 remains; tip text updated.
ok(/reborn:\{easy:5,standard:5,brutal:5\}/.test(src), 'reborn data is 5/5/5');
ok(!/reborn:\{easy:1,standard:1,brutal:1\}/.test(src), 'no 1/1/1 reborn remains');
ok(!/rises <b>ENRAGED<\/b> at just 1 life/.test(src), 'stale "at just 1 life" tip removed');

// 2. Behaviour: drive bossDown on a Vael room at 0 life for each difficulty -> 5 HP.
['easy','standard','brutal'].forEach(diff=>{
  ev(`fresh('${diff}')`);
  // locate Vael's room index and enter it as the live boss
  const vi=ev("DUNGEON.findIndex(r=>r.isVael)");
  ok(vi>=0, `[${diff}] Vael room found`);
  ev(`S.roomIndex=${vi};enterRoom(${vi})`);
  ok(ev("S.boss&&S.boss.isVael===true"), `[${diff}] Vael is the live boss`);
  ev("S.phase2done=false;S.boss.life=0;bossDown()");
  ok(ev("S.boss.life")===5, `[${diff}] reborn at 5 HP (got ${ev("S.boss.life")})`);
  ok(ev("S.phase2done")===true, `[${diff}] phase2done set`);
  ok(!ev("S.over"), `[${diff}] not game-over on first death`);
  // the reborn fires the "Undying Embers" lore cutscene (the Ember saves Vael from death)
  ok(ev("document.getElementById('cutscene').classList.contains('show')"), `[${diff}] the Undying Embers cutscene is shown`);
  ok(/Undying Embers/.test(ev("document.getElementById('cutscene').innerHTML")), `[${diff}] cutscene titled "Undying Embers"`);
  ev("closeCutscene()");
});

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.11 FAILED':'P51.11 PASSED');
process.exit(fail?1:0);
