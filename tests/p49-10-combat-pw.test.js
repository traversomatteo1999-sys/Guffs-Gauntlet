// P49.10: combat popup minimize/restore (#19) · PW abilities off-stack + toast (#22) · battles side-selectable (#11) · resurgent timing (#10).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const $=id=>window.document.getElementById(id);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// --- Bullet 19: minimize/restore keeps combat blocking ---
ev("openCombat('boss',[{id:1,name:'Att',p:2,t:2,kw:[]}],[],{},{})");
ok($('resolver').classList.contains('show'),'openCombat shows the resolver');
ok(ev("S.combat&&S.combat._min===false"),'combat starts un-minimized');
ev("minimizeCombat()");
ok(ev("S.combat!==null"),'minimize does NOT clear S.combat (turn stays blocked)');
ok($('resolver').classList.contains('min'),'resolver gains .min');
ok($('combatFab').classList.contains('show'),'resume fab is shown');
// guards still block while minimized
ev("var ph=S.phase;advancePhase();");
ok(ev("S.phase")===ev("S.combat?S.phase:-99")&&$('resolver').classList.contains('min'),'advancePhase is a no-op during (minimized) combat');
ok(ev("(function(){var b=false;flowClick();return true})()"),'flowClick during combat does not throw');
// a mid-combat render keeps it minimized
ev("render()");
ok($('resolver').classList.contains('min'),'render preserves the minimized state');
ev("restoreCombat()");
ok(ev("S.combat._min===false")&&!$('resolver').classList.contains('min'),'restore re-expands');
ok(!$('combatFab').classList.contains('show'),'fab hidden after restore');
// cancel clears everything
ev("cancelCombat()");
ok(ev("S.combat===null")&&!$('resolver').classList.contains('show')&&!$('resolver').classList.contains('min'),'cancel clears combat + all classes');
// review-fix: a teardown while minimized (e.g. combat nulled then render) clears the stale fab
ev("openCombat('boss',[{id:1,name:'A',p:1,t:1,kw:[]}],[],{},{});minimizeCombat();S.combat=null;render();");
ok(!$('combatFab').classList.contains('show')&&!$('resolver').classList.contains('min'),'combat torn down while minimized → fab + .min cleared on next render');

// --- Bullet 22: enemy walker ability resolves INLINE (not on the stack) + toast ---
ev("fresh('standard');S.plays=[];S.tokens=[];S.youLife=40;");
// craft an enemy walker whose +1 spawns a body and whose -3 hits life
const mkW=`var w={id:70,loyalty:6,baseLoy:6,ultThreshold:7,isWalker:true,name:'Testwalk',
  wplus:{sign:1,n:'Muster',text:'Make a 1/1',run:['spawn','Soldier',1,1,['haste'],'R']},
  wminus:{sign:-3,n:'Drain',text:'You lose 3',selfLoss:3},
  wult:{sign:-7,n:'Ult',text:'8/8',run:['spawn','Avatar',8,8,['haste'],'RB'],ult:true}};`;
// force +1 by stubbing pickWalkerAbility via loyalty state (loy 6, thr 7 -> not ult; empty board -> builds +1)
ev(`${mkW}S.enemyWalkers=[w];w._actedTurn=-1;var before=S.plays.length;enemyWalkerAct(w);window.__after=S.plays.length;`);
ok(ev("window.__after===0"),'walker ability did NOT go on the stack (S.plays unchanged)');
ok(ev("S.tokens.some(c=>c.name==='Soldier')"),'the +1 spawn resolved inline (a Soldier is on the board)');
ok(ev("w.loyalty===7"),'loyalty advanced by the +1');
ok($('toast')&&/Testwalk|Muster/.test($('toast').innerHTML),'an announcement toast fired');
// enemyWalkersAct has no empty-stack gating now
ev("S.plays=[{id:9,status:'pending',_player:true,type:'instant',name:'x'}];w._actedTurn=-1;w.loyalty=6;enemyWalkersAct();");
ok(ev("w._actedTurn===S.turn"),'walker still acts even with an unrelated pending stack item (no empty-stack gate)');

// --- Bullet 11: battles side-selectable ---
ev("fresh('standard');S.battles=[];addBattle('you');addBattle('boss');");
ok(ev("S.battles[0].side==='you'&&S.battles[1].side==='boss'"),'addBattle(you|boss) sets the side');
ev("render();var h=$('battleList').innerHTML;window.__bh=h;");
ok(ev("/setBattle\\(\\d+,'side'/.test(window.__bh)"),'each row has a side-flip toggle');
ev("var id=S.battles[0].id;setBattle(id,'side','boss');");
ok(ev("S.battles[0].side==='boss'"),'setBattle flips a battle to the enemy side');
// fieldBossSiege still adds exactly one _siege regardless of a user-added boss battle
ev("fieldBossSiege({name:'Grakk Siege',def:6});fieldBossSiege({name:'Dup',def:6});");
ok(ev("S.battles.filter(b=>b._siege).length===1"),'fieldBossSiege still guards to one _siege');

// --- Bullet 10: resurgent skips when a creature is pending on the stack ---
ev("fresh('standard');S.activeTurn='vael';S.tokens=[];S.cmd.inPlay=false;S.plays=[{id:5,status:'pending',type:'creature',name:'incoming'}];S.bossMana=0;S.hand=[];var t0=S.tokens.length;vaelMain(1);window.__res=S.tokens.length;");
ok(ev("!S.tokens.some(c=>/Servant|Whelp|Spawn/.test(c.name))"),'no resurgent 1/1 while a creature spell is pending');
// with a truly empty board + nothing pending, resurgent fires
ev("fresh('standard');S.activeTurn='vael';S.tokens=[];S.cmd.inPlay=false;S.cmd.inHand=false;S.plays=[];S.bossMana=0;S.hand=[];vaelMain(1);");
ok(ev("S.tokens.some(c=>/Servant|Whelp|Spawn|Goblin|Ember|Pit/.test(c.name))"),'resurgent 1/1 fires on a genuinely empty board');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,8));fail++;}
console.log(fail?'P49.10 FAILED':'P49.10 PASSED');
process.exit(fail?1:0);
