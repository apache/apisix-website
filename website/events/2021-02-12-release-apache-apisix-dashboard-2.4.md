---
title: Release Apache APISIX Dashboard 2.4
---

This release mainly improves basic features, bugfix and adds test cases.

`Manager API` 2.4 should be used with [Apache APISIX 2.3](https://github.com/apache/apisix/releases/tag/2.3). It is not recommended to use with other Apache APISIX versions.

<!--truncate-->

### Core

- Support to show warning notification when dashboard version not matching apisix. [#1435](https://github.com/apache/apisix-dashboard/pull/1435)
- Support mTLS connection to ETCD. [#1437](https://github.com/apache/apisix-dashboard/pull/1437)
- Support IP allow list. [#1424](https://github.com/apache/apisix-dashboard/pull/1424)
- Support to get manager-api version through API. [#1429](https://github.com/apache/apisix-dashboard/pull/1429)
- Support import route from OpenAPI specification3.0. [#1102](https://github.com/apache/apisix-dashboard/pull/1102)
- Support export route from OpenAPI specification3.0. [#1245](https://github.com/apache/apisix-dashboard/pull/1245)
- Support string type for the script field in Route. [#1289](https://github.com/apache/apisix-dashboard/pull/1289)
- Feat: add script_id field in Route.entity. [#1386](https://github.com/apache/apisix-dashboard/pull/1386)
- Feat: add stop subcommand. [#741](https://github.com/apache/apisix-dashboard/pull/741)
- Feat: add e2e test coverage. [#1270](https://github.com/apache/apisix-dashboard/pull/1270)
- Feat: add returning value for HTTP PUT and PATCH methods. [#1322](https://github.com/apache/apisix-dashboard/pull/1322)
- Feat: user can skip upstream when select service_id [#1302](https://github.com/apache/apisix-dashboard/pull/1302)

### Bugfix

- Fix: add defer recover for goroutines to prevent abnormal crash. [#1419](https://github.com/apache/apisix-dashboard/pull/1419)
- Fix: add version ldflags when building manager-api in Dockerfile. [#1393](https://github.com/apache/apisix-dashboard/pull/1393)
- Fix: Upgrade gjson and protobuf to avoid security problem. [#1366](https://github.com/apache/apisix-dashboard/pull/1366)
- Fix: Incomplete label display. [#1252](https://github.com/apache/apisix-dashboard/pull/1252)
- Fix: Redirect plugin should not show in route step3 [#1276](https://github.com/apache/apisix-dashboard/pull/1276)
- Fix: Editing a Service, the upstream info will be lost. [#1347](https://github.com/apache/apisix-dashboard/pull/1347)

### Test Case

- Use ginkgo framework to do backend E2E testing. [#1319](https://github.com/apache/apisix-dashboard/pull/1319)
- Add action to check the version for release. [#1418](https://github.com/apache/apisix-dashboard/pull/1418)
- Add test for make build. [#1421](https://github.com/apache/apisix-dashboard/pull/1421)
- Remove the etcd dependency in part of unit test. [#1169](https://github.com/apache/apisix-dashboard/pull/1469)
- Skip Cypress binary install when build. [#1248](https://github.com/apache/apisix-dashboard/pull/1248)
- Enhance plugin schema smoke test [#1261](https://github.com/apache/apisix-dashboard/pull/1261)
- Delete unnecessary wait in front-end test. [#1370](https://github.com/apache/apisix-dashboard/pull/1370)
- Add edit the plugin testcase [#1372](https://github.com/apache/apisix-dashboard/pull/1372)

### Doc

- Doc: add document for introducing backend e2e test. [#1381](https://github.com/apache/apisix-dashboard/pull/1381)
