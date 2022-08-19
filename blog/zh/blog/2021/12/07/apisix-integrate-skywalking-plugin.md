---
title: "API 网关集成 SkyWalking 打造全方位日志处理"
authors: 
  - name: "庄浩潮"
    title: "Author"
    url: "https://github.com/dmsolr"
    image_url: "https://avatars.githubusercontent.com/u/29735230?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- API 网关
- Apache SkyWalking
- 日志处理
- 插件集成
description: 本文主要介绍云原生 API 网关 Apache APISIX 集成 SkyWalking 的日志插件，为之后用户在 Apache APISIX 中进行日志处理提供更方便的操作与环境。
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/skywalking.png
---

> 本文主要介绍了两款 Apache APISIX 集成 SkyWalking 的日志插件，为之后大家在 Apache APISIX 中进行日志处理提供更方便的操作与环境。

<!--truncate-->

在可观测性领域，通常采用 Metrics、Logger 与 Tracing 三大方向的数据收集与分析，以达到洞察应用运行状态的目的，Apache SkyWalking 的日志处理正好具备了以上三方面。

Apache APISIX 早在 1.4 版本就已经集成 Apache SkyWaling Tracing 能力，并在后续版本中加入了错误日志和访问日志收集等功能。如今随着 Apache SkyWalking 对 Metrics 的支持，能够帮助 Apache APISIX 在集成模式下实现一站式可观测方案，同时覆盖到日志、度量和调用追踪。

## 功能开发背景

熟悉 Apache APISIX 的小伙伴应该知道，Apache APISIX 在运行中会产出两种日志，即访问日志和错误日志。

访问日志记录着每个请求的详细信息，属于**请求范围**内产生的日志，因此可以直接与 Tracing 关联。而错误日志则是 Apache APISIX **运行时**产出日志信息，是整个应用级别日志，但无法确保能百分百关联到请求上。

目前 Apache APISIX 提供了非常丰富的日志处理插件，包括 TCP/HTTP/Kafka 等收集上报插件，但它们与 Tracing 关联都比较弱。以 Apache SkyWalking 为例，提取 Apache APISIX 端日志记录中的 SkyWalking Tracing Conetxt Header 并输出到文件系统，之后利用日志处理框架（fluentbit）将日志转成 SkyWalking 可接受的日志格式。后续从中解析提取 Tracing Context，从而获得 Tracing ID 进而与 Trace 建立联系。

