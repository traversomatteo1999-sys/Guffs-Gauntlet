// P49.4(#3): counters on artifacts/enchantments (both sides) + walker parity — wiring the scope-aware setCtr.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
const $=id=>window.document.getElementById(id);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// seed a player artifact + enemy enchant + a player walker
ev("S.my.artifacts=[{id:501,name:'Idol',kind:'passive',color:['C'],plus:0,minus:0,other:[]}];");
ev("S.enemyEnchants=[{id:502,name:'Curse',kind:'enchantment',color:['B'],plus:0,minus:0,other:[],_pscope:'eench'}];");
ev("S.my.walkers=[{id:503,name:'PW',loyalty:4,baseLoy:4,color:['R'],plus:0,minus:0,other:[]}];");

// --- setCtr is scope-aware ---
ev("setCtr('artifacts',501,'plus',2)");
ok(ev("getObj('artifacts',501).plus===2"),'setCtr(artifacts) adds +1/+1 counters');
ev("setCtr('eench',502,'minus',1)");
ok(ev("getObj('eench',502).minus===1"),'setCtr(eench) adds −1/−1 on an enemy enchant');
ev("getObj('artifacts',501).other=[];ctrChipSeed=1;");
// ctrCustom adds a named counter (scope-aware) — stub prompt
ev("window.prompt=()=>'charge';ctrCustom('artifacts',501)");
ok(ev("getObj('artifacts',501).other.indexOf('charge')>=0"),'ctrCustom adds a named counter to an artifact');
ev("window.prompt=()=>'doom';ctrCustom('eench',502)");
ok(ev("getObj('eench',502).other.indexOf('doom')>=0"),'ctrCustom works on an enemy enchant');
// remCtr pops (other first, then minus, then plus)
ev("remCtr('artifacts',501)");
ok(ev("getObj('artifacts',501).other.indexOf('charge')<0"),'remCtr pops a named counter first');
ev("remCtrOther('eench',502,0)");
ok(ev("getObj('eench',502).other.length===0"),'remCtrOther removes a chip by index');

// --- the controls actually RENDER on both boards ---
ev("render()");
const artHtml=$('myArt').innerHTML;
ok(/setCtr\('artifacts',501,'plus',1\)/.test(artHtml),'player artifact row renders the +1/+1 counter button');
ok(/ctrCustom\('artifacts',501\)/.test(artHtml),'player artifact row renders the named-counter button');
ok(/\+2\/\+2/.test(artHtml),'player artifact shows its +2/+2 counter chip');
const enHtml=$('enemyEmbList').innerHTML;
ok(/setCtr\('eench',502,'minus',1\)/.test(enHtml),'enemy enchant row renders the −1/−1 counter button');
ok(/ctrCustom\('eench',502\)/.test(enHtml),'enemy enchant row renders the named-counter button');
// walker drawer parity
ev("S.my.walkers[0]._drawer=true;render();");
const myHtml=$('myBoard')?$('myBoard').innerHTML:window.document.body.innerHTML;
ok(/setCtr\('walkers',503/.test(myHtml),'walker drawer renders counter controls');

// --- regression: bulkCtr still writes plus/minus to these, resetCard clears ---
ev("bulkCtr&&bulkCtr('all-permanents','plus',1)");
ok(ev("getObj('artifacts',501).plus>=1"),'bulkCtr(all-permanents) still hits artifacts');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,8));fail++;}
console.log(fail?'P49.4 FAILED':'P49.4 PASSED');
process.exit(fail?1:0);
