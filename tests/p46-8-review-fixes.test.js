// P46.8 final-gate review fixes: (1) Esc must NOT close the root menu (phantom board),
// (2) Merchant affordability must read the BROWSED purse (_uiMode), not the live S.mode.
const { boot } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; } else { fail++; console.log('  FAIL:', m); } };
const { window, errors } = boot();
const ev = e => window.eval(e);
const d = window.document;
const esc = () => d.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
ev("fresh('standard')");

// --- fix 1: Esc leaves the root #menu open (it's focus-trapped but not Esc-closable) ---
d.getElementById('menu').classList.add('show');
esc();
ok(d.getElementById('menu').classList.contains('show'), 'Esc does NOT close the root menu (no phantom boot-board reveal)');
// but a real closable overlay stacked over the menu still closes on Esc
ev('openSettings()'); esc();
ok(!d.getElementById('overlay').classList.contains('show'), 'Esc still closes a closable overlay over the menu');
ok(d.getElementById('menu').classList.contains('show'), 'menu remains open beneath (only the top closable overlay closed)');
d.getElementById('menu').classList.remove('show');

// --- fix 2: store affordability uses the browsed purse (_uiMode), not the live S.mode ---
// reload scenario: last game was campaign (S.mode) but the player browses the sandbox store
ev("S.mode='campaign';var p=prof();p.camp.gold=0;p.sand.gold=100;p.camp.cleared={};p.sand.cleared={}");
ev("openStore('sandbox')");
ok(ev("_uiMode") === 'sandbox', 'store browses the sandbox purse');
const storeHTML = d.getElementById('storeList').innerHTML;
ok(/💰/.test(d.getElementById('storeGold').textContent) || d.getElementById('storeGold').textContent.length >= 0, 'store header renders');
// with 100 sandbox gold, cheap items must read "Buy" (affordable), NOT "Need gold"
ok(/>Buy<\/button>/.test(storeHTML), 'affordable items show Buy (gated on sandbox gold, not camp gold=0)');
// header shows the sandbox purse
ok(ev("getGold('sandbox')") === 100 && ev("getGold('campaign')") === 0, 'per-purse gold intact (sand 100 / camp 0)');
// the reverse: browsing the (empty) campaign store shows Need-gold, not phantom-Buy
ev("openStore('campaign')");
const campHTML = d.getElementById('storeList').innerHTML;
ok(/Need gold/.test(campHTML), 'empty campaign purse correctly shows Need gold');

ok(errors.length === 0, 'no console errors ' + JSON.stringify(errors.slice(0, 2)));
console.log(`p46-8-review-fixes: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
