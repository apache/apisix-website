---
title: "Building an Automated Operation and Maintenance Platform Based on API Gateway Apache APISIX"
author: "Qing Chen"
keywords: 
- Apache APISIX
- API Gateway
description: In this article, Qing Chen, the former manager of operations and maintenance of the same program, introduces how to implement an automated operation and maintenance platform based on Apache APISIX.
tags: [Technology]
---

> In this article, Qing Chen, the former manager of operations and maintenance at Tongcheng Network Technology, introduces how to implement an automated operation and maintenance platform based on Apache APISIX.

<!--truncate-->

## Background

At the end of 2019, the company encountered some business pain points in the process of business research and development. For example, the company's development technology stack is java related, while the operation and maintenance engineers are good at shell and python scripts, which cannot be directly connected; The company itself is in a period of rapid growth, and the development engineers are insufficient to support the daily operation and maintenance work and the development of the operation and maintenance platform; In the existing operation and maintenance platform, a variety of open source tools are used, which are not integrated and difficult to manage. Therefore, I initiated the project of automatic operation and maintenance platform, hoping to achieve a rapid development model through the operation and maintenance platform, so that the operation and maintenance engineers can develop their own businesses and provide rapid iterative services.

## Why Apache APISIX?

During the selection of gateway, we have carried out the actual test. Compared with other gateways, APISIX can basically achieve 90% of the functions of NGINX, and supports a variety of load balancing strategies and mechanisms that support multilingual plug-ins. It also supports soft WAF, which can cover 95% of our security business scenarios. As a cloud native API gateway, APISIX also provides powerful logging functions and supports custom log formats. Therefore, access log can be directly connected to elk. Since APISIX also supports the development of custom plug-ins, it can be flexibly extended according to our needs. Thanks to the basic functions of APISIX and the powerful plug-in system, the development cost can be effectively reduced.

## Automation operation and maintenance platform architecture

The overall architecture of the automation operation and maintenance platform is as follows:

