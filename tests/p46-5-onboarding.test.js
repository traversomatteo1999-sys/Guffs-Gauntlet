// P46.5 — first-run onboarding: offer the tutorial once per profile, migrate backfill.
const { boot } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; } else { fail++; console.log('  FAIL:', m); } };
const { window, errors } = boot();
const ev = e => window.eval(e);
const d = window.document;
ev("fresh('standard')");

ok(errors.length === 0, 'boot clean ' + JSON.stringify(errors.slice(0, 2)));
['shouldOfferTutorial', 'markTutorialSeen', 'offerTutorial'].forEach(f => ok(ev('typeof ' + f) === 'function', f + '() defined'));

// a brand-new profile flags seenTutorial:false → gets the offer (campaign, first run)
ok(ev("blankProfile('x').seenTutorial") === false, 'blankProfile seenTutorial:false');
ok(ev("prof()&&prof().seenTutorial") === false, 'fresh profile has not seen the tutorial');
ok(ev("shouldOfferTutorial()") === true, 'first-run campaign profile IS offered');

// the offer shows a two-choice cutscene and immediately marks seen (declining/reload never re-prompts)
let nextCalled = false; window.__next = () => { nextCalled = true; };
ev("offerTutorial(window.__next)");
ok(ev("prof().seenTutorial") === true, 'offer sets seenTutorial the moment it appears');
ok(d.getElementById('cutscene').classList.contains('show'), 'offer is a cutscene');
const cut = d.getElementById('cutscene').innerHTML;
ok(/Learn the ropes/.test(cut) && /Just play/.test(cut), 'offer has 📖 Learn / ▶ Just play choices');
ok(ev("shouldOfferTutorial()") === false, 'declining never re-prompts (second run is silent)');

// not offered in sandbox mode, and never mid-continued-run (mode guard)
ev("fresh('standard');prof().seenTutorial=false;S.mode='sandbox'");
ok(ev("shouldOfferTutorial()") === false, 'sandbox mode is never first-run-prompted');
ev("S.mode='campaign'"); ok(ev("shouldOfferTutorial()") === true, 'campaign first-run offered again after reset');

// migrate backfills EXISTING profiles to seen (they have already played)
ok(ev("(function(){DB.profiles.Vet={name:'Vet'};migrateProfiles();return DB.profiles.Vet.seenTutorial;})()") === true, 'migrate backfills an existing profile to seenTutorial:true (no re-prompt)');
// a post-change profile with false is left as-is by migrate (still gets its one offer)
ok(ev("(function(){DB.profiles.New={name:'New',seenTutorial:false};migrateProfiles();return DB.profiles.New.seenTutorial;})()") === false, 'migrate leaves a genuine first-run flag (false) intact');

// the opt-in entry points still exist
const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'play.html'), 'utf8');
ok((src.match(/openTutorial\(\)/g) || []).length >= 2, 'the ❓/menu opt-in tutorial entry points remain');

console.log(`p46-5-onboarding: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
