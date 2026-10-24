# 自定义 Nginx 配置

Source: https://apisix.apache.org/zh/docs/apisix/customize-nginx-configuration/

APISIX 使用的 Nginx 配置是通过模板文件 `apisix/cli/ngx_tpl.lua` 以及 `apisix/cli/config.lua` 和`conf/config.yaml` 中的参数生成的。

在执行完 `./bin/apisix start`，你可以在 `conf/nginx.conf` 看到生成的 Nginx 配置文件。

如果你需要自定义 Nginx 配置，请阅读 `conf/config.default.example` 中的 `nginx_config`。你可以在 `conf/config.yaml` 中覆盖默认值。例如，你可以在 `conf/nginx.conf` 中通过配置 `xxx_snippet` 条目注入一些代码片段：

```yaml
...
# config.yaml 里面的内容
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

注意`nginx_config`及其子项的格式缩进，在执行`./bin/apisix start`时，错误的缩进将导致更新`conf/nginx.conf`文件失败。
