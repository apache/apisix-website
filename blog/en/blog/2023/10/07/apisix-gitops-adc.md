---
title: "Embracing GitOps: APISIX's New Feature for Declarative Configuration"
authors:
  - name: Jintao Zhang
    title: Author
    url: https://github.com/tao12345666333
    image_url: https://avatars.githubusercontent.com/u/3264292?v=4
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://avatars.githubusercontent.com/u/114121331?v=4
keywords:
  - Open Source
  - API Gateway
  - Apache APISIX
description: APISIX strengthens its integration with modern development and operational workflows by introducing the declarative configuration tool, ADC.
tags: [Community]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

APISIX strengthens its integration with modern development and operational workflows by introducing the declarative configuration tool, ADC.
<!--truncate-->

With the widespread adoption of cloud-native and microservices, the API gateway has emerged as a critical component for connecting and managing various microservices. However, as the number of services continues to grow and changes occur more frequently, the traditional imperative configuration has become increasingly challenging to manage and maintain. GitOps, on the other hand, is an operational model that leverages version control systems and automated workflows. By supporting declarative configurations, GitOps provides a more efficient, reliable, and traceable mode of operation.

To enhance developing efficiency and operational reliability, APISIX has introduced a new tool that supports GitOps in a declarative manner. By embracing the declarative nature of GitOps, APISIX strengthens its integration with modern development and operational workflows. This integration enables smoother collaboration between developers and operations teams, promoting efficient and reliable management of the APISIX platform.

## Why Does APISIX Support GitOps Declarative Configuration

Although APISIX offers a stand-alone mode that allows configuration through YAML files, it lacks seamless integration with related ecosystems such as CI/CD tools like Jenkins and ArgoCD. While the APISIX Ingress Controller project makes significant strides in this area, APISIX itself does not provide a comprehensive set of declarative tools to support GitOps when used in non-Kubernetes environments such as bare metal or virtual machines.

In traditional API gateway management, configurations and policies are typically manipulated using imperative methods, requiring manual modifications through command-line tools or management interfaces. This approach poses several challenges:

- **Cumbersome Configuration Management**: Manual modifications of configurations are prone to errors, especially when dealing with large-scale gateways.

- **Poor Traceability**: Tracking the change history and version control of configurations becomes difficult.

- **Lack of Consistency**: Configuration discrepancies among multiple environments result in inconsistencies between development, testing, and production environments.

The APISIX development team recognized several benefits of supporting GitOps in a declarative manner to effectively address these challenges:

1. **Improved Developer Efficiency**: By using GitOps with a declarative configuration approach, developers can directly manage API gateway configurations by modifying and committing configuration files in the code repository. This method aligns with the development workflow that developers are familiar with, reducing the learning curve and tool-switching costs, and thus enhancing developer productivity.

2. **Enhanced Operational Reliability**: Storing configuration files in a version control system ensures consistency and reliability. Each configuration change can be traced through its change history, and it becomes easy to roll back to a previous configuration state. This function enables traceability and auditability and reduces the risk of failures caused by human errors.

3. **Streamlined Multi-Environment Management**: Managing different configurations across development, testing, and production environments can be simplified. By utilizing GitOps, it becomes effortless to create different branches or tags for managing configuration files in different environments, ensuring consistency across environments and reducing manual configuration errors.

4. **Facilitated Team Collaboration**: The GitOps workflow promotes collaboration and communication among team members. Developers can actively participate in the development and maintenance of API gateway configurations through practices such as submitting merge requests and code reviews, thereby improving team collaboration efficiency and code quality.

## How Does APISIX Support GitOps Declarative Configuration

### ADC and Its Usage Scenarios and Functions

ADC, APISIX declarative CLI, is a declarative configuration tool for APISIX. It assists users in achieving various integrations in non-Kubernetes environments using a declarative approach.

ADC allows interaction with APISIX instances through the command line and currently provides the following functionalities:

