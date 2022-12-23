---
title: "认证鉴权对于 API 网关的重要性"
author: "钱勇"
authorUrl: "https://github.com/nic-6443"
authorImageURL:  "https://avatars.githubusercontent.com/u/22141303?v=4"
keywords: 
- Apache APISIX
- auth
- Gateway API
description: 认证鉴权作为 API 网关不可或缺的能力，已然成为用户在选型 API 网关时考量的重要因素之一。
tags: [Ecosystem]
---

> 认证鉴权作为 API 网关不可或缺的能力，已然成为用户在选型 API 网关时考量的重要因素之一。

<!--truncate-->

> 作者钱勇，API7.ai 开发工程师，Apache APISIX Committer

在当下云原生越发成熟的环境下，API 网关最核心的功能可以概括为：连接 API 消费者和 API 提供者。

实际场景中，除去少部分允许匿名访问的 API 外，提供者往往都会对消费者有所限制，比如只有符合条件的消费者才可以对 API 进行访问。其次，提供者对于不同的消费者的访问策略可能并不相同，例如 A、B 消费者都可以访问 `/send_mail` API，但每分钟的调用频次需要区分计算。

从以上两点可以看出在 API 网关层面鉴别和验证 API 消费者的身份至关重要。本文将介绍云原生开源 API 网关 Apache APISIX 如何实现对于消费者的认证，以及目前被企业广泛采用的认证方式。进一步介绍 APISIX 的用户认证体系是如何与其他安全特性联动使用，从而进一步提升 API 网关的安全防护能力。

