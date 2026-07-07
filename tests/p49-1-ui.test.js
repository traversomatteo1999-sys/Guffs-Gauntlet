// P49.1: enemy-box collapsible mana-override sub-box (#1) · bigger warden icons (#5) · Library sections default-collapsed (#4).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const $=id=>window.document.getElementById(id);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");
ev("render()");

// --- Bullet 1: manual-override sub-box exists, collapsed by default, ids preserved ---
const box=$('manaBox');
ok(!!box,'#manaBox sub-box exists');
ok(box && box.classList.contains('collapsed'),'sub-box collapsed by default');
ok(ev("S.ui.manaBox!==true"),'S.ui.manaBox not open by default');
// The read-only readout stays outside/above the box
ok(!!$('manaLine') && !!$('manaPips'),'#manaLine/#manaPips still present');
// The three override rows and their ids survived inside the wrapper
['bossPoolVal','bossManaModVal','bossFrozenVal'].forEach(id=>ok(box&&box.querySelector('#'+id),id+' lives inside the sub-box'));

// toggle opens it: flips class + flag + chevron
ev("toggleManaBox()");
ok(ev("S.ui.manaBox===true"),'toggleManaBox() sets flag open');
ok(!box.classList.contains('collapsed'),'toggle removes .collapsed');
ok($('manaBoxChev').textContent==='▾','chevron shows ▾ when open');
ev("toggleManaBox()");
ok(box.classList.contains('collapsed') && $('manaBoxChev').textContent==='▸','toggle back re-collapses + ▸');

// ids still update after render (proves the manual controls still work)
ev("bossManaModAdj(1)");ev("render()");
ok(/^[+]?1/.test($('bossManaModVal').textContent),'bossManaModAdj(1) updates #bossManaModVal');

// info modal opens
ev("showInfo('enemymana')");
ok($('infoOverlay').classList.contains('show'),'showInfo("enemymana") opens the info modal');
ok(/mana/i.test($('infoBody').innerHTML),'info body has content');
ev("INFO_TEXT.enemymana&&$('infoOverlay').classList.remove('show')");

// --- Bullet 5: warden icon CSS bumped to ~44px ---
const css=window.document.querySelector('style').textContent;
ok(/\.wardenpt\{width:44px;height:44px/.test(css),'.wardenpt bumped to 44px');

// --- Bullet 4: Library Cards & Tokens default collapsed, search reveals ---
ev("openLibrary&&openLibrary()");ev("renderLibrary()");
ok($('libCards')&&$('libCards').style.display==='none','Library Cards section closed by default');
ok($('libTokens')&&$('libTokens').style.display==='none','Library Tokens section closed by default');
ok($('libCardsChev')&&$('libCardsChev').textContent==='▸','Cards chevron ▸ when closed');
// explicit open persists
ev("toggleLibSection('cards')");
ok(ev("S.ui.lib.cards===true"),'toggleLibSection opens cards (===true)');
ok($('libCards').style.display!=='none','opened Cards now visible');
// live search reveals both regardless of flags
ev("if($('libSearch'))$('libSearch').value='x';applyLibSections(true)");
ok($('libTokens').style.display!=='none','search auto-reveals Tokens');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P49.1 FAILED':'P49.1 PASSED');
process.exit(fail?1:0);
