---
title: "社区周报｜新晋 committer 一位，功能亮点更新进行中"
keywords:
- APISIX
- 社区周报
- 贡献者
- Good first issue
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Events]
---
> 从 9.13 到 9.30, 有 29 位开发者为 Apache APISIX 提交了 82 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！
<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue ！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1632799382897-a326dde7-e010-46d5-9ec5-7b141d26e3b7.jpg)

![本周新晋贡献者](https://static.apiseven.com/202108/1632799382902-ba7a142f-cf8b-4977-a95a-2935e8c6d75c.jpg)

## Good first issue

### Issue #5080

**链接**：[Issue #5080]https://github.com/apache/apisix/issues/5080

**问题描述**：问题描述：之前上游服务使用 IP 认证，实际的客户端 IP 是从 x-forwarded-for 请求头中获取的。现在需要改成网关HMAC认证，所以需要通过网关屏蔽上游 IP 认证。尝试通过代理重写插件修改 x-forwarded-for，但是没有生效：

![问题描述截图](https://static.apiseven.com/202108/1632799650125-14edb988-f2ad-434d-8d13-04ff3016eb5a.png)

### Issue #5108

**链接**：[Issue #5108](https://github.com/apache/apisix/issues/5108)

**问题描述**：如下，当在路由上启用请求验证插件:

```
curl http://127.0.0.1:9080/apisix/admin/routes/35 -H 'X-API-KEY: xxxxxxxxxxxxxxxxxxx' -X PUT -d '
{
"uri": "/products/create",
"plugins": {
"request-validation": {
"body_schema": {
"type": "object",
"required": ["productName", "price"],
"properties": {
"productName": {"type": "string"},
"price": {"type": "number"}
}
}
}
},
"upstream": {
"service_name": "PRODUCTSSERVICE",
"type": "roundrobin",
"discovery_type": "eureka"
}
}'
```

使用以下命令对其进行测试时，


```
curl http://127.0.0.1:9080/products/create -X POST -d '{"product-Name":"Laptop","pri-ce":12345.00}'
```

得到以下默认信息：

```
property "price" is required
```

## 本周功能特性亮点

- debug-mode 支持动态请求过滤
  - **相关 PR**：https://github.com/apache/apisix/pull/5012
  - **贡献者**：[tzssangglass](https://github.com/tzssangglass)

- 支持注入逻辑到 APISIX 方法中
  - **相关 PR**：https://github.com/apache/apisix/pull/5068
  - **贡献者**：[spacewander](https://github.com/spacewander)

- stream_route 支持在 IP 匹配中使用 CIDR
  - **相关 PR**：https://github.com/apache/apisix/pull/4980
  - **贡献者**：[Zheaoli](https://github.com/Zheaoli)

- hmac-auth 支持校验请求体
  - **相关 PR**：https://github.com/apache/apisix/pull/5038
  - **贡献者**：[arthur-zhang](https://github.com/arthur-zhang)

- - APISIX Ingress controller 集成了 cert-manager ，用户可以更方便的管理TLS证书，并与 APISIX Ingress 配合使用
  - **相关 PR**：https://github.com/apache/apisix-ingress-controller/pull/685
  - **贡献者**：[lingsamuel](https://github.com/lingsamuel)  

## 本周博文推荐

- [Apache APISIX 在腾讯云智能钛平台中的落地实践](http://apisix.apache.org/blog/2021/09/16/tencent-cloud)：本文主要介绍了腾讯云智能钛平台使用 Apache APISIX 的企业案例，以及使用 Apache APISIX 作为产品流量网关的具体例子。

- [Apache APISIX 助力便利充电创领者小电，实现云原生方案](http://apisix.apache.org/blog/2021/09/18/xiaodian-usercase)：本文介绍了国内便利充电创领者——小电通过应用 Apache APISIX，进行公司产品架构的云原生项目搭建的相关背景和实践介绍 作者孙冉，运维专家。目前就职于小电平台架构部，主要负责 K8s 集群和 API 网关的相关部署。

- [Apache APISIX Ingress 为何成为又拍云打造容器网关的新选择？](http://apisix.apache.org/blog/2021/09/24/youpaicloud-usercase)：本文介绍了又拍云选择 Apache APISIX Ingress 后所带来公司内部网关架构的更新与调整，同时分享了在使用过程中的一些实践场景介绍。 作者陈卓，又拍云开发工程师，负责云存储、云处理和网关应用开发。