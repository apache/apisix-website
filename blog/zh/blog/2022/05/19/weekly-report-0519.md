---
title: "社区双周报（5.01 - 5.15）"
keywords: 
- Apache APISIX
- API 网关
- key auth
- xRPC
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
---

> 从 5.01 - 5.15，有 35 位开发者为 Apache APISIX 提交了 77 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1652939409552-1bae4e92-f70a-4715-9ba0-fb0dff31ebf9.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1652939511212-d95ad226-f8ff-41b7-a4c5-03ac049b4d5c.png)

## Good first issue

### Issue #7052

**链接**：https://github.com/apache/apisix/issues/7052

**问题描述**：作为用户，希望能够使用带有 [PKCE](https://oauth.net/2/pkce/) 支持的 OAuth2，这样就可以在不使用客户端/密码的情况下配置 OAuth2 连接。 我用的是 IdP。它已经实现了 [Authorization Code Flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)。以下介绍来自 IdP 的文档：

IdP 可以实现 Authorization Code Flow，最好搭配 PKCE (Proof Key for Code Exchange)。PKCE 流程是推荐和最通用的授权流程，它支持移动应用程序、单页应用程序和传统的服务器渲染应用程序，并且不需要交换共享密钥。

具体流程如下：

- 用户打开一个 web 应用（在我的例子中是一个 `APISIXROUTE`，使用 `openid` 插件）
- 使用 **SHA256** 的代码难题是由 `openid` 插件创建的
- 重定向到 IdP 授权端点
- 用户登录
- 使用 `authcode` 作为 URL 查询参数重定向到 `redirect_url`
- `openid` 插件使用 `authcode` 从 IdP 令牌端点接收 JWT

能否用 PKCE 支持实现这个 OAuth 流？此外，请在文档中添加一节，介绍 PKCE 和重定向 url 的配置。

## Issue #6939

**链接**：https://github.com/apache/apisix/issues/6939

**问题描述**：如 [ip_port.lua](https://github.com/apache/apisix/blob/dbe7eeebba06229d4a8df75263f2a78301cc1ca0/apisix/stream/router/ip_port.lua#L82) 文件的第 82 行中所示：

```Lua
   -- TODO: check the subordinate relationship in the Admin API
```

作为用户，需要检查 Admin API 中的从属关系，包括：

- 验证是否存在具有上级 id 的流路由并且其协议与下级匹配
- 删除流路由时，请检查它是否被其他流路由引用

## 近期功能特性亮点

- [xRPC 框架支持 timeout 设置](https://github.com/apache/apisix/pull/6965)（贡献者：[spacewander](https://github.com/spacewander)）

- [移植 syslog 插件到 stream 子系统](https://github.com/apache/apisix/pull/6953)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [xRPC 框架实现 Redis 协议支持 pipeline](https://github.com/apache/apisix/pull/6959)（贡献者：[spacewander](https://github.com/spacewander)）

- [key-auth 插件隐藏 credentials 时只需更改 uri args 或 headers](https://github.com/apache/apisix/pull/6991)（贡献者：[jwrookie](https://github.com/jwrookie)）

- [支持 servlet 的 URI 规范](https://github.com/apache/apisix/pull/6984)（贡献者：[spacewander](https://github.com/spacewander)）

- [在 APISIX 初始化时，batch-requests 插件支持处理 CIDR 格式 的 real_ip_from](https://github.com/apache/apisix/pull/6981)（贡献者：[kwanhur](https://github.com/kwanhur)）

- [xRPC 框架支持日志过滤](https://github.com/apache/apisix/pull/6960)（贡献者：[tzssangglass](https://github.com/tzssangglass))

- [新增 pubsub 框架](https://github.com/apache/apisix/pull/7028)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [xRPC 框架实现 Redis 协议支持 pipeline （增加测试）](https://github.com/apache/apisix/pull/7031)（贡献者：[spacewander](https://github.com/spacewander)）

- [real-ip 插件支持递归搜索](https://github.com/apache/apisix/pull/6988)（贡献者：[crazyMonkey1995](https://github.com/crazyMonkey1995)）

- [ext-plugin 支持处理 response body](https://github.com/apache/apisix/pull/6968)（贡献者：[soulbird](https://github.com/soulbird)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。
