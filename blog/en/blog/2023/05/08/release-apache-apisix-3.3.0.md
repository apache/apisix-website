---
title: "Release Apache APISIX 3.3.0"
authors:
  - name: "Yuanhao Zeng"
    title: "Author"
    url: "https://github.com/leslie-tsang"
    image_url: "https://avatars.githubusercontent.com/u/59061168?v=4"
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: The Apache APISIX 3.3.0 version is officially released on April 30. This version provides better performance in multi-domain matching scenarios.
tags: [Community]
---

> The Apache APISIX 3.3.0 version is officially released. This version provides better performance in multi-domain matching scenarios.

<!--truncate-->

## APISIX 3.3.0 New Features

After a month, the new version came again. APISIX 3.3.0 is the first new version since the LTS version 3.2.0. In the new era of 3.x, we will continue to provide you with more new features.

The version 3.3.0 changes the default route matching mode from `radixtree_uri` to `radixtree_host_uri`, which provides better performance in multi-domain matching scenarios. As usual, many features are added to optimize the experience of using APISIX.

## New Features

### Support for storing routing certificates in secrets manager

APISIX 3.3.0 version supports loading certificates from Vault, which provides better security guarantees.

Step 1: Configure Vault Parameters

```
$ curl http://127.0.0.1:9180/apisix/admin/secrets/vault/test1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "http://127.0.0.1:8200",
    "prefix": "kv/apisix",
    "token" : "root"
}'
```

Step 2: Use `$secret://` syntax on the SSL object to refer to the configuration of the vault-related path, and APISIX will obtain the relevant certificate from the corresponding vault resource path.

```
$ curl http://127.0.0.1:9180/apisix/admin/ssls/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "cert": "$secret://vault/test1/ssl/test2.com.crt",
    "key": "$secret://vault/test1/ssl/test2.com.key",
    "sni": "test2.com"
}'
```

Finally, configure the above SSL object on the specific route, and the route certificate can be loaded from the vault.

### Support for bypassing Admin API authentication via configuration

By default, APISIX will check `X-API-KEY`, now you can turn off the `admin_key_required` configuration item in the configuration file to turn off related checks.

Step 1: Modify the config.yaml configuration file

```
...
deployment:
  admin:
    admin_key_required: false
...
```

Step 2: Access resources without using admin key

```
curl -v http://127.0.0.1:9180/apisix/admin/routes
```

In this way, the complexity of development and debugging can be simplified.

### Optimization and more small features

In addition to the several major features mentioned above, this release also includes many changes worth mentioning:

* Support request header injection in fault-injection plugin
* Provide support for referencing variables captured by route rewrite in proxy-rewrite plugin in other plugins
* The limit-count plugin provides username and ssl redis authentication methods

If you are interested in the complete update details of the new release, please refer to the [CHANGELOG](https://github.com/apache/apisix/blob/release/3.3/docs/zh/latest/CHANGELOG.md released in 3.3.0 #330) of the 3.3.0 release.
