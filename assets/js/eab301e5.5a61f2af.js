"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[22477],{35318:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>y});var n=r(27378);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=c(r),y=o,g=m["".concat(u,".").concat(y)]||m[y]||p[y]||a;return r?n.createElement(g,i(i({ref:t},l),{},{components:r})):n.createElement(g,i({ref:t},l))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},81145:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(25773),o=(r(27378),r(35318));const a={title:"API monetization using an API Management and a billing provider",authors:[{name:"Bobur Umurzokov",title:"Author",url:"https://github.com/Boburmirzo",image_url:"https://avatars.githubusercontent.com/u/14247607"}],keywords:["API Gateway","Apache APISIX","Monetization","API","Microservices","Rate limiting","Quota"],description:"\ud83d\udc81\ud83c\udffc This blog post gives you an idea of building your technology stack with an API Gateway and a payment provider that can help you run quickly and securely your API monetization system which simply provides flexibility for your customers.",tags:["Ecosystem"],image:"https://static.apiseven.com/2022/10/25/6357addd22a01.png"},i=void 0,s={permalink:"/blog/2022/09/08/api-monetization-using-stack",source:"@site/blog/2022/09/08/api-monetization-using-stack.md",title:"API monetization using an API Management and a billing provider",description:"\ud83d\udc81\ud83c\udffc This blog post gives you an idea of building your technology stack with an API Gateway and a payment provider that can help you run quickly and securely your API monetization system which simply provides flexibility for your customers.",date:"2022-09-08T00:00:00.000Z",formattedDate:"September 8, 2022",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:8.255,truncated:!0,authors:[{name:"Bobur Umurzokov",title:"Author",url:"https://github.com/Boburmirzo",image_url:"https://avatars.githubusercontent.com/u/14247607",imageURL:"https://avatars.githubusercontent.com/u/14247607"}],prevItem:{title:"Hands-On: Set Up Ingress on Kubernetes With Apache APISIX Ingress Controller",permalink:"/blog/2022/09/09/kubernetes-ingress-with-apisix"},nextItem:{title:"Fault Injection Testing with API Gateway",permalink:"/blog/2022/08/28/fault-injection-testing-with-api-gateway"}},u={authorsImageUrls:[void 0]},c=[],l={toc:c};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\ud83d\udc81\ud83c\udffc This blog post gives you an idea of building your technology stack with an ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/api-gateway/"},"API Gateway")," and a ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/List_of_online_payment_service_providers"},"payment provider")," that can help you run quickly and securely your API monetization system which simply provides flexibility for your customers.")))}p.isMDXComponent=!0}}]);