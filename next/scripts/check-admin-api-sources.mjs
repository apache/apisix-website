/* eslint-disable no-console -- This CLI prints validation evidence. */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { isAdminApiSpec } from '../../shared/admin-api-spec.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const assets = process.argv[2] ?? path.join(root, 'doc/static/assets/openapi/apisix');
const required = ['3.16', '3.17', '3.18', 'next'];
let failed = false;
required.forEach((version) => {
  const ref = version === 'next' ? 'master' : `release/${version}`;
  const source = `apache/apisix@${ref}/docs/en/latest/admin-api.json`;
  try {
    const bytes = fs.readFileSync(path.join(assets, version, 'admin-api.json'));
    if (!isAdminApiSpec(JSON.parse(bytes), version)) throw new Error('invalid or mismatched OpenAPI');
    console.log(`OK ${source} sha256=${createHash('sha256').update(bytes).digest('hex')}`);
  } catch (error) {
    failed = true;
    console.error(`BLOCKED ${source}: ${error.code === 'ENOENT' ? 'missing synced source' : error.message}`);
  }
});
if (failed) process.exitCode = 1;
