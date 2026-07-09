// P50.6: per-card options (keywords, ±P/T, counters, markers, properties drawer) on commanders too —
// (a) the player's command-zone commander (S.pcmd) and (b) the enemy walker-commander (cmdFieldCard).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// ---- 'pcmd' scope resolves to S.pcmd through the generic accessors ----
ev("S.pcmd={name:'My Cmdr',kind:'creatures',p:3,t:3,baseP:3,baseT:3,plus:0,minus:0,other:[],kw:[],prot:[],color:['R'],cmdTax:0,czCasts:0,cmdInHand:false}");
ok(ev("getObj('pcmd',null)")!==null && ev("getObj('pcmd',null).name")==='My Cmdr', 'P50.6: getObj resolves the pcmd scope to S.pcmd');
ok(ev("getCre('pcmd',null).name")==='My Cmdr', 'P50.6: getCre resolves the pcmd scope');

// ---- (a) editing the command-zone commander via the generic helpers ----
ev("objPT('pcmd',null,'p',2)");   ok(ev("S.pcmd.p")===5, 'P50.6a: objPT bumps the pcmd power (3→5)');
ev("objPT('pcmd',null,'t',-1)");  ok(ev("S.pcmd.t")===2, 'P50.6a: objPT lowers the pcmd toughness (3→2)');
ev("objPT('pcmd',null,'p',-99)"); ok(ev("S.pcmd.p")===0, 'P50.6a: objPT clamps at 0');
ev("addKw('pcmd',null,'flying')");ok(ev("S.pcmd.kw.includes('flying')"), 'P50.6a: addKw gives the pcmd a keyword');
ev("setCtr('pcmd',null,'plus',2)");ok(ev("S.pcmd.plus")===2, 'P50.6a: setCtr adds +1/+1 counters to the pcmd');
ev("toggleMarker('pcmd',null,'goad')");ok(ev("(S.pcmd.other||[]).includes('goad')"), 'P50.6a: toggleMarker (goad) works on the pcmd');
ev("togglePermKw('pcmd',null,'hexproof')");ok(ev("S.pcmd.kw.includes('hexproof')"), 'P50.6a: a properties keyword (hexproof) toggles on the pcmd');
// the box actually renders the editor
ev("renderPlayerCmd()");
const cmdHtml=ev("document.getElementById('pcmdBox').innerHTML");
ok(/objPT\('pcmd'/.test(cmdHtml), 'P50.6a: the command-zone box renders ±P/T controls');
ok(/setCtr\('pcmd'|ctrCustom\('pcmd'/.test(cmdHtml), 'P50.6a: the box renders counter controls');
ok(/kwSelect|＋kw/.test(cmdHtml) || /addKw\('pcmd'/.test(cmdHtml), 'P50.6a: the box renders a keyword add control (creature commander)');
ok(/toggleDrawer\('pcmd'/.test(cmdHtml), 'P50.6a: the box renders a properties drawer toggle');
// open the drawer → full editor
ev("S.pcmd._drawer=true;renderPlayerCmd()");
ok(/setObjF\('pcmd'|colorToggles|flagObj\('pcmd'/.test(ev("document.getElementById('pcmdBox').innerHTML")), 'P50.6a: opening properties renders the full editor');

// edits persist onto the battlefield when the commander is deployed
ev("S.pcmd._drawer=false;S.pcmd.kw=['flying'];S.pcmd.plus=2;deployCmd()");
ok(ev("S.my.creatures.some(c=>c.isCmd===undefined?false:false) || S.my.creatures.length>0"), 'P50.6a: deployCmd put the commander on the battlefield');
ok(ev("S.my.creatures[S.my.creatures.length-1].kw.includes('flying') && S.my.creatures[S.my.creatures.length-1].plus===2"), 'P50.6a: the pre-edits (kw + counters) carried onto the board');

// ---- (b) the enemy WALKER-commander gets a properties drawer + counters ----
ev("fresh('standard');S.cmd={n:'Ash the Guardian',isWalker:true,loyalty:4,baseLoy:4,ultThreshold:7,plus:0,minus:0,other:[],prot:[],kw:[],color:['R'],wplus:{sign:1,n:'x',text:'x'},wminus:{sign:-3,n:'y',text:'y'},wult:{sign:-7,n:'z',text:'z',ult:true}}");
const wc=ev("cmdFieldCard()");
ok(/toggleDrawer\('cmd'/.test(wc), 'P50.6b: the walker-commander card shows a properties drawer toggle');
ok(/permCtrBtns|setCtr\('cmd'|ctrCustom\('cmd'/.test(wc), 'P50.6b: the walker-commander card shows counter controls');
// open its drawer
ev("S.cmd._drawer=true");
const wcOpen=ev("cmdFieldCard()");
ok(/togglePermKw\('cmd'|colorToggles/.test(wcOpen), 'P50.6b: opening the drawer renders prot/keywords (commonPermRow)');
// markers now work on the walker-commander (getObj fix)
ev("toggleMarker('cmd',null,'monarch')");
ok(ev("(S.cmd.other||[]).includes('monarch')"), 'P50.6b: toggleMarker works on the enemy walker-commander (getObj fix)');
ev("togglePermKw('cmd',null,'indestructible')");
ok(ev("S.cmd.kw.includes('indestructible')"), 'P50.6b: a properties keyword toggles on the walker-commander');

// regression: the enemy CREATURE-commander still renders its existing editor
ev("fresh('standard');S.cmd={n:'Grakk',isWalker:false,p:5,t:5,baseP:5,baseT:5,plus:0,minus:0,other:[],prot:[],kw:[],color:['R'],tapped:false,phased:false}");
ok(/kwSelect|＋kw|cmdCtr|cmdPT/.test(ev("cmdFieldCard()")), 'P50.6: the enemy creature-commander editor is unchanged');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.6 FAILED':'P50.6 PASSED');
process.exit(fail?1:0);
