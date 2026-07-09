// P50.15: unified attack-tax model (supersedes P50.4/P50.5).
//   ONE per-attacker tax with two payers (enemy pays / player pays), a target enum (both/face/walkers),
//   a shared generic rule (setAtkTaxRule) AND restored per-card `catk` drawers. The legacy P50.4
//   attackTaxEnemy emblem is still READ (old saves) but retired from the picker.
//   • enemyAttackTax() = PLAYER pays (reminder) = payer:'player' rule + ENEMY-board catk
//   • attackTax()      = ENEMY pays (enforced)  = payer:'enemy' rule + PLAYER-board catk + legacy emblem
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// ================= per-card catk + helpers are RESTORED =================
ok(ev("typeof setCatk")==="function",   'restore: setCatk() exists');
ok(ev("typeof setObjCatk")==="function",'restore: setObjCatk() exists');
ok(ev("typeof catkTgtSel")==="function",'restore: catkTgtSel() exists');
ok(ev("typeof setAtkTaxRule")==="function",'unify: setAtkTaxRule() exists');
ok(ev("typeof setEnemyAtkRule")==="undefined",'unify: old setEnemyAtkRule() removed');
// drawers render an attack-tax row again
ok(/attack tax/i.test(ev("creatureDrawer({id:7,kw:[],prot:[],color:[],block:null})")), 'restore: creatureDrawer has an attack-tax row');
ok(/attack tax/i.test(ev("walkerDrawer({id:8,color:[],prot:[]})")), 'restore: walkerDrawer has an attack-tax row');
ok(/attack tax/i.test(ev("permDrawer('artifacts',{id:9,color:[],prot:[]})")), 'restore: permDrawer has an attack-tax row');
ok(/attack tax/i.test(ev("enemyDrawer('token',5,{id:5,color:[],prot:[]})")), 'restore: enemyDrawer has an attack-tax row (player pays)');
// cast form: attack-tax fields back, ward still present
ok(/castAtkN/.test(ev("castFormHTML()")) && /castAtkType/.test(ev("castFormHTML()")) && /castAtkTgt/.test(ev("castFormHTML()")), 'restore: cast form has the attack-tax ids');
ok(/castWardN/.test(ev("castFormHTML()")), 'restore: per-card ward still on the cast form');
// the unified UI row carries a payer selector
ok(/enAtkPayer/.test(ev("document.body.innerHTML")), 'unify: the ⚔ attack-tax row has a who-pays (enAtkPayer) selector');

// ================= setCatk / setObjCatk mutate live objects =================
ev("fresh('standard');S.my.creatures=[{id:1,name:'A',p:2,t:2,phased:false}];setCatk('creatures',1,'amt',3)");
ok(ev("S.my.creatures[0].catk && S.my.creatures[0].catk.amt")===3 && ev("S.my.creatures[0].catk.tgt")==='both', 'setCatk sets amt (default tgt both, type mana)');
ev("setCatk('creatures',1,'amt',0)");
ok(ev("S.my.creatures[0].catk")===null, 'setCatk with amt 0 clears the tax');

// ================= attackTax() — the ENEMY pays =================
// (a) per-card catk on YOUR permanents
ev("fresh('standard');S.emblemsEnemy=[];S.rules=[];S.my.creatures=[{id:1,name:'A',phased:false,catk:{amt:2,type:'mana',tgt:'both'}}];S.my.artifacts=[];S.my.enchants=[];S.my.walkers=[]");
ok(ev("attackTax().mana")===2 && ev("attackTax().life")===0, 'attackTax: your creature catk → enemy owes 2 mana/attacker');
// (b) generic payer:'enemy' rule adds on top
ev("setAtkTaxRule(1,'life','both','enemy')");
ok(ev("attackTax().life")===1 && ev("attackTax().mana")===2, 'attackTax: enemy-payer generic rule adds 1 life on top of the 2 mana');
// (c) legacy emblem still counted
ev("S.emblemsEnemy=[{id:9,name:'AT',auto:{k:'attackTaxEnemy',n:1},autoOn:true,static:true,kind:'emblem'}]");
ok(ev("attackTax().mana")===3, 'attackTax: a legacy attackTaxEnemy emblem still adds (2 catk + 1 emblem = 3 mana)');
// (d) tgt=walkers only bites when YOU have a non-phased walker
ev("fresh('standard');S.emblemsEnemy=[];S.rules=[];S.my.creatures=[{id:1,name:'A',phased:false,catk:{amt:5,type:'mana',tgt:'walkers'}}];S.my.artifacts=[];S.my.enchants=[];S.my.walkers=[]");
ok(ev("attackTax().mana")===0, 'attackTax: a walkers-only tax is dormant when you control no walker');
ev("S.my.walkers=[{id:2,name:'W',phased:false}]");
ok(ev("attackTax().mana")===5, 'attackTax: the walkers-only tax activates once you control a walker');

