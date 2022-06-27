---
title: "助力开发者，全方位解读 APISIX 测试案例"
keywords: 
- Apache APISIX
- API 网关
- 测试案例
- 测试
description: 本文主要介绍了如何编写 API 网关 Apache APISIX 的测试案例。
tags: [Technology]
---

> 本文主要介绍了如何编写以及运行 APISIX 的测试案例。

<!--truncate-->

## 背景信息

Apache APISIX 是 Apache 软件基金会下的云原生 API 网关，它兼具动态、实时、高性能等特点，提供了负载均衡、动态上游、灰度发布（金丝雀发布）、服务熔断、身份认证、可观测性等丰富的流量管理功能。你可以使用 APISIX 来处理传统的南北向流量，也可以处理服务间的东西向流量。同时，它也支持作为 K8s Ingress Controller 来使用。

通常情况下，想要保证软件正常运行，在软件上线前我们一般会使用各种技术和方法，通过手动或自动的方式对软件的功能进行检查以确保其运行正常。该操作我们称之为 QA（测试）。测试一般分为单元测试、E2E 测试以及混沌测试。

单元测试是用来检查单一模块的正确性（比如检查某个 RPC 的序列化/反序列化、数据加解密是否正常），但是该测试缺乏对系统的全局视角。而 E2E 测试（即端到端测试），可以补足单元测试的不足，该测试将整个系统和外部依赖服务跑起来，通过真实的软件调用方式检查本系统与其他系统的集成情况；混沌测试则通过在系统各组件间制造突发情况，如 OOM Kill、网络中断等，测试整个系统错误错误的容忍程度与能力。APISIX 的测试更加偏向于 E2E 测试，保证自身功能和与其他系统集成的正确性。

## APISIX 测试案例简介

APISIX 作为全球最活跃的 API 网关，其稳定性及服务的健壮性需要得到一定的保障，那么如何避免 APISIX 中潜在的错误呢？这里就需要通过测试用例来实现了。

测试脚本并不仅仅是一个被测试机器执行的程序文件，对于开发者来讲，可以通过测试脚本完成软件所有功能的测试，包括不同配置、不同输入参数等情况下程序的运行状况。而对于用户来说测试提供了某一个功能模块的具体使用示例，例如：程序可以接受的配置和输入，想要得到怎样的输出结果。用户在参考使用文档时遇到不懂的地方，完全可以参考现有的测试用例，寻找是否有类似的使用场景。

在 APISIX 项目中，通常使用 Github Action 运行 CI 测试，执行下图展示的测试脚本。许多 APISIX 的开发者在编写测试用例时，会遇到各种各样的问题。希望通过本文，可以减少你在编写 APISIX 测试案例时出现的错误。

