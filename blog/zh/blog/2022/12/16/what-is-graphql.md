---
title: "马斯克都不懂的 GraphQL，API 网关又能对其如何理解？"
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://github.com/spacewander.png"
keywords: 
- GraphQL
- API
- 开源
- APISIX
description: 本文介绍了什么是 GraphQL，以及 APISIX 是如何支持 GraphQL 的。
tags: [Ecosystem]
---

> 本文介绍了什么是 GraphQL，以及 APISIX 是如何支持 GraphQL 的。

<!--truncate-->

上个月马斯克评论 Twitter App 滥用 RPC 后，与一些 Twitter 的技术主管发生了矛盾 —— 直言马斯克不懂技术。那这个马斯克都不懂的 GraphQL 到底是什么？

![image (3).png](https://static.apiseven.com/2022/12/16/639c101d512e2.png)

## 什么是 GraphQL？它有多流行？

GraphQL 是一套由 Facebook 在 2015 年发布的一套面向 API 的查询操作语言。相比于其他的 API 设计方式，GraphQL 允许客户端根据事先约定的数据结构组建查询语句，由服务端解析这一语句并只返回所需的内容。这么一来，GraphQL 在提供丰富性和灵活性的同时，避免了冗余数据带来的性能损耗。

GraphQL 的这一特性，让它在需要跟许多复杂数据对象打交道的应用场景里大行其道，成为该环境下的不二之选。

2018 年 GraphQL 完成了规范的制定工作，并推出了稳定版本。同年，Facebook 将 GraphQL 项目捐献给了 Linux 基金会下属的 GraphQL 基金会。自那以后，GraphQL 已经在许许多多的开源项目和商业机构中落地。到目前为止，市面上已经有了多个 GraphQL 的主流客户端实现。而服务端的实现遍布各大服务端编程语言，甚至连一些小众编程语言如 D 和 R 都有对应的实现。

## GraphQL 的一些真实场景和挑战

最为知名的采用 GraphQL 的例子，莫过于 GitHub 的 GraphQL API 了。

在拥抱 GraphQL 之前，GitHub 提供了 REST API 来暴露千千万万托管项目所产生的丰富数据。GitHub 的 REST API 是如此的成功，以致于它成为了人们设计 REST API 时竞相模仿的典范。

然而随着数据对象的变多和对象内字段的变大，REST API 开始暴露出越来越多的弊端。在服务端，由于每次调用都会产生大量的数据，GitHub 为了降低成本不得不对调用频率设置严格的限制。

而在开发者这边，他们则不得不与这一限制做斗争。因为虽然单次调用会返回繁多的数据，但是绝大部分都是无用的。开发者要想获取某一特定的信息，往往需要发起多个查询，然后编写许多胶水代码把查询结果中有意义的数据拼接成所需的内容。在这一过程中，他们还不得不带上“调用次数”的镣铐。

所以 GraphQL 的出现，立刻就让 GitHub [皈依](https://docs.github.com/en/graphql/overview/about-the-graphql-api#why-github-is-using-graphql)了。GitHub 成为了 GraphQL 的使者保罗，为万千开发者传递福音。目前 GraphQL API 已经是 GitHub API 的首选。从[第一次宣布对 GraphQL 的支持](https://github.blog/2016-09-14-the-github-graphql-api/)之后，GitHub 每一年都会[发几篇关于 GraphQL 的文章](https://github.blog/?s=graphQL)。为了让开发者能够迁移到 GraphQL 上来，GitHub 专门写了个交互式查询应用，[开发者可以通过这个应用学习怎么编写](https://docs.github.com/en/graphql/overview/explorer%E3%80%82%E5%BC%80%E5%8F%91%E8%80%85%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%E8%BF%99%E4%B8%AA%E5%BA%94%E7%94%A8%E5%AD%A6%E4%B9%A0%E6%80%8E%E4%B9%88%E7%BC%96%E5%86%99) GraphQL。

然而 GraphQL 并非灵丹妙药。就在最近，[GitHub 废弃自己 package API 的 GraphQL 实现](https://github.blog/changelog/2022-08-18-deprecation-notice-graphql-for-packages/)。许多人也开始[热议 GraphQL 的一些缺点](https://honest.engineering/posts/why-use-graphql-good-and-bad-reasons)。

GraphQL 的许多问题源自于它跟 HTTP 标准的结构差别较大，没办法简单地将 GraphQL 的一些概念映射到诸如 HTTP path/header 这样的结构中。把 GraphQL 当作普通的 HTTP API 来处理，需要额外的开发工作。如此一来，开发者如果要管理自己的 GraphQL API，就必须采用支持 GraphQL 的 API 网关才行。

## APISIX 现在对 GraphQL 的支持

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、精细化路由、限流限速、服务降级、服务熔断、身份认证、可观测性等数百项功能。作为 Apache 的顶级项目，APISIX 一直致力于周边生态的扩展与跟进。

APISIX 目前支持通过 GraphQL 的一些属性进行动态路由。通过该能力，我们可以只接受特定的 GraphQL 请求，或者让不同的 GraphQL 转发到不同的上游。

以下面的 GraphQL 语句为例：

```graphql
  query getRepo {
      owner {
          name
      }
      repo {
          created
      }
  }
```

APISIX 会提取 GraphQL 以下三个属性，用在路由当中：

* graphql_operation
* graphql_name
* graphql_root_fields

在上面的 GraphQL 语句中：

* `graphql_operation` 对应 `query`
* `graphql_name` 对应 `getRepo`
* `graphql_root_fields` 对应 `["owner", "repo"]`

让我们来创建一个路由，展示下 APISIX 对 GraphQL 的精细化路由能力。

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
  {
      "methods": ["POST"],
      "uri": "/graphql",
      "vars": [
          ["graphql_operation", "==", "query"],
          ["graphql_name", "==", "getRepo"],
          ["graphql_root_fields", "has", "owner"]
      ],
      "upstream": {
          "type": "roundrobin",
          "nodes": {
              "127.0.0.1:2022": 1
          }
      }
  }'
```

接下来使用带有 GraphQL 语句的请求去访问：

```shell
curl -i -H 'content-type: application/graphql' \
-X POST http://127.0.0.1:9080/graphql -d '
query getRepo {
    owner {
        name
    }
    repo {
        created
    }
}'
HTTP/1.1 200 OK
...
```

我们可以看到请求到达了上游，这是因为查询语句匹配了全部三个条件。 反之，如果我们使用不匹配的语句来访问，比如不包含 `owner` 字段：

```shell
curl -i -H 'content-type: application/graphql' \
-X POST http://127.0.0.1:9080/graphql -d '
query getRepo {
    repo {
        created
    }
}'
HTTP/1.1 404 Not Found
...
```

则不会匹配对应的路由规则。

接下来，我们可以另外创建一个路由，让不包含 `owner` 字段的语句路由到别的上游：

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/2 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
  {
      "methods": ["POST"],
      "uri": "/graphql",
      "vars": [
          ["graphql_operation", "==", "query"],
          ["graphql_name", "==", "getRepo"],
          ["graphql_root_fields", "!", "has", "owner"]
      ],
      "upstream": {
          "type": "roundrobin",
          "nodes": {
              "192.168.0.1:2022": 1
          }
      }
  }'
curl -i -H 'content-type: application/graphql' \
-X POST http://127.0.0.1:9080/graphql -d '
query getRepo {
    repo {
        created
    }
}'
HTTP/1.1 200 OK
..
```

## 展望 APISIX 未来对 GraphQL 的支持

除了动态路由之外，APISIX 在未来也可能会根据 GraphQL 的具体字段推出更多的操作。比如说，GitHub 的 GraphQL API 有[专门一套针对限流的计算公式](https://docs.github.com/en/graphql/overview/resource-limitations#rate-limit)，我们也可以应用类似的规则来把单个 GraphQL 请求转成相应的“虚拟调用”次数，来完成 GraphQL 专属的限流工作。

当然，我们也可以换个思路解决问题。即应用自身还是提供 REST API，由网关在最外层把 GraphQL 请求转成 REST 请求，把 REST 响应转成 GraphQL 响应。这种方式提供的 GraphQL API 无需开发专门的插件，就可以完成诸如 RBAC、限流、缓存等功能。

从插件角度来看，它就是个平平无奇的 REST API。从技术角度上讲，这个思路并不难实现。毕竟在 2022 年的现在，REST API 也会提供 OpenAPI spec 来作为 schema，无非是 GraphQL schema 和 OpenAPI schema 之间的互转，外加 GraphQL 特有的字段筛选罢了（当然，我必须承认，我并没有亲自实践过，或者在一些细节上存在尚待克服的挑战）。

细心的读者会发现，这种方式转换得来的 GraphQL API，每次只能操作一个模型，显然无法满足 GraphQL 灵活性的要求，无非是披着 GraphQL 外衣的 REST API。**且慢，我还没有把话说完呢！**GraphQL 有一个叫 [schema stitch](https://www.apollographql.com/blog/backend/graphql-schema-stitching/) 的概念，允许实现者把多个 schema 组合在一起。

举个例子，现在有两个 API。一个叫 GetEvent，另一个叫 GetLocation。他们返回的类型分别是 Event 和 Location。

```grahphql
type Event {
  id: string
  location_id: string
}

type Location {
  id: string
  city: string
}

type Query {
    GetEvent(id: string): Event
    GetLocation(id: string): Location
}
```

我们可以加一个配置，由这两个 API 组合成新的 API 叫 `GetEventWithLocation`。新的 API 是这样的：

```grahphql
type EventWithLocation {
  id: string
  location: Location
}

type Query {
    GetEventWithLocation(id: string): EventWithLocation
}
```

整体 schema stitch 的过程都由网关来完成。在上面的例子中，网关会把 API 拆分成两个，先调用 GetEvent 得到 `location_id`，再调用 GetLocation 得到组合后的数据。

总而言之，通过 REST 转 GraphQL，每个 REST API 可以变成对应的 GraphQL 模型；再借助 schema stitch，可以把多个模型组合成一个 GraphQL API。

这样一来，我们就能在现有的 REST API 上构建起丰富灵活的 GraphQL API，且在 REST API 的粒度上完成具体的插件管理。这一设计顺带解决了部分 API 编排的问题。就像上面的例子中，我们把一个 API 的输出（Event.location_id）作为另一个 API 的输入（Location.id）。
