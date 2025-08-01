---
title: "从云原生到 AI 原生：Apache APISIX 的 AI 网关架构设计与智能实践"
authors:
  - name: 王院生
    title: author
    url: https://github.com/membphis
    image_url: https://github.com/membphis.png
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - APISIX
  - API 网关
  - APISIX AI 网关
  - AI 原生
  - 云原生
description: 作者：王院生，Apache APISIX PMC Member，Apahce Member，API7.ai 创始人 & CTO，《Apache APISIX 实战》作者。本文整理自 2025 年 4 月 12 日院生在 APISIX 深圳 Meetup 的演讲。
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2024/12/25/dxrwyegf_api7-cover.png
---

> 作者：王院生，Apache APISIX PMC 成员，Apahce 成员，API7.ai 创始人 & CTO，《Apache APISIX 实战》作者。本文整理自 2025 年 4 月 12 日院生在 APISIX 深圳 Meetup 的演讲。
>
<!--truncate-->

## 导语：AI 时代的焦点——Why

2015 年，支流科技创立了 APISIX 这个开源项目，在 2019 年把 APISIX 捐给了 Apache Software Foundation。如今，六年时间过去了，它取得的成就非常显著。最开始，我们的目标很简单，就是希望能做出一个能够被别人使用的 API 网关。但随着时间的推移，越来越多不同领域的开发者、企业用户开始使用 APISIX，比如吉利汽车、荣耀手机等，当他们借助 APISIX 为自己提供服务时，就像自己孩子用另一种方式在反哺父母，自豪且令人鼓舞。

在过去的近两三年里，技术的发展速度非常快，它也在不断地改变着我们的世界。最初，我以为自己与 AI 开发并无太多关联，但在亲身使用 AI 后，我才发现它能给予我极大的帮助。现在，在我们的日常工作中，几乎每天都离不开 AI 的使用。不过，在使用 AI 的过程中，最困难的部分其实是提问。因为 AI 本质上是一种赋能工具，它能为每个人提供助力，但这种助力的成效却取决于使用者自身的水平。就好比说，如果你本身水平很高，达到了 100 分，那么 AI 或许能帮你提升到 120 分；但如果你只有 50 分，那么它可能只能帮你提升到 60 分。这是为什么呢？因为对于 AI 来说，它本身是静态的，只能作为人的辅助，不同的人使用它，最终得到的结果也会不同。

在 AI 时代，对使用者来说最难是提问本身。而与此同时，要想在社会中提升自我段位，黄金圈法则（Why、How、What）就显得至关重要了。当我们深入思考就会发现，提问与黄金圈法则存在着很大的交集，其核心都在于我们要直击最本质的 Why，而不仅仅关注表面的 What。只有当我们把问题问完整，才能得到正确的答案。

## Apache APISIX 简介

