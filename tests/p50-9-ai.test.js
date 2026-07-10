// P50.9: smarter enemy strategy — (A) attacks: hold back a bomb the player can GANG-kill favorably;
// (B) blocks: don't throw away a valuable body to chump a non-lethal hit when the boss is healthy;
// (C) mana: develop instead of sandbagging interaction when clearly behind on board.
// All new smarts gate on enemyLuck()>=0 (easy stays legacy).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const tok=(id,name,p,t)=>`{id:${id},name:'${name}',p:${p},t:${t},baseP:${p},baseT:${t},kw:[],plus:0,minus:0,other:[],prot:[],tapped:false,sick:false,phased:false,token:true,mana:0,strength:'mid'}`;
const cre=(id,name,p,t,str)=>`{id:${id},name:'${name}',p:${p},t:${t},baseP:${p},baseT:${t},kw:[],plus:0,minus:0,other:[],prot:[],tapped:false,phased:false,strength:'${str||'mid'}'}`;

// ============ (A) ATTACKS: don't alpha-strike a bomb into a favourable player gang-block ============
const setupA=`fresh('standard');S.youLife=40;
  S.tokens=[${tok(1,'Bomb',6,6)}];
  S.my.creatures=[${cre(2,'A',4,4)},${cre(3,'B',4,4)}];`;
ev(setupA);
ok(ev("vaelAttackers().length")===0, 'P50.9A: standard — the enemy HOLDS BACK a 6/6 the player can gang-kill with two 4/4s (favourable trade)');
ev("S.diff='easy';"+setupA.replace("fresh('standard')","0"));   // keep board, just re-eval on easy
ev("S.diff='easy'");
ok(ev("vaelAttackers().length")===1, 'P50.9A: easy — legacy behaviour, the bomb still attacks (no gang-block awareness)');
// a bomb the player CANNOT profitably gang-kill still attacks at standard (two 1/1s can't kill a 6/6)
ev(`fresh('standard');S.youLife=40;S.tokens=[${tok(1,'Bomb',6,6)}];S.my.creatures=[${cre(2,'A',1,1)},${cre(3,'B',1,1)}];`);
ok(ev("vaelAttackers().length")===1, 'P50.9A: standard — a bomb the player can only chump (not favourably kill) still attacks');

// ============ (B) BLOCKS: preserve a valuable body vs a non-lethal big attacker when the boss is healthy ==
const bStd=(life)=>ev(`fresh('standard');S.boss.life=${life};S.boss.max=40;S.tokens=[${tok(1,'Big',10,10)}];window._ATK=[${cre(2,'Huge',16,16)}];var a=aiBlocks(window._ATK);Object.keys(a).filter(k=>a[k]&&a[k].length).length`);
ok(bStd(40)===0, 'P50.9B: standard — the enemy does NOT chump its 10/10 vs a non-lethal 16/16 when the boss is at full life');
ev("S.diff='easy'");
ok(ev(`S.boss.life=40;S.tokens=[${tok(1,'Big',10,10)}];window._ATK=[${cre(2,'Huge',16,16)}];var a=aiBlocks(window._ATK);Object.keys(a).filter(k=>a[k]&&a[k].length).length`)===1, 'P50.9B: easy — legacy, it chumps the big attacker');
ok(bStd(10)>=1, 'P50.9B: standard — when the boss is in DANGER (low life), it DOES chump');
// a cheap body IS spent to chump even at full life (good trade, not a throw-away)
ok(ev(`fresh('standard');S.boss.life=40;S.boss.max=40;S.tokens=[${tok(1,'Chaff',1,1)}];window._ATK=[${cre(2,'Huge',16,16)}];var a=aiBlocks(window._ATK);Object.keys(a).filter(k=>a[k]&&a[k].length).length`)===1, 'P50.9B: standard — a CHEAP body (1/1) is still spent to chump a huge attacker (not a throw-away)');

// ============ (C) MANA: develop instead of sandbagging interaction when behind on board ============
ev("FX._tc={n:'Test Counter',type:'instant',cost:2,color:'',target:'counter'};");
const setupC=`S.bossMana=10;S.bossManaMax=10;S.bossPool=null;S.bossSrc=null;S.bossManaFrozen=0;S.youLife=40;S.hand=[{key:'_tc'}];S.cmd={inPlay:false};`;
// enemy AHEAD on board → holds up mana for the counter (reserve = its cost 2)
ev(`fresh('standard');${setupC}S.tokens=[${tok(1,'Ogre',8,8)}];S.my.creatures=[];`);
ok(ev("enemyHoldUpReserve()")===2, 'P50.9C: ahead on board → reserves 2 mana to hold up the counter');
// enemy BEHIND on board → develops (reserve 0) even with a holdable counter in hand
ev(`S.tokens=[];S.my.creatures=[${cre(2,'X',8,8,'top')},${cre(3,'Y',8,8,'top')}];`);
ok(ev("enemyHoldUpReserve()")===0, 'P50.9C: BEHIND on board → reserve 0 (develop instead of sandbagging a counter)');
// easy is always tap-happy
ev("S.diff='easy'");
ok(ev("enemyHoldUpReserve()")===0, 'P50.9C: easy — always tap-happy (reserve 0)');

// ============ regression: the AI functions still run cleanly on a normal board ============
ev(`fresh('standard');S.tokens=[${tok(1,'G',3,3)}];S.my.creatures=[${cre(2,'D',3,3)}];`);
ok(Array.isArray(ev("vaelAttackers()")), 'P50.9: vaelAttackers returns an array (no throw)');
ok(typeof ev("aiBlocks([])")==='object', 'P50.9: aiBlocks returns an object (no throw)');
ok(typeof ev("enemyHoldUpReserve()")==='number', 'P50.9: enemyHoldUpReserve returns a number (no throw)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,8));fail++;}
console.log(fail?'P50.9 FAILED':'P50.9 PASSED');
process.exit(fail?1:0);
