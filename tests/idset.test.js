// P46.1: id-set guard — no element id may be REMOVED from index.html without intent.
// The committed baseline is ids.snapshot.txt. Adding ids is fine (guard only checks removals);
// if you deliberately remove an id, regenerate the snapshot: `node tests/idset.test.js --update`.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'play.html'), 'utf8');
const ids = [...new Set(html.match(/id="[^"]+"/g) || [])].sort();
const snapFile = path.join(__dirname, 'ids.snapshot.txt');
if (process.argv.includes('--update') || !fs.existsSync(snapFile)) {
  fs.writeFileSync(snapFile, ids.join('\n') + '\n');
  console.log(`idset: snapshot ${fs.existsSync(snapFile) ? 'updated' : 'created'} (${ids.length} ids)`);
  process.exit(0);
}
const snap = fs.readFileSync(snapFile, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
const cur = new Set(ids);
const removed = snap.filter(id => !cur.has(id));
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('  FAIL:', m); } };
ok(removed.length === 0, 'ids removed since snapshot (regenerate with --update if intentional): ' + removed.join(', '));
console.log(`idset: ${fail ? 'FAIL' : 'OK'} (${ids.length} ids present, ${snap.length} baseline, ${removed.length} removed)`);
process.exit(fail ? 1 : 0);
