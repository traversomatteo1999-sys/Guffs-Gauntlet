// P50.12: re-tier the two under-priced strong passives — Scholar's Token (+1 card/turn) → rare,
// Mana Surge (+1 mana/turn) → legendary — and reprice them within their new rarity bands.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// re-tiers
ok(ev("BOONS.scholar.r")==='rare',      'P50.12: Scholar\'s Token re-tiered uncommon → rare');
ok(ev("BOONS.surge.r")==='legendary',   'P50.12: Mana Surge re-tiered rare → legendary');
// reprices
ok(ev("STORE.find(s=>s.id==='scholar').cost")===26, 'P50.12: Scholar 18 → 26g');
ok(ev("STORE.find(s=>s.id==='surge').cost")===38,   'P50.12: Mana Surge 30 → 38g');
// prices stay inside the documented rarity bands (rare 18-34, legendary 36+)
ok(ev("var c=STORE.find(s=>s.id==='scholar').cost;c>=18&&c<=34"), 'P50.12: Scholar price is within the rare band (18-34)');
ok(ev("STORE.find(s=>s.id==='surge').cost>=36"), 'P50.12: Mana Surge price is within the legendary band (36+)');
// the pickByRarity pools reflect the move (wheel/loot rare & legendary pulls)
ok(ev("Object.keys(BOONS).filter(k=>BOONS[k].r==='rare').includes('scholar')"), 'P50.12: Scholar now in the rare pool');
ok(ev("Object.keys(BOONS).filter(k=>BOONS[k].r==='legendary').includes('surge')"), 'P50.12: Mana Surge now in the legendary pool');
ok(!ev("Object.keys(BOONS).filter(k=>BOONS[k].r==='rare').includes('surge')"), 'P50.12: Mana Surge is no longer in the rare pool');
// pickByRarity still returns a valid id for both tiers (non-empty pools)
ok(ev("pickByRarity('rare')")!==null && ev("BOONS[pickByRarity('rare')]").r==='rare', 'P50.12: pickByRarity(rare) still valid');
ok(ev("pickByRarity('legendary')")!==null && ev("BOONS[pickByRarity('legendary')]").r==='legendary', 'P50.12: pickByRarity(legendary) still valid');
// regression: both are still grantable/lootable and land in the satchel
ev("S.inv=[];grantBoon('scholar')"); ok(ev("S.inv.some(i=>i.id==='scholar')"), 'P50.12: grantBoon(scholar) still works');
ev("grantBoon('surge')");            ok(ev("S.inv.some(i=>i.id==='surge')"),   'P50.12: grantBoon(surge) still works');
// the store still lists both with their new costs
ok(ev("STORE.filter(s=>s.id==='scholar'||s.id==='surge').length")===2, 'P50.12: both items still in the store');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.12 FAILED':'P50.12 PASSED');
process.exit(fail?1:0);
