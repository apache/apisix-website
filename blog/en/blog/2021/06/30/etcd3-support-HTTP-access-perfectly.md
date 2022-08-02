---
title: "Does etcd 3 Support HTTP Access Perfectly?"
slug: 2021/06/30/etcd3-support-http-access-perfectly
author: "Zexuan Luo"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- Apache APISIX
- etcd
- HTTP
- gRPC
Description: When Apache APISIX synchronizes etcd data in full, if there is enough configuration, the data size that can be read by a single request, which is the default limit of gRPC, is reached.
tags: [Ecosystem]
---

> It has been 8 months since the release of Apache APISIX version 2.0 last October. In the course of practice, we have also discovered some issues with etcd's HTTP API that interoperate with the gRPC API. In fact, having a gRPC-gateway does not mean that HTTP access is perfectly supported, there are some nuances here.

<!--truncate-->

After etcd was upgraded to version 3.x, the protocol of its external API was switched from normal HTTP1 to gRPC. etcd proxied HTTP1 requests through gRPC-gateway to access the new gRPC API in the form of gRPC for those special groups that cannot use gRPC. (Since HTTP1 is too awkward to pronounce, the following is simplified to HTTP, which corresponds to gRPC. Please don’t get hung up on the fact that gRPC is also an HTTP request.)

When Apache APISIX started using etcd, we used the etcd v2 API, and since Apache APISIX version 2.0, we have upgraded our dependency on etcd to 3.x. Since there is no gRPC library in the Lua ecosystem, etcd’s HTTP compatibility has helped us a lot, so we don’t have to go through a lot of effort to patch This was a big help, so we didn’t have to go to a lot of trouble to fill in the gaps.

It has been 8 months since the release of Apache APISIX version 2.0 last October. In the course of practice, we have also discovered some issues with etcd’s HTTP API that interoperates with the gRPC API. In fact, having a gRPC-gateway does not mean that HTTP access is perfectly supported, there are some nuances here.

## Breaking the Default Restrictions of gRPC

Just a few days ago, etcd released version v3.5.0. This release solves a problem that has been bothering us for a long time.

Unlike HTTP, gRPC limits the size of data that can be read in one request by default. This limit is called “MaxCallRecvMsgSize” and defaults to 4MiB. When Apache APISIX fully synchronizes etcd data, this limit can be triggered if configured enough and the error “grpc: received message larger than max”.

Miraculously, if you use etcdctl to access it, there is no problem at all. This is because this limit can be set dynamically when establishing a connection with the gRPC server. etcdctl sets this limit to a large integer, which is equivalent to removing this limit.

Since many users have encountered the same problem, we have discussed countermeasures.
One idea was to use incremental synchronization to simulate full synchronization, which has two drawbacks.

1. It is complicated to implement and requires a lot of code changes.
2. It would extend the time required for synchronization.

Another idea is to modify etcd. If you can remove the restrictions in etcdctl, why not treat gRPC-gateway the same way? The same change can be made to gRPC-gateway.
We’ve adopted the second option, and have given etcd a PR: [PR #13077](https://github.com/etcd-io/etcd/pull/13077).

![2021-06-30-1](https://static.apiseven.com/202108/1639465584634-26435c89-3e1c-4fb9-b094-057fce0f769d.png)

The latest release of v3.5.0 includes this change that we contributed. If you encounter “grpc: received message larger than max”, you may want to try this version. This change has also been back-ported to the 3.4 branch by the etcd developers, and the next release of the 3.4 branch will carry this change as well.

This incident also shows that gRPC-gateway is not foolproof. Even with it, there is no guarantee that HTTP access will have the same experience as gRPC access.

## Interesting Usage of Server-side Certificates

After Apache APISIX added support for etcd mTLS, some users reported that they have been unable to complete the checksum, while accessing with etcdctl was successful. After talking to the user, I decided to take his certificate and reproduce it.

During the replication process, I noticed this error in the etcd log:

``` text
2021-06-09 11:10:13.022735 I | embed: rejected connection from "127.0.0.1:50898" (error "tls: failed to verify client's certificate: x509: certificate specifies an incompatible key usage", ServerName "")
WARNING: 2021/06/09 11:10:13 grpc: addrConn.createTransport failed to connect to {127.0.0.1:12379 0 }. Err :connection error: desc = "transport: authentication handshake failed: remote error: tls: bad certificate". Reconnecting...
```

The “bad certificate” error message looks at first glance like it is because we sent the wrong client certificate to etcd. But if you look closely, you will see that this error is reported inside the gRPC server.

The gRPC-gateway acts as a proxy inside etcd, turning outside HTTP requests into gRPC requests that the gRPC server can handle.

The general architecture is as follows:

```text
etcdctl ----> gRPC server
Apache APISIX ---> gRPC-gateway ---> gRPC server
```

Why does etcdctl connect directly to the gRPC server, but not with a gRPC-gateway in between?

It turns out that when etcd enables client-side certificate validation, a client-side certificate is required to connect to the gRPC server using the gRPC-gateway. Guess where this certificate comes from?

etcd uses the configured server-side certificate directly as the client-side certificate here.

A certificate that provides both authentication on the server side and identity on the client side doesn’t seem to be a problem. Unless server auth expansion is enabled on the certificate, but client auth is not enabled. Execute the following command on the faulty certificate:

```shell
openssl x509 -text -noout -in /tmp/bad.crt
```

You will see output like this:

```text
X509v3 extensions:
X509v3 Key Usage: critical
Digital Signature, Key Encipherment
X509v3 Extended Key Usage:
TLS Web Server Authentication
```

Note the “TLS Web Server Authentication” here, if we change it to “TLS Web Server Authentication, TLS Web Client Authentication” or without this extension, there will be no problem.

There is also an issue about this problem on etcd’s repository: Issue [#9785](https://github.com/etcd-io/etcd/issues/9785
).

![2021-06-30-2](https://static.apiseven.com/202108/1639465662863-30bc4fa9-8b7c-47d9-a73e-810bd690a588.png)

## Summary

Although we have listed a few minor issues above, etcd’s support for HTTP access is still a very useful feature.

Thanks to the users of Apache APISIX, we have a large user base to find these details of etcd. As a large user of etcd, we will continue to communicate with the etcd developers for many years to come.
