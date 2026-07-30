import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
// Test-only XML parser; production sitemap generation has no parser dependency.
// eslint-disable-next-line import/no-extraneous-dependencies
import sax from 'sax';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const generator = path.join(root, 'scripts/generate-sitemaps.mjs');
const dist = fs.mkdtempSync(path.join(os.tmpdir(), 'apisix-sitemap-'));

function writePage(url) {
  const dir = path.join(dist, url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), '<!doctype html>');
}

const pages = [
  '',
  '404',
  'learning-center',
  'learning-center/mcp-protocol-ai-gateway',
  'learning-center/tags/ai-gateway',
  'learning-center/page/2',
  'learning-center/archive',
  'articles/Apache-APISIX-Incubator-Journey',
  'docs/general/blog/page/overview',
  'articles/page/2',
  'articles/archive',
  'events/archive',
  'blog/2026/07/28/release-notes',
  'blog/2026/07/28/apisix-unity-group-q&a',
  'blog/page/2',
  'blog/archive',
  'docs/apisix/3.17/plugins/cors',
  'docs/docker/apisix-3.17.0/build',
  'docs/apisix/next/plugins/cors',
  'docs/apisix/tags/plugins',
  'docs/apisix/upgrade-guide-from-2.15.x-to-3.0.0',
  'search',
  'zh',
  'zh/learning-center',
  'zh/learning-center/tags/api-gateway',
  'zh/articles/page/2',
  'zh/events/archive',
  'zh/blog/page/2',
  'zh/blog/2026/07/28/bi-weekly report',
  'zh/docs/ingress-controller/2.1.0/overview',
  'zh/docs/apisix/next/plugins/cors',
  'zh/docs/apisix/tags/plugins',
  'zh/search',
];

try {
  pages.forEach(writePage);
  const result = spawnSync(process.execPath, [generator, '--dist', dist], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);

  const en = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
  const zh = fs.readFileSync(path.join(dist, 'zh/sitemap.xml'), 'utf8');
  sax.parser(true).write(en).close();
  sax.parser(true).write(zh).close();

  const excluded = [
    'learning-center/tags/ai-gateway',
    'learning-center/page/2',
    'learning-center/archive',
    'articles/page/2',
    'articles/archive',
    'events/archive',
    'blog/page/2',
    'blog/archive',
    'zh/learning-center/tags/api-gateway',
    'zh/articles/page/2',
    'zh/events/archive',
    'zh/blog/page/2',
    'docs/apisix/3.17/plugins/cors',
    'docs/docker/apisix-3.17.0/build',
    'docs/apisix/next/plugins/cors',
    'docs/apisix/tags/plugins',
    'zh/docs/ingress-controller/2.1.0/overview',
    'zh/docs/apisix/next/plugins/cors',
    'zh/docs/apisix/tags/plugins',
    '/search/',
    '/zh/search/',
  ];

  assert.match(en, /learning-center\/mcp-protocol-ai-gateway/);
  assert.match(en, /articles\/Apache-APISIX-Incubator-Journey/);
  assert.match(en, /blog\/2026\/07\/28\/release-notes/);
  assert.match(en, /docs\/general\/blog\/page\/overview/);
  assert.match(en, /docs\/apisix\/upgrade-guide-from-2\.15\.x-to-3\.0\.0/);
  assert.match(en, /apisix-unity-group-q&amp;a/);
  assert.match(zh, /zh\/learning-center\/<\/loc>/);
  assert.doesNotMatch(zh, /zh\/learning-center\/what-is-an-api-gateway/);
  assert.match(zh, /bi-weekly%20report/);

  assert.ok(en.includes('<loc>https://apisix.apache.org/</loc><changefreq>weekly</changefreq><priority>1.0</priority>'));
  assert.ok(en.includes('<loc>https://apisix.apache.org/learning-center/</loc><changefreq>monthly</changefreq><priority>0.8</priority>'));
  assert.ok(en.includes('<loc>https://apisix.apache.org/learning-center/mcp-protocol-ai-gateway/</loc><changefreq>monthly</changefreq><priority>0.8</priority>'));
  assert.ok(en.includes('<loc>https://apisix.apache.org/blog/2026/07/28/release-notes/</loc><changefreq>monthly</changefreq><priority>0.6</priority>'));
  assert.ok(en.includes('<loc>https://apisix.apache.org/docs/general/blog/page/overview/</loc><changefreq>monthly</changefreq><priority>0.7</priority>'));
  excluded.forEach((url) => assert.equal(`${en}${zh}`.includes(url), false, url));
  console.log('Sitemap URL filters passed.');
} finally {
  fs.rmSync(dist, { recursive: true, force: true });
}
