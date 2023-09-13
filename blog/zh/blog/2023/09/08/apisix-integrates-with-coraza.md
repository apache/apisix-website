---
title: "APISIX 新特性之 WAF 解决方案：Coraza"
authors:
  - name: Guohao Wang
    title: Author
    url: https://github.com/sn0rt
    image_url: https://avatars.githubusercontent.com/u/2706161?v=4
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords:
  - APISIX
  - Coraza
  - WAF
description: APISIX 与 Coraza 的集成为企业提供了可靠的安全防护，确保 API 服务的完整性和可靠性。
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/09/08/gLVTG2qC_APISIX%20&%20Coraza.png
---

> APISIX 与 Coraza 的集成为企业提供了可靠的安全防护，确保 API 服务的完整性和可靠性。
<!--truncate-->

随着云原生技术的飞速发展，保障 API 的安全性变得至关重要。[Apache APISIX](https://github.com/apache/apisix) 推出了一系列的前沿特性，其中值得称赞的是 APISIX 集成了 [coraza-proxy-wasm](https://github.com/corazawaf/coraza-proxy-wasm) 插件。我们将深入探讨 APISIX 全新的 WAF 功能，探索 Coraza 如何强化应用程序，使其抵御各类 Web 攻击。

## Apache APISIX

[Apache APISIX](https://apisix.apache.org/) 是一个动态、实时、高性能的开源 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 基于 NGINX 和 LuaJIT 构建，具有超高性能，单核 QPS 高达 23000，平均延迟仅为 0.2 毫秒。它不仅解决传统架构中的一些问题，同时适应了云原生时代的需求。Apache APISIX 目前是 GitHub 上最活跃的 API 网关项目之一，每天处理超过 1 万亿次的 API 调用，并且该数字仍在增长。

作为 API 网关，Apache APISIX 的应用场景非常广泛，可应用于网关、Kubernetes Ingress 和服务网格等场景，可以帮助企业快速、安全地处理 API 和微服务流量。目前已获得 Amber Group、[Airwallex](https://apisix.apache.org/zh/blog/2021/11/03/airwallex-usercase/)、Lotus Cars、[vivo](https://apisix.apache.org/zh/blog/2022/11/13/vivo-with-apache-apisix/)、European Factory Platform 等全球企业和组织的测试和高度认可。

## Coraza

[WAF](https://en.wikipedia.org/wiki/Web_application_firewall)（Web Application Firewall），或 Web 应用程序防火墙，是一种网络安全工具，用于保护 Web 应用程序免受各种网络攻击。它通过过滤和监视 Web 应用程序与互联网之间的 HTTP 通信来帮助确保 Web 应用程序的安全性。

[Coraza](https://coraza.io/) 是非常著名的开源 WAF 实现，将 Coraza 与 APISIX 集成能大大提高 APISIX 对上游服务的保护能力。

**它在以下方面提供具体优势：**

1. 攻击检测和阻止：Coraza 通过实时分析和监控 HTTP 和 HTTPS 流量，可以检测和阻止常见的 Web 攻击，如 SQL 注入、跨站脚本（XSS）、跨站请求伪造（CSRF）等。

2. 日志记录和报告功能： Coraza 提供高级的日志记录和报告功能，允许管理员跟踪和分析系统的安全事件。这有助于及时发现潜在的威胁并采取适当的措施来应对安全问题。

3. 灵活性和可扩展性：Coraza 提供了灵活的配置选项，使管理员可以根据特定的应用程序需求进行定制。它支持自定义规则和策略，可以根据具体的安全需求进行配置。它还可以与其他安全工具和系统进行集成，提供更全面的安全解决方案。

## Coraza-WAF:  APISIX 为什么优先选择它

### 开源社区支持

APISIX 在选择新的 WAF 方案时非常重视其对[开源社区](https://apisix.apache.org/zh/blog/tags/community/)的支持。Coraza 和 APISIX 一样，拥有一个活跃的开发者社区，开源社区的支持让 Coraza 能够及时获取更新和寻求支持。社区成员积极地参与到 Coraza 的开发和维护中，不断改进和优化代码，修复 bug 和安全问题。APISIX 通过使用 Coraza，让用户也可以从这些更新中受益，保证了应用程序的安全性和稳定性。

Coraza 开源社区与 APISIX 的发展和演进相协调。作为 APISIX 的 WAF 解决方案，Coraza 可以与 APISIX 的功能和特性紧密集成，以满足用户对安全性的需求。开源社区的合作和反馈有助于推动解决方案的进一步发展，并确保其与APISIX的兼容性和一致性。

### Wasm 插件的支持

APISIX 支持 [Wasm（WebAssembly）](https://apisix.apache.org/zh/blog/2023/03/30/what-is-wasm-and-how-does-apache-apisix-support-it/#%E4%B8%BA%E4%BB%80%E4%B9%88-apisix-%E8%A6%81%E6%94%AF%E6%8C%81-wasm-%E6%8F%92%E4%BB%B6)开发插件，Coraza 也提供了 Wasm 插件可供选择，因而 APISIX 集成 Coraza 的成本相对较低。Wasm 的跨平台特性使得 APISIX 和 Coraza 可以无缝协同工作，免除了大规模修改代码并进行适配的工作。

**这种低成本集成的好处包括：**

1. 被验证过的方案：尽管 Coraza wasm 插件并非专为 APISIX 开发，但其已在 Istio 平台上经过验证。该插件在功能上能够提供与 Istio 相一致的保障。
2. 低开发和维护成本：Coraza wasm 插件实质上是一个与平台无关的二进制文件，其发布和开发过程异常便捷。扩展 Coraza wasm 插件可借助 proxy-wasm-go-sdk 实现，其发布仅需更新二进制文件即可，进一步简化了流程。

Wasm 实际上是一项非常新颖的技术，目前其生态系统仍在迅速发展之中。对于 APISIX 来说，对于 Wasm 的支持需要经过更长时间的验证，并吸引更多用户参与，以确保其充分验证其可行性和稳定性。

### Core Rule Set 规则集的支持

传统的 WAF 解决方案通常需要在 Web 服务器（如 NGINX）上安装和配置特定的模块，以便与 WAF 引擎进行集成和通信。这种集成对于维护人员来说可能比较繁琐，需要处理繁重的配置和版本兼容性问题。

然而，Coraza 使用 Core Rule Set（CRS）作为其规则集，CRS 是一个广泛使用和经过验证的开源规则集，用于检测和防御 Web 应用程序中的常见攻击。与传统的 WAF 解决方案不同的是，Coraza 直接解析和执行 CRS 规则，无需额外编译 NGINX。CRS 规则集的使用能为 APISIX 提供增强的安全性保护和 CRS 社区的支持。

**这种设计决策带来了几个重要的好处：**

- 维护更加简化。由于不需要 nginx_module 的支持，维护人员无需处理复杂的模块安装和配置过程。相反，他们只需要专注于维护和更新 CRS 规则集，确保其中包含最新的安全规则和修复。
- 解决方案稳定可靠。CRS 作为一个成熟的规则集，经过了长期的实践和改进，已经被广泛采纳并得到了社区的支持。这意味着 Coraza 用户可以从 CRS 社区的集体智慧中受益，并获得及时的安全更新和修复。

### 易于安装部署

Coraza 不需要 nginx_module 级别的支持，容易维护，这是因为 Coraza 是一个独立的 WAF，它不依赖于 NGINX 或其他 Web 服务器的模块级别支持，可以与不同的 Web 服务器集成。

这种独立性使得 Coraza 的维护更加容易，因为它不需要依赖于特定的 Web 服务器配置或模块安装。管理员可以单独配置和管理 Coraza，而不必担心与其他服务器组件的兼容性问题。

## 如何在 APISIX 中使用 Coraza

请注意，要使用 Coraza 功能，您需要从源代码安装 APISIX master 版本。目前，该功能还处于预览版阶段，预期  3.6.0 版本将正式支持该功能。

### 配置 APISIX 集成 coraza-proxy-wasm  

进入 `APISIX` 的目录

```
cd /home/ubuntu/apisix-master
```

修改配置文件conf/config-default.yaml，取消原来 wasm 配置中的注释符

```
wasm:
  plugins:
    - name: coraza-filter
      priority: 7999
      file: /home/ubuntu/coraza-proxy-wasm/build/main.wasm # 要写绝对路径
```

### 配置  /anything 路由集成 Coraza WAF 规则

重新配置路由, 启用 `coraza-filter` 插件

```
curl -i http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '{
  "uri": "/anything",
  "plugins": {
    "coraza-filter": {
      "conf": {
        "directives_map": {
          "default": [
            "SecDebugLogLevel 9",
            "SecRuleEngine On",
            "SecRule REQUEST_URI \"@beginsWith /anything\" \"id:101,phase:1,t:lowercase,deny\""
          ]
        },
        "default_directives": "default"
      }
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

测试 WAF 规则，的确看到了 403

```
curl http://localhost:9080/anything -v
*   Trying 127.0.0.1:9080...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9080 (#0)
> GET /anything HTTP/1.1
> Host: localhost:9080
> User-Agent: curl/7.68.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 403 Forbidden
< Date: Thu, 31 Aug 2023 09:09:18 GMT
< Content-Type: text/html; charset=utf-8
< Content-Length: 225
< Connection: keep-alive
< Server: APISIX/3.4.0
<
<html>
<head><title>403 Forbidden</title></head>
<body>
<center><h1>403 Forbidden</h1></center>
<hr><center>openresty</center>
<p><em>Powered by <a href="https://apisix.apache.org/">APISIX</a>.</em></p></body>
</html>
* Connection #0 to host localhost left intact
```

查看日志 `logs/error.log`

```
2023/08/31 09:20:39 [info] 126240#126240: *23933 Transaction interrupted tx_id="JVhHVfDuGjVbfgvDjik" context_id=2 action="deny" phase="http_request_headers", client: 127.0.0.1, server: _, request: "GET /anything HTTP/1.1", host: "localhost:9080"
2023/08/31 09:20:39 [debug] 126240#126240: *23933 Interruption already handled, sending downstream the local response tx_id="JVhHVfDuGjVbfgvDjik" context_id=2 interruption_handled_phase="http_request_headers"
```

## 写在最后

Coraza 是一个功能强大的 Web 应用程序防火墙框架，提供了广泛的安全功能和灵活的配置选项，适用于保护企业级Web应用程序免受各种威胁。APISIX 与 Coraza 的集成是 APISIX 的一个重要新特性，Coraza 作为易于维护的解决方案，与 APISIX 的集成为企业提供了强大的 API 管理和安全功能。
