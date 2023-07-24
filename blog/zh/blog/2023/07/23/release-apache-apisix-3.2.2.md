---
title: "Apache APISIX 3.2.2 正式发布"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://avatars.githubusercontent.com/u/79972061?v=4"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://avatars.githubusercontent.com/u/39619599?v=4"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: Apache APISIX 3.2.2 版本于 2023 年 7 月 23 日发布。此版本包含了一系列的修复和优化。
tags: [Community]
---

我们很高兴地介绍 Apache APISIX 3.2.2。此版本包含了一系列的修复和优化。

<!--truncate-->

## 修复

### 升级 `lua-resty-jwt` 依赖版本

将 `lua-resty-jwt` 的依赖版本从 `0.2.4` 升级到 `0.2.5`，避免 APISIX `jwt-auth` 插件中身份验证绕过的安全风险。([PR #9837](https://github.com/apache/apisix/pull/9837))

### etcd 优化

支持单个 HTTP 长连接监听 etcd 的全部资源，该优化降低了访问 etcd 的资源损耗，使 watch 性能可达到 与 gRPC 一样的效果。（[PR ＃9456](https://github.com/apache/apisix/pull/9456)）

为 etcd calls 启用 keep-alive 连接。([PR #9420](https://github.com/apache/apisix/pull/9420))

### 修复 `opentelemetry` 和 `grpc-transcode` 插件同时使用时的问题

修复 opentelemetry 和 grpc-transcode 插件同时使用时出现的错误。([PR #9606](https://github.com/apache/apisix/pull/9606))

### 修复使用域名节点配置上游节点时的健康检查泄漏问题

修复当使用域名节点配置上游节点时，健康检查中出现的内存泄漏问题。([PR #9090](https://github.com/apache/apisix/pull/9090))

### 修复 `wolf-rbac` 插件与其他插件一同使用在 consumer 上的问题

修复 `wolf-rbac` 插件在 consumer 上使用时，导致 consumer 上的其他插件无效的问题。([PR #9298](https://github.com/apache/apisix/pull/9298))

### 修复在负载均衡中使用 `mqtt_client_id` 作为 key 的问题

修复在上游负载均衡中使用 `mqtt_client_id` 作为 key 的相关问题。([PR #9450](https://github.com/apache/apisix/pull/9450))

### 修复 `traffic-split` 插件中的主机名解析问题

修复 `traffic-split` 插件中配置的域名只解析一次的问题。 ([PR #9332](https://github.com/apache/apisix/pull/9332))

## 更新日志

有关此版本中包含的所有更新，请参见 [CHANGELOG](https://github.com/apache/apisix/blob/release/3.2/CHANGELOG.md#322).
