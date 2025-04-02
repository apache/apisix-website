---
title: "APISIX-MCP: Embracing Intelligent API Management with AI + MCP"
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
  - API Gateway
  - APISIX AI Gateway
  - Apache APISIX
  - MCP
  - Model Context Protocol
description: "The MCP protocol provides standardized connectivity for AI models. APISIX-MCP simplifies API management through natural language interaction, enabling intelligent configuration and automated workflows, thereby improving operational efficiency."
image: https://static.api7.ai/uploads/2025/04/01/b53YPObN_apisix-mcp.webp
tags: [Ecosystem]
---

> This article introduces the MCP protocol and its application in APISIX-MCP. APISIX-MCP simplifies API management through natural language interaction, supporting the creation, updating, and deletion of resources.  
<!--truncate-->

## Preface  

With the explosive growth of large-scale AI model applications, many traditional systems are eager to integrate AI capabilities quickly. However, the current landscape of AI tools lacks unified standards, resulting in severe fragmentation. Different models vary in capability and integration methods, creating significant challenges for traditional applications during adoption.  

Against this backdrop, in late 2024, Anthropic—the company behind the renowned Claude model—introduced the **Model Context Protocol (MCP)**. MCP positions itself as the **"USB-C interface" for AI applications**. Just as USB-C standardizes connections for peripherals and accessories, MCP provides a standardized approach for AI models to connect with diverse data sources and tools.  

