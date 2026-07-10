// P51.9: swing() shows a centered attacker-target popup ONLY when non-face targets exist; confirming feeds the target map into combat.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("fresh('standard')");
ev("S.activeTurn='you';S.phase=4;"); // your combat phase

// helper: put a ready attacker on the player board
const addAtk=()=>ev("S.my.creatures=[{id:S.nextId++,name:'Raptor',p:3,t:3,baseP:3,baseT:3,kw:[],color:[],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,_atk:true,dies:'graveyard'}]");

// 1. No non-face targets -> no popup, combat opens directly.
addAtk();
ev("S.enemyWalkers=[];S.battles=[];S.cmd={isWalker:false,inPlay:false};");
ev("swing()");
ok(!ev("$('overlay').classList.contains('show')"), 'no target popup when only the boss face exists');
ok(ev("!!S.combat"), 'combat opens directly');
ev("cancelCombat()");

// 2. With an enemy walker -> the popup appears (overlay shown, per-attacker target select).
addAtk();
ev("S.enemyWalkers=[{id:S.nextId++,name:'Ash',loyalty:5,phased:false}];S.battles=[];");
ev("swing()");
ok(ev("$('overlay').classList.contains('show')"), 'target popup appears when an enemy walker exists');
ok(!ev("!!S.combat"), 'combat NOT yet opened (waiting on the picker)');
const body=ev("$('modalBody').innerHTML");
ok(/Choose attack targets/.test(body), 'popup titled "Choose attack targets"');
ok(/id="atkpick_/.test(body), 'per-attacker target select rendered');
ok(/w:/.test(body), 'walker is an option (w:id)');

// 3. Confirm with the walker chosen -> combat opens with that target mapped.
const aid=ev("S.my.creatures[0].id");
const wid=ev("S.enemyWalkers[0].id");
ev(`$('atkpick_${aid}').value='w:${wid}'`);
ev("confirmAtkTargets()");
ok(ev("!!S.combat"), 'combat opens after confirm');
ok(ev(`''+S.combat.target['${aid}']==='w:${wid}'`), 'chosen walker target flows into S.combat.target');
ok(!ev("$('overlay').classList.contains('show')"), 'popup closed after confirm');
ev("cancelCombat()");

// 4. With a boss siege -> popup appears with a b: option.
addAtk();
ev("S.enemyWalkers=[];S.battles=[{id:S.nextId++,name:'Siege',def:6,maxDef:6,side:'boss',defeated:false,tick:2}];S.cmd={isWalker:false,inPlay:false};");
ev("swing()");
ok(ev("$('overlay').classList.contains('show')"), 'popup appears for a boss siege');
ok(/b:/.test(ev("$('modalBody').innerHTML")), 'siege is an option (b:id)');
ev("closeAtkTargetPicker()");
ok(!ev("!!S.combat"), 'cancel leaves no combat');

// 5. Source: swing gates the popup on non-face targets.
ok(/if\(ewk\.length\|\|ebat\.length\)\{openAtkTargetPicker/.test(src), 'swing() gates the popup on ewk/ebat existence');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.9 FAILED':'P51.9 PASSED');
process.exit(fail?1:0);
