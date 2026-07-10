// P50.16: attack tax is PER-CARD ONLY (on the permanents themselves, `catk`) + a GLOBAL enemy-pays
//   EMBLEM (the P50.4 attackTaxEnemy). It is NEVER an S.rules "enchantment" entry (no Destroy row in the
//   "Enchantments in play" box). Supersedes P50.15's generic setAtkTaxRule (removed).
//   • enemyAttackTax() = PLAYER pays (reminder) = per-card catk on ENEMY permanents (every type).
//   • attackTax()      = ENEMY pays (enforced) = per-card catk on YOUR permanents + the attackTaxEnemy emblem.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// ================= the generic S.rules mechanism is GONE =================
ok(ev("typeof setAtkTaxRule")==="undefined", 'P50.16: the generic setAtkTaxRule() is removed');
ok(!/enAtkPayer|enAtkAmt/.test(ev("document.body.innerHTML")), 'P50.16: the generic ⚔ attack-tax input row (enAtkAmt/enAtkPayer) is gone');
// a stray boss _atkRule in S.rules must NOT affect either tax (decoupled from S.rules entirely)
ev("fresh('standard');S.emblemsEnemy=[];S.rules=[{id:1,name:'Attack tax',side:'boss',_atkRule:true,payer:'enemy',atk:{amt:9,type:'mana',tgt:'both'}}];S.my.creatures=[];S.my.artifacts=[];S.my.enchants=[];S.my.walkers=[]");
ok(ev("attackTax().mana")===0 && ev("attackTax().life")===0, 'P50.16: a leftover _atkRule in S.rules does NOT feed attackTax()');
ok(ev("enemyAttackTax().mana")===0, 'P50.16: a leftover _atkRule in S.rules does NOT feed enemyAttackTax()');

// ================= per-card catk helpers + drawer rows exist on EVERY permanent type =================
ok(ev("typeof setCatk")==="function" && ev("typeof setObjCatk")==="function" && ev("typeof catkTgtSel")==="function", 'per-card setters exist');
ok(/attack tax/i.test(ev("creatureDrawer({id:7,kw:[],prot:[],color:[],block:null})")), 'creatureDrawer has an attack-tax row');
ok(/attack tax/i.test(ev("walkerDrawer({id:8,color:[],prot:[]})")), 'walkerDrawer has an attack-tax row');
ok(/attack tax/i.test(ev("permDrawer('artifacts',{id:9,color:[],prot:[]})")), 'permDrawer (your artifacts/enchants) has an attack-tax row');
ok(/attack tax/i.test(ev("enemyDrawer('token',5,{id:5,color:[],prot:[]})")), 'enemyDrawer (enemy creatures) has an attack-tax row');
ok(/attack tax/i.test(ev("enemyPermDrawer('eart',{id:6,color:[],prot:[]})")), 'P50.16: enemyPermDrawer (enemy ARTIFACTS/ENCHANTS) has an attack-tax row');

// ================= the GLOBAL enemy-pays tax is an EMBLEM (not an enchantment/rule) =================
ok(ev("ENEMY_EMBLEMS.some(t=>t.auto&&t.auto.k==='attackTaxEnemy'&&t.static)"), 'P50.16: the attackTaxEnemy emblem template is back in the picker');
ok(ev("emblemValueLabel('attackTaxEnemy')")==='N mana/attacker', 'emblem value label is per-attacker mana');
// added via the real adder → lands in S.emblemsEnemy (Emblems box: persists, ✕-removable, NO Destroy)
ev("fresh('standard');var i=ENEMY_EMBLEMS.findIndex(t=>t.auto&&t.auto.k==='attackTaxEnemy');fillEmblemTemplates();var sel=document.getElementById('embTemplate');if(sel)sel.value=String(i);addEnemyEmblem();");
ok(ev("S.emblemsEnemy.some(e=>e.auto&&e.auto.k==='attackTaxEnemy')"), 'addEnemyEmblem places the attack-tax emblem in S.emblemsEnemy (the Emblems box)');
ok(ev("(S.rules||[]).length")===0, 'P50.16: adding the emblem creates NO S.rules entry (nothing in the Enchantments box)');

