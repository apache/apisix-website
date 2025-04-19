"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[55961],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),h=l(n),d=o,k=h["".concat(s,".").concat(d)]||h[d]||u[d]||i;return n?a.createElement(k,r(r({ref:t},p),{},{components:n})):a.createElement(k,r({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=h;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,r[1]=c;for(var l=2;l<i;l++)r[l]=n[l];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},60261:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var a=n(87462),o=(n(67294),n(3905));const i={title:"WebSocket Authentication",keywords:["API Gateway","Apache APISIX","WebSocket","Authentication"],description:"This article is a guide on how to configure authentication for WebSocket connections."},r=void 0,c={unversionedId:"tutorials/websocket-authentication",id:"version-3.10/tutorials/websocket-authentication",isDocsHomePage:!1,title:"WebSocket Authentication",description:"This article is a guide on how to configure authentication for WebSocket connections.",source:"@site/docs-apisix_versioned_docs/version-3.10/tutorials/websocket-authentication.md",sourceDirName:"tutorials",slug:"/tutorials/websocket-authentication",permalink:"/zh/docs/apisix/3.10/tutorials/websocket-authentication",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.10/docs/zh/latest/tutorials/websocket-authentication.md",tags:[],version:"3.10",frontMatter:{title:"WebSocket Authentication",keywords:["API Gateway","Apache APISIX","WebSocket","Authentication"],description:"This article is a guide on how to configure authentication for WebSocket connections."},sidebar:"version-3.10/docs",previous:{title:"\u914d\u7f6e\u5ba2\u6237\u7aef\u4e0e APISIX \u4e4b\u95f4\u7684\u53cc\u5411\u8ba4\u8bc1\uff08mTLS\uff09",permalink:"/zh/docs/apisix/3.10/tutorials/client-to-apisix-mtls"},next:{title:"API Gateway",permalink:"/zh/docs/apisix/3.10/terminology/api-gateway"}},s=[{value:"WebSocket Protocol",id:"websocket-protocol",children:[]},{value:"WebSocket Authentication",id:"websocket-authentication",children:[]},{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Configuring Authentication",id:"configuring-authentication",children:[{value:"Create a Route",id:"create-a-route",children:[]},{value:"Create a Consumer",id:"create-a-consumer",children:[]}]},{value:"Testing the Route",id:"testing-the-route",children:[]}],l={toc:s};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Apache APISIX supports ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/WebSocket"},"WebSocket")," traffic, but the WebSocket protocol doesn't handle authentication. This article guides you on how to configure authentication for WebSocket connections using Apache APISIX."),(0,o.kt)("h2",{id:"websocket-protocol"},"WebSocket Protocol"),(0,o.kt)("p",null,"To establish a WebSocket connection, the client sends a WebSocket handshake request, for which the server returns a WebSocket handshake response as shown below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Client request"',title:'"Client','request"':!0},"GET /chat HTTP/1.1\nHost: server.example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==\nSec-WebSocket-Protocol: chat, superchat\nSec-WebSocket-Version: 13\nOrigin: http://example.com\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Server response"',title:'"Server','response"':!0},"HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=\nSec-WebSocket-Protocol: chat\n")),(0,o.kt)("p",null,"The handshake workflow is shown below:"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/12/06/638eda2e2415f.png",alt:"Websocket Handshake Workflow"})),(0,o.kt)("h2",{id:"websocket-authentication"},"WebSocket Authentication"),(0,o.kt)("p",null,"APISIX supports several authentication methods like ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/basic-auth/"},"basic-auth"),", ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/key-auth/"},"key-auth"),", and ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/jwt-auth/"},"jwt-auth"),"."),(0,o.kt)("p",null,"While establishing connections from the client to server in the ",(0,o.kt)("em",{parentName:"p"},"handshake")," phase, APISIX first checks its authentication information before choosing to forward the request or deny it."),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("p",null,"Before you move on, make sure you have:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"A WebSocket server as the Upstream. This article uses ",(0,o.kt)("a",{parentName:"li",href:"https://blog.postman.com/introducing-postman-websocket-echo-service/"},"Postman's public echo service"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"wss://ws.postman-echo.com/raw"),"."),(0,o.kt)("li",{parentName:"ol"},"APISIX 3.0 installed.")),(0,o.kt)("h2",{id:"configuring-authentication"},"Configuring Authentication"),(0,o.kt)("h3",{id:"create-a-route"},"Create a Route"),(0,o.kt)("p",null,"First we will create a Route to the Upstream echo service."),(0,o.kt)("p",null,"Since the Upstream uses wss protocol, the scheme is set to ",(0,o.kt)("inlineCode",{parentName:"p"},"https"),". We should also set ",(0,o.kt)("inlineCode",{parentName:"p"},"enable_websocket")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,o.kt)("p",null,"In this tutorial, we will use the ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/key-auth/"},"key-auth")," Plugin. This would work similarly for other authentication methods:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'curl --location --request PUT \'http://127.0.0.1:9180/apisix/admin/routes/1\' \\\n--header \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "uri": "/*",\n    "methods": ["GET"],\n    "enable_websocket": true,\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "ws.postman-echo.com:443": 1\n        },\n        "scheme": "https"\n    },\n    "plugins": {\n        "key-auth": {}\n    }\n}\'\n')),(0,o.kt)("h3",{id:"create-a-consumer"},"Create a Consumer"),(0,o.kt)("p",null,"We will now create a ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/consumer/"},"Consumer")," and add a key ",(0,o.kt)("inlineCode",{parentName:"p"},"this_is_the_key"),". A user would now need to use this key configured in the Consumer object to access the API."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'curl --location --request PUT \'http://127.0.0.1:9180/apisix/admin/consumers/jack\' \\\n--header \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "username": "jack",\n    "plugins": {\n        "key-auth": {\n            "key": "this_is_the_key"\n        }\n    }\n}\'\n')),(0,o.kt)("h2",{id:"testing-the-route"},"Testing the Route"),(0,o.kt)("p",null,"Now, if you try to connect ",(0,o.kt)("inlineCode",{parentName:"p"},"ws://127.0.0.1:9080/raw")," without the ",(0,o.kt)("inlineCode",{parentName:"p"},"apikey")," header or an incorrect key, APISIX will return a ",(0,o.kt)("inlineCode",{parentName:"p"},"401 Unauthorized"),"."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/12/06/638ef6db9dd4b.png",alt:"Connect without Key"})),(0,o.kt)("p",null,"To authenticate, you can add the header ",(0,o.kt)("inlineCode",{parentName:"p"},"apikey")," with the value ",(0,o.kt)("inlineCode",{parentName:"p"},"this_is_the_key"),":"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/12/06/638efac7c42b6.png",alt:"Connect with key"})))}p.isMDXComponent=!0}}]);