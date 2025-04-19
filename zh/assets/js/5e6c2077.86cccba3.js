"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[87217],{35318:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>g});var n=r(27378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=p(r),g=a,f=m["".concat(c,".").concat(g)]||m[g]||s[g]||i;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},29910:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=r(25773),a=(r(27378),r(35318));const i={title:"APISIX AI \u7f51\u5173\u4ecb\u7ecd",authors:[{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png"}],keywords:["AI \u7f51\u5173","APISIX AI \u7f51\u5173","API \u7f51\u5173","AI \u63d2\u4ef6","API \u7ba1\u7406","AI \u9a71\u52a8\u5e94\u7528"],description:"\u5728 Apache APISIX 3.12.0 \u7248\u672c\u4e2d\uff0c\u6211\u4eec\u8fdb\u4e00\u6b65\u5f3a\u5316\u4e86\u5176\u4f5c\u4e3a\u73b0\u4ee3 API \u7f51\u5173\u7684 AI \u652f\u6301\u80fd\u529b\u3002\u901a\u8fc7\u4e30\u5bcc\u7684\u63d2\u4ef6\u751f\u6001\u548c\u7075\u6d3b\u7684\u67b6\u6784\u8bbe\u8ba1\uff0c\u4e3a\u5f00\u53d1\u8005\u63d0\u4f9b\u4e86\u5b8c\u6574\u7684 AI \u7f51\u5173\u4ea7\u54c1\u3002",tags:["Ecosystem"],image:"https://static.api7.ai/uploads/2025/03/07/Qs4WrU0I_apisix-ai-gateway.webp"},o=void 0,l={permalink:"/zh/blog/2025/04/08/introducing-apisix-ai-gateway",source:"@site/blog/2025/04/08/introducing-apisix-ai-gateway.md",title:"APISIX AI \u7f51\u5173\u4ecb\u7ecd",description:"\u5728 Apache APISIX 3.12.0 \u7248\u672c\u4e2d\uff0c\u6211\u4eec\u8fdb\u4e00\u6b65\u5f3a\u5316\u4e86\u5176\u4f5c\u4e3a\u73b0\u4ee3 API \u7f51\u5173\u7684 AI \u652f\u6301\u80fd\u529b\u3002\u901a\u8fc7\u4e30\u5bcc\u7684\u63d2\u4ef6\u751f\u6001\u548c\u7075\u6d3b\u7684\u67b6\u6784\u8bbe\u8ba1\uff0c\u4e3a\u5f00\u53d1\u8005\u63d0\u4f9b\u4e86\u5b8c\u6574\u7684 AI \u7f51\u5173\u4ea7\u54c1\u3002",date:"2025-04-08T00:00:00.000Z",formattedDate:"2025\u5e744\u67088\u65e5",tags:[{label:"Ecosystem",permalink:"/zh/blog/tags/ecosystem"}],readingTime:11.305,truncated:!0,authors:[{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png",imageURL:"https://github.com/Yilialinn.png"}],nextItem:{title:"APISIX-MCP\uff1a\u5229\u7528 AI + MCP \u62e5\u62b1 API \u667a\u80fd\u5316\u7ba1\u7406",permalink:"/zh/blog/2025/04/01/embrace-intelligent-api-management-with-ai-and-mcp"}},c={authorsImageUrls:[void 0]},p=[],u={toc:p};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5728 Apache APISIX 3.12.0 \u7248\u672c\u4e2d\uff0c\u6211\u4eec\u8fdb\u4e00\u6b65\u5f3a\u5316\u4e86\u5176\u4f5c\u4e3a\u73b0\u4ee3 API \u7f51\u5173\u7684 AI \u652f\u6301\u80fd\u529b\u3002\u901a\u8fc7\u4e30\u5bcc\u7684\u63d2\u4ef6\u751f\u6001\u548c\u7075\u6d3b\u7684\u67b6\u6784\u8bbe\u8ba1\uff0c\u4e3a\u5f00\u53d1\u8005\u63d0\u4f9b\u4e86\u5b8c\u6574\u7684 AI \u7f51\u5173\u4ea7\u54c1\u3002")))}s.isMDXComponent=!0}}]);