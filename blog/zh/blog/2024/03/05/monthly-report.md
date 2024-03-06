---
title: "社区月报 (01.29 - 02.29)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2024/03/05/4hrA1xua_monthly-02-cn.png
---
> 最近，我们新增并改进了 Apache APISIX 的部分功能，如新增 http-dubbo 插件、limit-req 和 limit-conn 插件新增支持 redis 和 redis-cluster、日志类插件增加支持 `include_req_body` 和 `include_resp_body`等。有关更多功能新亮点，请阅读本期月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2024.01.29 至 2024.02.29，有 25 名开发者提交了 53 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2024/03/04/rtlMzaYq_overall-contributors-202402.png)

![新晋贡献者](https://static.apiseven.com/uploads/2024/03/04/wlzKrOf7_new-contributors-202402.png)

## 近期亮点功能

- [支持 OpenResty 1.25.3.1](https://github.com/apache/apisix/pull/10887)（贡献者：[zll600](https://github.com/zll600))

- [在 K8s 服务发现中支持 EndpointSlices](https://github.com/apache/apisix/pull/10916)（贡献者：[dongjiang1989](https://github.com/dongjiang1989))

- [limit-req 插件新增支持 redis 和 redis-cluster](https://github.com/apache/apisix/pull/10874)（贡献者：[theweakgod](https://github.com/theweakgod))

- [limit-conn 插件新增支持 redis 和 redis-cluster](https://github.com/apache/apisix/pull/10866)（贡献者：[theweakgod](https://github.com/theweakgod))

- [移动 plugin/reload 至 Control API](https://github.com/apache/apisix/pull/10905)（贡献者：[sheharyaar](https://github.com/sheharyaar))

- [Prometheus 指标支持设置 ttl](https://github.com/apache/apisix/pull/10869)（贡献者：[monkeyDluffy6017](https://github.com/monkeyDluffy6017))

- [新增 http-dubbo 插件](https://github.com/apache/apisix/pull/10703)（贡献者：[ShenFeng312](https://github.com/ShenFeng312))

- [grpc-web 插件支持配置 `allow-headers`](https://github.com/apache/apisix/pull/10904)（贡献者：[smileby](https://github.com/smileby))

- [forward-auth 插件支持配置 `status_code`](https://github.com/apache/apisix/pull/10898)（贡献者：[smileby](https://github.com/smileby))

- [日志类插件增加支持 `include_req_body` 和 `include_resp_body`](https://github.com/apache/apisix/pull/10888)（贡献者：[smileby](https://github.com/smileby))

- [Mocking 插件支持内置变量](https://github.com/apache/apisix/pull/10872)（贡献者：[MonkeyDLufy](https://github.com/MonkeyDLufy))

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
