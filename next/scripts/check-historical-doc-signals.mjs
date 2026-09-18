import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const signalsPath = path.resolve(
  scriptDirectory,
  '../../doc/src/theme/LayoutHead/versionedDocSignals.mjs',
);
const { getVersionedDocSignals } = await import(signalsPath);
const site = 'https://apisix.apache.org';
const htaccess = fs.readFileSync(path.resolve(scriptDirectory, '../../.htaccess'), 'utf8');
const redirectDirectives = htaccess
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => /^Redirect(?:Match)?\s+3\d{2}\s+"/.test(line))
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
  for (const directive of redirectDirectives) {
    if (directive.type === 'match' && directive.source.test(requestPath)) {
      return {
        status: directive.status,
        destination: requestPath.replace(directive.source, directive.destination),
      };
    }
    const matchesPrefix =
      directive.type === 'prefix'
      && (requestPath === directive.source
        || requestPath.startsWith(
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

const coverageRedirects = [
  ['^/docs/java-plugin-runner/0\\.1/how-it-works/?$', '/docs/java-plugin-runner/how-it-works/'],
  ['^/docs/java-plugin-runner/0\\.1/the-internal-of-apisix-java-plugin-runner/?$', '/docs/java-plugin-runner/the-internal-of-apisix-java-plugin-runner/'],
  ['^/zh/docs/java-plugin-runner/0\\.1/development/?$', '/zh/docs/java-plugin-runner/development/'],
  ['^/zh/docs/java-plugin-runner/0\\.1/how-it-works/?$', '/zh/docs/java-plugin-runner/how-it-works/'],
  ['^/zh/docs/java-plugin-runner/0\\.1/the-internal-of-apisix-java-plugin-runner/?$', '/zh/docs/java-plugin-runner/the-internal-of-apisix-java-plugin-runner/'],
  ['^/blog/2023/12/01/datavisor-uses-apisix/?$', '/blog/2023/12/19/datavisor-uses-apisix/'],
  ['^/zh/blog/2021/08/16/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication/?$', '/zh/blog/2021/08/25/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication/'],
  ['^/zh/blog/2021/10/29/extension-guide/?$', '/zh/blog/2021/10/26/extension-guide/'],
  ['^/blog/2023/03/08/why-do-microservices-need-an-api-gateway/?$', '/blog/2023/05/19/why-do-microservices-need-an-api-gateway/'],
  ['^/zh/blog/2020/12/16/another-way-to-implement-envoy-filter/?$', '/blog/2020/12/16/another-way-to-implement-envoy-filter/'],
  ['^/blog/2023/12/08/zhengcaiyun-uses-apisix/?$', '/blog/2023/12/26/zhengcaiyun-uses-apisix/'],
  ['^/blog/2021/09/29/release-apache-apisix-2\\.10-en/?$', '/blog/2021/09/29/release-apache-apisix-2.10/'],
  ['^/blog/2022/10/28/apisix-ingress-with-horizon-ai/?$', '/zh/blog/2022/10/28/apisix-ingress-with-horizon-ai/'],
  ['^/blog/2023/07/12/2023-apisix-meetup-malaysia/?$', '/blog/2023/07/11/2023-apisix-meetup-malaysia/'],
  ['^/docs/java-plugin-runner/0\\.(?:3|4)\\.0/installation-guide/development\\.md/?$', '/docs/java-plugin-runner/development/'],
  ['^/zh/docs/java-plugin-runner/0\\.4\\.0/installation-guide/development\\.md/?$', '/zh/docs/java-plugin-runner/development/'],
  ['^/zh/blog/2023/03/10/release-apache-apisix-3\\.2\\.0/?$', '/zh/blog/2023/03/09/release-apache-apisix-3.2.0/'],
  ['^/zh/blog/2023/05/19/why-do-microservices-need-an-api-gateway/?$', '/zh/blog/2023/03/08/why-do-microservices-need-an-api-gateway/'],
  ['^/zh/blog/2023/12/19/datavisor-uses-apisix/?$', '/zh/blog/2023/12/01/datavisor-uses-apisix/'],
  ['^/zh/blog/2023/12/26/zhengcaiyun-uses-apisix/?$', '/zh/blog/2023/12/08/zhengcaiyun-uses-apisix/'],
  ['^/zh/blog/2024/04/05/build-apisix-in-sles15/?$', '/blog/2024/04/05/build-apisix-in-sles15/'],
  ['^/guest-blog-post/?$', '/docs/general/blog/'],
];

const coverageRedirectCases = [
  ['/blog/2021/09/29/release-apache-apisix-2.10-en', '/blog/2021/09/29/release-apache-apisix-2.10/'],
  ['/blog/2022/10/28/apisix-ingress-with-horizon-ai/', '/zh/blog/2022/10/28/apisix-ingress-with-horizon-ai/'],
  ['/blog/2023/03/08/why-do-microservices-need-an-api-gateway/', '/blog/2023/05/19/why-do-microservices-need-an-api-gateway/'],
  ['/blog/2023/07/12/2023-apisix-meetup-malaysia/', '/blog/2023/07/11/2023-apisix-meetup-malaysia/'],
  ['/blog/2023/12/01/datavisor-uses-apisix/', '/blog/2023/12/19/datavisor-uses-apisix/'],
  ['/blog/2023/12/08/zhengcaiyun-uses-apisix/', '/blog/2023/12/26/zhengcaiyun-uses-apisix/'],
  ['/docs/java-plugin-runner/0.1/how-it-works/', '/docs/java-plugin-runner/how-it-works/'],
  ['/docs/java-plugin-runner/0.1/the-internal-of-apisix-java-plugin-runner/', '/docs/java-plugin-runner/the-internal-of-apisix-java-plugin-runner/'],
  ['/docs/java-plugin-runner/0.3.0/installation-guide/development.md/', '/docs/java-plugin-runner/development/'],
  ['/docs/java-plugin-runner/0.4.0/installation-guide/development.md/', '/docs/java-plugin-runner/development/'],
  ['/guest-blog-post', '/docs/general/blog/'],
  ['/zh/blog/2020/12/16/another-way-to-implement-envoy-filter/', '/blog/2020/12/16/another-way-to-implement-envoy-filter/'],
  ['/zh/blog/2021/08/16/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication', '/zh/blog/2021/08/25/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication/'],
  ['/zh/blog/2021/08/16/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication/', '/zh/blog/2021/08/25/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication/'],
  ['/zh/blog/2021/10/29/extension-guide/', '/zh/blog/2021/10/26/extension-guide/'],
  ['/zh/blog/2023/03/10/release-apache-apisix-3.2.0/', '/zh/blog/2023/03/09/release-apache-apisix-3.2.0/'],
  ['/zh/blog/2023/05/19/why-do-microservices-need-an-api-gateway/', '/zh/blog/2023/03/08/why-do-microservices-need-an-api-gateway/'],
  ['/zh/blog/2023/12/19/datavisor-uses-apisix/', '/zh/blog/2023/12/01/datavisor-uses-apisix/'],
  ['/zh/blog/2023/12/26/zhengcaiyun-uses-apisix/', '/zh/blog/2023/12/08/zhengcaiyun-uses-apisix/'],
  ['/zh/blog/2024/04/05/build-apisix-in-sles15/', '/blog/2024/04/05/build-apisix-in-sles15/'],
  ['/zh/docs/java-plugin-runner/0.1/development/', '/zh/docs/java-plugin-runner/development/'],
  ['/zh/docs/java-plugin-runner/0.1/how-it-works/', '/zh/docs/java-plugin-runner/how-it-works/'],
  ['/zh/docs/java-plugin-runner/0.1/the-internal-of-apisix-java-plugin-runner/', '/zh/docs/java-plugin-runner/the-internal-of-apisix-java-plugin-runner/'],
  ['/zh/docs/java-plugin-runner/0.4.0/installation-guide/development.md/', '/zh/docs/java-plugin-runner/development/'],
];

for (const [source, target] of coverageRedirects) {
  assert.ok(
    htaccess.includes(`RedirectMatch 301 "${source}" "${target}"`),
    `${source} should redirect directly to ${target}`,
  );
}

for (const [sourcePath, expectedDestination] of coverageRedirectCases) {
  const redirect = firstRedirect(sourcePath);
  assert(redirect, `${sourcePath} should match a redirect`);
  assert.equal(redirect.status, 301, `${sourcePath} should return a permanent redirect`);
  assert.equal(
    redirect.destination,
    expectedDestination,
    `${sourcePath} should redirect directly to its verified replacement`,
  );
  assert.equal(
    firstRedirect(expectedDestination),
    null,
    `${expectedDestination} should not start another redirect`,
  );
}

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
