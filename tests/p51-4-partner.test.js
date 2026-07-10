// P51.4: partner commanders — import/set two partner commanders, both boxes render, full slot-aware lifecycle, save-safe.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};
const src=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');

ev("window.alert=function(){};");  // partner-refusal paths call alert() — jsdom doesn't implement it
ev("fresh('standard')");

// 1. Fresh seeds pcmd2; a #pcmdBox2 element exists.
ok(ev("'pcmd2' in S")===true && ev("S.pcmd2")===null, 'fresh seeds S.pcmd2=null');
ok(/id="pcmdBox2"/.test(src), 'a #pcmdBox2 element exists in the DOM');
ok(!!window.document.getElementById('pcmdBox2'), '#pcmdBox2 is present');

// 2. Setting a second commander requires the primary to have Partner.
ok(ev("setStartCommander({name:'Reyhan',ctype:'creature',p:3,t:2,partner:true})")===true, 'primary partner commander set');
ok(ev("S.pcmd&&S.pcmd.partner===true&&S.pcmd._slot==='pcmd'"), 'S.pcmd is the partner-capable primary');
// a non-partner second is refused
ok(ev("setStartCommander({name:'NoPartner',ctype:'creature',p:2,t:2,partner:false},'pcmd2')")===false, 'non-partner second commander refused');
ok(ev("S.pcmd2")===null, 'S.pcmd2 still null after refusal');
// a partner second is accepted
ok(ev("setStartCommander({name:'Ishai',ctype:'creature',p:1,t:4,partner:true},'pcmd2')")===true, 'partner second commander accepted');
ok(ev("S.pcmd2&&S.pcmd2.name==='Ishai'&&S.pcmd2._slot==='pcmd2'"), 'S.pcmd2 set with slot pcmd2');

// 3. Both boxes render.
ev("render()");
ok(window.document.getElementById('pcmdBox').style.display!=='none', 'primary box visible');
ok(window.document.getElementById('pcmdBox2').style.display!=='none', 'partner box visible');
ok(/Ishai/.test(window.document.getElementById('pcmdBox2').innerHTML), 'partner box shows the second commander');

// 4. Slot-aware cast: casting the partner removes only pcmd2 and lands it on the stack tagged with its slot.
ev("castCmd('pcmd2')");
ok(ev("S.pcmd2")===null, 'castCmd(pcmd2) empties the partner slot');
ok(ev("S.pcmd&&S.pcmd.name==='Reyhan'"), 'the primary slot is untouched');
const item=ev("S.plays.find(p=>p._pcmd&&p._pcmdObj&&p._pcmdObj.name==='Ishai')");
ok(item && item._pcmdObj._slot==='pcmd2', 'the stack item carries the partner slot');
// resolve it to the board
ev("resolveCmdToBoard(S.plays.find(p=>p._pcmd))");
ok(ev("S.my.creatures.some(c=>c.name==='Ishai'&&c.isCmd&&c._slot==='pcmd2')"), 'partner resolves to the board keeping its slot');

// 5. A board partner death returns to its OWN slot (pcmd2), not the primary.
ev("var ish=S.my.creatures.find(c=>c.name==='Ishai');sendCmdToZone(ish,true)");
ok(ev("S.pcmd2&&S.pcmd2.name==='Ishai'"), 'partner death returns to S.pcmd2');
ok(ev("S.pcmd&&S.pcmd.name==='Reyhan'"), 'primary slot unaffected by partner death');

// 6. Deploy the partner directly (slot-aware).
ev("deployCmd('pcmd2')");
ok(ev("S.pcmd2")===null && ev("S.my.creatures.some(c=>c.name==='Ishai')"), 'deployCmd(pcmd2) puts the partner on the board');

// 7. freshGameForDungeon preserves BOTH commanders back to their slots.
ev("freshGameForDungeon()");
ok(ev("S.pcmd&&S.pcmd.name==='Reyhan'&&S.pcmd._slot==='pcmd'"), 'primary preserved across a fresh dungeon');
ok(ev("S.pcmd2&&S.pcmd2.name==='Ishai'&&S.pcmd2._slot==='pcmd2'"), 'partner preserved across a fresh dungeon');

