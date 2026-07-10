// P52.5: creature/permanent subtypes — field, Scryfall import parse, manual editor, migration, walker auto-derive, display.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("window.alert=function(){};fresh('standard')");

// 1. Helpers.
ok(JSON.stringify(ev("subtypesFrom('Legendary Creature — Goblin Warrior')"))==='["Goblin","Warrior"]', 'subtypesFrom parses the post-dash subtypes');
ok(JSON.stringify(ev("subtypesFrom('Instant')"))==='[]', 'subtypesFrom returns [] when no subtypes');
ok(JSON.stringify(ev("walkerSub('Ash the Guardian')"))==='["Ash"]', 'walkerSub derives the character name');
ok(JSON.stringify(ev("walkerSub('Vael, the Ember Tyrant')"))==='["Vael"]', 'walkerSub handles a comma title');

// 2. Scryfall import parses subtypes from type_line.
ok(JSON.stringify(ev("SCRY.buildImportedCard({name:'Goblin Guide',type_line:'Creature — Goblin',oracle_text:'Haste',power:'2',toughness:'2',colors:['R']}).subtypes"))==='["Goblin"]', 'import parses a single subtype');
ok(JSON.stringify(ev("SCRY.buildImportedCard({name:'Grizzly Bears',type_line:'Creature — Bear',oracle_text:'',power:'2',toughness:'2',colors:['G']}).subtypes"))==='["Bear"]', 'import: Bear');

// 3. Manual editor: castSubtypes -> cfg.subtypes.
ev("_editLid=null;$('modalBody').innerHTML=castFormHTML();setCastType('creature');$('castName').value='Elf Warrior';$('castSubtypes').value='Elf Warrior';");
ok(JSON.stringify(ev("readCastForm().subtypes"))==='["Elf","Warrior"]', 'readCastForm parses manual subtypes');
// a walker with no manual subtypes auto-derives its name
ev("$('modalBody').innerHTML=castFormHTML();setCastType('planeswalker');$('castName').value='Jace Beleren';$('castSubtypes').value='';");
ok(JSON.stringify(ev("readCastForm().subtypes"))==='["Jace"]', 'a walker with no subtypes auto-derives its name');

// 4. resolvePlayerItem carries subtypes onto the board.
ev("S.my.creatures=[];resolvePlayerItem({name:'Goblin',ctype:'creature',p:2,t:2,kw:[],color:['R'],subtypes:['Goblin'],props:{strength:'mid'}})");
ok(JSON.stringify(ev("S.my.creatures[0].subtypes"))==='["Goblin"]', 'resolved creature keeps its subtypes');
// a resolved walker with no subtypes auto-derives
ev("S.my.walkers=[];resolvePlayerItem({name:'Teferi Hero',ctype:'planeswalker',loy:4,color:['U'],subtypes:[],props:{strength:'mid'}})");
ok(JSON.stringify(ev("S.my.walkers[0].subtypes"))==='["Teferi"]', 'resolved walker auto-derives its subtype');

// 5. Enemy commander subtypes (data + build).
const gi=ev("DUNGEON.findIndex(r=>r.cmd&&r.cmd.n==='Ashmaw')");
ev(`S.roomIndex=${gi};enterRoom(${gi})`);
ok(JSON.stringify(ev("S.cmd.subtypes"))==='["Hound"]', 'enemy creature-commander Ashmaw has its subtype');
const vi=ev("DUNGEON.findIndex(r=>r.cmd&&r.cmd.isWalker)");
ev(`S.roomIndex=${vi};enterRoom(${vi})`);
ok(JSON.stringify(ev("S.cmd.subtypes"))==='["Ash"]', 'enemy walker-commander (Ash) auto-derives its subtype');

// 6. Migration backfills subtypes + SAVE_V bump.
ok(ev("SAVE_V")===45, 'SAVE_V bumped to 45');
ok(!ev("(function(){try{var s=JSON.parse(stripJSON(S));(s.my.creatures||[]).forEach(c=>delete c.subtypes);(s.my.walkers||[]).forEach(c=>delete c.subtypes);migrate(s);return (s.my.creatures||[]).some(c=>!Array.isArray(c.subtypes))?'missing':false}catch(e){return 'threw:'+e.message}})()"), 'migrate backfills subtypes on in-S permanents without throwing');
ok(ev("(function(){var s={my:{creatures:[],walkers:[{id:1,name:'Nissa Vast',loyalty:3}],artifacts:[],enchants:[]},tokens:[],pcmd:null};migrate(s);return JSON.stringify(s.my.walkers[0].subtypes)})()")==='["Nissa"]', 'migrate derives a legacy walker subtype from its name');

// 7. migrateProfiles backfills library cfgs.
ev("DB=DB||{profiles:{}};DB.profiles.__t={name:'__t',library:[{name:'Old Card',ctype:'creature'},{name:'Old Walker',ctype:'planeswalker'}],camp:{gold:0,pending:[],stash:[],cleared:{},level:0,run:null},sand:{gold:0,pending:[],stash:[],save:null,stats:{}}};");
ev("migrateProfiles()");
ok(ev("Array.isArray(DB.profiles.__t.library[0].subtypes)"), 'migrateProfiles backfills a library creature cfg subtypes ([])');
ok(JSON.stringify(ev("DB.profiles.__t.library[1].subtypes"))==='["Old"]', 'migrateProfiles derives a library walker cfg subtype from its name');

// 8. Display: type line.
ok(ev("typeLineOf({ctype:'creature',p:2,t:2,subtypes:['Goblin']})")==='Creature — Goblin', 'typeLineOf renders "Creature — Goblin"');
ok(ev("typeLineOf({ctype:'creature',p:2,t:2,legendary:true,subtypes:['Goblin','Warrior']})")==='Legendary Creature — Goblin Warrior', 'typeLineOf includes Legendary + multi-subtype');
ev("S.my.creatures=[{id:S.nextId++,name:'Gob',p:2,t:2,baseP:2,baseT:2,kw:[],color:[],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,subtypes:['Goblin'],dies:'graveyard'}];render()");
ok(/Creature — Goblin/.test((window.document.getElementById('myCrea')||{}).innerHTML||''), 'the creature tile renders its type line');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P52.5 FAILED':'P52.5 PASSED');
process.exit(fail?1:0);
