---
title: "APISIX Architecture: How to Dynamically Manage NGINX Cluster?"
author: Hui Tao
keywords: 
- API Gateway
- Apache APISIX
- Nginx
- Lua
- Dynamic Management
date: "2021-08-10"
description: This article mainly introduces the principle of APISIX to implement REST API remote control of Nginx cluster based on APISIX 2.8, OpenResty 1.19.3.2 and Nginx 1.19.3.
tags: [Ecosystem]
---

> This article is re-posted from Tao Hui's personal blog, and introduces the principles of Apache APISIX for REST API remote control of Nginx clusters based on APISIX version 2.8, OpenResty version 1.19.3.2, and Nginx version 1.19.3.

<!--truncate-->

One of the most criticized aspects of the open source version of Nginx is that it does not have dynamic configuration, remote API, and cluster management capabilities. Apache APISIX, the open source seven-tier gateway graduated from the Apache Foundation, implements dynamic management of Nginx clusters based on etcd and Lua.

![APISIX architecture diagram](https://static.apiseven.com/202108/1631170283612-ba5e27ff-726b-47a6-aa51-84731b067c44.png)

Making Nginx dynamically, cluster-managed is not easy, as it would face the following problems.

* The microservices architecture makes for a large variety and number of upstream services, which leads to extremely frequent changes to routing rules, and upstream Servers. Nginx's route matching is based on static Trie prefix trees, hash tables, and regular arrays, so once `server_name` and `location` change, it is impossible to dynamically change the configuration without performing a reload.
* Nginx positions itself as an ADC edge load balancer, so it does not support the HTTP2 protocol upstream. This makes it more difficult for the OpenResty ecosystem to implement the etcd gRPC interface, so receiving configuration changes through the watch mechanism is inefficient
* Multi-process architecture makes it harder to synchronize data between worker processes, so you must choose a low-cost implementation mechanism to ensure that each Nginx node and worker process has the latest configuration

Apache APISIX is based on the Lua timer and the lua-resty-etcd module for dynamic configuration management. The principle of Nginx clustering.

## Configuration synchronization scheme based on etcd watch mechanism

Managing a cluster must rely on a centralized configuration, and etcd is one such database. etcd was not chosen as the configuration center for Apache APISIX because it has two advantages.

* etcd uses the Paxos-like Raft protocol to guarantee data consistency, and it is a decentralized, distributed database that is more reliable than relational databases
* etcd's watch mechanism allows clients to monitor changes to a key, i.e., if the value of a key like /nginx/http/upstream changes, the watch client will be notified immediately, as shown in the following figure.
![etcd-based synchronization of nginx configuration](https://static.apiseven.com/202108/1631170345853-f020a64d-3e97-49c0-8395-c9e4e9cf4233.jpeg)

Therefore, unlike Orange and Kong, Apache APISIX uses etcd as the centralized configuration component. You can see a similar configuration in a production environment of Apache APISIX via etcdctl as follows.

```yaml
# etcdctl get "/apisix/upstreams/1"
/apisix/upstreams/1
{"hash_on": "vars", "nodes":{"httpbin.org:80":1}, "create_time":1627982128, "update_time":1627982128, "scheme": "http", "type":" roundrobin", "pass_host": "pass", "id": "1"}
```

Where the prefix /apisix can be changed in conf/config.yaml, e.g.

```yaml
etcd:
  host:  
    - "http://127.0.0.1:2379"
  prefix: /apisix # apisix configurations prefix
```

and upstreams/1 is equivalent to http { upstream 1 {} } in nginx.conf. Similar keywords are used in /apisix/services/, /apisix/routes/, and so on.

So, how does Nginx get the etcd configuration data changes through the watch mechanism? Does it start a new agent process? Does it communicate with etcd via HTTP/1.1 or gRPC?

## ngx.timer.at timer

Apache APISIX does not start a process other than Nginx to communicate with etcd. It actually implements the watch mechanism through the `ngx.timer.at` timer. For those who are not familiar with OpenResty, let's take a look at how the timer is implemented in Nginx, which is the basis for the watch mechanism.

### Nginx's red-black tree timer

Nginx uses an epoll + nonblock socket multiplexing mechanism to implement an event handling model in which each worker process cycles through network IO and timer events.

```c
//see the src/os/unix/ngx_process_cycle.c file for Nginx
static void
ngx_worker_process_cycle(ngx_cycle_t *cycle, void *data)
{
    for (;; ) {
        ngx_process_events_and_timers(cycle);
    }
}

// See the ngx_proc.c file
void
ngx_process_events_and_timers(ngx_cycle_t *cycle)
{
    timer = ngx_event_find_timer();
    (void) ngx_process_events(cycle, timer, flags);
    ngx_event_process_posted(cycle, &ngx_posted_accept_events);
    ngx_event_expire_timers();
    ngx_event_process_posted(cycle, &ngx_posted_events);
}
```

The `ngx_event_expire_timers` function calls the handler method of all timeout events. In fact, the timer is implemented by a [red-black tree](https://zh.wikipedia.org/zh-hans/%E7%BA%A2%E9%BB%91%E6%A0%91) (a balanced ordered binary tree), where the key is the absolute expiration time of each event. This way, expired events can be found quickly by comparing the minimum node with the current time.

### Lua timer for OpenResty

Of course, the above C functions are very inefficient to develop. Therefore, OpenResty wraps the Lua interface and exposes the C function `ngx_timer_add` to the Lua language via [ngx.timer.at](https://github.com/openresty/lua-nginx-module#ngxtimerat).

```c
//see OpenResty /ngx_lua-0.10.19/src/ngx_http_lua_timer.c file
void
ngx_http_lua_inject_timer_api(lua_State *L)
{
    lua_createtable(L, 0 /* narr */, 4 /* nrec */); /* ngx.timer. */

    lua_pushcfunction(L, ngx_http_lua_ngx_timer_at);
    lua_setfield(L, -2, "at");

    lua_setfield(L, -2, "timer");
}
static int
ngx_http_lua_ngx_timer_at(lua_State *L)
{
    return ngx_http_lua_ngx_timer_helper(L, 0);
}
static int
ngx_http_lua_ngx_timer_helper(lua_State *L, int every)
{
    ngx_event_t *ev = NULL;
    ev->handler = ngx_http_lua_timer_handler;
    ngx_add_timer(ev, delay);
}
```

So when we call `ngx.timer.at` Lua timer, we are adding the `ngx_http_lua_timer_handler` callback function to Nginx's red-black tree timer, which does not block Nginx.

Let's see how Apache APISIX uses `ngx.timer.at`.

### Apache APISIX timer-based watch mechanism

The Nginx framework provides a number of hooks for C module development, and OpenResty exposes some of them as Lua, as shown in the following image.

![openresty hooks](https://static.apiseven.com/202108/1631170424663-53f56c99-aefc-4546-ac0b-76a25a6f0071.png)

Apache APISIX uses only eight of these hooks (note that APISIX does not use `set_by_lua` and `rewrite_by_lua`; the rewrite phase of the plugin is actually self-defined by Apache APISIX and is not related to Nginx), including

* init_by_lua: initialization of the Master process when it starts
* init_worker_by_lua: initialization of each worker process at startup (including initialization of privileged agent processes, which are key to implementing remote RPC calls from multilingual plugins such as Java)
* ssl_certificate_by_lua: openssl provides a hook when handling the TLS handshake, which OpenResty exposes as Lua by modifying the Nginx source code
* access_by_lua: After receiving the downstream HTTP request header, it matches the routing rules such as Host domain, URI, Method, etc., and selects the Service, plugins in Upstream and upstream Server.
* balancer_by_lua: All reverse proxy modules executed in the content phase call back the `init_upstream` hook function, named `balancer_by_lua` by OpenResty, when the upstream Server is selected.
* header_filter_by_lua: hook to be executed before sending HTTP response headers downstream
* body_filter_by_lua: hook to be executed before sending the HTTP response packet body downstream
* log_by_lua: hook for logging access logs

Once we have the above knowledge ready, we can answer how Apache APISIX receives updates to etcd data.

#### How nginx.conf is generated

Each Nginx worker process starts a timer in the ``init_worker_by_lua`` phase with the ``http_init_worker`` function.

```lua
init_worker_by_lua_block {
    apisix.http_init_worker()
}
```

You may be curious to know that you don't see nginx.conf after downloading the Apache APISIX source code, where did this configuration come from?

The nginx.conf here is actually generated in real time by the Apache APISIX startup command. When you execute make run, it generates nginx.conf based on the Lua template apisix/cli/ngx_tpl.lua file. Note that the template rules here are self-implemented by OpenResty; see [lua-resty-template](https://github.com) for syntax details. /bungle/lua-resty-template). See the apisix/cli/ops.lua file for the specific code that generates nginx.conf.

```lua
local template = require("resty.template")
local ngx_tpl = require("apisix.cli.ngx_tpl")
local function init(env)
    local yaml_conf, err = file.read_yaml_conf(env.apisix_home)
    local conf_render = template.compile(ngx_tpl)
    local ngxconf = conf_render(sys_conf)

    local ok, err = util.write_file(env.apisix_home .. "/conf/nginx.conf",
                                    ngxconf)
```

Of course, Apache APISIX allows you to modify some of the data in the nginx.conf template by modifying the conf/config.yaml configuration in a way that mimics the syntax of conf/config-default.yaml. See the `read_yaml_conf` function for an example of how to do this.

```lua
function _M.read_yaml_conf(apisix_home)
    local local_conf_path = profile:yaml_path("config-default")
    local default_conf_yaml, err = util.read_file(local_conf_path)

    local_conf_path = profile:yaml_path("config")
    local user_conf_yaml, err = util.read_file(local_conf_path)
    ok, err = merge_conf(default_conf, user_conf)
end
```

As you can see, only some of the data in the ngx_tpl.lua template can be replaced by the yaml configuration, where conf/config-default.yaml is the official default configuration, and conf/config.yaml is a custom configuration overridden by the user. If you feel that replacing the template data is not enough, you can modify the ngx_tpl template directly.

#### How Apache APISIX gets etcd notifications

Apache APISIX stores the configurations to be monitored in etcd with different prefixes, which currently include the following 11 types.

* /apisix/consumers/: Apache APISIX supports the consumer abstraction upstream category
* /apisix/global_rules/: global generic rules
* /apisix/plugin_configs/: Plugin that can be reused across Router
* /apisix/plugin_metadata/: metadata of some plugins
* /apisix/plugins/: list of all Plugin plugins
* /apisix/proto/: When passing the gRPC protocol, some plugins need to convert the protocol content, this configuration stores the protobuf message definition
* /apisix/routes/: Routing information, which is the entry point for HTTP request matching, you can specify the upstream Server directly, or mount services or upstream
* /apisix/services/: you can abstract the common parts of similar router as services and mount the plugin
* /apisix/ssl/: SSL certificate public and private keys and related matching rules
* /apisix/stream_routes/: route matching rules for OSI Layer 4 gateways
* /apisix/upstreams/: abstraction of a set of upstream Server hosts

Each type of configuration here has a different processing logic, so Apache APISIX abstracts the apisix/core/config_etcd.lua file to focus on the update maintenance of each type of configuration on etcd. Each type of configuration in the `http_init_worker` function generates 1 config_etcd object.

```lua
function _M.init_worker()
    local err
    plugin_configs, err = core.config.new("/plugin_configs", {
        automatic = true,
        item_schema = core.schema.plugin_config,
        checker = plugin_checker,
    })
end
```

And in the new function of `config_etcd`, the `_automatic_fetch` timer will be registered recursively:

```lua
function _M.new(key, opts)
    ngx_timer_at(0, _automatic_fetch, obj)
end
```

The `_automatic_fetch` function iterates the `sync_data` function (wrapped under xpcall to catch exceptions).

```lua
local function _automatic_fetch(premature, self)
    local ok, err = xpcall(function()
        local ok, err = sync_data(self)
    end, debug.traceback)
    ngx_timer_at(0, _automatic_fetch, self)
end
```

The `sync_data` function will get updates through etcd's watch mechanism, which we will analyze in detail next.

So to summarize, Apache APISIX inserts `_automatic_fetch` into the timer via the `ngx.timer.at` function during the startup of each Nginx worker process. The `_automatic_fetch` function receives notifications of configuration changes in etcd through the `sync_data` function, based on a watch mechanism, so that each Nginx node and worker process will be kept up to date with the latest configuration. This design also has one obvious advantage: the configuration in etcd is written directly to the Nginx worker process, so that the new configuration can be used directly when processing requests, without having to synchronize the configuration between processes, which is easier than starting an agent process!

### HTTP/1.1 protocol for the lua-resty-etcd library

How exactly does the `sync_data` function get the configuration change messages from etcd? Let's look at the `sync_data` source code.

```lua
local etcd = require("resty.etcd")
etcd_cli, err = etcd.new(etcd_conf)

local function sync_data(self)
    local dir_res, err = waitdir(self.etcd_cli, self.key, self.prev_index + 1, self.timeout)
end

local function waitdir(etcd_cli, key, modified_index, timeout)
    local res_func, func_err, http_cli = etcd_cli:watchdir(key, opts)
    if http_cli then
        local res_cancel, err_cancel = etcd_cli:watchcancel(http_cli)
    end
end
```

The actual communication with etcd here is the [lua-resty-etcd](https://github.com/api7/lua-resty-etcd) library. It provides the watchdir function to receive notifications from etcd when it finds a change in the value of the key directory.

And what does the watchcancel function do? This is actually the result of a deficiency in the OpenResty ecosystem. etcd v3 already supports the efficient gRPC protocol (the underlying HTTP2 protocol). As you may have heard, HTTP2 not only has the ability to multiplex, but also supports direct server pushing of messages from the HTTP3 protocol against HTTP2: !

![http2_stream_frame_conn](https://static.apiseven.com/202108/1631170499370-57a7c452-e97e-4ac0-b7bf-073e13946a21.png)

However, Lua Eco does not currently support the HTTP2 protocol, so the lua-resty-etcd library actually communicates with etcd via the inefficient HTTP/1.1 protocol, and therefore receives /watch notifications via /v3/watch requests with timeouts. This phenomenon is actually caused by two things.

1. Nginx positions itself as an edge load balancer, so the upstream must be the corporate intranet, which has low latency and high bandwidth, so it does not need to support the HTTP2 protocol for the upstream protocol
The HTTP2 protocol is very complex, and there is no HTTP2 cosocket library available for production environments.

The lua-resty-etcd library using HTTP/1.1 is actually very inefficient, and if you capture packets on APISIX, you will see frequent POST messages with a URI of /v3/watch and a Base64-encoded watch directory with a body of

![APISIX communicates with etcd over HTTP1](https://static.apiseven.com/202108/1631170602368-d105d014-efe4-48c7-93b8-be5447c76a70.jpeg)

We can verify the implementation details of the `watchdir` function.

```lua
-- lib/resty/etcd/v3.lua 文件
function _M.watchdir(self, key, opts)
    return watch(self, key, attr)
end

local function watch(self, key, attr)
    callback_fun, err, http_cli = request_chunk(self, 'POST', '/watch',
                                                opts, attr.timeout or self.timeout)
    return callback_fun
end

local function request_chunk(self, method, path, opts, timeout)
    http_cli, err = utils.http.new()
    -- 发起 TCP 连接
    endpoint, err = http_request_chunk(self, http_cli)
    -- 发送 HTTP 请求
    res, err = http_cli:request({
        method  = method,
        path    = endpoint.api_prefix .. path,
        body    = body,
        query   = query,
        headers = headers,
    })
end

local function http_request_chunk(self, http_cli)
    local endpoint, err = choose_endpoint(self)
    ok, err = http_cli:connect({
        scheme = endpoint.scheme,
        host = endpoint.host,
        port = endpoint.port,
        ssl_verify = self.ssl_verify,
        ssl_cert_path = self.ssl_cert_path,
        ssl_key_path = self.ssl_key_path,
    })

    return endpoint, err
end
```

As you can see, Apache APISIX makes sure that each worker process contains the latest configuration by **repeatedly requesting etcd through the `ngx.timer.at` and lua-resty-etcd libraries in each worker process.**

## APISIX configuration and plugin remote changes

Next, let's look at how to remotely modify the configuration in etcd.

We can of course modify the contents of the corresponding key in etcd directly through the gRPC interface, and then make the Nginx cluster automatically update its configuration based on the watch mechanism described above. However, this is risky because the configuration request is not verified, and the configuration data does not match the Nginx cluster.

### Modifying configuration via Nginx's /apisix/admin/ interface

Apache APISIX provides a mechanism to access any one Nginx node, verify the request with Lua code in its worker process, and then write it to etcd through the /v3/dv/put interface. Let's take a look at how Apache APISIX does this.

First, the nginx.conf generated by make run automatically listens on port 9080 (as modified by the apisix.node_listen configuration in config.yaml), and when ``apisix.enable_admin`` is set to true, nginx.conf will generate the following configuration.

```yaml
server {
    listen 9080 default_server reuseport;

    location/apisix/admin {
        content_by_lua_block {
            apisix.http_admin()
        }
    }
}

```

Thus, the /apisix/admin requests received by Nginx will be processed by the `http_admin` function.

```lua
-- /apisix/init.lua file
function _M.http_admin()
    local ok = router:dispatch(get_var("uri"), {method = get_method()})
end
```

See the [GitHub](https://github.com/apache/apisix/blob/release/2.8/docs/zh/latest/admin-api.md) documentation for APIs that the admin interface can handle, where when the method method differs from the URI, the dispatch performs different handler functions based on the following.

```lua
-- /apisix/admin/init.lua file
local uri_route = {
    {
        paths = [[/apisix/admin/*]],
        methods = { "GET", "PUT", "POST", "DELETE", "PATCH"},
        handler = run,
    },
    {
        paths = [[/apisix/admin/stream_routes/*]],
        methods = {"GET", "PUT", "POST", "DELETE", "PATCH"}, { paths = [[/apisix/admin/stream_routes/*]], { methods = {"GET", "PUT", "POST", "DELETE", "PATCH"},
        handler = run_stream,
    },
    {
        paths = [[/apisix/admin/plugins/list]],
        methods = {"GET"},
        handler = get_plugins_list,
    },
    {
        paths = reload_event,
        methods = {"PUT"},
        handler = post_reload_plugins,
    },
}
```

For example, when creating 1 Upstream via /apisix/admin/upstreams/1 and the PUT method.

```shell
curl "http://127.0.0.1:9080/apisix/admin/upstreams/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d '
> {
>   "type": "roundrobin",
>   "nodes": {
>     "httpbin.org:80": 1
>   }
> }
{"action":"set","node":{"key":"\/apisix\/upstreams\/1","value":{"hash_on":"vars","nodes":{"httpbin.org:80":1},"create_time":1627982128,"update_time":1627982128,"scheme":"http","type":"roundrobin","pass_host":"pass","id":"1"}}}'
```

You will see the following log in error.log (to see this line, you must set the nginx_config.error_log_level in config.yaml to INFO)

```yaml
2021/08/03 17:15:28 [info] 16437#16437: *23572 [lua] init.lua:130: handler(): uri: ["","apisix","admin","upstreams","1"], client: 127.0.0.1, server: _, request: "PUT /apisix/admin/upstreams/1 HTTP/1.1", host: "127.0.0.1:9080"
```

This line is actually printed by the `run` function in /apisix/admin/init.lua, which is executed based on the uri_route dictionary above. Let's look at the contents of the run function.

```lua
-- /apisix/admin/init.lua文件
local function run()
    local uri_segs = core.utils.split_uri(ngx.var.uri)
    core.log.info("uri: ", core.json.delay_encode(uri_segs))

    local seg_res, seg_id = uri_segs[4], uri_segs[5]
    local seg_sub_path = core.table.concat(uri_segs, "/", 6)

    local resource = resources[seg_res]
    local code, data = resource[method](seg_id, req_body, seg_sub_path,
                                        uri_args)
end
```

这里 `resource[method]` 函数又被做了 1 次抽象，它是由 resources 字典决定的：

```lua
-- /apisix/admin/init.lua文件
local resources = {
    routes          = require("apisix.admin.routes"),
    services        = require("apisix.admin.services"),
    upstreams       = require("apisix.admin.upstreams"),
    consumers       = require("apisix.admin.consumers"),
    schema          = require("apisix.admin.schema"),
    ssl             = require("apisix.admin.ssl"),
    plugins         = require("apisix.admin.plugins"),
    proto           = require("apisix.admin.proto"),
    global_rules    = require("apisix.admin.global_rules"),
    stream_routes   = require("apisix.admin.stream_routes"),
    plugin_metadata = require("apisix.admin.plugin_metadata"),
    plugin_configs  = require("apisix.admin.plugin_config"),
}
```

Therefore, the above curl request will be processed by the `put` function in the /apisix/admin/upstreams.lua file, see the implementation of the `put` function as follows:

```lua
-- /apisix/admin/upstreams.lua file
function _M.put(id, conf)
    -- check the legitimacy of the requested data
    local id, err = check_conf(id, conf, true)
    local key = "/upstreams/" .. id
    core.log.info("key: ", key)
    -- Generate configuration data in etcd
    local ok, err = utils.inject_conf_with_prev_conf("upstream", key, conf)
    -- write to etcd
    local res, err = core.etcd.set(key, conf)
end

-- /apisix/core/etcd.lua
local function set(key, value, ttl)
    local res, err = etcd_cli:set(prefix ... key, value, {prev_kv = true, lease = data.body.ID})
end
```

The new configuration is eventually written to etcd. As you can see, Nginx verifies the data before writing it to etcd, so that other worker processes and Nginx nodes will receive the correct configuration through the watch mechanism. You can verify this process with the logs in error.log.

```yaml
2021/08/03 17:15:28 [info] 16437#16437: *23572 [lua] upstreams.lua:72: key: /upstreams/1, client: 127.0.0.1, server: _, request: "PUT /apisix/admin/upstreams/1 HTTP/1.1", host: "127.0.0.1:9080"
```

### Why the new configuration works without reload

Let's look at how the Nginx worker process takes effect immediately after the admin request is executed.

The open source version of Nginx matches requests based on three different containers.

1. The `server_name` configuration in the static hash table is matched to the requested `Host` domain name
2. Next, the location in the static Trie prefix tree is configured to match the requested URI

    ![Matching process for location prefix tree 2](https://static.apiseven.com/202108/1631170657240-31bb3ff3-ee3b-4831-99ff-77cab1d6e298.png)

3. In both of these processes, if there are regular expressions, they are matched in order based on the order of the arrays (the order they appear in nginx.conf).

Although these procedures are very efficient, they are written to die in the find_config phase and in the Nginx HTTP framework, and changes must be made after nginx -s reload to take effect. For this reason, Apache APISIX has abandoned this process altogether.

As you can see in nginx.conf, requests to any domain name, URI, or domain name will match the `http_access_phase` lua function.

```lua
server {
    server_name _;
    location / {
        access_by_lua_block {
            apisix.http_access_phase()
        }
        proxy_pass      $upstream_scheme://apisix_backend$upstream_uri;
    }
}
```

The `http_access_phase` function will match Method, domain and URI based on a base prefix tree implemented in C (only wildcards are supported, no regular expressions), the library is [lua-resty-radixtree](https://github.com/api7/lua -resty-radixtree). Whenever the routing rules change, the Lua code rebuilds this base tree: the

```lua
function _M.match(api_ctx)
    if not cached_version or cached_version ~= user_routes.conf_version then
        uri_router = base_router.create_radixtree_uri_router(user_routes.values,
                                                             uri_routes, false)
        cached_version = user_routes.conf_version
    end
end
```

The rules for Plugin enablement, parameter and order adjustment are similar.

Finally, Script is mutually exclusive with Plugin. In fact, Lua JIT's just-in-time compilation provides another killer feature, loadstring, which converts strings to Lua code. So, after storing Lua code in etcd and setting it to Script, you can pass it to Nginx to process requests.

## Summary

Nginx cluster management must rely on a centralized configuration component, and etcd, which is highly reliable and has a watch push mechanism, is the perfect choice! Although the Resty ecosystem does not have a gRPC client, it is still a good idea for each worker process to synchronize etcd configuration directly via the HTTP/1.1 protocol.

The key to dynamically modifying the Nginx configuration is 2 things: the Lua language is much more flexible than the nginx.conf syntax, and Lua code can be imported from external data via loadstring. Of course, to ensure efficient execution of route matching, Apache APISIX implements a prefix base tree in C to match requests based on Host, Method, and URI, improving performance while maintaining dynamism.

Apache APISIX has many good designs, and this article only discusses the dynamic management of Nginx clusters.

[click here for the link to the original article](https://www.taohui.tech/2021/08/10/%E5%BC%80%E6%BA%90%E7%BD%91%E5%85%B3APISIX%E6%9E%B6%E6%9E%84%E5%88%86%E6%9E%90/#more)
