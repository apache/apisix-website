---
title: "Why Is Apache APISIX the Best API Gateway?"
authors:
  - name: Ming Wen
    title: Author
    url: https://github.com/moonming
    image_url: https://avatars.githubusercontent.com/u/26448043
keywords:
  - Ingress controller
  - Open Source API Gateway
  - API Management Platform
  - The Best API Gateway
  - Apache APISIX
description: Why is Apache APISIX the best API Gateway? We will compare multiple API gateways (Kong, Tyk, Gloo) in terms of the popularity among developers, open source licenses, performances, and the ecosystem as a whole.
tags: [Technology, Products]
image: https://static.apiseven.com/2022/11/05/6365f2b8be5a7.png
---

> Why is Apache APISIX the best API Gateway? We will compare multiple API gateways (Kong, Tyk, Gloo) in terms of the popularity among developers, their open source licenses, their performances, and the ecosystem as a whole.

<!--truncate-->

<head>
  <link rel="canonical" href="https://api7.ai/blog/why-is-apache-apisix-the-best-api-gateway" />
</head>

> This post was first published at [API7.ai](https://api7.ai/blog/why-is-apache-apisix-the-best-api-gateway/) by [Ming Wen](https://github.com/moonming).

Nowadays, mobile phones are used for all sorts of things, and various applications are available on the AppStore including social media, utility, games, lifestyle, online shopping, etc. Building these apps is inseparable from APIs. Therefore, companies that provide services through APIs must choose a reliable API gateway to ensure their services’ speed, stability, and security.

In [CNCF’s API Gateway landscape](https://landscape.cncf.io/card-mode?category=api-gateway&grouping=category&sort=contributors), there are nearly 20 types of API gateway (not including cloud vendor’s services), including Apache APISIX, Kong, Tyk, etc. Many of them claim themselves to be the most popular open-source API gateway project, the next-generation API gateway, but are they?

In this article, we are going to analyze multiple API gateways in the dimensions of the popularity among developers, their open source licenses, their performances, and the ecosystem as a whole. In this analysis, we will see how Apache APISIX is the next-generation API Gateway, performing better than its peers in many aspects.

![API Gateway landscape.png](https://static.apiseven.com/2022/09/13/632052e8c6f34.png)

## Software Engineers Know It Well

Software engineers are the users and developers of API and API gateway, so the popularity among engineers is a direct indicator of the trend. Below is a graph comparing the total number of GitHub contributors of four API gateways: Apache APISIX, Kong, Tky, and Gloo.

![GitHub Contributors.png](https://static.apiseven.com/2022/09/13/632055a37ac26.png)

We can see from the graph that both Kong and Tyk started around 2015, while Apache APISIX and Gloo started later in 2019. More significantly, we can also see that the youngest Apache APISIX has the steepest curve among all of them and has accumulated more than 320 contributors, surpassing the second-best Kong by 57 people, becoming the API gateway project that has the most number of contributors.

![Monthly Active Contributors.png](https://static.apiseven.com/2022/09/13/63205698e44f5.png)

Aside from the total number of contributors, the number of monthly active contributors indicates more significance. The monthly active contributors for Tyk have been only around 5 and rarely go above 10, while Kong and Gloo have been fluctuating between 10 and 20. In the meantime, Apache APISIX has monthly active contributors above 20 stably, and nearly 40 at the peak, making it the most active API gateway project.

Behind the four open-source API gateway projects, there are four corresponding commercialized companies. So, another indicator that makes APISIX stand out is the ratio of the number of monthly active contributors versus the number of employees.

|     **API Gateway**      | **APISIX** | **Kong** | **Tyk** | **Gloo** |
| :----------------------: | :--------: | :------: | :-----: | :------: |
|      monthly active      |     38     |    20    |    8    |    24    |
| employees(from Linkedln) |    40+     |   500+   |  200+   |   100+   |

As of 2022, Kong and Tyk have a ratio of 4%, and Gloo has a ratio of 24%. In contrast, APISIX almost reached 100%. The reason behind it is that since the very beginning when the company API7.ai started the APISIX project, it has been putting continuous effort into the open-source community and gained its reputation among developers.

## Open Source Licence: The Most Important Factor of Choosing an Open Source API Gateway

Ever since MongoDB changed its open source license to SSPL (Server Side Public License) in 2018, enterprises now have to open source their own code when MongoDB is being used as a managed service. As a result, enterprises need to take into serious consideration of a project’s open source license when choosing a project.

From the surface, Apache APISIX, Kong, and Gloo all use the commercial-friendly Apache License Version 2.0, and Tyk uses Mozilla Public License Version 2.0. Dig deeper though, Kong, Gloo, and Tky are all backed by commercialized open source vendors. They can change their license any time just like MongoDB, limiting public cloud or other companies from using it freely, and forcing you to pay to access the new versions.

Nobody knows the probability of license changes. This risk, though, is just like the sword of Damocles, hanging above the users.

Under such circumstances, choosing an Apache Software Foundation(ASF)'s open source project or a CNCF’s open source project is the best choice, because they cannot modify the license of the project. Apache APISIX is such a project. It is an ASF top-level project, meaning no commercial company has absolute control of the Apache APISIX project, all codes belong to ASF and the license will not be changed. Enterprise users can use it freely without worrying about receiving inquiry emails from lawyers and compliance departments.

## Performance of Apache APISIX, Kong and Gloo

A frequently asked question in the community: which one has the better performance, Envoy-based Gloo or NGINX-based APISIX? Although performance is not the most critical metric, it is inarguably the most direct metric. The table below shows the benchmark scores of Apache APISIX and Gloo. The QPS of Apache APISIX is 4.6 times that of Gloo, and the latency of Apache APISIX is merely 7% of Gloo’s.

| **API Gateway** |                              Apache APISIX                               |                               Gloo Edge                                |
| :-------------: | :----------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|     **QPS**     |                                  59122                                   |                                 12903                                  |
|   **Latency**   | 50.000% 470.00us<br/>75.000% 648.00us<br/>90.000% 0.89ms<br/>99.000% 1.60ms | 50.000% 6.80ms<br/>75.000% 9.25ms<br/>90.000% 11.32ms<br/>99.000% 17.06ms |

The choice of NGINX or Envoy is not the main factor of the performance difference, but the underlying optimization APISIX did in its source code. Even compared to KONG, which is also NGINX-based, APISIX has a huge performance upper hand. The graph below is extracted from [GigaOm’s](https://gigaom.com/) report on testing Kong’s Enterprise Edition and AP7 Enterprise Edition ([You can contact us for the complete data](https://api7.ai/request-demo/)).

![Performance.png](https://static.apiseven.com/2022/09/13/6320574ba0244.png)

The latency of Kong is tens or even a hundred times of API7(Enterprise Edition created by authors of Apache APISIX)’s.

Why does APISIX have such a big performance upper hand? There are no secrets in front of the code.

## Talk Is Cheap, Show Me the Code

Now, let us analyze Apache APISIX, Kong, and Gloo from a technical point of view. Apache APISIX’s advantage mostly relies on optimization and innovation of the source code. The advantages of these technologies are not necessarily reflected in the simple PoC(Proof of Concept), but shown in a more complex production environment.

Before the emergence of the APISIX project, there were many commercial API gateways or open source API gateway products. These products stored API data, routing information, certificates, and configuration data in a relational database. The advantages of storing these data in relational databases are very obvious. Users can use SQL statements to perform flexible queries, and it is also convenient for users to perform backup and subsequent maintenance.

However, the gateway is a middleware that handles all traffic from the client. The requirement for availability is extremely high. If the API gateway relies on a relational database, it means that once the relational database fails (such as downtime or data loss), the API gateway will also be affected, and the availability of the entire system will also be suffering.

To reduce the damage, APISIX structured its architecture to avoid the possibility of downtime and data loss. APISIX used etcd to store configuration data instead of a relational database, the advantages of doing so are as follows:

1. It is more aligned with the cloud-native architecture
2. It is a better representation of the data type needed for the API gateway
3. It will have higher availability
4. The changes can be notified at a sub-millisecond level

After using etcd to store configuration data, users only need to monitor etcd updates for data changes. APISIX will be able to obtain the latest configuration within milliseconds, achieving a real-time effect. If we were polling from the database, however, it may take 5-10 seconds to obtain the latest configuration information. Therefore, using etcd as the storage scheme not only makes APISIX more cloud-native but also higher availability.

### High-Performance Route Matching Algorithm

To process a request, API Gateway needs to match the target expression with each request's host information, URI, HTTP methods, and other information. Thus, an efficient matching algorithm is crucial. The hash-based algorithm has good performance, but cannot achieve fuzzy matching. Regular expressions can perform fuzzy matching, but the performance is not so good. Apache APISIX’s solution is to use a tree, an efficient search data structure that supports fuzzy matching. To be more precise, Apache APISIX uses a radix tree (compressed prefix tree), a data structure that only compresses intermediate nodes with one child. Among all the known API gateway products, Apache APISIX is the first to apply the radix tree in route matching and supports the scenario where one prefix can match multiple routes. For the implementation details, see [lua-resty-radixtree](https://github.com/api7/lua-resty-radixtree).

When matching a request, the algorithm with the radix tree will match it progressively, with an O(K) complexity (K is the length of the URI in the route, and it is independent of the number of APIs). This algorithm suits very well in scenarios when there are a large number of routes, such as on public clouds or CDN. It also has no problem dealing with a large number of routes that increases rapidly.

### High-Performance IP Matching Algorithm

An IP address has two notations: standard IP notation and CIDR notation, taking 32-bit IPv4 as an example:

- Standard IP notation: 192.168.1.1
- CIDR notation: 192.168.1.1/8

Apache APISIX's IP matching and route matching use different algorithms. Take the IP of 192.168.1.1 as an example, since the range of each IP segment is 0 to 255, we can think that the IP address is composed of four 16-bit integer numbers, and the length of the IP is fixed. Thus, we can use a more efficient algorithm to complete the matching.

Assume that there is an IP library containing 500 IPv4 records, APISIX will cache the 500 IPv4 records in the hash table, and use the hash table for IP matching. The time complexity is O(1). Other API gateways complete IP matching through list iteration and each request sent to the gateway may be iterated up to 500 times. Therefore, APISIX's high-precision IP matching algorithm greatly improves the efficiency of scenarios that require massive IP allowlist and denylist matching (such as WAF).

### Routes Refinement

API Gateways match the pre-defined rules with various information of the requests, such as the host information, URI, URI query parameters, URI path parameters, HTTP methods, request headers, etc. These pieces of information are supported by most of the API gateway. However, Apache APISIX supports more data in addition to these to solve more complex cases.

First, Apache APISIX supports NGINX built-in variables, which means that we can use dozens of NGINX built-in variables as matching parameters, including `uri`, `server_name`, `server_addr`, `request_uri`, `remote_port`, `remote_addr`, `query_string`, `host`, `hostname`, `arg_name`.

For a list of NGINX built-in variables, [see NGINX Variables](http://nginx.org/en/docs/varindex.html).

Second, Apache APISIX supports conditional expressions as matching rules, and its structure is `[var, operator, val], ...]]`, where:

- `var` values ​​can be NGINX built-in variables.
- `operator` supports equal, greater than, less than, regular expressions, contains, etc.

Assuming the expression is `["arg_name", "==", "json"]`, it means whether there is a parameter value of `name` equal to `json` in the URI query parameters of the current request. Apache APISIX implements this feature through its library `lua-resty-expr`. For details, please refer to [lua-resty-expr](https://github.com/api7/lua-resty-expr). This feature gives the user a lot of flexibility and is highly extensible.

In addition, Apache APISIX allows the users to set up routes’ ttl(time to live).

```shell
$ curl http://127.0.0.1:9080/apisix/admin/routes/2?ttl=60 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "/aa/index.html",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "39.97.63.215:80": 1
        }
    }
}'
```

The above code means that APISIX will automatically delete the routing configuration after 60sec, which will be required for some temporary verification scenarios, like canary release. It is also very convenient for online traffic splitting, a feature that other gateway products do not have.

Lastly, Apache APISIX supports customized filter functions, one can write custom Lua functions in the `filter_func` parameter, for example:

```shell
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "/index.html",
    "hosts": ["foo.com", "*.bar.com"],
    "filter_func": "function(vars)
                    return vars['host'] == 'api7.ai'
                end",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

The input parameter of `filter_func` is `vars`, and NGINX variables can be obtained from `vars`, and then the filtering logic can be customized.

### Support for Multi-Language Plugins

Users often need to customize some of the development and system integration of API gateway towards specific scenarios.

APISIX currently supports more than 80 plugins, but it is still difficult to cover all user scenarios. Thus, most companies will develop customized plugins for specific businesses, integrate more protocols and systems through the gateway, and achieve unified management at the gateway layer.

In earlier versions of APISIX, developers could only use Lua to develop plugins. Although plugins developed in native computing languages ​​have very high performance, learning Lua, a new development language, requires time and learning costs.

In response to this situation, APISIX provides two solutions.

The first solution is to support more mainstream programming languages ​​(such as Java, Python, Go, etc.) through Plugin Runner. Using Plugin Runner, back-end engineers can communicate through local RPC to develop APISIX plugins using the programming languages they are familiar with. The advantage of this is to reduce development costs and improve development efficiency. The disadvantage will be performance losses. So, is there a way to achieve the near-native performance of Lua using high-level languages that developers are familiar with?

![Multi-Language Architecture.png](https://static.apiseven.com/2022/09/13/632057a0ad122.png)

The second solution is to use Wasm to develop plugins, as shown in the left part of the above figure. Wasm (WebAssembly) was first used as a new type of technology that runs in browsers, but now it is also gradually showing its advantages on the server side. We embedded Wasm into APISIX, and users can use Wasm to compile Wasm bytecode to run in APISIX. To make use of Wasm we developed a Wasm plugin where users can develop near-native APISIX plugins using high-level programming languages.

As a result, users can use Lua, Go, Java, Python, Node.js, and Wasm to write custom plugins on APISIX. By making development easy, it opens doors for APISIX plugin development.

## Conclusion

In this article, we analyzed and compared API gateway products from multiple perspectives such as software engineers, open source protocols, performance evaluation, technology, and ecosystem. We can see that Apache APISIX is superior in many aspects, a pioneer in the API network.

Apache APISIX is not only an API gateway that can handle north-south traffic, but also has open source products such as APISIX Ingress Controller and Service Mesh.

It also provides APISIX-based enterprise-level products and SaaS products.

[Try Apache APISIX and API7 Enterprise products today!](https://api7.ai/request-demo/)
