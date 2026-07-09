// Lands can be searched/tutored from the enemy's library or hand straight onto the battlefield
// (they become mana sources, matching dtPlayCard's land path). Non-permanent spells stay rejected.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");
ev("openDeckTools()");   // sets _dt + modal DOM so dtRender() inside dtMoveObj is realistic

// 1. A land from the library → onto the battlefield as a mana source (+1 land / +1 mana / +1 max).
ev("S.bossLands=2;S.bossMana=1;S.bossManaMax=2;window._TL={id:9301,key:'mtn'};S.lib=[window._TL]");
ev("dtMoveObj('lib',window._TL,'battlefield')");
ok(ev("S.bossLands")===3, 'land → +1 boss land (2→3)');
ok(ev("S.bossMana")===2,  'land → +1 available mana (1→2)');
ok(ev("S.bossManaMax")===3,'land → +1 max mana (2→3)');
ok(ev("S.lib.indexOf(window._TL)")===-1, 'land removed from the library');

// 1b. P50.10: the land records its COLOUR (Mountain → +1 R source & pool), not colour-blind scalars.
ev("S.bossLands=0;S.bossMana=0;S.bossManaMax=0;S.bossSrc=null;S.bossPool=null;window._TR={id:9310,key:'mtn'};S.lib=[window._TR]");
ev("dtMoveObj('lib',window._TR,'battlefield')");
ok(ev("bossSrcPool().R")===1, 'P50.10: a Mountain → +1 RED source (bossSrc.R)');
ok(ev("bossPool().R")===1,    'P50.10: a Mountain → +1 RED in the available pool (bossPool.R)');
ok(ev("bossSrcPool().A||0")===0,'P50.10: it is NOT recorded as any-colour A');

// 2. A land revealed from the enemy's HAND works too (same mover, zone='hand').
ev("S.bossLands=0;S.bossMana=0;S.bossManaMax=0;S.bossSrc=null;S.bossPool=null;window._TH={id:9302,key:'swp'};S.hand=[window._TH]");
ev("dtMoveObj('hand',window._TH,'battlefield')");
ok(ev("S.bossLands")===1 && ev("S.hand.indexOf(window._TH)")===-1, 'a land from hand also enters the battlefield as a mana source');
ok(ev("bossSrcPool().B")===1, 'P50.10: a Swamp from hand → +1 BLACK source (bossSrc.B)');

// 3. Regression: a creature still reanimates to a real permanent on the board.
ev("S.tokens=[];window._CR={id:9401,key:'ogre'};S.lib=[window._CR]");
ev("dtMoveObj('lib',window._CR,'battlefield')");
ok(ev("S.tokens.length")===1 && ev("S.lib.indexOf(window._CR)")===-1, 'creature still reanimates to the board (regression)');

// 4. Unchanged: a plain sorcery/instant is still rejected from the board (stays in its zone).
ev("S.bossLands=5;window._SP={id:9501,key:'smother'};S.lib=[window._SP]");
ev("dtMoveObj('lib',window._SP,'battlefield')");
ok(ev("S.lib.indexOf(window._SP)")>=0, 'a non-permanent spell is still rejected from the board');
ok(ev("S.bossLands")===5, 'rejected spell did not touch boss mana');

// 5. Browse-library UI: a land row now offers the ▸ board button; a spell still does not.
ev("S.lib=[{id:9601,key:'mtn'}];_dt={mode:'browse',n:3,typeFilter:'all',expanded:[],expandAll:false}");
ok(/dtBrowseMove\(0,'battlefield'\)/.test(ev("deckToolsHTML()")), 'browse: land row now shows a ▸ board button');
ev("S.lib=[{id:9602,key:'smother'}];_dt={mode:'browse',n:3,typeFilter:'all',expanded:[],expandAll:false}");
ok(!/dtBrowseMove\(0,'battlefield'\)/.test(ev("deckToolsHTML()")), 'browse: a non-permanent spell still has no ▸ board button');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'land-to-board FAILED':'land-to-board PASSED');
process.exit(fail?1:0);
