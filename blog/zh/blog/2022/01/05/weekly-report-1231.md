---
title: "社区双周报（12.16-12.31）"
keywords: 
- Apache APISIX
- 社区周报
- APISIX
- API 网关
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
---

> 从 12.16 到 12.31, 有 33 位开发者为 Apache APISIX 提交了 90 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1641356905322-c0fdef6a-370f-4369-b4b8-3e296cdfeb7f.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1641363865367-2500996c-30e9-465e-9a52-2c2981b9b8b2.png)

## Good first issue

### Issue #5861

**链接**: https://github.com/apache/apisix/issues/5861

**问题描述**：有些情况下，完整的 CI "linux_openresty" 需要 50 分钟才能完成。

```YAML
 - linux_openresty
```

我们可以把它分成多个部分，这样可以减少最大的单项工作时间。

可以在下方中通过一个环境变量作为测试文件的范围：

```Shell
 FLUSH_ETCD=1 PERL5LIB=.:$PERL5LIB prove -Itest-nginx/lib -r t
```

### Issue #5900

**链接**: https://github.com/apache/apisix/issues/5900

**问题描述**：使用 `base-auth` 插件时，不想将 `Authentication` 头传递给上游。

上游不需要感知这些身份验证标头。

如下所示，使用 proxy-rewrite 插件重写 Authentication 头部：

```Bash
 "plugins": {
        "basic-auth": {},
        "proxy-rewrite": {
            "headers": {
                "Authorization": ""
            }
        }
    },
```

我们可以在 `basic-auth` 插件中添加一个配置来隐藏身份验证头。这样的话，使用这些插件会更方便。同理，`key-auth` 插件也是。

## 近期功能特性亮点

- [完成了 ApisixPluginConfig 自定义资源的控制器循环和相关逻辑。已于 APISIX Ingress controller v1.4 中发布](https://github.com/apache/apisix-ingress-controller/pull/815)（贡献者：[neverCase](https://github.com/neverCase)）

- [limit-count 插件支持共享计数器](https://github.com/apache/apisix/pull/5881)（贡献者：[spacewander](https://github.com/spacewander)）

- [ext-plugin 插件支持降级策略](https://github.com/apache/apisix/pull/5897)（贡献者：[arabot777](https://github.com/arabot777)）

- [control api 支持 RESTful 风格路径参数匹配](https://github.com/apache/apisix/pull/5934)（贡献者：[The-White-Lion](https://github.com/The-White-Lion)）

- [支持发送 APISIX 数据以协助 OPA 插件的决策](https://github.com/apache/apisix/pull/5874)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [允许设置 proxy_request_buffering 而不禁用 proxy-mirror](https://github.com/apache/apisix/pull/5943)（贡献者：[spacewander](https://github.com/spacewander)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [捷报频传！Apache APISIX 现已支持对接 Google Cloud Logging](https://apisix.apache.org/zh/blog/2021/12/22/google-logging)：

  本文将为大家介绍如何在 Apache APISIX 中配置和使用 Google Cloud Logging 服务。

- [再接再厉！Apache APISIX 集成 Open Policy Agent](https://apisix.apache.org/zh/blog/2021/12/24/open-policy-agent)：

  本文以 HTTP API 为例为大家介绍 `OPA` 插件，并详细说明如何将 Apache APISIX 与 OPA 进行集成，实现后端服务的认证授权解耦。

- [生态丰富持续进行中，Apache OpenWhisk 集成闪亮登场](https://apisix.apache.org/zh/blog/2021/12/24/apisix-integrate-openwhisk-plugin)：

  本文为大家介绍了关于 `openwhisk` 插件的功能前瞻与使用步骤，结合 Apache APISIX 提供的多种身份认证插件来实现认证与授权等功能。

- [使用 Apache APISIX 代理 gRPC 服务](https://apisix.apache.org/zh/blog/2021/12/30/apisix-proxy-grpc-service)：

  本文为大家介绍如何在 Apache APISIX 中通过 `grpc-transcode` 插件来将客户端的 HTTP 流量代理到后端 gRPC 服务上。
