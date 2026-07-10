// P52.7: Level-I victory plays ONLY 'Guff is Free', looping. 'The Conclave Reborn' was moved out of
// the Victory pool into the Menu pool "for now" (earmarked for the Level-II victory later).
// jsdom disables <audio> (_musicCanPlay()===false), but the pool/bag SELECTION logic still runs.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

// ---- the Victory pool is exactly ['Guff is Free'] ----
ok(ev("JSON.stringify(MUSIC_POOLS.Victory)")==='["Guff is Free"]', 'P52.7: Victory pool is exactly ["Guff is Free"]');
ok(ev("MUSIC_POOLS.Victory.includes('The Conclave Reborn')")===false, "P52.7: 'The Conclave Reborn' is NOT in the Victory pool");
ok(ev("MUSIC_POOLS.Menu.includes('The Conclave Reborn')")===true, "P52.7: 'The Conclave Reborn' is now in the Menu pool (temporary home)");

// ---- playPool('Victory') picks 'Guff is Free' ----
ev("stopMusic();playPool('Victory')");
ok(ev("_musicPool")==='Victory' && ev("_musicCurrent")==='Guff is Free', "P52.7: playPool('Victory') plays 'Guff is Free'");

// ---- it LOOPS: every simulated track-end re-picks the same single track ----
const loops=[]; for(let i=0;i<5;i++){ev("_musicNext()");loops.push(ev("_musicCurrent"));}
ok(loops.every(t=>t==='Guff is Free'), "P52.7: the single-track pool loops 'Guff is Free' (5 consecutive track-ends)");
ok(ev("_musicPick()")==='Guff is Free' && ev("_musicPick()")==='Guff is Free', 'P52.7: _musicPick keeps returning the one track (bag reshuffles to it)');

// ---- win() (Vael falls = the Level-I victory) starts the trimmed pool ----
ev("fresh('standard');S.over=false;S.boss={isVael:false,life:5,max:40,name:'x'};stopMusic();win()");
ok(ev("_musicPool")==='Victory' && ev("_musicCurrent")==='Guff is Free', "P52.7: win() → Victory pool plays 'Guff is Free'");

// ---- files on disk: Guff is Free in Victory/, the Conclave Reborn moved to Menu/ ----
const fs=require('fs'),path=require('path');
const snd=path.join(__dirname,'..','Soundtrack');
ok(fs.existsSync(path.join(snd,'Victory','Guff is Free.mp3')), "P52.7: 'Guff is Free.mp3' is in Soundtrack/Victory/");
ok(fs.existsSync(path.join(snd,'Menu','The Conclave Reborn.mp3')), "P52.7: 'The Conclave Reborn.mp3' now lives in Soundtrack/Menu/ (moved for now)");

// ---- zero jsdom errors introduced ----
ok(errors.length===0, 'P52.7: zero jsdom errors ('+(errors[0]||'')+')');

console.log(fail?'P52.7 FAILED':'P52.7 PASSED');
process.exit(fail?1:0);
