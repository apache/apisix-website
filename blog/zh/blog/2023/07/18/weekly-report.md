---
title: "社区双周报 (7.03 - 7.16)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/07/17/shxmVhkq_%E8%8B%B1%E6%96%87%E5%A4%B4%E5%9B%BE.png
---

> 我们近期对部分功能进行了修复或改善，更新汇总内容如下：
> 1. mock 插件支持添加 header
> 2. 修复 limit-count 插件在 stream 代理模式下使用 http 模式变量报错问题
> 3. 修复 etcd watch 实现中 update_count 冲突问题
> 4. admin API 增加通过 force 参数强制删除资源特性
<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

从 2023.7.03 - 2023.7.16，有 21 位开发者为 Apache APISIX 提交了 45 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/07/17/ndDgARK1_%E6%89%80%E6%9C%89%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/07/17/D7RXpWLf_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5.png)

## 近期亮点功能

### Apache APISIX

- [mock 插件支持添加 header](https://github.com/apache/apisix/pull/9720)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)）

- [修复 limit-count 插件在 stream 代理模式下使用 http 模式变量报错问题](https://github.com/apache/apisix/pull/9816)（贡献者：[Sn0rt](https://github.com/Sn0rt)）

- [修复 etcd watch 实现中 update_count 冲突问题](https://github.com/apache/apisix/pull/9811)（贡献者：[kingluo](https://github.com/kingluo)）

- [admin API 增加通过 force 参数强制删除资源特性](https://github.com/apache/apisix/pull/9810)（贡献者：[lingsamuel](https://github.com/lingsamuel)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
