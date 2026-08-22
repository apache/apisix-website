# mcp-bridge

> This document contains information about the Apache APISIX mcp-bridge Plugin, which bridges an SSE/HTTP client to a stdio-based MCP server process.

Source: https://apisix.apache.org/zh/docs/apisix/plugins/mcp-bridge/

## Description

The `mcp-bridge` Plugin bridges an HTTP client speaking the [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) over SSE to a stdio-based MCP server. APISIX spawns the configured command as a backend process and relays messages between the SSE connection and the process's standard input and output.

:::warning

The `mcp-bridge` Plugin is deprecated and will be removed in a future release. We recommend not using it for new deployments.

:::

## Attributes

| Name     | Type            | Required | Default | Description                                                    |
|----------|-----------------|----------|---------|----------------------------------------------------------------|
| command  | string          | True     |         | Command used to launch the MCP server process, e.g. `npx`.     |
| args     | array[string]   | False    |         | Arguments passed to the command.                               |
| base_uri | string          | False    | ""      | Base URI used to build the SSE and message endpoint paths.     |

## Example usage

Create a Route with the `mcp-bridge` Plugin, pointing `command` and `args` at the MCP server you want to expose:

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "id": "mcp-route",
    "uri": "/mcp/*",
    "plugins": {
      "mcp-bridge": {
        "base_uri": "/mcp",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/"]
      }
    }
  }'
```

An MCP client can then connect to the SSE endpoint at `/mcp/sse` and exchange messages through `/mcp/message`.
