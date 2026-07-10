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

// 3b. P49.6 FIX (regression): the flag's inline onclick must NOT call a bare lang() — inside an inline
//     handler `lang` binds to the element's built-in .lang string (shadowing the global fn), so
//     `setLang(lang()...)` threw "lang is not a function". It now routes through a toggleLang() global.
const langBtn=D.getElementById('menuLangBtn');
ok(!!langBtn, 'menuLangBtn exists in the DOM');
const oc=(langBtn&&langBtn.getAttribute('onclick'))||'';
ok(!/\blang\s*\(/.test(oc), 'menu flag onclick has no bare lang() call (would throw in an inline handler): '+JSON.stringify(oc));
ok(/toggleLang\s*\(\s*\)/.test(oc), 'menu flag onclick routes through toggleLang()');
ok(ev("typeof toggleLang")==='function', 'toggleLang() is a global function');
ok(ev("(function(){DB.lang='en';var g=null,o=setLang;setLang=function(x){g=x};try{toggleLang()}finally{setLang=o}return g})()")==='it', 'toggleLang() from EN requests IT');
ok(ev("(function(){DB.lang='it';var g=null,o=setLang;setLang=function(x){g=x};try{toggleLang()}finally{setLang=o}return g})()")==='en', 'toggleLang() from IT requests EN');

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
// all 12 INFO popup bodies translate (none fall back to English)
ok(ev("(function(){var all=true;Object.keys(INFO_TEXT).forEach(function(k){showInfo(k);var en=INFO_TEXT[k].h;if(document.getElementById('infoBody').innerHTML.indexOf(en.slice(3,40))>=0)all=false;});return all})()"), 'all 12 INFO bodies translate to Italian');

// 7. Cutscene narrative translates (arrival + warden + victory).
ok(ev("t(ARRIVAL_LINES[3])")!==ev("ARRIVAL_LINES[3]") && /Porta delle Braci/.test(ev("t(ARRIVAL_LINES[3])")), 'arrival narrative translates');
ok(/Brucia intensamente/.test(ev("t(DUNGEON[0].quote)")), 'warden quote (Grakk) translates');
ok(/cripta/.test(ev("t(DUNGEON[2].guffFreed[0])")), 'victory narrative (guffFreed) translates');
ok(ev("t('legendary')")==='leggendario' && ev("t('rare')")==='raro', 'shop rarity words translate');

// 7b. The campaign screen translates via the _trText chokepoint + wrapped title/teaser.
ev("window.alert=function(){};DB.lang='it';if(!prof()){DB.profiles.T={name:'T',camp:{gold:0,pending:[],stash:[],cleared:{},level:0,run:null},sand:{gold:0,pending:[],stash:[],save:null,stats:{}},library:[],tokens:[],seenTutorial:true};DB.active='T';}");
ev("openCampaign()");
const camp=D.getElementById('campaign').innerHTML;
ok(/Tana delle Braci/.test(camp), 'campaign screen: the level name translates');
ok(/labirinto discendente/.test(camp), 'campaign screen: the teaser translates');

// 7c. Combat resolver + attack panel translate.
ev("DB.lang='it';fresh('standard');S.activeTurn='you';S.phase=4;S.my.creatures=[{id:1,name:'X',p:3,t:3,baseP:3,baseT:3,kw:[],color:[],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,_atk:true,dies:'graveyard'}];render();");
ev("openCombat('you',[S.my.creatures[0]],vaelDefenders(),{})");
ok(/Il tuo attacco/.test(D.getElementById('combatTitle').textContent), 'combat resolver title translates');
ok(/Conferma e applica/.test(D.getElementById('resolver').innerHTML), 'combat resolver Approve button translates');
ev("cancelCombat()");

// 7d. The full tutorial has an Italian version (keeping MTG keywords + Scryfall English).
ev("DB.lang='it';openTutorial()");
const tut=D.getElementById('modalBody').innerHTML;
ok(/Come funziona Guff's Gauntlet/.test(tut), 'the full tutorial translates to Italian');
ok(/planeswalker/.test(tut) && /Scryfall/.test(tut), 'the tutorial keeps MTG keywords + Scryfall in English');
ev("DB.lang='en';openTutorial()");
ok(/How Guff's Gauntlet works/.test(D.getElementById('modalBody').innerHTML), 'the English tutorial is unchanged');

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

// 11b. P49.6 FIX (regression): clicking the REAL menu flag button dispatches its inline onclick
//      without throwing "lang is not a function" (the reported bug) and toggles the language.
//      Runs after the §9 error gate because setLang's location.reload() logs the benign jsdom
//      navigation artifact; we only assert no "is not a function" error appears here.
ev("DB.lang='en'");
const _clickErr=errors.length;
try{ D.getElementById('menuLangBtn').click(); }catch(e){ errors.push('click-threw:'+(e&&e.message)); }
ok(ev("DB.lang")==='it', 'clicking the menu flag button toggles DB.lang en->it');
ok(!errors.slice(_clickErr).some(m=>/is not a function/i.test(String(m))), 'clicking the flag button does not throw "lang is not a function"');

console.log(fail?'P49.6 FAILED':'P49.6 PASSED');
process.exit(fail?1:0);
