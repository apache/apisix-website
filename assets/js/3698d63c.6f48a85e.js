"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[46779],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>h});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=l(a),h=r,d=m["".concat(p,".").concat(h)]||m[h]||c[h]||i;return a?n.createElement(d,s(s({ref:t},u),{},{components:a})):n.createElement(d,s({ref:t},u))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,s=new Array(i);s[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var l=2;l<i;l++)s[l]=a[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},8741:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(87462),r=(a(67294),a(3905));const i={title:"Manage API Consumers",keywords:["API Gateway","Apache APISIX","Rate Limit","Consumer","Consumer Group"],description:"This tutorial explains how to manage your single or multiple API consumers with Apache APISIX."},s=void 0,o={unversionedId:"tutorials/manage-api-consumers",id:"version-3.10/tutorials/manage-api-consumers",isDocsHomePage:!1,title:"Manage API Consumers",description:"This tutorial explains how to manage your single or multiple API consumers with Apache APISIX.",source:"@site/docs-apisix_versioned_docs/version-3.10/tutorials/manage-api-consumers.md",sourceDirName:"tutorials",slug:"/tutorials/manage-api-consumers",permalink:"/docs/apisix/3.10/tutorials/manage-api-consumers",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.10/docs/en/latest/tutorials/manage-api-consumers.md",tags:[],version:"3.10",frontMatter:{title:"Manage API Consumers",keywords:["API Gateway","Apache APISIX","Rate Limit","Consumer","Consumer Group"],description:"This tutorial explains how to manage your single or multiple API consumers with Apache APISIX."},sidebar:"version-3.10/docs",previous:{title:"Monitor API Health Check with Prometheus",permalink:"/docs/apisix/3.10/tutorials/monitor-api-health-check"},next:{title:"Cache API responses",permalink:"/docs/apisix/3.10/tutorials/cache-api-responses"}},p=[{value:"API Consumers",id:"api-consumers",children:[]},{value:"Apache APISIX Consumers",id:"apache-apisix-consumers",children:[]},{value:"Apache APISIX Consumer example",id:"apache-apisix-consumer-example",children:[{value:"Enable rate-limiting for a single consumer",id:"enable-rate-limiting-for-a-single-consumer",children:[]},{value:"Enable rate-limiting for consumer groups",id:"enable-rate-limiting-for-consumer-groups",children:[]}]},{value:"More Tutorials",id:"more-tutorials",children:[]}],l={toc:p};function u(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This tutorial explains how to manage your single or multiple API consumers with Apache APISIX."),(0,r.kt)("p",null,"Nowadays ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/API"},"APIs")," connect multiple systems, internal services, and third-party applications easily and securely. ",(0,r.kt)("em",{parentName:"p"},"API consumers")," are probably the most important stakeholders for API providers because they interact the most with the APIs and the developer portal. This post explains how to manage your single or multiple API consumers with an open-source API Management solution such as ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/"},"Apache APISIX"),"."),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/11/29/6385b565b4c11.png",alt:"Manage API Consumers"})),(0,r.kt)("h2",{id:"api-consumers"},"API Consumers"),(0,r.kt)("p",null,"API consumers use an API without integrating it into an APP developed for it. In other words, API consumers are ",(0,r.kt)("em",{parentName:"p"},"the users of APIs"),". This means, for example, a marketing department uses a ",(0,r.kt)("a",{parentName:"p",href:"https://developers.facebook.com/docs/"},"Facebook API")," to analyze social media responses to specific actions. It does this with individual, irregular requests to the API provided, as needed."),(0,r.kt)("p",null,"An ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/API_management"},"API Management")," solution should know who the consumer of the API is to configure different rules for different consumers."),(0,r.kt)("h2",{id:"apache-apisix-consumers"},"Apache APISIX Consumers"),(0,r.kt)("p",null,"In Apache APISIX, the ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/consumer/"},"Consumer object")," is the most common way for API consumers to access APIs published through its ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/api-gateway/"},"API Gateway"),". Consumer concept is extremely useful when you have different consumers requesting the same API and you need to execute various ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/plugin/"},"Plugins")," and ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/upstream/"},"Upstream")," configurations based on the consumer."),(0,r.kt)("p",null,"By publishing APIs through ",(0,r.kt)("strong",{parentName:"p"},"Apache APISIX API Gateway"),", you can easily secure API access using consumer keys or sometimes it can be referred to as subscription keys. Developers who need to consume the published APIs must include a valid subscription key in ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP")," requests when calling those APIs. Without a valid subscription key, the calls are rejected immediately by the API gateway and not forwarded to the back-end services."),(0,r.kt)("p",null,"Consumers can be associated with various scopes: per Plugin, all APIs, or an individual API. There are many use cases for consumer objects in the API Gateway that you get with the combination of its plugins:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Enable different authentication methods for different consumers. It can be useful when consumers are trying to access the API by using various authentication mechanisms such as ",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/plugins/key-auth/"},"API key"),", ",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/plugins/basic-auth/"},"Basic"),", or ",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/plugins/jwt-auth/"},"JWT"),"-based auth."),(0,r.kt)("li",{parentName:"ol"},"Restrict access to API resources for specific consumers."),(0,r.kt)("li",{parentName:"ol"},"Route requests to the corresponding backend service based on the consumer."),(0,r.kt)("li",{parentName:"ol"},"Define rate limiting on the number of data clients can consume."),(0,r.kt)("li",{parentName:"ol"},"Analyze data usage for an individual and a subset of consumers.")),(0,r.kt)("h2",{id:"apache-apisix-consumer-example"},"Apache APISIX Consumer example"),(0,r.kt)("p",null,"Let's look at some examples of configuring the rate-limiting policy for a single consumer and a group of consumers with the help of ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/key-auth/"},"key-auth")," authentication key (API Key) and ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/limit-count/"},"limit-count")," plugins. For the demo case,  we can leverage ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Boburmirzo/apisix-api-consumers-management"},"the sample project")," built on ",(0,r.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-7.0"},"ASP.NET Core WEB API")," with a single ",(0,r.kt)("inlineCode",{parentName:"p"},"GET")," endpoint (retrieves all products list). You can find in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Boburmirzo/apisix-api-consumers-management#readme"},"README file")," all instructions on how to run the sample app."),(0,r.kt)("h3",{id:"enable-rate-limiting-for-a-single-consumer"},"Enable rate-limiting for a single consumer"),(0,r.kt)("p",null,"Up to now, I assume that the sample project is up and running. To use consumer object along with the other two plugins we need to follow easy steps:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Create a new Consumer."),(0,r.kt)("li",{parentName:"ul"},"Specify the authentication plugin key-auth and limit count for the consumer."),(0,r.kt)("li",{parentName:"ul"},"Create a new Route, and set a routing rule (If necessary)."),(0,r.kt)("li",{parentName:"ul"},"Enable key-auth plugin configuration for the created route.")),(0,r.kt)("p",null,"The above steps can be achieved by running simple two ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/CURL"},"curl commands")," against APISIX ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/admin-api/"},"Admin API"),"."),(0,r.kt)("p",null,"The first ",(0,r.kt)("inlineCode",{parentName:"p"},"cmd")," creates a ",(0,r.kt)("strong",{parentName:"p"},"new Consumer")," with API Key based authentication enabled where the API consumer can only make 2 requests against the Product API within 60 seconds."),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n   "username":"consumer1",\n   "plugins":{\n      "key-auth":{\n         "key":"auth-one"\n      },\n      "limit-count":{\n         "count":2,\n         "time_window":60,\n         "rejected_code":403,\n         "rejected_msg":"Requests are too many, please try again later or upgrade your subscription plan.",\n         "key":"remote_addr"\n      }\n   }\n}\'\n')),(0,r.kt)("p",null,"Then, we define our ",(0,r.kt)("strong",{parentName:"p"},"new Route and Upstream")," so that all incoming requests to the gateway endpoint ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/products")," will be forwarded to our example product backend service after a successful authentication process."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n  "name": "Route for consumer request rate limiting",\n  "methods": [\n    "GET"\n  ],\n  "uri": "/api/products",\n    "plugins": {\n        "key-auth": {}\n    },\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "productapi:80": 1\n    }\n  }\n}\'\n')),(0,r.kt)("p",null,"Apache APISIX will handle the first two requests as usual, but a third request in the same period will return a ",(0,r.kt)("inlineCode",{parentName:"p"},"403")," HTTP code."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/api/products -H 'apikey: auth-one' -i\n")),(0,r.kt)("p",null,"Sample output after calling the API 3 times within 60 sec:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 403 Forbidden\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/2.13.1\n\n{"error_msg":"Requests are too many, please try again later or upgrade your subscription plan."}\n')),(0,r.kt)("p",null,"Indeed, after reaching the threshold, the subsequent requests are not allowed by APISIX."),(0,r.kt)("h3",{id:"enable-rate-limiting-for-consumer-groups"},"Enable rate-limiting for consumer groups"),(0,r.kt)("p",null,"In Apache APISIX, ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/consumer-group/"},"Consumer group")," object is used to manage the visibility of backend services to developers. Backend services are first made visible to groups, and then developers in those groups can view and subscribe to the products that are associated with the groups."),(0,r.kt)("p",null,"With consumer groups, you can specify any number of rate-limiting tiers and apply them to a group of consumers, instead of managing each consumer individually."),(0,r.kt)("p",null,"Typical scenarios can be different pricing models for your API Monetization like API Consumers with the basic plan are allowed to make 50 API calls per minute or in another use case, you can enable specific APIs for Admins, Developers, and Guests based on their roles in the system."),(0,r.kt)("p",null,"You can create, update, delete and manage your groups using the Apache APISIX Admin REST API ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/admin-api/#consumer-group"},"Consumer Group entity"),"."),(0,r.kt)("h4",{id:"consumer-groups-example"},"Consumer groups example"),(0,r.kt)("p",null,"For the sake of the demo, let\u2019s create two consumer groups for the basic and premium plans respectively. We can add one or two consumers for each group and control the traffic from consumer groups with the help of the ",(0,r.kt)("inlineCode",{parentName:"p"},"rate-limiting")," plugin."),(0,r.kt)("p",null,"To use consumer groups with rate limiting, you need to:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Create one or more consumer groups with a limit-count plugin enabled."),(0,r.kt)("li",{parentName:"ul"},"Create consumers and assign consumers to groups.")),(0,r.kt)("p",null,"Below two curl cmds create consumer groups named ",(0,r.kt)("inlineCode",{parentName:"p"},"basic_plan")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"premium_plan"),":"),(0,r.kt)("p",null,"Create a Consumer Group Basic Plan."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumer_groups/basic_plan -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "limit-count": {\n            "count": 2,\n            "time_window": 60,\n            "rejected_code": 403,\n            "group": "basic_plan"\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"Create a Consumer Group Premium Plan."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumer_groups/premium_plan -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "limit-count": {\n            "count": 200,\n            "time_window": 60,\n            "rejected_code": 403,\n            "group": "premium_plan"\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"In the above steps, we set up the rate limiting config for Basic plan to have only 2 requests per 60secs, and the Premium plan has 200 allowed API requests within the the same time window."),(0,r.kt)("p",null,"Create and add first consumer to the Basic group."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "consumer1",\n    "plugins": {\n        "key-auth": {\n            "key": "auth-one"\n        }\n    },\n    "group_id": "basic_plan"\n}\'\n')),(0,r.kt)("p",null,"Create and add second consumer to the Premium group."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "consumer2",\n    "plugins": {\n        "key-auth": {\n            "key": "auth-two"\n        }\n    },\n    "group_id": "premium_plan"\n}\'\n')),(0,r.kt)("p",null,"Create and add third consumer to the Premium group."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "consumer3",\n    "plugins": {\n        "key-auth": {\n            "key": "auth-three"\n        }\n    },\n    "group_id": "premium_plan"\n}\'\n')),(0,r.kt)("p",null,"Afterward, we can easily check that the first consumer ",(0,r.kt)("inlineCode",{parentName:"p"},"Consumer1")," in the Basic Plan group will get a ",(0,r.kt)("inlineCode",{parentName:"p"},"403 HTTP status error")," after hitting the 2 API calls per a minute, while the other two consumers in the Premium Plan group can request as many times as until they reach the limit."),(0,r.kt)("p",null,"You can run below cmds by changing auth key for each consumer in the request header:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/api/products -H 'apikey: auth-one'\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/api/products -H 'apikey: auth-two'\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/api/products -H 'apikey: auth-three'\n")),(0,r.kt)("p",null,"Note that you can also add or remove a consumer from any consumer group and enable other built-in plugins."),(0,r.kt)("h2",{id:"more-tutorials"},"More Tutorials"),(0,r.kt)("p",null,"Read our other ",(0,r.kt)("a",{parentName:"p",href:"/docs/apisix/3.10/tutorials/expose-api"},"tutorials")," to learn more about API Management."))}u.isMDXComponent=!0}}]);