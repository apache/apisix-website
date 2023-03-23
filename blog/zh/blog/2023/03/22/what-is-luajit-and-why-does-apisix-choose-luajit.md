---
title: "什么是 LuaJIT？为什么 Apache APISIX 选择了 LuaJIT？"
authors:
  - name: "杨陶"
    title: "Author"
    url: "https://github.com/SkyeYoung"
    image_url: "https://github.com/SkyeYoung.png"
keywords: 
- API 网关
- Apache APISIX
- LuaJIT
- Lua
description: 本文介绍了 LuaJIT 的高灵活性和高性能，以及 APISIX 作为云原生 API 网关选择 LuaJIT 的原因。
tags: [Ecosystem]
---

> 本文介绍了 LuaJIT 的高灵活性和高性能，以及 APISIX 作为云原生 API 网关选择 LuaJIT 的原因。

<!--truncate-->

> 作者[杨陶](https://github.com/SkyeYoung)，API7.ai 技术工程师。

## 什么是 LuaJIT

### 定义

简单地说，LuaJIT 是 Lua 这种编程语言的实时编译（JIT，Just-In-Time Compilation）器的实现。
对于不太了解 LuaJIT 的读者，我们可以将 LuaJIT 拆成 Lua 和 JIT 两个部分来理解。

#### Lua

Lua 是一种优雅、易于学习的编程语言，具有自动内存管理、完整的词法作用域、闭包、迭代器、协程、正确的尾部调用以及使用关联数组进行非常实用的数据处理。本文不会涉及 Lua 的语法，有关内容欢迎阅读 [Getting Started With Lua](https://api7.ai/learning-center/openresty/getting-started-with-lua)。

Lua 的设计目标是能与 C 或其它常用的编程语言相互集成，这样就可以利用其它语言已经做好的方面；而它提供的特性又恰好是 C 这类语言不太擅长的，比如相对于硬件层的高层抽象，动态的结构，简易的测试等等。其袖珍的语言内核和只依赖于 ANSI C 标准的特点，使之在各平台上的可移植性变得非常高。因此 Lua 不仅是一个可以作为独立程序运行的脚本语言，也是一个可以嵌入其它应用的嵌入式语言。

![Apache APISIX 就是一个在底层同时使用 Lua 和 C 的极佳例子。](https://static.apiseven.com/uploads/2023/02/24/TjmXxHHf_%E4%B8%8B%E8%BD%BD%20%281%29.png)

但此时的 Lua 还有传统脚本语言常见的两个问题：效率低和代码暴露。而 LuaJIT 引入的 JIT 技术能够有效地解决了这两个问题。

#### JIT

JIT（Just-In-Time Compilation），实时编译，是动态编译的一种形式。在计算机科学中，动态编译并不是唯一的编译形式，比如现今仍然流行的 C 语言使用的就是另一种形式：静态编译。

需要指出的是，我们也常常将 C 语言的这种与动态编译相反的编译方式称为提前编译（AOT，Ahead-of-Time Compilation），但二者并不是完全对等的。AOT 仅是描述在执行程序前，将某种“高级”语言编译为某种“低级”语言的行为。其编译的目标语言并不一定特定于程序宿主机上的机器码，而是任意定义的。比如将 Java 编译为 C，或者将 JavaScript 编译为 V8 等等这些行为也会被视为 AOT。由于所有静态编译在技术上都是提前执行的，所以在这种特定的上下文中使用时，我们可以将 AOT 视为与 JIT 相反的静态编译。

抛开这些冗杂的名词，想到静态编译的产物，你可能会发现，Lua 语言面临的问题也可以通过静态编译来解决。但事实上，这就丢失了 Lua 作为脚本语言的优势：热更新的灵活性和良好的平台兼容性。所以目前除了有特殊需求的脚本语言外，大部分脚本语言都在使用 JIT 尝试提高语言性能，比如 Chromium 平台上使用 V8 的 JavaScript 和使用 YJIT 的 Ruby。

JIT 尝试将 Lua 的动态解释和 C 的静态编译两者的优缺点相结合，在脚本语言的执行期间，通过不断地分析正在执行的代码片段，编译或重新编译这段代码，以得到执行效率的提升。此时，JIT 假设的目标是，由此得到的性能提升能够高于编译或重新编译这段代码的开销。理论上说，由于能够进行动态地重新编译，JIT 在此过程中，可以针对正在运行程序的特定平台架构进行优化、加速，在某些情况下，能产生比静态编译更快的执行速度。

JIT 分为传统的 Method JIT 和 LuaJIT 正在使用的 Trace JIT 两种。Method JIT 是将每一个方法（Method）翻译为机器码；而如下图所示，更先进的Trace JIT 假定 “对只执行一两次的代码，解释执行比 JIT 编译执行要快”，以此为依据对传统 JIT 进行优化，具体表现为将频繁执行的代码片段（即热路径上的代码）认定为需要跟踪的代码，将这部分代码编译成机器码执行。

![LuaJIT 的原理](https://static.apiseven.com/uploads/2023/02/24/5tZgTwe1_%E6%97%A0%E6%A0%87%E9%A2%98-2023-02-24-1113.png)

#### LuaJIT

而 LuaJIT（2.x 版本）在 Trace JIT 的基础上，集成了使用汇编编写的高速解释器和基于 [SSA](https://en.wikipedia.org/wiki/Static_single-assignment_form) 并进行优化的代码生成器后端，大幅提高了 JIT 的表现，最终使得 LuaJIT 成为最快的动态语言实现之一。

除此之外，相对于原生 Lua 中为了与 C 交互而需要编写 Lua 与 C 的繁复绑定，LuaJIT 还实现了 FFI（外部函数接口，Foreign Function Interface）。该技术允许了我们在不清楚参数个数和类型的情况下，从 Lua 代码中直接调用外部的 C 函数和使用 C 的数据结构。由此功能，我们也可以直接使用 FFI 实现所需的数据结构，而非 Lua 原生的 Table 类型，进一步在性能敏感的场景下，提升程序运行的速度。有关使用 FFI 提高性能的技巧并非本文讨论的范畴，更深入的内容可以参阅 [Why Does lua-resty-core Perform Better?](https://api7.ai/learning-center/openresty/why-lua-resty-core-perform-better)。

总而言之，LuaJIT 在 Lua 语法的基础上，实现了迄今为止脚本语言中最快的 Trace JIT 之一，并提供了 FFI 等功能，解决了 Lua 效率低和代码暴露的问题，让 Lua 真正成为了高灵活性、高性能和超低内存占用的脚本语言和嵌入式语言。

### 与其它语言、WASM 的对比

相对于 Lua 和 LuaJIT，我们可能对其它的一些语言更加熟悉，比如 JavaScript (Node.js)，Python，Golang，Java 等。对比这些大众化的语言，我们可以看到更多 LuaJIT 的特性和优势，下面简单罗列一些 Lua/LuaJIT 与这些语言的对比：

- Lua 的语法设计是针对非软件工程师所设计的。所以像 R 语言一样，Lua 也拥有数组下标从 1 开始等适合普通人的设计。
- Lua 非常适合作为嵌入式语言。Lua 本身拥有一个轻量的 VM，而 LuaJIT 在添加各种功能和优化后，也仍然很轻量。所以相对 Node.js 和 Python 之类庞大的运行环境，LuaJIT 直接集成到 C 编写的程序中后也不会增大太多体积。因此，实际上 Lua 是所有嵌入式语言中使用量比较大且主流的选择。
- Lua 也很适合做“胶水”语言。类似 JavaScript(Node.js) 和 Python，Lua 也能很好地连接不同的库和代码。但稍有不同的是，Lua 与底层生态的耦合性更高，所以在不同的领域中，Lua 的生态可能并不通用。

WASM（Web Assembly）是一种新兴的跨平台技术。这种起初设计为补充而非取代 JavaScript 的技术，因为能够将其它的语言编译成 WASM 字节码，同时还能作为安全沙箱运行代码，使得越来越多的程序也在考虑使用 WASM 作为嵌入或者胶水的平台。即便如此，Lua/LuaJIT 在对比新兴的 WASM 时，也仍然有不少优势：

- WASM 的性能是受限的，无法达到汇编的水准。普遍场景下的性能，WASM 肯定好过 Lua，但与 LuaJIT 有所差距。
- WASM 与宿主程序的数据传递效率比较低。而 LuaJIT 可以通过 FFI 进行高效率的数据传递。

## 为什么 Apache APISIX 选择 LuaJIT

尽管上文描述了 LuaJIT 自身的诸多优势，但对于大部分开发者而言，Lua 不是一门大众的语言，LuaJIT 更不是一个大众的选择。那为什么 Apache 基金会所属的云原生 API 网关 Apache APISIX 还是选择了 LuaJIT 呢？

作为云原生的 API 网关，Apache APISIX 兼具动态、实时、高性能等特点，提供了负载均衡、动态上游、灰度发布（金丝雀发布）、服务熔断、身份认证、可观测性等丰富的流量管理功能。我们可以使用 Apache APISIX 来处理传统的南北向流量，也可以处理服务间的东西向流量，还可以用作 k8s 的 Ingress Controller。

而这一切都建立在 Apache APISIX 所选择的 NGINX 和 LuaJIT 技术栈之上。

### LuaJIT 与 NGINX 结合带来的优势

NGINX 是一个知名的高性能 HTTP 、TCP/UDP 代理和反向代理的 Web 服务器。

但在使用中，我们会发现很恼人的是，每次修改 NGINX 的配置文件后，都需要使用 `nginx -s reload` 重新加载 NGINX 配置。

不仅如此，频繁地使用该命令重新加载配置可能会造成连接的不稳定，增加业务丢失的可能性；而在某些情况下，NGINX 重载配置的机制也可能会造成旧进程的回收时间过长，影响正常的业务。对于该问题的深入讨论，可以阅读 [为什么 NGINX 的 reload 不是热加载？](https://apisix.apache.org/zh/blog/2022/11/23/why-is-not-reload-hot-loaded-in-nginx/)，这里不进行深入展开。

Apache APISIX 诞生的目的之一就是解决 NGINX 的动态配置问题，LuaJIT 的高灵活性、高性能和超低内存占用带来了这种可能性。
以最具普遍性的路由为例，Apache APISIX 通过在 NGINX 配置文件中只配置单个 location 作为主入口，而后续的路由分发则由 APISIX 的路由分发模块完成，以此实现了路由的动态配置。

为了实现足够高的性能，Apache APISIX 使用 C 编写了基于前缀树的匹配路由算法，并在此基础上使用 LuaJIT 提供的 FFI 编写了适用于 Lua 的接口。而 Lua 的灵活性，也使得 Apache APISIX 的路由分发模块，可以轻易地支持通过特定的表达式等方法，对同一前缀的下级路由进行匹配。最终在替代 NGINX 原生路由分发功能的前提下，实现了兼具高性能、高灵活性的动态配置功能。有关这部分功能的详细实现，可以查看 [lua-resty-radixtree](https://github.com/api7/lua-resty-radixtree) 和 [route.lua](https://github.com/apache/apisix/blob/master/apisix/http/route.lua)。

另外，不只是路由，从负载均衡、健康检查，到上游节点配置、服务端证书，以及扩展 APISIX 能力的插件本身，都能在 APISIX 不重启的情况下重新加载。

同时，除了在使用 LuaJIT 进行插件等功能的开发，Apache APISIX 还支持了 Java、Go、Node、Python 以及 WASM 等多种方式开发插件，也让 Apache APISIX 的二次开发门槛大大降低，使 Apache APISIX 获得了丰富的插件生态和活跃的开源社区。

![Apache APISIX 的插件原理和生态](https://static.apiseven.com/uploads/2023/02/24/ugg7fXMD_%E4%B8%8B%E8%BD%BD%20%282%29.png)

## 总结

LuaJIT 是 Lua 的实时编译器实现。

Apache APISIX 作为一个动态、实时、高性能的开源 API 网关，基于 NGINX 与 LuaJIT 带来的高性能、高灵活等特性，提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

目前 Apache APISIX 已经来到了全新的 3.x 版本，并带来了更多的开源项目集成、云供应商集成，原生的 gRPC 支持，更多的插件开发方式选择，以及服务网格支持等功能。欢迎加入 Apache APISIX 社区，了解更多 LuaJIT 在云原生 API 网关中的应用。
