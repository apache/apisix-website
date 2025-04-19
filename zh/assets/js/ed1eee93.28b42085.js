"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[92417],{35318:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>b});var n=r(27378);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=l(r),b=o,h=m["".concat(p,".").concat(b)]||m[b]||s[b]||a;return r?n.createElement(h,c(c({ref:t},u),{},{components:r})):n.createElement(h,c({ref:t},u))}));function b(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var l=2;l<a;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},22129:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>s,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var n=r(25773),o=(r(27378),r(35318));const a={title:"Apache APISIX 2.14.1 \u6b63\u5f0f\u53d1\u5e03",authors:[{name:"\u7f57\u6cfd\u8f69",title:"Author",url:"https://github.com/spacewander",image_url:"https://avatars.githubusercontent.com/u/4161644?v=4"},{name:"\u97e9\u98de",title:"Technical Writer",url:"https://github.com/hf400159",image_url:"https://github.com/hf400159.png"}],keywords:["Apache APISIX","2.14.1","WebSocket","API \u7f51\u5173"],description:"Apache APISIX 2.14.1 \u6b63\u5f0f\u53d1\u5e03\uff01\u8be5\u7248\u672c\u652f\u6301\u5728\u63a7\u5236\u9762\u5b9e\u73b0\u670d\u52a1\u53d1\u73b0\uff0c\u8fd8\u652f\u6301 Istio\u3001\u57fa\u4e8e WebSocket \u7684 pubsub \u4ee3\u7406\u6846\u67b6\u548c\u57fa\u4e8e xRPC \u6846\u67b6\u7ba1\u7406\u975e HTTP \u4e03\u5c42\u534f\u8bae\u3002",tags:["Community"]},c=void 0,i={permalink:"/zh/blog/2022/05/31/release-apache-apisix-2.14",source:"@site/blog/2022/05/31/release-apache-apisix-2.14.md",title:"Apache APISIX 2.14.1 \u6b63\u5f0f\u53d1\u5e03",description:"Apache APISIX 2.14.1 \u6b63\u5f0f\u53d1\u5e03\uff01\u8be5\u7248\u672c\u652f\u6301\u5728\u63a7\u5236\u9762\u5b9e\u73b0\u670d\u52a1\u53d1\u73b0\uff0c\u8fd8\u652f\u6301 Istio\u3001\u57fa\u4e8e WebSocket \u7684 pubsub \u4ee3\u7406\u6846\u67b6\u548c\u57fa\u4e8e xRPC \u6846\u67b6\u7ba1\u7406\u975e HTTP \u4e03\u5c42\u534f\u8bae\u3002",date:"2022-05-31T00:00:00.000Z",formattedDate:"2022\u5e745\u670831\u65e5",tags:[{label:"Community",permalink:"/zh/blog/tags/community"}],readingTime:9.325,truncated:!0,authors:[{name:"\u7f57\u6cfd\u8f69",title:"Author",url:"https://github.com/spacewander",image_url:"https://avatars.githubusercontent.com/u/4161644?v=4",imageURL:"https://avatars.githubusercontent.com/u/4161644?v=4"},{name:"\u97e9\u98de",title:"Technical Writer",url:"https://github.com/hf400159",image_url:"https://github.com/hf400159.png",imageURL:"https://github.com/hf400159.png"}],prevItem:{title:"\u793e\u533a\u53cc\u5468\u62a5\uff085.16 - 5.31\uff09",permalink:"/zh/blog/2022/06/07/weekly-report-0607"},nextItem:{title:"\u793e\u533a\u53cc\u5468\u62a5\uff085.01 - 5.15\uff09",permalink:"/zh/blog/2022/05/19/weekly-report-0519"}},p={authorsImageUrls:[void 0,void 0]},l=[],u={toc:l};function s(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u63a2\u7d22\u6027\u7248\u672c\u2014\u2014 Apache APISIX 2.14.1 \u6b63\u5f0f\u53d1\u5e03\u3002\u8be5\u7248\u672c\u4e0d\u4ec5\u652f\u6301\u4e86\u5728\u63a7\u5236\u9762\u5b9e\u73b0\u670d\u52a1\u53d1\u73b0\uff0c\u8fd8\u652f\u6301\u4e86 Istio\u3001\u57fa\u4e8e WebSocket \u7684 pubsub \u4ee3\u7406\u6846\u67b6\u548c\u57fa\u4e8e xRPC \u6846\u67b6\u7ba1\u7406\u975e HTTP \u7684 7 \u5c42\u534f\u8bae\u3002")))}s.isMDXComponent=!0}}]);