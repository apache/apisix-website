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
  ['learning-center', ['/learning-center', '/zh/learning-center']],
  ['articles', ['/articles', '/zh/articles']],
  ['docs-general', ['/docs/general', '/zh/docs/general']],
  // The zh APISIX docs fall back to the English source where no translation
  // exists, so the English collection must also be offered the zh prefix —
  // resolveUrl only writes where a page was actually built, and the zh
  // collection is processed after, overwriting the fallback where a real
  // translation exists.
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

const written = [];
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
      written.push({ url, title, description: fm.description || '' });
    }
    if (!matched) skipped += 1;
  }
}

// /llms.txt — the index agents fetch first.
written.sort((a, b) => a.url.localeCompare(b.url));
const section = (label, items) => (items.length
  ? [`## ${label}`, '', ...items.map((p) => `- [${p.title}](${SITE}${p.url}index.md)${p.description ? ` — ${p.description}` : ''}`), '']
  : []);

const isZh = (p) => p.url.startsWith('/zh/');
const en = written.filter((p) => !isZh(p));
const zh = written.filter(isZh);
const group = (items, frag) => items.filter((p) => p.url.includes(frag));

const llms = [
  '# Apache APISIX',
  '',
  '> Apache APISIX is a dynamic, real-time, high-performance API gateway and AI gateway.',
  '',
  'Every page below is available as Markdown — append `index.md` to any page URL.',
  '',
  ...section('Documentation', group(en, '/docs/')),
  ...section('Learning center', group(en, '/learning-center/')),
  ...section('Blog', group(en, '/blog/')),
  ...section('Articles', group(en, '/articles/')),
  ...section('中文文档', group(zh, '/docs/')),
  ...section('中文学习中心', group(zh, '/learning-center/')),
  ...section('中文博客', group(zh, '/blog/')),
  ...section('中文技术文章', group(zh, '/articles/')),
].join('\n');

fs.writeFileSync(path.join(dist, 'llms.txt'), `${llms}\n`);

console.log(`markdown twins: ${written.length} written, ${skipped} source files had no built page`);
console.log(`llms.txt: ${en.length} en + ${zh.length} zh pages indexed`);

// Every content page must have a twin, and every twin must be indexed —
// otherwise the "append index.md to any page URL" promise is a lie for some
// subset of pages. Fail the build rather than shipping a partial surface.
const indexed = new Set(written.map((p) => p.url));
const CONTENT_PREFIXES = ['/blog/', '/learning-center/', '/articles/', '/docs/',
  '/zh/blog/', '/zh/learning-center/', '/zh/articles/', '/zh/docs/'];
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
