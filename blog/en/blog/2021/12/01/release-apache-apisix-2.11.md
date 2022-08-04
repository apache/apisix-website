---
title: "Release Apache APISIX 2.11.0"
authors:
  - name: "Zexuan Luo"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- Release
- WASM
- Azure
- LDAP
description: API Gateway Apache APISIX 2.11.0 version is released, which supports LDAP and datadog plugins and provides Wasm related support and other functions.
tags: [Community]
---

> Apache APISIX 2.11.0 is officially released, which is the first version with new features after 2.10.0 LTS.

<!--truncate-->

Apache APISIX 2.11.0 is the first release with new features since the last 2.10.0 LTS release. It not only enriches the plugin library, but also brings fresh ecological support.

## New feature: New LDAP-based authentication plugin

Apache APISIX has added a new member to its long list of authentication plugins - the LDAP-based `ldap-auth` plugin. With this plugin we can bridge the LDAP account system and the Apache APISIX Consumer mechanism.

Let's show a simple example from the code side.

```shell
curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "user01",
    "plugins": {
        "ldap-auth": {
            "user_dn": "cn=user01,ou=users,dc=example,dc=org"
        }
    }
}'
```

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/hello",
    "plugins": {
        "ldap-auth": {
            "base_dn": "ou=users,dc=example,dc=org",
            "ldap_uri": "localhost:1389",
            "uid": "cn"
        },
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

In the above configuration, we have bound `user01` to `route 1`. This way we can access `route 1` with the password of `user01` and be authenticated by LDAP.

The result looks like this.

```shell
curl -i -uuser01:password1 http://127.0.0.1:9080/hello
HTTP/1.1 200 OK
...
hello, world
```

## New feature: Observability level interfacing with more monitoring systems

The new version of Apache APISIX is enriched with support for external monitoring services. In this regard, we have added two new plugins.

* `datadog` plugin for reporting metrics to datadog
* `skywalking-logger` plug-in to report access logs to Apache Skywalking

Datadog is a widely used SaaS monitoring service overseas, while Apache Skywalking is a world-renowned open source monitoring software. Users can now interface with them with a simple configuration on their routes.

Datadog example:

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
      "plugins": {
            "datadog": {}
       },
      "upstream": {
           "type": "roundrobin",
           "nodes": {
               "127.0.0.1:1980": 1
           }
      },
      "uri": "/hello"
}'
```

Apache SkyWalking example:

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins":{
        "skywalking-logger":{
            "endpoint_addr":"http://127.0.0.1:12800"
        }
    },
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:1980":1
        }
    },
    "uri":"/hello"
}'
```

## New feature: Exposing FaaS functions for Azure through a gateway

The gateway can do more than just proxy internal services, we can also use it to connect to external systems.

Now with the `azure-functions` plugin, you can use HTTP requests to trigger functions on Azure functions services.

The following example shows how to connect a configured function on Azure to the `/azure_HttpTrigger` route on Apache APISIX.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins":{
        "azure-functions":{
            "function_uri":"http://test-apisix.azurewebsites.net/api/HttpTrigger",
            "authorization":{
                "apikey":"<Generated API key to access the Azure-Function>"
            }
        }
    },
    "uri":"/azure_HttpTrigger"
}'
```

The access to this route is equivalent to a function call on the FaaS platform. At the same time, we can add authentication, flow restriction and other corresponding restrictions to this process.

## New: WASM-related support

Initial support for WASM is now available in Apache APISIX. With the Proxy WASM SDK, we can write plugins that run inside Apache APISIX in languages other than Lua.

Unlike the previous external plug-in functionality, this mechanism runs inside Apache APISIX, so it is much better in terms of performance than before.

Using WASM plugins in Apache APISIX is like using Lua plugins, both of which support routing and global scoping. We have placed a WASM-based implementation of the `fault-injection` plugin in the Apache APISIX code repository, and interested readers can see how it differs from the Lua version of the plugin of the same name.

More technical details about Apache APISIX support for WASM can be found in [this article](https://apisix.apache.org/zh/blog/2021/11/19/apisix-supports-wasm).

The support for WASM in Apache APISIX is still in its early stages, and we will gradually improve and enrich the details in the next few releases.

## Improvements: Existing plug-ins are more feature-rich

In addition to the new features mentioned above, we have also improved the functionality of existing plugins for Apache APISIX, such as

* limit-req/conn/count and other plugins now support a set of variables as the key when limiting
* proxy-cache introduces a memory-based backend

For more details on the new features and components added to the plugin, please refer to the [Change log](https://github.com/apache/apisix/blob/release/2.11/CHANGELOG.md#2110) corresponding to this release.

## Download

Get the latest version of Apache APISIX 2.11.0, which can be downloaded and installed by:

* [Source code](https://apisix.apache.org/downloads/)
* [binary installer](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
