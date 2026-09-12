# Getting started

Source: https://apisix.apache.org/docs/python-plugin-runner/getting-started/

## Overview
This document explains how to use Python Runner

## Prerequisites

* Python 3.7+
* APISIX 2.7.0+


## Installation

```bash
$ git clone https://github.com/apache/apisix-python-plugin-runner.git
$ cd apisix-python-plugin-runner
$ make setup
$ make install
```

## Launch

### Configuration Python Runner

> Development Mode

#### Run APISIX Python Runner
```bash
$ cd /path/to/apisix-python-plugin-runner
$ make dev
```

#### Modify APISIX configuration file
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

> Production Mode

#### Modify APISIX configuration file
```bash
$ vim /path/to/apisix/conf/config.yaml
apisix:
  admin_key:
    - name: "admin"
      key: edd1c9f034335f136f87ad84b625c8f1
      role: admin
ext-plugin:
  cmd: [ "python3", "/path/to/apisix-python-plugin-runner/bin/py-runner", "start" ]
```

### Log level and socket configuration (Optional)

```bash
$ vim /path/to/apisix-python-plugin-runner/conf/config.yaml
socket:
  file: $env.APISIX_LISTEN_ADDRESS # Environment variable or absolute path

logging:
  level: debug # error warn info debug
```

### Start or Restart APISIX
```bash
$ cd /path/to/apisix
# Start or Restart
$ ./bin/apisix [ start | restart ]
```

### Configure APISIX Routing Rule
```bash
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


# Testing
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
