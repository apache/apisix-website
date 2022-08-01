---
title: How to use Go to develop Apache APISIX plugin
slug: 2021/08/19/go-makes-apache-apisix-better
author: Zexuan Luo
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- Go
- APISIX 
- Go Plugin
- APISIX Go plugin
- apisix-go-plugin-runner
- Golang
description: This article explains in detail how to use Go to develop the plug-in and specific operation steps of the cloud native API gateway Apache APISIX.
tags: [Ecosystem, Plugins]
---

> This article will explain in detail how to use Go to develop Apache APISIX plugins. By embracing the Go ecosystem and breaking new ground for Apache APISIX, we hope that Go will make Apache APISIX even better!

<!--truncate-->

## Why Go

[Apache APISIX](https://github.com/apache/apisix) allows users to extend functionality by way of plugins. Core features such as authentication, flow restriction, request rewriting, etc. are implemented by way of plugins. Although the core code of Apache APISIX is written in Lua, Apache APISIX supports multi-language development of plugins, such as Go, Java.

This article will explain in detail how to develop Apache APISIX plugins in Go. By embracing the Go ecosystem, we are breaking new ground for Apache APISIX, and we hope that Go will make Apache APISIX even better!

## Installation

To use Go Runner as a library, the official `cmd/go-runner` example in [apisix-go-plugin-runner](https://github.com/apache/apisix-go-plugin-runner) shows how to use the Go Runner SDK. The Go Runner SDK will also support loading pre-compiled plugins via the Go Plugin mechanism in the future.

## Development

### Developing with the Go Runner SDK

```bash
$ tree cmd/go-runner
cmd/go-runner
├── main.go
├── main_test.go
├── plugins
│   ├── say.go
│   └── say_test.go
└── version.go
```

Above is the directory structure of the official example. `main.go` is the entry point, where the most critical part is.

```go
cfg := runner.RunnerConfig{}
...
runner.Run(cfg)
```

`RunnerConfig` can be used to control the log level and log output location.

`runner.Run` will make the application listen to the target location, receive requests and execute the registered plugins. The application will remain in this state until it exits.

Open `plugins/say.go`.

```go
func init() {
  err := plugin.RegisterPlugin(&Say{})
  if err != nil {
    log.Fatalf("failed to register plugin say: %s", err)
  }
}
```

Since `main.go` imports the plugins package, the

```go
import (
  ...
  _ "github.com/apache/apisix-go-plugin-runner/cmd/go-runner/plugins"
  ...
)
```

This registers `Say` with `plugin.RegisterPlugin` before executing `runner.Run`.

`Say` needs to implement the following methods.

The `Name` method returns the plugin name.

```go
func (p *Say) Name() string {
  return "say"
}
```

`ParseConf` will be called when the plugin configuration changes, parsing the configuration and returning a plugin-specific configuration context.

```go
func (p *Say) ParseConf(in []byte) (interface{}, error) {
  conf := SayConf{}
  err := json.Unmarshal(in, &conf)
  return conf, err
}
```

The context of the plugin looks like this.

```go
type SayConf struct {
  Body string `json:"body"`
}
```

`Filter` is executed on every request with the say plugin configured.

```go
func (p *Say) Filter(conf interface{}, w http.ResponseWriter, r pkgHTTP.Request) {
  body := conf.(SayConf).Body
  if len(body) == 0 {
    return
  }

  w.Header().Add("X-Resp-A6-Runner", "Go")
  _, err := w.Write([]byte(body))
  if err != nil {
    log.Errorf("failed to write: %s", err)
  }
}
```

You can see that Filter takes the value of the body inside the configuration as the response body. If the response is made directly in the plugin, it will break the request.

Go Runner SDK API documentation: https://pkg.go.dev/github.com/apache/apisix-go-plugin-runner

After building the application (`make build` in the example), you need to set two environment variables at runtime.

1. `APISIX_LISTEN_ADDRESS=unix:/tmp/runner.sock`
2. `APISIX_CONF_EXPIRE_TIME=3600`

Like this:

```go
APISIX_LISTEN_ADDRESS=unix:/tmp/runner.sock APISIX_CONF_EXPIRE_TIME=3600 ./go-runner run
```

The application will listen to `/tmp/runner.sock` when it runs.

### Setting up Apache APISIX (development)

The first step is to install Apache APISIX, which needs to be on the same instance as Go Runner.

![Apache APISIX work flow](https://static.apiseven.com/202108/1639467846997-8be8195d-98ac-457d-8b7f-a7b78e55fef1.png)

The above diagram shows the workflow of Apache APISIX on the left, and the plugin runner on the right is responsible for running external plugins written in different languages. apisix-go-plugin-runner is such a runner that supports the Go language.

When you configure a plugin runner in Apache APISIX, Apache APISIX treats the plugin runner as a child of itself, which belongs to the same user as the Apache APISIX process, and when we restart or reload Apache APISIX, the plugin runner will be restarted as well.

If the ext-plugin-* plugin is configured for a given route, a request to hit that route will trigger Apache APISIX to make an RPC call to the plugin runner over a unix socket. The call is broken down into two phases.

- ext-plugin-pre-req: before executing most of the Apache APISIX built-in plugins (Lua language plugins)
- ext-plugin-post-req: after the execution of the Apache APISIX built-in plugins (Lua language plugins)

Configure the timing of plugin runner execution as needed.

The plugin runner processes the RPC call, creates a simulated request inside it, then runs the plugins written in other languages and returns the results to Apache APISIX.

The order of execution of these plugins is defined in the ext-plugin-* plugin configuration entry. Like other plugins, they can be enabled and redefined on the fly.

To show how to develop Go plugins, we first set up Apache APISIX to enter development mode. Add the following configuration to config.yaml.

```shell
ext-plugin:
  path_for_test: /tmp/runner.sock
```

This configuration means that after the routing rule is hit, Apache APISIX will make an RPC request to /tmp/runner.sock.

Next, set up the routing rules.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/get",
  "plugins": {
    "ext-plugin-pre-req": {
      "conf": [
        {"name":"say", "value":"{\"body\":\"hello\"}"}
      ]
    }
  },
  "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}
'
```

Note that the plugin name is configured in `name` and the plugin configuration (after JSON serialization) is placed in `value`.

If you see `refresh cache and try again` warning on Apache APISIX side and `key not found` warning on Runner side during development, this is due to configuration cache inconsistency. Since the Runner is not managed by Apache APISIX in the development state, the internal state may be inconsistent. Don't worry, Apache APISIX will retry.

Then we request: curl 127.0.0.1:9080/get

```shell
$ curl http://127.0.0.1:9080/get
HTTP/1.1 200 OK
Date: Mon, 26 Jul 2021 11:16:11 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Resp-A6-Runner: Go
Server: APISIX/2.7

hello
```

You can see that the interface returns hello and does not access any upstream.

### Setting up Apache APISIX (run)

Here is an example of go-runner, which can be run by simply configuring the run command line in ext-plugin: the

```shell
ext-plugin:
  # path_for_test: /tmp/runner.sock
  cmd: ["/path/to/apisix-go-plugin-runner/go-runner", "run"]
```

Apache APISIX will treat the plugin runner as a child process of its own, managing its entire lifecycle.

Note: Do not configure path_for_test at this point. Apache APISIX automatically assigns a unix socket address for the runner to listen to when it starts. You don't need to set them manually.

## Summary

Go Plugin Runner is still in the early stages of development, we will continue to improve its functionality. We welcome you to participate in the development of apisix-go-plugin-runner, and let's build a bridge between Apache APISIX and Go together!
Click to visit [apisix-go-plugin-runner](https://github.com/apache/apisix-go-plugin-runner).

## Related reading

[How to write Apache APISIX plugins in Java](https://apisix.apache.org/blog/2021/06/21/use-Java-to-write-Apache-APISIX-plugins)