// ================= attackTax() — the ENEMY pays (per-card + emblem) =================
ev("fresh('standard');S.emblemsEnemy=[];S.rules=[];S.my.creatures=[{id:1,name:'A',phased:false,catk:{amt:2,type:'mana',tgt:'both'}}];S.my.artifacts=[{id:2,name:'Art',phased:false,catk:{amt:1,type:'life',tgt:'both'}}];S.my.enchants=[];S.my.walkers=[]");
ok(ev("attackTax().mana")===2 && ev("attackTax().life")===1, 'attackTax: your creature (2 mana) + your ARTIFACT (1 life) both count');
ev("S.emblemsEnemy=[{id:9,name:'AT',auto:{k:'attackTaxEnemy',n:3},autoOn:true,static:true,kind:'emblem'}]");
ok(ev("attackTax().mana")===5, 'attackTax: the emblem adds on top (2 catk + 3 emblem = 5 mana)');
// tgt=walkers only bites when YOU have a non-phased walker
ev("fresh('standard');S.emblemsEnemy=[];S.rules=[];S.my.creatures=[{id:1,name:'A',phased:false,catk:{amt:5,type:'mana',tgt:'walkers'}}];S.my.artifacts=[];S.my.enchants=[];S.my.walkers=[]");
ok(ev("attackTax().mana")===0, 'attackTax: a walkers-only tax is dormant with no walker');
ev("S.my.walkers=[{id:2,name:'W',phased:false}]");
ok(ev("attackTax().mana")===5, 'attackTax: the walkers-only tax activates once you control a walker');

// ================= enemyAttackTax() — the PLAYER pays (per-card on ENEMY perms incl. artifacts/enchants) =================
ev("fresh('standard');S.rules=[];S.tokens=[];S.enemyArtifacts=[{id:3,name:'EArt',phased:false,catk:{amt:4,type:'mana',tgt:'both'}}];S.enemyEnchants=[{id:4,name:'EEnch',phased:false,catk:{amt:2,type:'life',tgt:'both'}}];S.enemyWalkers=[]");
ok(ev("enemyAttackTax().mana")===4 && ev("enemyAttackTax().life")===2, 'enemyAttackTax: an enemy ARTIFACT (4 mana) + enemy ENCHANT (2 life) → YOU owe both');

// ================= payAttackTax still ENFORCES (skips unaffordable) =================
ev("fresh('standard');S.rules=[];S.emblemsEnemy=[{id:1,name:'AT',auto:{k:'attackTaxEnemy',n:2},autoOn:true,static:true,kind:'emblem'}];S.my.creatures=[];S.my.artifacts=[];S.my.enchants=[];S.my.walkers=[];S.bossMana=5;S.bossManaMax=6;S.bossPool=null;S.bossManaFrozen=0;S.boss.life=40;window._A=[{id:11,name:'a',p:3,t:3},{id:12,name:'b',p:2,t:2},{id:13,name:'c',p:1,t:1}];window._pay=payAttackTax(window._A)");
ok(ev("window._pay.kept.length")===2 && ev("window._pay.skipped.length")===1, 'payAttackTax: 3 attackers, 5 mana, 2/each → pays 2, 1 stays home');
ok(ev("window._pay.pm")===4 && ev("S.bossMana")===1, 'payAttackTax: 4 mana paid, pool 5→1');

// ================= readCastForm still round-trips a per-card catk (enemy pays) =================
ev("fresh('standard');openCast();document.getElementById('castType').value='creature';document.getElementById('castAtkN').value='3';document.getElementById('castAtkTgt').value='walkers';document.getElementById('castAtkType').value='life';window._cf=readCastForm();");
ok(ev("window._cf&&window._cf.props&&window._cf.props.catk&&window._cf.props.catk.amt")===3 && ev("window._cf.props.catk.tgt")==='walkers', 'readCastForm: cast-form attack-tax fields build a catk');

// ================= migrate keeps catk AND strips any stray _atkRule out of S.rules =================
ev("window._sv={my:{creatures:[{id:1,name:'x',p:1,t:1,catk:{amt:3,type:'mana',tgt:'weird'}}],artifacts:[],enchants:[],walkers:[],emblems:[],resources:[]},tokens:[],enemyArtifacts:[],enemyEnchants:[],enemyWalkers:[],rules:[{id:5,name:'Attack tax',_atkRule:true,payer:'enemy',atk:{amt:2,type:'mana',tgt:'both'}},{id:6,name:'The Pit\\'s Tithe',side:'boss',bloodpact:1}]};migrate(window._sv);");
ok(ev("window._sv.my.creatures[0].catk && window._sv.my.creatures[0].catk.amt")===3 && ev("window._sv.my.creatures[0].catk.tgt")==='both', 'migrate: a valid legacy catk is KEPT + tgt normalized');
ok(ev("window._sv.rules.some(r=>r._atkRule)")===false, 'P50.16: migrate strips the stray _atkRule out of S.rules');
ok(ev("window._sv.rules.some(r=>r.bloodpact)")===true, 'migrate: a real rule-enchantment (the Pit Tithe) is left intact');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.16 ATTACK-TAX FAILED':'P50.16 ATTACK-TAX PASSED');
process.exit(fail?1:0);
