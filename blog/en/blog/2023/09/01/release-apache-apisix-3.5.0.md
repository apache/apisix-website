---
title: "Release Apache APISIX 3.5.0"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://avatars.githubusercontent.com/u/79972061?v=4"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://avatars.githubusercontent.com/u/39619599?v=4"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: The Apache APISIX 3.5.0 version is released on September 1, 2023. This release includes many exciting new features and improvements to user experiences.
tags: [Community]
---

We are pleased to present Apache APISIX 3.5.0 with exciting new features and improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including the dynamic configuration of TLS versions at the host level, integration with Chaitin WAF, forced deletion of resources, the use of environmental variables in configuration file when deploying APISIX in standalone mode, and more.

There are a few important changes included in this release. Should you find these changes impacting your operations, it is strongly recommended that you plan accordingly for a seamless upgrade.

## Breaking Changes

### Remove snowflake algorithm support in `request-id` plugin

Remove snowflake algorithm support in `request-id` plugin. The algorithm introduces an unnecessary dependency on etcd, which could significantly impact APISIX performance when etcd becomes unavailable. Please consider using the `uuid` option in algorithm instead.

For more background information, see the [proposal](https://lists.apache.org/thread/p4wwwwmtf024pnbccs5psncxg8yqvh9c) in the mailing list.

PR for this change is [#9715](https://github.com/apache/apisix/pull/9715).

### Remove the support for OpenResty 1.19

If you are currently using this version, please plan for an upgrade to OpenResty version 1.21 and above.

PR for this change is [#9913](https://github.com/apache/apisix/pull/9913).

### Improve the usability of L4 and L7 proxies and remove `apisix.stream_proxy.only`

Improve the usability of L4 and L7 proxies. This change removes the `apisix.stream_proxy.only` option and simplifies the usage to enable and disable L4 and L7 proxies.

L4 and L7 proxies are now be enabled as follows in the `config.yaml` file:

- To enable L7 proxy (enabled by default): `apisix.proxy_mode: http`
- To enable L4 proxy: `apisix.proxy_mode: stream`
- To enable both L7 and L4 proxy: `apisix.proxy_mode: http&stream`

For more information about how to work with stream proxy after the change, see [how to enable stream proxy](https://apisix.apache.org/docs/apisix/next/stream-proxy/#how-to-enable-stream-proxy).

PR for this change is [#9607](https://github.com/apache/apisix/pull/9607).

### Do not allow the use of `allowlist` and `denylist` at the same time in `ua-restriction` plugin

The use of `allowlist` and `denylist` in `ua-restriction` plugin is now mutually exclusive. You should configure only one of the two options.

PR for this change is [#9841](https://github.com/apache/apisix/pull/9841).

### Refactor and improve the plugin interface in Admin API

The interface of getting properties of all plugins via `/apisix/admin/plugins?all=true` will be deprecated soon. Going forward, Admin API will only support getting properties of one plugin at a time. It is recommended that you use the following endpoint and parameters for your requirements:

```text
/apisix/admin/plugins/{plugin_name}?subsystem={subsystem}
```

The `subsystem` parameter is optional and defaults to `http` if not configured. The value could be set to `http`, `stream` or `http&stream`, corresponding to plugins available on L7 and/or L4.

Alternatively, you could use /v1/schema to obtain and parse schema for all plugins in the [Control API](https://apisix.apache.org/docs/apisix/control-api/#get-v1schema).

If you would like to obtain a list of plugin names only, you may do so with the following:

```
/apisix/admin/plugins/list?subsystem={subsystem}
```

For more details, see [Plugins](https://apisix.apache.org/docs/apisix/next/admin-api/#plugin) in Admin API.

PR for this change is [#9580](https://github.com/apache/apisix/pull/9580).

## New Features

### Support the dynamic configuration of TLS versions at the host level

Support the configuration of TLS versions for individual SNI at runtime. The configuration takes precedence over the `ssl_protocols` static configurations in `config-default.yaml` or `config.yaml` and does not require a reloading of the APISIX, providing a more fine-grained approach to integrate with your infrastructure.

For example, you can configure the domain `test.com` to accept TLS connections with TLS versions 1.2 and 1.3 with the following:

```shell
curl http://127.0.0.1:9180/apisix/admin/ssls/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "cert": "$cert",
    "key": "$key",
    "snis": ["test.com"],
    "ssl_protocols": [
        "TLSv1.2",
        "TLSv1.3"
    ]
  }'
```

For more information about the feature and examples, see [SSL Protocol](https://apisix.apache.org/docs/apisix/next/ssl-protocol/).

PR for this feature is [#9903](https://github.com/apache/apisix/pull/9903).

### Support forced deletion of resources

Support forced deletion of resources with Admin API. By default, the Admin API checks for references between resources and does not allow the deletion of resources in use.

With this new feature, you can make a force deletion by sending a DELETE request with URL parameter `force=true`, such as the following:

```shell
curl "http://127.0.0.1:9180/apisix/admin/upstreams/1?force=true" -X DELETE \
  -H "X-API-KEY: ${ADMIN_API_KEY}"
```

For more information about the feature and examples, see [Force Delete](https://apisix.apache.org/docs/apisix/next/admin-api/#force-delete).

PR for this feature is [#9810](https://github.com/apache/apisix/pull/9810).

### Support environment variables in `apisix.yaml`

Support the use of environment variables in `apisix.yaml`.

For example, you can set the host IP and port of the upstream service as enviornment variables and use the variables in `apisix.yaml` as follows:

```shell
routes:
  -
    uri: "/test"
    upstream:
      nodes:
        "${{HOST_IP}}:${{PORT}}": 1
      type: roundrobin
#END
```

For more information about the feature and examples, see [Using Environment Variables](https://apisix.apache.org/docs/apisix/next/admin-api/#using-environment-variables) in Admin API.

PR for this feature is [#9855](https://github.com/apache/apisix/pull/9855).

### Add schema validation endpoint in Admin API

Add an `/apisix/admin/schema/validate/{resource}` endpoint to the Admin API to validate the schema of a configuration. You can now verify the configuration correctness without sending a request to the endpoint for resource creation.

For example, you can validate the schema of a route with the following:

```shell
curl http://127.0.0.1:9180/apisix/admin/schema/validate/routes -i -X POST \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "uri": 1980,
    "upstream": {
        "scheme": "https",
        "type": "roundrobin",
        "nodes": {
          "nghttp2.org": 1
        }
     }
  }'
```

As this schema is incorrect, you should see a response similar to the following:

```text
HTTP/1.1 400 Bad Request
...
{"error_msg":"property \"uri\" validation failed: wrong type: expected string, got number"}
```

For more information about the feature and examples, see [Schema Validation](https://apisix.apache.org/docs/apisix/next/admin-api/#schema-validation) in Admin API.

PR for this feature is [#10065](https://github.com/apache/apisix/pull/10065).

### Support integration with Chaitin WAF with the `chaitin-waf` plugin

Support the integration with Chaitin WAF with the `chaitin-waf` plugin, which forwards the gateway traffic to Chaitin WAF for inspection and detection of malicious traffic.

For example, you can configure the address of Chaitin WAF on a plugin metadata, which is referenced by all the  `chaitin-waf` plugin instances. Configure the `host` to be a Chaitin SafeLine WAF detection service host, unix domain socket, IP, or domain; as well as the `port`, such as the following:

```shell
curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/chaitin-waf -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
  "nodes":[
      {
        "host": "unix:/path/to/safeline/resources/detector/snserver.sock",
        "port": 8000
      }
    ]
  }'
```

You can then enable the plugin on a route and only forward traffic that matches the specified conditions to WAF:

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
   "uri": "/*",
   "plugins": {
       "chaitin-waf": {
           "match": [
                {
                  "vars": [
                    ["http_waf","==","true"]
                  ]
                }
            ]
        }
    },
   "upstream": {
       "type": "roundrobin",
       "nodes": {
          "httpbun.org:80": 1
        }
     }
  }'
```

If a potential malicious request is detected, such as the following request, which attempts an injection attack:

```shell
curl -i "http://127.0.0.1:9080/getid=1%20AND%201=1" \
  -H "Host: httpbun.org" \
  -H "waf: true"
```

You should see a response similar to the following:

```text
HTTP/1.1 403 Forbidden
...
X-APISIX-CHAITIN-WAF: yes
X-APISIX-CHAITIN-WAF-TIME: 2
X-APISIX-CHAITIN-WAF-ACTION: reject
X-APISIX-CHAITIN-WAF-STATUS: 403
...
{"code": 403, "success":false, "message": "blocked by Chaitin SafeLine Web Application Firewall", "event_id": "51a268653f2c4189bfa3ec66afbcb26d"}
```

For more information about the feature and examples, see [`chaitin-waf`](https://apisix.apache.org/docs/apisix/next/plugins/chaitin-waf/) plugin doc.

PR for this feature is [#9838](https://github.com/apache/apisix/pull/9838).

## Other Updates

- Support the configuration of proxy servers in `openid-connect` plugin ([PR #9948](https://github.com/apache/apisix/pull/9948))
- Support sending response headers from the OPA server to upstream services in the `opa` plugin ([PR #9710](https://github.com/apache/apisix/pull/9710))
- Support the use of vars in the `file-logger` plugin to allow conditional logging ([PR #9712](https://github.com/apache/apisix/pull/9712))
- Support the configuration of response headers in the `mocking` plugin ([PR #9720](https://github.com/apache/apisix/pull/9720))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/release/3.5/CHANGELOG.md#350).
