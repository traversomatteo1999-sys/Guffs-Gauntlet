// P46.4 — accessibility: Esc closes non-resolver overlays, focus manager, aria.
const { boot } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; } else { fail++; console.log('  FAIL:', m); } };
const { window, errors } = boot();
const ev = e => window.eval(e);
const d = window.document;
const esc = () => d.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
ev("fresh('standard')");

ok(errors.length === 0, 'boot clean ' + JSON.stringify(errors.slice(0, 2)));
ok(ev('typeof installA11y') === 'function', 'installA11y() defined');

// #log aria-live announcements
const log = d.getElementById('log');
ok(log.getAttribute('aria-live') === 'polite' && log.getAttribute('aria-relevant') === 'additions', '#log has aria-live=polite aria-relevant=additions');

// Esc closes the modal overlay (settings)
ev('openSettings()'); ok(d.getElementById('overlay').classList.contains('show'), 'settings open');
esc(); ok(!d.getElementById('overlay').classList.contains('show'), 'Esc closes the settings overlay');

// Esc closes the stack, store, library, cutscene — but NOT the combat resolver
ev('showPlays()'); esc(); ok(!d.getElementById('plays').classList.contains('show'), 'Esc closes the stack');
d.getElementById('store').classList.add('show'); esc(); ok(!d.getElementById('store').classList.contains('show'), 'Esc closes the store');
d.getElementById('library').classList.add('show'); esc(); ok(!d.getElementById('library').classList.contains('show'), 'Esc closes the library');
d.getElementById('cutscene').classList.add('show'); esc(); ok(!d.getElementById('cutscene').classList.contains('show'), 'Esc closes a cutscene');
// the combat resolver keeps its no-accidental-dismiss rule
d.getElementById('resolver').classList.add('show'); esc();
ok(d.getElementById('resolver').classList.contains('show'), 'Esc does NOT close the combat resolver (Approve/Cancel only)');
d.getElementById('resolver').classList.remove('show');

// only the topmost overlay closes per Esc (resolver excluded even when another is under it)
ev('openSettings()'); d.getElementById('resolver').classList.add('show');
esc(); // should close settings (an Esc-closable), leave resolver
ok(!d.getElementById('overlay').classList.contains('show') && d.getElementById('resolver').classList.contains('show'), 'Esc closes the closable overlay, never the resolver');
d.getElementById('resolver').classList.remove('show');

// aria-label on the emoji-only creature remove button
ev("S.my.creatures.push({id:5555,name:'Aria Ogre',p:2,t:2,kw:[]});render()");
ok(/aria-label="remove Aria Ogre"/.test(d.getElementById('myCrea').innerHTML), 'emoji-only creature ✕ has an aria-label');

// contrast: --bone-dim body text on --ink surfaces meets WCAG AA (>=4.5:1) — documented
function lum(hex){const c=hex.replace('#','').match(/../g).map(h=>{let v=parseInt(h,16)/255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];}
function ratio(a,b){const L1=lum(a),L2=lum(b);return (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);}
const cr = ratio('#a7a293', '#14161d'); // --bone-dim on --ink
ok(cr >= 4.5, `--bone-dim on --ink contrast ${cr.toFixed(2)}:1 >= 4.5 (AA body text)`);
const crBone = ratio('#e8e1cf', '#14161d'); // --bone on --ink
ok(crBone >= 7, `--bone on --ink contrast ${crBone.toFixed(2)}:1 >= 7 (AAA)`);

console.log(`p46-4-a11y: ${pass} passed, ${fail} failed  [contrast: bone-dim ${cr.toFixed(2)}:1, bone ${crBone.toFixed(2)}:1]`);
process.exit(fail ? 1 : 0);
