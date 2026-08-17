import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const htaccessPath = path.resolve(scriptDirectory, '../../.htaccess');
const directives = fs
  .readFileSync(htaccessPath, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter(
    (line) => line.startsWith('Redirect 301 "') || line.startsWith('RedirectMatch 301 "'),
  )
  .map((line) => {
    const redirectMatch = line.match(
      /^RedirectMatch\s+(\d{3})\s+"([^"]+)"\s+"([^"]+)"$/,
    );
    if (redirectMatch) {
      return {
        type: 'match',
        status: Number(redirectMatch[1]),
        source: new RegExp(redirectMatch[2]),
        destination: redirectMatch[3],
      };
    }

    const redirect = line.match(/^Redirect\s+(\d{3})\s+"([^"]+)"\s+"([^"]+)"$/);
    assert(redirect, `Unable to parse redirect directive: ${line}`);
    return {
      type: 'prefix',
      status: Number(redirect[1]),
      source: redirect[2],
      destination: redirect[3],
    };
  });

function firstRedirect(requestPath) {
  for (const directive of directives) {
    if (directive.type === 'match' && directive.source.test(requestPath)) {
      return {
        status: directive.status,
        destination: requestPath.replace(directive.source, directive.destination),
      };
    }
    const matchesPrefix =
      directive.type === 'prefix' &&
      (requestPath === directive.source ||
        requestPath.startsWith(
          directive.source.endsWith('/') ? directive.source : `${directive.source}/`,
        ));
    if (matchesPrefix) {
      return {
        status: directive.status,
        destination: `${directive.destination}${requestPath.slice(directive.source.length)}`,
      };
    }
  }
  return null;
}

const directRedirects = [
  [
    '/docs/ingress-controller/concepts/apisix_route/',
    '/docs/ingress-controller/reference/apisix-ingress-controller/api-reference/',
  ],
  [
    '/docs/ingress-controller/1.8.0/concepts/apisix_route/',
    '/docs/ingress-controller/reference/apisix-ingress-controller/api-reference/',
  ],
  [
    '/docs/ingress-controller/1.8.0/concepts/apisix_route',
    '/docs/ingress-controller/reference/apisix-ingress-controller/api-reference/',
  ],
  [
    '/zh/docs/ingress-controller/1.1.0/concepts/apisix_route/',
    '/zh/docs/ingress-controller/reference/apisix-ingress-controller/api-reference/',
  ],
  [
    '/docs/ingress-controller/1.8.0/references/apisix_route_v2/',
    '/docs/ingress-controller/reference/apisix-ingress-controller/api-reference/',
  ],
  [
    '/docs/ingress-controller/1.6.1/design/',
    '/docs/ingress-controller/concepts/deployment-architecture/',
  ],
  [
    '/docs/ingress-controller/1.6.1/design',
    '/docs/ingress-controller/concepts/deployment-architecture/',
  ],
  [
    '/docs/ingress-controller/design/',
    '/docs/ingress-controller/concepts/deployment-architecture/',
  ],
  [
    '/zh/docs/ingress-controller/0.6.0/design/',
    '/zh/docs/ingress-controller/concepts/deployment-architecture/',
  ],
  [
    '/docs/ingress-controller/1.8.0/tutorials/proxy-the-httpbin-service/',
    '/docs/ingress-controller/getting-started/configure-routes/',
  ],
  [
    '/docs/ingress-controller/practices/proxy-the-httpbin-service-with-ingress',
    '/docs/ingress-controller/getting-started/configure-routes/',
  ],
  [
    '/docs/ingress-controller/practices/proxy-the-httpbin-service-with-ingress/',
    '/docs/ingress-controller/getting-started/configure-routes/',
  ],
  [
    '/zh/docs/ingress-controller/practices/proxy-the-httpbin-service-with-ingress',
    '/zh/docs/ingress-controller/getting-started/configure-routes/',
  ],
  [
    '/docs/ingress-controller/0.6.0/practices/proxy-the-httpbin-service-with-ingress/',
    '/docs/ingress-controller/getting-started/configure-routes/',
  ],
  [
    '/zh/docs/ingress-controller/1.8.0/practices/proxy-the-httpbin-service-with-ingress',
    '/zh/docs/ingress-controller/getting-started/configure-routes/',
  ],
  [
    '/docs/ingress-controller/1.8.0/FAQ/',
    '/docs/ingress-controller/overview/',
  ],
  [
    '/docs/ingress-controller/reference/apisix-ingress-controller/crd-reference/',
    '/docs/ingress-controller/reference/apisix-ingress-controller/api-reference/',
  ],
];

for (const [source, expectedDestination] of directRedirects) {
  const redirect = firstRedirect(source);
  assert(redirect, `${source} should match a redirect`);
  assert.equal(redirect.status, 301, `${source} should return a permanent redirect`);
  assert.equal(
    redirect.destination,
    expectedDestination,
    `${source} should redirect directly to its current documentation page`,
  );
  assert.equal(
    firstRedirect(expectedDestination),
    null,
    `${expectedDestination} should not start another redirect`,
  );
}

assert.deepEqual(
  firstRedirect('/docs/ingress-controller/1.8.0/unmapped-page/'),
  {
    status: 301,
    destination: '/docs/ingress-controller/unmapped-page/',
  },
  'The generic version-removal fallback should remain available',
);

assert.equal(
  firstRedirect('/docs/apisix/install-extra'),
  null,
  'Redirect directives should only match complete path segments',
);

console.log(`Validated ${directRedirects.length} direct Ingress documentation redirects.`);
