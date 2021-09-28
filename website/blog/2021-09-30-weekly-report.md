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

### Issue [#5080]https://github.com/apache/apisix/issues/5080

问题描述：问题描述：之前上游服务使用 IP 认证，实际的客户端 IP 是从 x-forwarded-for 请求头中获取的。现在需要改成网关HMAC认证，所以需要通过网关屏蔽上游 IP 认证。尝试通过代理重写插件修改 x-forwarded-for，但是没有生效：

![问题描述截图](https://static.apiseven.com/202108/1632799650125-14edb988-f2ad-434d-8d13-04ff3016eb5a.png)

### Issue [#5108](https://github.com/apache/apisix/issues/5108)

问题描述：如下，当在路由上启用请求验证插件:

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

- [debug-mode 支持动态请求过滤](https://github.com/apache/apisix/pull/5012)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [支持注入逻辑到 APISIX 方法中](https://github.com/apache/apisix/pull/5068)（贡献者：[spacewander](https://github.com/spacewander)）

- [stream_route 支持在 IP 匹配中使用 CIDR](https://github.com/apache/apisix/pull/4980)（贡献者：[Zheaoli](https://github.com/Zheaoli)）

- [hmac-auth 支持校验请求体](https://github.com/apache/apisix/pull/5038)（贡献者：[arthur-zhang](https://github.com/arthur-zhang)）

- [APISIX Ingress controller 集成了 cert-manager ，用户可以更方便的管理TLS证书，并与 APISIX Ingress 配合使用](https://github.com/apache/apisix-ingress-controller/pull/685)（贡献者：[lingsamuel](https://github.com/lingsamuel)  ）

## 本周博文推荐

- [最新！Apache APISIX 通过中国信通院 “可信开源项目” 认证](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247488321&idx=1&sn=40925d9cacba9e30fcdcceebbdbbe266&chksm=e981785cdef6f14a29a0ec6e87b70b1cffadcbf3951a66709ef8f2a144054a748430e29d25ea&token=434953675&lang=zh_CN#rd)：2021 年 9 月 17 日，在中国信息通信研究院（简称“中国信通院”）主持召开的“云计算开源产业联盟（OSCAR）开源产业大会”上，Apache APISIX 荣获中国信通院颁发的可信开源项目评估证书。同时大会正式宣布了可信开源社区共同体（TWOS） 的成立，Apache APISIX 社区成为首批正式成员。

- [支持 10 亿日流量的基础设施：当 Apache APISIX 遇上腾讯](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247488353&idx=1&sn=4dc9f8d16b323f8b672cca9b565e0001&chksm=e981787cdef6f16a64b8af8d9b76d351a7838254f34a3d75514d9df9392c8e272087297b278e&token=434953675&lang=zh_CN#rd)：本文整理自腾讯游戏负责内部容器平台的工程师徐鑫在 Apache APISIX Meetup - 深圳站上的演讲，通过阅读本文，您不仅可以了解网关是什么、网关模式对传统服务架构的改进，还可以了解腾讯 OTeam 诞生的原因，以及 Apache APISIX 是如何在腾讯内部落地的。

- [使用 Apache APISIX 进行集中式身份认证及进阶玩法](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247488648&idx=1&sn=e197e8b03dad3c3c4d0e6712c4400a24&chksm=e9817f95def6f683f01152bd92275276fb980a0974598a66e0a53f7f0d26a22d1d3332299131&token=434953675&lang=zh_CN#rd)：本文介绍了 Apache APISIX 的身份认证功能，从重要性和玩法使用上进行了详细介绍和细节使用。


- [基于 Apache APISIX，爱奇艺 API 网关的更新与落地实践](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247488681&idx=1&sn=bec77fe4042eebf03d1d0118b800e24a&chksm=e9817fb4def6f6a28e29807fd818513230286ac7c40df1a687e16c08e2dd9f61588536d42860&token=434953675&lang=zh_CN#rd)：本文介绍了基于 Apache APISIX 网关，爱奇艺技术团队是如何进行公司架构的更新与融合，打造出全新的网关服务。
