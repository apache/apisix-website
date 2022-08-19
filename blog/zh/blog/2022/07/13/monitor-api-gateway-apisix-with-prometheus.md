---
title: "使用 Prometheus 监控云原生 API 网关 APISIX"
authors:
  - name: "韩飞"
    title: "Author"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords:
  - Apache APISIX
  - API 网关
  - Prometheus
  - Grafana
description: 本文将为你介绍云原生 API 网关 Apache APISIX 的 prometheus 插件的相关信息，并通过此插件监控 APISIX，也为你演示了如何在 APISIX Dashboard 中配置 Grafana。
tags: [Ecosystem, Plugins]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/prometheus.png
---

> 本文将为你介绍 Apache APISIX 的 prometheus 插件的相关信息，并通过此插件监控 APISIX，并且也为你演示了如何在 APISIX Dashboard 中配置 Grafana。

<!--truncate-->

## 背景信息

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。作为 API 网关，Apache APISIX 不仅拥有丰富的插件，而且支持插件的热加载。

Prometheus 是一款开源的云原生监控报警系统，它为用户提供强大的指标存储功能、告警功能和近实时查询引擎，支持多种 exporter 采集数据和 pushgateway 进行数据上报。Prometheus 的性能足够支撑上万台规模的集群，是目前最流行的开源监控系统之一。

## 插件介绍

APISIX 通过 Prometheus Exporter 以 HTTP 的方式向外暴露 APISIX 设定的监控指标，包括 APISIX 的连接数、HTTP 请求的状态码分布、HTTP 请求总数、HTTP 请求延时等重要指标。你可以使用 `prometheus` 插件，来监控 APISIX 的各个指标，以便及时地了解系统运行状态。

## 配置步骤

### 步骤一：启用 prometheus 插件