![2020785233.png](https://static.apiseven.com/2022/12/22/63a4066de6401.png)

## **Apache APISIX 的认证鉴权**

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、精细化路由、限流限速、服务降级、服务熔断、身份认证、可观测性等数百项功能。在认证鉴权方面，APISIX 也是提供了非常多且方便的途径。

传统的 HTTP 代理往往只能基于请求域名、客户端 IP 等粗粒度手段对请求方进行识别，这对于一款 API 网关来说是远远不够的，我们需要有更丰富的认证方式来解决越来越复杂的业务需求。而 APISIX 区分于传统代理的一大优势就是灵活的插件扩展能力，这其中就包括一套用于用户认证的插件集合，这些插件根据实现方式的不同可以分为两大类。

第一种是对接外部认证服务，委托其进行认证。

![721355468.jpg](https://static.apiseven.com/2022/12/22/63a406703dcd4.jpg)

第二种则是在网关内部认证，配合 APISIX 设计的 Consumer 对象进行认证。

![2821843005.jpg](https://static.apiseven.com/2022/12/22/63a4066fd1941.jpg)

下面将会依次介绍这两种认证方式。

### **对接外部认证服务**

在企业采用 API 网关之前，系统中往往已经部署了独立的认证服务，此时我们要如何将 APISIX 与已有的认证服务进行对接呢？APISIX 提供了这样一系列插件，它们的工作原理就是通过对接各种外部的认证服务，委托它们完成认证。

例如，我们可以使用 `openid-connect` 插件对接任意支持 OIDC 协议的认证服务，下面是一段对接到 Keycloak 服务的样例配置：

```bash
curl http://127.0.0.1:9180/apisix/admin/routes -H "X-Api-Key: your-API-key" -XPOST -d '
{
    "uri":"/*",
    "plugins":{
        "openid-connect":{
            "client_id":"apisix", // keycloak 创建 client 时生成
            "client_secret":"d5c42c50-3e71-4bbe-aa9e-31083ab29da4",
            "discovery":"http://keycloak:8080/auth/realms/apisix_test_realm/.well-known/openid-configuration", // keycloak OpenID Endpoint
            "scope":"openid profile",
            "bearer_only":false,
            "realm":"apisix_test_realm",
            "introspection_endpoint_auth_method":"client_secret_post",
            "redirect_uri":"http://127.0.0.1:9080/"
        }
    },
    "upstream":{
        ...
    }
}'
```

### **网关内部认证**

#### **Consumer**

![1391469438.jpg](https://static.apiseven.com/2022/12/22/63a4066f62dfe.jpg)

当来自多渠道的请求到达 API 网关后，网关需要识别出这些调用方。为此，Apache APISIX 提出了 Consumer 概念，用来代表某类服务的调用方。

Consumer 对象需要配置认证插件进行使用，以最简单的 `key-auth` 插件为例：

```bash
curl http://127.0.0.1:9180/apisix/admin/consumers  -H 'X-API-KEY: your-API-key' -X PUT -i -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "auth-jack"
        }
}'
```

以上配置表示当请求中携带指定的 key（auth-jack）时，当前请求将会与 jack 这个消费者进行关联。可以看到，Consumer 上配置的认证插件实际上就是一个指定认证机制下的身份凭证，在 `key-auth` 插件中，key 即是标识某个消费者的凭证，类似的还有 `basic-auth` 插件的用户名与密码等等。

#### **为路由配置认证插件**

当我们通过 Consumer 将凭证信息与具体的消费者进行关联后，还需要在相应的路由上开启认证插件：

```bash
curl http://127.0.0.1:9180/apisix/admin/routes/orders -H 'X-API-KEY: your-API-key' -X PUT -i -d '
{
    "uri": "/orders",
    "plugins": {
        "key-auth": {
            "header": "Authorization"
        }
    }
}'
```

以上配置表示在 `/orders` 这个路由上开启 `key-auth` 插件，验证效果如下：

```bash
curl http://127.0.0.1:9080/orders -H 'Authorization: auth-jack' -i

HTTP/1.1 200 OK
...

curl http://127.0.0.1:9080/orders -H 'Authorization: wrong-key' -i

HTTP/1.1 401 Unauthorized
...
{"message":"Invalid API key in request"}
```

当来自用户的请求命中这条路由时，APISIX 会尝试通过 `Authorization` 头部拿到用户提供的 Key。如果无法获取或者获取到的 Key 是不合法的，那么该请求将会被网关直接拒绝，从而保护上游服务。

可以看到以上两种认证方式中，认证插件都处于整个体系中的核心地位，它的丰富度将直接影响着 API 网关用户对于认证方式的选择空间。

## **APISIX 支持的认证方式**

认证鉴权作为计算机世界从第一天起就存在的基础机制，经过这么多年的迭代，已经发展成为一个非常多样化的领域。而 APISIX 的插件机制极大地降低了实现各种认证方式的开发成本，以下是部分 APISIX 已经支持的主流认证方式。

### **Key Auth**

Key Auth 是目前 APISIX 所支持的认证方式中，使用起来最简单的。但 `key-auth` 插件在实际环境中有着非常丰富的应用场景，例如：收费软件中的 License、开放 API 平台中的用于标识开发者的 token 等等，都可以非常轻松地使用 `key-auth` 来实现。并且基于 APISIX 全动态的配置下发能力，Key 可以被迅速创建、吊销，而且实时生效。

### **Basic Auth**

Basic Auth 是基于用户名、密码进行认证的方式，常用于网页登录场景，例如：网站的管理后台需要管理员登录后才可以使用，那么我们可以使用 Basic Auth 方式进行认证。

### **LDAP**

LDAP（Lightweight Directory Access Protocol）是一种基于X.500 标准的轻量级文件访问协议，通过IP 协议提供访问控制和维护分布式信息的目录信息，借助于 LDAP ，运维人员可以细粒度地控制用户对资源的访问权限。通过 APISIX 的 `ldap-auth` 插件，可以轻松对接实现了 LDAP 协议的平台，例如微软的 Active Direcory，或者 Linux 平台的 OpenLDAP Server，从而能够精细化地控制 Consumer 对具体路由的访问权限。

### **OIDC**

OpenID 是一个去中心化的网上身份认证系统。对于支持 OpenID 的网站，用户不需要记住像用户名和密码这样的传统验证标记。取而代之的是，他们只需要预先在一个作为 OpenID 身份提供者（identity provider, IdP）的网站上注册账号，而后就可以用这个账号登录所有对接了该提供者的应用，例如：可以通过知名的 Google 或者 Facebook 服务的账号来认证我们自身系统的用户。

针对 OIDC，APISIX 提供了 `openid-connect` 插件，可以用于对接支持了 OIDC 协议的认证服务。

### **Forward Auth**

当 APISIX 的标准认证插件无法满足你当前需求时，或者当前系统中已经部署了专门的并且是非标准协议的认证服务，此时你可以考虑使用 `forward-auth` 插件。使用该插件可以将用户的请求通过 HTTP 形式转发至认证服务中，并在认证服务响应非正常状态（错误码非 20x）时，返回自定义报错或者将用户重定向至认证页面。

借助 `forward-auth` 插件的能力，可以非常巧妙地将认证与授权逻辑转移到专门的、非标准协议的外部服务中。

## **“认证+任意功能”，APISIX 助力 API 安全**

用户认证只是 APISIX 保障 API 安全的第一步，将认证能力与其他安全类型插件的有机结合将会进一步放大网关的安全能力。

### **ACL 访问控制**

在一个复杂的后端系统中，可能会存在部分 API 的安全限制是高于其他 API 的，这种限制不仅需要拦截匿名用户，而且需要对认证用户进行限制，例如：只允许白名单用户访问用户管理 API。

![3322406862.jpg](https://static.apiseven.com/2022/12/22/63a4066e6b7e4.jpg)

此时我们可以使用 APISIX 提供的 `consumer-restriction` 插件去实现一个访问控制机制。

```bash
curl http://127.0.0.1:9180/apisix/admin/routes -H 'X-API-KEY: your-API-key' -X POST -i -d '
{
    "uri": "/api/v1/users/admin",
    "plugins": {
        "key-auth": {},
        "consumer-restriction": {
            "whitelist": [
                "Rose",
                "Peter
            ]
        }
    },
    "upstream": {
        ...
    },
}'
```

上述配置中，通过 `key-auth` 和 `consumer-restriction` 两个插件限制了：`/api/v1/users/admin` 路由需要通过 key auth 认证，并且仅 Rose 和 Peter 可以访问。

### **限流限速**

前面我们介绍了可以通过在 Consumer 中配置认证插件将用户凭证与消费者进行关联，事实 APISIX Consumer 对象不仅仅可以挂载认证类型的插件，而是可以像路由和 Service 一样，挂载任意插件。

以限流场景举例，在实际应用中，限流策略往往不是一成不变而是"千人千面"，不同服务等级的调用方拥有不同的 API 限流策略是非常常见的需求，这样的需求是无法通过在路由上挂载限流插件进行解决的。为此，我们可以在消费者上挂载限流插件，并且为每一个消费者指定不同的限流策略。

```bash
curl http://127.0.0.1:9180/apisix/admin/consumers  -H 'X-API-KEY: your-API-key' -X PUT -i -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "jack"
        },
        "limit-count": {
            "count": 200,
            "time_window": 60,
            "rejected_code": 503,
            "key": "$consumer_name",
        }
}'

curl http://127.0.0.1:9180/apisix/admin/consumers  -H 'X-API-KEY: your-API-key' -X PUT -i -d '
{
    "username": "rose",
    "plugins": {
        "key-auth": {
            "key": "rose"
        },
        "limit-count": {
            "count": 1000,
            "time_window": 60,
            "rejected_code": 503,
            "key": "$consumer_name",
        }
}'
```

通过上方的配置，我们为 jack 和 rose 分别指定了不同的限流策略。Rose 在 60 秒内拥有更多的请求次数配额 1000，而 Jack 只有 200 配额。

## **总结**

认证鉴权作为 API 网关不可或缺的能力，已然成为用户在选型 API 网关时考量的重要因素之一。

本文中介绍的开源网关 Apache APISIX，覆盖了所有主流的认证方式，可以满足企业用户对于认证鉴权的需求。同时 APISIX 还拥有其他以下优势：

* 丰富的、开箱即用的认证插件；
* 同时支持内置、外置认证方式，用户可以自由选择；
* 支持二次开发，方便对接自定义鉴权中心。

这些优势都可以帮助企业更轻松的落地网关层面的认证鉴权，加强 API 安全。
