---
title: "APISIX 是怎么保护用户的敏感数据不被泄露的？"
authors:
  - name: "刘维"
    title: "Author"
    url: "https://github.com/monkeyDluffy6017"
    image_url: "https://github.com/monkeyDluffy6017.png"
keywords: 
- 敏感数据
- Apache APISIX
- 数据安全
- 数据加密
description: 本文以 APISIX 作为例子，为大家介绍了如何借助 `Global Data Encryption` 功能来保护敏感数据，确保不会有任何敏感数据进行明文存储，这样即使 etcd 中所有存储的数据都被盗取，也不会造成敏感数据泄露，从而有效提升了 APISIX 的安全性。
tags: [Ecosystem]
---

> 本文以 APISIX 作为例子，为大家介绍了如何借助 `Global Data Encryption` 功能来保护敏感数据，确保不会有任何敏感数据进行明文存储，这样即使 etcd 中所有存储的数据都被盗取，也不会造成敏感数据泄露，从而有效提升了 APISIX 的安全性。

<!--truncate-->

> 作者[刘维](https://github.com/monkeyDluffy6017)，API7.ai 技术工程师，Apache APISIX Contributor。

## 什么是敏感数据

敏感数据，又称隐私数据，主要是指泄露后可能会给个人或者公司带来严重危害的数据，包括但不限于个人身份信息，企业经营数据等。

## 为什么要保护敏感数据

对于个人来说，如果敏感数据被泄露，轻则可能受到无止尽的广告骚扰，重则可能导致人格尊严受到侵害，或者人身、财产安全受到危害。

对于企业来说，敏感数据直接关系企业的信息安全。例如密钥，证书等敏感信息，一旦遭受泄露，企业将会遭受信任损失和财务损失，甚至可能面临法律责任。

## 在 API 网关中有哪些敏感数据

API 网关作为业务流量的入口，往往包含了大量的敏感数据，例如 API 密钥、用于鉴权认证的 token 等，除了基本的负载均衡、流量管理等功能外，提升安全、防止敏感信息泄露，也至关重要，因此对 API 网关中的敏感数据进行保护具有重要意义。

![Sensitive Data](https://static.apiseven.com/uploads/2023/02/03/a86d0nVj_sensitive_data.png)

## API 网关怎么保护隐私数据

大致思路一般如下：

1. 将敏感数据置于保护区内，对访问权限进行严格的控制

2. 增加风控系统，对异常行为和业务合规进行风险控制

3. 对敏感数据进行脱敏处理或加密存储

下面将以 Apache APISIX 为例，展示如何在 API 网关中对敏感数据进行保护。

## Apache APISIX 在保护隐私数据中的实践

[Apache APISIX](https://apisix.apache.org/) 是 Apache 软件基金会的顶级开源项目，也是当前最活跃的开源网关项目。作为一个动态、实时、高性能的开源 API 网关，Apache APISIX 提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

用户可以通过编写插件来对 Apache APISIX 功能进行扩展，得益于成熟的社区和越来越多的活跃开发者，Apache APISIX 的插件数量在日益增多，其中有些插件携带敏感信息，例如 [jwt-auth](https://apisix.apache.org/docs/apisix/plugins/jwt-auth/) 插件的配置项 `secret` 和 `private_key`，为了防止这些数据被非法获取，我们有必要对其进行加密存储。

为了增强 APISIX 的安全性，更好的保护用户的隐私，APISIX 在 3.1.0 版本中引入了 `Global Data Encryption` 功能，有了这个功能，开发者在开发新插件的时候，只需要在插件的 schema 中指定要加密的数据，APISIX 就能在控制面写入的时候自动进行加密存储，数据面读取的时候自动解密，对开发者完全透明。

![Global Data Encryption](https://static.apiseven.com/uploads/2023/02/03/o7B7uR2a_global_data_encryption.png)

下面我们来看看具体的示例。

### 未开启数据加密功能

1. 下发配置

```lua
curl http://127.0.0.1:9180/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "foo",
    "plugins": {
        "basic-auth": {
            "username": "foo",
            "password": "bar"
        }
    }
}'
```

2. 确定 etcd 中的敏感数据状态

```lua
etcdctl get /apisix/consumers/foo
{"username":"foo","update_time":1675414313,"create_time":1674009211,"plugins":{"basic-auth":{"username":"foo","password":"bar"}}}
```

**可以看到 `password` 字段是明文存储**

### 开启数据加密功能

1. 在 `config.yaml` 中开启 `data_encryption`：

```yaml
apisix:
    data_encryption:
    enable: true
    keyring:
        - edd1c9f0985e76a2
```

2. 启用已经支持敏感数据加密的插件，这里以 `basic-auth` 插件为例

```lua
curl http://127.0.0.1:9180/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "foo",
    "plugins": {
        "basic-auth": {
            "username": "foo",
            "password": "bar"
        }
    }
}'
```

3. 验证插件功能

```
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/get",
    "plugins": {
        "basic-auth": {}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "httpbin.org": 1
        }
    }
}'
```

能正常访问

```
curl -i -ufoo:bar http://127.0.0.1:9080/get
HTTP/1.1 200 OK
...
```

密码错误，不能访问

```
curl -i -ufoo:test http://127.0.0.1:9080/get
HTTP/1.1 401 Unauthorized
...
{"message":"Invalid user authorization"}
```

插件功能正常

4. 确定 etcd 中的敏感数据状态

```lua
etcdctl get /apisix/consumers/foo
{"create_time":1674009211,"update_time":1674009211,"plugins":{"basic-auth":{"password":"+kOEVUuRc5rC5ZwvvAMLwg==","username":"foo"}},"username":"foo"}
```

**可以看到 `password` 字段已经被成功加密**，此时就算数据被泄露，其他人也无法破解。

## 总结

在 API 网关中，包含了大量的敏感数据，因此需要采取有效的手段来对数据进行保护，本文以 APISIX 作为例子，为大家介绍了如何借助 `Global Data Encryption` 功能来保护敏感数据，确保不会有任何敏感数据进行明文存储，这样即使 etcd 中所有存储的数据都被盗取，也不会造成敏感数据泄露，从而有效提升了 APISIX 的安全性。同时除了对敏感数据进行加密以外，APISIX 还支持将敏感信息直接放到第三方服务，即[Secret Manager](https://api7.ai/blog/how-to-use-secret-manager-with-api-gateway)功能，进一步提升了安全性。

希望通过上述分享，能够使大家更多的了解如何在 API 网关中保护敏感数据，从而保障企业的信息安全。
