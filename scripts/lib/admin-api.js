const fs = require('fs/promises');

// Specs always come from the English tree of the checked-out apache/apisix
// ref. Both locales request this same-origin asset, never a docs-site copy.
const API_REFERENCES = ['admin-api', 'control-api'];

async function publishApiReferenceSpecs(source, version, staticRoot) {
  const target = `${staticRoot}/assets/openapi/apisix/${version}`;
  await fs.rm(target, { recursive: true, force: true });
  const available = (await Promise.all(API_REFERENCES.map(async (apiId) => {
    try {
      await fs.access(`${source}/${apiId}.json`);
      return apiId;
    } catch (error) {
      if (error.code === 'ENOENT') return undefined;
      throw error;
    }
  }))).filter(Boolean);
  if (available.length > 0) {
    await fs.mkdir(target, { recursive: true });
    await Promise.all(available.map((apiId) => (
      fs.copyFile(`${source}/${apiId}.json`, `${target}/${apiId}.json`)
    )));
  }
  return available;
}

module.exports = { API_REFERENCES, publishApiReferenceSpecs };
