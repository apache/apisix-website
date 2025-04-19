"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[18631],{35318:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var n=r(27378);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=c(r),f=o,b=m["".concat(p,".").concat(f)]||m[f]||u[f]||a;return r?n.createElement(b,s(s({ref:t},l),{},{components:r})):n.createElement(b,s({ref:t},l))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},97250:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(25773),o=(r(27378),r(35318));const a={title:"APISIX Ingress \u662f\u5982\u4f55\u652f\u6301\u4e0a\u5343\u4e2a Pod \u526f\u672c\u7684\u5e94\u7528",author:"\u5bb9\u946b",authorURL:"https://github.com/AlinsRan",authorImageURL:"https://github.com/AlinsRan.png",keywords:["Kubernetes","APISIX Ingress","\u5f00\u6e90","APISIX","Pod"],description:"\u672c\u6587\u901a\u8fc7\u4ecb\u7ecd Kubernetes \u4e2d\u4e0a\u5343\u4e2a Pod \u526f\u672c\u5e94\u7528\u573a\u666f\u7684\u89e3\u6790\uff0c\u63d0\u51fa\u6280\u672f\u5b9e\u73b0\u7684\u56f0\u96be\u3002\u4ecb\u7ecd APISIX Ingress \u662f\u5982\u4f55\u89e3\u51b3\u8fd9\u4e00\u96be\u9898\u7684\u3002",tags:["Ecosystem"]},s=void 0,i={permalink:"/zh/blog/2022/11/25/how-apisix-support-1000-pods",source:"@site/blog/2022/11/25/how-apisix-support-1000-pods.md",title:"APISIX Ingress \u662f\u5982\u4f55\u652f\u6301\u4e0a\u5343\u4e2a Pod \u526f\u672c\u7684\u5e94\u7528",description:"\u672c\u6587\u901a\u8fc7\u4ecb\u7ecd Kubernetes \u4e2d\u4e0a\u5343\u4e2a Pod \u526f\u672c\u5e94\u7528\u573a\u666f\u7684\u89e3\u6790\uff0c\u63d0\u51fa\u6280\u672f\u5b9e\u73b0\u7684\u56f0\u96be\u3002\u4ecb\u7ecd APISIX Ingress \u662f\u5982\u4f55\u89e3\u51b3\u8fd9\u4e00\u96be\u9898\u7684\u3002",date:"2022-11-25T00:00:00.000Z",formattedDate:"2022\u5e7411\u670825\u65e5",tags:[{label:"Ecosystem",permalink:"/zh/blog/tags/ecosystem"}],readingTime:14.15,truncated:!0,authors:[{name:"\u5bb9\u946b",url:"https://github.com/AlinsRan",imageURL:"https://github.com/AlinsRan.png"}],prevItem:{title:"\u8bd1\u6587 | A poor man's API",permalink:"/zh/blog/2022/11/28/a-poor-man\u2018s-api"},nextItem:{title:"\u793e\u533a\u53cc\u5468\u62a5 (11.5 - 11.20)",permalink:"/zh/blog/2022/11/23/weekly-report-1123"}},p={authorsImageUrls:[void 0]},c=[],l={toc:c};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u901a\u8fc7\u4ecb\u7ecd Kubernetes \u4e2d\u4e0a\u5343\u4e2a Pod \u526f\u672c\u5e94\u7528\u573a\u666f\u7684\u89e3\u6790\uff0c\u63d0\u51fa\u6280\u672f\u5b9e\u73b0\u7684\u56f0\u96be\u3002\u4ecb\u7ecd APISIX Ingress \u662f\u5982\u4f55\u89e3\u51b3\u8fd9\u4e00\u96be\u9898\u7684\u3002")))}u.isMDXComponent=!0}}]);