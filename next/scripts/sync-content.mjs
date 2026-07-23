/**
 * Content sync: copies markdown from the existing apisix-website repo and the
 * upstream apache/apisix docs checkout into ./content, applying the same
 * normalizations the current sync-docs.js does, plus static-friendly rewrites:
 *   - strip MDX `import` lines
 *   - flatten <Tabs>/<TabItem> into sequential sections
 *   - `:::type Title` -> `:::type[Title]` (remark-directive label syntax)
 *   - relative image paths -> raw.githubusercontent.com
 *   - relative .md links -> absolute site URLs
 *
 * In the real migration this script replaces scripts/sync-docs.js and runs in
 * CI before `astro build`, for every project/version in config/apisix-versions.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// Clean export of apache/apisix-website (populated via `git archive`),
// decoupled from any mutable working checkout. In CI, WEBSITE_REPO points at
// the checked-out repo root itself.
const WEBSITE_REPO = process.env.WEBSITE_REPO || path.join(root, '.sync/website');
const OUT = path.join(root, 'content');

const stats = { copied: 0, tabsFlattened: 0, importsStripped: 0, codeTitles: 0, canonicals: 0 };

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

function flattenTabs(src) {
  if (!/<Tabs/i.test(src)) return src;
  stats.tabsFlattened += 1;
  return src
    .replace(/<TabItem[^>]*label=["']([^"']+)["'][^>]*>/g, '\n**$1**\n')
    .replace(/<TabItem[^>]*value=["']([^"']+)["'][^>]*>/g, '\n**$1**\n')
    .replace(/<\/?Tabs[^>]*>/g, '')
    .replace(/<\/TabItem>/g, '');
}

function transform(src, { docBase, blogBase, ghProject, ghRef = 'master' } = {}) {
  let out = src;
  let canonicalUrl = null;
  // MDX imports cannot exist in plain markdown.
  out = out.replace(/^import\s+.*(from\s+.*)?;?\s*$/gm, () => {
    stats.importsStripped += 1;
    return '';
  });
  out = flattenTabs(out);
  // Upstream docs embed MDX <head> blocks carrying a cross-site canonical
  // (e.g. plugin pages -> docs.api7.ai/hub/*). Docusaurus hoists them into
  // the page head; we lift the URL into frontmatter for the layout to emit.
  out = out.replace(
    /\n<head>\s*\n\s*<link rel="canonical" href="([^"]+)"\s*\/?>\s*\n<\/head>\s*\n/,
    (_m, url) => {
      stats.canonicals += 1;
      canonicalUrl = url;
      return '\n';
    },
  );
  if (canonicalUrl) {
    out = out.replace(/^---\n/, `---\ncanonical: "${canonicalUrl}"\n`);
  }
  // Docusaurus admonition custom titles -> directive labels.
  out = out.replace(/^:::(\w+)[ \t]+(.+)$/gm, ':::$1[$2]');
  // Docusaurus code-block titles -> a static caption div above the fence.
  // Covers all observed meta spellings:
  //   ```yaml title="x"   |   ``` yaml title="x"   |   ```shell {title="x"}
  // Only top-level fences; indented ones (inside lists) keep their meta,
  // which the highlighter ignores harmlessly.
  out = out.replace(
    /^```[ \t]*(\w[\w-]*)?[ \t]+(?:title="([^"]+)"|\{title="([^"]+)"\})[ \t]*(.*)$/gm,
    (_m, lang, t1, t2, rest) => {
      stats.codeTitles += 1;
      return `<div class="code-title">${t1 ?? t2}</div>\n\n\`\`\`${lang ?? ''}${rest ? ` ${rest}` : ''}`;
    },
  );
  if (ghProject) {
    // ../assets/... and ../../docs/assets/... image refs -> raw GitHub (same
    // origin the current site ultimately serves many of these from).
    out = out.replace(/\((\.\.\/)+(?:docs\/)?assets\/([^)\s]+)(\s+"[^"]*")?\)/g,
      `(https://raw.githubusercontent.com/apache/${ghProject}/${ghRef}/docs/assets/$2$3)`);
  }
  if (docBase) {
    // Relative .md links -> absolute pretty URLs (mirrors current site behavior).
    out = out.replace(/\]\((\.{1,2}\/)?([\w\-./]+)\.md(#[^)]*)?\)/g, (_m, _dot, p, hash) => {
      const clean = p.replace(/^\.\//, '');
      return `](${docBase}/${clean}/${hash || ''})`;
    });
  }
  if (blogBase) {
    // Blog cross-references: Docusaurus resolves `./YYYY-MM-DD-name.md` by
    // post id to /blog/YYYY/MM/DD/name/.
    out = out.replace(/\]\((?:\.\/)?(\d{4})-(\d{2})-(\d{2})-([^)#\s]+?)\.md(#[^)]*)?\)/g,
      (_m, y, mo, d, name, hash) => `](${blogBase}/${y}/${mo}/${d}/${name}/${hash || ''})`);
  }
  return out;
}

function copyTree(srcDir, outDir, opts = {}, filter = () => true) {
  for (const f of walk(srcDir)) {
    if (!f.endsWith('.md') || !filter(f)) continue;
    const rel = path.relative(srcDir, f);
    const dest = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, transform(fs.readFileSync(f, 'utf8'), opts));
    stats.copied += 1;
  }
}

fs.rmSync(OUT, { recursive: true, force: true });

// Blog (both locales), learning center, articles, general docs — all already
// live as markdown in the apisix-website repo.
copyTree(path.join(WEBSITE_REPO, 'blog/en/blog'), path.join(OUT, 'blog-en'), { blogBase: '/blog' });
copyTree(path.join(WEBSITE_REPO, 'blog/zh/blog'), path.join(OUT, 'blog-zh'), { blogBase: '/zh/blog' });
copyTree(path.join(WEBSITE_REPO, 'website/learning-center'), path.join(OUT, 'learning-center'));
copyTree(path.join(WEBSITE_REPO, 'website/articles'), path.join(OUT, 'articles'));
copyTree(path.join(WEBSITE_REPO, 'website/docs/general'), path.join(OUT, 'docs-general'),
  { docBase: '/docs/general', ghProject: 'apisix-website' });

// Upstream project docs (current version), en + zh where present.
// key = URL segment under /docs/, repo = apache/<repo> checkout under .sync/.
const PROJECTS = [
  { key: 'apisix', repo: 'apisix' },
  { key: 'ingress-controller', repo: 'apisix-ingress-controller' },
  { key: 'helm-chart', repo: 'apisix-helm-chart' },
  { key: 'docker', repo: 'apisix-docker' },
  { key: 'java-plugin-runner', repo: 'apisix-java-plugin-runner' },
  { key: 'go-plugin-runner', repo: 'apisix-go-plugin-runner' },
  { key: 'python-plugin-runner', repo: 'apisix-python-plugin-runner' },
];

for (const { key, repo } of PROJECTS) {
  const docsRoot = path.join(root, '.sync', repo, 'docs');
  for (const loc of ['en', 'zh']) {
    const src = path.join(docsRoot, loc, 'latest');
    if (!fs.existsSync(src)) continue;
    const outDir = path.join(OUT, `docs-${key}-${loc}`);
    copyTree(src, outDir, {
      docBase: `${loc === 'zh' ? '/zh' : ''}/docs/${key}`,
      ghProject: repo,
    });
    const cfg = path.join(src, 'config.json');
    if (fs.existsSync(cfg)) fs.copyFileSync(cfg, path.join(outDir, 'config.json'));
  }
}

console.log('sync-content done:', JSON.stringify(stats));
