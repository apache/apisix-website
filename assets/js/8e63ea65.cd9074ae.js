"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[95806],{35318:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var r=a(27378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),l=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),h=l(a),m=n,d=h["".concat(s,".").concat(m)]||h[m]||u[m]||i;return a?r.createElement(d,o(o({ref:t},c),{},{components:a})):r.createElement(d,o({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=h;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:n,o[1]=p;for(var l=2;l<i;l++)o[l]=a[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}h.displayName="MDXCreateElement"},61243:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=a(25773),n=(a(27378),a(35318));const i={title:"Biweekly Report (Sep 13 - Sep 30)",keywords:["Apache APISIX","Community Weekly","APISIX","API Gateway","Contributor"],description:"The cloud native API gateway Apache APISIX has added functions related to stream_route, debug mode, and hmac-auth plugin in the past two weeks.",tags:["Community"]},o=void 0,p={permalink:"/blog/2021/09/30/weekly-report",source:"@site/blog/2021/09/30/weekly-report.md",title:"Biweekly Report (Sep 13 - Sep 30)",description:"The cloud native API gateway Apache APISIX has added functions related to stream_route, debug mode, and hmac-auth plugin in the past two weeks.",date:"2021-09-30T00:00:00.000Z",formattedDate:"September 30, 2021",tags:[{label:"Community",permalink:"/blog/tags/community"}],readingTime:2.44,truncated:!0,authors:[],prevItem:{title:"Apache APISIX community members help openEuler release first innovation version",permalink:"/blog/2021/10/01/openeuler"},nextItem:{title:"Release Apache APISIX 2.10.0",permalink:"/blog/2021/09/29/release-apache-apisix-2.10"}},s={authorsImageUrls:[]},l=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"Contributor statistics",id:"contributor-statistics",children:[],level:2},{value:"Good first issue",id:"good-first-issue",children:[{value:"Issue #5080",id:"issue-5080",children:[],level:3},{value:"Issue #5108",id:"issue-5108",children:[],level:3}],level:2},{value:"Feature highlights of the week",id:"feature-highlights-of-the-week",children:[],level:2},{value:"Recommended blog posts for this week",id:"recommended-blog-posts-for-this-week",children:[],level:2}],c={toc:l};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"From 9.13 to 9.30, 32 developers have committed 93 commits to Apache APISIX. Thank you to these folks for making the Apache APISIX project better with your selfless efforts!")),(0,n.kt)("h2",{id:"introduction"},"Introduction"),(0,n.kt)("p",null,"Apache APISIX has grown as a community since the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements could not have been achieved without the joint efforts of our community partners."),(0,n.kt)("p",null,'"The Apache APISIX Community Weekly Newsletter hopes to help community members better grasp the weekly progress of the Apache APISIX community and facilitate your participation in the Apache APISIX community.'),(0,n.kt)("p",null,"We've also put together some issues for those new to the community!"),(0,n.kt)("h2",{id:"contributor-statistics"},"Contributor statistics"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1632907894918-c455f40e-a175-4944-8fac-11c590d43786.jpg",alt:"This week's contributor list"})),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1632908362102-b0b665e2-f37f-4a82-b8a3-68914925b565.jpg",alt:"New contributors this week"})),(0,n.kt)("h2",{id:"good-first-issue"},"Good first issue"),(0,n.kt)("h3",{id:"issue-5080"},"Issue #5080"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Link"),": ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/5080"},"https://github.com/apache/apisix/issues/5080")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Problem Description"),": Previously the upstream service used IP authentication and the actual client IP was obtained from the x-forwarded-for request header. Now I need to change to gateway HMAC authentication, so I need to block upstream IP authentication through the gateway. Tried to modify x-forwarded-for via the proxy rewrite plugin, but it did not work: !"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1632799650125-14edb988-f2ad-434d-8d13-04ff3016eb5a.png",alt:"Screenshot of problem description"})),(0,n.kt)("h3",{id:"issue-5108"},"Issue #5108"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Link"),": ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/5108"},"https://github.com/apache/apisix/issues/5108")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"problem description"),': as follows, when enabling the request validation plugin on a route:" delete "'),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/35 -H \'X-API-KEY: xxxxxxxxxxxxxxxxxxx\' -X PUT -d \'\n{\n    "uri":"/products/create",\n    "plugins":{\n        "request-validation":{\n            "body_schema":{\n                "type": "object",\n                "required":[\n                    "productName",\n                    "price"\n                ],\n                "properties":{\n                    "productName":{\n                        "type": "string"\n                    },\n                    "price":{\n                        "type": "number"\n                    }\n                }\n            }\n        }\n    },\n    "upstream":{\n        "service_name": "PRODUCTSSERVICE",\n        "type": "roundrobin",\n        "discovery_type": "eureka"\n    }\n}\'\n')),(0,n.kt)("p",null,"Test it with the following command:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/products/create -X POST -d \'{"product-Name":"Laptop","pri-ce":12345.00}\'\n')),(0,n.kt)("p",null,"Get the following default message."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},'property "price" is required\n')),(0,n.kt)("h2",{id:"feature-highlights-of-the-week"},"Feature highlights of the week"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/5012"},"debug-mode support for dynamic request filtering")," (contributor: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/tzssangglass"},"tzssangglass"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/5068"},"support for injecting logic into APISIX methods")," (contributor: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/spacewander"},"spacewander"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/4980"},"stream_route support for using CIDR in IP matching")," (Contributed by ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/Zheaoli"},"Zheaoli"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/5038"},"hmac-auth support for checksum request bodies")," (Contributed by ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/arthur-zhang"},"arthur-zhang"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/pull/685"},"APISIX Ingress controller integrates with cert-manager, so users can manage TLS certificates more easily and use it with APISIX Ingress")," (Contributed by ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/lingsamuel"},"lingsamuel"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard/pull/1946"},"- APISIX Dashboard supports multiple profiles")," (contributor: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/bzp2010"},"bzp2010"),")"))),(0,n.kt)("h2",{id:"recommended-blog-posts-for-this-week"},"Recommended blog posts for this week"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"http://apisix.apache.org/blog/2021/09/16/tencent-cloud"},"Apache APISIX Implementation Practice in Tencent Cloud Smart Titanium Platform"),"."),(0,n.kt)("p",{parentName:"li"},"This article introduces the enterprise case of using Apache APISIX in Tencent Cloud Intelligent Titanium Platform, and the specific example of using Apache APISIX as a product traffic gateway.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"http://apisix.apache.org/blog/2021/09/07/how-to-use-apisix-auth"},"Using Apache APISIX for Centralized Authentication and Advanced Play")),(0,n.kt)("p",{parentName:"li"},"This article introduces the authentication function of Apache APISIX, in terms of importance and playful usage, with detailed introduction and detailed usage.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"http://apisix.apache.org/blog/2021/09/07/iQIYI-usercase"},"Apache APISIX-based, iQiyi API gateway update and landing practice")),(0,n.kt)("p",{parentName:"li"},"By reading this article, you can learn how based on Apache APISIX gateway, the iQiYi technical team has updated and integrated the company's architecture to create a new gateway service."))))}u.isMDXComponent=!0}}]);