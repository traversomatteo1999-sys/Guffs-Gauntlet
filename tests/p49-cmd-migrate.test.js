// P49 fix: migrate() re-syncs a stale saved S.cmd (pre-P38.3/P48.3/P49.11) to the current
// room's commander definition. Repro of the bug: Ash the Guardian resumed from an old save
// entered as a 6/6 CREATURE with the OLD +1/-3 abilities.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

const vaelIdx = ev("DUNGEON.length-1"); // Vael's throne = Ash the Guardian commander

// --- Build an OLD-style save: a 6/6 creature commander with stale abilities, IN PLAY ---
ev(`fresh('standard');
    S.roomIndex=${vaelIdx};
    S.cmd={id:'cmd',n:'Vael, the Ember Tyrant',p:6,t:6,baseP:6,baseT:6,kw:['trample'],
           color:['R','B'],baseCost:5,cost:5,tax:0,deaths:2,inPlay:true,inHand:false,
           sick:false,tapped:true,plus:2,minus:0,other:['goad'],
           /* stale abilities from before P49.11 */
           wplus:{sign:1,n:'Ember Whisper',text:'you lose 2 life',run:['playerLose',2]},
           wminus:{sign:-3,n:'Cinder Grip',run:['destroyMaxPow']}};`);
// migrate a deep copy of the live S (what continueLastGame does)
ev("S=migrate(JSON.parse(JSON.stringify(S)));");

const spec = "DUNGEON["+vaelIdx+"].cmd";

// static identity re-synced from the room
ok(ev(`S.cmd.n===${spec}.n`), 'name re-synced to the current commander (Ash the Guardian)');
ok(ev("S.cmd.isWalker===true"), 'isWalker restored → resolves as a planeswalker, not a creature');
ok(ev("(S.cmd.p||0)===0 && (S.cmd.t||0)===0"), 'stale 6/6 creature body cleared (p/t → 0)');
ok(ev(`S.cmd.wplus && S.cmd.wplus.run && S.cmd.wplus.run[0]==='spawn' && S.cmd.wplus.run[1]==='Ash Soldier'`), '+1 is now the new "Ashen Muster" (spawn 1/1 Ash Soldier)');
ok(ev("JSON.stringify(S.cmd.wplus.run).indexOf('haste')>=0"), '+1 Ash Soldier has haste');
ok(ev(`S.cmd.wminus && S.cmd.wminus.run && S.cmd.wminus.run[0]==='ashReanimate' && !S.cmd.wminus.target`), '-3 is now the "Grasping Ash" graveyard reanimator (no destroy target)');
ok(ev("S.cmd.ultThreshold===7 && S.cmd.wult && S.cmd.wult.ult===true"), 'ultimate (Avatar of Ash) present at threshold 7');
ok(ev("S.cmd.baseLoy===4 && typeof S.cmd.loyalty==='number'"), 'walker gains loyalty/baseLoy');

// LIVE battle state preserved through the re-sync
ok(ev("S.cmd.inPlay===true"), 'live inPlay preserved');
ok(ev("S.cmd.tapped===true"), 'live tapped preserved');
ok(ev("S.cmd.plus===2"), 'live +1/+1 counters preserved');
ok(ev("Array.isArray(S.cmd.other) && S.cmd.other.indexOf('goad')>=0"), 'live markers (goad) preserved');
ok(ev("S.cmd.czCasts===2"), 'legacy deaths folded into czCasts (command-zone cast count)');
ok(ev("S.cmd.baseCost===5 && S.cmd.cost===5"), 'baseCost re-synced, cost = base + tax(0)');

// --- A CREATURE commander (Murglax → Slagmaw 5/5) must NOT be turned into a walker ---
const murgIdx = ev("var i=-1;DUNGEON.forEach((r,k)=>{if(r.cmd && !r.cmd.isWalker && r.cmd.p)i=k;});i");
ok(murgIdx>=0, 'found a creature-commander room to guard against over-conversion');
ev(`fresh('standard');S.roomIndex=${murgIdx};
    S.cmd={id:'cmd',n:'???',p:3,t:3,baseP:3,baseT:3,kw:[],color:['B'],baseCost:4,cost:4,tax:0,inPlay:true,sick:false,tapped:false,plus:0,minus:0,other:[]};
    S=migrate(JSON.parse(JSON.stringify(S)));`);
ok(ev(`S.cmd.isWalker!==true`), 'a creature commander stays a creature (not misclassified as a walker)');
ok(ev(`S.cmd.p===DUNGEON[${murgIdx}].cmd.p && S.cmd.t===DUNGEON[${murgIdx}].cmd.t`), 'creature commander p/t re-synced to the room spec');
ok(ev("typeof S.cmd.loyalty==='undefined'"), 'creature commander has no loyalty');

// --- Idempotent: a fresh (current) commander survives migrate unchanged ---
ev(`fresh('standard');S.roomIndex=${vaelIdx};enterRoom(${vaelIdx});var b=JSON.stringify({n:S.cmd.n,w:S.cmd.isWalker,p:S.cmd.p});S=migrate(JSON.parse(JSON.stringify(S)));S._after=JSON.stringify({n:S.cmd.n,w:S.cmd.isWalker,p:S.cmd.p});S._before=b;`);
ok(ev("S._before===S._after"), 'migrate is idempotent on a current (fresh) commander');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P49-CMD-MIGRATE FAILED':'P49-CMD-MIGRATE PASSED');
process.exit(fail?1:0);
