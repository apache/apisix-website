---
title: "HashiCorp Vault Secure Storage Backend in Apache APISIX Ecosystem"
authors:
  - name: "Bisakh Mondal"
    title: "Author"
    url: "https://github.com/bisakhmondal"
    image_url: "https://avatars.githubusercontent.com/u/41498427?v=4"
  - name: "Yilin Zeng"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords: 
- Apache APISIX
- HashiCorp
- Vault
- jwt-auth
- authentication
description: This article describe the upcoming release of the Vault with Apache APISIX integration, and show the details of configuration.
tags: [Authentication,Ecosystem,Plugins]
image: https://static.apiseven.com/2022/blog/0818/plugins/vault.png
---

> This article describe the upcoming release of the Vault with Apache APISIX integration, and show the details of configuration.

<!--truncate-->

With the rise of microservice-based architecture, keeping things secure has become much more challenging than earlier. We are far beyond the point where our 100 instances of backend servers are accessing our database server with a single static secret credential because if in case of a credential leakage the whole system is compromised and revocation of that credential causes a massive service outage (now no one can access anything unless the instances are reconfigured). We can't eliminate the possibility of a security breach because sometimes unexpected does happen. Instead, it's totally up to us to control the blast radius in these situations. To tackle scenarios like this, a popular solution like [HashiCorp Vault](https://www.vaultproject.io/) comes into the picture in a production environment to act as an identity-based secrets and encryption management system. In this article, I have demonstrated how to integrate Vault with Apache APISIX (a cloud-native API Gateway) [jwt-auth plugin](https://apisix.apache.org/docs/apisix/plugins/jwt-auth) to effectively use excellence from both worlds.

## What is Vault

HashiCorp Vault is designed to help organizations manage access to secrets and transmit them safely within an organization. Secrets are defined as any form of sensitive credentials that need to be tightly controlled and monitored and can be used to unlock sensitive information. Secrets could be in the form of passwords, API keys, SSH keys, RSA tokens, or OTP. In the real world where it is very common to have a secret sprawl where secrets get stored into the config file or as a variable in actual program code which as a consequence sometimes even end up in a version control system like GitHub, BitBucket or GitLab, possess a major threat in security. Vault solves this problem by centralizing secrets. It provides encrypted storage for static secrets, generation of dynamic secrets with a TTL lease, authentication of users (machines or humans) to make sure they’re authorized to access a particular secret and many more. So that even in case of a security breach the blast radius is much small and contained.

Vault makes it very easy to control and manage access by providing us with a unilateral interface to manage every secret in your infrastructure. Not only that, it also provides the flexibility to create detailed audit logs and keep track of who accessed what.

![HashiCorp Vault](https://static.apiseven.com/202108/1642770417379-a91960a5-5aac-45fa-9277-801a4ee2afc6.png)

## About APISIX jwt-auth Plugin

It is an authentication plugin that can be attached to any APISIX route to perform JWT (JSON web token, [read more](https://jwt.io/introduction)) authentication before the request gets forwarded to the upstream URI. In short, it is a secure authentication mechanism that leads to authorization to critical resources. Typically, a private key, or a text secret, is used by the issuer to sign the JWT. The receiver of the JWT will verify the signature to ensure that the token hasn’t been altered after it was signed by the issuer. The total integrity of the whole jwt mechanism depends on the signing secret (may it be a text secret of RSA keypairs). That makes it difficult for unauthenticated sources to guess the signing key and attempt to change the claims within the JWT.

So the storage of these keys in a secure environment is extremely crucial. Falling into wrong hands may jeopardize the security of the whole infrastructure. Though we from the APISIX side take all the means to follow standard SecOps practices, it's quite natural in the production environment to have a centralized key management solution like HashiCorp vault to have elaborate audit trails, periodic key rotation, key revocation etc. And it would be quite a troublesome issue if each time you have to update Apache APISIX configuration whenever a key rotation occurs throughout the infrastructure.

## Steps to Use Vault with Apache APISIX

For integration with Vault, Apache APISIX needs to be loaded with vault configuration at [config.yaml](https://github.com/apache/apisix/blob/master/conf/config.yaml).

Internally, APISIX communicates with vault server [KV secret engine v1](https://www.vaultproject.io/docs/secrets/kv/kv-v1) HTTP [APIs](https://www.vaultproject.io/api/secret/kv/kv-v1). As most enterprise solution prefers to stick with KV Secrets Engine - Version 1 in their production environment, during the initial phase of APISIX-Vault support we have gone with version 1 only. In later releases, we will add the support of K/V version 2.

The main idea of using vault, instead of the APISIX etcd backend is the security concern in a low trust environment. We, the APISIX developers, understand your priorities seriously. That's why we recommend using vault access tokens that are short scoped and can grant APISIX server limited access.

### Configure Vault

If you have already a Vault instance running with the necessary privileges, feel free to skip this section. This section shares the best practices to use Vault inside the Apache APISIX ecosystem. Please follow the steps mentioned below.

#### Step 1: Spin Up a Vault Server

Here you have multiple options, feel free to choose between docker, precompiled binary or building from source. As to communicate with the vault server, you need a vault CLI client, I would prefer going with precompiled binary instead of the Docker approach. Anyway, it's totally up to you (feel free to consult [Vault's official installation docs](https://www.vaultproject.io/docs/install)). To spin up a development server, please run the following command.

```shell
$ vault server -dev -dev-root-token-id=root
…
WARNING! dev mode is enabled! In this mode, Vault runs entirely in-memory
and starts unsealed with a single unseal key. The root token is already
authenticated to the CLI, so you can immediately begin using Vault.
You may need to set the following environment variable:
export VAULT_ADDR='http://127.0.0.1:8200'
The unseal key and root token are displayed below in case you want to
seal/unseal the Vault or re-authenticate.
Unseal Key: 12hURx2eDPKK1tzK+8TkgH9pPhPNJFpyfc/imCLgJKY=
Root Token: root
Development mode should NOT be used in production installations!
```

Set your current CLI with the correct environment variables.

```shell
$ export VAULT_ADDR='http://127.0.0.1:8200'
$ export VAULT_TOKEN='root'
```

Enable vault k/v version 1 secret engine backend with a suitable path prefix. In this demo, we are going to choose the `kv` path so that we don't have a collision with the vault default secret path for kv version 2.

```shell
$ vault secrets enable -path=kv -version=1 kv
Success! Enabled the kv secrets engine at: kv/


# To reconfirm the status, run
$ vault secrets list
Path          Type         Accessor              Description
----          ----         --------              -----------
cubbyhole/    cubbyhole    cubbyhole_4eeb394c    per-token private secret storage
identity/     identity     identity_5ca6201e     identity store
kv/           kv           kv_92cd6d37           n/a
secret/       kv           kv_6dd46a53           key/value secret storage
sys/          system       system_2045ddb1       system endpoints used for control, policy and debugging
```

#### Step 2: Generate a Vault Access Token for APISIX

This article is regarding using vault in `jwt-auth` plugin perspective. So, for an APISIX consumer (if you are unfamiliar with consumers in the APISIX ecosystem, please read the [document about Apache APISIX Consumer](https://apisix.apache.org/docs/apisix/terminology/consumer)) with username `jack` the `jwt-auth` plugin looks up (if enabled with vault configuration) for secret/s at `<vault.prefix inside config.yaml>/consumer/<consumer.username>/jwt-auth` into vault kv storage. In this context, if you are assigning `kv/apisix` namespace (vault path) as `vault.prefix` inside config.yaml for all apisix related data retrieval, we suggest you to create a policy for path `kv/apisix/consumer/*`. The extra asterisk (*) at the end ensure the policy allows read for any path that has a `kv/apisix/consumer` prefix.

Create a policy file in HashiCorp Configuration Language (HCL).

```shell
$ tee apisix-policy.hcl << EOF
path "kv/apisix/consumer/*" {
    capabilities = ["read"]
}
EOF
```

Applying the policy into vault instance.

```shell
$ vault policy write apisix-policy apisix-policy.hcl

Success! Uploaded policy: apisix-policy
```

Generate a token with the newly defined policy that has been configured with the small access boundary.

```shell
$ vault token create -policy="apisix-policy"


Key                  Value
---                  -----
token                s.KUWFVhIXgoRuQbbp3j1eMVGa
token_accessor       nPXT3q0mfZkLmhshfioOyx8L
token_duration       768h
token_renewable      true
token_policies       ["apisix-policy" "default"]
identity_policies    []
policies             ["apisix-policy" "default"]
```

In this demonstration `s.KUWFVhIXgoRuQbbp3j1eMVGa` is your access token.

### Adding vault configuration into Apache APISIX

As discussed earlier, Apache APISIX communicates with Vault instance through Vault HTTP APIs. The necessary configuration must be added into [config.yaml](https://github.com/apache/apisix/blob/master/conf/config.yaml).
Here is the brief information about different fields that you can use:

- host: The host address where the vault server is running.
- timeout: HTTP timeout for each request.
- token: The generated token from vault instance that can grant access to read data from the vault.
- prefix: enabling a prefix allows you to better enforcement of policies, generate limited scoped tokens and tightly control the data that can be accessed from APISIX. Valid prefixes are (`kv/apisix`, `secret` etc.)

```shell
vault:
  host: 'http://0.0.0.0:8200'
  timeout: 10
  token: 's.KUWFVhIXgoRuQbbp3j1eMVGa'
  prefix: 'kv/apisix'
```

### Create an APISIX Consumer

APISIX has a consumer-level abstraction that goes side by side with authentication scenarios. To enable authentication for any APISIX route, a consumer is needed with a suitable configuration for that specific type of authentication service. Then only APISIX can forward the request to the upstream URI by successfully performing authentication wrt. the consumer configuration. APISIX consumer has two fields - one is `username` (required) to identify one consumer from the others and another is `plugins` that holds the consumer specific plugin configurations.

Here, in this article, we will create a consumer with `jwt-auth` plugin. It performs JWT authentication for the respective route/s or service/s.

To enable `jwt-auth` with vault configuration, make a request to:

```shell
$ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "jwt-auth": {
            "key": "test-key",
            "vault": {}
        }
    }
}'
```

Here the plugin looks up for key secret inside vault path (`<vault.prefix from conf.yaml>/consumer/jack/jwt-auth`) for consumer `jack` mentioned in the consumer config and uses it for subsequent signing and jwt verification. If the key is not found in the same path, the plugin logs error and fails to perform jwt authentication.

#### Set Up a Test Upstream Server

To test the behaviour, you can create a route for an upstream (a simple ping handler that returns pong). You can set it up with a plain go HTTP-Server.

```go
// simple upstream server
package main


import "net/http"


func ping(w http.ResponseWriter, req *http.Request) {
    w.Write([]byte("secure/pong\n"))
}


func main() {
    http.HandleFunc("/secure/ping", ping)
    http.ListenAndServe(":9999", nil)
}
```

#### Create an APISIX Route with Authentication Enabled

Create an APISIX route with this secure ping HTTP server and `jwt-auth` authentication plugin enabled.

```shell
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "jwt-auth": {}
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:9999": 1
        },
        "type": "roundrobin"
    },
    "uri": "/secure/ping"
}'
```

#### Generate Token from jwt-auth Plugin

Now sign a jwt secret from APISIX that can be used and passed for making requests to the `http://localhost:9080/secure/ping` proxy route to the APISIX server.

```shell
$ curl http://127.0.0.1:9080/apisix/plugin/jwt/sign\?key\=test-key -i
HTTP/1.1 200 OK
Date: Tue, 18 Jan 2022 07:50:57 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.11.0


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ0ZXN0LWtleSIsImV4cCI6MTY0MjU3ODY1N30.nkyev1_KUapVgY_QVYETsSApA6gEkDWS8tsHFV1EpD8
```

In the previous step, if you see something like the `failed to sign jwt` message please make sure you have a secret key stored into vault `kv/apisix/consumers/jack/jwt-auth` path.

```shell
# example
$ vault kv put kv/apisix/consumer/jack/jwt-auth secret=$ecr3t-c0d3
Success! Data written to: kv/apisix/consumer/jack/jwt-auth
```

#### Request APISIX Server

Now, make a request to the APISIX proxy for route `/secure/ping`. Upon successful validation, it will forward the request to our go HTTP server.

```shell
$ curl http://127.0.0.1:9080/secure/ping -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ0ZXN0LWtleSIsImV4cCI6MTY0MjU3ODU5M30.IYudBr7FTgRme70u4rEBoYNtGmGByzgfGlt8hctI__Q' -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 12
Connection: keep-alive
Date: Tue, 18 Jan 2022 08:00:04 GMT
Server: APISIX/2.11.0


secure/pong
```

Any request without a valid jwt will throw an `HTTP 401 Unauthorized` error.

```shell
$ curl http://127.0.0.1:9080/secure/ping -i
HTTP/1.1 401 Unauthorized
Date: Tue, 18 Jan 2022 08:00:33 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.11.0


{"message":"Missing JWT token in request"}
```

### Different Use Cases Where Vault Can be Integrated with APISIX jwt-auth plugin

Apache APISIX `jwt-auth` plugin can be configured to fetch simple text secret keys as well as RS256 public-private key pairs from vault storage.

:::note
For the early version of this integration support, the plugin expects the key name of secrets stored into the vault path is among [ `secret`, `public_key`, `private_key`] to successfully use the key. In future releases, we are going to add the support of referencing custom-named keys.
:::

1. You have stored HS256 signing secret inside the vault and you want to use it for jwt signing and verification.

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "username": "jack",
        "plugins": {
            "jwt-auth": {
                "key": "key-1",
                "vault": {}
            }
        }
    }'
   ```

   Here the plugin looks up for key `secret` inside vault path (`<vault.prefix from conf.yaml>/consumer/jack/jwt-auth`) for consumer jack mentioned in the consumer config and uses it for subsequent signing and jwt verification. If the key is not found in the same path, the plugin logs an error and fails to perform jwt authentication.

2. RS256 RSA keypairs, both public and private keys are stored in the vault.

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "username": "jim",
        "plugins": {
            "jwt-auth": {
                "key": "rsa-keypair",
                "algorithm": "RS256",
                "vault": {}
            }
        }
    }'
   ```

   The plugin looks up for `public_key` and `private_key` keys inside vault kv path (`<vault.prefix from conf.yaml>/consumer/jim/jwt-auth`) for `jim` mentioned inside plugin vault configuration. If not found, authentication fails.

   If you are unsure, how to store public and private keys into vault kv storage, use this command

   ```shell
   # provided, your current directory contains the files named "public.pem" and "private.pem"
    $ vault kv put kv/apisix/consumer/jim/jwt-auth public_key=@public.pem private_key=@private.pem
    Success! Data written to: kv/apisix/consumer/jim/jwt-auth
   ```

3. Public key in consumer configuration, while the private key is in the vault.

   ```shell
   $ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "username": "john",
        "plugins": {
            "jwt-auth": {
                "key": "user-key",
                "algorithm": "RS256",
                "public_key": "-----BEGIN PUBLIC KEY-----\n……\n-----END PUBLIC KEY-----"
                "vault": {}
            }
        }
    }'
   ```

   This plugin uses RSA public key from consumer configuration and uses the private key directly fetched from the vault.

### Disable Vault from Plugin

Now, to disable the vault lookup from the `jwt-auth` plugin simply remove the empty vault object from the consumer plugin configuration (in this case it is `jack`). This will make the jwt plugin to lookup signing secrets (both HS256/HS512 or RS512 keypairs) into plugin configuration for subsequent requests to the URI route where the `jwt-auth` configuration has been enabled. Even if you have vault configuration enabled in APISIX `config.yaml` no request will be sent to the vault server.

APISIX plugins are hot-reloaded, therefore is no need to restart APISIX.

```shell
$ curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "jwt-auth": {
            "key": "test-key",
            "secret": "my-secret-key"
        }
    }
}'
```

## Summary

This article brings you the upcoming release of the Vault-Apache APISIX integration and related details.

Feel free to start a discussion in [GitHub Discussions](https://github.com/apache/apisix/discussions) or communicate via the [mailing list](https://apisix.apache.org/docs/general/join).

## Reference

[Bisakh's Blog](https://blog.bisakh.com/blog/vault-apisix-jwt-auth)
