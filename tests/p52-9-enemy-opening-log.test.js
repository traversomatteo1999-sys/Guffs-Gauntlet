// P52.9: the enemy opening-hand log names the ACTUAL warden being fought. fresh() bootstraps a
// default room-0 (Grakk) board via enterRoom(0), whose throwaway opening-hand log used to leak into
// a Murglax/Vael battle because startBattle cleared the log BEFORE fresh(); the fix clears it AFTER
// fresh(), so only the real opponent's opening is shown. Level I rooms: 0=Grakk, 1=Murglax, 2=Vael.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

const logText=()=>ev("(function(){var l=$('log');return l?(l.textContent||''):'';})()");

// --- Vael (room 2): the log must name Vael, never Grakk ---
ev("startBattle({mode:'sandbox',levelIdx:0,roomIdx:2,diff:'standard'})");
let t=logText();
ok(/Vael/.test(t), 'P52.9: Vael fight — the log names Vael');
ok(!/Grakk/.test(t), 'P52.9: Vael fight — NO stale Grakk opening leaks from the fresh() bootstrap');

// --- Murglax (room 1): names Murglax, never Grakk ---
ev("startBattle({mode:'sandbox',levelIdx:0,roomIdx:1,diff:'standard'})");
t=logText();
ok(/Murglax/.test(t), 'P52.9: Murglax fight — the log names Murglax');
ok(!/Grakk/.test(t), 'P52.9: Murglax fight — NO stale Grakk opening leaks');

// --- Control: Grakk (room 0): the real Grakk opening still logs (not over-cleared) ---
ev("startBattle({mode:'sandbox',levelIdx:0,roomIdx:0,diff:'standard'})");
t=logText();
ok(/Grakk/.test(t), 'P52.9: Grakk fight — the real Grakk opening still logs');

// --- zero jsdom errors across three battle starts ---
ok(errors.length===0, 'P52.9: zero jsdom errors ('+(errors[0]||'')+')');

console.log(fail?'P52.9 FAILED':'P52.9 PASSED');
process.exit(fail?1:0);
