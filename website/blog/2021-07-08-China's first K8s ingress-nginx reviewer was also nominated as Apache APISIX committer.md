---
title: "中国首位 K8s ingress-nginx reviewer 同时提名成为 Apache APISIX committer"
author: Jintao Zhang
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://avatars.githubusercontent.com/u/3264292?v=4"
keywords:
- API 网关
- APISIX
- 张晋涛
- K8s
- Nginx
description: 近日，来自支流科技的工程师张晋涛被添加为 Kubernetes ingress-nginx 项目的 reviewer，这也是首位来自中国的 Kubernetes Ingress Controller reviewer，与此同时，张晋涛也通过投票提名成为 Apache APISIX committer。
---
> [@tao12345666333](https://github.com/tao12345666333), Apache APISIX committer from [API7.AI](https://www.apiseven.com/)

<!--truncate-->

近日，来自支流科技的工程师张晋涛被添加为 Kubernetes ingress-nginx 项目的 reviewer，这也是首位来自中国的 Kubernetes Ingress Controller reviewer，与此同时，张晋涛也通过投票提名成为 Apache APISIX committer。

**以下是 OSCHINA 对张晋涛的专访：**

**关于 Kubernetes Ingress Controller** 

Ingress 是 Kubernetes 名称或规则的定义，是用于将外部 HTTP（S）流量路由到服务（Service）的规则集合，也是 Kubernetes 中非常重要的外部流量入口。Ingress Controller 是将 Kubernetes 集群状态同步到网关的组件的统称，它并非 Kubernetes 自带组件。在众多 Ingress Controller 组件中，Kubernetes ingress-nginx 是当前使用最为广泛的 Ingress Controller，也是由 Kubernetes 官方维护的 Ingress Controller 组件之一。

![晋涛提名pr](https://static.apiseven.com/202108/1630040580927-f476cac5-7cfb-45e1-b906-7442c6455576.png)

提名 PR 中说道，张晋涛为 Kubernetes ingress-nginx 审查 PR 做了非常多的帮助。张晋涛最初是一名 Web 开发者，做前后端开发，2014 年接触 Docker 后，认定容器技术将会成为主流，便选择深钻容器技术。

之后，张晋涛陆续创作了《Kubernetes 上手实践》和 《Docker 核心知识必知必会》等专栏，并在 2019 年开始持续运营「K8S 生态周报」。同时他也是 Apache APISIX committer, 以及 Containerd、Docker、Helm、Kubernetes、KIND 等众多开源项目 contributor。

他称自己是一个热爱开源、喜欢折腾的工程师。他认为，参与开源贡献和开源社区活动，主要还是应该从兴趣出发。对于云原生的发展，他认为 Kubernetes 是云原生的基石，未来的三五年内仍然会是最主要的技术方向，并且正在向 IoT 等领域扩展。此外，近两年张晋涛也开始注重研究 Kubernetes 安全性问题。

![晋涛图片](https://static.apiseven.com/202108/1630040986077-f418386a-2bc2-4e51-9cf4-2c6f7d1ca2ac.png)

**问：请简单介绍下自己吧？**

**张晋涛：**

我是张晋涛，是一个热爱开源，喜欢折腾的工程师。目前是 Apache APISIX committer, Kubernetes ingress-nginx reviewer 。在 Docker 和 Kubernetes 相关的很多项目都贡献过代码。我也是个一岁孩子的父亲。

**问：恭喜您成为 Kubernetes ingress-nginx 项目的 reviewer，可以给读者们介绍下 reviewer 需要做些什么吗？项目选择 reviewer 的流程是怎样的？一般注重考察什么？**

**张晋涛：**

reviewer 除了对项目进行代码贡献外，最主要就是去 review 其他贡献者的代码了，以保证项目的代码质量和正确性。与此同时，也需要去跑测试，来验证 PR 是否符合预期等。

至于项目选择 reviewer 的流程，这个大前提是对项目要有持续的贡献，以及非常熟悉该项目。此外还要求至少是 5 个 PR 的主要 reviewer，以及合并过至少 20 个 实质性的 PR 。通过项目的 approver 进行提名，且没有其他人反对，就可以通过 PR 把名字写在项目的 OWNERS 文件中了。Kubernetes 相关项目的 reviewer 详细职责和选择流程等可参考此[文档](https://github.com/kubernetes/community/blob/master/community-membership.md#reviewer)。

刚才也提到了，能否把握项目代码的质量和正确性这个是基础，也是大前提。在此基础上会重点考察贡献度和对项目的熟悉程度。

**问：您也是目前 Kubernetes Ingress Controller 开源项目唯一一位来自中国的 reviewer。可以聊聊 Kubernetes Ingress Controller 在 Kubernetes 生态中的地位和影响吗？有没有什么“过来人”的建议可以给到国内开发者？**

**张晋涛：**

Kubernetes Ingress Controller 是 Kubernetes 社区的 Ingress Controller 实现，也是当前使用最为广泛的 Ingress Controller 。很多公司或者产品都在使用它作为 Kubernetes 集群的流量入口。目前在 GitHub 上有 10.5K 的 star 。

Kubernetes Ingress Controller 这个项目在各种生产环境下久经考验，代码质量和功能都是很不错的推荐大家可以关注和学习下。我在此项目中也看到过很多来自国内的开发者，说明大家对此项目也都是有所关注的，希望大家能够持续贡献。

**问：您运营「K8S 生态周报」已经两年多了，有没有总结出一些规律，比如大家更关注什么样的信息？**

**张晋涛：**

自我 2019 年开始运营「K8S 生态周报」的这两年多的时间里，发现大家更关注 Kubernetes 自身的一些特性变更或者漏洞之类的，这也是我在 「K8S 生态周报」的每一篇中都有一个部分介绍“上游进展”的原因。

此外，大家对于一些新项目，或者新的提案也比较感兴趣，会给我留言，或者加我微信来讨论。

**问：在「K8S 生态周报」内容的选取上有什么偏好或者原则吗？**

**张晋涛：**

在每篇「K8S 生态周报」的开头，我都有写：「K8S 生态周报」内容主要包含我所接触到的 Kubernetes 生态相关的每周值得推荐的一些信息。

我在《K8S 生态周报一周年了》这篇文章中也曾介绍我最初的想法。“Kubernetes 生态中相关信息和变化有很多，在这个信息爆炸的时代，稍不留神就会错过很多有价值的信息，但持续的去追这些消息，也过于浪费时间，而且还需要去筛选信息。”所以我维护的 「K8S 生态周报」并非简单的信息收集，还包含着我的思考及评价。每次周报的内容，都是我个人认为值得推荐和关注的信息。尤其是这是一份技术型的周报，而非纯资讯型，这也是和其他人或组织维护的周报最大的不同。

**问：您在许多技术社区都开设了专栏，也经常更新文章，写文章给您带来了哪些收获？您是如何在写代码之余还保持热情和精力大量产出文章的？**

**张晋涛：**

写文章对我而言也是一个总结和学习的过程。一方面，写文章的时候，对知识进行总结归纳，可以让我加深印象以及梳理清楚其中的逻辑。另一方面，毕竟写文章和记笔记不同，会公开出来，所以对其中可能之前含糊的点，在写文章的时候，也会再次考证和实践。

同时，因为我写的文章，也结识了不少朋友。

写文章确实需要花费不少的时间和精力，我个人认为主要还是得做好时间得规划和管理。这方面我也还在探索和学习，做的并不好。目前可能更多的还是选择压榨其他时间吧。我一般会选择早上起来写文章。我使用 GitHub 的 Project 和 Issue 等来管理自己需要做的事情。

![晋涛照片](https://static.apiseven.com/202108/1630041206485-03947eac-8dbe-4197-bd84-adf6a278b45b.png)

**问：看您之前的采访是 2014 年从 Docker “入坑”容器技术领域，近几年非常关注 Kubernetes，能对二者的发展做简单预测吗？对 Kubernetes 弃用 Docker 怎么看？**

**张晋涛：**

其实 Docker 和 Kubernetes 我都在持续的关注。我在 Docker 主仓库的贡献者排行榜中是第 66 位。

Docker 目前仍然是使用最为广泛的容器运行时和桌面容器化开发者工具。而且 Docker 目前的定位，也确实在做开发者工具方面投入了很多精力，包括默认集成了漏洞扫描工具，更好的磁盘管理工具等。未来的三五年内，Docker 在这个方面应该仍然是开发者的第一选择。

Kubernetes 是云原生的基石，未来的三五年内，仍然会是最主要的技术方向。此外，Kubernetes 也正在扩展其应用场景，包括 IoT 等领域。

在 Kubernetes 宣布 kubelet 中废弃对 dockershim 维护后，我曾专门写过一篇文章 《Kubernetes 弃用 Docker 了？Docker 不能用了？别逗了！》 事实上，这件事情影响并没那么大。因为不用在 Kubernetes 代码仓库中的 dockershim 组件，也可以使用外部的 dockershim 组件。另外，从 Docker 中捐赠出来的 containerd 项目，已经是 CNCF 毕业项目了，我认为迁移到 containerd 也是个不错的选择。开发者本地的环境，可以继续使用 Docker 作为开发工具。

**问：您是什么时候加入支流科技的？为什么加入，支流科技的哪些地方吸引您？目前主要负责什么工作？**

**张晋涛：**

我是今年 4 月底加入支流科技的。支流科技是一家开源商业化公司，团队中的所有工程师都深度参与开源项目，在公司中也是以技术作为主导。全员远程，通过 GitHub 和 Slack 等进行协作，这种方式跟我平时参与开源项目体验一致。而且这里可以更好的发挥我的特长，也可以给我足够的自由，所以我比较喜欢。

我在这边主要负责 Apache APISIX Ingress Controller ，我希望打造一款更棒的 Ingress Controller 。

**问：您是如何成为 Apache APISIX committer 的？成为 Apache APISIX committer 之后，有什么新的工作规划吗？**

**张晋涛：**

我维护了 Apache APISIX 的 Helm chart 以及为 Apache APISIX Ingress Controller 增加了 consumer 和 annotation 等特性，同时还有一些社区的活动。在完成项目 GA 后，经过社区的投票和公示流程后，正式成为 Apache APISIX committer 。

最主要的规划还是在 Apache APISIX Ingress controller 上，准备对其架构进行调整，让它更加好用。

**问：此外您也是 Containerd、Docker、Helm、Kubernetes、KIND 等众多开源项目的contributor，可以分享下参与开源项目贡献和开源社区活动的经验和想法吗？**

**张晋涛：**

我认为参与开源贡献和开源社区活动等，主要还是应该从兴趣出发。在参与项目的时候，应该尽可能选择自己接触较多的，或者更感兴趣的项目。不要为了参与而参与，这样会把自己搞的比较累，而且对自己和社区都不一定是好事儿。

开源社区是开放和包容的，无论你是提交 PR 来改进项目，还是提 issue 反馈 bug ，社区都是欢迎的。

另外需要补充的一点，也是之前很多人在问我的一个问题，“参与开源社区有什么回报？”我参与开源很久了，除了目前我在支流科技可以全职做开源外，之前待过的任何一家公司，我都只能利用自己的业余时间去参与，花费了挺多时间和精力。但其实并没有任何物质上的回报。可能只是兴趣所在吧，恰好现在把兴趣变成了工作（还有一份不错的薪水）。欢迎任何对开源感兴趣的小伙伴给我发邮件交流（zhangjintao@moelove.info）。

**问：云原生向来也是开源争议比较多的领域之一，比如在开源上贡献较多的公司和另一些从开源项目中获取价值较多的公有云厂商在利益上的冲突。您怎么看？这种矛盾可以解决吗？**

**张晋涛：**

这个问题由来已久，但也不是不能调和。就目前我看到的情况来说，相比 3 年多之前已经好很多了，多数云厂商也正在积极贡献。无论说是为了争取拿到更多话语权，还是为了解决自己所遇到的问题，在回馈社区。我觉得都是好事儿。只有这样持续的进行正循环，开源软件和社区才能更好的发展。

