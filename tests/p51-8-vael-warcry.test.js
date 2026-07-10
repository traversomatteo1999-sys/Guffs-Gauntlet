// P51.8: Vael's deck drops War-Cry (incoherent for a planeswalker commander); cmdBuff can't pump a walker.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("fresh('standard')");

// 1. Vael's pool has NO warcry; Grakk's pool KEEPS warcry (creature commander).
ok(ev("var v=DUNGEON.find(r=>r.isVael);!(v.pool&&'warcry' in v.pool)"), "Vael's pool has no warcry");
ok(ev("var g=DUNGEON.find(r=>r.pool&&r.pool.whelp);!!(g&&g.pool&&g.pool.warcry)"), "Grakk's pool still has warcry");

// 2. Vael's commander is a planeswalker (isWalker), not a creature.
ok(ev("var v=DUNGEON.find(r=>r.isVael);!!(v.cmd&&v.cmd.isWalker)"), "Vael's commander (Ash) is a planeswalker (isWalker)");

// 3. cmdBuff on a walker-commander is a no-op (never mutates power).
ev("S.cmd={n:'Ash the Guardian',name:'Ash the Guardian',isWalker:true,inPlay:true,loyalty:4,p:0,t:0}");
ev("applyRun(['cmdBuff',2])");
ok(ev("S.cmd.p")===0, "cmdBuff does not pump a walker-commander's power (stays 0)");

// 4. cmdBuff still works on a creature-commander in play.
ev("S.cmd={n:'Ashmaw',name:'Ashmaw',isWalker:false,inPlay:true,p:3,t:3,baseP:3,baseT:3,kw:[],plus:0,minus:0,other:[]}");
ev("applyRun(['cmdBuff',2])");
ok(ev("S.cmd.p")===5, "cmdBuff still pumps a creature-commander (+2 power)");

// 5. Source: the walker guard is present.
ok(/case "cmdBuff":if\(S\.cmd&&S\.cmd\.isWalker\)/.test(src), 'cmdBuff has an isWalker guard');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.8 FAILED':'P51.8 PASSED');
process.exit(fail?1:0);
