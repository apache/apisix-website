# Developer Guide

Source: https://apisix.apache.org/docs/python-plugin-runner/developer-guide/

## Overview

This documentation explains how to develop this project.

## Prerequisites

* Python 3.7+
* APISIX 2.7.0+

## Debug

- Run `make setup` installation dependencies
- Run `make install` installation runner to system
- Run `make dev` to start it

## Plugin

#### Plugin directory

```
/path/to/apisix-python-plugin-runner/apisix/plugin
```

the `.py` files in this directory autoload

#### Plugin example

```
/path/to/apisix-python-plugin-runner/apisix/plugin/stop.py
/path/to/apisix-python-plugin-runner/apisix/plugin/rewrite.py
```

#### Plugin Format

```python
from typing import Any
from apisix.runner.http.request import Request
from apisix.runner.http.response import Response
from apisix.runner.plugin.core import PluginBase


class Test(PluginBase):

    def name(self) -> str:
        """
        The name of the plugin registered in the runner
        :return:
        """
        return "test"

    def config(self, conf: Any) -> Any:
        """
        Parse plugin configuration
        :param conf:
        :return:
        """
        return conf

    def filter(self, conf: Any, request: Request, response: Response):
        """
        The plugin executes the main function
        :param conf:
            plugin configuration after parsing
        :param request:
            request parameters and information
        :param response:
            response parameters and information
        :return:
        """

        # print plugin configuration
        print(conf)

        # Fetch request nginx variable `host`
        host = request.get_var("host")
        print(host)

        # Fetch request body
        body = request.get_body()
        print(body)

        # Set response headers
        response.set_header("X-Resp-A6-Runner", "Python")

        # Set response body
        response.set_body("Hello, Python Runner of APISIX")

        # Set response status code
        response.set_status_code(201)
```

- Plugins must inherit the `PluginBase` class and implement all functions.
  - `name` function: used to set the registered plugin name.
  - `config` function: used to parse plugin configuration.
  - `filter` function: used to filter requests.
    - `conf` parameter: plugin configuration after parsing.
    - `request` parameter: Request object, which can be used to get and set request information.
    - `response` parameter: Response object, which can be used to set response information.

## Test

Run `make test`.

## Data Format

[FlatBuffers](https://github.com/google/flatbuffers)

## Data Protocol

```
1 byte of type + 3 bytes of length + data
```
