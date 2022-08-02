---
title: "社区双周报（5.16 - 5.31）"
keywords: 
- Apache APISIX
- API 网关
- Kafka
- pubsub
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
---

> 从 5.16 - 5.31，有 33 位开发者为 Apache APISIX 提交了 96 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://user-images.githubusercontent.com/88811141/174761990-3a612e2c-594f-408c-a684-85b03c5261f2.png)

![本周新晋贡献者](https://user-images.githubusercontent.com/88811141/174762094-38e008d2-7170-4873-841d-caf4ab11ed67.png)

## Good first issue

### Issue #7164

**链接**：https://github.com/apache/apisix/issues/7164

**问题描述**：目前社区正在使用 Semantic Pull Requests（语义拉动请求）来检查 PR，但是该项目已经不再维护了，所以需要一些替代方案。

比如：https://github.com/amannn/action-semantic-pull-request

## 近期功能特性亮点

- [xRPC 框架新增 `rpc_time` 变量](https://github.com/apache/apisix/pull/7040)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [pubsub 框架支持 Kafka](https://github.com/apache/apisix/pull/7032)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [xRPC 框架下代理 Redis 协议新增 `redis_cmd_line` 变量](https://github.com/apache/apisix/pull/7041)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [pubsub 框架 ping 命令添加默认处理程序](https://github.com/apache/apisix/pull/7058)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [pubsub 支持 Kafka TLS 和 SASL/PLAIN 认证](https://github.com/apache/apisix/pull/7046)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [允许在插件中自定义响应](https://github.com/apache/apisix/pull/7128)（贡献者：[spacewander](https://github.com/spacewander)）

- [在 APISIX Ingress 项目中增加 Gateway API 的 HTTPRoute 的支持](https://github.com/apache/apisix-ingress-controller/pull/1037)（贡献者：[lingsamuel](https://github.com/lingsamuel))

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。
