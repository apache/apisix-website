---
title: "Apache APISIX helps DIAN to facilitate cloud native solution"
author: "Ran Sun"
keywords: 
- Apache APISIX
- DIAN
- API Gateway
- Cloud Native
- container
description: This article introduces the background and practice of using the cloud native API gateway Apache APISIX to build the cloud native project in DIAN.
tags: [Case Studies]
image: https://static.apiseven.com/2022/blog/0817/%E5%B0%8F%E7%94%B5.png
---

> This article introduces the background and practice of using Apache APISIX to build the cloud native project in DIAN. The author is Sun ran, an expert in operation and maintenance. Currently working in DIAN, mainly responsible for the deployment of K8s cluster and API Gateway.

<!--truncate-->

## Background

As a domestic service platform for sharing chargers, DIAN is still in its initial stage. From the aspects of operation and maintenance system, test environment and so on, the business of the current product mainly faces the following problems:

- Traditional VM mode deployment, low utilization and not easy to expand
- Sharing resources among Developers and QAs are difficult
- Multiple independent test environments (K8s) that repeat maintenance steps for each deployment are inefficient
- Using Nginx configuration management, operating costs are extremely high

At the beginning of 2020, we decided to launch the containerization project with the intention of finding an existing solution to solve the above problems.

Currently, companies are looking to “Embrace cloud native”as a solution for future business, focusing on micro-service re-engineering in cloud native mode, DevOps, continuous delivery, and most importantly, containerization.

