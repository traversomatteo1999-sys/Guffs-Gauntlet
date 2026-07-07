// P49.9: enemy coloured/colourless mana (hand-authored pips, per-colour pool, colour-aware AI)
// + London mulligan penalty (−1 card per mulligan, floor 4, leniency grows with attempts).
const {boot}=require('./harness.js');
const fs=require('fs'),path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

/* ===== 1. data integrity — every castable FX has a valid mc that sums to its cost ===== */
const badMc=ev(`(function(){const out=[];for(const k in FX){const f=FX[k];if(!f||f.type==='land')continue;if(typeof f.mc!=='string'){out.push(k+':missing');continue;}const m=/^(\\d*)([WUBRGC]*)$/.exec(f.mc);if(!m){out.push(k+':parse');continue;}const tot=(m[1]?parseInt(m[1],10):0)+m[2].length;if(tot!==(f.cost||0))out.push(k+':sum');}return out;})()`);
ok(badMc.length===0,'every non-land FX has mc, parses, and sums to cost'+(badMc.length?' — '+badMc.slice(0,6).join(','):''));
const offColour=ev(`(function(){const out=[];DUNGEON.forEach(r=>{const cols=(r.colors||[]).join('');Object.keys(r.pool||{}).forEach(k=>{const f=FX[k];if(!f||f.type==='land'||typeof f.mc!=='string')return;const pips=f.mc.replace(/[^WUBRG]/g,'');for(const p of pips)if(cols.indexOf(p)<0)out.push((r.villain||'?')+':'+k+':'+p);});});return out;})()`);
ok(offColour.length===0,'every deck card\'s pips fit its warden\'s colours'+(offColour.length?' — '+offColour.slice(0,6).join(','):''));
ok(JSON.stringify(ev("DUNGEON.map(r=>r.cmd.mc)"))===JSON.stringify(['1RR','2BB','3RB']),'the 3 commanders carry authored pips (1RR / 2BB / 3RB)');
ok(ev("prodUnits(FX.mtn,1)[0]")==='R'&&ev("prodUnits(FX.swp,1)[0]")==='B','basic lands produce their colour');
ok(ev("prodUnits(FX.altar,2).join('')")==='CC','Altar of the Pit produces colourless CC (Worn-Powerstone model)');
ok(ev("JSON.stringify(FX.obol.run)")==='["ramp",1,"B"]'&&ev("JSON.stringify(FX.emberidol.run)")==='["ramp",1,"R"]','rock ramp verbs carry production colours');

/* ===== 2. canAfford / payCost unit behavior ===== */
ev("S.bossMana=3;S.bossPool={W:0,U:0,B:1,R:1,G:0,C:1,A:0};");
ok(ev("canAfford({cost:2,mc:'RB'})")===true,'RB cost-2 affordable with R+B+C pool');
ev("payCost({cost:2,mc:'RB'})");
ok(ev("S.bossMana")===1&&ev("S.bossPool.C")===1&&ev("S.bossPool.R")===0&&ev("S.bossPool.B")===0,'payCost drained the exact pips, left the colourless');
ev("S.bossMana=3;S.bossPool={W:0,U:0,B:0,R:2,G:0,C:1,A:0};");
ok(ev("canAfford({cost:2,mc:'BB'})")===false,'BB blocked despite total 3 (no B, no A)');
ev("S.bossMana=2;S.bossPool={W:0,U:0,B:0,R:0,G:0,C:1,A:1};");
ok(ev("canAfford({cost:2,mc:'RB'})")===false,'one A cannot cover two missing pips');
ev("S.bossMana=2;S.bossPool={W:0,U:0,B:0,R:0,G:0,C:0,A:2};");
ok(ev("canAfford({cost:2,mc:'RB'})")===true,'A (any-colour) covers pips');
ev("S.bossMana=5;S.bossPool={};");
ok(ev("canAfford({cost:4,mc:'2RR'})")===true,'self-heal: a bare scalar poke becomes any-colour mana');
ok(ev("bossPool().A")===5,'self-heal minted 5 A to match the scalar');
ev("S.bossMana=4;S.bossPool={W:0,U:0,B:2,R:2,G:0,C:0,A:0};S.bossManaFrozen=3;");
ok(ev("canAfford({cost:2,mc:'RB'})")===false&&ev("canAfford({cost:1,mc:'R'})")===true,'freeze caps the TOTAL, colour-blind');
ev("S.bossManaFrozen=0;");
/* heuristic fallback for player-added cards with no mc */
ok(ev("JSON.stringify(parseMc({cost:3,color:'RB'}))")===JSON.stringify({gen:1,pips:['R','B']}),'heuristic pips for an mc-less card (multi = 1 of each)');
ok(ev("JSON.stringify(parseMc({cost:3,color:'B'}))")===JSON.stringify({gen:2,pips:['B']}),'heuristic mono = 1 pip + generic');
ok(ev("parseMc(S.cmd,7).gen")===7-ev("parseMc(S.cmd,7).pips.length"),'commander tax pads GENERIC (pips constant)');

