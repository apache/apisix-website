---
title: Release Apache APISIX Dashboard 2.6
---

<!--truncate-->
This release mainly improves UI and UE, bugfix and adds test cases.

`Manager API` 2.6 should be used with [Apache APISIX 2.5](https://apisix.apache.org/downloads/). It is not recommended to use with other Apache APISIX versions.

### Core

- Change: remove listen.host from api/conf/conf.yaml [#1767](https://github.com/apache/apisix-dashboard/pull/1767)
- Change: remove ID of consumer [#1745](https://github.com/apache/apisix-dashboard/pull/1745)
- Feat: Support duplicate one existing Route [#1558](https://github.com/apache/apisix-dashboard/pull/1558)
- Feat: add response header in debug view [#1691](https://github.com/apache/apisix-dashboard/pull/1691)
- Feat: add basic-auth UI Form [#1718](https://github.com/apache/apisix-dashboard/pull/1718)
- Feat: add limit-count plugin form [#1739](https://github.com/apache/apisix-dashboard/pull/1739)
- Feat: add referer-restriction plugin form [#1727](https://github.com/apache/apisix-dashboard/pull/1727)
- Feat: added cors plugin form [#1733](https://github.com/apache/apisix-dashboard/pull/1733)
- Feat: added limit-req plugin form [#1732](https://github.com/apache/apisix-dashboard/pull/1732)
- Feat: add api-breaker plugin form [#1730](https://github.com/apache/apisix-dashboard/pull/1730)
- Feat: add proxy-mirror plugin form [#1725](https://github.com/apache/apisix-dashboard/pull/1725)
- Feat: add limit-conn plugin form [#1728](https://github.com/apache/apisix-dashboard/pull/1728)
- Feat: refactor upstream form module [#1726](https://github.com/apache/apisix-dashboard/pull/1726)
- Feat: added types for Plugins [#1736](https://github.com/apache/apisix-dashboard/pull/1736)
- Feat: support auto build rpm package for dashboard [#1766](https://github.com/apache/apisix-dashboard/pull/1766)
- Feat: improve UI and UE ([#1674](https://github.com/apache/apisix-dashboard/pull/1674), [#1702](https://github.com/apache/apisix-dashboard/pull/1702), [#1707](https://github.com/apache/apisix-dashboard/pull/1707),[#1715](https://github.com/apache/apisix-dashboard/pull/1715), [#1723](https://github.com/apache/apisix-dashboard/pull/1723), [#1782](https://github.com/apache/apisix-dashboard/pull/1782), [#1610](https://github.com/apache/apisix-dashboard/pull/1610), [#1764](https://github.com/apache/apisix-dashboard/pull/1764), [#1735](https://github.com/apache/apisix-dashboard/pull/1735), [#1771](https://github.com/apache/apisix-dashboard/pull/1771), [#1748](https://github.com/apache/apisix-dashboard/pull/1748), [#1749](https://github.com/apache/apisix-dashboard/pull/1749), [#1751](https://github.com/apache/apisix-dashboard/pull/1751), [#1679](https://github.com/apache/apisix-dashboard/pull/1679), [#1750](https://github.com/apache/apisix-dashboard/pull/1750), [#1731](https://github.com/apache/apisix-dashboard/pull/1731), [#1747](https://github.com/apache/apisix-dashboard/pull/1747))

### Bugfix

- Fix: unable to export route with nil methods field [#1673](https://github.com/apache/apisix-dashboard/pull/1673)
- Fix: incorrect conversion between integer types [#1753](https://github.com/apache/apisix-dashboard/pull/1753)
- Fix: user login request should remove its own prefix option [#1701](https://github.com/apache/apisix-dashboard/pull/1701)
- Fix: show correct health checker [#1784](https://github.com/apache/apisix-dashboard/pull/1784)

### Test Case

- Test: use gomega match assertion [#1678](https://github.com/apache/apisix-dashboard/pull/1678)
- Test: updated cli_test.sh according reg ex [#1696](https://github.com/apache/apisix-dashboard/pull/1696)
- Test: reduce FE e2e ci time [#1698](https://github.com/apache/apisix-dashboard/pull/1698) [#1762](https://github.com/apache/apisix-dashboard/pull/1762)
- Test: adding a retry mechanism to FE testing [#1752](https://github.com/apache/apisix-dashboard/pull/1752)
- Test: fix online debug test case [#1761](https://github.com/apache/apisix-dashboard/pull/1761)
- Test: write backend e2e with ginkgo ([#1663](https://github.com/apache/apisix-dashboard/pull/1663), [#1677](https://github.com/apache/apisix-dashboard/pull/1677), [#1675](https://github.com/apache/apisix-dashboard/pull/1675), [#1676](https://github.com/apache/apisix-dashboard/pull/1676), [#1704](https://github.com/apache/apisix-dashboard/pull/1704), [#1755](https://github.com/apache/apisix-dashboard/pull/1755))

### Doc

- Docs: add more details and examples to import openapi guide [#1672](https://github.com/apache/apisix-dashboard/pull/1672)
