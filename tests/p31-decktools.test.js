// P31: expandable deck-tools card rows — collapsed summary by default; expand shows P/T+keywords, effect, text.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");
// Build a known library: ogre (creature spawn 4/3 trample), smother (removal target), warband (combined 2 spawns).
ev("S.lib=[{id:5001,key:'ogre'},{id:5002,key:'smother'},{id:5003,key:'warband'}]");
ev("_dt={mode:'play',n:5,payMana:true,expanded:[],expandAll:false}");

let h=ev("deckToolsHTML()");
ok(/▸/.test(h), 'rows render a ▸ collapse chevron by default');
ok(/ogre|Warren Ogre/.test(h), 'ogre row present (summary)');
ok(!/Body:/.test(h) && !/4\/3<\/i>|<b>4\/3<\/b>/.test(h), 'collapsed: no P/T body shown yet');
ok(/onclick="dtPlayCard/.test(h), 'action buttons present on rows');

// Expand the ogre → body with P/T + keywords + effect
ev("dtToggleCard(5001)");
h=ev("deckToolsHTML()");
ok(/▾/.test(h), 'expanded row shows ▾');
ok(/4\/3/.test(h) && /trample/.test(h), 'expanded ogre shows 4/3 + trample (from spawn run)');
ok(/create a 4\/3/.test(h), 'expanded ogre shows an effect summary');

// Combined-run card lists multiple bodies
ev("dtToggleCard(5003)");
h=ev("deckToolsHTML()");
ok(/Bodies:/.test(h), 'combined-run card labels multiple Bodies');
ok((h.match(/1\/1/g)||[]).length>=2, 'combined-run lists two 1/1 bodies');

// Burn/removal card shows its effect summary
ev("dtToggleCard(5002)");
h=ev("deckToolsHTML()");
ok(/destroy your strongest creature/.test(h), 'removal card shows humanized effect summary');

// Collapse again
ev("dtToggleCard(5001)");
h=ev("deckToolsHTML()");
ok(!/create a 4\/3/.test(h), 'toggling collapses the ogre body again');

// Expand-all
ev("dtExpandAll()");
h=ev("deckToolsHTML()");
ok((h.match(/▾/g)||[]).length>=3, 'expand-all expands every row');
ok(/collapse all/.test(h), 'button flips to "collapse all"');
ev("dtExpandAll()");
h=ev("deckToolsHTML()");
ok(!/▾/.test(h), 'collapse-all collapses every row');

// moved card records now carry ids (P31 robustness)
ok(ev("(function(){var r=_movedCard({name:'X',key:'ogre'});return typeof r.id==='number';})()"), '_movedCard gives records a numeric id');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P31 FAILED':'P31 PASSED');
process.exit(fail?1:0);
