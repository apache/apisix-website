"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[12190],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>y});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=r.createContext({}),l=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(a),y=n,f=d["".concat(c,".").concat(y)]||d[y]||p[y]||o;return a?r.createElement(f,i(i({ref:t},u),{},{components:a})):r.createElement(f,i({ref:t},u))}));function y(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},72579:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=a(87462),n=(a(67294),a(3905));const o={title:"API Gateway",keywords:["Apache APISIX","API Gateway","Gateway"],description:"This article mainly introduces the role of the API gateway and why it is needed."},i=void 0,s={unversionedId:"terminology/api-gateway",id:"version-3.11/terminology/api-gateway",isDocsHomePage:!1,title:"API Gateway",description:"This article mainly introduces the role of the API gateway and why it is needed.",source:"@site/docs-apisix_versioned_docs/version-3.11/terminology/api-gateway.md",sourceDirName:"terminology",slug:"/terminology/api-gateway",permalink:"/docs/apisix/3.11/terminology/api-gateway",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/terminology/api-gateway.md",tags:[],version:"3.11",frontMatter:{title:"API Gateway",keywords:["Apache APISIX","API Gateway","Gateway"],description:"This article mainly introduces the role of the API gateway and why it is needed."},sidebar:"version-3.11/docs",previous:{title:"WebSocket Authentication",permalink:"/docs/apisix/3.11/tutorials/websocket-authentication"},next:{title:"Consumer",permalink:"/docs/apisix/3.11/terminology/consumer"}},c=[{value:"Description",id:"description",children:[]},{value:"Why use an API gateway?",id:"why-use-an-api-gateway",children:[]}],l={toc:c};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"description"},"Description"),(0,n.kt)("p",null,"An API gateway is a software pattern that sits in front of an application programming interface (API) or group of microservices, to facilitate requests and delivery of data and services. Its primary role is to act as a single entry point and standardized process for interactions between an organization's apps, data, and services and internal and external customers. The API gateway can also perform various other functions to support and manage API usage, from authentication to rate limiting to analytics."),(0,n.kt)("p",null,"An API gateway also acts as a gateway between the API and the underlying infrastructure. It can be used to route requests to different backends, such as a load balancer, or route requests to different services based on the request headers."),(0,n.kt)("h2",{id:"why-use-an-api-gateway"},"Why use an API gateway?"),(0,n.kt)("p",null,"An API gateway comes with a lot of benefits over a traditional API microservice. The following are some of the benefits:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"It is a single entry point for all API requests."),(0,n.kt)("li",{parentName:"ul"},"It can be used to route requests to different backends, such as a load balancer, or route requests to different services based on the request headers."),(0,n.kt)("li",{parentName:"ul"},"It can be used to perform authentication, authorization, and rate-limiting."),(0,n.kt)("li",{parentName:"ul"},"It can be used to support analytics, such as monitoring, logging, and tracing."),(0,n.kt)("li",{parentName:"ul"},"It can protect the API from malicious attack vectors such as SQL injections, DDOS attacks, and XSS."),(0,n.kt)("li",{parentName:"ul"},"It decreases the complexity of the API and microservices.")))}u.isMDXComponent=!0}}]);