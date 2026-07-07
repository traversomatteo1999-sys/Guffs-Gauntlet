// P49.12: enemy top/bottom-N reveal shows full expandable card info (#14) · art on saved homebrew cards (#17).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const $=id=>window.document.getElementById(id);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// --- Bullet 14: dtLook / dtReveal rows are now expandable fxItem rows ---
ev("openDeckTools();dtLook('top')");
let body=$('modalBody').innerHTML;
ok(ev("_dt.reveal&&_dt.reveal.cards.length>0"),'dtLook(top) populated the reveal');
ok(/dtToggleCard\(/.test(body),'reveal rows carry the expandable chevron (dtToggleCard)');
ok(/pchev/.test(body),'reveal rows render a .pchev chevron');
ok(/⊕ expand all|expand all/.test(body),'reveal header has an expand-all button');
ok(/dtRevealMove\(0,/.test(body),'per-card move actions preserved');
// expanding a row shows the fx body
ev("var id=_dt.reveal.cards[0].id;dtToggleCard(id)");
body=$('modalBody').innerHTML;
ok(/fxbody|li-type|typechip/.test(body)||/exp/.test(body),'toggling a row expands its stats body');
// hand reveal too
ev("S.hand=S.lib.slice(0,3);dtReveal()");
body=$('modalBody').innerHTML;
ok(ev("_dt.reveal.zone==='hand'"),'dtReveal → hand zone');
ok(/dtToggleCard\(/.test(body),'hand reveal rows are expandable too');

// --- Bullet 17: art url persists on a homebrew card and renders in the library ---
// build a profile + open cast form
ev("openCast&&openCast()");
ok(!!$('castArt'),'castForm has an Art URL input');
// set fields + art and read the form
ev("$('castName').value='Arted';$('castArt').value='https://example.com/art.jpg';var cfg=readCastForm();window.__cfg=cfg;");
ok(ev("window.__cfg.art==='https://example.com/art.jpg'"),'readCastForm captures an http(s) art URL');
// a non-http art value is rejected
ev("$('castArt').value='not-a-url';window.__cfg2=readCastForm();");
ok(ev("window.__cfg2.art===undefined"),'non-http art value is ignored');
// cardArt renders a banner for an art-bearing card
ok(ev("/cardart/.test(cardArt({art:'https://example.com/x.jpg'}))"),'cardArt renders a .cardart strip for an http art url');
ok(ev("cardArt({art:'javascript:evil'})===''"),'cardArt rejects a non-http art url');
// renderLibrary shows the strip for a saved card carrying art
ev("var p=prof();p.library.unshift({lid:'Lx',name:'Arted',ctype:'creature',p:2,t:2,color:[],kw:[],props:{},art:'https://example.com/art.jpg'});renderLibrary();");
ok(/cardart/.test($('libCards').innerHTML),'renderLibrary shows the art strip for a saved homebrew card');

// --- edit-strips-art round-trip: loading a card pre-fills the art input, saving keeps it ---
ev("var p=prof();var idx=p.library.findIndex(c=>c.lid==='Lx');_editLid='Lx';openCast();loadCastFromLibrary(idx);");
ok($('castArt')&&$('castArt').value==='https://example.com/art.jpg','loadCastFromLibrary pre-fills the art input');
ev("saveCardEdits()");
ok(ev("prof().library.find(c=>c.name==='Arted').art==='https://example.com/art.jpg'"),'editing round-trips the art (not stripped)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P49.12 FAILED':'P49.12 PASSED');
process.exit(fail?1:0);
