// P51.6: enemy attack-target intelligence — threat order (PW>creature>enchant>artifact), multi-object spread, player-battle targeting.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("fresh('standard')");

// 1. Threat order: walker > creature > enchantment > artifact (same strength).
const w=ev("threatScore({ctype:'planeswalker',loyalty:3,baseLoy:3,strength:'mid'})");
const cr=ev("threatScore({ctype:'creature',p:2,t:2,kw:[],strength:'mid'})");
const en=ev("threatScore({ctype:'enchantment',strength:'mid'})");
const ar=ev("threatScore({ctype:'artifact',strength:'mid'})");
ok(w>cr && cr>en && en>ar, `threat order walker(${w})>creature(${cr})>enchant(${en})>artifact(${ar})`);
ok(ev("objKind({ctype:'artifact'})")==='artifact' && ev("objKind({ctype:'enchantment'})")==='enchant', 'objKind splits artifact vs enchant');

// helper: make an enemy attacker with power p
const mkAtk=(p,id)=>`{id:${id},name:'A${id}',p:${p},t:${p},baseP:${p},baseT:${p},kw:[],color:['R'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:true}`;

// 2. Standard: divert the minimal attackers to the single highest-threat object (a walker).
ev("S.diff='standard';S.youLife=100;S.my.creatures=[];S.tokens=[];");
ev(`S.my.walkers=[{id:501,name:'Chandra',loyalty:3,baseLoy:3,phased:false,strength:'mid'}]`);
ev("S.battles=[];");
ev(`var atks=[${mkAtk(3,301)},${mkAtk(3,302)}];window._atks=atks;`);
let tmap=ev("aiTargets(window._atks)");
ok(Object.values(tmap).filter(v=>v==='501').length===1, 'standard: exactly one attacker diverted to the walker');
ok(Object.values(tmap).filter(v=>v==='you').length===1, 'standard: the other stays on the face');

// 3. Standard: a walker outranks a battle -> the walker is the single target (battle untouched).
ev(`S.my.walkers=[{id:501,name:'Chandra',loyalty:2,baseLoy:2,phased:false,strength:'mid'}];S.battles=[{id:601,name:'Fort',def:2,maxDef:2,side:'you',defeated:false}];`);
ev(`window._atks=[${mkAtk(2,301)},${mkAtk(2,302)}];`);
tmap=ev("aiTargets(window._atks)");
ok(Object.values(tmap).some(v=>v==='501'), 'standard: diverts to the higher-threat walker');
ok(!Object.values(tmap).some(v=>v==='b:601'), 'standard (single-object): the battle is NOT also attacked');

// 4. Brutal: SPREADS across multiple objects (walker AND battle).
ev("S.diff='brutal';");
ev(`S.my.walkers=[{id:501,name:'Chandra',loyalty:2,baseLoy:2,phased:false,strength:'mid'}];S.battles=[{id:601,name:'Fort',def:2,maxDef:2,side:'you',defeated:false}];S.my.creatures=[];`);
ev(`window._atks=[${mkAtk(2,301)},${mkAtk(2,302)},${mkAtk(2,303)}];`);
tmap=ev("aiTargets(window._atks)");
ok(Object.values(tmap).some(v=>v==='501'), 'brutal: attacks the walker');
ok(Object.values(tmap).some(v=>v==='b:601'), 'brutal: ALSO attacks the player battle (spread)');

// 5. Easy: legacy behaviour — walkers only, no battle targeting.
ev("S.diff='easy';");
ev(`S.my.walkers=[];S.battles=[{id:601,name:'Fort',def:2,maxDef:2,side:'you',defeated:false}];S.my.creatures=[];`);
ev(`window._atks=[${mkAtk(3,301)}];`);
tmap=ev("aiTargets(window._atks)");
ok(!Object.values(tmap).some(v=>(''+v).slice(0,2)==='b:'), 'easy: never targets a battle (legacy walkers-only)');

// 6. Lethal to the face -> all attackers stay on the face.
ev("S.diff='brutal';S.youLife=1;");
ev(`S.my.walkers=[{id:501,name:'Chandra',loyalty:1,baseLoy:1,phased:false,strength:'mid'}];S.battles=[];S.my.creatures=[];`);
ev(`window._atks=[${mkAtk(10,301)}];`);
tmap=ev("aiTargets(window._atks)");
ok(Object.values(tmap).every(v=>v==='you'), 'lethal face: everything stays on the player');

// 7. Render: the enemy-attack resolver offers a player-battle target (b:id).
ev("S.diff='standard';S.youLife=40;S.my.creatures=[];S.my.walkers=[];");
ev(`S.tokens=[${mkAtk(4,301)}];`);
ev(`S.battles=[{id:601,name:'Fort',def:5,maxDef:5,side:'you',defeated:false}];`);
ev(`S.combat={dir:'vael',attackers:[S.tokens[0]],pool:[],assign:{},target:{},prevented:[],_min:false,_trickDone:true};`);
ev("renderCombat()");
ok(/b:601/.test(ev("$('combatBox').innerHTML")), 'vael resolver offers a player-battle target (b:601)');

// 7b. predictCombat previews the enemy's battle damage (must match approveCombat's routing).
ev(`S.combat.target={}; S.combat.target[S.tokens[0].id]='b:601';`);
ev("predictCombat()");
ok(/to Fort/.test(ev("$('combatPred').innerHTML")), 'combat preview (#combatPred) includes damage to your battle (Fort)');

// 8. approveCombat routes an enemy attacker aimed at your battle -> battleDmg.
ev(`S.combat.target={}; S.combat.target[S.tokens[0].id]='b:601';`);
ev("approveCombat()");
ok(ev("(S.battles.find(b=>b.id===601)||{}).def")===1, `enemy 4/4 aimed at your battle reduces its def (5 -> ${ev("(S.battles.find(b=>b.id===601)||{}).def")})`);
ok(ev("S.youLife")===40, 'your life untouched (the attacker hit the battle, not your face)');

// 9. Source guards.
ok(/THREAT_TIER=\{walker:4,creature:0,enchant:-2,artifact:-3/.test(src), 'THREAT_TIER split enchant/artifact');
ok(/const maxObjs=luck>0\?objs\.length:1/.test(src), 'aiTargets spreads only on brutal (luck>0)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.6 FAILED':'P51.6 PASSED');
process.exit(fail?1:0);
