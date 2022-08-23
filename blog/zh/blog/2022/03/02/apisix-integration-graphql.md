---
title: "GraphQL 碰撞 API 网关 Apache APISIX，提升 API 领域的安全与性能"
authors:
  - name: "江晨炜"
    title: "Author"
    url: "https://github.com/Chever-John"
    image_url: "https://avatars.githubusercontent.com/u/43690894?v=4"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://avatars.githubusercontent.com/u/97138894?v=4"
keywords: 
- Apache APISIX
- API 网关
- GraphQL
- Ecosystem
description: 本文介绍了云原生 API 网关 Apache APISIX 和 GraphQL 的特性，以及如何使用 Apache APISIX 代理 GraphQL 请求，并提出解决实际场景痛点的方案。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/GraphQL.png
---

> 本文介绍了 Apache APISIX 和 GraphQL 的特性，以及如何使用 API 网关 Apache APISIX 代理 GraphQL 请求，并提出解决实际场景痛点的方案。

<!--truncate-->

## 背景信息

GraphQL 是一个开源的、面向 API 而创造出来的数据查询操作语言以及相应的运行环境。最初由 Facebook 于 2012 年内部开发，2015 年公开发布。2018 年 11 月 7 日，Facebook 将 GraphQL 项目转移到新成立的 GraphQL 基金会。

您可以把 GraphQL 类比为 SQL 查询语句来理解，与 SQL 查询语句相比，GraphQL 对 API 中的数据提供了一套易于理解的完整描述，让客户端能够通过自定义的描述来准确获得其所需要的数据。这也让 API 能够从容面对日益复杂的接口发展，并避免最终成为一个令人望而生畏的复杂接口。

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

Apache APISIX 作为云原生 API 网关，在设计之初就已经具备识别 GraphQL 语法的匹配能力。通过对请求中携带的 GraphQL 语句进行高效匹配，筛除异常流量，进一步保证安全性和提高系统性能。

### 场景解析

我们正处于大数据大流量的时代，Apache APISIX 和  GraphQL 可以通过结合的方式，形成共赢的局面。接下来举一个场景具体说明。

本文将会讨论微服务架构场景下的 Apache APISIX 和 GraphQL 的实际应用。

### 实际场景中遇到的问题

在项目进行到后期时，往往会出现业务复杂化、团队人员流动性高等问题，而微服务架构已经成为解决这类问题的常见解决方案。在微服务架构中，GraphQL 暴露出的接口分为分散式和集中式两种，然而只有集中式接口设计才能够最大化体现 GraphQL 的优势，但是在集中式接口设计中，所有的微服务对外暴露的是同一个接口，**因此处理流量的路由就不能简单地根据 URL 进行转发，而是应该根据请求中包含的不同字段进行转发**。

由于 NGINX 处理请求时仅会处理 URL 以及一些参数，但是只有解析请求参数中的查询信息才可以知道客户端访问的资源，从而进行路由转发，因此这种路由转发方式通过传统的 NGINX 是无法完成的。在实际应用场景中，将 GraphQL 接口直接对外暴露非常危险，因此需要一个专业的高性能 API 网关保护 GraphQL 的接口。

### 解决方案

基于 Apache APISIX 安全、稳定、高性能的特性，增加 GraphQL 灵活的路由匹配规则是解决 GraphQL 集中式接口设计问题的最佳方案。

