---
title: "Release Apache APISIX 3.10.0"
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
description: The Apache APISIX 3.10.0 version is released on August 14, 2024. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.10.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including the support for add-on headers in the `openid-connect` plugin, storing SSL certs and keys in secrets manager, autogeneration of Admin API key, and more.

There are a few important changes included in this release. Should you find these changes impacting your operations, please plan accordingly for a seamless upgrade.

## Breaking Changes

### Autogenerate Admin API key if not configured

The default Admin API key `edd1c9f034335f136f87ad84b625c8f1` is now removed. If no custom Admin API key is configured in `config.yaml`, APISIX will autogenerate an Admin API key.

For more details, see [PR #11080](https://github.com/apache/apisix/pull/11080).

### Enable data encryption by default

The `data_encryption.enable_encrypt_fields` option, previously defaults to `false`, now defaults to `true` to enhance data security. This means that by default, sensitive plugin fields (defined in the `encrypt_fields` attribute of plugin schema) and TLS certificate private key are now encrypted.

The configuration only applies when the configuration center is etcd. Encryption does not take place when the configuration center is YAML (i.e. standalone mode) to avoid unexpected failures.

For more details, see [PR #11076](https://github.com/apache/apisix/pull/11076).

### Categorize more sensitive plugin fields for encryption

Categorize more sensitive plugin data fields under the `encrypt_fields` attributes, which should be encrypted when `data_encryption.enable_encrypt_fields` option is set to `true`.

For more information, see [PR #11095](https://github.com/apache/apisix/pull/11095).

### Introduce max request and response body sizes to `kafka-logger` plugin

Introduce maximum request and response body size attributes `max_req_body_bytes` and `max_resp_body_bytes` to the `kafka-logger` plugin. The default values are set to 524288 bytes, or 512 KiB.

This helps mitigates the situation when `include_req_body` or `include_resp_body` is enabled and the request or response body is very large, leading to high CPU usage.

For more details, see [PR #11133](https://github.com/apache/apisix/pull/11133).

### Remove `core.grpc` module

As the `core.grpc` module is observed to be unstable in production and APISIX no longer depends on it, this release removes the module.

For users that depend on the gRPC module for custom functionalities, please plan accordingly.

For more details, see [proposal](https://lists.apache.org/thread/05xvcbvty1txr1owx61vyktsmgs2pdd5) and [PR #11427](https://github.com/apache/apisix/pull/11427).

## New Features

### Support add-on headers in the `openid-connect` plugin

You can now append additional header values to the introspection request in the `introspection_addon_headers` field when working with the `openid-connect` plugin.

For more information, see [PR #11090](https://github.com/apache/apisix/pull/11090).

### Print warning message in log when requesting external services without TLS

If you request external services without TLS, for example, using the `authz-casdoor` plugin, you should now see warning messages similar to the following in the error log:

```text
Using authz-casdoor endpoint_addr with no TLS is a security risk
Using authz-casdoor callback_url with no TLS is a security risk
```

For more information, see [PR #11403](https://github.com/apache/apisix/pull/11403).

### Support storing SSL certs and keys in secrets manager

Support storing certificates `certs` and private keys `keys` on SSL resource in secrets manager. In the earlier releases, only `cert` and `key` support secrets manager.

You can now configure a SSL resource such as the following:

```shell
curl "http://127.0.0.1:9180/apisix/admin/ssls" -X PUT -d '
{
  "id": "sample-ssl",
  "sni": "test.com",
  "cert": "$secret://vault/test/ssl/test.com.crt",
  "key": "$secret://vault/test/ssl/test.com.key",
  "certs": ["$secret://vault/test/ssl/test.com.crt"],
  "keys": ["$secret://vault/test/ssl/test.com.key"]
}'
```

For more information, see [PR #11339](https://github.com/apache/apisix/pull/11339).

### Support HashiCorp Vault namespace

Support specifying HashiCorp Vault namespace in SSL resource, for example:

```shell
curl "http://127.0.0.1:9180/apisix/admin/ssls" -X PUT -d '
{
  "id": "sample-ssl",
  "sni": "test.com",
  "certs": "$secret://vault/test/ssl/test.com.crt",
  "keys": "$secret://vault/test/ssl/test.com.key"],
  "namespace": "apisix"
}'
```

For more information, see [PR #11277](https://github.com/apache/apisix/pull/11277).

### Add K8s discovery memory dump endpoint to Control API

The Control API now offers a new endpoint `/v1/discovery/kubernetes/dump` to see the nodes discovered by K8s discovery. For example:

```shell
curl http://127.0.0.1:9090/v1/discovery/kubernetes/dump | jq
```

You will see the discovered node information:

```json
{
  "endpoints": [
    {
      "endpoints": [
        {
          "value": "{\"https\":[{\"host\":\"172.18.164.170\",\"port\":6443,\"weight\":50},{\"host\":\"172.18.164.171\",\"port\":6443,\"weight\":50},{\"host\":\"172.18.164.172\",\"port\":6443,\"weight\":50}]}",
          "name": "default/kubernetes"
        },
        {
          "value": "{\"metrics\":[{\"host\":\"172.18.164.170\",\"port\":2379,\"weight\":50},{\"host\":\"172.18.164.171\",\"port\":2379,\"weight\":50},{\"host\":\"172.18.164.172\",\"port\":2379,\"weight\":50}]}",
          "name": "kube-system/etcd"
        },
        {
          "value": "{\"http-85\":[{\"host\":\"172.64.89.2\",\"port\":85,\"weight\":50}]}",
          "name": "test-ws/testing"
        }
      ],
      "id": "first"
    }
  ],
  "config": [
    {
      "default_weight": 50,
      "id": "first",
      "client": {
        "token": "xxx"
      },
      "service": {
        "host": "172.18.164.170",
        "port": "6443",
        "schema": "https"
      },
      "shared_size": "1m"
    }
  ]
}
```

For more information, see [PR #11111](https://github.com/apache/apisix/pull/11111).

## Other Updates

- Use LRU cache in secret fetching to improve performance ([PR #11201](https://github.com/apache/apisix/pull/11201))
- Move default configurations in `config-default.yaml` to a hardcoded Lua file ([PR #11343](https://github.com/apache/apisix/pull/11343))
- Fix etcd sync data checker ([PR #11457](https://github.com/apache/apisix/pull/11457))
- Add plugin metadata ID to avoid the etcd checker failure ([PR #11452](https://github.com/apache/apisix/pull/11452))
- Allow trailing period in SNI and CN for SSL ([PR #11414](https://github.com/apache/apisix/pull/11414))
- Upgrade `lua-protobuf` dependency version to filter out illegal `INT(string)` formats in the `grpc-transcode` plugin ([PR #11367](https://github.com/apache/apisix/pull/11367))
- Rectify the error message when API key is missing ([PR #11370](https://github.com/apache/apisix/pull/11370))
- Fix the failure of reporting consumer username tag using the `datadog` plugin ([PR #11354](https://github.com/apache/apisix/pull/11354))
- Fix request error caused by SSL key rotation ([PR #11305](https://github.com/apache/apisix/pull/11305))
- Ensure that all etcd events are handled properly ([PR #11268](https://github.com/apache/apisix/pull/11268))
- Fix stream route matcher being `nil` after the first match ([PR #11269](https://github.com/apache/apisix/pull/11269))
- Rectify the way to fetch secret resource by ID ([PR #11164](https://github.com/apache/apisix/pull/11164))
- Fix the 500 error thrown when using the default configuration in the `multi-auth` plugin ([PR #11145](https://github.com/apache/apisix/pull/11145))
- Avoid overwriting the `Access-Control-Expose-Headers` response header in the `cors` plugin ([PR #11136](https://github.com/apache/apisix/pull/11136))
- Close session in case of error to avoid blocked session ([PR #11089](https://github.com/apache/apisix/pull/11089))
- Restore pb state before other operations in the kafka pubsub module ([PR #11135](https://github.com/apache/apisix/pull/11135))
- Add a default limit of 100 for request headers to limit security risks ([PR #11140](https://github.com/apache/apisix/pull/11140))
- Allow disabling prometheus metric export server when `prometheus` plugin is turned off ([PR #11117](https://github.com/apache/apisix/pull/11117))
- Add POST request headers only if the `request_method` is set to POST in the `forward-auth` plugin ([PR #11021](https://github.com/apache/apisix/pull/11021))
- Fix the 500 error in the `hmac-auth` plugin when using duplicate signature header ([PR #11127](https://github.com/apache/apisix/pull/11127))
- Fix brotli partial response ([PR #11087](https://github.com/apache/apisix/pull/11087))
- Update the upstream schema to disallow port value greater than 65535 ([PR #11043](https://github.com/apache/apisix/pull/11043))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3100).