- **Configuration of connection information**: ADC allows the configuration of the address, port, login token, and other details of the APISIX instance to connect to.
- **Configuration validation**: ADC provides the functionality to validate the syntax of APISIX configuration files.
- **Configuration synchronization**: Local configuration files can be synchronized to the APISIX instance using ADC.
- **Configuration export**: ADC enables the export of configuration files from the APISIX instance.
- **Configuration diff comparison**: ADC can compare the differences between the local configuration and the configuration on the APISIX instance.
- **OpenAPI conversion**: ADC can convert OpenAPI specification files into APISIX configuration files.
- **Runtime diagnostics**: ADC supports diagnostic commands such as ping to assist in debugging the connection between ADC and the gateway.

In essence, ADC provides a declarative approach to APISIX configuration and management, eliminating the need for manual calls to the admin API or using tools like the Dashboard. Instead, configuration synchronization can be achieved through simple commands.

## How Does APISIX Use ADC for Declarative Configuration

### Installing APISIX and ADC

Please refer to the [APISIX documentation](https://apisix.apache.org/docs/apisix/getting-started/README/) for installing APISIX. Once APISIX is installed, you can proceed to install the ADC binary to the `$GOPATH/bin` directory using the `go install` command.

```shell
go install github.com/api7/adc@latest
```

Add this line of code to your `$PATH` environment variable:

```shell
export PATH=$PATH:$GOPATH/bin
```

If you don't have Go installed, you can download the latest `adc` binary and add it to your `/bin` folder:

```shell
wget https://github.com/api7/adc/releases/download/v0.2.0/adc_0.2.0_linux_amd64.tar.gz
tar -zxvf adc_0.2.0_linux_amd64.tar.gz
mv adc /usr/local/bin/adc
```

You can find binaries for other operating systems on the [releases page](https://github.com/api7/adc/releases/tag/v0.2.0). In the future, these files will be published on package management tools like Homebrew.

Run the following code to confirm that `adc` has been installed:

```shell
adc --help
```

If everything goes well, you will see a list of available subcommands and using guide.

### Configuring ADC with APISIX Instance

Next, configure the APISIX instance in the ADC.

```shell
adc configure
```

It will prompt you to pass in the APISIX server address ('http://127.0.0.1:9180' if you followed along) and token. If everything is filled in correctly, you can see the following content:

```shell
ADC configured successfully!
Connected to APISIX successfully!
```

You can use the `ping` subcommand to check the APISIX connection at any time:

```shell
adc ping
```

### Validating APISIX Configuration Files

Create a basic APISIX configuration with a route that forwards traffic to upstreams:

```yaml title="config.yaml"
name: "Basic configuration"
version: "1.0.0"
services:
  - name: httpbin-service
    hosts:
      - api7.ai
    upstream:
      name: httpbin
      nodes:
        - host: httpbin.org
          port: 80
          weight: 1
routes:
  - name: httpbin-route
    service_id: httpbin-service
    uri: "/anything"
    methods:
      - GET
```

Once the ADC is connected to the running APISIX instance, you can use it to validate this configuration before applying it by running:

```shell
adc validate -f config.yaml
```

If the configuration is valid, you will receive a response similar to:

```shell
Read configuration file successfully: config name: Basic configuration, version: 1.0.0, routes: 1, services: 1.
Successfully validated configuration file!
```

### Syncing Configuration to APISIX Instance

ADC can now be used to synchronize valid configurations with connected APISIX instances. To do this, run:

```shell
adc sync -f config.yaml
```

This will create a route and a service as we declared in the configuration file:

```shell
creating service: "httpbin-service"
creating route: "httpbin-route"
Summary: created 2, updated 0, deleted 0
```

To verify that the route was created correctly, let's try sending a request:

```shell
curl localhost:9080/anything -H "host:api7.ai"
```

If everything is correct, you will receive a response from [httpbin.org](httpbin.org).

### Comparing Local and Running Configuration

Now, let's update the local configuration in the `config.yaml` file by adding another route:

```yaml title="config.yaml" {20-24}
name: "Basic configuration"
version: "1.0.0"
services:
  - name: httpbin-service
    hosts:
      - api7.ai
    upstream:
      name: httpbin
      nodes:
        - host: httpbin.org
          port: 80
          weight: 1
routes:
  - name: httpbin-route-anything
    service_id: httpbin-service
    uri: "/anything"
    methods:
      - GET
  - name: httpbin-route-ip
    service_id: httpbin-service
    uri: "/ip"
    methods:
      - GET
```

Before synchronizing this configuration with APISIX, ADC allows you to check the differences between it and the existing APISIX configuration. You can run the following operations:

```shell
adc diff -f config.yaml
```

You can see the added and deleted configurations and check the changes before applying the configuration.

### Converting OpenAPI Definitions to APISIX Configurations

ADC also supports the use of [OpenAPI definitions](https://spec.openapis.org/oas/v3.0.0). ADC allows the conversion of OpenAPI format definitions into APISIX configurations.

For example, if you document your API in OpenAPI format like this:

```yaml title="openAPI.yaml"
openapi: 3.0.0
info:
  title: httpbin API
  description: Routes for httpbin API
  version: 1.0.0
servers:
  - url: http://httpbin.org
paths:
  /anything:
    get:
      tags:
        - default
      summary: Returns anything that is passed in the request data
      operationId: getAnything
      parameters:
        - name: host
          in: header
          schema:
            type: string
          example: "{{host}}"
      responses:
        "200":
          description: Successfully return anything
          content:
            application/json: {}
  /ip:
    get:
      tags:
        - default
      summary: Returns the IP address of the requester
      operationId: getIP
      responses:
        "200":
          description: Successfully return IP
          content:
            application/json: {}
```

You can convert this to an APISIX configuration using the subcommand `openapi2apisix` as follows:

```shell
adc openapi2apisix -o config.yaml -f openAPI.yaml
```

This will create a configuration file as shown below:

```yaml title="config.yaml"
name: ""
routes:
- desc: Returns anything that is passed in the request data
  id: ""
  methods:
  - GET
  name: getAnything
  uris:
  - /anything
- desc: Returns the IP address of the requester
  id: ""
  methods:
  - GET
  name: getIP
  uris:
  - /ip
services:
- desc: Routes for httpbin API
  id: ""
  name: httpbin API
  upstream:
    id: ""
    name: ""
    nodes: null
version: ""
```

As you can see, the configuration is incomplete and a lot of configuration still needs to be added manually. We are improving ADC to bridge the gap between OpenAPI definitions and configurations that can be mapped directly to APISIX.

### Tip: Use Autocomplete

ADC offers many functions, and the list of features is sure to grow. To learn how to use any subcommand, you can use the `--help` or `-h` flag, which will display the documentation for that subcommand.

To make it even easier, you can use the `completion` subcommand to generate an autocompletion script for your shell environment. For example, if you are using a zsh shell, you can run:

```shell
adc completion zsh
```

You can then copy and paste the output into your `.zshrc` file and it will start showing hints when you use `adc`.

ADC is still in its infancy and is constantly being improved. To learn more about the project, report a bug, or suggest a feature, visit [github.com/api7/adc](github.com/api7/adc).

## Summary

By using the declarative configuration tool ADC, APISIX provides a more simplified, reliable, and traceable management method, allowing developers to manage and deploy API gateway configurations more efficiently. This new feature brings many benefits to team collaboration, environmental consistency, and configuration management, providing strong support for building reliable cloud-native architectures.

In non-Kubernetes environments, users can seamlessly integrate tools like Jenkins and ArgoCD. They can leverage GitOps' internal CI/CD approach to manage various aspects of APISIX, enabling functions like multi-environment releases.