[支流科技](https://www.apiseven.com/)是 Apache APISIX 的创造者和捐赠者。目前，在中国 API 管理市场中，支流科技的占有率是第一的，我们服务着超过三十万的服务，每天处理的请求量超过万亿次。

APISIX 是一个全动态、实时且高性能的 API 网关。作为 Apache 顶级项目，它具备诸多优秀的特性。首先，它具有高安全性和高稳定性；其次，它的云原生架构使得它能够更好地适应现代的云环境，具备很强的弹性和可扩展性；再者，它的全动态配置让使用者能够根据实际需求灵活地调整网关的配置，而无需重启服务。此外，它的生态系统非常丰富，能够与各种不同的技术和工具进行集成。还有，它的性能极致，能够高效地处理大量的请求。最后，它的社区活跃，这意味着有大量的开发者和用户在不断地贡献自己的力量，推动着项目的发展。

正因如此，APISIX 适用于多种场景，包括企业南北流量网关、东西流量应用 API 网关、Kubernetes Ingress Controller 以及服务网格等。APISIX 的应用范围已经深入到我们日常生活的方方面面。当你打一次出租车，或者叫一辆电动车，甚至在你进行语音办公、视频通话、炒股等操作时，APISIX 都在背后默默地提供支持。甚至连我们日常光顾的麦当劳、肯德基等快餐店，以及国内几乎所有的手机厂商、电动车厂商，甚至充电宝等领域，都有 APISIX 的身影。

![APISIX API Gateway Introduction](https://static.api7.ai/uploads/2025/05/29/3Dm3vusj_1-about-apisix.webp)

## 技术演进：从云原生迈向 AI 原生

云原生是指系统具备弹性扩缩容能力，能够以高效、迅速的方式响应动态变化的业务需求。**AI 原生则是在此架构基础上进一步发展而来，它强调的是对 AI 模型请求的代理支持，尤其是以对话类请求为主的应用场景。**尽管这类请求在协议层面上仍采用 HTTP 协议，与传统服务请求一致，但其在性能表现上存在显著差异。

具体而言，AI 请求的响应通常较慢。例如，当用户向 AI 提出一个问题时，其返回结果往往不如传统 HTTP 请求那样迅速。一般而言，传统 HTTP 请求在国内的响应时间多为 10 至 100 毫秒，稍长者也多在几百毫秒内完成，基本上可在一秒内完成交互。然而，AI 请由于其生成式计算的特性，响应时间会显著增加。

![Challenges in Cloud-Native Era](https://static.api7.ai/uploads/2025/05/29/q5LtNwcC_2-challenges-of-cloud-native.webp)

此外，AI 应用带来了全新的安全挑战。以企业内部数据为例，早期人们最为关注的是像三星公司所遇到的敏感文档泄露问题。在传统业务场景中，企业极少会将完整文件提交给外部服务，这一过程通常会经过严格审慎的评估。然而，在 AI 应用中此类操作却非常常见。例如，在租房或购房过程中，用户可能会将合同文档提交给 AI 模型，以分析其中潜在的法律风险。这种使用方式在功能表现上已能接近甚至部分替代专业律师的咨询服务，且目前部分律师亦在实际工作中采用类似方法以提升效率。因此，AI 应用引发了新的内部信息安全需求。

最后，企业在选用 AI 服务时，也需综合考虑成本问题。以 ChatGPT 与 DeepSeek 为例，尽管两者在功能能力上相近，但 DeepSeek 的价格明显更具优势。企业需在响应速度、输出质量、成本控制、系统稳定性与可靠性等方面权衡投入与回报。

## AI 崛起，APISIX 如何应对

在 AI 应用崛起的背景下，AI 流量特性与传统流量存在显著差异。作为一个高性能、高可扩展性的 API 网关，APISIX 能够代理所有类型的 HTTP 请求，理论上无技术障碍。然而，针对 AI 请求的代理，还需满足额外的性能与特性要求，以适应 AI 服务的特殊需求。

![The Rise of AI](https://static.api7.ai/uploads/2025/05/29/7ZkohkQm_3-growing-ai.webp)

无论是商业用户还是开源用户，在企业级别使用 AI 服务的背景下，选择一款 AI 网关已成为必要前提。企业之所以需要部署 AI 网关，是因为其在使用 AI 服务（无论来自公共云，还是私有化部署的大模型实例）时，必须实现统一的接入控制、安全审计与成本管理。

可能有人会提出疑问：如果仅是通过 ChatGPT 等公共服务进行简单调用，是否仍有必要部署 AI 网关？答案是肯定的。以三星公司曾发生的机密信息泄露事件为例，根本原因之一在于缺乏统一的内容提交与响应流程记录机制。**AI 网关能够为企业提供这类内容传输的统一入口，确保所有请求和应答过程可被追踪和审计，进而保障数据安全。**

企业在使用 AI 服务过程中，内容的提交与应答应由公司层面进行统一记录。同时，若在费用方面存在不可控因素，也应建立相应的记录机制。这些措施均属于公司层面的统一安全审核与成本控制范畴。

传统企业可能认为，仅购买一个用户账号即可直接使用 AI 服务，无需搭建任何内部基础设施。然而事实并非如此。AI 网关的出现正是为了应对这一变化。无论企业使用的是公共云提供的 AI 产品，还是内部私有部署的多个大模型实例，均需通过 AI 网关进行统一接入与管理。

**AI 网关首先解决的是安全问题，其次是审计问题，最后才是一些典型的应用场景。目前商业客户主要聚焦于以下关键场景的实现。**

![Using Scenarios of AI Gateway](https://static.api7.ai/uploads/2025/05/29/CWwk4Uua_4-scenarios-of-ai-gateway.webp)

## APISIX AI Gateway

接下来将介绍 APISIX AI 网关的基本实现方式。本次实现所涉及的技术改动相较于以往如 Ingress Controller 的构建，属于较小范围的调整。这是因为在 APISIX 中，API 网关与 AI 网关已实现融合，对使用者而言无需作出明显区分。

![APISIX AI Gateway](https://static.api7.ai/uploads/2025/05/29/PW7YfDWl_5-ai-gateway-architecture.webp)

从架构来看，AI 网关的架构和 API 网关基本一致，仅在语言扩展或集成方式上有所调整。之前的插件已支持多语言与插件副本，现在则在相同位置支持 AI 网关，且其形态仍为插件形式。在核心理念方面未发生根本性变化，只在底层进行了少量关键性调整和升级，已经达到预期效果。

![APISIX AI Gateway Architecture](https://static.api7.ai/uploads/2025/05/29/0AwfATyw_6-ai-gateway-architecture.webp)

### AI Gateway 技术创新

在 APISIX 中实现 AI 网关过程中所面临的主要技术难点或区别，重点在于其与传统 HTTP 入口流量之间的差异。其中一个主要区别在于，大模型实例的负载均衡机制与传统上游节点的负载均衡方式存在差异。例如，健康检查的方式不同：传统方式使用 HTTP GET，而 AI 网关中则需采用 POST 方法，调用方式发生了变化。同时，重试与熔断策略也不尽相同。

在可观测性方面，AI 网关尤为关注两个核心指标：一是请求与应答过程中的 Token 记录，二是与延迟相关的指标，特别包括首次响应延迟以及处于等待首次响应阶段的并发连接数。另一个客观因素是成本控制。事实上，成本在大多数场景中可通过请求与应答中的 Token 数量进行量化反映。此外，安全性也是一个关键难点。无论是在开源版本的 APISIX 还是商业版本中，它们的底层能力是一致的。

**目前，我们在开源版本与商业版本中均已分别支持 DeepSeek、OpenAI、千问，以及 OpenAI Compatible 的兼容模式。**支持该兼容模式的原因在于，国内实际存在远不止上述提到的 DeepSeek 一家提供大模型服务的企业。还有部分企业专为商业公司提供私有部署的大模型服务，虽然这些服务提供方并非前述三家中的任何一家，但其对外暴露的标准采用了 OpenAI 的接口规范，因此可归类为 “OpenAI Compatible” 模式。

![Supported LLMs in APISIX AI Gateway](https://static.api7.ai/uploads/2025/05/29/I5eSDrLl_7-technical-updates.webp)

### APISIX AI Gateway 插件概览

APISIX AI 网关目前有以下常用插件，在代理能力方面，我们并未采用标准的 upstream 机制，而是通过名为 `ai-proxy` 等插件，实现动态代理的功能。

![APISIX AI Gateway Plugins](https://static.api7.ai/uploads/2025/05/29/LeOiK7xE_8-ai-gateway-plugins.webp)

`ai-proxy-multi` 指的是在多个大模型之间进行负载均衡。`ai-proxy` 与 `ai-proxy-multi` 是专门用于代理的插件。除了代理功能之外，还需要实现基于 token 级别的限流限速，以及对某些上游服务进行健康检查，例如判断其 token 是否已耗尽，这种方式较为常见。

对于一家公司而言，若需在公司内部统一管理与记录 AI 请求，通常只需关注以下四类服务：

1. AI 请求代理；
2. 基于 token 级别的请求限流与限速；
3. 内容合规审查，尤其是针对数据泄露等问题；
4. 安全请求的审查与记录。

关于内容合规审查，只要流量经过公网，该要求不仅限于企业层面，甚至上升至国家层面的管控。在国内场景中，阿里系方案相对更为流行。由于 APISIX 是开源项目，早期为支持海外需求，首先适配的是 AWS 相关服务，其他部分可根据需要自行研究。例如，针对提示词防护的场景：有些恶意信息虽由单个“干净”词汇组成，但组合后可能构成攻击性内容。这类问题在自然语言中难以通过简单手段识别，因此需要更高效的机制来明确实现文字内容的拦截或放行。

目前核心功能的 90% 已完成，剩余部分为个性化的加分项。APISIX AI Gateway 和 APISIX 一样，仍然是百分之百开源，开箱即用。下图展示的是 AI 网关代理大模型调用的应用场景。

![AI Gateway Use Cases](https://static.api7.ai/uploads/2025/05/29/QpfPWv5a_9-ai-gateway-use-cases.webp)

### 用户案例：智能制造统一大模型服务调用出入口

例如智能制造行业某头部企业，其使用场景主要包括两个方面：一是面向内部或其 B 端客户的使用，二是部分流量面向 C 端用户。该企业所接入的大模型涉及千问、DeepSeek，以及多种大语言模型服务，包括开源的 GPT 类模型，还有来自阿里等云服务提供商的产品。部署方式也涵盖私有化部署与线上云服务的混合形态。此外，模型的使用不仅限于文本生成文本，还包括文本生成语音、文本生成视频等多模态场景，涉及的供应商也更加多元化。

![Use Case of AI Gateway](https://static.api7.ai/uploads/2025/05/29/yho1WH6Q_10-use-case.webp)

对于该企业而言，实现请求的统一入口显得尤为关键。对于客户端而言，希望屏蔽底层调用的具体实现，不期望显式感知调用的是哪家服务提供商的模型。例如，用户只需提出问题，由系统调度合适的模型响应。一旦用户获得满意的结果，往往并不希望再更换所使用的模型。

因此，需要屏蔽内部实际部署的数量，同时合理平衡系统压力，实现内外隔离，这是最基本和常见的能力之一。当内部出现故障时，例如大模型因机器资源耗尽无法继续提供服务，此时应及时将不健康的节点下线。在合规方面，To B 场景通常问题不大，但对于公司内部涉及 To C 的流量，国家层面有严格的监管要求，因此安全审核显得尤为重要。在大模型调用，也就是 AI 请求的场景中，在实际使用中，首要要求就是记录每一次请求和响应的内容，这已被视为刚性需求，其次是基于 token 级别的限额限速、自动转发、透明代理等功能，以及 ROI 成本类的指标。

最后，关于可观测性指标，例如判断哪个大模型响应更快、更稳定等，网关就可以更有效地调度流量到表现更优的模型服务上。但这其中考虑的因素较多，并非响应最快的模型就一定优先分配更多流量。

在大模型服务中，价格是一个关键因素。不同模型服务的定价差异显著。海外的大模型服务普遍价格较高，这与其高质量、重投入、高 GPU 成本密切相关。国内的整体策略更加注重性价比。在这样的背景下，之前提到的各类优化指标，就需要更完善的可观测性能力来支撑。传统的代理服务可能只关注请求是否成功，比如通过 HTTP 状态码 `200`、`300`、`500` 等来判断请求结果即可。但在大模型的场景中，还需要引入与 token 相关的更细粒度的指标，才能真正实现有效的优化和成本控制。

## APISIX AI 网关和 MCP Server 后续规划

有关 MCP Server，上述的所有功能都已经在 [APISIX-MCP](https://github.com/api7/apisix-mcp) 中覆盖，它仍处于“社区先行”的阶段，尽管尚未正式成为行业标准，但已被众多企业广泛认可并积极跟进。从趋势来看，MCP 很有可能在未来成为连接 AI 模型与传统 API 的标准化桥梁。

### APISIX 中 MCP 的应用场景与价值

MCP 只能在本地环境中运行，缺乏面向企业级场景的统一接口。但企业用户对 AI 的诉求不是“个人级调用”，而是“服务级集成”——他们希望可以通过穿戴设备、智能终端或其他系统接口，实现跨系统联动，例如“语音下单咖啡”。这显然不可能通过每个用户本地单独部署实现，因此，企业级 API 接口的统一暴露就显得尤为关键。

APISIX 可以帮助用户更加便捷地接入那些基于标准输入/输出构建的 AI 对话框服务。它将 MCP 的通信能力进行标准化封装，通过网关以统一接口暴露出去，使得原本只能本地使用的 AI 服务得以在公司层面进行共享和统一调用。这不仅解决了服务暴露的问题，也为安全策略、访问控制、内容审查等进一步的治理能力打下基础。

### APISIX-MCP 所处阶段与后续发展

目前，MCP 在 APISIX 社区已完成初级阶段，即完成标准输入输出服务对接。要真正构建一整套基于 MCP 协议的服务代理网关体系，还需要社区和企业持续投入。

此外，MCP 与传统的 HTTP API 存在明显差异。虽然它仍属于请求响应式通信范畴，但其交互模型更贴近 AI 模型的调用方式，兼具 prompt 注入、上下文传递等语义能力。因此，它既不同于通用 HTTP 接口，也不同于现有的对话类 AI API，可视为一种更契合 AI 应用的新一代通信协议。

当前我们正在对 MCP 进行深入调研，并计划在近期推动其在企业内部的实际落地。从技术趋势来看，MCP 具备显著潜力，可以作为传统应用与 AI 模型之间的标准化桥梁。我们的目标是：将现有的 HTTP API 通过 APISIX 统一封装为 MCP 接口，使其能在 AI 驱动的系统中被灵活调用。通过在 APISIX 中进行必要的配置，比如导入 OpenAPI 描述文件，即可将已有的 HTTP 接口纳入网关管理。

如何将已有的 HTTP 接口转化为符合 MCP 模式的接口，目前的主流做法仍然依赖研发人员介入，例如编写 TypeScript 或 Python 脚本。而我刚才提到的方法则无需额外的开发工作，仅需通过适当的配置，配置完成后即可将传统的 API 以 MCP 的方式对外暴露。一旦完成暴露，就可以与我们现有的大模型服务对接，实现联动。通过这种方式，能够更高效地将现有的 HTTP API 融入我们的 AI 生态体系。

![Outlook for APISIX AI Gateway](https://static.api7.ai/uploads/2025/05/29/CdXCpi71_11-outlook.webp)

与此同时，还必须兼顾治理、可观测性与安全等方面的问题，实现统一的管理与控制机制。对于企业来说，问题并不仅仅在于能否将接口对外暴露，更关键的是如何确保统一管理、安全控制等合规性要求。

MCP 的主要能力已经开放，欢迎大家尝试并反馈可能存在的不合理之处，该功能也在持续迭代过程中，待达到一定的稳定性与质量后会面向社区开放。
