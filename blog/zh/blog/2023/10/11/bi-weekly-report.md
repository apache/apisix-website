---
title: "社区双周报 (9.25 - 10.08)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: Apache APISIX 社区的双周报旨在帮助社区成员更全面了解项目的每周进展，更迅速便捷地融入 Apache APISIX 社区。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/10/09/QdFwS3Ge_ZH-COVER.png
---

> 最近，我们修复并改进了 Apache APISIX 的部分功能，如 DNS 服务发现支持指定的 resolv.conf 文件、`traffic-split` 插件支持 https，以及 Consul 服务发现支持 ACL tokens。您可以在本期双周报中详细了解这些新功能。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源API网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2023.9.25 至 2023.10.08，有 22 名开发者提交了 43 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

最近，我们对一些功能进行了修复和改进，更新内容总结如下：

1. DNS 服务发现支持指定的 resolv.conf 文件

2. `traffic-split` 插件支持 https

3. Consul 服务发现支持 ACL tokens

Apache APISIX 社区的双周报旨在帮助社区成员更全面了解项目的每周进展，更迅速便捷地融入 Apache APISIX 社区。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/10/09/1r8sLlzK_LIST.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/10/09/xO6LPFNm_NEW.png)

## 近期亮点功能

### Apache APISIX

- [DNS 服务发现支持指定的 resolv.conf 文件](https://github.com/apache/apisix/pull/9770)（贡献者：[Revolyssup](https://github.com/Revolyssup))

- [`traffic-split` 插件支持 https](https://github.com/apache/apisix/pull/9115)（贡献者：[TenYearsIn](https://github.com/TenYearsIn))

- [Consul 服务发现支持 ACL tokens](https://github.com/apache/apisix/pull/10278)（贡献者：[sevensolutions](https://github.com/sevensolutions))

## 最新博客速览

- [荷兰智慧城市革命：WeCity 与 APISIX 的合作之旅](https://apisix.apache.org/zh/blog/2023/10/09/wecity-uses-apisix/)

  “开源项目 APISIX 的运营理念开放灵活，自身功能强大齐全，社区响应沟通及时，优点相当瞩目。”—— WeCity 联合创始人兼首席技术官 Arjen Hof、WeCity 软件架构师兼首席开发人员 Tim van Densen

- [APISIX 新特性之 GitOps 声明式配置](https://apisix.apache.org/zh/blog/2023/10/07/apisix-gitops-adc/)

  APISIX 引入了新的周边工具 ADC，用以支持 GitOps 声明式，帮助用户在非 Kubernetes 环境中以声明式的方式进行各种集成。

- [Apache APISIX 3.6.0 正式发布](https://apisix.apache.org/zh/blog/2023/10/05/release-apache-apisix-3.6.0/)

  我们很高兴地宣布 Apache APISIX 3.6.0 版本已经发布，带来一系列新功能、Bug 修复和相关用户体验优化。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
