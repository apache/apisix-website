---
title: "Why Apache APISIX chose Nginx and Lua to build API Gateway"
slug: 2021/08/25/why-apache-apisix-chose-nginx-and-lua
author: "Zexuan Luo"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- APISIX
- Apache APISIX
- Lua
- Nginx
- API Gateway
description: This article introduces the historical background of Apache APISIX's choice of Nginx + Lua technology stack and the advantages they bring to APISIX.
tags: [Ecosystem]
---

> This article was written by Zexuan Luo, engineer of [API7.ai](https://api7.ai/), and introduced the historical background of Apache APISIX's selection of Nginx + Lua technology stack and the advantages this technology stack brings to Apache APISIX. Zexuan Luo is an OpenResty developer and Apache APISIX PMC.

<!--truncate-->

When I was at this year’s COSCUP conference, some visitors asked me why did Apache APISIX, Kong, and 3scale API Gateways all choose Lua to build the program?

Yes, Lua is not a well-known language, and it is probably a long way from the most popular programming language.

So why do Apache APISIX and other well-known gateways choose Lua?

The technology stack used by Apache APISIX is not only Lua. To be precise, it should be Nginx with Lua. Apache APISIX is based on Nginx and uses Lua to build plugins or other features.

## LuaJIT VS Go

Serious readers may point out that Apache APISIX is not based on the Nginx + Lua stack, but Nginx + LuaJIT (also known as OpenResty). LuaJIT is a Just-In-Time Compiler (JIT) for the Lua programming language, its performance is much better than Lua. LuaJIT adds FFI functions to make it easy and efficient to call C code.

Since the current popular API gateways are either based on OpenResty or Go, developers are having hot debates about the performances of Lua and Go.

**From my point of view, it is meaningless to compare the performance of languages without scenes.**

First of all, to be clear, Apache APISIX is based on Nginx and Lua, and only the outer layer codes use Lua. So if you want to know which gateway performs better, the correct comparison object is to compare C with LuaJIT and Go. The bulk of the performance of the gateway lies in proxy HTTP requests and responses, and Nginx mainly does this piece of work.

**The best way to test gateways’ performances is to compare the HTTP implementation of the Nginx and Go standard libraries.**

As we all know, Nginx is a high-performance server, which is very strict with memory usage. Here are two examples:

The request header in Nginx is usually just a pointer to the original HTTP request data, and a copy is created only when it is modified.

When Nginx proxy upstream server’s response, It is very complicated to reuse Buffer.

With those strict rules, Nginx is one of the most popular and high-performance servers.

In contrast, the HTTP implementation in Go standard library is typical of memory abuse. Fasthttp, a project that re-implements HTTP packages in the Go standard library, gives us two examples:

We cannot reuse the standard library’s HTTP Request structure;
Headers are always parsed in advance and stored as a `map [string][]string`, even if they are not used (see: [Fasthttp FAQ](https://github.com/valyala/fasthttp#faq)).

The Fasthttp document also mentions some optimization skills for bytes matter, I would suggest that you take a look.

Actually, codes written in LuaJIT are not necessarily much worse than those written in Go. Here are two reasons:

**First, most of Lua’s library cores are written in C.**

For example, lua-cjson and lua-resty-core are implemented with C, but the Go libraries, of course, are mainly implemented with Go. Although there is such a thing called CGO, it is limited by Go's coroutine scheduling and toolchain, and it can only be in a subordinate position in the Go ecosystem.

For the comparison of LuaJIT and Go’s affinity with C, here has one post from Hacker News: [Comparing the C FFI overhead in various programming languages](https://news.ycombinator.com/item?id=17161168).

So when we compare some of Lua’s features, we are actually comparing C and Go.
Second, LuaJIT’s JIT optimization is unparalleled.

**Secondly, LuaJIT has one of the best JIT Opitimizations.**

We could divide dynamic languages into two cases, with or without JIT. JIT optimization can compile dynamic language code into machine code at runtime, thus improving the performance of the original code by order of magnitude.

Languages with JIT can also be divided into two cases, those that fully support JIT (e.g LuaJIT) and those that only support part of JIT.

The debate about who is faster, LuaJIT or V8, has been a hot topic for a long time. In short, the performance of LuaJIT is not much different from that of the pre-compiled Go program.

As for which one is slower and slower by how much, that is a matter of opinion. Here is an example:

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

The above two code snippets are equivalent. Can you guess whether the first Lua version is faster or the second Go version is shorter?

The first took less than 1 second on my machine, and the second took more than 23 seconds.

This example is not to prove that LuaJIT is 20 times faster than Go. I want to show that using a microbenchmark to prove that one language is shorter than another does not make much sense because many factors affect performance. A simple microbenchmark is likely to overemphasize one factor and lead to unexpected results.

## Nginx with Lua: High Performance + Flexibility

Let’s go back to Apache APISIX’s Nginx and Lua stack. The Nginx + Lua stack brings us more than just high performance.

People often ask us, since Apache APISIX is based on the open-sourced Nginx, and Nginx does not support dynamic configuration, why Apache APISIX claims that it supports dynamic configuration? Has it changed anything?

Yes, we do maintain our own Nginx distribution, but most features of Apache APISIX are available on the official Nginx. The reason why we can do dynamic configuration is to put the configuration into Lua code.

Take the Route system as an example. Nginx’s routes need to be configured in the configuration file, and every time the route is changed, it needs to be reloaded before it can take effect. Nginx’s route distribution only supports static configuration and cannot dynamically increase or decrease routes.

**To support dynamic routing configuration, Apache APISIX does two things:**

1. Configure a single server in the Nginx configuration file. There is only one location on this server. We use this location as the main entrance so that all requests will come to this place.

1. We use Lua to complete the route distribution work. Apache APISIX’s route distribution module supports increasing or decreasing routes at run time to configure routes dynamically.

You may want to ask, is routing distribution in Lua slower than Nginx implementation?

As mentioned earlier, we rewrite the core code in C for those with high-performance requirements. We did the same thing our route distribution module does. The module uses a radix-tree to match a route. We use C to implement the radix-tree. Please feel free to take a look at the code in [lua-resty-radixtree](https://github.com/api7/lua-resty-radixtree/).

After completing the radix-tree matching, it is time for Lua to show its flexibility. We support matching at the next level in many other ways for each the same prefix route, including checking through a specific expression. Although it is tough to access an expression engine using C, a pure C implementation cannot flexibly customize the variables inside the expression.

For example, here is the route configuration that Apache APISIX uses to match GraphQL requests:

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

It matches a GraphQL request like this:

```SQL
query repo {
    owner {
        name
    }
}
```

The graphql_name here is not an Nginx built-in variable, but is defined through Lua code. Apache APISIX defines three GraphQL-related variables, and there are only 62 lines of Lua codes (including parsing the GraphQL body). If you want to define variables through the Nginx C module, 62 lines may just be building up the boilerplate code of related methods, and there is no real logic to parse GraphQL yet.

**Using Lua for routing has another advantage: it reduces the threshold of development.**

Suppose we need particular logic in the routing process, users can implement custom variables and operators, such as determining which route to use by matching the geographic location of the IP library. Users only need to write some Lua code, which is much less complicated than modifying the Nginx C module.

In Apache APISIX, the routing system is dynamic. Our TLS server-side certificates and upstream node configurations are dynamic. There is no need to modify Nginx — the above functions can run on the official Nginx and Lua stack. Of course, by modifying Nginx, we have also implemented more advanced features, such as dynamic gzip configuration and dynamic client request size limit. We will implement our own Nginx distribution later so that open source users can easily use these advanced functions.
