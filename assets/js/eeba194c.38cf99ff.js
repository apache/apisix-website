"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[14016],{35318:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(27378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=u(r),m=a,g=h["".concat(p,".").concat(m)]||h[m]||s[m]||i;return r?n.createElement(g,o(o({ref:t},c),{},{components:r})):n.createElement(g,o({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=h;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},52876:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var n=r(25773),a=(r(27378),r(35318));const i={title:"Release Apache APISIX 3.9.1",authors:[{name:"Yuansheng Wang",title:"Author",url:"https://github.com/membphis",image_url:"https://github.com/membphis.png"},{name:"Traky Deng",title:"Technical Writer",url:"https://github.com/kayx23",image_url:"https://github.com/kayx23.png"}],keywords:["Apache APISIX","API Gateway","API Management Platform","New Release","Cloud Native"],description:"The Apache APISIX 3.9.1 version is released on April 29, 2024. This release includes a bug fix.",tags:["Community"]},o=void 0,l={permalink:"/blog/2024/04/29/release-apache-apisix-3.9.1",source:"@site/blog/2024/04/29/release-apache-apisix-3.9.1.md",title:"Release Apache APISIX 3.9.1",description:"The Apache APISIX 3.9.1 version is released on April 29, 2024. This release includes a bug fix.",date:"2024-04-29T00:00:00.000Z",formattedDate:"April 29, 2024",tags:[{label:"Community",permalink:"/blog/tags/community"}],readingTime:.485,truncated:!0,authors:[{name:"Yuansheng Wang",title:"Author",url:"https://github.com/membphis",image_url:"https://github.com/membphis.png",imageURL:"https://github.com/membphis.png"},{name:"Traky Deng",title:"Technical Writer",url:"https://github.com/kayx23",image_url:"https://github.com/kayx23.png",imageURL:"https://github.com/kayx23.png"}],prevItem:{title:"Release Apache APISIX 3.8.1",permalink:"/blog/2024/04/29/release-apache-apisix-3.8.1"},nextItem:{title:"Implementing the Idempotency-Key specification on Apache APISIX",permalink:"/blog/2024/04/11/implement-idempotency-key-apisix"}},p={authorsImageUrls:[void 0,void 0]},u=[{value:"Bug Fix",id:"bug-fix",children:[{value:"Fix <code>forward-auth</code> plugin timeout",id:"fix-forward-auth-plugin-timeout",children:[],level:3}],level:2},{value:"Changelog",id:"changelog",children:[],level:2}],c={toc:u};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"We are glad to release Apache APISIX 3.9.1 with a bug fix to improve user experiences."),(0,a.kt)("h2",{id:"bug-fix"},"Bug Fix"),(0,a.kt)("h3",{id:"fix-forward-auth-plugin-timeout"},"Fix ",(0,a.kt)("inlineCode",{parentName:"h3"},"forward-auth")," plugin timeout"),(0,a.kt)("p",null,"Fix ",(0,a.kt)("inlineCode",{parentName:"p"},"forward-auth")," plugin timeouts when the client request uses POST and auth service API expects GET. The error was caused by APISIX forwarding the POST request with headers like ",(0,a.kt)("inlineCode",{parentName:"p"},"Content-Type")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Expect")," to the auth service API expecting GET."),(0,a.kt)("p",null,"With the latest fix, APISIX only adds POST request headers if the plugin's ",(0,a.kt)("inlineCode",{parentName:"p"},"request_method")," configuration is set to POST."),(0,a.kt)("p",null,"For more information, see ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/11021"},"PR #11021"),"."),(0,a.kt)("h2",{id:"changelog"},"Changelog"),(0,a.kt)("p",null,"Visit ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/release/3.9/CHANGELOG.md#391"},"here")," to see the changelog."))}s.isMDXComponent=!0}}]);