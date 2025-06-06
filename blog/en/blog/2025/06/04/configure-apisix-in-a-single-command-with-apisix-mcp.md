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

> Author: Zhihuang Lin, Frontend Developer and Product Manager at API7.ai. This article is based on Zhihuang Lin's presentation at the APISIX Shenzhen Meetup on April 12, 2025.
<!--truncate-->

Today's sharing is divided into five parts: the limitations of AI large language models (LLMs), what MCP is and its utility, the implementation principles and advantages of MCP, APISIX's practice with MCP, and a demonstration of APISIX-MCP.

## Current Applications of AI Large Language Models

AI has permeated every aspect of our lives. Here are some application scenarios for AI LLMs:

- Interactive: Mock interviews, language practice with AI, intelligent customer service.
- Content generation: Thesis editing, technical documentation organization, video scriptwriting.
- Programming assistance: Code prompts (e.g., Cursor/Windsurf) and generation, bug - fixing help.
- Multimodal: Image, audio - and video - content generation.

As AI LLMs become more powerful and cost-effective, our expectations for them continue to rise. We hope they can close the loop on entire requirements, not just generate documents. I have outlined three scenarios that we envision AI could optimize in the future:

- **Scenario 1**: Send a follow-up email to Customer Manager Zhang, attach the minutes of yesterday's meeting in PDF format, and schedule a call for next Tuesday at 3 PM.
- **Scenario 2**: Develop an app for a fitness band to record daily water intake, featuring button functionality and chart statistics, and publish it to an app store.
- **Scenario 3**: The server's CPU load has been consistently above 90%. Investigate the cause and attempt to resolve it.

While AI capabilities are advancing, these scenarios cannot yet be perfectly closed-loop, due to the inherent limitations of AI LLMs.

## Limitations of AI LLMs

AI LLMs face two primary limitations: the data silo problem and the absence of agency.

The data - silo problem can be likened to "even a skilled cook can't make a meal without ingredients". AI LLMs rely on knowledge snapshots up to a certain time. For example, in an office scenario, if we ask an AI to email Manager Zhang, it may not know who Manager Zhang is or his/her email address.

In programming, although AI programming tools can assist in developing iOS apps or mini-programs, they may struggle with fitness band applications due to unfamiliarity with the band's system or the frequent updates to its documentation. Additionally, if AI LLMs are only told "high CPU load," they lack the necessary contextual information, such as system process metrics, to effectively assist in resolving the issue.

