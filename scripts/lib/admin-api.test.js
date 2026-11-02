const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { publishApiReferenceSpecs } = require('./admin-api');

test('publishes the selected English spec byte-for-byte and removes stale assets', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'apisix-openapi-'));
  try {
    const source = path.join(root, 'en');
    const output = path.join(root, 'static');
    await fs.mkdir(source);
    const spec = '{"openapi":"3.1.0","info":{"version":"3.19.0"},"paths":{}}\n';
    const controlSpec = spec.replace('3.19.0', '3.19.1');
    await Promise.all([
      fs.writeFile(path.join(source, 'admin-api.json'), spec),
      fs.writeFile(path.join(source, 'control-api.json'), controlSpec),
    ]);
    assert.deepEqual(
      await publishApiReferenceSpecs(source, 'next', output),
      ['admin-api', 'control-api'],
    );
    const target = path.join(output, 'assets/openapi/apisix/next');
    assert.equal(await fs.readFile(path.join(target, 'admin-api.json'), 'utf8'), spec);
    assert.equal(await fs.readFile(path.join(target, 'control-api.json'), 'utf8'), controlSpec);
    await fs.rm(path.join(source, 'admin-api.json'));
    assert.deepEqual(await publishApiReferenceSpecs(source, 'next', output), ['control-api']);
    await assert.rejects(fs.access(path.join(target, 'admin-api.json')), { code: 'ENOENT' });
    assert.equal(await fs.readFile(path.join(target, 'control-api.json'), 'utf8'), controlSpec);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
