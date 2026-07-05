// P45.1 — Foundation: self-hosted fonts, :root tokens, legibility.
const fs=require('fs');
const {boot}=require('./harness.js');
const INDEX=require('path').join(__dirname,'..','index.html');
const html=fs.readFileSync(INDEX,'utf8');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.log('  FAIL:',m);}};

// --- source-level (offline typography) ---
const faces=html.match(/@font-face/g)||[];
ok(faces.length===9,`9 @font-face (got ${faces.length})`);
ok(!/fonts\.googleapis|fonts\.gstatic/.test(html),'no Google Fonts CDN refs');
// every font src is a data: URI (rides in the cached shell → offline-safe), none is a remote http(s) url
const fontSrcs=html.match(/@font-face\{[^}]*\}/g)||[];
ok(fontSrcs.length===9,`9 @font-face blocks parsed (${fontSrcs.length})`);
ok(fontSrcs.every(b=>/src:url\(data:font\/woff2;base64,/.test(b)),'all faces are data-URI woff2');
ok(!fontSrcs.some(b=>/src:url\(https?:/.test(b)),'no remote font url in any face');
['Grenze Gotisch','IM Fell English','Spectral','Space Mono'].forEach(fam=>
  ok(fontSrcs.some(b=>b.includes(`font-family:"${fam}"`)),`face for ${fam}`));

// --- :root tokens ---
const root=(html.match(/:root\{([^}]*)\}/)||[])[1]||'';
['--ff-display','--ff-body','--ff-mono','--ff-log','--fs-badge','--fs-xs','--fs-sm','--fs-rg','--fs-md','--fs-lg','--fs-xl','--sp-1','--sp-3','--sp-5'].forEach(t=>
  ok(root.includes(t),`token ${t} in :root`));
ok(/--ff-display:"Grenze Gotisch"/.test(root),'--ff-display maps to Grenze');
ok(/--ff-log:"IM Fell English"/.test(root),'--ff-log maps to IM Fell');

// --- legibility: interactive text >= .7rem ---
const badgeFs=(root.match(/--fs-badge:([0-9.]+)rem/)||[])[1];
const xsFs=(root.match(/--fs-xs:([0-9.]+)rem/)||[])[1];
ok(parseFloat(badgeFs)>=0.7,`--fs-badge >= .7rem (${badgeFs})`);
ok(parseFloat(xsFs)>=0.7,`--fs-xs >= .7rem (${xsFs})`);
ok(/\.badge\{font-family:var\(--ff-mono\);font-size:var\(--fs-badge\)/.test(html),'.badge uses --fs-badge (was .52)');
ok(/button\.mini\{padding:4px 8px;font-size:var\(--fs-xs\)\}/.test(html),'button.mini uses --fs-xs (was .66)');
ok(/button\.tiny\{padding:3px 6px;font-size:var\(--fs-badge\)\}/.test(html),'button.tiny >= .7 (was .6)');
ok(/select\{font-family:var\(--ff-mono\);font-size:var\(--fs-xs\)/.test(html),'select uses --fs-xs (was .66)');
// tokenized core typography
ok(/body\{background:transparent;color:var\(--bone\);font-family:var\(--ff-body\)/.test(html),'body uses --ff-body');
ok(/h1\{font-family:var\(--ff-display\)/.test(html),'h1 uses --ff-display');
ok(/\.entry\{font-family:var\(--ff-log\)/.test(html),'.entry (log) uses --ff-log');

// --- fluid name inputs ---
ok((html.match(/class="namein"/g)||[]).length===2,'2 name inputs use .namein');
ok(!/style="width:110px"/.test(html),'no fixed-110px name inputs remain');
ok(/\.namein\{width:clamp\(96px,20vw,160px\)/.test(html),'.namein is a fluid clamp width');

// --- jsdom boot still clean + fonts registered in the DOM ---
const {window,errors}=boot();
ok(errors.length===0,'jsdom boot: no console errors '+JSON.stringify(errors.slice(0,2)));
ok(typeof window.render==='function','render() defined after boot');
const styleText=[...window.document.querySelectorAll('style')].map(s=>s.textContent).join('');
ok((styleText.match(/@font-face/g)||[]).length>=9,'jsdom sees >=9 @font-face in <style>');
console.log(`\nP45.1: ${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
