"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[71594],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return m}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,c=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),s=u(r),m=a,h=s["".concat(p,".").concat(m)]||s[m]||f[m]||c;return r?n.createElement(h,o(o({ref:t},l),{},{components:r})):n.createElement(h,o({ref:t},l))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=r.length,o=new Array(c);o[0]=s;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var u=2;u<c;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},95432:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return i},metadata:function(){return p},assets:function(){return u},toc:function(){return l},default:function(){return s}});var n=r(87462),a=r(63366),c=(r(67294),r(3905)),o={title:"Apache APISIX \u7684\u5b75\u5316\u5668\u4e4b\u65c5",date:new Date("2021-08-06T16:10:00.000Z"),keywords:["APISIX","Apache","\u5f00\u6e90","\u5b75\u5316"],description:"Apache APISIX \u7684\u5b75\u5316\u8fc7\u7a0b\u3002"},i=void 0,p={permalink:"/zh/articles/Apache-APISIX-Incubator-Journey",source:"@site/articles/Apache-APISIX-Incubator-Journey.md",title:"Apache APISIX \u7684\u5b75\u5316\u5668\u4e4b\u65c5",description:"Apache APISIX \u7684\u5b75\u5316\u8fc7\u7a0b\u3002",date:"2021-08-06T16:10:00.000Z",formattedDate:"2021\u5e748\u67086\u65e5",tags:[],readingTime:.155,truncated:!1,authors:[],prevItem:{title:"\u5982\u4f55\u5c06 Apache APISIX \u6269\u5c55\u4e3a\u4e00\u4e2a\u670d\u52a1\u7f51\u683c\u7684\u8fb9\u8f66",permalink:"/zh/articles/How-To-Extend-Apache-APISIX-into-a-Service-Mesh-Sidecar"},nextItem:{title:"\u4f9d\u6258\u793e\u533a\u8ba9 Apache APISIX \u9ad8\u901f\u53d1\u5c55",permalink:"/zh/articles/Relying-On-The-Community-To-Get-Apache-APISIX-Up-Speed"}},u={authorsImageUrls:[]},l=[{value:"\u5206\u4eab\u4eba\u7b80\u4ecb",id:"\u5206\u4eab\u4eba\u7b80\u4ecb",children:[]},{value:"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd",id:"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd",children:[]},{value:"PPT \u4e0b\u8f7d",id:"ppt-\u4e0b\u8f7d",children:[]}],f={toc:l};function s(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,c.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h2",{id:"\u5206\u4eab\u4eba\u7b80\u4ecb"},"\u5206\u4eab\u4eba\u7b80\u4ecb"),(0,c.kt)("p",null,"\u6e29\u94ed\uff0cApache Member\uff0cApache APISIX PMC \u4e3b\u5e2d\uff0c\u652f\u6d41\u79d1\u6280\u8054\u5408\u521b\u59cb\u4eba\u3002"),(0,c.kt)("h2",{id:"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd"},"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd"),(0,c.kt)("p",null,"Apache APISIX \u7684\u5b75\u5316\u8fc7\u7a0b\u3002"),(0,c.kt)("h2",{id:"ppt-\u4e0b\u8f7d"},"PPT \u4e0b\u8f7d"),(0,c.kt)("p",null,"\u5173\u6ce8 Apache APISIX \u516c\u4f17\u53f7\uff0c\u56de\u590d\u201cApacheCon\u201d\u4e0b\u8f7d PPT\u3002"),(0,c.kt)("img",{src:"../img/blog_img/APISIX-wechat.png",alt:"Apache APISIX WeChat",style:{width:"200px"}}))}s.isMDXComponent=!0}}]);