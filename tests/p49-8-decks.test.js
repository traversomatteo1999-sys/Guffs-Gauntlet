// P49.8: colour-loyal relic removal in every deck (#9) · deeper per-difficulty variation (#25) · Grakk ramp permanent (#26).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

const ROOMS={grakk:0,murglax:1,vael:2};
// find the room indices by villain
ev("window.__ri={};DUNGEON.forEach((r,i)=>{if(/Grakk/.test(r.villain))window.__ri.grakk=i;if(/Murglax/.test(r.villain))window.__ri.murglax=i;if(/Vael/.test(r.villain))window.__ri.vael=i;});");

// --- Bullet 9: each warden's naturalize FX exists, colour ⊆ room colours ---
const natur={grakk:['grakksmash','R'],murglax:['murgrot','B'],vael:['vaeldisjunct','RB']};
for(const w of Object.keys(natur)){
  const [key,col]=natur[w];
  ok(ev(`FX['${key}']&&FX['${key}'].target==='naturalize'`),`${w}: ${key} is a naturalize card`);
  ok(ev(`'${col}'.split('').every(c=>DUNGEON[window.__ri.${w}].colors.includes(c))`),`${w}: ${key} colour ⊆ room colours`);
}

// --- the naturalize driver actually destroys a player permanent ---
ev("S.roomIndex=window.__ri.grakk;S.my.artifacts=[{id:601,name:'Signet',kind:'passive',color:['C'],prot:[],other:[]}];S.my.enchants=[];");
ok(ev("enemyInstantWouldDo(FX['grakksmash'])===true"),'naturalize would-do is true with a player artifact present');
ev("applyTarget('naturalize',['R'])");
ok(ev("S.my.artifacts.length===0"),'applyTarget(naturalize) destroyed the player artifact');

// --- Bullet 26: Grakk's ramp permanent lands on the enemy board and ramps ---
ev("fresh('standard');S.roomIndex=window.__ri.grakk;S.enemyArtifacts=[];var before=S.bossLands||0;var p={id:611,type:'artifact',n:'Ember Idol',color:'R',run:['ramp',1],_card:{key:'emberidol'}};S.plays=[p];p.status='pending';resolvePlay(0);window.__ramped=(S.bossLands||0)-before;");
ok(ev("window.__ramped===1"),'Ember Idol ramps +1 mana source on resolve');
ok(ev("S.enemyArtifacts.some(a=>a.name==='Ember Idol')"),'Ember Idol becomes a real enemy artifact permanent');

// --- Bullet 25: card identity differs across difficulties + every card resolves ---
for(const w of Object.keys(ROOMS)){
  const [key]=natur[w];
  // count copies of the naturalize in each difficulty's deck
  const counts={};
  for(const df of ['easy','standard','brutal']){
    ev(`S.diff='${df}';window.__deck=buildDeck(DUNGEON[window.__ri.${w}]);`);
    counts[df]=ev(`window.__deck.filter(c=>c.key==='${key}').length`);
    // every card key resolves to a real FX or land (no dangling keys)
    ok(ev(`window.__deck.every(c=>!!FX[c.key])`),`${w}/${df}: every deck card maps to a real FX`);
    const n=ev("window.__deck.length");
    ok(n>=70&&n<=140,`${w}/${df}: deck size sane (${n})`);
  }
  console.log(`${w} naturalize copies — easy:${counts.easy} std:${counts.standard} brutal:${counts.brutal}`);
  ok(counts.easy===0,`${w}: easy runs NO relic removal`);
  ok(counts.standard===1,`${w}: standard runs one`);
  ok(counts.brutal===2,`${w}: brutal runs two (denser)`);
}

// --- land ratio stays sane (≈ 33–42%) on standard ---
ev("S.diff='standard';window.__gd=buildDeck(DUNGEON[window.__ri.grakk]);window.__lands=window.__gd.filter(c=>FX[c.key]&&FX[c.key].type==='land').length;");
ok(ev("window.__lands/window.__gd.length>0.28&&window.__lands/window.__gd.length<0.45"),'Grakk land ratio still sane');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,8));fail++;}
console.log(fail?'P49.8 FAILED':'P49.8 PASSED');
process.exit(fail?1:0);
