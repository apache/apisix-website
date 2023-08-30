---
title: "社区双周报 (8.14 - 8.27)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/08/28/OHAygjUI_%E4%B8%AD%E6%96%87%E5%A4%B4%E5%9B%BE.png
---

> 我们近期对 Apache APISIX 和 APISIX Ingress Controller 的部分功能进行了修复或改善，包括为 `openid-connect` 插件增加 proxy 配置项、tencent-cloud-cls 修复 DNS 解析失败问题、为 ApisixUpstream 资源增加了 pass host 的配置能力、将 Go 工具链升级至 v1.20 等，详情请阅读本期双周报。

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

从 2023.8.14 - 2023.8.27，有 15 位开发者为 Apache APISIX 提交了 32 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

我们近期对部分功能进行了修复或改善，更新内容汇总如下：

1. 为 `openid-connect` 插件增加 proxy 配置项

2. tencent-cloud-cls 修复 DNS 解析失败问题

3. Admin-API 增加 api schema 校验支持

4. `WASM` 插件支持传递原生 json 数据结构

5. 为 ApisixUpstream 资源增加了 pass host 的配置能力

6. 将 Go 工具链升级至 v1.20

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/08/28/tdXTURvu_%E5%85%A8%E9%83%A8%E8%B4%A1%E7%8C%AE%E8%80%85.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/08/28/J0at5ZSF_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85.png)

## 近期亮点功能

### Apache APISIX

- [为 `openid-connect` 插件增加 proxy 配置项](https://github.com/apache/apisix/pull/9948)（贡献者：[darkSheep404](https://github.com/darkSheep404)）

- [tencent-cloud-cls 修复 DNS 解析失败问题](https://github.com/apache/apisix/pull/9843)（贡献者：[jiangfucheng](https://github.com/jiangfucheng)）

- [Admin-API 增加 api schema 校验支持](https://github.com/apache/apisix/pull/10065))（贡献者：[kingluo](https://github.com/kingluo)）

- [`WASM` 插件支持传递原生 json 数据结构](https://github.com/apache/apisix/pull/10072)（贡献者：[Sn0rt](https://github.com/Sn0rt)）

### APISIX Ingress Controller

- [为 ApisixUpstream 资源增加了 pass host 的配置能力](https://github.com/apache/apisix-ingress-controller/pull/1889) (贡献者：[ikatlinsky](https://github.com/ikatlinsky))

- [将 Go 工具链升级至 v1.20](https://github.com/apache/apisix-ingress-controller/pull/1788) (贡献者：[WVenus](https://github.com/WVenus))

## 最新博客速览

- [Apache APISIX 3.2.2 正式发布](https://apisix.apache.org/zh/blog/2023/07/23/release-apache-apisix-3.2.2/)

  我们很高兴地介绍 Apache APISIX 3.2.2。此版本包含了一系列的修复和优化。

- [Apache APISIX 3.4.1 正式发布](https://apisix.apache.org/zh/blog/2023/07/21/release-apache-apisix-3.4.1/)

  我们很高兴地宣布 Apache APISIX 3.4.1 版本已经发布，其中包含了针对 JWT 的安全补丁。

- [APISIX 的出海征程势如破竹：APISIX 马来西亚 Meetup](https://apisix.apache.org/zh/blog/2023/07/12/2023-apisix-meetup-malaysia/)

  近日，Apache APISIX 发起的技术盛宴，在马来西亚首都吉隆坡隆重开幕！活动由 API7（支流科技）与 N2N（N2N Connect Berhad，联圣）及 AMD（Advanced Micro Devices, Inc.,）联合举办，汇集了众多 API 网关技术领域的专家和爱好者。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