![Architecture Diagram](https://user-images.githubusercontent.com/88811141/173292289-2986c1b4-3704-4d34-a30a-df4ee6f09da7.png)

- Storage layer: the core is CMDB. Its main function is to record and manage the attributes of the organization's business and its resources, as well as the relationships between them. Not only is it responsible for querying the initial status of all business changes, but also all business resource changes should be fed back and recorded in it to realize the control of business standards and specifications. The storage layer also contains some authority management data, business work order flow data, and monitoring alarm time sequence data;

- Public basic service layer: the API that provides atomic services can also be regarded as the basic platform, reusing a large number of open-source tools;

- Business arrangement layer: it needs to be designed according to the actual business. The engineer's work is to adapt the atomic business API to the message, process combination, data reading and writing as required, and package it into an interface for front-end calls;

- Gateway layer: the layer where APISIX is located in the business boundary of the background service. It is responsible for load balancing, service registration, and discovery, user authentication, transcoding of basic network message data, unified recording of internal and external interaction logs, partial security control, etc. The common services that are irrelevant to the business are uniformly placed in this layer;

- Presentation layer: from the perspective of users, design convenient interactive interfaces. An open-source front-end fully responsive admin web page template is used here. Even if developers are not familiar with JavaScript, they can implement basic forms and reports by themselves.

## Components used by the platform

- Core gateway Apache APISIX: mainly responsible for logging, network security, and load balancing. In addition, we not only realize some functions of the advanced business gateway through custom plug-ins but also integrate with other services through APIs to quickly realize various specified functions and effectively reduce development costs;

- API management tool YAPI: it is responsible for the specification definition of the interface, the preparation of test cases, and the data source of ACL;

- Access control component Casbin: a lightweight, multi-mode, and strong paradigm cross-language open-source access control framework. We use PyCasbin based on RESTful;

- Data storage: MySQL 5.7;

- Mug skeleton: the self-developed web framework is mainly used for deeper technical control.

- Connected third-party platform-related components

    - CMDB (self-research): a layer of RESTful API is outsourced in the open-source CMDBuild to facilitate interaction;

    - OpenLDAP: used for user account authentication, not for authentication;

    - Workflow Activiti: the official RestAPI service is used. Since it is behind the gateway, there is no need to consider security issues.

## Business scenario

### User login and authority verification

For all Web frameworks, user login is a mandatory option, and I will introduce this scenario to you next.

![User Logins](https://user-images.githubusercontent.com/88811141/173294822-ade65508-842e-450c-bcda-d8400e102f7a.png)

First of all, we need to understand the relevant components we use in the scenario. The first is the access front end, which is outside the gateway. Secondly, we use the APISIX cloud native API gateway as the business boundary. Then the auth service, which is a self-defined microservice, is used to verify the front-end URL request and user login request, and issue tokens to authenticated users. LDAP stores the company's internal password information. CMDB stores some business-related information, including organizational structure, some organizational information about the permissions that can be accessed, and finally the pages that the front end needs to access.

After understanding the above components, let's introduce the overall process:

When users log in, they first need to query through the gateway to see if the page they visit is in the white list. Because some pages do not need permission verification, such as the default page or some error pages. If the accessed page needs to verify a login, these requests will be forwarded to the authority authentication service through the relevant plug-ins.

In authority authentication, the authentication service will query whether the account is correct from LDAP according to the incoming "user name" and "password". If it is correct, the organization to which the user belongs and which function modules can be viewed will be queried through the CMDB; After obtaining the result, use the JWT plug-in of APISIX to generate a token according to the user information, add the expiration time, and return it to the front end; The user stores tokens through cookies. If the user continues to access later, the gateway will call the previously stored token from the cookie to verify whether the current user can continue to access the following pages.

Here, we use the [`consumer restriction`](https://apisix.apache.org/zh/docs/apisix/plugins/consumer-restriction/)plug-in of APISIX. The authority authentication mentioned above is completed through the [`consumer restriction`](https://apisix.apache.org/zh/docs/apisix/plugins/consumer-restriction/) plug-in, and we do not need to repeatedly authenticate in the background.

Through the above description, I believe you have a certain understanding of the normal request process. Next, I will introduce you to the scenarios of how to judge the insufficient permissions of these users. In the operation and maintenance platform, if there is an operation involving data change, a token must be carried. When the token is verified by the ACL interface that it has no access, it will directly return to a page that is forbidden to access for the front end to the process. The following is the specific process of user login and permission verification scenarios and the related components used more.

![Schematic Diagram](https://user-images.githubusercontent.com/88811141/173295581-983d945f-76da-4cc1-b9f3-5531f60e9af3.png)

### New service microservice access

![Microservice Access](https://user-images.githubusercontent.com/88811141/173296472-4048d0fc-247c-4855-a407-3d270d366a52.png)

In our daily work, we often launch some microservices, so how can we connect this microservice to the automatic operation and maintenance platform?

We internally stipulate that no matter which language engineers use to develop microservices, they need to use YAPI to define the API. Therefore, YAPI controls all the URLs we can access, and a unified entry is here. Because YAPI supports the definition of various environments, we have defined different operating environments in YAPI. The most typical example is: in the production environment, we use domain names to access; In the development environment, `127.0.0.1` is directly used for access. After completing the definition of YAPI, it can generate a series of request cases through mock, which is very conducive to subsequent production environment testing. All microservice interfaces can mock through HTTP requests.

Next, is the permission management service. All operations here are automatic: it will read the API definition from Yapi, and then generate a series of ACL rules. For permission management, we use a management page in the platform: the administrator can manage the URL access rules through this page. After setting, the form data will be changed into a series of ACL permission definitions and stored in the database. In the process of service startup, the cachebin access model used by the platform will directly load these rules from the database into memory, and then generate a series of consumer definitions and routing tables of APISIX, which will be written into the etcd of APISIX. After the above operations are completed, when users access, the platform can directly perform permission management through APISIX.

The model is not only applicable to the automatic operation and maintenance platform but also applicable to various small and medium-sized business systems.

## Technical details

Through the above scenario description, I believe you have a general understanding of the whole system. Next, I will introduce some technical details to you.

![Technical Details](https://user-images.githubusercontent.com/88811141/173297301-6ee14d6e-8398-4b34-80ce-4b04ce053bad.png)

Because APISIX is implemented based on NGINX+ Lua, some functions need to be implemented through NGINX libraries. From the above figure, we can see where various Lua scripts can be cut into NGINX. In this article, we mainly introduce the operations that can be performed in the rewrite/access and content phases.

In the rewrite/access phase, the message has not been transferred upstream, so various data preprocessing can be performed in this phase. From the above figure, we can see that there is an access_ by_ Lua. In this phase, the deny command can be used to manage permissions, including interface permissions and IP access white list. The plugin acl_plugin.lua, described later, is implemented at this stage.

Second, in `hard_ filet_ by_Lua` stage is often used to insert some additional `key:values` in the HTTP request header for subsequent use when requesting access. For example, when we need online gray-scale publishing, we can add flag bits to the user's request header. Through these flag bits, we can control which back-end services these requests forward, to realize gray-scale publishing. Of course, we can also use the [`traffic split`](http://localhost:3000/zh/docs/apisix/next/plugins/traffic-split) plug-in of APISIX to realize grayscale publishing.

Finally, `log_by_Lua` stage. In this stage, we can directly input some trace information or some fault information into the log file. Similarly, APISIX also provides many plug-ins for loggers, including `skywalking logger`, `kafka-logger`, `rocketmq-logger`, and so on.

### Custom plugins `acl-plugin.lua`

The implementation of the [`acl-plugin.lua`](https://raw.githubusercontent.com/chenqing24/ops-apisix/main/centos/acl-plugin.lua) plug-in is very simple. First, when the user is requesting, we will add the relevant JWT token to the user and store it in the cookie. Then the user will extract the JWT token from the accessed cookie, decode the token and obtain the user information.

In the rewrite phase, the user ID, method, and URI are used to send a request to the background ACL interface for permission verification. If it passes, relevant information will be recorded in the log for future security authentication. If it fails, it directly returns an error status code and records it in the error log.

In APISIX version 1.1, the `cors` plug-in was not released at that time. Therefore, we also implement cross-domain requests through this plug-in. WWhen the request uses the GET and POST request methods, it will be processed. For other requests, they will be passed directly. Now, they can be implemented directly using the `cors` plug-in of APISIX. APISIX can also use multiple languages to develop plug-ins, not just Lua. For details, please refer to: https://apisix.apache.org/zh/docs/apisix/plugin-develop.

### Auth service

The Auth service is an authentication service that comes with the `acl-plugin.lua` plugin.The function of this service is very simple. It mainly reads the information in the request message, decodes the required authentication element, and then forwards it to the relevant service interface. The service interface will return the corresponding result according to the authentication information, and APISIX will reject or pass the request according to the result.

The core function of auth service is to load ACL rules from a database into memory. The main functions are divided into two parts:

- First, is the account interface. The main function of this interface is to send user-related information to the LDAP service for authentication if permission authentication is required during user access. If the authentication passes, the relevant information accessible to the user will be queried from the CMDB, and then together with the user role, expiration time, and other elements, a JWT token will be formed, and a cookie will be generated and returned to the user. At the same time, a consumer will be registered in APISIX for the user information. The interface also implements an ACL_ The check function is responsible for verifying the user authentication information and determining whether the authentication is successful or failed.

- The second is YPAI interface. The main function of this interface is to interact with YAPI. Because there is a token in YAPI for the project to access. With this token, you can read all the API definitions of the project. Therefore, the main function of this interface is to read the HTTP interface definition of API from YAPI, store it in the database, then interact with the permission management page in a form, combine it into an ACL table, and finally generate a series of Casbin rules and store them in the database.

## Summary

The above is an introduction to the architecture and some scenarios of the automatic operation and maintenance platform of Tongcheng Digital Technology Co., Ltd. based on Apache APISIX. Now, APISIX is becoming more and more powerful. It supports plug-in development using Wasm and Python. The ecology of Apache APISIX is also very strong. If you have any questions, you are welcome to communicate and discuss in the community.
