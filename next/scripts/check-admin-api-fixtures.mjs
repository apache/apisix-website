/* eslint-disable no-console -- This CLI prints validation evidence. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { isApiReferenceSpec } from '../../shared/admin-api-spec.ts';

// Read-only, explicit validation inputs; never called by sync or deployment.
const [fixtureRepository, generatedAssetRoot] = process.argv.slice(2);
assert.ok(
  fixtureRepository && generatedAssetRoot,
  'Usage: node next/scripts/check-admin-api-fixtures.mjs <fixture-git-repo> <generated-assets/openapi/apisix>',
);
const fixtures = JSON.parse(fs.readFileSync(new URL('../tests/admin-api/source-fixtures.json', import.meta.url)));
const siteRoot = fileURLToPath(new URL('../..', import.meta.url));
console.log('Canonical apache/apisix fixture parity.');
fixtures.forEach(({
  version, commit, canonicalRef, apiId = 'admin-api', generatedPath,
}) => {
  const source = execFileSync('git', ['-C', fixtureRepository, 'show', `${commit}:docs/en/latest/${apiId}.json`]);
  const generated = fs.readFileSync(generatedPath
    ? path.join(siteRoot, generatedPath)
    : path.join(generatedAssetRoot, version, `${apiId}.json`));
  const spec = JSON.parse(source);
  assert.ok(isApiReferenceSpec(spec, version, apiId), `Invalid ${version} ${apiId} fixture`);
  assert.deepEqual(generated, source, `${version} ${apiId} generated asset differs from immutable fixture`);
  const digest = createHash('sha256').update(source).digest('hex');
  console.log(`PASS ${version} ${apiId}: apache/apisix@${commit}; canonical ref ${canonicalRef}; ${Object.keys(spec.paths).length} paths; sha256=${digest}`);
});
