// P46.7: dead-code cleanup — pwAct() and fresh()'s legacy pw:null are gone, but an
// old (v40) save carrying S.pw must STILL load (migrate upgrades it to a real walker).
const { boot } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; } else { fail++; console.log('  FAIL:', m); } };
const { window, errors } = boot();
const ev = e => window.eval(e);

// pwAct() deleted
ok(ev("typeof pwAct") === 'undefined', 'pwAct() removed');
// fresh() no longer seeds a pw field
ok(ev("(function(){fresh('standard');return 'pw' in S;})()") === false, "fresh() S has no legacy pw field");

// an old-save S.pw still migrates to a real enemy walker (loyalty preserved), then clears
const migrated = ev("(function(){fresh('standard');var old=JSON.parse(JSON.stringify(S));old.pw={name:'Old Nyx',loy:5,loyalty:5,baseLoy:5,ultThreshold:7,plus:{n:'+1',sign:1,text:'x'},minus:{n:'-3',sign:-3,text:'y'},ult:{n:'ult',sign:-7,text:'z'},colors:['R'],attackableBy:null};old.enemyWalkers=[];return migrate(old);})()");
ok(Array.isArray(migrated.enemyWalkers) && migrated.enemyWalkers.some(w => w.name === 'Old Nyx'), 'old-save S.pw migrates into S.enemyWalkers (real permanent)');
const w = (migrated.enemyWalkers || []).find(x => x.name === 'Old Nyx');
ok(w && w.loyalty === 5 && w.isWalker === true, 'migrated walker keeps loyalty + is flagged isWalker');
ok(migrated.pw === null, 'migrated S.pw cleared to null (no vestigial field read live)');

// migrate on a NEW (post-cleanup) save is a clean no-op for pw
ok(ev("(function(){fresh('standard');var s=migrate(JSON.parse(JSON.stringify(S)));return s.pw===null&&Array.isArray(s.enemyWalkers);})()") === true, 'migrate of a fresh save leaves pw null + enemyWalkers intact');

ok(errors.length === 0, 'no console/jsdom errors ' + JSON.stringify(errors.slice(0, 2)));
console.log(`p46-cleanup: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
