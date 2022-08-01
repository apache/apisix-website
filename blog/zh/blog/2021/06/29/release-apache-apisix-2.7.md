---
title: "Apache APISIX 2.7.0 正式发布"
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- Apache APISIX
- Release Notes
Description: 云原生 API 网关 Apache APISIX 2.7.0 版本正式发布！该版本支持了多语言插件、增强了四层 TCP 代理以及 NGINX 功能。
tags: [Community]
---

> Apache APISIX 2.7.0 版本正式发布！欢迎大家下载使用。
<!--truncate-->

这个版本支持了多语言插件、增强了四层 TCP 代理、增强了 Nginx 功能，有 20+ 开发者参与，共提交了 70+ PR，下面是重点功能的介绍。

## Release Notes

### 多语言插件

随着 apisix-java-plugin-runner 发布第一个版本，外加 apisix-go-plugin-runner 完成主体功能，APISIX 的多语言插件功能已经支持两大最广泛使用的后端编程语言。如果你还担忧 APISIX 的插件开发会受限于 Lua 生态，不妨试试使用我们的多语言 plugin runner 来开发 Java / Go 插件。

### 增强四层 TCP 代理

2.7 版本中，我们开发了 TCP 代理新功能，包括：

* 允许 upstream 中配置域名
* 允许 mqtt-proxy 插件配置域名
* 支持接收 TLS over TCP 连接，这一块的证书自然是可以像 HTTPS 的证书一样动态配置的
* 基于 SNI 的路由规则
* 动态校验客户端证书

在后续版本中，我们也会继续分配部分资源来完善现有的 TCP 代理功能，敬请期待！

### 增强 Nginx 功能

我们希望能够动态设置越来越多的 Nginx 配置，所以我们添加自己的补丁和 Nginx C 模块，增强原生 Nginx 的功能。

目前包含了以下新功能：

* 动态设置 mTLS
* 动态设置 client_max_body_size

在 APISIX 后续版本中，我们也会陆续允许下面的 Nginx 配置能够被动态设置：

* upstream 的 keepalive
* gzip
* real_ip
* proxy_max_temp_file_size

## 下载

下载 Apache APISIX 2.7.0-Release

* 源代码：请访问[下载页面](https://apisix.apache.org/downloads/)
* 二进制安装包：请访问[安装指南](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
