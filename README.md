# Guff's Gauntlet — installable PWA (Level I)

A self-contained Progressive Web App. The whole game lives in `index.html` (all art
and fonts embedded); the other files just make it installable and offline-capable.

```
index.html                 the game (open this directly, or install it)
manifest.webmanifest       app name, colours, icons
sw.js                      service worker (offline cache + installability)
netlify.toml               static-site config for continuous deploy
icons/                     app icons (192, 512, maskable-512, apple-touch-180, favicon-64)
package.json + tests/      the jsdom regression suite (dev only; not served)
README.md                  this file
```

## Just want to play?

Double-click `index.html` — it runs as-is in any modern browser. (From a `file://`
path the service worker stays off; that's expected and the game is fully playable
without it.)

## Deploy (recommended: continuous deploy — push = live)

The repo ships a `netlify.toml`, so hosting is a **one-time connect, then automatic**:

1. **One-time (Netlify dashboard):** *Add new site → Import an existing project →*
   pick this GitHub repo. Build command **empty**, publish directory **`/`**. Deploy.
2. **After that:** every `git push` to `main` redeploys the **same** site by itself —
   no dragging, and the URL never changes, so installed players auto-update and keep
   their saves. (Cloudflare Pages / Vercel / GitHub Pages work the same way.)

**Fallback (no CD connected yet):** drag this folder onto your existing site's
**Deploys** tab (same site → same URL).
> ⚠️ Don't use https://app.netlify.com/drop to update — it mints a **new random URL
> every time**, orphaning players' saves. Drop is for one-off throwaways only.

**Test locally in ~10 seconds** — from inside this folder:

```
python3 -m http.server 8000    # then open http://localhost:8000/ in Chrome/Edge
```

**Install:** Desktop Chrome/Edge → install icon in the address bar · Android Chrome →
*Add to Home screen* · iOS Safari → Share → *Add to Home Screen*. It then opens in its
own window, works offline, and uses the gauntlet icon.

## Updating a build — the SW-bump checklist

Saved profiles, card library, and gold live in browser local storage and survive
updates **as long as the origin (URL) stays the same** — a stable site name keeps
everyone's saves.

Every shipped change:
1. Edit the files (usually `index.html`).
2. **Bump the cache name in `sw.js`.** This build ships `gg-cache-v86`; increment it
   (`v55`, `v56`, …). The SW deletes the old cache on activate, so installed players pick up
   the new build on their next online launch (network-first navigation + fresh cache).
3. **Update this line to match** — the regression suite fails if the README version and
   `sw.js` version drift apart (`npm test` → `sw-version` check).
4. Push to `main` (CD deploys automatically), or drag-drop to the same site (fallback).

## Developing — the regression suite

```
npm install      # jsdom (dev only; node_modules is git-ignored)
npm test         # syntax gate + id-set guard + jsdom drivers + full-descent run
```

`npm test` runs entirely **offline** (no network). It boots the real `index.html` in
jsdom, drives turn cycles / full descents, and asserts per-system behaviour. See
`tests/README.md` for how to add a driver when you build a new feature (ADD one under
`tests/`, don't rebuild the harness).
