import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const signalsPath = path.resolve(
  scriptDirectory,
  '../../doc/src/theme/LayoutHead/versionedDocSignals.mjs',
);
const { getVersionedDocSignals } = await import(signalsPath);
const site = 'https://apisix.apache.org';

assert.equal(
  getVersionedDocSignals('/docs/apisix/installation-guide/', site, null),
  null,
  'Current documentation should remain indexable',
);
assert.deepEqual(
  getVersionedDocSignals(
    '/docs/apisix/3.18/installation-guide/',
    site,
    '/docs/apisix/installation-guide/',
  ),
  {
    canonicalUrl: `${site}/docs/apisix/installation-guide/`,
    robots: 'noindex,follow',
  },
);
assert.deepEqual(
  getVersionedDocSignals(
    '/docs/apisix/next/installation-guide/',
    site,
    '/docs/apisix/installation-guide/',
  ),
  {
    canonicalUrl: `${site}/docs/apisix/installation-guide/`,
    robots: 'noindex,follow',
  },
);
assert.deepEqual(
  getVersionedDocSignals('/zh/docs/apisix/3.18/removed-page/', site, null),
  {
    canonicalUrl: `${site}/zh/docs/apisix/3.18/removed-page/`,
    robots: 'noindex,follow',
  },
);
assert.equal(
  getVersionedDocSignals('/docs/ingress-controller/overview/', site, null),
  null,
  'Current Ingress documentation should remain indexable',
);
assert.deepEqual(
  getVersionedDocSignals(
    '/docs/ingress-controller/2.0.0/overview/',
    site,
    '/docs/ingress-controller/overview/',
  ),
  {
    canonicalUrl: `${site}/docs/ingress-controller/overview/`,
    robots: 'noindex,follow',
  },
);
assert.deepEqual(
  getVersionedDocSignals(
    '/docs/ingress-controller/next/overview/',
    site,
    '/docs/ingress-controller/overview/',
  ),
  {
    canonicalUrl: `${site}/docs/ingress-controller/overview/`,
    robots: 'noindex,follow',
  },
);

console.log('Historical and next documentation signal policy passed.');
