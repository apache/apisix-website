"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[53317],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),h=l(r),m=a,f=h["".concat(p,".").concat(m)]||h[m]||s[m]||i;return r?n.createElement(f,c(c({ref:t},u),{},{components:r})):n.createElement(f,c({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,c=new Array(i);c[0]=h;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,c[1]=o;for(var l=2;l<i;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},18633:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return o},metadata:function(){return p},assets:function(){return l},toc:function(){return u},default:function(){return h}});var n=r(87462),a=r(63366),i=(r(67294),r(3905)),c={title:"\u5982\u4f55\u5c06 Apache APISIX \u6269\u5c55\u4e3a\u4e00\u4e2a\u670d\u52a1\u7f51\u683c\u7684\u8fb9\u8f66",date:new Date("2021-08-07T13:30:00.000Z"),keywords:["APISIX","Service Mesh","Kubernetes","API Gateway"],description:"\u5728\u8fd9\u4e2a\u4e3b\u9898\u4e2d\u5c06\u4ecb\u7ecd apisix-mesh-agent \u9879\u76ee\uff0c\u5b83\u6709\u4e00\u4e9b\u80fd\u529b\u5c06 Apache APISIX \u6269\u5c55\u4e3a\u670d\u52a1\u7f51\u683c\u573a\u666f\u4e2d\u7684\u8fb9\u8f66\u7a0b\u5e8f\uff0c\u66f4\u91cd\u8981\u7684\u662f\uff0c\u5b83\u4f7f\u7528 xDS \u534f\u8bae\u4ece Istio\u3001Kuma \u7b49\u63a7\u5236\u5e73\u9762\u83b7\u53d6\u914d\u7f6e\u3002\u4e4b\u540e\uff0c\u6211\u5c06\u4ecb\u7ecd\u5173\u4e8e\u5728\u670d\u52a1\u7f51\u4e2d\u4f7f\u7528 Apache APISIX \u7684\u672a\u6765\u8ba1\u5212\u548c\u671f\u671b\u3002"},o=void 0,p={permalink:"/zh/articles/How-To-Extend-Apache-APISIX-into-a-Service-Mesh-Sidecar",source:"@site/articles/How-To-Extend-Apache-APISIX-into-a-Service-Mesh-Sidecar.md",title:"\u5982\u4f55\u5c06 Apache APISIX \u6269\u5c55\u4e3a\u4e00\u4e2a\u670d\u52a1\u7f51\u683c\u7684\u8fb9\u8f66",description:"\u5728\u8fd9\u4e2a\u4e3b\u9898\u4e2d\u5c06\u4ecb\u7ecd apisix-mesh-agent \u9879\u76ee\uff0c\u5b83\u6709\u4e00\u4e9b\u80fd\u529b\u5c06 Apache APISIX \u6269\u5c55\u4e3a\u670d\u52a1\u7f51\u683c\u573a\u666f\u4e2d\u7684\u8fb9\u8f66\u7a0b\u5e8f\uff0c\u66f4\u91cd\u8981\u7684\u662f\uff0c\u5b83\u4f7f\u7528 xDS \u534f\u8bae\u4ece Istio\u3001Kuma \u7b49\u63a7\u5236\u5e73\u9762\u83b7\u53d6\u914d\u7f6e\u3002\u4e4b\u540e\uff0c\u6211\u5c06\u4ecb\u7ecd\u5173\u4e8e\u5728\u670d\u52a1\u7f51\u4e2d\u4f7f\u7528 Apache APISIX \u7684\u672a\u6765\u8ba1\u5212\u548c\u671f\u671b\u3002",date:"2021-08-07T13:30:00.000Z",formattedDate:"2021\u5e748\u67087\u65e5",tags:[],readingTime:.315,truncated:!1,authors:[],prevItem:{title:"\u6309\u7167 Apache Way \u8fd0\u4f5c\u5f00\u6e90\u5546\u4e1a\u5316\u516c\u53f8\uff0c\u8fd9\u884c\u5f97\u901a\u5417\uff1f",permalink:"/zh/articles/Apache-APISIX-From-OpenSource-Commercialization-by-Apache-Way"},nextItem:{title:"Apache APISIX \u7684\u5b75\u5316\u5668\u4e4b\u65c5",permalink:"/zh/articles/Apache-APISIX-Incubator-Journey"}},l={authorsImageUrls:[]},u=[{value:"\u5206\u4eab\u4eba\u7b80\u4ecb",id:"\u5206\u4eab\u4eba\u7b80\u4ecb",children:[]},{value:"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd",id:"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd",children:[]},{value:"PPT \u4e0b\u8f7d",id:"ppt-\u4e0b\u8f7d",children:[]}],s={toc:u};function h(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("iframe",{src:"//player.bilibili.com/player.html?aid=932594160&bvid=BV16M4y1V7ZW&cid=394694138&page=1",frameborder:"0",scrolling:"no",allowfullscreen:"true",style:{width:"100%",maxHeight:"calc(100vw / 5 * 3)",height:"calc(100vh / 5 * 3)"}}),(0,i.kt)("h2",{id:"\u5206\u4eab\u4eba\u7b80\u4ecb"},"\u5206\u4eab\u4eba\u7b80\u4ecb"),(0,i.kt)("p",null,"\u5f20\u8d85\uff0cApache APISIX PMC\uff0cOpenResty \u8d21\u732e\u8005\uff0c\u5f00\u6e90\u7231\u597d\u8005\uff0c\u73b0\u5728\u6211\u6b63\u5728\u7814\u7a76 Service Mesh\u3001Kubernetes \u548c API Gateway\u3002"),(0,i.kt)("h2",{id:"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd"},"\u5206\u4eab\u4e3b\u9898\u4ecb\u7ecd"),(0,i.kt)("p",null,"\u5728\u8fd9\u4e2a\u4e3b\u9898\u4e2d\uff0c\u6211\u5c06\u4ecb\u7ecd ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-mesh-agent"},"apisix-mesh-agent")," \u9879\u76ee\uff0c\u5b83\u6709\u4e00\u4e9b\u80fd\u529b\u5c06 Apache APISIX \u6269\u5c55\u4e3a\u670d\u52a1\u7f51\u683c\u573a\u666f\u4e2d\u7684\u8fb9\u8f66\u7a0b\u5e8f\uff0c\u66f4\u91cd\u8981\u7684\u662f\uff0c\u5b83\u4f7f\u7528 xDS \u534f\u8bae\u4ece Istio\u3001Kuma \u7b49\u63a7\u5236\u5e73\u9762\u83b7\u53d6\u914d\u7f6e\u3002\u4e4b\u540e\uff0c\u6211\u5c06\u4ecb\u7ecd\u5173\u4e8e\u5728\u670d\u52a1\u7f51\u4e2d\u4f7f\u7528 Apache APISIX \u7684\u672a\u6765\u8ba1\u5212\u548c\u671f\u671b\u3002"),(0,i.kt)("h2",{id:"ppt-\u4e0b\u8f7d"},"PPT \u4e0b\u8f7d"),(0,i.kt)("p",null,"\u5173\u6ce8 Apache APISIX \u516c\u4f17\u53f7\uff0c\u56de\u590d\u201cApacheCon\u201d\u4e0b\u8f7d PPT\u3002"),(0,i.kt)("img",{src:"../img/blog_img/APISIX-wechat.png",alt:"Apache APISIX WeChat",style:{width:"200px"}}))}h.isMDXComponent=!0}}]);