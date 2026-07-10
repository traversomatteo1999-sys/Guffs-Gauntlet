// P51.2: Grakk's Siege heals +2/upkeep (was 1); the Battles panel starts open + auto-opens on a siege.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

// 1. Source: siege tick is 2 and copy says "heals Grakk 2".
ok(/name:"Siege of the Ember Gate",def:6,tick:2/.test(src), 'siege config tick is 2');
ok(/heals Grakk 2 each of its upkeeps/i.test(src), 'codex/help copy says heals Grakk 2');
ok(!/Heals Grakk 1 each of its upkeeps/.test(src), 'no "Heals Grakk 1" copy remains');

// 2. Behaviour: field the Grakk siege -> a boss battle with tick 2; upkeep heals +2.
ev("fresh('standard')");
const gi=ev("DUNGEON.findIndex(r=>r.siege)");
ok(gi>=0, 'a room defines room.siege (Grakk)');
ev(`S.roomIndex=${gi};enterRoom(${gi})`);
const sb=ev("(S.battles||[]).find(b=>b.side==='boss'&&b._siege)");
ok(sb && sb.tick===2, `siege battle fielded with tick 2 (got ${sb&&sb.tick})`);

// heal: bossHealLife(b.tick) via tickBossBattles
ev("S.boss.life=10;S.boss.max=60;tickBossBattles()");
ok(ev("S.boss.life")===12, `tickBossBattles heals +2 (10 -> ${ev("S.boss.life")})`);

// 3. Panel auto-opens on fielding a siege (S.ui.panels['p-battles']===true).
ev("S.ui=S.ui||{};S.ui.panels={};S.battles=[];fieldBossSiege({name:'Siege of the Ember Gate',def:6,tick:2})");
ok(ev("S.ui.panels['p-battles']")===true, 'fieldBossSiege auto-opens the Battles panel');

// addBattle('boss') also auto-opens
ev("S.ui.panels={};S.battles=[];addBattle('boss')");
ok(ev("S.ui.panels['p-battles']")===true, "addBattle('boss') auto-opens the Battles panel");

// 4. Source: defaultPanelStates opens p-battles by default.
ok(/el\.dataset\.panel==='p-battles'/.test(src), 'defaultPanelStates opens p-battles by default');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.2 FAILED':'P51.2 PASSED');
process.exit(fail?1:0);
