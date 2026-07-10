// P52.4: copying a legendary planeswalker (or any legendary) opens a legend-rule popup — keep one (other → graveyard) or make the copy non-legendary.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const D=window.document;
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const shown=()=>{const e=D.getElementById('overlay');return !!e&&e.classList.contains('show');};

ev("window.alert=function(){};fresh('standard')");

// --- legendary walker ---
ev("S.my.walkers=[{id:701,name:'Teferi',loyalty:5,baseLoy:5,legendary:true,color:['U'],dies:'graveyard',token:false,prot:[]}]");
ev("copyPermanent('walkers',701)");
ok(ev("S.my.walkers.length")===2, 'the copy is created (2 Teferis on board)');
ok(shown(), 'the legend-rule popup opens for a legendary copy');
ok(/Legend rule/.test(ev("$('modalBody').innerHTML")), 'popup titled "Legend rule"');
ok(/legendKeep\('walkers'/.test(ev("$('modalBody').innerHTML")), 'popup offers keep buttons');
ok(/legendUnleg\('walkers'/.test(ev("$('modalBody').innerHTML")), 'popup offers the copy-isnt-legendary option');

// keep the original -> the copy (token) leaves the battlefield (a token ceases)
ev("legendKeep('walkers',701)");
ok(ev("S.my.walkers.length")===1 && ev("S.my.walkers[0].id")===701, 'keep-original: only the original remains');
ok(!shown(), 'popup closed after choosing');

// --- keep the COPY: the original (non-token) goes to the graveyard ---
ev("fresh('standard');S.myGy=[];S.my.walkers=[{id:701,name:'Teferi',loyalty:5,baseLoy:5,legendary:true,color:['U'],dies:'graveyard',token:false,prot:[]}]");
ev("copyPermanent('walkers',701)");
const copyId=ev("S.my.walkers.find(w=>w.id!==701).id");
ev(`legendKeep('walkers',${copyId})`);
ok(ev("S.my.walkers.length")===1 && ev("S.my.walkers[0].id")===copyId, 'keep-copy: only the copy remains');
ok(ev("S.myGy.some(c=>c.name==='Teferi')"), 'the discarded original went to your graveyard');

// --- "copy isn't legendary": both stay, copy non-legendary ---
ev("fresh('standard');S.my.walkers=[{id:701,name:'Teferi',loyalty:5,baseLoy:5,legendary:true,color:['U'],dies:'graveyard',token:false,prot:[]}]");
ev("copyPermanent('walkers',701)");
const cid2=ev("S.my.walkers.find(w=>w.id!==701).id");
ev(`legendUnleg('walkers',${cid2})`);
ok(ev("S.my.walkers.length")===2, 'unleg: both walkers stay');
ok(ev(`S.my.walkers.find(w=>w.id===${cid2}).legendary`)===false, 'the copy is now non-legendary');

// --- dismiss (closeOverlay) defaults to keeping both (copy non-legendary) ---
ev("fresh('standard');S.my.walkers=[{id:701,name:'Teferi',loyalty:5,baseLoy:5,legendary:true,color:['U'],dies:'graveyard',token:false,prot:[]}]");
ev("copyPermanent('walkers',701)");
ev("closeOverlay()");
ok(ev("S.my.walkers.length")===2 && ev("S.my.walkers.some(w=>w.legendary===false)"), 'dismissing the popup keeps both (copy non-legendary)');

// --- a NON-legendary copy does NOT pop ---
ev("fresh('standard');$('overlay').classList.remove('show');S.my.creatures=[{id:801,name:'Bear',p:2,t:2,baseP:2,baseT:2,kw:[],legendary:false,color:[],dies:'graveyard',plus:0,minus:0,other:[]}]");
ev("copyPermanent('creatures',801)");
ok(!shown(), 'copying a non-legendary creature does NOT open the legend-rule popup');
ok(ev("S.my.creatures.length")===2, 'the non-legendary copy is created normally');

// --- review regression: the prominent creature ⧉ copy button (dupMy) also honours the legend rule ---
ev("fresh('standard');$('overlay').classList.remove('show');S.my.creatures=[{id:901,name:'Kroxa',p:6,t:6,baseP:6,baseT:6,kw:[],legendary:true,color:['B'],dies:'graveyard',plus:0,minus:0,other:[]}]");
ev("dupMy('creatures',901)");
ok(shown(), "dupMy on a legendary creature opens the legend-rule popup (no bypass)");
ok(ev("S.my.creatures.length")===2, 'the dupMy copy was created');
ev("legendKeep('creatures',901)");
ok(ev("S.my.creatures.length")===1, 'legend rule resolved from the dupMy path');

// --- review regression: a non-legendary dupMy does NOT pop ---
ev("$('overlay').classList.remove('show');S.my.creatures=[{id:902,name:'Bear',p:2,t:2,baseP:2,baseT:2,kw:[],legendary:false,color:[],dies:'graveyard',plus:0,minus:0,other:[]}]");
ev("dupMy('creatures',902)");
ok(!shown(), 'dupMy on a non-legendary creature does not pop');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P52.4 FAILED':'P52.4 PASSED');
process.exit(fail?1:0);
