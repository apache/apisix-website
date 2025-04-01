---
title: "APISIX-MCP：利用 AI + MCP 拥抱 API 智能化管理"
authors:
  - name: Zhihuang Lin
    title: API7 Engineer
    url: https://github.com/oil-oil
    image_url: https://github.com/oil-oil.png
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - MCP 协议
  - APISIX MCP
  - APISIX-MCP
  - AI模型
  - API管理
  - 自然语言交互
description: MCP 协议为 AI 模型提供标准化连接，APISIX-MCP 通过自然语言交互简化 API 管理，实现智能配置与自动化工作流，提升运维效率。
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/04/01/b53YPObN_apisix-mcp.webp
---

> 本文介绍了 MCP 协议及其在 APISIX-MCP 中的应用。MCP 协议为 AI 模型提供标准化连接，解决碎片化问题。APISIX-MCP 通过自然语言交互简化 API 管理，支持创建、更新、删除资源，实现自动化工作流和闭环验证，显著降低认知成本，提升运维效率。
<!--truncate-->

## 前言

随着 AI 大模型应用呈爆发式增长，许多传统应用都希望自己快速接入 AI 大模型。然而，当前各类 AI 工具缺乏统一标准，碎片化现象极为严重。不同大模型的能力高低不一，对接方式也大相径庭，这让传统应用在接入时困难重重。

在这样的背景下，2024 年底，知名大模型 Claude 背后的公司 Anthropic 推出了一项名为模型上下文协议 **（Model Context Protocol，简称 MCP）** 的协议。MCP 将自身定义为 AI 应用的 “USB - C 接口”。我们知道，USB - C 为设备连接各类周边设备及配件提供了标准化方式，与之类似，MCP 则为 AI 模型连接不同数据源与工具提供了标准化途径。

