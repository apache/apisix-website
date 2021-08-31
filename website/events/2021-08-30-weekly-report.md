---
title: "Apache APISIX 社区周报 ｜ 2021 8.23-8.29"
keywords:
- APISIX
- 社区周报
- 贡献者
- Good first issue
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
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

**链接**：https://github.com/apache/apisix/issues/4441

**问题描述**：现在 APISIX stream_routes 的参数 "remote_addr"只支持单个 ip，需要支持多个 ip 或者像 "192.168.0.0/16 "这样的匹配规则，就像 http 路由参数 "remote_addr"一样。

### Issue #3601

**链接**：https://github.com/apache/apisix/issues/3601

**问题描述**：目前 APISIX 只有请求-响应 gRPC 代理的单元测试，没有流式 gRPC 的相关测试。需要为其添加流式gRPC的测试用例。

### Issue #3931

**链接**：https://github.com/apache/apisix/issues/3931

**问题描述**：重定向插件中的 http_to_https 缺乏 curl 测试，需要为重定向插件中的 http_to_https 添加 curl 测试，并更新文档 http://apisix.apache.org/docs/apisix/plugins/redirect

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

- [在 Apche APISIX 中使用 Casbin 进行授权](https://mp.weixin.qq.com/s/llnla9-9TmEjMewGNz9Gxw)：当我们在使用 Apache APISIX 时，可能想要在应用里添加复杂的授权逻辑。在此篇文章中，我们将使用 Apache APISIX 的内置 Casbin 插件（authz-casbin）来实现基于角色的访问控制（RBAC）模型。

- [Apache APISIX 社区周报 ｜ 2021 8.16-8.22](https://mp.weixin.qq.com/s/SSV7lwrhTQbsn6AvafG34A)：“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

- [Apache APISIX Meetup 上海站全程回顾](https://mp.weixin.qq.com/s/SaHn_PMiqJT29aAIpteeCA)：Apache APISIX Meetup 上海站已于 8.21 顺利举办！一起来回顾下大会中令人难忘的精彩演讲吧！

- [为什么 APISIX 选择 Nginx + Lua 这个技术栈？](https://mp.weixin.qq.com/s/EBo_cUEPf0U59oyq7j61Zg)：介绍 APISIX 选用 Nginx + Lua 这个技术栈的历史背景和优势，指出“高性能 + 灵活”是 APISIX 能够从众多网关中脱颖而出的重要原因。

- [Apache APISIX 2.9 正式发布，带来更多新功能！](https://mp.weixin.qq.com/s/cz-e0BAef7WaLZUuoPsp4w)：Apache APISIX 2.9 版本正式发布！该版本有 30+ 开发者参与，共提交了 100+ PR，新增了 2 个新功能，进一步完善了对插件的支持，快来了解 Apache APISIX 2.9 版本的新特性吧！
