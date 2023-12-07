---
title: "社区双周报 (10.23 - 11.05)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: Apache APISIX 社区的双周报旨在帮助社区成员更全面了解项目的每周进展，更迅速便捷地融入 Apache APISIX 社区。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/11/06/8NFMgXNt_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E4%B8%AD%E6%96%87-11.06.png
---

> 最近，我们修复并改进了 Apache APISIX 的部分功能，如支持导出 `zipkin` 插件的变量和安装依赖项从 apisix-base 改为 apisix-runtime。您可以在本期双周报中详细了解这些新功能。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2023.10.23 至 2023.11.05，有 20 名开发者提交了 31 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

最近，我们对一些功能进行了修复和改进，更新内容总结如下：

1. 支持导出 `zipkin` 插件的变量  

2. 安装依赖项从 apisix-base 改为 apisix-runtime

Apache APISIX 社区的双周报旨在帮助社区成员更全面了解项目的每周进展，更迅速便捷地融入 Apache APISIX 社区。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/11/06/KIq2vqua_11.06-Contributors.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/11/06/YPE25fUK_11.06-New.png)

## 近期亮点功能

### Apache APISIX

- [支持导出 `zipkin` 插件的变量](https://github.com/apache/apisix/pull/10361)（贡献者：[wizhuo](https://github.com/wizhuo))

- [安装依赖项从 apisix-base 改为 apisix-runtime](https://github.com/apache/apisix/pull/10427)（贡献者：[Sn0rt](https://github.com/Sn0rt))

## 最新博客速览
  
- [APISIX Ingress Controller：一种无需 etcd 的轻量级部署方式](https://apisix.apache.org/zh/blog/2023/10/18/ingress-apisix/)

  APISIX Ingress Controller 创新架构，摆脱对 etcd 集群的依赖，极大简化维护成本和系统复杂性。

- [APISIX 新特性之 GitOps 声明式配置](https://apisix.apache.org/zh/blog/2023/10/07/apisix-gitops-adc/)

  APISIX 引入了新的周边工具 ADC，用以支持 GitOps 声明式，帮助用户在非 Kubernetes 环境中以声明式的方式进行各种集成。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
