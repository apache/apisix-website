import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APISIX_OWNED_DOCS,
  SITE,
  discoverApi7OwnedDocs,
} from '../tests/fixtures/documentation-search-signals.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(scriptDirectory);
const dist = path.resolve(root, process.argv[2] ?? 'dist');
const api7OwnedDocs = discoverApi7OwnedDocs();

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1];
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
}

function pageHtml(urlPath) {
  const file = path.join(dist, urlPath.replace(/^\//, ''), 'index.html');
  assert.ok(fs.existsSync(file), `${urlPath} should have a built index.html`);
  return fs.readFileSync(file, 'utf8');
}

function canonicalTags(html) {
  return tags(html, 'link').filter((candidate) => (
    attribute(candidate, 'rel')?.toLowerCase().split(/\s+/).includes('canonical')
  ));
}

function robotsTags(html) {
  return tags(html, 'meta').filter((candidate) => (
    attribute(candidate, 'name')?.toLowerCase() === 'robots'
  ));
}

function hasHreflang(html) {
  return tags(html, 'link').some((tag) => (
    attribute(tag, 'rel')?.toLowerCase().split(/\s+/).includes('alternate')
      && attribute(tag, 'hreflang')
  ));
}

assert.ok(api7OwnedDocs.length > 0, 'No API7-owned documents were discovered after content sync');
assert.equal(
  new Set(api7OwnedDocs.map(({ path: urlPath }) => urlPath)).size,
  api7OwnedDocs.length,
  'Discovered API7-owned document paths should be unique',
);

const sitemap = [
  path.join(dist, 'sitemap.xml'),
  path.join(dist, 'zh/sitemap.xml'),
].filter(fs.existsSync).map((file) => fs.readFileSync(file, 'utf8')).join('\n');

api7OwnedDocs.forEach(({ path: urlPath, canonical: expectedCanonical }) => {
  const html = pageHtml(urlPath);
  const pageCanonicalTags = canonicalTags(html);
  const pageRobotsTags = robotsTags(html);
  assert.equal(pageCanonicalTags.length, 1, `${urlPath} should have one canonical`);
  assert.equal(attribute(pageCanonicalTags[0], 'href'), expectedCanonical, `${urlPath} canonical`);
  assert.equal(pageRobotsTags.length, 1, `${urlPath} should have one robots directive`);
  assert.equal(attribute(pageRobotsTags[0], 'content'), 'index,follow', `${urlPath} robots`);
  assert.equal(hasHreflang(html), false, `${urlPath} should not emit APISIX hreflang`);
  assert.equal(
    sitemap.includes(`<loc>${SITE}${urlPath}</loc>`),
    false,
    `${urlPath} should not enter an APISIX sitemap`,
  );
});

APISIX_OWNED_DOCS.forEach((urlPath) => {
  const html = pageHtml(urlPath);
  const pageCanonicalTags = canonicalTags(html);
  const pageRobotsTags = robotsTags(html);
  assert.equal(pageCanonicalTags.length, 1, `${urlPath} should have one canonical`);
  assert.equal(attribute(pageCanonicalTags[0], 'href'), `${SITE}${urlPath}`, `${urlPath} canonical`);
  assert.equal(pageRobotsTags.length, 1, `${urlPath} should have one robots directive`);
  assert.equal(attribute(pageRobotsTags[0], 'content'), 'index,follow', `${urlPath} robots`);
  assert.ok(
    sitemap.includes(`<loc>${SITE}${urlPath}</loc>`),
    `${urlPath} should enter the APISIX sitemap`,
  );
});

console.log(
  `Validated ${api7OwnedDocs.length} API7-owned and ${APISIX_OWNED_DOCS.length} APISIX-owned built documentation pages.`,
);
