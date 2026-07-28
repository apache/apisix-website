import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

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
  'learning-center/mcp-protocol-ai-gateway',
  'learning-center/tags/ai-gateway',
  'learning-center/page/2',
  'learning-center/archive',
  'articles/Apache-APISIX-Incubator-Journey',
  'articles/page/2',
  'articles/archive',
  'events/archive',
  'blog/2026/07/28/release-notes',
  'blog/page/2',
  'blog/archive',
  'zh',
  'zh/learning-center/what-is-an-api-gateway',
  'zh/learning-center/tags/api-gateway',
  'zh/articles/page/2',
  'zh/events/archive',
  'zh/blog/page/2',
];

try {
  pages.forEach(writePage);
  const result = spawnSync(process.execPath, [generator, '--dist', dist], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);

  const en = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
  const zh = fs.readFileSync(path.join(dist, 'zh/sitemap.xml'), 'utf8');
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
  ];

  assert.match(en, /learning-center\/mcp-protocol-ai-gateway/);
  assert.match(en, /articles\/Apache-APISIX-Incubator-Journey/);
  assert.match(en, /blog\/2026\/07\/28\/release-notes/);
  assert.match(zh, /zh\/learning-center\/what-is-an-api-gateway/);
  excluded.forEach((url) => assert.doesNotMatch(`${en}${zh}`, new RegExp(url)));
  console.log('Sitemap URL filters passed.');
} finally {
  fs.rmSync(dist, { recursive: true, force: true });
}
