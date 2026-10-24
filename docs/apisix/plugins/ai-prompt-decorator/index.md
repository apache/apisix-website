# ai-prompt-decorator

> This document contains information about the Apache APISIX ai-prompt-decorator Plugin.

Source: https://apisix.apache.org/docs/apisix/plugins/ai-prompt-decorator/

## Description

The `ai-prompt-decorator` Plugin modifies user input prompts by prefixing and appending pre-engineered prompts to set contexts in content generation. This practice helps the model operate within desired guidelines during interactions.

## Plugin Attributes

| Name | Type | Required | Default | Valid values | Description |
| --- | --- | --- | --- | --- | --- |
| `max_req_body_size` | integer | False | 67108864 | >= 1 | Maximum request body size in bytes buffered into memory. Requests with a larger body are rejected. |
| `prepend` | array | Conditionally\* | | | An array of prompt objects to be prepended. |
| `prepend.role` | string | True | | [`system`, `user`, `assistant`] | Role of the message. |
| `prepend.content` | string | True | | length >= 1 | Content of the message (prompt). |
| `append` | array | Conditionally\* | | | An array of prompt objects to be appended. |
| `append.role` | string | True | | [`system`, `user`, `assistant`] | Role of the message. |
| `append.content` | string | True | | length >= 1 | Content of the message (prompt). |

\* **Conditionally Required**: At least one of `prepend` or `append` must be provided.

## Examples

The following examples will be using OpenAI as the Upstream service provider. Before proceeding, create an [OpenAI account](https://openai.com) and an [API key](https://openai.com/blog/openai-api). You can optionally save the key to an environment variable as such:

```shell
export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

If you are working with other LLM providers, please refer to the provider's documentation to obtain an API key.

### Prepend and Append Messages

The following example demonstrates how to configure the `ai-prompt-decorator` Plugin to prepend a system message and append a user message to the user input message. The Plugin is used together with the [ai-proxy](/docs/apisix/plugins/ai-proxy/) Plugin, which forwards requests to OpenAI.

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```shell
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::



**Admin API**


Create a Route to the chat completion endpoint with pre-configured prompt decorators:

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "uri": "/openai-chat",
    "methods": ["POST"],
    "plugins": {
      "ai-proxy": {
        "provider": "openai",
        "auth": {
          "header": {
            "Authorization": "Bearer '"$OPENAI_API_KEY"'"
          }
        }
      },
      "ai-prompt-decorator": {
        "prepend":[
          {
            "role": "system",
            "content": "Answer briefly and conceptually."
          }
        ],
        "append":[
          {
            "role": "user",
            "content": "End the answer with a simple analogy."
          }
        ]
      }
    }
  }'
```



**ADC**


Create a Route with the `ai-proxy` and `ai-prompt-decorator` Plugins configured:

<div class="code-title">adc.yaml</div>

```yaml
services:
  - name: prompt-decorator-service
    routes:
      - name: prompt-decorator-route
        uris:
          - /openai-chat
        methods:
          - POST
        plugins:
          ai-proxy:
            provider: openai
            auth:
              header:
                Authorization: "Bearer ${OPENAI_API_KEY}"
          ai-prompt-decorator:
            prepend:
              - role: system
                content: "Answer briefly and conceptually."
            append:
              - role: user
                content: "End the answer with a simple analogy."
```

Synchronize the configuration to the gateway:

```shell
adc sync -f adc.yaml
```



**Ingress Controller**




**Gateway API**


Create a Route with the `ai-proxy` and `ai-prompt-decorator` Plugins configured:

<div class="code-title">ai-prompt-decorator-ic.yaml</div>

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: PluginConfig
metadata:
  namespace: aic
  name: ai-prompt-decorator-plugin-config
spec:
  plugins:
    - name: ai-proxy
      config:
        provider: openai
        auth:
          header:
            Authorization: "Bearer your-api-key"
    - name: ai-prompt-decorator
      config:
        prepend:
          - role: system
            content: "Answer briefly and conceptually."
        append:
          - role: user
            content: "End the answer with a simple analogy."
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: aic
  name: prompt-decorator-route
spec:
  parentRefs:
    - name: apisix
  rules:
    - matches:
        - path:
            type: Exact
            value: /openai-chat
          method: POST
      filters:
        - type: ExtensionRef
          extensionRef:
            group: apisix.apache.org
            kind: PluginConfig
            name: ai-prompt-decorator-plugin-config
```



**APISIX Ingress Controller**


Create a Route with the `ai-proxy` and `ai-prompt-decorator` Plugins configured:

<div class="code-title">ai-prompt-decorator-ic.yaml</div>

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: aic
  name: prompt-decorator-route
spec:
  ingressClassName: apisix
  http:
    - name: prompt-decorator-route
      match:
        paths:
          - /openai-chat
        methods:
          - POST
      plugins:
        - name: ai-proxy
          enable: true
          config:
            provider: openai
            auth:
              header:
                Authorization: "Bearer your-api-key"
        - name: ai-prompt-decorator
          enable: true
          config:
            prepend:
              - role: system
                content: "Answer briefly and conceptually."
            append:
              - role: user
                content: "End the answer with a simple analogy."
```




Apply the configuration to your cluster:

```shell
kubectl apply -f ai-prompt-decorator-ic.yaml
```




Send a POST request to the Route specifying the model and a sample message in the request body:

```shell
curl "http://127.0.0.1:9080/openai-chat" -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4",
    "messages": [{ "role": "user", "content": "What is mTLS authentication?" }]
  }'
```

You should receive a response similar to the following:

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Mutual TLS (mTLS) authentication is a security protocol that ensures both the client and server authenticate each other's identity before establishing a connection. This mutual authentication is achieved through the exchange and verification of digital certificates, which are cryptographically signed credentials proving each party's identity. In contrast to standard TLS, where only the server is authenticated, mTLS adds an additional layer of trust by verifying the client as well, providing enhanced security for sensitive communications.\n\nThink of mTLS as a secret handshake between two friends meeting at a club. Both must know the handshake to get in, ensuring they recognize and trust each other before entering.",
        "role": "assistant"
      }
    }
  ],
  "created": 1723193502,
  "id": "chatcmpl-9uFdWDlwKif6biCt9DpG0xgedEamg",
  "model": "gpt-4o-2024-05-13",
  "object": "chat.completion",
  "system_fingerprint": "fp_abc28019ad",
  "usage": {
    "completion_tokens": 124,
    "prompt_tokens": 31,
    "total_tokens": 155
  }
}
```
