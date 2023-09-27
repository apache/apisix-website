---
title: "社区双周报 (9.11 - 9.24)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/09/25/FIgUq7x3_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E4%B8%AD%E6%96%87.png
---

> 最近，我们修复并改进了 Apache APISIX 的部分功能，如 dubbo 协议的 xrpc 支持、支持在 access_log 中记录 opentelemetry 变量，以及在外部插件中修改请求  body 的功能。您可以在本期双周报中详细了解这些新功能。
<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

从 2023.9.11 - 2023.9.24，有 23 位开发者为 Apache APISIX 提交了 43 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

我们近期对部分功能进行了修复或改善，更新内容汇总如下：

1. 使用 `xrpc` 支持 dubbo 协议

2. 支持在 `access_log` 中记录 opentelemetry 变量

3. 支持在外部插件中修改请求 body

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/09/26/vv9C03oJ_Frame%204.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/09/26/0xnTsOLT_9.24-newcon.png)

## 近期亮点功能

### Apache APISIX

- [使用 xrpc 支持 dubbo 协议](https://github.com/apache/apisix/pull/9660)（贡献者：[wxbty](https://github.com/wxbty)))

- [支持在 access_log 中记录 opentelemetry 变量](https://github.com/apache/apisix/pull/8871)（贡献者：[lework](https://github.com/lework))

- [支持在外部插件中修改请求 body](https://github.com/apache/apisix/pull/9990)（贡献者：[jiangfucheng](https://github.com/jiangfucheng)、[rubikplanet](https://github.com/rubikplanet))

## 最新博客速览

- [APISIX 新特性之 WAF 解决方案：Coraza](https://apisix.apache.org/zh/blog/2023/09/08/apisix-integrates-with-coraza/)

  APISIX 与 Coraza 的集成为企业提供了可靠的安全防护，确保 API 服务的完整性和可靠性。

- [Apache APISIX 3.5.0 正式发布](https://apisix.apache.org/zh/blog/2023/09/01/release-apache-apisix-3.5.0/)

  我们很高兴地宣布 Apache APISIX 3.5.0 版本已经发布，带来了振奋人心的新功能和改进的用户体验。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