// 8. Scryfall import sets cfg.partner from oracle text.
ok(ev("SCRY.buildImportedCard({name:'Tana',type_line:'Legendary Creature',oracle_text:'Partner (You can have two commanders if both have partner.)',power:'2',toughness:'2',colors:['G']}).partner")===true, 'Scryfall import detects Partner');
ok(ev("SCRY.buildImportedCard({name:'Plain',type_line:'Creature',oracle_text:'Trample',power:'3',toughness:'3'}).partner")===false, 'non-partner import has partner=false');

// --- Review regressions (P51.4 multi-lens review) ---
// R1: designating a plain board creature as commander must NOT clobber a deployed partner.
ev("fresh('standard');window.alert=function(){};");
ev("setStartCommander({name:'Main',ctype:'creature',p:3,t:3,partner:true})");
ev("setStartCommander({name:'Pard',ctype:'creature',p:2,t:2,partner:true},'pcmd2')");
ev("deployCmd('pcmd2')");  // Pard now on the board, isCmd, _slot pcmd2
ev("S.my.creatures.push({id:S.nextId++,name:'Grizzly',p:2,t:2,baseP:2,baseT:2,kw:[],color:[],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,dies:'graveyard'})");
const gz=ev("S.my.creatures.find(c=>c.name==='Grizzly').id");
ev(`setCommander('creatures',${gz})`);  // make Grizzly the primary
ok(ev("S.my.creatures.some(c=>c.name==='Pard'&&c.isCmd&&c._slot==='pcmd2')"), 'R1: deployed partner keeps commander status after a new primary is designated');
ok(ev("S.my.creatures.some(c=>c.name==='Grizzly'&&c.isCmd&&c._slot==='pcmd')"), 'R1: Grizzly becomes the primary (slot pcmd)');

// R2: un-designating the on-board partner must NOT null the zoned primary.
ev("fresh('standard');window.alert=function(){};");
ev("setStartCommander({name:'MainB',ctype:'creature',p:3,t:3,partner:true})");
ev("setStartCommander({name:'PardB',ctype:'creature',p:2,t:2,partner:true},'pcmd2')");
ev("deployCmd('pcmd2')");  // PardB on board, MainB still in zone (S.pcmd)
const pb=ev("S.my.creatures.find(c=>c.name==='PardB').id");
ev(`setCommander('creatures',${pb})`);  // un-designate the partner
ok(ev("S.pcmd&&S.pcmd.name==='MainB'"), 'R2: zoned primary survives un-designating the partner');
ok(!ev("S.my.creatures.some(c=>c.name==='PardB'&&c.isCmd)"), 'R2: the partner is un-designated');

// R3: setting a NON-partner primary drops an existing partner (no illegal pair).
ev("fresh('standard');window.alert=function(){};");
ev("setStartCommander({name:'MainC',ctype:'creature',p:3,t:3,partner:true})");
ev("setStartCommander({name:'PardC',ctype:'creature',p:2,t:2,partner:true},'pcmd2')");
ev("setStartCommander({name:'Solo',ctype:'creature',p:4,t:4,partner:false})");  // re-pick a non-partner primary
ok(ev("S.pcmd&&S.pcmd.name==='Solo'"), 'R3: new non-partner primary set');
ok(ev("S.pcmd2")===null, 'R3: the illegal partner is dropped (no non-partner-main + partner pair)');

// R4: pcmd2 drawer labels attack tax "enemy pays" (a player commander's tax is enemy-paid).
ev("S.pcmd2={id:99,name:'Z',kind:'creatures',p:1,t:1,partner:true,_slot:'pcmd2',color:[],prot:[],kw:[]}");
ok(/attack tax \(enemy pays\)/.test(ev("enemyDrawer('pcmd2',null,S.pcmd2)")), 'R4: pcmd2 attack-tax row reads "enemy pays"');

// 9. Save-safe: a legacy save with no pcmd2 migrates without throwing.
ok(!ev("(function(){try{var s=JSON.parse(stripJSON(S));delete s.pcmd2;migrate(s);return s.pcmd2!==null?'not-null':false}catch(e){return 'threw:'+e.message}})()"), 'legacy save (no pcmd2) migrates to null without throwing');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P51.4 FAILED':'P51.4 PASSED');
process.exit(fail?1:0);
