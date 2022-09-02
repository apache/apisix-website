---
title: "为什么 Apache APISIX 选择 NGINX+Lua 技术栈？"
slug: 2021/08/25/why-apache-apisix-chose-nginx-and-lua
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- API 网关
- APISIX
- Apache APISIX
- Lua
- Nginx
description: 本文介绍了云原生 API 网关 Apache APISIX 选用 Nginx + Lua 技术栈的历史背景和该技术栈为 APISIX 带来的优势，以及 LuaJIT 和 Go 的对比。
tags: [Ecosystem]
---

> 本文由深圳[支流科技](https://api7.ai/)工程师罗泽轩撰写，介绍了 Apache APISIX 选用 Nginx + Lua 这个技术栈的历史背景和这个技术栈为 Apache APISIX 带来的优势。罗泽轩是 OpenResty 开发者以及 Apache APISIX PMC。

<!--truncate-->

笔者在今年的 COSCUP 大会做分享时，曾有观众问这样的问题，为什么 Apache APISIX、Kong 和 3scale 这些网关都采用 Lua 来编写逻辑？

是啊，Lua 并不是一门广为人知的语言，离“主流编程语言”的圈子大概还差个十万八千里吧。甚至有一次，我在跟别人交流的时候，对方在说到 Lua 之前，先停顿了片刻，随后终于打定主意，以"L U A"逐个字母发音的方式表达了对这一罕见之物的称呼。

所以，为什么 Apache APISIX 和其他知名的网关会选择用 Lua 呢？

事实上，Apache APISIX 采用的技术栈并不是纯粹的 Lua，准确来说，应该是 Nginx + Lua。Apache APISIX 以底下的 Nginx 为根基，以上层的 Lua 代码为枝叶。

## LuaJIT VS Go

严谨认真的读者必然会指出，Apache APISIX 并非基于 Nginx + Lua 的技术栈，而是 Nginx + LuaJIT（又称 OpenResty，以下为了避免混乱，会仅仅采用 Nginx + Lua 这样的称呼）。

LuaJIT 是 Lua 的一个 JIT 实现，性能比 Lua 好很多，而且额外添加了 FFI 的功能，能方便高效地调用 C 代码。
由于现行的主流 API 网关，如果不是基于 OpenResty 实现，就是使用 Go 编写，所以时不时会看到各种 Go 和 Lua 谁的性能更好的比较。

**就我个人观点看，脱离场景比较语言的性能，是没有意义的。**

首先明确一点，Apache APISIX 是基于 Nginx + Lua 的技术栈，只是外层代码用的是 Lua。所以如果要论证哪种网关性能更好，正确的比较对象是 C + LuaJIT 跟 Go 的比较。网关的性能的大头，在于代理 HTTP 请求和响应，这一块的工作主要是 Nginx 在做。

**所以倘若要比试比试性能，不妨比较 Nginx 和 Go 标准库的 HTTP 实现。**

众所周知，Nginx 是一个 bytes matter 的高性能服务器实现，对内存使用非常抠门。举两个例子：

1. Nginx 里面的 request header 在大多数时候都只是指向原始的 HTTP 请求数据的一个指针，只有在修改的时候才会创建副本。
2. Nginx 代理上游响应时对 buffer 的复用逻辑非常复杂，是我读过的最为烧脑的代码之一。

凭借这种抠门，Nginx 得以屹立在高性能服务器之巅。

相反的，Go 标准库的 HTTP 实现，是一个滥用内存的典型反例。

这可不是我的一面之辞，Fasthttp，一个重新实现 Go 标准库里面的 HTTP 包的项目，就举了两个例子：

1. 标准库的 HTTP Request 结构体没法复用
2. headers 总是被提前解析好，存储成 map[string][]string，即使没有用到（原文见：https://github.com/valyala/fasthttp#faq ）

Fasthttp 文档里面还提到一些 bytes matter 的优化技巧，建议大家可以阅读下。

事实上，即使不去比较作为网关核心的代理功能，用 LuaJIT 写的代码不一定比 Go 差多少。原因有二。

**其一，拜 Lua 跟 C 良好的亲和力所赐，许多 Lua 的库核心其实是用 C 写的。**

比如 lua-cjson 的 json 编解码，lua-resty-core 的 base64 编解码，实际上大头是用 C 实现的。
而 Go 的库，当然是大部分用 Go 实现的。虽然有 CGO 这种东西，但是受限于 Go 的协程调度和工具链的限制，它在 Go 的生态圈里面只能处于从属的地位。

关于 LuaJIT 和 Go 对于 C 的亲和力的比较，推荐 Hacker News 上的这篇文章：《Comparing the C FFI overhead in various programming languages》（链接 https://news.ycombinator.com/item?id=17161168 ）

于是我们比较 Lua 的某些功能，其实还是会回到 C 和 Go 的比较中。

**其二，LuaJIT 的 JIT 优化无出其右。**

讨论动态语言的性能，可以把动态语言分成两类，带 JIT 和不带 JIT 的。JIT 优化能够把动态语言的代码在运行时编译成机器码，进而把原来的代码的性能提升一个数量级。

带 JIT 的语言还可以分成两类，能充分 JIT 的和只支持部分 JIT 的。而 LuaJIT 属于前者。

**人所皆知，Lua 是一门非常简单的语言。相对鲜为人知的是，LuaJIT 的作者 Mike Pall 是一个非常厉害的程序员。这两者的结合，诞生了 LuaJIT 这种能跟 V8 比肩的作品。**

关于 LuaJIT 和 V8 到底谁更快，一直是长盛不衰的争论话题。展开讲 LuaJIT 的 JIT 已经超过了本文想要讨论的范畴。简单来说，JIT 加持的 LuaJIT 跟预先编译好的 Go 性能差别并不大。

至于谁比谁慢，慢多少，那就是个见仁见智的问题了。这里我举个例子：

```Lua
local text = {"The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog", "at", "a", "restaurant", "near", "the", "lake", "of", "a", "new", "era"}
local map = {}
local times = 1e8
local n = #text
for i = 1, n do
    map[text[i]] = 0
    for _ = 1, times do
        map[text[i]] = map[text[i]] + 1
    end
end

for i = 1, n do
    io.write(text[i], " ", map[text[i]], "\n")
end
```

```Go
package main
import "fmt"
func main() {
    text := []string{"The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog", "at", "a", "restaurant", "near", "the", "lake", "of", "a", "new", "era"}
    m := map[string]int{}
    times := int(1e8)
    for _, t := range text {
        m[t] = 0
        for i := 0; i < times; i++ {
            m[t]++
        }
    }
    for _, t := range text {
        fmt.Println(t, " ", m[t])
    }
}
```

上面两段代码是等价的。你猜是第一个 Lua 版本的快，还是第二个 Go 版本的快？

在我的机器上，第一个用时不到 1 秒，第二个花了 23 秒多。

举这个例子并不是想证明 LuaJIT 比 Go 快 20 倍。我只想说明用 micro benchmark 证明某个语言比另一个语言快的意义不大，因为影响性能的因素很多。一个简单的 micro benchmark 很有可能过分强调某一个因素，导致出乎意料的结果。

## Nginx + Lua ：高性能 + 灵活

让我们转回 Apache APISIX 的 Nginx + Lua 的技术栈。Nginx + Lua 的技术栈给我们带来的，不仅仅是高性能。

经常有人问我们，既然你们是基于 Nginx 开源版本，而 Nginx 并不支持动态配置，为什么 Apache APISIX 声称自己可以实现动态配置？你们是不是改了点东西？

是的，我们确实有在维护自己的 Nginx 发行版，不过 Apache APISIX 的大部分功能在官方的 Nginx 上就能使用。我们之所以能做到动态配置，全靠把配置放到 Lua 代码里面来实现。

举路由系统作为一个例子，Nginx 的路由需要在配置文件里面进行配置，每次更改路由，都需要 reload 之后才能生效。这是因为 Nginx 的路由分发只支持静态配置，不能动态增减路由。

**为了实现路由动态配置，Apache APISIX 做了两件事：**

1. 在 Nginx 配置文件里面配置单个 server，这个 server 里面只有一个 location。我们把这个 location 作为主入口，这样所有的请求都会走到这个地方上来。
2. 我们用 Lua 完成路由分发的工作。Apache APISIX 的路由分发模块，支持在运行时增减路由，这样就能动态配置路由了。

你可能会问，在 Lua 里面做路由分发，会比 Nginx 的实现慢吗？

就像前面提到过的一样，凡是对性能要求比较高的，我们会把核心代码用 C 改写。我们的路由分发模块就是这么干的。路由分发模块在匹配路由时，会采用一个前缀树来匹配。而这个前缀树是用 C 实现的。感兴趣的读者可以看下代码：https://github.com/api7/lua-resty-radixtree/ 。

完成了 C 层面上的前缀树匹配，接下来就该 Lua 发挥灵活性的时刻了。对于匹配同一前缀的各个路由，我们支持通过许多别的方式来进行下一级的匹配，其中就包含通过一个特定的表达式来匹配。尽管硬着头皮，也能在 C 层面上接入一个表达式引擎，但是纯 C 实现做不了非常灵活地自定义表达式里面的变量。

举个例子，下面是 Apache APISIX 用来匹配 GraphQL 请求的 route 配置：

```json
{
        "methods": ["POST"],
        "upstream": {
            "nodes": {
                "127.0.0.1:1980": 1
            },
            "type": "roundrobin"
        },
        "uri": "/hello",
        "vars": [["graphql_name", "==", "repo"]]
}
```

它会匹配这样的 GraphQL 请求：

```Nginx
query repo {
    owner {
        name
    }
}
```

这里的 graphql_name 并非 Nginx 内置变量，而是通过 Lua 代码定义的。Apache APISIX 一共定义了三个 GraphQL 相关的变量，连同解析 GraphQL body 在内不过 62 行 Lua 代码。如果要通过 Nginx C 模块来定义变量，62 行可能只不过是把相关方法的样板代码搭建起来，都还没有到真正的解析 GraphQL 的逻辑呢。

**采用 Lua 代码来做路由还有一个好处：它减低了二次开发的门槛。**

如果在路由过程中需要有特殊的逻辑，用户可以实现成自定义的变量和运算符，比如通过 IP 库匹配到的地理位置来决定采用哪条路由。用户只需要写一些 Lua 代码，这要比修改 Nginx C module 的难度小多了。

在 Apache APISIX 里面，不仅仅路由是动态的，我们的 TLS 服务端证书和上游节点配置都是动态的，而且无需修改 Nginx —— 上述功能可以跑在官方的 Nginx + Lua 技术栈上。当然通过修改 Nginx，我们还实现了更多的高级功能，比如动态的 gzip 配置和动态的客户端请求大小限制。后续我们将推行自己的 Nginx 发行版，这样开源用户也能轻松用上这些高级功能。
