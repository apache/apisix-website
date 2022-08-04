---
title: "Apache APISIX's integration with Azure Serverless"
author: "Bisakh Mondal"
authorURL: "https://github.com/bisakhmondal"
authorImageURL: "https://avatars.githubusercontent.com/u/41498427?v=4"
keywords: 
- Apache APISIX
- API Gateway
- Azure Functions
- Microsoft
- Serverless
description: This article  gives detailed instructions on how to integrate Azure Functions, which is a widely used serverless solution, into the Apache APISIX serverless suite.
tags: [Ecosystem]
---

> This article talks about the recent addition of a new plugin `azure-functions`, and gives detailed instructions on how to integrate Azure Functions, which is a widely used serverless solution, into the Apache APISIX serverless suite.

<!--truncate-->

![Apache APISIX's integration with Azure Serverless](https://static.apiseven.com/202108/1638431191799-e1202fc7-d3b5-48db-a222-0c70a8b70da0.png)

Apache APISIX provides support for serverless frameworks for popular cloud vendors (more coming on the way). Instead of hardcoding the function URL into the application, Apache APISIX suggests defining a route with the serverless plugin enabled. It gives the developers the flexibility to hot update the function URI along with completely changing the faas vendor to a different cloud provider with zero hassle. Also, this approach mitigates authorization and authentication concerns from application logic as Apache APISIX has very strong authentication support that could be used to identify and authorize client consumers to access the particular route with the faas. This article talks about the recent addition of a new plugin `azure-functions`, and gives detailed instructions on how to integrate Azure Functions, which is a widely used serverless solution, into the Apache APISIX serverless suite.

## How azure-functions plugin works

The `azure-functions` plugin lets the users define an upstream to the azure `HTTP Trigger` serverless function for a gateway URI. If enabled, this plugin terminates the ongoing request to that particular URI and initiates a new request to the azure faas (the new upstream) on behalf of the client with the suitable authorization details set by the users, request headers, request body, params(all these three components are passed from the original request) and returns the response body, status code and the headers back to the original client that has invoked the request to the Apache APISIX agent.

The plugin supports authorization to azure faas service via API keys and azure active directory.

## How to Use Azure Functions with Apache APISIX

The primary goal of the plugin is to proxy the gateway route specified in the route configuration to the azure functions URI. This section gives you a hands-on how to configure and create a serverless HTTP Trigger on the azure cloud.

1. First sign up/in to Microsoft Azure and sets up a trial plan. Azure Functions are forever free up to 1 million invocations. To know more about how the pricing, visit [here](https://azure.microsoft.com/en-us/services/functions/#pricing).

1. Visit the [Azure Portal](https://portal.azure.com/#home) (FYI, azure services can be accessed via the web portal, CLI & VSCode. for user-friendliness we are using the web).
    1. First, create a resource group to logically partition your faas that's you are going to create.
    ![create a resource group](https://static.apiseven.com/202108/1638349069240-911b8640-2de6-4f82-b75b-fb937b0bad40.png)
    1. Create a function app with the URL of your choice (I am going to pick test-apisix).
    ![create a function app](https://static.apiseven.com/202108/1638349121520-01abe8e6-bc09-4be7-b010-f7baec59f89a.png)

1. Install the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) into VSCode editor. Upon installation, authenticate via extension and install the azure function core tool for local development with:

    ```shell
    npm install -g azure-functions-core-tools@3 --unsafe-perm true
    ```

1. Deploy the following snippet to the same function app that we just created via the Azure Functions extension panel in VSCode:

    ```javascript
    module.exports = async function (context, req) {
    context.log('HTTP trigger invoked on Test-APISIX.')

    const name = req.query.name || (req.body && req.body.name)
    const responseMessage = name
        ? 'Hello, ' + name
        : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body to generate a personalized response.'

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
    }
    }
    ```

> This snippet takes the name from query parameters (if present, else from the request body) and greets the user.

### Activate the azure-functions plugin

The following is an example of how to enable the azure-functions plugin for a specific route. We are assuming your HTTP Trigger is deployed and ready to be served.

```shell
# enable plugin for a specific route
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "azure-functions": {
            "function_uri": "http://test-apisix.azurewebsites.net/api/HttpTrigger",
            "authorization": {
                "apikey": "<Generated API key to access the Azure-Function>"
            }
        }
    },
    "uri": "/azure"
}'
```

Now any requests (HTTP/1.1, HTTPS, HTTP2) to URI `/azure` on the Apache APISIX gateway will trigger an HTTP invocation to the aforesaid function URI and response body along with the response headers and response code will be proxied back to the client. For example ( here azure cloud function just take the `name` query param and returns `Hello $name`):

```shell
curl -i -XGET http://localhost:9080/azure\?name=Bisakh
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Request-Context: appId=cid-v1:38aae829-293b-43c2-82c6-fa94aec0a071
Date: Wed, 19 Nov 2021 18:46:55 GMT
Server: APISIX/2.10.2

Hello, Bisakh
```

Considering, Apache APISIX is also running with `enable_http2: true` on [config-default.yaml](https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L26) for port 9081 (say), any `HTTP/2` communication between client and APISIX agent will be proxied to the azure faas similar to HTTP/1.1 and responses will be proxied back to the client with proper headers. For example:

```shell
curl -i -XGET --http2 --http2-prior-knowledge http://localhost:9081/azure\?name=Bisakh
HTTP/2 200
content-type: text/plain; charset=utf-8
request-context: appId=cid-v1:38aae829-293b-43c2-82c6-fa94aec0a071
Date: Wed, 19 Nov 2021 18:46:56 GMT
server: APISIX/2.10.2

Hello, Bisakh
```

### Deactivate the azure-functions plugin

Now, to disable the plugin simply remove the corresponding JSON configuration in the plugin configuration to disable the `azure-functions` plugin and add the suitable upstream configuration. Apache APISIX plugins are hot-reloaded, therefore is no need to restart Apache APISIX.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "/azure",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

## Custom Configuration

In a minimal configuration while creating a new route with the `azure-functions` plugin enabled, `function_uri` is the mandatory attribute of the plugin config that points to the function URL. There is a lot of additional options that can be tweaked with plugin schema and metadata schema.

### Plugin Schema

|Name|Type|Required|Default|Valid|Description|
|----|----|--------|-------|-----|-----------|
|function_uri|string|required|n/a|n/a|The azure function endpoint which triggers the serverless function code (eg. http://test-apisix.azurewebsites.net/api/HttpTrigger).|
|authorization|object|optional|n/a|n/a|Authorization credentials to access the cloud function.|
|authorization.apikey|string|optional|n/a|n/a|Field inside authorization. The generate API Key to authorize requests to that endpoint.|
|authorization.clientid|string|optional|n/a|n/a|Field inside authorization. The Client ID ( azure active directory ) to authorize requests to that endpoint.|
|timeout|integer|optional|3000|[100,...]|Proxy request timeout in milliseconds.|
|ssl_verify|boolean|optional|true|true/false|Whether enabled performs SSL verification of the server.|
|keepalive|boolean|optional|true|true/false|To reuse the same proxy connection in near future. Set to false to disable keepalives and immediately close the connection.|
|keepalive_pool|integer|optional|5|[1,...]|The maximum number of connections in the pool.|
|keepalive_timeout|integer|optional|60000|[1000,...]|The maximal idle timeout (ms).|

This gives a whole lot of flexibility to tightly bind the behaviour of the azure faas - from configuring the timeout to the keepalive pool and validating the SSL certificate of the serverless faas. To be honest, this actually means a lot when it comes to serverless as the services are event-driven and resources are being allocated by the cloud provider on the fly.

### Metadata Schema

Similarly, there are a few attributes that can be tweaked by using the metadata.

|Name|Type|Required|Default|Valid|Description|
|----|----|--------|-------|-----|-----------|
|master_apikey|string|optional|""|n/a|The API KEY secret that could be used to access the azure function URI.|
|master_clientid|string|optional|""|n/a|The Client ID (active directory) that could be used the authorize the function URI.|

Metadata for `azure-functions` plugin provides the functionality for authorization fallback. It defines `master_apikey` and `master_clientid`(azure active directory client id) where users (optionally) can define the master API key or Client ID for mission-critical application deployment. So if there are no authorization details found inside the plugin attribute the authorization details present in the metadata kicks in.

The relative priority ordering is as follows:

- First, the plugin looks for `x-functions-key` or `x-functions-clientid` keys inside the request header to the Apache APISIX agent.

- If they are not found, the azure-functions plugin checks for the authorization details inside plugin attributes. If present, it adds the respective header to the request sent to the Azure cloud function.

- If no authorization details are found inside plugin attributes, Apache APISIX fetches the metadata config for this plugin and uses the master keys.

To add a new Master APIKEY, make a request to /apisix/admin/plugin_metadata endpoint with the updated metadata as follows:

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/azure-functions \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "master_apikey" : "<Your azure master access key>"
}'
```

## Summary

The `azure-functions` plugin is Apache APISIX's second plugin designed for serverless. We are developing other serverless plugins and will feature them with the upcoming Apache APISIX releases. If you are interested, please don't hesitate to [file an issue](https://github.com/apache/apisix/issues/new/choose) to share your opinions. You can talk about your proposals for developing a new plugin in our [mailing list](https://apisix.apache.org/docs/general/join) as well!
