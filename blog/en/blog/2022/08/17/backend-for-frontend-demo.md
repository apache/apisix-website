---
title: "Backend-for-Frontend: the demo"
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords: 
- API gateway
- Apache APISIX
- System architecture
- Mciroservices
description: The Backend-For-Frontend pattern describes how to return different data for each client in a microservices architecture. This article goes through the code required to implement the different possible implementations.
tags: [Case Studies]
image: https://static.apiseven.com/2022/11/03/63634494405e7.png
---

> This article describes a demo code to implement the Backend-For-Frontend pattern.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/backend-for-frontend-demo/" />
</head>

In [one of my earlier posts](https://blog.frankel.ch/backend-for-frontend/), I described the Backend-for-Frontend pattern. In short, it offers a single facade over multiple backend parts. Moreover, it provides each client type, _e.g._ desktop, mobile, exactly the data that it needs and not more in the format required by this client type.

## The use-case

Imagine the following use-case. In a e-commerce shop, the home page should display multiple *unrelated* data at once.

* Products: The business could configure which items are shown on the home page. They could be generic, "hero" products, or personalized, products that the customer ordered previously.
* News: Again, the newsfeed could be generic or personalized.
* Profile-related information
* Cart content
* Non-business related information, such as build number, build timestamp, version, etc.

Depending on the client, we want more or less data. For example, on a client with limited display size, we probably want to limit a product to its name and its image. On the other hand, on desktop, we are happy to display both the above, plus a catch phrase (or a more catchy - and longer - name) and the full description.

Every client requires its specific data and for performance reasons, we want to fetch them in a single call. It sounds like a use-case for <abbr title="Backend-for-Frontend">BFF</abbr>.

## Setting up the demo

In order to simplify things, I'll keep only three sources of data: products, news and technical data. Three unrelated data sources are enough to highlight the issue.

In the demo, I'm using Python and Flask, but the underlying technology is irrelevant, since BFF is an architectural pattern.

The initial situation is a monolith. The monolith offers an endpoint for each data source, and a single aggregating endpoint for all of them:

```python
@app.route("/")
def home():
    return {
      'products': products,       #1
      'news': news,               #1
      'info': debug               #1
  }
```

Somehow get the data internally, _e.g._, from the database.

At this point, everything is fine. We can provide different data depending on the client:

* If we want to put the responsibility on the client, we provide a dedicated endpoint
* If we want it server-side, we can read the `User-Agent` from the request (or agree on a specific `X-` HTTP header)

As it doesn't add anything to the demo, I won't provide different data depending on the client in the following.

## Migrating to microservices

At one point, the organization decides to migrate to a microservices architecture. The reason might be because the CTO read about microservices in a blog post, because the team lead wants to add microservices on its resume, or even because the development grew too big and the organization do need to evolve. In any case, the monolith has to be split in *two* microservices: a catalog providing products and a newsfeed providing... news.

Here's the code for each microservice:

```python
@app.route("/info")
def info():
    return debug                 #1


@app.route("/products")
def get_products():
    return jsonify(products)     #2
```

1. Each microservice has its own `debug` endpoint
2. The payload is not an object anymore but an array

```python
@app.route("/info")
def info():
    return debug                 #1


@app.route("/news")
def get_news():
    return jsonify(news)         #1
```

As shown above, now each client needs two calls, and filter out data that are not relevant.

## Dedicated backend-for-frontend

Because of the issues highlighted above, a solution is to develop one application that does the aggregation and filtering. There should be one for each client type, and it should be cared for by the same team as the client. Again, for this demo, it's enough to have a single one that only does aggregation.

```python
@app.route("/")
def home():
    products = requests.get(products_uri).json()            #1
    catalog_info = requests.get(catalog_info_uri).json()    #2
    news = requests.get(news_uri).json()                    #1
    news_info = requests.get(news_info_uri).json()          #2
    return {
      'products': products,
      'news': news,
      'info': {                                             #3
          'catalog': catalog_info,
          'news': news_info
      }
    }
```

1. Get data
2. Get debug info
3. The returned JSON should be designed for easy consumption on the client side. To illustrate it, I chose for the debug data to be nested instead of top-level.

## Backend-for-frontend at the API Gateway level

If you're offering APIs, whether internally or to the outside world, chances are high that you're already using an API Gateway. If not, you should probably [deeply consider](https://apisix.apache.org/docs/apisix/terminology/api-gateway/) starting to. In the following, I assume that you do use one.

In the previous section, we developed a dedicated backend-for-frontend application. However, requests already go through the gateway. In this case, the gateway can be seen as a container where to deploy BFF plugins. I'll be using [Apache APISIX](https://apisix.apache.org/) to demo how to do it, but the idea can be replicated on other gateways as well.

First things first, there's no generic way to achieve the result we want. For this reason, we cannot rely on an existing plugin, but we have to design our own. APISIX documents [how to do so](https://apisix.apache.org/docs/apisix/plugin-develop/). Our goal is to fetch data from all endpoints as above, but via the plugin.

First, we need to expose a dedicated endpoint, _e.g._, `/bff/desktop` or `/bff/phone`. APISIX allows such _virtual_ endpoints via the [public-api](https://apisix.apache.org/docs/apisix/plugins/public-api/) plugin. Next, we need to develop our plugin, `bff`. Here's the configuration snippet:

```yaml
routes:
  - uri: /                     #1
    plugins:
      bff: ~                   #2
      public-api: ~            #2
```

1. For demo purposes, I preferred to set it at the root instead of `/bff/*`
2. Declare the two plugins. Note that I'm using the [stand-alone mode](https://apisix.apache.org/docs/apisix/stand-alone/).

First, we need to describe the plugin and not forget to return it at the end of the file:

```lua
local plugin_name = 'bff-plugin'

local _M = {                           --1
    version = 1.0,
    priority = 100,                    --2
    name = plugin_name,
    schema = {},                       --3
}

return _M                              --4
```

1. The table needs to be named `_M`
2. In this scenario, `priority` is irrelevant as no other plugins are involved (but `public_api`)
3. No schema is necessary as there's no configuration
4. Don't forget to return it!

A plugin that has a public API needs to define an `api()` function returning an object describing matching HTTP methods, the matching URI, and the handler function.

```lua
function _M.api()
    return {
        {
            methods = { 'GET' },
            uri = "/",
            handler = fetch_all_data,
        }
    }
end
```

Now, we have to define the `fetch_all_data` function. It's only a matter of making HTTP calls to the catalog and newsfeed microservices. Have a look at [the code](https://github.com/ajavageek/backend-for-frontend/blob/master/bff_plugin/init.lua#L24-L52) if you're interested in the exact details.

At this point, the (single) client can query `http://localhost:9080/` and get the complete payload.

In a "real life" microservices-based organization, every team should be independent of each other. With this approach, each can develop its own BFF as a plugin and deploy it independently in the gateway.

## Bonus: a poor man's BFF

The microservices architecture creates two problems for clients:

1. The need to fetch all data and filter out the unnecessary ones
2. Multiple calls to each service

The BFF pattern allows to fix both of them, at the cost of custom development, regardless whether it's for a dedicated app or a gateway plugin. If you're not willing to spend time in custom development, you can still avoid #2 by using a nifty plugin of Apache APISIX, `batch-requests`:

>The `batch-requests` plugin accepts multiple requests, sends them from APISIX via HTTP pipelining, and returns an aggregated response to the client.
>
>This improves the performance significantly in cases where the client needs to access multiple APIs.
>
> -- [batch-requests](https://apisix.apache.org/docs/apisix/plugins/batch-requests/)

In essence, the client would need to send the following payload to a previously configured endpoint:

```json
{
    "timeout": 502,
    "pipeline": [
        {
            "method": "GET",
            "path": "/products"
        },
        {
            "method": "GET",
            "path": "/news"
        },
        {
            "method": "GET",
            "path": "/catalog/info"
        },
        {
            "method": "GET",
            "path": "/news/info"
        }
    ]
}
```

The response will in turn look like:

```json
[
  {
    "status": 200,
    "reason": "OK",
    "body": "{\"ret\":200,\"products\":\"[ ... ]\"}",
    "headers": {
      "Connection": "keep-alive",
      "Date": "Sat, 11 Apr 2020 17:53:20 GMT",
      "Content-Type": "application/json",
      "Content-Length": "123",
      "Server": "APISIX web server"
    }
  },
  {
    "status": 200,
    "reason": "OK",
    "body": "{\"ret\":200,\"news\":\"[ ... ]\"}",
    "headers": {
      "Connection": "keep-alive",
      "Date": "Sat, 11 Apr 2020 17:53:20 GMT",
      "Content-Type": "application/json",
      "Content-Length": "456",
      "Server": "APISIX web server"
    }
  },
  {
    "status": 200,
    "reason": "OK",
    "body": "{\"ret\":200,\"version\":\"...\"}",
    "headers": {
      "Connection": "keep-alive",
      "Date": "Sat, 11 Apr 2020 17:53:20 GMT",
      "Content-Type": "application/json",
      "Content-Length": "78",
      "Server": "APISIX web server"
    }
  },
  {
    "status": 200,
    "reason": "OK",
    "body": "{\"ret\":200,\"version\":\"...\"}",
    "headers": {
      "Connection": "keep-alive",
      "Date": "Sat, 11 Apr 2020 17:53:20 GMT",
      "Content-Type": "application/json",
      "Content-Length": "90",
      "Server": "APISIX web server"
    }
  }
]
```

It's up to the client to filter out unnecessary data. It's not as good as true BFF, but we still managed to make a single call out of 4.

## Conclusion

A microservices architecture brings a ton of technical issues to cope with. Among them is the need to dispatch only the required data to each kind of client. The BFF pattern aims to cope with this issue.

In the previous [post](https://blog.frankel.ch/backend-for-frontend/), I described the pattern from a theoretical point of view. In this post, I used a very simple ecommerce use-case to demo how to implement BFF with and without the help of Apache APISIX.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/backend-for-frontend).

**To go further:**

* [Pattern: Backends For Frontends](https://samnewman.io/patterns/architectural/bff/)
* [The API gateway pattern versus the Direct client-to-microservice communication](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/direct-client-to-microservice-communication-versus-the-api-gateway-pattern)
* [API Gateway vs Backend For Frontend](https://www.manuelkruisz.com/blog/posts/api-gateway-vs-bff)
