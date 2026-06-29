# Guff's Gauntlet — installable PWA (Level I)

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

**Free private hosting — Netlify (keep ONE site so the URL never changes):**
1. **First time only:** at https://app.netlify.com create a site and drag this folder
   in. Note its name/URL (e.g. `guffsgauntlet.netlify.app`).
2. **Every update after that — deploy to the SAME site:** open that site in the
   dashboard → **Deploys** tab → drag this folder onto *that page's* drop area. The
   URL stays the same, so installed players auto-update (see "Updating" below) and
   never need a new link.
   > ⚠️ Do **not** use https://app.netlify.com/drop to update — Netlify **Drop creates a
   > brand-new, randomly-named site every time** (e.g. `sweet-otter-…`), which changes the
   > URL and orphans your players' saves. Drop is for one-off throwaways only.
3. **Optional, fully automatic:** in the site's *Build & deploy → Continuous deployment*,
   link this GitHub repo (build command empty, publish directory `/`). Then every
   `git push` redeploys the same site by itself — no dragging.

(Cloudflare Pages, Vercel, or GitHub Pages work too — same rule: one project, push/upload to it.)

**Then install:**
- **Desktop Chrome / Edge** — click the install icon in the address bar (or
  menu → *Install Guff's Gauntlet*).
- **Android Chrome** — menu → *Add to Home screen* / *Install app*.
- **iOS Safari** — Share → *Add to Home Screen*.

Once installed it opens in its own window, works offline, and uses the gauntlet
icon.

## Updating to a newer build (same URL, players auto-update)

1. Change the files (especially `index.html`).
2. **Bump the cache name in `sw.js`** — this build uses `gg-cache-v48`; increment it
   (`v49`, …). The service worker deletes the old cache on activate, so installed
   players pick up the new build on their next launch (or two).
3. **Deploy to the SAME Netlify site** (its *Deploys* tab — not Netlify Drop). Same
   URL → no new link, everyone updates automatically.

Saved profiles, card library, and gold live in the browser's local storage and are
**not** touched by an update — **as long as the URL (origin) stays the same.** A
different domain means a fresh, empty local storage, so keeping one stable site name
also keeps everyone's saves.
