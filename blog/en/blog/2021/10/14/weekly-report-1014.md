---
title: Bieekly Report (Oct 1 - Oct 14)
keywords:
- Apache APISIX
- Community Weekly
- APISIX
- API Gateway
- Contributor
description: The Apache APISIX Community Weekly Newsletter hopes to help community members better understand the weekly progress of the Apache APISIX community.
tags: [Community]
---
> From 10.1 to 10.14, 27 developers have committed 67 commits to Apache APISIX. Thank you to these folks for making the Apache APISIX project better with your selfless efforts!
<!--truncate-->

## Introduction

Apache APISIX has grown as a community since the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements could not have been achieved without the joint efforts of our community partners.

"If you want to go fast, go alone. If you want to go far, go together", Apache APISIX Community Weekly Report hopes to help community members better grasp the weekly progress of the Apache APISIX community and facilitate your participation in the Apache APISIX community.

We've also put together some issues for those new to the community!

## Contributor statistics

![This week's contributor list](https://static.apiseven.com/202108/1634183939241-a87516e5-cb52-4532-87e2-306c09155a70.png)

![New contributors this week](https://static.apiseven.com/202108/1634183019951-bcf250cd-e5b5-443e-afc4-3cfdef0d6eab.jpg)

## Good first issue

### Issue #5165

**Link**: https://github.com/apache/apisix/issues/5165

**Problem Description**:

- When a browser publishes across domains and then displays a CORS error, the login for the `wolf-rbac` plugin `url/apisix/plugin/wolf-rbac/login` returns `json` format, but the `header` gives a content type of `text/plain`, please change the content type to `application/json` after the plugin login.

- The login for `wolf-rabc` `uri/apisix/plugin/wolf-rbac/login` will lose the CORS plugin with the added header.

### Issue #5192

**Link**: https://github.com/apache/apisix/issues/5192

**Problem Description**: When installing APISIX dependencies, different Linux distributions will have different executions. Is it possible to merge these different executions into "install-dependencise.sh" to make it easier for users to install dependencies?

## Feature highlights of the week

- [Dashboard support for configuring the host field in Service to provide routing defaults](https://github.com/apache/apisix-dashboard/pull/2149) (Contributor: [bzp2010](https://github.com/bzp2010))

- [APISIX support test profile](https://github.com/apache/apisix/pull/5171) (Contributor: [nic-chen](https://github.com/nic-chen))

- [APISIX adds ldap-auth plugin](https://github.com/apache/apisix/pull/3894) (Contributor: [jp-gouin](https://github.com/jp-gouin))

## Recommended blog posts for this week

- [New milestone for the Apache APISIX community - topping 300 contributors worldwide!](https://apisix.apache.org/zh/blog/2021/10/13/celebrating-300-contributors-of-apisix).

  The Apache APISIX community has reached a new milestone, surpassing 300 global contributors to projects related to Apache APISIX! Just 3 months after the Apache APISIX main repository reached the 200 contributor milestone! Thank you to our community contributors for their outstanding contributions in all aspects of code, documentation, operations, and more.

- [Apache APISIX community members help openEuler release first community innovation version](https://apisix.apache.org/zh/blog/2021/10/01/openEuler)

  Zexuan Luo and Ming Wen from the Apache APISIX community contributed to the first community innovation release of openEuler (openEuler 21.09) on September 30, which allowed OpenResty to run smoothly and efficiently on the Euler open source operating system. The stable operation of OpenResty also means that Apache APISIX can run smoothly on the openEuler system, and the underlying Apache APISIX is based on OpenResty for some development.

- [Apache APISIX 2.10.0 is released, bringing the first LTS version!](https://apisix.apache.org/zh/blog/2021/09/29/release-apache-apisix-2.10)

  Apache APISIX version 2.10 is officially released! 🎉 This is the first LTS release of Apache APISIX, with support for 10+ new features and new plugins. Have a quick read about the new features in version 2.10!
