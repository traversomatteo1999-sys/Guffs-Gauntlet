// P51.7: the per-card drawer toggle reads "Actions" (not "properties") and .drawtoggle is gold.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

// 1. Source: no "properties" label remains on the drawer toggle; "Actions" replaces it.
ok(!/\?'▾ properties':'▸ properties'/.test(src), 'no "properties" drawer-toggle label remains');
ok(/\?'▾ Actions':'▸ Actions'/.test(src), '"Actions" drawer-toggle label present');
ok((src.match(/\?'▾ Actions':'▸ Actions'/g)||[]).length===5, 'all 5 drawer-toggle sites renamed');

// 2. Source: .drawtoggle now uses the gold token (yellow), not the greyish bone-dim.
const rule=(src.match(/\.drawtoggle\{[^}]*\}/)||[''])[0];
ok(/color:var\(--gold\)/.test(rule), '.drawtoggle text colour is --gold');
ok(!/color:var\(--bone-dim\)/.test(rule), '.drawtoggle no longer uses --bone-dim');

// 3. Render a creature and confirm the live button reads "Actions".
ev("fresh('standard')");
ev("S.my.creatures.push({id:S.nextId++,name:'Grizzly',p:2,t:2,baseP:2,baseT:2,kw:[],color:[],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:false,dies:'graveyard',_drawer:false})");
ev("render()");
const html=window.document.getElementById('myField')?window.document.getElementById('myField').innerHTML:window.document.body.innerHTML;
ok(/Actions/.test(html), 'live creature tile shows an "Actions" button');
ok(!/▸ properties|▾ properties/.test(html), 'live tile shows no "properties" toggle');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.7 FAILED':'P51.7 PASSED');
process.exit(fail?1:0);
