/* Guff's Gauntlet — service worker (offline app shell).
   The cache name is versioned (gg-cache-v52), so installing this build
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
   players get the corrected index.html on their next online launch. */
const CACHE = 'gg-cache-v52';
const SHELL = [
  './index.html',
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
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  // Everything else: cache-first, then network, then the shell as a last resort.
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).catch(() => caches.match('./index.html')))
  );
});
