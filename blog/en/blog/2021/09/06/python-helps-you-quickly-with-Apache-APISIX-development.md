---
title: Python helps you develop Apache APISIX plugin
slug: 2021/09/06/python-helps-you-quickly-with-apache-apisix-development
author: Jinchao Shuai
authorURL: "https://github.com/shuaijinchao"
authorImageURL: "https://avatars.githubusercontent.com/u/8529452?v=4"
keywords:
  - APISIX
  - API Gateway
  - Python
  - APISIX Python Plugin Runner
tags: [Ecosystem]
description: This article will introduce you how to use Python to develop custom plugins and environment deployment on the cloud-native API gateway Apache APISIX.
---

> The [Java Plugin](https://github.com/apache/apisix-java-plugin-runner) and [Go Plugin](https://github.com/apache/apisix-java-plugin-runner) languages have been supported in the community before the Apache APISIX Python Runner, and today Python Runner is now available, giving the community another option for developing plugins for Apache APISIX.

<!--truncate-->

## Introduction

### Apache APISIX

`Apache APISIX` is a high-performance cloud-native open-source API gateway that provides unified request interception and governance (e.g., authentication, caching, versioning, fusing, auditing, etc.) to help developers easily provide secure and reliable services to the outside world, while developers only need to focus on business implementation with `Apache APISIX`, which saves a lot of time in developing and maintaining generic capabilities and reduces the complexity of the overall business architecture.

### Python

Python is an interpreted high-level programming language with a simple syntax, good code readability, cross-platform, portability, and development efficiency.
As a high-level programming language, it has a high degree of abstraction and shields a lot of underlying details (e.g., `GC`).
) allows us to focus more on the development of application logic in the development process. As a 30-year old development language, Python has a well-developed ecology and various modules, and most of our development and application scenarios can be found in mature modules or solutions from the community. `Python`
We won't go into all the other advantages. The disadvantages of `Python` are also obvious: `Python`, as an interpreted language, has a relatively large performance gap compared to compiled languages like `C++` and `Go`.

### Apache APISIX Python Runner

