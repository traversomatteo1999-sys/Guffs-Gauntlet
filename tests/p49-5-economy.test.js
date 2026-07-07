// P49.5: Fortune Wheel rarer-but-weaker (#6) · gentler post-battle gold (#18) · Mana Surge nerf (#30).
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// --- Bullet 6: wheel slice widths strictly DECREASE as reward rises ---
const counts={};
ev("window.__wc={};for(var r=1;r<=100;r++){var s=wheelSliceFor(r);window.__wc[s[2]]=(window.__wc[s[2]]||0)+1;}");
const order=['g50','g100','g150','g2x','rare','legendary'];
const w=order.map(k=>ev(`window.__wc['${k}']||0`));
console.log('wheel widths:',order.map((k,i)=>`${k}:${w[i]}`).join(' '));
ok(w.reduce((a,b)=>a+b,0)===100,'wheel covers all 100 rolls');
let mono=true;for(let i=1;i<w.length;i++)if(w[i]>w[i-1])mono=false;
ok(mono,'slice widths are non-increasing across [g50…legendary]');
ok(w[0]>w[1],'the weakest prize (g50) is STRICTLY the most common');
// boundaries pay the right tier
ok(ev("spinWheel(1,32);true")&&true,'spinWheel g50 boundary resolves');
ok(ev("wheelSliceFor(35)[2]==='g50'&&wheelSliceFor(36)[2]==='g100'"),'g50/g100 boundary at 35/36');
ok(ev("wheelSliceFor(100)[2]==='legendary'"),'roll 100 = legendary');

// --- Bullet 18: gentler gold curve + compressed brutal ---
ev("S.diff='standard'");
ok(ev("goldReward(0)===8&&goldReward(1)===14&&goldReward(2)===20"),'std gold = 8/14/20 (was 12/22/32)');
ev("S.diff='easy'");
ok(ev("goldReward(0)===Math.round(8*0.8)"),'easy gold scaled by 0.8');
ev("S.diff='brutal'");
ok(ev("goldReward(2)===Math.round(20*1.15)"),'brutal gold uses the compressed 1.15 mult');
ok(ev("DIFF.brutal.goldMult===1.15"),'brutal goldMult compressed to 1.15');

// --- Bullet 30: Mana Surge nerfed to +1/turn, price up ---
ok(ev("/add 1 mana/.test(BOONS.surge.t)"),'Mana Surge text now +1 mana/turn');
ok(ev("!/add 2 mana/.test(BOONS.surge.t)"),'no longer +2 mana');
ok(ev("STORE.find(s=>s.id==='surge').cost===30"),'Mana Surge price bumped to 30');
ok(ev("BOONS.surge.r==='rare'"),'still rare (grantBoon/pickByRarity path intact)');
ev("S.inv=[];grantBoon('surge')");
ok(ev("S.inv.some(x=>x&&x.id==='surge')"),'grantBoon(surge) still works');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P49.5 FAILED':'P49.5 PASSED');
process.exit(fail?1:0);
