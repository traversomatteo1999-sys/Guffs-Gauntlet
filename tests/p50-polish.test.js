// P50.7 (rename the card sharing a warden's exact name) · P50.11 (walker-commander reads as a
// planeswalker on the stack) · P50.13 (no tax badge on the enemy commander card face).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// ---- P50.7: no FX card may be a warden's VERBATIM name ----
ok(ev("FX.tyrant.n")==="Servant of the Pit-Tyrant", 'P50.7: tyrant FX renamed to "Servant of the Pit-Tyrant"');
ok(ev("FX.tyrant.key")===undefined || ev("'tyrant' in FX"), 'P50.7: the FX key "tyrant" is preserved');
// gather the exact warden names from the dungeon and assert no FX card name collides
const collides = ev(`(function(){
  var wardens=DUNGEON.map(r=>r.villain).filter(Boolean);
  return Object.keys(FX).filter(k=>wardens.indexOf(FX[k].n)>=0);
})()`);
ok(Array.isArray(collides) && collides.length===0, 'P50.7: no FX card name equals a warden\'s exact name ('+(collides&&collides.join(',')||'')+')');
// possessive/related names are still fine (regression: overlord stays)
ok(ev("FX.overlord.n")==="Murglax's Overlord", 'P50.7: possessive Overlord name untouched (related-but-different is allowed)');
// the room's warden name itself is unchanged
ok(ev("DUNGEON.some(r=>r.villain==='Murglax, Pit-Tyrant')"), 'P50.7: the warden "Murglax, Pit-Tyrant" room name is unchanged');

// ---- P50.11: the enemy walker-commander is a PLANESWALKER on the stack ----
function driveCmdCast(isWalker){
  ev(`fresh('standard');
    S.hand=[];S.lib=[];S.enemyWalkers=[];S.tokens=[];S.plays=[];
    S.bossMana=20;S.bossManaMax=20;S.bossLands=20;S.bossPool=null;S.bossSrc=null;S.bossManaFrozen=0;S.bossLandPlayed=true;
    S.cmd={n:'Ash the Guardian',isWalker:${isWalker},inPlay:false,inHand:false,baseCost:4,cost:4,tax:0,czCasts:0,
           loyalty:4,baseLoy:4,ultThreshold:7,p:0,t:0,plus:0,minus:0,kw:[],prot:[],other:[],
           wplus:{sign:1,n:'x',run:['spawn','A',1,1,[],'R']},wminus:{sign:-3,n:'y',run:['ashReanimate']},wult:{sign:-7,n:'z',ult:true,run:['spawn','B',8,8,[],'R']}};
    vaelMain(1);`);
  return ev("(S.plays.find(p=>p._enemyCmd)||{}).type");
}
ok(driveCmdCast(true)==='planeswalker', 'P50.11: a walker-commander pushes to the stack as type "planeswalker"');
ok(driveCmdCast(false)==='creature',   'P50.11: a creature-commander still pushes as type "creature"');
// the stack renders the right badge (renderPlays derives the typechip from type → #playCards)
ev(`fresh('standard');S.plays=[{id:1,_enemyCmd:true,side:'boss',status:'pending',n:'Ash the Guardian',type:'planeswalker',cost:4,color:'RB',text:'x'}];renderPlays();`);
ok(/typechip planeswalker/.test(ev("document.getElementById('playCards').innerHTML")), 'P50.11: renderPlays shows a "planeswalker" typechip for the walker-commander stack item');

// ---- P50.13: no "tax +N" indicator on the enemy commander card face ----
ev(`fresh('standard');
   S.cmd={n:'Ash the Guardian',isWalker:true,tax:6,czCasts:3,loyalty:4,baseLoy:4,ultThreshold:7,p:0,t:0,plus:0,minus:0,kw:[],prot:[],other:[],
          wplus:{sign:1,n:'x',text:'x'},wminus:{sign:-3,n:'y',text:'y'},wult:{sign:-7,n:'z',text:'z',ult:true}};`);
ok(!/tax \+/.test(ev("cmdFieldCard()")), 'P50.13: taxed WALKER commander card shows no "tax +N" badge');
ok(/planeswalker/.test(ev("cmdFieldCard()")), 'P50.13: the walker card still renders (planeswalker tag present)');
ev(`fresh('standard');
   S.cmd={n:'Grakk',isWalker:false,tax:4,czCasts:2,p:5,t:5,baseP:5,baseT:5,plus:0,minus:0,sick:false,kw:[],prot:[],other:[],tapped:false,phased:false};`);
ok(!/tax \+/.test(ev("cmdFieldCard()")), 'P50.13: taxed CREATURE commander card shows no "tax +N" badge');
ok(/5\/5/.test(ev("cmdFieldCard()")), 'P50.13: the creature card still renders its P/T');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P50-polish FAILED':'P50-polish PASSED');
process.exit(fail?1:0);
