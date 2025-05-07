---
title: "游戏业务出海：TAPISIX 稳定运营实践"
authors:
  - name: 杨泽淼
    title: author
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - APISIX
  - Tencent
  - API 网关
  - 业务网关
  - 腾讯天美
  - 腾讯游戏
description: 作者：杨泽淼，腾讯天美工作室群后台开发工程师。本文整理自 2025 年 4 月 12 日杨泽淼在 APISIX 深圳 Meetup 的演讲。
tags: [Case Studies]
image: https://static.api7.ai/uploads/2025/05/07/Em3otYyD_tencent-timi-uses-apisix.webp
---

## 关于腾讯天美

天美工作室群 Timi Studio Group 是腾讯游戏旗下精品游戏研发工作室，也是多款热门手游的研发商，包括《使命召唤手游》、《宝可梦大集结》、《Honor Of Kings》（《王者荣耀》国际版）和《王者荣耀》。

其代表作《王者荣耀》是全球最受欢迎的 MOBA 手游之一，截止到2023年12月，王者荣耀单日活跃人数最高破 1 亿 6 千万，最高同时在线人数破 300 万，总下载次数逾 38 亿次，注册用户数亦突破 3 亿。2017 年 5 月取得全球手游综合收入榜冠军。（数据来源：维基百科）

## TAPISX 业务网关

我们所在的团队在业务开发中主要采用 Golang 语言，同时负责部分运维职责。鉴于团队在运维领域的经验相对有限，且希望控制成本，我们期望借助业务网关统一处理多项事务，如鉴权、流量录制等。此外，由于我们在海外业务中需要频繁迁移基础设施，因此无法依赖云上方案，并要求所有数据和组件具备迁移能力。

### TAPISIX 简介

虽然 APISIX 完全开源且拥有丰富的插件生态，但在公司内部使用时，仍需考虑和公司现有基础设施的集成，例如对接公司内部的服务发现、日志规范及 trace 上报等。这些功能是公司内特定的，无法直接合并到开源 upstream 中。因此我们基于 APISIX，添加了一系列专门为公司内部环境设计的插件，开发了定制化版本 TAPISIX。

我们的服务运行在 Kubernetes（k8s）集群上，以 APISIX 作为流量入口，与内部业务服务对接。服务发现采用公司内部的北极星系统，指标监控借助 APISIX 社区版的 Prometheus 实现，日志和 trace 采集都是通过 OpenTelemetry 进入 ClickHouse。在 CI 工具方面，我们采用 OCI（类似 GitHub Actions），支持通过 YAML 定义流水线；CD 工具则选用 Argo CD，基于开源方案实现持续部署。

由于我们的业务主要面向海外市场，对合规性要求极为严苛，这导致许多公司内部组件无法直接落地使用。

