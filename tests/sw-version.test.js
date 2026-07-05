// P46.6: deploy-drift guard — sw.js's gg-cache-v* MUST match the version quoted in README.md.
// A build that bumps the service-worker cache but forgets the README (or vice-versa) fails here.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const swV = (sw.match(/gg-cache-v(\d+)/) || [])[1];
const rmV = (readme.match(/gg-cache-v(\d+)/) || [])[1];
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('  FAIL:', m); } };
ok(swV, 'sw.js declares a gg-cache-v version');
ok(rmV, 'README references a gg-cache-v version');
ok(swV && rmV && swV === rmV, `sw.js (v${swV}) and README (v${rmV}) match — no deploy drift`);
console.log(`sw-version: ${fail ? 'FAIL' : 'OK'} (sw=v${swV}, readme=v${rmV})`);
process.exit(fail ? 1 : 0);
