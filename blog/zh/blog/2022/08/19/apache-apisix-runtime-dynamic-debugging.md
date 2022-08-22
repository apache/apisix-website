---
title: "Apache APISIX 运行时动态调试功能详解"
authors:
  - name: "屠正松"
    title: "Author"
    url: "https://github.com/tzssangglass"
    image_url: "https://github.com/tzssangglass.png"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- API gateway
- Apache APISIX
- Debug
description: 本文详细介绍了云原生 API 网关 Apache APISIX 动态调试功能以及该功能的实现原理，你可以通过该功能更便捷地排查 Bug 并解决相关问题。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0817/APISIX.png
---

> 本文详细介绍了 Apache APISIX 动态调试功能以及该功能的实现原理，你可以通过该功能更便捷地排查 Bug 并解决相关问题。

<!--truncate-->

Apache APISIX 是一个动态，实时，高性能的 API 网关，它基于 NGINX 和 Lua 实现，因此天然继承了二者的高性能。动态意味着如果你对它做了任意配置的变更，不需要重启或者热更新，因此也不会产生服务中断或短暂不可用。由于 NGINX 的配置保存在文件中，如果变更配置，就需要重启服务，该操作会涉及到连接断开，占用高达两倍的资源。

APISIX 通过其动态的优势， 提供了强大的运行时动态调试的能力，但由于该功能对使用者有着略高的技术背景要求，在常规业务需求中也不太会用到这项功能，因此大家对 APISIX 运行时动态调试能力了解不足。本文将通过实际案例为你详细讲解 Apache APISIX 运行时动态调试的功能。

## 故障发生

某年某月某日，一个用户的生产环境出现异常，与用户交流过后并没有发现用户操作有什么异常之处，一切都很合理。而且根据用户的描述，该 Bug 会在 APISIX 重启后消失，然后运行一段时间之后就会随机出现。没有人知道这个 Bug 发生的原因，也不知道如何复现该 Bug。在检查完用户的配置之后，我们也没有发现异常的地方。

而在用户提供的与异常相关的日志中，我们发现其中最关键的一条日志。这条日志看起来稀松平常，只不过是调用 `eval` 函数失败。

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/1.PNG)

但在正常情况下，在这行日志对应的代码段不应该会抛出这个错误。为什么呢？我们先看下异常日志对应的代码段，下图中倒数第二行是抛出异常的地方：

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/2.png)

这段代码的逻辑是：首先对 `conf.response_expr` 对象做了非空判断，如果不存在，则会创建该对象。对象创建完成，才会调用它的 `eval` 函数，而在该对象对应的模块中，已经实现了 `eval` 函数。所以我们认为这个错误是不应该出现的。那么为什么创建了这个对象但是调用它的函数失败呢？

## 动态调试详解

从前文描述的已知信息来看，我们已经无法判断 Bug 产生的原因了，因此我们采用动态调试的方式来寻找 Bug 的根本原因。

### 动态调试特性

在正式开启寻 Bug 之路前，先为大家介绍下什么是动态调试以及它的特性。

动态调试功能主要用于在 APISIX 运行过程中通过响应、日志等方式，输出更多的调试信息，用来帮助排查异常，比如缩小排查范围、窥探异常上下文等。其特性有以下三点：

- 实时关闭&开启

    动态调试可以在 APISIX 运行时通过修改指定的配置文件开启或关闭，不需要重启 APISIX 或者进行其他操作。

- 打印任何模块级函数

    该功能可以调试和打印任何模块级别函数的入参和出参，不管这个函数是位于 APISIX 的代码中，还是 APISIX 依赖的诸多 `lua-resty` 第三方库中，或者是 OpenResty 的 `lualib` 中的模块。只要能通过 `require` 引用该函数，就可以 `hook` 该函数。

- 针对指定请求开启

    除了以上两点，该功能也支持针对指定请求开启。通过设置特殊的请求头，对调试请求进行染色，便于追踪和分析。该特性可以通过 `curl xxx -H “X-APISIX-Dynamic-Debug”` 命令开启，该命令表示只有请求中携带 `X-APISIX-Dynamic-Debug` 请求头时，才会在日志中输出指定函数的入参和出参。该功能本质上是请求过滤，防止输出太多无意义的日志，也可以借此区分真实请求和调试请求。

### 配置动态调试

当你需要使用动态调试功能时，可以通过 `./conf/debug.yaml` 配置文件，开启 APISIX 的动态调试功能。

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/3.png)

