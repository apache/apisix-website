# Proposal: rebuild apisix.apache.org as a fully static site

## Why

The current site is four independent Docusaurus 2.0-beta SPAs (website, doc, blog/en, blog/zh) stitched together at build time. Measured problems:

1. **Recurring 404s.** Each workspace ships its own client-side route manifest. After every deploy, browsers holding a stale manifest resolve cross-workspace navigations to the SPA 404 route. PR #2064 patched one symptom (guarded reload in a swizzled NotFound); the architecture guarantees the class of bug.
2. **Payload.** The homepage ships ~350 KB of HTML plus ~120 KB gz of framework JS (React runtime + hydration) and 36 KB gz CSS — for a content page with no interactive state. Every docs/blog page pays a similar JS tax.
3. **Frozen toolchain.** Node 16 (EOL), Docusaurus 2.0.0-beta.6/beta.8 with patch-package patches, four `node_modules` trees, tens-of-minutes CI builds with four cache layers.

The site is *already* served as static files from the `asf-site` branch by ASF httpd. Only the generator — and what it makes browsers download — needs to change.

## What

Regenerate the identical URL space with [Astro](https://astro.build) in static output mode:

- **Zero client JS.** Pages are plain HTML + one shared 2.7 KB gz stylesheet. (Single exception: `/edit/`, a redirector that inherently needs 3 lines of inline JS. Algolia DocSearch and the kapa.ai widget can be re-added as progressive enhancements if wanted — they are additive `<script>` tags, not framework requirements.)
- **Same content sources.** Blog/learning-center/articles markdown lives in the repo as today; project docs are synced from apache/apisix and the six sub-project repos exactly as `sync-docs.js` does now (`scripts/sync-content.mjs` replaces it, ~120 lines).
- **Same deploy.** `dist/` → `asf-site` branch → ASF httpd. `.htaccess` redirects, staging profile, CI trigger cadence: all unchanged.
- **Same URLs.** Verified mechanically, not by hand — see below.

## Evidence (prototype in this repo)

| Metric | Result |
|---|---|
| URL parity | **1294/1294** URLs from the live `sitemap.xml` + `zh/sitemap.xml` exist in `dist/` (exact, case-sensitive). 0 missing. |
| Pages built | 1368 (654 EN + 640 ZH sitemap URLs + versionless extras) in **~18 s** on a laptop |
| Homepage transfer | 2.6 KB gz HTML + 2.7 KB gz CSS ≈ **5.3 KB** vs ~200 KB+ today (≈40×) |
| Docs page transfer | 7.3 KB gz HTML + shared CSS |
| Client JS | 0 bytes on all indexable pages |
| SEO surface | per-page canonical, `hreflang` en/zh-CN/x-default, meta description, OG/Twitter, JSON-LD (WebSite/Organization + BlogPosting/TechArticle/FAQPage), robots.txt, split EN/ZH sitemaps — same shape as today |

URL rules that had to be reverse-engineered and are now encoded in `src/lib/content.ts` (each verified against the live sitemap):

- Blog: `/blog/YYYY/MM/DD/<filename-as-is>/` — case and spaces preserved (`APISIX-integrates-with-Coraza`, `bi-weekly report`); frontmatter `slug` containing `/` replaces the whole path.
- Docs: frontmatter `slug` (root- or dir-relative) > frontmatter `id` > file path; case preserved (`/docs/apisix/FAQ/`).
- Docs `general`: `id` overrides are live (`security-guide.md` → `/docs/general/security/`).
- Sub-project docs must sync from the **latest release tag**, not master (ingress-controller master has a restructured tree).

## What is intentionally NOT in the prototype

Mechanical, not architectural, work for the real migration:

1. **Versioned docs** (`/docs/apisix/3.10/…` × 8 versions × 2 locales, ~3 000 pages). Same pipeline parameterized by version — the current `config/apisix-versions.js` list carries over.
2. **Pixel-faithful visual port.** The prototype approximates the current design (brand palette, layout); the real PR should port section-by-section styling and the full homepage art.
3. **Search.** Recommend keeping Algolia DocSearch as an additive script (crawler-based, no build coupling), or Pagefind for a fully self-hosted option.
4. **Team/downloads data generators** (`generate-repos-info` GitHub API calls) — build-time JSON, framework-agnostic, ports as-is.

## Rollout plan: subtree waves, not a big-bang flip

**Why not traffic-percentage canarying:** apisix.apache.org is served by ASF
httpd straight from the `asf-site` branch. There is no load balancer, edge, or
reverse proxy under project control (and ASF policy precludes fronting the
domain with third-party infrastructure), so a "5% of requests" split has
nowhere to live. Client-side random redirects would trade SEO stability for a
worse signal.

**The natural canary unit is a URL subtree.** Both generators emit plain
directory trees, and today's `asf-site` is *already* four independent builds
stitched together by path. Migrating prefix-by-prefix just moves the stitch
line. CI runs both toolchains and assembles the final tree from a prefix
allowlist (see [`ci/deploy-example.yml`](ci/deploy-example.yml)); each wave is
one commit, and rollback = removing the prefix from the allowlist.

| Wave | Scope | Rationale |
|---|---|---|
| 0 | Full new site → `asf-staging` (`apisix.staged.apache.org`; `preview/*` autostage is already in `.asf.yaml`) | Community reviews real URLs without touching production; run link-checker + Lighthouse |
| 1 | `/learning-center/` + `/articles/` + `/events/archive/` | Content lives in this repo, few URLs, small long-tail traffic — smallest blast radius |
| 2 | `/blog/` (EN+ZH, ~650 URLs) | Most URLs but most mechanical; removes the largest chunk of build time |
| 3 | `/docs/` (docs framework swap) | Version trees + `.htaccess` redirects are the most complex surface; do it with two waves of experience |
| 4 | Homepage + marketing pages (`/`, `/ai-gateway/`, …) | Most visible, least SEO long-tail risk; ship after visual polish |

**Per-wave gates and measurement.** Before each wave: the content lint
(`scripts/lint-content.mjs`) fails the build if upstream markdown starts using
a Docusaurus feature the static pipeline doesn't handle (new components,
mermaid, unknown admonitions, unrewritten links); the parity checker asserts
the subtree's URL set matches the live sitemap exactly; plus an HTML-level
diff of title/canonical/hreflang/JSON-LD against production. After
each wave: watch that URL prefix as its own cohort in Google Search Console
(index coverage, clicks/impressions) and CrUX (LCP/CLS) for ~two weeks — the
not-yet-migrated subtrees are the control group. SEO risk settles per-URL, so
a subtree cohort is a cleaner experiment than a request-percentage split.

**Safety rails.** The Docusaurus build stays in CI (unused prefixes only)
until the final wave has been stable for a month; only then delete the four
workspaces. Known cosmetic caveat: during the transition old and new sections
have slightly different header/footer chrome — no worse than today, where the
four workspaces already ship separately-copied navbars.

Because URLs, sitemaps, and head tags stay byte-compatible throughout, no
wave triggers a re-indexing event — crawlers see the same pages, just ~40×
lighter.
