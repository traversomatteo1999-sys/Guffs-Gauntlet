// P50.14: story-driven pooled soundtrack manager (replaces the P45.4 synth pad).
// jsdom can't play <audio>, so _musicCanPlay() is false here — the pool/bag SELECTION logic still
// runs (and is tested), while no Audio element is created (→ zero jsdom errors, the key guarantee).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

// the harness UA contains "jsdom" → playback disabled here (no <audio>, no not-implemented errors)
ok(ev("_musicCanPlay()")===false, 'P50.14: playback disabled under the test harness (jsdom-safe)');

// ---- (b) the P45.4 ambient pad is fully removed ----
ok(ev("typeof startPad")==="undefined" && ev("typeof stopPad")==="undefined" && ev("typeof togglePad")==="undefined", 'P50.14b: startPad/stopPad/togglePad removed');
ok(!/Ambience/.test(ev("settingsHTML()")), 'P50.14b: the ⚙ Settings Ambience toggle is gone');
ok(ev("document.getElementById('padBtn')")===null, 'P50.14b: the controls-bar Ambience button is gone');
// sfx cues are kept
ok(ev("typeof sfx")==="function", 'P50.14b: synthesized sfx() cues are kept');

// ---- the manager + pools ----
ok(ev("typeof playPool")==="function" && ev("typeof stopMusic")==="function", 'P50.14: playPool/stopMusic exist');
ok(ev("Object.keys(MUSIC_POOLS).sort().join(',')")==="Grakk,Menu,Murglax,Vael,Victory", 'P50.14: five pools (Menu/Grakk/Murglax/Vael/Victory)');
ok(ev("MUSIC_POOLS.Grakk.length")===4 && ev("MUSIC_POOLS.Victory.length")===1, 'P50.14: pools carry their tracks (Victory trimmed to 1 track by P52.7)');

// ---- playPool sets the active pool; stopMusic clears it ----
ev("playPool('Menu')");
ok(ev("_musicPool")==='Menu' && ev("_musicCurrent")!==null, 'P50.14: playPool(Menu) sets the pool + picks a track');
ev("playPool('Vael')");
ok(ev("_musicPool")==='Vael', 'P50.14: switching pools works');
// re-calling the SAME pool does not restart (guard)
ev("var before=_musicCurrent;playPool('Vael');window._same=(_musicCurrent===before)");
ok(ev("window._same"), 'P50.14: re-calling the same pool keeps the current track (no restart)');
ev("stopMusic()");
ok(ev("_musicPool")===null && ev("_musicCurrent")===null, 'P50.14: stopMusic clears the pool');

// ---- shuffle-bag: every track plays once before any repeat ----
ev("_musicPool='Grakk';_musicBag=[];_musicLast=null");
const picks=[]; for(let i=0;i<4;i++) picks.push(ev("_musicPick()"));
ok(new Set(picks).size===4, 'P50.14: 4 distinct tracks in one bag cycle (no repeat until exhausted)');
ok(picks.every(p=>ev("MUSIC_POOLS.Grakk").includes(p)), 'P50.14: all picks are from the Grakk pool');
const fifth=ev("_musicPick()");   // reshuffle
ok(fifth!==picks[3], 'P50.14: the reshuffle never immediately repeats the last track');

// ---- roomMusicPool maps the room's warden ----
ev("fresh('standard')");
ok(['Grakk','Murglax','Vael'].includes(ev("roomMusicPool()")), 'P50.14: roomMusicPool() returns a warden pool for the current room');

// ---- story hooks call playPool ----
ev("fresh('standard');stopMusic();showMenu()");
ok(ev("_musicPool")==='Menu', 'P50.14: showMenu() → MENU pool');
ev("fresh('standard');S.over=false;S.boss={isVael:false,life:5,max:40,name:'x'};stopMusic();win()");
ok(ev("_musicPool")==='Victory', 'P50.14: win() → VICTORY pool');
// startBattle picks the room warden
ev("stopMusic();startBattle({mode:'sandbox',levelIdx:0,roomIdx:0,diff:'standard'})");
ok(['Grakk','Murglax','Vael'].includes(ev("_musicPool")), 'P50.14: startBattle() → the room warden pool');

// ---- volume/mute integration doesn't throw and keeps state ----
ev("setVol(50)"); ok(ev("Math.round(_vol*100)")===50, 'P50.14: setVol still works (also updates music volume)');
ev("_muted=false;toggleMute()"); ok(ev("_muted")===true, 'P50.14: toggleMute (→ muted) pauses music without throwing');
ev("toggleMute()"); ok(ev("_muted")===false, 'P50.14: toggleMute (→ on) resumes music without throwing');

// ---- THE KEY GUARANTEE: no jsdom errors introduced (boot + all the above) ----
ok(errors.length===0, 'P50.14: zero jsdom errors — the manager never touches <audio> under jsdom ('+(errors[0]||'')+')');

console.log(fail?'P50.14 FAILED':'P50.14 PASSED');
process.exit(fail?1:0);
