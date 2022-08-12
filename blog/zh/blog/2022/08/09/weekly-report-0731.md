---
title: "社区双周报 (7.16 - 7.31)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了 openid-connect 插件中支持 PKCE、Ingress 资源可以直接使用 APISIX 的插件等功能。
tags: [Community]
image: https://static.apiseven.com/2022/weeklyreport/0809/biweekly-2022.7.16-2022.7.31-zh.png
---

> 从 7.16 - 7.31，有 28 位开发者为 Apache APISIX 提交了 93 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/2022/weeklyreport/0809/1.png)

![本周新晋贡献者](https://static.apiseven.com/2022/weeklyreport/0809/2.png)

## Good first issue

### Issue #7538

**链接**：https://github.com/apache/apisix/issues/7538

**问题描述**：在目前的官网博客及文档中硬性规定了 APISIX 的版本，导致一些新来的小伙伴在阅读旧版本的博客时产生了误解。这也使得更新文档中最新的 APISIX 版本变得更加困难，因为我们需要同时修改好几个地方。

或许可以添加一个包含版本号的静态文件，并提供一个简单的单行命令来获取文档中的版本号。

## 近期功能特性亮点

- [`proxy-rewrite` 插件支持使用原始请求的 URI，绕过默认的 URI 编码](https://github.com/apache/apisix/pull/7401)（贡献者：[ilteriseroglu-ty](https://github.com/ilteriseroglu-ty)）

- [`prometheus` 插件支持监控共享内存相关指标](https://github.com/apache/apisix/pull/7412)（贡献者：[ccxhwmy](https://github.com/ccxhwmy)）

- [支持动态控制是否执行某个插件](https://github.com/apache/apisix/pull/7453)（贡献者：[soulbird](https://github.com/soulbird)）

- [`jwt-auth` 支持设置时钟漂移参数](https://github.com/apache/apisix/pull/7500)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [Control API 支持打印所有插件的元数据](https://github.com/apache/apisix/pull/7514)（贡献者：[kingluo](https://github.com/kingluo)）

- [`clickhouse-logger` 插件支持设置多个端点](https://github.com/apache/apisix/pull/7517)（贡献者：[zhendongcmss](https://github.com/zhendongcmss)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [Apache APISIX Ingress v1.5-rc1 正式发布](https://apisix.apache.org/zh/blog/2022/08/05/apisix-ingress-1.5rc1-release/)

    历时 7 个月，Apache APISIX Ingress Controller v1.5-rc1 版本正式发布。带来 API Version 升级、Gateway API 支持以及 Ingress 相关资源的更新与调整。

- [Apache APISIX 2.15 正式发布](https://apisix.apache.org/zh/blog/2022/07/29/release-apache-apisix-2.15/)

    Apache APISIX 2.15 版本正式发布！用户可以自定义插件优先级和执行策略、自定义错误响应以及支持监控四层流量的指标等功能。

- [有了 NGINX 和 Kong，为什么还需要 Apache APISIX？](https://apisix.apache.org/zh/blog/2022/07/30/why-we-need-apache-apisix/)

    本文介绍了 Kong 和 NGINX 的痛点，以及 Apache APISIX 如何解决它们的痛点，并且为你介绍了 Apache APISIX 的应用场景。
