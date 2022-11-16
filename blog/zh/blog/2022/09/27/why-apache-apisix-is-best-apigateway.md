---
title: "为什么说 Apache APISIX 是最好的 API 网关？"
authors:
  - name: 温铭
    title: Author
    url: https://github.com/moonming
    image_url: https://avatars.githubusercontent.com/u/26448043
keywords:
  - Ingress controller
  - 开源 API 网关
  - API 管理平台
  - Apache APISIX
description: 本文从多个角度（在开发人员中的受欢迎程度、开源许可证、性能和整个生态系统）对比多个 API 网关（Kong、Tyk、Gloo）。
tags: [Technology]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

> 本文首发于 [API7.ai](https://www.apiseven.com/blog/why-is-apache-apisix-the-best-api-gateway)，从多个角度（在开发人员中的受欢迎程度、开源许可证、性能和整个生态系统）对比多个 API 网关（Kong、Tyk、Gloo）。

<!--truncate-->

<head>
  <link rel="canonical" href="https://www.apiseven.com/blog/why-is-apache-apisix-the-best-api-gateway" />
</head>

今天，我们可以通过手机和各种 APP 完成各种各样的事情，比如社交，网购等。这些行为的背后，API 起到了关键的作用。作为 API 的使用者，我们并不关心 API 的稳定、安全和高效，但是通过 API 提供数据服务的企业则需要选择一个合适的 API 网关，用来保证数千乃至数万的 API 为提供快速和安全的服务。

在 CNCF 的 [API Gateway landscape](https://landscape.cncf.io/card-mode?category=api-gateway&grouping=category&sort=contributors) 中有接近 20 个 API 网关的选型（不包括公有云厂商的产品），包括 Apache APISIX、Kong、Tyk 等等。

很多网关都称自己是下一代 API 网关，是最受欢迎的开源 API 网关项目，那么事实如何呢？本文将通过开发者、知识产权和品牌、技术、生态等多个维度来看看 Apache APISIX 为什么是下一代 API 网关？

![API Gateway landscape](https://static.apiseven.com/2022/09/13/632052e8c6f34.png)

## 工程师的眼睛是雪亮的

工程师是 API 和 API 网关的使用者和开发者，更多工程师关注和参与的 API 网关项目，代表的就是技术的趋势。我们从 GitHub 代码贡献者的维度，选取了 4 个开源 API 网关进行对比：Apache APISIX、Kong、Tyk 和 Gloo。

![GitHub 贡献者统计图](https://static.apiseven.com/2022/09/13/632055a37ac26.png)

Kong 和 Tyk 都是 2015 年之前开始研发的，Apache APISIX 和基于 Envoy 的 Gloo 是在 2019 年左右开始研发的。从上图中的 [Github Contributor Over Time](https://git-contributor.com/?chart=contributorOverTime&repo=apache/apisix,solo-io/gloo,kong/kong,tyktechnologies/tyk) 可以看出，Kong 经过近 7 年的发展已经有超过 250 个贡献者参与，远远超过了 Tyk 和 Gloo；而最年轻的 Apache APISIX，已经超过 320 个贡献者，数量和增速都远超 Kong，成为最多开发者参与贡献的 API 网关项目。

除了贡献者总数外，还有一个指标可以看到更深层次的数据：贡献者的月度活跃。下图展示了以上四个开源 API 网关的月度活跃的开发者数量：

![月度活跃贡献者图](https://static.apiseven.com/2022/09/13/63205698e44f5.png)

Tyk 的贡献者月活跃人数，长期都是在 5 个人左右，很少超过 10 个人；而 Kong 和 Gloo 的贡献者月活跃人数均在 10 到 20 之间浮动；而 Apache APISIX 基本保持在 20 人以上，最高接近 40 人，是开发者最活跃的 API 网关。

这四个开源 API 网关项目背后，都是有对应的商业化公司的，所以还有第三个指标数据，那就是开源项目贡献者和商业公司员工数的对比：

|     **API Gateway**      | **APISIX** | **Kong** | **Tyk** | **Gloo** |
| :----------------------: | :--------: | :------: | :-----: | :------: |
|      月度活跃人数      |     38     |    20    |    8    |    24    |
| 公司成员(数据来自领英) |    40+     |   500+   |  200+   |   100+   |

当前（2022 年第三季度）Kong 和 Tyk 的开源投入比例（月度活跃贡献者/员工总数）是 4%，Gloo 是 24%，APISIX 则是接近 100%。即使回到 2017 年，Kong 的月度活跃贡献者也在 5 个人左右。

显而易见，开源项目 Apache APISIX 和它背后的商业化公司 API7.ai 从创建伊始，就保持了对于开源项目的持续投入，赢得了众多开发者的喜爱。

## 开源协议：企业用户选择开源项目的首要考虑因素

自从 MongoDB 修改了开源项目的 License 之后，在做基础软件的选型时，开源项目的 License 风险就是企业用户首要考虑的因素。

从表面上看，Apache APISIX、Kong 和 Gloo 使用的都是商业友好的 Apache License Version 2.0，Tyk 使用的是带有传染性的 Mozilla Public License Version 2.0。

更深入的看，Kong、Gloo 和 Tyk 这三个都是完全由商业公司控制的开源项目，它们可以像 MongoDB 一样随时在新版本中修改 License，限制公有云或者其他公司免费使用，进而要求你从开源用户转为付费客户来继续使用最新版本。

没有人知道这样的事情是否会发生，以及发生的几率有多大。这种风险，就像达摩克利斯之剑一样，悬挂在企业用户的头上。

在这种情况下，使用 Apache 软件基金会或者 CNCF 的开源项目是最明智的。而 Apache APISIX 是全球最大的软件基金会--Apache 软件基金会的顶级项目，所有的代码和品牌都归属于 Apache 软件基金会，任何商业公司都不能控制 Apache APISIX 项目，也不可能修改开源项目的 license。企业用户可以一直放心的使用，而不用担心收到律师和合规部门的问询邮件。

## 性能测试对比

在社区中经常会有用户提问：基于 Envoy 的 Gloo，和基于 NGINX 的 APISIX，谁的性能更胜一筹？
虽然性能并不是选型中最重要的指标，但它确实是最直接的指标。下表的表格是 Apache APISIX 和 Gloo 的 Benchmark 结果。从表格中可以看到，Apache APISIX 的 QPS 是 Gloo 的 4.6 倍，同时 Apache APISIX 的延迟还不到 Gloo 的 7%。

| **API Gateway** |                              Apache APISIX                               |                               Gloo Edge                                |
| :-------------: | :----------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|     **QPS**     |                                  59122                                   |                                 12903                                  |
|   **Latency**   | 50.000% 470.00us<br/>75.000% 648.00us<br/>90.000% 0.89ms<br/>99.000% 1.60ms | 50.000% 6.80ms<br/>75.000% 9.25ms<br/>90.000% 11.32ms<br/>99.000% 17.06ms |

这并不仅仅是 NGINX 和 Envoy 之间的差异造成的，而是因为 APISIX 在底层做了大量的优化，所以同样基于 NGINX 的 APSIX 相对于 Kong 也有巨大的性能优势。

为什么 APISIX 的性能优势如何之大？在代码面前，没有任何秘密。让我们从技术的角度来详细分析下。

## Apache APISIX 的技术优势

以下内容是 Apache APISIX 和 Kong、Gloo 相比在技术方面的主要优势，大部分都是在底层模块上的优化和创新。在简单的 PoC 上并不一定能够体现出这些技术的优势，但在复杂的生产环境中，Apache APISIX 的这些优势将会造成巨大的差距。

### 无数据库依赖

在 APISIX 项目出现之前，也有非常多的商业 API 网关或开源 API 网关产品，但这些产品大多数都把 API 数据、路由、证书和配置等信息存放在一个关系型数据库中。

将这些数据存储在关系型数据库的优势非常明显，用户可以更加方便地使用 SQL 语句进行灵活查询，也方便用户进行备份及后续维护。

但是网关作为一个基础中间件，它处理了所有来自客户端的流量，这种情况下对于可用性的要求便会非常高。如果你的 API 网关依赖了一个关系型数据库，也就意味着关系型数据库一旦出现了故障（比如宕机、丢失数据），API 网关也会因此受到影响，整个业务系统的可用性也会大打折扣。

而 APISIX 在设计之初，就从底层架构上避免了宕机、丢失数据等情况的发生。因为在控制面上，APISIX 使用了 etcd 存储配置信息，而不是使用关系型数据库，这样做的好处主要有以下几点：

- 与产品架构的云原生技术体系更统一；
- 更贴合 API 网关存放的数据类型；
- 能更好地体现高可用特性；
- 拥有低于毫秒级别的变化通知。

使用 etcd 存储配置信息后，对于数据面而言只需监听 etcd 的变化即可。如果采用轮询数据库的方式，可能需要 5-10 秒才能获取到最新的配置信息；如果监听 etcd 的配置信息变更，APISIX 就可以将获取最新配置的时间控制在毫秒级别之内，达到实时生效。

因此使用 etcd 作为存储，不仅让 APISIX 在底层上更加贴合云原生，也让它在系统高可用的体现上带来了更多优势。

### 高性能路由匹配算法

API 网关需要从每个请求的 Host、URI、HTTP 方法等特征中匹配到目标规则，以决定如何对该请求进行处理，因此一个优秀的匹配算法是必不可少的。Hash 算法性能不错，但无法实现模糊匹配；正则可以模糊匹配，但性能不好，因此 Apache APISIX 选择使用树这样一种高效且支持模糊匹配的搜索数据结构。

准确一些，Apache APISIX 使用的是 RadixTree，它提供了 KV 存储查找的数据结构并对只有一个子节点的中间节点进行了压缩，因此它又被称为压缩前缀树。此外，在已知 API 网关产品中 Apache APISIX 首次将 RadixTree 应用到了路由匹配中，支持一个前缀下有多个不同路由的场景，具体实现参考 [lua-resty-radixtree](https://github.com/api7/lua-resty-radixtree)。

当对某个请求进行匹配时，RadixTree 将采用层层递进的方式进行匹配，其复杂度为 O(K)（K 是路由中 URI 的长度，与 API 数量多少无关），该算法非常适合公有云、CDN 以及路由数量比较多的场景，可以很好地满足路由数量快速增长的需求。

### 高性能 IP 匹配算法

IP 地址有 2 种记法：标准 IP 表示方法与 CIDR 表示方法，以 32 位的 IPv4 为例：

- 标准 IP 记法：192.168.1.1
- CIDR 记法：192.168.1.1/8

Apache APISIX 的 IP 匹配算法与路由匹配算法所使用的原理以及原始数据是不一样的。以 192.168.1.1 这个 IP 为例，由于每个 IP 段的范围是 0 到 255，因此在对 IP 进行匹配时我们可以认为 IP 地址是由 4 个 16 位整数型的数构成的，IP 长度是固定的。那么我们可以采用更高效的算法完成匹配。

假设现在有一个包含 500 条 IPv4 记录的 IP 库，APISIX 会将 500 条 IPv4 的记录缓存在 Hash 表中，当进行 IP 匹配时使用 Hash 的方式进行查找，时间复杂度为 O(1)。

而其他 API 网关则是通过遍历的方式完成 IP 匹配，发送到网关每个请求将逐个遍历最多 500 次是否相等后才能知道计算结果。所以 APISIX 的高精度 IP 匹配算法大大提高了需要进行海量 IP 黑白名单匹配场景（如 WAF）的效率。

### 精细化路由

API 网关通过请求中的流量特征完成预设规则的匹配，常见特征包含了请求中的 Host、URI 路径、URI 查询参数、URI 路径参数、HTTP 请求方法、请求头等，这些特征是大部分 API 网关产品所支持的。相较于其它产品，Apache APISIX 支持了更多特征以解决复杂多变的使用场景。

首先，Apache APISIX 支持 NGINX 内置变量，意味着我们可以将诸如 `uri`、`server_name`、`server_addr`、`request_uri`、`remote_port`、`remote_addr`、`query_string`、`host`、`hostname`、`hostname`、`arg_name` 等数十种 NGINX 内置变量作为匹配参数，以支持更复杂多变的匹配场景。NGINX 内置变量列表请参考 [NGINX 变量](http://nginx.org/en/docs/varindex.html)文档。

其次，Apache APISIX 支持将条件表达式作为匹配规则，其结构是 `[var, operator, val], ...]]`，其中：

- `var` 值可使用 NGINX 内置变量；
- `operator` 支持相等、不等、大于、小于、正则、包含等操作符。

假设表达式为 `["arg_name", "==", "json"]` ，它意味着当前请求的 URI 查询参数中，是否有一个为 `name` 的参数值等于 `json`。Apache APISIX 是通过自研的库 `lua-resty-expr` 实现该能力的，具体请参考 [lua-resty-expr](https://github.com/api7/lua-resty-expr)。该特性将选择权交给了用户，可扩展性强。

此外，Apache APISIX 支持设置路由 `ttl` 存活时间：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/2?ttl=60 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "/aa/index.html",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "39.97.63.215:80": 1
        }
    }
}'
```

以上配置表示，在 60s 后 APISIX 会自动删除该路由配置，非常适合一些临时验证的场景，比如金丝雀发布、监控输出等。对于线上的流量分流非常方便，是其它网关产品所不具备的能力。

最后一点是 Apache APISIX 支持自定义过滤函数，你可以通过在 `filter_func` 参数中编写自定义 Lua 函数，例如：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "/index.html",
    "hosts": ["foo.com", "*.bar.com"],
    "filter_func": "function(vars)
                    return vars['host'] == 'api7.ai'
                end",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

其中 `filter_func` 入参是 `vars`，可从 `vars` 获取 NGINX 变量，然后实现自定义过滤逻辑。

### 支持多语言插件

虽然 API 网关、数据库或其他中间件都属于基础组件，但是更多时候用户是根据使用场景对 API 网关进行一些定制化地开发和系统集成。

APISIX 目前已经支持了 80 多种插件，但仍然难以涵盖用户的所有使用场景。在实际使用场景中，很多企业都会针对具体业务进行定制化的插件开发，通过网关去集成更多的协议或者系统，最终在网关层实现统一管理。

在 APISIX 早期版本中，开发者仅能使用 Lua 语言开发插件。虽然通过原生计算语言开发的插件具备非常高的性能，但是学习 Lua 这门新的开发语言是需要时间和理解成本的。

针对这种情况，APISIX 提供了两种方式来解决：

第一种方式是通过 Plugin Runner 来支持更多的主流编程语言（比如 Java、Python、Go 等等）。通过这样的方式，可以让后端工程师通过本地 RPC 通信，使用熟悉的编程语言开发 APISIX 的插件。

这样做的好处是减少了开发成本，提高了开发效率，但是在性能上会有一些损失。那么，有没有一种既能达到 Lua 原生性能，同时又兼顾高级编程语言的开发效率方案呢？

![多语言架构](https://static.apiseven.com/2022/09/13/632057a0ad122.png)

第二种方式是使用 Wasm 开发插件，也就是上图左侧部分。Wasm（WebAssembly）最早是用在前端和浏览器上的一个技术，但是现在在服务端它也逐渐展示出来它的优势。我们将 Wasm 嵌入到了 APISIX 中，用户就可以使用 Wasm 去编译成 Wasm 的字节码在 APISIX 中运行。最终达到的效果就是利用高效率，开发出了一个既有高性能又使用高级计算语言编写的 APISIX 插件。

因此，在当前 APISIX 版本中，用户可以使用 Lua、Go、Python 和 Wasm 等多种方式，基于 APISIX 编写自定义插件。通过这样的方式，降低了开发者的使用门槛，也为 APISIX 的功能提供了更多的可能性。

## 总结

本文从工程师、开源协议、性能评测、技术、生态系统等多个角度分析和比较了一些 API 网关产品，可以看出 Apache APISIX 是其中的佼佼者，引领了 API 网关领域的创新。

Apache APISIX 不仅是一个可以处理南北向流量的 API 网关，同时也有 APISIX  Ingress Controller、Service Mesh 等开源产品。本月底 APISIX 也将发布 3.0 预览版，带来全新功能与全方位产品提升，敬请期待！
