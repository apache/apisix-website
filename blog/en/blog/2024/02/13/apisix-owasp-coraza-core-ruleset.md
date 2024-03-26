---
title: Hardening Apache APISIX with the OWASP's Coraza and Core Ruleset
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - OWASP
  - Coraza
description: >
  The Open Worldwide Application Security Project is an online community that produces freely available articles, methodologies, documentation, tools, and technologies in the fields of IoT, system software and web application security. The OWASP provides free and open resources. It is led by a non-profit called The OWASP Foundation. The OWASP Top 10 - 2021 is the published result of recent research based on comprehensive data compiled from over 40 partner organizations.
  The OWASP regularly publishes a Top 10 vulnerability report. The report targets vulnerabilities in web applications.
  In this post, I'd like to describe how to fix some of them via the Apache APISIX API Gateway.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2024/02/10/vVlFQu7C_img-HDlf4Xx9m1iqS0Ico3oBZ.png
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/apisix-owasp-coraza-core-ruleset/" />
</head>

>The Open Worldwide Application Security Project is an online community that produces freely available articles, methodologies, documentation, tools, and technologies in the fields of IoT, system software and web application security. The OWASP provides free and open resources. It is led by a non-profit called The OWASP Foundation. The OWASP Top 10 - 2021 is the published result of recent research based on comprehensive data compiled from over 40 partner organizations.
>
> --[OWASP website](https://owasp.org/)
>
>The OWASP regularly publishes a Top 10 vulnerability report. The report targets vulnerabilities in web applications.
>
>In this post, I'd like to describe how to fix some of them via the [Apache APISIX API Gateway](https://apisix.apache.org/).

<!--truncate-->

## The OWASP Top 10 2021

In 2021, the report mentions:

* A01:2021-Broken Access Control
* A02:2021-Cryptographic Failures
* A03:2021-Injection
* A04:2021-Insecure
* A05:2021-Security Misconfiguration
* A06:2021-Vulnerable and Outdated Components
* A07:2021-Identification and Authentication Failures
* A08:2021-Software and Data Integrity Failures
* A09:2021-Security Logging and Monitoring Failures
* A10:2021-Server-Side Request Forgery

For more details, please check the complete [report](https://owasp.org/www-project-top-ten/).

Fixing a vulnerability depends on its exact nature. For example, fixing _Vulnerable and Outdated Components_ is process-driven, requiring discipline in managing versions and retiring older ones. Some, however, are technical and only require proper configuration in the reverse proxy or API Gateway, _e.g._, _Server Side Request Forgery_.

## Nobody cares about security

Security is a touchy subject because hardening security doesn't bring any value to the business. Career-driven managers won't care about security as they won't be able to showcase they increased the company's profit by X% on their next yearly evaluation. Unless the board considers security seriously, chances are nobody will care. For this reason, most organizations implement checkbox-based security, aka plausible deniability. If you're interested in implementing security properly, I've written some thoughts in a previous blog post: [Treat security as a risk](https://blog.frankel.ch/treat-security-as-risk/).

All in all, securing applications will not get a lot of budget, if any. Hence, we must be smart about it and search for an existing component. Fortunately, the OWASP offers an out-of-the-box configuration to handle the Top 10, which is fixable via a configuration named **Core Rule Set**. Unfortunately, it targets ModSecurity:

>ModSecurity, sometimes called Modsec, is an open-source web application firewall (WAF). Originally designed as a module for the Apache HTTP Server, it has evolved to provide an array of Hypertext Transfer Protocol request and response filtering capabilities along with other security features across a number of different platforms including Apache HTTP Server, Microsoft IIS and Nginx. It is free software released under the Apache license 2.0.
>
>--[ModSecurity on Wikipedia](https://en.wikipedia.org/wiki/ModSecurity)

While it's theoretically possible to configure Nginx via Apache APISIX configuration, there's another more straightforward way.

## The OWASP Core Ruleset and Coraza

The description of the Core Ruleset is pretty relevant to our needs:

>The OWASP® ModSecurity Core Rule Set (CRS) is a set of generic attack detection rules for use with ModSecurity or compatible web application firewalls. The CRS aims to protect web applications from a wide range of attacks, including the OWASP Top Ten, with a minimum of false alerts. The CRS provides protection against many common attack categories, including:
>
>* SQL Injection (SQLi)
>* Cross Site Scripting (XSS)
>* Local File Inclusion (LFI)
>* Remote File Inclusion (RFI)
>* PHP Code Injection
>* Java Code Injection
>* HTTPoxy
>* Shellshock
>* Unix/Windows Shell Injection
>* Session Fixation
>* Scripting/Scanner/Bot Detection
>* Metadata/Error Leakages
>
>--[OWASP® ModSecurity Core Rule Set website](https://coreruleset.org/)

OWASP also provides [Coraza](https://coraza.io/), a port of ModSecurity available as a Go library. [Coraza Proxy Wasm](https://github.com/proxy-wasm/spec) is built on top of Coraza and implements the [proxy-wasm ABI](https://github.com/proxy-wasm/spec), which specifies a set of Wasm interfaces for proxies. Finally, Apache APISIX offers proxy-wasm integration.

## Putting it all together

Let's sum up:

1. The OWASP provides a list of the Top 10 web security vulnerabilities
2. It implements them for ModSecurity via the Core Ruleset
3. Coraza is a port of ModSecurity, available as a proxy-wasm implementation

We can configure Apache APISIX with sane and secure defaults this way. Let's do it.

First things first: Coraza isn't part of the Apache APISIX distribution. Yet, it's straightforward to add it here with Docker:

```docker
FROM apache/apisix:3.8.0-debian

ENV VERSION 0.5.0                                                           #1
ENV CORAZA_FILENAME coraza-proxy-wasm-${VERSION}.zip                        #1

ADD https://github.com/corazawaf/coraza-proxy-wasm/releases/download/$VERSION/$CORAZA_FILENAME . #2

USER root                                                                   #3

RUN <<EOF

  apt-get install zip -y                                                    #4
  unzip $CORAZA_FILENAME -d /usr/local/apisix/proxywasm
  rm $CORAZA_FILENAME
  apt-get remove zip -y
  chown -R apisix:apisix /usr/local/apisix/proxywasm

EOF

USER apisix                                                                 #5
```

1. Define variables for better maintainability
2. Get the Coraza Wasm release
3. In recent APISIX versions, the user is `apisix` to harden security. As we need to install packages, we must switch to `root`.
4. Install `unzip` as it's not installed, unzip the downloaded archive, remove the archive, uninstall `unzip`, and change the owner of the extracted folder
5. Switch back to user `apisix`

The next step is configuring APISIX itself to use the Coraza Wasm plugin.

```yaml
wasm:
  plugins:
    - name: coraza-filter                                                   #1
      priority: 7999                                                        #2
      file: /usr/local/apisix/proxywasm/coraza-proxy-wasm.wasm              #3
```

1. Filter's name set in Wasm code
2. Set the highest priority so it runs before any other plugin
3. Path to the extracted file, see the `Dockerfile` above

Finally, we can assign the plugin to routes or set it as a global rule to apply to every route. I'm using static configuration:

```yaml
global_rules:
  - id: 1
    plugins:
      coraza-filter:                                                        #1
        conf:
          directives_map:                                                   #2
            default:
              - SecDebugLogLevel 9                                          #3
              - SecRuleEngine On                                            #4
              - Include @crs-setup-conf                                     #5
              - Include @owasp_crs/*.conf                                   #6
          default_directives: default                                       #7
```

1. Configure the `coraza-filter` plugin now that it's available
2. Define configurations. Here, we define a single one, `default`, but we could define several and use different ones in different routes
3. Increase the log level to see what happens in logs
4. Switch on the engine
5. Use Coraza setup
6. Use all rules. We could pick and choose the ones we want for more fine-grained control
7. Use the `default` configuration defined above

We proceed to define routes to <https://httpbin.org/> to test our setup. Let's call the route to `/get`:

```bash
curl localhost:9080?user=foobar
```

The response is as expected:

```json
{
  "args": {
    "user": "foobar"
  },
  "headers": {
    "Accept": "*/*",
    "Host": "localhost",
    "User-Agent": "curl/8.4.0",
    "X-Amzn-Trace-Id": "Root=1-65b9fa13-75900dc029e156ec764ae204",
    "X-Forwarded-Host": "localhost"
  },
  "origin": "192.168.65.1, 176.153.7.175",
  "url": "http://localhost/get?user=foobar"
}
```

Now, let's try to send JavaScript in the query string. There's no way this request is expected server-side, so our infrastructure should protect us from it.

```bash
curl 'localhost:9080?user=<script>alert(1)</script>'
```

The response is a 403 HTTP status code.
If we look at the log, we can see the following hints:

```
Coraza: Warning. XSS Attack Detected via libinjection [file "@owasp_crs/REQUEST-941-APPLICATION-ATTACK-XSS.conf"]
Coraza: Warning. NoScript XSS InjectionChecker: HTML Injection
Coraza: Warning. Javascript method detected
Coraza: Access denied (phase 1). Inbound Anomaly Score Exceeded in phase 1
```

Coraza did the job!

## Conclusion

Most organizations don't incentivize for security. Hence, we need to be smart about it and use existing components as much as possible.

We can harden Apache APISIX against the OWASP Top 10 by using Coraza and the Core Ruleset.

**To go further:**

* [OWASP Security Top 10](https://owasp.org/www-project-top-ten/)
* [OWASP ModSecurity Core Ruleset](https://coreruleset.org/)
* [OWASP Coraza WAF](https://coraza.io/)
* [APISIX - Integrate with Coraza](https://docs.api7.ai/apisix/how-to-guide/security/waf/integrate-with-coraza)

The complete source code for this post can be found on [GitHub](https://github.com//ajavageek/apisix-coraza).
