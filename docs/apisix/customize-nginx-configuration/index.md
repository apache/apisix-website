# Customize Nginx configuration

Source: https://apisix.apache.org/docs/apisix/customize-nginx-configuration/

The Nginx configuration used by APISIX is generated via the template file `apisix/cli/ngx_tpl.lua` and the parameters in `apisix/cli/config.lua` and `conf/config.yaml`.

You can take a look at the generated Nginx configuration in `conf/nginx.conf` after running `./bin/apisix start`.

If you want to customize the Nginx configuration, please read through the `nginx_config` in `conf/config.default.example`. You can override the default value in the `conf/config.yaml`. For instance, you can inject some snippets in the `conf/nginx.conf` via configuring the `xxx_snippet` entries:

```yaml
...
# put this in config.yaml:
nginx_config:
    main_configuration_snippet: |
        daemon on;
    http_configuration_snippet: |
        server
        {
            listen 45651;
            server_name _;
            access_log off;

            location /ysec_status {
                req_status_show;
                allow 127.0.0.1;
                deny all;
            }
        }

        chunked_transfer_encoding on;

    http_server_configuration_snippet: |
        set $my "var";
    http_admin_configuration_snippet: |
        log_format admin "$request_time $pipe";
    http_end_configuration_snippet: |
        server_names_hash_bucket_size 128;
    stream_configuration_snippet: |
        tcp_nodelay off;
...
```

Pay attention to the indent of `nginx_config` and sub indent of the sub entries, the incorrect indent may cause `./bin/apisix start` to fail to generate Nginx configuration in `conf/nginx.conf`.
