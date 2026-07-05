// P33: enemy spawned creatures are token:true; bounce/exile/gy → cease; donated non-token unaffected; migrate backfill.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// 1) spawn sets token:true
ev("applyRun(['spawn','Test Ogre',3,3,['trample'],'R'])");
const spawned=ev("S.tokens[S.tokens.length-1]");
ok(spawned && spawned.token===true, 'applyRun spawn → token===true');
ok(spawned.name==='Test Ogre' && spawned.p===3, 'spawned body has right stats');

// 2) bounce (moveBoardById token → hand) ceases it (no S.hand push)
const beforeHand=ev("S.hand.length");
const sid=spawned.id;
ev(`moveBoardById('token',${sid},'hand')`);
ok(ev(`S.tokens.some(t=>t.id===${sid})`)===false, 'bounced token removed from S.tokens');
ok(ev("S.hand.length")===beforeHand, 'bounced token did NOT enter enemy hand (ceased)');

// 3) donated real (non-token) creature is unaffected — goes to a zone, not ceased-only
ev("S.tokens.push({id:S.nextId++,name:'Donated Knight',p:2,t:2,baseP:2,baseT:2,kw:[],color:['W'],plus:0,minus:0,other:[],tapped:false,sick:false,token:false,_controlled:true,dies:'graveyard',key:null})");
const did=ev("S.tokens[S.tokens.length-1].id");
const handBefore2=ev("S.hand.length"), gyBefore=ev("S.gy.length");
ev(`moveBoardById('token',${did},'hand')`);
ok(ev(`S.tokens.some(t=>t.id===${did})`)===false, 'donated creature left the board');
ok(ev("S.hand.length")>handBefore2 || ev("S.gy.length")>gyBefore, 'donated non-token went to a zone (not ceased-only)');

// 4) slay still ceases a token
ev("applyRun(['spawn','Slayme',1,1,[],'R'])");
const slid=ev("S.tokens[S.tokens.length-1].id");
const gyB=ev("S.gy.length");
ev(`slay(${slid})`);
ok(ev(`S.tokens.some(t=>t.id===${slid})`)===false,'slain token removed from board');
ok(ev("S.gy.length")===gyB,'slain token ceased (no graveyard record)');

// 5) migrate backfills spawned bodies only (no key, not _controlled), not donated non-tokens.
// Take a real save shape (current S), inject three old-style tokens, run migrate.
const migr=ev(`(function(){
  var s=JSON.parse(JSON.stringify(S));
  s.tokens=[{id:901,name:'oldspawn',p:2,t:2},
            {id:902,name:'olddonated',p:1,t:1,_controlled:true,token:false},
            {id:903,name:'oldreal',p:1,t:1,key:'whelp'}];
  var m=migrate(s);
  var g={}; m.tokens.forEach(function(t){g[t.name]=t.token;});
  return g;
})()`);
ok(migr.oldspawn===true, 'migrate: spawned body (no key/_controlled) backfilled token:true');
ok(migr.olddonated===false, 'migrate: donated non-token left token:false');
ok(migr.oldreal!==true, 'migrate: card-keyed body not force-flagged as token');
console.log('migrate result:', JSON.stringify(migr));

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P33 FAILED':'P33 PASSED');
process.exit(fail?1:0);
