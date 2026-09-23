# Semrush On-page SEO Register

本登记表把 Semrush desktop/mobile 报告转成可执行的页面决策。报告中的建议是分析证据，不是需要机械执行的指令；真实搜索意图、Apache APISIX 技术准确性和页面职责优先。

来源：`ideas_apisix.apache.org_20260922-desktop.xlsx`（155 条建议）和 `ideas_apisix.apache.org_20260922-phone.xlsx`（154 条建议）。两份报告覆盖相同的 16 个 URL、29 个关键词。本轮将外链、Core Web Vitals 和服务器性能建议留给后续工作流。

| URL | 设备 | 关键词/主题 | 问题类型 | 真实搜索意图 | 处理决定 | 目标 title / H1 / meta description | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | desktop + mobile | Apache APISIX API gateway；open source API gateway | title、H1、正文、meta、Schema | 了解并评估开源 API 网关 | 保留已对齐的首页定位；AI Gateway 作为次级入口；不添加评分标记 | `Apache APISIX - Open Source API Gateway & AI Gateway` / `The open-source API Gateway & AI Gateway` / `Apache APISIX is a dynamic, high-performance, open-source API gateway and AI gateway...` | 已复核 |
| `/ai-gateway/` | desktop + mobile | open source AI gateway；LLM gateway | title、H1、正文、内部链接 | 评估 LLM/AI agent 网关能力 | 保留产品页定位，补充 AI Gateway 解释型文章和 Learning Center 路径 | `Open-Source AI Gateway for LLMs and AI Agents | Apache APISIX` / 同名 H1 / 覆盖 model routing、fallback、token rate limiting、security、observability | 已完成 |
| `/learning-center/` | desktop + mobile | API gateway guides；Apache APISIX tutorials；API gateway security/authentication | title、H1、meta | 学习 API 网关概念和实践 | 将版本/下载意图交给 `/downloads/`，首页聚焦指南和教程 | `API Gateway Guides & Tutorials | Apache APISIX` / `API Gateway Guides & Tutorials` / `Apache APISIX guides to API gateway concepts, authentication, security, Kubernetes, and gateway comparisons.` | 已完成 |
| `/learning-center/api-gateway-vs-load-balancer/` | desktop + mobile | api gateway vs load balancer | 首段、语义词、可读性 | 比较两种流量组件的职责边界 | 只保留一个主目标词；首段和比较表使用自然定义 | `API Gateway vs Load Balancer: Key Differences Explained` / 同名 H1 / 现有比较型 description | 已完成 |
| `/learning-center/api-gateway-for-microservices/` | desktop + mobile | API gateway for microservices；API gateway architecture | title、首段、正文、可读性 | 设计微服务网关架构 | 补充 service discovery、high-traffic REST API、traffic control、gateway/service mesh 边界 | `API Gateway for Microservices: Architecture, Patterns & Best Practices` / 同名 H1 / 现有架构型 description | 已完成 |
| `/learning-center/what-is-an-api-gateway/` | desktop + mobile | what is an API gateway | 重复、首段、内部链接 | 获取 API 网关定义、工作方式和适用场景 | 用 routing、authentication、rate limiting、observability 等变体降低重复；链接 AI Gateway | `What is an API Gateway? Definition, Benefits & Use Cases` / 同名 H1 / 现有定义型 description | 已完成 |
| `/learning-center/api-gateway-security/` | desktop + mobile | API gateway security best practices | 首段、语义词、可读性 | 学习 API 网关安全控制 | 补充 sensitive data、API endpoints、unauthorized access、incoming requests、RBAC；不强行堆叠 `api security gateway` | `API Gateway Security Best Practices` / 同名 H1 / 现有安全实践 description | 已完成 |
| `/learning-center/what-is-mutual-tls/` | desktop + mobile | what is mutual TLS；mTLS authentication | title、meta、正文、重复 | 了解双向 TLS 身份认证和证书校验 | 补充 public key、TLS certificate、client certificate、certificate validation，减少 mTLS 重复 | `What Is Mutual TLS (mTLS)? Authentication and Certificates` / 同名 H1 / 现有证书型 description | 已完成 |
| `/learning-center/what-is-grpc/` | desktop + mobile | what is gRPC | 语义词、正文、视频 | 理解 gRPC、Protobuf、HTTP/2 和 streaming | 补充 gRPC clients、Protocol Buffers、data structures；无真实视频资产则不嵌入视频 | `What is gRPC? Protocol Buffers, Performance & API Gateway Integration` / 同名 H1 / 现有 gRPC description | 已完成 |
| `/blog/2025/03/06/what-is-an-ai-gateway/` | desktop + mobile | AI gateway | title、首段、正文、内部链接 | 解释 AI Gateway 的概念和核心能力 | 补充 API key、real-time traffic、sensitive data、RBAC、semantic caching、provider integrations；链接产品页和安全指南 | `What Is an AI Gateway? Concept and Core Features | Apache APISIX` / 同名 H1 / `Learn how an AI gateway manages LLM traffic with provider integrations, model routing, token limits, security, semantic caching, and observability.` | 已完成 |
| `/docs/apisix/FAQ/` | desktop + mobile | apisix ingress（疑似蚕食） | title、meta、关键词匹配 | 查找 APISIX 常见问题 | 用 FAQ 的真实职责覆盖 API gateway routing、authentication、plugins、configuration、troubleshooting；不引入正文未覆盖的 Ingress 意图 | `Apache APISIX FAQ: API Gateway Questions | Apache APISIX` / `Apache APISIX FAQ: API Gateway Questions` / FAQ 主题 description | 已完成 |
| `/docs/ingress-controller/concepts/gateway-api/` | desktop + mobile | Gateway API | title、meta、误匹配 | 学习 Kubernetes Gateway API 与 APISIX Ingress Controller | 只按文档主题优化，不追逐 Semrush 拼写近似词 | `Kubernetes Gateway API with APISIX Ingress Controller | Apache APISIX` / 同名主题 H1 / Gateway API 资源说明 | 待最终 overlay 验证 |
| `/docs/apisix/http3/` | desktop + mobile | HTTP/3；QUIC | title、meta、误匹配 | 配置和理解 HTTP/3/QUIC | 说明 transport、TLS 和配置注意事项 | `HTTP/3 and QUIC in Apache APISIX | Apache APISIX` / `HTTP/3 and QUIC in Apache APISIX` / HTTP/3 配置 description | 已完成 |
| `/docs/apisix/plugins/lago/` | desktop + mobile | lagosec（误匹配） | title、meta、关键词匹配 | 配置 Lago 用量/计费插件 | 不添加 `lagosec`；按插件功能提供准确 metadata | `Lago Plugin | Apache APISIX` / `Lago Plugin` / Lago 用量和计费事件 description | 已完成 |
| `/docs/apisix/plugins/ext-plugin-post-resp/` | desktop + mobile | ext.to（误匹配） | title、meta、关键词匹配 | 配置响应阶段外部插件 | 不添加 `ext.to`；按 Plugin Runner 和 response phase 定义 metadata | `ext-plugin-post-resp | Apache APISIX` / `ext-plugin-post-resp` / 外部响应阶段插件 description | 已完成 |
| `/docs/ingress-controller/reference/apisix-ingress-controller/annotation/` | desktop + mobile | cors proxy base64 url endpoint（误匹配） | title、meta、关键词匹配 | 查找 Ingress Controller annotation 参数 | 不污染页面；覆盖 annotation、routing、CORS、proxy 和 request behavior | `APISIX Ingress Controller Annotation Reference | Apache APISIX` / 同名主题 H1 / annotation reference description | 待最终 overlay 验证 |

## 拒绝或延后

| 建议类别 | 处理决定 | 原因 |
| --- | --- | --- |
| 获取外链/反向链接（desktop 29 条、mobile 29 条） | 延后 | 属于 off-page SEO，不改变本轮页面意图和内容质量。 |
| `yapix`、`apizel`、`apjax`、`ext.to`、`lagosec` | 拒绝 | 与 APISIX 页面主题不匹配，疑似拼写相似或低质量匹配；加入会造成关键词污染。 |
| `cors proxy base64 url endpoint` | 拒绝 | 不是 annotation 文档的真实搜索意图，不能为了覆盖报告词组破坏文档可读性。 |
| 视频嵌入建议 | 延后 | 只有在有真实、可维护且与页面直接相关的视频资产时才加入。 |
| `aggregateRating` | 拒绝 | 当前没有可验证、可持续维护的评分来源；保留 WebSite、Organization、Article/BlogPosting、BreadcrumbList、FAQPage 等有依据的标记。 |
| 版本发布/下载关键词放在 Learning Center 首页 | 拒绝 | 版本和下载意图由 `/downloads/` 承接，避免学习中心与下载页蚕食。 |