![Limitations of LLMs](https://static.api7.ai/uploads/2025/06/05/SCwZYwBO_1-limitations-of-ai-llms.webp)

The second limitation is the absence of agency—the gap between knowing and doing. AI LLMs are fundamentally content generators. To enable them to perform specific actions, corresponding tools must be provided. For instance, in the first scenario, AI LLMs do not know how to send emails or schedule client meetings. Typically, to execute these tasks, we provide APIs like the Gmail API and instruct AI to invoke the API to send emails to the specified recipients.

The second scenario is similar. If we want AI to publish an app to an app store, the store must offer an open publishing API. In the third scenario, if we want AI LLMs to help diagnose high CPU load issues, they cannot directly execute commands to fix the problem within the system. Instead, they might provide commands for manual execution. After completing the task, we need to feedback the diagnosed cause to AI.

Below is the AI content consumption workflow:

1. User Inquiry: Provide basic background information such as text or images and pose a question.
2. Content Generation: The AI LLM generates content such as text, images, audio, or video.
3. Content Consumption: Manually execute tasks or automate them using tools.
4. Task Completion: The end user or system obtains the execution results.

In these four steps, we can optimize AI in the following ways:

1. During the user inquiry phase, we need to provide as much contextual information as possible. For example, in the email scenario, we can directly provide the user's email address to the AI LLM or offer system metrics to help it generate more precise content.
2. During the content generation phase, fine-tune the model to enable AI LLMs to learn specialized capabilities in a specific domain, thereby enhancing their knowledge base.
3. In the content consumption and task confirmation phases, equip AI LLMs with tools. For instance, after sending an email, provide an API to read sent emails, allowing the AI LLM to determine the success of the operation by responses.

### Solutions

While AI LLMs have limitations, there are existing solutions.

![Solutions for LLMs](https://static.api7.ai/uploads/2025/06/05/Vjp2tlXP_2-solutions-of-ai-llms.webp)

Firstly, RAG (Retrieval-Augmented Generation) enables AI LLMs to access external knowledge bases, providing up-to-date data. For example, in the programming scenario, we can connect to the development documentation for fitness bands, allowing AI LLMs to acquire targeted additional knowledge. When we pose a question to AI, it retrieves relevant information from the external knowledge base, integrates it into the request, and sends the enhanced prompt to the AI LLM, which then generates more accurate content.

Secondly, OpenAI's Function Calling addresses the issue of AI LLMs invoking tools. With this feature, we can enable AI to call external tools such as APIs or functions, resolving its inability to directly interact with real-world systems. During a conversation with AI, we can specify certain tools.

For instance, when sending an email, we can provide an email-sending API along with the recipient's information. AI analyzes the semantics, identifies the need to send an email, invokes the corresponding tool, generates parameters based on the context, and returns the tool's result to the model's context to generate the final response. If the email is sent successfully, it will notify us of success; if it fails, it will inform us of the failure in natural language.

### Limitations of Existing Tools

![Limitations of LLM Tools](https://static.api7.ai/uploads/2025/06/05/rNO2Hqrr_3-limitations-of-existing-tools.webp)

Despite these solutions, the three scenarios mentioned earlier cannot yet be effectively completed. This is primarily due to the limitations of existing tools.

Firstly, current technology isn't fully developed. RAG (Retrieval-Augmented Generation) technology relies on text chunking and vector search. Chunking can break the context of a text. For instance, in a Markdown document, the original text may have a complete introduction and summary from beginning to end, but after chunking, only a part of it may be retrieved. Although the knowledge base seems to provide additional knowledge, the actual performance is not as good as expected. Meanwhile, Function Calling technology requires predefined API input and output structures, which is less flexible. In frequently changing business scenarios, such as email sending, it must also integrate with internal system data, resulting in high maintenance costs.

Secondly, the integration cost is high. Whether for RAG or Function Calling, enterprises need to modify existing data structures or API architectures. This poses high costs and low returns for small teams with limited technical resources. Furthermore, models are updated and iterated rapidly. While debugging yields satisfactory results, subsequent iterations may enhance model capabilities but degrade previous optimizations, leading to worse query outcomes.

Additionally, these models involve cost issues. Function Calling is a closed-source solution, with functionality constrained by a single vendor's ecosystem, making it difficult to expand across models. When enterprises handle sensitive data and prefer not to share it with third-party platforms, they must manage it independently, further increasing integration complexity. Due to these limitations of existing tools, vendors are compelled to explore better solutions.

## In-Depth Introduction to MCP

MCP (Model Context Protocol) can address some of the limitations of existing tools. MCP was introduced by Anthropic at the end of November 2024. It aims to serve as the USB-C interface of the AI application world, standardizing the communication protocol between models and external tools.

![Limitations of LLM Tools](https://static.api7.ai/uploads/2025/06/05/iqmrV2gf_4-what-is-mcp.webp)

The above diagram has gained popularity in the community. It analogizes our computer to an MCP client, the MCP protocol to a docking station, and different MCP services to data cables. With the docking station and data cables, the MCP client can quickly connect to various external services. Following this analogy, external electronic devices represent different external services. Taking the capabilities of AI LLMs as an example, these external services include platforms like Slack, Gmail, and Facebook.

### Use Cases for MCP

Below, we introduce use cases for MCP to illustrate its specific applications.

![Using Scenarios of MCP](https://static.api7.ai/uploads/2025/06/05/VZqktNxy_5-use-cases-of-mcp.webp)

- **GitHub MCP**: We can use GitHub MCP to ask AI LLMs to "create a PR based on the modifications in the feature/login branch to the main branch, titled 'fix: Optimize User Login Page,' and @ team members Alice and Bob for review." After receiving the request, the AI LLM analyzes the semantics and determines the tool to invoke—in this case, `create_pull_request`. Upon analyzing the semantics, the AI identifies the need to invoke this tool and generates corresponding parameters based on the title, mentioned team members, and branch information provided in the context, filling them into the tool.

- **Figma MCP**: We can request AI to "convert the login page design in Figma into React + Tailwind code." The AI LLM analyzes the semantics and leverages Figma MCP to obtain precise dimensions, colors, and layout data from the design. By integrating with Figma's open API, we retrieve specific layer data and convert it into the required code.

- **Browser Tools MCP**: For example, we can ask AI, "Based on the DOM node reported in the console error, help me fix this `React hydration` error." MCP tools assist AI in obtaining contextual information from the browser console, such as logs or dynamic data. After reading and analyzing this data, AI locates the code issue and performs targeted repairs.

### MCP Ecosystem

The MCP service ecosystem is thriving. The following screenshot is from an MCP resource hub (mcp.so). It lists existing MCP services, including file systems, alert systems, automation testing databases, or sending requests, with various brands and manufacturers offering their own MCP services.

![MCP Ecosystem](https://static.api7.ai/uploads/2025/06/05/uILI1Nav_6-mcp-ecosystem.webp)

### Reasons for MCP's Rapid Growth

MCP has gained rapid popularity for the following reasons:

**1. The "Last Mile" for AI Agent Implementation**

MCP bridges the "last mile" for AI agent implementation, addressing practical issues and enabling AI to easily connect with various tools, such as database APIs and enterprise software. Launched at the end of 2024, it perfectly complements the critical gap as businesses race to adopt AI.

**2. Explosive Growth of Community and Ecosystem**

- Initially, MCP was not very popular. However, large enterprises like Block, Replit, and Codeium were the first to adopt MCP for feature implementation, setting an example and boosting confidence among other developers and businesses.
- Developer-friendly: The MCP protocol offers SDKs, sample code, and documentation, significantly lowering the development threshold. Early on, while the MCP service ecosystem was not yet robust, mainstream MCP services like Figma and GitHub were user-friendly and easy to integrate, gradually gaining widespread adoption among developers. As demand increased, the number of developers and the MCP ecosystem grew steadily.

**3. The Common Language of the AI World**

- MCP is compatible with multiple models, including Claude, ChatGPT-4, and DeepSeek, without vendor lock-in. Backed by Anthropic, it has industry credibility.
- It is based on the LSP (Language Server Protocol) architecture, similar to how common editors like VS Code and Cursor support multiple programming languages. For instance, code formatting requires significant adaptation work for each language, and more complex operations like variable navigation exponentially increase development complexity. The LSP architecture enables editors to quickly integrate various language features by standardizing behavioral norms, facilitating developers in implementing specific logic.

**4. Continuously Evolving Protocol Standards**

The MCP protocol is constantly evolving. After its release by Anthropic, the company continues to advance its development, adding more functionalities to the protocol and ecosystem for businesses. The features include publishing identity authentication, cloud connection central registration repositories, and other enterprise-level features. Additionally, Anthropic actively participates in AI conferences and workshops to promote its technology and expand its reach.

### MCP Architecture

![MCP Architecture](https://static.api7.ai/uploads/2025/06/06/Cd0weD3t_mcp-architecture-en.webp)

On the far left is the MCP client host, representing AI clients we commonly use, such as Claude, Cursor, or Windsurf. These clients connect with MCP services via the MCP protocol. A single MCP client host can connect to multiple MCP services, such as GitHub MCP or Figma MCP mentioned earlier. These services can also be combined, for example, first pulling code from GitHub and then generating Figma design drafts.

In addition to interacting with our own client hosts, MCP services also communicate with local or internet-based data sources. For instance, through GitHub's open API, when using MCP services, we input our token, allowing the service to retrieve GitHub data via the API. The overall MCP architecture is relatively simple; it does not interact directly with AI LLMs but does so through client hosts.

### Core Concepts in MCP

MCP encompasses six core concepts: Tools, Resources, Prompts, Sampling, Roots, and Transports. Among these, Tools are the most frequently used, employed by 95% of MCP services.

![MCP Concepts](https://static.api7.ai/uploads/2025/06/05/GyuQ4KXK_8-core-concepts-of-mcp.webp)

#### Tools

Tools enable MCP services to expose executable functionalities to clients. Through tools, AI can interact with external systems, perform computations, and take actions in the real world. The implementation structure is as follows: `tool(tool name, tool description, input parameter format, callback function)`.

![MCP Tools](https://static.api7.ai/uploads/2025/06/05/nKAAsSuk_12-example.webp)

Tools allow MCP services to expose executable content to clients. AI LLMs can interact with external systems, execute computations, and perform real-world actions through tools. The structure is as follows: tool is a function with up to four parameters when executing MCP services.

For example, to implement a tool for retrieving weather data, the tool name is `get_weather`, and the description is "Retrieve weather information for a specified city, queryable by city name or geographic coordinates." AI LLMs analyze the tool name and description. The third parameter defines the input parameter format, enabling weather queries based on the city.

The fourth parameter is the callback function. After AI LLMs invoke our tool, we need to define the subsequent operations. We have written a simulated request-sending operation: after AI LLMs call our tool, we send a request to connect with an external weather service, retrieve the data, and return it to the AI LLM.

![MCP Tool Workflow](https://static.api7.ai/uploads/2025/06/05/jYstzYB2_9-tools-invocation-process.webp)

From the above diagram, when a user makes a request (e.g., Check the weather in Beijing), the system has integrated MCP services to obtain weather information. MCP provides AI with a list of tools, such as `get_weather` or `search_news`, each with corresponding names and descriptions. The AI LLM parses the semantics, matches the most suitable tool (e.g., `get_weather` for a Beijing weather query), and generates parameters based on the predefined input format (e.g., `city: Beijing`).

After generating the parameters, they are passed to the MCP service, which calls the tool and sends an API request. The tool returns JSON response data. These data, whether simple or complex, are ultimately provided to the AI LLM, which summarizes them into human-readable natural language results to be fed back to the user.

## APISIX-MCP Practices

APISIX is a high-performance API gateway, but due to its complex resources, it has a high learning curve. APISIX-MCP was developed to simplify API management processes and lower technical barriers through natural language. Its core functionalities include natural language configuration of routes, management of upstream services, and plugin operations and configurations. These features enhance operational efficiency and enable intelligent management.

APISIX-MCP supports the following operations:

![Operations supported by APISIX-MCP](https://static.api7.ai/uploads/2025/06/05/N2HyscJd_10-operations-supported-by-apisix-mcp.webp)

All resources within APISIX can be interacted with via natural language. We also provide functions to verify whether configurations have taken effect, such as sending requests to the gateway. As long as the environment variables define an address accessible to the APISIX service, after performing an operation, AI can verify whether it was successful.

## Demonstration

### APISIX-MCP Configuration

In this demonstration, I use Cursor as the AI client. If you are using MCP, the process is similar.

First, click the settings in the top right corner, and on the left sidebar, there is an MCP section that I have pre-configured. If it is empty, click "Add a new global MCP" to navigate to the configuration file.

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

In the "MCP service" field, I added a service named `apisix-mcp`; you can customize the name. After configuration, a command needs to be run to start the MCP service. I use the Node.js command-line tool npx for this operation. APISIX's MCP is published to the npm package manager and can be obtained online. You can choose the corresponding tool based on your development language.

Here, the `-y` parameter indicates default permission to install dependencies. `apisix-mcp` refers to the service name. In addition to the first two parameters, environment variables can also be passed, but APISIX-MCP has default values for its environment variables, so there is no need to pass them separately. If APISIX-MCP is only running locally and the configuration has not been changed, there is also no need to pass environment variables.

After configuration, a new service named `apisix-mcp` will appear in the MCP section. The green dot indicates a successful connection, and the provided tools are those offered by APISIX-MCP.

![APISIX-MCP Tools](https://static.api7.ai/uploads/2025/06/06/ypIeLxZK_1-apisix-tools.webp)

### APISIX-MCP Scenario Demonstration

Next, I will demonstrate practical examples.

#### Create a Route

I set up some scenarios, such as asking APISIX-MCP to "Create a route to `https://httpbin.org` with the ID 'httpbin' with a prefix of `/ip`. Send a request to the gateway to verify the configuration."

After parsing our semantics, AI identifies the need to invoke MCP services to achieve this functionality. Here, it calls a tool with parameters from `create_roots`. We have provided the context, and clicking "run tool" confirms the action. In production environments, operational configurations are critical and cannot be changed arbitrarily, hence the need for confirmation.

After clicking "run tool," we can see the response, understanding the specifics of the API call, including what functions it executes, sends requests to the gateway, and verifies whether the route is successfully created. Clicking "run tool" again completes the creation.

![Create a Route](https://static.api7.ai/uploads/2025/06/06/YWFgEXJv_2-apisix-demo-en.webp)

We needn't focus on these responses. The system automatically creates routes, sends test requests for verification, and finally summarizes the execution results. If you want to configure the above operations yourself, you need to set the API key in the command line and build complete test commands. Moreover, if there are input errors during the process that aren't detected in time, you'll have to spend extra time troubleshooting.

#### Configure Load Balancing

We will adjust the existing route in this step. Require the AI to "Add an upstream node to the 'httpbin' route accessing `https://mock.api7.ai` , change the prefix to `/headers`, use the upstream node's host for header passthrough, and set the load balancing strategy to minimum connections. Send ten requests to the gateway to verify the configuration."

![Configure Load Balancing](https://static.api7.ai/uploads/2025/06/06/30qqIOAZ_3-apisix-demo-en.webp)

#### Configure Authentication

"Enable `key-auth` for the 'httpbin' route. Create a consumer named 'zhihuang' with `key-auth` enabled, generate a high-security random key, and inform me. Send a request to the gateway to verify the configuration."

![Configure Authentication](https://static.api7.ai/uploads/2025/06/06/0q5QxuIk_4-apisix-demo-en.webp)

MCP automatically enables the `key-auth` plugin, creates a consumer, and validates based on randomly generated consumer credentials. During validation, it first sends a request with credentials and then without, confirming the completion of the configuration.

### Configure Plugins

Last step, ask the AI to "Enable `CORS` for the "httpbin" route and configure rate limiting to allow only two requests per minute, responding with `503` for exceeding requests. Send a request to the gateway to verify the configuration."

![Configure Plugins](https://static.api7.ai/uploads/2025/06/06/QucQJBVZ_5-apisix-demo-en.webp)

## Summary

MCP brings numerous possibilities. Although it may not be fully stable at present, its application scenarios will become richer as model capabilities improve. We achieve goals through generalized language, enabling AI LLMs to quickly generate solutions. Now, we only need to propose requirements, and AI can close the entire loop, simplifying daily operations and development. This holds significant value at all levels and has a low adoption cost. To develop a similar protocol, one only needs to be familiar with programming languages such as Java, Go, or JS. It can be integrated within a day, allowing businesses to benefit swiftly.

Finally, the value of APISIX-MCP lies in helping new users quickly master APISIX and providing an intelligent solution for complex API management. It transforms the execution of specific operations into the description of generalized scenarios, promoting the deep integration of AI with API management. In the future, we will further integrate AI into API management and enhance APISIX's capability to handle AI traffic.
