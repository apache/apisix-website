---
title: "社区双周报（10.15-10.31）"
keywords: 
- Apache APISIX
- 社区周报
- APISIX
- API Gateway
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
---

> 从 10.15 到 10.31, 有 31 位开发者为 Apache APISIX 提交了 93 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1635733917405-d05ace3d-614a-4e82-bc6b-6a941a2d2281.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1635733917418-d6571655-be42-4819-a9bd-1440d69f4877.31)

## Good first issue

### Issue #686

**链接**: https://github.com/apache/apisix-website/issues/686

**问题描述**：为了加快 Apache APISIX 官网图片的加载速度，需要将所有图片迁移到 CDN。

### Issue #5305

**链接**: https://github.com/apache/apisix/issues/5305

**问题描述**：测试 APISIX 中的 proxy-mirror 插件时，发现这个插件的特性与 nginx 中的 ngx_http_mirror_module 不同。 nginx 的镜像模块可以在 “proxy_pass” 指令中添加主机后面的 uri，例如：

```Groovy
location / {
mirror /mirror;
proxy_pass http://backend;
}

location = /mirror {
internal;
proxy_pass http://test_backend$request_uri;
}
```

但是当我在 APISIX Dashboard 中测试 proxy-mirror 插件时，提示不能用 URI 填充空格。是否可以优化 proxy-mirror 插件以支持 URI？

![Issue Screenshot](https://static.apiseven.com/202108/1635734126653-8fe4c1e7-5b9a-4e78-b747-fb30cbae7f36.png)

### Issue #5342

**链接**: https://github.com/apache/apisix/issues/5342

**问题描述**: 路由之间的限制计数器：需要在 lrucache 中指定路由对应的 limit-count 的 key，这样同一个limit对象就可以在多个路由中共享。lrucache 的key（以下称为 group，以区别于limit key）目前是自动生成的，确保每个路由的 group 是独立的。对于这一变化，我们需要能够在 limit-count 中指定组：

```yaml
"limit-count": {
        "group": "group_id_blah"
        "count": 2,
        "time_window": 60,
        "rejected_code": 503,
        "key": "remote_addr"
}
```

注意，同一 group 的配置需要相同，目前需要调用者保证，否则 group 获得的限制对象将与配置不同。

### Issue #5343

**链接**: https://github.com/apache/apisix/issues/5343

**问题描述**: 在模式中添加一个 request_body 开关，每个主体可以被 expr 用来决定是否记录。如果没有这个开关，主体就不会被记录。

```json
"kafka-logger": {
   "broker_list":{
       "127.0.0.1":9092
    },
   "kafka_topic" : "test2",
   "request_body": {
       "expr": [
          ["request_length", "<", "1024"],
       ]
   },
   "key" : "key1",
   "batch_max_size": 1,
   "name": "kafka logger"
}
```

`expr` 可以通过 lua-resty-expr 进行评估。请求主体可以通过 core.request.get_body 获取。

## 近期功能特性亮点

- [APISIX Ingress 中引入 ApisixRoute v2beta2 版本的自定义资源, 废弃 backend 字段](https://github.com/apache/apisix-ingress-controller/pull/698)（贡献者：[tao12345666333](https://github.com/tao12345666333)）

- [APISIX Ingress 升级 CRD 资源版本为 v1，以便更好的支持 K8s v1.22 及以上版本](https://github.com/apache/apisix-ingress-controller/pull/697)（贡献者：[tao12345666333](https://github.com/tao12345666333)）

- [APISIX Ingress 添加如何使用 gRPC 代理的文档](https://github.com/apache/apisix-ingress-controller/pull/699)（贡献者：[gxthrj](https://github.com/gxthrj)）

- [APISIX Dashboard 支持 proto 管理 API](https://github.com/apache/apisix-dashboard/pull/2099)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [APISIX Dashboard 支持以 gzip 传输 dashboard 静态资源](https://github.com/apache/apisix-dashboard/pull/2178)（贡献者：[nic-6443](https://github.com/nic-6443)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [Apache APISIX 扩展指南](https://apisix.apache.org/zh/blog/2021/10/29/Extension-guide/)：

  本文提供了 Apache APISIX 的拓展指南，旨在为用户提供拓展 Apache APISIX 的一些思路。

- [从 0 到 1，APISIX Ingress 加入社区后的发展与收获](https://apisix.apache.org/zh/blog/2021/10/26/APISIX-Ingress/)：

  本文描述了 APISIX Ingress 的成长历程，以及 APISIX Ingress 加入社区后的功能提升与社区帮助等多方面细节收获。

- [教程篇：如何在 Apache APISIX Ingress Controller 中使用 Cert Manager 管理证书](https://apisix.apache.org/zh/blog/2021/10/22/cert-manager-in-ingress/)：

  本文将通过详细的代码步骤为大家介绍如何通过 Cert Manager 在 Apache APISIX Ingress Controller 里进行证书管理。
