const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { publishAdminApiSpec } = require('./admin-api');

test('publishes the selected English spec byte-for-byte and removes stale assets', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'apisix-openapi-'));
  try {
    const source = path.join(root, 'en');
    const output = path.join(root, 'static');
    await fs.mkdir(source);
    const spec = '{"openapi":"3.1.0","info":{"version":"3.19.0"},"paths":{}}\n';
    await fs.writeFile(path.join(source, 'admin-api.json'), spec);
    await publishAdminApiSpec(source, 'next', output);
    const asset = path.join(output, 'assets/openapi/apisix/next/admin-api.json');
    assert.equal(await fs.readFile(asset, 'utf8'), spec);
    await fs.rm(path.join(source, 'admin-api.json'));
    await publishAdminApiSpec(source, 'next', output);
    await assert.rejects(fs.access(asset), { code: 'ENOENT' });
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
