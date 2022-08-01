---
title: "贡献者，是衡量开源项目的金指标"
slug: 2021/08/14/contributors-the-golden-metric-of-opensource-projects
author: "吴舒旸"
authorURL: "https://github.com/Yiyiyimu"
authorImageURL: "https://avatars.githubusercontent.com/u/34589752?v=4"
keywords:
- API 网关
- APISIX
- Apache APISIX
- 贡献者图表
- 开源项目
description: 本文介绍了为什么贡献者数量变化是衡量开源项目的金指标，并且使用贡献者趋势图分析了云原生 API 网关 Apache APISIX 的贡献者趋势以及与其他开源项目的对比。
tags: [Community]
---

> 根据 GitHub 2020 年的统计显示，这一年新增了 6000 万个代码仓库，超过 5600 万的开发者参与到开源项目中。预计到 2025 年，在 GitHub 参与开源项目的开发者人数将会超过 1 亿。

<!--truncate-->

> Source:
> https://github.com/api7/contributor-graph

在这些快速增长的数字背后，隐藏的是开源项目为了赢得开发者而做出的各种宣传：硬核技术文章、社交活动、新媒体、周边礼物等，可以说是乱花渐欲迷人眼。那么对于开发者来说，如何能够在百花齐放的项目中，找出最适合自己公司的那一个呢？

这就会涉及到开源项目的各种指标：

- Star 数：这是最直接的指标，它代表的是这个项目吸引了多少开发者的关注，可以体现这个项目的 marketing 水平。如果这个项目有商业公司资金的支持、强力的 PR 团队，或者是水军刷 Star，那么这个指标就很容易失真；

- Issue 和 PR 数：GitHub 提供了 Insights 功能，如下图所示：

![Apache APISIX GitHub Insights](https://static.apiseven.com/202108/1639549315114-8bcc2d6d-a67b-48a2-be1e-0831c2441921.png)

可以选择最近一周、最近一个月的时间内，这个开源项目的 Issue 和 PR 的新建和关闭数。上图是 Apache APISIX 最近一个月的数据。

GitHub insights 提供了一个非常棒的开发者视角，但还不够完美：Issue 和 PR 的质量如何？这些是没有办法量化的；

- Commit 频率和数据：下图是 Apache APISIX 从项目创建到现在的 Commit 频率统计，可以看出 Apache APISIX 保持了非常稳定和持续的开发，但这个指标也略显单薄：看不到提交这些 Commit 的开发者的数据；

![Apache APISIX commits](https://static.apiseven.com/202108/1639549239894-1406e1d6-ae84-4364-89cd-1b63f6f4cd4b.png)

看到这里，你是不是觉得选择一个开源项目好复杂，看了这么多指标都得不出答案。有没有一个“金指标”，一个通过 marketing 砸不出来的指标？一个能够体现“开发者为核心”的指标？

作为开源项目的维护者和开发者，我们也需要这样的金指标来指引我们。所以，我们提出了 “贡献者增长” 和 “活跃贡献者”这两个维度，并将统计和分析的过程开源出来：https://github.com/api7/contributor-graph，你也可以通过 https://www.apiseven.com/zh/contributor-graph 直接进行检索。下面是 Apache APISIX 的示例：

## 贡献者增长

![Apache APISIX contributor growth](https://static.apiseven.com/202108/1639549136527-e477c670-42d3-4764-9432-209c34dd222b.png)

## 月度活跃贡献者

![Apache APISIX Monthly Active Contributors](https://static.apiseven.com/202108/1639548976021-ed0946ae-eeb2-4dfc-8e15-c3db13f527e0.png)

通过上面两个表格，你可以清晰的看到 Apache APISIX 从创办至今，贡献者都保持着稳定的增长，每个月都有 25 个左右的代码贡献者参与其中。

## 多仓库对比

“贡献者增长” 和 “活跃贡献者”图表都支持在多仓库之间比较。更重要的是，我们会拉取 Github API 每日/每月定时更新图表，只要一次性的复制使用我们提供的链接，您的仓库就可以始终显示实时的贡献者数据。

贡献者增长曲线的数据来源是项目每个 contributor 首次提交 commit 的日期。通过贡献者增长曲线，我们可以在 Github 首页显示的贡献者总人数基础上观察贡献者增长情况，从而对社区的发展情况作出直观判断。

通过同时展示同一领域中的多个仓库，我们也可以直观比较不同社区的发展情况。

![Apache APISIX compare the development of different communities](https://static.apiseven.com/202108/1639548845735-43efcae0-3221-4739-b10f-0d9aaafad3fd.png)

在上图中，我们可以看到 Apache APISIX 的贡献者人数以非常快的速度增长，仅仅用了两年时间，贡献者人数就基本赶上甚至超越了其他开源网关项目。

月度贡献者曲线数据则来自于每月提交 commit 的贡献者数量。

相比贡献者增长曲线，月度贡献者可以更好衡量短时间内的社区发展情况。

![Apache APISIX monthly contributors compare](https://static.apiseven.com/202108/1639548683512-d7c7a72b-7ac3-4535-bd1a-f056d05d196b.png)

例如在上图中，我们可以看到如今 Apache APISIX 是多个开源网关项目中的月度贡献者人数最多、最稳定的。

这也解释了为何 Apache APISIX 可以在开源后如此短的时间内在总贡献者人数上赶上友商们。

![Apache APISIX monthly contributors](https://static.apiseven.com/202108/1639548241386-6ba96e66-5ab7-468e-9072-6144fb902909.png)

上面这张比较开源消息中间件社区的月度贡献者的图，曾在推特引发热议。

通过这张图，我们可以看到 Apache Pulsar 在月度贡献者上迎头赶上了 Apache Kafka。

## 总结

目前贡献者图表已经在 Apache APISIX 、Apache Skywalking、Apache DolphinScheduler、Apache Openwhisk、Apache ShardingSphere、awesome-docker、TiDB docs-dm 等多个开源项目中使用。

在用户使用并反馈的过程中，我们实现了更多的需求，比如添加“匿名”贡献者，或是项目由 SVN 迁至 GitHub 后添加 SVN 侧的贡献者等。

好程序都是起源于程序员要解决的切身之痛。当我们聊 Contributor Graph 时，我们不仅希望借助这个工具生产更加直观的展示 Apache APISIX 社区活跃度的图表，我们同时开源了这个小工具，希望这个工具可以帮助到其他的开源项目。

欢迎大家使用贡献者趋势图表来跟踪您的社区活跃度，任何需求和问题都欢迎到 Contributor Graph 的 GitHub 仓库中反馈。

访问 Contributor Graph [repository](https://github.com/api7/contributor-graph)。
