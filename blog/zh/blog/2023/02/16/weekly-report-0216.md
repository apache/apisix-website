---
title: "社区双周报 (1.30 - 2.12)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/02/13/xj7nNAsU_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%A4%B4%E5%9B%BE-03%E5%91%A8.png
---

> 从 2023.1.30 - 2023.2.12，有 36 位开发者为 Apache APISIX 提交了 69 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 Issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/02/13/atGiY8KB_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5-03%E5%91%A8.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/02/13/duMIjv3Z_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E6%96%B0%E6%99%8B%E6%B5%B7%E6%8A%A5-03%E5%91%A8.png)

## Good First Issue

### Issue #8772

链接：[https://github.com/apache/apisix/issues/8772](https://github.com/apache/apisix/issues/8772)

问题描述：对 OIDC 认证相关的自定义配置进行验证，以便用户对不合规配置限制其向后端访问。

### Issue #1075

链接：[https://github.com/apache/apisix-ingress-controller/issues/1075](https://github.com/apache/apisix-ingress-controller/issues/1075)

问题描述：为 APISIX Ingress 增加使用 apisix:dev 的回归测试，以便尽早发现与 APISIX 最新修改的兼容问题

## 近期亮点功能

### Apache APISIX

- [增加 `body-transformer` 插件，提供将上游响应体进行格式转换的能力](https://github.com/apache/apisix/pull/8766)（贡献者：[kingluo](https://github.com/kingluo)）

- [`error-log` 插件提供将错误日志发送到 Kafka 集群的能力](https://github.com/apache/apisix/pull/8693)（贡献者：[ronething](https://github.com/ronething)）

- [`elasticsearch-logger` 提供多 Elasticsearch 节点随机写入支持，降低节点压力](https://github.com/apache/apisix/pull/8604)（贡献者：[xiaoxuanzi](https://github.com/xiaoxuanzi)）

- [Stream 代理模式提供 Consul 服务发现支持](https://github.com/apache/apisix/pull/8696)（贡献者：[ronething](https://github.com/ronething)）

- [允许 logger 类插件自定义日志格式](https://github.com/apache/apisix/pull/8806)（贡献者：[spacewander](https://github.com/spacewander)）

- [`file-logger` 插件支持通过 `resp_body` 变量访问上游响应体内容](https://github.com/apache/apisix/pull/8711)（贡献者：[mscb402](https://github.com/mscb402)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
