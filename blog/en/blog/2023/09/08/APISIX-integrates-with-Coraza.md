---
title: "Coraza: Elevating APISIX with Cutting-Edge WAF Features"
authors:
  - name: Guohao Wang
    title: Author
    url: https://github.com/sn0rt
    image_url: https://avatars.githubusercontent.com/u/2706161?v=4
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords:
  - APISIX
  - Coraza
  - WAF
description: The integration of APISIX and Coraza provides reliable security protection and ensures the integrity and reliability of API services.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/09/08/gLVTG2qC_APISIX%20&%20Coraza.png
---

> The integration of APISIX and Coraza provides reliable security protection and ensures the integrity and reliability of API services.
<!--truncate-->

With the rapid advancement of cloud-native technology, securing APIs has become increasingly crucial. In response to this growing need, [Apache APISIX](https://github.com/apache/apisix) has introduced a range of cutting-edge features. Among them, it is commendable that APISIX has integrated the [coraza-proxy-wasm](https://github.com/corazawaf/coraza-proxy-wasm) plugin. We will delve into APISIX's enhanced WAF capabilities and explore how Coraza can fortify applications against a wide array of web attacks, ensuring comprehensive security.

## Apache APISIX

[Apache APISIX](https://apisix.apache.org/) is a dynamic, real-time, high-performance open-source API gateway that provides rich traffic management functions such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, and observability. Being built based on NGINX and LuaJIT, Apache APISIX has ultra-high performance with a single-core QPS of up to 23,000 and an average delay of only 0.2 milliseconds. It can solve problems in traditional architecture, and at the same time adapt to the needs of the cloud-native era.

As an API gateway, Apache APISIX has a wide range of application scenarios. It can be applied to scenarios such as gateways, Kubernetes Ingress, and service mesh, and can help enterprises quickly and safely process API and microservice traffic. At present, it has been tested and highly recognized by worldwide enterprises and organizations such as Amber Group, [Airwallex](https://apisix.apache.org/blog/2021/11/03/airwallex-usercase/), Lotus Cars, vivo, and European Factory Platform.

## Coraza

[WAF](https://en.wikipedia.org/wiki/Web_application_firewall), or Web Application Firewall, is a network security tool designed to safeguard web applications against various cyberattacks by filtering and monitoring HTTP communications between web applications and the internet.

[Coraza](https://coraza.io/) is a highly renowned open-source WAF implementation. Integrating Coraza with APISIX significantly enhances APISIX's ability to protect upstream services.

**It provides specific advantages in the following areas:**

1. Attack Detection and Prevention: Coraza, through real-time analysis and monitoring of HTTP and HTTPS traffic, can detect and prevent common web attacks such as SQL injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and more.

2. Logging and Reporting Capabilities: Coraza offers advanced logging and reporting features, allowing administrators to track and analyze security events within the system. This aids in promptly identifying potential threats and taking appropriate measures to address security issues.

3. Flexibility and Scalability: It provides flexible configuration options, allowing administrators to customize according to specific application needs. It supports custom rules and policies, which can be configured based on specific security requirements. Additionally, it can integrate with other security tools and systems, providing a more comprehensive security solution.

## Why APISIX Prefers Coraza-WAF?

### Open-Source Community

When selecting a new WAF solution, APISIX places significant importance on its support for the open-source community. Similar to APISIX, Coraza has an active developer community. The support of the open-source community enables Coraza to provide timely updates and support. Community members actively participate in the development and maintenance of Coraza, continuously improving and optimizing the code, and addressing vulnerabilities and security issues. Users benefit from these timely updates, maintaining the security and stability of their applications.

The Coraza open-source community coordinates with the development and evolution of APISIX. As a WAF solution for APISIX, Coraza can closely integrate with the features and capabilities of APISIX to meet users' security needs. Collaboration and feedback from the open-source community contribute to driving further development of the solution and ensuring its compatibility and consistency with APISIX.

### Support Wasm Plugins

APISIX supports developing plugins with [WebAssembly (Wasm)](https://apisix.apache.org/blog/2021/11/19/apisix-supports-wasm/#how-to-use-wasm-in-apache-apisix), and Coraza also provides Wasm plugins as an option. Therefore, integrating Coraza with APISIX incurs relatively low costs.

Wasm can be utilized cross-platform, allowing APISIX and Coraza to work seamlessly without additional extensive modifications or adaptations. This eliminates extensive code modifications and adaptations.

**The benefits of this low-cost integration include:**

1. Verified Solution: Although the Coraza wasm plugin was not developed specifically for APISIX, it has been validated on the Istio platform. In terms of functionality, the plugin can provide guarantees consistent with Istio.
2. Low Development and Maintenance Costs: The Coraza wasm plugin is a platform-independent binary file, making its release and development process extremely convenient. Extending the Coraza wasm plugin can be achieved with proxy-wasm-go-sdk, where releasing only requires updating the binary file, further simplifying the process.

### Using Core Rule Set

Traditional WAF solutions often require the installation and configuration of specific modules on web servers, such as NGINX, to integrate and communicate with the WAF engine. This integration process can be cumbersome for Ops engineers, involving complex configurations and compatibility issues with different software versions.

However, Coraza utilizes the Core Rule Set (CRS) as its rule set. CRS is a widely adopted and validated open-source set of rules designed for the detection and defense of common attacks in web applications. What sets Coraza apart from traditional WAF solutions is its ability to directly parse and execute CRS rules without additional compilation of NGINX. The use of CRS provides enhanced security protection for APISIX along with support from the CRS community.

**This design brings several important benefits:**

- Simplified Maintenance for Coraza: As it doesn't require the support of nginx_module, the Ops engineers do not need to deal with complex module installation and configuration processes. Instead, they can focus on maintaining and updating the CRS rule set, ensuring it contains the latest security rules and fixes.

- Increased Stability and Reliability of the Entire Solution: CRS, as a mature rule set, has undergone long-term practice and improvement and has been widely adopted and supported by the community. This means Coraza users can benefit from the collective wisdom of the CRS community and receive timely security updates and fixes.

### Easy Installation and Deployment

Coraza doesn't require the support of nginx_module, making it easy to maintain. This is because Coraza is an independent WAF that doesn't rely on NGINX or support from other web server modules and can integrate with different web servers.

This independence makes Coraza's maintenance easier as it doesn't need to depend on specific web server configurations or module installations. Administrators can configure and manage Coraza independently without worrying about compatibility with other server components.

## How to Use Coraza in APISIX

Please note that to use Coraza functionality, you need to install the APISIX master version. Currently, this feature is in the preview stage, and it is expected to be officially supported in version 3.6.0.

### Configuring APISIX Integration with coraza-proxy-wasm

Navigate to the directory of `APISIX`

```
cd /home/ubuntu/apisix-master
```

Modify the configuration `file conf/config-default.yaml` and cancel the original comment in the wasm configuration

```
wasm:
  plugins:
    - name: coraza-filter
      priority: 7999
      file: /home/ubuntu/coraza-proxy-wasm/build/main.wasm # Write absolute path
```

### Configuring the `/anything` route to integrate Coraza's WAF rules

Reconfigure routing and enable the `coraza-filter` plugin

```
curl -i http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '{
  "uri": "/anything",
  "plugins": {
    "coraza-filter": {
      "conf": {
        "directives_map": {
          "default": [
            "SecDebugLogLevel 9",
            "SecRuleEngine On",
            "SecRule REQUEST_URI \"@beginsWith /anything\" \"id:101,phase:1,t:lowercase,deny\""
          ]
        },
        "default_directives": "default"
      }
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

Test the WAF rules and we can see 403

```shell
curl http://localhost:9080/anything -v
*   Trying 127.0.0.1:9080...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 9080 (#0)
> GET /anything HTTP/1.1
> Host: localhost:9080
> User-Agent: curl/7.68.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 403 Forbidden
< Date: Thu, 31 Aug 2023 09:09:18 GMT
< Content-Type: text/html; charset=utf-8
< Content-Length: 225
< Connection: keep-alive
< Server: APISIX/3.4.0
<
<html>
<head><title>403 Forbidden</title></head>
<body>
<center><h1>403 Forbidden</h1></center>
<hr><center>openresty</center>
<p><em>Powered by <a href="https://apisix.apache.org/">APISIX</a>.</em></p></body>
</html>
* Connection #0 to host localhost left intact
```

Check logs `logs/error.log`

```text
2023/08/31 09:20:39 [info] 126240#126240: *23933 Transaction interrupted tx_id="JVhHVfDuGjVbfgvDjik" context_id=2 action="deny" phase="http_request_headers", client: 127.0.0.1, server: _, request: "GET /anything HTTP/1.1", host: "localhost:9080"
2023/08/31 09:20:39 [debug] 126240#126240: *23933 Interruption already handled, sending downstream the local response tx_id="JVhHVfDuGjVbfgvDjik" context_id=2 interruption_handled_phase="http_request_headers"
```

## Conclusion

Coraza is a powerful WAF framework that offers extensive security features and flexible configuration options, suitable for protecting enterprise web applications from various threats. The integration of APISIX with Coraza is a significant new feature of APISIX. Coraza, as an easy-to-maintain solution, integrated with APISIX, provides enterprises with robust API management and security features.
