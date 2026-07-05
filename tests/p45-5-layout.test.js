// P45.5 (Moxfield desktop) + P45.6 (stack dock) — structure + responsive CSS.
const fs=require('fs');
const {boot}=require('./harness.js');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.log('  FAIL:',m);}};
const {window,errors}=boot();
const ev=e=>window.eval(e);
const d=window.document;

// --- P45.5: persistent #battlefield wrapper around the 4 tabs + stack ---
const bf=d.getElementById('battlefield');
ok(!!bf,'#battlefield wrapper created by buildTabs');
const kids=bf?[...bf.children].map(c=>c.id):[];
ok(JSON.stringify(kids)===JSON.stringify(['tab-info','tab-action','tab-enemy','tab-player','plays']),'#battlefield holds the 4 tabs + #plays in order ('+kids.join(',')+')');
ok(d.getElementById('plays').parentElement.id==='battlefield','#plays re-homed into #battlefield (for the desktop right rail)');
ok(bf&&bf.parentElement.classList.contains('wrap'),'#battlefield lives directly in .wrap');
// idempotent: re-running buildTabs must not double-wrap
ev("buildTabs()");
ok([...d.getElementById('battlefield').children].length===5,'buildTabs is idempotent (no double-wrap)');
ok(d.querySelectorAll('#battlefield').length===1,'exactly one #battlefield');

// --- desktop grid CSS present (source-level; jsdom applies no @media) ---
ok(/@media\(min-width:1100px\)/.test(html),'≥1100px desktop media query present');
const desk=(html.match(/@media\(min-width:1100px\)\{[\s\S]*?\n  \}/)||[])[0]||'';
ok(/#battlefield\{display:grid/.test(desk),'desktop: #battlefield becomes a grid');
ok(/#tab-info\{grid-column:1;grid-row:1\/3\}/.test(desk),'desktop: Info → left rail (spans both rows)');
ok(/#tab-enemy\{grid-column:2;grid-row:1\}/.test(desk)&&/#tab-player\{grid-column:2;grid-row:2\}/.test(desk),'desktop: both boards stacked in the centre column');
ok(/#tab-action\{grid-column:3;grid-row:1\}/.test(desk)&&/#plays\{grid-column:3;grid-row:2\}/.test(desk),'desktop: Action + Stack in the right rail');
ok(/#battlefield \.tab\.collapsed \.tabbody\{display:flex\}/.test(desk),'desktop: rails force-open (override the phone accordion collapse)');
ok(/\.tabhead\{position:sticky/.test(desk),'desktop: tab heads sticky while bodies scroll');
ok(/#plays\.stackpop\{position:static;display:block/.test(desk),'desktop: stack docks static into the rail (not a fixed overlay)');
ok(/\.stackfab\{display:none!important\}/.test(desk),'desktop: floating stack FAB hidden');
// review-fix: the 3 column minimums + gaps must fit inside .wrap at a 1100px viewport (~1044px content) — no horizontal scrollbar in the 1100–1167px band
const mins=(desk.match(/grid-template-columns:minmax\((\d+)px[^)]*\) minmax\((\d+)px[^)]*\) minmax\((\d+)px/)||[]).slice(1).map(Number);
ok(mins.length===3&&(mins[0]+mins[1]+mins[2]+28)<=1044,'desktop columns fit at 1100px: '+mins.join('+')+'+28='+(mins.reduce((a,b)=>a+b,0)+28)+' ≤ 1044');

// --- P45.6: mobile bottom-sheet base + expand ---
ok(/\.stackpop\{position:fixed;inset:auto 0 0 0;[^}]*pointer-events:none\}/.test(html),'stack base = bottom-anchored, pass-through (board visible/interactive above)');
ok(/\.stackpop \.stackmodal\{pointer-events:auto\}/.test(html),'the sheet itself still captures taps');
ok(/\.stackpop:not\(\.expanded\) \.stackmodal\{[^}]*max-height:44vh/.test(html),'docked sheet ~44vh');
ok(/\.stackpop\.expanded\{inset:0;[^}]*background:rgba/.test(html),'.expanded restores the full-screen modal + backdrop');
ok(!/\.stackpop\{position:fixed;inset:0;/.test(html),'old full-screen occluding stack base removed');
ok(ev("typeof toggleStackExpand")==='function','toggleStackExpand() defined');
// toggling the class
ev("document.getElementById('plays').classList.remove('expanded');toggleStackExpand()");
ok(d.getElementById('plays').classList.contains('expanded'),'toggleStackExpand adds .expanded');
ev("toggleStackExpand()");
ok(!d.getElementById('plays').classList.contains('expanded'),'toggleStackExpand removes .expanded');
// expand button present in the stack header
ok(/onclick="toggleStackExpand\(\)"[^>]*>⤢</.test(html),'⤢ expand button in the stack header');
// review-fix: .expanded is cleared on dismiss AND on (re)surface, so an auto-surfaced stack never reopens full-screen over the board
ev("fresh('standard');document.getElementById('plays').classList.add('expanded');hidePlays()");
ok(!d.getElementById('plays').classList.contains('expanded'),'hidePlays clears stale .expanded');
ev("document.getElementById('plays').classList.add('expanded');showPlays()");
ok(!d.getElementById('plays').classList.contains('expanded'),'showPlays surfaces DOCKED (clears stale .expanded)');

// --- P45.5.3: header shows level + room, never the unbeaten villain name ---
ev("fresh('standard');render()");
const hr=d.getElementById('hdrRoom').textContent;
ok(/room 1\/3/.test(hr)&&/Ember Gate/.test(hr),'header shows level + room: '+JSON.stringify(hr));
ok(!/Grakk/.test(hr),'header does NOT reveal the unbeaten villain name');

// --- phone layout unchanged: tabs still collapse via class, #plays still overlay by default ---
ok(/\.tab\.collapsed \.tabbody\{display:none\}/.test(html),'phone: tab collapse rule intact');
ok(ev("typeof applyTabs")==='function'&&ev("typeof toggleTab")==='function','phone tab toggles intact');

// --- no console errors ---
ok(errors.length===0,'jsdom boot clean '+JSON.stringify(errors.slice(0,2)));

console.log(`\nP45.5/6: ${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
