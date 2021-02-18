---
title: Release Apache APISIX 2.3
---

<!--truncate-->

### Change

- fix: use luajit by default when run apisix [#3335](https://github.com/apache/apisix/pull/3335)
- feat: use luasocket instead of curl in etcd.lua [#2965](https://github.com/apache/apisix/pull/2965)

### Core

- :sunrise: feat: support to communicate with etcd by TLS without verification in command line [#3415](https://github.com/apache/apisix/pull/3415)
- :sunrise: feat: chaos test on route could still works when etcd is down [#3404](https://github.com/apache/apisix/pull/3404)
- :sunrise: feat: ewma use p2c to improve performance [#3300](https://github.com/apache/apisix/pull/3300)
- :sunrise: feat: support specifying https in upstream to talk with https backend [#3430](https://github.com/apache/apisix/pull/3430)
- :sunrise: feat: allow customizing lua_package_path & lua_package_cpath [#3417](https://github.com/apache/apisix/pull/3417)
- :sunrise: feat: allow to pass SNI in HTTPS proxy [#3420](https://github.com/apache/apisix/pull/3420)
- :sunrise: feat: support gRPCS [#3411](https://github.com/apache/apisix/pull/3411)
- :sunrise: feat: allow getting upstream health check status via control API [#3345](https://github.com/apache/apisix/pull/3345)
- :sunrise: feat: support dubbo [#3224](https://github.com/apache/apisix/pull/3224)
- :sunrise: feat: load balance by least connections [#3304](https://github.com/apache/apisix/pull/3304)

### Plugin

- :sunrise: feat: kafka-logger implemented reuse kafka producer [#3429](https://github.com/apache/apisix/pull/3429)
- :sunrise: feat(authz-keycloak): dynamic scope and resource mapping. [#3308](https://github.com/apache/apisix/pull/3308)
- :sunrise: feat: proxy-rewrite host support host with port [#3428](https://github.com/apache/apisix/pull/3428)
- :sunrise: feat(fault-injection): support conditional fault injection using nginx variables [#3363](https://github.com/apache/apisix/pull/3363)

### Bugfix

- fix(standalone): require consumer's id to be the same as username [#3394](https://github.com/apache/apisix/pull/3394)
- fix: support upstream_id & consumer with grpc [#3387](https://github.com/apache/apisix/pull/3387)
- fix: set conf info when global rule is hit without matched rule [#3332](https://github.com/apache/apisix/pull/3332)
- fix: avoid caching outdated discovery upstream nodes [#3295](https://github.com/apache/apisix/pull/3295)
- fix: create the health checker in `access` phase [#3240](https://github.com/apache/apisix/pull/3240)
- fix: make set_more_retries() work when upstream_type is chash [#2676](https://github.com/apache/apisix/pull/2676)

For more changes, please refer to [Milestone](https://github.com/apache/apisix/milestone/12)
