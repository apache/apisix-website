# apisix-website-astro

Prototype rebuild of [apisix.apache.org](https://apisix.apache.org) as a **fully static site** (Astro), preserving every public URL. See [MIGRATION.md](MIGRATION.md) for the full proposal and measurements.

## TL;DR

| | Current (Docusaurus ×4 workspaces) | This prototype (Astro) |
|---|---|---|
| Homepage first-load transfer | ~350 KB HTML + ~120 KB gz JS + 36 KB gz CSS | **2.6 KB gz HTML + 2.7 KB gz CSS, 0 JS** |
| Client-side JS | React SPA per workspace (stale-manifest 404s) | **None** (one inline snippet on `/edit/` only) |
| Build | Node 16, 4 Docusaurus builds, tens of minutes | Node 22, **1368 pages in ~18 s** |
| URL parity vs live sitemaps | — | **1294/1294, zero missing** |

## Layout

- `scripts/sync-content.mjs` — pulls markdown from `.sync/` checkouts (apisix-website content + 7 upstream doc repos) into `content/`, applying the same normalizations as the current `sync-docs.js` plus static-friendly rewrites (MDX imports stripped, `<Tabs>` flattened, admonition titles, image/link rewrites).
- `content/` — generated; never edit by hand.
- `src/lib/content.ts` — collection loaders; encodes the Docusaurus URL rules verified against the live sitemaps (blog path dates, frontmatter `slug`/`id` precedence, case preservation).
- `src/pages/` — routes; `/zh/**` mirrors are thin wrappers passing `locale="zh"`.
- `scripts/generate-sitemaps.mjs` — emits `sitemap.xml` + `zh/sitemap.xml` post-build.
- `scripts/check-parity.mjs` — asserts every URL in the live sitemaps exists in `dist/` (exact, case-sensitive string comparison).

## Build

```bash
# Node >= 22.12
node scripts/sync-content.mjs   # requires .sync/ checkouts (see MIGRATION.md)
npx astro build                 # -> dist/
node scripts/generate-sitemaps.mjs
node scripts/check-parity.mjs <live-en-urls.txt> <live-zh-urls.txt>
```

Deploy target is unchanged: push `dist/` to the `asf-site` branch.
