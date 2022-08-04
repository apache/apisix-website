---
title: "社区双周报（11.15-11.30）"
keywords: 
- Apache APISIX
- 社区周报
- APISIX
- API Gateway
- 贡献者
description: API 网关 Apache APISIX 近两周新增了azure-functions、google-cloud-logging 和 openwhisk 插件，以及 kafka-logger 插件支持记录请求体和响应体等众多功能。
tags: [Community]
---

> 从 11.15 到 11.30, 有 37 位开发者为 Apache APISIX 提交了 87 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1638348155941-0e071c9b-1c4a-40ac-af10-187cad658590.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1638348155955-f711af06-2eba-4362-88fe-f1dc187f227d.png)

## Good first issue

### Issue #5451

**链接**: https://github.com/apache/apisix/issues/5451

**问题描述**：Nginx自带的响应内容替换库可以替换局部内容：http://nginx.org/en/docs/http/ngx_http_sub_module.html

```Nginx
sub_filter '<a href="http://127.0.0.1:8080/'  '<a href="https://$host/';
```

有个支持正则替换的库（印象中Openresty已默认支持）：ngx_http_substitutions_filter_module，可以通过正则表达式来替换内容：

```Nginx
subs_filter_types text/html text/css text/xml;
subs_filter st(\d*).example.com $1.example.com ir;
subs_filter a.example.com s.example.com;
subs_filter http://$host https://$host;
```

但是 APISIX 的 response-rewrite 插件文档，好像只能支持完整替换，相当于直接将所有响应都换成插件设置的返回，并不支持部分内容替换：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/test/index.html",
    "plugins": {
        "response-rewrite": {
            "body": "{\"code\":\"ok\",\"message\":\"new json body\"}",
            "headers": {
                "X-Server-id": 3,
                "X-Server-status": "on",
                "X-Server-balancer_addr": "$balancer_ip:$balancer_port"
            },
            "vars":[
                [ "status","==","200" ]
            ]
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

这个插件是否支持部分替换或正则替换？如果不支持，APISIX 有没有其他解决方案呢？

### Issue #5647

**链接**: https://github.com/apache/apisix/issues/5647

**问题描述**：当前文档提供了在 CentOS7 上直接使用 RPM 安装 APISIX 的方法，但是当前 APISIX 已经将依赖切换为 apisix-base 版本，没有提供 RPM 安装方法，会导致安装失败。

是否可以添加用于安装 apisix-base 的 RPM 的命令。

![问题截图](https://static.apiseven.com/202108/1638346839201-3efb9807-13a7-4106-968a-5198b22d1a67.png)

## 近期功能特性亮点

- [kafka-logger 支持记录请求体](https://github.com/apache/apisix/pull/5501)（贡献者：[windyrjc](https://github.com/windyrjc)）

- [新增 azure-functions 插件，与 Azure Serverless Function 无缝集成](https://github.com/apache/apisix/pull/5479)（贡献者: [bisakhmondal](https://github.com/bisakhmondal)）

- [WASM 插件支持在 header_filter 阶段运行](https://github.com/apache/apisix/pull/5544)（贡献者：[spacewander](https://github.com/spacewander)）

- [新增 google-cloud-logging 插件，用于推送日志到 Google Cloud logging Service](https://github.com/apache/apisix/pull/5538)（贡献者：[shuaijinchao](https://github.com/shuaijinchao)）

- [新增 openwhisk 插件，与 Apache OpenWhisk serverless 平台集成](https://github.com/apache/apisix/pull/5518)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [kafka-logger 和 http 支持记录响应体](https://github.com/apache/apisix/pull/5550)（贡献者：[dmsolr](https://github.com/dmsolr)）

- [在 APISIX Ingress 中对于 HTTPS 和 gRPCs 类型的 upstream 丰富了 mTLS 的支持](https://github.com/apache/apisix-ingress-controller/pull/755)（贡献者: [nic-6443](https://github.com/nic-6443)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [在 KubeSphere 中使用 Apache APISIX Ingress 网关接入自定义监控](https://apisix.apache.org/zh/blog/2021/11/30/use-apisix-ingress-in-kubesphere)：

  本文将通过 Apache APISIX Ingress Controller 为范例，详细为大家介绍如何通过 KubeSphere 快速为 Kubernetes 集群使用不同类型的网关并进行状态监控。

- [如何在 Kubernetes 集群中使用 Nocalhost 开发 Apache APISIX Ingress Controller](https://apisix.apache.org/zh/blog/2021/11/22/develop-apisix-ingress-with-nocalhost-in-kubernetes)：

  本文将为您介绍如何使用 Nocalhost 将本地开发机无缝连接到一个远程 Kubernetes 集群，同时配合 IDE 来开发和调试 Apache APISIX Ingress Controller。利用现有技术栈更顺畅地开发和调试远程应用。

- [重磅功能！Apache APISIX 拥抱 WASM 生态](https://apisix.apache.org/zh/blog/2021/11/19/apisix-supports-wasm)：

  在即将发布的 Apache APISIX 版本（2.11.0）中将会新增对于 WASM 的支持！通过阅读本文你将了解到 Apache APISIX 如何从 0 到 1 部署这项功能的支持与开发。

- [如何与 Dapr 集成打造 Apache APISIX 网关控制器](https://apisix.apache.org/zh/blog/2021/11/17/dapr-with-apisix)：

  本文将为大家展示如何通过集成 Dapr 创建一个 Apache APISIX 控制器。包括项目概念以及具体操作步骤。
