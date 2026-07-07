// P49.3(#20/#21): enemy instants auto-cast (spend mana + card→graveyard on resolve), still counterable; combat proposal path intact.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");
// pick a non-targeted instant FX (always 'would do something', clears the response gate)
ev("window.__ik=Object.keys(FX).find(k=>FX[k].type==='instant'&&!FX[k].target&&(FX[k].cost||0)<=5);");
ok(ev("!!window.__ik"),'found a non-targeted instant FX to test with: '+ev("window.__ik"));

// --- Bullet 20: auto-cast in RESPONSE to a player cast ---
ev("S.activeTurn='you';S.combat=null;S.stackProposal=null;S.hand=[{id:900,key:window.__ik}];S.bossMana=8;S.bossManaFrozen=0;S.plays=[];S.gy=[];var cost=FX[window.__ik].cost||0;window.__cost=cost;var item={id:777,_player:true,name:'YourSpell',ctype:'instant',status:'pending'};enemyRespondToCast(item);");
ok(ev("S.stackProposal===null"),'no stack PROPOSAL is created (auto-cast, not proposed)');
ok(ev("S.plays.some(p=>p._instant&&p._respondingTo===777)"),'an enemy instant is on the stack, responding to the player spell');
ok(ev("S.bossMana===8-window.__cost"),'enemy mana fell by the instant cost');
ok(ev("S.hand.length===0"),'the instant card left the enemy hand');
// resolve it -> card goes to graveyard
ev("var i=S.plays.findIndex(p=>p._instant);var before=S.gy.length;resolvePlay(i);window.__gyDelta=S.gy.length-before;");
ok(ev("window.__gyDelta>=1"),'resolving the enemy instant routes its card to the graveyard');

// --- still counterable: counterPlay works on the auto-cast instant ---
ev("S.hand=[{id:901,key:window.__ik}];S.bossMana=8;S.plays=[];S.gy=[];var item2={id:778,_player:true,name:'YS2',ctype:'instant',status:'pending'};enemyRespondToCast(item2);var ci=S.plays.findIndex(p=>p._instant);S.plays[ci].cantCounter=false;counterPlay(ci);");
ok(ev("S.plays.every(p=>!(p._instant&&p.status==='pending'))"),'the player can still counter the auto-cast instant');

// --- Bullet 21: proactive window also auto-fires ---
ev("fresh('standard');S.activeTurn='you';S.combat=null;S.stackProposal=null;S.plays=[];S.hand=[{id:902,key:window.__ik}];S.bossMana=8;enemyInstant('your upkeep');");
ok(ev("S.stackProposal===null"),'proactive window makes no proposal');
ok(ev("S.plays.some(p=>p._instant)"),'proactive window auto-cast the instant');

// --- combat proposal path (context: combat) is UNAFFECTED ---
ok(ev("typeof enemyCombatTrick==='function'&&typeof approveCombatTrick==='function'"),'combat-trick functions still present');
ev("fresh('standard');S.stackProposal={context:'combat',forName:'x',candidates:[],choice:null};");
ok(ev("proposalLive()===false||proposalLive()===true"),'proposalLive still evaluates the combat context without throwing');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,8));fail++;}
console.log(fail?'P49.3 FAILED':'P49.3 PASSED');
process.exit(fail?1:0);
