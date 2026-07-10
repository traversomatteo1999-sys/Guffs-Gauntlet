// P52.1 (reverses P50.6): the command-zone commander box shows NO card-editing options — only once on the battlefield.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("window.alert=function(){};fresh('standard')");

// Seed a creature commander in the command zone.
ev("setStartCommander({name:'Krenko',ctype:'creature',p:3,t:3})");
ev("render()");
const cz=window.document.getElementById('pcmdBox').innerHTML;
// keeps: name, cast, deploy, hand toggle, tax line
ok(/Krenko/.test(cz), 'cz box shows the commander name');
ok(/castCmd\('pcmd'/.test(cz), 'cz box keeps Cast to Stack');
ok(/deployCmd\('pcmd'/.test(cz), 'cz box keeps Deploy direct');
ok(/pcmdToHand\('pcmd'\)|pcmdToZone\('pcmd'\)/.test(cz), 'cz box keeps the hand/zone toggle');
// removed: editor controls
ok(!/toggleDrawer\('pcmd'/.test(cz), 'cz box has NO Actions drawer');
ok(!/objPT\('pcmd'/.test(cz), 'cz box has NO ±P/T controls');
ok(!/permCtrBtns|setCtr\('pcmd'/.test(cz), 'cz box has NO counter buttons');
ok(!/kwSelect|addKw\('pcmd'/.test(cz), 'cz box has NO keyword editor');

// Deploy it -> the on-battlefield card still carries the full drawer.
ev("deployCmd('pcmd')");
ev("render()");
const board=window.document.getElementById('myCrea').innerHTML;
ok(/Krenko/.test(board), 'the deployed commander is on the battlefield');
ok(/toggleDrawer\('creatures'/.test(board), 'the on-board commander card still has the full Actions drawer');

// A walker commander in the zone is likewise trimmed.
ev("fresh('standard');window.alert=function(){};");
ev("setStartCommander({name:'Teferi',ctype:'planeswalker',loy:4})");
ev("render()");
const czW=window.document.getElementById('pcmdBox').innerHTML;
ok(/Teferi/.test(czW) && /castCmd\('pcmd'/.test(czW) && !/toggleDrawer\('pcmd'/.test(czW), 'walker-commander cz box also trimmed (name+cast, no drawer)');

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P52.1 FAILED':'P52.1 PASSED');
process.exit(fail?1:0);