显然，上述方式处理流程比较繁琐复杂，还需要额外转换日志格式。为此，在 [PR#5500](https://github.com/apache/apisix/pull/5550) 中我们实现了将 Apache SkyWalking 访问日志接入 Apache APISIX 插件生态，方便用户在使用 Apache APISIX 中更方便地利用 Apache SkyWalking 进行收集和处理相关日志。

## 全新日志插件介绍

### SkyWalking Logger 插件

SkyWalking Logger 插件能够解析 SkyWalking Tracing Context Header，并将相关 Tracing Context 信息打印到日志中，从而实现日志与调用链建立关联。

通过使用此插件，可以实现在下游已经集成 Apache SkyWalking 的情况下，Apache APISIX 即便没有打开 SkyWalking Tracing 插件也能获取到 SkyWalking Tracing Context 并实现与 Tracing 关联。

![日志内容](https://static.apiseven.com/202108/1638781626018-da50a39d-da16-4914-b4f5-8ac9b4312e19.png)

>上图 Content 为日志内容，这里使用了 Apache APISIX metadata 配置来收集 Request 相关信息。后续可通过 Plugin Metadata 修改 Log Format 定制日志内容，具体可以参考[官方文档](https://apisix.apache.org/docs/apisix/plugins/skywalking-logger#metadata)。

#### 使用方法

在使用该插件时，由于 SkyWalking 插件默认为「不开启」，所以需要手动修改 `conf/default-apisix.yaml` 文件中 `plugins` 章节来解开SkyWalking 注释从而启用插件。

```yaml
plugins:
  ...
  - skywalking
  ...
```

之后便可使用 SkyWalking Tracing 插件直接得到 Tracing 数据，以便接下来验证 Logging 插件相关功能是否能够正常开启与工作。

##### 步骤一：创建路由

接下来创建一个路由，并绑定 SkyWalking Tracing 插件和 SkyWalking Logging 插件。关于插件具体配置细节可以参考 [Apache APISIX 官方文档](https://apisix.apache.org/docs/apisix/plugins/skywalking-logger)，这里不再赘述。

```shell
curl -X PUT 'http://192.168.0.108:9080/apisix/admin/routes/1001' \
-H 'X-API-KEY:  edd1c9f034335f136f87ad84b625c8f1' \
-H 'Content-Type: application/json' \
-d '{
    "uri": "/get",
    "plugins": {
        "skywalking": {
            "sample_ratio": 1
        },
        "skywalking-logger": {
            "endpoint_addr": "http://127.0.0.1:12800"
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

##### 步骤二：日志处理

在 Apache SkyWalking 侧，可以使用 LAL（Logger Analysis Language）脚本进行日志处理，比如 Tag 提取、SkyWalking 元数据修正等。

这里进行 Tag 提取主要是为了后续检索方便，以及在 Metrics 统计时添加相关依赖。可使用如下代码进行 SkyWalking LAL 脚本配置来完成 Tag 提取，更多关于 SkyWalking LAL 脚本使用方法可以参考 [Apache SkyWalking 官方文档](https://skywalking.apache.org/docs/main/latest/en/concepts-and-designs/lal/)。

```yaml
# The default LAL script to save all logs, behaving like the versions before 8.5.0.
rules:
  - name: default
    dsl: |
      filter {
        json {
          abortOnFailure false
        }

        extractor {
          tag routeId: parsed.route_id
          tag upstream: parsed.upstream
          tag clientIp: parsed.client_ip
          tag latency: parsed.latency
        }

        sink {
        }
      }
```

在 SkyWalking OAP Server 配置上述 LAL 脚本后将显示如下日志：

![LAL 脚本日志显示](https://static.apiseven.com/202108/1638781696137-6ba3a486-08c0-49e1-bc57-e144f95918a2.png)

展开日志详情如下：

![展开日志详情](https://static.apiseven.com/202108/1638781751540-d597ace7-1de1-4baf-b361-1c136dfe5e05.png)

通过上述操作可以看到，将 `routeId`，`upstream` 和 `clientIp` 以键值对形式展示，比在日志正文中直接查找要方便许多，还能用于 MAL 统计生成相关的度量指标。

### SkyWalking Error Logger 插件

目前 error-log-logger 插件已支持 SkyWalking 日志格式，现在可以使用 error-log-logger 插件将 Apache APISIX 错误日志快捷接入到 Apache SkyWalking 中。目前，错误日志还无法获取 SkyWalking Tracing Context 信息，因此无法直接与 SkyWalking Tracing 产生关联。

关于 Error Log 接入 SkyWalking 主要是为了能集中管理 Apache APISIX 的日志数据，同时也方便在 SkyWalking 内查看所有可观测性数据。

![SkyWalking 面板查看](https://static.apiseven.com/202108/1638781827612-f7d88e0e-0159-44ba-bc1e-b718695bc3b8.png)

#### 使用方法

由于 error-log-logger 插件默认「不开启」，所以仍需要上文中提到的方法进行插件开启。

```yaml
plugins:
  ...
  - error-log-logger
  ...
```

##### 步骤一：绑定路由

启用之后，需要将插件绑定到路由或者 `global rules` 上，这里我们以「绑定路由」为例。

```shell
curl -X PUT 'http://192.168.0.108:9080/apisix/admin/plugin_metadata/error-log-logger' \
-H 'X-API-KEY:  edd1c9f034335f136f87ad84b625c8f1' \
-H 'Content-Type: application/json' \
-d '{
    "inactive_timeout": 10,
    "level": "ERROR",
    "skywalking": {
        "endpoint_addr": "http://127.0.0.1:12800/v3/logs"
    }
}'
```

>注意这里 `endpoint_addr` 是 SkyWalking OAP Server 地址，需要带上 URI（即 `/v3/logs`)。

##### 步骤二：LAL 处理

与 Access Log 处理方式基本一样，日志在送达 SkyWalking OAP Server 时，同样会经过 LAL 处理。因此，我们依然可以使用 SkyWalking LAL 脚本来分析处理日志信息。

需要注意的是，Error Log 日志消息体使用文本格式。如果进行 Tags 提取，则需要使用正则表达式来完成。与 Access Log 处理消息正文的方式略有不同，Acces Log 使用 JSON 格式，可以直接使用 JSON 解析后引用 JSON 对象的字段，其他处理流程则大体一致。

同时也可以利用 Tags 来优化显示效果与检索，方便后续使用 SkyWalking MAL 进行 Metrics 计算。

```json
rules:
  - name: apisix-errlog
    dsl: |
      filter {
        text {
          regexp "(?<datetime>\\d{4}/\\d{2}/\\d{2} \\d{2}:\\d{2}:\\d{2}) \\[(?<level>\\w+)\\] \\d+\\#\\d+:( \\*\\d+ \\[(?<module>\\w+)\\] (?<position>.*\\.lua:\\d+): (?<function>\\w+\\(\\)):)* (?<msg>.+)"
        }
        extractor {
          tag level: parsed.level
          if (parsed?.module) {
            tag module: parsed.module
            tag position: parsed.position
            tag function: parsed.function
          }
        }
        sink {
        }
      }
```

在 SkyWalking OAP Server 使用的 LAL 脚本之后，将会在日志中提取部分 Tags，效果如下图。

![提取 Tags](https://static.apiseven.com/202108/1638781886771-b98c80de-4ea2-4cf3-ad1c-26250da231f7.png)

## 总结

本文主要介绍了两款 Apache APISIX 集成 SkyWalking 的日志插件，为之后大家在 Apache APISIX 中进行日志处理提供更方便的操作与环境。希望通过本篇内容，大家可以对新功能有了更充分的理解，后续可以更方便地利用 Apache APISIX 进行可观测数据的集中管理。
