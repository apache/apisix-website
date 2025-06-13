---
title: "Configure APISIX in a Single Command with APISIX-MCP"
authors:
  - name: Zhihuang Lin
    title: author
    url: https://github.com/oil-oil
    image_url: https://github.com/oil-oil.png
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - open source
  - API gateway
  - Apache APISIX
  - AI gateway
  - APISIX AI gateway
description: This article is based on Zhihuang Lin's presentation at the APISIX Shenzhen Meetup on April 12, 2025.
tags: [Case Studies]
image: https://static.apiseven.com/uploads/2024/12/25/dxrwyegf_api7-cover.png
---

> Author: Zihuang Lin, Frontend Developer & Product Manager at API7.ai. This article is based on Zhihuang Lin's presentation at the APISIX Shenzhen Meetup on April 12, 2025.
<!--truncate-->

This presentation is divided into five sections: limitations of large AI language models, what MCP is and its utility, the implementation principles and advantages of MCP, APISIX's practice based on MCP, and an APISIX-MCP demo.

## Current Applications of AI Large Language Models

AI has integrated into various aspects of our lives. Here are some application scenarios for large AI language models:

- **Interactive**: Interview simulations, language practice, intelligent customer service.
- **Content Generation**: Paper editing, technical documentation organization, video script creation.
- **Programming Assistance**: Code suggestions (e.g., Cursor/Windsurf) and generation, bug troubleshooting.
- **Multimodal**: Image, audio, and video generation.

As AI capabilities continuously improve and costs decrease, our expectations for it are rising. We are no longer satisfied with single-point functions; we hope to form a complete demand closed-loop. Let's look at three typical scenarios:

- **Scenario 1, Daily Office**: "Help me send a follow-up email to Manager Zhang, attach yesterday's meeting minutes PDF, and schedule a call with him next Tuesday at 3 PM."
- **Scenario 2, Development**: "Develop an application for a sports wristband to record daily water intake, with a button counting function and chart statistics, then publish it to the app store."
- **Scenario 3, Operations**: "Server CPU load has continuously exceeded 90%. Help me investigate the cause and try to fix it."

However, even the most advanced AI currently struggles to handle these scenarios perfectly, primarily due to the inherent limitations of large language models.

## Limitations of AI LLMs

Current model limitations are mainly in two aspects: data silos and the "missing hands and feet" problem.

The data silo problem is like "a clever housewife cannot cook without rice." The knowledge of large AI language models is based on a knowledge snapshot from a past point in time. For example, if you ask it to send an email to Manager Zhang, it might not know who Manager Zhang is or what his email address is. Similarly, for wristband app development or CPU load troubleshooting, without the latest documentation or system context information, AI has no way to start.