![TAPISIX Gateway Architecture](https://static.api7.ai/uploads/2025/05/07/ASgiwzO0_1-tapisx-gateway-architecture.webp)

本次分享将涵盖以下四个方面：

1. **网关拓展**：如何根据业务需求扩展网关功能。
2. **部署运维**：网关的部署与日常运维实践。
3. **Runtime 运维**：Runtime 环境的维护与优化。
4. **其他经验**：团队在网关运营中积累的实用经验。

## 一、网关拓展

### 目标与挑战

我们的目标是构建一个业务网关，依托于 APISIX 的插件能力满足定制化需求。作为业务团队，我们面临以下挑战：

1. **开发门槛高**：一线开发人员熟悉 Golang，但对 Lua 语言和 APISIX 插件开发不熟悉，导致上手成本高。

2. **插件可靠性**：如何确保开发的插件能够安全、稳定地上线。

#### 核心问题

1. 如何降低开发门槛？
2. 如何快速验证插件功能？
3. 如何确保插件的可靠性？

#### 解决方案

为解决上述问题，我们从以下四个方面入手：

1. 开发规范（可维护性）
2. 本地快速运行与测试
3. 流水线建设（构建流程）
4. 可靠性保证

### 1. 开发规范

开发规范易于理解，我们需定义一个库，明确插件的存储路径，并要求插件采用单文件形式，与 APISIX 的单文件插件机制保持一致，便于管理和维护。

为降低开发门槛，我们支持本地快速运行与测试。借助 APISIX 的 Docker 镜像，可将本地插件通过卷映射至容器中，实现便捷部署。同时，利用下游的 echo-service（基于开源 Node.js 开发的服务），可模拟上游行为。该服务能够返回请求的所有内容，如请求头等。通过在请求中添加特定参数（如 HTTP 状态码 500），可模拟上游的异常行为，从而全面验证插件功能。

![TAPISIX Project Introduction](https://static.api7.ai/uploads/2025/05/07/BPa5r4Tr_2-tapisix-project.webp)

### 2. 本地快速运行与测试

为降低开发门槛并加速验证，我们提供了便捷的本地开发环境支持：

1. **文件映射**：通过将本地插件文件映射到 Docker 容器中，开发人员可以实时测试插件的变更。
2. **Makefile 构建**：构建 Makefile 文件，支持通过 make run-dev 命令快速启动插件测试环境，确保本地文件与容器无缝连接。
3. **浏览器直接访问**：开发人员只需在浏览器中访问相关接口，即可直接验证插件功能，无需额外部署或配置。

![Run and Test](https://static.api7.ai/uploads/2025/05/07/vlmK6Cls_3-run-and-test.webp)

通过定义开发规范和提供本地快速开发支持，我们有效降低了开发门槛，加速了插件的验证过程。开发人员可以专注于功能实现，而无需担心复杂的部署和测试流程，从而提高了整体开发效率。

### 3. 流水线建设（构建流程）

在流水线建设过程中，需要保证可靠性和开发插件的稳定性。开发流程如下：

1. **分支管理与 PR 流程**：

  a. 开发人员从 master 分支拉取一个新分支进行开发。
  
  b. 完成开发后，提交 Pull Request（PR）至 master 分支。

2. **Webhook 触发**：提交 PR 后，系统会自动触发 Webhook，启动流水线。

3. **流水线检测**：

  a. **Lint 检查**：主要检查代码格式规范。
  
  b. **单元测试**：运行单元测试，验证插件的功能是否符合预期。
  
  c. **Try Build**：使用源代码构建镜像，验证代码的可构建性。

![Pipleline Building](https://static.api7.ai/uploads/2025/05/07/7QGbMcLK_4-pipeline-inspection.webp)

### 4. 可靠性保障（CR、lint、单侧、黑盒测试）

我们使用了 Grafana 旗下的 k6 测试框架进行核心用例的验证。k6 框架支持声明式编写测试用例，可以覆盖多种场景。我们定期回放这些用例，检查接口是否通过。例如，即使只是修改了插件，我们也会进行全面的回放测试，包括解析能力和服务发现能力等。

#### 核心用例与 k6 测试框架

k6 测试用例：包含几百个测试用例，覆盖了核心流程，确保插件的可靠性。

![K6 Test](https://static.api7.ai/uploads/2025/05/07/DbmDfZFS_5-k6.webp)

通过本地开发、快速验证、MR 提交、流水线检测、可靠性保障以及打包部署的完整流程，我们确保了插件从开发到上线的每个环节都经过严格的质量控制。

![Gateway Development Workflow](https://static.api7.ai/uploads/2025/05/07/ZZ7VuEAM_6-gateway-development-workflow.webp)

## 二、部署运维

接下来简要介绍 APISIX 的部署模式，分为数据面和控制面。数据面负责实际的代理工作；控制面负责管理配置，包括管理端和其他功能，将配置写入 etcd，数据面从 etcd 读取配置并加载到内存中，完成路由功能。

APISIX 提供了三种部署方式，以适应不同的生产环境需求：

1. **传统模式**：数据面和控制面同时部署在一个实例中。
2. **分离模式**：数据面和控制面独立部署，数据面宕机时，控制面仍可操作和修改。
3. **独立模式**：仅部署数据面，配置从本地 YAML 文件加载，不依赖 etcd。

只保留数据面的独立模式也是我们使用的方式，所有的配置都存储在本地，避免了对 etcd 的依赖。这种模式更适用于海外场景。由于 etcd 属于数据库选型，部分云厂商不提供 etcd 服务，且海外对数据合规性要求严格，并且我们的部署环境在 k8s，因此也采用了对 k8s 友好的配置管理方式。

![APISIX Deployment](https://static.api7.ai/uploads/2025/05/07/99nRuGCG_7-dp-and-cp.webp)

- **YAML 配置**：所有配置直接存储在 YAML 文件中，便于管理和自动化部署。
- **ConfigMap 存储**：将 yaml 文件直接放置在 k8s 的 ConfigMap 中，确保配置的版本化和可追溯性。

我们定义网关为不可变基础设施，日常运营中不会进行频繁的变更。即使是路由变更，也被视为一次完整的变更操作。

### Kubernetes 配置管理与部署实践

**问题描述**：在管理 config.yaml 时，我们发现 Kubernetes 的部署实际上依赖于一系列复杂的配置文件，例如 Service.yaml、ConfigMap.yaml 和 Workload 等。这些配置文件数量庞大且细节繁多，容易导致管理上的复杂性和错误。

**解决方案**：Kubernetes 社区提出 Helm Chart 作为解决方案。Helm Chart 是一种将 Kubernetes 配置文件模板化的工具，能够显著简化配置管理。APISIX 官方提供了 Helm Chart，助力我们高效管理核心配置（如节点数等），无需手动填写大量 YAML 文件。目前，Helm Chart 已有效解决配置复杂性问题。

**衍生问题**：然而，衍生出来的另一个关键问题是：如何将 Helm Chart 或 YAML 文件部署到 Kubernetes 集群上。

**解决方案**：为此，我们采用了 GitOps 模式，通过流水线将 YAML 文件部署到 Kubernetes 集群。在 GitOps 模式下，所有配置以代码形式存储在 Git 中。借助 Git 触发 CI/CD 流程，实现自动化部署。config.yaml 和其他配置文件均存储在 Git 中，确保了配置的版本化管理和可追溯性。通过这种方式，我们不仅简化了配置管理，还实现了部署流程的自动化和标准化，提升了整体效率和可靠性。

### 部署流程示例

![Deployment Workflow](https://static.api7.ai/uploads/2025/05/07/KdOcfic9_8-deployment-workflow.webp)

在上图展示的部署流程中，SRE（Site Reliability Engineer）代表用户进行配置管理。任何修改，如路由变更或镜像更新，都需要通过修改 Helm Chart 仓库来实现。修改后，Argo CD 会自动检测到变更并触发流水线，拉取最新的配置完成部署。另外，Git 和 Kubernetes 之间建立了强同步关系，确保配置的一致性和可靠性。

例如，部署完成后，我拥有 k8s 集群的完全访问权限，对 service.yaml 文件进行了修改。Argo CD 会持续监控集群状态，若发现实际资源与 Git 仓库中的配置不匹配，将自动触发同步，使用 Git 仓库中的内容覆盖集群配置。

### GitOps 的优势

这种模式带来诸多益处：

- **配置一致性**：所有配置变更均通过 Git 进行，确保系统配置的一致性。
- **安全性**：减少手动修改带来的潜在风险，所有变更均有迹可循。
- **自动化部署**：基于 Argo CD 或 Git 的版本变更，实现自动化部署与灰度发布。

在实际部署中，我们仅需维护两个仓库：代码库（存放应用代码）、部署库（如下图，存放所有部署相关的配置文件）。

这种简化模式使得许多传统的管理平台变得不再必要，整个流程更加高效简洁。需要将应用部署到其他集群时，只需从部署库拉取相应分支，并应用到目标集群即可，整个过程简单高效。

![GitOps Advantages](https://static.api7.ai/uploads/2025/05/07/tCWrisXX_9-gitops-advantages.webp)

在以上部署实践中，APISIX 的关键配置文件（如路由配置和 config.yaml 启动配置）被整合到一个 Helm Chart 库中，便于统一管理和部署。然而，这种部署方式也可能带来一个问题：它本质上将 APISIX 当作了一个普通服务来部署。

## 为什么不用 APISIX Ingress Controller？

![APISIX Ingress Controller Wrkflow](https://static.api7.ai/uploads/2025/05/07/7WnT5rWl_10-ingress-controller.webp)

APISIX Ingress Controller 作为社区为 k8s 提供的官方解决方案，其核心流程如下：通过定义 APISIXRoute 等自定义资源，以 YAML 文件的形式在 k8s 中描述路由等配置。

将这些 CRD 部署到 k8s 集群后，Ingress Controller 会持续监听相关的 CRD 资源。解析 CRD 中的配置信息，并通过调用 APISIX 的 Admin API 将配置同步到 APISIX 中。Ingress Controller 主要为了进行 CRD 和 APISIX 之间的部署，最终还是将数据写入etcd。

![APISIX Ingress Controller](https://static.api7.ai/uploads/2025/05/07/XbjN7Bky_11-ingress-controller.webp)

经过审慎评估，我们发现 APISIX Ingress Controller 的部署和运维模式并不完全适配我们的团队需求，主要有以下原因：

1. **业务网关定位**：作为业务网关，我们更侧重于降低开发和运维门槛，提高易用性和开发效率。

2. **运维成本考量**：Ingress Controller 的引入会增加一层额外的运维复杂度。它需要与 k8s 进行深度集成，涉及额外的 Golang 编写的代码和 k8s API 调用，这无疑提高了运维的难度和成本。

3. **环境一致性问题**：由于需要依赖 k8s 环境，本地开发环境与线上部署环境存在差异，可能导致诸如“本地可以正常运行而线上出现问题”等不一致的情况，增加排查和解决故障的难度。

4. **版本耦合**：APISIX 版本与 Ingress Controller 版本之间存在强耦合关系。由于我们的 APISIX 基于开源版本进行了定制化修改，只维护特定版本的兼容性。这可能导致某些 API 不被支持或出现兼容性问题，进而影响系统的稳定性和可靠性。

5. **配置不透明性**：通过 Ingress Controller 的方式，最终配置还需写入 etcd，这可能导致配置状态不一致的问题。例如，Ingress Controller 监听失败或 etcd 状态不佳时，可能会引发连接过多等问题，使得整个架构链路变得更加不透明和复杂。与之相比，Helm Chart 的优势在于其提供了一个完整且可审计的 YAML 文件，其中包含了所有的路由配置，使得路由状态清晰可见。

因此，我们没有选择 APISIX Ingress Controller。

### 如何实现配置热更新？

在 k8s 环境中部署 APISIX 时，实现配置热更新是确保系统稳定性和可用性的关键。APISIX 的配置主要分为两种：

1. **APISIX 路由配置（apisix.yaml）**：采用传统的加载方式，用于定义路由配置，包括路由的 upstream 以及相应的转发规则等内容。

2. **启动配置（config.yaml）**：主要作为启动项配置文件，用于指定诸如 APISIX 运行端口等关键参数。某些配置项的变更需要重启服务才能生效。

![Hot Reloading](https://static.api7.ai/uploads/2025/05/07/tjWlC7eT_12-hot-reloading.webp)

### k8s 资源部署流程

1. **修改 Git 配置**：对上述提及的 Git 配置进行修改。
2. **交付 Argo CD**：将修改后的配置交付给 Argo CD。
3. **生成资源文件**：Argo CD 依据修改后的配置，通过 Helm Chart 生成相应的 ConfigMap、Service YAML 等资源文件。

在 k8s 环境中，apisix.yaml 和 config.yaml 这些资源文件均以 ConfigMap 的形式存在。

### APISIX 配置变更处理机制

**问题描述**：当 APISIX 相关配置发生变更时，对应的 ConfigMap 会相应地进行更新，但此时 Deployment（即 APISIX 部署实例）本身尚未改变。

**解决方案**：为解决这一问题，k8s 社区提出了相应的解决方案，即通过合理地拆分配置，并巧妙地利用哈希与注解方式，将需要变更的 ConfigMap 内容以注解的形式注入到 Deployment 中，从而实现配置的动态更新。

- **apisix-configmap.yaml**：主要用于存放 APISIX 的核心业务逻辑配置，如路由规则等。更改此类 ConfigMap 时，由于 APISIX 内置的定时器机制，其会定期从本地文件读取并更新内存中的配置信息，因此无需重启 APISIX 服务，即可实现配置的更新与生效。

- **config-configmap.yaml**：主要包含 APISIX 运行环境等基础配置。当此类 ConfigMap 发生变更时，由于其涉及 APISIX 服务的基础运行环境设置，为了确保新配置能够正确地被加载与应用，需要重启 APISIX 部署实例。

**更新触发机制**：为实现配置变更的自动检测与更新流程触发，我们采用注解方式对 ConfigMap 内容进行哈希处理，并将哈希值写入 deployment.yaml 文件。当配置变更导致哈希值更新时，deployment.yaml 文件会相应发生变化，k8s 系统检测到这一变化后，会自动触发更新流程，从而确保 APISIX 部署实例能够及时应用新的配置。

![Hot Reloading](https://static.api7.ai/uploads/2025/05/07/AvlvZYeD_13-hot-reloading-2.webp)

## 三、Runtime 运维

Runtime 运维主要分为三个部分：metrics 采集、trace 上报、日志收集。

![Runtime Operation](https://static.api7.ai/uploads/2025/05/07/pCdeHyAR_14-runtime.webp)

### 1. Metrics 采集

k8s 集群提供了官方的 metrics 采集解决方案，名为 Kubernetes Prometheus Operator。通过定时抓取服务暴露的 metrics 端口和信息，定期将数据上报至外部系统，如 Prometheus。由于该部分未进行深度定制，此处不再赘述。相关的 k8s 配置在 APISIX 的 Helm Chart 中已有完整描述。

![Metrics](https://static.api7.ai/uploads/2025/05/07/CDwYvj3i_15-metrics.webp)

### 2. Trace 上报

Trace 上报基于 APISIX 提供的 OpenTelemetry 插件实现。该插件通过 OpenTelemetry 协议将数据上报至 OpenTelemetry Collector，最终将数据写入 ClickHouse，完成 Trace 数据的采集与存储。

![Trace](https://static.api7.ai/uploads/2025/05/07/uftvZ7OL_16-trace.webp)

### 3. 日志收集

日志收集同样采用 OpenTelemetry 协议。然而，APISIX 社区版的 OpenTelemetry 插件仅支持 Trace 上报，而不包括日志上报功能。因此，我们建议采用本地日志存储方式，通过 sidecar 模式将 APISIX 日志写入一个共享文件夹。在 Deployment 中挂载另一个 Pod，该 Pod 与 APISIX Pod 共享同一个日志文件夹，从而实现日志的采集，并通过 OpenTelemetry 协议进行上报。

![Log](https://static.api7.ai/uploads/2025/05/07/JYyeu0Pb_17-log.webp)

另外，社区提供的监控面板功能较为通用，针对性不足。因此，我们基于采集到的指标数据定制开发了专用的监控面板，以满足特定的监控需求。告警系统则基于 Grafana 的开源方案构建，利用其强大的可视化和告警功能，实现对 APISIX 运行状态的实时监控和告警。

![Alerting](https://static.api7.ai/uploads/2025/05/07/xDHx5iYn_18-alert.webp)

## 四、其他经验

### Standalone 路由管理

我们首先对路由管理策略进行了优化。在早期的路由管理实践中，我们将所有路由配置集中放置在一个单一的 config 文件中。然而，这种做法很快暴露出问题，随着业务的发展和路由数量的增加，YAML 文件的规模急剧膨胀，给维护带来了巨大挑战。

正如业内调侃的那样，“k8s 运维工程师是‘YAML 工程师’”之说，恰是因为面对海量的 YAML 配置文件而产生的无奈与自嘲。 为应对这一难题，我们从两个关键维度出发，对路由进行了合理拆分。

- **模块化拆分**：依据 APISIX 的路由规范，将配置划分为 collector 配置与 consumer 配置的模块，实现了功能层面的解耦与分类管理。

- **域名维度拆分**：针对 route 文件，按照域名这一核心维度进行拆分，使路由配置更加精细化、条理化，便于后续的维护与扩展。

![Standalone Route Management](https://static.api7.ai/uploads/2025/05/07/qhKhr8w1_19-standalone-route-management.webp)

### 重复路由配置

在 k8s 的 upstream 配置中，存在多种类型，这些不同类型配置间的差异往往仅体现在 service name 这一关键要素上。在引入新版本并更新 Lua 包后，我们充分利用其支持的锚点功能，对重复配置问题进行了有效治理。通过锚点机制，实现了对共性配置部分的抽象与复用，在实际应用中成功减少了约 70% 的重复配置内容，极大地提升了配置管理的效率与简洁性，降低了因重复配置而引入错误的风险。

![Duplicated Route Configuration](https://static.api7.ai/uploads/2025/05/07/hbEPdHAf_20-duplicated-route-configuration.webp)

## APISIX 替换 Ingress 迁移实践

### 初始架构与背景

最初，我们的链路架构为：Edge one 作为一个 CDN，然后流量经 CLB 转发至 Ingress（Istio），最后到达内部的 APISIX。

Ingress 的存在主要源于历史原因，当时在云上选择了 Istio 作为服务网格解决方案。然而，随着业务的发展和技术的演进，我们计划直接替换掉 Ingress，采用 APISIX 作为 K8s Ingress，以实现更高效、更灵活的流量管理。

![APISIX Replaces Ingress](https://static.api7.ai/uploads/2025/05/07/OwxNQ9vv_21-apisix-replaces-ingress.webp)

### 迁移方案评估

在迁移过程中，我们评估了两种主要的迁移方案：

- **方案一 CDN 灰度与双域名**：即在现有架构旁侧部署一个新的 APISIX 实例，引导新的流量至该实例。然而，此方案的缺点在于前端需要修改域名，可能会对用户访问和业务连续性产生一定影响，因此我们谨慎考虑后暂时搁置了这一方案。
- **方案二 CDN 流量调配**：选择这种方式，它可以配置多个 CLB 路由，并且能够实现基于百分比的流量推送。这种方式的优势在于能够在不改变用户访问入口的前提下，逐步将流量切换至新的 APISIX 实例，并且可以根据实际情况灵活调整流量比例，便于观察和评估迁移效果。

![Migration Solutions](https://static.api7.ai/uploads/2025/05/07/CSfhtSNy_22-migration-solution.webp)

### 最终方案实施与优势

我们最终选择了方案二，成功形成了一条新的流量链路：新流量通过灰度方式直接到达 APISIX。这一新的链路架构带来了以下显著优势：

- **端侧无变更**：前端用户访问的域名和入口保持不变，确保了用户体验的连续性，避免了因域名变更可能引发的用户困惑或访问中断问题。

- **后端全自助**：后端具备自主控制和管理流量切换的能力，可根据业务需求和系统状态灵活调整流量分配，无需依赖外部协调整合。

- **快速回退能力**：由于具备灰度发布的能力，如果在迁移过程中发现任何问题，可以迅速将流量回退至原有的链路，最大程度降低迁移风险，保障业务的稳定运行。

- **用户无感知迁移**：整个迁移过程对用户而言是透明的，用户在访问业务时不会察觉到后端架构的变化，确保了业务迁移的平滑性和无缝性。

以下展示的是迁移的整体流程。

![Migration Practices](https://static.api7.ai/uploads/2025/05/07/u9YScyoO_23-migration-practices.webp)

## 总结

我们团队基于 APISIX 二次开发了 TAPISX 业务网关。APISIX 作为我们业务网关的核心组件，在满足海外业务的高合规性要求、降低开发和运维门槛、提高系统灵活性和可靠性等方面发挥了关键作用。它为我们打造了一个高效、稳定、灵活的业务网关平台，为业务的持续发展提供了有力支持。未来，我们期待与 APISIX 一起，探索更多创新的应用场景，为业务创造更大的价值。
