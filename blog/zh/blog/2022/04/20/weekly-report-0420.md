---
title: "社区双周报（4.1-4.14）"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
---

> 从 4.1 到 4.14， 有 36 位开发者为 Apache APISIX 提交了 75 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1650441551212-28a65a2f-0d84-4f7d-a06e-fda4d072fff6.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1650441612598-a27f8798-8f70-44e7-8c11-207173f776d4.png)

## Good first issue

### Issue #6803

**链接**: https://github.com/apache/apisix/issues/6803

**问题描述**：当用户在 Apache APISIX 中使用 `openid-connect` 插件时，使用了错误的 `redirect_uri`，如下：

```Bash
  "plugins":{
        "openid-connect":{
              ...
            "scope":"openid profile",
            "bearer_only":false,
            "introspection_endpoint_auth_method":"client_secret_post",
            "redirect_uri":"http://127.0.0.1:9080/"
             ...
        }
    },
```

然后请求 "127.0.0.1:9080/"，将跳转到 500 页面，错误日志如下：

![500页面](https://static.apiseven.com/202108/1650442371592-ad0c26f6-e3ab-49d8-a5cb-f2b033d87a91.png)

```YAML
2022/04/07 17:13:50 [error] 31780#3492140: *1959 [lua] openidc.lua:1378: authenticate(): request to the redirect_uri path but there's no session state found, client: 127.0.0.1, server: _, request: "GET / HTTP/1.1", host: "127.0.0.1:9080"
2022/04/07 17:13:50 [error] 31780#3492140: *1959 [lua] openid-connect.lua:304: phase_func(): OIDC authentication failed: request to the redirect_uri path but there's no session state found, client: 127.0.0.1, server: _, request: "GET / HTTP/1.1", host: "127.0.0.1:9080"
```

这样的日志非常不清楚，并且用户不知道会发生什么。所以应该改进错误日志，以提高使用 `openid-connect` 插件的体验。

### Issue #6797

**链接**:https://github.com/apache/apisix/issues/6797

**问题描述**：当使用 `file-logger` 插件时，可以通过定义 `/dev/stdout` 将日志发送到 stdout。这是为了使用 Docker 输出并将其在 Kubernetes 中传递到 ELK 堆栈。但是使用过程中出现了一个报错，表明当前用户的权限被拒绝。

## 近期功能特性亮点

- [`key-auth` 支持隐藏认证相关的请求 header](https://github.com/apache/apisix/pull/6670)（贡献者：[bin-ya](https://github.com/bin-ya)）

- [支持 ZooKeeper 作为服务发现](https://github.com/apache/apisix/pull/6751)（贡献者：[shuaijinchao](https://github.com/shuaijinchao)）

- [`request-id` 支持 nanoid 作为 ID 生成算法](https://github.com/apache/apisix/pull/6779)（贡献者：[aikin-vip](https://github.com/aikin-vip)）

- [`response-rewrite` 支持用过滤器来修改响应体](https://github.com/apache/apisix/pull/6750)（贡献者：[kwanhur](https://github.com/kwanhur)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [官宣！API 网关 Apache APISIX Summit ASIA 2022 重磅来袭](https://apisix.apache.org/zh/blog/2022/04/12/apisix-summit-asia-2022)：

为了帮助更多的企业、开发者及开源爱好者了解并使用 Apache APISIX，同时帮助社区小伙伴更好地掌握 Apache APISIX 项目的最新进展和动态，Apache APISIX 社区将于 2022 年 5 月 20-21 日通过「线上直播」的方式举办 Apache APISIX Summit ASIA 2022。
