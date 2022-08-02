---
title: "Apache APISIX 2.6.0-Release 正式发布"
slug: 2021/05/25/apache-apisix-2.6.0-release
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- API 网关
- APISIX
- Apache APISIX
- Release Notes
description: 云原生 API 网关 Apache APISIX 2.6.0-Release 正式发布！支持使用其他语言编写自定义插件、Nacos 服务发现、支持配置 IPv6 DNS 解析 ，欢迎大家下载使用。
tags: [Community]
---

> Apache APISIX 2.6.0-Release 正式发布！欢迎大家下载使用。

<!--truncate-->

## Release Notes

▌**新功能：APISIX 现在支持使用其他语言编写自定义插件**

APISIX 现在支持通过 Lua 语言编写插件，在代理请求的过程中执行自定义的逻辑，诸如调用 webhook 通知外部系统、执行特殊的鉴权逻辑等等。但是有些情况下开发者可能会想要采用 Lua 以外的语言来编写插件。

比如开发者不熟悉 Lua，想要用自己熟悉的语言来编写插件；或者第三方团队只提供了 Java SDK，没有办法在 Lua 插件里面使用。

从 2.6 版本开始，借助 plugin runner，APISIX 支持运行非 Lua 语言编写的插件。架构图如下：

![2021-05-25-1](https://static.apiseven.com/202108/1639462480260-86431748-7dcd-4643-816b-92104ec5a666.png)

APISIX 会以 sidecar 的形式运行 plugin runner。

它们两者之间采用 RPC 进行通讯，APISIX 负责发送请求数据和配置，plugin runner 负责加载用户的自定义插件，处理这些数据并告诉 APISIX 怎么处理这些请求。目前支持在代理请求到上游之前，执行非 Lua 语言编写的逻辑。后续将会支持用非 Lua 语言改写响应。

APISIX 现在放置了两个入口给 plugin runner 发送 RPC。一个是 ext-plugin-pre-req，另一个是 ext-plugin-post-req。前者会在执行 Lua 插件逻辑前运行，后者会在执行完 Lua 插件且在代理请求到上游之前运行。这两个入口都是可以在路由级别上动态开关的。

假设我们对于某些请求开启了 ext-plugin-pre-req，且 plugin runner 里面加载了 validator 和 rewrite 两个插件，那么每个匹配的请求，它都会触发对 plugin runner 的 RPC 调用，先执行 plugin runner 里面的 validator 和 rewrite，然后把执行的结果返回给 APISIX。APISIX 可以根据结果来判断是否要继续执行请求，还是拒绝掉请求。如果继续执行，会运行 APISIX 内置的 Lua 插件，比如限流限速等等。如果开启的是 ext-plugin-post-req，则正好相反。

Java 和 Go 的 plugin runner 已在开发中。预计本周内 Java 版的 plugin runner 将会可用，Go 版的 plugin runner 将于六月份完成。

▌**安全提升：修改 Prometheus 默认端口，不再暴露到数据面的端口上**

之前默认情况下 Prometheus 的数据会暴露在数据面的端口上，虽然可以通过配置 plugin interceptor 来限制 IP 访问，但是还是存在默认不安全的问题。所以从 2.6 开始，专门采用一个新端口来暴露指标，而且默认只监听 127.0.0.1 .

在 2.6 之前，Prometheus 采集 APISIX 的指标时访问的是数据面的端口（默认 9080 端口）。

新端口是 9091 端口，且只监听 127.0.0.1，你需要修改监听地址为你的服务器的内网地址，并加上防火墙规则确保只有 Prometheus 才能访问。

▌**支持:生态完整支持 Nacos 服务发现**

APISIX 添加了对 Nacos 服务发现功能的支持。

用户只需开启 Nacos 服务发现功能，并在上游配置中设置服务名称，APISIX 就会在后台定期根据服务名称获取 Nacos 中对应服务的实例地址。这样一来，无需在 APISIX 里面配置具体的上游节点地址，只需要在 Nacos 里面配置即可。
目前 APISIX 内置的服务发现功能已支持下列外部服务：

1. DNS
2. Consul KV mode
3. Eureka
4. Nacos

▌**支持:配置 IPv6 的 DNS resolver**

之前配置 APISIX 的 DNS resolver 时，只能配置 IPv4 服务器。从 2.6 版本之后，我们加上了对 IPv6 DNS 服务器的支持。

现在配置 DNS resolver 的时候，可以写上 IPv6 的服务器地址了。

## 下载

下载 Apache APISIX 2.6.0-Release 源代码及二进制安装包，请访问下载页面: `https://apisix.apache.org/downloads/`。

## 文档更新

在本次发布过程中，我们也在持续更新和发布新的使用文档，欢迎大家提出宝贵的意见。

`https://apisix.apache.org/docs/apisix/getting-started/`

更详细的内容可以参考 2.6 版本的 Changelog 和 GitHub 上 Apache APISIX  的提交记录。
