---
title: "社区周报（8.23-8.29）"
keywords:
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
- Good first issue
description: 本周 Apache APISIX 新增了 uri-blocker 支持匹配请求 URI 时忽略大小写，kafka-logger 支持配置 kafka 生产者的 acks 和 cluster name 参数等功能。
tags: [Community]
---

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue ！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![新增贡献者数量](https://static.apiseven.com/202108/1630393952402-4965d35c-6b05-4f71-9966-2fea7f7939d3.JPG)

![本周新晋贡献者](https://static.apiseven.com/202108/1630393952406-9f61c39b-ea9e-4451-bd26-ab845a32a222.JPG)

## Good first issue

### Issue #4241

**链接**：https://github.com/apache/apisix/issues/4241

**问题描述**：现在在将 jwt-auth 插件添加到一个 service/route 时，jwt 令牌未包含“key”声明。

```shell
{
  "iss":"http://127.0.0.1",
  "client_id":"application1",
  "sub": "1234567890",
  "iat": 1516239022
}
```

![问题描述截图](https://static.apiseven.com/202108/1630393952407-b6a26364-6c36-47f6-82c2-81514c31f20b.PNG)

### Issue #4441

**链接**：[Issue #4441](https://github.com/apache/apisix/issues/4441)

**问题描述**：现在 APISIX stream_routes 的参数 "remote_addr"只支持单个 ip，需要支持多个 ip 或者像 "192.168.0.0/16 "这样的匹配规则，就像 http 路由参数 "remote_addr"一样。

### Issue #3601

**链接**：[Issue #3601](https://github.com/apache/apisix/issues/3601)

**问题描述**：目前 APISIX 只有请求-响应 gRPC 代理的单元测试，没有流式 gRPC 的相关测试。需要为其添加流式 gRPC 的测试用例。

### Issue #3931

**链接**：[Issue #3931](https://github.com/apache/apisix/issues/3931)

**问题描述**：重定向插件中的 http_to_https 缺乏 curl 测试，需要为重定向插件中的 http_to_https 添加 curl 测试，并更新文档 [Apache APISIX 重定向插件](http://apisix.apache.org/docs/apisix/plugins/redirect)。

## 本周功能特性亮点

- uri-blocker 支持匹配请求 URI 时忽略大小写
  - **相关 PR**：https://github.com/apache/apisix/pull/4868
  - **贡献者**：[okaybase](https://github.com/okaybase)

- kafka-logger 支持配置 kafka 生产者的 acks 参数
  - **相关 PR**：https://github.com/apache/apisix/pull/4878
  - **贡献者**：[okaybase](https://github.com/okaybase)

- kafka-logger 支持配置 cluster name 参数
  - **相关 PR**：https://github.com/apache/apisix/pull/4876
  - **贡献者**：[tzssangglass](https://github.com/tzssangglass)

- referer-restriction 支持配置 blacklist
  - **相关 PR**：https://github.com/apache/apisix/pull/4916
  - **贡献者**：[okaybase](https://github.com/okaybase)

## 本周博文推荐

- [使用 Apache APISIX 的 OpenID Connect 插件进行集中身份认证](https://apisix.apache.org/blog/2021/08/25/Using-the-Apache-APISIX-OpenID-Connect-Plugin-for-Centralized-Authentication/)：Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 不仅支持插件动态变更和热插拔，而且拥有众多实用的插件。Apache APISIX 的 OpenID Connect 插件支持 OpenID，用户可以使用该插件将身份认证从传统认证模式替换为集中认证模式。

- [为什么 APISIX 选择 Nginx + Lua 这个技术栈？](https://apisix.apache.org/blog/2021/08/25/Why-Apache-APISIX-chose-Nginx-and-Lua)：介绍 APISIX 选用 Nginx + Lua 这个技术栈的历史背景和优势，指出“高性能 + 灵活”是 APISIX 能够从众多网关中脱颖而出的重要原因。

- [Apache APISIX 2.9 正式发布，带来更多新功能！](https://apisix.apache.org/blog/2021/08/27/release-apache-apisix-2.9/)：Apache APISIX 2.9 版本正式发布！该版本有 30+ 开发者参与，共提交了 100+ PR，新增了 2 个新功能，进一步完善了对插件的支持，快来了解 Apache APISIX 2.9 版本的新特性吧！
