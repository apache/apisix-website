---
title: "社区周报｜社区持续活跃，功能亮点更新进行中"
keywords:
  - Apache APISIX
  - API 网关
  - contributor
  - Good first issue
description: Apache APISIX 社区最近两周新增了 proxy-mirror 支持按比例镜像请求、Admin API 支持返回 stream 类型的插件信息、dashboard 支持 Service Discovery 配置等功能。
tags: [Community]
---

> 从 8.30 开始这两周有 33 位开发者为 Apache APISIX 提交了 130 个 commits。感谢以下小伙伴为 Apache APISIX 添砖加瓦（排名不分先后），是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue ！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

从 8.30-9.12 这两周有 33 位开发者为 Apache APISIX 提交了 130 个 commits。感谢以下小伙伴为 Apache APISIX 添砖加瓦（排名不分先后），是你们的无私付出，让 Apache APISIX 项目变得更好！

![contributor](https://static.apiseven.com/202108/1631754498946-7d655f8e-3881-4594-b029-a67189a63ffa.jpg)

![committer](https://static.apiseven.com/202108/1631676136968-13216876-e9f6-4852-95b4-6f73db5cb405.30-9)

## Good first issue

### Issue [#4906](https://github.com/apache/apisix/issues/4906)

问题描述：在启用主动健康检查功能时，用两个内部域名并增加 pass_host：node 进行测试 Apache APISIX 的负载均衡时，发现仍会路由到故障主机。

```Shell
for i in $(seq 1 1000); do curl  -H "Host: httpbin.org" ${APISIX_GATEWAY_URL}  ; done
apple
apple
<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>nginx/1.17.7</center>
</body>
</html>
apple
apple
apple
<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>nginx/1.17.7</center>
</body>
</html>
apple
apple
apple
apple
apple
```

### Issue [#4945](https://github.com/apache/apisix/issues/4945)

问题描述：根据相关指导文章，尝试在 M1 系统的 Macbook 上下载 Apache APISIX 2.9 版本时遇到问题。提示如下：

```Apache
lualogging 1.5.2-1 depends on luasocket (3.0rc1-2 installed)
lualogging 1.5.2-1 is now installed in /Users/juzhiyuan/workspace/apisix-2.9/apache-apisix-2.9-src/deps (license: MIT/X11)

casbin 1.26.0-1 depends on lrexlib-pcre >= 2.9.1 (not installed)
Installing https://luarocks.org/lrexlib-pcre-2.9.1-1.src.rock

Error: Failed installing dependency: https://luarocks.org/casbin-1.26.0-1.rockspec - Failed installing dependency: https://luarocks.org/lrexlib-pcre-2.9.1-1.src.rock - Could not find header file for PCRE
  No file pcre.h in /usr/local/include
  No file pcre.h in /usr/include
  No file pcre.h in /include
You may have to install PCRE in your system and/or pass PCRE_DIR or PCRE_INCDIR to the luarocks command.
Example: luarocks install lrexlib-pcre PCRE_DIR=/usr/local
make: *** [deps] Error 1
```

## 近期功能特性亮点

- [referer-restriction 支持配置 blacklist 和 message](https://github.com/apache/apisix/pull/4916)(贡献者：okaybase)
- [node_listen 和 admin_listen 支持更丰富的配置形式](https://github.com/apache/apisix/pull/4856)(贡献者：wayne-cheng)，[补充参考](https://github.com/apache/apisix/pull/4967)
- [admin-api 支持返回 stream 类型的插件信息](https://github.com/apache/apisix/pull/4947)(贡献者：spacewander)
- [支持配置后退 SNI](https://github.com/apache/apisix/pull/5000)(贡献者：spacewander)
- [proxy-mirror 支持按比例镜像请求](https://github.com/apache/apisix/pull/4965)(贡献者：okaybase)
- [Control API 新增 dump 路由配置](https://github.com/apache/apisix/pull/5011)(贡献者：Zheaoli)
- [dashboard 支持 Service Discovery 配置](https://github.com/apache/apisix-dashboard/pull/2081)(贡献者：bzp2010)
- [dashboard Route 高级配置条件中支持内置参数配置](https://github.com/apache/apisix-dashboard/pull/1984)(贡献者：lookbrook)
- [dashboard Upstream 支持 Keepalive Pool 配置](https://github.com/apache/apisix-dashboard/pull/2117)(贡献者：bzp2010)

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [Apache APISIX 社区周报 ｜ 2021 8.23-8.29](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247486808&idx=1&sn=16ff09d4172dc61e0aa864f7a4fd40fd&chksm=e9816645def6ef53c5e41d84e70e16256a1953c177c52d960331c7ecd836cf8eeedf83bee5e4&token=733405538&lang=zh_CN%23rd)

  “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

- [Apache APISIX 为 KubeSphere 提供更好用的网关及 K8S Ingress Controller](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247487079&idx=1&sn=136417f538c1d2d96150cfd3de66b93b&chksm=e981657adef6ec6c31ea990ec3f8887b22530dc44e6cf011c990449aea492cc3d8379668e1d6&token=733405538&lang=zh_CN%23rd)

  本文介绍了如何在 KubeSphere 中直接部署 APISIX 和 APISIX Ingress Controller 。APISIX 可通过作为网关，或 APISIX Ingress Controller 的数据面来承载业务流量。

- [听说你对 Apache APISIX 有话说？现在机会来了](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247487094&idx=1&sn=c86ff723205b6073811a4d9016e81bca&chksm=e981656bdef6ec7dffb2d11639af944f0a4ebc9db051c0dd940d8e7f1b8b6ae42fb8690859c0&token=733405538&lang=zh_CN%23rd)

  诚邀您参与 Apache APISIX 用户调研，您的反馈会直接影响我们的未来发展。我们会随机抽取 多位 幸运星，将有机会获得 Apache APISIX 社区精美小礼物哦～

- [使用 Apache APISIX 和 Okta 来实现身份认证](https://mp.weixin.qq.com/s?__biz=MzI1MDU3NjQ5OA==&mid=2247487572&idx=1&sn=4aebd05282442a7e067496e1ff4be7bd&chksm=e9817b49def6f25fee8a1308666c56878697c5ec02bb8a63d1a6ce0ba749d29a4135cdf927f0&token=733405538&lang=zh_CN%23rd)

  文章介绍如何使用 Apache APISIX 配置 Okta 认证，从传统身份认证模式切换到集中身份认证模式，摆脱多账户、多密码、重复验证等众多开发者所面临的痛点。

## 关于 Apache APISIX

Apache APISIX 是一个动态、实时、高性能的开源 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 可以帮忙企业快速、安全的处理 API 和微服务流量，包括网关、Kubernetes Ingress 和服务网格等。

全球已有数百家企业使用 Apache APISIX 处理关键业务流量，涵盖金融、互联网、制造、零售、运营商等等，比如美国航空航天局（NASA）、欧盟的数字工厂、中国航信、中国移动、腾讯、华为、微博、网易、贝壳找房、360、泰康、奈雪的茶等。

200 余位贡献者，一同缔造了 Apache APISIX 这个世界上最活跃的开源网关项目。聪明的开发者们！快来加入这个活跃而多样化的社区，一起来给这个世界带来更多美好的东西吧！

- [Apache APISIX GitHub](https://github.com/apache/apisix)
- [Apache APISIX 官网](https://apisix.apache.org/)
- [Apache APISIX 文档](https://apisix.apache.org/zh/docs/apisix/getting-started)