![error/graphql architecture.png](https://static.apiseven.com/202108/1646200966179-1d649ab0-8d49-49f5-a8fa-a1a30af0519d.png)

在此方案中，Apache APISIX 作为 API 网关部署在 GraphQL Server 之前，为整个后端系统提供了安全保障，并且 Apache APISIX 根据自身所具备的 GraphQL 匹配功能，筛选一部分请求之后再由 GraphQL Server 进行处理，使整个请求资源过程变得更高效。

得益于 Apache APISIX 的动态特性，您可以启用限流限速、身份认证、可观测性等插件，无需重启服务，进一步提高此方案的运行效率，方便运维工作。

此外，Apache APISIX 还可以针对不同的 `graphql_operation` 进行不同的权限校验、针对不同的 `graphql_name` 转发到不同的 Upstream，具体细节将会在下文中进行描述。

**综上所述，Apache APISIX + GraphQL 的解决方案，在充分利用 GraphQL 搜索优势的同时也能拥有 Apache APISIX 作为 API 网关所具备的安全性和稳定性。**

## GraphQL 在 Apache APISIX 中的应用

### 基本逻辑

![error/GraphQL principle.png](https://static.apiseven.com/202108/1646201215532-f5965158-7456-443a-84a7-cadadb95fc1f.png)

目前 GraphQL 在 Apache APISIX 中的执行逻辑如下：

1. Clients 向 Apache APISIX 发起带有 GraphQL 语句的请求；
2. Apache APISIX 匹配路由并提取预设的 GraphQL 数据；
3. Apache APISIX 通过预设 GraphQL 数据对请求数据进行匹配；

- 匹配成功，Apache APISIX 将继续转发请求；
- 匹配失败，Apache APISIX 将立刻终止请求。

4. 是否存在插件；

- 如果存在插件，请求将继续被插件处理，处理完成后，继续转发到 GraphQL Server；
- 如果不存在插件，请求将直接转发到 GraphQL Server。

在 APISIX core 里内部匹配中，Apache APISIX 通过 [`graphql-lua`](https://github.com/bjornbytes/graphql-lua) 库实现对 GraphQL 的支持。Apache APISIX GraphQL 解析库会先对携带 GraphQL 语法的请求进行解析，之后将解析后的请求与预设在 Apache APISIX 数据库里的配置数据进行匹配。如果匹配成功 Apache APISIX 会放行并转发请求，反之则终止请求

### 具体配置

Apache APISIX 目前支持通过 GraphQL 的一些属性过滤路由：

- graphql_operation
- graphql_name
- graphql_root_fields

GraphQL 的属性与下面的所展示 GraphQL query 语句一一对应：

```Nginx
  query getRepo {
      owner {
          name
      }
      repo {
          created
      }
  }
```

- `graphql_operation` 对应 `query`
- `graphql_name` 对应 `getRepo`
- `graphql_root_fields` 对应 `["owner", "repo"]`

您可以通过如下示例为 Apache APISIX 设置一条路由来验证对 GraphQL 的匹配能力：

```Shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 \
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
              "192.168.1.200:4000": 1
          }
      }
  }'
```

接下来使用带有 GraphQL 语句的请求去访问：

```Shell
curl -H 'content-type: application/graphql' \
-X POST http://127.0.0.1:9080/graphql -d '
query getRepo {
    owner {
        name
    }
    repo {
        created
    }
}'
```

如果匹配成功，则 Apache APISIX 继续进行请求转发。

```Shell
HTTP/1.1 200 OK
```

反之，则终止请求。

```Shell
HTTP/1.1 404 Not Found
```

## 进阶操作

 Apache APISIX 可以根据不同的 `graphql_name` 转发到不同的 Upstream，以及根据不同 `graphql_operation` 进行不同的权限校验。下文将为您展示此特性的代码配置。

### 使用 `graphql_name` 匹配 Upstream

1. 创建第一个上游服务：

```Shell
  curl http://192.168.1.200:9080/apisix/admin/upstreams/1 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
  {
      "type": "chash",
      "key": "remote_addr",
      "nodes": {
          "192.168.1.200:1980": 1
      }
  }'
```

2. 创建与第一个上游服务绑定的 GraphQL 路由，`graphql_name` 设置为 `getRepo111`：

```Shell
  curl http://192.168.1.200:9080/apisix/admin/routes/1 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
  {
      "methods": ["POST"],
      "uri": "/graphql",
      "vars": [
          ["graphql_operation", "==", "query"],
          ["graphql_name", "==", "getRepo111"],
          ["graphql_root_fields", "has", "owner"]
      ],
      "upstream_id": "1"
  }'
```

3. 创建第二个上游服务：

```Shell
  curl http://192.168.1.200:9080/apisix/admin/upstreams/2 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
  {
      "type": "chash",
      "key": "remote_addr",
      "nodes": {
          "192.168.1.200:1981": 1
      }
  }'
```

4. 创建与第二个上游服务绑定的 GraphQL 路由，`graphql_name` 设置为 `getRepo222`：

```Shell
  curl http://192.168.1.200:9080/apisix/admin/routes/2 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
  {
      "methods": ["POST"],
      "uri": "/graphql",
      "vars": [
          ["graphql_operation", "==", "query"],
          ["graphql_name", "==", "getRepo222"],
          ["graphql_root_fields", "has", "owner"]
      ],
      "upstream_id": 2
  }'
```

5. 测试示例

使用之前所创建的两个 `graphql_name` 服务进行测试，您可以发现 Apache APISIX 可以根据请求中不同的 `graphql_name` 自动选择转发的 Upstream。

- 如果请求是此示例：

```Shell
  curl -i -H 'content-type: application/graphql' \
  -X POST http://192.168.1.200:9080/graphql -d '
  query getRepo111 {
      owner {
          name
      }
      repo {
          created
      }
  }'
```

则会返回来自上游 `192.168.1.200:1980` 的响应：

```Shell
  HTTP/1.1 200 OK
  ---URI
  /graphql
  ---Service Node
  Centos-port: 1980
```

- 如果请求是这个示例：

```Shell
  curl -i -H 'content-type: application/graphql' \
  -X POST http://192.168.1.200:9080/graphql -d '
  query getRepo222 {
      owner {
          name
      }
      repo {
          created
      }
  }'
  ```

则会返回来自上游 `192.168.1.200:1981` 的响应：

```Shell
  HTTP/1.1 200 OK
  ---URI
  /graphql
  ---Service Node
  Centos-port: 1981
```

### 使用 `graphql_operation` 进行不同的权限校验

上述示例提供了 `graphql_operation` 为 `query` 的匹配规则，现在使用 `mutation` 形式的 GraphQL 请求。

1. 配置 Apache APISIX：

```Shell
curl http://192.168.1.200:9080/apisix/admin/routes/11 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["POST"],
    "uri": "/hello",
    "vars": [
        ["graphql_operation", "==", "mutation"],
        ["graphql_name", "==", "repo"]
    ],
    "upstream": {
        "nodes": {
            "192.168.1.200:1982": 1
        },
        "type": "roundrobin"
    }
}'
```

2. 发起 `mutation` 请求用来验证 Apache APISIX 的配置：

```Shell
curl -i -H 'content-type: application/graphql' \
-X POST http://192.168.1.200:9080/hello -d '
mutation repo($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}'
```

返回结果如下所示：

```Shell
HTTP/1.1 200 OK
---URI
/hello
---Service Node
Centos-port: 1982
```

## 搭配插件

Apache APISIX 拥有丰富的插件生态以应对不同的使用场景，如果在使用 Apache APISIX + GraphQL 时添加适合的插件，就可以使方案应用的场景变得更多。

本文仅选取了以下两种类型的插件进行举例。

### `limit-count` 速度插件

搭配使用 `limit-count` 插件，流量经过 GraphQL 匹配规则得到转发之后进一步被限制。得益于 Apache APISIX 的特性，可以达到动态、精细化、分布式的限流限速。详情请参考 [Apache APISIX 官方文档](https://apisix.apache.org/zh/docs/apisix/plugins/limit-count)。

### 可观测性插件

Apache APISIX 提供了包括但不仅限于 [`prometheus`](https://apisix.apache.org/zh/docs/apisix/plugins/prometheus)、[`skywalking`](https://apisix.apache.org/zh/docs/apisix/plugins/skywalking) 等可观测性插件，能够为系统提供更多监控指标数据，方便系统后续的运营维护等实现。

## 总结

本文为大家初步介绍了 GraphQL 在 Apache APISIX 中的应用，并且使用实际代码，为您展示了Apache APISIX 与 GraphQL 两项技术的结合，用户可以根据自身的业务需求和实际场景在 Apache APISIX 中使用 GraphQL。

关于 GraphQL 的更多说明和完整配置信息，可参考 [Apache APISIX官方文档](https://apisix.apache.org/zh/docs/apisix/router-radixtree/#%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87-graphql-%E5%B1%9E%E6%80%A7%E8%BF%87%E6%BB%A4%E8%B7%AF%E7%94%B1)。

Apache APISIX 项目目前正在开发其他插件以支持集成更多服务，如果您对此有兴趣，您可以通过 [GitHub Discussions](https://github.com/apache/apisix/discussions) 发起讨论，或通过[邮件列表](https://apisix.apache.org/docs/general/join)进行交流.
