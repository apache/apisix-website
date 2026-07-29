/**
 * Post-build sitemap generation. Walks dist/ and emits:
 *   dist/sitemap.xml     — every EN URL
 *   dist/zh/sitemap.xml  — every /zh/ URL
 * Mirrors the current site's two-sitemap layout, priorities, and changefreq.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);
const distFlag = args.indexOf('--dist');
const dist = distFlag !== -1 ? path.resolve(args[distFlag + 1]) : path.join(root, 'dist');
const SITE = 'https://apisix.apache.org';
const today = new Date().toISOString().slice(0, 10);
const excludePatterns = [
  /^\/404\/$/,
  /^\/(?:zh\/)?docs\/[\w-]+\/(?:[\w-]+-)?\d+\.\d+(?:\.\d+)?\//,
  /^\/(?:zh\/)?docs\/[\w./-]+\/tags\//,
  /^\/(?:zh\/)?docs\/[\w-]+\/next\//,
  /^\/(?:zh\/)?search\/?$/,
  /^\/(?:zh\/)?blog\/(?:tags|page|archive)\//,
  /^\/(?:zh\/)?learning-center\/(?:tags|page|archive)\//,
  /^\/(?:zh\/)?(?:articles|events)\/(?:page|archive)\//,
];

function pagesUnder(dir) {
  const out = [];
  (function walk(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') {
        out.push(`/${path.relative(dist, path.dirname(p)).split(path.sep).join('/')}/`.replace('/./', '/'));
      }
    });
  }(dir));
  return out.map((u) => (u === '//' ? '/' : u)).sort();
}

const all = pagesUnder(dist).filter((u) => !excludePatterns.some((pattern) => pattern.test(u)));
const zh = all.filter((u) => u === '/zh/' || u.startsWith('/zh/'));
const en = all.filter((u) => !zh.includes(u));

function getPriority(url) {
  if (/^\/(?:zh\/)?$/.test(url)) return '1.0';
  if (/\/(?:ai-gateway|plugins|downloads|docs|learning-center)\/$/.test(url)) return '0.8';
  if (url.includes('/learning-center/')) return '0.8';
  if (/\/blog\/\d{4}\//.test(url)) return '0.6';
  if (url.includes('/docs/')) return '0.7';
  return '0.5';
}

function getChangefreq(url) {
  if (/^\/(?:zh\/)?$/.test(url)) return 'weekly';
  if (/\/blog\/\d{4}\//.test(url)) return 'monthly';
  if (url.includes('/docs/') || url.includes('/learning-center/')) return 'monthly';
  return 'weekly';
}

function sitemapLoc(url) {
  return encodeURI(url)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function render(urls) {
  const items = urls.map((u) => `<url><loc>${sitemapLoc(`${SITE}${u}`)}</loc><changefreq>${getChangefreq(u)}</changefreq><priority>${getPriority(u)}</priority><lastmod>${today}</lastmod></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>\n`;
}

fs.writeFileSync(path.join(dist, 'sitemap.xml'), render(en));
fs.mkdirSync(path.join(dist, 'zh'), { recursive: true });
fs.writeFileSync(path.join(dist, 'zh/sitemap.xml'), render(zh));
console.log(`sitemaps written: en=${en.length} urls, zh=${zh.length} urls`);
