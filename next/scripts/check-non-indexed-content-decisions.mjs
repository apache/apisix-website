import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NON_INDEXED_CONTENT_DECISIONS } from '../tests/fixtures/non-indexed-content-decisions.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, '../..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const redirects = read('.htaccess');
const directives = redirects
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

for (const { source, destination, removedFile } of NON_INDEXED_CONTENT_DECISIONS) {
  assert.deepEqual(
    firstRedirect(source),
    { status: 301, destination },
    `${source} should redirect permanently and directly to ${destination}`,
  );
  assert.equal(
    firstRedirect(destination),
    null,
    `${destination} should not start another redirect`,
  );
  assert.equal(
    fs.existsSync(path.join(root, removedFile)),
    false,
    `${removedFile} should remain removed so the redirected URL does not enter the sitemap`,
  );
}

const coraza = read('blog/en/blog/2023/09/08/APISIX-integrates-with-Coraza.md');
assert.match(coraza, /Coraza Proxy Wasm 0\.6\.0/);
assert.match(coraza, /CORAZA_SHA256=cca4e3c75cf6b2e615907f936a1b6dcd0955250e0fb7d3b1c2ecef807d84603c/);
assert.match(coraza, /sha256sum --check --strict/);
assert.match(coraza, /requires tuning/i);
assert.match(coraza, /issues\/309/);
assert.match(coraza, /do not rely on this integration for request-body protection/i);
assert.doesNotMatch(coraza, /23,000|0\.2 milliseconds|officially supported in version 3\.6\.0/);
const corazaCrsExample = coraza.split('## Evaluate the OWASP Core Rule Set')[1].split('## Tune the WAF before production')[0];
assert.match(corazaCrsExample, /apisix\/admin\/routes\/coraza-crs-test/);
assert.match(corazaCrsExample, /"uri": "\/crs-test\/\*"/);
assert.match(corazaCrsExample, /"plugins": \{/);
assert.match(corazaCrsExample, /"upstream": \{/);

const corazaZh = read('blog/zh/blog/2023/09/08/apisix-integrates-with-coraza.md');
assert.match(corazaZh, /Coraza Proxy Wasm 0\.6\.0/);
assert.match(corazaZh, /CORAZA_SHA256=cca4e3c75cf6b2e615907f936a1b6dcd0955250e0fb7d3b1c2ecef807d84603c/);
assert.match(corazaZh, /sha256sum --check --strict/);
assert.match(corazaZh, /issues\/309/);
assert.match(corazaZh, /不应依赖该集成提供请求体防护/);
assert.match(corazaZh, /\/learning-center\/api-gateway-authentication\//);
assert.match(corazaZh, /\/learning-center\/api-gateway-security\//);
assert.doesNotMatch(corazaZh, /单核 QPS 高达 23000|平均延迟仅为 0\.2 毫秒|3\.6\.0 版本将正式支持/);
const corazaCrsExampleZh = corazaZh.split('## 评估 OWASP Core Rule Set')[1].split('## 投入生产前进行调优')[0];
assert.match(corazaCrsExampleZh, /apisix\/admin\/routes\/coraza-crs-test/);
assert.match(corazaCrsExampleZh, /"uri": "\/crs-test\/\*"/);
assert.match(corazaCrsExampleZh, /"plugins": \{/);
assert.match(corazaCrsExampleZh, /"upstream": \{/);

const oidc = read('blog/en/blog/2023/03/09/authenticate-openid-connect.md');
assert.match(oidc, /apache\/apisix:3\.18\.0-debian/);
assert.match(oidc, /16 characters/);
assert.match(oidc, /Microsoft Entra ID/);
assert.match(oidc, /docker compose up --detach --force-recreate apisix/);
assert.match(oidc, /clear the APISIX session cookie or use a private browser window/);
assert.doesNotMatch(oidc, /RFC 7469|Put whatever you want|Azure AD/);

assert.match(
  read('website/learning-center/api-gateway-security.md'),
  /\/blog\/2023\/09\/08\/APISIX-integrates-with-Coraza\//,
);
assert.match(
  read('website/learning-center/api-gateway-security.md'),
  /evaluate Coraza Proxy Wasm with APISIX/,
);
assert.match(
  read('website/learning-center/api-gateway-authentication.md'),
  /\/blog\/2023\/03\/09\/authenticate-openid-connect\//,
);

console.log(`Validated ${NON_INDEXED_CONTENT_DECISIONS.length} content consolidation decisions and refreshed Coraza/OIDC guides.`);
