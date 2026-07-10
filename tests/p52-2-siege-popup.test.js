// P52.2: a boss-side siege/battle pops an info modal when played + at your turn start if unacknowledged (once per battle).
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const D=window.document;
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const shown=()=>{const e=D.getElementById('overlay');return !!e&&e.classList.contains('show');};
const clear=()=>ev("$('overlay').classList.remove('show')");
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

// Enter Grakk's room (fields the siege during setup, activeTurn=null).
ev("fresh('standard');window.alert=function(){};");
const gi=ev("DUNGEON.findIndex(r=>r.siege)");
ev(`S.roomIndex=${gi};enterRoom(${gi});`);
ev("S.activeTurn=null;$('overlay').classList.remove('show');");
const sg=ev("S.battles.find(b=>b.side==='boss'&&b._siege)");
ok(!!sg, 'the Grakk siege was fielded');
ok(!sg._popped, 'siege NOT auto-popped during room setup (activeTurn null → deferred)');
ok(!shown(), 'no overlay shown during setup');

// 1. Begin-turn check pops the unacknowledged siege.
ev("beginYourTurn()");
ok(shown(), 'the siege pops at the start of your turn');
ok(/Siege of the Ember Gate/.test(ev("$('modalBody').innerHTML")), 'popup names the siege');
ok(ev("S.battles.find(b=>b._siege)._popped")===true, 'siege stamped _popped');

// 2. A second begin-turn does NOT re-pop.
clear();
ev("beginYourTurn()");
ok(!shown(), 'a subsequent turn does not re-pop the same siege');

// 3. A boss-side battle added MID-GAME pops immediately.
clear();
ev("S.activeTurn='you';addBattle('boss')");
ok(shown(), "addBattle('boss') mid-game pops the modal immediately");
ok(ev("S.battles[S.battles.length-1]._popped")===true, 'the new boss battle is marked _popped');

// 4. A PLAYER battle does not pop.
clear();
ev("addBattle('you')");
ok(!shown(), "a player-cast battle (addBattle('you')) does NOT pop");

// 5. Source hooks present.
ok(/function siegeBattlePopup\(b\)/.test(src) && /function _popPendingSiege\(\)/.test(src), 'popup + begin-turn helpers exist');
ok(/_popPendingSiege\(\);.*enterPhase\(\)/.test(src) || /_popPendingSiege\(\)/.test(src), 'beginYourTurn calls the begin-turn check');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P52.2 FAILED':'P52.2 PASSED');
process.exit(fail?1:0);
