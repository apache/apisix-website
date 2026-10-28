const fs = require('fs/promises');

// Specs always come from the English tree of the checked-out apache/apisix
// ref. Both locales request this same-origin asset, never a docs-site copy.
async function publishAdminApiSpec(source, version, staticRoot) {
  const target = `${staticRoot}/assets/openapi/apisix/${version}`;
  await fs.rm(target, { recursive: true, force: true });
  try { await fs.access(`${source}/admin-api.json`); } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
  await fs.mkdir(target, { recursive: true });
  await fs.copyFile(`${source}/admin-api.json`, `${target}/admin-api.json`);
}

module.exports = { publishAdminApiSpec };
