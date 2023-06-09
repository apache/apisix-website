---
title: gRPC on the client side
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - gPRC
  - Protocol Buffers
  - Spring Boot
  - Solutions Architecture
description: >
  Most inter-systems communication components that use REST serialize their payload in JSON. As of now, JSON lacks a widely-used schema validation standard: JSON Schema is not widespread. Standard schema validation allows delegating the validation to a third-party library and being done with it. Without one, we must fall back to manual validation in the code. Worse, we must keep the validation code in sync with the schema.
  XML has schema validation out-of-the-box: an XML document can declare a grammar that it must conform to. SOAP, being based on XML, benefits from it too.
  Other serialization alternatives have a schema validation option: e.g., Avro, Kryo and Protocol Buffers. Interestingly enough, gRPC uses Protobuf to offer RPC across distributed components:
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/06/08/DOxFlzQc_grpc.svg
---

>Most inter-systems communication components that use REST serialize their payload in JSON. As of now, JSON lacks a widely-used schema validation standard: [JSON Schema](https://json-schema.org/) is not widespread. Standard schema validation allows delegating the validation to a third-party library and being done with it. Without one, we must fall back to manual validation in the code. Worse, we must keep the validation code in sync with the schema.
>
>XML has schema validation out-of-the-box: an XML document can declare a grammar that it must conform to. SOAP, being based on XML, benefits from it too.
>
>Other serialization alternatives have a schema validation option: _e.g._, [Avro](https://avro.apache.org/), [Kryo](https://github.com/EsotericSoftware/kryo) and [Protocol Buffers](https://protobuf.dev/). Interestingly enough, gRPC uses Protobuf to offer RPC across distributed components:

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/grpc-client-side/" />
</head>

>gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.
>
>-- [Why gRPC?](https://grpc.io/)

Moreover, Protocol is a _binary_ serialization mechanism, saving a lot of bandwidth. Thus, gRPC is an excellent option for inter-systems communication. But if all your components talk gRPC, how can simple clients call them? In this post, we will build a gRPC service and show how to call it from curl.

## A simple gRPC service

The [gRPC documentation](https://grpc.io/docs/) is exhaustive, so here's a summary:

* gRPC is a Remote Procedure Call framework
* It works across a wide range of languages
* It relies on Protocol Buffers:

    >Protocol buffers are Google’s language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler. You define how you want your data to be structured once, then you can use special generated source code to easily write and read your structured data to and from a variety of data streams and using a variety of languages.
    >
    >-- [Protocol Buffers](https://protobuf.dev/)

* It's part of the [CNCF](https://www.cncf.io/) portfolio and is currently in the incubation stage

Let's set up our gRPC service. We will use Java, Kotlin, Spring Boot, and a dedicated gRPC Spring Boot integration project. The project structure holds two projects, one for the model and one for the code. Let's start with the model project.

I didn't want something complicated; reusing a simple example is enough: the request sends a string, and the response prefixes it with `Hello`. We design this model in a dedicated Protobuf schema file:

```proto
syntax = "proto3";                                        //1

package ch.frankel.blog.grpc.model;                       //2

option java_multiple_files = true;                        //3
option java_package = "ch.frankel.blog.grpc.model";       //3
option java_outer_classname = "HelloProtos";              //3

service HelloService {                                    //4
    rpc SayHello (HelloRequest) returns (HelloResponse) {
    }
}

message HelloRequest {                                    //5
    string name = 1;                                      //6
}

message HelloResponse {                                   //7
    string message = 1;                                   //6
}
```

1. Protobuf definition version
2. Package
3. Java-specific configuration
4. Service definition
5. Request definition
6. Field definition. First comes the type, then the name, and finally, the order
7. Response definition

We shall use Maven to generate the Java boilerplate code:

```xml
<project>
  <dependencies>
    <dependency>
      <groupId>io.grpc</groupId>                         <!--1-->
      <artifactId>grpc-stub</artifactId>
      <version>${grpc.version}</version>
    </dependency>
    <dependency>
      <groupId>io.grpc</groupId>                         <!--1-->
      <artifactId>grpc-protobuf</artifactId>
      <version>${grpc.version}</version>
    </dependency>
    <dependency>
      <groupId>jakarta.annotation</groupId>              <!--1-->
      <artifactId>jakarta.annotation-api</artifactId>
      <version>1.3.5</version>
      <optional>true</optional>
    </dependency>
  </dependencies>
  <build>
    <extensions>
      <extension>
        <groupId>kr.motd.maven</groupId>                 <!--2-->
        <artifactId>os-maven-plugin</artifactId>
        <version>1.7.1</version>
      </extension>
    </extensions>
    <plugins>
      <plugin>
        <groupId>org.xolstice.maven.plugins</groupId>    <!--3-->
        <artifactId>protobuf-maven-plugin</artifactId>
        <version>${protobuf-plugin.version}</version>
        <configuration>
          <protocArtifact>com.google.protobuf:protoc:${protobuf.version}:exe:${os.detected.classifier}</protocArtifact>
          <pluginId>grpc-java</pluginId>
          <pluginArtifact>io.grpc:protoc-gen-grpc-java:${grpc.version}:exe:${os.detected.classifier}</pluginArtifact>
        </configuration>
        <executions>
          <execution>
            <goals>
              <goal>compile</goal>
              <goal>compile-custom</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
```

1. Compile-time dependencies
2. Sniff information about the Operating System. Used in the next plugin
3. Generate Java code from the `proto` file

After compilation, the structure should look something like the following:

![Proto model project structure](https://static.apiseven.com/uploads/2023/06/08/JkWtxWqP_model.jpeg)

We can package the classes in a JAR and use it in a web app project. The latter is in Kotlin, but only because it's my favourite JVM language.

We only need a specific Spring Boot starter dependency to integrate gRPC endpoints with Spring Boot:

```xml
<dependency>
  <groupId>net.devh</groupId>
  <artifactId>grpc-server-spring-boot-starter</artifactId>
  <version>2.14.0.RELEASE</version>
</dependency>
```

Here's the significant bit:

```java
@GrpcService                                                        //1
class HelloService : HelloServiceImplBase() {                       //2
  override fun sayHello(
      request: HelloRequest,                                        //2
      observer: StreamObserver<HelloResponse>                       //3
  ) {
    with(observer) {
      val reply = HelloResponse.newBuilder()                        //2
                               .setMessage("Hello ${request.name}") //4
                               .build()
      onNext(reply)                                                 //5
      onCompleted()                                                 //5
    }
  }
}
```

1. The `grpc-server-spring-boot-starter` detects the annotation and works its magic
2. Reference classes generated in the above project
3. The method signature allows a `StreamObserver` parameter. The class comes from `grpc-stub.jar`
4. Get the request and prefix it to build the response message
5. Play the events

We can now start the web app with `./mvnw spring-boot:run`.

## Testing the gRPC service

The whole idea behind the post is that accessing the gRPC service with regular tools is impossible. To test, we need a dedicated tool nonetheless. I found [grpcurl](https://github.com/fullstorydev/grpcurl). Let's install it and use it to list available services:

```bash
grpcurl --plaintext localhost:9090 list   #1-2
```

1. List all available gRPC services **without** TLS verification
2. To avoid clashes between gRPC and other channels, _e.g._, REST, Spring Boot uses another port

```
ch.frankel.blog.grpc.model.HelloService   #1
grpc.health.v1.Health                     #2
grpc.reflection.v1alpha.ServerReflection  #2
```

1. The gRPC service we defined
2. Two additional services provided by the custom starter

We can also dive into the structure of the service:

```bash
grpcurl --plaintext localhost:9090 describe ch.frankel.blog.grpc.model.HelloService
```

```
service HelloService {
  rpc SayHello ( .ch.frankel.blog.grpc.model.HelloRequest ) returns ( .ch.frankel.blog.grpc.model.HelloResponse );
}
```

Finally, we can call the service with data:

```bash
grpcurl --plaintext -d '{"name": "John"}' localhost:9090 ch.frankel.blog.grpc.model.HelloService/SayHello
```

```json
{
  "message": "Hello John"
}
```

## Accessing the gRPC service with regular tools

Imagine that we have a regular JavaScript client-side application that needs to access the gRPC service. What would be the alternatives?

The general approach is through `grpc-web`:

>A JavaScript implementation of gRPC for browser clients. For more information, including a quick start, see the gRPC-web documentation.
>
>gRPC-web clients connect to gRPC services via a special proxy; by default, gRPC-web uses Envoy.
>
>In the future, we expect gRPC-web to be supported in language-specific web frameworks for languages such as Python, Java, and Node. For details, see the roadmap.
>
>-- [grpc-web](https://github.com/grpc/grpc-web)

The description states a single limitation: it works only for JavaScript (as of now). However, there's another one. It's pretty intrusive. You need to get the `proto` file, generate boilerplate code, and make your code call it. You must do it for every client type. Worse, if the proto file changes, you need to regenerate the client code in each of them.

An alternative exists, though, if you're using an API Gateway. I'll describe how to do it with [Apache APISIX](https://apisix.apache.org/), but perhaps other gateways can do the same. [grpc-transcode](https://apisix.apache.org/docs/apisix/plugins/grpc-transcode/) is a plugin that allows transcoding REST calls to gRPC and back again.

The first step is to register the proto file in Apache APISIX:

```bash
curl http://localhost:9180/apisix/admin/protos/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d "{ \"content\": \"$(sed 's/"/\\"/g' ../model/src/main/proto/model.proto)\" }"
```

The second step is to create a route with the above plugin:

```bash
curl http://localhost:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/helloservice/sayhello",                           #1
  "plugins": {
    "grpc-transcode": {
      "proto_id": "1",                                       #2
      "service": "ch.frankel.blog.grpc.model.HelloService",  #3
      "method": "SayHello"                                   #4
    }
  },
  "upstream": {
    "scheme": "grpc",
    "nodes": {
      "server:9090": 1
    }
  }
}'
```

1. Define a granular route
2. Reference the proto file defined in the previous command
3. gRPC service
4. gRPC method

At this point, **any client** can make an HTTP request to the defined endpoint. Apache APISIX will transcode the call to gRPC, forward it to the defined service, get the response, and transcode it again.

```bash
curl localhost:9080/helloservice/sayhello?name=John
```

```json
{"message":"Hello John"}
```

Compared to `grpc-web`, the API Gateway approach allows sharing the `proto` file with a single component: the Gateway itself.

## Benefits of transcoding

At this point, we can leverage the capabilities of the API Gateway. Imagine we want a default value if no `name` is passed, _e.g._, `World`. Developers would happily set it in the code, but any change to the value would require a complete build and deployment. Changes can be nearly-instant if we put the default value in the Gateway's routes processing chain. Let's change our route accordingly:

```bash
curl http://localhost:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/helloservice/sayhello",
  "plugins": {
    "grpc-transcode": {
      ...
    },
    "serverless-pre-function": {                    #1
      "phase": "rewrite",                           #2
      "functions" : [
        "return function(conf, ctx)                 #3
          local core = require(\"apisix.core\")
          if not ngx.var.arg_name then
            local uri_args = core.request.get_uri_args(ctx)
            uri_args.name = \"World\"
            ngx.req.set_uri_args(uri_args)
          end
        end"
      ]
    }
  },
  "upstream": {
      ...
  }
}'
```

1. Generic all-purpose plugin when none fits
2. Rewrite the request
3. Magic Lua code that does the trick

Now, we can execute the request with an empty argument and get the expected result:

```bash
curl localhost:9080/helloservice/sayhello?name
```

```json
{"message":"Hello World"}
```

## Conclusion

In this post, we have briefly described gRPC and how it benefits inter-service communication. We developed a simple gRPC service using Spring Boot and `grpc-server-spring-boot-starter`. It comes at a cost, though: regular clients cannot access the service. We had to resort to `grpcurl` to test it. The same goes for clients based on JavaScript - or the browser.

To bypass this limitation, we can leverage an API Gateway. I demoed how to configure Apache APISIX with the `grpc-transcode` plugin to achieve the desired result.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/grpc-apisix).

**To go further:**

* [gRPC](https://grpc.io/)
* [Protocol Buffers](https://protobuf.dev/)
* [os-maven-plugin](https://github.com/trustin/os-maven-plugin)
* [Maven Protocol Buffers Plugin](https://github.com/xolstice/protobuf-maven-plugin)
* [gRPC-Spring-Boot-Starter](https://yidongnan.github.io/grpc-spring-boot-starter/)
* [grpcurl](https://github.com/fullstorydev/grpcurl)
* [Apache APISIX](https://apisix.apache.org)
* [grpc-transcode plugin](https://apisix.apache.org/docs/apisix/plugins/grpc-transcode/)
