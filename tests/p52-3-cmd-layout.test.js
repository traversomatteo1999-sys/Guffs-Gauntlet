// P52.3: enemy commander card layout parity — top: ↩hand·↺reset (+Slay corner) → name → stats/abilities → ⧉copy at the BOTTOM. Single .slay.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// --- Creature commander ---
ev("S.cmd={id:S.nextId++,n:'Ashmaw',name:'Ashmaw',isWalker:false,inPlay:true,p:3,t:3,baseP:3,baseT:3,kw:[],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,color:['R'],prot:[],dies:'graveyard',_drawer:false}");
let h=ev("cmdFieldCard()");
ok((h.match(/class="slay mini/g)||[]).length===1, 'creature-cmd still has exactly ONE .slay button');
const iHand=h.indexOf('cmdToHand()'), iName=h.indexOf('>♛ Ashmaw'), iCopy=h.indexOf("copyPermanent('cmd',null)");
ok(iHand>=0 && iName>=0 && iCopy>=0, 'creature-cmd has hand, name, and copy');
ok(iHand<iName, 'creature-cmd: ↩hand is ABOVE the name (top actions)');
ok(iCopy>iName, 'creature-cmd: ⧉copy is BELOW the name');
// copy is the LAST control (bottom)
ok(iCopy>h.indexOf("toggleDrawer('cmd',null)"), 'creature-cmd: ⧉copy comes after the Actions drawer toggle (bottom of the card)');

// --- Walker commander ---
ev("S.cmd={id:S.nextId++,n:'Ash the Guardian',name:'Ash the Guardian',isWalker:true,inPlay:true,loyalty:4,baseLoy:4,color:['B'],prot:[],other:[],_drawer:false,wplus:{sign:1,n:'x',text:'y'}}");
h=ev("cmdFieldCard()");
ok((h.match(/class="slay mini/g)||[]).length===1, 'walker-cmd still has exactly ONE .slay button');
const wHand=h.indexOf('cmdToHand()'), wName=h.indexOf('♛✦'), wCopy=h.indexOf("copyPermanent('cmd',null)");
ok(wHand<wName, 'walker-cmd: ↩hand is ABOVE the name');
ok(wCopy>wName, 'walker-cmd: ⧉copy is BELOW the name (bottom)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P52.3 FAILED':'P52.3 PASSED');
process.exit(fail?1:0);
