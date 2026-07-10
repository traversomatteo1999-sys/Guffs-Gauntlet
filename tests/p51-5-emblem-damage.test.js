// P51.5: both sides get a first-class "⚔ Deal N damage (each trigger)" emblem; damage honours the target toggle.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("fresh('standard')");

// 1. Both template lists carry a ⚔ Deal N damage template.
ok(ev("PLAYER_EMBLEMS.some(t=>/Deal N damage/.test(t.n)&&t.auto&&t.auto.k==='enemyLose')"), 'PLAYER_EMBLEMS has a ⚔ Deal N damage (enemyLose) template');
ok(ev("ENEMY_EMBLEMS.some(t=>/Deal N damage/.test(t.n)&&t.auto&&t.auto.k==='youLose')"), 'ENEMY_EMBLEMS has a ⚔ Deal N damage (youLose) template');

// 2. Player damage emblem fires N to the enemy on its trigger.
ev("S.my.emblems=[];S.boss.life=30;S.boss.max=30;");
ev("var i=PLAYER_EMBLEMS.findIndex(t=>/Deal N damage/.test(t.n));var t=PLAYER_EMBLEMS[i];S.my.emblems.push({id:S.nextId++,name:t.n,note:t.note,auto:Object.assign({},t.auto),autoOn:true,kind:'emblem',target:'enemy',static:false,trigger:'upkeep',attachId:null})");
ev("S.my.emblems[0].auto.n=3;firePlayerEmblems('upkeep')");
ok(ev("S.boss.life")===27, `player ⚔ emblem deals 3 to enemy (30 -> ${ev("S.boss.life")})`);

// 3. Retarget the player damage emblem to 'player' -> it hits your own life.
ev("S.youLife=40;S.my.emblems[0].target='player';firePlayerEmblems('upkeep')");
ok(ev("S.youLife")===37, `retargeted player emblem deals 3 to YOU (40 -> ${ev("S.youLife")})`);

// 4. Enemy damage emblem fires N to you on its trigger.
ev("S.emblemsEnemy=[];S.youLife=40;");
ev("var i=ENEMY_EMBLEMS.findIndex(t=>/Deal N damage/.test(t.n));var t=ENEMY_EMBLEMS[i];S.emblemsEnemy.push({id:S.nextId++,name:t.n,note:t.note,auto:Object.assign({},t.auto),autoOn:true,kind:'emblem',vsYou:true,target:'you',static:false,trigger:'upkeep',attachId:null})");
ev("S.emblemsEnemy[0].auto.n=2;fireEnemyEmblems('upkeep')");
ok(ev("S.youLife")===38, `enemy ⚔ emblem deals 2 to you (40 -> ${ev("S.youLife")})`);

// 5. Retarget the enemy damage emblem to 'enemy' -> it hits the boss (via existing emblemTarget path).
ev("S.boss.life=30;S.emblemsEnemy[0].target='enemy';fireEnemyEmblems('upkeep')");
ok(ev("S.boss.life")===28, `retargeted enemy emblem deals 2 to the boss (30 -> ${ev("S.boss.life")})`);

// 6. Source: the player damage handler honours em.target.
ok(/a\.k==='enemyLose'\)\{if\(em\.target==='player'\)/.test(src), 'playerEmblemEffect enemyLose honours em.target');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.5 FAILED':'P51.5 PASSED');
process.exit(fail?1:0);
