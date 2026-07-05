// P39: attack-target selection on your swing (enemy face / enemy planeswalker / boss siege) + enemy defends sieges.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const atk=(p)=>`{id:S.nextId++,name:'A',p:${p},t:${p},baseP:${p},baseT:${p},kw:[],color:['G'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:false,dies:'graveyard',_atk:true}`;

ev("fresh('standard')");

// setup: your attackers + an enemy walker + a boss siege
ev(`S.my.creatures=[${atk(3)},${atk(4)},${atk(2)}]`);
ev("S.enemyWalkers=[mkEnemyWalker({name:'EW',loy:6,ultThreshold:7,colors:['R'],plus:{sign:1,n:'p'},minus:{sign:-2,n:'m'},ult:{sign:-7,n:'u'}})]");
ev("S.battles=[{id:5001,name:'Siege',def:6,maxDef:6,side:'boss',tick:2,defeated:false}]");
ev("S.boss.life=40;S.boss.max=40");

// P39.1: the resolver offers face/walker/siege targets
ev("openCombat('you',S.my.creatures.slice(),vaelDefenders(),{})");
let html=ev("(renderCombat(),document.getElementById('combatBox').innerHTML)");
ok(/w:/.test(html) && /b:/.test(html), 'your-swing resolver offers walker (w:) + siege (b:) targets');
ok(/⚔/.test(html), 'and the enemy face option');

// route: att1(3)→face, att2(4)→walker, att3(2)→siege
const ids=ev("S.combat.attackers.map(a=>a.id)");
ev(`combatTarget(${ids[0]},'boss');combatTarget(${ids[1]},'w:'+S.enemyWalkers[0].id);combatTarget(${ids[2]},'b:5001')`);
// prediction reflects the split
const pred=ev("(predictCombat(),document.getElementById('combatPred').innerHTML)");
ok(/to EW/.test(pred) && /to Siege/.test(pred), 'prediction splits damage across face / walker / siege ('+pred.replace(/<[^>]+>/g,'')+')');

// approve → damage routes correctly
const bl0=ev("S.boss.life"), loy0=ev("S.enemyWalkers[0].loyalty"), def0=ev("S.battles[0].def");
ev("approveCombat()");
ok(ev("S.boss.life")===bl0-3, 'face-targeted 3/3 dealt 3 to the enemy ('+bl0+'→'+ev("S.boss.life")+')');
ok(ev("S.enemyWalkers[0].loyalty")===loy0-4, 'walker-targeted 4/4 dealt 4 loyalty (6→'+ev("S.enemyWalkers[0].loyalty")+')');
ok(ev("S.battles[0].def")===def0-2, 'siege-targeted 2/2 removed 2 defense (6→'+ev("S.battles[0].def")+')');

// P39.1: breaking a boss siege at 0 fires the break payoff (siege deals maxDef to the enemy)
ev("fresh('standard');S.my.creatures=["+atk(6)+"];S.battles=[{id:5002,name:'Siege',def:5,maxDef:5,side:'boss',tick:0,defeated:false}];S.boss.life=40;S.enemyWalkers=[]");
ev("openCombat('you',S.my.creatures.slice(),vaelDefenders(),{})");
ev(`combatTarget(${ev("S.combat.attackers[0].id")},'b:5002')`);
ev("approveCombat()");
ok(ev("(S.battles.find(b=>b.id===5002)||{}).defeated")===true, 'a boss siege at 0 def is defeated');
ok(ev("S.boss.life")===40-5, 'the siege break dealt its maxDef (5) to the enemy');

// with nothing but the face to hit, no target select appears (behaves as before)
ev("fresh('standard');S.my.creatures=["+atk(3)+"];S.enemyWalkers=[];S.battles=[];S.cmd.isWalker=false");
ev("openCombat('you',S.my.creatures.slice(),vaelDefenders(),{})");
html=ev("(renderCombat(),document.getElementById('combatBox').innerHTML)");
ok(!/w:|b:/.test(html) && !/>target</.test(html), 'no target select when only the enemy face exists');

// P39.2: the enemy defends a valuable (healing) siege — blocks an attacker aimed at it
ev("fresh('standard');S.diff='standard';S.my.creatures=["+atk(3)+"];S.enemyWalkers=[];S.boss.life=40");
ev("S.battles=[{id:5003,name:'Siege',def:6,maxDef:6,side:'boss',tick:2,defeated:false}]");// still healing → worth defending
ev("S.tokens=["+`{id:S.nextId++,name:'Guard',p:3,t:3,baseP:3,baseT:3,kw:[],color:['B'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:true,dies:'graveyard'}`+"]");
ev("openCombat('you',S.my.creatures.slice(),vaelDefenders(),{})");
const aid=ev("S.combat.attackers[0].id");
ev(`combatTarget(${aid},'b:5003')`);
ok(ev(`(S.combat.assign[${aid}]||[]).length`)>=1, 'P39.2 standard: enemy throws a blocker in front of the siege');
// easy does NOT auto-defend
ev("fresh('standard');S.diff='easy';S.my.creatures=["+atk(3)+"];S.enemyWalkers=[];S.battles=[{id:5004,name:'Siege',def:6,maxDef:6,side:'boss',tick:2,defeated:false}]");
ev("S.tokens=["+`{id:S.nextId++,name:'Guard',p:3,t:3,baseP:3,baseT:3,kw:[],color:['B'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:true,dies:'graveyard'}`+"]");
ev("openCombat('you',S.my.creatures.slice(),vaelDefenders(),{})");
const aid2=ev("S.combat.attackers[0].id");
ev(`combatTarget(${aid2},'b:5004')`);
ok(ev(`(S.combat.assign[${aid2}]||[]).length`)===0, 'P39.2 easy: enemy does NOT auto-defend the siege (difficulty scales)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P39 FAILED':'P39 PASSED');
process.exit(fail?1:0);
