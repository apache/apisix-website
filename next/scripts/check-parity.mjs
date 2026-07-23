/**
 * URL parity checker: every URL in the LIVE site's sitemaps must exist in the
 * freshly built dist/. This is the contract "换框架但 URI 不变".
 *
 * Comparison is string-set based (exact, case-sensitive) rather than
 * fs.existsSync, so it stays correct on case-insensitive filesystems (macOS)
 * while the production host (ASF httpd on Linux) is case-sensitive.
 *
 * Usage: node scripts/check-parity.mjs [--dist <dir>] <live-en> <live-zh>
 * Inputs may be plain URL lists (.txt, one per line) or raw sitemap XML.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const argv = process.argv.slice(2);
const distFlag = argv.indexOf('--dist');
const dist = distFlag !== -1 ? path.resolve(argv.splice(distFlag, 2)[1]) : path.join(root, 'dist');
const [enList, zhList] = argv;

function readUrls(file) {
  const raw = fs.readFileSync(file, 'utf8');
  if (raw.trimStart().startsWith('<?xml') || raw.includes('<urlset')) {
    return [...raw.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  }
  return raw.split('\n').filter(Boolean);
}

const built = new Set();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') {
      const rel = path.relative(dist, path.dirname(p)).split(path.sep).join('/');
      built.add(rel === '' ? '/' : `/${rel}/`);
    }
  }
})(dist);

let ok = 0; const missing = [];
for (const file of [enList, zhList]) {
  if (!file) continue;
  for (const line of readUrls(file)) {
    // Live sitemap <loc> values are XML-escaped and sometimes percent-encoded;
    // dist directories carry the literal characters.
    const raw = line.replace(/&amp;/g, '&').replace(/&#39;/g, "'");
    const url = decodeURIComponent(new URL(raw).pathname);
    if (built.has(url)) { ok += 1; continue; }
    missing.push(url);
  }
}

console.log(`parity: ${ok} present, ${missing.length} missing`);
if (missing.length) {
  console.log('\nMISSING:');
  for (const u of missing) console.log('  ' + u);
  process.exitCode = 1;
}
