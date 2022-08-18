---
title: "Coming soon! Apache APISIX Integrate with Apache OpenWhisk"
authors:
  - name: "Zeping Bai"
    title: "Author"
    url: "https://github.com/bzp2010"
    image_url: "https://avatars.githubusercontent.com/u/8078418?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- API Gateway
- Apache OpenWhisk
- Serverless
- Plugin
description: The `openwhisk` plugin is combined with the API Gateway Apache APISIX authentication plugin to achieve authentication and authorization functions.
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/openwhish.png
---

> This article introduces the feature prospect and usage steps of the `openwhisk` plug-in, which is combined with a variety of identity authentication plug-ins provided by Apache APISIX to achieve authentication and authorization and other functions.

<!--truncate-->

In this article, we will introduce `openwhisk`, a new plug-in for Apache APISIX, and show you how to integrate OpenWhisk service with Apache APISIX to enjoy the benefits of serverless computing with detailed steps. This plugin is expected to go live in Apache APISIX 2.12, so stay tuned!

![APISIX&OpenWhisk](https://static.apiseven.com/202108/1640313816872-b2c018be-5433-4baf-ba6a-8330e160866a.png)

## Project Introduction

### Apache APISIX

[Apache APISIX](https://apisix.apache.org/) is a dynamic, real-time, high-performance API gateway that provides rich traffic management features such as load balancing, dynamic upstream, canary release, service fusion, authentication, observability, etc. Apache APISIX not only supports plug-in dynamic changes and hot-plugging, but also has many useful plug-ins.

### Apache OpenWhisk

[Apache OpenWhisk](https://openwhisk.apache.org/) is an open source distributed serverless platform that can respond to any scale of time by executing functions. It uses Docker containers to manage infrastructure, servers, and scale to help users build great and efficient applications.

In OpenWhisk developers can use multiple programming languages to write functions (called Actions) that will be dynamically dispatched and processed by OpenWhisk in response to events (via triggers) or external requests (via HTTP requests).

## Integration Principle

Apache APISIX provides plug-in support for easy integration with Apache OpenWhisk. Users can define a route that includes a serverless plug-in and combine it with various authentication plug-ins provided by Apache APISIX to implement authentication and authorization functions.

The general principle of operation is as follows: users can use the openwhisk plugin to define a "dynamic upstream" in the route, and when the route matches a request, it will abort the request to the original upstream and send a request to the API Host endpoint of OpenWhisk.

> The request will contain the Namespace, Action, Service Token and raw HTTP request body data configured by the user for the plugin, and will return the response content obtained from OpenWhisk to the client.

## How to use

### Step 1: Set up Apache OpenWhisk test environment

1. First, you need to ensure that you are using a Linux system with Docker software installed on it. Execute the following command.

```shell
docker run --rm -d \
  -h openwhisk --name openwhisk \
  -p 3233:3233 -p 3232:3232 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  openwhisk/standalone:nightly

docker exec openwhisk waitready
```

2. Wait for the command execution to complete and the following will be output.

```
ok: whisk auth set. Run 'wsk property get --auth' to see the new value.
ok: whisk API host set to http://openwhisk:3233
ok: updated action testme
server initializing...
server initializing...
    "ready": true
ok: deleted action testme
```

3. Create the following file `test.js` to be used as a test function.

```java
function main(args) {
    return {
        "hello": args.name || "",
    };
}
```

4. Register the above functions in OpenWhisk

```shell
# Set API Host and authentication information for the OpenWhisk CLI tool，you can download from https://s.apache.org/openwhisk-cli-download
wsk property set \
  --apihost 'http://localhost:3233' \
  --auth '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP'

# Create a test function
wsk action create test test.js
```

### Step 2: Create a route and enable OpenWhisk plugin

Next we will create a route and add the openwhisk plugin to it. Execute the following command.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "openwhisk": {
            "api_host": "http://localhost:3233",
            "service_token": "23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP",
            "namespace": "guest",
            "action": "test"
        }
    },
    "uri": "/openwhisk"
}'
```

### Step 3: Testing the request

In the following we will use cURL for testing.

```shell
# Request and send data using POST
curl http://127.0.0.1:9080/openwhisk -i -X POST -d '{
    "name": "world"
}'

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 17
Server: APISIX/2.10.2

{"hello":"world"}

# Request using GET
curl http://127.0.0.1:9080/openwhisk -i

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 12
Server: APISIX/2.10.2

{"hello":""}
```

### Step 4: Test complex responses

1. Create and update the `test.js` test function

```java
function main(args) {
    return {
        "status": "403",
        "headers": {
            "test": "header"
        },
        "body": "A test body"
    };
}
```

2. Conducting test requests

```shell
# Request using GET
curl http://127.0.0.1:9080/openwhisk -i

HTTP/1.1 403 FORBIDDEN
Content-Type: application/json
Content-Length: 12
test: header
Server: APISIX/2.10.2

A test body
```

### Addendum: Turning off the plugin

If you are done using the OpenWhisk plug-in, simply remove the OpenWhisk-related configuration from the route configuration and save it to close the OpenWhisk plug-in on the route. At this point you can open other Serverless-like plug-ins or add upstream and other subsequent operations.

Thanks to the dynamic advantage of Apache APISIX, the process of turning on and off plug-ins does not require restarting Apache APISIX, which is very convenient.

## Summary

In this article, we have introduced the feature preview and usage steps of `openwhisk` plugin. For more information about `openwhisk` plugin description and full configuration list, please refer to the [official documentation](https://apisix.apache.org/docs/apisix/next/plugins/openwhisk).

Currently, we are also developing other Serverless plugins to integrate with more cloud services. If you're interested in such integration projects, feel free to start a discussion in [GitHub Discussions](https://github.com/apache/apisix/discussions) or communicate via the [mailing list](https://apisix.apache.org/docs/general/join/).
