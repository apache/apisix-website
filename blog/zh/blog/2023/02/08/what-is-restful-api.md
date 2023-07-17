---
title: "RESTful API 为何成为顶流 API 架构风格？"
authors:
  - name: "孙毅"
    title: "Author"
    url: "https://github.com/litesun"
    image_url: "https://github.com/litesun.png"
keywords: 
- RESTful
- Apache APISIX
- API
description: 本文将介绍什么是 RESTful API 以及我们如何使用它。
tags: [Ecosystem]
---

> 本文将介绍什么是 RESTful API 以及我们如何使用它。

<!--truncate-->

> 作者[孙毅](https://github.com/litesun)，API7.ai 技术工程师，Apache APISIX Committer

万物互联的世界充满着各式各样的 API ，如何统筹规范 API 至关重要。[RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) 是目前世界上最流行的 API 架构风格之一，它可以帮助你实现客户端与服务端关注点分离，让前后端各自迭代，提升管理效率；其无状态的特性可以让应用更容易扩展，更容易地实现缓存策略从而提升系统性能和用户体验。本文将介绍什么是 RESTful API 以及我们如何使用它。

首先，抛开 API 这个概念，我们来聊聊在生活中如何传递信息。

当你在商店将钱拿给老板告诉他你需要买电池，老板在收到钱后在货架上找到电池并递给你。一个买电池的交易顺利完成。

计算机软件则通过 API 来完成信息的传递，先来看维基百科定义：

> An application programming interface (API) is a way for two or more computer programs to communicate with each other. It is a type of software interface, offering a service to other pieces of software.

软件 A 通过 API 向软件 B 发起请求，软件 B 在查询自己资源后将请求的响应内容通过 API 返回 A。

软件 A 通过 API 向软件 B 发起请求就好比你跟老板说你需要电池，软件 B 在将数据返回给软件 A 就好比老板找到电池后将电池给你。

这一过程软件 B 不需要知道软件 A 为什么要数据，就好比商店老板不会问你买电池的目的。软件 A 也不需要知道 B 软件的数据是怎么找到的，就好比你买电池的时候你也不会问老板电池从哪里进货一样。每个软件之间通过 API 传递信息，各司其事，使得程序世界变得有序可靠。

## 什么是 RESTful API

Roy Fielding 在他 2000 年的博士论文《建筑风格和基于网络的软件架构设计》中定义了REST（Representational state transfer），REST 架构风格定义了六个指导性约束。一个符合**部分**或**全部**约束的系统被松散地称为 RESTful。

![RESTful API](https://static.apiseven.com/uploads/2023/02/10/mRPLIAud_3291947742.png)  
 (图片来源：Seobility)

### REST 的约束条件

|约束条件|详述|优势|
|:----|:----|:----|
|Client–server architecture|通过将用户界面问题与数据存储问题分开，提高了跨多个平台的用户界面的可移植性，并通过简化服务器组件提高了可扩展性。|1. 客户端、服务端解耦。<br />2. 提升用户平台跨平台的可移植性。<br />3. 提升服务器端的可拓展性。|
|Statelessness|客户端的每个请求到服务器必须包含请求所需的所有信息，并且不能利用服务器上存储的任何上下文，会话状态完全保存在客户端。|1. 易扩展，无会话依赖，任何服务器可以处理任何请求。<br />2. 易缓存，提升程序性能。|
|Cacheability|要求请求响应中的数据被隐式或显式标记为可缓存或不可缓存。如果一个响应是可缓存的，那么客户端缓存就被授予为以后的等效请求重用该响应数据的权利。|1. 减少带宽。<br />2. 减少延迟。<br />3. 减少服务器负载。<br />4. 隐藏网络状态。|
|Layered system|通过约束组件行为允许架构由分层层组成，这样每个组件都不能“看到”超出它们与之交互的直接层。通过将系统知识限制在单个层，降低了整个系统的复杂性并促进了底层独立性。|1. 降低整个系统的复杂性。<br />2. 促进底层的独立性。<br />3. 可方便地实施负载均衡。<br />4. 可将业务逻辑和安全策略解耦。|
|Code on demand (optional)|允许通过下载和执行小程序或脚本形式的代码来扩展客户端功能。|1. 提高系统的可扩展性。|
|Uniform interface|主要包含四点：<br />1. Resource identification in requests.<br />客户能够通过请求中包含的 URI 来识别一个资源，将服务端资源和客户端请求资源解耦。<br />2. Resource manipulation through representations.<br />当客户端拥有一个资源的表示，如 URI，那么就有足够的信息来修改或者删除资源。<br />3. Self-descriptive messages.<br />每个消息都包括足够的信息来告知客户客户端该如何处理该信息。<br />4. Hypermedia as the engine of application state ([HATEOAS](https://github.com/api7/contents/blob/691305a1293991d7b0b39a0ac9a7a655c935778a/blog/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHATEOAS)).<br />客户端不需要任何额外的编码通过服务端返回的资源链接，就可以使得用户获取所有的资源。|1. 简化了整体系统架构。<br />2. 提高了交互的可见性。|

## RESTful API 最佳实践

强调组件间的 **统一接口** 是 REST 架构风格与其他基于网络的风格区分开来的核心特征，基于此特征，本文梳理了RSETful 最佳实践，以帮助你更好地设计 API。

### 路径名称避免动词

使用 HTTP 方法来表达资源操作行为，而不是将行为动词定义到路径中。

```shell
# Good
curl -X GET http://httpbin.org/orders

# Bad
curl -X GET "http://httpbin.org/getOrders"
```

* GET 获取指定 URI 的资源信息

```shell
# 代表获取当前系统的所有订单信息
curl -X GET http://httpbin.org/orders

# 代表获取订单编号为 1 的订单详情信息
curl -X GET http://httpbin.org/orders/1
```

* POST 通过指定的 URI 创建资源

```plain
# 代表创建一个名称为 order 的资源
curl -X POST http://httpbin.org/orders \
  -d '{"name": "awesome", region: "A"}' \
```

* PUT 创建或全量替换指定 URI 上的资源

```shell
# 代表将 id 为 1 的 order 进行数据替换
curl -X PUT http://httpbin.org/orders/1 \
  -d '{"name": "new awesome", region: "B"}' \
```

* PATCH 执行一个资源的部分更新

```shell
# 代表将 id 为 1 的 order 中的 region 字段进行更改，其他数据保持不变
curl -X PATCH http://httpbin.org/orders/1 \
  -d '{region: "B"}' \
```

* DELETE 通过指定的 URI 移除资源

```shell
# 代表将 id 为 1 的 order 删除
curl -X DELETE http://httpbin.org/orders/1
```

### URI 使用复数形式

若使用单数的形式来表示获取某一类资源，例如：

```shell
curl -X GET "http://httpbin.org/order"
```

使用单数形式，会使用户产生该系统中只有一个 order 的困惑，用复数形式在逻辑上则顺畅很多。

```shell
curl -X GET "http://httpbin.org/orders"
```

### 善用 HTTP 状态码

HTTP 标准定义个状态码，大致可以分为以下几类：

|状态码|含义|
|:----|:----|
|2xx|成功，操作被成功接收并处理|
|3xx|重定向，需要进一步的操作以完成请求|
|4xx|客户端错误，请求包含语法错误或无法完成请求|
|5xx|服务器错误，服务器在处理请求的过程中发生了错误|

使用标准状态码，开发人员可以立即识别问题，可以减少发现不同类型错误的时间。

### 版本管理

随着业务需求的变更，已经上线的 API 大概率是要对应调整的。如果我们的 API 有第三方在使用，让每一个客户端根据我们 API 的变更而变更显然是不可能的，这个时候就要引入 API 版本管理概念了，既可以保证历史 API 正常使用，又可以迭代新的 API 以满足新的业务需求。

常见的版本控制手段有：

* 通过请求中路径来做版本控制

```shell
# 请求 v1 版本的API
curl  http://httpbin.org/v1/orders

# 请求 v2 版本的API
curl  http://httpbin.org/v2/orders
```

* 通过 Query 参数来做版本控制

```shell
# 请求 v1 版本的API
curl  http://httpbin.org/orders?version=v1

# 请求 v2 版本的API
curl  http://httpbin.org/v2/orders?version=v2
```

* 通过 Header 来做版本控制

```shell
# 请求 v1 版本的API
curl  http://httpbin.org/orders -H "custom-version: v1"

# 请求 v2 版本的API
curl  http://httpbin.org/orders -H "custom-version: v2"
```

## APISIX 如何助力 RESTful API

作为一个动态、实时、高性能的 API 网关，Apache APISIX 可以在任何 RESTful API 服务上运行，并使用插件来添加新的服务和扩展其功能，这符合 RESTful 定义中的 **Layered system**。此外，对于一些没有遵循 RESTful API 定义的历史服务， APISIX 也可以帮你在**不改动原有业务代码**的情况下完成接口的转换，使你的接口完成 **Uniform interface** 这一 REST 限制条件，使你的 API 可以更好地遵守 RESTful API 规范。

### 分层系统：支持业务逻辑和安全逻辑的分割

你可以只用关注业务逻辑的实现，接口的安全逻辑可以交给 APISIX Authentication 类插件处理，例如 [key-auth](https://apisix.apache.org/docs/apisix/plugins/key-auth)。APISIX 支持大量的 Authentication 插件，我们以 [openid-connet](https://apisix.apache.org/docs/apisix/plugins/openid-connect/) 为例如下图所示：

![APISIX 的作用](https://static.apiseven.com/uploads/2023/02/10/YP0k3mhR_3873553149.png)

 我们可以看到，使用 APISIX（API Gateway）在业务服务器前面加一层认证逻辑，就可以起到保护上游服务的作用，让你的业务逻辑和安全逻辑高效解耦。

### Layered system：多负载均衡协议支持

APISIX 作为 API 网关，可以设立在客户端和服务端之间，完成不同的负载需求。你甚至可以自定义负载均衡的逻辑。

支持的负载均衡算法有：

* `roundrobin`: Round robin balancing with weights.
* `chash`: Consistent hash.
* `ewma`: Pick the node with minimum latency. See [EWMA Chart](https://github.com/api7/contents/blob/691305a1293991d7b0b39a0ac9a7a655c935778a/blog/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEWMA_chart) for more details.
* `least_conn`: Picks the node with the lowest value of `(active_conn + 1) / weight`. Here, an active connection is a connection being used by the request and is similar to the concept in Nginx.
* user-defined load balancer loaded via `require("apisix.balancer.your_balancer")`

### 统一接口：使历史 API 更加 RESTful

对于已经存在很久的历史 API，如果没有很好地遵循 RESTful API 准则。你可以在不改造原有 API 逻辑的情况下重新通过 APISIX 来封装新的 API 以满足不同的业务场景。

#### 使用 [proxy-rewrite](https://apisix.apache.org/docs/apisix/plugins/proxy-rewrite/) 改写客户端请求

在本文中上方提过我们的路径中不要有动词。

例如：历史版本 API 有 `/getOrder` 接口，我们可以通过 `proxy-rewrite` 插件来将 API 请求代理到历史 API 上：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/orders",
    "plugins": {
        "proxy-rewrite": {
            "uri": "/getOrder",
            "scheme": "http",
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

你也可以同样使用该插件进行 API 版本管理上的操作。

#### 使用 [response-rewrite](https://apisix.apache.org/docs/apisix/plugins/response-rewrite/) 插件改写服务端响应

当我们的历史 API 存在响应状态码不规范时，我们可以通过 `response-rewrite` 代理 response 响应从而达到修改响应状态码的目的。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/orders",
    "plugins": {
        "response-rewrite": {
            "status_code": 201,
            "body": "{\"code\":\"ok\",\"message\":\"new json body\"}",
            "vars":[
                [ "status","==",200 ]
            ]
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

例如，这个例子表示将请求 `/orders` 路径的 API 中响应为 `200` 的状态的请求修改为 `201`。
APISIX 支持非常丰富的插件，期待你去挖掘更多的玩法。

## 总结

本文详细说明了什么是 API，什么是 RESTful API 以及其最佳实践。另外还介绍了如何通过 APISIX 来实现业务逻辑和安全逻辑分离，如何使用 APISIX 在不改动原有业务代码的情况下将历史 API 服务更加 RESTful。希望本文对你了解 RESTful API 有所帮助，也欢迎你来 GitHub 一起玩耍。
