/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';

const SITE_ORIGIN = 'https://apisix.apache.org';
const canonicalTagPattern = /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi;
const hrefPattern = /\bhref=["']([^"']+)["']/i;

function collectHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function targetCandidates(distDirectory, pathname) {
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, '');
  const directTarget = path.resolve(distDirectory, relativePath);
  if (!directTarget.startsWith(`${path.resolve(distDirectory)}${path.sep}`)
    && directTarget !== path.resolve(distDirectory)) {
    return [];
  }

  if (pathname.endsWith('/')) return [path.join(directTarget, 'index.html')];
  return [directTarget, path.join(directTarget, 'index.html')];
}

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

const distArgumentIndex = process.argv.indexOf('--dist');
const distDirectory = path.resolve(
  distArgumentIndex >= 0 ? process.argv[distArgumentIndex + 1] : 'dist',
);

if (!fs.existsSync(distDirectory)) {
  throw new Error(`Build directory does not exist: ${distDirectory}`);
}

const failures = [];
let checkedCanonicals = 0;
const htmlFiles = collectHtmlFiles(distDirectory);

htmlFiles.forEach((htmlFile) => {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const canonicalTags = html.match(canonicalTagPattern) ?? [];
  canonicalTags.forEach((tag) => {
    const href = tag.match(hrefPattern)?.[1];
    if (!href) return;

    const canonical = new URL(href, SITE_ORIGIN);
    if (canonical.origin !== SITE_ORIGIN) return;

    checkedCanonicals += 1;
    const candidates = targetCandidates(distDirectory, canonical.pathname);
    if (!candidates.some(isFile)) {
      failures.push(`${path.relative(distDirectory, htmlFile)} -> ${canonical.href}`);
    }
  });
});

if (failures.length > 0) {
  console.error('APISIX-local canonicals with missing build targets:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Validated ${checkedCanonicals} APISIX-local canonicals across ${htmlFiles.length} HTML files.`,
);
