---
title: "社区双周报 (11.21 - 12.04)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了国密密码套件，域名解析优化，Admin API 通过 gRPC 协议链接 ectd 等新功能。
tags: [Community]
image: https://static.apiseven.com/2022/12/08/6391537255a28.png
---

> 从 11.21 - 12.04，有 22 位开发者为 Apache APISIX 提交了 61 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/2022/12/08/639153c8987d9.png)

![本周新晋贡献者](https://static.apiseven.com/2022/12/08/639153c959ebe.png)

## Good first issue

### Issue #8413

**链接**：https://github.com/apache/apisix/issues/8413

**问题描述**：将限制计数插件与支持 tls/ssl 的 Redis Cluster 一起使用。

## 近期功能特性亮点

### Apache APISIX

- [`proxy-mirror` 插件支持指定镜像请求的前缀](https://github.com/apache/apisix/pull/8261)（贡献者：[Gallardot](https://github.com/Gallardot)）
- [`jwt-auth` 支持隐藏客户端认证凭据](https://github.com/apache/apisix/pull/8206)（贡献者：[pixeldin](https://github.com/pixeldin)）
- [APISIX 支持 FIPS 密码套件](https://github.com/apache/apisix/pull/8298)（贡献者：[kingluo](https://github.com/kingluo)）
- [`proxy-mirror` 插件支持解析域名](https://github.com/apache/apisix/pull/8356)（贡献者：[spacewander](https://github.com/spacewander)）
- [`grpc-transcode` 插件支持在返回体中展示解析过的 grpc-status-details-bin](https://github.com/apache/apisix/pull/7639)（贡献者：[monkeyDluffy6017](https://github.com/monkeyDluffy6017)）
- [域名解析时优先解析本地的 `/etc/hosts` 文件](https://github.com/apache/apisix/pull/8270)（贡献者：[TenYearsIn](https://github.com/TenYearsIn)）
- [`proxy-rewrite` 插件支持显式设置和删除 header](https://github.com/apache/apisix/pull/8336)（贡献者：[mscb402](https://github.com/mscb402)）
- [支持国密密码套件](https://github.com/apache/apisix/pull/8389)（贡献者：[spacewander](https://github.com/spacewander)）
- [支持将敏感字段存储在第三方服务中，如 Vault](https://github.com/apache/apisix/pull/8390)（贡献者：[soulbird](https://github.com/soulbird) [kingluo](https://github.com/kingluo)）
- [支持敏感字段进行自动加密和解密，保护敏感字段](https://github.com/apache/apisix/pull/8403)（贡献者：[tzssangglass](https://github.com/tzssangglass)）
- [`syslog` 插件支持设置 log format](https://github.com/apache/apisix/pull/8279)（贡献者：[fatihusta](https://github.com/fatihusta)）
- [Admin API 通过 gRPC 协议连接 etcd](https://github.com/apache/apisix/pull/8411)（贡献者：[spacewander](https://github.com/spacewander)）

### Apache APISIX Ingress

- [在日志中隐藏密钥信息](https://github.com/apache/apisix-ingress-controller/pull/1480)（贡献者：[macmiranda](https://github.com/macmiranda)）
- [可以通过 annotation 的方式来进行请求方法的控制](https://github.com/apache/apisix-ingress-controller/pull/1471)（贡献者：[incubator4](https://github.com/incubator4)）
- [允许在 APISIX Ingress 与服务注册/发现中心进行集成](https://github.com/apache/apisix-ingress-controller/pull/1465)（贡献者：[tao12345666333](https://github.com/tao12345666333)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [译文 | A poor man's API](https://apisix.apache.org/zh/blog/2022/12/a-poor-man%E2%80%98s-api/)

    本文将展示如何在不编写任何代码的情况下，简单实现一个 API 实践。

- [APISIX Ingress 是如何支持上千个 Pod 副本的应用](https://apisix.apache.org/zh/blog/2022/11/25/how-apisix-support-1000-pods/)

    本文通过介绍 Kubernetes 中上千个 Pod 副本应用场景的解析，提出技术实现的困难。介绍 APISIX Ingress 是如何解决这一难题的。

- [微服务中的服务发现是什么](https://apisix.apache.org/zh/blog/2022/11/10/what-is-service-in-microservice-discovery/)

    本文通过服务发现的相关背景和 APISIX 对于服务发现的应用与实践，来介绍微服务中的服务发现内容。

- [实践一年之久，vivo 如何基于 APISIX 进行业务基础架构的演进](https://apisix.apache.org/zh/blog/2022/11/13/vivo-with-apache-apisix/)

    本文从应用 APISIX 后的调整与实践困难角度入手，为大家带来了 vivo 基于 APISIX 的企业实践细节。

- [腾讯蓝鲸 API 网关如何借助 APISIX 实现产品升级与业务完善](https://apisix.apache.org/zh/blog/2022/11/05/tencent-blueking-with-apisix/)

    本文从蓝鲸网关的迭代过程和应用 APISIX 后的产品实践角度，为大家呈现了基于 APISIX 的网关应用实例。

- [从 Traefik 到 APISIX，汽车智能计算平台公司「地平线」在 Ingress Controller 的探索和实践](https://apisix.apache.org/zh/blog/2022/10/28/apisix-ingress-with-horizon-ai/)

    地平线作为一家致力于汽车自动驾驶芯片的公司，在业务迭代中为何从 Traefik 切换到了 APISIX Ingress 去支撑业务？
