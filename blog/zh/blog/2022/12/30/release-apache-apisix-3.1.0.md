---
title: "Apache APISIX 3.1.0 正式发布"
authors:
  - name: "罗泽轩"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://github.com/spacewander.png"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- 插件配置
- 安全
- gRPC
- Consul
description: Apache APISIX 3.1.0 版本正式发布！此版本带来很多关于安全层面的功能支持，同时新增内置调试插件，旨在优化对 APISIX 的使用体验。
tags: [Community]
---

> Apache APISIX 3.1.0 版本正式发布！此版本带来很多关于安全层面的功能支持，同时新增内置调试插件，旨在优化对 APISIX 的使用体验。

<!--truncate-->

时隔一个月，新版本又来了。这次的 APISIX 3.1.0 是 3.0 大版本以来的第一个新版本，在 3.x 的新时代里，我们一如既往地在每个版本中给大家奉上更多的新功能。

此次发布的 3.1.0 版本，添加了对插件配置的加密存储和存储在外部安全服务的支持，着重于让用户能够更安全、更放心地使用他们的配置。在这之外，我们还引入了许多新的特性，旨在优化对 APISIX 的使用体验。

## 新特性：插件配置的加密存储

新版本支持将插件的特定字段加密保存到 etcd 中。

在之前的版本中，APISIX 提供了一个 `key_encrypt_salt` 的配置项，支持对 etcd 里面存储的 SSL key 进行加密，避免明文存储私钥数据。毕竟像私钥这样的敏感数据，少一个地方存储明文，就能多一份安心。那么对于其他同样敏感的配置，比如 `jwt-auth` 插件中的 secret，我们能不能也加密起来，避免在 etcd 里面存储明文呢？

3.1 版本中就把加密存储的功能拓展到其他字段上。有了这个功能，我们可以在某个特定的插件上指定需要加密的字段，然后在 `config.yaml` 文件中开启加密，即可避免明文存储。

举个例子，我们给 `jwt-auth` 插件新增了如下的标记：

```lua
     encrypt_fields = {"secret", "private_key"},
```

当我们在 `config.yaml` 里开启了字段的加密功能：

```yaml
apisix:
    data_encryption:
        enable: true
        keyring:
            - edd1c9f0985e76a2
```

那么写入到 etcd 的 `jwt-auth` 插件的配置中的 secret 和 private_key，就会被加密存储。通过 `etcdctl get --prefix /` 看到的配置，会是诸如 “"secret":"77+NmbYqNfN+oL..."” 这样的数据，而不是原始的配置信息。

## 新特性：将敏感信息存储在外部安全服务

除了可以将敏感信息加密存储在 etcd 之外，还可以选择从别的系统中动态获取敏感信息，而不再要求敏感信息必须存储在 APISIX 的配置存储（如 etcd）中。

在 3.1 版本中，我们上线了名为 APISIX Secret 的功能。APISIX Secret 允许用户在 APISIX 中通过一些密钥管理服务（Vault 等）来存储 secret，在使用的时候根据 key 进行读取，确保 secret 在整个平台中不以明文的形式存在。

APISIX 目前支持通过以下方式存储 secret：

- 环境变量
- HashiCorp Vault

### 相关示例

以 `key-auth` 插件为例，我们来示范下如何使用特性。

#### 基于环境变量的敏感信息存储

第一步：APISIX 实例启动前创建环境变量

```shell
export JACK_AUTH_KEY=abc
```

第二步：在 `key-auth` 插件中引用环境变量

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "$ENV://JACK_AUTH_KEY"
        }
    }
}'
```

通过以上步骤，可以将 `key-auth` 插件中的 key 配置保存在环境变量中，而不是在配置插件时明文显示。

#### 基于 Vault 的敏感信息存储

第一步：在 Vault 中创建对应的配置，可以使用如下命令：

```shell
vault kv put apisix/jack auth-key=value
```

第二步：通过 Admin API 添加 Secret 资源，配置 Vault 的地址等连接信息：

```shell
curl http://127.0.0.1:9180/apisix/admin/secrets/vault/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "https://127.0.0.1:8200"，
    "prefix": "apisix",
    "token": "root"
}'
```

第三步：在 `key-auth` 插件中引用 APISIX Secret 资源，填充配置在 Vault 中的位置：

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "$secret://vault/1/jack/auth-key"
        }
    }
}'
```

