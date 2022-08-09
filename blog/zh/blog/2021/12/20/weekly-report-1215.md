---
title: "社区双周报（12.1-12.15）"
keywords: 
- Apache APISIX
- 社区周报
- APISIX
- API Gateway
- 贡献者
description: API 网关 Apache APISIX 近两周新增了 rocketmq-logger、opa 插件，以及 Wasm 支持在 rewrite 阶段运行，mqtt-proxy 插件支持使用 route 上配置的上游信息等功能。
tags: [Community]
---

> 从 12.1 到 12.15, 有 38 位开发者为 Apache APISIX 提交了 114 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1639983576378-30662c63-d320-49b8-b301-5aecdf55c3d4.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1639983576389-e5f6a5b8-d54e-43c3-837b-39eafc22a855.png)

## Good first issue

### Issue #5795

**链接**: https://github.com/apache/apisix/issues/5795

**问题描述**：在某些场景下，我们只需要安装 etcd。但 install_dependencies.sh 不支持这个功能，它默认安装 APISIX 的所有依赖项。我们可以在 install_dependencies.sh 中单独支持安装 etcd 吗？

例如：

```Nginx
bash install_dependencies.sh etcd
```

### Issue #5756

**链接**: https://github.com/apache/apisix/issues/5756

**问题描述**：目前的 OpenWhisk 插件会从 Apache OpenWhisk 获取响应，并直接返回，而不进行解析。这个请求可能包含复杂的数据，重写状态码、响应头和响应体。我们需要解析它并改变 APISIX 的响应。

像这样的复杂数据：

```JSON
{
  "statusCode": 401,
  "headers": {
    "addition-header": "a-header"
  },
  "body": "xxx" | {"xxx":"xxx"}
}
```

我们需要确定 OpenWhisk 响应是否包含它们，如果它们存在，就把它们写入 APISIX 响应。

### Issue #5634

**链接**: https://github.com/apache/apisix/issues/5634

**问题描述**：目前在 apisix limit-* 插件中已经支持 `var`、`var_combination` 了。可以支持一个类似于 `function` 的类型，这样就可以在 key 中把一些逻辑写成一个函数。然后我们可以从函数中获得 key。

## 近期功能特性亮点

- [APISIX mqtt-proxy 插件支持使用 route 上配置的上游信息](https://github.com/apache/apisix/pull/5666)（贡献者：[spacewander](https://github.com/spacewander)）

- [APISIX 支持在未设置环境时默认值](https://github.com/apache/apisix/pull/5675)（贡献者: [kevinw66](https://github.com/kevinw66)）

- [APISIX 新增 rocketmq-logger 插件，可以将接口请求日志以 JSON 的形式推送给外部 rocketmq 集群](https://github.com/apache/apisix/pull/5653)（贡献者：[yuz10](https://github.com/yuz10)）

- [APISIX WASM 支持在 rewrite 阶段运行](https://github.com/apache/apisix/pull/5695)（贡献者：[spacewander](https://github.com/spacewander)）

- [APISIX 支持在 server 与 location 之间补充自定义 Nginx 配置](https://github.com/apache/apisix/pull/5740)（贡献者：[zlhgo](https://github.com/zlhgo)）

- [APISIX stream 子系统支持记录日志](https://github.com/apache/apisix/pull/5768)（贡献者：[bisakhmondal](https://github.com/bisakhmondal)）

- [APISIX 新增 OPA 插件，支持使用 OpenPolicyAgent 服务对 API 进行访问控制](https://github.com/apache/apisix/pull/5734)（贡献者: [bzp2010](https://github.com/bzp2010)）

- [APISIX 新增 vault 模块，将 HashiCorp Vault 与 APISIX 的 jwt-auth 认证插件整合](https://github.com/apache/apisix/pull/5745)（贡献者：[bisakhmondal](https://github.com/bisakhmondal)）

- [Dashboard 支持配置使用 POST 表单数据作为高级匹配条件](https://github.com/apache/apisix-dashboard/pull/2231)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [Apache APISIX Ingresss 中可避免无 spec 字段的 ApisixUpstream 资源导致的 panic](https://github.com/apache/apisix-ingress-controller/pull/794)（贡献者：[Brhetty](https://github.com/Brhetty)）

- [- Apache APISIX Ingress 中为 Ingress 资源增加正则匹配的支持](https://github.com/apache/apisix-ingress-controller/pull/779)（贡献者: [lxm](https://github.com/lxm)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [利用 APISIX Ingress 实现 Istio 服务的安全暴露](https://apisix.apache.org/zh/blog/2021/12/17/exposure-istio-with-apisix-ingress)：

  本文将通过非常详细的操作步骤，向大家一步步地展示了如何使用 Istio Service Mesh 和 Apache APISIX，将启用 Service Mesh 的 Kubernetes 集群中服务暴露至集群外。

- [两种方式教你在 K8s 中轻松部署 Apache APISIX](https://apisix.apache.org/zh/blog/2021/12/15/deploy-apisix-in-kubernetes)：

  Apache APISIX 目前支持多种方式进行安装部署，本文主要介绍如何在 Kubernetes 环境中部署 Apach APISIX 以及 APISIX-Dashboard。

- [使用 Prometheus 监控 APISIX Ingress Controller](https://apisix.apache.org/zh/blog/2021/12/13/monitor-apisix-ingress-controller-with-prometheus)：

  本文介绍了如何使用 Prometheus 监控 APISIX Ingress Controller 的相关步骤和部分指标的展示效果。

- [如何在 Apache APISIX 中集成 Keycloak 实现身份认证](https://apisix.apache.org/zh/blog/2021/12/10/integrate-keycloak-auth-in-apisix)：

  本文通过详细的步骤为大家展示了如何在 Apache APISIX 使用 OpenID-Connect 协议和 Keycloak 进行身份认证。通过对接 Keycloak，Apache APISIX 仅需通过配置即可实现对使用者和应用服务进行认证与鉴权，从而大大减少了相关开发工作。

- [Apache APISIX 携手 RocketMQ 为实时 API 日志监控功能再下一城](https://apisix.apache.org/zh/blog/2021/12/08/apisix-integrate-rocketmq-logger-plugin)：

  本文将为大家介绍 Apache APISIX 与 Apache RocketMQ 最新集成的 rocketmq-logger 插件功能与使用介绍。借助该插件，可以帮助您在使用 APISIX 中更方便的与 RocketMQ 集群连接。
  
- [强强联合！APISIX 集成 SkyWalking 打造全方位日志处理](https://apisix.apache.org/zh/blog/2021/12/07/apisix-integrate-skywalking-plugin)：

  本文主要介绍了两款 Apache APISIX 集成 SkyWalking 的日志插件，为之后大家在 Apache APISIX 中进行日志处理提供更方便的操作与环境。
