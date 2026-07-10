// P51.1: an artifact/enchantment card marked "also a creature" resolves as a creature body that keeps its type.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("fresh('standard')");

// 1. Source: the creator carries the animate toggle + resolve routing.
ok(/id="castAnimate"/.test(src), 'creator has an "also a creature" toggle');
ok(/animate:\$\("castAnimate"\)/.test(src), 'readCastForm stores props.animate');
ok(/\(t==='artifact'\|\|t==='enchantment'\)&&pr\.animate/.test(src), 'resolvePlayerItem has an animate branch');

// 2. An animated artifact resolves into S.my.creatures with retained types + P/T.
ev("S.my.creatures=[];S.my.artifacts=[];");
ev("resolvePlayerItem({name:'Ensouled Blade',ctype:'artifact',p:5,t:5,kw:['trample'],color:['W'],props:{animate:true,mana:0,strength:'mid'}})");
ok(ev("S.my.creatures.length")===1, 'animated artifact lands in S.my.creatures');
ok(ev("S.my.artifacts.length")===0, 'animated artifact is NOT in S.my.artifacts');
const cr=ev("S.my.creatures[0]");
ok(cr.p===5&&cr.t===5, `animated creature has P/T 5/5 (got ${cr.p}/${cr.t})`);
ok(Array.isArray(cr.types)&&cr.types.indexOf('artifact')>=0&&cr.types.indexOf('creature')>=0, 'retains types [artifact, creature]');
ok(cr.animated===true, 'flagged animated');
ok((cr.kw||[]).indexOf('trample')>=0, 'keeps its keywords (trample)');

// 3. It is a legal attacker (attacks/blocks like any creature).
ev("S.my.creatures[0].sick=false;S.my.creatures[0].tapped=false;S.my.creatures[0]._atk=true;");
const atk=ev("S.my.creatures.filter(c=>c._atk&&!c.tapped&&(!c.sick||kw(c,'haste'))&&!c.phased&&!kw(c,'defender')&&!kw(c,\"can't attack\")).length");
ok(atk===1, 'animated creature is a legal attacker');

// 4. A plain artifact (no animate) still routes to S.my.artifacts.
ev("S.my.creatures=[];S.my.artifacts=[];");
ev("resolvePlayerItem({name:'Mana Rock',ctype:'artifact',p:1,t:1,kw:[],color:[],props:{mana:1,strength:'mid'}})");
ok(ev("S.my.artifacts.length")===1 && ev("S.my.creatures.length")===0, 'plain artifact still routes to artifacts, not creatures');

// 5. Render shows a retained-type badge on the animated creature.
ev("S.my.creatures=[];resolvePlayerItem({name:'Living Wall',ctype:'enchantment',p:0,t:6,kw:['defender'],color:['G'],props:{animate:true,strength:'mid'}})");
ev("render()");
const mc=window.document.getElementById('myCrea');
ok(mc && /Enchantment Creature/i.test(mc.innerHTML), 'animated enchantment tile shows an "Enchantment Creature" badge');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.1 FAILED':'P51.1 PASSED');
process.exit(fail?1:0);
