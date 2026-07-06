// P46.8 gate: a full campaign descent on easy + brutal, and a sandbox battle — each
// runs the real turn engine/enemy AI/combat to a natural end with ZERO console errors.
// (Standard campaign is covered by full-descent.test.js.)
let fail = 0; const ok = (c, m) => { if (!c) { console.error('FAIL:', m); fail++; } };
const { boot } = require('./harness.js');

function bigChampion(ev) { ev("S.my.creatures=[{id:S.nextId++,name:'Champion',p:40,t:40,baseP:40,baseT:40,kw:['trample','haste','vigilance'],color:['G'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:false,dies:'graveyard',_atk:true,strength:'top'}]"); ev("S.my.creatures.forEach(c=>c._atk=true)"); }

function driveTurn(ev, allowAdvance) {
  if (ev("!!S.combat")) { try { ev("approveCombat()"); } catch (e) { ev("cancelCombat()"); return 'combat:' + e.message; } return null; }
  if (allowAdvance && ev("S.paused && !S.over")) { try { ev("advance()"); } catch (e) { return 'advance:' + e.message; } return null; }
  if (ev("(S.plays||[]).some(p=>p&&p.status==='pending'&&!p._player)")) { try { ev("resolveStack()"); } catch (e) { return 'resolveStack:' + e.message; } return null; }
  if (ev("S.activeTurn===null")) { ev("beginVaelTurn()"); return null; }
  if (ev("S.activeTurn==='vael'")) { try { ev("advancePhase()"); } catch (e) { return 'enemyPhase:' + e.message; } return null; }
  bigChampion(ev); try { ev("swing()"); } catch (e) { return 'swing:' + e.message; }
  if (ev("!!S.combat")) { try { ev("approveCombat()"); } catch (e) { return 'approve:' + e.message; } }
  if (ev("!S.combat && !(S.plays||[]).some(p=>p&&p.status==='pending'&&p._player)")) { try { ev("advancePhase()"); } catch (e) { return 'playerPhase:' + e.message; } }
  return null;
}

function runCampaign(diff) {
  const { window, errors } = boot(); const ev = e => window.eval(e);
  ev(`fresh('${diff}')`);
  let guard = 0, err = null;
  while (!ev('S.over') && guard++ < 700) { err = driveTurn(ev, true); if (err) break; }
  ok(!err, `campaign ${diff}: no exception (${err || 'ok'})`);
  ok(ev('S.over') === true, `campaign ${diff}: terminated (guard=${guard}, room ${ev('S.roomIndex')})`);
  ok(errors.length === 0, `campaign ${diff}: zero console errors` + (errors.length ? ' → ' + JSON.stringify(errors.slice(0, 3)) : ''));
}

function runSandbox() {
  const { window, errors } = boot(); const ev = e => window.eval(e);
  try { ev("startBattle({mode:'sandbox',levelIdx:0,roomIdx:0,diff:'standard'})"); } catch (e) { ok(false, 'sandbox start threw: ' + e.message); return; }
  ok(ev("S.mode") === 'sandbox' && ev("_liveGame") === true, 'sandbox: live battle started');
  let guard = 0, err = null;
  while (!ev('S.over') && guard++ < 500) { err = driveTurn(ev, false); if (err) break; }
  ok(!err, `sandbox: no exception (${err || 'ok'})`);
  ok(ev('S.over') === true, `sandbox: battle terminated (guard=${guard})`);
  ok(errors.length === 0, `sandbox: zero console errors` + (errors.length ? ' → ' + JSON.stringify(errors.slice(0, 3)) : ''));
}

runCampaign('easy');
runCampaign('brutal');
runSandbox();
console.log(`modes-difficulties: ${fail ? 'FAILED' : 'PASSED'}`);
process.exit(fail ? 1 : 0);