// ================= enemyAttackTax() — the PLAYER pays (reminder) =================
// per-card catk on an ENEMY permanent + a payer:'player' generic rule
ev("fresh('standard');S.rules=[];S.tokens=[{id:3,name:'E',phased:false,catk:{amt:4,type:'mana',tgt:'both'}}];S.enemyArtifacts=[];S.enemyEnchants=[];S.enemyWalkers=[]");
ok(ev("enemyAttackTax().mana")===4, 'enemyAttackTax: an enemy creature catk → YOU owe 4 mana/attacker');
ev("setAtkTaxRule(2,'life','both','player')");
ok(ev("enemyAttackTax().life")===2 && ev("enemyAttackTax().mana")===4, 'enemyAttackTax: player-payer generic rule adds 2 life');
// the enemy-payer rule must NOT leak into the player-pays reminder
ev("setAtkTaxRule(9,'mana','both','enemy')");
ok(ev("enemyAttackTax().mana")===4, 'separation: an enemy-payer rule does not inflate the player-pays reminder');
ok(ev("S.rules.filter(r=>r._atkRule).length")===2, 'separation: the two payers coexist as two distinct rules');
// clearing one payer leaves the other
ev("setAtkTaxRule(0,'mana','both','player')");
ok(ev("S.rules.filter(r=>r._atkRule).length")===1 && ev("S.rules.find(r=>r._atkRule).payer")==='enemy', 'separation: clearing the player rule leaves the enemy rule');

// ================= payAttackTax still ENFORCES (skips unaffordable) =================
ev("fresh('standard');S.rules=[];S.emblemsEnemy=[{id:1,name:'AT',auto:{k:'attackTaxEnemy',n:2},autoOn:true,static:true,kind:'emblem'}];S.my.creatures=[];S.my.artifacts=[];S.my.enchants=[];S.my.walkers=[];S.bossMana=5;S.bossManaMax=6;S.bossPool=null;S.bossManaFrozen=0;S.boss.life=40;window._A=[{id:11,name:'a',p:3,t:3},{id:12,name:'b',p:2,t:2},{id:13,name:'c',p:1,t:1}];window._pay=payAttackTax(window._A)");
ok(ev("window._pay.kept.length")===2, 'payAttackTax: 3 attackers, 5 mana, 2/each → pays for 2');
ok(ev("window._pay.skipped.length")===1 && ev("window._pay.skipped[0].id")===13, 'payAttackTax: the weakest attacker (unpayable) stays home');
ok(ev("window._pay.pm")===4 && ev("S.bossMana")===1, 'payAttackTax: 4 mana paid, pool 5→1');

// ================= readCastForm round-trips catk =================
ev("fresh('standard');openCast();document.getElementById('castType').value='creature';document.getElementById('castAtkN').value='3';document.getElementById('castAtkTgt').value='walkers';document.getElementById('castAtkType').value='life';window._cf=readCastForm();");
ok(ev("window._cf&&window._cf.props&&window._cf.props.catk&&window._cf.props.catk.amt")===3 && ev("window._cf.props.catk.tgt")==='walkers' && ev("window._cf.props.catk.type")==='life', 'readCastForm: the attack-tax fields build a catk {amt,type,tgt}');

// ================= migrate keeps + normalizes catk and stamps the rule payer =================
ev("window._sv={my:{creatures:[{id:1,name:'x',p:1,t:1,catk:{amt:3,type:'gold',tgt:'weird'}}],artifacts:[],enchants:[],walkers:[],emblems:[],resources:[]},tokens:[{id:2,name:'t',catk:{amt:0,type:'life'}}],enemyArtifacts:[],enemyEnchants:[],enemyWalkers:[],rules:[{id:5,name:'Attack tax',_atkRule:true,atk:{amt:2,type:'mana',tgt:'both'}}]};migrate(window._sv);");
ok(ev("window._sv.my.creatures[0].catk && window._sv.my.creatures[0].catk.amt")===3, 'migrate: a valid legacy catk is KEPT');
ok(ev("window._sv.my.creatures[0].catk.tgt")==='both' && ev("window._sv.my.creatures[0].catk.type")==='mana', 'migrate: catk.tgt/type normalized to the enum');
ok(ev("window._sv.tokens[0].catk")===null, 'migrate: a zero-amount catk is nulled');
ok(ev("window._sv.rules[0].payer")==='player', 'migrate: an old pre-payer _atkRule is stamped payer:player');

// ================= emblem template retired from the picker (reader stays) =================
ok(!ev("ENEMY_EMBLEMS.some(t=>t.auto&&t.auto.k==='attackTaxEnemy')"), 'retire: the attackTaxEnemy template is gone from the picker');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.15 ATTACK-TAX FAILED':'P50.15 ATTACK-TAX PASSED');
process.exit(fail?1:0);
