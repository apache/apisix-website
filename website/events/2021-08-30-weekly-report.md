title: Apache APISIX 社区周报 ｜ 2021 8.23-8.29
 keywords:
- 社区周报
- 贡献者
- APISIX
- Apache APISIX
- Good first issue
- contributor
- API Gateway
description: 来看看 2021 年 8.23-8.29 Apache APISIX 社区都发生了些什么吧。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

<!--truncate-->
## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue ！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![2021-8-29-contributor-static](https://static.apiseven.com/202108/1630313705378-a045c732-de9b-4508-ba0c-6c223dfda313.png)

![2021-8-29-new-contributor](https://static.apiseven.com/202108/1630313757596-4d60cf78-0997-4854-9732-814ae7395f2a.png)

## Good first issue 

### Issue #4241

**链接**：https://github.com/apache/apisix/issues/4241

**问题描述**：现在在将 jwt-auth 插件添加到一个 service/route 时，jwt 令牌未包含“key”声明。

```JSON
{
  "iss":"http://127.0.0.1",
  "client_id":"application1",
  "sub": "1234567890",
  "iat": 1516239022
}
```

![插件配置](https://static.apiseven.com/202108/1630313809129-9d6b0598-0f99-4155-b0f9-f20d880236f1.png)

### Issue #4441

**链接**：https://github.com/apache/apisix/issues/4441

**问题描述**：现在 APISIX stream_routes 的参数 "remote_addr"只支持单个 ip，需要支持多个 ip 或者像 "192.168.0.0/16 "这样的匹配规则，就像 http 路由参数 "remote_addr"一样。

### Issue #3601

**链接**：https://github.com/apache/apisix/issues/3601

**问题描述**：目前 APISIX 只有请求-响应 gRPC 代理的单元测试，没有流式 gRPC 的相关测试。需要为其添加流式gRPC的测试用例。

### Issue #3931

**链接**：https://github.com/apache/apisix/issues/3931

**问题描述**：重定向插件中的 http_to_https 缺乏 curl 测试，需要为重定向插件中的 http_to_https 添加 curl 测试，并更新文档 http://apisix.apache.org/docs/apisix/plugins/redirect

## 本周功能特性亮点

- **uri-blocker 支持匹配请求 URI 时忽略大小写**
  **相关 PR**：https://github.com/apache/apisix/pull/4868
  **贡献者**：okaybase
- **kafka-logger 支持配置 kafka 生产者的 acks 参数**
  **相关 PR**：https://github.com/apache/apisix/pull/4878
  **贡献者**：okaybase
- **kafka-logger 支持配置 cluster name 参数**
  **相关 PR**：https://github.com/apache/apisix/pull/4876
  **贡献者**：tzssangglass
- **referer-restriction 支持配置 blacklist**
  **相关 PR**：https://github.com/apache/apisix/pull/4916
  **贡献者**：okaybase

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 本周博文推荐

- [在 Apche APISIX 中使用 Casbin 进行授权](http://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486508&idx=1&sn=111ad306d3e5c739ed918328b45c9320&chksm=e9816731def6ee2778111f2acce1e0f5c7c551024cd946dc964cfc24a0ee3229a7d6f1cc9e49&scene=21#wechat_redirect)
  当我们在使用 Apache APISIX 时，可能想要在应用里添加复杂的授权逻辑。在此篇文章中，我们将使用 Apache APISIX 的内置 Casbin 插件（authz-casbin）来实现基于角色的访问控制（RBAC）模型。
- [Apache APISIX 社区周报 ｜ 2021 8.16-8.22](http://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486518&idx=1&sn=308f5644da2acc8bc81d25bb74dc1be5&chksm=e981672bdef6ee3d86758ca20e5f6fdedb439c72f7b9e22ba9fb9eacc0cb1fb1360a15e7de92&scene=21#wechat_redirect)
  “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
- [Apache APISIX Meetup 上海站全程回顾](http://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486581&idx=1&sn=6ec43735869473fb7436b0ad9c8dee1c&chksm=e9816768def6ee7eddc0e829435c9fdc49dc0fda8b976c2608685a682ce1f3d19c1242867125&scene=21#wechat_redirect)
  Apache APISIX Meetup 上海站已于 8.21 顺利举办！一起来回顾下大会中令人难忘的精彩演讲吧！
- [为什么 APISIX 选择 Nginx + Lua 这个技术栈？](http://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486582&idx=1&sn=14a39b0f2603b763cf34b5af5ac224a5&chksm=e981676bdef6ee7dadb302fffb7a294914df33f9def00a5ea05ca0ce264e958a36cc25f6f2b4&scene=21#wechat_redirect)
  介绍 APISIX 选用 Nginx + Lua 这个技术栈的历史背景和优势，指出“高性能 + 灵活”是 APISIX 能够从众多网关中脱颖而出的重要原因。
- [Apache APISIX 2.9 正式发布，带来更多新功能！](http://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486767&idx=1&sn=a12a4eb55d2c2fcb0edd097f9e6a1d44&chksm=e9816632def6ef24311b86a8c6c8c180f58c674280258fab9a8f3acdd718da35ee801684ec88&scene=21#wechat_redirect)
  Apache APISIX 2.9 版本正式发布！该版本有 30+ 开发者参与，共提交了 100+ PR，新增了 2 个新功能，进一步完善了对插件的支持，快来了解 Apache APISIX 2.9 版本的新特性吧！