/* ===== 3. vaelUntap rebuilds the pool per-colour from sources ===== */
ev("S.tokens=[];S.bossSrc={W:0,U:0,B:1,R:2,G:0,C:0,A:0};S.bossLands=3;S.bossManaMod=0;S.bossManaFrozen=0;");
ev("vaelUntap()");
ok(ev("S.bossMana")===3&&ev("S.bossPool.R")===2&&ev("S.bossPool.B")===1,'untap: pool mirrors the source colours');
ev("S.bossManaMod=-1;vaelUntap()");
ok(ev("S.bossMana")===2&&ev("MANA_KEYS.reduce((a,k)=>a+S.bossPool[k],0)")===2,'a negative (stax) mod trims the rebuilt pool');
ev("S.bossManaMod=0;S.tokens.push({id:777,name:'Dork',p:1,t:1,baseP:1,baseT:1,kw:[],color:['B'],mana:2,tapped:false,sick:false,phased:false,plus:0,minus:0,other:[],token:true});vaelUntap()");
ok(ev("S.bossMana")===5&&ev("S.bossPool.A")===2,'dork mana joins the pool as any-colour');
ev("S.tokens=[];");

/* ===== 4. colour-aware land pick (Vael) ===== */
ev("enterRoom(2,true)");// Vael room (R/B)
ev("S.hand=[{key:'mtn'},{key:'swp'},{key:'smother'}];S.bossLands=1;S.bossSrc={W:0,U:0,B:0,R:1,G:0,C:0,A:0};S.bossMana=1;S.bossPool={W:0,U:0,B:0,R:1,G:0,C:0,A:0};S.bossLandPlayed=false;");
ev("playEnemyLand()");
ok(ev("S.bossSrc.B")===1&&ev("S.bossSrc.R")===1,'the AI played the Swamp — the colour its held pips need and it lacks');
ok(ev("S.hand.some(c=>c.key==='mtn')")&&!ev("S.hand.some(c=>c.key==='swp')"),'Mountain stayed in hand');

/* ===== 5. the core gate — a B spell waits for a B source (Vael fight) ===== */
ev("enterRoom(2,true)");
ev("S.hand=[{key:'drain'}];S.plays=[];S.tokens=[];S.enemyResources=[];S.bossLands=2;S.bossSrc={W:0,U:0,B:0,R:2,G:0,C:0,A:0};S.bossMana=2;S.bossPool={W:0,U:0,B:0,R:2,G:0,C:0,A:0};S.bossManaFrozen=0;S.cmd.inPlay=false;S.cmd.inHand=false;");
ev("vaelMain(1)");
ok(ev("S.hand.some(c=>c.key==='drain')")===true&&ev("S.plays.some(p=>p._card&&p._card.key==='drain')")===false,'Drain (1B) NOT cast off two Mountains despite total mana');
ev("S.plays=[];S.tokens=[];S.bossSrc={W:0,U:0,B:1,R:1,G:0,C:0,A:0};S.bossMana=2;S.bossPool={W:0,U:0,B:1,R:1,G:0,C:0,A:0};");
ev("vaelMain(1)");
ok(ev("S.plays.some(p=>p._card&&p._card.key==='drain')")===true&&ev("S.bossMana")===0,'Drain casts once a Swamp-source exists — pips paid');

/* ===== 6. commander pips + generic tax ===== */
ev("enterRoom(0,true)");// Grakk — Ashmaw 1RR, base 3
ev("S.hand=[];S.plays=[];S.tokens=[];S.cmd.inPlay=false;S.cmd.inHand=false;S.cmd.czCasts=0;S.cmd.tax=0;S.cmd.cost=S.cmd.baseCost;");
ev("S.bossMana=3;S.bossPool={W:0,U:0,B:0,R:1,G:0,C:2,A:0};S.bossLands=3;S.bossSrc={W:0,U:0,B:0,R:1,G:0,C:2,A:0};");
ev("vaelMain(1)");
ok(ev("S.plays.some(p=>p._enemyCmd)")===false,'Ashmaw (1RR) held back with only one R source');
ev("S.plays=[];S.tokens=[];S.bossMana=3;S.bossPool={W:0,U:0,B:0,R:2,G:0,C:1,A:0};");
ev("vaelMain(1)");
ok(ev("S.plays.some(p=>p._enemyCmd)")===true&&ev("S.bossMana")===0,'Ashmaw cast with RR available; pool spent');

