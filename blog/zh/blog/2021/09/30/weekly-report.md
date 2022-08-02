---
title: "社区双周报（9.13-9.30）"
keywords:
- Apache APISIX
- APISIX 社区周报
- API 网关
- 贡献者
description: 云原生 API 网关 Apache APISIX 最近两周新增了 stream_route 支持在 IP 匹配中使用 CIDR，debug 模式支持动态请求过滤，hmac-auth 支持校验请求体等新功能。
tags: [Community]
---
> 从 9.13 到 9.30, 有 32 位开发者为 Apache APISIX 提交了 93 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！
<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1632907894918-c455f40e-a175-4944-8fac-11c590d43786.jpg)

![本周新晋贡献者](https://static.apiseven.com/202108/1632908362102-b0b665e2-f37f-4a82-b8a3-68914925b565.jpg)

## Good first issue

### Issue #5080

**链接**：https://github.com/apache/apisix/issues/5080

**问题描述**：之前上游服务使用 IP 认证，实际的客户端 IP 是从 x-forwarded-for 请求头中获取的。现在需要改成网关 HMAC 认证，所以需要通过网关屏蔽上游 IP 认证。尝试通过代理重写插件修改 x-forwarded-for，但是没有生效：

![问题描述截图](https://static.apiseven.com/202108/1632799650125-14edb988-f2ad-434d-8d13-04ff3016eb5a.png)

### Issue #5108

**链接**：https://github.com/apache/apisix/issues/5108

**问题描述**：如下，当在路由上启用请求验证插件:" delete "

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/35 -H 'X-API-KEY: xxxxxxxxxxxxxxxxxxx' -X PUT -d '
{
    "uri":"/products/create",
    "plugins":{
        "request-validation":{
            "body_schema":{
                "type":"object",
                "required":[
                    "productName",
                    "price"
                ],
                "properties":{
                    "productName":{
                        "type":"string"
                    },
                    "price":{
                        "type":"number"
                    }
                }
            }
        }
    },
    "upstream":{
        "service_name":"PRODUCTSSERVICE",
        "type":"roundrobin",
        "discovery_type":"eureka"
    }
}'
```

使用以下命令对其进行测试时，

```shell
curl http://127.0.0.1:9080/products/create -X POST -d '{"product-Name":"Laptop","pri-ce":12345.00}'
```

得到以下默认信息：

```shell
property "price" is required
```

## 本周功能特性亮点

- [debug-mode 支持动态请求过滤](https://github.com/apache/apisix/pull/5012)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [支持注入逻辑到 APISIX 方法中](https://github.com/apache/apisix/pull/5068)（贡献者：[spacewander](https://github.com/spacewander)）

- [stream_route 支持在 IP 匹配中使用 CIDR](https://github.com/apache/apisix/pull/4980)（贡献者：[Zheaoli](https://github.com/Zheaoli)）

- [hmac-auth 支持校验请求体](https://github.com/apache/apisix/pull/5038)（贡献者：[arthur-zhang](https://github.com/arthur-zhang)）

- [APISIX Ingress controller 集成了 cert-manager ，用户可以更方便的管理 TLS 证书，并与 APISIX Ingress 配合使用](https://github.com/apache/apisix-ingress-controller/pull/685)（贡献者：[lingsamuel](https://github.com/lingsamuel)）

- [- APISIX Dashboard 支持多种配置文件](https://github.com/apache/apisix-dashboard/pull/1946)（贡献者：[bzp2010](https://github.com/bzp2010)）

## 本周博文推荐

- [Apache APISIX 在腾讯云智能钛平台中的落地实践](http://apisix.apache.org/blog/2021/09/16/tencent-cloud)：

  本文主要介绍了腾讯云智能钛平台使用 Apache APISIX 的企业案例，以及使用 Apache APISIX 作为产品流量网关的具体例子。

- [使用 Apache APISIX 进行集中式身份认证及进阶玩法](http://apisix.apache.org/blog/2021/09/07/how-to-use-apisix-auth)

  本文介绍了 Apache APISIX 的身份认证功能，从重要性和玩法使用上进行了详细介绍和细节使用。

- [基于 Apache APISIX，爱奇艺 API 网关的更新与落地实践](http://apisix.apache.org/blog/2021/09/07/iQIYI-usercase)

  通过阅读本文，您可以了解到基于 Apache APISIX 网关，爱奇艺技术团队是如何进行公司架构的更新与融合，打造出全新的网关服务。
