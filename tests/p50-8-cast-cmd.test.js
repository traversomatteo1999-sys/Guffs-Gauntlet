// P50.8: cast the commander from the "✦ Cast a spell" launcher (a) + a walker-commander cast
// triggers player prowess on resolve (b), matching resolvePlayerItem (a creature commander doesn't).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("window.alert=function(){}");   // jsdom has no real alert(); the guard paths call it
ev("fresh('standard')");

// ---- (a) the launcher surfaces the commander only when it's castable from the zone/hand ----
ev("S.pcmd={name:'My Cmdr',kind:'creatures',p:3,t:3,color:['R'],cmdInHand:false,cmdTax:2,czCasts:1}");
ok(/castCmdFromSearch/.test(ev("cardSearchHTML()")), 'P50.8a: the launcher shows a ✦ Cast-commander row when S.pcmd exists');
ok(/My Cmdr/.test(ev("cardSearchHTML()")), 'P50.8a: it names the commander');
ev("S.pcmd=null");
ok(!/castCmdFromSearch/.test(ev("cardSearchHTML()")), 'P50.8a: no row when the commander is not in the command zone/hand');

// castCmdFromSearch casts to the stack + clears S.pcmd
ev("fresh('standard');S.pcmd={name:'My Cmdr',kind:'creatures',p:3,t:3,color:['R'],cmdInHand:false,cmdTax:0,czCasts:0};S.plays=[];castCmdFromSearch()");
ok(ev("S.plays.some(p=>p._pcmd)"), 'P50.8a: castCmdFromSearch puts the commander on the stack (via castCmd)');
ok(ev("S.pcmd")===null, 'P50.8a: S.pcmd is cleared once cast');

// guard: game over → no-op
ev("fresh('standard');S.over=true;S.pcmd={name:'X',kind:'creatures'};S.plays=[];castCmdFromSearch();S.over=false");
ok(ev("S.plays.length")===0, 'P50.8a: guarded when the game is over');
// guard: no pcmd → no-op (no throw)
ev("fresh('standard');S.pcmd=null;S.plays=[];castCmdFromSearch()");
ok(ev("S.plays.length")===0, 'P50.8a: guarded when no commander is in the zone');

// ---- (b) prowess fires on a WALKER-commander resolve, NOT a creature-commander ----
const setup=`S.my.creatures=[{id:1,name:'Prowler',p:2,t:2,baseP:2,baseT:2,kw:['prowess'],prot:[],plus:0,minus:0,other:[],_tp:0,_tt:0,phased:false}];`;
// walker commander resolves → prowess (+1/+1 until EOT on the prowess creature)
ev(`fresh('standard');${setup}resolveCmdToBoard({_pcmdObj:{name:'Ash',kind:'walkers',loyalty:4,color:['R']}})`);
ok(ev("S.my.creatures[0]._tp")===1 && ev("S.my.creatures[0]._tt")===1, 'P50.8b: a walker-commander resolve triggers prowess');
// creature commander resolves → NO prowess
ev(`fresh('standard');${setup}resolveCmdToBoard({_pcmdObj:{name:'Grakk',kind:'creatures',p:5,t:5,color:['R']}})`);
ok(ev("S.my.creatures[0]._tp")===0, 'P50.8b: a creature-commander resolve does NOT trigger prowess');
// Deploy direct: walker triggers, creature does not
ev(`fresh('standard');${setup}S.pcmd={name:'Ash',kind:'walkers',loyalty:4,color:['R'],cmdInHand:false,czCasts:0,cmdTax:0};deployCmd()`);
ok(ev("S.my.creatures[0]._tp")===1, 'P50.8b: Deploy-direct of a walker commander triggers prowess');
ev(`fresh('standard');${setup}S.pcmd={name:'Grakk',kind:'creatures',p:5,t:5,color:['R'],cmdInHand:false,czCasts:0,cmdTax:0};deployCmd()`);
ok(ev("S.my.creatures[0]._tp")===0, 'P50.8b: Deploy-direct of a creature commander does NOT trigger prowess');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50.8 FAILED':'P50.8 PASSED');
process.exit(fail?1:0);
