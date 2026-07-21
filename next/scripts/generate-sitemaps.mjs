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

function pagesUnder(dir) {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') {
        out.push(`/${path.relative(dist, path.dirname(p)).split(path.sep).join('/')}/`.replace('/./', '/'));
      }
    }
  })(dir);
  return out.map((u) => (u === '//' ? '/' : u)).sort();
}

const all = pagesUnder(dist).filter((u) => u !== '/404/');
const zh = all.filter((u) => u === '/zh/' || u.startsWith('/zh/'));
const en = all.filter((u) => !zh.includes(u));

function meta(url) {
  if (url === '/' ) return { priority: '1.0', changefreq: 'weekly' };
  if (url.includes('/docs/') || url.includes('/learning-center/')) return { priority: '0.7', changefreq: 'monthly' };
  return { priority: '0.5', changefreq: 'weekly' };
}

function render(urls) {
  const items = urls.map((u) => {
    const m = meta(u);
    return `<url><loc>${SITE}${u}</loc><changefreq>${m.changefreq}</changefreq><priority>${m.priority}</priority><lastmod>${today}</lastmod></url>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>\n`;
}

fs.writeFileSync(path.join(dist, 'sitemap.xml'), render(en));
fs.mkdirSync(path.join(dist, 'zh'), { recursive: true });
fs.writeFileSync(path.join(dist, 'zh/sitemap.xml'), render(zh));
console.log(`sitemaps written: en=${en.length} urls, zh=${zh.length} urls`);
