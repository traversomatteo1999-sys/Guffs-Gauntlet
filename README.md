# Guff's Gauntlet — installable PWA (v40)

This folder is a self-contained Progressive Web App. The whole game lives in
`index.html` (all art embedded); the other files just make it installable and
usable offline.

```
index.html                 the game (open this directly, or install it)
manifest.webmanifest       app name, colours, icons
sw.js                      service worker (offline cache + installability)
icons/                     app icons (192, 512, maskable-512, apple-touch-180, favicon-64)
README.md                  this file
```

## Just want to play?

Double-click `index.html`. It runs as-is in any modern browser. (When opened
from a `file://` path the service worker stays off — that's expected, and the
game is fully playable without it.)

## Install it (home-screen / standalone app)

Installation requires the files to be served over **HTTPS** or **localhost** —
browsers won't register a service worker from `file://`.

**Test locally in ~10 seconds** — from inside this folder:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/` in Chrome or Edge.

**Free private hosting** (drag-and-drop or a couple of clicks):
- Netlify Drop — drag this folder onto https://app.netlify.com/drop
- Cloudflare Pages, Vercel, or GitHub Pages — push/upload the folder

**Then install:**
- **Desktop Chrome / Edge** — click the install icon in the address bar (or
  menu → *Install Guff's Gauntlet*).
- **Android Chrome** — menu → *Add to Home screen* / *Install app*.
- **iOS Safari** — Share → *Add to Home Screen*.

Once installed it opens in its own window, works offline, and uses the gauntlet
icon.

## Updating to a newer build

Replace the files (especially `index.html`) and bump the cache name in `sw.js`
(this build uses `gg-cache-v40`). The service worker deletes the old cache on
activate, so installed users pick up the new build on their next launch (or two).
Your saved profiles, card library, and gold live in the browser's local storage
and are **not** touched by an update.
