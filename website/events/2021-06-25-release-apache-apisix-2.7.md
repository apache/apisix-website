---
title: Release Apache APISIX 2.7
keywords:
- apisix
- APISIX
- api6
- API gateway
- API hosting
- Security
- Apache APISIX
- apache apisix
- apisix gateway
- Ingress Controller
- Service Mesh
- Microservices
- Release Notes
- Apache APISIX 2.7
- APISIX 2.7
description: Apache APISIX 2.7 is released on June 25th, 2021. This article is the release notes for Apache APISIX 2.7, it contains changes, core feature updates, plugins updates and bug fixes information of Apache APISIX 2.7.
---

<!--truncate-->

### Change

- change: check metadata_schema with check_schema like the other schema [#4381](https://github.com/apache/apisix/pull/4381)
- change(echo): remove odd auth_value [#4055](https://github.com/apache/apisix/pull/4055)
- fix(admin): correct the resources' count field and change its type to integer [#4385](https://github.com/apache/apisix/pull/4385)

### Core

- :sunrise: feat(stream): support client certificate verification [#4445](https://github.com/apache/apisix/pull/4445)
- :sunrise: feat(stream): accept tls over tcp [#4409](https://github.com/apache/apisix/pull/4409)
- :sunrise: feat(stream): support domain in the upstream [#4386](https://github.com/apache/apisix/pull/4386)
- :sunrise: feat(cli): wrap nginx quit cmd [#4360](https://github.com/apache/apisix/pull/4360)
- :sunrise: feat: allow to set custom timeout for route [#4340](https://github.com/apache/apisix/pull/4340)
- :sunrise: feat: nacos discovery support group [#4325](https://github.com/apache/apisix/pull/4325)
- :sunrise: feat: nacos discovery support namespace [#4313](https://github.com/apache/apisix/pull/4313)

### Plugin

- :sunrise: feat(client-control): set client_max_body_size dynamically [#4423](https://github.com/apache/apisix/pull/4423)
- :sunrise: feat(ext-plugin): stop the runner with SIGTERM [#4367](https://github.com/apache/apisix/pull/4367)
- :sunrise: feat(limit-req) support nodelay [#4395](https://github.com/apache/apisix/pull/4395)
- :sunrise: feat(mqtt-proxy): support domain [#4391](https://github.com/apache/apisix/pull/4391)
- :sunrise: feat(redirect): support appending query string [#4298](https://github.com/apache/apisix/pull/4298)

### Bugfix

- fix: solve memory leak when the client aborts [#4405](https://github.com/apache/apisix/pull/4405)
- fix(etcd): check res.body.error before accessing the data [#4371](https://github.com/apache/apisix/pull/4371)
- fix(ext-plugin): when token is stale, refresh token and try again [#4345](https://github.com/apache/apisix/pull/4345)
- fix(ext-plugin): pass environment variables [#4349](https://github.com/apache/apisix/pull/4349)
- fix: ensure the plugin is always reloaded [#4319](https://github.com/apache/apisix/pull/4319)