![Why choose Cloud Native](https://static.apiseven.com/202108/1646623804095-4f89cc3d-685f-44e3-8a17-51fb55526677.png)

## Why Need Apache APISIX

Based on the above selection of cloud native mode, we started to build the containerized solution. The programme has three main components:

1. **Self-developed Devops platform-DNA**: this platform is mainly used for project management, change management (pre-release, production environment) , application lifecycle management (DNA Operator) , and CI/CD related functionality.
2. **Isolation based on K8s Namespace**: previously all of our development project environments, including change environments, were all registered together, so isolation between environment and environment became a necessary part of our processing.
3. **Dynamic management routing gateway access layer**: considering the internal multi-application and multi-environment, it is necessary to have a dynamic management gateway access layer to deal with the relevant operations.

### Gateway Selection

For gateway selection, we compared OpenShift Route, Nginx Ingress, and Apache APISIX.

OpenShift 3.0 introduced OpenShift Route to Route traffic for external stack requests by providing the Ingress Controller through the Ingress Operator for Kubernetes. But in the follow-up test, the function support aspect is not perfect and the maintenance cost is very high. Nginx Ingres also has a similar problem with high operating and operation costs.

During our research with Apache APISIX, we found that the core of Apache APISIX is to provide routing and load balancing capabilities, as well as support:

- Dynamic route loading and real-time update
- Stateless high availability mode in ETCD storage
- Lateral spread
- Cross-resource sharing (CORS) , Proxy Rewrite plug-in
- API calls and automation settings
- Dashboard is clean and easy to use

Of course, as an open source project, Apache APISIX has a very active community and is in line with our trend to pursue cloud native, taking into account our application scenarios and Apache APISIX’s product strengths, finally, replace all routes in the project environment with Apache APISIX.

## Changes with Apache APISIX

### Overall Architecture

Our current product architecture is broadly similar to using Apache APISIX in K8s. The main idea is to expose Apache APISIX’s Service as a LoadBalancer type. The user then transfers the request access to Apache APISIX and forwards the route to the upstream related service.

![Overall architecture](https://static.apiseven.com/2021/0918/20220816-171733.jpg)

One additional point is why we put the ETCD outside the technology stack. The ETCD was taken out separately because of errors in resolving domain names in earlier versions, and because the internal maintenance and backup process was cumbersome.

### Business Model

![Business model](https://static.apiseven.com/2021/0918/20220816-172217.jpg)

The image above shows the business environment transformation model after accessing Apache APISIX. As each development or project changes, the DNA creates a change and converts it into a K8s Namespace resource.

Because K8s Namespace is resource-isolated in and of itself, we provide multiple sets of project change environments based on Namespace at deployment time, including copies of all applications and registering to the same Eureka. We’ve modified Eureka to allow it to support the separation of application replicas of different namespaces so that they don’t call each other.

### Function Enhancement

With the above architecture and business model in practice, each project change generates a corresponding Namespace resource, while the DNA Operator creates the corresponding APP resource, and finally generates the corresponding Apache APISIX routing rules.

#### Function 1: Project Changes to More Environments

In a change environment we have two scenarios, one is point-to-point mode, where one domain name corresponds to one application. Simply by enabling the domain name, Apache APISIX is used in the DNA to generate the corresponding route, which is the single path routing rule.

![Point-to-Point mode](https://static.apiseven.com/202108/1646623778769-ae05d742-8f31-4272-94e0-5d3266d0c9b7.png)

Another scenario is multilevel path routing. In this scenario, we use Apache APISIX to point multiple APP routes required in project changes to the current Namespace environment, and their associated APP routes to a Stable set of Namespace environments (usually Stable) .

![Multilevel path](https://static.apiseven.com/2021/0918/20220816-172458.jpg)

#### Function 2: Automate the Process

Based on some routing rules of the above project environment, Apache APISIX’s API call function is used as a control center, and some functions including domain name prefix and corresponding application instance are collected.

For example, when a new application comes online, you can request a corresponding routing rule and add it to the control center. When you need to request routing, you can enable this routing rule with one click and automatically synchronize to Apache APISIX.

![Automated process](https://static.apiseven.com/202108/1646623758208-09d6dfef-677b-47df-919e-99c3b0794e04.png)

We also provide a single common routing request, including online and test environments, or some public network exposure and test requirements, and call the Apache APISIX interface.

![Ordinary route](https://static.apiseven.com/202108/1646623778763-0951ede3-1c58-46dd-b4ee-6ac9f977e636.png)

## Practice Based on Apache APISIX

### OpenShift Based Deployment

OpenShift has a very strict SCC mechanism, and there are many problems with deploying Apache APISIX with OpenShift, so you have to recompile every release.

Also, based on the Docker mirroring provided by Apache APISIX, we updated some of the basic software on a daily basis, such as tuning and problem viewing, and uploaded it to the internal Image repository via Image Rebuild.

### Cross-version Smoothing

We started with Apache APISIX at version 1.5, and in the process of updating to the latest version, we experienced things like ETCD V2 performance degradation and increased strong validation of the CORS plug-in.

![Cross smooth](https://static.apiseven.com/202108/1632294589632-e113850d-57a6-4a82-be21-63ec8e78f842.png)

Based on this, we take the solution of version cut flow, new version enable and create new Service and expose relevant SLB information. Switch the Gateway to the new version of Apache APISIX using the Selector property of the Service. On the other hand, we will also split the traffic, some of the traffic through DNS resolution to the new version of Apache APISIX SLB address, to achieve a smooth version of the process.

### Solve the ETCD Compression Problem

During the use period, we also observed that the Load has been suddenly high. After checking, we found that the amount of data in the ETCD has reached more than 600 megabytes, so we took the measure of compressing the ETCD regularly, wIPE out all historical data. The code can be found at:

```sh
$ ETCDCTL_API=3 etcdctl --endpoints=http://etcd-1:2379 compact 1693729
$ ETCDCTL_API=3 etcdctl --endpoints=http://etcd-1:2379 defrag
```

### Get Client-IP

In the online business scenario, we need to get the source IP to do the relevant business processing. Apache APISIX provides the “X-Real-IP”capability to do this by configuring real and enabling Local mode of externalTrafficPolicy.

## Future Expectations

As we all know, DIAN is now the main business scenario for sharing chargers, so in the property is also partial to the direction of the Internet of things.

From the business level, we also have some important business such as MQTT type applications. They are currently exposed in the container in SLB mode and hopefully can be plugged into the entire Apache APISIX cluster in the future.

At the front-end level, the current front-end application is still in a container, and we intend to connect the front-end application directly to Apache APISIX via Proxy Rewrite plug-in to our Ali Cloud OSS domain name. This saves the resources for container deployment and makes it easier to manage.

On the Apache APISIX project, we have also developed a number of practical deployment requirements, in the hope that subsequent changes in the Apache APISIX version can support or improve related functions. For example:

1. Add multi-cluster functionality at the technical management level
2. More fine-grained user rights management at the development level
3. Feature level support for SSL certificate rolling updates
4. Apache APISIX-Ingress-Controller related business access
