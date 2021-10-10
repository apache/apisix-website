---
title: "有了 NGINX 和 Kong，为什么还需要 Apache APISIX"
author: "王院生"
authorURL: "https://github.com/membphis"
authorImageURL: "https://avatars.githubusercontent.com/u/6814606?v=4"
keywords: 
- APISIX
- Kong
- Nginx
- API 网关
- 开源
description: 本文介绍了 Apache APISIX 架构演进历史，对比 Nginx 和 Kong 这两个框架 Apache APISIX 的优势是什么。
tags: [Technology]
---

> 本文介绍了 Apache APISIX 架构演进历史，对比 Nginx 和 Kong 这两个框架 Apache APISIX 的优势是什么。

<!--truncate-->

> Source: https://www.apiseven.com/zh/blog/why-we-need-Apache-APISIX

大家好，非常开心给大家分享一个让我激动的主题《有了 NGINX 和 Kong，为什么还需要 Apache APISIX》。

![why we need APISIX](https://static.apiseven.com/202108/20210625001.png)

之所以我们要做 NGINX 和 Kong 的替代项目，实际和我们后端架构演变史大背景息息相关，我会先和大家一起分享后端架构演变过程，这非常重要。

![membphis](https://static.apiseven.com/202108/20210625002.png)

首先做下自我介绍，本人叫王院生。和这次大会主办者净超一样我们都做社区很久，我在 2015 年写了一本电子书叫《OpenResty 最佳实践》，通过这本书结成了一个超万人社区。从那个时候开始个人对开源本身越发感兴趣，2015 年以前我基本上主要是开源软件的使用者，然后慢慢变成社区的一个协办者，再往后变成社区领导者，也许你会问为什么？很简单，因为这本书是你写的，别人遇到各种各样的问题，有高级的也有比较普通的，问得多了我就逐步成为老师并最终成了社区领导者，像那句名言“走的人多了，也变成了路”。

![api7.ai](https://static.apiseven.com/202108/20210625003.png)

2019 年我与合伙人温铭一起创办了深圳支流科技公司，它是一家以开源为依托的商业化公司。这家公司承载了我俩很多个人理想，也可以说是在做每一位普通程序员的理想，不想庸庸碌碌 996，我经常对别人说我的梦想就是“把我的名字刻入史册”，悲催的是人类已经不需要史册了。

![api7.ai team](https://static.apiseven.com/202108/20210625004.png)

这是我们团队，大家主要是远程协作，所有人聚在一起比较难。公司早期阶段只有五六个人时，还能比较容易的把团队聚起来，但从今年之后就一直没聚齐过，这是我们今年到目前以来最齐的一次（但依然有几位同学没能一起）。

作为一家技术说了算的商业公司，技术在我司有非常大的话语权，尊重技术从尊重技术人才开始。没有 996 ，没有上班打卡，远程办公，欢迎感兴趣的同学联系我们，期待有梦想、有理想的你加入我司。

![APISIX architecture](https://static.apiseven.com/202108/20210625005.png)

这次演讲主题需要一些背景，我们先说说后端架构演变史。先跟大家回顾一下这张图，右图部分从上到下它不是具体数据流程图，它是我们后端架构演变史。从最传统的单体大应用，然后变成面向服务架构(SOA)，然后是微服务，分别出现了 Spring Cloud 和 Kubernetes。Spring Cloud 架构主要服务 JAVA 语言开发者，Kubernetes 是容器编排支持任何语言，以及最近社区比较热的话题服务网格。

我经常跟公司同事说，咱们展望未来五年，甚至是十年之后，哪个架构是最终极方案？从目前信息看，服务网格会大概率胜出。即使当下它还有很多问题，但我相信这些问题都能被解决。

![APISIX architecture](https://static.apiseven.com/202108/20210625006.png)

在创业之初，在脑子里过这张图的时候特别有意思。我们能够看到，随着我们后端架构的逐步迭代，我们引入了各种不同组件。比如到了 SOA 也就是面向服务的架构，引入反向代理组件，选型通常是 NGINX，HAProxy。迭代到微服务架构后，通常会选择一些更现代的 API 网关产品，比如 Kong、Traefik ，当然也有一些用户因为惯性习惯，还会继续选择使用 NGINX，虽然它有能力弱、使用不方便等缺点，但胜在稳定、可靠。说句题外话，从全球市场占有率看，NGINX 成为占有率最高的 Web Server 是在 2019 年 4 月份，感兴趣的同学可以到看下最新的 netcraft 报告 April 2021 Web Server Survey。

随着后端架构持续迭代，进入到了 Kubernetes 时代后，流量出入口 Ingress 大家默认会使用官方的 Kubernetes Ingress，这个项目是基于 NGINX 本地配置文件。在国内也有一些公司在使用 Traefik 作为 Ingress，这与国内 Golang 开发者基数比较大有很大关系。

我们再看看左侧比较有意思的 JAVA ，Spring Cloud 内置 API 网关先后经历了 ZUUL、ZUUL2，但还是不好用，性能、架构官方都不满意，所以 Spring Cloud 官方发起了新项目 Spring Cloud Gateway，最终形成全家桶解决方案。

最后说说右下角部分的服务网格，对于服务网格已经形成一种选择就是 istio(CP) + envoy(DP)。后面我们又看到了阿里巴巴开源的 mosn，一句话概括：Golang 版本的 envoy。

![APISIX architecture](https://static.apiseven.com/202108/20210625007.png)

回顾前面的架构演变图，相信很多同学都已经发现问题在哪里。从上到下，从左到右，针对不同场景，我们最终“合理”的引入了各种组件来分别解决我们的问题，架构师生存法则：选择当下最适合的。

当我们趁手工具不多，在功能、动态、性能等之间我们总是要妥协放弃一些，大家早已习惯甚至麻木。IT 技术发展迅速，时至今日它们是否还是最合适方案？5G、物联网等发展迅速，如何弹性扩缩容、动态统一管理等新问题，逼着我们重新思考。

![Nginx](https://static.apiseven.com/202108/20210625008.png)

如图这些都是 NGINX 缺点，比如 NGINX 的低活跃度社区。虽然我们可以在公司层面投入更多资源，但他的社区是真不友好，不友好到什么程度呢？上面这张图可以看得到，NGINX 在 Github 的仓库只是镜像，issue 功能是关闭的，想提交 issue 不可能了，即使你提交 PR 官方也是不会合并的。

除此之外 NGINX 自身路由比较弱，比如说我要根据某个请求参数比如 id 取模运算做灰度，你会发现 NGINX 完全无法实现。所以我们能看到很多小的开源系统，只要解决了上面的灰度场景，就可以是个独立开源项目。此外 gRPC 调用在微服务调用中越来越流行，但 NGINX 对它的支持只能是“简单能用”。

最后就是 NGINX 集群统一管理，几乎每家互联网厂商都有自己的 NGINX 配置管理系统，系统虽然大同小异但就是没有统一方案，十几年了一直空白。

![Kong](https://static.apiseven.com/202108/20210625009.png)

在进一步聊 Kong 之前，想和大家聊一下什么是云原生。这个名词从诞生到现在很久，但到现在没有统一明确的定义。我综合几家云厂商定义，概括云原生特征主要有两点：第一要支持容器，第二要支持弹性伸缩部署。我认为 Kong 不完全满足第二条，官方主推的 PostgreSQL 关系型数据库是单点，无法支持弹性扩缩容，是它架构选型硬伤。

![Nginx Kong](https://static.apiseven.com/202108/20210625010.png)

最后简单总结一下 NGINX 和 Kong 的问题：

- NGINX 和 Kong 都有各自不同应用场景；

- NGINX 缺少官方集群统一管理方案；

- Kong 的控制面不是完全云原生架构。

在介绍 APISIX 之前，还是有必要先感谢两位前辈，站在巨人肩膀思考，确实让我们从一开始就有更高起点。APISIX 已经两岁多，请看架构图：

![APISIX architecture](https://static.apiseven.com/202108/20210625011.png)

这张图的左右分别是 DP（Date Plane）和 CP（Control Plane），跟大家所熟悉的后端服务体系一样。APISIX 从架构第一天就没有想去自己造新东西，所以关于配置中心选择了当下最成熟的 etcd。

在这个架构里面，你找不到一个单点。这里的任何一个服务出现异常宕机等事故，都不会影响 APISIX 正常对外提供服务的能力。当整体架构中的每一个点都支持高可用时，用户生产系统的高稳定性就非常容易实现。

![APISIX eco](https://static.apiseven.com/202108/20210625012.png)

这是 APISIX 的生态图，从该图可以准确看到目前都支持了哪些周边生态。左侧是支持的协议，可以看到常见的 7 层协议有 HTTP(S)、HTTP2、Dubbo、QUIC 和物联网协议 MQTT 等，4 层协议有 TCP/UDP 。右侧部分则是一些开源或者 SaaS 服务，比如 SkyWalking、Prometheus 、Vault 等。下面就是一些比较常见的操作系统环境、云厂商和硬件环境，作为一家全球化公司，我们也支持 ARM64 等更丰富的平台。

![APISIX Advantages](https://static.apiseven.com/202108/20210625013.png)

给大家简单地汇报一下 APISIX 当前状态，APISIX 从开源到现在两年的时间，APISIX 已经成为了全世界最活跃的开源 API 网关项目，而且这个状态已经持续了一年多。请记住最下面一句话，APISIX 已经**生产可用，功能、性能、架构全面优于 Kong**。在 2019 年 9 月份贝壳找房就已经把 APISIX 项目用到生产环境。

![APISIX Community](https://static.apiseven.com/202108/20210625014.png)

简单解释一下这张图，可以叫它贡献者增长曲线。横坐标是时间线，纵坐标是贡献者总数。能够看到 APISIX 和 Kong 这两个项目相对更活跃，APISIX 的增长速度从开源第一天就保持着非常不错的增长率，在接近 Kong 两倍的速度成长，可见 APISIX 受欢迎程度。当然评价一个项目活跃度还有很多其他方法，比如查看每月活跃 issue、PR 总数等方式，很开心的和大家说，这些方式看 APISIX 的活跃度依然第一。

![APISIX Advantages](https://static.apiseven.com/202108/20210625015.png)

经过我们实际的客户走访，支持多语言这个特性是非常有必要的。毕竟对于很多公司而言，都有自己熟悉的技术栈，很多公司对 NGINX C 和 Lua 这两个技术栈是空白。前些日子 APISIX 已经正式宣布支持多语言，目前已经支持了 Java 语言，后续也将逐步支持 Golang 、Rust、NodeJS 等语言。

APISIX 的全动态、高性能，其实和高质量的周边生态是分不开的。APISIX 的路由使用我司主导并开源的项目叫 resty-radixtree ，简单来说它使用 radixtree 方式完成路由匹配，匹配效率相比竞品提升了一到两个数量级。其他还有 jsonschema、ipmatcher 等周边库，它们都比同类开源项目性能强几个数量级。

![APISIX arch](https://static.apiseven.com/202108/20210625016.png)

APISIX 支持多语言的特性，已经放到开源项目，欢迎感兴趣的同学可以随时关注并参与。这个实现方案的优势是简单、通用，大家可以原生的使用自己熟悉语言。

![Apache APISIX](https://static.apiseven.com/202108/20210625017.png)

聊了这么多，给大家介绍下 APISIX 有哪些优势？请看上图。

前面三个（基金会项目、安全、稳定）我觉得是最重要的，作为基金会项目，它已经不属于某个人或某家公司，而是全人类的财产，我们可以永远使用它。与之相对应的是商业公司开源项目，它可以随时修改开源项目 License，大家最近都听过类似的消息。APISIX 的安全和稳定得益于它的基石 NGINX，能够成为目前最流行、使用量最广的 web server，底蕴还是很厉害的。

高性能、动态、社区活跃是 APISIX 的王牌，它们已经形成了良性互动。

如果一句话概括 APISIX 的自豪，我认为是：**APISIX，全世界最活跃的 API 网关项目**。在此共识下，我们把更多资源倾斜给社区，我们相信社区会让 APISIX 稳健健康成长。

![APISIX goal](https://static.apiseven.com/202108/20210625018.png)

看到这张图台下的你估计一下子就明白了 APISIX 要干什么。APISIX 目标：**统一代理基础设施**。

也许台下的你这里会有疑问：APISIX 要支持这么多场景，是否会让 APISIX 变得四不像？这里我简单解释一下，APISIX 的核心是高性能代理服务，自身不绑定任何环境属性。当它演变为 Ingress、服务网格等产品，都是外部服务与 APISIX 配合，变化的是外部程序而不是 APISIX 自身，后面逐步为大家说明 APISIX 是如何具体支持这些场景。

![API gateway](https://static.apiseven.com/202108/20210625019.png)

针对传统的 LB 和 API Gateway 场景，APISIX 比较大的优势就是从静态变成全部动态，再也不需要 reload，要知道很多科技公司的 NGINX reload 是半小时起步。前面提到的根据请求 id 取模运算灰度场景，在 APISIX 里使用精细化路由可以很容易完成。

![API gateway](https://static.apiseven.com/202108/20210625020.png)

![APISIX Ingress Controller](https://static.apiseven.com/202108/20210625021.png)

APISIX Ingress Controller 则完整解决了上面提到的所有问题，继承了 APISIX 的所有优势，此外还支持原生 k8s CRD ，方便用户迁移。

![service mesh](https://static.apiseven.com/202108/20210625022.png)

服务网格，这里面有必要跟大家重点聊聊。未来五年或者十年之后，最有可能主流的服务端架构是什么？如果让我回答，我选择服务网格。

![APISIX Mesh](https://static.apiseven.com/202108/20210625023.png)

右图部分就是 APISIX Mesh 的内部架构图。

![APISIX goal](https://static.apiseven.com/202108/20210625024.png)

聊了这么多 APISIX 的当下，也和大家聊聊 APISIX 的未来。

因为 APISIX 目前是 Apache 基金会项目，所以它已经不再属于个人或公司，而是全人类共享财产。这样社区中的每一个你，都有权利决定他往哪个方向发展。

开源版本 APISIX 目前默认搭配的配置中心是 etcd ，虽然目前它依旧是最好的选择，但我们在和用户沟通时依然经常会听到是否支持其他配置中心，比较常见的原因是 etcd 这个产品太新了，公司现有运维产品支持列表中没有它。所以我们计划让 APISIX 可以与其他配置中心协作。

![APISIX data plane](https://static.apiseven.com/202108/20210625025.png)

APISIX 已经走在全流量数据面这条路上，相信大家都会问一些问题，比如：为什么要统一流量转发？统一是否给企业带来价值？对技术人员有什么收益？带着这些问题，我们看下图：

![APISIX goal](https://static.apiseven.com/202108/20210625026.png)

统一本身不是目标，统一之后的收益才是我们追求的背后逻辑，下面分别给出几个不同角度来分别阐述。

- 运维角色：使用相同的运维工具收集日志、Metric 指标等，复用已有积累；

- 开发角色：基于标准化的 APISIX 插件开发，能力可以方便复用，并且积累的经验可以应用到 LB、API Gateway、K8s Ingress 等不同产品线；

- 公司价值：统一技术栈，降低公司运营成本，降低过渡到微服务、云原生的难度，加速企业数字化转型。

![connect APISIX](https://static.apiseven.com/202108/20210625027.png)

最后是 APISIX 的 QQ 群，有任何问题都可以在这里或者 [Github issue](https://github.com/apache/apisix/issues) 留言，会有专人快速响应，再次感谢大家。

点击观看[视频](https://www.bilibili.com/video/BV1w54y1V73Z?p=1&share_medium=android&share_plat=android&share_source=COPY&share_tag=s_i&timestamp=1621812452&unique_k=PEusrt)
