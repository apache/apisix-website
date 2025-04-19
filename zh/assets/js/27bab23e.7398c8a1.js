"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[96946],{35318:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(27378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(n),g=i,b=s["".concat(c,".").concat(g)]||s[g]||m[g]||a;return n?r.createElement(b,o(o({ref:t},u),{},{components:n})):r.createElement(b,o({ref:t},u))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=s;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<a;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},44909:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(25773),i=(n(27378),n(35318));const a={title:"APISIX-MCP\uff1a\u5229\u7528 AI + MCP \u62e5\u62b1 API \u667a\u80fd\u5316\u7ba1\u7406",authors:[{name:"Zhihuang Lin",title:"API7 Engineer",url:"https://github.com/oil-oil",image_url:"https://github.com/oil-oil.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png"}],keywords:["MCP \u534f\u8bae","APISIX MCP","APISIX-MCP","AI\u6a21\u578b","API\u7ba1\u7406","\u81ea\u7136\u8bed\u8a00\u4ea4\u4e92"],description:"MCP \u534f\u8bae\u4e3a AI \u6a21\u578b\u63d0\u4f9b\u6807\u51c6\u5316\u8fde\u63a5\uff0cAPISIX-MCP \u901a\u8fc7\u81ea\u7136\u8bed\u8a00\u4ea4\u4e92\u7b80\u5316 API \u7ba1\u7406\uff0c\u5b9e\u73b0\u667a\u80fd\u914d\u7f6e\u4e0e\u81ea\u52a8\u5316\u5de5\u4f5c\u6d41\uff0c\u63d0\u5347\u8fd0\u7ef4\u6548\u7387\u3002",tags:["Ecosystem"],image:"https://static.api7.ai/uploads/2025/04/01/b53YPObN_apisix-mcp.webp"},o=void 0,l={permalink:"/zh/blog/2025/04/01/embrace-intelligent-api-management-with-ai-and-mcp",source:"@site/blog/2025/04/01/embrace-intelligent-api-management-with-ai-and-mcp.md",title:"APISIX-MCP\uff1a\u5229\u7528 AI + MCP \u62e5\u62b1 API \u667a\u80fd\u5316\u7ba1\u7406",description:"MCP \u534f\u8bae\u4e3a AI \u6a21\u578b\u63d0\u4f9b\u6807\u51c6\u5316\u8fde\u63a5\uff0cAPISIX-MCP \u901a\u8fc7\u81ea\u7136\u8bed\u8a00\u4ea4\u4e92\u7b80\u5316 API \u7ba1\u7406\uff0c\u5b9e\u73b0\u667a\u80fd\u914d\u7f6e\u4e0e\u81ea\u52a8\u5316\u5de5\u4f5c\u6d41\uff0c\u63d0\u5347\u8fd0\u7ef4\u6548\u7387\u3002",date:"2025-04-01T00:00:00.000Z",formattedDate:"2025\u5e744\u67081\u65e5",tags:[{label:"Ecosystem",permalink:"/zh/blog/tags/ecosystem"}],readingTime:11.775,truncated:!0,authors:[{name:"Zhihuang Lin",title:"API7 Engineer",url:"https://github.com/oil-oil",image_url:"https://github.com/oil-oil.png",imageURL:"https://github.com/oil-oil.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png",imageURL:"https://github.com/Yilialinn.png"}],prevItem:{title:"APISIX AI \u7f51\u5173\u4ecb\u7ecd",permalink:"/zh/blog/2025/04/08/introducing-apisix-ai-gateway"},nextItem:{title:"Apache APISIX 3.12.0 \u6b63\u5f0f\u53d1\u5e03",permalink:"/zh/blog/2025/04/01/release-apache-apisix-3.12.0"}},c={authorsImageUrls:[void 0,void 0]},p=[],u={toc:p};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u4ecb\u7ecd\u4e86 MCP \u534f\u8bae\u53ca\u5176\u5728 APISIX-MCP \u4e2d\u7684\u5e94\u7528\u3002MCP \u534f\u8bae\u4e3a AI \u6a21\u578b\u63d0\u4f9b\u6807\u51c6\u5316\u8fde\u63a5\uff0c\u89e3\u51b3\u788e\u7247\u5316\u95ee\u9898\u3002APISIX-MCP \u901a\u8fc7\u81ea\u7136\u8bed\u8a00\u4ea4\u4e92\u7b80\u5316 API \u7ba1\u7406\uff0c\u652f\u6301\u521b\u5efa\u3001\u66f4\u65b0\u3001\u5220\u9664\u8d44\u6e90\uff0c\u5b9e\u73b0\u81ea\u52a8\u5316\u5de5\u4f5c\u6d41\u548c\u95ed\u73af\u9a8c\u8bc1\uff0c\u663e\u8457\u964d\u4f4e\u8ba4\u77e5\u6210\u672c\uff0c\u63d0\u5347\u8fd0\u7ef4\u6548\u7387\u3002")))}m.isMDXComponent=!0}}]);