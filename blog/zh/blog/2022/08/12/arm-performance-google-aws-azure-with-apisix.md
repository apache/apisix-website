---
title: "GCP、AWS、Azure 和 Oracle ARM 架构服务器性能测试对比"
authors:
  - name: "赵士瑞"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://github.com/soulbird.png"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
  - name: "林亚俊"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- API 网关
- ARM
- Azure
- AWS
- Oracle
- Google
- Apache APISIX
description: 本文使用 API 网关 Apache APISIX 来比较 GCP、AWS 、Azure 和 Oracle ARM 架构服务器在网络 IO 密集型场景下的性能。
tags: [Ecosystem]
---

> 本文使用 Apache APISIX 来比较 GCP、AWS、Azure 和 Oracle ARM 架构服务器在网络 IO 密集型场景下的性能。

<!--truncate-->

## 背景

ARM 架构属于 [RISC（Reduced instruction set computer）设计家族](https://en.wikipedia.org/wiki/Reduced_instruction_set_computer)，RISC 微处理器架构设计通过使用一组高度优化的指令，使小型处理器能够有效地处理复杂的任务。ARM 架构被广泛地使用在许多嵌入式系统设计中，已成为全球最大的计算机生态系统和移动设备的基石，由于它功耗低、成本低、效能高以及许可灵活，许多专家视其为云计算的未来。因此，以 AWS（Amazon Web Services）、GCP（Google Cloud Platform）、Azure（Microsoft Azure）和 Oracle 为首的主流云厂商都陆续推出了 ARM 架构的服务器，本文将选取这几个厂商的服务器进行性能测试。首先让我们了解下这四大厂商及其产品。

## 云厂商 ARM 服务器介绍

### AWS Graviton

自 2018 年起，经历四年的发展，AWS Graviton 已经发展到第三代，AWS 设计的 AWS Graviton 处理器为 Amazon EC2 中运行的云工作负载提供最佳性价比。这三代处理器的特征如下：

- **AWS Graviton1** 处理器采用定制芯片和 64 位 Neoverse 内核。
- **AWS Graviton2** 处理器基于 Graviton2 的实例支持广泛的通用型、突发型、计算优化型、内存优化型、存储优化型和加速计算型工作负载，包括应用程序服务器、微服务、高性能计算 (HPC)、基于 CPU 的机器学习 (ML) 推理、视频编码、电子设计自动化、游戏、开源数据库和内存中的缓存。同时为提供一站式服务体验，许多 AWS 服务也支持基于 Graviton2 的实例。
- **AWS Graviton3** 处理器作为该系列的最新产品，相比 AWS Graviton2 计算性能提高25%，浮点性能提高2倍，加密工作负载性能最多加快 2 倍。针对机器学习 (ML) 工作负载，AWS Graviton3 处理器所提供的性能比 AWS Graviton2 处理器高出多达 3 倍，并支持 bfloat16。它们还支持 DDR5 内存，相比 DDR4 内存带宽增加了 50%。

下图展示了搭载 AWS Graviton3 处理器的主要机型：

![AWS Graviton3 处理器主要机型](https://static.apiseven.com/2022/blog/0812/1.png)

### Google Cloud Platform T2A

2022年7月，谷歌云首次推出 ARM 架构的虚拟机预览版，它由 Ampere® Altra® 处理器提供支持，提供卓越的单线程性能。T2A VM 有多种预定义的 VM 产品形态，每个 VM 最多有 48 个 vCPU，每个 vCPU 有 4GB 内存。它们可以提供高达 32 Gbps 的网络带宽和广泛的网络附加存储选项，使 T2A VM 非常适合横向扩展工作负载，包括 Web 服务器、容器化微服务、数据记录处理、媒体转码和大型 Java 应用程序。另外，它还具备以下两大特点：

- **与谷歌云生态系统集成**：T2A 虚拟机支持大多数流行的Linux操作系统，例如 RHEL、CentOS、Ubuntu 和 Rocky Linux；还支持 Container-Optimized OS，以快速、高效、安全地启动 Docker 容器；同时，在 Google Cloud 上构建应用程序的开发人员可以将多个 Google Cloud 服务与 T2A 虚拟机一起使用。
- **ISV 合作伙伴和生态系统**：Ampere 当前已罗列了 100 多个已经在基于 Ampere 的 T2A 虚拟机上运行的应用程序、数据库、云原生软件和编程语言，数量还在不断增加。

主要机型如下图所示：

![Tau T2A VM](https://static.apiseven.com/2022/blog/0812/2.png)

### Azure ARM-based Virtual Machines

2022 年 4 月，微软宣布推出基于 Ampere® Altra® Arm 处理器的 Azure 虚拟机系列预览版。新的 VM 旨在高效运行横向扩展工作负载、Web 服务器、应用程序服务器、开源数据库、云原生以及丰富的 .NET 应用程序、Java 应用程序、游戏服务器和媒体服务器等。新的 VM 系列包括通用 Dpsv5 和内存优化的 Epsv5 VM，主要机型如下图所示:

![Dpsv5 和 Epsv5 VM](https://static.apiseven.com/2022/blog/0812/3.png)

### Oracle Cloud Infrastructure Ampere A1 Compute

2021 年 5 月底，甲骨文发布了首款以 Arm 为基础的运算产品：OCI Ampere A1 Compute。该产品将可以在 Oracle 云端基础设施 (Oracle Cloud Infrastructure，以下简称 OCI) 上运行，主要机型是：VM.Standard.A1.Flex（以下简称 OCI A1），其CPU 核心和内存都可以灵活配置。

为了支持 OCI 中的新 Ampere A1 Compute 实例， Oracle 创建了一个 [Arm 开发人员生态系统](https://blogs.oracle.com/cloud-infrastructure/oracle-makes-building-applications-on-ampere-a1-compute-instances-easy)，使开发人员能够在 OCI Arm 实例上无缝转换、构建和运行应用程序。此外，Oracle 已与 Ampere Computing、Arm、GitLab、Jenkins 等公司合作，以加速 Arm 开发者生态系统。Arm 处理器已从移动设备发展为云端服务器，为开发人员提供工具和平台，以过渡、构建和运行基于 Arm 的工作负载。

## 云厂商 ARM 服务器性能测试

下面我们将通过测试单核心性能来反映各服务器的整体性能。这里选取网络 IO 密集型的 API 网关 [Apache APISIX](https://apisix.apache.org/)，分别在 AWS c7g.large、GCP t2a-standard-2、Azure D2ps v5（属于 Dpsv5 系列，双核 CPU）和 OCI A1 四款机型上绑定单个 CPU 核心进行压力测试，并通过 QPS 和响应延迟两个指标来分析服务器的性能。

[Apache APISIX](https://github.com/apache/apisix) 是一个云原生、高性能、可扩展、开源的 API 网关。与传统 API 网关相比，Apache APISIX 基于 NGINX 与 LuaJIT 开发，具有动态路由和插件热加载等特性，非常适合云原生架构下的 API 管理。架构图如下所示：

![Apache APISIX](https://static.apiseven.com/2022/blog/0812/4.png)

我们将使用 Apache APISIX 分别在 AWS c7g.large、GCP t2a-standard-2、Azure D2ps v5 （虽然名称含D2ps，但实际是属于 Dpsv5 系列的双核 CPU）和 OCI A1 四款机型上绑定单个 CPU 核心进行压力测试，并通过 QPS 和响应延迟两个指标来分析服务器的性能。

我们将使用 APISIX 官方开源的[性能测试脚本](https://github.com/apache/apisix/blob/master/benchmark/run.sh)进行测试。

### 测试用例

本文我们将测试 Apache APISIX 在两个典型场景下的表现，以便获取更加真实、丰富的测试数据进行对比。

- **场景一：单个上游。** 该场景下使用单个上游（不包含任何插件），主要测试 APISIX 在纯代理回源模式下的性能表现。
- **场景二：单上游+多插件。** 该场景使用单上游与多插件配合，在这里使用了两个插件。主要测试 APISIX 在开启 `limit-count` 和 `prometheus` 两个核心消耗性能插件时的性能表现。

### 测试结果

下图是AWS c7g.large、GCP t2a-standard-2、Azure D2ps v5 和 OCI A1 四款机型的 QPS（每秒查询数）测试结果，QPS 数值越大代表该服务器的性能越好。

![QPS 结果](https://static.apiseven.com/2022/10/14/6348f70deefc4.png)

- 将性能从优至劣进行排序：

    **场景一：AWS c7g.large > Azure D2ps v5 > OCI A1 > GCP t2a-standard-2**

    在单个上游不包含任何插件的情况下， AWS c7g.large 的 QPS 达到 23000 次/秒，性能几乎是最落后的 GCP t2a-standard-2 （QPS 为 11300 次/秒）的两倍，Azure D2ps v5、OCI A1 和 GCP t2a-standard-2 这三者差距不大，OCI A1 和 GCP t2a-standard-2 性能相当，仅相差 200 次/秒。

    **场景二：AWS c7g.large > Azure D2ps v5 > GCP t2a-standard-2 > OCI A1**

    在单个上游及两个插件的场景下， AWS c7g.large 的 QPS 达 18000 次/秒，仍保持领先，但差距有所缩小，Azure D2ps v5 的性能略高于 OCI A1，仅相差 400 次/秒。

下图是响应延迟测试结果，单位为毫秒。数值越小代表其性能越好。

![响应延迟结果](https://static.apiseven.com/2022/10/14/6348f70d506dd.png)

从响应延迟来看，在类似 Apache APISIX 这种网络 IO 密集型的 API 网关下，这四者的性能表现结论如下：

- 将性能从优至劣进行排序：

    **场景一和场景二均为：AWS c7g.large > Azure D2ps v5 > GCP t2a-standard-2 > OCI A1**

 在这两个场景下，AWS c7g.large 的性能几乎都是 OCI A1 的两倍，后三者的差距不大。

## 总结

通过 Apache APISIX 的性能测试结果分析，我们可以看出 AWS Graviton3 拥有比 GCP T2A、Azure Dpsv5 和 OCI A1 更高的性能。我们在测试过程中仅使用了 Apache APISIX 绑定单核心测试，如果使用多核，这四者所呈现的性能可能会有所不同。

后续有可能会使用多核进行更多测试，敬请关注！

## 参考链接

- [New – Amazon EC2 C7g Instances, Powered by AWS Graviton3 Processors](https://aws.amazon.com/cn/blogs/aws/new-amazon-ec2-c7g-instances-powered-by-aws-graviton3-processors/)
- [Tau T2A machine series (Preview)](https://cloud.google.com/compute/docs/general-purpose-machines#t2a_machines)
- [Now in preview: Azure Virtual Machines with Ampere Altra Arm-based processors](https://azure.microsoft.com/en-us/blog/now-in-preview-azure-virtual-machines-with-ampere-altra-armbased-processors/)
- [Ampere A1 Compute](https://www.oracle.com/hk/cloud/compute/arm/)
