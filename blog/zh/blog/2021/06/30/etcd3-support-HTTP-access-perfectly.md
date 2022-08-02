---
title: "差之毫厘：etcd 3 完美支持 HTTP 访问？"
slug: 2021/06/30/etcd3-support-http-access-perfectly
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- Apache APISIX
- etcd
- HTTP
- gRPC
Description: Apache APISIX 全量同步 etcd 数据时，假如配置够多，则会达到 gRPC 默认限制的一次请求可以读取的数据大小，但是 APISIX 在给etcd 贡献相关代码后解决了这个问题。
tags: [Ecosystem]
---

> 从去年 10 月发布 Apache APISIX 2.0 版本以来，现在已经过去了 8 个月。在实践过程中，我们也发现了 etcd 的 HTTP API 的一些跟 gRPC API 交互的问题。事实上，拥有 gRPC-gateway 并不意味着能够完美支持 HTTP 访问，这里还是有些细微的差别。

<!--truncate-->

etcd 升级到 3.x 版本后，其对外 API 的协议从普通的 HTTP1 切换到了 gRPC。为了兼顾那些不能使用 gRPC 的特殊群体，etcd 通过 gRPC-gateway 的方式代理 HTTP1 请求，以 gRPC 形式去访问新的 gRPC API。（由于 HTTP1 念起来太过拗口，以下将之简化成 HTTP，正好和 gRPC 能够对应。请不要纠结 gRPC 也是 HTTP 请求的这种问题。）

Apache APISIX 开始用 etcd 的时候，用的是 etcd v2 的 API。从 Apache APISIX 2.0 版本起，我们把依赖的 etcd 版本升级到 3.x。由于 Lua 生态圈里面没有 gRPC 库，所以 etcd 对 HTTP 的兼容帮了我们很大的忙，这样就不用花很大心思去补这个短板了。

从去年 10 月发布 Apache APISIX 2.0 版本以来，现在已经过去了 8 个月。在实践过程中，我们也发现了 etcd 的 HTTP API 的一些跟 gRPC API 交互的问题。事实上，拥有 gRPC-gateway 并不意味着能够完美支持 HTTP 访问，这里还是有些细微的差别。

### 打破 gRPC 的默认限制

就在几天前，etcd 发布了 v3.5.0 版本。这个版本的发布，了却困扰我们很长时间的一个问题。

跟 HTTP 不同的是，gRPC 默认限制了一次请求可以读取的数据大小。这个限制叫做 “MaxCallRecvMsgSize”，默认是 4MiB。当 Apache APISIX 全量同步 etcd 数据时，假如配置够多，就会触发这一上限，报错 “grpc: received message larger than max”。

神奇的是，如果你用 etcdctl 去访问，这时候却不会有任何问题。这是因为这个限制是可以在跟 gRPC server 建立连接时动态设置的，etcdctl 给这个限制设置了一个很大的整数，相当于去掉了这一限制。

由于不少用户碰到过同样的问题，我们曾经讨论过对策。

一个想法是用增量同步模拟全量同步，这么做有两个弊端：

1. 实现起来复杂，要改不少代码
2. 会延长同步所需的时间

另一个想法是修改 etcd。既然能够在 etcdctl 里面去除限制，为什么不对 gRPC-gateway 一视同仁呢？同样的改动可以作用在 gRPC-gateway 上。

我们采用了第二种方案，给 etcd 提了个 PR：https://github.com/etcd-io/etcd/pull/13077

![2021-06-30-1](https://static.apiseven.com/202108/1639465584634-26435c89-3e1c-4fb9-b094-057fce0f769d.png)

最新发布的 v3.5.0 版本就包含了我们贡献的这个改动。如果你遇到 “grpc: received message larger than max”，不妨试一下这个版本。这一改动也被 etcd 开发者 backport 到 3.4 分支上了。3.4 分支的下一个发布，也会带上这个改动。

这件事也说明 gRPC-gateway 并非百试百灵。即使用了它，也不能保证 HTTP 访问能够跟 gRPC 访问有一样的体验。

### 对服务端证书的有趣用法

Apache APISIX 增加了对 etcd mTLS 的支持后，有用户反馈一直没法完成校验，而用 etcdctl 访问则是成功的。在跟用户交流后，我决定拿他的证书来复现下。

在复现过程中，我注意到 etcd 日志里面有这样的报错：

``` text
2021-06-09 11:10:13.022735 I | embed: rejected connection from "127.0.0.1:50898" (error "tls: failed to verify client's certificate: x509: certificate specifies an incompatible key usage", ServerName "")
WARNING: 2021/06/09 11:10:13 grpc: addrConn.createTransport failed to connect to {127.0.0.1:12379 0 }. Err :connection error: desc = "transport: authentication handshake failed: remote error: tls: bad certificate". Reconnecting...
```

“bad certificate” 错误信息，初看像是因为我们发给 etcd 的客户端证书不对。但仔细瞧瞧，会发现这个报错是在 gRPC server 里面报的。

gRPC-gateway 在 etcd 里面起到一个代理的作用，把外面的 HTTP 请求变成 gRPC server 能处理的 gRPC 请求。

大体架构如下：

```text
etcdctl ----> gRPC server
Apache APISIX ---> gRPC-gateway ---> gRPC server
```

为什么 etcdctl 直连 gRPC server 能通，而中间加一层 gRPC-gateway 就不行？

原来当 etcd 启用了客户端证书校验之后，用 gRPC-gateway 连接 gRPC server 就需要提供一个客户端证书。猜猜这个证书从哪来？

etcd 把配置的服务端证书直接作为这里的客户端证书用了。

一个证书既在服务端上提供验证，又在客户端上表明身份，看上去也没什么问题。除非……

除非证书上启用了 server auth 的拓展，但是没有启用 client auth。

对有问题的证书执行`openssl x509 -text -noout -in /tmp/bad.crt`

会看到这样的输出：

```text
X509v3 extensions:
X509v3 Key Usage: critical
Digital Signature, Key Encipherment
X509v3 Extended Key Usage:
TLS Web Server Authentication
```

注意这里的 “TLS Web Server Authentication”，如果我们把它改成 “TLS Web Server Authentication, TLS Web Client Authentication”，抑或不加这个拓展，就没有问题了。

etcd 上也有关于这个问题的 issue：https://github.com/etcd-io/etcd/issues/9785

![2021-06-30-2](https://static.apiseven.com/202108/1639465662863-30bc4fa9-8b7c-47d9-a73e-810bd690a588.png)

### 结语

虽然我们在上文列出了几点小问题，但是瑕不掩瑜，etcd 对 HTTP 访问的支持还是一个非常有用的特性。

感谢 Apache APISIX 的用户们，正是因为我们有着广阔的用户群，才能发现 etcd 的这些细节上的问题。我们作为 etcd 的一大用户，在之后的日子里也将一如既往地跟 etcd 的开发者多多交流。
