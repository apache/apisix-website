---
title: Release Apache APISIX 2.5
---

<!--truncate-->

### Change

- change(zipkin): rearrange the child span [#3877](https://github.com/apache/apisix/pull/3877)

### Core

- :sunrise: feat: support mTLS with etcd [#3905](https://github.com/apache/apisix/pull/3905)
- :sunrise: feat: upgrade lua-resty-expr/radixtree to support logical expression [#3809](https://github.com/apache/apisix/pull/3809)
- :sunrise: feat: load etcd configuration when apisix starts [#3799](https://github.com/apache/apisix/pull/3799)
- :sunrise: feat: let balancer support priority [#3755](https://github.com/apache/apisix/pull/3755)
- :sunrise: feat: add control api for discovery module [#3742](https://github.com/apache/apisix/pull/3742)

### Plugin

- :sunrise: feat(skywalking):  allow destroy and configure report interval for reporter [#3925](https://github.com/apache/apisix/pull/3925)
- :sunrise: feat(traffic-split): the upstream pass_host needs to support IP mode [#3870](https://github.com/apache/apisix/pull/3870)
- :sunrise: feat: Add filter on HTTP methods for consumer-restriction plugin [#3691](https://github.com/apache/apisix/pull/3691)
- :sunrise: feat: add allow_origins_by_regex to cors plugin [#3839](https://github.com/apache/apisix/pull/3839)
- :sunrise: feat: support conditional response rewrite [#3577](https://github.com/apache/apisix/pull/3577)

### Bugfix

- fix(error-log-logger): the logger should be run in each process [#3912](https://github.com/apache/apisix/pull/3912)
- fix: use the builtin server by default [#3907](https://github.com/apache/apisix/pull/3907)
- fix(traffic-split): binding upstream via upstream_id is invalid [#3842](https://github.com/apache/apisix/pull/3842)
- fix: correct the validation for ssl_trusted_certificate [#3832](https://github.com/apache/apisix/pull/3832)
- fix: don't override cache relative headers [#3789](https://github.com/apache/apisix/pull/3789)
- fix: fail to run `make deps` on macOS [#3718](https://github.com/apache/apisix/pull/3718)
