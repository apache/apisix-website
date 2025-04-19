"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[85456],{35318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(27378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,h=u["".concat(p,".").concat(m)]||u[m]||g[m]||o;return n?r.createElement(h,i(i({ref:t},c),{},{components:n})):r.createElement(h,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},24772:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(25773),a=(n(27378),n(35318));const o={title:"Integrate Apache APISIX with gRPC-Web",authors:[{name:"Jinchao Shuai",title:"Author",url:"https://github.com/shuaijinchao",image_url:"https://avatars.githubusercontent.com/u/8529452?v=4"},{name:"Yilin Zeng",title:"Technical Writer",url:"https://github.com/yzeng25",image_url:"https://avatars.githubusercontent.com/u/36651058?v=4"}],keywords:["Apache APISIX","gRPC","API Gateway","Ecology"],description:"APISIX has broadened the scope of support for the gRPC ecosystem. This article will introduce details of using the gRPC web protocol request proxy.",tags:["Ecosystem","Plugins"]},i=void 0,l={permalink:"/blog/2022/01/25/apisix-grpc-web-integration",source:"@site/blog/2022/01/25/apisix-grpc-web-integration.md",title:"Integrate Apache APISIX with gRPC-Web",description:"APISIX has broadened the scope of support for the gRPC ecosystem. This article will introduce details of using the gRPC web protocol request proxy.",date:"2022-01-25T00:00:00.000Z",formattedDate:"January 25, 2022",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"},{label:"Plugins",permalink:"/blog/tags/plugins"}],readingTime:5.76,truncated:!0,authors:[{name:"Jinchao Shuai",title:"Author",url:"https://github.com/shuaijinchao",image_url:"https://avatars.githubusercontent.com/u/8529452?v=4",imageURL:"https://avatars.githubusercontent.com/u/8529452?v=4"},{name:"Yilin Zeng",title:"Technical Writer",url:"https://github.com/yzeng25",image_url:"https://avatars.githubusercontent.com/u/36651058?v=4",imageURL:"https://avatars.githubusercontent.com/u/36651058?v=4"}],prevItem:{title:"forward-auth Plugin for Authentication Function",permalink:"/blog/2022/01/26/apisix-integrate-forward-auth-plugin"},nextItem:{title:"Release Apache APISIX 2.12.0",permalink:"/blog/2022/01/25/release-apache-apisix-2.12"}},p={authorsImageUrls:[void 0,void 0]},s=[{value:"gRPC Web Introduction",id:"grpc-web-introduction",children:[],level:2},{value:"Apache APISIX gRPC Web Proxy",id:"apache-apisix-grpc-web-proxy",children:[],level:2},{value:"Configure Protocol Buffer",id:"configure-protocol-buffer",children:[],level:2},{value:"Configure the server-side application",id:"configure-the-server-side-application",children:[],level:2},{value:"Configure client programs",id:"configure-client-programs",children:[],level:2},{value:"Configure Apache APISIX",id:"configure-apache-apisix",children:[],level:2},{value:"Summary",id:"summary",children:[],level:2}],c={toc:s};function g(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Apache APISIX already supports gRPC protocol proxies, as well as HTTP(s) to gRPC Server proxies via the gRPC Transcode plugin. Through active community discussion and contributions, Apache APISIX has broadened the scope of support for the gRPC ecosystem: support for the gRPC Web Protocol Request Proxy.")),(0,a.kt)("h2",{id:"grpc-web-introduction"},"gRPC Web Introduction"),(0,a.kt)("p",null,"Originally developed by Google, gRPC is a high-performance remote procedure call framework implemented on HTTP/2. However, because browsers do not directly expose HTTP/2, Web applications cannot use gRPC directly. gRPC Web is a standardized protocol that solves this problem."),(0,a.kt)("p",null,"The first gRPC-web implementation was released in 2018 as a JavaScript library through which Web applications can communicate directly with the gRPC service. The principle is to create an end-to-end gRPC pipeline compatible with HTTP/1.1 and HTTP/2. The browser then sends a regular HTTP request, and a gRPC-Web proxy located between the browser and the server translates the request and response. Similar to gRPC, gRPC Web uses a predefined contract between the Web client and the back-end gRPC service. protocol Buffers are used to serialize and encode messages."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1643099754071-1f5c3c68-f2bc-4746-95f5-cc083ace554b.png",alt:"how gRPC-web works"})),(0,a.kt)("p",null,"With gRPC Web, users can call back-end gRPC applications directly using a browser or Node client. However, there are some limitations to using gRPC-Web on the browser side to call gRPC services."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Client-side streaming and bi-directional streaming calls are not supported."),(0,a.kt)("li",{parentName:"ul"},"Calling gRPC services across domains requires CORS to be configured on the server side."),(0,a.kt)("li",{parentName:"ul"},"The gRPC server side must be configured to support gRPC-Web, or a third-party service agent must be available to translate the call between the browser and the server.")),(0,a.kt)("h2",{id:"apache-apisix-grpc-web-proxy"},"Apache APISIX gRPC Web Proxy"),(0,a.kt)("p",null,"Apache APISIX supports the proxy of gRPC Web protocol by means of a plug-in, which completes the protocol conversion and data codec work when gRPC Web communicates with gRPC Server in the ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc-web")," plug-in, and its communication process is as follows."),(0,a.kt)("p",null,"gRPC Web Client -> Apache APISIX (protocol conversion & data codec) -> gRPC server"),(0,a.kt)("p",null,"The following is a complete example showing how to build a gRPC Web Client and proxy gRPC Web requests through Apache APISIX. In the following example, we will use Go as the gRPC Server server handler and Node as the gRPC Web client requestor."),(0,a.kt)("h2",{id:"configure-protocol-buffer"},"Configure Protocol Buffer"),(0,a.kt)("p",null,"The first step is to install the Protocol Buffer compiler and related plug-ins."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Install ",(0,a.kt)("inlineCode",{parentName:"p"},"protoc")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"proto-grpc-*"),"."),(0,a.kt)("p",{parentName:"li"},"The Protocol Buffer compiler ",(0,a.kt)("inlineCode",{parentName:"p"},"protoc")," and the ",(0,a.kt)("inlineCode",{parentName:"p"},"protoc-gen-go")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"protoc-gen-grpc-web")," plugins for generating Go, JavaScript, and gRPC web interface code for ",(0,a.kt)("inlineCode",{parentName:"p"},".proto")," need to be installed on your system before writing client and server-side applications."),(0,a.kt)("p",{parentName:"li"},"Please run the following script to install the above components."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'#!/usr/bin/env bash\n\n set -ex\n\n PROTOBUF_VERSION="3.19.0"\n wget https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOBUF_VERSION}/protoc-${PROTOBUF_VERSION}-linux-x86_64.zip\n unzip protoc-${PROTOBUF_VERSION}-linux-x86_64.zip\n mv bin/protoc /usr/local/bin/protoc\n mv include/google /usr/local/include/\n chmod +x /usr/local/bin/protoc\n\n PROTO_GO_PLUGIN_VER="1.2.0"\n wget https://github.com/grpc/grpc-go/releases/download/cmd/protoc-gen-go-grpc/v${PROTO_GO_PLUGIN_VER}/protoc-gen-go-grpc.v${PROTO_GO_PLUGIN_VER}.linux.amd64.tar.gz\n tar -zxvf protoc-gen-go-grpc.v${PROTO_GO_PLUGIN_VER}.linux.amd64.tar.gz\n mv protoc-gen-go-grpc /usr/local/bin/protoc-gen-go\n chmod +x /usr/local/bin/protoc-gen-go\n\n PROTO_JS_PLUGIN_VER="1.3.0"\n wget https://github.com/grpc/grpc-web/releases/download/${PROTO_JS_PLUGIN_VER}/protoc-gen-grpc-web-${PROTO_JS_PLUGIN_VER}-linux-x86_64\n mv protoc-gen-grpc-web-${PROTO_JS_PLUGIN_VER}-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web\n chmod +x /usr/local/bin/protoc-gen-grpc-web\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Create the ",(0,a.kt)("inlineCode",{parentName:"p"},"SayHello")," example ",(0,a.kt)("inlineCode",{parentName:"p"},"proto")," file."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-go"},' // a6/echo.proto\n\n syntax = "proto3";\n\n package a6;\n\n option go_package = "./;a6";\n\n message EchoRequest {\n string message = 1;\n }\n\n message EchoResponse {\n string message = 1;\n }\n\n service EchoService {\n rpc Echo(EchoRequest) returns (EchoResponse);\n }\n')))),(0,a.kt)("h2",{id:"configure-the-server-side-application"},"Configure the server-side application"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Generate server-side Go raw messages and service/client stubs."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"protoc -I./a6 echo.proto --go_out=plugins=grpc:./a6\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Implement the server-side handler interface."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-go"},'// a6/echo.impl.go\n\n package a6\n\n import (\n "errors"\n "golang.org/x/net/context"\n )\n\n type EchoServiceImpl struct {\n }\n\n func (esi *EchoServiceImpl) Echo(ctx context.Context, in *EchoRequest) (*EchoResponse, error) {\n if len(in.Message) <= 0 {\n     return nil, errors.New("message invalid")\n }\n return &EchoResponse{Message: "response: " + in.Message}, nil\n }\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"The server-side application runtime entry file."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-go"},'// server.go\n package main\n\n import (\n "fmt"\n "log"\n "net"\n\n "apisix.apache.org/example/a6"\n "google.golang.org/grpc"\n )\n\n func main() {\n lis, err := net.Listen("tcp", fmt.Sprintf(":%d", 50001))\n if err != nil {\n     log.Fatalf("failed to listen: %v", err)\n }\n\n grpcServer := grpc.NewServer()\n a6.RegisterEchoServiceServer(grpcServer, &a6.EchoServiceImpl{})\n\n if err = grpcServer.Serve(lis); err != nil {\n     log.Fatalf("failed to serve: %s", err)\n }\n }\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Compile and start the server-side service."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"go build -o grpc-server server.go\n./grpc-server\n")))),(0,a.kt)("h2",{id:"configure-client-programs"},"Configure client programs"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Generate client-side ",(0,a.kt)("inlineCode",{parentName:"p"},"proto")," code."),(0,a.kt)("p",{parentName:"li"}," Generate client-side JavaScript raw messages, service/client stubs and interface code for gRPC Web's JavaScript."),(0,a.kt)("p",{parentName:"li"}," The ",(0,a.kt)("inlineCode",{parentName:"p"},"proto")," plugin for gRPC Web provides two modes of code generation."),(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"mode=grpcwebtext: The default generated code sends the payload in grpc-web-text format.")),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Content-type: application/grpc-web-text"),(0,a.kt)("li",{parentName:"ul"},"Payload uses base64 encoding"),(0,a.kt)("li",{parentName:"ul"},"Supports monadic and server streaming calls")),(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"mode=grpcweb: send payload in binary protobuf format.")),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Content-type: application/grpc-web+proto"),(0,a.kt)("li",{parentName:"ul"},"Payload is in binary protobuf format"),(0,a.kt)("li",{parentName:"ul"},"Currently only monadic calls are supported")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ protoc -I=./a6 echo.proto --js_out=import_style=commonjs:./a6 --grpc-web_out=import_style=commonjs,mode=grpcweb:./a6\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Installing client-side dependencies."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ npm i grpc-web\n$ npm i google-protobuf\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Execute entry file on client-side."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"// client.js\nconst {EchoRequest} = require('./a6/echo_pb');\nconst {EchoServiceClient} = require('./a6/echo_grpc_web_pb');\n// connect to  the entrance of Apache APISIX\nlet echoService = new EchoServiceClient('http://127.0.0.1:9080');\n\nlet request = new EchoRequest();\nrequest.setMessage(\"hello\")\n\nechoService.echo(request, {}, function (err, response) {\n    if (err) {\n         console.log(err.code);\n         console.log(err.message);\n     } else {\n         console.log(response.getMessage());\n     }\n });\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Final project structure"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ tree .\n \u251c\u2500\u2500 a6\n \u2502   \u251c\u2500\u2500 echo.impl.go\n \u2502   \u251c\u2500\u2500 echo.pb.go\n \u2502   \u251c\u2500\u2500 echo.proto\n \u2502   \u251c\u2500\u2500 echo_grpc_web_pb.js\n \u2502   \u2514\u2500\u2500 echo_pb.js\n \u251c\u2500\u2500 client.js\n \u251c\u2500\u2500 server.go\n \u251c\u2500\u2500 go.mod\n \u251c\u2500\u2500 go.sum\n \u251c\u2500\u2500 package.json\n \u2514\u2500\u2500 package-lock.json\n")))),(0,a.kt)("p",null,"After completing the above steps, you have configured the gRPC Server server application and the gRPC Web client application, and started the server application, which will receive requests on port ",(0,a.kt)("inlineCode",{parentName:"p"},"50001"),"."),(0,a.kt)("h2",{id:"configure-apache-apisix"},"Configure Apache APISIX"),(0,a.kt)("p",null,"Next, simply enable the ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc-web")," plugin in the Apache APISIX routing plugin configuration to proxy gRPC web requests."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Enable the ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc-web")," proxy plugin."),(0,a.kt)("p",{parentName:"li"},"Routing must use ",(0,a.kt)("strong",{parentName:"p"},"prefix matching")," (e.g., ",(0,a.kt)("inlineCode",{parentName:"p"},"/* or /grpc/example/*"),"), because the gRPC web client passes the package name, service interface name, method name, etc. declared in ",(0,a.kt)("inlineCode",{parentName:"p"},"proto")," in the URI (e.g., ",(0,a.kt)("inlineCode",{parentName:"p"},"/path/a6.EchoService/Echo"),"), ",(0,a.kt)("strong",{parentName:"p"},"using absolute match will prevent the plugin from extracting ",(0,a.kt)("inlineCode",{parentName:"strong"},"proto")," information from the URI"),"."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n {\n     "uri":"/*", // prefix matching mode\n     "plugins":{\n         "grpc-web":{} // enable gRPC Web plugin\n     },\n     "upstream":{\n         "scheme":"grpc",\n         "type":"roundrobin",\n         "nodes":{\n             "127.0.0.1:50001":1 // gRPC Server Listen \u5730\u5740\u548c\u7aef\u53e3\n         }\n     }\n }\'\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Validate gRPC Web Proxy Requests."),(0,a.kt)("p",{parentName:"li"},"The gRPC Web protocol request can be sent to Apache APISIX by executing ",(0,a.kt)("inlineCode",{parentName:"p"},"client.js")," from Node."),(0,a.kt)("p",{parentName:"li"},"The above client-side and server-side processing logic are respectively: the client sends a message to the server with the content ",(0,a.kt)("inlineCode",{parentName:"p"},"hello"),", the server receives the message and responds with ",(0,a.kt)("inlineCode",{parentName:"p"},"response: hello"),", and the execution result is as follows."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ node client.js\nresponse: hello\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Disable the ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc-web")," proxy plugin."),(0,a.kt)("p",{parentName:"li"},"Simply remove the grpc-web attribute from the routing plugin configuration."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n {\n     "uri":"/*",\n     "plugins":{\n     },\n     "upstream":{\n         "scheme":"grpc",\n         "type":"roundrobin",\n         "nodes":{\n             "127.0.0.1:50001":1\n         }\n     }\n }\'\n')))),(0,a.kt)("h2",{id:"summary"},"Summary"),(0,a.kt)("p",null,"This article brings you hands-on experience about using ",(0,a.kt)("inlineCode",{parentName:"p"},"grpc-web")," in Apache APISIX."),(0,a.kt)("p",null,"Feel free to start a discussion in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/discussions"},"GitHub Discussions")," or communicate via the ",(0,a.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/docs/general/join"},"mailing list"),"."))}g.isMDXComponent=!0}}]);