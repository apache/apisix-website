---
title: "可观测性能力升级，API 网关 Apache APISIX 集成 OpenTelemetry"
authors:
  - name: "庄浩潮"
    title: "Author"
    url: "https://github.com/dmsolr"
    image_url: "https://avatars.githubusercontent.com/u/29735230?v=4"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://avatars.githubusercontent.com/u/97138894?v=4"
keywords: 
- Apache APISIX
- API Gateway
- OpenTelemetry
- Observability
- Ecosystem
description: 本文为您介绍了云原生 API 网关 Apache APISIX 的 opentelemetry 插件的概念以及如何在 APISIX 使用 opentelemetry 插件对接 OpenTelemetry，实现 trace 数据采集。
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/opentelemetry.png
---

> 本文为您介绍了 API 网关 Apache APISIX 中的 `opentelemetry` 插件的概念以及如何部署 `opentelemetry` 插件。

<!--truncate-->

<head>
    <link rel="canonical" href="https://opentelemetry.io/blog/2022/apisix/" />
</head>

## 背景信息

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。作为 API 网关，Apache APISIX 不仅拥有众多实用的插件，而且支持插件动态变更和热插拔。

OpenTelemetry 是一个开源的遥测数据采集和处理系统，它不仅提供了各种 SDK 用于应用端遥测数据的收集和上报，以及数据收集端用于数据接收、加工和导出，还支持通过配置导出到任意一个或者多个已经适配 OpenTelemetry Exporter 的后端，比如 Jaeger、Zipkin、OpenCensus 等。您可以在 opentelemetry collector contrib 库中查看已经适配 OpenTelemetry Collector 的插件列表。

