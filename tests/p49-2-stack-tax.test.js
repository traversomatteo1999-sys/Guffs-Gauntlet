// P49.2: newest-on-top stack render (#12) · countered spell -> graveyard (#15A) · real-MTG commander tax (#15B).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const $=id=>window.document.getElementById(id);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// --- Bullet 12: renderPlays shows newest on top, TRUE index preserved ---
ev("S.plays=[{id:101,_player:true,name:'First',type:'instant',status:'pending',color:['R']},{id:102,_player:true,name:'Second',type:'instant',status:'pending',color:['U']}];renderPlays();");
const cards=$('playCards').querySelectorAll('.playcard');
ok(/Second/.test(cards[0].innerHTML),'newest (Second) renders first (visual top)');
ok(/TOP ▸/.test(cards[0].innerHTML),'the visual-top card carries the TOP badge');
ok(/Second/.test(cards[0].innerHTML)&&/resolvePlay\(1\)/.test(cards[0].innerHTML),'top card uses true index 1 in its handler');
ok(/First/.test(cards[1].innerHTML)&&/resolvePlay\(0\)/.test(cards[1].innerHTML),'bottom card is First with true index 0');
// LIFO unchanged: resolveStack still resolves newest first — array order intact
ok(ev("S.plays[0].name==='First'&&S.plays[1].name==='Second'"),'underlying S.plays order unchanged (push/LIFO intact)');

// --- Bullet 15A: countered non-commander player spell -> graveyard ---
ev("fresh('standard');S.myGy=[];var tp={id:201,_player:true,name:'Shock',ctype:'instant',type:'instant',color:['R'],status:'pending'};S.plays=[tp];counterPlayerSpell(tp);");
ok(ev("S.myGy.length===1&&S.myGy[0]._spell===true&&S.myGy[0].name==='Shock'"),'countered instant lands in your graveyard as a _spell record');
ok(ev("S.plays.length===0"),'countered spell left the stack');
// a countered commander goes to the command zone, NOT the graveyard
ev("S.myGy=[];S.pcmd=null;var c={name:'Warlord',kind:'creatures',color:['R'],p:4,t:4,cmdInHand:false,cmdTax:0,czCasts:0,cmdDeaths:0};var it={id:202,_player:true,_pcmd:true,_pcmdObj:c,name:'♛ Warlord',ctype:'creature',status:'pending'};S.plays=[it];counterPlayerSpell(it);");
ok(ev("S.pcmd&&S.pcmd.name==='Warlord'"),'countered commander returns to the command zone');
ok(ev("S.myGy.length===0"),'countered commander does NOT go to the graveyard');

// --- Bullet 15B: player commander tax = +2 per PREVIOUS command-zone cast ---
ev("fresh('standard');S.pcmd={name:'Warlord',kind:'creatures',color:['R'],p:4,t:4,cmdInHand:false,cmdTax:0,czCasts:0,cmdDeaths:0};");
ev("castCmd();window.__it=S.plays[S.plays.length-1];");
ok(ev("window.__it&&window.__it._pcmd===true"),'castCmd puts a _pcmd play on the stack');
ok(ev("window.__it._pcmdObj.czCasts===1&&window.__it._pcmdObj.cmdTax===2"),'first CZ cast bumps czCasts=1, tax=+2 (for next time)');
// counter it -> back to zone, tax UNCHANGED by the counter
ev("counterPlayerSpell(window.__it);");
ok(ev("S.pcmd&&S.pcmd.cmdTax===2&&S.pcmd.czCasts===1"),'counter returns it at tax 2 (not bumped by the counter)');
// second CZ cast -> tax +4
ev("castCmd();");
ok(ev("S.plays[S.plays.length-1]._pcmdObj.czCasts===2&&S.plays[S.plays.length-1]._pcmdObj.cmdTax===4"),'second CZ cast: czCasts=2, tax=+4');
// a HAND cast is untaxed and does NOT bump
ev("counterPlayerSpell(S.plays[S.plays.length-1]);S.pcmd.cmdInHand=true;var beforeCz=S.pcmd.czCasts,beforeTax=S.pcmd.cmdTax;castCmd();window.__hb=[beforeCz,beforeTax];");
ok(ev("S.plays[S.plays.length-1]._pcmdObj.czCasts===window.__hb[0]&&S.plays[S.plays.length-1]._pcmdObj.cmdTax===window.__hb[1]"),'hand cast does not bump czCasts/tax');
// Deploy direct from the command zone counts as a CZ cast
ev("fresh('standard');S.pcmd={name:'W2',kind:'creatures',color:['R'],p:2,t:2,cmdInHand:false,cmdTax:0,czCasts:0,cmdDeaths:0};var c2=S.pcmd;deployCmd();window.__c2=c2;");
ok(ev("window.__c2.czCasts===1&&window.__c2.cmdTax===2"),'Deploy direct from the command zone is taxed + bumps (no dodge)');

// --- 15B: enemy commander CZ cast bumps tax; a death does NOT ---
ev("fresh('standard');S.activeTurn='vael';S.cmd.inPlay=false;S.cmd.inHand=false;S.cmd.tax=0;S.cmd.czCasts=0;S.bossMana=25;S.bossManaFrozen=0;S.hand=[];S.plays=[];vaelMain(1);");
ok(ev("S.plays.some(p=>p._enemyCmd)"),'enemy cast its commander from the command zone');
ok(ev("S.cmd.czCasts===1&&S.cmd.tax===2"),'enemy CZ cast bumped czCasts=1, tax=2');
// a death returns it to the zone at the same tax (no bump)
ev("S.cmd.inPlay=true;removeRef(S.cmd);");
ok(ev("S.cmd.tax===2"),'enemy commander death does NOT bump the tax');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,8));fail++;}
console.log(fail?'P49.2 FAILED':'P49.2 PASSED');
process.exit(fail?1:0);
