---
title: "Apache APISIX 3.2.1 正式发布"
authors:
  - name: "曾元豪"
    title: "Author"
    url: "https://github.com/leslie-tsang"
    image_url: "https://avatars.githubusercontent.com/u/59061168?v=4"
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- Apache APISIX
- API 网关
- API 管理平台
- 版本发布
- 新功能
description: APISIX 3.2.1 版本正式发布，修复了诸多 bug，提升用户体验。
tags: [Community]
---

> APISIX 3.2.1 版本正式发布，修复了诸多 bug，提升用户体验。
<!--truncate-->

## bugfix

- 修复 `core.request.add_header` 中的无效缓存问题 [#8824](https://github.com/apache/apisix/pull/8824)
  > 提供新的实现，避免了 nginx 内置 header 变量缓存未被刷新的问题

- 修复 etcd 数据同步异常问题 [#8493](https://github.com/apache/apisix/pull/8493)

- 修复由 healthcheck 引起的高 CPU 和内存使用问题 [#9016](https://github.com/apache/apisix/pull/9016)
  > 修复 APISIX 在 `cancel_clean_handler` 失败后，create_checker 中 `healthcheck.new` 创建的 healthchecker 泄漏问题

- 防止非 `127.0.0.0/24` 的请求用空的 `admin_key` 访问 Admin API [#9146](https://github.com/apache/apisix/pull/9146)

- 修复 batch-requests 不读取 trailer headers 的情况 [#9289](https://github.com/apache/apisix/pull/9289)

如果你对完整的内容感兴趣，请参考 3.2.1 发布的 [CHANGELOG](https://github.com/apache/apisix/blob/release/3.2/docs/zh/latest/CHANGELOG.md#321)。
