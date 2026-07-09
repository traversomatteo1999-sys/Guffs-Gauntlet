// P45.4 — Sound: complete cue map, master gain/volume, ambient pad. Counts oscillators per action.
const {boot}=require('./harness.js');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.log('  FAIL:',m);}};
const {window}=boot();
const ev=e=>window.eval(e);
ev("fresh('standard')");

// Install a counting AudioContext, then force a fresh ctx so audioCtx() picks it up.
let osc=0;
window.OSCBUMP=()=>osc++;
window.eval(`window.AudioContext=window.webkitAudioContext=function(){return {createOscillator(){window.OSCBUMP();return {connect(){},start(){},stop(){},frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){},value:0},type:''};},createGain(){return {connect(){},gain:{setValueAtTime(){},exponentialRampToValueAtTime(){},value:0}};},destination:{},currentTime:0,state:'running',resume(){},close(){}};};`);
ev("_audioCtx=null;_masterGain=null;_muted=false;");
const before=()=>{osc=0;window.eval("_sfxBatch=null");};/* clear the per-tick cue-dedup between assertions (this driver is one synchronous tick) */

// --- every listed cue produces sound (distinct cases exist) ---
const cues=['cast','resolve','strike','hit','heal','button','coin','die','victory','defeat',
  'purchase','loot','use','deploy','draw','phase','descend','wheel','wheelland','sting','enemycast','loyalty','counter'];
cues.forEach(name=>{before();ev(`sfx('${name}')`);ok(osc>0,`cue '${name}' plays (${osc} osc)`);});
// heal is no longer orphan
ok(true,'heal wired (verified via adjLife below)');

// --- master gain: every cue routes through it (created once) ---
ok(ev("typeof masterGain")==='function','masterGain() defined');
before();ev("sfx('cast')");const mg=ev("_masterGain");ok(!!mg,'master gain created on first cue');

// --- volume slider: 0-100 -> gain, persisted ---
ev("setVol(50)");ok(Math.abs(ev("_vol")-0.5)<1e-6,'setVol(50) → _vol 0.5');
ok(ev("DB.vol")===50,'setVol persists DB.vol=50');
ev("setVol(0)");ok(ev("_vol")===0,'setVol(0) → _vol 0 (silence via gain, not mute flag)');
ev("DB.vol=30;loadVol()");ok(Math.abs(ev("_vol")-0.3)<1e-6,'loadVol reads DB.vol=30 → 0.3');
ev("setVol(100)");

// --- mute still silences everything ---
ev("_muted=true");before();ev("sfx('heal')");ok(osc===0,'muted → no oscillators');
ev("_muted=false");

// --- nothing fires on a mere re-render ---
before();ev("render()");ok(osc===0,'render() plays no sound');
before();ev("renderPlays();renderLibrary&&renderLibrary()");ok(osc===0,'renderPlays/renderLibrary play no sound');

// --- end-to-end wiring: action → cue ---
before();ev("adjLife('you',5)");ok(osc>0,'adjLife(you,+) → heal cue');
before();ev("adjLife('you',-3)");ok(osc===0,'adjLife(you,-) → no heal cue (damage is silent here)');
before();ev("S.phase=0;advancePhase()");ok(osc>0,'advancePhase → phase cue');
before();ev("grantBoon('heal5')");ok(osc>0,'grantBoon → loot cue');
before();ev("S.my.creatures.push({id:7001,name:'C',p:1,t:1,kw:[]});myctr(7001,'plus',1)");ok(osc>0,'myctr (+1/+1) → counter cue');
before();ev("S.tokens.push({id:7002,name:'T',p:1,t:1,kw:[]});cctr(7002,'plus',1)");ok(osc>0,'cctr → counter cue');
before();ev("showCutscene(['x'],'T','e',null,{})");ok(osc>0,'showCutscene → sting cue');

// --- P50.14: the P45.4 ambient synth pad was REPLACED by the story soundtrack manager ---
ok(ev("typeof togglePad")==="undefined"&&ev("typeof startPad")==="undefined",'P50.14: the ambient pad (startPad/togglePad) is retired');
ok(ev("typeof playPool")==="function",'P50.14: the story-soundtrack manager exists instead');

// --- review-fix #3: same cue collapses within one synchronous tick; distinct cues still both play ---
before();ev("sfx('enemycast');sfx('enemycast');sfx('enemycast')");ok(osc===2,`same cue dedups within a tick — one enemycast (${osc} osc, not 6)`);
before();ev("sfx('cast');sfx('resolve')");ok(osc>=3,`distinct cues in one tick both play (${osc} osc)`);
before();ev("sfx('cast')");ok(osc>0,'dedup clears between ticks (fresh cast plays after _sfxBatch reset)');

// --- P50.14: unlockAudio resumes the sfx context (and would start music) without throwing ---
ev("_muted=false;_audioReady=false");before();ev("unlockAudio()");ok(true,'unlockAudio() runs cleanly with the soundtrack manager (no pad)');

console.log(`\nP45.4: ${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
