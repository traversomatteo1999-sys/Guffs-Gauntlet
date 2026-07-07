/* Guff's Gauntlet — service worker (offline app shell).
   The cache name is versioned (gg-cache-v56), so installing this build
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
const CACHE = 'gg-cache-v56';
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
