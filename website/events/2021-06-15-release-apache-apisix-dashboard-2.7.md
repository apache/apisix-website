---
title: Release Apache APISIX Dashboard 2.7
keywords:
- APISIX
- api6
- API gateway
- API hosting
- Security
- Apache APISIX
- apisix gateway
- Ingress Controller
- Service Mesh
- Microservices
- Subscribe Guide
- Release Notes
- Apache APISIX Dashboard 2.7
- APISIX Dashboard 2.7
description: Apache APISIX Dashboard 2.7 is released on June 15th, 2021. This article is the release notes for Apache APISIX Dashboard 2.7, it contains core features updates, bug fixes, and test cases updates information of Apache APISIX Dashboard 2.7.
---

<!--truncate-->
This release mainly improves basic features, bugfix and adds test cases.

`Manager API` 2.7 should be used with [Apache APISIX 2.6](https://apisix.apache.org/downloads/). It is not recommended to use with other Apache APISIX versions.

### Core

- Feat: support HTTPS for Manager API [#1824](https://github.com/apache/apisix-dashboard/pull/1824)
- Feat: run manager-api as an OS agnostic service [#1667](https://github.com/apache/apisix-dashboard/pull/1667)
- Feat: refactor Plugin Orchestration [#1813](https://github.com/apache/apisix-dashboard/pull/1813)
- Feat: add the service page upstream select option [#1633](https://github.com/apache/apisix-dashboard/pull/1633)
- Feat: improve the Duplicate Route feature [#1833](https://github.com/apache/apisix-dashboard/pull/1833)
- Feat: add api of config migrate, export and import [#1893](https://github.com/apache/apisix-dashboard/pull/1893)

### Bugfix

- Fix: can not configure upstream with no nodes [#1812](https://github.com/apache/apisix-dashboard/pull/1812)
- Fix: add missing label in nodes component [#1823](https://github.com/apache/apisix-dashboard/pull/1823)
- Fix: when create the upstream, some properties can still be edited on the preview page bug [#1828](https://github.com/apache/apisix-dashboard/pull/1828)
- Fix: default cors plugin formdata validation error [#1855](https://github.com/apache/apisix-dashboard/pull/1855)
- Fix: generate a uid when post a route without id [#1883](https://github.com/apache/apisix-dashboard/pull/1883)
- Fix: route page Portable [#1887](https://github.com/apache/apisix-dashboard/pull/1887)
- Fix: invalid import issues [#1899](https://github.com/apache/apisix-dashboard/pull/1899)
- Fix: efficient error handling in manager-api including graceful shutdown, self contained methods. [#1814](https://github.com/apache/apisix-dashboard/pull/1814)
- Fix: regex & omit vars when no value [#1921](https://github.com/apache/apisix-dashboard/pull/1921)

### Test Case

- Test: fix unstable FE E2E test case [#1826](https://github.com/apache/apisix-dashboard/pull/1826)
- CI: fix gitleaks not allowed running [#1897](https://github.com/apache/apisix-dashboard/pull/1897)
- Test: refactor FE E2E test case ([#1844](https://github.com/apache/apisix-dashboard/pull/1844) to [#1878](https://github.com/apache/apisix-dashboard/pull/1878) and a series of PRs)