首先，你需要安装完成 APISIX，本文所有步骤基于 CentOS 7.6 系统进行。你需要完成 APISIX 的安装，具体细节可参考 [APISIX 安装指南](https://apisix.apache.org/zh/docs/apisix/how-to-build/)。

APISIX 默认启用 `prometheus` 插件，该插件默认创建 `/apisix/prometheus/metrics` 接口，并通过独立的服务地址（默认为 `127.0.0.1:9091`）暴露指标，本文将使用该地址进行。

你也可以在配置文件中添加如下配置，修改默认的服务地址：

```yaml title="./conf/config.yaml"
plugin_attr:
  prometheus:
    export_addr:
      ip: 127.0.0.1
      port: 9092
```

建议在 `ip` 参数中配置内网地址，确保仅在局域网内暴露 Prometheus Exporter 接口。当然你也可以使用 [public-api](https://apisix.apache.org/zh/docs/apisix/plugins/public-api/) 插件保护此接口。为了方便在测试环境中使用，你也可以将 Prometheus Exporter 直接暴露在数据面的端口上。如下所示：

```yaml
plugin_attr:
  prometheus:
    enable_export_server: false
```

配置完成后，你可以通过以下命令提取相关监控指标：

```shell
curl -i http://127.0.0.1:9091/apisix/prometheus/metrics
```

返回如下结果即为配置成功。

```shell
HTTP/1.1 200 OK
Server: openresty
Date: Wed, 23 Mar 2022 13:22:58 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive

# HELP apisix_etcd_modify_indexes Etcd modify index for APISIX keys
# TYPE apisix_etcd_modify_indexes gauge
apisix_etcd_modify_indexes{key="consumers"} 0
...
# TYPE apisix_node_info gauge
apisix_node_info{hostname="APISIX"} 1
```

### 步骤二：配置 Prometheus

1. 安装 Prometheus：

```shell
cd /usr/local && \
wget https://github.com/prometheus/prometheus/releases/download/v2.33.0-rc.0/prometheus-2.33.0-rc.0.linux-amd64.tar.gz && \
tar -zxvf prometheus-2.33.0-rc.0.linux-amd64.tar.gz && \
cd /usr/local/prometheus-2.33.0-rc.0.linux-amd64/
```

2. 通过在 Prometheus 的 `prometheus.yml` 配置文件中添加相关配置，Prometheus 就可以自动抓取指标数据。具体配置如下：

```shell title="./prometheus.yml"
scrape_configs:
  - job_name: "apisix"
    scrape_interval: 15s
    metrics_path: "/apisix/prometheus/metrics"
    static_configs:
      - targets: ["127.0.0.1:9091"]
```

其中 `scrape_interval` 的取值与 Prometheus QL 中 `rate` 函数的时间范围有关系，`rate` 函数中的时间范围应该是此参数取值的两倍。`targets` 是在 APISIX 中配置的 Prometheus Exporter 暴露指标的地址。更多关于 Prometheus 的使用方法请参考 [Prometheus 官方文档](https://prometheus.io/docs/introduction/overview/)。

3. 启动 Prometheus，并指定监听端口为 `9094`。

```shell
./prometheus --config.file=prometheus.yml --web.listen-address=:9094 --web.enable-lifecycle &
```

访问 `127.0.0.1:9094`，选择 `Status > Targets`，页面如下则表示配置成功：

![network error/prometheus.png](https://static.apiseven.com/2022/blog/0713/1.png)

### 步骤三：创建路由

启用 `prometheus` 插件后，访问 Prometheus Exporter 获取的 Metrics 数据中并不包括 HTTP 请求的相关指标，仅有 APISIX 实例相关的指标。因此启用插件之后还需要将它绑定在指定的路由上或者创建一个[全局规则](https://apisix.apache.org/zh/docs/apisix/terminology/global-rule/)。以下示例是创建一个路由并将该插件绑定在该路由上：

```shell
curl -X PUT http://127.0.0.1:9080/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
-d '{
        "uri": "/*",
        "plugins": {
            "prometheus": {
                "prefer_name": false
            }
        },
        "upstream": {
            "type": "roundrobin",
            "nodes": {
                "httpbin.org": 1
            }
        }
    }'
```

如果你需要收集所有路由的指标数据，可以通过以下命令创建全局规则：

```shell
curl http://127.0.0.1:9080/apisix/admin/global_rules/1 -X PUT \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' \
  -d '{
        "plugins": {
            "prometheus": {
                "prefer_name": false
            }
        }
    }'
```

### 步骤四：配置 Grafana

1. 通过以下命令安装 Grafana。

```shell
cd /usr/local && \
wget https://dl.grafana.com/enterprise/release/grafana-enterprise-8.3.3-1.x86_64.rpm && \
sudo yum -y install grafana-enterprise-8.3.3-1.x86_64.rpm
```

2. 你需要修改 Grafana 相关配置才可以在 APISIX Dashboard 正常使用 Grafana。请在 Grafana 配置文件 `defaults.ini` 修改如下配置：

```ini title="/usr/share/grafana/conf/defaults.ini"
allow_embedding = true
# 由于安全策略，设置为 true 时，浏览器才可以正确呈现 Grafana 页面。
#... 其他配置
[auth.anonymous]
# 启用匿名登录
enabled = true
```

3. 配置完成后，请使用以下命令启动 Grafana：

```shell
systemctl start grafana-server
```

4. 登录 Grafana（默认地址为 `http://127.0.0.1:3000`），默认用户和密码均为 `admin`。登录成功后，在当前页面单击 `Add your first data source`，选择 `Prometheus`，配置 URL 为 `http://127.0.0.1:9094`。

![network error/import.png](https://static.apiseven.com/2022/blog/0713/2.png)

5. 单击左侧 `+` 号并选择 `Import`，单击 `Upload JSON file` 上传 [APISIX Grafana Dashboard 元数据文件](https://github.com/apache/apisix/blob/master/docs/assets/other/json/apisix-grafana-dashboard.json)。上传后，单击 `Import`，Grafana 就配置成功了。

![network error/apisix grafana.png](https://static.apiseven.com/2022/blog/0713/3.png)

### 步骤五：请求 APISIX

完成上述步骤后，可以通过以下命令请求路由：

```shell
curl http://127.0.0.1:9080/index.html
```

返回 Grafana 页面，单击左侧导航栏搜索按钮，就可以查看 APISIX 相关的指标了。

![network error/apisix grafana.png](https://static.apiseven.com/2022/blog/0713/4.png)

### 步骤六：嵌入 APISIX Dashboard

1. 安装并登录 APISIX Dashboard，默认地址为 `127.0.0.1:9000`。具体细节可参考 [APISIX Dashboard 安装指南](https://apisix.apache.org/zh/docs/dashboard/install/)。
2. 选择右上角 `APISIX USER >系统设置`。
3. 在设置页面中的 Grafana 地址处填写 Grafana 的地址并单击提交。

![network error/apisix dashboard.png](https://static.apiseven.com/2022/blog/0713/5.png)

## 总结

本文详细介绍了如何使用 Prometheus 监控 APISIX，并且展示了如何在 APISIX Dashboard 中嵌入 Grafana 监控面板。

Apache APISIX 项目目前正在开发其他插件以支持集成更多服务，如果你对此有兴趣，你可以通过 [GitHub Discussions](https://github.com/apache/apisix/discussions) 发起讨论，或通过[邮件列表](https://apisix.apache.org/docs/general/join/)进行交流。
