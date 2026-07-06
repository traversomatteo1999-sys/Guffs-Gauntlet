// P45.2 — Card art on board/stack/library + boss portrait.
const {boot}=require('./harness.js');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.log('  FAIL:',m);}};
const {window}=boot();
const ev=e=>window.eval(e);
ev("fresh('standard')");

// --- helper: cardArt ---
ok(ev("typeof cardArt")==='function','cardArt() defined');
ok(ev("cardArt({})")==='','cardArt: no image → empty string');
ok(ev("cardArt({name:'x'})")==='','cardArt: homebrew (no art/image) → empty');
const artHtml=ev("cardArt({art:'https://cards.scryfall.io/art_crop/a.jpg'})");
ok(/class="cardart"/.test(artHtml),'cardArt: art url → .cardart div');
ok(/background-image:url\('https:\/\/cards\.scryfall\.io\/art_crop\/a\.jpg'\)/.test(artHtml),'cardArt: sets background-image');
ok(ev("cardArt({image:'https://x/n.jpg'})").includes('cardart'),'cardArt: falls back to image when no art');
ok(ev("cardArt({art:'javascript:evil'})")==='','cardArt: rejects non-http url (xss guard)');
const xss=ev("cardArt({art:'https://x/a.jpg\\\"><b>evil'})");
ok(!xss.includes('<b>')&&xss.includes("url('https://x/a.jpgbevil')"),'cardArt: strips quote/angle-bracket breakout chars from the url');

// --- buildImportedCard persists image + art ---
const cfg=ev(`SCRY.buildImportedCard({name:'Test Ogre',type_line:'Creature — Ogre',oracle_text:'',colors:['R'],cmc:3,power:'3',toughness:'3',mana_cost:'{2}{R}',keywords:[],image_uris:{normal:'https://cards.scryfall.io/normal/o.jpg',art_crop:'https://cards.scryfall.io/art_crop/o.jpg'}},{})`);
ok(cfg.image==='https://cards.scryfall.io/normal/o.jpg','buildImportedCard: cfg.image = normal');
ok(cfg.art==='https://cards.scryfall.io/art_crop/o.jpg','buildImportedCard: cfg.art = art_crop');
// faceObj captures art_crop
const face=ev(`SCRY.facesOf({name:'F',type_line:'Creature',image_uris:{normal:'https://x/n.jpg',art_crop:'https://x/ac.jpg'}})[0]`);
ok(face.art==='https://x/ac.jpg','faceObj: captures art_crop');
ok(face.image==='https://x/n.jpg','faceObj: still captures normal');
// a card with NO image_uris → null (homebrew-safe)
const cfg2=ev(`SCRY.buildImportedCard({name:'NoArt',type_line:'Instant',oracle_text:'',colors:['U'],cmc:1,keywords:[]},{})`);
ok(cfg2.image===null&&cfg2.art===null,'buildImportedCard: missing art → nulls');

// --- board creature tile shows art when present, not otherwise ---
ev("S.my.creatures.push({id:9001,name:'Imported',p:2,t:2,kw:[],color:['R'],art:'https://cards.scryfall.io/art_crop/imp.jpg'})");
ev("S.my.creatures.push({id:9002,name:'Homebrew',p:1,t:1,kw:[],color:['R']})");
ev("render()");
const myCrea=window.document.getElementById('myCrea').innerHTML;
ok((myCrea.match(/class="cardart"/g)||[]).length===1,'board: exactly 1 art strip (imported only, not homebrew)');
ok(myCrea.includes('imp.jpg'),'board: imported creature carries its art url');

// --- review-fix: art persists when an imported creature RESOLVES onto the board (resolvePlayerItem must carry image/art) ---
ev("S.plays=[];resolvePlayerItem({ctype:'creature',name:'Resolved',p:3,t:3,kw:[],color:['R'],props:{},image:'https://cards.scryfall.io/normal/res.jpg',art:'https://cards.scryfall.io/art_crop/res.jpg'})");
ev("render()");
const rMy=window.document.getElementById('myCrea').innerHTML;
ok(rMy.includes('res.jpg'),'resolved imported creature keeps its art on the board (was dropped before the fix)');
const resolved=ev("S.my.creatures[S.my.creatures.length-1]");
ok(resolved.art==='https://cards.scryfall.io/art_crop/res.jpg','resolvePlayerItem carries cfg.art onto the board object');

// --- enemy board (tokens) — enemyCard needs the creature actually in S.tokens (kwSelect→getCre) ---
ev("S.tokens.push({id:9101,name:'EImp',p:2,t:2,kw:[],color:['R'],art:'https://cards.scryfall.io/art_crop/e.jpg'})");
ev("S.tokens.push({id:9102,name:'EPlain',p:1,t:1,kw:[],color:['R']})");
ev("render()");
const cf=window.document.getElementById('creaField').innerHTML;
ok((cf.match(/class="cardart"/g)||[]).length===1,'enemy board: 1 art strip (imported token only)');
ok(cf.includes('e.jpg'),'enemy board: art url present');

// --- stack playcard ---
ev("S.plays=[{id:1,name:'Cast Art',ctype:'creature',_player:true,status:'pending',note:'x',art:'https://cards.scryfall.io/art_crop/pc.jpg'}]");
ev("renderPlays()");
const pc=window.document.getElementById('playCards').innerHTML;
ok(pc.includes('class="cardart"')&&pc.includes('pc.jpg'),'stack: playcard shows art');

// --- library row ---
ev("(function(){var p=prof();p.library.push({name:'LibArt',ctype:'creature',p:2,t:2,color:['R'],kw:[],art:'https://cards.scryfall.io/art_crop/lib.jpg'});p.library.push({name:'LibPlain',ctype:'instant',color:['U'],kw:[]});})()");
ev("renderLibrary()");
const lc=window.document.getElementById('libCards').innerHTML;
ok((lc.match(/class="cardart"/g)||[]).length===1,'library: 1 art strip (imported card only)');
ok(lc.includes('lib.jpg'),'library: art url present');

// --- boss portrait (P47: dedicated per-warden Pictures/ icon, no longer the lore ART) ---
ok(ev("typeof ENEMY_ICON==='object' && !!ENEMY_ICON.grakk"),'P47: ENEMY_ICON map defined');
ok(ev("ENEMY_ICON.grakk!==ART.grakk"),'P47: enemy-box icon is a separate asset from the lore art');
const key=ev("_levelArt&&_levelArt[S.roomIndex]");
const iconExists=ev("!!(_levelArt&&ENEMY_ICON[_levelArt[S.roomIndex]])");
const bp=window.document.getElementById('bossPortrait');
ok(!!bp,'bossPortrait element exists');
if(iconExists){
  ok(bp.style.display==='','boss portrait shown when a warden icon resolves');
  ok(bp.getAttribute('src')===ev("ENEMY_ICON[_levelArt[S.roomIndex]]"),'boss portrait src = ENEMY_ICON[wardenKey] (Pictures/ icon)');
}else{
  ok(bp.style.display==='none','boss portrait hidden when no icon');
  console.log('  (note: no warden icon at room',key,'— portrait correctly hidden)');
}

console.log(`\nP45.2: ${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
