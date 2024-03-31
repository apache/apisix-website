---
title: "Release Apache APISIX 3.9.0"
authors:
  - name: "Abhishek Choudhary"
    title: "Author"
    url: "https://github.com/shreemaan-abhishek"
    image_url: "https://github.com/shreemaan-abhishek.png"
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
description: The Apache APISIX 3.9.0 version is released on March 29, 2024. This release includes a few new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.9.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including the support for HTTP/3 between client and APISIX, the addition of plugin reload endpoint to Control API, the configuration of Prometheus metrics expiration, and more.

There are a few important changes included in this release. Should you find these changes impacting your operations, please plan accordingly for a seamless upgrade.

## Breaking Changes

### Enable HTTP/2

In the earlier versions, HTTP/2 can be enabled by setting `apisix.node_listen.enable_http2` and `apisix.ssl.listen.enable_http2` to `true` in the configuration file. These options have been deprecated in this release. Starting from 3.9.0, HTTP/2 can be enabled with `apisix.enable_http2`:

```yaml title="config.yaml"
apisix:
  enable_http2: true
```

For more information, see [PR #11032](https://github.com/apache/apisix/pull/11032).

### Consolidate `keyring` and `key_encrypt_salt` fields

In the earlier versions, `key_encrypt_salt` and `keyring` are two configuration options both used for data encryption and decryption in a similar manner. This release removes `key_encrypt_salt` as it is redundant, and you should only configure `keyring`:

```yaml title="config.yaml"
apisix:
  data_encryption:
    keyring:
      - qeddd145sfvddff3
```

For more information, see [PR #10771](https://github.com/apache/apisix/pull/10771).

## New Features

### Support HTTP/3 between client and APISIX

Support HTTP/3 between clients and APISIX as an experimental feature. HTTP/3 with upstream services is not yet supported.

HTTP/3 requires TLS v1.3. To enable HTTP/3 on a given port in APISIX, update the configuration file as such:

```yaml title="config.yaml"
apisix:
  ssl:
    listen:
      - port: 9443
        enable_http3: true
```

Next, configure TLS certificates between client and APISIX:

```shell
curl "http://127.0.0.1:9180/apisix/admin/ssls" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "id": "tls-client-ssl",
    "sni": "example.com",
    "cert": "'"${server_cert}"'",
    "key": "'"${server_key}"'"
  }'
 ```

For more information, see [PR #10989](https://github.com/apache/apisix/pull/10989), [PR #11010](https://github.com/apache/apisix/pull/11010), and [PR #11027](https://github.com/apache/apisix/pull/11027).

### Add plugin reload endpoint to Control API

The plugin reload endpoint, which previously existed in Admin API to hot reload all plugins, is now added to [Control API](https://apisix.apache.org/docs/apisix/next/control-api/#put-v1pluginsreload), such that the plugin reload can be called from control plane:

```shell
curl "http://127.0.0.1:9090/v1/plugins/reload" -X PUT
```

For backward compatibility, the plugin reload endpoint in Admin API is retained.

For more information, see [PR #10905](https://github.com/apache/apisix/pull/10905).

### Support setting session cookie lifetime in `openid-connect` plugin

You can now configure the session cookie lifetime in the `openid-connect` plugin as such:

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT -d '
{
  "id": "auth-with-oidc",
  "uri":"/anything/*",
  "plugins": {
    "openid-connect": {
      "client_id": "'"$OIDC_CLIENT_ID"'",
      "client_secret": "'"$OIDC_CLIENT_SECRET"'",
      "discovery": "'"$OIDC_DISCOVERY"'",
      "session": {
        "secret": "6S8IO+Pydgb33LIor8T9ClER0T/sglFAjClFeAF3RsY=",
        "cookie" : {
          "lifetime": 86400
        }
      },
      "redirect_uri": "http://localhost:9080/anything/callback"
    }
  },
  "upstream":{
    "type":"roundrobin",
    "nodes":{
      "httpbin.org:80":1
    }
  }
}'
```

This is to address the issue where the lifetime of the access token is longer than the session lifetime.

For more information, see [PR #10919](https://github.com/apache/apisix/pull/10919).

### Support setting expiration time for Prometheus metrics

You can now set the expiration time in seconds after Prometheus metrics have become inactive to reduce resource consumption:

```yaml title="config.yaml"
plugin_attr:
  prometheus:
    expire: 0    # time in seconds. 0 means the metrics will not expire.
```

For more information, see [PR #10869](https://github.com/apache/apisix/pull/10869).

### Support `redis` and `redis-cluster` policies in `limit-req` and `limit-conn` plugins

Support `redis` and `redis-cluster` policies in `limit-req` and `limit-conn` plugins, so that rate limiting counters can be shared among APISIX instances.

For more information, see [PR #10874](https://github.com/apache/apisix/pull/10874) and [PR #10866](https://github.com/apache/apisix/pull/10866).

### Support OCSP Stapling

Support OCSP stapling using the `ocsp-stapling` plugin.

For more information, see [plugin doc](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/ocsp-stapling.md) and [PR #10817](https://github.com/apache/apisix/pull/10817).

### Support transforming between HTTP and Dubbo

Support transforming between HTTP and Dubbo with the `http-dubbo` plugin.

For more information, see [PR #10703](https://github.com/apache/apisix/pull/10703).

## Other Updates

- Support EndpointSlice in Kubernetes service discovery ([PR #10916](https://github.com/apache/apisix/pull/10916))
- Add `cors_allow_headers` attribute to the `grpc-web` plugin to allow cross-origin resources ([PR #10904](https://github.com/apache/apisix/pull/10904))
- Allow customization of the error response code in the `forward-auth` plugin ([PR #10898](https://github.com/apache/apisix/pull/10898))
- Support the inclusion of request and response bodies in loggers ([PR #10888](https://github.com/apache/apisix/pull/10888))
- Support compressed responses in loggers ([PR #10884](https://github.com/apache/apisix/pull/10884))
- Support built-in variables in `response_headers` in the `mocking` plugin ([PR #10872](https://github.com/apache/apisix/pull/10872))
- Fix for unnecessary YAML config reloads ([PR #9065](https://github.com/apache/apisix/pull/9065))
- Prevent real payload to be overridden by malicious payload in the `jwt-auth` plugin ([PR #10982](https://github.com/apache/apisix/pull/10982))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#390).
