---
title: Release Apache APISIX 2.4
---

<!--truncate-->

### Change

- change: global rules should not be executed on the internal api by default [#3396](https://github.com/apache/apisix/pull/3396)
- change: default to cache DNS record according to the TTL [#3530](https://github.com/apache/apisix/pull/3530)

### Core

- :sunrise: feat: support SRV record [#3686](https://github.com/apache/apisix/pull/3686)
- :sunrise: feat: add dns discovery [#3629](https://github.com/apache/apisix/pull/3629)
- :sunrise: feat: add consul kv discovery module [#3615](https://github.com/apache/apisix/pull/3615)
- :sunrise: feat: support to bind plugin config by `plugin_config_id` [#3567](https://github.com/apache/apisix/pull/3567)
- :sunrise: feat: support listen http2 with plaintext [#3547](https://github.com/apache/apisix/pull/3547)
- :sunrise: feat: support DNS AAAA record [#3484](https://github.com/apache/apisix/pull/3484)

### Plugin

- :sunrise: feat: the traffic-split plugin supports `upstream_id` [#3512](https://github.com/apache/apisix/pull/3512)
- :sunrise: feat(zipkin): support b3 req header [#3551](https://github.com/apache/apisix/pull/3551)

### Bugfix

- fix(chash): ensure retry can try every node [#3651](https://github.com/apache/apisix/pull/3651)
- fix: script does not work when the route is bound to a service [#3678](https://github.com/apache/apisix/pull/3678)
- fix: use openssl111 in openresty dir in precedence [#3603](https://github.com/apache/apisix/pull/3603)
- fix(zipkin): don't cache the per-req sample ratio [#3522](https://github.com/apache/apisix/pull/3522)

For more changes, please refer to [Milestone](https://github.com/apache/apisix/milestone/13)
