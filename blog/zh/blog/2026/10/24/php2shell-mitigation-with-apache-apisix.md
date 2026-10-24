---
title: "PHP2Shell 应急防护：用 Apache APISIX 在入口提前拦截风险请求"
keywords:
  - APISIX
  - Apache APISIX
  - API Gateway
  - PHP2Shell
  - Coraza WAF
description: 用 Apache APISIX 拒绝不需要的 multipart 请求，或集成 Coraza WAF 检查上传，在入口提前拦截命中规则的请求，为 PHP 修复争取时间。
tags: [Vulnerabilities]
---

PHP2Shell 修复需要安排升级，但入口防护可以先部署。**让请求先经过 Apache APISIX：不需要上传的接口拒绝 multipart 请求；需要上传的接口由 Coraza WAF 检查请求体。命中拒绝规则的请求在网关被拦下，不再转发给 PHP。** 这些策略可以集中应用到全局、一组 API 或单个 API，为后端修复争取时间。

<!--truncate-->

![Apache APISIX 入口防护架构](https://static.api7.ai/uploads/2026/10/24/wEqrzMGm_architecture-diagram-cn.webp)

如图所示，APISIX 把检查放在 PHP 服务之前。要让这层防护有效，**源站应只接受可信网关入口的流量**，避免请求绕过检查。网关规则用于应急缓解，不能修复 PHP 内部缺陷，补丁升级应同步推进。

资料更新至 2026-10-24。

## 1. PHP2Shell：需要尽快处理的 PHP 安全风险

2026 年 10 月 21 日，PHP 发布安全更新，修复 `CVE-2026-109618` 和 `CVE-2026-109619`，两者均可能导致未授权远程代码执行，CVSS v4.0 评分均为 9.2。mod_php、PHP-FPM 等 Web 运行方式都在影响范围内。[PHP 官方公告](https://php.net/archive/2026.php#2026-10-21-5)列出了以下修复版本；发行版用户还应核对厂商的补丁记录。

两个漏洞涉及 PHP 请求处理中的内存和状态管理。multipart 解析、上传进度跟踪等是已知相关入口，因此应急策略可以先从限制这些输入入手。

| PHP 分支 | 这两个 CVE 的修复版本 |
| --- | --- |
| 8.2 | 8.2.35 |
| 8.3 | 8.3.36 |
| 8.4 | 8.4.27 |
| 8.5 | 8.5.12 |

PHP 在 10 月 23 日另发布了 [upload progress 补充公告](https://php.net/archive/2026.php#2026-10-23-1)。安全团队还应按公告评估关闭该功能及其他 PHP 侧措施，并确认运行中的 PHP 实例完成更新。

## 2. 按业务选择两套应急方案

先确认接口是否需要 **multipart**（常用于文件上传和表单提交）：无需此类请求时选择方案 A，需要保留时选择方案 B。**以下示例展示典型检查与配置方式，不是覆盖所有漏洞利用方式的完整防护。** 安全人员应结合实际业务补充和验证，也可以按需要增强或简化。

### 2.1 方案 A：用 Serverless 关闭不需要的 multipart 入口

对于纯 JSON API，或确认不使用 multipart 表单的服务，可以用 `serverless-pre-function` 在转发前拒绝 multipart，并限制请求体大小。以下示例还处理关键请求头的歧义和压缩请求体。合法的 multipart 表单也会被拒绝；确实需要这类请求的接口应使用方案 B。

Serverless 函数示例：检查请求头、拒绝不需要的编码方式，再关闭 multipart 入口。注释说明各项检查的作用。

```lua
return function (conf, ctx)
    -- 读取原始请求头；读取不完整时拒绝，避免漏掉需要检查的字段。
    local headers, err = ngx.req.get_headers(100, true)
    if err then return 400 end

    -- 拒绝关键头的重复值和下划线别名，减少网关与后端的解释歧义。
    local checked = {}
    for name, value in pairs(headers) do
        local lower = name:lower()
        local normalized = lower:gsub("_", "-")
        if normalized == "content-type" or normalized == "content-encoding" then
            if lower ~= normalized or type(value) ~= "string"
               or checked[normalized] then
                return 400
            end
            checked[normalized] = value
        end
    end

    -- 本例不接受压缩请求体；业务需要时，应另行设计解码与检查策略。
    local encoding = checked["content-encoding"]
    if encoding and encoding:lower():match("^%s*(.-)%s*$") ~= "identity" then
        return 415
    end

    -- 无需上传的接口直接拒绝 multipart；不受该规则限制的请求继续处理。
    local content_type = checked["content-type"]
    if content_type then
        local media_type = content_type:lower():match("^%s*([^;%s]+)")
        if not media_type then return 400 end
        if media_type:sub(1, 10) == "multipart/" then return 403 end
    end

    -- 可按需添加更多安全规则 ...
end
```

将适配后的上方函数放入 `functions`，再配置请求体大小限制。以下 YAML 展示需要绑定的插件配置：

```yaml
# 配置结构示意；functions 占位内容需替换后才能使用。
plugins:
  serverless-pre-function:
    phase: rewrite # 在请求转发给上游之前执行检查。
    functions:
      - "<引用上方经业务适配后的 Serverless 函数>"
  client-control:
    # 整个请求体的大小上限，单位为字节；64 KiB 仅作示意。
    # 按正常请求规模调整，不应把该数值当作 PHP 的安全边界。
    max_body_size: 65536
```

使用 `client-control` 前，需确认部署环境支持该插件（依赖 APISIX-Runtime）；否则由运维团队在入口层设置等效的请求体大小限制。

### 2.2 方案 B：保留上传，集成 Coraza 检查请求体

必须保留上传时，在 APISIX 中集成 Coraza WAF，对请求体进行解析和检查。下面给出几类规则：拒绝压缩请求体、限制上传进度字段、限制过深嵌套和过多文件部件。匹配拒绝规则的请求不再转发，其他请求继续按原有策略处理。

先按 [APISIX 集成 Coraza 指南](https://docs.api7.ai/apisix/how-to-guide/security/waf/integrate-with-coraza)启用 WAF，再将下面的插件配置绑定到需要保护的范围。示例以 APISIX 3.19.0 与 coraza-proxy-wasm 0.6.0 为参照；实际版本兼容性由部署团队确认。

规则与注释放在一起，便于看清“检查什么、命中后如何处理”。其中 `64 KiB`、`12 层`和 `50 个文件部件`仅作示意，需要按业务调整。

```yaml
# 示例规则集：展示典型拦截点，不是完整虚拟补丁。
plugins:
  serverless-pre-function:
    phase: access
    functions:
      - |
        return function(conf, ctx)
            -- 在 Coraza 执行前启用请求体处理。
            ngx.var.wasm_process_req_body = "1"
        end
  client-control:
    max_body_size: 65536 # 整个请求体的示意上限，按正常业务规模调整。
  coraza-filter:
    conf:
      directives_map:
        default:
          # 保留推荐配置中的解析失败、畸形 multipart 拒绝规则。
          - Include @recommended-conf
          # 启用阻断模式；仅记录命中不能阻止请求到达 PHP。
          - SecRuleEngine On
          # 允许 WAF 检查请求体。
          - SecRequestBodyAccess On
          # 整个请求体上限；与入口限制协调，上传业务需重新评估。
          - SecRequestBodyLimit 65536
          # 请求体缓冲示意值，按部署环境调整。
          - SecRequestBodyInMemoryLimit 65536
          # 超限直接拒绝，避免只检查部分内容后放行。
          - SecRequestBodyLimitAction Reject
          # 本例聚焦请求入口，不检查响应体。
          - SecResponseBodyAccess Off
          # 拒绝非 identity 编码；需要压缩上传时，由安全人员适配。
          - >-
            SecRule REQUEST_HEADERS:Content-Encoding "!@rx (?i)^identity$"
            "id:110000,phase:1,t:none,deny,status:415,log,msg:'Encoded request rejected'"
          # 限制默认的上传进度字段（含同名文件字段）；自定义字段名需同步修改。
          - >-
            SecRule ARGS_NAMES|FILES_NAMES "@rx ^PHP_SESSION_UPLOAD_PROGRESS(?:\[|$)"
            "id:110010,phase:2,t:none,deny,status:403,log,msg:'Upload progress field rejected'"
          # 示意：拒绝字段名中出现连续 12 层嵌套；不是 PHP 的安全边界。
          - >-
            SecRule ARGS_NAMES|FILES_NAMES "@rx (?:\[[^\]]*\]){12}"
            "id:110011,phase:2,t:none,deny,status:403,log,msg:'Deep field name rejected'"
          # 统计带 filename 参数的文件部件，包含空文件名。
          - >-
            SecRule MULTIPART_PART_HEADERS "@rx (?i)^content-disposition:.*;\s*filename\*?\s*="
            "id:110012,phase:2,t:none,pass,nolog,setvar:tx.php_file_parts=+1"
          # 示意：文件部件超过 50 个时拒绝；批量上传需调整。
          - >-
            SecRule TX:php_file_parts "@gt 50"
            "id:110013,phase:2,t:none,deny,status:403,log,msg:'Too many file parts'"
      default_directives: default
```

字段名和阈值应与业务匹配：64 KiB 通常不适合直接用于文件上传；嵌套和文件数量的示例参考了 [CrowdSec 临时规则](https://github.com/crowdsecurity/hub/blob/master/appsec-rules/crowdsecurity/vpatch-CVE-2026-109618.yaml)，不能据此证明 PHP 不会发生内存耗尽。安全人员还应评估 WAF 与 PHP 的解析差异，并确保后端收到的是同一份受检输入。

## 3. 如何启用：选择全局、一组 API 或单个 API

**先准备检查能力，再选择生效范围并发布配置。** 方案 A 将适配后的 Lua 函数放入 Serverless 插件；方案 B 完成 Coraza 集成并加载适配后的规则。随后，将对应的 `plugins` 配置添加到全局规则、Service 或 Route。下图展示三种绑定范围：

![APISIX 策略绑定范围：Global Rule、Service 与 Route](https://static.api7.ai/uploads/2026/10/24/klNpaah8_policy-scope-diagram-cn.webp)

上传需求不一致时，优先按 Service 或 Route 分别设置。Route 的同名插件配置会优先于 Service 配置；全局禁止 multipart 后，上传接口仍会被该规则拦截。新增防护时，应保留并核对已有鉴权、限流等插件。

配置生效后，所选范围内的请求先执行检查：**匹配拒绝规则时，由 APISIX 返回错误，不再转发给 PHP**；其余请求按原有路由和策略继续处理。后续可在网关集中调整规则，逐步扩大适用范围。

## 4. 上线前确认三件事

- **正常业务能通过：** 用真实业务的请求类型、表单和上传大小检查兼容性，避免把必要功能一并关闭。
- **目标请求在网关被拦截：** 在隔离环境验证规则命中，并结合网关与上游日志确认被拒绝的请求没有到达 PHP。
- **防护范围符合预期：** 确认目标接口都应用了策略，且源站无法被直接访问。上线后关注误拦与业务成功率；PHP 完成补丁升级后，再评估保留或撤销哪些临时限制。

## 5. 参考资料

- [PHP 官方安全公告（2026-10-21）](https://php.net/archive/2026.php#2026-10-21-5)：影响范围、修复版本与源站缓解措施。
- [PHP upload progress 补充公告（2026-10-23）](https://php.net/archive/2026.php#2026-10-23-1)：后续 CVE-2026-115560 风险提示。
- [CVE-2026-109618 官方技术公告](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)：OOM 生命周期缺陷与边界。
- [CVE-2026-109619 官方技术公告](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)：跨请求状态、生产者与消费者路径。
- [APISIX 集成 Coraza 指南](https://docs.api7.ai/apisix/how-to-guide/security/waf/integrate-with-coraza)：Wasm 模块配置与集成方式。
