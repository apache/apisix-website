---
title: "社区周报（10.1-10.14）"
keywords:
- Apache APISIX
- 社区周报
- APISIX
- API 网关
- 贡献者
description: 本周云原生 API 网关 Apache APISIX 社区新增了 ldap-auth 插件，并支持测试配置文件以及支持配置 Service 中 host 字段提供路由默认值等功能。
tags: [Community]
---
> 从 10.1 到 10.14, 有 27 位开发者为 Apache APISIX 提交了 67 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！
<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1634183939241-a87516e5-cb52-4532-87e2-306c09155a70.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1634183019951-bcf250cd-e5b5-443e-afc4-3cfdef0d6eab.jpg)

## Good first issue

### Issue #5165

**链接**：https://github.com/apache/apisix/issues/5165

**问题描述**：

- 当浏览器跨域发布然后显示 CORS error 时，`wolf-rbac` 插件的登录 `url/apisix/plugin/wolf-rbac/login` 会返回 `json` 格式，但是 `header` 给出的内容类型是 `text/plain`，请修改插件登录后的内容类型为 `application/json`。

- `wolf-rabc` 的登录 `uri/apisix/plugin/wolf-rbac/login` 会失去添加头的 CORS 插件。

### Issue #5192

**链接**：https://github.com/apache/apisix/issues/5192

**问题描述**：安装 APISIX 依赖的时候，不同的 Linux 发行版会有不同的执行。是否可以将这些不同的执行合并到 “install-dependencise.sh” 中，这样用户在安装依赖时会更加方便。

## 本周功能特性亮点

- [Dashboard 支持配置 Service 中 host 字段提供路由默认值](https://github.com/apache/apisix-dashboard/pull/2149)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [APISIX 支持测试配置文件](https://github.com/apache/apisix/pull/5171)（贡献者：[nic-chen](https://github.com/nic-chen)）

- [APISIX 新增 ldap-auth 插件](https://github.com/apache/apisix/pull/3894)（贡献者：[jp-gouin](https://github.com/jp-gouin)）

## 本周博文推荐

- [Apache APISIX 社区新里程碑——全球贡献者突破 300 位！](https://apisix.apache.org/zh/blog/2021/10/13/celebrating-300-contributors-of-apisix)：

  Apache APISIX 社区达成新的里程碑，与 Apache APISIX 相关的项目全球贡献者突破 300 位！ 距离 Apache APISIX 主库达到 200 位贡献者里程碑，仅仅间隔 3 个月！感谢社区贡献者们在代码、文档、运营等方方面面做出的卓越贡献。

- [Apache APISIX 社区成员助力 openEuler 发布第一个社区创新版](https://apisix.apache.org/zh/blog/2021/10/01/openEuler)

  来自 Apache APISIX 社区的罗泽轩和温铭在 openEuler 9 月 30 日发布的第一个社区创新版（ openEuler 21.09 ）中，为 OpenResty 迁移工作中做了非常多的贡献，让 OpenResty 可以在欧拉开源操作系统上平稳高效的运行。OpenResty 的稳定运行也意味着 Apache APISIX 可以顺畅地运行在 openEuler 系统上，Apache APISIX 底层基于 OpenResty 做了一定开发。

- [Apache APISIX 2.10.0 正式发布，带来第一个 LTS 版本！](https://apisix.apache.org/zh/blog/2021/09/29/release-apache-apisix-2.10)

  Apache APISIX 2.10 版本正式发布！🎉 这是 Apache APISIX 首个 LTS 版本，同时支持 10+ 个新功能和新插件。快速阅读了解 2.10 版本的新特性吧！
