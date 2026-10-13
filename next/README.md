# apisix-website-astro

Prototype rebuild of [apisix.apache.org](https://apisix.apache.org) as a **fully static site** (Astro), preserving every public URL. See [MIGRATION.md](MIGRATION.md) for the full proposal and measurements.

## TL;DR

| | Current (Docusaurus ×4 workspaces) | This prototype (Astro) |
|---|---|---|
| Homepage first-load transfer | ~350 KB HTML + ~120 KB gz JS + 36 KB gz CSS | **2.6 KB gz HTML + 2.7 KB gz CSS, 0 JS** |
| Client-side JS | React SPA per workspace (stale-manifest 404s) | No framework hydration; production analytics, docs search and edit-page snippets |
| Build | Node 16, 4 Docusaurus builds, tens of minutes | Node 22, **1368 pages in ~18 s** |
| URL parity vs live sitemaps | — | **1294/1294, zero missing** |

The transfer measurements above describe the initial prototype, before production analytics was restored.

## Production analytics

The shared layout includes Google Analytics 4 with Measurement ID `G-WQLBQL6GY3`.
It loads only when the browser hostname is exactly `apisix.apache.org`; local and Netlify preview visits do not load the Google tag.
Analytics cookies are scoped to `apisix.apache.org`, rather than the shared `apache.org` domain.

Run `node --test scripts/analytics.test.mjs` to verify production initialization and preview exclusion without a full site build.
After deployment, verify the production hostname in GA4 Realtime, then compare the standard report with the daily collector once data has processed.
Restoring the tag cannot recover visits that were never collected.

## Layout

- `scripts/sync-content.mjs` — pulls markdown from `.sync/` checkouts (apisix-website content + 7 upstream doc repos) into `content/`, applying the same normalizations as the current `sync-docs.js` plus static-friendly rewrites (MDX imports stripped, `<Tabs>` flattened, admonition titles, image/link rewrites).
- `content/` — generated; never edit by hand.
- `src/lib/content.ts` — collection loaders; encodes the Docusaurus URL rules verified against the live sitemaps (blog path dates, frontmatter `slug`/`id` precedence, case preservation).
- `src/pages/` — routes; `/zh/**` mirrors are thin wrappers passing `locale="zh"`.
- `scripts/generate-sitemaps.mjs` — emits `sitemap.xml` + `zh/sitemap.xml` post-build.
- `scripts/check-parity.mjs` — asserts every URL in the live sitemaps exists in `dist/` (exact, case-sensitive string comparison).
- `public/img/architecture.svg` — the homepage architecture diagram, hand-authored on a 1200x738 grid. Edit the file directly; boxes and the wires landing on them share one coordinate space.

## Build

```bash
# Node >= 22.12
node scripts/sync-content.mjs   # requires .sync/ checkouts (see MIGRATION.md)
npx astro build                 # -> dist/
node scripts/generate-sitemaps.mjs
node scripts/check-parity.mjs <live-en-urls.txt> <live-zh-urls.txt>
```

Deploy target is unchanged: push `dist/` to the `asf-site` branch.
