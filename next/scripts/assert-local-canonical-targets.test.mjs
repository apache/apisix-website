/* eslint-disable no-console */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const validator = path.join(root, 'scripts/assert-local-canonical-targets.mjs');
const dist = fs.mkdtempSync(path.join(os.tmpdir(), 'apisix-canonical-targets-'));
const site = 'https://apisix.apache.org';

function writePage(relativePath, canonical) {
  const directory = path.join(dist, relativePath);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(
    path.join(directory, 'index.html'),
    `<!doctype html><head><link rel="canonical" href="${canonical}"></head>`,
  );
}

try {
  writePage('blog/q&a', `${site}/blog/q&#38;a/`);
  writePage('blog/named&a', `${site}/blog/named&amp;a/`);
  writePage('blog/sol/target', `${site}/blog/sol&sol;target/`);
  writePage('blog/mixed&AmP;case', `${site}/blog/mixed&AmP;case/`);
  writePage('blog/a&amp=b', `${site}/blog/a&amp=b/`);
  writePage('external-entity-origin', 'https&colon;&sol;&sol;example.com/');

  let result = spawnSync(process.execPath, [validator, '--dist', dist], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);

  writePage('missing-target-source', `${site}/missing-target/`);
  result = spawnSync(process.execPath, [validator, '--dist', dist], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing-target-source\/index\.html -> .*\/missing-target\//);
  console.log('Local canonical target validation passed.');
} finally {
  fs.rmSync(dist, { recursive: true, force: true });
}
