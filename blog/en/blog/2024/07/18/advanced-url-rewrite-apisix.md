---
title: Advanced URL rewriting with Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - URL
  - URL rewriting
description: >
  I spoke at Swiss PgDay in Switzerland in late June. The talk was about how to create a no-code API with the famous PostgreSQL database, the related PostgREST, and Apache APISIX, of course. I already wrote about the idea in a previous post. However, I wanted to improve it, if only slightly.
  PostgREST offers a powerful `SELECT` mechanism. To list all entities with a column equal to a value, you need the following command: curl /products?id=eq.1.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/07/11/zFguMrgf_notebook-1840276.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/advanced-url-rewrite-apisix/" />
</head>

>I spoke at [Swiss PgDay](https://www.pgday.ch/2024/#schedule) in Switzerland in late June. The talk was about how to create a no-code API with the famous [PostgreSQL](https://www.postgresql.org/) database, the related [PostgREST](https://postgrest.org/), and [Apache APISIX](https://apisix.apache.org), of course. I already wrote about the idea in a [previous post](https://blog.frankel.ch/poor-man-api/). However, I wanted to improve it, if only slightly.
>
>PostgREST offers a powerful `SELECT` mechanism. To list all entities with a column equal to a value, you need the following command:

<!--truncate-->

```bash
curl /products?id=eq.1
```

1. `id` is the column
2. `eq.1` corresponds to the `WHERE` clause

In this case, the generated query is `SELECT * FROM products WHERE id=1`.

The [query syntax](https://postgrest.org/en/v12/references/api/tables_views.html#get-and-head) is powerful and allows you to express complex queries. However, as an API designer, I want to avoid exposing users to this complexity. For example, a regular API can manage entities by their ID, _e.g._, `/products/1`. In turn, you'd expect PostgREST to be able to do the same with primary keys. Unfortunately, it doesn't treat primary keys any differently than regular columns. Apache APISIX to the rescue.

One of APISIX's best features is to rewrite requests, _i.e._, exposing `/products/1` and forwarding `/products?id=eq.1` to PostgREST. Let's do it.

First, we need to capture the ID of the path parameter. For this, we need to replace the regular radix tree router with the radix tree with a parameter router.

```yaml
apisix:
    router:
        http: radixtree_uri_with_parameter
```

The next step is to rewrite the URL. We use the [proxy-rewrite](https://apisix.apache.org/docs/apisix/plugins/proxy-rewrite/) plugin for this on a `/products/:id` route. Unfortunately, using the `:id` parameter above in the regular expression is impossible. We need to copy it to a place that is accessible. To do that, before the rewriting, we can leverage the [serverless-pre-function](https://apisix.apache.org/docs/apisix/plugins/serverless/). With the plugin, you can write Lua code directly. It's an excellent alternative to a full-fledged plugin for short, straightforward snippets.

Here's the configuration:

```bash
curl -i http://localhost:9180/apisix/admin/plugin_configs/1 -X PUT -d '
{
  "plugins": {
    "serverless-pre-function": {
      "phase": "rewrite",
      "functions" : [
        "return function(_, ctx)
          ctx.var.product_id = ctx.curr_req_matched.id;         #1
        end"
      ]
    },
    "proxy-rewrite": {
      "uri": "/products?id=eq.$product_id"                      #2
    }
  }
}'
```

1. Copy the captured `id` variable to a place accessible to other plugins later on
2. Use it!

Thanks to my colleague [Zeping](https://github.com/bzp2010) for pointing out the solution to me!

You can expose the `/products/1` REST-friendly URL and let APISIX rewrite it for PostgREST.

## Conclusion

I've described using the `proxy-rewrite` plugin with a path variable in this post. You can reuse the same technique with multiple variables. Keep also in mind that the `serverless` plugin is a hidden jewel; it can help you with small Lua snippets before moving to a full-fledged plugin.

**To go further:**

* [PostgREST](https://postgrest.org/en/v12/references)
* [PostgREST tables and views](https://postgrest.org/en/v12/references/api/tables_views.html)
* [APISIX serverless plugin](https://apisix.apache.org/docs/apisix/plugins/serverless/)
