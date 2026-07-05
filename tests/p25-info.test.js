// P25.2: tab notes + ⓘ INFO_TEXT refreshed to match built features; every infoBtn/showInfo key resolves.
const fs=require('fs');
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const SRC=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');

// 1) every infoBtn('k') / showInfo('k') key in the source resolves to an INFO_TEXT entry (no dangling ⓘ)
const keys=new Set();let m;const re=/(?:infoBtn|showInfo)\(\s*'([a-zA-Z0-9_]+)'/g;while((m=re.exec(SRC)))keys.add(m[1]);
ok(keys.size>=8,'found the ⓘ keys in source ('+[...keys].join(', ')+')');
let missing=[];keys.forEach(k=>{if(!ev(`!!INFO_TEXT['${k}']`))missing.push(k);});
ok(missing.length===0,'every ⓘ key resolves to an INFO_TEXT entry'+(missing.length?' — MISSING: '+missing.join(', '):''));
// each resolves via showInfo without throwing
let threw=[];keys.forEach(k=>{try{ev(`showInfo('${k}')`);}catch(e){threw.push(k+': '+e.message);}});
ok(threw.length===0,'showInfo() works for every key'+(threw.length?' — '+threw.join(' | '):''));

// 2) every INFO_TEXT entry has a title + non-empty body
const bad=ev(`Object.keys(INFO_TEXT).filter(k=>!INFO_TEXT[k]||!INFO_TEXT[k].t||!INFO_TEXT[k].h||INFO_TEXT[k].h.length<20)`);
ok(bad.length===0,'every INFO_TEXT entry has a title + substantive body'+(bad.length?' — thin: '+bad.join(', '):''));

// 3) the refreshed popups mention the systems built in P16–P39
const has=(k,rx)=>ok(rx.test(ev(`INFO_TEXT['${k}'].h`)),`INFO_TEXT.${k} mentions ${rx}`);
has('action',/combat resolver/i);
has('action',/negate|prevent/i);
has('action',/attack tax|max attackers/i);
has('enemy',/planeswalker/i);
has('enemy',/emblem/i);
has('enemy',/reanimat|real permanent/i);
has('enemy',/counter/i);
has('player',/emblem/i);
has('player',/counter|graveyard/i);
has('player',/protection|hexproof|option set/i);
has('commander',/tax/i);
has('commander',/planeswalker/i);
has('battles',/combat|resolver|aim/i);
has('tokens',/Treasure/i);

// 4) tab notes refreshed
['combat','emblems','counters'].forEach(w=>ok(new RegExp('tabnote[^>]*>[^<]*'+w,'i').test(SRC),`a tab note mentions "${w}"`));

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P25.2 FAILED':'P25.2 PASSED');
process.exit(fail?1:0);
