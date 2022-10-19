---
title: "GCP、AWS 和 Azure ARM 架构服务器性能测试对比"
authors:
  - name: "赵士瑞"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://github.com/soulbird.png"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- API 网关
- ARM
- Azure
- AWS
- Google
- Apache APISIX
description: 本文使用 API 网关 Apache APISIX 来比较 GCP、AWS 和 Azure ARM 架构服务器在网络 IO 密集型场景下的性能。
tags: [Ecosystem]
---

> 本文使用 Apache APISIX 来比较 GCP、AWS 和 Azure ARM 架构服务器在网络 IO 密集型场景下的性能。

<!--truncate-->

## 背景

ARM 架构属于 [RISC 设计家族](https://en.wikipedia.org/wiki/Reduced_instruction_set_computer)。RISC 微处理器架构设计使用一组高度优化的指令，使小型处理器能够有效地处理复杂的任务。

ARM 已成为全球最大的计算机生态系统和移动设备的基石，以其低功耗、灵活的许可和低成本等特点，被许多专家认为是云计算的未来。因此，以 AWS、Google Cloud Platform（GCP） 和 Azure 为首的主流云厂商都陆续推出了 ARM 架构的服务器。其中 AWS 更是早在 2018 年就推出了第一款基于 ARM 架构的服务器处理器 AWS Graviton。

### AWS Graviton

AWS Graviton 是 AWS 于 2018 年发布的基于 ARM 架构的一系列服务器处理器，第一代 AWS Graviton 处理器采用定制芯片和 64 位 Neoverse 内核。

AWS Graviton2 于 2020 年发布，与第一代 AWS Graviton 处理器相比，AWS Graviton2 处理器在性能和功能方面实现了重大飞跃。性能提升 7 倍、计算核心数量达到 4 倍、缓存达到 2 倍、内存速度提升 5 倍等等。

最新的 AWS Graviton3 处理器在 2022 年 5 月底发布，基于更加先进的 [Neoverse V1](https://www.arm.com/zh-TW/products/silicon-ip-cpu/neoverse/neoverse-v1) 设计，与前代处理器相比，更是提升了高达两倍的浮点性能、两倍的加密性能和三倍的 ML 性能，包括对 bfloat16 的支持。下图展示了搭载 AWS Graviton3 处理器的主要机型：

![AWS Graviton3 处理器主要机型](https://static.apiseven.com/2022/blog/0812/1.png)

### Google Cloud Platform T2A

Google Cloud Platform（以下简称 GCP）T2A VM 是 Google 在 2022 年 7 月推出的首款 ARM 架构的虚拟机预览版，由基于 Neoverse N1 设计的 Ampere® Altra® Arm 处理器提供支持。

Tau T2A VM 有多种预定义的 VM 形状，每个 VM 最多 48 个 vCPU，每个 vCPU 4GB 内存。它们提供高达 32 Gbps 的网络带宽和广泛的网络附加存储选项，使 Tau T2A VM 适用于横向扩展工作负载，包括 Web 服务器、容器化微服务、数据记录处理、媒体转码和 Java 应用程序。主要机型如下图所示：

![Tau T2A VM](https://static.apiseven.com/2022/blog/0812/2.png)

### Azure ARM-based Virtual Machines

2022 年 4 月，微软宣布推出基于 Ampere® Altra® Arm 处理器的 Azure 虚拟机系列预览版。新的 VM 旨在高效运行横向扩展工作负载、Web 服务器、应用程序服务器、开源数据库、云原生以及丰富的 .NET 应用程序、Java 应用程序、游戏服务器和媒体服务器等。新的 VM 系列包括通用 Dpsv5 和内存优化的 Epsv5 VM，主要机型如下图所示:

![Dpsv5 和 Epsv5 VM](https://static.apiseven.com/2022/blog/0812/3.png)

## 三大云厂商 ARM 服务器性能测试

在本文中，我们将通过测试单核心性能来反映各服务器的整体性能。这里选取网络 IO 密集型的 API 网关 Apache APISIX，分别在 AWS c7g.large、GCP t2a-standard-2 和 Azure D2ps v5（属于 Dpsv5 系列，双核 CPU）三款机型上绑定单个 CPU 核心进行压力测试，并通过 QPS 和响应延迟两个指标来分析服务器的性能。

[Apache APISIX](https://github.com/apache/apisix) 是一个云原生、高性能、可扩展的 API 网关。基于 NGNIX + LuaJIT 和 etcd，APISIX 与传统 API 网关相比，具有动态路由和插件热加载特性，特别适合云原生架构下的 API 管理。

![Apache APISIX](https://static.apiseven.com/2022/blog/0812/4.png)

接下来我们将使用 APISIX 官方开源的[性能测试脚本](https://github.com/apache/apisix/blob/master/benchmark/run.sh)进行测试。

### 测试用例

本文我们将测试 Apache APISIX 在两个典型场景下的表现，以便获取更加真实、丰富的测试数据。

- 场景一：单个上游。该场景下使用单个上游（不包含任何插件），主要测试 APISIX 在纯代理回源模式下的性能表现。
- 场景二：单上游+多插件。该场景使用单上游与多插件配合，在这里使用了两个插件。主要测试 APISIX 在开启 `limit-count` 和 `prometheus` 两个核心消耗性能插件时的性能表现。

### 测试结果

下图是 QPS（每秒查询数）测试结果， 数字越大代表其性能越好。

![QPS 结果](https://static.apiseven.com/2022/blog/0812/5.png)

下图是响应延迟测试结果，单位为毫秒。数字越小代表其性能越好。

![响应延迟结果](https://static.apiseven.com/2022/blog/0812/6.png)

从 QPS 和响应延迟来看，在类似 Apache APISIX 这种网络 IO 密集型的 API 网关下，AWS C7g 相比 GCP T2A 有 100% 的性能提升，Azure Dpsv5 相比 GCP T2A 则有 15% 左右的性能领先。

## 机器性价比比较

由于本文仅专注于测试不同云厂商 ARM 机器的性能，所以在结果呈现中我们将忽略 “CPU 核心数相同时内存不同” 这一变化，只从 CPU 核心数的角度来分析 AWS Graviton3 和 GCP T2A 的性价比。

:::note

在当前的测试场景下，性价比可以理解为：QPS/成本。

:::

下表是 AWS C7g (US East Ohio) 、GCP T2A (us-central1) 和 Azure Dpsv5 (East US) 不同核心的服务器每小时价格对比:

| VM series / vCPU | 1       | 2       | 4       | 8      | 16      | 32      | 64      |
|------------------|---------|---------|:--------|:-------|:--------|:--------|:--------|
| AWS C7g          | $0.0361 | $0.0723 | $0.1445 | $0.289 | $0.5781 | $1.1562 | $1.7342 |
| GCP T2A          | $0.0385 | $0.077  | $0.154  | $0.308 | $0.616  | $1.232  | $1.848  |
| Azure Dpsv5      | *       | $0.077  | $0.154  | $0.308 | $0.616  | $1.232  | $1.848  |

参考前文中对 Apache APISIX 性能测试中的单个上游时的 QPS 数据，下表则汇总了 AWS c7g.large、GCP t2a-standard-2 和 Azure Dpsv5 运行一年的成本和性价比。其中只有微软官方公布了对应虚拟机的折扣。其中数字越大，则表明在单位价格能获取到更高的 QPS。

|                    | 一年成本         | 性价比（QPS / 成本） |
|--------------------|-----------------|--------------------|
| AWS c7g.large      | $633.3          | 36.3               |
| GCP t2a-standard-2 | $674.5          | 16.8               |
| Azure D2ps v5      | $398.0（41%折扣） | 33.6               |

从测试结果来看，AWS C7g 相比 GCP T2A 和 Azure Dpsv5 拥有更高的性价比。虽然 Azure Dpsv5 相比 GCP T2A 只有 15% 的性能提升， 但是性价比却高了接近一倍。

## 总结

AWS 在 2018 年就推出了首款 ARM 架构的处理器 AWS Graviton，比 GCP 提前了大约 4 年进行了基于 ARM 架构的服务器领域的布局，如今 AWS Graviton 处理器已经发展到了第三代。

通过 Apache APISIX 的性能测试结果和性价比分析，我们可以看出 AWS Graviton3 拥有比 GCP T2A 和 Azure Dpsv5 更高的性能和性价比。这与 AWS 在 ARM 服务器领域深耕多年是分不开的。

此外，我们在测试过程中仅使用了 Apache APISIX 绑定单核心测试。如果使用多核，AWS Graviton 3 所呈现的性价比可能会进一步提高。

## 参考链接

- [New – Amazon EC2 C7g Instances, Powered by AWS Graviton3 Processors](https://aws.amazon.com/cn/blogs/aws/new-amazon-ec2-c7g-instances-powered-by-aws-graviton3-processors/)
- [Tau T2A machine series (Preview)](https://cloud.google.com/compute/docs/general-purpose-machines#t2a_machines)
- [Now in preview: Azure Virtual Machines with Ampere Altra Arm-based processors](https://azure.microsoft.com/en-us/blog/now-in-preview-azure-virtual-machines-with-ampere-altra-armbased-processors/)