![network error/apisix test case](https://static.apiseven.com/2022/blog/0627/1.png)

## 编写测试案例

APISIX的测试用例基于 `TEST::NGINX` 测试框架编写，该测试框架是在 Perl 语言基础上实现的测试环境，可以提供基于脚本的自动化测试能力，为 APISIX 当前如此大规模的测试与质量保证工作提供了支持。当然你不会使用 Perl 也没有关系，因为大部分场景中是不需要编写 Perl 代码的，仅使用 `TEST::NGINX` 封装的能力即可，如果有特殊需求可以结合 Lua 代码的方式进行增强。

APISIX 的测试用例均存放在 `./apisix/t` 目录下面，接下来将以添加 `opa` 插件为例为你介绍如何编写测试案例。

1. 你需要创建一个 `.t` 结尾的测试文件，例如 `./t/plugin/opa.t`。如果你是在已有功能上添加特性，可以直接在对应的测试文件中添加测试用例。并在文件中添加固定格式的 ASF 2.0 协议。

2. 该部分主要作用是给 `opa.t` 这个文件中所有的测试用例自动添加 `no_error_log`，这样就不需要在每个代码下添加 `error_log` 相关的代码了，你可以直接复制使用这段代码。通过这种方式，可以减少一些重复的代码。

```perl
add_block_preprocessor(sub {
    my ($block) = @_;

    if ((!defined $block->error_log) && (!defined $block->no_error_log)) {
        $block->set_value("no_error_log", "[error]");
    }

    if (!defined $block->request) {
        $block->set_value("request", "GET /t");
    }
});

run_tests();

DATA
```

3. 每个测试用例都有固定的开头，一般格式如下。

```perl
=== TEST 1: sanity
```

`===`是测试用例起始的固定语法结构，`TEST 1` 则代表是本文件的第一个测试用例。`sanity` 则为该测试的名称。一般以测试用例的具体目的命名。

4. 接下来就是测试用例的正文部分了。在 APISIX 中几乎每个插件都会定义一些参数和属性，并且会预先定义 JSON schema，因此我们需要先检查该插件的输入参数是否能够正常地校验，通过这种方式就可以检查我们输入的数据是否可以正确地被 JSON schema 的规则去校验。

```perl
--- config
    location /t {
        content_by_lua_block {
            local test_cases = {
                {host = "http://127.0.0.1:8181", policy = "example/allow"},
                {host = "http://127.0.0.1:8181"},
                {host = 3233, policy = "example/allow"},
            }
            local plugin = require("apisix.plugins.opa")
            for _, case in ipairs(test_cases) do
                local ok, err = plugin.check_schema(case)
                ngx.say(ok and "done" or err)
            end
        }
    }
--- response_body
done
property "policy" is required
property "host" validation failed: wrong type: expected string, got number
```

通过阅读 `opa` 插件的源码，可以看到 `opa` 插件要求 `host` 和 `policy` 必须同时存在，因此这里需要定义三个规则。

- 输入正确的参数，包括 `host` 和 `policy`。因此返回结果将是 `done`；
- 仅输入 `host` 参数。不符合 `host`、`policy` 同时存在的要求，所以该测试预期返回结果将是 `property "policy" is required`；
- 输入类型错误（整数）的 `host` 值。因为在源码中设置了 `host` 参数必须是字符串类型，所以返回结果将是 `property "host" validation failed: wrong type`。

```perl
expected string, got number。
--- config
    location /t {
        content_by_lua_block {
...
                ngx.say(ok and "done" or err)
            end
        }
    }
--- response_body
done
...
```

一般情况下，每个测试案例中需要使用 `/t` 的函数，比如说需要调用 Lua 代码，定义 `location`。你也可以使用 `content_by_lua_block` 的方式调用一些代码辅助测试，最后将响应信息以 `ngx.say` 的方式打印出来，然后再通过 `--- response_body` 的方式检查上面程序运行的是否正确。无需手动输入 `request` 和 `error`，因为我们已经通过脚本自动添加了。

```perl
    local plugin = require("apisix.plugins.opa")
    for _, case in ipairs(test_cases) do
        local ok, err = plugin.check_schema(case)
        ngx.say(ok and "done" or err)
```

以上代码表示导入 APISIX Plugin `opa` 插件的模块，并且调用 `plugin.check_schema` 函数。然后通过 `for` 循环，以此调用参数，并且根据测试情况返回对应的结果。

5. 接下来，我们需要配置一个测试时使用的环境。对于插件来说，就是创建一个路由，然后把插件关联到该路由上。创建完成后，我们就可以通过发送请求校验插件的内部逻辑实现是否正确。

```perl
=== TEST 2: setup route with plugin
--- config
    location /t {
        content_by_lua_block {
            local t = require("lib.test_admin").test
            local code, body = t('/apisix/admin/routes/1',
                 ngx.HTTP_PUT,
                 [[{
                        "plugins": {
                            "opa": {
                                "host": "http://127.0.0.1:8181",
                                "policy": "example"
                            }
                        },
                        "upstream": {
                            "nodes": {
                                "127.0.0.1:1980": 1
                            },
                            "type": "roundrobin"
                        },
                        "uris": ["/hello", "/test"]
                }]]
                )
            if code >= 300 then
                ngx.status = code
            end
            ngx.say(body)
        }
    }
--- response_body
passed
```

在以上示例中，使用了 `lib_test_admin` 导入到 `t` 函数，创建一个 `id` 为 `1` 的路由，然后使用 `PUT` 的方法，传入这些数据。在该测试中，我们并没有对数据格式进行检验，因为该测试用例只要保证使用 Admin API 可以正常创建路由就可以了，当然我们也需要对异常进行判断，如果状态码大于或者等于 `300` 就会打印出具体的信息。

在 APISIX 的测试案例中，你会发现很多测试中都包含了以下代码：

```perl
local t = require("lib.test_admin").test
local code, body = t('/apisix/admin/routes/1', ngx.HTTP_PUT)
```

以上代码表示导入 `lib.test_admin` 模块并使用其中 `test` 函数封装来发送请求，它减少了我们调用 APISIX Admin API 等 HTTP 接口时的重复代码，只需简单调用并检查返回结果即可。

6. 在第三个测试中，我们不需要再重复创建路由，因为在第二个测试中已经创建了。

```perl
=== TEST 3: hit route (with correct request)
--- request
GET /hello?test=1234&user=none
--- more_headers
test-header: only-for-test
--- response_body
hello world
```

上述示例定义了 `request`。因为我们在上一个测试中定义了 `/hello` 和 `/test` 的路径，所以我们可以通过 `GET` 的方法向 `/hello` 发送请求，并然后它会发送一个 `test=1234` 和 `user=none` 的 `query` 参数。你也可以通过 `more_headers` 的方式添加响应头，比如给发送到 `hello` 的请求添加一个叫 `test-header` 的响应头。

以上测试是为了测试添加正确的请求头是否可以成功。你也可以在后续的测试示例中添加错误头，并验证结果。如果你需要使用 `POST` 请求，也可以把上述代码中的 `GET /hello` 修改为 `POST /hello`。

在有些测试中，你可能需要创建多个上游或者路由，此时你就可以定义一个数组，然后在数组中定义这些对应的值，并通过 `for` 方式循环地调用 `t` 函数，然后让它把这个东西正常地通过 `put` 的方式来调用 APISIX 的 Admin API 接口来正常创建路由或者上游。该方式也是测试比较常见的方式，称为：`Table driving test`，是一种通过表的方式驱动测试的方法，该方法减少部分重复出现的代码。详细介绍，请参考APISIX测试案例快速入门视频和opa2.t测试用例。

## 运行测试案例

测试案例需要源码安装 APISIX，具体安装方法请参考如何构建 Apache APISIX。接下来将重点介绍如何运行测试案例及报错检查。

### 本地运行

通常情况下，你可以在本地使用以下指令来运行测试案例：

```shell
PATH=/usr/local/openresty/nginx/sbin:/usr/bin PERL5LIB=.:$PERL5LIB FLUSH_ETCD=1 prove -Itest-nginx/lib -r t/admin
```

以上命令的释义如下：

- `PATH` 指定了 `openresty/nginx` 所在的目录，可以避免部分环境配置错误时引起的冲突问题，如果环境中的 OpenResty 安装在其他位置，则也可以通过这个命令进行指定。
- `PERL5LIB` 指定了使用 Perl 导入到本地。导入本路径中存在的以及部分通过环境变量附加的 `PERL` 库。
- `FLUSH_ETCD` 指定了在每个测试文件执行完成后，则清空所有数据，它需要调用 `etcdctl` 函数，需要确保在 `PATH` 中可以找到 `etcdctl` 可执行文件。
- `prove` 调用测试程序开始执行测试。
- `-Itest-nginx/lib` 表示导入 `Itest-nginx/lib` 这个库。
- `-r` 表示自动寻找测试文件。如果指定的是一个路径，则会寻找这个路径下所有的测试文件。
- `t/admin` 表示指定测试用例搜索路径，此处也可以指定到唯一一个 `.t` 文件上进行限定。

以下为上述命令的正常执行结果。  

![network error/normal return result](https://static.apiseven.com/2022/blog/0627/5.png)

  如果测试失败，则会出现以下信息：

![network error/fail return result](https://static.apiseven.com/2022/blog/0627/2.png)

  以上信息则会告诉你具体是哪个测试文件中的哪个测试用例执行失败了。

### Github 运行

一般情况在 Github 中提交代码时，输出的结果和在本地测试相似。

首先选择错误的执行工作流，主要的测试用例均在 build 系列 CI 中。

![network error/Github CI example](https://static.apiseven.com/2022/blog/0627/3.png)

我们可以看到，在该示例中，`416` 行出现了报错。通过错误信息，我们可以得到在某个测试文件中的某个测试用例出现错误，开发者定向查看修正即可。需要注意的是，CI 中可能存在一些奇怪的报错，它们可能是因为 CI 环境的临时异常导致的，如果未修改过对应模块中的代码，可以忽略这些错误。

![network error/Github CI error example](https://static.apiseven.com/2022/blog/0627/4.png)

## 总结

本文主要为大家介绍了测试的相关流程，以及在 APISIX 测试案例的构成和如何进行测试案例的编写，希望通过本文你可以对 APISIX 的测试案例有一个大致的认识。然而本文只提到了 APISIX 测试框架中的一些核心内容，未能覆盖 `TEST::NGINX` 框架中的全部内容，实际上 `TEST::NGINX` 中还有很多强大的能力，我们可以通过 [`Test::Nginx::Socket` 的文档](https://metacpan.org/pod/Test::Nginx::Socket)了解更多用法。如果你想学习更多编写测试案例的知识，可以观看[APISIX测试案例快速入门视频](https://www.bilibili.com/video/BV1qF411G78j?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=d427acb1117c07aeea8968e15736e375)。