![Limitations of LLMs](https://static.api7.ai/uploads/2025/06/05/SCwZYwBO_1-limitations-of-ai-llms.webp)

The second limitation is the lack of "hands and feet." Models are good at generating content but lack execution capabilities.

Want AI to actually send emails? We might need to provide it with email-related APIs. Expecting automatic app publication to a store? It requires integration with the app store's publishing interface. Handling server failures? Ultimately, operations personnel still need to manually execute troubleshooting commands.

The AI content consumption process includes four stages:

1. **User Query (Provide more detailed information)**: The user provides basic background information (text, images, etc.) and asks a question.
2. **Content Generation (Model fine-tuning)**: The large AI model generates content such as text, images, audio, or video.
3. **Content Consumption (Provide tools for corresponding actions)**: Requires manual execution by the user or automated execution of tasks through tools.
4. **Task Completion (Provide tools to check execution results)**: Finally, the user or system obtains the execution results.

To optimize this process, we can:

1. First, in the user query stage, we need to provide as much detailed context information as possible. For example, in the email scenario, if we need to send an email to a specific user, we directly provide the email address to the large AI language model or provide system metrics to help the AI model generate more accurate content.
2. In the content generation stage, through model fine-tuning, the large AI model can specifically learn special capabilities in a certain field to enhance its knowledge base.
3. In the content consumption and task confirmation stages, provide tools for the large AI language model. For example, after an email is sent, provide an API to read sent emails so that the large AI language model can determine if the operation was successful by checking the send response.

### Existing Solutions

Although large AI language models have their limitations, some corresponding solutions already exist.

![Solutions for LLMs](https://static.api7.ai/uploads/2025/06/05/Vjp2tlXP_2-solutions-of-ai-llms.webp)

#### RAG (Retrieval-Augmented Generation)

First is RAG (Retrieval-Augmented Generation), which allows large AI language models to access external knowledge bases and obtain the latest data. For example, by integrating wristband development documentation, the AI can learn specifically about it. When we ask a question, it first retrieves relevant information from the knowledge base, then sends this information along with the question to the AI, allowing the AI to generate more accurate content.

#### Function Calling

Next is OpenAI's Function Calling, which solves the problem of large AI language models calling tools. With it, we can enable AI to call external tools, such as APIs or functions, thereby addressing the issue of AI not being able to directly operate real-world systems.

When conversing with AI, we can specify some tools, such as providing an email sending API and specifying the recipient when sending an email. The AI will analyze the semantics, identify the need to send an email, call the corresponding tool, generate parameters based on the context, and finally pass the tool execution result back to the model to generate the final reply.

### Limitations of Existing Tools

![Limitations of LLM Tools](https://static.api7.ai/uploads/2025/06/05/rNO2Hqrr_3-limitations-of-existing-tools.webp)

Despite these solutions, the three scenarios mentioned earlier still cannot be perfectly resolved because existing tools also have some limitations.

First, the technical maturity is insufficient. RAG technology relies on chunking and vector search, where chunking can lead to text context information discontinuity. Although knowledge bases seemingly provide additional knowledge, their actual performance is not as ideal. For example, a Markdown document, originally with a complete introduction and summary, might only retrieve a part of it after chunking. Meanwhile, Function Calling technology requires pre-defining the input and output structures of APIs, which offers less flexibility. If the business frequently changes, such as in email sending scenarios that also require system data, the maintenance cost is very high.

Second, integration costs are high. Whether it's RAG or Function Calling, enterprises need to modify existing data structures or API architectures, which is high-cost and low-return for small teams with insufficient technical reserves. Moreover, models iterate quickly; what works well today might perform worse after a model update tomorrow. Additionally, Function Calling is a closed-source solution, leading to vendor lock-in issues and making cross-model expansion difficult. When enterprises have sensitive data, it's inconvenient to provide it to third-party platforms, requiring self-handling, which further increases integration complexity. It is precisely these limitations of existing tools that prompt vendors to consider whether there is a better solution.

## Detailed Introduction to MCP

The emergence of MCP (Model Context Protocol) addresses some of the limitations of existing tools. MCP was introduced by Anthropic in late November 2024, aiming to become the USB-C interface for AI applications, unifying the communication protocol between models and external tools.

![Limitations of LLM Tools](https://static.api7.ai/uploads/2025/06/05/iqmrV2gf_4-what-is-mcp.webp)

This image is widely circulated in the community and vividly illustrates the role of MCP: comparing a computer to an MCP client, the MCP protocol to a docking station, and different MCP services to data cables. Through the docking station and data cables, the MCP client can quickly connect to various external services, such as Slack, Gmail, Facebook, etc.

### MCP Usage Scenarios

Let's look at what MCP does in practical scenarios.

![Using Scenarios of MCP](https://static.api7.ai/uploads/2025/06/05/VZqktNxy_5-use-cases-of-mcp.webp)

- **GitHub MCP**: We can instruct the large AI language model to "create a PR to the `main` branch based on modifications in the `feature/login` branch, with the title 'fix: user login page optimization', and @ team members Alice and Bob for review." After receiving the request, the large AI language model will analyze the semantics, then call the `create_pull_request` tool, generate and populate parameters based on the context information.

- **Figma MCP**: We can tell AI: "Convert the login page design in Figma into React + Tailwind code." After analyzing the semantics, AI uses Figma MCP to obtain precise dimensions, colors, and layout data from the design draft. By integrating Figma's open API, we obtain specific layer data and convert it into corresponding code as required.

- **Browser Tools MCP**: We can tell AI: "Help me fix this `React hydration` error based on the DOM node reported in the console." The MCP tool will help AI obtain browser console logs or DOM node data. After AI reads and analyzes them, it can locate and fix the code issue.

### MCP Ecosystem

The MCP service ecosystem is thriving. The following screenshot is from an MCP resource hub (mcp.so). It lists existing MCP services, including file systems, alert systems, automation testing databases, or sending requests. Many brands and vendors have launched their own MCP services.

![MCP Ecosystem](https://static.api7.ai/uploads/2025/06/05/uILI1Nav_6-mcp-ecosystem.webp)

### Reasons for MCP's Rapid Growth

MCP has gained rapid popularity for the following reasons:

**1. The "Last Mile" for AI Agent Implementation**

MCP solves practical problems by allowing AI to easily connect to various tools, such as database APIs and enterprise software. By the end of 2024, enterprises are pursuing AI implementation, and MCP fills the most critical gap.

**2. Explosive Growth of Community and Ecosystem**

- Initially, MCP was not very popular. However, large enterprises like Block, Replit, and Codeium were the first to adopt MCP for functional implementation, setting an example and building confidence for other developers and enterprises.

- Developer-friendly: The MCP protocol provides SDKs, sample code, and documentation, significantly lowering development barriers. Although the early MCP service ecosystem was not perfect, mainstream MCP services like Figma and GitHub were widely used by developers due to their convenience and ease of use. As demand increased, the number of developers grew, and the MCP ecosystem gradually formed.

**3. The "Lingua Franca" of the AI World**

- MCP is compatible with various models such as Claude, ChatGPT-4, and DeepSeek, without vendor lock-in, and is led by Anthropic, providing industry endorsement.

- It is based on the LSP (Language Server Protocol) architecture, which is similar to how editors like VS Code and Cursor support multiple programming languages. The LSP architecture helps editors quickly integrate various language features, standardizing behaviors for developers to implement specific logic.

**4. Continuously Evolving Protocol Standards**

The MCP protocol is constantly evolving. Anthropic continues to actively promote its development after release, adding more features to enterprise protocols and ecosystems, such as identity authentication, cloud-connected central registries, and other enterprise-grade new features. At the same time, Anthropic actively participates in AI conferences and seminars to promote this technology.

### MCP Architecture

![MCP Architecture](https://static.api7.ai/uploads/2025/06/06/Cd0weD3t_mcp-architecture-en.webp)

On the far left is the MCP client host, which refers to the AI clients we usually use, such as Claude, Cursor, or Windsurf. They interface with MCP services via the MCP protocol. An MCP client host can connect to multiple MCP services, such as GitHub MCP or Figma MCP. We can even combine these services, for example, by pulling code from GitHub first and then generating Figma design drafts.

In addition to interacting with client hosts, MCP services also interact with local data sources or internet data sources. For instance, through GitHub's open API, when using an MCP service, we pass a token to access GitHub data. The overall MCP architecture is relatively simple; it does not directly interact with large AI language models but rather through client hosts.

### Core Concepts in MCP

There are 6 core concepts in MCP: Tools, Resources, Prompts, Sampling, Roots, and Transports. Among these concepts, Tools are the most commonly used, with 95% of MCP services utilizing them.

![MCP Concepts](https://static.api7.ai/uploads/2025/06/05/GyuQ4KXK_8-core-concepts-of-mcp.webp)

#### Tools

Tools are the way MCP services expose functionalities to the client. Through tools, AI can interact with external systems, perform computations, and take actions in the real world. Its implementation structure is: `tool(tool name, tool description, input parameter format, callback function)`.

![MCP Tools](https://static.api7.ai/uploads/2025/06/05/nKAAsSuk_12-example.webp)

Tools can be used by MCP services to expose executable content to clients. Through tools, large AI language models can interact with external systems to perform computations. A tool is a function on the MCP instance that can accept up to four parameters.

For example, suppose we want to implement a tool to obtain weather data. We can name the tool `get_weather`, and the tool description would be "Retrieve weather information for a specified city, which can be queried by city name or longitude and latitude coordinates." The large AI language model will refer to the tool name and description for semantic analysis when deciding whether to call an MCP tool. The third parameter is the input parameter format, which describes how the AI needs to construct parameters when calling this tool.

The fourth parameter is the callback function, which determines what operation we need to perform after the large AI model calls our tool. For instance, we can write an operation that simulates sending a request. When the large AI language model calls our tool, we will send a request to an external weather service, retrieve the data, and then return it to the large AI language model.

![MCP Tool Workflow](https://static.api7.ai/uploads/2025/06/05/jYstzYB2_9-tools-invocation-process.webp)

From the above flowchart, it can be seen that when a user makes a request (e.g., querying Beijing weather), the system has already integrated an MCP service to obtain weather information. MCP will provide the AI with a list of tools, such as `get_weather` or `search_news`, each with a corresponding name and description. The large AI language model will parse the semantics, match the most suitable tool (e.g., `get_weather` when querying Beijing weather), and then generate corresponding parameters (e.g., `city: Beijing`) based on the predefined input parameter format (e.g., `city: parameter_style`).

After parameters are generated, they are passed to the MCP service. The system calls the tool and sends an API request, and the tool returns JSON data in response. Some of this JSON data is simple and easy to read, while some is more complex, but ultimately it is provided to the large AI language model, which then summarizes it into a natural language result that humans can understand and feeds it back to the user.

## APISIX-MCP Practices

APISIX is a high-performance API Gateway. Due to its extensive functionalities, it contains many resource types, such as services, routes, and upstreams, making the learning curve for beginners quite steep. To address this, APISIX-MCP was developed with the goal of simplifying API management processes and lowering technical barriers through natural language. The core function of APISIX-MCP is to configure routes and manage upstream services and various other APISIX resources using natural language.

Currently, APISIX-MCP supports operations on the following resource types:

![Operations supported by APISIX-MCP](https://static.api7.ai/uploads/2025/06/05/N2HyscJd_10-operations-supported-by-apisix-mcp.webp)

Overall, all resources within APISIX can be interacted with using natural language. We also provide features to verify whether configurations are effective, such as asking AI to send requests to the gateway to validate and request results. As long as the APISIX service address is defined in the environment variables, after performing an operation, AI can verify whether the operation was successful.

## Demo

### APISIX-MCP Configuration

In this demo, I use Cursor as the AI client. If you use MCP, the process is similar.

First, click on the settings in the top right corner. In the left sidebar, there is an MCP section, which I have pre-configured. If it's empty, click "Add new global MCP" to navigate to the configuration file.

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

In the "mcpServers" field, I added a service named `apisix-mcp`; you can customize the name. After configuration, you need to run a command to start the MCP service. I'm using Node.js's command-line tool npx for this operation. APISIX's MCP has already been published to the npm package manager and can be obtained directly online. You can choose the corresponding tool based on your development language.

The `-y` parameter means to allow dependency installation by default. `apisix-mcp` refers to the service name. In addition to the first two parameters, you can also pass extra environment variables, but APISIX-MCP's environment variables have default values. If your APISIX runs locally without configuration changes, you can use the default environment variables without specifying them.

After configuration, a new service named `apisix-mcp` will appear in the MCP section. The green dot indicates a successful connection, and it will display the tools it provides.

![APISIX-MCP Tools](https://static.api7.ai/uploads/2025/06/06/ypIeLxZK_1-apisix-tools.webp)

### APISIX-MCP Scenario Demo

Next, I will demonstrate practical examples.

#### Create a Route

I've set up some scenarios, for instance, asking APISIX-MCP to "help me create a route pointing to `https://httpbin.org` with an ID of `httpbin`, proxying `/ip` requests, and sending a request to the gateway to verify successful configuration."

After parsing our semantics, it finds that we need to call the MCP service to implement the functionality. Here, it calls a tool, specifically the parameters within `create_roots`. We have provided the context, so click "run tool" to confirm. In a production environment, operations-level configurations are crucial and cannot be changed arbitrarily, hence this confirmation step is necessary.

After clicking "run tool," we can see the response, understanding the specific actions after calling the API, including what functions it will execute, sending requests to the gateway, and verifying if the route was successfully created. Click "run tool" again, and the creation is successful.

![Create a Route](https://static.api7.ai/uploads/2025/06/06/YWFgEXJv_2-apisix-demo-en.webp)

We don't need to pay too much attention to these response contents; the system will automatically create the route and send test requests for verification, finally summarizing the execution results. If you manually configure these operations, you'd need to set API keys in the command line and build complete test commands. If you make a mistake during the operation and don't notice it in time, you'd have to spend extra time troubleshooting.

#### Configure Load Balancing

We will adjust the existing route. We add an upstream node to the route we just created, pointing to `mock.api7.ai` with the prefix changed to `/headers`, using the upstream node's host for host pass-through, and applying a least-connections load balancing strategy. Then, we send ten requests to the gateway to verify successful configuration.

![Configure Load Balancing](https://static.api7.ai/uploads/2025/06/06/30qqIOAZ_3-apisix-demo-en.webp)

#### Configure Authentication

In the third step, enable the `key-auth` plugin for the route with ID `httpbin`, then create a consumer named `zhihuang` with `key-auth` enabled. Ask AI to randomly generate a secure key and tell me, then send a request to the gateway to verify successful configuration.

![Configure Authentication](https://static.api7.ai/uploads/2025/06/06/0q5QxuIk_4-apisix-demo-en.webp)

MCP automatically enabled the `key-auth` authentication plugin, created a consumer, and performed verification based on the randomly generated consumer credentials. During the verification process, it first tests requests with credentials, then tests requests without credentials, confirming that the configuration is correctly completed.

### Configure Plugins

Finally, configure plugins, asking AI to "enable cross-origin for my `httpbin` route, then configure rate limiting to allow only two requests per minute, responding with `503` for exceeding requests, and then send a request to the gateway to verify successful configuration."

![Configure Plugins](https://static.api7.ai/uploads/2025/06/06/QucQJBVZ_5-apisix-demo-en.webp)

## Summary

MCP opens up many possibilities. While it might not be entirely stable yet, its application scenarios will become increasingly rich as model capabilities improve. We use generalized language to achieve goals, allowing large AI language models to quickly generate solutions. Now, we only need to state our requirements, and AI can complete the entire closed-loop demand, greatly simplifying daily operations and development. This holds significant value at all levels, and the barrier to entry is very low.

If you wish to develop similar MCP services, you only need to be familiar with any programming language like Java, Go, or JS, and you can complete the integration in a day, helping enterprises quickly connect their APIs to large AI language models.

The value of APISIX-MCP lies in helping new users quickly get started with APISIX and providing an intelligent new solution for complex API management. It transforms executing specific operations into describing generalized scenarios, promoting the deep integration of AI and API management. In the future, we will further explore the integration with AI management at the API management level and continuously enhance APISIX's ability to handle AI traffic at the gateway level.
