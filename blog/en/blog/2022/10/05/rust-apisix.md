---
title: "Rewriting the Apache APISIX response-rewrite plugin in Rust"
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords: 
- API gateway
- Apache APISIX
- Rust
- WebAssembly
description: This article describes how to redevelop the response-rewrite plugin using Rust and WebAssembly.
tags: [Case Studies]
image: https://static.apiseven.com/2022/10/28/635b5378cdd1f.png
---

> This article describes how to redevelop the response-rewrite plugin using Rust and WebAssembly.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/rust-apisix/2/" />
</head>

Last week, I described the basics on [how to develop and deploy a Rust plugin for Apache APISIX](https://blog.frankel.ch/rust-apisix/1/). The plugin just logged a message when it received the request. Today, I want to leverage what we learned to create something more valuable: write part of the [response-rewrite](https://apisix.apache.org/docs/apisix/plugins/response-rewrite/) plugin with Rust.

## Adding a hard-coded header

Let's start small and add a hard-coded response header. Last week, we used the `on_http_request_headers()` function. The `proxy_wasm` specification defines several function hooks for each step in a request-response lifecycle:

* `fn on_http_request_headers()`
* `fn on_http_request_body()`
* `fn on_http_request_trailers()`
* `fn on_http_response_headers()`
* `fn on_http_response_body()`
* `fn on_http_response_trailers()`

It looks like we need to implement `on_http_response_headers()`:

```rust
impl Context for HttpCall {}

impl HttpContext for HttpCall {
    fn on_http_response_headers(&mut self, _num_headers: usize, end_of_stream: bool) -> Action {
        warn!("on_http_response_headers");
        if end_of_stream {                                      // 1
            self.add_http_response_header("Hello", "World");    // 2
        }
        Action::Continue                                        // 3
    }
}
```

1. If we reached the end of the stream...
2. ...add the header
3. Continue the rest of the lifecycle

## Making the plugin configurable

Adding hard-coded headers is fun but not helpful. The `response-rewrite` plugin allows configuring the headers to add and their value.

Imagine that we want to add the following headers in the configuration:

```yaml
routes:
  - uri: /*
    upstream:
      type: roundrobin
      nodes:
        "httpbin.org:80": 1
    plugins:
      sample:
       conf: |                       # 1
         {
           "headers": {
             "add": {                # 2
               "Hello": "World",
               "Foo": "Bar"
             }
           }
         }
#END
```

1. Plugin configuration
2. Headers to add. The Lua plugin also allows setting headers. In the following, we'll focus on add, while the GitHub repo shows both add and set.

The configuration is in JSON format, so we need additional dependencies:

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_derive = { version = "1.0", default-features = false }
serde_json = { version = "1.0", default-features = false, features = ["alloc"] }
```

The idea is to:

* Read the configuration when APISIX creates the root context
* Pass it along each time APISIX creates the HTTP context

The `Config` object is pretty straightforward:

```rust
use serde_json::{Map, Value};
use serde::Deserialize;

#[derive(Deserialize, Clone)]        // 1-2
struct Config {
    headers: Headers,                // 3
}

#[derive(Deserialize, Clone)]        // 1-2
struct Headers {
    add: Option<Map<String, Value>>, // 4
    set: Option<Map<String, Value>>, // 4
}

struct HttpCall {
    config: Config,
}
```

1. `Deserialize` allows reading the string into a JSON structure
2. `Clone` allows passing the structure from the root context to the HTTP context
3. Standard JSON structure
4. `Option` manages the case when the user didn't use the attribute

We need to read the configuration when APISIX creates the root context - it happens once. For this, we need to use the `RootContext` trait and create a structure that implements it:

```rust
struct HttpCallRoot {
    config: Config,                                                                   // 1
}

impl Context for HttpCallRoot {}                                                      // 2

impl RootContext for HttpCallRoot {
    fn on_configure(&mut self, _: usize) -> bool {
        if let Some(config_bytes) = self.get_plugin_configuration() {                 // 3
            let result = String::from_utf8(config_bytes)                              // 4
                .map_err(|e| e.utf8_error().to_string())                              // 5
                .and_then(|s| serde_json::from_str(&s).map_err(|e| e.to_string()));   // 6
            return match result {
                Ok(config) => {
                    self.config = config;                                             // 7
                    true
                }
                Err(message) => {
                    error!("An error occurred while reading the configuration file: {}", message);
                    false
                }
            };
        }
        true
    }

    fn create_http_context(&self, _context_id: u32) -> Option<Box<dyn HttpContext>> {
        Some(Box::new(HttpCall {
            config: self.config.clone(),                                              // 8
        }))
    }

    fn get_type(&self) -> Option<ContextType> {
        Some(ContextType::HttpContext)                                                // 9
    }
}
```

1. Create a structure to store the configuration
2. Mandatory
3. Read the plugin configuration in a byte array
4. Stringify the byte array
5. Map the error to satisfy the compiler
6. JSONify the string
7. If everything has worked out, store the `config` `struct` in the root context
8. See below
9. Two types are available, `HttpContext` and `StreamContext`. We implemented the former.

We need to make the WASM proxy aware of the root context. Previously, we configured the creation of an HTTP context. We need to replace it with the creation of a root context.

```rust
fn new_root() -> HttpCallRoot {
    HttpCallRoot { config: Config { headers: Headers { add: None, set: None } } }       // 1
}

proxy_wasm::main! {{
    proxy_wasm::set_log_level(LogLevel::Trace);
    proxy_wasm::set_root_context(|_| -> Box<dyn RootContext> { Box::new(new_root()) }); // 2
}}
```

1. Utility function
2. Create the root context instead of the HTTP one. The former knows how to create the latter via the `create_http_context` implementation.

The easiest part is to read the configuration from the HTTP context and write the headers:

```rust
impl HttpContext for HttpCall {
    fn on_http_response_headers(&mut self, _num_headers: usize, end_of_stream: bool) -> Action {
        warn!("on_http_response_headers");
        if end_of_stream {
            if self.config.headers.add.is_some() {                               // 1
                let add_headers = self.config.headers.add.as_ref().unwrap();     // 2
                for (key, value) in add_headers.into_iter() {                    // 3
                    self.add_http_response_header(key, value.as_str().unwrap()); // 4
                }
            }
            if self.config.headers.set.is_some() {
                // Same as above for setting
            }
        }
        Action::Continue
    }
}
```

1. If the user configured added headers...
2. ... get them
3. Loop over the key-value pairs
4. Write them as response headers

## Hooking into Nginx variables

The `response-rewrite` plugin knows how to make use of Nginx variables. Let's implement this feature.

The idea is to check whether a value starting with `$` is an Nginx variable: if it exists, return its value; otherwise, return the variable name as if it was a standard configuration value.

Note that it's a simplification; one can also wrap an Nginx variable in curly braces. But it's good enough for this blog post.

```rust
fn get_nginx_variable_if_possible(ctx: &HttpCall, value: &Value) -> String {
    let value = value.as_str().unwrap();
    if value.starts_with('$') {                                        // 1
        let option = ctx.get_property(vec![&value[1..value.len()]])    // 2
            .and_then(|bytes| String::from_utf8(bytes).ok());
        return if let Some(nginx_value) = option {
            nginx_value                                                // 3
        } else {
            value.to_string()                                          // 4
        }
    }
    value.to_string()                                                  // 5
}
```

1. If the value is potentially an Nginx variable
2. Try to get the property value (without the trailing `$`)
3. Found the value, return it
4. Didn't find the value, return the variable
5. It was not a property, to begin with; return the variable

We can then try to get the variable before writing the header:

```rust
for (key, value) in add_headers.into_iter() {
    let value = get_nginx_variable_if_possible(self, value);
    self.add_http_response_header(key, &value);
}
```

## Rewriting the body

Another feature of the original `response-rewrite` plugin is to change the body. To be clear, it doesn't work at the moment. If you're interested, what's the reason, please read further.

Let's update the `Config` object to add a body section:

```rust
#[derive(Deserialize, Clone)]
struct Config {
    headers: Headers,
    body: String,
}
```

The documentation states that to rewrite the body, we need to let Nginx know during the headers phase:

```rust
impl HttpContext for HttpCall {
    fn on_http_response_headers(&mut self, _num_headers: usize, end_of_stream: bool) -> Action {
        warn!("on_http_response_headers");
            // Add headers as above
            let body = &self.config.body;
            if !body.is_empty() {
                warn!("Rewrite body is configured, letting Nginx know about it");
                self.set_property(vec!["wasm_process_resp_body"], Some("true".as_bytes()));   // 1
                warn!("Rewrite body is configured, resetting Content-Length");
                self.set_http_response_header("Content-Length", None)                         // 2
            }
        }
        Action::Continue
    }
}
```

1. Ping Nginx, we will rewrite the body
2. Reset the `Content-Length` as it won't be possible later on

Now, we can rewrite it:

```rust
impl HttpContext for HttpCall {
    fn on_http_response_body(&mut self, _body_size: usize, end_of_stream: bool) -> Action {
        warn!("on_http_response_body");
        let body = &self.config.body;
        if !body.is_empty() {
            if end_of_stream {
                warn!("Rewrite body is configured, rewriting {}", body);
                let body = self.config.body.as_bytes();
                self.set_http_response_body(0, body.len(),body);
            } else {
                return Action::Pause;
            }
        }
        Action::Continue
    }
}
```

If we try to curl `localhost:9080`, Apache APISIX's log shows the following:

```
rust-wasm-plugin-apisix-1  | 2022/09/29 08:29:50 [emerg] 44#44: *57096 panicked at 'unexpected status: 12', /usr/local/cargo/registry/src/github.com-1ecc6299db9ec823/proxy-wasm-0.2.0/src/hostcalls.rs:135:23 while sending to client, client: 172.25.0.1, server: _, request: "GET / HTTP/1.1", upstream: "http://44.207.168.240:80/", host: "localhost:9080"
```

The reason is that the WASM Nginx module doesn't implement the `proxy-wasm` feature to rewrite the body at the moment.

Status 12 comes from the [proxy_wasm_types.h](https://github.com/api7/wasm-nginx-module/blob/main/src/proxy_wasm/proxy_wasm_types.h):

```c
typedef enum {
    PROXY_RESULT_UNIMPLEMENTED = 12,
} proxy_result_t;
```

## Conclusion

In this post, we went beyond a dummy plugin to duplicate some of the features of the `response-rewrite` plugin. By writing the plugin in Rust, we can leverage its compile-time security to avoid most errors at runtime. Note that some of the `proxy-wasm` features are not implemented at the moment: be careful before diving head first.

The source code is available on [GitHub](https://github.com/ajavageek/apisix-rust-plugin).

**To go further:**

* [proxy-wasm spec](https://github.com/proxy-wasm/spec)
* [WASM Nginx module](https://github.com/api7/wasm-nginx-module)
* [WebAssembly for Proxies (Rust SDK)](https://github.com/proxy-wasm/proxy-wasm-rust-sdk)
* [Apache APISIX WASM](https://apisix.apache.org/docs/apisix/wasm/)
