// P37: enemy mana-box readout reflects lands-only model (usable · sources · projection · frozen; no free/pre-seed copy).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const html=()=>{ev("render()");return window.document.getElementById('manaLine').innerHTML;};

ev("fresh('standard')");
// Set up a known enemy mana state
ev("S.bossLands=3;S.bossMana=3;S.bossManaMax=3;S.bossManaFrozen=0;");

// Enemy turn readout
ev("S.activeTurn='vael';");
let h=html();
console.log('vael-turn:', h);
ok(/usable/.test(h) && new RegExp(''+ev("usableMana()")).test(h), 'vael turn shows usable mana');
ok(/3 sources/.test(h), 'shows source count (3 sources)');
ok(!/\/\s*\d+\s*$/.test(h.replace(/<[^>]+>/g,'')) , 'no trailing "/ max" pool-cap phrasing');
ok(!/free|pre-seed|pre-develop/i.test(h), 'no free/pre-seed-implying text');

// Singular source
ev("S.bossLands=1;S.bossMana=1;S.bossManaMax=1;");
ok(/1 source(?!s)/.test(html()), 'singular "1 source" (no plural s)');

// Your turn readout uses projBossMana
ev("S.activeTurn='you';");
h=html();
console.log('your-turn:', h);
ok(new RegExp('>'+ev("projBossMana()")+'<').test(h) || new RegExp('\\b'+ev("projBossMana()")+'\\b').test(h), 'your turn shows projBossMana');
ok(/source/.test(h), 'your turn shows source count');

// Frozen
ev("S.activeTurn='vael';S.bossLands=4;S.bossMana=4;S.bossManaMax=4;S.bossManaFrozen=2;");
h=html();
console.log('frozen:', h);
ok(/frozen/.test(h), 'frozen note present when bossManaFrozen>0');
ok(/of 4/.test(h), 'under freeze shows usable of pool');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P37 FAILED':'P37 PASSED');
process.exit(fail?1:0);
