---
id: code-samples
title: Code samples
keywords:
  - API gateway
  - Code samples
  - Example projects
  - Source code
description: Apache APISIX code samples and projects.
---

**Welcome to Apache APISIX Code Samples!**

Our Code Samples is your go-to resource for exploring the full potential of Apache APISIX, boosting your understanding of our platform's features, and accelerating your API development.

In our collection, you'll find a diverse range of code samples, including exposing new APIs, handling API calls, securing, and observing your APIs with Apache APISIX, and many more.

Now, feel free to dive in! Whether you're a beginner in need of a jumpstart or an experienced developer seeking more efficient solutions, our Code Samples are here to empower you on your journey. And if you ever get stuck or need further assistance, our [community of developers](https://join.slack.com/t/the-asf/shared_invite/zt-vlfbf7ch-HkbNHiU_uDlcH_RvaHv9gQ) is always here to help. Happy coding!

| Title | Description | Source code | Tutorial | Category | Level | Language |
| --- | --- | --- | --- | --- | --- | --- |
| Hands-on lab Apache APISIX | It shows a couple of nifty features that can help your information system cope with the challenges introduced by APIs | https://github.com/Boburmirzo/apisix-workshop | https://boburmirzo.github.io/apisix-workshop/ | Authentication, Security, Serverless, Observability, Transformation | Beginner | Shell |
| How to create a File-proxy custom plugin in Lua | Learn to develop a new plugin that exposes the static files through API and fetches a file from a specified URL. | https://github.com/Boburmirzo/apisix-file-proxy-plugin-demo | https://api7.ai/blog/plugin-development-with-lua-and-chatgpt | Custom plugin, File proxy | Intermediate | Lua, Yaml |
| Managing AI-powered Java App with API Management | It demonstrates how to use OpenAI ChatGPT APIs in Spring Boot, secure and manage the traffic with Apache APISIX | https://github.com/Boburmirzo/apisix-java-chatgpt-openaiapi | https://api7.ai/blog/managing-ai-powered-java-apps | Security, Authentication, JWT plugin, Consumers | Intermediate | Java, Yaml |
| Manage . NET-based APIs with Apache APISIX API Gateway | This is an example project focused on the usage of https://apisix.apache.org/ for applications developed in https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0 | https://github.com/Boburmirzo/apisix-dotnet-docker | https://dev.to/apisix/manage-net-microservices-apis-with-apache-apisix-api-gateway-2cbk | Security, Authentication, Rate Limiting, Caching | Beginner | C#, Yaml |
| Chaining API requests with API Gateway | Learn how to create a custom plugin for https://apisix.apache.org/ API Gateway to handle client requests that should be called in sequence. | https://github.com/Boburmirzo/apisix-plugin-pipeline-request-demo | https://api7.ai/blog/chaining-api-requests-with-api-gateway | Custom plugin, Serverless, Request Chaining | Intermediate | Lua, Shell |
| Manage OpenAI APIs with Apache APISIX | Manages the OpenAI API traffic by creating a route, upstream and enabling some plugins. | https://github.com/Boburmirzo/apisix-open-ai-api | https://api7.ai/blog/power-ai-capabilities-with-apache-apisix | AI, Traffic control, Consumer, Rate-limiting, Prometheus, API versioning, Traffic split | Beginner | Shell, Yaml |
| Dynamic routing based on JWT Claim with Apache APISIX and Okta | Explore the benefits of adopting dynamic routing based on authentication attributes | https://github.com/Boburmirzo/dynamic-routing-with-apisix | https://api7.ai/blog/dynamic-routing-based-on-user-credentials | Dynamic routing, JWT, Authentication, Consumer management | Advanced | Shell, Yaml |
| Manage serverless APIs with Apache APISIX and Azure Functions | A simple example of how to manage Java-based serverless APIs built with Azure functions. | https://github.com/Boburmirzo/apisix-manage-serverless-apis | https://api7.ai/blog/manage-serverless-apis-with-apache-apisix | Serverless, Basic auth, Rate-limiting, Traffic management | Intermediate | Java, Shell |
| Manage API Consumers | Explains how to manage your single or multiple API consumers with Apache APISIX. | https://github.com/Boburmirzo/apisix-api-consumers-management | https://apisix.apache.org/docs/apisix/tutorials/manage-api-consumers/ | API consumers, Rate-limiting, Consumer groups | Beginner | Shell |
| Secure APIs with Apache APISIX API Gateway | How to use https://apisix.apache.org/plugins for securing your https://spring.io/guides/tutorials/rest/s and it demonstrates how to effectively use them. | https://github.com/Boburmirzo/apisix-plugin-spring-rest-demo | https://dev.to/apisix/secure-spring-boot-rest-api-with-apache-apisix-api-gateway-1nmg | Security, Authorization, Authentication, Monitoring | Beginner | Java |
| An API observability with Apache APISIX Plugins Example | Learn observing your APIs with Apache APISIX plugins | https://github.com/Boburmirzo/apisix-observability-plugins | https://boburmirzo.github.io/apisix-observability-plugins/ | Observability, Traces, Metrics, Logs | Beginner | Shell |
| End-to-end tracing with OpenTelemetry | Use OpenTelemetry and APISIX to start your journey into observability | https://github.com/nfrankel/opentelemetry-tracing | https://blog.frankel.ch/end-to-end-tracing-opentelemetry/ | Observability, Traces, OpenTelemetry | Intermediate | Kotlin, Python, Rust |
| Chopping the monolith | Extract HTTP endpoints from the monolith and gradually migrate to microservices using API Gateway | https://github.com/nfrankel/chop-monolith | https://blog.frankel.ch/chopping-monolith/ | Azure function, Response-rewrite | Beginner | Kotlin, JavaScript, HTML, Shell |
| Evolving your RESTful APIs, a step-by-step approach | Use API Gateway to evolve APIs step by step by versioning, splitting the traffic, doing canary releases, and more. | https://github.com/nfrankel/evolve-apis | https://blog.frankel.ch/evolve-apis/ | Proxy rewrite, Proxy mirror, Traffic split, Response rewrite, Redirect | Intermediate | Kotlin, Lua, Java |
| Discussing Backend For Front-end | Use API Gateway to build Backend For Frontend solution. | https://github.com/nfrankel/backend-for-frontend | https://blog.frankel.ch/backend-for-frontend/ | Public endpoint, Proxy-rewrite, Routing | Beginner | Python, Lua |
| Getting Hands-On with the New Kubernetes Gateway API | Tutorial about using the Gateway API in practice with Apache APISIX Ingress. | https://github.com/navendu-pottekkat/gateway-api | https://navendu.me/posts/kubernetes-gateway-with-apisix/ | Ingress, Kubernetes, Routing | Beginner | Shell |
| Custom Plugins in APISIX Ingress | Learn how to create and use a small custom Plugin with APISIX deployed in Kubernetes. | https://github.com/navendu-pottekkat/apisix-in-kubernetes/tree/master/custom-plugin | https://navendu.me/posts/custom-plugins-in-apisix-ingress/ | Custom plugins, Ingress, Kubernetes | Intermediate | Lua |
| Canary Release in Kubernetes With Apache APISIX Ingress | Guide on setting up a canary release in Kubernetes using https://apisix.apache.org/docs/ingress-controller/next/getting-started/. | https://github.com/navendu-pottekkat/apisix-in-kubernetes/tree/master | https://navendu.me/posts/canary-in-kubernetes/ | Ingress, Kubernetes, Canary release | Intermediate | Lua |
| An Introduction to Monitoring Microservices with Prometheus and Grafana | Instruction on how you can set up monitoring on your microservice application using two of the popular tools in this space, https://prometheus.io/, and https://grafana.com/. | https://github.com/navendu-pottekkat/monitoring-101 | https://navendu.me/posts/introduction-to-monitoring-microservices/ | Observability, Prometheus, Grafana | Intermediate | Go, Python |
