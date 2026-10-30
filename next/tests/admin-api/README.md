# Admin API production checks

This suite needs the assembled production site: the current page is Astro,
while the release archives and Next are Docusaurus. Serve that output, then run:

```sh
cd next
ADMIN_API_BASE_URL=http://127.0.0.1:4322 npm run test:admin-api
```

The existing Playwright configuration runs desktop and mobile Chromium. The
suite checks both locales for the current 3.19 page, 3.16–3.18 archives, and
Next. Success tests
require their actual synced canonical English specifications; they must not be
reported as passed by substituting another release's JSON. Failure tests
intercept requests to exercise missing, malformed, failed and timed-out JSON,
and a failed Scalar script. A separate context checks disabled JavaScript.

Before calling a PR ready, run `node next/scripts/check-admin-api-sources.mjs`
from the repository root. This readiness gate must pass against real synced
sources; it is separate from production builds, which retain Markdown when a
source is absent or invalid. Sync and build from these apache/apisix refs:

- current: `release/3.19`
- archives: `release/3.16`, `release/3.17`, and `release/3.18`
- Next: `master`

The archive and Next syncs copy `docs/en/latest/admin-api.json` byte-for-byte to
`doc/static/assets/openapi/apisix/<version>/admin-api.json`. Both locales use
the same asset for each version. Missing sources remove stale assets and retain
Markdown. Other release archives continue using Markdown.
The assembled deployment already ships `doc/build/assets`, so no external
specification request or additional deployment copy step is needed.

Run the small source/validation checks with Node 22.18+:

```sh
node --test shared/admin-api-spec.test.mjs scripts/lib/admin-api.test.js
```

## Immutable canonical validation fixtures

`source-fixtures.json` pins the merged release and master specifications in
`apache/apisix` for reproducible tests. Production synchronization continues
to use the corresponding Apache branches.

After preparing generated static assets from those exact commits, check them
without fetching or changing any content:

```sh
node next/scripts/check-admin-api-fixtures.mjs /path/to/apisix-fixture-checkout doc/static/assets/openapi/apisix
```

| Canonical Apache ref | Immutable source |
| --- | --- |
| `release/3.16` | https://github.com/apache/apisix/commit/ae0dc4a842b3855a8ac71db97e659231d5592167 |
| `release/3.17` | https://github.com/apache/apisix/commit/9fae9b644357281976463626c624064c0464b5a1 |
| `release/3.18` | https://github.com/apache/apisix/commit/8d7e45597a065472ba33672581fb7fbafff523ca |
| `master` | https://github.com/apache/apisix/commit/88a41b7f30da10072294ae48b1d1d7369452b1ac |

Run the fixture check against an `apache/apisix` checkout containing the pinned
commit. Report fixture, canonical-source, build, and browser results separately.
