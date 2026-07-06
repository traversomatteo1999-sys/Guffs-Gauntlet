// P46.3 — ⚙ Settings: volume/mute · text size · animation level · export/import; DB.settings persistence.
const { boot } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; } else { fail++; console.log('  FAIL:', m); } };
const { window, errors } = boot();
const ev = e => window.eval(e);
const d = window.document;

ok(errors.length === 0, 'boot clean ' + JSON.stringify(errors.slice(0, 2)));
['openSettings', 'settingsHTML', 'setTextSize', 'setAnimLevel', 'applyTextSize', 'applyAnim', 'loadSettings'].forEach(f => ok(ev('typeof ' + f) === 'function', f + '() defined'));

// panel opens with the four groups + reachable from menu + controls bar
ev('openSettings()');
ok(d.getElementById('overlay').classList.contains('show'), 'openSettings shows the overlay');
const h = d.getElementById('modalBody').innerHTML;
ok(/⚙ Settings/.test(h) && /Text size/.test(h) && /Animations/.test(h) && /Volume|Sound/.test(h), 'panel has sound + text-size + animation groups');
const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'index.html'), 'utf8');
ok(/onclick="openSettings\(\)"[^>]*>⚙ Settings/.test(src), '⚙ Settings button in the controls bar + menu');
ok((src.match(/onclick="openSettings\(\)"/g) || []).length >= 2, 'settings reachable from >=2 places (menu + controls)');

// text size → root font-size, persisted on DB.settings
ev("setTextSize('L')"); ok(d.documentElement.style.fontSize === '18px' && ev("DB.settings.textSize") === 'L', "text size L → 18px root + DB.settings");
ev("setTextSize('S')"); ok(d.documentElement.style.fontSize === '15px', 'text size S → 15px root');
ev("setTextSize('M')"); ok(d.documentElement.style.fontSize === '16px', 'text size M → 16px root');

// animation level → html class, overriding the OS query in both directions
ev("setAnimLevel('off')"); ok(d.documentElement.classList.contains('motion-off') && ev("DB.settings.anim") === 'off', 'anim off → html.motion-off');
ev("setAnimLevel('soft')"); ok(d.documentElement.classList.contains('motion-soft') && !d.documentElement.classList.contains('motion-off'), 'anim soft → html.motion-soft (exclusive)');
ev("setAnimLevel('full')"); ok(d.documentElement.classList.contains('motion-full'), 'anim full → html.motion-full (override OS reduce)');
ev("setAnimLevel('auto')"); ok(!/motion-(full|soft|off)/.test(d.documentElement.className), 'anim auto → no class (OS query governs)');

// CSS: off still shows static damage numbers (fxfade), full has no reduction rule
ok(/html\.motion-off \.fxnum\{animation:fxfade/.test(src), 'off keeps static damage numbers (fxfade)');
ok(/html:not\(\.motion-full\)/.test(src), 'motion-full excluded from the OS-reduce fallback (override up)');

// persistence across reload: DB.settings drives applyTextSize/applyAnim
ev("DB.settings.textSize='L';DB.settings.anim='off';loadSettings()");
ok(d.documentElement.style.fontSize === '18px' && d.documentElement.classList.contains('motion-off'), 'loadSettings re-applies persisted settings on reload');

console.log(`p46-3-settings: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
