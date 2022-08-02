---
title: Biweekly Report (Sep 13 - Sep 30)
keywords:
  - Apache APISIX
  - Community Weekly
  - APISIX
  - API Gateway
  - Contributor
description: The cloud native API gateway Apache APISIX has added functions related to stream_route, debug mode, and hmac-auth plugin in the past two weeks.
tags: [Community]
---

> From 9.13 to 9.30, 32 developers have committed 93 commits to Apache APISIX. Thank you to these folks for making the Apache APISIX project better with your selfless efforts!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community since the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements could not have been achieved without the joint efforts of our community partners.

"The Apache APISIX Community Weekly Newsletter hopes to help community members better grasp the weekly progress of the Apache APISIX community and facilitate your participation in the Apache APISIX community.

We've also put together some issues for those new to the community!

## Contributor statistics

![This week's contributor list](https://static.apiseven.com/202108/1632907894918-c455f40e-a175-4944-8fac-11c590d43786.jpg)

![New contributors this week](https://static.apiseven.com/202108/1632908362102-b0b665e2-f37f-4a82-b8a3-68914925b565.jpg)

## Good first issue

### Issue #5080

**Link**: https://github.com/apache/apisix/issues/5080

**Problem Description**: Previously the upstream service used IP authentication and the actual client IP was obtained from the x-forwarded-for request header. Now I need to change to gateway HMAC authentication, so I need to block upstream IP authentication through the gateway. Tried to modify x-forwarded-for via the proxy rewrite plugin, but it did not work: !

![Screenshot of problem description](https://static.apiseven.com/202108/1632799650125-14edb988-f2ad-434d-8d13-04ff3016eb5a.png)

### Issue #5108

**Link**: https://github.com/apache/apisix/issues/5108

**problem description**: as follows, when enabling the request validation plugin on a route:" delete "

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/35 -H 'X-API-KEY: xxxxxxxxxxxxxxxxxxx' -X PUT -d '
{
    "uri":"/products/create",
    "plugins":{
        "request-validation":{
            "body_schema":{
                "type": "object",
                "required":[
                    "productName",
                    "price"
                ],
                "properties":{
                    "productName":{
                        "type": "string"
                    },
                    "price":{
                        "type": "number"
                    }
                }
            }
        }
    },
    "upstream":{
        "service_name": "PRODUCTSSERVICE",
        "type": "roundrobin",
        "discovery_type": "eureka"
    }
}'
```

Test it with the following command:

```shell
$ curl http://127.0.0.1:9080/products/create -X POST -d '{"product-Name":"Laptop","pri-ce":12345.00}'
```

Get the following default message.

```shell
property "price" is required
```

## Feature highlights of the week

- [debug-mode support for dynamic request filtering](https://github.com/apache/apisix/pull/5012) (contributor: [tzssangglass](https://github.com/tzssangglass))

- [support for injecting logic into APISIX methods](https://github.com/apache/apisix/pull/5068) (contributor: [spacewander](https://github.com/spacewander))

- [stream_route support for using CIDR in IP matching](https://github.com/apache/apisix/pull/4980) (Contributed by [Zheaoli](https://github.com/Zheaoli))

- [hmac-auth support for checksum request bodies](https://github.com/apache/apisix/pull/5038) (Contributed by [arthur-zhang](https://github.com/arthur-zhang))

- [APISIX Ingress controller integrates with cert-manager, so users can manage TLS certificates more easily and use it with APISIX Ingress](https://github.com/apache/apisix-ingress-controller/pull/685) (Contributed by [lingsamuel](https://github.com/lingsamuel))

- [- APISIX Dashboard supports multiple profiles](https://github.com/apache/apisix-dashboard/pull/1946) (contributor: [bzp2010](https://github.com/bzp2010))

## Recommended blog posts for this week

- [Apache APISIX Implementation Practice in Tencent Cloud Smart Titanium Platform](http://apisix.apache.org/blog/2021/09/16/tencent-cloud).

  This article introduces the enterprise case of using Apache APISIX in Tencent Cloud Intelligent Titanium Platform, and the specific example of using Apache APISIX as a product traffic gateway.

- [Using Apache APISIX for Centralized Authentication and Advanced Play](http://apisix.apache.org/blog/2021/09/07/how-to-use-apisix-auth)

  This article introduces the authentication function of Apache APISIX, in terms of importance and playful usage, with detailed introduction and detailed usage.

- [Apache APISIX-based, iQiyi API gateway update and landing practice](http://apisix.apache.org/blog/2021/09/07/iQIYI-usercase)

  By reading this article, you can learn how based on Apache APISIX gateway, the iQiYi technical team has updated and integrated the company's architecture to create a new gateway service.
