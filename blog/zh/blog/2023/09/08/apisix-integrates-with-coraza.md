---
title: 使用 Apache APISIX 评估 Coraza WAF
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
  - OWASP Core Rule Set
description: 使用 Apache APISIX 评估 phase 1 Coraza Proxy Wasm 策略，了解当前请求体处理限制，并安全测试 OWASP Core Rule Set。
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/03/27/vFVg9LxN_apisix-coraza.webp
---

> Apache APISIX 可以加载外部 Coraza Proxy Wasm 模块并执行请求阶段规则。当前集成仍受 Proxy Wasm API 和请求体处理能力限制，因此应将其视为需要验证的集成方案，而不是 APISIX 内置的完整 WAF 能力。

<!--truncate-->

Web 应用程序防火墙（WAF）根据配置的规则检查 HTTP 请求和响应，并可在请求到达上游服务前拒绝匹配已知攻击模式的流量。WAF 只是纵深防御的一层，不能替代身份认证、业务授权、安全编码、依赖更新或应用层输入校验。

[Coraza](https://coraza.io/) 是使用 Go 编写的开源 WAF 引擎。[Coraza Proxy Wasm](https://github.com/corazawaf/coraza-proxy-wasm) 将其封装为 Proxy Wasm 模块，并可包含 [OWASP Core Rule Set（CRS）](https://coreruleset.org/)。Apache APISIX 可以通过 [Wasm 插件运行时](/zh/docs/apisix/wasm/)加载该模块，并将生成的插件配置到指定 Route 或 Global Rule 上。

## 当前集成能做什么，不能做什么

基础集成可以针对经过 APISIX 的流量检查 phase 1 变量，例如请求 URI 和请求头。CRS 提供针对 SQL 注入、跨站脚本等攻击类型的通用检测规则，但其中许多规则依赖请求体处理和后续阶段。URI 规则成功执行，并不能证明完整 CRS 已生效。

使用这项集成时，需要注意以下边界：

- Coraza Proxy Wasm 不随 APISIX 一起发布，需要单独下载和运维。
- APISIX 当前只实现了部分 Proxy Wasm API，因此必须测试策略所依赖的具体回调和流量类型。
- 上游项目仍有一个[与 APISIX 请求体处理相关的未解决问题](https://github.com/corazawaf/coraza-proxy-wasm/issues/309)，部分 payload 没有按预期传递给请求体规则。在所用 APISIX 和模块版本通过完整测试前，不应依赖该集成提供请求体防护。
- CRS 需要调优。未观察误报就直接启用大范围规则集，可能会拦截合法请求。
- Coraza Proxy Wasm 0.6.0 的 release notes 提醒用户注意潜在的内存泄漏和性能下降风险。投入生产前，需要使用有代表性的流量进行压力测试。

建议先在检测模式或小范围阻断模式中运行，检查审计输出，并在确认策略符合预期后逐步扩大执行范围。

## 前置条件

本文示例使用：

- Apache APISIX 3.18.0
- Coraza Proxy Wasm 0.6.0
- 该 Coraza 版本内置的 CRS 版本
- 保存在 `admin_key` 环境变量中的 APISIX Admin API key

生产环境应固定版本，并在升级前检查 [Coraza Proxy Wasm releases](https://github.com/corazawaf/coraza-proxy-wasm/releases)。较新的 APISIX 或 Coraza 版本可能改变运行时行为、可用回调或内置 CRS 版本。

## 安装 Coraza Wasm 模块

下面的 Dockerfile 将已发布的 Coraza 模块添加到 APISIX 镜像，并在解压前校验发布压缩包。示例中的校验值对应官方 0.6.0 压缩包；升级时应在独立验证新文件后同时更新版本和校验值。这个操作不会让 Coraza 成为 APISIX 内置插件，Wasm 文件仍是需要单独维护的外部运行时依赖。

```dockerfile
FROM apache/apisix:3.18.0-debian

ARG CORAZA_VERSION=0.6.0
ARG CORAZA_SHA256=cca4e3c75cf6b2e615907f936a1b6dcd0955250e0fb7d3b1c2ecef807d84603c

USER root

ADD https://github.com/corazawaf/coraza-proxy-wasm/releases/download/${CORAZA_VERSION}/coraza-proxy-wasm-${CORAZA_VERSION}.zip /tmp/coraza-proxy-wasm.zip

RUN echo "${CORAZA_SHA256}  /tmp/coraza-proxy-wasm.zip" | sha256sum --check --strict - \
    && apt-get update \
    && apt-get install --yes --no-install-recommends unzip \
    && mkdir -p /usr/local/apisix/proxywasm \
    && unzip /tmp/coraza-proxy-wasm.zip -d /usr/local/apisix/proxywasm \
    && rm /tmp/coraza-proxy-wasm.zip \
    && apt-get purge --yes unzip \
    && rm -rf /var/lib/apt/lists/* \
    && chown -R apisix:apisix /usr/local/apisix/proxywasm

USER apisix
```

构建镜像后，确认容器中存在 `/usr/local/apisix/proxywasm/coraza-proxy-wasm.wasm`。

## 在 APISIX 中注册模块

在 `conf/config.yaml` 中添加模块。这里定义的插件名称也用于 Route 和 Global Rule 配置。

```yaml
wasm:
  plugins:
    - name: coraza-filter
      priority: 7999
      file: /usr/local/apisix/proxywasm/coraza-proxy-wasm.wasm
```

修改 `config.yaml` 后重启 APISIX。如果模块加载失败，应先检查文件路径、所有权和启动日志，再将插件应用到实际流量。

## 应用一个小范围测试策略

首先使用结果容易验证的策略。下面的示例会在请求转发到 httpbin 前拒绝 `/anything` 请求。

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/coraza-test" \
  --request PUT \
  --header "X-API-KEY: ${admin_key}" \
  --header "Content-Type: application/json" \
  --data '{
    "uri": "/anything",
    "plugins": {
      "coraza-filter": {
        "conf": {
          "directives_map": {
            "test": [
              "SecRuleEngine On",
              "SecRule REQUEST_URI \"@beginsWith /anything\" \"id:101,phase:1,deny,status:403\""
            ]
          },
          "default_directives": "test"
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

请求该 Route：

```shell
curl --include "http://127.0.0.1:9080/anything"
```

响应状态应为 `403`。这个测试只能确认 APISIX 已加载模块且配置的 phase 1 规则成功执行，不能证明生产 WAF 策略已经有效。

## 评估 OWASP Core Rule Set

小范围 phase 1 策略通过后，可以在专用测试 Route 上加载 Coraza 模块内置的 CRS 进行进一步评估：

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/coraza-crs-test" \
  --request PUT \
  --header "X-API-KEY: ${admin_key}" \
  --header "Content-Type: application/json" \
  --data '{
    "uri": "/crs-test/*",
    "plugins": {
      "coraza-filter": {
        "conf": {
          "directives_map": {
            "crs": [
              "SecRuleEngine On",
              "Include @crs-setup-conf",
              "Include @owasp_crs/*.conf"
            ]
          },
          "default_directives": "crs"
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

调优期间，应将这项插件配置保留在选定的测试 Route 上。成功加载规则不代表 APISIX 已提供每个请求阶段或变量。尤其需要单独验证请求体规则，并在将 CRS 视为执行控制前检查上游项目当前的 APISIX 相关问题。Global Rule 可以扩大插件应用范围，但在确认覆盖能力和排除规则前这样做，会同时放大漏报和误报的影响。

## 投入生产前进行调优

WAF 部署是持续的安全工作，不是一次性开关。启用生产阻断前，应完成以下检查：

1. 在非生产环境回放具有代表性的请求。
2. 在 Coraza 和 APISIX 日志中检查规则 ID、匹配变量和误报。
3. 使用尽可能小的排除项，而不是关闭整个规则组。
4. 验证每一种必要的内容类型是否都会触发请求体回调；上传、流式流量、HTTP/2 请求和大 payload 需要单独测试。
5. 在预期峰值流量下测量延迟、内存占用和错误率。
6. 为 Wasm 插件及规则准备可操作的回滚方案。
7. 持续修补应用和依赖；CRS 可以阻断部分流量模式，但不会消除底层漏洞。

在纵深防御体系中，应将调优后的 WAF 策略与 [API 网关身份认证](/learning-center/api-gateway-authentication/)、限流、传输安全以及由服务自身实施的授权结合使用。[API 网关安全指南](/learning-center/api-gateway-security/)介绍了这些控制措施如何协同工作。

## 总结

Coraza Proxy Wasm 为 APISIX 用户提供了一条在网关层评估 phase 1 流量规则并研究 CRS 的开源路径。这项集成更适合在固定版本、小范围策略和针对实际负载的验证下进行受控测试。在部署环境中验证包括请求体处理在内的所有必要请求和响应阶段前，不应将它视为完整的 API WAF 覆盖方案。