![error/OpenTelemetry](https://static.apiseven.com/202108/1646037628714-f542841e-ac27-4c13-a4c8-4cdef79ee501.png)

## 插件介绍

Apache APISIX `opentelemetry` 插件是基于 OpenTelemetry 原生标准（[OTLP/HTTP](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/otlp.md#otlphttp-request)）实现的 Tracing 数据采集，并通过 HTTP 协议发送至 OpenTelemetry Collector。该功能将在 Apache APISIX 2.13.0  版本中上线支持。

由于 OpenTelemetry 的 Agent/SDK 与后端实现无关，当应用集成了 OpenTelemetry 的 Agent/SDK 之后，用户能够在应用侧无感知的情况下轻松地、自由地变更可观测性后端服务，比如从 Zipkin 切换成 Jaeger。

`opentelemetry` 插件在 Apache APISIX 中集成了 OpenTelemetry Agent/SDK，可以实现采集被追踪的请求生成 trace 后转发到 OpenTelemetry Collector。

`opentelemetry` 插件位于上图中的 Agent 侧，但目前仅支持 `trace` 协议，还不支持 OpenTelemetry 的 `logs` 和 `metrics` 协议。

## 如何使用

### 启用插件

您需要在 `conf/config.yaml` 配置文件中启用 `opentelemetry` 插件并修改 `collector` 配置。

假设您已经完成 OpenTelemetry Collector 的部署，并且启用了 [OTLP HTTP Receiver](https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md)。

> 如果您未完成部署，可参考下一节的场景示例部分，完成 OpenTelemetry Collector 的部署。

其中 OTLP HTTP Receiver 的默认端口为`4318`，`collector` 的地址为 OpenTelemetry Collector 的 HTTP Receiver 地址，相关字段可参考 [Apache APISIX 官方文档](https://apisix.apache.org/zh/docs/apisix/next/plugins/opentelemetry/)。

  ```YAML
  plugins
  ... # 已经启用的其它插件
  - opentelemetry
plugin_attr:
  ...
  opentelemetry:
    trace_id_source: x-request-id
    resource:
      service.name: APISIX
    collector:
      address: 127.0.0.1:4318 # OTLP HTTP Receiver 地址
      request_timeout: 3
  ```

#### 方法一：将插件绑定到指定路由

为了更方便的展示测试效果，示例中暂时将 `sampler` 设置为全采样，以确保每次请求都被追踪后产生 `trace` 数据，方便您在 Web UI 上查看 `trace` 的相关数据。您也可以根据实际情况，设置相关参数。

  ```Shell
  curl http://127.0.0.1:9080/apisix/admin/routes/1 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
  -X PUT -d '
{
    "uri": "/get",
    "plugins": {
        "opentelemetry": {
            "sampler": {
                "name": "always_on"
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

#### 方式二：设置 Global Rules

您也可以通过 Apache APISIX Plugins 功能启用 `opentelemetry` 插件。完成全局配置后，您仍然需要创建路由，否则将无法进行测试。

  ```Shell
  curl 'http://127.0.0.1:9080/apisix/admin/global_rules/1' \
-H 'X-API-KEY:  edd1c9f034335f136f87ad84b625c8f1' \
-X PUT -d '{
    "plugins": {
        "opentelemetry": {
            "sampler": {
                "name": "always_on"
            }
        }
    }
}'
  ```

#### 方式三：通过 `additional_attributes` 为 Span 自定义标签

关于 `sampler` 和 `additional_attributes` 的配置您可以参考 [Apache APISIX 官方文档](https://apisix.apache.org/zh/docs/apisix/next/plugins/opentelemetry/)，其中 `additional_attributes` 是一系列的 `Key:Value` 键值对，您可以使用它为 Span 自定义标签，并且可以跟随 Span 在 Web UI 上展示。通过 `additional_attributes` 为某个路由的 Span 增加 `route_id` 和 `http_x-custom-ot-key`，可以参考如下配置：

  ```Shell
curl http://127.0.0.1:9080/apisix/admin/routes/1001 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
  -X PUT -d '
{
    "uri": "/put",
    "plugins": {
        "opentelemetry": {
            "sampler": {
                "name": "always_on"
            },
            "additional_attributes":[
                "route_id",
                "http_x-custom-ot-key"
            ]
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

### 测试示例

您可以通过以上三种方式中的任意一种方式启用 `opentelemetry`，以下示例使用方式三的方法创建路由，创建成功后，您可以参考如下命令访问路由：

```Shell
curl -X PUT -H `x-custom-ot-key: test-ot-val` http://127.0.0.1:9080/put
```

访问成功之后，您可以在 Jaeger UI 中看到类似如下图所示 /put 的 Span 详情，并可以看到 Tags 列表中展示了路由中自定义的 tag：`http_x-custom-ot-key` 和 `route_id`。

![error/Span details.png](https://static.apiseven.com/202108/1646039676695-a346734b-0498-4ff6-8882-789a61008544.png)

您需要注意，`additional_attributes` 配置的设定是从 Apache APISIX 和 Nginx 变量取值作为 `attribute` 的值，因此 `additional_attributes` 必须是 Apache APISIX 或者 Nginx 的有效变量。其中也包括 HTTP Header，但是在取 `http_header` 时，需要添加 `http_` 作为变量名的前缀。如果变量不存在，就不会展示这个 `tag` 了。

### 场景示例

本场景示例通过简单修改 OpenTelemetry Collector 官方示例部署 Collector、Jaeger 和 Zipkin 作为后端服务，并且启动两个示例应用程序（Client 和 Server），其中 Server 提供了一个 HTTP 服务，而 Client 会循环调用 Server 提供的 HTTP 接口，从而产生包括两个 Span 的调用链。

#### 步骤一：部署 OpenTelemetry

以下使用 `docker-compose` 作为示例，其它部署可以参考 [OpenTelemetry 官方文档](https://opentelemetry.io/docs/collector/getting-started/)。

您可以参考如下命令部署：

  ```Shell
git clone https://github.com/open-telemetry/opentelemetry-collector-contrib.git
cd opentelemetry-collector-contrib/examples/demo
docker-compose up -d
  ```

在浏览器中输入 `http://127.0.0.1:16886`（Jaeger UI）或者 `http://127.0.0.1:9411/zipkin`（Zipkin UI），如果可以正常访问，则表示部署成功。

下图为访问成功示例：

![error/Jaeger example.png](https://static.apiseven.com/202108/1646039980335-71bbb6f7-39d5-4153-b6e7-0305f52112f3.png)

![error/Zipkin example.png](https://static.apiseven.com/202108/1646040117233-7a18f85f-4037-43e3-bc63-0ff6d1dbe5c1.png)

#### 步骤二：配置测试环境

引入 Apache APISIX 服务，最终应用的拓扑如下图所示：

![error/Architecture diagram.png](https://static.apiseven.com/202108/1646040225319-819f10ab-9643-4bd7-8f99-07f9a6c84bf8.png)

Trace 数据上报流程如下。其中由于 Apache APISIX 是单独部署的，并不在 `docker-compose` 的网络内，所以 Apache APISIX 是通过本地映射的端口（即 `127.0.0.1:4138`）访问到 OpenTelemetry Collector 的 OTLP HTTP Receiver 的。

![error/Trace data reporting process.png](https://static.apiseven.com/202108/1646040470172-4d44c6ca-b890-4245-9c87-3a42d8b59f47.png)

您需要确保已经启用 `opentelemetry` 插件，并重新加载 Apache APISIX。

1. 您可以参考如下示例创建一个路由，并且启用 `opentelemetry` 插件进行采样：

  ```Shell
  curl http://127.0.0.1:9080/apisix/admin/routes/1 \
    -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
    -X PUT -d '
  {
      "uri": "/hello",
      "plugins": {
          "opentelemetry": {
              "sampler": {
                  "name": "always_on",
              }
          }
      },
      "upstream": {
          "type": "roundrobin",
          "nodes": {
              "127.0.0.1:7080": 1
          }
      }
  }'
  ```

2. 修改 `./examples/demo/otel-collector-config.yaml` 文件，并添加 OTLP HTTP Receiver，如下所示：

  ```Shell
  receivers:
    otlp:
      protocols:
        grpc:
        http:${ip:port}   # 添加 OTLP HTTP Receiver，默认端口为 4318
  ```

3. 修改 `docker-compose.yaml`。

您需要修改配置文件，把 Client 调用 Server 的接口地址修改为 Apache APISIX 的地址，将 OTLP HTTP Receiver 和 Server 服务的端口映射到本地。

以下示例是修改配置后完整的 `docker-compose.yaml`：

  ```YAML
version: "2"
services:

  # Jaeger
  jaeger-all-in-one:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686" # jaeger ui 的端口
      - "14268"
      - "14250"

  # Zipkin
  zipkin-all-in-one:
    image: openzipkin/zipkin:latest
    ports:
      - "9411:9411"

  # Collector
  otel-collector:
    image: ${OTELCOL_IMG}
    command: ["--config=/etc/otel-collector-config.yaml", "${OTELCOL_ARGS}"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "1888:1888"   # pprof extension
      - "8888:8888"   # Prometheus metrics exposed by the collector
      - "8889:8889"   # Prometheus exporter metrics
      - "13133:13133" # health_check extension
      - "4317"        # OTLP gRPC receiver
      - "4318:4318"   # 添加 OTLP HTTP Receiver 端口映射
      - "55670:55679" # zpages extension
    depends_on:
      - jaeger-all-in-one
      - zipkin-all-in-one

  demo-client:
    build:
      dockerfile: Dockerfile
      context: ./client
    environment:
      - OTEL_EXPORTER_OTLP_ENDPOINT=otel-collector:4317
      - DEMO_SERVER_ENDPOINT=http://172.17.0.1:9080/hello # APISIX 的地址
    depends_on:
      - demo-server

  demo-server:
    build:
      dockerfile: Dockerfile
      context: ./server
    environment:
      - OTEL_EXPORTER_OTLP_ENDPOINT=otel-collector:4317
    ports:
      - "7080:7080" # 将 Server 端口映射到宿主机
    depends_on:
      - otel-collector

  prometheus:
    container_name: prometheus
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yaml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
  ```

需要注意，`demo-client.environment.DEMO_SERVER_ENDPOINT` 处需要改为您的 Apache APISIX 地址，且保证在容器内可以正常访问。

当然，您也可以通过 `docker-compose.yaml` 部署 Apache APISIX ，具体可以参考 [Apache APISIX 官方文档](https://github.com/apache/apisix-docker/blob/master/docs/en/latest/example.md)。

#### 步骤三：测试

重新部署完成后，访问 Jaeger UI 或者 Zipkin UI 即可看到 Trace 中包含了 APISIX 的 Span，如下图：

![error/Jaeger example.png](https://static.apiseven.com/202108/1646045290844-acfa071b-5a0d-4f7a-aa77-55838a3cb9f6.png)

![error/Zipkin example.png](https://static.apiseven.com/202108/1646045376329-e1344754-58b4-4a73-8aea-50e6a04f3b70.png)

## 禁用插件

如果您暂时不需要某个路由的 Trace 采集，则仅需修改路由配置，将配置中的 `plugins` 下的 `opentelemetry` 相关配置删除即可。

如果您是通过绑定 Global Rules 全局启用的，则只能删除 `opentelemetry` 全局插件的配置。得益于 Apache APISIX 的动态化优势，开启关闭插件的过程都不需要重启 Apache APISIX，十分方便。

## 总结

Apache APISIX 在集成 OpenTelemetry 之后，借助 OpenTelemetry 丰富的插件能够与市场上大部分主流的 Trace 系统轻松实现对接。此外，Apache APISIX 也实现了 SkyWalking 和 Zipkin 原生标准协议插件，也在积极与各大社区合作打造更加强大的生态。

Apache APISIX 项目目前正在开发其他插件以支持集成更多服务，如果您对此有兴趣，您可以通过 [GitHub Discussions](https://github.com/apache/apisix/discussions) 发起讨论，或通过[邮件列表](https://apisix.apache.org/docs/general/join)进行交流.

## 相关阅读

- [浅谈 Apache APISIX 的可观测性](https://apisix.apache.org/zh/blog/2021/11/04/skywalking)

- [生态扩大进行中！API 网关集成 Splunk HTTP Event Collector](https://apisix.apache.org/zh/blog/2022/02/10/apisix-splunk-integration)
