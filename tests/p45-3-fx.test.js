// P45.3 — FX layer: floating damage/heal, bar flash, keyed spawn anim, tiered reduced-motion.
const fs=require('fs');
const {boot}=require('./harness.js');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.log('  FAIL:',m);}};
const {window}=boot();
const ev=e=>window.eval(e);
const doc=window.document;
ev("fresh('standard')");

// --- helpers exist ---
['fxFloat','fxFlash','fxLife'].forEach(f=>ok(ev('typeof '+f)==='function',f+'() defined'));
ok(ev("typeof _bornIds")==='object'&&ev("_bornIds instanceof Set"),'_bornIds is a Set');
const fxEl=doc.getElementById('fx');
ok(!!fxEl,'#fx overlay element exists');

// --- fxFloat spawns a self-removing number when the anchor has a real (stubbed) rect ---
ev("document.getElementById('youLife').getBoundingClientRect=function(){return {left:100,top:120,width:44,height:22,right:144,bottom:142};}");
ev("fxFloat(document.getElementById('youLife'),'+5','heal')");
let nums=fxEl.querySelectorAll('.fxnum');
ok(nums.length===1,'fxFloat appended one .fxnum ('+nums.length+')');
ok(nums[0]&&nums[0].textContent==='+5'&&nums[0].className.includes('heal'),'.fxnum carries text + class');
ok(nums[0]&&/left:\s*122px/.test(nums[0].getAttribute('style')||''),'positioned at anchor centre-x (100+44/2)');

// --- guards: null anchor + zero-rect anchor → no node, no throw ---
const before=fxEl.querySelectorAll('.fxnum').length;
ev("fxFloat(null,'x','dmg');fxFloat(document.getElementById('bossName'),'x','dmg')");// bossName has default zero rect in jsdom
ok(fxEl.querySelectorAll('.fxnum').length===before,'fxFloat no-ops on null/zero-rect anchor (no stray corner numbers)');

// --- fxLife wires both directions + boss ---
ev("[...document.getElementById('fx').children].forEach(n=>n.remove())");
ev("document.getElementById('bossLife').getBoundingClientRect=function(){return {left:200,top:120,width:44,height:22,right:244,bottom:142};}");
ev("fxLife('you',7)");ok(fxEl.querySelector('.fxnum.heal')&&fxEl.querySelector('.fxnum.heal').textContent==='+7','fxLife(you,+7) → green heal number');
ev("fxLife('you',-4)");ok([...fxEl.querySelectorAll('.fxnum.dmg')].some(n=>n.textContent==='−4'),'fxLife(you,-4) → red dmg number');
ev("fxLife('boss',-9)");ok([...fxEl.querySelectorAll('.fxnum.boss')].some(n=>n.textContent==='−9'),'fxLife(boss,-9) → gold boss number');
ev("fxLife('you',0)");// no-op on zero
ok(fxEl.querySelectorAll('.fxnum').length===3,'fxLife(_,0) is a no-op');

// --- render() never touches #fx (FX survive a rebuild) ---
const keep=fxEl.querySelectorAll('.fxnum').length;
ev("render()");
ok(fxEl.querySelectorAll('.fxnum').length===keep,'render() leaves #fx nodes untouched');

// --- fxFlash flashes the .bar TRACK (review-fix: youBar/bossBar are the classless <i> fills; the rule is .bar.barflash) ---
ev("fxFlash(document.getElementById('youBar'))");
ok(doc.getElementById('youBar').closest('.bar').classList.contains('barflash'),'fxFlash adds .barflash to the .bar track (so .bar.barflash actually matches)');
ok(/\.bar\.barflash\{animation:barflash/.test(html),'CSS: .bar.barflash animation rule present');

// --- spawn anim keyed to new permanents (isnew once, not every render) ---
ev("_bornIds.clear();S.my.creatures.push({id:8001,name:'New',p:2,t:2,kw:[]})");
ev("render()");
ok(doc.getElementById('myCrea').innerHTML.includes('crea isnew')||/class="crea[^"]*isnew/.test(doc.getElementById('myCrea').innerHTML),'first render: new creature tile has .isnew');
ok(ev("_bornIds.has(8001)"),'creature id recorded in _bornIds after first render');
ev("render()");
ok(!/class="crea[^"]*isnew/.test(doc.getElementById('myCrea').innerHTML),'second render: no .isnew (spawn anim does not replay)');
// enterRoom clears _bornIds so a fresh board re-animates
ok(ev("enterRoom.toString()").includes('_bornIds.clear()'),'enterRoom clears _bornIds (fresh board re-animates)');

// --- source: FX overlay + tiered reduced-motion + keyed spawn CSS ---
ok(/#fx\{position:fixed;inset:0;pointer-events:none/.test(html),'#fx CSS: fixed, pointer-events none (never intercepts a tap)');
ok(/\.crea\.isnew\{animation:spawn/.test(html)&&!/\.crea\{[^}]*animation:spawn/.test(html),'spawn anim moved off base .crea onto .crea.isnew');
ok(/prefers-reduced-motion:reduce\)\{[\s\S]*animation-duration:\.001ms!important/.test(html),'reduced-motion: decorative motion near-instant (not the old all-off nuke)');
ok(/prefers-reduced-motion[\s\S]{0,600}\.fxnum\{animation:fxfade/.test(html),'reduced-motion: damage numbers still communicate (fxfade)');
ok(!/\*\{animation:none!important;transition:none!important\}/.test(html),'old all-or-nothing reduced-motion nuke removed');
ok(/prefers-reduced-motion[\s\S]{0,200}animation-iteration-count:1!important/.test(html),'reduced-motion: infinite decorative loops truly halted (iteration-count:1, no flicker)');

// --- jsdom boot clean ---
const {errors}=boot();ok(errors.length===0,'jsdom boot clean '+JSON.stringify(errors.slice(0,2)));

console.log(`\nP45.3: ${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
