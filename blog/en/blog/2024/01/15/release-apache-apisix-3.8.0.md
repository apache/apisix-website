---
title: "Release Apache APISIX 3.8.0"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://github.com/AlinsRan.png"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://github.com/kayx23.png"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: The Apache APISIX 3.8.0 version is released on January 15, 2024. This release includes a few new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.8.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including the support for JWE decryption, brotli compression, multiple authentication methods on routes and services, required scopes in `openid-connect` plugin, and more.

## New Features

### Support decrypting JWE in requests using `jwe-decrypt` plugin

Support the decryption of [JWE](https://datatracker.ietf.org/doc/html/rfc7516) authorization headers in requests with the new `jwe-decrypt` plugin.

The plugin creates an internal endpoint `/apisix/plugin/jwe/encrypt` for JWE encryption, which can be exposed using the `public-api` plugin. You will also configure the decryption key in Consumers.

For more information, see [PR #10252](https://github.com/apache/apisix/pull/10252) and [plugin documentation](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/jwe-decrypt.md).

### Support multiple authentication methods on routes and services

Support multiple authentication methods on routes and services with the new `multi-auth` plugin. The plugin iterates through the list of authentication plugins configured in the `auth_plugins` attribute. It allows consumers using different authentication methods to share the same route or service.

For example, you can have one consumer using basic authentication:

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "username": "consumer1",
    "plugins": {
      "basic-auth": {
        "username": "consumer1",
        "password": "consumer1_pwd"
      }
    }
  }'
```

And another consumer using key authentication:

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "username": "consumer2",
    "plugins": {
      "key-auth": {
        "key": "consumer2_s3cr3t"
      }
    }
  }'
```

Both consumers can access the route below upon successful authentication using their respective authentication method:

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "methods": ["GET"],
    "uri": "/get",
    "plugins": {
      "multi-auth":{
        "auth_plugins":[
          {
            "basic-auth":{ }
          },
          {
            "key-auth":{
              "query":"apikey",
              "hide_credentials":true,
              "header":"apikey"
             }
          }
        ]
      }
    },
    "upstream": {
      "type": "roundrobin",
      "nodes": {
        "httpbin.org": 1
      }
    }
  }'
```

For more information, see [PR #10482](https://github.com/apache/apisix/pull/10482) and [plugin documentation](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/multi-auth.md).

### Support the use of `filters.regex` with compressed data in `response-rewrite` plugin

Support the use of `filters.regex` with brotli and gzip compressed data in `response-rewrite` plugin.

For more information, see [PR #10588](https://github.com/apache/apisix/pull/10588) and [PR #10637](https://github.com/apache/apisix/pull/10637).

### Support specifying the required scopes in `openid-connect` plugin

Support specifying the required scopes in `openid-connect` plugin in the `required_scopes` attribute. When configured, the plugin will check if all required scopes are present in the scopes returned by the introspection endpoint.

For more information, see [PR #10493](https://github.com/apache/apisix/pull/10493).

### Support `Timing-Allow-Origin` header in `cors` plugin

New attributes `timing_allow_origins` and `timing_allow_origins_by_regex` are available in the cors plugin to support selective viewing of timing by origin.

For more information, see [PR #9365](https://github.com/apache/apisix/pull/9365).

### Support brotli compression algorithm

Support brotli compression algorithm in the new `brotli` plugin, which dynamically sets the behavior of [brotli in NGINX](https://github.com/google/ngx_brotli). Before using the plugin, you should first build and install brotli shared libraries.

For more information, see [PR #10515](https://github.com/apache/apisix/pull/10515) and [plugin documentation](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/brotli.md).

### Expand capability of parameter parsing in `body-transformer` plugin

Support parsing parameters from POST requests of `application/x-www-form-urlencoded` content type and URI parameters from GET requests in `body-transformer` plugin.

For more information, see [PR #10496](https://github.com/apache/apisix/pull/10496).

### Support the use of variables for sensitive information in `limit-count` plugin attributes

Support the use of variables for sensitive information in `limit-count` plugin attributes. For example, you could save `redis_password` to an environment variable and configure the value in the plugin as `$ENV://REDIS_PASSWORD`.

For more information, see [PR #10597](https://github.com/apache/apisix/pull/10597).

## Other Updates

- Improve performance with lua-resty-events module ([PR #10550](https://github.com/apache/apisix/pull/10550) and [PR #10558](https://github.com/apache/apisix/pull/10558))
- Upgrade OpenSSL 1.1.1 to OpenSSL 3 ([PR #10724](https://github.com/apache/apisix/pull/10724))
- Reduce the required number of `redis_cluster_nodes` from 2 to 1 in `limit-count` plugin  ([PR #10612](https://github.com/apache/apisix/pull/10612))
- Allow port to be an optional field when upstream nodes are of array type ([PR #10477](https://github.com/apache/apisix/pull/10477))
- Fix counter sharing among consumers when using the `limit-count` plugin ([PR #10540](https://github.com/apache/apisix/pull/10540))
- Add `redirect_after_logout_uri` attribute for `openid-connect` plugin, used when `end_session_endpoint` is not provided ([PR #10653](https://github.com/apache/apisix/pull/10653))
- Fix counter sharing among consumers when using the `limit-count` plugin ([PR #10540](https://github.com/apache/apisix/pull/10540))
- Fix `forward-auth` plugin 403 error when POST request body is too large ([PR #10589](https://github.com/apache/apisix/pull/10589))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#380).