![MCP Architecture](https://static.api7.ai/uploads/2025/04/01/yUpL18fz_apisix-mcp-architecture.webp)

目前已经有大量服务和应用基于 MCP 实现，例如我们可以使用 GitHub-MCP，用自然语言提交代码、创建 PR；利用 Figma MCP，让 AI 直接生成 UI 图，接入 Browser-tools-MCP 后，甚至还能让 cursor 根据浏览器控制台中的元素节点和打印的日志进行代码调试。

在 MCP 官方仓库里，提供了诸如 Google Drive、Slack、Git 以及多种数据库的 MCP 服务。而且它作为一项开放标准，MCP 获得了 AI 社区的广泛认可，众多第三方开发者纷纷投身其中，开发了各类 MCP 服务，每天都有数百个新的 MCP 服务问世。Anthropic 作为发布者，也一直在积极推动 MCP 的发展，持续优化协议的实现，同时大力开展对开发者的相关教育工作。

## 关于 APISIX-MCP

MCP 协议的兴起为传统应用提供了新的技术路径。基于 MCP 的标准化接入能力，我们开发了 APISIX-MCP 服务，并在开源版本 Apache APISIX 上实现了大语言模型与 APISIX Admin-API 的对接，支持通过自然语言交互完成 APISIX 网关资源的查询与管理，目前 APISIX-MCP 已经实现下列操作：

### 通用操作

- `get_resource`: 按类型检索资源（路由、服务、上游等）
- `delete_resource`: 按 ID 删除资源

### API 资源操作

- `create_route`/`update_route`/`delete_route`: 管理路由
- `create_service`/`update_service`/`delete_service`: 管理服务
- `create_upstream`/`update_upstream`/`delete_upstream`: 管理上游
- `create_ssl`/`update_ssl`/`delete_ssl`: 管理SSL证书
- `create_or_update_proto`: 管理 protobuf 定义
- `create_or_update_stream_route`: 管理流式路由

### 插件操作

- `get_all_plugin_names`: 获取所有可用插件名称
- `get_plugin_info`/`get_plugins_by_type`/`get_plugin_schema`: 获取插件配置
- `create_plugin_config`/`update_plugin_config`: 管理插件配置
- `create_global_rule`/`update_global_rule`: 管理插件全局规则
- `get_plugin_metadata`/`create_or_update_plugin_metadata`/`delete_plugin_metadata`: 管理插件元数据

### 安全配置

- `get_secret_by_id`/`create_secret`/`update_secret`: 管理密钥
- `create_or_update_consumer`/`delete_consumer`: 管理消费者
- `get_credential`/`create_or_update_credential`/`delete_credential`: 管理消费者凭证
- `create_consumer_group`/`delete_consumer_group`: 管理消费者组

## 如何使用 APISIX-MCP

APISIX-MCP 目前已经开源并发布到了 npm（[apisix-mcp npm](https://www.npmjs.com/package/apisix-mcp)） 及 Github ([apisix-mcp GitHub](https://github.com/api7/apisix-mcp))，你可以通过任一支持 MCP 服务的 AI 客户端进行配置，例如 claude desktop， cursor 或者通过 Vscode 中的 cline 插件。

这里以 cursor 为例为大家演示如何配置。

1. 首先打开 curosr，点击右上角设置图标，进入设置页面。

![Configure cursor for APISIX-MCP](https://static.api7.ai/uploads/2025/04/01/OCQcecuQ_apisix-mcp-2.webp)

2. 点击添加 "Add new global MCP server" 按钮，我们会进入一个 `mcp.json` 配置文件。

```
// mcp.json
{
  "mcpServers": {
    "apisix-mcp": {
      "command": "npx",
      "args": ["-y", "apisix-mcp"],
      "env": {
        "APISIX_SERVER_HOST": "your-apisix-server-host",
        "APISIX_ADMIN_API_PORT": "your-apisix-admin-api-port",
        "APISIX_ADMIN_API_PREFIX": "your-apisix-admin-api-prefix",
        "APISIX_ADMIN_KEY": "your-apisix-api-key"
      }
    }
  }
}
```

在配置文件中的 `mcpServers` 字段中，新增名为 `apisix-mcp` 的服务，这个名称也可以自行更改，然后配置运行 MCP 服务的命令。`command` 为 `npx` 意为使用 node.js 自带的命令执行工具运行脚本，`args` 为 `-y` 和 `apisix-mcp`，`-y` 代表在执行命令的时候需要先安装依赖，[`apisix-mcp`](https://www.npmjs.com/package/apisix-mcp) 则为 npm 中的包名。

在 `env` 字段中，我们可以填于 APISIX 服务访问地址，Admin API 的端口、前缀和以及用于认证 key，这些环境变量都有默认值，如果你直接启动 APISIX 后没有做任何自定义配置就无需传入 `env` 字段，各个环境变量对应的默认值如下：

| 变量                  | 描述                              | 默认值                     |
|-----------------------|-----------------------------------|----------------------------|
| APISIX_SERVER_HOST    | Host that has access to your APISIX server | http://127.0.0.1           |
| APISIX_ADMIN_API_PORT | Admin API port                    | 9180                       |
| APISIX_ADMIN_API_PREFIX | Admin API prefix                  | /apisix/admin              |
| APISIX_ADMIN_KEY      | Admin API authentication key      | edd1c9f034335f136f87ad84b625c8f1 |

3. 配置添加完成后，我们回到 cursor 的 MCP 配置页面中，如果配置成功，MCP Servers 中会展示 apisix-mcp 服务已经启用的绿色小灯，且可以顺利读取到 MCP 服务中提供的所有工具（Tools）。

![Successful Configuration of apisix-mcp Service](https://static.api7.ai/uploads/2025/04/01/toaXLc3n_apisix-mcp-3.webp)

> 由于目前不同的 MCP 客户端的实现有所不同，如果发现配置失败，我们也可以参考 APISIX-MCP GitHub 仓库中的文档，利用源码构建项目后再重新修改配置文件。

4. 此时我们打开右侧对话栏，选择 agent 类型，模型选择 claude-sonnet-3.5/3.7 或 gpt 4o ：

![Select Agent Models](https://static.api7.ai/uploads/2025/04/01/g9v91DIf_apisix-mcp-4.webp)

5. 然后我们可以输入相关的操作指令看看 MCP 服务是否能正常工作，这里我们根据 APISIX 文档中的 Getting Started 中的流程进行操作，在对话框中输入以下内容，并发送对话。

> "Help me create a route with path `/api` for accessing https://httpbin.org upstream, need to configure cors and rate limit plugin appropriately. Print the route information to me after configuring."
> 中文翻译：“帮我创建一条路径为 `/api` 的路由，用于访问上游 `https://httpbin.org`，需要配置 CORS 和限流限速插件。配置完成后把路由信息打印给我。”

6. 接下来我们会在 cursor 中看到类似下面视频中 MCP 工具调用过程流程，由于 AI 大模型本身响应具有随机性，所以每次执行的操作不一定与示例中相同。

<video width="100%" height="auto" controls>
  <source src="https://static.api7.ai/uploads/2025/04/01/V7CmO59u_mcp-demo.mp4" type="video/mp4">
</video>

这里开启了自动执行模式（YOLO Mode）允许 cursor 自动调用 mcp 服务器中的所有工具，从视频中我们可以看到 AI 根据我们的需求：

- 分析我们需要配置的插件，然后调用了 `get_plugins_list` 获取所有插件的名称- 调用 `get_plugin_schema` 去查看不同插件的详细配置信息
- 调用 `create_rotue` 创建路由
- 调用 `update_route` 为路由添加前面查询到的插件配置
- 调用 `get_route` 查看路由是否配置成功，路由配置是否正确

7. 最终我们通过一句话创建出了如下配置的路由：

- 路由 ID：`httpbin`
- 路径：`/api/*`
- 支持的请求方式：`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`
- CORS 插件配置：

    ```
    allow_origins: *
    allow_methods: *
    allow_headers: *
    expose_headers: X-Custom-Header
    max_age: 3600
    allow_credential: false
    ```

- limit-count 插件配置：

    ```
    count: 100
    time_window: 60
    key: remote_addr
    rejected_code: 429
    policy: local
    ```

- 上游服务配置：

    ```
    type: roundrobin （负载均衡策略采用轮询）
    upstream node: httpbin.org:443 （指向的后端服务地址）
    ```

## 通过 AI 进行操作的优势

上述过程中，我们仅通过一轮对话，就通过自然语言的方式让 AI 帮我创建一个配置了跨域和限流限速的路由，相较于自己创建路由，借助 AI 来操作具有诸多优势：

- **降低认知成本**：降低认知成本。以往自行创建路由时，需频繁查阅文档、记忆各种参数格式，如今借助 AI，这些繁琐操作均可以大大省略。
- **自动化工作流**：AI 能够智能解析用户需求，自主完成需求分析，将创建路由的复杂任务拆解为多个步骤，并按序逐步执行，整个过程无需人工过多介入。
- **闭环验证**：路由配置完成后，AI 会自动对配置结果进行检查，并及时向用户反馈验证信息，确保配置准确。
- **迭代优化**：若后续需要调整或优化配置，用户只需与 AI 持续对话，AI 便能依据新需求灵活调整配置。

这种交互模式将复杂的配置过程转化为自然的对话体验，同时保持了配置的准确性和可验证性。而这些实现都得益于 MCP 协议将我们的需求进行语意解析，再根据我们的需求调用不同的工具，最终通过 Admin API 完成操作。

需要注意的是，目前 APISIX-MCP 并非追求完全替代人工配置，而是着眼于优化高频操作场景的效率。其价值在配置调试和快速验证环节尤为突出，这种定位使其能够与传统管理方式形成有效互补。随着 MCP 生态的持续发展，此类工具在 API 管理领域的深度集成值得期待。

## 总结

MCP 的出现为复杂 API 系统的智能化操作开辟了新的可能性，我们希望 APISIX-MCP 能够帮助你快速上手 Apache APISIX。后续 APISIX 不仅会推出更多处理 AI 流量相关的插件，同时也会在 API 管理方面探索更多与 AI 结合的可能性。我们相信，AI 与 API 管理的融合将持续推动运维效率的革新，为开发者带来更智能、更高效的基础设施管理体验。
