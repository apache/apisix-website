---
title: "如何使用 DataAnt 监控 Apache APISIX"
authors:
  - name: "韩飞"
    title: "Author"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- Apache APISIX
- API 网关
- 可观测性
- 监控
- DataAnt
description: 本文主要介绍了如何通过 DataAnt Agent 将云原生 API Gateway Apache APISIX 的指标数据上传到 DataAnt 监控系统，实现对 Apache APISIX 进行监控。
tags: [Ecosystem]
---

> 本文主要介绍如何通过 DataAnt Agent 将 API Gateway Apache APISIX 的指标数据上传到 DATAANT 监控系统。

<!--truncate-->

## 背景信息

Apache APISIX 是一个开源的云原生 API 网关，作为 API 网关，它兼具动态、实时、高性能等特点，提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。你可以使用 Apache APISIX 来处理传统的南北向流量，以及服务间的东西向流量，也可以当做 K8s Ingress controller 来使用。得益于 APISIX 全动态的设计，可以随时进行配置更改并且均不需要重启服务。

DataAnt 全栈云监控系统通过大数据和机器学习能够汇总 IaaS、PaaS 和 SaaS 层所有运维数据，给用户提供统一可视化界面。DataAnt 允许用户在相关监控数据源之间无缝快速地移动，而无需切换工具，更精细地了解到自己 IT 系统的状态。其提供的 DataAnt Agent 可以实时监控 APISIX 并将其监控数据上传到 DataAnt PaSS 平台，实现云端一站式监控。

## 原理简介

![principle](https://static.apiseven.com/2022/blog/0705/1.svg)

1. 采集配置

  DataAnt Agent 首先会通过 `config.yaml` 的配置的 APISIX 项进行采集器初始化和注册。同一个 Agent 可以注册多个采集器。采集器收集 APISIX 暴露的指标后，对指标数据进行加密上传到 DataAnt Cloud。

2. 数据可视化

  DataAnt Cloud 在接收到数据后，数据经过初步的监控信息补充和处理会存放到时序数据库中，之后可以通过 DataAnt 的 Dashboard 实时监控 APISIX。

3. 告警通知

  数据还将通过消息分发到告警匹配处理，然后再进行通知聚合最终通过配置的通知方式将告警发送，即可以实时接收到 APISIX 的异常情况。

## 配置指南

1. 首先请访问 [DataAnt Cloud](http://139.224.11.158)，注册账户并登录平台。

2. 通过[下载链接](https://pan.baidu.com/s/1fabvSiDLDh8ZRTjpzINHLg?pwd=87d4)获取 DataAnt 的 Agent，下载完成后上传到 APISIX 所在的机器上并给 Agent 添加执行权限。

3. 在当前目录下创建 DataAnt Agent 所需的配置文件 `./config.yaml`。详细配置如下：

  ```yaml
  tenantId: 11       # 该 ID 是您的 DataAnt 平台的用户 ID
  hostIp: 127.0.0.1  # 主机的标识 IP
  hostName: apisix
  configs:
    - uri: http://127.0.0.1:9091  # APISIX 监控指标所暴露的端口
      type: apisix                # 监控类型选择 APISIX
      asName: apisix_test         # 别名
  ```

4. 使用以下命令启动 Agent。

  ```shell
  ./agent
  ```

  启动成功后，则会返回以下数据：

  ```shell
  2022/06/21 20:50:10 {"code":200,"msg":"请求成功","data":null}
  2022/06/21 20:50:30 {"code":200,"msg":"请求成功","data":null}
  2022-06-21 20:51:00:000        INFO        apisix/apisix.go:25        获取对应监控数据，数据长度1675
  2022-06-21 20:51:00:000        INFO        prometheus/prometheusCollector.go:43        获取对应监控数据开始解析1675
  2022-06-21 20:51:00:000        INFO        prometheus/prometheusCollector.go:43        获取对应监控数据完成解析 解析指标数量21
  2022-06-21 20:51:00:000        INFO        collector/collector.go:82        apisix采集到数据数量21
  2022-06-21 20:51:00:000        INFO        runtime/asm_amd64.s:1581        apisix_test9091:指标数:21
  ```

5. 在 DataAnt 平台首页单击`安装集成插件`>`监控插件`，选择 APISIX，并单击`配置`下的`点击配置`。

6. 在 DataAnt 平台首页单击左侧导航栏的`仪表盘`并新建仪表盘。选择自己需要的指标，并拖拽到仪表盘上，配置完成的指标如下：

  ![dashboard](https://static.apiseven.com/2022/blog/0705/2.PNG)

  :::note

  DataAnt Agent 每隔 30 秒会上报一次数据，因此会存在一定的延迟。

  :::

## 总结

本文主要介绍了如何通过 DataAnt Agent 上传 APISIX 的指标数据到 DATAANT 监控系统中，你可以在后续使用中配置相关报警规则及报警联系人，当服务出现故障时可以及时地通知到你。
