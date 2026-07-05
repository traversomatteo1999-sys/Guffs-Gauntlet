// P46.1: the regression runner. Runs every tests/*.test.js as an isolated node process
// (fresh jsdom each) and aggregates. Offline — no network. `npm test` calls this.
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.test.js')).sort();
let pass = 0, fail = 0; const failed = [];
console.log(`Guff's Gauntlet — regression suite (${files.length} tests)\n`);
for (const f of files) {
  process.stdout.write('  ▶ ' + f.padEnd(30) + ' ');
  try {
    const out = execFileSync('node', [path.join(dir, f)], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    const last = out.trim().split('\n').filter(Boolean).pop() || 'ok';
    process.stdout.write(last + '\n'); pass++;
  } catch (e) {
    fail++; failed.push(f);
    const out = ((e.stdout || '') + (e.stderr || '')).trim().split('\n').filter(Boolean).slice(-8).join('\n      ');
    process.stdout.write('FAILED\n      ' + out + '\n');
  }
}
console.log('\n' + '─'.repeat(56));
console.log(`SUITE: ${pass}/${files.length} passed` + (fail ? `, ${fail} FAILED → ${failed.join(', ')}` : ' — all green'));
process.exit(fail ? 1 : 0);