关于上图配置的具体含义，请参考 [Debug Mode](https://apisix.apache.org/zh/docs/apisix/architecture-design/debug-mode/)。

下图是开启动态调试后对应的日志信息，可以看到该日志包含了指定函数的入参和出参。当调用 dns 解析的函数时，查询的域名为 `httpbin.org`，返回的结果是该域名解析出的 IP，并且该解析结果是从本地缓存的 DNS 查询结果中命中的，甚至可以看到这个域名在本地的 DNS 缓存中的存活时间等详细信息。但是在没有启用动态调试的时候，日志就没有那么详细了。

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/4.png)

了解完相关概念和使用方法后，接下来就可以进行 Bug 的排查了。

## 问题排查

首先采用动态调试的方式 `hook` 了出现异常的这段代码所在的函数，下图是针对该 Bug 所做的配置：

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/5.png)

### 验证问题

开启动态调试后，我们在日志中发现了端倪。在函数的入参中，正常情况下，`conf.response_expr` 对象是存在 `eval` 函数的，并且这个函数位于 `metatable` 中，这符合正常认知。当在 `conf.response_expr` 对象中找不到时，会在 `metatable` 中寻找 `eval` 函数并且执行成功。

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/6.png)

但是在异常案例中，`conf.response_expr` 对象的 `metatable` 对象丢失了，这是导致无法调用 `eval` 函数的直接原因，与异常日志相互映证。

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/7.png)

为什么 `conf.response_expr` 对象的 `metatable` 对象丢失了？

### 大胆推测

基于一个朴素的认知，计算机是不会骗人的，`conf.response_expr` 对象的 `metatable` 对象丢失一定会存在非常合理的解释。我们查看了相关代码，并基于已的信息梳理了代码执行路径，做了以下两点推测：

1. `conf.response_expr` 对象可能在其他地方被修改了，导致丢失 `metatable`；
2. `conf.response_expr` 对象被替换了，并在替换时丢失了 `metatable`。

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/8.png)

基于第一个推测，分析完函数执行路径后，确定没有任何地方会修改 `conf.response_expr` 对象，因为这个对象的使用范围很小，也不会泄漏到外面。

所以我们专注于分析第二点，`conf.response_expr` 是存在被替换可能性的。比如插件配置合并，该操作涉及到 Consumer、Service、Route 等对象上的插件配置的合并。在这个过程中，会使用核心库中的用户 `table` 操作的模块中的 `deepcopy` 函数来复制出新配置。

因此我们又检查了 `deepcopy` 函数，发现确实没有对 `metatable` 进行任何操作。

### 小心求证

基于以上信息，我们又对 `deepcopy` 函数进行了动态调试，修改后的配置如下：

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/9.png)

经过日志分析和提取，果然找到了异常的 `case`：

- 入参

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/10.png)

- 出参

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/11.png)

在 `deepcopy` 的入参中，是存在 `metatable` 的，但在出参中，`metatable` 丢失了。这可以验证关于 `metatable` 丢失的推测，并说明 `metatable` 丢失发生在插件配置合并中。

简单总结一下出现该异常的过程。比如我们创建了一个 Consumer 并且配置了 `key-auth` 插件，另外创建了一条 URI 为 `/hello` 的路由，并在该路由上配置了 `kafka-logger` 插件。

第一次发送了没有 Consumer header 的请求，该请求命中 `/hello` 路由后，会被 `key-auth` 插件拦截，但是该请求并没有完全退出，仍然执行了 `kafka-logger` 插件的 body_filter 阶段，也就是最开始异常日志对应的函数。这就导致第一次请求生成 `response_expr` 并存储在 `conf` 中。此时的 `conf.response_expr` 对象就不是空值了，并且 `conf.response` 对象还是有 `metatable` 的。

当第二次发送了携带 Consumer header 的请求，继续命中 `/hello` 路由，但是由于第二次的请求是合法的，所以将 Consumer 和 Route 上的插件合并。在这个过程中 `conf.response_expr` 对象的 `metatable` 对象丢失了。那么执行到 `kafka-logger` 的插件的代码中，就会出现异常日志所显示的 Bug。

经过大胆推测和小心求证，借助动态调试技术，在非常困难的运行环境中我们完成了 Bug 定位。

:::note 注意

目前该问题已被修复。

:::

相信读到这里，你已经初步了解 APISIX 运行时动态调试强大的能力了，那么 APISIX 是如何实现这个功能呢？

## 功能实现

下图是 APISIX 进行动态调试时的流程图。首先，APISIX 会解析 `./conf/debug.yaml` 配置文件，并找到需要动态调试的模块，然后替换这些模块中的函数，那么 APISIX 是如何替换函数的呢？请看下图：

