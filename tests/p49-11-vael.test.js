// P49.11: Vael reborn at 1 HP (#23) · Ash +1 makes a 1/1 haste Ash Soldier (#27) · Ash -3 is a graveyard reanimator (#28).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// --- Bullet 23: reborn at exactly 1 HP on every difficulty ---
['easy','standard','brutal'].forEach(df=>{
  ev(`S.diff='${df}';S.roomIndex=DUNGEON.length-1;S.over=false;S.phase2done=false;S.tokens=[];S.boss={isVael:true,life:0,max:60,name:'Vael',colors:['R','B']};bossDown();`);
  ok(ev("S.boss.life")===1,`${df}: Vael reborn at 1 life`);
  ok(ev("S.phase2done")===true,`${df}: phase2done set`);
  ok(ev("S.tokens.some(c=>c.name==='Pyre Revenant')"),`${df}: Pyre Revenant spawned`);
  // a second reduction does NOT revive again
  ev("S.boss.life=0;bossDown();");
  ok(ev("S.phase2done")===true,`${df}: still phase2done (no third life)`);
});
// confirm the room data really is 1/1/1
ok(ev("var v=DUNGEON[DUNGEON.length-1];v.reborn.easy===1&&v.reborn.standard===1&&v.reborn.brutal===1"),'room.reborn is 1/1/1');
// the room def carries the new abilities
ok(ev("var c=DUNGEON[DUNGEON.length-1].cmd;c.plus.run&&c.plus.run[0]==='spawn'&&c.plus.run[1]==='Ash Soldier'"),'+1 = spawn Ash Soldier');
ok(ev("var c=DUNGEON[DUNGEON.length-1].cmd;c.minus.run&&c.minus.run[0]==='ashReanimate'&&!c.minus.target"),'-3 = ashReanimate (no destroy target)');

// --- Bullet 27: the +1 spawn makes a hasty, ready 1/1 ---
ev("fresh('standard');S.tokens=[];applyRun(['spawn','Ash Soldier',1,1,['haste'],'R']);");
ok(ev("S.tokens.length===1"),'+1 creates one token');
ok(ev("var t=S.tokens[0];t.name==='Ash Soldier'&&t.p===1&&t.t===1"),'token is a 1/1 Ash Soldier');
ok(ev("var t=S.tokens[0];t.kw.includes('haste')&&t.sick===false"),'has haste and is NOT summoning-sick');
ok(ev("var t=S.tokens[0];t.token===true"),'flagged as a token');
ok(ev("var y=S.youLife;true")&&ev("S.youLife===40"),'player life untouched by +1 (no selfLoss)');

// --- Bullet 28 (revised): the -3 is a DELVE reanimator — exile N cards as fuel, reanimate a creature with mv<=N ---
ev(`fresh('standard');
   var cks=Object.keys(FX).filter(k=>FX[k].type==='creature').sort((a,b)=>(FX[a].cost||0)-(FX[b].cost||0));
   var tk=cks.find(k=>(FX[k].cost||0)>=1&&(FX[k].cost||0)<=3)||cks[0];   // one target creature with a small positive mv
   var tc=FX[tk].cost||0;
   var fuelKey=Object.keys(FX).find(k=>FX[k].type==='land')||cks[0];     // fuel can be ANY cards
   S.gy=[{key:tk}]; for(var j=0;j<tc;j++)S.gy.push({key:fuelKey}); S.gy.push({key:fuelKey}); // target + tc fuel + 1 spare
   S.exile=[];S.tokens=[];S._tc=tc;S._tk=tk;
   applyRun(['ashReanimate']);`);
ok(ev("S._tc>=1"),'target creature has a positive mana value (N>=1)');
ok(ev("S.tokens.length===1"),'reanimates exactly one creature');
ok(ev("S.tokens[0].key===S._tk"),'reanimates the (only) eligible creature, not a fuel card');
ok(ev("S.exile.length===S._tc"),'exiles exactly N = the reanimated creature\'s mana value as fuel');
ok(ev("var k=S.tokens[0].key;(FX[k].cost||0)<=S._tc"),'reanimated body has mana value <= N');
ok(ev("S.gy.length===1"),'only N fuel + the target leave the graveyard; the spare stays');

// the AI picks the HIGHEST-value feasible creature when several are available
ev(`fresh('standard');
   var cks=Object.keys(FX).filter(k=>FX[k].type==='creature');
   var weak=cks.slice().sort((a,b)=>((FX[a].p||0)+(FX[a].t||0))-((FX[b].p||0)+(FX[b].t||0)))[0];
   var strong=cks.slice().filter(k=>(FX[k].cost||0)<=3).sort((a,b)=>((FX[b].p||0)+(FX[b].t||0))-((FX[a].p||0)+(FX[a].t||0)))[0];
   S.gy=[{key:weak},{key:strong},{key:weak},{key:weak}];S.exile=[];S.tokens=[];S._strong=strong;
   applyRun(['ashReanimate']);`);
ok(ev("S.tokens.length===1 && S.tokens[0].key===S._strong"),'reanimates the biggest feasible body, exiling the weaker cards as fuel');

// empty graveyard = clean no-op, no throw
ev("S.gy=[];S.exile=[];S.tokens=[];applyRun(['ashReanimate']);");
ok(ev("S.tokens.length===0&&S.exile.length===0"),'empty-gy ashReanimate is a clean no-op');

// a lone creature with no fuel available cannot be reanimated (needs N>=mv OTHER cards)
ev(`fresh('standard');var bigk=Object.keys(FX).filter(k=>FX[k].type==='creature'&&(FX[k].cost||0)>=2)[0];S.gy=[{key:bigk}];S.exile=[];S.tokens=[];applyRun(['ashReanimate']);`);
ok(ev("S.tokens.length===0"),'a costly creature alone (no fuel) cannot be reanimated');

// --- AI: reanimator-aware minus + empty-gy fizzle guard ---
// craft a walker with the ash abilities
const mkW=`var w={id:1,loyalty:4,baseLoy:4,ultThreshold:7,isWalker:true,
  wplus:{sign:1,n:'Ashen Muster',run:['spawn','Ash Soldier',1,1,['haste'],'R']},
  wminus:{sign:-3,n:'Grasping Ash',run:['ashReanimate']},
  wult:{sign:-7,n:'Avatar of Ash',run:['spawn','Vael Avatar',8,8,['trample','haste','lifelink'],'RB'],ult:true}};`;
ev(`fresh('standard');S.gy=[];S.my.creatures=[{id:9,name:'Bomb',p:7,t:7,baseP:7,baseT:7,kw:[],prot:[],other:[]}];${mkW}S._pick=pickWalkerAbility(w);`);
ok(ev("S._pick&&S._pick.sign===1"),'empty-gy: AI builds (+1), does NOT fire the fizzling -3 even with a player bomb out');
// with a strong reanimation target and low loyalty progress, -3 becomes a legal choice (not forced by RNG here — just assert it is not blocked by the guard)
ev(`var cks=Object.keys(FX).filter(k=>FX[k].type==='creature'&&(FX[k].cost||0)<=4);S.gy=[{key:cks[0]},{key:cks[1]},{key:cks[2]},{key:cks[3]}];S._best=_ashReanimBest();`);
ok(ev("S._best>=0"),'_ashReanimBest finds a target when gy has eligible creatures');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P49.11 FAILED':'P49.11 PASSED');
process.exit(fail?1:0);
