---
title: "Apache APISIX 3.6.0 正式发布"
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
description: Apache APISIX 3.6.0 版本于 2023 年 10 月 5 日发布。该版本带来了一系列新功能，修复，和用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.6.0 版本已经发布，带来一系列新功能，修复，和用户体验优化。

<!--truncate-->

该版本增加了一系列新功能，包括支持在服务发现中使用本地 DNS 解析器、转发 Dubbo 流量、在 `opentelemetry` 插件中使用 NGINX 变量等等。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### 移除 APISIX 和 etcd 之间的 gRPC 通信支持

该版本移除了 APISIX 和 etcd 之间的 gRPC 通信，在配置文件中移除了 `etcd.use_grpc` 配置项。该变更修复了一些bugs。

如果您目前正在使用 gRPC 作为 APISIX 和 etcd 之间的通信，请计划变更至 HTTP。

详情请参考[变更提案](https://lists.apache.org/thread/b69vjkbdszdtk9y30k45c2tvg4f3hqwt)和 [PR #10015](https://github.com/apache/apisix/pull/10015)。

### 移除 Conf Server

在移除了 APISIX 和 etcd 之间的 gRPC 支持的同时，一并移除 Conf server。该变更修复了一些bugs。

如果您目前正在以解耦模式部署APISIX，请注意在这个版本中，数据平面（DP）APISIX实例不再直接与控制平面（CP）APISIX实例通信。现在，两个实例都与etcd进行通信。请根据解耦模式文档计划相应的配置变更。

详情请参考[变更提案](https://lists.apache.org/thread/b69vjkbdszdtk9y30k45c2tvg4f3hqwt)和 [PR #10012](https://github.com/apache/apisix/pull/10012)。

### 对 APISIX 核心资源进行严格验证

对核心资源进行严格验证。这意味着在配置 upstream 时，您添加的任何自定义字段必须符合定义的模式。

如果您配置一个这样的上游：

```shell
curl http://127.0.0.1:9180/apisix/admin/upstreams/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:8080": 1
    },
    "custom_field": "this_is_not_allowed"
  }'
```

您会收到 `400` 响应和以下内容：

```text
{"error_msg":"invalid configuration: additional properties forbidden found .*"\}
```

详情请参考 [PR #10233](https://github.com/apache/apisix/pull/10233)。

## 新功能

### 支持使用本地 DNS 解析器进行服务发现

配置文件提供了一个新的选项 `resolv_conf`，您可以在其中指定包含本地DNS解析器列表的文件路径。

您应该只配置 `servers` 或者 `resolv_conf` 其中一个选项，例如：

```yaml title="conf/config.yaml"
discovery:
  dns:
    # servers:
    #  - "127.0.0.1:8600"          # Address of DNS server.
    resolv_conf: /etc/resolv.conf  # Path to the local DNS resolver config.
```

详情请参考 [PR #9770](https://github.com/apache/apisix/pull/9770)。

### 支持直接转发 Dubbo 流量

APISIX 提供了对 Dubbo 流量的直接转发支持。

详情请参考 [PR #9660](https://github.com/apache/apisix/pull/9660)。

### 在 `opentelemetry` 插件中支持 NGINX 变量

在 `opentelemetry` 插件中支持使用 NGINX 变量。例如您可以配置如下：

```yaml title="conf/config.yaml"
http:
  enable_access_log: true
  access_log: "/dev/stdout"
  access_log_format: '{"time": "$time_iso8601","opentelemetry_context_traceparent": "$opentelemetry_context_traceparent","opentelemetry_trace_id": "$opentelemetry_trace_id","opentelemetry_span_id": "$opentelemetry_span_id","remote_addr": "$remote_addr","uri": "$uri"}'
  access_log_format_escape: json
plugins:
  - opentelemetry
plugin_attr:
  opentelemetry:
    set_ngx_var: true
```

详情请参考 [PR #8871](https://github.com/apache/apisix/pull/8871)。

### 在外部插件中支持对请求体进行重写

在外部插件（即非 Lua 插件）中支持对请求体进行重写。

详情请参考 [PR #9990](https://github.com/apache/apisix/pull/9990)。

## 其他更新

- 支持配置访问日志的缓冲区大小 ([PR #10225](https://github.com/apache/apisix/pull/10225))
- 移除安装过程 Rust 依赖 ([PR #10121](https://github.com/apache/apisix/pull/10121))
- 在 `traffic-split` 插件中支持 HTTPS ([PR #9115](https://github.com/apache/apisix/pull/9115))
- 在 `chaitin-waf` 插件中支持使用 UNIX sock 主机模式 ([PR #10161](https://github.com/apache/apisix/pull/10161))
- 修复 GraphQL POST 请求路由匹配异常 ([PR #10198](https://github.com/apache/apisix/pull/10198))
- 修复 `proxy-cache` 插件中配置无效 `cache_zone` 时的报错 ([PR #10138](https://github.com/apache/apisix/pull/10138))

## 变更日志

有关此版本中更改的完整列表，请参阅 [变更日志](https://github.com/apache/apisix/blob/master/CHANGELOG.md#360)。
