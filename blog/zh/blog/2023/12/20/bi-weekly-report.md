---
title: "社区双周报 (12.04 - 12.17)"
keywords: ["Apache APISIX", "API 网关", "社区周报", "贡献者"]
description: Apache APISIX 社区的双周报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/12/20/hTVExnq0_ZH.png
---
> 最近，我们新增并改进了 Apache APISIX 的部分功能，如新增 `multi-auth` 和 `brotli` 插件、`openid-connect` 插件新增更多属性、`CORS` 插件支持 Timing-Allow-Origin 响应头、使用新的 lua-resty-events 作为默认事件机制。详情请阅读本期双周报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2023.12.04 至 2023.12.17，有 21 名开发者提交了 46 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

最近，我们对一些功能进行了新增和改进，更新内容总结如下：

1. 新增 `jwe decrypt` 插件

2. `openid-connect` 插件新增更多属性

3. `CORS` 插件支持 Timing-Allow-Origin 响应头

4. 新增 `brotli` 插件

5. 使用新的 lua-resty-events 作为默认事件机制

Apache APISIX 社区的双周报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/12/20/qNS4Ydta_CON.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/12/20/GycOBJie_NEW.png)

## 近期亮点功能

- [新增 `jwe decrypt` 插件](https://github.com/apache/apisix/pull/10252)（贡献者：[fishioon](https://github.com/fishioon))

- [`openid-connect` 插件新增更多属性](https://github.com/apache/apisix/pull/10591)（贡献者：[kayx23](https://github.com/kayx23))

- [`CORS` 插件支持 Timing-Allow-Origin 响应头](https://github.com/apache/apisix/pull/9365)（贡献者：[skimdz86](https://github.com/skimdz86))

- [新增 `brotli` 插件](https://github.com/apache/apisix/pull/10515)（贡献者：[yuweizzz](https://github.com/yuweizzz))

- [使用新的 lua-resty-events 作为默认事件机制](https://github.com/apache/apisix/pull/10550)（贡献者：[bzp2010](https://github.com/bzp2010))

## 最新博客速览

- [政采云 APISIX 优化跨网 RPC 性能实践](https://apisix.apache.org/zh/blog/2023/12/08/zhengcaiyun-uses-apisix/)

  为解决数据跨网问题，政采云搭建了一条基于 Dubbo 的“高速公路”，同时采用了 APISIX 作为中心网关，为网络路由、公共特性提供支持。本文将重点介绍政采云“高速公路”工程建设中如何优化网关和协议的性能以应对挑战。

- [API 网关 APISIX 在 DataVisor 的应用与实践](https://apisix.apache.org/zh/blog/2023/12/01/datavisor-uses-apisix/)

  作者：赵晓彪，DataVisor 高级架构师，Apache Kvrocks Committer，OpenResty 及 Apache APISIX Contributor。本文整理自 2023 年 11 月赵晓彪在 APISIX 上海 Meetup 的演讲。

- [分布式网关 APISIX 在大规模视频类业务中的落地实践](https://apisix.apache.org/zh/blog/2023/11/30/migu-video-utilizes-apisix/)

  作者：夏煜，咪咕视讯建设运行中心-高级应用运维工程师。本文整理自 2023 年 11 月夏煜在 APISIX 上海 Meetup 的演讲。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
