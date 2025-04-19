"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[57539],{35318:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(27378);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),i=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=i(e.components);return n.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=i(r),f=o,y=s["".concat(p,".").concat(f)]||s[f]||m[f]||a;return r?n.createElement(y,c(c({ref:t},u),{},{components:r})):n.createElement(y,c({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=s;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,c[1]=l;for(var i=2;i<a;i++)c[i]=r[i];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},31014:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>i});var n=r(25773),o=(r(27378),r(35318));const a={title:"\u793e\u533a\u6708\u62a5 (05.01 - 05.31)",keywords:["Apache APISIX","API \u7f51\u5173","\u793e\u533a\u6708\u62a5","\u8d21\u732e\u8005"],description:"Apache APISIX \u793e\u533a\u7684\u6708\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",tags:["Community"],image:"https://static.apiseven.com/uploads/2024/05/31/Z09ywV24_may-cover-cn.png"},c=void 0,l={permalink:"/zh/blog/2024/05/31/monthly-report",source:"@site/blog/2024/05/31/monthly-report.md",title:"\u793e\u533a\u6708\u62a5 (05.01 - 05.31)",description:"Apache APISIX \u793e\u533a\u7684\u6708\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",date:"2024-05-31T00:00:00.000Z",formattedDate:"2024\u5e745\u670831\u65e5",tags:[{label:"Community",permalink:"/zh/blog/tags/community"}],readingTime:1.76,truncated:!0,authors:[],prevItem:{title:"\u793e\u533a\u6708\u62a5 (06.01 - 06.30)",permalink:"/zh/blog/2024/06/30/monthly-report"},nextItem:{title:"Forward-Auth \u63d2\u4ef6\u80fd\u591f\u53d1\u51fa\u975e\u6cd5 Smuggling \u8bf7\u6c42 (CVE-2024-32638)",permalink:"/zh/blog/2024/05/02/cve-2024-32638"}},p={authorsImageUrls:[]},i=[],u={toc:i};function m(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u6700\u8fd1\uff0c\u6211\u4eec\u65b0\u589e\u5e76\u6539\u8fdb\u4e86 Apache APISIX \u7684\u90e8\u5206\u529f\u80fd\uff0c\u5305\u542b\u5728 HashiCorp Vault \u4e2d\u652f\u6301 hcv namespace \u548c \u5728 OIDC \u63d2\u4ef6\u4e2d\u5141\u8bb8\u5728\u81ea\u7701\u8bf7\u6c42\u4e2d\u8bbe\u7f6e\u6807\u5934\u3002\u6709\u5173\u66f4\u591a\u529f\u80fd\u65b0\u4eae\u70b9\uff0c\u8bf7\u9605\u8bfb\u672c\u671f\u6708\u62a5\u3002")))}m.isMDXComponent=!0}}]);