![network error/log error.png](https://static.apiseven.com/2022/blog/0820/12.png)

在静态语言中，如果要修改代码，就需要重新编译代码，但是在动态语言 Lua 中，运行时替换函数是非常简单的。

在 OpenResty 世界中，每个模块实际上都是一个 `table`，Lua 中有特殊的 `metatable`，也就是元表机制，你可以给每个 `table` 设置 `metatable`。而 `metatable` 中有一个特殊的被称为 `_call` 的元函数，该元函数可以设置模块中函数被调用前后的行为。

当你需要调试某个模块时，APISIX 就会找到该模块，并且给该模块设置一个 `metatable`，定义 `_call` 元函数。通过这种方式，APISIX 就可以控制需要被动态调试的函数，获取这些函数的参数，在调试模块中运行这些函数，然后获得它们的执行结果，输出在日志中，并且返回函数调用结果。以上步骤相当于利用 `_call` 元函数作为切入点，对被调试的函数进行了切面。更多细节，请参考[源码](https://github.com/apache/apisix/blob/f0f5b48a8fbe78051e7ab97b979cc1632b2c9d2a/apisix/debug.lua)。

## 最佳实践

通过以上内容，相信你对动态调试有了更深刻的理解。以下是在实际使用该功能的过程中总结出来的经验，希望帮助你在使用动态调试功能时更加得心应手：

1. `hook_conf` 一次只能配置 1 个模块，可以配置这个模块下的多个函数；
2. `hook_conf` 使用的是 Lua 的 `package` 搜索规则：
    - 对于 APISIX 内的函数需要加上 `apisix` 前缀，比如 `apisix/core/table.lua`，需要配置为 `apisix.core.table`。
    - 对于其他依赖模块和 OpenResty 模块，比如 OpenResty 的 `dns resolver` 模块，配置为 `resty.dns.resolver`。
3. 动态调试功能只能打印模块级函数（一般是 `function _M.xxx` 形式），私有函数不能打印；
4. `hook_conf`可以配置多份，通过 `hook_conf.name` 来指定具体的某一份配置；
5. 积累成熟的 `debug.yaml`，需要时直接替换。

## 更多期待

最后我们来看一下目前对 APISIX 动态调试能力的设想：

1. 需要能够动态获取指定函数的参数输出（允许自由执行，自定义代码）
    - 获取 CPU、内存、磁盘等环境信息
    - 能够自由打印函数的输入、输出参数
2. 在 `privilege agent` 上执行特定命令，并获取返回结果
3. 调试工具具备运行时自身动态更新的能力（拆分 `debug` 模块为解析器和运行器）

对于以上设想可能不太容易理解，可以看下通过上述描述模拟出来的配置。它看起来稍显复杂，但是展现的构想效果却是非常惊艳的：

```lua
hook_conf:
  enable: false
  log_level: warn
  is_print_input_args: true
  is_print_return_value: trueenable_modules:
    - hook_http_access_phase
    - hook_plugin_kafka
  modules:
    hook_http_access_phase:
      lua_code_before: |
        ... ...
        core.log.error(core.json.encode(conf))
      apisix:
        - http_access_phase
    hook_control_api_status:
      lua_code_before: |
        ... ...
        if ngx.var.uri == " /status" then
            -- CPU\disk\memory
            ngx.say( \ "cpu : \", ...)
            ngx.exit( 200)
        end
      apisix.control-api:
      - http_access_phase
    hook_plugin_kafka:
      lua_code_before:|
      ... ...
      core.log.error(core.json.encode(conf))
    apisix.plugins.kafka-logger:
      - access
      - body_filter
#END
```

以上代码释义如下：

- `hook_http_access_phase`、 `hook_control_api_status`、`hook_plugin_kafka` 是不同配置块的名字，`debug` 模块根据 `hook_conf.enable_modules` 来寻找下方的定义好的配置块。
  比如上面 `hook_conf.enable_modules` 对应的是 `hook_plugin_kafka`，那么动态调试功能只会关联下方 `hook_plugin_kafka` 配置块中的内容。
  这样做的好处是我们可以预先在 debug.yaml 中写好一组常用的配置，然后根据需要修改 hook_conf.enable_modules 来切换不同的配置块。
- `lua_code_before`：中表示在需要 `hook` 的函数之前执行的代码，比如 `hook_plugin_kafka` 中的配置，表示在执行 `kafka-logger` 插件的 access 函数之前，先执行`core.log.error(core.json.encode(conf))` 。当然，也会有 `lua_code_after`，表示在执行指定 `hook` 的函数之后执行。

## 总结

本文通过实际案例为大家介绍了如何在 Apache APISIX 中使用动态调试功能，当系统中出现不明 Bug 时，利用动态调试功能可以帮助你快速定位 Bug，从而解决 Bug。如果你对动态调试有更好的设想和建议，欢迎到社区中进行讨论。
