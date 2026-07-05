// P32: per-combat negate an attacker / prevent its combat damage (transient, both directions).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");ev("render()");
ev("window.__mk=function(p,t,kw){var id=S.nextId++;return {id:id,name:'C'+id,p:p,t:t,baseP:p,baseT:t,kw:kw||[],color:['R'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:true,dies:'graveyard',strength:'mid'};};");

// A) PREVENT reduces face damage (enemy-attack direction).
let A=ev(`(function(){S.youLife=40;var a1=__mk(3,3,[]),a2=__mk(4,4,[]);
  openCombat('vael',[a1,a2],[],{},{});
  var before=resolveAttack(S.combat.attackers,S.combat.assign).face;
  combatPreventDmg(a1.id);
  var after=resolveAttack(S.combat.attackers,S.combat.assign).face;
  return {before:before,after:after,prev:S.combat.prevented.length};})()`);
ok(A.before===7 && A.after===4 && A.prev===1, 'P32 prevent: face 7 → 4 (prevented 3/3 deals 0)');

// A2) toggling prevent off restores it
let A2=ev(`(function(){var a1=__mk(3,3,[]);openCombat('vael',[a1],[],{},{});
  combatPreventDmg(a1.id);combatPreventDmg(a1.id);
  return {prev:S.combat.prevented.length,face:resolveAttack(S.combat.attackers,S.combat.assign).face};})()`);
ok(A2.prev===0 && A2.face===3, 'P32 prevent toggles off — face restored to 3');

// B) NEGATE removes the attacker from combat.
let B=ev(`(function(){var a1=__mk(3,3,[]),a2=__mk(4,4,[]);
  openCombat('vael',[a1,a2],[],{},{});
  combatNegate(a1.id);
  return {n:S.combat.attackers.length,has:S.combat.attackers.some(x=>x.id===a1.id),face:resolveAttack(S.combat.attackers,S.combat.assign).face};})()`);
ok(B.n===1 && !B.has && B.face===4, 'P32 negate: attacker removed from combat (face 4 only)');

// C) a PREVENTED attacker can still die to a lethal blocker, and gives no lifelink.
let C=ev(`(function(){var a1=__mk(3,3,['lifelink']);var blk=__mk(5,5,[]);
  openCombat('vael',[a1],[blk],{},{});S.combat.assign[a1.id]=[blk];
  combatPreventDmg(a1.id);
  var r=resolveAttack(S.combat.attackers,S.combat.assign);
  return {dead:r.deadAtt.some(x=>x.id===a1.id),face:r.face,ll:r.attLifelink};})()`);
ok(C.dead===true && C.face===0 && C.ll===0, 'P32 prevented attacker still dies to blocker; deals 0 face + 0 lifelink');

// D) predictCombat reflects prevention (writes to #combatPred).
let D=ev(`(function(){var a1=__mk(3,3,[]),a2=__mk(4,4,[]);
  openCombat('vael',[a1,a2],[],{},{});combatPreventDmg(a1.id);predictCombat();
  return document.getElementById('combatPred').innerHTML;})()`);
ok(/prevented/i.test(D), 'P32 predictCombat notes the prevented attacker');
ok(/4 to your life/.test(D), 'P32 prediction shows the reduced (4) damage');

// E) negate also cleans its assign/target and prevented entry.
let E=ev(`(function(){var a1=__mk(3,3,[]);var blk=__mk(1,1,[]);
  openCombat('vael',[a1],[blk],{},{});S.combat.assign[a1.id]=[blk];S.combat.target[a1.id]='you';
  combatPreventDmg(a1.id);combatNegate(a1.id);
  return {assign:S.combat.assign[a1.id]===undefined,tgt:S.combat.target[a1.id]===undefined,prev:S.combat.prevented.indexOf(a1.id)<0};})()`);
ok(E.assign && E.tgt && E.prev, 'P32 negate cleans assign + target + prevented entries');

// F) works on YOUR attackers (dir=you), and cancelCombat clears the transient state.
let F=ev(`(function(){S.boss.life=40;var a1=__mk(3,3,[]),a2=__mk(2,2,[]);
  openCombat('you',[a1,a2],[],{},{});
  combatPreventDmg(a1.id);
  var face=resolveAttack(S.combat.attackers,S.combat.assign).face;/* 0 + 2 */
  combatNegate(a2.id);var n=S.combat.attackers.length;
  cancelCombat();
  return {face:face,n:n,cleared:S.combat===null};})()`);
ok(F.face===2 && F.n===1 && F.cleared, 'P32 dir=you: prevent→face 2, negate→1 attacker, cancelCombat clears state');

// G) approve clears prevented (no leak to next combat).
let G=ev(`(function(){S.boss.life=40;var a1=__mk(3,3,[]);
  openCombat('you',[a1],[],{},{});combatPreventDmg(a1.id);
  approveCombat();
  return S.combat;})()`);
ok(G===null, 'P32 approveCombat clears S.combat (prevented cannot leak)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P32 FAILED':'P32 PASSED');
process.exit(fail?1:0);