通过以上步骤，可以将 `key-auth` 插件中的 key 配置保存在 Vault 中，而不是在配置插件时明文显示。

## 新特性：实验性基于 gRPC 的 etcd 配置同步

在本次新版本中，我们还引入了实验性的基于 gRPC 的 etcd 配置同步。当前 APISIX 同步 etcd 的配置，是基于 HTTP long pulling，这就要求 etcd 开启 gRPC-gateway （所幸的是默认就是开启的）。

在实践过程中，我们遇到了 etcd 的 HTTP API 出现问题，也许是因为通过 HTTP 同步配置并非 etcd 的主流使用方式，所以会更容易遇到 bug。通过把 etcd 配置同步由 HTTP long pulling 切换到 gRPC 上面来，APISIX 实现了同步方式与主流接轨。

另外由于 gRPC 本身提供了多路复用的支持，改用 gRPC 同步配置能大幅降低 APISIX 到 etcd 的连接数。当前 APISIX 同步每一类配置都要有独立的 HTTP 连接，切换到 gRPC 后每个进程只有一条用于配置同步的连接（如果开启了 L4 代理，那么是两条）。

启用实验性的基于 gRPC 的配置同步，需要在配置文件 `config.yaml` 中设置 `use_grpc: true`：

```yaml
  etcd:
    use_grpc: true
    timeout: 3600
    host:
      - "http://127.0.0.1:2379"
    prefix: "/apisix"
```

## 新特性：基于 Consul 的服务发现

在 APISIX 之前的版本里，有热心的贡献者提供了基于 Consul KV 的服务发现实现。不过 Consul KV 跟 Consul 自身的服务发现功能有些不同。Consul 自身的服务发现支持额外的一些功能，比如对注册服务的健康检查，所以在使用上会更为广泛些。本次 3.1 版本中，另一位热心贡献者提供了基于 Consul 的服务发现，填补了这一空缺。

基于 Consul 的服务发现和之前版本里基于 Consul KV 的服务发现有着相似的配置。首先，需要在 `config.yaml` 文件中启用该服务发现：

```yaml
discovery:
  consul:
    servers:
      - "http://127.0.0.1:8500"

```

然后在具体的 upstream 中配置对应的 `service_name` 和 `discovery_type`：

```shell
curl http://127.0.0.1:9180/apisix/admin/upstreams/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "service_name": "service_a",
    "discovery_type": "consul"
}'
```

对应的 upstream 在使用过程中，就会根据 Consul 里面配置的值去得到真正的上游节点。

## 新特性：内置的调试插件

工欲善其事，必先利其器。调试是程序员日常工作的一部分。作为注重调试体验的网关，APISIX 在 3.1 版本中以插件的形式内置了一个 Lua 调试器插件，支持动态设置断点、添加回调等等。

默认的配置如下：

```yaml
plugins:
    ...
    - inspect
    ...

plugin_attr:
  inspect:
    delay: 3
    hooks_file: "/usr/local/apisix/plugin_inspect_hooks.lua"
```

APISIX 在启动后，会定期查看配置的 hooks_file （这里是 "/usr/local/apisix/plugin_inspect_hooks.lua"），如果文件里面有内容，就会根据里面的内容设置断点和回调。比如下方内容会给 limit-req.lua 的 88 行上设置一个断点，并在该断点上注册了回调函数 `function(info) ... end`。

```lua
local dbg = require "apisix.inspect.dbg"

dbg.set_hook("limit-req.lua", 88, require("apisix.plugins.limit-req").access, function(info)
    ngx.log(ngx.INFO, debug.traceback("foo traceback", 3))
    return true
end)
```

## 新功能：优化以及更多小功能

除了上面提到的几个大的功能外，此次发布也包含许多值得述说的改动：

* 优化 Prometheus 指标采集的资源占用
* 支持在 L4 的代理中，配置域名作为上游

如果你对新版本的完整更新细节感兴趣，请参考 3.1.0 发布的 [changelog](https://github.com/apache/apisix/blob/release/3.1/docs/zh/latest/CHANGELOG.md#310)。