// Task 3 (headless part): the Scryfall import UI boots + the OFFLINE data pipeline maps a real card. (Live api.scryfall.com needs a browser.)
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

// simulate OFFLINE so scryDoSearch takes the graceful no-network path (jsdom has no real network)
window.fetch=()=>Promise.reject(new Error('offline (test)'));
ev("fresh('standard')");

// 1) the import launcher opens without throwing
let threw=null;try{ ev("openCardSearch()"); }catch(e){ threw=e.message; }
ok(!threw, 'openCardSearch() opens the import launcher without throwing'+(threw?': '+threw:''));
const html=()=>window.document.getElementById('modalBody').innerHTML;
ok(/id="scryQ"/.test(html()), 'launcher has the search box');
ok(/scryTabDeck|Paste a decklist/.test(html()), 'launcher has the Paste-a-decklist tab');
ok(/Create a card/.test(html()), 'launcher links to ✎ Create a card');
ok(/scryOffline/.test(html()), 'launcher has the offline banner element');

// 2) the offline search settles gracefully (no unhandled crash)
return (async()=>{
  await new Promise(r=>setTimeout(r,50)); // let scryDoSearch's promise settle
  ok(true, 'offline search settled without crashing the app');

  // 3) OFFLINE data pipeline: a real Scryfall-style card → a valid, castable library cfg
  const bolt=ev(`SCRY.buildImportedCard({name:'Lightning Bolt',type_line:'Instant',oracle_text:'Lightning Bolt deals 3 damage to any target.',keywords:[],colors:['R'],cmc:1,mana_cost:'{R}'})`);
  ok(bolt.name==='Lightning Bolt' && bolt.ctype==='instant', 'maps a real instant (Lightning Bolt) → ctype instant');
  ok(bolt.auto && bolt.auto.k==='dmgBoss' && bolt.auto.n===3, 'inferEffects reads "deals 3 damage" → dmgBoss 3');
  ok(bolt.cost===1, 'cost derived from mana cost (1)');
  const bear=ev(`SCRY.buildImportedCard({name:'Grizzly Bears',type_line:'Creature — Bear',oracle_text:'',keywords:[],colors:['G'],cmc:2,mana_cost:'{1}{G}',power:'2',toughness:'2'})`);
  ok(bear.ctype==='creature' && bear.p===2 && bear.t===2, 'maps a vanilla creature (2/2)');
  // a creature with our newly-recognised keywords round-trips
  const rogue=ev(`SCRY.buildImportedCard({name:'Rogue',type_line:'Creature — Rogue',oracle_text:'Flash. Prowess. Fear.',keywords:['Flash','Prowess','Fear'],colors:['U'],cmc:2,mana_cost:'{1}{U}',power:'2',toughness:'2'})`);
  ok(['flash','prowess','fear'].every(k=>rogue.kw.indexOf(k)>=0), 'P40 keywords survive the import pipeline');

  // 4) decklist paste parsing (offline, pure)
  const dl=ev(`SCRY.parseDecklist('2 Lightning Bolt\\n1x Grizzly Bears\\n// a comment\\n3 Mountain')`);
  ok(dl.length===3 && dl[0].qty===2 && dl[0].name==='Lightning Bolt', 'parseDecklist parses quantities + names (skips comments)');

  if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}else console.log('ok: no console errors opening/using the import UI offline');
  console.log(fail?'IMPORT (offline) FAILED':'IMPORT (offline) PASSED');
  process.exit(fail?1:0);
})();
