---
title: "MCP 智能化管理实践：一句话搞定 APISIX 网关"
authors:
  - name: 林志煌
    title: author
    url: https://github.com/oil-oil
    image_url: https://github.com/oil-oil.png
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - APISIX
  - API 网关
  - APISIX AI 网关
  - MCP
  - APISIX-MCP
description: 作者：林志煌，API7.ai 前端开发、产品经理。本文整理自 2025 年 4 月 12 日林志煌在 APISIX 深圳 Meetup 的演讲。
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2024/12/25/dxrwyegf_api7-cover.png
---

> 作者：林志煌，API7.ai 前端开发、产品经理。本文整理自 2025 年 4 月 12 日林志煌在 APISIX 深圳 Meetup 的演讲。
>
<!--truncate-->

今天的分享分为五个部分，AI 大语言模型的局限、MCP 是什么以及有什么用、MCP 的实现原理及其优势、APISIX 基于 MCP 的实践、以及 APISIX-MCP 演示。

## 目前 AI 大语言模型的应用

目前 AI 已经融入我们生活的各个方面，我列举了一些 AI 大语言模型的应用场景。

- 交互类：面试模拟、语言陪练、智能客服
- 内容生成：论文编辑、技术文档整理、视频文案创作
- 编程辅助：代码提示（如 Cursor/Windsurf）和生成、Bug 排查
- 多模态：图像、音视频生成

随着 AI 大语言模型的能力越来越强，开销也越来越低，我们对它的期待会越来越高。我们希望它能够将整个需求闭环，而不仅仅是帮助我们生成一个文档。我列举了三个场景，即我们希望未来 AI 能够优化的事情。

- 场景一、日常办公：帮我给客户张经理发送一封跟进邮件，附上昨天会议纪要的 PDF，并且约他下周二下午 3 点进行电话沟通。
- 场景二、开发：开发一个运动手环上记录每日喝水次数的应用，要有按钮技术功能和图表统计功能，然后发布到应用商城。
- 场景三、运维：服务器 CPU 负载持续超过 90%，帮我查一下原因并尝试修复一下。

以上三个场景，即使有 AI 的能力，也没办法完美闭环，那是因为 AI 大语言模型本身也有局限性。

## AI 大语言模型的局限性

AI 大语言模型主要有两点局限，即数据孤岛和缺失手脚的问题。

数据孤岛问题可比喻为 “巧妇难为无米之炊”。AI 大语言模型的知识是基于过去某一时间点的知识快照。例如，在办公场景中，若我们要求 AI 给张经理发邮件，它可能不知晓张经理的身份及其邮箱地址。在编程领域，尽管 AI 编程工具能协助开发 iOS 应用或小程序，但在开发手环应用时，可能因不了解手环系统，或因手环文档更新频繁而无法获取最新开发环境文档，从而陷入困境。此外，若仅告知 AI 大语言模型 “CPU 负载过高”，由于缺乏系统中各进程指标等必要上下文信息，它也无法有效协助解决问题。

