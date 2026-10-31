# Installation

> This document explains how to installation and use apisix-java-plugin-runner.

Source: https://apisix.apache.org/zh/docs/java-plugin-runner/installation-guide/

## Overview

This document explains how to install apisix-java-plugin-runner.

Prerequisites
-------------

* JDK 21
* APISIX master branch
* Refer to [Debug](/docs/java-plugin-runner/how-it-works/#debug)  to build the debug environment.

Install
-------

1. Create a simple web application with Spring Boot, and choose Maven as the build tool.

2. Add the apisix-java-plugin-runner dependency in your POM, like:

```xml
<dependency>
    <groupId>org.apache.apisix</groupId> 
    <artifactId>apisix-runner-starter</artifactId>
    <version>0.6.0</version>
</dependency>
```

3. Configuring the scan package path

```xml

```java
@SpringBootApplication(scanBasePackages = {"your-filter's-package-name","org.apache.apisix.plugin.runner"})
```

4. Excluding the default logging framework

To prevent multiple slf4j bindings, exclude the `logback-classic` and `log4j-to-slf4j` in `pom.xml`, like:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <exclusions>
           <exclusion>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-classic</artifactId>
           </exclusion>
           <exclusion>
                <groupId>org.apache.logging.log4j</groupId>
                <artifactId>log4j-to-slf4j</artifactId>
           </exclusion>
    </exclusions>
</dependency>
```

5. Configuring the address for Unix Domain Socket communication with APISIX

```properties
socket.file = /tmp/runner.sock
```

6. Implementing the `PluginFilter` interface

When you write your custom plugins, you need to implement the `PluginFilter` interface and 
inject filters into Spring Boot's object lifecycle management using `@Component`.

code example:

```java
@Component
public class RewriteRequestDemoFilter implements PluginFilter {
  ......
  implementing functions
}
```

You can refer to [Development](/docs/java-plugin-runner/development/) to learn how to write custom plugins.

Demo
-------

A Demo Project that work with apisix-java-plugin-runner and custom filters 
can be found at: [java-plugin-runner-demo](https://github.com/tzssangglass/java-plugin-runner-demo-1).
