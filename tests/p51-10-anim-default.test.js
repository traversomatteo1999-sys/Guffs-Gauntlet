// P51.10: with no DB.settings.anim chosen, the default animation level is "full".
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

// 1. Source: both fallbacks default to 'full', not 'auto'.
ok(/anim\|\|'full'/.test(src), "applyAnim/settingsHTML default to 'full'");
ok(!/\.anim\|\|'auto'/.test(src) && !/s\.anim\|\|'auto'/.test(src), "no 'auto' default remains");

// 2. Behaviour: with settings unset, applyAnim adds html.motion-full.
ev("DB=DB||{};DB.settings={};");                 // no anim chosen
ev("applyAnim()");
const cls=window.document.documentElement.className;
ok(/motion-full/.test(cls), 'html gets motion-full by default');
ok(!/motion-soft|motion-off/.test(cls), 'no other motion class applied');

// 3. 'auto' still works as an explicit choice (adds no class).
ev("DB.settings.anim='auto';applyAnim()");
ok(!/motion-full|motion-soft|motion-off/.test(window.document.documentElement.className), "'auto' explicit -> no motion class (OS query fallback)");

// 4. Settings UI: the "Full" segment shows selected by default.
ev("DB.settings={};");
const sh=ev("settingsHTML()");
ok(/class="on" onclick="setAnimLevel\('full'\)">Full/.test(sh), 'Full segment is marked selected (class="on") in settingsHTML');
ok(!/class="on" onclick="setAnimLevel\('auto'\)">Auto/.test(sh), 'Auto segment is NOT the default selected');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.10 FAILED':'P51.10 PASSED');
process.exit(fail?1:0);
