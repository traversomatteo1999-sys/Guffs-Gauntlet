// P50.4: enemy-pays attack-tax EMBLEM (the enemy pays N mana per attacker; unpayable attackers stay home).
// P50.5: the per-card attack tax (catk) is removed — fields, UI, functions, props, and legacy saves.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// ================= P50.5: the per-card catk field/UI/functions are gone =================
ok(ev("typeof setCatk")==="undefined",   'P50.5: setCatk() removed');
ok(ev("typeof setObjCatk")==="undefined",'P50.5: setObjCatk() removed');
ok(ev("typeof catkTgtSel")==="undefined",'P50.5: catkTgtSel() removed');
// no drawer renders an attack-tax row (they used the deleted functions)
ok(!/attack tax/i.test(ev("creatureDrawer({id:7,kw:[],prot:[],color:[],block:null})")), 'P50.5: creatureDrawer has no attack-tax row');
ok(!/attack tax/i.test(ev("walkerDrawer({id:8,color:[],prot:[]})")), 'P50.5: walkerDrawer has no attack-tax row');
ok(!/attack tax|castAtkN|castAtkTgt|castAtkType/i.test(ev("castFormHTML()")), 'P50.5: the cast form has no attack-tax field/ids');
// ward (the intended replacement) still exists on the cast form
ok(/castWardN/.test(ev("castFormHTML()")), 'P50.5: per-card WARD (the replacement) is still on the cast form');
// migrate strips a legacy catk field so no permanent carries it
ev("window._sv={my:{creatures:[{id:1,name:'x',p:1,t:1,catk:{amt:3,type:'mana',tgt:'both'}}],artifacts:[],enchants:[],walkers:[],emblems:[],resources:[]},tokens:[{id:2,name:'t',catk:{amt:1,type:'life'}}],enemyArtifacts:[],enemyEnchants:[]};migrate(window._sv);");
ok(ev("window._sv.my.creatures[0].catk")===undefined, 'P50.5: migrate strips a legacy catk off a player creature');
ok(ev("window._sv.tokens[0].catk")===undefined, 'P50.5: migrate strips a legacy catk off an enemy token');
// with no emblem present the enemy-pays tax is zero
ev("fresh('standard');S.emblemsEnemy=[]");
ok(ev("attackTax().mana")===0 && ev("attackTax().life")===0, 'P50.5: no emblem → attackTax() is zero (was per-card catk)');

// ================= P50.4: the enemy-pays attack-tax emblem =================
ok(ev("ENEMY_EMBLEMS.some(t=>t.auto&&t.auto.k==='attackTaxEnemy'&&t.static)"), 'P50.4: an "attackTaxEnemy" static emblem template exists');
ok(ev("emblemValueLabel('attackTaxEnemy')")==='N mana/attacker', 'P50.4: value label is per-attacker mana');

// the emblem feeds attackTax()
ev("fresh('standard');S.emblemsEnemy=[{id:1,name:'AT',auto:{k:'attackTaxEnemy',n:2},autoOn:true,static:true,kind:'emblem'}]");
ok(ev("attackTax().mana")===2, 'P50.4: the emblem makes attackTax() 2 mana/attacker');
// autoOff → no tax
ev("S.emblemsEnemy[0].autoOn=false");
ok(ev("attackTax().mana")===0, 'P50.4: toggling the emblem off zeroes the tax');
ev("S.emblemsEnemy[0].autoOn=true");

// payAttackTax skips unaffordable attackers and deducts from the enemy pool
ev("S.bossMana=5;S.bossManaMax=6;S.bossPool=null;S.bossManaFrozen=0;S.boss.life=40;window._A=[{id:11,name:'a',p:3,t:3},{id:12,name:'b',p:2,t:2},{id:13,name:'c',p:1,t:1}];window._pay=payAttackTax(window._A)");
ok(ev("window._pay.kept.length")===2, 'P50.4: 3 attackers, 5 mana, 2/each → pays for 2');
ok(ev("window._pay.skipped.length")===1, 'P50.4: the 3rd attacker (would need 6 mana) stays home');
ok(ev("window._pay.pm")===4, 'P50.4: 4 mana actually paid');
ok(ev("S.bossMana")===1, 'P50.4: the enemy pool fell 5→1');
// the priciest attackers are the ones kept (ranked by power)
ok(ev("window._pay.skipped[0].id")===13, 'P50.4: the weakest attacker is the one dropped');

// the emblem is STATIC → it never fires on an upkeep trigger (no stray life loss) and never buffs creatures
ev("fresh('standard');S.emblemsEnemy=[{id:1,name:'AT',auto:{k:'attackTaxEnemy',n:2},autoOn:true,static:true,kind:'emblem'}];S.tokens=[{id:5,name:'t',p:2,t:2,plus:0,minus:0}];S.youLife=40;fireEnemyEmblems('upkeep');applyStaticEmblems();");
ok(ev("S.youLife")===40, 'P50.4: the static tax emblem does NOT fire youLose on upkeep');
ok(ev("S.tokens[0]._stp")===0, 'P50.4: it does not buff/debuff enemy creatures (unknown static kind ignored)');

// adding it through the real adder puts a usable emblem on the board
ev("fresh('standard');var i=ENEMY_EMBLEMS.findIndex(t=>t.auto&&t.auto.k==='attackTaxEnemy');document.getElementById('embTemplate')&&(fillEmblemTemplates());var sel=document.getElementById('embTemplate');if(sel){sel.value=String(i);}addEnemyEmblem();");
ok(ev("S.emblemsEnemy.some(e=>e.auto&&e.auto.k==='attackTaxEnemy')"), 'P50.4: addEnemyEmblem places the attack-tax emblem on the enemy');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.4/5 FAILED':'P50.4/5 PASSED');
process.exit(fail?1:0);
