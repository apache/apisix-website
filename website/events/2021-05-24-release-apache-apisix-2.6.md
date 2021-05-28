---
title: Release Apache APISIX 2.6
---

<!--truncate-->

### Change

- change(prometheus): redesign the latency metrics & update grafana [#3993](https://github.com/apache/apisix/pull/3993)
- change(prometheus): don't expose metrics to internet [#3994](https://github.com/apache/apisix/pull/3994)
- change(limit-count): ensure redis cluster name is set correctly [#3910](https://github.com/apache/apisix/pull/3910)
- change: drop support of OpenResty 1.15 [#3960](https://github.com/apache/apisix/pull/3960)

### Core

- :sunrise: feat: support passing different host headers in multiple nodes [#4208](https://github.com/apache/apisix/pull/4208)
- :sunrise: feat: add 50x html for error page [#4164](https://github.com/apache/apisix/pull/4164)
- :sunrise: feat: support to use upstream_id in stream_route [#4121](https://github.com/apache/apisix/pull/4121)
- :sunrise: feat: support client certificate verification [#4034](https://github.com/apache/apisix/pull/4034)
- :sunrise: feat: add nacos support [#3820](https://github.com/apache/apisix/pull/3820)
- :sunrise: feat: patch tcp.sock.connect to use our DNS resolver [#4114](https://github.com/apache/apisix/pull/4114)

### Plugin

- :sunrise: feat(redirect): support uri encoding [#4244](https://github.com/apache/apisix/pull/4244)
- :sunrise: feat(key-auth): allow customizing header [#4013](https://github.com/apache/apisix/pull/4013)
- :sunrise: feat(response-rewrite): allow using variable in the header [#4194](https://github.com/apache/apisix/pull/4194)
- :sunrise: feat(ext-plugin): APISIX can support Java, Go and other languages to implement custom plugin [#4183](https://github.com/apache/apisix/pull/4183)

### Bugfix

- fix(DNS): support IPv6 resolver [#4242](https://github.com/apache/apisix/pull/4242)
- fix(healthcheck): only one_loop is needed in the passive health check report [#4116](https://github.com/apache/apisix/pull/4116)
- fix(traffic-split): configure multiple "rules", the request will be confused between upstream [#4092](https://github.com/apache/apisix/pull/4092)
- fix: ensure upstream with domain is cached [#4061](https://github.com/apache/apisix/pull/4061)
- fix: be compatible with the router created before 2.5 [#4056](https://github.com/apache/apisix/pull/4056)
- fix(standalone): the conf should be available during start [#4027](https://github.com/apache/apisix/pull/4027)
- fix: ensure atomic operation in limit-count plugin [#3991](https://github.com/apache/apisix/pull/3991)
