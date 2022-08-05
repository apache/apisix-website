---
title: Biweekly Report (Feb 15 - Feb 28)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: API Gateway The Apache APISIX community has supported mocking, clickhouse plugins, and support for Kubernetes as a service discovery for the last two weeks.
tags: [Community]
---

> From 2.15 to 2.28, 43 contributors submitted 101 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1646206544039-67c75831-7452-40be-a635-2cc6bb6d02b3.jpg)

![New Contributors](https://static.apiseven.com/202108/1646206544068-9811972f-18f8-47a3-a028-06f94d07936f.jpg)

## Good first issue

### Issue #920

**Link**: https://github.com/apache/apisix-website/issues/920

**Issue description**:

When submitting a pull request to add a new blog to the website's blog section, usually we need to submit 2 files, one in English and the other in Chinese.

As the community grows, blog in both languages are becoming more diverging than before. Thus, writing and submitting blogs in single-language is the trend.

But the actual behavior is that: when submitting an English blog, and clicking the language conversion button on the top-right corner, it would jump to the default 404 page. I am wondering if there is any chance to enhance the reading experience on this part.

### Issue #6460

**Link**: https://github.com/apache/apisix/issues/6460

**Issue description**:

Using the `authz-keycloak` plugin when access is not permitted you correctly receive an access denied message in the body of the requested url.

```Json
{"error":"access_denied","error_description":"not_authorized"}
```

Is it possible to specify a redirect url to be used when the access is denied so the user see predefined page instead of a message?

## Highlights of Recent Features

- [Push access log to clickhouse DB](https://github.com/apache/apisix/pull/6215)(Contributor: [zhendongcmss](https://github.com/zhendongcmss))

- [Add Kubernetes discovery module](https://github.com/apache/apisix/pull/4880)(Contributor: [zhixiongdu027](https://github.com/zhixiongdu027))

- [Add config to control return all status at X-APISIX-Upstream-Status](https://github.com/apache/apisix/pull/6392)（Contributor: [liangliang4ward](https://github.com/liangliang4ward))

- [Add `mocking` plugin](https://github.com/apache/apisix/pull/5940)(Contributor: [Drery](https://github.com/Drery))

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [The practice of Nacos service discovery on API Gateway](https://apisix.apache.org/blog/2022/02/21/nacos-api-gateway)：

  This article introduces the basic concepts of Apache APISIX and Nacos and Service Registry, and shows you the practice of Nacos service discovery on API Gateway.

- [Apache APISIX Enhances API Security by CSRF Plugin](https://apisix.apache.org/blog/2022/02/23/csrf-api-gateway):

  This article introduces `csrf`, the CSRF security plugin for Apache APISIX, and details how to secure your API information in Apache APISIX with the help of the `csrf` plugin.

- [How to Integrate API Gateway and Consul?](https://apisix.apache.org/blog/2022/02/25/consul-api-gateway):

  Apache APISIX supports the Consul KV-based service discovery registry. This article will walk you through the process of implementing service discovery and service registry in Apache APISIX.
