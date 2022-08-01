---
title: 社区双周报（8.16-8.22）
keywords:
- 社区周报
- 贡献者
- APISIX
- Apache
- Good first issue
- contributor
- API Gateway
description: 本周 Apache APISIX 新增了 gzip 插件支持特殊的 * 来匹配任何类型，ext-plugin 插件支持 ExtraInfo，uri-blocker 插件支持自定义失败响应等功能。
tags: [Community]
---

> “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。我们还整理了一些适合新来社区的小伙伴们参加的 issue ！感兴趣的同学们，走过路过不要错过！

<!--truncate-->

## 导语

[Apache APISIX](https://github.com/apache/apisix) 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue ！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![weekly_contributor_static_20210823](https://static.apiseven.com/202108/1629726394722-84d86d5a-1b62-4bbd-b681-c42b371c53ec.png)

## Good first issue

### Issue #4441

链接：https://github.com/apache/apisix/issues/4441

**问题描述**：现在 APISIX stream_routes 的参数 "remote_addr"只支持单个 ip，需要支持多个 ip 或者像 "192.168.0.0/16 "这样的匹配规则，就像 http 路由参数 "remote_addr"一样。

**解决方案**：为 APISIX stream_routes 的 "remote_addr"参数支持多个 ip 地址或匹配规则，如 "192.168.0.0/16"

相关系统参数：

- apisix version (cmd: `apisix version`): 2.6
- OS (cmd: `uname -a`): CentOS7

### Issue #3931

链接：https://github.com/apache/apisix/issues/3931

**问题描述**： 重定向插件中的 http_to_https 缺乏 curl 测试

**解决方案**：为重定向插件中的 http_to_https 添加 curl 测试

更新文档 http://apisix.apache.org/docs/apisix/plugins/redirect

## 本周功能特性亮点

- **gzip 插件支持特殊的 * 来匹配任何类型**  
  **相关 PR**：https://github.com/apache/apisix/pull/4817  
  **贡献者**：[RocFang](https://github.com/RocFang)  

- **ext-plugin 插件支持 ExtraInfo**  
  **相关 PR**：https://github.com/apache/apisix/pull/4835  
  **贡献者**：[spacewander](https://github.com/spacewander)  

- **real-ip 插件为 `X-Forwarded-For` 添加特殊处理**  
  **相关 PR**：https://github.com/apache/apisix/pull/4852  
  **贡献者**：[spacewander](https://github.com/spacewander)  

- **uri-blocker 插件支持自定义失败响应**
  **相关 PR**：https://github.com/apache/apisix/pull/4849  
  **贡献者**：[okaybase](https://github.com/okaybase)  

Apache APISIX 的[项目官网](https://apisix.apache.org/)和 Github 上的 [issue](https://github.com/apache/apisix/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 本周博文推荐

- [Go 让 Apache APISIX 如虎添翼](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486454&idx=1&sn=905ab375e0f33a173ba90a0f541995b7&chksm=e98160ebdef6e9fd58079446c1543c7d6f8fabac966acb4e4165d80bf42f6c64a8183583ff1a&token=1586118041&lang=zh_CN#rd)  
这篇文章将详细讲解如何用 Go 来开发 Apache APISIX 插件。通过拥抱 Go 的生态圈，为 Apache APISIX 开创一片新天地，希望 Go 能让 Apache APISIX 如虎添翼！

- [Apache APISIX 在 Airwallex 的应用 | 专访 Airwallex 技术平台负责人李杨](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486406&idx=1&sn=5d04353f3d8128f17fca138572667ddb&chksm=e98160dbdef6e9cd19ddeed4267554a15bcd1a10decfa2c16f2989575bd9a1c9c95349b0c0cc&token=1586118041&lang=zh_CN#rd)  
Airwallex 空中云汇技术平台负责人李杨的专访，一起来听听空中云汇与 Apache APISIX 之间的故事。

- [Apache APISIX 社区周报 ｜ 2021 8.9-8.15](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486382&idx=1&sn=f041eb8c38dd528450e5bf4280b60b0f&chksm=e98160b3def6e9a5331f9485d8a478f9546475f949a31f8142c4188d9c104d39eec9a281bbf2&token=1586118041&lang=zh_CN#rd)  
“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
