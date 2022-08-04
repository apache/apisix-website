---
title: Biweekly Report (Dec 1 - Dec 15)
keywords:
- Apache APISIX
- Weekly Report
- Contributor
- APISIX
- API Gateway
- Apache
description: The API gateway Apache APISIX has added rocketmq-logger and opa plugins in the past two weeks, as well as Wasm support to run in the rewrite phase.
tags: [Community]
---

> From 12.1 to 12.15, 38 contributors submitted 114 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1639981796665-784d48cd-76ad-4a21-974b-23c5a0dcf1dd.png)

![New Contributors](https://static.apiseven.com/202108/1639981796682-ab41c626-8674-4503-b642-a9714189e51f.png)

## Good first issue

### Issue #5795

**Link**: https://github.com/apache/apisix/issues/5795

**Issue description**:

Sometimes, we just need install etcd, ref here. But install_dependencies.sh not support this feature, it will install all dependencies of APISIX. Should we support install etcd separately in install_dependencies.sh ?

example:

```Nginx
bash install_dependencies.sh etcd
```

### Issue #5756

**Link**: https://github.com/apache/apisix/issues/5756

**Issue description**:

The current openwhisk plugin will take the response from Apache OpenWhisk and return it directly without parsing. This request may contain complex data that rewrites the status code, response headers, and response body. We need to parse it and change the APISIX response.

The complex data like this:

```JSON
{
  "statusCode": 401,
  "headers": {
    "addition-header": "a-header"
  },
  "body": "xxx" | {"xxx":"xxx"}
}
```

We need to determine if the OpenWhisk response contains them, and if they are present, write them to the APISIX response.

### Issue #5634

**Link**: https://github.com/apache/apisix/issues/5634

**Issue description**:

Now, I see we had support `var`, `var_combination` in apisix limit-* plugins yet.

I think we can support a type like `function` so that we can write some logic as a function in the key.

Then we can get the key from the function.

## Highlights of Recent Features

- [mqtt-proxy plugin supports using route's upstream](https://github.com/apache/apisix/pull/5666)（Contributor: [spacewander](https://github.com/spacewander)）

- [APISIX Supports resolve default value when environment not set](https://github.com/apache/apisix/pull/5675)（Contributor: [kevinw66](https://github.com/kevinw66)）

- [New rocketmq-logger plugin, which send log to rocketmq](https://github.com/apache/apisix/pull/5653)（Contributor: [yuz10](https://github.com/yuz10)）

- [APISIX wasm allows running in the rewrite phase](https://github.com/apache/apisix/pull/5695)（Contributor: [spacewander](https://github.com/spacewander)）

- [Add http_server_location_configuration_snippet configuration](https://github.com/apache/apisix/pull/5740)（Contributor: [zlhgo](https://github.com/zlhgo)）

- [APISIX stream subsystem supports logging](https://github.com/apache/apisix/pull/5768)（Contributor: [bisakhmondal](https://github.com/bisakhmondal)）

- [Add OPA plugin to support API access control using OPA services](https://github.com/apache/apisix/pull/5734)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [Integrates HashiCorp Vault with APISIX jwt-auth authentication plugin](https://github.com/apache/apisix/pull/5745)（Contributor: [bisakhmondal](https://github.com/bisakhmondal)）

- [Dashboard supports configuring the use of POST form data as an advanced match condition](https://github.com/apache/apisix-dashboard/pull/2231)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [Panic caused by ApisixUpstream resources without spec fields can be avoided in Apache APISIX Ingresss](https://github.com/apache/apisix-ingress-controller/pull/794)（Contributor: [Brhetty](https://github.com/Brhetty)）

- [Add regular matching support for Ingress resources in Apache APISIX Ingress](https://github.com/apache/apisix-ingress-controller/pull/779)（Contributor: [lxm](https://github.com/lxm)）

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Secure Exposure of Istio Services with APISIX Ingress](https://apisix.apache.org/blog/2021/12/17/exposure-istio-with-apisix-ingress)：

  This article shows you step by step how to use Istio Service Mesh and Apache APISIX, to expose services in a Service Mesh-enabled Kubernetes cluster to the outside of the cluster through very detailed steps.

- [How to Easily Deploy Apache APISIX in Kubernetes](https://apisix.apache.org/blog/2021/12/15/deploy-apisix-in-kubernetes)：

  Apache APISIX currently supports multiple ways to install and deploy. This article focuses on how to deploy Apach APISIX and APISIX-Dashboard in a Kubernetes environment.

- [Monitoring APISIX Ingress Controller with Prometheus](https://apisix.apache.org/blog/2021/12/13/monitor-apisix-ingress-controller-with-prometheus)：

  This article introduces the relevant steps of how to use Prometheus to monitor APISIX Ingress Controller and the display effect of some indicators.

- [How to Integrate Keycloak for Authentication with Apache APISIX](https://apisix.apache.org/blog/2021/12/10/integrate-keycloak-auth-in-apisix)：

  This article shows you how to use OpenID-Connect protocol and Keycloak for identity authentication in Apache APISIX through detailed steps.

- [Apache APISIX & RocketMQ Helps User API Log Monitoring Capabilities](https://apisix.apache.org/blog/2021/12/08/apisix-integrate-rocketmq-logger-plugin)：

  This article will introduce the latest integration of Apache APISIX and Apache RocketMQ rocketmq-logger plug-in features and use. With this plug-in, you can connect to the RocketMQ cluster more easily when using Apache APISIX.
  
- [Apache APISIX Integrates with SkyWalking to Create a Full Range of Log Processing](https://apisix.apache.org/blog/2021/12/07/apisix-integrate-skywalking-plugin)：

  This paper mainly introduces two Apache APISIX integrated SkyWalking log plug-ins to provide a more convenient operation and environment for log processing in Apache APISIX.
  