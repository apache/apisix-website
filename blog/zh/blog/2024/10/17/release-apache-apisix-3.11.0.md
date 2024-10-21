---
title: "Apache APISIX 3.11.0 正式发布"
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
description: Apache APISIX 3.11.0 版本于 2024 年 10 月 17 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.11.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

此新版本增加了许多新功能，包括添加一系列 AI 插件以与 LLM 提供商集成、支持 AWS 和 GCP Secret Manager 进行秘密管理等等。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### 删除 JWT 签名端点和私钥配置

删除先前由 `jwt-auth` 插件添加的 `/apisix/plugin/jwt/sign` JWT 签名端点，以增强安全性。该插件现在不需要用户上传私钥来颁发 JWT。请使用其他程式签署 JWT。

有关更多详细信息，请参阅 [PR #11597](https://github.com/apache/apisix/pull/11597)。

### 根据 RFC 重构 `hmac-auth` 插件

该插件实现现在基于 [draft-cavage-http-signatures](https://www.ietf.org/archive/id/draft-cavage-http-signatures-12.txt)，并且可配置参数已变动。

有关更多详细信息，请参阅最新的[插件文档](https://apisix.apache.org/zh/docs/apisix/plugins/hmac-auth/)以及 [PR #11581](https://github.com/apache/apisix/pull/11581)

### 添加消费者凭证实体

添加凭据对象以存储与消费者关联的身份验证配置。消费者可以与指定的身份验证插件列表中的一个或多个凭据相关联，包括`key-auth`、`basic-auth`、`jwt-auth` 和 `hmac-auth`。凭据的分离有利于凭据的重用和轮换以及增强的安全性。

例如，假设您有一个消费者 `tom` ：

```shell
curl -i "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "username": "tom"
  }'
```

要为 `tom` 配置消费者 `key-auth` 凭证，您可以使用凭证对象：

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

此功能不会引入任何重大更改。您仍可以在消费者上配置身份验证插件及其凭据。

此外，APISIX 将向经过身份验证的请求添加其他标头，包括 `X-Consumer-Username`、`X-Credential-Identifier` 以及 `X-Consumer-Custom-ID`（如果配置）。

有关更多信息，请参阅[文档](https://apisix.apache.org/docs/apisix/next/terminology/credential/) 和 [PR #11601](https://github.com/apache/apisix/pull/11601)。

### 添加新插件 `attach-consmer-label`

除了 `X-Consumer-Username` 和 `X-Credential-Indentifier` 之外，新的 `attach-consumer-label` 插件还会将自定义消费者相关标签附加到经过身份验证的请求中，以便上游服务区分消费者并实现其他逻辑。

有关更多信息，请参阅[插件文档](https://apisix.apache.org/docs/apisix/next/plugins/attach-consumer-label/)和[PR #11604](https://github.com/apache/apisix/pull/11604)。

### 添加新插件 `ai-proxy`

新插件 `ai-proxy` 通过将插件配置转换为指定的请求格式，简化了对 LLM 提供程序和模型的访问。

该插件目前仅支持将插件配置转换为 OpenAI 所需的请求格式，欢迎贡献。

有关更多信息，请参阅[插件文档](https://apisix.apache.org/docs/apisix/next/plugins/ai-proxy/) 和 [PR #11499](https://github.com/apache/apisix/pull/11604)。

### 添加新插件 `ai-prompt-decorator`

`ai-prompt-template` 插件支持提示模板的预配置，这些模板仅以“填空”方式接受指定模板变量中的用户输入。代理到 LLM 服务时使用该插件。

有关更多信息，请参阅[插件文档](https://apisix.apache.org/docs/apisix/next/plugins/ai-prompt-decorator/) 和 [PR #11515](https://github.com/apache/apisix/pull/11515)。

### 添加新插件 `ai-prompt-template`

`ai-prompt-decorator` 插件通过为预先设计的提示添加前缀和附加内容来修饰用户输入提示，以在内容生成中提供预设上下文。该实践有助于塑造模型在交互过程中应如何在所需的指导方针内运行。代理到 LLM 服务时使用该插件。

有关更多信息，请参阅[插件文档](https://apisix.apache.org/docs/apisix/next/plugins/ai-prompt-template/)和[PR #11517](https://github.com/apache/apisix/pull/11517)。

### 支持在 `splunk-logger` 插件中自定义 keepalive 超时

支持在 `splunk-logger` 插件参数中配置 keepalive 超时，以避免套接字在大规模情况下保持打开状态。如果未配置，默认 keepalive 超时将为 60000 毫秒。

有关更多信息，请参阅[PR #11611](https://github.com/apache/apisix/pull/11611)。

### 支持 AWS 和 GCP Secret Manager

支持与 [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) 和 [GCP Secret Manager](https://cloud.google.com/security/products/secret-manager?hl=en) 集成以进行机密管理。

有关对 AWS Secrets Manager 的支持的更多信息，请参阅 [使用 AWS Secrets Manager 管理机密](https://apisix.apache.org/docs/apisix/next/terminology/secret/#use-aws-secrets-manager-to-manage-secrets) 和 [PR #11417](https://github.com/apache/apisix/pull/11417)。

有关对 GCP Secret Manager 的支持的更多信息，请参阅 [使用 GCP Secret Manager 管理机密](https://apisix.apache.org/docs/apisix/next/terminology/secret/#use-gcp-secrets-manager-to-manage-secrets) 和 [PR #11436](https://github.com/apache/apisix/pull/11436)。

## 其他更新

- 更正 `grpc-transcode` 插件的 `pb_option_def` 中 enums 的位置 ([PR #11448](https://github.com/apache/apisix/pull/11448))
- 修复在消费者上配置非身份验证插件时出现的加密/解密错误 ([PR #11600](https://github.com/apache/apisix/pull/11600))
- 修复在配置文件中替换环境变量时出现的问题 ([PR #11545](https://github.com/apache/apisix/pull/11545))

## 变更日志

有关此版本的完整变更列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3110)。
