// P49.7: Level-1 "To be continued…" ending (#8) + Abandon-campaign button (#29).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const $=id=>window.document.getElementById(id);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// --- Bullet 8: final-level win cutscene BEAT 3 = single "To be continued…" ---
ok(ev("S.levelIdx>=LEVELS.length-1"),'Level I is the final level (levelIdx>=len-1)');
ev("winCutscene({names:['Bolt']},'landed g50')");   // BEAT 1
ev("cutAct(0)");                                     // -> BEAT 2
ev("cutAct(0)");                                     // -> BEAT 3
let btns=$('cutBtns').innerHTML;
console.log('BEAT3 btns:',btns.replace(/<[^>]+>/g,'|'));
ok(/To be continued/.test(btns),'BEAT 3 shows "To be continued…"');
ok(!/Descend again/.test(btns),'no "↻ Descend again" on the final level');
ok(($('cutBtns').querySelectorAll('button').length)===1,'exactly one BEAT-3 action');
// clicking it quits to menu (clears live game, shows menu)
ev("cutAct(0)");
ok(!$('cutscene').classList.contains('show'),'clicking closes the cutscene');
ok($('menu')&&$('menu').classList.contains('show'),'menu shown after "To be continued…"');

// --- Bullet 29: abandonCampaign resets the run only, preserving gold/stash/cleared ---
ev(`(function(){var p=prof();p.camp={gold:77,pending:[{n:'x'}],stash:[{n:'s'}],cleared:{'warren:grakk':true},level:1,run:{S:{roomIndex:1,turn:4,over:false},turn:4,room:1}};saveDB();})()`);
ok(ev("hasSave('campaign')===true"),'a campaign run exists pre-abandon');
ev("openCampaign()");
ok(/Abandon campaign/.test($('campList').innerHTML),'Abandon button rendered on the current-level row');
ev("abandonCampaign()");
ok($('cutscene').classList.contains('show'),'abandon opens a confirm cutscene');
ev("cutAct(0)");   // confirm "✕ Abandon run"
ok(ev("prof().camp.run===null"),'run is null after abandon');
ok(ev("prof().camp.gold===77"),'gold preserved');
ok(ev("prof().camp.stash.length===1"),'stash preserved');
ok(ev("prof().camp.pending.length===1"),'pending preserved');
ok(ev("prof().camp.cleared['warren:grakk']===true"),'cleared ledger preserved');
ok(ev("prof().camp.level===1"),'unlock level preserved');
ok(ev("hasSave('campaign')===false"),'hasSave now false');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P49.7 FAILED':'P49.7 PASSED');
process.exit(fail?1:0);