![MCP Architecture](https://static.api7.ai/uploads/2025/04/01/u6Q4dGDZ_apisix-mcp-architecture-new.webp)  

Numerous services and applications have already adopted MCP. For example:  

- **GitHub-MCP** enables natural language code submissions and PR creation.  
- **Figma MCP** allows AI to generate UI designs directly.  
- With **Browser-tools-MCP**, tools like Cursor can debug code by interacting with DOM elements and console logs.  

The official MCP repository includes implementations for Google Drive, Slack, Git, and various databases. As an open standard, MCP has gained widespread recognition in the AI community, attracting third-party developers who contribute hundreds of new MCP services daily. Anthropic, as the founder, actively drives MCP’s evolution by refining the protocol and educating developers.  

## About APISIX-MCP  

The rise of MCP offers traditional applications a new technical pathway. Leveraging MCP’s standardized integration capabilities, we developed [**APISIX-MCP**](https://github.com/api7/apisix-mcp), which bridges large language models with Apache APISIX’s Admin API through natural language interaction. The current implementation supports the following operations:  

### General Operations  

- `get_resource`: Retrieve resources by type (routes, services, upstreams, etc.).  
- `delete_resource`: Delete resources by ID.  

### API Resource Management  

- `create_route`/`update_route`/`delete_route`: Manage routes.  
- `create_service`/`update_service`/`delete_service`: Manage services.  
- `create_upstream`/`update_upstream`/`delete_upstream`: Manage upstreams.  
- `create_ssl`/`update_ssl`/`delete_ssl`: Manage SSL certificates.  
- `create_or_update_proto`: Manage Protobuf definitions.  
- `create_or_update_stream_route`: Manage stream routes.  

### Plugin Operations  

- `get_all_plugin_names`: List all available plugins.  
- `get_plugin_info`/`get_plugins_by_type`/`get_plugin_schema`: Fetch plugin configurations.  
- `create_plugin_config`/`update_plugin_config`: Manage plugin configurations.  
- `create_global_rule`/`update_global_rule`: Manage global plugin rules.  
- `get_plugin_metadata`/`create_or_update_plugin_metadata`/`delete_plugin_metadata`: Manage plugin metadata.  

### Security Configuration  

- `get_secret_by_id`/`create_secret`/`update_secret`: Manage secrets.  
- `create_or_update_consumer`/`delete_consumer`: Manage consumers.  
- `get_credential`/`create_or_update_credential`/`delete_credential`: Manage consumer credentials.  
- `create_consumer_group`/`delete_consumer_group`: Manage consumer groups.  

## How to Use APISIX-MCP  

APISIX-MCP is now open-sourced and available on [npm](https://www.npmjs.com/package/apisix-mcp) and [GitHub](https://github.com/api7/apisix-mcp). It can be configured via any MCP-compatible AI client, such as Claude Desktop, Cursor, or the Cline plugin for VSCode.  

Below is a step-by-step guide using **Cursor**:  

1. Open Cursor, click the settings icon, and navigate to the settings page.  
  
   ![Configure cursor for APISIX-MCP](https://static.api7.ai/uploads/2025/04/01/OCQcecuQ_apisix-mcp-2.webp)  

2. Click **"Add new global MCP server"** to edit the `mcp.json` configuration file:  

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
  
In the `mcpServers` field of the configuration file, add a service `apisix-mcp`, which can be changed. Then configure the commands for running the MCP service.

- **`command`**: `npx` (Node.js package executor).  
- **`args`**: `-y` (auto-install dependencies) and `apisix-mcp` (package name).  
- **`env`**: Customize APISIX connection settings (defaults below):  

In the `env` field, you can specify the APISIX service access address, Admin API port, prefix, and authentication key. These environment variables have default values, so if you start APISIX without any custom configuration, you can omit the `env` field entirely. The default values for each variable are as follows:

   | Variable                  | Description                          | Default Value               |  
   |---------------------------|--------------------------------------|-----------------------------|  
   | `APISIX_SERVER_HOST`      | APISIX server host                   | `http://127.0.0.1`          |  
   | `APISIX_ADMIN_API_PORT`   | Admin API port                       | `9180`                      |  
   | `APISIX_ADMIN_API_PREFIX` | Admin API prefix                     | `/apisix/admin`             |  
   | `APISIX_ADMIN_KEY`        | Admin API authentication key         | `edd1c9f034335f136f87ad84b625c8f1` |  

3. Upon successful configuration, the MCP Servers list will show a green indicator for `apisix-mcp`, along with available tools.  
  
   ![Successful Configuration](https://static.api7.ai/uploads/2025/04/01/toaXLc3n_apisix-mcp-3.webp)  

   > Note: If setup fails, refer to the [APISIX-MCP GitHub](https://github.com/api7/apisix-mcp) documentation for manual builds.  

4. In the chat panel, select **Agent** mode and choose a model (e.g., Claude Sonnet 3.5/3.7 or GPT-4o).  

   ![Select Agent Models](https://static.api7.ai/uploads/2025/04/01/g9v91DIf_apisix-mcp-4.webp)  

5. Next, we can enter relevant operational commands to verify if the MCP service is functioning correctly. Following the workflow in APISIX's Getting Started documentation, we input the following into the dialog box and send the message:  

   > *"Help me create a route with path `/api` for accessing `https://httpbin.org` upstream, with CORS and rate-limiting plugins. Print the route details after configuration."*  

6. Next, in Cursor, you will see a process similar to the MCP tool invocation demonstrated in the video below. Due to the inherent randomness of large AI model responses, the exact operations performed may vary from the example shown.

   <video width="100%" controls>  
     <source src="https://static.api7.ai/uploads/2025/04/01/V7CmO59u_mcp-demo.mp4" type="video/mp4"/>  
   </video>  

Here, the auto-execution mode (YOLO Mode) is enabled, allowing Cursor to automatically invoke all tools in the MCP server. From the video, we can observe the AI performing the following operations based on our requirements:

- Analyzing the plugins we need to configure, then calling `get_plugins_list` to retrieve all plugin names
- Invoking `get_plugin_schema` to examine detailed configuration information for different plugins
- Calling `create_route` to create the route
- Using `update_route` to add the previously queried plugin configurations to the route
- Executing `get_route` to verify whether the route was successfully configured and if the configuration is correct

7. The resulting route configuration includes:  

   - **Route ID**: `httpbin`  
   - **Path**: `/api/*`  
   - **Methods**: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`
   - **CORS Plugin**:  

    ```
    allow_origins: *
    allow_methods: *
    allow_headers: *
    expose_headers: X-Custom-Header
    max_age: 3600
    allow_credential: false
    ```

    - **limit-count Plugin**:  

    ```
    count: 100
    time_window: 60
    key: remote_addr
    rejected_code: 429
    policy: local
    ```

   - **Upstream**:

    ```
    type: roundrobin (load balancing strategy using round-robin)  
    upstream node: httpbin.org:443 (backend service address)  
    ```

## Advantages of AI-Driven Operations  

In the above process, we accomplished the creation of a route configured with CORS and rate-limiting through just one round of natural language interaction with AI. Compared to manual route configuration, leveraging AI offers several distinct advantages:

- **Reduced Cognitive Load**: Eliminates manual documentation lookup and parameter memorization.  
- **Automated Workflows**: AI decomposes tasks (e.g., plugin setup → route creation) without human intervention.  
- **Closed-Loop Validation**: Auto-verification ensures correctness.  
- **Iterative Optimization**: Continuous dialogue refines configurations.  

This interaction model transforms complex configuration processes into natural conversational experiences while maintaining accuracy and verifiability. These capabilities are achieved through the MCP protocol's semantic parsing of requirements, intelligent tool invocation, and final execution via Admin API.

It's important to note that APISIX-MCP isn't designed to completely replace manual configuration, but rather to optimize efficiency for high-frequency operations. Its value shines particularly in configuration debugging and rapid validation scenarios, creating effective complementarity with traditional management approaches. As the MCP ecosystem continues to evolve, we can anticipate deeper integration of such tools in API management, promising more sophisticated capabilities.

## Conclusion  

MCP enables intelligent operations for complex API systems. APISIX-MCP lowers the barrier to Apache APISIX adoption, with future plans for AI-traffic-specific plugins. The fusion of AI and API management promises smarter, more efficient infrastructure governance.  
