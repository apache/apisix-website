---
title: "Apache APISIX 3.3.0 正式发布"
authors:
  - name: "曾元豪"
    title: "Author"
    url: "https://github.com/leslie-tsang"
    image_url: "https://avatars.githubusercontent.com/u/59061168?v=4"
  - name: "Yilialinn"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- Apache APISIX
- API 网关
- API 管理平台
- 版本发布
- 新功能
description: Apache APISIX 3.3.0 版本正式发布，此版本提供了更好的多域名匹配场景下的表现。
tags: [Community]
---

> Apache APISIX 3.3.0 版本正式发布，此版本提供了更好的多域名匹配场景下的表现。

<!--truncate-->

## APISIX 3.3.0 新功能

时隔一个月，新版本又来了。这次的 APISIX 3.3.0 是 3.2 LTS 版本以来的第一个新版本，在 3.x 的新时代里，我们一如既往地给大家奉上更多新功能。

此次发布的 3.3.0 版本，将默认路由匹配模式从 `radixtree_uri` 改为 `radixtree_host_uri`，提供了更好的多域名匹配场景下的表现。在这之外，我们还引入了许多新的特性和功能，旨在优化 APISIX 的使用体验。

## 新特性

### 支持将路由证书存储在 secrets manager 中

APISIX 3.3.0 版本支持从 Vault 中加载证书，提供了更好的安全性保障。

#### 相关示例

第一步：配置 Vault 对接参数

```
$ curl http://127.0.0.1:9180/apisix/admin/secrets/vault/test1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "http://127.0.0.1:8200",
    "prefix": "kv/apisix",
    "token" : "root"
}'
```

第二步：在 SSL 对象上使用 `$secret://` 的语法引用 vault 相关路径的配置，APISIX 将从对应 vault 资源路径中获取到相关证书数据

```
$ curl http://127.0.0.1:9180/apisix/admin/ssls/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "cert": "$secret://vault/test1/ssl/test2.com.crt",
    "key": "$secret://vault/test1/ssl/test2.com.key",
    "sni": "test2.com"
}'
```

最后在具体的 route 上配置上述 SSL 对象，route 证书便可以从 vault 中加载。

### 支持通过配置绕过 Admin API 身份验证

默认情况下 APISIX 将检查 `X-API-KEY` ，现在可以通过在配置文件中关闭 `admin_key_required` 配置项，关闭相关的检查。

第一步：修改 config.yaml 配置文件

```
...
deployment:
  admin:
    admin_key_required: false
...
```

第二步：不使用 admin key 访问资源

```
curl -v http://127.0.0.1:9180/apisix/admin/routes
```

这样就可以简化开发调试的复杂度了。

### 新功能：优化以及更多小功能

除了上面提到的几个大的功能外，此次发布也包含许多值得述说的改动：

* fault-injection 插件支持请求头注入
* 提供在其他插件中引用 proxy-rewrite 插件中路由改写捕捉到的变量支持
* limit-count 插件提供 username 与 ssl redis 认证方式
等等。

如果你对新版本的完整更新细节感兴趣，请参考 3.3.0 发布的 [CHANGELOG](https://github.com/apache/apisix/blob/release/3.3/docs/zh/latest/CHANGELOG.md#330)。
