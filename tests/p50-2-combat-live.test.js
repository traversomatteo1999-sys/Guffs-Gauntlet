// P50.2: the combat resolver recalculates LIVE — while it's open, board changes (flash a blocker,
// an instant kills a combatant) re-derive the blocker pool and prune gone combatants, no reopen.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const cre=(id,name,p,t,extra)=>`{id:${id},name:'${name}',p:${p},t:${t},baseP:${p},baseT:${t},kw:[],plus:0,minus:0,other:[],prot:[],tapped:false,sick:false,phased:false,token:true${extra||''}}`;

// ================= enemy attacks (dir='vael') → YOU block =================
ev(`fresh('standard');
   S.tokens=[${cre(501,'Ogre',3,3)}];
   S.my.creatures=[${cre(601,'Guard',2,2,',token:false')}];
   openCombat('vael',[S.tokens[0]],[S.my.creatures[0]],{});`);
ok(ev("!!S.combat"), 'combat opened (enemy attacks)');
ok(ev("S.combat.pool.some(c=>c.id===601)"), 'the initial blocker pool has the Guard');

// (1) flash a blocker mid-combat → it appears in the live pool after render()
ev(`S.my.creatures.push(${cre(602,'Wall',0,4,',token:false')});render();`);
ok(ev("S.combat.pool.some(c=>c.id===602)"), 'P50.2: a flashed-in creature appears as an available blocker');
ok(ev("S.combat.attackers.every(a=>a.id!==602)"), 'P50.2: the flashed blocker does NOT become an attacker');

// (2) an assigned blocker that leaves the battlefield is dropped from its assignment
ev("S.combat.assign[501]=[S.my.creatures.find(c=>c.id===601)];render();");
ok(ev("(S.combat.assign['501']||[]).length")===1, 'the Guard is assigned to block the Ogre');
ev("S.my.creatures=S.my.creatures.filter(c=>c.id!==601);render();");   // the Guard is removed (e.g. an instant)
ok(ev("(S.combat.assign['501']||[]).length")===0, 'P50.2: a removed blocker is dropped from its assignment');
ok(ev("!S.combat.pool.some(c=>c.id===601)"), 'P50.2: the removed blocker is gone from the pool');

// (3) a removed ATTACKER drops from combat (and its assign key is cleaned)
ev("S.tokens=[];render();");
ok(ev("S.combat.attackers.length")===0, 'P50.2: a removed attacker is dropped from combat');
ok(ev("S.combat.assign['501']===undefined"), 'P50.2: the removed attacker\'s assign entry is cleaned');

// ================= you attack (dir='you') → the ENEMY blocks =================
ev(`fresh('standard');
   S.my.creatures=[${cre(701,'Striker',3,3,',token:false,_atk:true')}];
   S.tokens=[];
   openCombat('you',[S.my.creatures[0]],vaelDefenders(),{});`);
ok(ev("S.combat.pool.length")===0, 'you-attack: the enemy has no blockers yet');
ev(`S.tokens.push(${cre(801,'Blocker',2,2)});render();`);
ok(ev("S.combat.pool.some(c=>c.id===801)"), 'P50.2: a flashed ENEMY creature appears in the block pool on your attack');

// ================= the live refresh is NON-MUTATING (no phantom damage) =================
ev(`fresh('standard');S.youLife=40;S.boss.life=40;
   S.tokens=[${cre(901,'Basher',5,5)}];
   S.my.creatures=[${cre(902,'Chump',1,1,',token:false')}];
   openCombat('vael',[S.tokens[0]],[S.my.creatures[0]],{});`);
const y0=ev("S.youLife"), b0=ev("S.boss.life"), tk=ev("S.tokens.length"), mc=ev("S.my.creatures.length");
ev("render();render();render();");
ok(ev("S.youLife")===y0 && ev("S.boss.life")===b0, 'P50.2: repeated live refreshes apply NO combat damage (preview is pure)');
ok(ev("S.tokens.length")===tk && ev("S.my.creatures.length")===mc, 'P50.2: no combatant is killed by the refresh');

// ============ minimized popup: pruned but NOT force-restored (review fix from the P50.2 workflow) ============
ev(`fresh('standard');S.tokens=[${cre(1001,'X',2,2)}];S.my.creatures=[${cre(1002,'Y',2,2,',token:false')}];
   openCombat('vael',[S.tokens[0]],[S.my.creatures[0]],{});S.combat._min=true;`);
ev("S.tokens=[];render();");   // remove the attacker while minimized
ok(ev("!!S.combat"), 'P50.2: a minimized combat still exists (the turn stays blocked)');
ok(ev("S.combat._min")===true, 'P50.2: a minimized popup is NOT force-restored on render (stays minimized)');
ok(ev("S.combat.attackers.length")===0, 'P50.2 (review fix): state is pruned even while minimized — a combatant removed behind a minimized popup cannot survive into resolution');

// belt-and-suspenders: approveCombat prunes even with NO render between removal and approve (phantom-damage guard)
ev(`fresh('standard');S.youLife=40;S.tokens=[${cre(1101,'Z',5,5)}];S.my.creatures=[];
   openCombat('vael',[S.tokens[0]],[],{});S.combat._trickDone=true;`);
ev("S.tokens=[];");            // attacker removed, NO render() called
ev("approveCombat();");
ok(ev("S.youLife")===40, 'P50.2: approveCombat prunes a removed attacker (no phantom face damage even without an intervening render)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,8));fail++;}
console.log(fail?'P50.2 FAILED':'P50.2 PASSED');
process.exit(fail?1:0);
