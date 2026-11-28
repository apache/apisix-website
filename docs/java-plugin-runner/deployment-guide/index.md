# Deployment Guide

Source: https://apisix.apache.org/docs/java-plugin-runner/deployment-guide/

# Overview

This document explains how to support multiple ways to deploy custom plugins.

:::note

This feature is WIP.

:::

### Ship plugin

In your plugin's `pom.xml`, add the following configuration:
```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <classifier>exec</classifier>
            </configuration>
        </plugin>
    </plugins>
</build>
```

The standard Spring Boot executable JAR places all of your application classes inside *BOOT-INF/classes*, 
making it impossible to inject into another project. This config builds an additional non-executable JAR 
that can be used for dependency injection.

Deploy the JARs to Maven Central.

### Using a deployed plugin

To use someone else's plugin, add their plugin's non-executable JAR as a dependency in your project. 
Add the package name of their filters (usually the same as the Group ID) in *scanBasePackages* in your main 
SpringBootApplication class to allow Spring to find the plugin *@Component*.
