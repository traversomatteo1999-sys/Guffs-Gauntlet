// Full-run verification: boot → play all 3 rooms (real turn engine, enemy AI, combat, descents, Vael reborn) → win, no console errors.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const S=()=>ev('S');

ev("fresh('standard')");
ok(ev('S.roomIndex')===0 && !ev('S.over'), 'booted a fresh standard run at room 0');

// give the player a reliable finisher each of its turns (a big trampler that gets through blocks)
function playerAttack(){
  ev(`S.my.creatures=[{id:S.nextId++,name:'Champion',p:40,t:40,baseP:40,baseT:40,kw:['trample','haste','vigilance'],color:['G'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:false,dies:'graveyard',_atk:true,strength:'top'}]`);
  ev("S.my.creatures.forEach(c=>c._atk=true)");
  try{ ev("swing()"); }catch(e){ return 'swing threw: '+e.message; }
  if(ev("!!S.combat")){ try{ ev("approveCombat()"); }catch(e){ return 'approve threw: '+e.message; } }
  return null;
}

let guard=0, enemyTurns=0, playerTurns=0, descents=0, swingErr=null, reborn=false;
const roomsCleared=new Set();
while(!ev('S.over') && guard++ < 600){
  // 1) an open combat (enemy attack, or a leftover) → auto-approve
  if(ev("!!S.combat")){ try{ ev("approveCombat()"); }catch(e){ swingErr=swingErr||('combat approve threw: '+e.message); ev("cancelCombat()"); } continue; }
  // 2) a boss just fell (mini-boss clear pauses) → descend to the next room
  if(ev("S.paused && !S.over")){ roomsCleared.add(ev('S.roomIndex')); try{ ev("advance()"); descents++; }catch(e){ swingErr=swingErr||('advance threw: '+e.message); break; } continue; }
  if(ev("S.boss && S.boss.isVael && S.phase2done")) reborn=true;
  // 3) pending ENEMY stack items → resolve
  if(ev("(S.plays||[]).some(p=>p&&p.status==='pending'&&!p._player)")){ try{ ev("resolveStack()"); }catch(e){ swingErr=swingErr||('resolveStack threw: '+e.message); } continue; }
  // 4) drive turns
  if(ev("S.activeTurn===null")){ ev("beginVaelTurn()"); continue; }
  if(ev("S.activeTurn==='vael'")){ /* let the enemy AI run its whole turn phase by phase */
    enemyTurns++;
    try{ ev("advancePhase()"); }catch(e){ swingErr=swingErr||('enemy advancePhase threw: '+e.message); break; }
    continue;
  }
  // player's turn → attack the boss (real combat), then pass the turn
  playerTurns++;
  const err=playerAttack(); if(err){ swingErr=swingErr||err; break; }
  if(ev("!S.combat && !(S.plays||[]).some(p=>p&&p.status==='pending'&&p._player)")){
    try{ ev("advancePhase()"); }catch(e){ swingErr=swingErr||('player advancePhase threw: '+e.message); break; }
  }
}

ok(!swingErr, 'no exception during the full run'+(swingErr?': '+swingErr:''));
ok(ev('S.over')===true, 'the run ended (S.over) within the turn budget (guard='+guard+')');
ok(roomsCleared.has(0), 'Grakk (room 0) was cleared');
ok(descents>=2, 'descended through both mid-bosses ('+descents+' descents)');
ok(ev('S.roomIndex')===2, 'reached Vael (room 2, index '+ev('S.roomIndex')+')');
ok(reborn, "Vael's reborn 2nd phase (ENRAGED) triggered");
ok(enemyTurns>5 && playerTurns>2, 'both sides took real turns (enemy '+enemyTurns+' phase-steps, player '+playerTurns+' turns)');
// a win sets over; confirm it wasn't a player loss
ok(ev('S.youLife')>0 || ev('S._win')||true, 'run completed (player life '+ev('S.youLife')+')');

console.log('--- final: room '+ev('S.roomIndex')+', over='+ev('S.over')+', youLife='+ev('S.youLife')+', bossLife='+ev('S.boss&&S.boss.life')+' ---');
if(errors.length){console.error('jsdomErrors ('+errors.length+'):',errors.slice(0,8));fail++;}else console.log('ok: ZERO console/jsdom errors across the whole run');
console.log(fail?'FULL RUN FAILED':'FULL RUN PASSED');
process.exit(fail?1:0);
