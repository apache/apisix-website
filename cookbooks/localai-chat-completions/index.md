# Proxy LocalAI chat completions with APISIX

> Put APISIX 3.18 in front of a private LocalAI Chat Completions endpoint while keeping client and upstream credentials separate.

Source: https://apisix.apache.org/cookbooks/localai-chat-completions/

This guide creates one public Chat Completions Route. Clients authenticate to APISIX with an OpenAI-style bearer token; APISIX removes that token and sends a separate LocalAI credential upstream.

## Before you start

You need APISIX 3.18.0, LocalAI 4.7.1 with a chat model installed, and network access from APISIX to `localai:8080`. Keep the LocalAI port private. From an operator shell on that network, list the available model aliases:

```shell
curl "http://localai:8080/v1/models" \
  -H "Authorization: Bearer <localai-api-key>"
```

Choose an ID returned by this call. This Cookbook uses `<localai-model>` as the placeholder.

Make the full LocalAI authorization value available to the APISIX process before it starts:

```text
LOCALAI_AUTHORIZATION=Bearer <localai-api-key>
```

The Route below reads it through `$ENV://LOCALAI_AUTHORIZATION`, so the credential is not stored in the Route document.

If this value comes from LocalAI's legacy `LOCALAI_API_KEY`, treat it as a full-administration credential. Prefer LocalAI user authentication with a least-privilege API key when available.

## Create a gateway client

Create a Consumer and a `key-auth` Credential. Store the complete bearer value because `key-auth` compares the header value as-is:

```shell
curl "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "username": "localai-client"
  }'

curl "http://127.0.0.1:9180/apisix/admin/consumers/localai-client/credentials" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "id": "cred-localai-key-auth",
    "plugins": {
      "key-auth": {
        "key": "Bearer <gateway-client-key>"
      }
    }
  }'
```

Use a real secret reference for the Consumer credential in production.

## Create the Chat Completions Route

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "id": "localai-chat",
    "uri": "/v1/chat/completions",
    "methods": ["POST"],
    "plugins": {
      "key-auth": {
        "header": "Authorization",
        "hide_credentials": true
      },
      "proxy-rewrite": {
        "headers": {
          "remove": ["Cookie", "x-api-key", "xi-api-key"]
        }
      },
      "ai-proxy": {
        "provider": "openai-compatible",
        "auth": {
          "header": {
            "Authorization": "$ENV://LOCALAI_AUTHORIZATION"
          }
        },
        "override": {
          "endpoint": "http://localai:8080"
        },
        "timeout": 300000
      }
    }
  }'
```

Use the LocalAI origin as the endpoint. APISIX adds `/v1/chat/completions` for this request format. If the endpoint contains `/v1`, APISIX uses that path as-is instead.

The `proxy-rewrite` block removes the cookie and API-key headers that LocalAI also accepts for authentication. Without this step, a client-supplied LocalAI credential could take precedence over the identity configured by the gateway.

This Route leaves `options.model` unset, so the client model reaches LocalAI. To expose only one model, add the following block to `ai-proxy`; APISIX then overwrites any client model:

```json
"options": {
  "model": "<localai-model>"
}
```

## Send requests

Test a non-streaming response:

```shell
curl "http://127.0.0.1:9080/v1/chat/completions" \
  -H "Authorization: Bearer <gateway-client-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<localai-model>",
    "messages": [{"role": "user", "content": "Reply with one short sentence."}]
  }'
```

Then test SSE:

```shell
curl --no-buffer "http://127.0.0.1:9080/v1/chat/completions" \
  -H "Authorization: Bearer <gateway-client-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<localai-model>",
    "messages": [{"role": "user", "content": "Count from one to five."}],
    "stream": true
  }'
```

An OpenAI SDK can use the same Route:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://gateway.example.com/v1",
    api_key="<gateway-client-key>",
)

response = client.chat.completions.create(
    model="<localai-model>",
    messages=[{"role": "user", "content": "Hello from APISIX"}],
)
print(response.choices[0].message.content)
```

## Check the boundaries

| Check | Expected result |
|---|---|
| Missing or wrong gateway key | APISIX returns `401` without calling LocalAI. |
| Valid gateway key | APISIX removes the client credential and other LocalAI authentication headers; LocalAI receives only the configured bearer identity. |
| Wrong LocalAI credential | The request reaches LocalAI and fails authentication; do not retry it against another credential automatically. |
| Streaming request | The response is SSE and ends with LocalAI's normal terminal event. A missing terminal event means the stream is incomplete. |
| Another LocalAI path | It does not match this Route. Model listing and management stay private. |

Keep `logging.payloads` disabled unless prompts and responses are approved for logging. Set an explicit stream-duration and response-size limit for production workloads, monitor upstream latency and errors, and use TLS with certificate verification when the LocalAI connection leaves a trusted network.

## Validation note

The [merged LocalAI documentation](https://github.com/mudler/LocalAI/pull/11294) and [APISIX documentation PR #13770](https://github.com/apache/apisix/pull/13770) cover the transparent proxy path, including a recorded APISIX 3.17.0 and LocalAI 4.7.1 run. This native APISIX 3.18 Route is source-reviewed but not runtime-verified yet. Before changing the status, run non-streaming and SSE requests twice from a clean environment, verify both authentication layers, and have another operator reproduce the result.

## Cleanup

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/localai-chat" -X DELETE \
  -H "X-API-KEY: ${admin_key}"

curl "http://127.0.0.1:9180/apisix/admin/consumers/localai-client" -X DELETE \
  -H "X-API-KEY: ${admin_key}"
```

Remove the LocalAI authorization variable from the APISIX deployment when it is no longer used.
