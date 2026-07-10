// P49.6: Italian i18n layer — DB.lang, t()/L() helpers, menu flag, applyLang static-chrome translation, EN unchanged.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const D=window.document;
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

// 1. DB.lang defaults to 'en'.
ev("delete DB.lang;loadSettings()");
ok(ev("DB.lang")==='en', 'loadSettings defaults DB.lang to en');

// 2. t()/L() behaviour.
ok(ev("(function(){DB.lang='en';return t('Difficulty')})()")==='Difficulty', "t() returns English when lang=en");
ok(ev("(function(){DB.lang='it';return t('Difficulty')})()")==='Difficoltà', "t() returns Italian when lang=it");
ok(ev("(function(){DB.lang='it';return t('An untranslated string 123')})()")==='An untranslated string 123', 't() falls back to English for untranslated strings');
ok(ev("(function(){DB.lang='it';return L('Yes','Sì')})()")==='Sì' && ev("(function(){DB.lang='en';return L('Yes','Sì')})()")==='Yes', 'L() inline switch works both ways');

// 3. The menu has a language flag button.
ok(/id="menuLangBtn"/.test(src), 'menu has a language flag button');
ev("DB.lang='it';renderMenu()");
ok((D.getElementById('menuLangLbl')||{}).textContent==='IT', 'menu flag label reflects the current language (IT)');

// 4. applyLang translates the static menu chrome in IT, keeping the title + proper nouns.
ev("DB.lang='it';applyLang()");
const menu=D.getElementById('menu').innerHTML;
ok(/Difficolt/.test(menu) && /Campagna/.test(menu) && /Prova libera/.test(menu), 'applyLang translates menu chrome (Difficoltà/Campagna/Prova libera)');
ok(/Guff's Gauntlet/.test(menu), 'the Guffs Gauntlet title is preserved (proper noun)');

// 5. settingsHTML has a Language row + translates in IT.
const sh=ev("(function(){DB.lang='it';return settingsHTML()})()");
ok(/setLang\('it'\)/.test(sh) && /setLang\('en'\)/.test(sh), 'Settings offers a language toggle');
ok(/Impostazioni/.test(sh) && /Lingua/.test(sh), 'Settings labels translate in IT');

// 6. Turn-flow + info translate in IT (JS-rendered, live).
ev("DB.lang='it';fresh('standard');S.activeTurn='you';S.phase=1;render()");
ok(ev("t('Combat')")==='Combattimento', 'phase label translates');
ok(/Continua ▸/.test(ev("flowLabel()")), 'flowLabel translates the fixed part');
ok(/Minaccia/.test(ev("(function(){showInfo('threat');return document.getElementById('infoBody').innerHTML})()")), 'info popup translates');

// 7. Cutscene narrative translates (arrival line).
ok(ev("t(ARRIVAL_LINES[3])")!==ev("ARRIVAL_LINES[3]") && /Porta delle Braci/.test(ev("t(ARRIVAL_LINES[3])")), 'arrival narrative translates');

// 8. Proper nouns + MTG keywords stay English (not in the dictionary).
ok(ev("t('Grakk')")==='Grakk' && ev("t('deathtouch')")==='deathtouch', 'proper nouns + MTG keywords stay English');

// 9. Boot + a full turn cycle in BOTH languages = zero console errors (the core invariant).
ev("DB.lang='en';fresh('standard');render()");
for(let i=0;i<8;i++)ev("advancePhase()");
ev("DB.lang='it';fresh('standard');render()");
for(let i=0;i<8;i++)ev("advancePhase()");
ok(errors.length===0, 'EN + IT boot and a full turn cycle run with zero console errors ('+(errors[0]||'')+')');

// 10. Legacy save (no lang) migrates/loads without throwing.
ok(!ev("(function(){try{migrate(JSON.parse('{\"tokens\":[],\"my\":{\"creatures\":[]}}'));return false}catch(e){return true}})()"), 'a legacy save loads without throwing');

// 11. setLang persists DB.lang (runs LAST — its location.reload() is a jsdom no-op that logs a benign "not implemented" artifact).
ev("DB.lang='en';try{setLang('it')}catch(e){}");
ok(ev("DB.lang")==='it', 'setLang persists DB.lang');

console.log(fail?'P49.6 FAILED':'P49.6 PASSED');
process.exit(fail?1:0);
