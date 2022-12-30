---
title: "Release Apache APISIX 3.1.0"
authors:
  - name: "Zexuan Luo"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://github.com/spacewander.png"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- security
- Custom plugin
- gRPC
- Consul
description: Apache APISIX 3.1.0 is officially released! This version brings a lot of functional support on the security level and adds a built-in debugging plugin, to optimize the experience of using APISIX.
tags: [Community]
---

> Apache APISIX 3.1.0 is officially released! This version brings a lot of functional support on the security level and adds a built-in debugging plugin, to optimize the experience of using APISIX.

<!--truncate-->

After a month, a new version is here. This time APISIX 3.1.0 is the first new version since the big 3.0 release. As always, in the new era of 3.x, we present you with more new features in each version.

This release, 3.1.0, adds support for encrypted storage of plugin configurations and storage on external security services, focusing on enabling users to use their configurations more securely and with greater confidence. On top of this, we have also introduced several new features designed to optimize your experience with APISIX.

## New feature: encrypted storage of plugin configuration

The new version supports encrypted storage of plugin-specific fields in etcd.

In previous versions, APISIX provided a `key_encrypt_salt` configuration item to support encryption of SSL keys stored inside etcd to avoid storing private key data in plaintext.

After all, for sensitive data such as private keys, one less place to store plaintext can provide more peace of mind. So for other equally sensitive configurations, such as the secret in the `jwt-auth` plugin, can we also encrypt it to avoid storing it in plaintext in etcd?

Version 3.1 extends the encrypted storage feature to other fields. With this feature, we can specify the fields that need to be encrypted on a particular plugin and then turn on encryption in the config.yaml file to avoid storing plaintext.

As an example, we add the following token to the `jwt-auth` plugin.

```lua
     encrypt_fields = {"secret", "private_key"},
```

When we enable encryption of fields in `config.yaml`:

```yaml
apisix:
    data_encryption:
        enable: true
        keyring:
            - edd1c9f0985e76a2
```

Then the secret and private_key in the configuration of the `jwt-auth` plugin written to etcd will be stored encrypted. The configuration seen via `etcdctl get --prefix /` will be something like ""secret": "77+NmbYqNfN+oL..."" Instead of the original configuration information, this is the data.

## New feature: storing sensitive information in an external security service

In addition to storing sensitive information encrypted in etcd, there is also the option to dynamically retrieve sensitive information from another system instead of requiring it to be stored in APISIX's configuration store (e.g. etcd).

In version 3.1, we introduced a feature called APISIX Secret, which allows users to store secret in APISIX through some key management services (Vault, etc.) and read it according to the key at the time of use, ensuring that the secret does not exist in plaintext throughout the platform.

APISIX currently supports storing secret through the following methods.

- Environment variables
- HashiCorp Vault

### Related examples

Using the `key-auth` plugin as an example, let's demonstrate how to use the feature.

#### Environment variable-based sensitive information storage

Step 1: Create environment variables before starting the APISIX instance

```shell
export JACK_AUTH_KEY=abc
```

Step 2: Reference the environment variables in the `key-auth` plugin

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "$ENV://JACK_AUTH_KEY"
        }
    }
}'
```

The above steps allow you to save the key configuration in the `key-auth` plugin in an environment variable instead of explicitly displaying it when configuring it.

#### Vault-based storage of sensitive information

Step 1: Create the corresponding configuration in Vault, which can be done with the following command.

```shell
vault kv put apisix/jack auth-key=value
```

Step 2: Add the Secret resource via the Admin API and configure the Vault's address and other connection information.

```shell
curl http://127.0.0.1:9180/apisix/admin/secrets/vault/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "https://127.0.0.1:8200"，
    "prefix": "apisix",
    "token": "root"
}'
```

Step 3: Refer to the APISIX Secret resource in the `key-auth` plugin and populate the location in the Vault with the following configuration.

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "$secret://vault/1/jack/auth-key"
        }
    }
}'
```

With the above steps, you can save the key configuration in the `key-auth` plugin in the Vault instead of explicitly displaying it when configuring it.

## New Feature: Experimental gRPC-based etcd Configuration Synchronization

In this new release, we have also introduced experimental gRPC-based etcd configuration synchronization. The current APISIX configuration for synchronizing etcd is based on HTTP long pulling, which requires etcd to have gRPC-gateway enabled (fortunately, it is enabled by default).

In practice, we encountered problems with etcd's HTTP API, perhaps because synchronizing the configuration via HTTP is not the mainstream way of using etcd, so it is more likely to encounter bugs.

In addition, since gRPC itself provides multiplexing support, switching to gRPC synchronization can significantly reduce the number of APISIX connections to etcd.

Currently, APISIX synchronization requires a separate HTTP connection for each type of configuration. Switching to gRPC results in only one connection per process for configuration synchronization (two if the L4 proxy is enabled).

To enable experimental gRPC-based configuration synchronization, set `use_grpc: true` in the configuration file `config.yaml`.

```yaml
  etcd:
    use_grpc: true
    timeout: 3600
    host:
      - "http://127.0.0.1:2379"
    prefix: "/apisix"
```

## New Feature: Consul-based Service Discovery

In previous versions of APISIX, enthusiastic contributors provided a Consul KV-based service discovery implementation. However, Consul KV is a bit different from Consul's own service discovery, which supports additional features such as health checks for registered services, so it is more widely used.

In this 3.1 release, another enthusiastic contributor has provided Consul-based service discovery to fill this gap.

Consul-based service discovery has a similar configuration to Consul KV-based service discovery in previous versions. First, the service discovery needs to be enabled in the `config.yaml` file.

```yaml
discovery:
  consul:
    servers:
      - "http://127.0.0.1:8500"

```

Then, configure the `service_name` and `discovery_type` in the specific upstream.

```shell
curl http://127.0.0.1:9180/apisix/admin/upstreams/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "service_name": "service_a",
    "discovery_type": "consul"
}'
```

The corresponding upstream is used to get the real upstream node based on the values configured in Consul.

## New feature: built-in debugging plugins

Debugging is a part of programmers' daily work. As a gateway focusing on debugging experience, APISIX has a built-in Lua debugger plugin in the form of a plug-in in version 3.1, which supports dynamically setting breakpoints, adding callbacks, and so on.

The default configuration is as follows.

```yaml
plugins:
    ...
    - inspect
    ...

plugin_attr:
  inspect:
    delay: 3
    hooks_file: "/usr/local/apisix/plugin_inspect_hooks.lua"
```

APISIX periodically looks at the configured hooks_file (in this case is `/usr/local/apisix/plugin_inspect_hooks.lua` file) after startup. If there is the content inside the file, it sets breakpoints and callbacks based on the content inside. For example, the following will set a breakpoint on line 88 of `limit-req.lua` file and register the callback function `function(info) ... end`.

```lua
local dbg = require "apisix.inspect.dbg"

dbg.set_hook("limit-req.lua", 88, require("apisix.plugins.limit-req").access, function(info)
    ngx.log(ngx.INFO, debug.traceback("foo traceback", 3))
    return true
end)
```

## New features: optimizations and more small features

In addition to the big features mentioned above, this release contains several changes worth mentioning.

- Optimization of resource usage for Prometheus metrics collection
- Support for configuring domain names as upstream in L4 proxies

If you are interested in the full update details of the new release, please refer to the [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#310) of the 3.1.0 release.
