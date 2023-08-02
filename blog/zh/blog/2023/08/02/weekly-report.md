---
title: "社区双周报 (7.17 - 7.30)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/07/31/roJS3E1h_%E4%B8%AD%E6%96%87%E5%A4%B4%E5%9B%BE.png
---

> 我们近期对 Apache APISIX 的部分功能进行了修复或改善，包括修复 jwt 安全问题、`ua-restriction` 不再允许同时配置 allowlist 与 denylist、修复 `google-cloud-logging` 插件的配置、允许将由 OPA 服务器返回的 headers 发送到上游，详情请阅读本期双周报。

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

从 2023.7.17 - 2023.7.30，有 16 位开发者为 Apache APISIX 提交了 38 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

我们近期对部分功能进行了修复或改善，更新内容汇总如下：

1. 更新`api7-lua-resty-jwt` 版本至 0.2.5

2. `ua-restriction` 不再允许同时配置 allowlist 与 denylist

3. 修复 `google-cloud-logging` 插件的配置

4. 允许将由 OPA 服务器返回的 headers 发送到上游

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/07/31/RIIPKarO_%E6%89%80%E6%9C%89%E8%B4%A1%E7%8C%AE%E8%80%85.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/07/31/kRFlqxZk_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85.png)

## 近期亮点功能

### Apache APISIX

- [更新 `api7-lua-resty-jwt` 版本至 0.2.5](https://github.com/apache/apisix/pull/9837)（贡献者：[Sn0rt](https://github.com/Sn0rt)）

- [`ua-restriction` 不再允许同时配置 allowlist 与 denylist](https://github.com/apache/apisix/pull/9841)（贡献者：[jiangfucheng](https://github.com/jiangfucheng)）

- [修复了 `google-cloud-logging` 插件的配置](https://github.com/apache/apisix/pull/9622)（贡献者：[kindomLee](https://github.com/kindomLee)）

- [允许将由 OPA 服务器返回的 headers 发送到上游](https://github.com/apache/apisix/pull/9710)（贡献者：[Revolyssup](https://github.com/Revolyssup)）

## 最新博客速览

- [Apache APISIX 3.4.1 正式发布](https://apisix.apache.org/zh/blog/2023/07/21/release-apache-apisix-3.4.1/)

  我们很高兴地宣布 Apache APISIX 3.4.1 版本已经发布，其中包含了针对 JWT 的安全补丁。

- [APISIX 的出海征程势如破竹：APISIX 马来西亚 Meetup](https://apisix.apache.org/zh/blog/2023/07/12/2023-apisix-meetup-malaysia/)

    近日，Apache APISIX 发起的技术盛宴，在马来西亚首都吉隆坡隆重开幕！活动由 API7（支流科技）与 N2N（N2N Connect Berhad，联圣）及 AMD（Advanced Micro Devices, Inc.,）联合举办，汇集了众多 API 网关技术领域的专家和爱好者。

- [Release Apache APISIX 3.4.0](https://apisix.apache.org/zh/blog/2023/06/30/release-apache-apisix-3.4.0/)
  
    此版本提供了一个新的插件 loki-logger，可将日志转发到 Grafana Loki，并允许在路由级别上建立 mTLS 连接。此外，此版本还还引入了许多新的特性，旨在优化对 APISIX 的使用体验。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
