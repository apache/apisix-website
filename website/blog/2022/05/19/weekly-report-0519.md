---
title: Biweekly Report｜Explore the weeks of May 1st - May 15th
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.
tags: [Events]
---

> From May 1st to May 15th, 35 contributors submitted 77 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1652941223501-a03655b5-122f-4fa5-9406-3f3b33093002.png)

![New Contributors](https://static.apiseven.com/202108/1652941259760-bc336da9-7659-4b1e-ac89-d4073bd24c5d.png)

## Good first issue

### Issue #7052

**链接**: https://github.com/apache/apisix/issues/7052

**问题描述**：As a User, I want to use oAuth2 with [PKCE](https://oauth.net/2/pkce/) support, so that I can configure an oAuth2 connection without using client/secret.

I am using an IDP. which has implemented the [Authorization Code Flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth).

From the docs of the IdP:
The IdP implements the Authorization Code Flow, preferably with PKCE. The PKCE flow is the recommended and most universal authorization flow that supports mobile apps, single page applications and traditional server-rendered applications and doesn't require the exchange of a shared secret.

The Flow:

user opens a web app (in my case an `APISIXROUTE`, using `openid` plugin)
code challenge using **SHA256** is created by the `openid` plugin
redirect to the idp authorization endpoint
login of the user
redirect to the `redirect_url` with `authcode` as URL Queryparameter
`openid` plugin uses the `authcode` to receive a JWT from the idp token endpoint
Could you implement this oAuth flow with pkce support?
Please add a section to the documentation as well, tkaning care on the configuration of the pkce and the redirect_url

## Issue #6939

**链接**: https://github.com/apache/apisix/issues/6939

**问题描述**：See [apisix/apisix/stream/router/ip_port.lua](https://github.com/apache/apisix/blob/dbe7eeebba06229d4a8df75263f2a78301cc1ca0/apisix/stream/router/ip_port.lua#L82) Line 82 in dbe7eee

```Lua
   -- TODO: check the subordinate relationship in the Admin API 
``` 

We need to check the subordinate relationship in the Admin API, including:

validate if the stream route with superior id exists and its protocol matches the subordinate
when deleting a stream route, check if it is referenced by another stream route

## Highlights of Recent Features

- [xRPC support timeout](https://github.com/apache/apisix/pull/6965)（Contributor: [spacewander](https://github.com/spacewander)）

- [stream port syslog plugin ](https://github.com/apache/apisix/pull/6953)（Contributor: [tzssangglass](https://github.com/tzssangglass)）

- [redis support pipeline](https://github.com/apache/apisix/pull/6959)（Contributor: [spacewander](https://github.com/spacewander)）

- [just change uri args or headers when hiding credentials](https://github.com/apache/apisix/pull/6991)（Contributor: [jwrookie](https://github.com/jwrookie)）

- [add option to normalize uri like servlet](https://github.com/apache/apisix/pull/6984)（Contributor: [spacewander](https://github.com/spacewander)）

- [ops handle real_ip_from CIDR format](https://github.com/apache/apisix/pull/6981)（Contributor: [kwanhur](https://github.com/kwanhur)）

- [xRPC support log filter](https://github.com/apache/apisix/pull/6960)（Contributor: [tzssangglass](https://github.com/tzssangglass))

- [add pubsub framework](https://github.com/apache/apisix/pull/7028)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [redis support pubsub（added test）](https://github.com/apache/apisix/pull/7031)（Contributor: [spacewander](https://github.com/spacewander)）

- [real-ip support search recursive](https://github.com/apache/apisix/pull/6988)（Contributor: [crazyMonkey1995](https://github.com/crazyMonkey1995)）

- [support hook response body for ext-plugin](https://github.com/apache/apisix/pull/6968)（Contributor: [soulbird](https://github.com/soulbird)）

In the TiDB Hackathon 2021, the APISIX team (team leader: Chao Zhang, team members: Zeping Bai, Zhengsong Tu, Jinghan Chen) presented the ability of TiDB to interface with Apache APISIX to implement a universal configuration center. In this article, we will bring you some stories behind the project and the future outlook, if you are interested in the project, please feel free to participate in the project.

