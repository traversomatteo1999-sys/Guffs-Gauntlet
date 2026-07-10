// P52.8: starting a New run auto-closes the menu/campaign/sandbox windows (front-loaded + guaranteed after startBattle).
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const D=window.document;
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const has=(id,c)=>{const e=D.getElementById(id);return !!e&&e.classList.contains(c);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("window.alert=function(){};");
ev("if(!prof()){DB.profiles['T']={name:'T',camp:{gold:0,pending:[],stash:[],cleared:{},level:0,run:null},sand:{gold:0,pending:[],stash:[],save:null,stats:{}},library:[],tokens:[],seenTutorial:true};DB.active='T';}");

// 1. Source: startNewDescent front-loads closeMenusForRun.
ok(/function closeMenusForRun\(\)\{\['menu','campaign','sandbox'\]/.test(src), 'closeMenusForRun helper exists');
ok(/function startNewDescent\(\)\{closeMenusForRun\(\);/.test(src), 'startNewDescent front-loads the teardown');

// 2. closeMenusForRun immediately drops show from all three windows.
ev("fresh('standard');S.mode='campaign';openCampaign();");
ev("$('menu').classList.add('show');$('sandbox').classList.add('show');");
ok(has('campaign','show')&&has('menu','show')&&has('sandbox','show'),'setup: all three windows shown');
ev("closeMenusForRun()");
ok(!has('campaign','show')&&!has('menu','show')&&!has('sandbox','show'),'closeMenusForRun closes all three windows');

// 3. Full New-run flow (parked run → confirm → Start new) leaves the campaign/menu closed.
ev("fresh('standard');S.mode='campaign';var p=prof();p.camp.run={S:JSON.parse(stripJSON(S)),ts:1};");
ev("openCampaign();$('menu').classList.add('show');");
ok(has('campaign','show'),'campaign window is open before New run');
// campaignStart sees a live run -> confirmNewDescent (shows the abandon cutscene); simulate the "Start new" click:
ev("startNewDescent();");
ok(!has('campaign','show'),'campaign window is CLOSED after starting the new run');
ok(!has('menu','show'),'menu window is CLOSED after starting the new run');
ok(has('overlay','show'),'the commander picker (#overlay) is open — the new run is starting');
ok(!has('cutscene','show'),'the abandon-confirm cutscene is closed');

// 4. Direct (no parked run) path also closes the windows.
ev("var p=prof();p.camp.run=null;fresh('standard');openCampaign();$('menu').classList.add('show');");
ev("campaignStart();");
ok(!has('campaign','show')&&!has('menu','show'),'direct campaignStart path also closes the windows');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P52.8 FAILED':'P52.8 PASSED');
process.exit(fail?1:0);
