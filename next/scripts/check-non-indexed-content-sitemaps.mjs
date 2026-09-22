import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NON_INDEXED_CONTENT_DECISIONS } from '../tests/fixtures/non-indexed-content-decisions.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(scriptDirectory, '../dist');
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const site = 'https://apisix.apache.org';

for (const { source, destination } of NON_INDEXED_CONTENT_DECISIONS) {
  assert.equal(
    sitemap.includes(`<loc>${site}${source}</loc>`),
    false,
    `${source} should remain absent from the generated sitemap`,
  );
  assert.ok(
    sitemap.includes(`<loc>${site}${destination}</loc>`),
    `${destination} should exist in the generated sitemap`,
  );
}

console.log(`Validated sitemap outcomes for ${NON_INDEXED_CONTENT_DECISIONS.length} content consolidation decisions.`);
