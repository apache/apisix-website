---
title: Securing Admin Access to Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - API gateway security
  - Admin API
  - how to secure API gateway
description: API Gateways are critical components in one's infrastructure. If an attacker could change the configuration of routes, they could direct traffic to their infrastructure. Consequences could range from data theft to financial losses. Worse, data theft could only be noticed after a long time by mirroring the load. Hence, protecting your API Gateway is of utmost importance
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/02/09/GCYH53g6_security-g85f9e284f.jpg
---

> API Gateways are critical components in one's infrastructure. If an attacker could change the configuration of routes, they could direct traffic to their infrastructure. Consequences could range from data theft to financial losses. Worse, data theft could only be noticed after a long time by mirroring the load. Hence, protecting your API Gateway is of utmost importance.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/secure-apisix-admin/" />
</head>

In this short blog post, I'll list a couple of ways to secure your [Apache APISIX](https://apisix.apache.org/) admin access.

## Change admin tokens

You can manage Apache APISIX configuration via its HTTP APIs. A token protects every API call. Operations require an `X-API-KEY` HTTP Header:

* Use a token with the _viewer_ role to call read operations
* Use a token with the _admin_ role to call read *and* write operations

For example, to create a new route, I need to pass an _admin_-role token, which allows calling write operations:

```bash
curl http://localhost:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "methods": ["GET"],
  "uri": ["/hello"],
  "upstream_id": 1
}'
```

The first and foremost step to secure your access is to change the default token values:

```yaml
deployment:
  admin:
    # Default token when use API to call for Admin API.
    # *NOTE*: Highly recommended to modify this value to protect APISIX's Admin API.
    # Disabling this configuration item means that the Admin API does not
    # require any authentication.
    admin_key:
      - name: admin
        key: edd1c9f034335f136f87ad84b625c8f1                                    #1
        role: admin                 # admin: manage all configuration data
                                    # viewer: only can view configuration data
      - name: viewer
        key: 4054f7cf07e344346cd3f287985e76a2                                    #1
        role: viewer
```

1. Change it!

You may want to secure tokens even further; it depends on your platform. For example, you may want to store tokens as `Secret` and inject them at container startup.

## Restrict binding IP(s)

A server can have multiple IPs from different network adapters. For example, an API Gateway would have at least two network adapters:

* One public-facing adapter to be reachable from the Internet
* One internal for inside access

By default, [Apache APISIX](https://github.com/apache/apisix) will bind itself to all network adapters found on the server at startup. The above scenario means it will be reachable **from the Internet**. We should restrict access from the inside only.

We can set which network interface Apache APISIX can bind to in the configuration:

```yaml
deployment:
  admin:
    admin_listen:
      ip: 0.0.0.0     # Specific IP, if not set, the default value is `0.0.0.0` #1
```

1. Change it!

## Restrict allowed IPs

Even if you restrict access to only IPs from inside your enterprise network, you want only some machines to access the API Gateway configuration. If it was the case, an attacker gaining access to the machine of an accountant could use it to try to attack the API Gateway.

You can restrict IP access with network policies - and you should. However, you can also implement this restriction on the API Gateway: it can allow finer-grained control and more agile changes - network policies are hard to change in general.

Here's the relevant snippet for Apache APISIX:

```yaml
deployment:
  admin:
    allow_admin:
      - 127.0.0.0/24 # If we don't set any IP list, then any IP access is allowed by default
      #- "::/64"                                                                #1
```

1. Change it according to your network topology.

## Mutual TLS

If to talk about authentication, one way is via a digital certificate. The most widespread low-level authentication mechanism today is <abbr title="Transport Layer Security">TLS</abbr>. TLS allows servers to prove their identity. Additionally, it keeps data exchanged private and prevents them from being tampered with.

Mutual TLS works on both sides so that the server proves its identity to the client **and** the client proves its identity to the server.

Here's the relevant configuration snippet to set admin mTLS in Apache APISIX:

```yaml
deployment:
  admin:
    https_admin: true   # enable HTTPS when use a separate port for Admin API
                        # Admin API will use conf/apisix_admin_api.crt and conf/apisix_admin_api.key as certificate
    admin_api_mtls:
      admin_ssl_ca_cert:  "/data/certs/mtls_ca.crt"       # Path of your self-signed ca cert
      admin_ssl_cert:     "/data/certs/mtls_server.crt"   # Path of your self-signed server side cert
      admin_ssl_cert_key: "/data/certs/mtls_server.key"   # Path of your self-signed server side key
```

## Standalone mode

Last but not least, one can completely move the configuration from `etcd` to a static (YAML) file. In this case, no Admin API is available to update the configuration. This deployment model is known as **standalone mode**.

In standalone mode, the only way to change the configuration is to update the static file: Apache APISIX will check for changes at regular intervals and update itself accordingly. It's a great way to apply GitOps principles with Apache APISIX.

In the meanwhile, you can configure standalone mode as the following:

```yaml
deployment:
    role: data_plane
    role_data_plane:
       config_provider: yaml
```

Note that standalone mode makes all other securing options moot, as there's no Admin API to secure anymore.

## Conclusion

You need to secure API Gateways from unwanted access as they are valuable targets for bad actors. In this post, I've shown several non-exclusive options you should consider to secure Apache APISIX.

Finally, I've described how you could make it without the Admin API via the dedicated Standalone deployment mode. Expect a future blog post on how to use it with GitOps.

**To go further:**

* [mTLS: Protect Admin API](https://apisix.apache.org/docs/apisix/mtls/#protect-admin-api)
* [Standalone mode](https://apisix.apache.org/docs/apisix/deployment-modes/#standalone)
