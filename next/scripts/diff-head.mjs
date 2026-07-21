/**
 * Head-tag diff gate: for a sample of live-sitemap URLs, compare the SEO
 * surface (title / meta description / canonical / hreflang / robots /
 * JSON-LD types) between two origins — typically production vs staged.
 *
 * Usage:
 *   node scripts/diff-head.mjs [--sample 30] [--base https://apisix.apache.org] \
 *        [--target https://apisix-astro.staged.apache.org]
 *
 * Exit 1 if any sampled page is missing a canonical, title, or description
 * on the target, or if the canonical differs from the base's canonical.
 * Title/description text may legitimately differ (copy improvements), so
 * those are reported but not fatal unless empty.
 */

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : dflt;
};
const BASE = opt('base', 'https://apisix.apache.org');
const TARGET = opt('target', 'https://apisix-astro.staged.apache.org');
const SAMPLE = Number(opt('sample', '30'));

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'manual' });
  if (res.status !== 200) return { status: res.status, html: '' };
  return { status: 200, html: await res.text() };
}

function headOf(html) {
  const head = (html.match(/<head[\s\S]*?<\/head>/) || [''])[0];
  const pick = (re) => (head.match(re) || [, ''])[1].trim();
  return {
    title: pick(/<title[^>]*>([\s\S]*?)<\/title>/),
    description: pick(/<meta[^>]*name="description"[^>]*content="([^"]*)"/),
    canonical: pick(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/),
    robotsNoindex: /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(head),
    hreflangs: [...head.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]).sort().join(','),
    jsonldTypes: [...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1]).sort().join(','),
  };
}

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const zhXml = await (await fetch(`${BASE}/zh/sitemap.xml`)).text();
// <loc> values are XML-escaped; decode before requesting (same as check-parity).
const urls = [...(sitemapXml + zhXml).matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => new URL(m[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'")).pathname);
// Deterministic spread: take every Nth URL so all sections get sampled.
const step = Math.max(1, Math.floor(urls.length / SAMPLE));
const sample = urls.filter((_, i) => i % step === 0).slice(0, SAMPLE);

let fatal = 0;
for (const path of sample) {
  const [b, t] = await Promise.all([fetchText(BASE + path), fetchText(TARGET + path)]);
  if (t.status !== 200) { console.log(`FATAL ${path}: target HTTP ${t.status}`); fatal += 1; continue; }
  if (b.status !== 200) { console.log(`skip  ${path}: base HTTP ${b.status}`); continue; }
  const bh = headOf(b.html);
  const th = headOf(t.html);
  const problems = [];
  if (!th.title) problems.push('missing <title>');
  if (!th.description) problems.push('missing meta description');
  if (!th.canonical) problems.push('missing canonical');
  else if (bh.canonical && th.canonical !== bh.canonical) problems.push(`canonical ${th.canonical} != ${bh.canonical}`);
  if (th.robotsNoindex && !bh.robotsNoindex) problems.push('target noindex but base indexable');
  if (problems.length) { console.log(`FATAL ${path}: ${problems.join('; ')}`); fatal += 1; continue; }
  const notes = [];
  if (!bh.canonical && th.canonical) notes.push('adds canonical missing in base (improvement)');
  if (th.title !== bh.title) notes.push('title differs');
  if (th.hreflangs !== bh.hreflangs) notes.push(`hreflang [${bh.hreflangs}] -> [${th.hreflangs}]`);
  if (th.jsonldTypes !== bh.jsonldTypes) notes.push(`jsonld [${bh.jsonldTypes}] -> [${th.jsonldTypes}]`);
  console.log(`ok    ${path}${notes.length ? '  (' + notes.join('; ') + ')' : ''}`);
}
console.log(`\ndiff-head: ${sample.length} sampled, ${fatal} fatal`);
if (fatal) process.exit(1);