[apache-apisix-python-runner](https://github.com/apache/apisix-python-plugin-runner) This project can be interpreted as `Apache APISIX`
and `Python`.
The most important thing is to let more `Python developers` who are interested in `Apache APISIX` and `API gateways` to learn more about the use of `Apache APISIX` and `API gateways` through this project.
The following is a diagram of the architecture of `Apache APISIX` multi-language support.

![Apache APISIX work flow](https://static.apiseven.com/202108/1639468460315-bb51d913-be72-4329-a47b-7e987dff21ba.png)

The above diagram shows the workflow of `Apache APISIX` on the left, and the `Plugin Runner` on the right is the plug-in runner for each language, the `apisix-python-plugin-runner` introduced in this article is the one that supports `Python`.
language.

When you configure a `Plugin Runner` in `Apache APISIX`, `Apache APISIX` will start a child process to run the `Plugin Runner` that belongs to the same user as the `Apache APISIX` process belongs to the same user, and when we restart or reload `Apache APISIX`, `Plugin Runner` will also be restarted.

If you configure the `ext-plugin-*` plugin for a given route, a request to hit that route will trigger an `Apache APISIX` `RPC` call to the `Plugin Runner` via the `Unix Socket`. The call is split into two phases.

- [ext-plugin-pre-req](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/ext-plugin-pre-req.md): Before executing the `Apache APISIX` built-in plugin (Lua language plugin).
- [ext-plugin-post-req](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/ext-plugin-post-req.md): after executing the `Apache APISIX` plug-in (Lua language plug-in).

You can choose and configure the execution timing of `Plugin Runner` as needed.

The `Plugin Runner` handles the `RPC` call, creates a simulated request inside it, and then runs the multilingual plugin and returns the result to Apache APISIX.

The execution order of multilingual plugins is defined in the `ext-plugin-*` plugin configuration entry, and like other plugins, they can be enabled and redefined on the fly.

## Deploy test

### Base runtime environment

- Apache APISIX 2.7
- Python 3.6+

To deploy Apache APISIX, please refer to the [Apache APISIX official documentation: How to build Apache APISIX](https://github.com/apache/apisix/blob/master/docs/en/latest/how-to-build.md) for details.

### Download and install Python Runner

```bash
$ git clone https://github.com/apache/apisix-python-plugin-runner.git
$ cd apisix-python-plugin-runner
$ make install
```

### Configuring Python Runner

#### development mode

##### Run Python Runner

```bash
$ cd /path/to/apisix-python-plugin-runner
$ APISIX_LISTEN_ADDRESS=unix:/tmp/runner.sock python3 apisix/main.py start
```

##### Modify APISIX configuration file

```bash
$ vim /path/to/apisix/conf/config.yaml
apisix:
  admin_key:
    - name: "admin"
      key: edd1c9f034335f136f87ad84b625c8f1
      role: admin
ext-plugin:
  path_for_test: /tmp/runner.sock
```

#### Production mode

##### Modify APISIX configuration file

```bash
$ vim /path/to/apisix/conf/config.yaml
apisix:
  admin_key:
    - name: "admin"
      key: edd1c9f034335f136f87ad84b625c8f1
      role: admin
ext-plugin:
  cmd: [ "python3", "/path/to/apisix-python-plugin-runner/apisix/main.py", "start" ]
```

#### Python Runner configuration (optional)

If you need to adjust the ``Log Level`` or ``Unix Domain Socket`` environment variables, you can modify the `Runner` configuration file

```bash
$ vim /path/to/apisix-python-plugin-runner/apisix/config.yaml
socket:
  file: $env.APISIX_LISTEN_ADDRESS # Environment variable or absolute path

logging:
  level: debug # error warn info debug
debug
```

### Start Python Runner

```bash
$ cd /path/to/apisix
# Start or Restart
$ ./bin/apisix [ start | restart ]
```

Start or restart `APISIX`, when `APISIX` and `Python Runner` have been configured and started.

### Testing Python Runner

#### Configuring Apache APISIX Routing and Plugin Information

```bash
# Test with the default demo plugin
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/get",
  "plugins": {
    "ext-plugin-pre-req": {
      "conf": [
        { "name": "stop", "value":"{\"body\":\"hello\"}"}
      ]
    }
  },
  "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

- `plugins.ext-plugin-pre-req.conf` is the `Runner` plugin configuration, `conf` is an array format to set multiple plugins at the same time.
- The `name` in the plugin configuration object is the name of the plugin, which should be the same as the plugin code file and object name.
- `value` in the plugin configuration object is the plugin configuration, which can be a `JSON` string.

#### access verification

```bash
$ curl http://127.0.0.1:9080/get -i
HTTP/1.1 200 OK
Date: Fri, 13 Aug 2021 13:39:18 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
host: 127.0.0.1:9080
accept: */*
user-agent: curl/7.64.1
X-Resp-A6-Runner: Python
Server: APISIX/2.7

Hello, Python Runner of APISIX
```

## Plugin Development

### Plugin directory

```bash
/path/to/apisix-python-plugin-runner/apisix/plugins
```

The `.py` files in this directory will be loaded automatically.

### Plugin example

```bash
/path/to/apisix-python-plugin-runner/apisix/plugins/stop.py
/path/to/apisix-python-plugin-runner/apisix/plugins/rewrite.py
```

### Plugin format

```python
from apisix.runner.plugin.base import Base
from apisix.runner.http.request import Request
from apisix.runner.http.response import Response


class Stop(Base):
    def __init__(self):
        """
        Example of `stop` type plugin, features:
            This type of plugin can customize response `body`, `header`, `http_code`
            This type of plugin will interrupt the request
        """
        super(Stop, self). __init__(self.__class__. __name__)

    def filter(self, request: Request, response: Response):
        """
        The plugin executes the main function
        :param request:
            request parameters and information
        :param response:
            response parameters and information
        :return:
        """
        # In the plugin you can get the configuration information through `self.config`,
        # if the plugin configuration is JSON it will be automatically converted to
        # a dictionary structure
        # print(self.config)

        # set the response headers
        headers = request.headers
        headers["X-Resp-A6-Runner"] = "Python"
        response.headers = headers

        # Set the response body information
        response.body = "Hello, Python Runner of APISIX"

        # Set the response status code
        response.status_code = 201

        # Interrupt the request process by calling `self.stop()`, which will immediately respond to the client
        # If `self.stop()` is not shown or if `self.rewrite()` is shown, the request will continue
        # Default is `self.rewrite()`
        self.stop()
```

### Plugin specifications and considerations

- Plugin object implementation must inherit from the `Base` class
- The plugin must implement the `filter` function
- `filter` function parameters can only contain `Request` and `Response` class objects as parameters
- `Request` object parameter can get request information
- `Response` object parameter can set the response information
- `self.config` can get the plugin configuration information
- Calling `self.stop()` in the `filter` function will immediately break the request and respond to the data.
- When `self.rewrite()` is called in the `filter` function, the request will continue.

## Welcome to participate

The `Runner` for `Apache APISIX` languages is still in the early stages of development, and we will continue to improve its functionality. A successful open source project cannot be achieved without everyone's participation and contribution, welcome to participate in `Apache APISIX Runner`.
Let's build a bridge between `Apache APISIX` and other languages together.

- [apisix-python-plugin-runner](https://github.com/apache/apisix-python-plugin-runner)
- [apisix-go-plugin-runner](https://github.com/apache/apisix-go-plugin-runner)
- [apisix-java-plugin-runner](https://github.com/apache/apisix-java-plugin-runner)

## Related Reading

- [Go gives Apache APISIX a run for its money](http://apisix.apache.org/blog/2021/08/19/go-makes-Apache-APISIX-better)
- [How to write Apache APISIX plugins in Java](https://apisix.apache.org/blog/2021/06/21/use-Java-to-write-Apache-APISIX-plugins)