![Limitations of LLMs](https://static.api7.ai/uploads/2025/06/04/Upw9ofHH_apisix-mcp-practices-1.webp)

第二个局限是缺乏手脚，知道和做到之间存在断层。AI 大模型的本质上只能生成内容，若想让它执行具体操作，需提供相应工具。例如，在第一个场景中，AI 大语言模型不知道如何发送邮件或预约客户会议。通常，为执行这些任务，我们会提供 API（如谷歌或 QQ 邮箱的 API），告知 AI 需调用 API 并指定发邮件的对象。

第二个场景与之类似，若想让 AI 将应用发布到应用商城，可能需应用商城提供开放的发布 API。第三个场景，如果我们想让 AI 大语言模型帮助排查 CPU 高负载问题，由于它无法直接在系统中执行命令修复，可能会提供一些命令让我们手动执行。执行完毕后，我们需将排查出的原因反馈给 AI。

以下是 AI 的内容消费流程：

1. 用户提问（提供更详尽的信息）：用户提供文字、图片等基本背景信息，并提出问题；
2. 内容生成（模型微调）：AI 大模型生成文本、图像、音频或视频等内容；
3. 消费内容（提供执行对应操作的工具）：需要用户手动执行，或者通过工具自动化执行任务；
4. 任务完成（提供检查执行结果的工具）：最终用户或系统获得执行结果。

在这四步中，我们可通过以下方式优化 AI：

1. 首先在用户提问环节，我们需要提供尽可能详细的上下文信息。例如，在邮件场景中，我们需要将用户的邮箱发送给某个用户，直接将邮箱告诉 AI 大语言模型或者提供系统内的指标，帮助 AI 大语言模型生成更精准的内容。
2. 在内容生成环节，通过模型微调，让 AI 大模型针对性地学习某个领域的特殊能力，以增强知识储备。
3. 在消费内容环节和任务确认环节，为 AI 大语言模型提供工具。例如，在邮件发送完成之后，提供读取已发送邮件的 API 让 AI 大语言模型通过发送响应判断操作是否成功。

### 解决方案

虽然 AI 大语言模型有它的局限性，但是目前已经有了一些对应的解决方案。

![Solutions for LLMs](https://static.api7.ai/uploads/2025/06/04/gG3NBdB6_apisix-mcp-practices-2.webp)

首先是 RAG（Retrieval-Augmented Generation，检索增强生成），RAG 能够为 AI 大语言模型接入外部知识库，提供最新的数据。例如在之前的编程场景中，我们可以为 AI 接入开发手环的开发文档，让 AI 大语言模型有针对性地获取额外知识。当我们向 AI 提问时，它会检索外部知识库，匹配问题相关信息，并将知识库内容整合进请求中。随后，提示词会被发送给 AI 大语言模型，它将基于增强后的提示词生成更准确的内容。

其次是 OpenAI 的 Function Calling，它可以解决 AI 大语言模型调用工具的问题。借助它，我们能让 AI 调用外部工具，例如 API 或函数，从而解决其无法直接操作现实系统的问题。在与 AI 对话时，可以指定一些工具，比如发送邮件时，提供一个发送邮件的 API 并告知收件人。AI 会分析语义，识别出需要发送邮件后，调用相应工具，根据上下文生成参数，最终返回工具结果并将其重新传回模型上下文中，生成最终回复。若邮件发送成功，它会告知我们发送成功；若失败，则会以自然语言通知发送失败。

### 现有工具的局限性

![Limitations of LLM Tools](https://static.api7.ai/uploads/2025/06/04/24WyARyC_apisix-mcp-practices-3.webp)

尽管目前已经有了一些解决方案，但之前提到的三个场景似乎还无法很好地完成，这主要是因为现有工具也存在一些局限性。

首先是技术成熟度不足。RAG 技术依赖分块和向量搜索，分块会导致文本上下文信息断裂。例如一个 Markdown 文档，原本从前往后有完整的介绍和总结，但分块后可能只检索到其中某一部分，知识库看似能提供额外知识，但实际使用时效果并没有那么理想。同时，Function Calling 技术需要预先定义 API 的输入输出结构，灵活度较低，若业务频繁变化，如发邮件场景，还要再搭配系统内数据，维护成本很高。

其次是集成成本高。无论是 RAG 还是 Function Calling，都需企业改造现有数据结构或 API 架构，这对技术储备不足的小团队来说成本高、收益低。并且模型的更新迭代很快，可能当前我们调试效果尚可，但迭代后模型能力虽然变强了，之前做的优化反而会让最终的提问结果变差。此外，这些模型也存在成本问题，Function Calling 是闭源方案，功能设计受限于单一厂商生态，难以跨模型拓展。企业有敏感数据时，不想提供给第三方平台，就需要自行处理，这进一步增加了集成复杂度。正因现有工具有这些局限，才促使厂商思考是否有更好的解决方式。

## MCP 详细介绍

MCP（模型上下文协议，Model Context Protocol）的出现，能够在一定程度上解决之前所提到的现有工具所存在的局限。MCP 由 Anthropic 于 2024 年 11 月底推出，其定位是 AI 应用界的 USB-C 接口，目的在于统一模型与外部工具的通信协议。

![Limitations of LLM Tools](https://static.api7.ai/uploads/2025/06/04/Q9xdEoj2_apisix-mcp-practices-4.webp)

上面这张图片在社区中流传度很高，它将我们的电脑比作一个 MCP 客户端，把 MCP 协议比作拓展坞，而不同的 MCP 服务则是数据线。借助拓展坞和数据线，MCP 客户端能够快速接入各种外部服务。按照这张图的比喻，外部电子产品就好比不同的外部服务，以 AI 大语言模型的能力为例，这些外部服务包括 Slack、Gmail、Facebook 等。

### MCP 的使用场景

接下来为大家介绍一些 MCP 的使用场景，以便大家理解它的具体用途。

![Using Scenarios of MCP](https://static.api7.ai/uploads/2025/06/04/GGn0GK6y_apisix-mcp-practices-5.webp)

- **GitHub MCP**：我们可以使用 GitHub MCP 要求 AI 大语言模型“基于 feature/login分支的修改，向 main 分支提一个 PR，标题为 ‘fix：用户登录页面优化’，并且 @ 团队成员 Alice 和 Bob 进行 review”。AI 大语言模型收到请求后，会分析语意并确定需调用的工具，这里需调用 `create_pull_request` 工具。AI 解析语意后，发现要调用此工具，便依据上下文中提到的标题、艾特的团队成员以及分支等信息生成对应参数并填充到工具里。

- **Figma MCP**：我们可以要求 AI “把 Figma 里登录页的设计转成 React + Tailwind 代码”。AI 大语言模型分析语意后，借助 Figma MCP 获取设计稿中的精确尺寸、颜色和布局数据。我们通过接入 Figma 开放的 API 获取具体图层数据，再按要求转换为对应代码。

- **Browser Tools MCP**：例如，我们可要求 AI“根据控制台报错的 DOM 节点，帮我修复这个 `React hydration` 错误”。MCP 工具帮助 AI 获取浏览器控制台中的上下文信息，如日志或动态数据。AI 读取并分析这些数据后，定位到代码问题所在，进而进行针对性修复。

### MCP 的生态

目前 MCP 服务的生态已经非常丰富。下图截取自一个 MCP 资源站（mcp.so）。其中展示的 MCP 服务包括文件系统、告警系统、自动化测试数据库或者发送请求等，各种品牌和厂商都已经推出自己的 MCP 服务。

![MCP Ecosystem](https://static.api7.ai/uploads/2025/06/04/036VYJ8k_apisix-mcp-practices-6.webp)

### MCP 爆火的原因

MCP 能够爆火，主要有以下原因：

**1. AI 代理落地的“最后一公里”**

MCP 是 AI 代理落地的最后一公里，解决了实际问题，使 AI 能够轻松接入各种工具，如数据库 API 和企业软件等。2024 年年底推出，正值企业竞相追求 AI 落地之际，MCP 恰好补上了最关键的一环。

**2. 社区与生态爆发式增长**

- 初始阶段，MCP 并不火热。然而，像 Block、Replit、Codeium 这样的大企业率先采用 MCP 实现功能落地，为其他开发者和企业树立了榜样，带来了信心。
- 开发者友好：MCP 协议提供 SDK、示例代码和文档，大幅降低了开发门槛。早期，MCP 服务生态尚不完善，但像 Figma、GitHub 这类主流 MCP 服务，因其使用方便、接入简单，逐渐被开发者广泛使用。随着需求增加，开发者数量不断增长，MCP 的生态也逐步构建起来。

**3. AI 世界的普通话**

- MCP 兼容 Claude、ChatGPT-4、DeepSeek 等多种模型，无厂商锁定，由 Anthropic 公司主导，具有行业背书。
- 它基于 LSP（Language Server Protocol / 语言服务器协议） 架构，类似于常见的 VS Code、Cursor 等编辑器支持多种编程语言的原理。以代码格式化为例，每种语言都需要大量适配工作，而面对更复杂的操作，如变量跳转，开发难度会呈指数级增长。LSP 架构则助力编辑器快速接入各种语言特性支持，通过标准化行为规范，方便开发者实现特定逻辑。

**4. 持续进化的协议标准**

MCP 协议在不断进化。Anthropic 发行后仍持续推进其发展，为企业协议和生态补充更多功能，如发布身份鉴权、云连接中央注册库等企业级新特性。同时，Anthropic 积极参与 AI 会议和研讨会进行技术推广，扩大技术传播度。

### MCP 的架构

![MCP Architecture](https://static.api7.ai/uploads/2025/06/04/r4wK9p9T_apisix-mcp-practices-7.webp)

最左边是 MCP 客户端主机，这代表我们平时使用的 Claude、Cursor 或者 Windsurf 等 AI 客户端，它们通过 MCP 协议与 MCP 服务进行对接。一个 MCP 客户端主机可以接入多个 MCP 服务，例如我们之前提到的 GitHub MCP 或者 Figma MCP。我们还可以将这些服务组合使用，例如让它先从 GitHub 拉取代码，之后再生成 Figma 的设计稿等。

MCP 服务除了与我们自己的客户端主机进行交互之外，还会与本地数据源或者互联网上的数据源交互，例如通过 GitHub 的开放 API，我们在使用 MCP 服务时将其传入我们的 token，它就可以通过 API 获取 GitHub 的数据。MCP 的整体架构相对简单，它不会直接与 AI 大语言模型交互，而是通过客户端主机进行交互。

### MCP 中的核心概念

MCP 中有 6 个核心概念，分别是 Tools 工具、Resources 资源、Prompts 提示模板、Sampling 采样内容、Roots 根、Transports 传输方式。这几个概念中，最常用的是 Tools，因为 95 % 的 MCP 服务都用到了 Tools。

![MCP Concepts](https://static.api7.ai/uploads/2025/06/04/dsxk2aw8_apisix-mcp-practices-8.webp)

#### Tools 工具

工具 （Tools）用于让 MCP 服务向客户端公开可以执行的功能。通过工具，AI 可以与外部系统交互、执行计算并在现实世界中采取行动，它的实现结构是这样的：`tool(工具名称，工具描述，入参格式，回调函数)`。

![MCP Tools Example](https://static.api7.ai/uploads/2025/06/06/rAYDrRU5_mcp-example.webp)

工具可以使用 MCP 服务向客户端公开可执行的内容，通过工具，AI 大语言模型可以与外部系统交互执行计算，并在现实世界中采取行动。结构如下，tool 是一个函数，在执行 MCP 服务时有一个实例，tool 是上面的一个函数，最多可以接受四个参数。

例如，如果我们要实现一个用于获取天气数据的工具，工具名称为 `get_whether`，工具描述为“获取指定城市的天气信息，可以通过指定城市名称或者经纬度坐标查询”。AI 大语言模型会根据工具名称和描述进行分析。第三个参数是入参格式，定义入参格式后，就可以实现基于城市查询天气。

第四个参数是回调函数。AI 大模型调用我们的工具后，我们需要执行哪些操作。我们编写了一个模拟发送请求的操作，即 AI 大语言模型调用我们的工具后，我们会发送请求获取对接外部的天气服务，拿到数据后将这些数据返回给 AI 大语言模型。

![MCP Tool Workflow](https://static.api7.ai/uploads/2025/06/04/kJKnsdqp_apisix-mcp-practices-10.webp)

从以上流程图可以看出，当用户提出需求（如查询北京天气）时，系统已接入 MCP 服务来获取天气信息。MCP 会为 AI 提供工具列表，如 `get_weather` 或 `search_news`，这些工具都有对应的名称和描述。AI 大语言模型会解析语意，匹配最合适的工具（如查询北京天气时匹配 `get_weather`），然后根据预定义的入参格式（如 `city: 参数样式`）生成相应参数（如 `city: 北京`）。

参数生成后传递给 MCP 服务，系统调用工具并发送 API 请求，工具返回响应的 JSON 数据。工具响应的 JSON 数据有些比较简单易读，但有的比较复杂难懂，不过最终都会提供给 AI 大语言模型，由其总结成人类可读的自然语言结果反馈给用户。

## APISIX-MCP 实践

APISIX 是一款高性能 API 网关，但因其资源复杂，学习成本较高。为此，APISIX-MCP 应运而生，其目标是通过自然语言简化 API 管理流程，降低技术门槛。APISIX-MCP 的核心功能包括自然语言配置路由、管理上游服务以及插件操作与配置。通过这些功能，它能够提高运维效率，实现智能化管理。

APISIX-MCP 支持以下操作：

![Operations supported by APISIX-MCP](https://static.api7.ai/uploads/2025/06/04/ieaJ3V0t_apisix-mcp-practices-11.webp)

总体来说，APISIX 里面的所有资源都可以通过自然语言的方式进行交互。我们还提供了一些用于验证配置是否生效的功能，例如发送请求给网关，只要在环境变量中定义能够访问 APISIX 服务的地址，在执行操作之后，就可以让 AI 验证操作是否成功。

## 演示

### APISIX-MCP 配置

在本次演示中，我使用 Cursor 作为 AI 客户端。若大家使用 MCP，流程与此类似。

首先，点击右上角的设置，左侧面栏中有个 MCP，我已提前配置好。如果此处为空，点击 “添加新的全局 MCP” 可跳转到配置文件。

```json
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

在 “MCP Servers” 字段，我添加了名为 `apisix-mcp` 的服务，大家可自定义名称。配置完成后，需运行命令以启动 MCP 服务。我通过 Node.js 的命令行工具 npx 来操作，APISIX 的 MCP 已发布到 npm 包管理器，可直接线上获取。大家可根据开发语言选择对应工具。

`-y` 参数表示默认允许安装依赖。`apisix-mcp` 是指服务名称。除前两个参数外，还可传入环境变量，但 APISIX-MCP 内的环境变量有默认值，无需单独传递。如果 APISIX-MCP 仅本地运行且未更改配置，也无需传递环境变量。

配置完成后，MCP 处会新增一个名为 `apisix-mcp` 的服务，小绿点表示连接成功，并展示所提供的工具，这些都是 APISIX-MCP 提供的工具。

![APISIX-MCP Tools](https://static.api7.ai/uploads/2025/06/06/ypIeLxZK_1-apisix-tools.webp)

### APISIX-MCP 场景演示

接下来为大家进行实际例子的演示。

![APISIX-MCP Demo](https://static.api7.ai/uploads/2025/06/04/m8zfKCFX_apisix-mcp-practices-12.webp)

#### 创建基础路由

我设置了一些场景，例如我们让 APISIX-MCP “帮我创建一个指向 `https://httpbin.org` 的路由，id 为 `httpbin`，代理前缀为 `/ip` 请求，并且给网关发请求验证是否配置成功”。

它解析我们的语意后，发现我们需要调用 MCP 服务实现功能。这里调用了一个工具，即 `create_roots` 里的参数。我们已经提供了上下文，点击 run tool 进行确认。在生产环境中，运维层面的配置都很关键，不能随意更改，因而需要进行确认这个步骤。点击 run tool 后，我们可以看到响应，了解调用 API 后的具体情况，包括它会执行什么功能、向网关发送请求，以及验证路由是否创建成功。再次点击 run tool，创建成功。

![Create a Route](https://static.api7.ai/uploads/2025/06/06/UuTuMbed_2-apisix-demo-1.webp)

我们不需要太关注这些响应内容，系统会自动创建路由并发送测试请求进行验证，最后会汇总执行结果。上述操作如果想自己配置的话，需要在命令行设置 API 密钥，还得构建完整的测试命令。如果操作过程中的输入有误却未能及时发现，还得再花额外的时间去排查。

#### 配置负载均衡

我们将对现有路由进行调整。我们为刚才创建的路由新增一个上游节点，指向的是将 `mock.api7.ai` 前缀修改为 `/headers`，透传的 host 使用上游节点的 host，且负载均衡使用最小连接数的策略，然后给网关发十个请求验证是否配置成功。

![Configure Load Balancing](https://static.api7.ai/uploads/2025/06/06/S2aRjAIw_3-apisix-demo-1.webp)

#### 配置请求认证

第三步，为 id 为 httpbin 路由开启 `key-auth` 插件，然后创建一个开启 `key-auth` 的消费者，名字为 zhihuang，随机生成一个安全性高的 key 并告诉我，然后给网关发一个请求验证是否配置成功。

![Configure Authentication Plugin](https://static.api7.ai/uploads/2025/06/06/HEowAo0w_4-apisix-demo-1.webp)

MCP 自动开启了 key-auth 认证插件，创建了消费者，并基于随机生成的消费者凭证进行校验。校验过程中，它先携带凭证请求，再不带凭证请求，从而确认配置完成。

#### 配置插件

最后，配置插件，要求 AI “为我的 httpbin 路由开启跨域，然后配置限流限速，每 1 分钟只能请求两次，超出的请求响应 `503`，然后给网关发一个请求验证是否配置成功。”

![Configure Authentication Plugin](https://static.api7.ai/uploads/2025/06/06/SxHopLf8_5-apisix-demo-1.webp)

## 总结

MCP 带来了诸多可能性，尽管目前可能不够稳定，但随着模型能力的提升，其应用场景将更加丰富。我们通过泛化语言实现目标，让 AI 大语言模型快速生成解决方案。现在，我们只需提出需求，就能让 AI 完成整个需求闭环，简化日常运维和开发。这在各个层面都具有重要价值，且上手成本低。若要开发类似协议，只需熟悉 Java、Go、JS 等编程语言，一天时间就可完成接入，企业能从迅速从中受益。

最后，APISIX-MCP 的价值在于帮助新用户快速掌握 APISIX，为复杂的 API 管理提供智能化的新方案。它将执行具体操作转变为描述泛化场景，推动 AI 与 API 管理的深度融合。未来，我们还将在 API 管理层面进一步融合 AI，并增强 APISIX 网关对 AI 流量的处理能力。
