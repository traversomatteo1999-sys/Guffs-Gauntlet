// P51.3: enemy commander (creature + walker) gets full card-option parity; no stacked .slay buttons; dealDmg('cmd') works.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("fresh('standard')");

// --- Creature commander ---
ev("S.cmd={id:S.nextId++,n:'Ashmaw',name:'Ashmaw',isWalker:false,inPlay:true,p:3,t:3,baseP:3,baseT:3,kw:[],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,color:['R'],prot:[],dies:'graveyard',_drawer:true}");
let html=ev("cmdFieldCard()");
// exactly ONE .slay button (the Slay corner), the rest are plain .mini
ok((html.match(/class="slay mini/g)||[]).length===1, `creature-cmd has exactly 1 .slay button (got ${(html.match(/class="slay mini/g)||[]).length})`);
ok(/onclick="cmdToHand\(\)"/.test(html)&&/class="tiny"[^>]*onclick="cmdToHand/.test(html), 'creature-cmd ↩ hand is a plain .tiny (not .slay)');
ok(/copyPermanent\('cmd',null\)/.test(html), 'creature-cmd has a ⧉ copy');
// drawer now includes deal-damage (markerRow)
ok(/dealDmgInput\('cmd',null/.test(html), 'creature-cmd drawer has a ⚔ deal control');

// dealDmg('cmd') routes a lethal off the board (creature)
ev("S.cmd.inPlay=true;S.cmd.deaths=0;dealDmg('cmd',null,5,false)");
ok(ev("S.cmd.inPlay")===false, 'dealDmg cmd lethal puts the creature-commander into the command zone (inPlay=false)');
// non-lethal survives
ev("S.cmd.inPlay=true;dealDmg('cmd',null,1,false)");
ok(ev("S.cmd.inPlay")===true, 'dealDmg cmd non-lethal leaves the creature-commander in play');

// --- Walker commander ---
ev("S.cmd={id:S.nextId++,n:'Ash the Guardian',name:'Ash the Guardian',isWalker:true,inPlay:true,loyalty:4,baseLoy:4,color:['B'],prot:[],other:[],_drawer:true,wplus:{sign:1,n:'x',text:'y'}}");
html=ev("cmdFieldCard()");
ok((html.match(/class="slay mini/g)||[]).length===1, `walker-cmd has exactly 1 .slay button (got ${(html.match(/class="slay mini/g)||[]).length})`);
ok(/copyPermanent\('cmd',null\)/.test(html), 'walker-cmd now has a ⧉ copy (parity)');
ok(/cmdToHand\(\)/.test(html), 'walker-cmd has ↩ hand inline');

// dealDmg('cmd') on a walker reduces loyalty; lethal -> command zone
ev("dealDmg('cmd',null,2,false)");
ok(ev("S.cmd.loyalty")===2, `dealDmg cmd on a walker reduces loyalty (4 -> ${ev("S.cmd.loyalty")})`);
ev("S.cmd.inPlay=true;S.cmd.loyalty=2;dealDmg('cmd',null,3,false)");
ok(ev("S.cmd.inPlay")===false, 'dealDmg cmd lethal-loyalty sends the walker-commander to the command zone');

// slayCmdBtn is walker-aware
ok(/function slayCmdBtn\(\)\{if\(!S\.cmd\|\|!S\.cmd\.inPlay\)return;if\(S\.cmd\.isWalker\)enemyWalkerDies/.test(src), 'slayCmdBtn routes a walker-commander via enemyWalkerDies');

// enemyDrawer markerRow now includes cmd
ok(/\(scope==='token'\|\|scope==='cmd'\)\?markerRow/.test(src), 'enemyDrawer shows markerRow for cmd');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.3 FAILED':'P51.3 PASSED');
process.exit(fail?1:0);
