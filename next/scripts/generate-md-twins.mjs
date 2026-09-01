/**
 * Post-build agent-readable surfaces.
 *
 * For every content page the build produced, emit a Markdown twin next to the
 * HTML (`<page>/index.md`) and index them all in `/llms.txt`. Agents that read
 * docs — and the crawlers behind them — get clean prose instead of parsing a
 * page of markup.
 *
 * The twin is the *synced source* markdown, with frontmatter replaced by a
 * title heading and a link back to the canonical HTML. Source markdown lives
 * in content/ (written by sync-content.mjs), so this runs after `astro build`
 * and needs no MDX evaluation.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);
const distFlag = args.indexOf('--dist');
const dist = distFlag !== -1 ? path.resolve(args[distFlag + 1]) : path.join(root, 'dist');
const content = path.join(root, 'content');
const SITE = 'https://apisix.apache.org';

/**
 * content/ subdir -> every URL prefix its pages are published under. Several
 * collections have one source that renders at both locales (the zh site falls
 * back to the English text where no translation exists), so a source file can
 * legitimately map to two URLs.
 */
const COLLECTIONS = [
  ['blog-en', ['/blog']],
  ['blog-zh', ['/zh/blog']],
  // Learning-center articles are English-only. The Chinese landing page links
  // to these URLs directly; retired /zh/learning-center/<slug>/ pages redirect.
  ['learning-center', ['/learning-center']],
  ['articles', ['/articles', '/zh/articles']],
  ['integrations-en', ['/integrations']],
  ['integrations-zh', ['/zh/integrations']],
  ['cookbooks-en', ['/cookbooks']],
  ['cookbooks-zh', ['/zh/cookbooks']],
  ['docs-general', ['/docs/general', '/zh/docs/general']],
  // The zh APISIX docs fall back to the English source where no translation
  // exists, so the English collection is also offered the zh prefix. The zh
  // collection is processed after and wins for pages that are translated —
  // both the file and, because the index is keyed by URL, the index entry.
  ['docs-apisix-en', ['/docs/apisix', '/zh/docs/apisix']],
  ['docs-apisix-zh', ['/zh/docs/apisix']],
];
for (const p of ['ingress-controller', 'helm-chart', 'docker', 'java-plugin-runner', 'go-plugin-runner', 'python-plugin-runner']) {
  COLLECTIONS.push([`docs-${p}-en`, [`/docs/${p}`, `/zh/docs/${p}`]]);
  COLLECTIONS.push([`docs-${p}-zh`, [`/zh/docs/${p}`]]);
}

const walk = (d) => (fs.existsSync(d)
  ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : (e.name.endsWith('.md') ? [p] : []);
  })
  : []);

/** Strip frontmatter, returning it parsed shallowly plus the body. */
function splitFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { fm: {}, body: src };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return { fm, body: src.slice(m[0].length) };
}

/**
 * Map a source file to the URL its page was published at, by finding the built
 * HTML. Slug/id frontmatter overrides and date-based blog paths mean the file
 * path alone is not authoritative, so candidates are checked against dist/.
 */
