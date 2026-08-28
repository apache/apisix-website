---
title: 通过 APISIX 代理 LocalAI Chat Completions
slug: localai-chat-completions
translation_of: localai-chat-completions
description: 在私有 LocalAI Chat Completions 接口前部署 APISIX 3.18，并分开管理客户端与上游凭据。
difficulty: 中等
duration: 30 分钟
---

本指南只创建一条对外的 Chat Completions Route。客户端使用 OpenAI 风格的 Bearer Token 向 APISIX 认证；APISIX 删除该 Token，再使用另一份 LocalAI 凭据访问上游。

## 准备工作

准备 APISIX 3.18.0、已安装 Chat 模型的 LocalAI 4.7.1，并确保 APISIX 能访问 `localai:8080`。LocalAI 端口不应公开。先在同一私有网络的运维终端中查询模型别名：

```shell
curl "http://localai:8080/v1/models" \
  -H "Authorization: Bearer <localai-api-key>"
```

从返回结果中选择模型 ID。下文使用 `<localai-model>` 作为占位符。

启动 APISIX 前，把完整的 LocalAI Authorization 值注入 APISIX 进程：

```text
LOCALAI_AUTHORIZATION=Bearer <localai-api-key>
```

Route 通过 `$ENV://LOCALAI_AUTHORIZATION` 读取该值，避免把凭据明文保存在 Route 文档中。

如果该值来自 LocalAI 旧版 `LOCALAI_API_KEY`，应将其视为完整管理凭据。条件允许时，优先启用 LocalAI 用户认证并使用最小权限的 API key。

## 创建网关客户端

创建 Consumer 和 `key-auth` Credential。`key-auth` 会按原值比较 header，因此这里保存完整的 Bearer 值：

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

生产环境中的 Consumer 凭据应改用真实的 Secret 引用。

## 创建 Chat Completions Route

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

Endpoint 应填写 LocalAI origin。APISIX 会根据请求格式追加 `/v1/chat/completions`；如果 endpoint 已包含 `/v1`，APISIX 会直接使用该路径，不再追加。

`proxy-rewrite` 会移除 LocalAI 同样接受的 Cookie 和 API key header。缺少这一步时，客户端传入的 LocalAI 凭据可能优先于网关配置的身份。

上面的 Route 没有设置 `options.model`，客户端模型会传给 LocalAI。若只允许一个模型，可以在 `ai-proxy` 中添加以下配置；此时 APISIX 会覆盖客户端传入的模型：

```json
"options": {
  "model": "<localai-model>"
}
```

## 发送请求

先测试非流式响应：

```shell
curl "http://127.0.0.1:9080/v1/chat/completions" \
  -H "Authorization: Bearer <gateway-client-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<localai-model>",
    "messages": [{"role": "user", "content": "请用一句话回答。"}]
  }'
```

再测试 SSE：

```shell
curl --no-buffer "http://127.0.0.1:9080/v1/chat/completions" \
  -H "Authorization: Bearer <gateway-client-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<localai-model>",
    "messages": [{"role": "user", "content": "从一数到五。"}],
    "stream": true
  }'
```

OpenAI SDK 也可以使用同一条 Route：

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

## 检查边界

| 检查 | 预期结果 |
|---|---|
| 网关 key 缺失或错误 | APISIX 返回 `401`，且不调用 LocalAI。 |
| 网关 key 正确 | APISIX 移除客户端凭据和其他 LocalAI 认证 header；LocalAI 只收到网关配置的 Bearer 身份。 |
| LocalAI 凭据错误 | 请求到达 LocalAI 后认证失败；不要自动换用另一份凭据重试。 |
| 流式请求 | 返回 SSE，并以 LocalAI 的正常终止事件结束。缺少终止事件表示流不完整。 |
| 其他 LocalAI 路径 | 不匹配此 Route，模型列表和管理接口仍保持私有。 |

除非 Prompt 和响应已经获准写入日志，否则不要启用 `logging.payloads`。生产环境还应设置明确的流式时长与响应大小上限，监控上游延迟和错误；若 LocalAI 连接离开可信网络，应使用 TLS 并校验证书。

## 验证说明

[LocalAI 已合并的文档](https://github.com/mudler/LocalAI/pull/11294)和 [APISIX 文档 PR #13770](https://github.com/apache/apisix/pull/13770)覆盖透明代理链路，后者记录了 APISIX 3.17.0 与 LocalAI 4.7.1 的真实运行结果。本文的 APISIX 3.18 原生 Route 已完成源码核对，但尚未完成运行时验证。更新状态前，需要从干净环境运行两次非流式与 SSE 请求，验证两层认证，并由另一位操作者复现。

## 清理

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/localai-chat" -X DELETE \
  -H "X-API-KEY: ${admin_key}"

curl "http://127.0.0.1:9180/apisix/admin/consumers/localai-client" -X DELETE \
  -H "X-API-KEY: ${admin_key}"
```

不再使用该集成后，从 APISIX 部署中移除 LocalAI authorization 环境变量。
