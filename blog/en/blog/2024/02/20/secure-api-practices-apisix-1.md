---
title: Secure your API with these 16 Practices with Apache APISIX - part 1
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - Security
  - Good practices
description: >
  A couple of months ago, I stumbled upon this list of  Secure your API with these 16 practices to secure your API.
  Authentication. Authorization. Data Redaction. Encryption. Error Handling. Input Validation & Data Sanitization.
  Intrusion Detection Systems. IP Whitelisting. Logging and Monitoring.
  Rate Limiting. Secure Dependencies. Security Headers. Token Expiry. Use of Security Standards and Frameworks.
  Web Application Firewall. API Versioning
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/02/15/kgIjhRXf_img-BuLDzx81CexYQAzkaF36h_large.webp
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/secure-api-practices-apisix/1/" />
</head>

>A couple of months ago, I stumbled upon this list of  Secure your API with these [16 practices to secure your API](https://www.linkedin.com/posts/brijpandeyji_secure-your-api-with-these-16-practices-activity-7094020647529369601-5kzQ/):
>
> 1. Authentication 🕵️️ - Verifies the identity of users accessing APIs.
> 2. Authorization 🚦 - Determines permissions of authenticated users.
> 3. Data Redaction 🖍️ - Obscures sensitive data for protection.
> 4. Encryption 🔒 - Encodes data so only authorized parties can decode it.
> 5. Error Handling ❌ - Manages responses when things go wrong, avoiding revealing sensitive info.
> 6. Input Validation & Data Sanitization 🧹 - Checks input data and removes harmful parts.
> 7. Intrusion Detection Systems 👀 - Monitor networks for suspicious activities.
> 8. IP Whitelisting 📝 - Permits API access only from trusted IP addresses.
> 9. Logging and Monitoring 🖥️ - Keeps detailed logs and regularly monitors APIs.
>10. Rate Limiting ⏱️ - Limits user requests to prevent overload.
>11. Secure Dependencies 📦 - Ensures third-party code is free from vulnerabilities.
>12. Security Headers 📋 - Enhances site security against types of attacks like XSS.
>13. Token Expiry ⏳ - Regularly expiring and renewing tokens prevents unauthorized access.
>14. Use of Security Standards and Frameworks 📘 - Guides your API security strategy.
>15. Web Application Firewall 🔥 - Protects your site from HTTP-specific attacks.
>16. API Versioning 🔄 - Maintains different versions of your API for seamless updates.
>
>While it's debatable whether some points relate to security, _e.g.,_, versioning, the list is a good starting point anyway. In this two-post series, I'd like to describe how we can implement each point with Apache APISXI (or not).

<!--truncate-->

## Authentication

Authentication is about identifying yourself with a system. It requires a proof.

Apache APISIX provides two kinds of authentications: internal, with APISIX checking credentials, and external, when delegated to a third party. All authentication mechanisms work via plugins. Here's the current list of available authentication plugins.

<table>
<thead>
<tr>
  <th>Type</th>
  <th>Name</th>
  <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td rowspan="3">Internal</td>
  <td><code>key-auth</code></td>
  <td>Authenticate via an HTTP Header</td>
</tr>
<tr>
  <td><code>basic-auth</code></td>
  <td>Relies on a browser callback</td>
</tr>
<tr>
  <td><code>jwt-auth</code></td>
  <td>Uses a JWT token to authenticate</td>
</tr>
<tr>
  <td rowspan="10">External</td>
  <td><code>authz-keycloak</code></td>
  <td>Delegates to <a href="https://www.keycloak.org/">Keycloak</a></td>
</tr>
<tr>
  <td><code>authz-casdoor</code></td>
  <td>Delegates to <a href="https://casdoor.org/">Casdoor</a></td>
</tr>
<tr>
  <td><code>wolf-rbac</code></td>
  <td>Delegates to <a href="https://github.com/iGeeky/wolf">wolf</a></td>
</tr>
<tr>
  <td><code>openid-connect</code></td>
  <td>Delegates to an <a href="https://openid.net/connect/">OpenID Connect</a>-compliant third-party</td>
</tr>
<tr>
  <td><code>cas-auth</code></td>
  <td>Delegates to a <a href="https://en.wikipedia.org/wiki/Central_Authentication_Service">CAS</a>-compliant third-party</td>
</tr>
<tr>
  <td><code>hmac-auth</code></td>
  <td>Delegates to an <a href="https://en.wikipedia.org/wiki/HMAC">HMAC</a>-compliant third-party</td>
</tr>
<tr>
  <td><code>authz-casbin</code></td>
  <td>Delegates to a <a href="https://github.com/casbin/lua-casbin/">Lua Casbin</a>-compliant third-party</td>
</tr>
<tr>
  <td><code>ldap-auth</code></td>
  <td>Delegates to an LDAP</td>
</tr>
<tr>
  <td><code>opa</code></td>
  <td>Delegates to an <a href="https://www.openpolicyagent.org/">Open Policy Agent</a> endpoint</td>
</tr>
<tr>
  <td><code>forward-auth</code></td>
  <td>Forwards the authentication to a third-party endpoint</td>
</tr>
</tbody>
</table>

APISIX assigns authenticated calls to a _consumer_. For example, we can create a consumer authenticated with the `key-auth` plugin:

```yaml
consumers:
  - username: john
    plugins:
      key-auth:
        key: mykey
```

Every request containing the header `apikey` with the key `mykey` will be assigned to the consumer `john`.

## Authorization

Authentication alone isn't enough. Once a request to a URL has been authenticated, we need to decide whether it's allowed to proceed further. That's the role of authorization.

>Authorization [...] is the function of specifying access rights/privileges to resources, which is related to general information security and computer security, and to access control in particular. More formally, "to authorize" is to define an access policy.
>
>-- [Authorization on Wikipedia](https://en.wikipedia.org/wiki/Authorization)

Apache APISIX implements authorization mainly via the [consumer-restriction](https://apisix.apache.org/docs/apisix/plugins/consumer-restriction/) plugin. Here's the most straightforward usage of the `consumer-restriction` plugin:

```yaml
consumers:
  - username: johndoe                     #1
    plugins:
      keyauth:
        key: mykey

routes:
  - upstream_id: 1                        #2
    plugins:
      keyauth: ~
      consumer-restriction:
        whitelist:                        #3
          - johndoe
```

1. Define a consumer
2. Reference an already existing upstream
3. Only allows defined consumers to access the route

Most real-world authorization models avoid binding an identity directly to a permission. They generally bind a group (and even a role) so that it becomes easier to manage many identities. Apache APISIX provides the [consumer group](https://apisix.apache.org/docs/apisix/terminology/consumer-group/) abstraction for this.

```yaml
consumer_groups:
  - id: accountants                      #1

consumers:
  - username: johndoe
    group_id: accountants                #2
    plugins:
      keyauth:
        key: mykey

routes:
  - upstream_id: 1
    plugins:
      keyauth: ~
      consumer-restriction:
        type: consumer_group_id          #3
        whitelist:
          - accountants
```

1. Define a consumer group
2. Assign the consumer to the previously defined consumer group
3. Restrict the access to members of the defined consumer group, _i.e._, `accountants`

## Input validation

With Apache APISIX, you can define a set of JSON schemas and validate a request against any of them. My colleague Navendu has written an exhaustive blog post on the subject: [Your API Requests Should Be Validated](https://navendu.me/posts/request-validation/).

I think it's not the API Gateway's responsibility to handle request validation. Each upstream has specific logic, and moving the validation responsibility from the upstream to the Gateway ties the latter to the logic for no actual benefit.

In any case, the checkbox is ticked.

## IP Whitelisting

Apache APISIX implements IP Whitelisting via the [ip-restriction](https://apisix.apache.org/docs/apisix/plugins/ip-restriction/) plugin. You can define either regular IPs or CIDR blocks.

```yaml
routes:
  - upstream_id: 1
    plugins:
      ip-restriction:
        whitelist:
          - 127.0.0.1
          - 13.74.26.106/24
```

## Logging and Monitoring

Logging and Monitoring fall into the broader _Observability_ category, also encompassing _Tracing_. Apache APISIX offers a broad range of Observability plugins in each category.

<table>
<thead>
<tr>
  <th>Type</th>
  <th>Name</th>
  <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td rowspan="3">Tracing</td>
  <td><code>zipkin</code></td>
  <td>Collect and send traces according to the Zipkin specification</td>
</tr>
<tr>
  <td><code>skywalking</code></td>
  <td>Integrate with the <a href="https://skywalking.apache.org/">Apache SkyWalking</a> project</td>
</tr>
<tr>
  <td><code>opentelemetry</code></td>
  <td>Report data according to the OpenTelemetry specification</td>
</tr>
<tr>
  <td rowspan="3">Metrics</td>
  <td><code>prometheus</code></td>
  <td>Expose metrics in the Prometheus format</td>
</tr>
<tr>
  <td><code>node-status</code></td>
  <td>Expose metrics in JSON format</td>
</tr>
<tr>
  <td><code>datadog</code></td>
  <td>Integrate with Datadog</td>
</tr>
<tr>
  <td rowspan="14">Logging</td>
  <td><code>file-logger</code></td>
  <td>Push log streams to a local file</td>
</tr>
<tr>
  <td><code>syslog</code></td>
  <td>Push logs to a Syslog server</td>
</tr>
<tr>
  <td><code>http-logger</code></td>
  <td>Push JSON-encoded logs to an HTTP server</td>
</tr>
<tr>
  <td><code>tcp-logger</code></td>
  <td>Push JSON-encoded logs to a TCP server</td>
</tr>
<tr>
  <td><code>udp-logger</code></td>
  <td>Push JSON-encoded logs to a UDP server</td>
</tr>
<tr>
  <td><code>kafka-logger</code></td>
  <td>Push JSON-encoded logs to a Kafka cluster</td>
</tr>
<tr>
  <td><code>rocketmq-logger</code></td>
  <td>Push JSON-encoded logs to a RocketMQ cluster</td>
</tr>
<tr>
  <td><code>loki-logger</code></td>
  <td>Push JSON-encoded logs to a Loki instance</td>
</tr>
<tr>
  <td><code>splunk-hec-logging</code></td>
  <td>Push logs to a Splunk instance</td>
</tr>
<tr>
  <td><code>loggly</code></td>
  <td>Push logs to a Loggly instance</td>
</tr>
<tr>
  <td><code>elasticsearch-logger</code></td>
  <td>Push logs to an Elasticsearch instance</td>
</tr>
<tr>
  <td><code>sls-logger</code></td>
  <td>Push logs to Alibaba Cloud Log Service</td>
</tr>
<tr>
  <td><code>google-cloud-logging</code></td>
  <td>Push access logs to Google Cloud Logging Service</td>
</tr>
<tr>
  <td><code>tencent-cloud-cls</code></td>
  <td>Push access logs to Tencent Cloud CLS</td>
</tr>
</tbody>
</table>

## Rate Limiting

Rate Limiting protects upstreams from Distributed Denial of Services attacks, _a.k.a_ DDoS. It's one of the main features of reverse proxies and API Gateways. APISIX implements rate limiting through three different plugins:

* The [limit-conn](https://apisix.apache.org/docs/apisix/plugins/limit-conn/) Plugin limits the number of concurrent requests to your services
* The [limit-req](https://apisix.apache.org/docs/apisix/plugins/limit-req/) Plugin limits the number of requests to your service using the [leaky bucket algorithm](https://en.wikipedia.org/wiki/Leaky_bucket)
* The [limit-count](https://apisix.apache.org/docs/apisix/plugins/limit-count/) Plugin limits the number of requests to your service by a given count per time. The plugin is using _Fixed Window_ algorithm

Let's use `limit-count` for the sake of example:

```yaml
routes:
  - upstream_id: 1
    plugins:
      limit-count:
        count: 10
        time_window: 1
        rejected_code: 429
```

The above configuration snippet protects the upstream from being hit by more than ten requests per second. It applies to every IP address because of the default configuration. The complete snippet would look like the following:

```yaml
routes:
  - upstream_id: 1
    plugins:
      limit-count:
        count: 10
        time_window: 1
        rejected_code: 429
        key_type: var
        key: remote_addr
```

When dealing with APIs, there's a considerable chance you want to differentiate between your clients. Some might get a better rate for different reasons: they paid a premium offer; they are considered strategic; they are internal clients, etc. The same consumer could also use different IP addresses because they run on various machines with other APIs. Allowing the same consumer more calls because they execute their requests on a distributed infrastructure would be unfair.

As it stands, the IP is not a great way to assign the limit; we prefer to use a named consumer or, even better, a consumer group. It's perfectly possible with APISIX:

```yaml
consumer_groups:
  - id: basic
    plugins:
      limit-count:
        count: 1
        time_window: 1
        rejected_code: 429
  - id: premium
    plugins:
      limit-count:
        count: 10
        time_window: 1
        rejected_code: 429

consumers:
  - username: johndoe
    group_id: basic
    plugins:
      keyauth:
        key: mykey1
  - username: janedoe
    group_id: premium
    plugins:
      keyauth:
        key: mykey2

routes:
  - upstream_id: 1
    plugins:
      key-auth: ~
```

Now, `johndoe` can only send a request every second, as he's part of the `basic` plan, while `janedoe` can request ten times as much as part of the premium plan.

## Security Headers

The OWASP lists plenty of [HTTP Headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) you can set to improve the security of your web apps and APIs. Apache APISIX provides two dedicated plugins for specific security risks:

* [CORS](https://apisix.apache.org/docs/apisix/plugins/cors/)
* [CSRF](https://apisix.apache.org/docs/apisix/plugins/csrf/)

For any other header, you can use the more generic [response-rewrite](https://apisix.apache.org/docs/apisix/plugins/response-rewrite/) plugin to add them. Finally, we can also remove default HTTP response headers, such as `Server`, to make targeted attacks less likely.

```yaml
global_rules:                               #1
  - id: 1
    plugins:
      response-rewrite:
        headers:
          set:
            X-Content-Type-Options: nosniff #2
          remove:
            - Server                        #3
```

1. Do on every route - security by default! It still can be overridden on a per-route basis, in case of need
2. Tell the browser not to infer the content type if it's not explicitly set
3. Don't advertise the server

## Conclusion

We've seen how to configure Apache APISIX to secure your APIs against 7 of the 16 rules in the original list. The rules left could be less straightforward to implement; we will cover them in the second installment.
