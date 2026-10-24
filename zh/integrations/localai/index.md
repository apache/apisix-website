# LocalAI

> 通过 APISIX 3.18 将 OpenAI 兼容的 Chat 请求转发到私有 LocalAI，并分开管理客户端认证与上游认证。

Source: https://apisix.apache.org/zh/integrations/localai/

LocalAI 可在自有基础设施上运行模型，并提供 OpenAI 兼容 API。Apache APISIX 3.18 可以通过 `ai-proxy` 将 Chat Completions 请求发送到 LocalAI，同时在网关侧统一处理客户端认证、上游凭据、限流和日志。

<div class="architecture-flow" aria-label="APISIX 与 LocalAI 架构">
  <span>OpenAI 兼容客户端</span><span>→</span><span>Apache APISIX</span><span>→</span><span>LocalAI</span>
</div>

LocalAI 已合并 [Apache APISIX 反向代理示例](https://github.com/mudler/LocalAI/blob/d85577ff5c6f7cbc5a49c13ab5013a1ecfabf26c/docs/content/advanced/reverse-proxy-tls.md#apache-apisix-configuration)。该示例使用透明代理；本站的相关 Cookbook 则使用 APISIX 3.18 的 `openai-compatible` Provider。

## 接入方式

| 配置 | 行为 |
|---|---|
| Endpoint | 将 `override.endpoint` 设为 LocalAI 的 origin，例如 `http://localai:8080`。APISIX 会根据 Chat Completions 请求正文选择 `/v1/chat/completions`。不要写成 `http://localai:8080/v1`，因为 endpoint 中已有的路径会被原样使用，不会再追加 Provider 路径。 |
| 模型 | 设置 `options.model` 可固定一个已安装的 LocalAI 模型，并覆盖客户端传入的值。若允许客户端从许可的模型别名中选择，则省略该字段。 |
| 认证 | 客户端可以使用 `key-auth` 等插件单独认证。LocalAI 凭据配置在 `ai-proxy.auth.header.Authorization` 中；调用上游时，这个值会替换客户端传入的 `Authorization` header。 |
| 流式响应 | 请求正文包含 `stream: true` 时，APISIX 按 SSE 处理，补充 OpenAI 的流式 usage 选项，并把 LocalAI 的流转发给客户端。 |

`openai-compatible` Provider 还定义了 OpenAI Responses 与 Embeddings 路径。本文只覆盖 Chat Completions；启用其他 LocalAI 接口前，需要分别验证。

## 控制暴露面

只开放应用需要的 Chat Completions Route。`ai-proxy` 不会把这条 Route 变成 LocalAI 的通用反向代理，因此 `/v1/models`、Web UI、模型安装与管理接口不会自动暴露；如确有需要，应单独创建并保护 Route。

LocalAI 应位于 APISIX 可访问的私有网络。其认证值应使用 APISIX 支持的 Secret 引用保存；除非已有评审通过的数据处理策略，否则不要启用正文日志。若 APISIX 需要跨不可信网络访问 LocalAI，应启用 TLS 并校验证书。由于 `ai-proxy` 会转发其他客户端 header，使用独立 LocalAI 身份的 Route 应移除 `Cookie`、`x-api-key` 和 `xi-api-key`。LocalAI 旧版 `LOCALAI_API_KEY` 拥有完整管理权限且没有角色隔离；启用 LocalAI 认证时，应优先使用最小权限的用户 API key。

## 验证状态

LocalAI 已合并的文档和 [APISIX 文档 PR #13770](https://github.com/apache/apisix/pull/13770) 使用透明代理；后者记录了 APISIX 3.17.0 与 LocalAI 4.7.1 的真实运行结果。本站的 APISIX 3.18 `openai-compatible` 配置已根据 [3.18.0 Provider 源码](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-providers/openai-compatible.lua) 核对，但尚未完成同等的干净环境运行测试，因此状态保持“**验证进行中**”。

## 参考资料

- [APISIX `ai-proxy` 文档](/zh/docs/apisix/plugins/ai-proxy/)
- [LocalAI 4.7.1 快速入门](https://github.com/mudler/LocalAI/blob/b224c96db6f4b87306a33a808650bfce63b12588/docs/content/getting-started/quickstart.md)
- [LocalAI 4.7.1 认证文档](https://github.com/mudler/LocalAI/blob/b224c96db6f4b87306a33a808650bfce63b12588/docs/content/features/authentication.md)
- [已合并的 LocalAI APISIX 文档 PR](https://github.com/mudler/LocalAI/pull/11294)
