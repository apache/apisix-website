/**
 * Post-build gate: every internal link in every docs sidebar must resolve to
 * a built page. Catches config.json ids drifting from frontmatter slug/id
 * overrides (the exact bug that once produced five 404 sidebar links on
 * /docs/ingress-controller/).
 *
 * Usage: node scripts/check-doc-links.mjs [--dist <dir>]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const argv = process.argv.slice(2);
const distFlag = argv.indexOf('--dist');
const dist = distFlag !== -1 ? path.resolve(argv[distFlag + 1]) : path.join(root, 'dist');

let pages = 0;
let checked = 0;
const broken = new Map();

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (e.name !== 'index.html') continue;
    const html = fs.readFileSync(p, 'utf8');
    const nav = html.match(/<nav class="docs-sidebar"[\s\S]*?<\/nav>/);
    if (!nav) continue;
    pages += 1;
    for (const [, url] of nav[0].matchAll(/href="(\/[^"#]*)"/g)) {
      checked += 1;
      if (!fs.existsSync(path.join(dist, url, 'index.html'))) {
        if (!broken.has(url)) broken.set(url, path.relative(dist, p));
      }
    }
  }
})(dist);

console.log(`doc sidebar links: ${pages} pages, ${checked} links, ${broken.size} broken`);
for (const [url, src] of broken) console.log(`  BROKEN ${url} (e.g. on ${src})`);
if (broken.size) process.exit(1);
