/* Guff's Gauntlet — service worker (offline app shell).
   The cache name is versioned (see the CACHE constant below), so installing this build
   evicts any earlier cached version on activate. A fetch handler is present,
   which is what makes the app installable.
   v49 (P45.1): the 4 typefaces are now inlined as data-URI woff2 inside
   index.html itself (the Google Fonts CDN was dropped).
   v50 (P47 art pass): external image assets under Pictures/ (per-warden icons +
   dungeon backdrops, the menu backdrop, and the Ember/Conclave lore art) are now
   precached for offline use. They are added best-effort AFTER the critical shell,
   so a single missing/renamed file cannot fail the whole install.
   v51 (P47.1): those images were compressed PNG->JPEG (~19MB -> ~1.9MB), so the
   Pictures/ list is now .jpg and the cache is bumped to drop the stale .png entries.
   v52 (P47.2): CSS-only layout fix — the You/Foe and Turn-flow/Your-attack duos now
   stack in the narrow desktop rails instead of clipping; cache bumped so installed
   players get the corrected index.html on their next online launch.
   v53 (P48): reverted the desktop three-rail grid to the spec's VERTICAL stacked
   cornice tabs (SPEC §3b); first-run tutorial offer moved AFTER all story cutscenes
   (choosing it no longer skips the gate intro). */
/* v54 (site): the marketing landing page is now './index.html' and the GAME moved to
   './play.html'. Both are precached; navigations fall back to whichever page was
   requested (then to play.html) so the installed app still opens straight into the game
   offline. manifest start_url is now ./play.html.
   v55 (P48.3): Vael's planeswalker renamed to "Ash the Guardian"; Vael's siege removed and
   given to Grakk (starts in play, heals +1/upkeep). play.html changed → cache bumped. */
/* v57 (P50.3 ship + P50.10): ships the already-merged P50.3 (in-deck lands searchable straight
   to the enemy battlefield) and P50.10 (that manual land→board path now records the land's mana
   COLOUR via addBossSource, not colour-blind scalars). play.html changed → cache bumped. */
/* v58 (P50.7/.11/.13 polish): renamed the FX card off the verbatim warden name "Murglax, Pit-Tyrant"
   → "Servant of the Pit-Tyrant"; the enemy walker-commander (Ash) now reads as a PLANESWALKER on the
   stack, not a creature; the tax badge is removed from the enemy commander card face. */
/* v59 (P50.1): a visible ↩ Undo button in the Turn-flow box (surfaces the existing undo()). */
/* v60 (P50.4/.5): the per-card "attack tax" (catk) is retired everywhere (ward replaces the
   per-card need); the enemy-pays attack tax is now an "Attack tax — enemy pays" emblem that
   makes the enemy pay N mana per attacker (unpayable attackers stay home). */
/* v61 (P50.6): per-card options (keywords, ±P/T, counters, markers, properties drawer) now work
   on commanders too — the player's command-zone commander and the enemy walker-commander. */
/* v62 (P50.8): cast the designated commander straight from the ✦ Cast-a-spell launcher; a walker
   (noncreature) commander cast now triggers your prowess on resolve, like any noncreature spell. */
/* v63 (P50.12): re-tiered the two under-priced strong passives — Scholar's Token (+1 card/turn)
   uncommon→rare 26g, Mana Surge (+1 mana/turn) rare→legendary 38g. */
/* v64 (P50.14): story-driven soundtrack manager (pooled <audio> tied to the story phase) replaces
   the P45.4 synth pad. The Soundtrack/ tracks are NOT precached here — the pool is ~100 MB, far too
   large to bundle into every install; they stream online (silent offline). Cache bumped for play.html. */
/* v65 (P50.15, parallel session): unified attack-tax UI (one "⚔ attack tax" row via setAtkTaxRule)
   + restored the per-card catk drawers/cast-form retired in P50.5 (reverses P50.5 per user request;
   folds in P50.4's enemy-pays emblem, still read for old saves). */
/* v66 (P50.2): the combat resolver recalculates LIVE — while it's open, a flashed creature appears
   as a blocker, a removed combatant drops, totals recompute (no cancel-and-reopen). _combatPrune now
   rebuilds the blocker pool from the live board and runs on every render (even minimized) + at approve. */
/* v67 (P50.16, parallel session): attack tax is per-card catk + the enemy-pays emblem (not an enchantment). */
/* v68 (P50.9): smarter enemy AI (standard+, easy stays legacy) — holds back a bomb the player can
   GANG-kill favorably, doesn't throw away a valuable body to chump a non-lethal hit when the boss is
   healthy, and develops instead of sandbagging interaction mana when clearly behind on board. */
const CACHE = 'gg-cache-v72';
const SHELL = [
  './index.html',
  './play.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon-180.png',
  './icons/favicon-64.png'
];
/* P47: large art assets — cached best-effort (see install handler). Names must match
   the files in Pictures/ exactly (case-sensitive on Netlify/Linux). */
const IMAGES = [
  './Pictures/Grakk.jpg',
  './Pictures/Murglax.jpg',
  './Pictures/Vael.jpg',
  './Pictures/GrakkBackground.jpg',
  './Pictures/MurglaxBackground.jpg',
  './Pictures/VaelBackground.jpg',
  './Pictures/Menu.jpg',
  './Pictures/Ember.jpg',
  './Pictures/DrownedConclave.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL).then(() =>
        // best-effort: one missing/renamed image must not abort the whole install
        Promise.all(IMAGES.map((u) => c.add(u).catch(() => {})))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Cross-origin (e.g. Scryfall API/images): go straight to the network and let the
  // app handle any error itself — never answer with the cached HTML shell.
  if (new URL(req.url).origin !== self.location.origin) return;
  // Navigations: try the network (so a fresh build shows when online), fall back to the cached shell.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match(req).then((m) => m || caches.match('./play.html'))));
    return;
  }
  // Everything else: cache-first, then network, then the game shell as a last resort.
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).catch(() => caches.match('./play.html')))
  );
});
