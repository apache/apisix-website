---
title: "Release Apache APISIX 3.11.0"
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
description: The Apache APISIX 3.11.0 version is released on October 17, 2024. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.11.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This new release adds a number of new features, including the addition of AI plugins to integrate with LLM providers, the support for AWS and GCP Secret Managers for secret management, and more.

There are a few important changes included in this release. Should you find these changes impacting your operations, please plan accordingly for a seamless upgrade.

## Breaking Changes

### Remove JWT signing endpoint and private key configuration

Remove the `/apisix/plugin/jwt/sign` JWT signing endpoint previously added by the `jwt-auth` plugin for enhanced security. The plugin now does not require users to upload private keys for issuing JWTs. Please sign JWT with other utilities.

For more details, see [PR #11597](https://github.com/apache/apisix/pull/11597).

### Refactor `hmac-auth` plugin per RFC

The plugin implementation is now based on [draft-cavage-http-signatures](https://www.ietf.org/archive/id/draft-cavage-http-signatures-12.txt) and the configurable parameters have changed.

For more details, see the latest [plugin doc](https://apisix.apache.org/docs/apisix/plugins/hmac-auth/) and [PR #11581](https://github.com/apache/apisix/pull/11581)

## New Features

### Add Consumer credentials resource and introduce consumer identifiable headers

Add the credential resource to store authentication configurations associated with consumers. A consumer can be associated with one or more credentials from a designated list of authentication plugins, including `key-auth`, `basic-auth`, `jwt-auth`, and `hmac-auth`. The decoupling of credentials facilitates credential reuse and rotation as well as enhanced security.

For instance, suppose you have a consumer `tom`:

```shell
curl -i "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "username": "tom"
  }'
```

To configure the consumer `key-auth` credential for `tom`, you can use leverage the credential object:

```shell
curl "http://127.0.0.1:9180/apisix/admin/consumers/tom/credentials" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "id": "cred-tom-key-auth",
    "plugins": {
      "key-auth": {
        "key": "secret-key"
      }
    }
  }'
```

This feature does not introduce any breaking change. You may still configure the authentication plugin and their credential on consumer.

Additionally, APISIX will add additional headers, including `X-Consumer-Username`, `X-Credential-Identifier`, and optionally, `X-Consumer-Custom-ID` if configured, to the authenticated requests.

For more information, see the [credential doc](https://apisix.apache.org/docs/apisix/next/terminology/credential/) and [PR #11601](https://github.com/apache/apisix/pull/11601).

### Add new plugin `attach-consmer-label`

The new `attach-consumer-label` plugin attaches custom consumer-related labels, in addition to `X-Consumer-Username` and `X-Credential-Indentifier`, to authenticated requests, for upstream services to differentiate between consumers and implement additional logics.

For more information, see the [plugin doc](https://apisix.apache.org/docs/apisix/next/plugins/attach-consumer-label/) and [PR #11604](https://github.com/apache/apisix/pull/11604).

### Add new plugin `ai-proxy`

The new `ai-proxy` plugin simplifies access to LLM providers and models by transforming plugin configurations into the designated request format.

The plugin currently only supports transforming plugin configurations to the request format required by OpenAI and contributions are welcomed.

For more information, see the [plugin doc](https://apisix.apache.org/docs/apisix/next/plugins/ai-proxy/) and [PR #11499](https://github.com/apache/apisix/pull/11604).

### Add new plugin `ai-prompt-decorator`

The `ai-prompt-template` plugin supports the pre-configurations of prompt templates that only accept user inputs in designated template variables, in a "fill in the blank" fashion. The plugin is used when proxying to LLM services.

For more information, see the [plugin doc](https://apisix.apache.org/docs/apisix/next/plugins/ai-prompt-decorator/) and [PR #11515](https://github.com/apache/apisix/pull/11515).

### Add new plugin `ai-prompt-template`

The `ai-prompt-decorator` plugin decorates user input prompts by prefixing and appending pre-engineered prompts, to provide pre-set contexts in content generation. The practice helps shape how the model should operate within desired guidelines during the interactions. The plugin is used when proxying to LLM services.

For more information, see the [plugin doc](https://apisix.apache.org/docs/apisix/next/plugins/ai-prompt-template/) and [PR #11517](https://github.com/apache/apisix/pull/11517).

### Support customizing keepalive timeout in `splunk-logger` plugin

Support the configuration of keepalive timeout in `splunk-logger` plugin parameter to avoid sockets left open in high scale. If unconfigured, the default keepalive timeout will be 60000 milliseconds.

For more information, see [PR #11611](https://github.com/apache/apisix/pull/11611).

### Support AWS and GCP secret managers

Support the integration with [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) and [GCP Secret Manager](https://cloud.google.com/security/products/secret-manager?hl=en) for secrets management.

For more information on the support for AWS Secrets Manager, see [use AWS Secrets Manager to manage secrets](https://apisix.apache.org/docs/apisix/next/terminology/secret/#use-aws-secrets-manager-to-manage-secrets) and [PR #11417](https://github.com/apache/apisix/pull/11417).

For more information on the support for GCP Secret Manager, see [use GCP Secret Manager to manage secrets](https://apisix.apache.org/docs/apisix/next/terminology/secret/#use-gcp-secrets-manager-to-manage-secrets) and [PR #11436](https://github.com/apache/apisix/pull/11436).

## Other Updates

- Correct the position of enums in `pb_option_def` of the `grpc-transcode` plugin ([PR #11448](https://github.com/apache/apisix/pull/11448))
- Fix encryption/decryption errors when non-auth plugins are configured on consumers ([PR #11600](https://github.com/apache/apisix/pull/11600))
- Fix issues when substituting environment variables in config file ([PR #11545](https://github.com/apache/apisix/pull/11545))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3110).
