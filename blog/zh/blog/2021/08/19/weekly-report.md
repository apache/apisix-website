---
title: Apache APISIX 社区周报（8.9-8.15）
keywords:
- 社区周报
- 贡献者
- APISIX
- Apache
- Good first issue
- contributor
- API Gateway
description: 本周 Apache APISIX 新增了流量控制类插件增加降级处理、log-rotate 插件支持压缩已切割的日志文件、real-ip 插件及 consumer-restriction 支持根据 Route 对象做限制。
tags: [Community]
---

> 本周，有 26 位开发者为 Apache APISIX 提交了 96 个 commit 。感谢本周以下小伙伴为 Apache APISIX 添砖加瓦（排名不分先后），是你们的无私付出，让 Apache APISIX 变得更好！

<!--truncate-->

## 导语

[Apache APISIX](https://github.com/apache/apisix) 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue ！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

本周，有 26 位开发者为 Apache APISIX 提交了 96 个 commit 。感谢本周以下小伙伴为 Apache APISIX 添砖加瓦（排名不分先后），是你们的无私付出，让 Apache APISIX 变得更好！

> juzhiyuan, Baoyuantop, spacewander, okaybase, liuxiran, Serendipity96, nic-chen, tao12345666333, shuaijinchao, Yiyiyimu, jbampton, tzssangglass, foolwc, dickens7, Xunzhuo, jagerzhang, tong3jie, sunhao-java, gxthrj, chzhuo, qsliu2017, bisakhmondal, LiteSun, wmdmomo, Ylikj, bzp2010

## Good first issue

### Issue #4800

链接：https://github.com/apache/apisix/issues/4800  
**问题描述**：Admin API 中关于创建 Route 入参 (vars) 的描述有错误.
![issue](/img/event_img/issue_photo.png)
**解决方案**：在 json 中，方括号表示数组，而花括号表示对象。这里明显是想表述是数组嵌套数组的方式，但是用两个花括号在 json 里面是错误的书写方式。所以这里应该是方括号。

```json
[
  ["arg_name", "==", "json"],
  ["arg_age", ">", 18]
]
```

#### Issue #4441

链接：https://github.com/apache/apisix/issues/4441

**问题描述**：现在 APISIX stream_routes 的参数 "remote_addr"只支持单个 ip，需要支持多个 ip 或者像 "192.168.0.0/16 "这样的匹配规则，就像 http 路由参数 "remote_addr"一样。

**解决方案**：为 APISIX stream_routes 的 "remote_addr"参数支持多个 ip 地址或匹配规则，如 "192.168.0.0/16"

相关系统参数：

- apisix version (cmd: `apisix version`): 2.6
- OS (cmd: `uname -a`): CentOS7

#### Issue #3931

链接：https://github.com/apache/apisix/issues/3931

**问题描述**： 重定向插件中的 http_to_https 缺乏 curl 测试

**解决方案**：为重定向插件中的 http_to_https 添加 curl 测试

更新文档 http://apisix.apache.org/docs/apisix/plugins/redirect

## 本周功能特性亮点

- **request-id 插件支持雪花算法生成 ID**  
  **相关 PR**：https://github.com/apache/apisix/pull/4559  
  **贡献者**：[dickens7](https://github.com/dickens7)

- **流量控制类插件增加降级处理**  
  **相关 PR**：https://github.com/apache/apisix/pull/4774  
  **贡献者**：[okaybase](https://github.com/okaybase)

- **log-rotate 插件支持压缩已切割的日志文件**  
  **相关 PR**：https://github.com/apache/apisix/pull/4795  
  **贡献者**：[okaybase](https://github.com/okaybase)

- **real-ip 插件实现第一个版本**  
  **相关 PR**：https://github.com/apache/apisix/pull/4813  
  **贡献者**：[spacewander](https://github.com/spacewander)

- **consumer-restriction 支持根据 Route 对象做限制**  
  **相关 PR**：https://github.com/apache/apisix/pull/4759  
  **贡献者**：[jagerzhang](https://github.com/jagerzhang)

Apache APISIX 的[项目官网](https://apisix.apache.org/)和 Github 上的 [issue](https://github.com/apache/apisix/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 本周博文推荐

- [8 月 21 日 Apache APISIX Meetup 上海站，欢迎报名参加！](https://mp.weixin.qq.com/s/YIoc7XlgZIq0V-CyTDD2VA)  
  本次 Meetup 由 API7.AI 发起，并邀请爱奇艺、空中云汇等合作伙伴共同为大家呈现。Apache APISIX PMC 成员、贡献者、社区技术专家汇聚一堂，共同探讨 Apache APISIX 社区发展、行业实践等话题。

- [从新手村出来，我在 Apache APISIX 社区发出了第一个 PR](https://mp.weixin.qq.com/s/pyfBAHONGjkKJhwsjyhdUA)  
  屠正松同学的采访文章，下回我们会采访哪位社区的小伙伴呢？快来 Apache APISIX 社区瞧一瞧吧！没准，下一位 committer 就是你！

- [舍弃 Kong 和 Nginx，Apache APISIX 在趣链科技 BaaS 平台的落地实践](https://mp.weixin.qq.com/s/oARDFf_48X99MXBwoXcSHw)  
  介绍了 Apache APISIX 在趣链科技 BaaS 平台中的落地实践情况，以及趣链科技在众多网关应用中选择 Apache APISIX 的原因。

- [贡献者，是衡量开源项目的金指标](https://mp.weixin.qq.com/s/G1lQUdZ05_HlZLNcY9tflw)  
  秉承 The Apache Way，我们相信，只有活跃的社区才能保证开源项目的未来。同时，我们也希望可以通过更加直观的图表来展示社区活跃度。
