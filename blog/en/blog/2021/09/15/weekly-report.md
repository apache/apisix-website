---
title: BiWeekly Report (Aug 30 - Sep 15)
keywords:
  - Apache APISIX
  - API Gateway
  - contributor
  - Good first issue
description: The Apache APISIX community has added features related to the APISIX Dashboard, the Admin API and Control API, and the proxy-mirror plugin in the last two weeks.
tags: [Community]
---

> 33 developers have committed 130 commits to Apache APISIX in the last two weeks since 8.30. Thank you to the following people for adding to Apache APISIX (in no particular order), your selfless work makes the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community since its first day of open source and has quickly become the most active open source API gateway project in the world. These achievements could not have been achieved without the joint efforts of our community partners.

"The Apache APISIX Community Weekly Newsletter hopes to help community members better grasp the weekly progress of the Apache APISIX community and facilitate your participation in the Apache APISIX community.

We've also put together some issues for those new to the community! If you are interested, don't miss them!

## Contributor statistics

From 8.30-9.12, 33 developers submitted 130 commits to Apache APISIX, and we thank the following people for their contributions to Apache APISIX (in no particular order).

![contributor](https://static.apiseven.com/202108/1631754498946-7d655f8e-3881-4594-b029-a67189a63ffa.jpg)

![committer](https://static.apiseven.com/202108/1631676136968-13216876-e9f6-4852-95b4-6f73db5cb405.30-9)

## Good first issue

### Issue #4906

**Link**: [#4906](https://github.com/apache/apisix/issues/4906)

**Problem Description**: When testing Apache APISIX load balancing with two internal domains and adding pass_host: node with active health check enabled, I found that it still routes to the faulty host.

```Shell
for i in $(seq 1 1000); do curl  -H "Host: httpbin.org" ${APISIX_GATEWAY_URL}  ; done
apple
apple
<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>nginx/1.17.7</center>
</body>
</html>
apple
apple
apple
<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>nginx/1.17.7</center>
</body>
</html>
apple
apple
apple
apple
apple
```

### Issue #4945

**Link**: [#4945](https://github.com/apache/apisix/issues/4945)

**Problem Description**: I am having problems trying to download Apache APISIX version 2.9 on a Macbook with M1 system according to the related guide article. The prompt is as follows.

```Apache
lualogging 1.5.2-1 depends on luasocket (3.0rc1-2 installed)
lualogging 1.5.2-1 is now installed in /Users/juzhiyuan/workspace/apisix-2.9/apache-apisix-2.9-src/deps (license: MIT/X11)

casbin 1.26.0-1 depends on lrexlib-pcre >= 2.9.1 (not installed)
Installing https://luarocks.org/lrexlib-pcre-2.9.1-1.src.rock

Error: Failed installing dependency: https://luarocks.org/casbin-1.26.0-1.rockspec - Failed installing dependency: https://luarocks.org/lrexlib-pcre-2.9.1-1.src.rock - Could not find header file for PCRE
  No file pcre.h in /usr/local/include
  No file pcre.h in /usr/include
  No file pcre.h in /include
You may have to install PCRE in your system and/or pass PCRE_DIR or PCRE_INCDIR to the luarocks command.
Example: luarocks install lrexlib-pcre PCRE_DIR=/usr/local
make: *** [deps] Error 1
```

## Recent feature highlights

- [referer-restriction support for configuring blacklist and message](https://github.com/apache/apisix/pull/4916)(contributor: okaybase)
- [node_listen and admin_listen support richer configuration forms](https://github.com/apache/apisix/pull/4856)(contributor: wayne-cheng), [additional reference](https://github.com/apache/apisix/pull/4967)
- [admin-api support for returning stream type plugin information](https://github.com/apache/apisix/pull/4947)(Contributor: spacewander)
- [Support for configuring fallback SNI](https://github.com/apache/apisix/pull/5000)(Contributed by spacewander)
- [proxy-mirror support for scaled mirror requests](https://github.com/apache/apisix/pull/4965)(Contributor: okaybase)
- [Control API adds dump routing configuration](https://github.com/apache/apisix/pull/5011)(Contributor: Zheaoli)
- [dashboard Support Service Discovery Configuration](https://github.com/apache/apisix-dashboard/pull/2081)(Contributor: bzp2010)
- [dashboard Route advanced configuration conditions support built-in parameter configuration](https://github.com/apache/apisix-dashboard/pull/1984)(contributor: lookbrook)
- [dashboard Upstream support for Keepalive Pool configuration](https://github.com/apache/apisix-dashboard/pull/2117)(Contributor: bzp2010)

The Apache APISIX project website and the issue on Github have accumulated a wealth of documentation and experience, if you encounter problems you can read the documentation, search in the issue with keywords, and also participate in the discussion on the issue to put forward their ideas and practical experience.

## Recent Blog Posts Recommended

- [Apache APISIX Community Weekly Report ｜ 2021 8.23-8.29](https://apisix.apache.org/blog/2021/08/30/weekly-report/)

  "The Apache APISIX Community Weekly Report hopes to help community members better grasp the weekly progress of the Apache APISIX community and facilitate your participation in the Apache APISIX community.

- [Apache APISIX Delivers a Better Gateway and K8S Ingress Controller for KubeSphere](https://apisix.apache.org/blog/2021/08/31/Apache%20APISIX%20%C3%97%20KubeSphere-a-better-gateway-and-K8S-Ingress-Controller/)

  This article describes how to deploy APISIX and APISIX Ingress Controller directly in KubeSphere. APISIX can be used to carry business traffic by acting as a gateway, or a data plane for APISIX Ingress Controller.

- [Heard you have something to say about Apache APISIX? Here's your chance](https://apisix.apache.org/blog/2021/09/15/weekly-report/)

  We invite you to participate in the Apache APISIX User Survey, and your feedback will directly influence our future development. We will randomly select a number of lucky stars who will have a chance to win a small gift from the Apache APISIX community!

- [Using Apache APISIX and Okta for Authentication](https://apisix.apache.org/blog/2021/08/16/Using-the-Apache-APISIX-OpenID-Connect-Plugin-for-Centralized-Authentication/)

  This article describes how to use Apache APISIX to configure Okta authentication to switch from traditional authentication mode to centralized authentication mode, getting rid of multiple accounts, multiple passwords, duplicate authentication and other pain points faced by many developers.

## About Apache APISIX

Apache APISIX is a dynamic, real-time, high-performance open source API gateway that provides rich traffic management features such as load balancing, dynamic upstream, canary release, service meltdown, authentication, observability, etc. Apache APISIX helps enterprises quickly and securely handle API and microservice traffic, including gateways, Kubernetes Ingress and Service Grid.

Apache APISIX has been used by hundreds of enterprises worldwide to handle business-critical traffic, including finance, Internet, manufacturing, retail, carriers, and more, such as NASA, the European Union's Digital Factory, China Airlines, China Mobile, Tencent, Huawei, Weibo, NetEase, Shell, 360, Taikang, and Nespresso Tea.

More than 200 contributors have come together to create Apache APISIX, the world's most active open source gateway project. Smart developers! Come join this active and diverse community and come together to bring more good things to the world!

- [Apache APISIX GitHub](https://github.com/apache/apisix)
- [Apache APISIX Website](https://apisix.apache.org/)
- [Apache APISIX Docs](https://apisix.apache.org/zh/docs/apisix/getting-started)
