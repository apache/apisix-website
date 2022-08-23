---
title: "Apache APISIX 集成 HashiCorp Vault，生态系统再添一员"
authors:
  - name: "Bisakh Mondal"
    title: "Author"
    url: "https://github.com/bisakhmondal"
    image_url: "https://avatars.githubusercontent.com/u/41498427?v=4"
  - name: "曾奕霖"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords: 
- Apache APISIX
- HashiCorp
- Vault
- jwt auth
- 认证
description: 本文为大家带来了 Apache APISIX 即将发布的 Vault 插件以及相关使用细节。在为服务提供高并发低延迟的卓越性能的同时，为服务的安全保驾护航。
tags: [Plugins,Authentication,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/vault.png
---

> 本文为大家带来了 Apache APISIX 即将发布的 Vault 插件以及相关细节。在为服务提供高并发低延迟的卓越性能的同时，为服务的安全保驾护航。

<!--truncate-->

随着微服务架构的兴起，保持服务安全变得比以前更有挑战性。多个后端 server 实例使用单一的静态密钥凭访问数据库 server 会带来巨大的风险。如果发生密钥凭证泄露，整个系统都会受到影响。为了解决密钥凭证泄露所带来的影响，只能撤销这个密钥凭证。而撤销密钥凭证会导致大规模的服务中断，对开发者来说，服务大规模中断是开发者最不想看到事情。

虽然我们不能提前预知将来会出现哪些安全漏洞，但是我们可以通过配置多个密钥来控制这些安全漏洞的影响范围。为了避免这样的情况，像 HashiCorp Vault（下文简称 Vault）这样密钥凭证解决方案应运而生。

本文演示了如何将 Vault 与 Apache APISIX 的 `jwt-auth` 插件集成，在为服务提供高并发低延迟的卓越性能的同时，为服务的安全保驾护航。

## 什么是 Vault

Vault 旨在帮助用户管理服务密钥的访问权限，并在多个服务之间安全地传输这些密钥。密钥可以是任何形式的凭证，因为密钥可用于解锁敏感信息，所以需要严密控制密钥。密钥的形式可以是密码、API 密钥、SSH 密钥、RSA 令牌或 OTP。事实上，密钥泄露的情况非常普遍：密钥通常被储存在配置文件中，或作为变量被储存在代码中，如果没有妥善保存，密钥甚至会出现在 GitHub、BitBucket 或 GitLab 等公开可见的代码库中，从而对安全构成了重大威胁。Vault 通过集中密钥解决了这个问题。它为静态密钥提供加密存储，生成具有 TTL 租约的动态密钥，对用户进行认证，以确保他们有权限访问特定的密钥。因此，即使在安全漏洞的情况下，影响范围也小得多，并能得到更好的控制。

Vault 提供了一个用户界面用于密钥管理，使控制和管理权限变得非常容易。不仅如此，它还提供了灵活且详细审计日志功能，能跟踪到所有用户的历史访问记录。

![HashiCorp Vault](https://static.apiseven.com/202108/1642770417379-a91960a5-5aac-45fa-9277-801a4ee2afc6.png)

## jwt-auth 插件介绍

`jwt-auth` 是一个认证插件，可以附加到任何 APISIX 路由上，在请求被转发到上游 URI 之前执行 JWT 认证。通常情况下，发行者使用私钥或文本密钥来签署 JWT。JWT 的接收者将验证签名，以确保令牌在被发行者签名后没有被改变。整个 JWT 机制的整体完整性取决于签名密钥（或 RSA 密钥对的文本密钥）。这使得未经认证的来源很难猜到签名密钥并试图改变 JWT 中的声明。

因此，在安全的环境中存储这些密钥是非常关键的。如果密钥落入坏人之手，可能会危及整个基础设施的安全。虽然 Apache APISIX 采取了一切手段来遵循标准的 SecOps 实践，但在生产环境中有一个集中的密钥管理解决方案也是一件好事。例如 Vault，有详细的审计日志，定时的密钥轮换，密钥撤销等功能。如果每次在整个基础设施发生密钥轮换时，你都要更新 Apache APISIX 配置，这将是一个相当麻烦的问题。

## 如何集成 Vault 和 Apache APISIX

为了与 Vault 集成，Apache APISIX 需要在 [config.yaml](https://github.com/apache/apisix/blob/master/conf/config.yaml) 文件中加载 Vault 的相关配置信息。

Apache APISIX 与 Vault server [KV secret engine v1](https://www.vaultproject.io/docs/secrets/kv/kv-v1) HTTP [APIs](https://www.vaultproject.io/api/secret/kv/kv-v1) 进行通信。由于大多数企业解决方案倾向于在生产环境中使用 KV Secrets Engine - Version 1，在 APISIX-Vault 支持的初始阶段，我们只使用这个版本。在以后的版本中，我们将增加对 K/V - Version 2 的支持。

使用 Vault 而不是 APISIX etcd 后端的主要顾虑是在低信任度环境下的安全问题。因为 Vault 访问令牌是小范围的，可以授予 APISIX server 有限的权限。

### 配置 Vault

本节分享了在 Apache APISIX 生态系统中使用 Vault 的最佳实践。如果你已经有了一个具有必要权限的 Vault 实例在运行，请跳过本节。

#### 启动 Vault server

在这里，你有多种选择，可以自由选择 Docker、预编译二进制包或从源代码构建。至于与 Vault server 的通信，你需要一个 Vault CLI 客户端。请运行以下命令启动 server：

```shell
$ vault server -dev -dev-root-token-id=root
…
WARNING! dev mode is enabled! In this mode, Vault runs entirely in-memory
and starts unsealed with a single unseal key. The root token is already
authenticated to the CLI, so you can immediately begin using Vault.
You may need to set the following environment variable:
export VAULT_ADDR='http://127.0.0.1:8200'
The unseal key and root token are displayed below in case you want to
seal/unseal the Vault or re-authenticate.
Unseal Key: 12hURx2eDPKK1tzK+8TkgH9pPhPNJFpyfc/imCLgJKY=
Root Token: root
Development mode should NOT be used in production installations!
```

用正确的环境变量设置 Vault CLI 客户端。

```shell
$ export VAULT_ADDR='http://127.0.0.1:8200'
$ export VAULT_TOKEN='root'
```

用一个合适的 `path` 前缀启用 vault k/v version 1的密钥引擎后端。在这个演示中，我们要选择 `kv` 路径，这样就不会与 vault 默认的 `kv` version 2 的密钥路径发生冲突。

```shell
$ vault secrets enable -path=kv -version=1 kv
Success! Enabled the kv secrets engine at: kv/


# To reconfirm the status, run
$ vault secrets list
Path          Type         Accessor              Description
----          ----         --------              -----------
cubbyhole/    cubbyhole    cubbyhole_4eeb394c    per-token private secret storage
identity/     identity     identity_5ca6201e     identity store
kv/           kv           kv_92cd6d37           n/a
secret/       kv           kv_6dd46a53           key/value secret storage
sys/          system       system_2045ddb1       system endpoints used for control, policy and debugging
```

#### 为 Apache APISIX 生成一个 Vault 访问令牌

本文是关于在 `jwt-auth` 插件中使用 Vault 的介绍。因此，对于一个 APISIX Consumer `jack`，`jwt-auth` 插件会在 `<vault.prefix inside config.yaml>/consumer/<consumer.username>/jwt-auth` 中查找（如果启用了 Vault 配置）`secret/s` 到 Vault 键值对 存储。在这种情况下，如果你将 `kv/apisix` 命名空间（Vault 路径）指定为`config.yaml` 内的 `vault.prefix`，用于所有 APISIX 相关数据的检索，我们建议你为路径 `kv/apisix/consumer/` 创建一个策略。最后的星号（*）确保策略允许读取任何具有 `kv/apisix/consumer` 前缀的路径。

用 HashiCorp 配置语言（HCL）创建一个策略文件。

```shell
$ tee apisix-policy.hcl << EOF
path "kv/apisix/consumer/*" {
    capabilities = ["read"]
}
EOF
```

将策略应用于 Vault 实例。

```shell
$ vault policy write apisix-policy apisix-policy.hcl

Success! Uploaded policy: apisix-policy
```

用新定义的策略生成一个令牌，该策略已被配置为很小的访问边界。

```shell
$ vault token create -policy="apisix-policy"


Key                  Value
---                  -----
token                s.KUWFVhIXgoRuQbbp3j1eMVGa
token_accessor       nPXT3q0mfZkLmhshfioOyx8L
token_duration       768h
token_renewable      true
token_policies       ["apisix-policy" "default"]
identity_policies    []
policies             ["apisix-policy" "default"]
```

在这个例子中，`s.KUWFVhIXgoRuQbbp3j1eMVGa` 是你的访问令牌。

### 在 Apache APISIX 中添加 Vault 配置

Apache APISIX 通过 Vault HTTP APIs 与 Vault 实例进行通信。必要的配置必须被添加到 [config.yaml](https://github.com/apache/apisix/blob/master/conf/config.yaml) 中。

下面是关于你可以使用的不同字段的简要信息。

- host： 运行 Vault server 的主机地址。
- timeout： 每次请求的 HTTP 超时。
- token： 从 Vault 实例生成的令牌，授予从 Vault 读取数据的权限。
- prefix：启用前缀可以更好地执行策略，生成有限范围的令牌，严格控制可以从 APISIX 访问的数据。有效的前缀是（`kv/apisix`、`secret`等）。

```shell
vault:
  host: 'http://0.0.0.0:8200'
  timeout: 10
  token: 's.KUWFVhIXgoRuQbbp3j1eMVGa'
  prefix: 'kv/apisix'
```

### 创建一个 APISIX Consumer

APISIX 有一个 Consumer 层面的抽象，与认证方案并列。为了启用任何 APISIX 路由的认证，需要一个具有适合该特定类型认证服务配置的 Consumer。之后将通过 APISIX 成功执行 Consumer 配置方面的认证请求转发到上游 URI。APISIX Consumer 有两个字段：一个是 `username`（必填项），用于识别 Consumer；另一个是 `plugins`，用于保存 Consumer 所使用的特定插件配置。

在这里，在这篇文章中，我们将用 `jwt-auth` 插件创建一个 Consumer。它为各自的路由或服务执行 JWT 认证。

运行以下命令，启用 Vault 配置的 `jwt-auth`。

```shell
$ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "jwt-auth": {
            "key": "test-key",
            "vault": {}
        }
    }
}'
```

在这里，插件在 Consumer 配置中提到的 Consumer `jack` 的 Vault 路径（`<vault.prefix from conf.yaml>/consumer/jack/jwt-auth`）中查找密钥 `secret`，并使用它进行后续的签名和 jwt 验证。如果在同一路径中没有找到密钥，该插件会记录错误，并且无法执行 JWT 验证。

#### 设置一个测试的上游 server

为了测试这个行为，你可以为一个上游创建一个路由（一个简单的 ping 处理程序，返回 pong）。你可以用一个普通的 go HTTP-Server 来设置它。

```go
// simple upstream server
package main


import "net/http"


func ping(w http.ResponseWriter, req *http.Request) {
    w.Write([]byte("secure/pong\n"))
}


func main() {
    http.HandleFunc("/secure/ping", ping)
    http.ListenAndServe(":9999", nil)
}
```

#### 创建一个启用了认证的 APISIX 路由

用这个安全的 ping HTTP server 和启用了 `jwt-auth` 认证插件创建一个 APISIX 路由。

```shell
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "jwt-auth": {}
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:9999": 1
        },
        "type": "roundrobin"
    },
    "uri": "/secure/ping"
}'
```

#### 从 jwt-auth 插件生成令牌

现在从 APISIX 签署一个 JWT 密文，可以用于并通过向 APISIX server 的 `http://localhost:9080/secure/ping` 代理路由发出请求。

```shell
$ curl http://127.0.0.1:9080/apisix/plugin/jwt/sign\?key\=test-key -i
HTTP/1.1 200 OK
Date: Tue, 18 Jan 2022 07:50:57 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.11.0


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ0ZXN0LWtleSIsImV4cCI6MTY0MjU3ODY1N30.nkyev1_KUapVgY_QVYETsSApA6gEkDWS8tsHFV1EpD8
```

在上一步中，如果你看到类似 `failed to sign jwt` 的信息，请确保你有一个私有密钥存储在 vault `kv/apisix/consumers/jack/jwt-aut` 路径中。

```shell
# example
$ vault kv put kv/apisix/consumer/jack/jwt-auth secret=$ecr3t-c0d3
Success! Data written to: kv/apisix/consumer/jack/jwt-auth
```

#### 向 APISIX Server 发送请求

现在，向 APISIX 代理发出一个路由 `/secure/ping` 的请求。验证成功后，它将把请求转发给我们的 go HTTP server。

```shell
$ curl http://127.0.0.1:9080/secure/ping -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ0ZXN0LWtleSIsImV4cCI6MTY0MjU3ODU5M30.IYudBr7FTgRme70u4rEBoYNtGmGByzgfGlt8hctI__Q' -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 12
Connection: keep-alive
Date: Tue, 18 Jan 2022 08:00:04 GMT
Server: APISIX/2.11.0


secure/pong
```

任何无效的 JWT 请求都会抛出 `HTTP 401 Unauthorized` 的错误。

```shell
$ curl http://127.0.0.1:9080/secure/ping -i
HTTP/1.1 401 Unauthorized
Date: Tue, 18 Jan 2022 08:00:33 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.11.0


{"message":"Missing JWT token in request"}
```

### Vault 与 APISIX jwt-auth 插件集成的不同用例

Apache APISIX `jwt-auth` 插件可以被配置为从 Vault 存储中获取简单的文本密钥以及 RS256 公私密钥对。

:::note
对于该集成支持的早期版本，该插件希望存储到金库路径中的密钥名称在 [`secret`, `public_key`, `private_key`] 之间，以成功使用该密钥。在未来的版本中，我们将增加对引用自定义命名的密钥的支持。
:::

1. 你在 Vault 内存储了 HS256 签名密钥，你想用它来进行 jwt 签名和验证。

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "username": "jack",
        "plugins": {
            "jwt-auth": {
                "key": "key-1",
                "vault": {}
            }
        }
    }'
   ```

   在这里，插件在 Consumer 配置中提到的 Consumer 用户 `jack` 的 Vault 路径（`<vault.prefix from conf.yaml>/consumer/jack/jwt-auth`）中查找密钥 `secret`，并使用它进行后续的签名和 jwt 验证。如果在同一路径中没有找到密钥，该插件将记录一个错误，并且无法执行 JWT 验证。

2. RS256 RSA 密钥对，公钥和私钥都存储在 Vault 中。

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "username": "jim",
        "plugins": {
            "jwt-auth": {
                "key": "rsa-keypair",
                "algorithm": "RS256",
                "vault": {}
            }
        }
    }'
   ```

   该插件在 Vault 键值对路径（`<vault.prefix from conf.yaml>/consumer/jim/jwt-auth`）中为插件 Vault 配置中提到的用户 `jim` 查找 `public_key` 和 `private_key`。如果没有找到，认证失败。

   如果你不确定如何将公钥和私钥存储到 Vault 键值对中，请使用这个命令。

   ```shell
   # provided, your current directory contains the files named "public.pem" and "private.pem"
    $ vault kv put kv/apisix/consumer/jim/jwt-auth public_key=@public.pem private_key=@private.pem
    Success! Data written to: kv/apisix/consumer/jim/jwt-auth
   ```

3. Consumer 配置中的公钥，而私钥在 Vault 中。

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "username": "john",
        "plugins": {
            "jwt-auth": {
                "key": "user-key",
                "algorithm": "RS256",
                "public_key": "-----BEGIN PUBLIC KEY-----\n……\n-----END PUBLIC KEY-----"
                "vault": {}
            }
        }
    }'
   ```

   这个插件使用来自 Consumer 配置的 RSA 公钥，并使用直接从 Vault 获取的私钥。

### 禁用 Vault 插件

现在，要禁用 `jwt-auth` 插件的 Vault 查询，只需从 Consumer 插件配置中删除空的 Vault 对象（本例中是 `jack`）。这将使 JWT 插件在随后对已启用 `jwt-auth` 配置的 URI 路由的请求中，将查找签名密钥（包括 HS256/HS512 或 RS512 密钥对）纳入插件配置。即使你在 APISIX `config.yaml` 中启用了 Vault 配置，也不会有请求被发送到 Vault server。

Apache APISIX 插件是热加载的，因此不需要重新启动 Apache APISIX，配置可以立即生效。

```shell
$ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "jwt-auth": {
            "key": "test-key",
            "secret": "my-secret-key"
        }
    }
}'
```

## 结语

本文为大家带来了 Apache APISIX 即将发布的 Vault 插件以及相关细节。

欢迎随时在 [GitHub Discussions](https://github.com/apache/apisix/discussions) 中发起讨论，或通过[邮件列表](https://apisix.apache.org/zh/docs/general/join)进行交流。

## Reference

[Bisakh's Blog](https://blog.bisakh.com/blog/vault-apisix-jwt-auth)