function resolveUrl(file, collectionDir, urlPrefix) {
  const rel = path.relative(path.join(content, collectionDir), file)
    .replace(/\.md$/, '')
    .split(path.sep).join('/');
  const { fm } = splitFrontmatter(fs.readFileSync(file, 'utf8'));
  const candidates = [];

  if (collectionDir.startsWith('blog-')) {
    // Blog: /blog/YYYY/MM/DD/<name>/, or a slug override replacing the path.
    const m = rel.match(/^(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
    const slug = (fm.slug || '').replace(/^\/+/, '');
    if (slug && slug.includes('/')) candidates.push(`${urlPrefix}/${slug}/`);
    if (m) candidates.push(`${urlPrefix}/${m[1]}/${m[2]}/${m[3]}/${slug || m[4]}/`);
  } else {
    const id = (fm.slug || fm.id || '').replace(/^\/+/, '');
    const dir = rel.includes('/') ? `${rel.slice(0, rel.lastIndexOf('/'))}/` : '';
    if (id) candidates.push(`${urlPrefix}/${id.includes('/') ? id : dir + id}/`);
    candidates.push(`${urlPrefix}/${rel}/`);
  }

  for (const url of candidates) {
    if (fs.existsSync(path.join(dist, url, 'index.html'))) return url;
  }
  return null;
}

// Keyed by URL: a page can be reached by more than one collection (the zh docs
// fall back to the English source), and the last write wins for the file, so
// the index must record the same winner rather than one entry per attempt.
const written = new Map();
let skipped = 0;

for (const [dir, urlPrefixes] of COLLECTIONS) {
  for (const file of walk(path.join(content, dir))) {
    const src = fs.readFileSync(file, 'utf8');
    const { fm, body } = splitFrontmatter(src);
    const title = fm.title || path.basename(file, '.md');
    let matched = false;

    for (const urlPrefix of urlPrefixes) {
      const url = resolveUrl(file, dir, urlPrefix);
      if (!url) continue;
      matched = true;
      // Upstream files open with the ASF licence header as an HTML comment;
      // it is legal boilerplate, not content, and only wastes an agent's
      // context window. The licence still ships with the source repo.
      const prose = body.replace(/^\s*<!--[\s\S]*?-->\s*/, '').trim();
      const doc = [
        `# ${title}`,
        '',
        fm.description ? `> ${fm.description}` : null,
        fm.description ? '' : null,
        `Source: ${SITE}${url}`,
        '',
        prose,
        '',
      ].filter((l) => l !== null).join('\n');
      fs.writeFileSync(path.join(dist, url, 'index.md'), doc);
      written.set(url, { url, title, description: fm.description || '' });
    }
    if (!matched) skipped += 1;
  }
}

// /llms.txt — the index agents fetch first.
const pages = [...written.values()].sort((a, b) => a.url.localeCompare(b.url));
const section = (label, items) => (items.length
  ? [`## ${label}`, '', ...items.map((p) => `- [${p.title}](${SITE}${p.url}index.md)${p.description ? ` — ${p.description}` : ''}`), '']
  : []);

const isZh = (p) => p.url.startsWith('/zh/');
const en = pages.filter((p) => !isZh(p));
const zh = pages.filter(isZh);
// Match on the section prefix, not anywhere in the URL: /docs/general/blog/ is
// a docs page, and a substring test would file it under both docs and blog.
const group = (items, frag) => {
  const prefix = frag === '/docs/' ? /^(\/zh)?\/docs\// : new RegExp(`^(\\/zh)?${frag.replace(/\//g, '\\/')}`);
  return items.filter((p) => prefix.test(p.url));
};

/**
 * The site ships a hand-curated llms.txt (website/static/llms.txt): ~48 entries
 * grouped by topic, each with a sentence on what it is for. That editorial
 * judgement is worth more to an agent than a flat list, so it stays at the top
 * — trimmed of its own heading — and the generated full index follows it.
 */
const curatedFile = path.join(root, '..', 'website', 'static', 'llms.txt');
const curated = fs.existsSync(curatedFile)
  ? fs.readFileSync(curatedFile, 'utf8')
    .replace(/^#[^\n]*\n+/, '')            // drop its H1; ours is the page title
    .replace(/^>.*\n+/m, '')               // and its blurb; ours carries one
    .trim()
  : '';

const llms = [
  '# Apache APISIX',
  '',
  '> Apache APISIX is a dynamic, real-time, high-performance API gateway and AI gateway.',
  '',
  ...(curated ? [curated, ''] : []),
  ...(curated ? ['# Full index', ''] : []),
  'Every content-detail page in the full index below is available as Markdown — append `index.md` to its page URL.',
  '',
  ...section('Documentation', group(en, '/docs/')),
  ...section('Learning center', group(en, '/learning-center/')),
  ...section('Integrations', group(en, '/integrations/')),
  ...section('Cookbooks', group(en, '/cookbooks/')),
  ...section('Blog', group(en, '/blog/')),
  ...section('Articles', group(en, '/articles/')),
  ...section('中文文档', group(zh, '/docs/')),
  ...section('中文集成', group(zh, '/integrations/')),
  ...section('中文 Cookbook', group(zh, '/cookbooks/')),
  ...section('中文博客', group(zh, '/blog/')),
  ...section('中文技术文章', group(zh, '/articles/')),
].join('\n');

fs.writeFileSync(path.join(dist, 'llms.txt'), `${llms}\n`);

console.log(`markdown twins: ${written.size} written, ${skipped} source files had no built page`);
console.log(`llms.txt: ${en.length} en + ${zh.length} zh pages indexed`);

// Every content-detail page must have a twin, and every twin must be indexed.
// Section landing pages are intentionally excluded from this promise.
const llmsText = fs.readFileSync(path.join(dist, 'llms.txt'), 'utf8');
const indexedUrls = [...llmsText.matchAll(/\]\(https:\/\/apisix\.apache\.org([^)]*?)index\.md\)/g)].map((m) => m[1]);
const indexed = new Set(indexedUrls);
if (indexedUrls.length !== indexed.size) {
  const seen = new Set();
  const dupes = [...new Set(indexedUrls.filter((u) => (seen.has(u) ? true : (seen.add(u), false))))];
  console.error(`\n/llms.txt lists ${indexedUrls.length - indexed.size} duplicate entries:`);
  for (const u of dupes.slice(0, 10)) console.error(`  ${u}`);
  process.exit(1);
}
const CONTENT_PREFIXES = ['/blog/', '/learning-center/', '/articles/', '/integrations/', '/cookbooks/', '/docs/',
  '/zh/blog/', '/zh/learning-center/', '/zh/articles/', '/zh/integrations/', '/zh/cookbooks/', '/zh/docs/'];
// Section landing pages (/blog/, /docs/, …) are component-rendered indexes
// with no markdown source, as are listing, tag, and archive pages.
const SECTION_INDEX = new Set([...CONTENT_PREFIXES,
  '/docs/general/events/', '/zh/docs/general/events/']);
const isContentPage = (url) => CONTENT_PREFIXES.some((p) => url.startsWith(p))
  && !SECTION_INDEX.has(url)
  && !/\/(page|tags|archive)\//.test(url) && !/\/(tags|archive)\/$/.test(url);

const missing = [];
(function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { scan(p); continue; }
    if (e.name !== 'index.html') continue;
    const url = `/${path.relative(dist, dir).split(path.sep).join('/')}/`;
    if (isContentPage(url) && !indexed.has(url)) missing.push(url);
  }
})(dist);

if (missing.length) {
  console.error(`\n${missing.length} content pages have no Markdown twin:`);
  for (const u of missing.slice(0, 20)) console.error(`  ${u}`);
  if (missing.length > 20) console.error(`  … and ${missing.length - 20} more`);
  process.exit(1);
}
console.log('parity: every content page has a twin, and every twin is indexed');