/* ===== 7. lethal-reach honesty (pips simulated on a pool copy) ===== */
ev("S.hand=[{key:'bolt'},{key:'drain'}];S.bossMana=2;S.bossPool={W:0,U:0,B:0,R:0,G:0,C:2,A:0};");
ok(ev("enemyLethalReach().dmg")===0,'reach counts NOTHING when pips are blocked (2 colourless)');
ev("S.bossPool={W:0,U:0,B:0,R:0,G:0,C:0,A:2};");
ok(ev("enemyLethalReach().dmg")===3,'reach counts the bolt via any-colour (budget stops the second spell)');

/* ===== 8. Treasures crack for a missing PIP ===== */
ev("S.enemyResources=[{id:51,kind:'treasure',name:'Treasure',glyph:'💰'}];S.hand=[{key:'drain'}];S.bossMana=2;S.bossPool={W:0,U:0,B:0,R:2,G:0,C:0,A:0};");
ok(ev("canAfford(FX.drain)")===false,'Drain pip-blocked pre-crack');
const cracked=ev("enemySacForMana(2,FX.drain)");
ok(cracked===1&&ev("canAfford(FX.drain)")===true&&ev("S.enemyResources.length")===0,'cracked exactly 1 Treasure to cover the missing B pip');

/* ===== 9. London mulligan — deterministic via a 7-card library ===== */
ev("enterRoom(0,true)");
ev("S.hand=[];S.lib=[{key:'swp'},{key:'siphon'},{key:'cull'},{key:'rot'},{key:'glut'},{key:'sunder'},{key:'maw'}];");
ev("dealOpeningHand()");
ok(ev("S.hand.length")===5&&ev("S.lib.length")===2,'1-land hand kept at attempt 2 (lenient window) minus 2 bottomed cards');
const libKeys=ev("S.lib.map(c=>c.key).sort().join(',')");
ok(libKeys==='maw,sunder','the two PRICIEST spells were bottomed');
ok(ev("S.hand.length+S.lib.length")===7&&ev("S.hand.concat(S.lib).map(c=>c.key).sort().join(',')")==='cull,glut,maw,rot,siphon,sunder,swp','multiset conserved — nothing created or lost');
/* floor: a 5-card library can only bottom down to 4 */
ev("S.hand=[];S.lib=[{key:'swp'},{key:'siphon'},{key:'cull'},{key:'rot'},{key:'glut'}];");
ev("dealOpeningHand()");
ok(ev("S.hand.length")===4,'hand floored at 4 cards (penalty clamped)');
/* cap path: zero lands never keeps — best hand (attempt 0) untrimmed */
ev("S.hand=[];S.lib=[{key:'siphon'},{key:'cull'},{key:'rot'},{key:'glut'},{key:'sunder'},{key:'maw'},{key:'bleed'}];");
ev("dealOpeningHand()");
ok(ev("S.hand.length")===7,'mulligan-to-cap keeps the best (attempt-0) hand — no penalty');

/* ===== 10. save shape: legacy migrate + round-trip ===== */
const mig=ev(`(function(){const sv=JSON.parse(JSON.stringify(S));delete sv.bossPool;delete sv.bossSrc;sv.bossMana=4;sv.bossLands=3;try{migrate(sv);}catch(e){return 'threw:'+e.message;}return JSON.stringify([sv.bossPool.A,sv.bossSrc.A]);})()`);
ok(mig===JSON.stringify([4,3]),'a legacy save (no pool/src) migrates to any-colour mana — got '+mig);
ok(ev("(function(){const sv=JSON.parse(JSON.stringify(S));return sv.bossPool&&typeof sv.bossPool.R==='number';})()")===true,'the pool survives a JSON save round-trip');

/* ===== 11. display renders coloured pips without errors ===== */
ev("S.activeTurn='vael';S.bossMana=3;S.bossPool={W:0,U:0,B:1,R:2,G:0,C:0,A:0};S.bossManaFrozen=0;render()");
const pipHtml=window.document.getElementById('manaPips');
ok(pipHtml&&pipHtml.children.length>=3,'#manaPips rendered');
ok(Array.from(pipHtml.children).some(el=>el.style&&el.style.background),'at least one pip carries a colour');
ok((window.document.getElementById('manaLine').innerHTML||'').indexOf('2R')>=0,'#manaLine shows the colour breakdown');

/* ===== 12. source-level: no bare scalar spends/adds remain ===== */
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
ok((src.match(/S\.bossMana-=/g)||[]).length===0,'zero bare S.bossMana-= spends (all payCost/payGenericMana)');
ok((src.match(/S\.bossMana\+=/g)||[]).length===0,'zero bare S.bossMana+= adds (all addBossMana/addBossSource)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P49.9 FAILED':'P49.9 PASSED');
process.exit(fail?1:0);
