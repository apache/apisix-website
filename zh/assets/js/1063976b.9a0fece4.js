"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7691],{35318:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var a=n(27378);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=a.createContext({}),k=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=k(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,o=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),s=k(n),u=l,d=s["".concat(o,".").concat(u)]||s[u]||c[u]||r;return n?a.createElement(d,i(i({ref:t},m),{},{components:n})):a.createElement(d,i({ref:t},m))}));function u(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=s;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:l,i[1]=p;for(var k=2;k<r;k++)i[k]=n[k];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},86649:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>p,toc:()=>k});var a=n(25773),l=(n(27378),n(35318));const r={title:"Apache APISIX \u8fd0\u884c\u65f6\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u8be6\u89e3",authors:[{name:"\u5c60\u6b63\u677e",title:"Author",url:"https://github.com/tzssangglass",image_url:"https://github.com/tzssangglass.png"},{name:"\u97e9\u98de",title:"Technical Writer",url:"https://github.com/hf400159",image_url:"https://github.com/hf400159.png"}],keywords:["API gateway","Apache APISIX","Debug"],description:"\u672c\u6587\u8be6\u7ec6\u4ecb\u7ecd\u4e86\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX \u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u4ee5\u53ca\u8be5\u529f\u80fd\u7684\u5b9e\u73b0\u539f\u7406\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u8be5\u529f\u80fd\u66f4\u4fbf\u6377\u5730\u6392\u67e5 Bug \u5e76\u89e3\u51b3\u76f8\u5173\u95ee\u9898\u3002",tags:["Ecosystem"],image:"https://static.apiseven.com/2022/blog/0817/APISIX.png"},i=void 0,p={permalink:"/zh/blog/2022/08/19/apache-apisix-runtime-dynamic-debugging",source:"@site/blog/2022/08/19/apache-apisix-runtime-dynamic-debugging.md",title:"Apache APISIX \u8fd0\u884c\u65f6\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u8be6\u89e3",description:"\u672c\u6587\u8be6\u7ec6\u4ecb\u7ecd\u4e86\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX \u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u4ee5\u53ca\u8be5\u529f\u80fd\u7684\u5b9e\u73b0\u539f\u7406\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u8be5\u529f\u80fd\u66f4\u4fbf\u6377\u5730\u6392\u67e5 Bug \u5e76\u89e3\u51b3\u76f8\u5173\u95ee\u9898\u3002",date:"2022-08-19T00:00:00.000Z",formattedDate:"2022\u5e748\u670819\u65e5",tags:[{label:"Ecosystem",permalink:"/zh/blog/tags/ecosystem"}],readingTime:16.62,truncated:!0,authors:[{name:"\u5c60\u6b63\u677e",title:"Author",url:"https://github.com/tzssangglass",image_url:"https://github.com/tzssangglass.png",imageURL:"https://github.com/tzssangglass.png"},{name:"\u97e9\u98de",title:"Technical Writer",url:"https://github.com/hf400159",image_url:"https://github.com/hf400159.png",imageURL:"https://github.com/hf400159.png"}],prevItem:{title:"API \u7f51\u5173 Apache APISIX \u96c6\u6210 Elasticsearch \u5b9e\u73b0\u5b9e\u65f6\u65e5\u5fd7\u76d1\u63a7",permalink:"/zh/blog/2022/09/15/apache-apisix-integrat-with-elasticsearch-for-logger"},nextItem:{title:"GCP\u3001AWS\u3001Azure \u548c Oracle ARM \u67b6\u6784\u670d\u52a1\u5668\u6027\u80fd\u6d4b\u8bd5\u5bf9\u6bd4",permalink:"/zh/blog/2022/08/12/arm-performance-google-aws-azure-with-apisix"}},o={authorsImageUrls:[void 0,void 0]},k=[{value:"\u6545\u969c\u53d1\u751f",id:"\u6545\u969c\u53d1\u751f",children:[],level:2},{value:"\u52a8\u6001\u8c03\u8bd5\u8be6\u89e3",id:"\u52a8\u6001\u8c03\u8bd5\u8be6\u89e3",children:[{value:"\u52a8\u6001\u8c03\u8bd5\u7279\u6027",id:"\u52a8\u6001\u8c03\u8bd5\u7279\u6027",children:[],level:3},{value:"\u914d\u7f6e\u52a8\u6001\u8c03\u8bd5",id:"\u914d\u7f6e\u52a8\u6001\u8c03\u8bd5",children:[],level:3}],level:2},{value:"\u95ee\u9898\u6392\u67e5",id:"\u95ee\u9898\u6392\u67e5",children:[{value:"\u9a8c\u8bc1\u95ee\u9898",id:"\u9a8c\u8bc1\u95ee\u9898",children:[],level:3},{value:"\u5927\u80c6\u63a8\u6d4b",id:"\u5927\u80c6\u63a8\u6d4b",children:[],level:3},{value:"\u5c0f\u5fc3\u6c42\u8bc1",id:"\u5c0f\u5fc3\u6c42\u8bc1",children:[],level:3}],level:2},{value:"\u529f\u80fd\u5b9e\u73b0",id:"\u529f\u80fd\u5b9e\u73b0",children:[],level:2},{value:"\u6700\u4f73\u5b9e\u8df5",id:"\u6700\u4f73\u5b9e\u8df5",children:[],level:2},{value:"\u66f4\u591a\u671f\u5f85",id:"\u66f4\u591a\u671f\u5f85",children:[],level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[],level:2}],m={toc:k};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u8be6\u7ec6\u4ecb\u7ecd\u4e86 Apache APISIX \u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u4ee5\u53ca\u8be5\u529f\u80fd\u7684\u5b9e\u73b0\u539f\u7406\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u8be5\u529f\u80fd\u66f4\u4fbf\u6377\u5730\u6392\u67e5 Bug \u5e76\u89e3\u51b3\u76f8\u5173\u95ee\u9898\u3002")),(0,l.kt)("p",null,"Apache APISIX \u662f\u4e00\u4e2a\u52a8\u6001\uff0c\u5b9e\u65f6\uff0c\u9ad8\u6027\u80fd\u7684 API \u7f51\u5173\uff0c\u5b83\u57fa\u4e8e NGINX \u548c Lua \u5b9e\u73b0\uff0c\u56e0\u6b64\u5929\u7136\u7ee7\u627f\u4e86\u4e8c\u8005\u7684\u9ad8\u6027\u80fd\u3002\u52a8\u6001\u610f\u5473\u7740\u5982\u679c\u4f60\u5bf9\u5b83\u505a\u4e86\u4efb\u610f\u914d\u7f6e\u7684\u53d8\u66f4\uff0c\u4e0d\u9700\u8981\u91cd\u542f\u6216\u8005\u70ed\u66f4\u65b0\uff0c\u56e0\u6b64\u4e5f\u4e0d\u4f1a\u4ea7\u751f\u670d\u52a1\u4e2d\u65ad\u6216\u77ed\u6682\u4e0d\u53ef\u7528\u3002\u7531\u4e8e NGINX \u7684\u914d\u7f6e\u4fdd\u5b58\u5728\u6587\u4ef6\u4e2d\uff0c\u5982\u679c\u53d8\u66f4\u914d\u7f6e\uff0c\u5c31\u9700\u8981\u91cd\u542f\u670d\u52a1\uff0c\u8be5\u64cd\u4f5c\u4f1a\u6d89\u53ca\u5230\u8fde\u63a5\u65ad\u5f00\uff0c\u5360\u7528\u9ad8\u8fbe\u4e24\u500d\u7684\u8d44\u6e90\u3002"),(0,l.kt)("p",null,"APISIX \u901a\u8fc7\u5176\u52a8\u6001\u7684\u4f18\u52bf\uff0c \u63d0\u4f9b\u4e86\u5f3a\u5927\u7684\u8fd0\u884c\u65f6\u52a8\u6001\u8c03\u8bd5\u7684\u80fd\u529b\uff0c\u4f46\u7531\u4e8e\u8be5\u529f\u80fd\u5bf9\u4f7f\u7528\u8005\u6709\u7740\u7565\u9ad8\u7684\u6280\u672f\u80cc\u666f\u8981\u6c42\uff0c\u5728\u5e38\u89c4\u4e1a\u52a1\u9700\u6c42\u4e2d\u4e5f\u4e0d\u592a\u4f1a\u7528\u5230\u8fd9\u9879\u529f\u80fd\uff0c\u56e0\u6b64\u5927\u5bb6\u5bf9 APISIX \u8fd0\u884c\u65f6\u52a8\u6001\u8c03\u8bd5\u80fd\u529b\u4e86\u89e3\u4e0d\u8db3\u3002\u672c\u6587\u5c06\u901a\u8fc7\u5b9e\u9645\u6848\u4f8b\u4e3a\u4f60\u8be6\u7ec6\u8bb2\u89e3 Apache APISIX \u8fd0\u884c\u65f6\u52a8\u6001\u8c03\u8bd5\u7684\u529f\u80fd\u3002"),(0,l.kt)("h2",{id:"\u6545\u969c\u53d1\u751f"},"\u6545\u969c\u53d1\u751f"),(0,l.kt)("p",null,"\u67d0\u5e74\u67d0\u6708\u67d0\u65e5\uff0c\u4e00\u4e2a\u7528\u6237\u7684\u751f\u4ea7\u73af\u5883\u51fa\u73b0\u5f02\u5e38\uff0c\u4e0e\u7528\u6237\u4ea4\u6d41\u8fc7\u540e\u5e76\u6ca1\u6709\u53d1\u73b0\u7528\u6237\u64cd\u4f5c\u6709\u4ec0\u4e48\u5f02\u5e38\u4e4b\u5904\uff0c\u4e00\u5207\u90fd\u5f88\u5408\u7406\u3002\u800c\u4e14\u6839\u636e\u7528\u6237\u7684\u63cf\u8ff0\uff0c\u8be5 Bug \u4f1a\u5728 APISIX \u91cd\u542f\u540e\u6d88\u5931\uff0c\u7136\u540e\u8fd0\u884c\u4e00\u6bb5\u65f6\u95f4\u4e4b\u540e\u5c31\u4f1a\u968f\u673a\u51fa\u73b0\u3002\u6ca1\u6709\u4eba\u77e5\u9053\u8fd9\u4e2a Bug \u53d1\u751f\u7684\u539f\u56e0\uff0c\u4e5f\u4e0d\u77e5\u9053\u5982\u4f55\u590d\u73b0\u8be5 Bug\u3002\u5728\u68c0\u67e5\u5b8c\u7528\u6237\u7684\u914d\u7f6e\u4e4b\u540e\uff0c\u6211\u4eec\u4e5f\u6ca1\u6709\u53d1\u73b0\u5f02\u5e38\u7684\u5730\u65b9\u3002"),(0,l.kt)("p",null,"\u800c\u5728\u7528\u6237\u63d0\u4f9b\u7684\u4e0e\u5f02\u5e38\u76f8\u5173\u7684\u65e5\u5fd7\u4e2d\uff0c\u6211\u4eec\u53d1\u73b0\u5176\u4e2d\u6700\u5173\u952e\u7684\u4e00\u6761\u65e5\u5fd7\u3002\u8fd9\u6761\u65e5\u5fd7\u770b\u8d77\u6765\u7a00\u677e\u5e73\u5e38\uff0c\u53ea\u4e0d\u8fc7\u662f\u8c03\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"eval")," \u51fd\u6570\u5931\u8d25\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/1.PNG",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u4f46\u5728\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c\u5728\u8fd9\u884c\u65e5\u5fd7\u5bf9\u5e94\u7684\u4ee3\u7801\u6bb5\u4e0d\u5e94\u8be5\u4f1a\u629b\u51fa\u8fd9\u4e2a\u9519\u8bef\u3002\u4e3a\u4ec0\u4e48\u5462\uff1f\u6211\u4eec\u5148\u770b\u4e0b\u5f02\u5e38\u65e5\u5fd7\u5bf9\u5e94\u7684\u4ee3\u7801\u6bb5\uff0c\u4e0b\u56fe\u4e2d\u5012\u6570\u7b2c\u4e8c\u884c\u662f\u629b\u51fa\u5f02\u5e38\u7684\u5730\u65b9\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/2.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u8fd9\u6bb5\u4ee3\u7801\u7684\u903b\u8f91\u662f\uff1a\u9996\u5148\u5bf9 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u505a\u4e86\u975e\u7a7a\u5224\u65ad\uff0c\u5982\u679c\u4e0d\u5b58\u5728\uff0c\u5219\u4f1a\u521b\u5efa\u8be5\u5bf9\u8c61\u3002\u5bf9\u8c61\u521b\u5efa\u5b8c\u6210\uff0c\u624d\u4f1a\u8c03\u7528\u5b83\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"eval")," \u51fd\u6570\uff0c\u800c\u5728\u8be5\u5bf9\u8c61\u5bf9\u5e94\u7684\u6a21\u5757\u4e2d\uff0c\u5df2\u7ecf\u5b9e\u73b0\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"eval")," \u51fd\u6570\u3002\u6240\u4ee5\u6211\u4eec\u8ba4\u4e3a\u8fd9\u4e2a\u9519\u8bef\u662f\u4e0d\u5e94\u8be5\u51fa\u73b0\u7684\u3002\u90a3\u4e48\u4e3a\u4ec0\u4e48\u521b\u5efa\u4e86\u8fd9\u4e2a\u5bf9\u8c61\u4f46\u662f\u8c03\u7528\u5b83\u7684\u51fd\u6570\u5931\u8d25\u5462\uff1f"),(0,l.kt)("h2",{id:"\u52a8\u6001\u8c03\u8bd5\u8be6\u89e3"},"\u52a8\u6001\u8c03\u8bd5\u8be6\u89e3"),(0,l.kt)("p",null,"\u4ece\u524d\u6587\u63cf\u8ff0\u7684\u5df2\u77e5\u4fe1\u606f\u6765\u770b\uff0c\u6211\u4eec\u5df2\u7ecf\u65e0\u6cd5\u5224\u65ad Bug \u4ea7\u751f\u7684\u539f\u56e0\u4e86\uff0c\u56e0\u6b64\u6211\u4eec\u91c7\u7528\u52a8\u6001\u8c03\u8bd5\u7684\u65b9\u5f0f\u6765\u5bfb\u627e Bug \u7684\u6839\u672c\u539f\u56e0\u3002"),(0,l.kt)("h3",{id:"\u52a8\u6001\u8c03\u8bd5\u7279\u6027"},"\u52a8\u6001\u8c03\u8bd5\u7279\u6027"),(0,l.kt)("p",null,"\u5728\u6b63\u5f0f\u5f00\u542f\u5bfb Bug \u4e4b\u8def\u524d\uff0c\u5148\u4e3a\u5927\u5bb6\u4ecb\u7ecd\u4e0b\u4ec0\u4e48\u662f\u52a8\u6001\u8c03\u8bd5\u4ee5\u53ca\u5b83\u7684\u7279\u6027\u3002"),(0,l.kt)("p",null,"\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u4e3b\u8981\u7528\u4e8e\u5728 APISIX \u8fd0\u884c\u8fc7\u7a0b\u4e2d\u901a\u8fc7\u54cd\u5e94\u3001\u65e5\u5fd7\u7b49\u65b9\u5f0f\uff0c\u8f93\u51fa\u66f4\u591a\u7684\u8c03\u8bd5\u4fe1\u606f\uff0c\u7528\u6765\u5e2e\u52a9\u6392\u67e5\u5f02\u5e38\uff0c\u6bd4\u5982\u7f29\u5c0f\u6392\u67e5\u8303\u56f4\u3001\u7aa5\u63a2\u5f02\u5e38\u4e0a\u4e0b\u6587\u7b49\u3002\u5176\u7279\u6027\u6709\u4ee5\u4e0b\u4e09\u70b9\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5b9e\u65f6\u5173\u95ed&\u5f00\u542f"),(0,l.kt)("p",{parentName:"li"},"  \u52a8\u6001\u8c03\u8bd5\u53ef\u4ee5\u5728 APISIX \u8fd0\u884c\u65f6\u901a\u8fc7\u4fee\u6539\u6307\u5b9a\u7684\u914d\u7f6e\u6587\u4ef6\u5f00\u542f\u6216\u5173\u95ed\uff0c\u4e0d\u9700\u8981\u91cd\u542f APISIX \u6216\u8005\u8fdb\u884c\u5176\u4ed6\u64cd\u4f5c\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6253\u5370\u4efb\u4f55\u6a21\u5757\u7ea7\u51fd\u6570"),(0,l.kt)("p",{parentName:"li"},"  \u8be5\u529f\u80fd\u53ef\u4ee5\u8c03\u8bd5\u548c\u6253\u5370\u4efb\u4f55\u6a21\u5757\u7ea7\u522b\u51fd\u6570\u7684\u5165\u53c2\u548c\u51fa\u53c2\uff0c\u4e0d\u7ba1\u8fd9\u4e2a\u51fd\u6570\u662f\u4f4d\u4e8e APISIX \u7684\u4ee3\u7801\u4e2d\uff0c\u8fd8\u662f APISIX \u4f9d\u8d56\u7684\u8bf8\u591a ",(0,l.kt)("inlineCode",{parentName:"p"},"lua-resty")," \u7b2c\u4e09\u65b9\u5e93\u4e2d\uff0c\u6216\u8005\u662f OpenResty \u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"lualib")," \u4e2d\u7684\u6a21\u5757\u3002\u53ea\u8981\u80fd\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"require")," \u5f15\u7528\u8be5\u51fd\u6570\uff0c\u5c31\u53ef\u4ee5 ",(0,l.kt)("inlineCode",{parentName:"p"},"hook")," \u8be5\u51fd\u6570\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u9488\u5bf9\u6307\u5b9a\u8bf7\u6c42\u5f00\u542f"),(0,l.kt)("p",{parentName:"li"},"  \u9664\u4e86\u4ee5\u4e0a\u4e24\u70b9\uff0c\u8be5\u529f\u80fd\u4e5f\u652f\u6301\u9488\u5bf9\u6307\u5b9a\u8bf7\u6c42\u5f00\u542f\u3002\u901a\u8fc7\u8bbe\u7f6e\u7279\u6b8a\u7684\u8bf7\u6c42\u5934\uff0c\u5bf9\u8c03\u8bd5\u8bf7\u6c42\u8fdb\u884c\u67d3\u8272\uff0c\u4fbf\u4e8e\u8ffd\u8e2a\u548c\u5206\u6790\u3002\u8be5\u7279\u6027\u53ef\u4ee5\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"curl xxx -H \u201cX-APISIX-Dynamic-Debug\u201d")," \u547d\u4ee4\u5f00\u542f\uff0c\u8be5\u547d\u4ee4\u8868\u793a\u53ea\u6709\u8bf7\u6c42\u4e2d\u643a\u5e26 ",(0,l.kt)("inlineCode",{parentName:"p"},"X-APISIX-Dynamic-Debug")," \u8bf7\u6c42\u5934\u65f6\uff0c\u624d\u4f1a\u5728\u65e5\u5fd7\u4e2d\u8f93\u51fa\u6307\u5b9a\u51fd\u6570\u7684\u5165\u53c2\u548c\u51fa\u53c2\u3002\u8be5\u529f\u80fd\u672c\u8d28\u4e0a\u662f\u8bf7\u6c42\u8fc7\u6ee4\uff0c\u9632\u6b62\u8f93\u51fa\u592a\u591a\u65e0\u610f\u4e49\u7684\u65e5\u5fd7\uff0c\u4e5f\u53ef\u4ee5\u501f\u6b64\u533a\u5206\u771f\u5b9e\u8bf7\u6c42\u548c\u8c03\u8bd5\u8bf7\u6c42\u3002"))),(0,l.kt)("h3",{id:"\u914d\u7f6e\u52a8\u6001\u8c03\u8bd5"},"\u914d\u7f6e\u52a8\u6001\u8c03\u8bd5"),(0,l.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u4f7f\u7528\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"./conf/debug.yaml")," \u914d\u7f6e\u6587\u4ef6\uff0c\u5f00\u542f APISIX \u7684\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/3.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u5173\u4e8e\u4e0a\u56fe\u914d\u7f6e\u7684\u5177\u4f53\u542b\u4e49\uff0c\u8bf7\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/docs/apisix/architecture-design/debug-mode/"},"Debug Mode"),"\u3002"),(0,l.kt)("p",null,"\u4e0b\u56fe\u662f\u5f00\u542f\u52a8\u6001\u8c03\u8bd5\u540e\u5bf9\u5e94\u7684\u65e5\u5fd7\u4fe1\u606f\uff0c\u53ef\u4ee5\u770b\u5230\u8be5\u65e5\u5fd7\u5305\u542b\u4e86\u6307\u5b9a\u51fd\u6570\u7684\u5165\u53c2\u548c\u51fa\u53c2\u3002\u5f53\u8c03\u7528 dns \u89e3\u6790\u7684\u51fd\u6570\u65f6\uff0c\u67e5\u8be2\u7684\u57df\u540d\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"httpbin.org"),"\uff0c\u8fd4\u56de\u7684\u7ed3\u679c\u662f\u8be5\u57df\u540d\u89e3\u6790\u51fa\u7684 IP\uff0c\u5e76\u4e14\u8be5\u89e3\u6790\u7ed3\u679c\u662f\u4ece\u672c\u5730\u7f13\u5b58\u7684 DNS \u67e5\u8be2\u7ed3\u679c\u4e2d\u547d\u4e2d\u7684\uff0c\u751a\u81f3\u53ef\u4ee5\u770b\u5230\u8fd9\u4e2a\u57df\u540d\u5728\u672c\u5730\u7684 DNS \u7f13\u5b58\u4e2d\u7684\u5b58\u6d3b\u65f6\u95f4\u7b49\u8be6\u7ec6\u4fe1\u606f\u3002\u4f46\u662f\u5728\u6ca1\u6709\u542f\u7528\u52a8\u6001\u8c03\u8bd5\u7684\u65f6\u5019\uff0c\u65e5\u5fd7\u5c31\u6ca1\u6709\u90a3\u4e48\u8be6\u7ec6\u4e86\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/4.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u4e86\u89e3\u5b8c\u76f8\u5173\u6982\u5ff5\u548c\u4f7f\u7528\u65b9\u6cd5\u540e\uff0c\u63a5\u4e0b\u6765\u5c31\u53ef\u4ee5\u8fdb\u884c Bug \u7684\u6392\u67e5\u4e86\u3002"),(0,l.kt)("h2",{id:"\u95ee\u9898\u6392\u67e5"},"\u95ee\u9898\u6392\u67e5"),(0,l.kt)("p",null,"\u9996\u5148\u91c7\u7528\u52a8\u6001\u8c03\u8bd5\u7684\u65b9\u5f0f ",(0,l.kt)("inlineCode",{parentName:"p"},"hook")," \u4e86\u51fa\u73b0\u5f02\u5e38\u7684\u8fd9\u6bb5\u4ee3\u7801\u6240\u5728\u7684\u51fd\u6570\uff0c\u4e0b\u56fe\u662f\u9488\u5bf9\u8be5 Bug \u6240\u505a\u7684\u914d\u7f6e\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/5.png",alt:"network error/log error.png"})),(0,l.kt)("h3",{id:"\u9a8c\u8bc1\u95ee\u9898"},"\u9a8c\u8bc1\u95ee\u9898"),(0,l.kt)("p",null,"\u5f00\u542f\u52a8\u6001\u8c03\u8bd5\u540e\uff0c\u6211\u4eec\u5728\u65e5\u5fd7\u4e2d\u53d1\u73b0\u4e86\u7aef\u502a\u3002\u5728\u51fd\u6570\u7684\u5165\u53c2\u4e2d\uff0c\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u662f\u5b58\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"eval")," \u51fd\u6570\u7684\uff0c\u5e76\u4e14\u8fd9\u4e2a\u51fd\u6570\u4f4d\u4e8e ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u4e2d\uff0c\u8fd9\u7b26\u5408\u6b63\u5e38\u8ba4\u77e5\u3002\u5f53\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u4e2d\u627e\u4e0d\u5230\u65f6\uff0c\u4f1a\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u4e2d\u5bfb\u627e ",(0,l.kt)("inlineCode",{parentName:"p"},"eval")," \u51fd\u6570\u5e76\u4e14\u6267\u884c\u6210\u529f\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/6.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u4f46\u662f\u5728\u5f02\u5e38\u6848\u4f8b\u4e2d\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u5bf9\u8c61\u4e22\u5931\u4e86\uff0c\u8fd9\u662f\u5bfc\u81f4\u65e0\u6cd5\u8c03\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"eval")," \u51fd\u6570\u7684\u76f4\u63a5\u539f\u56e0\uff0c\u4e0e\u5f02\u5e38\u65e5\u5fd7\u76f8\u4e92\u6620\u8bc1\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/7.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u4e3a\u4ec0\u4e48 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u5bf9\u8c61\u4e22\u5931\u4e86\uff1f"),(0,l.kt)("h3",{id:"\u5927\u80c6\u63a8\u6d4b"},"\u5927\u80c6\u63a8\u6d4b"),(0,l.kt)("p",null,"\u57fa\u4e8e\u4e00\u4e2a\u6734\u7d20\u7684\u8ba4\u77e5\uff0c\u8ba1\u7b97\u673a\u662f\u4e0d\u4f1a\u9a97\u4eba\u7684\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u5bf9\u8c61\u4e22\u5931\u4e00\u5b9a\u4f1a\u5b58\u5728\u975e\u5e38\u5408\u7406\u7684\u89e3\u91ca\u3002\u6211\u4eec\u67e5\u770b\u4e86\u76f8\u5173\u4ee3\u7801\uff0c\u5e76\u57fa\u4e8e\u5df2\u77e5\u7684\u4fe1\u606f\u68b3\u7406\u4e86\u4ee3\u7801\u6267\u884c\u8def\u5f84\uff0c\u505a\u4e86\u4ee5\u4e0b\u4e24\u70b9\u63a8\u6d4b\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("inlineCode",{parentName:"li"},"conf.response_expr")," \u5bf9\u8c61\u53ef\u80fd\u5728\u5176\u4ed6\u5730\u65b9\u88ab\u4fee\u6539\u4e86\uff0c\u5bfc\u81f4\u4e22\u5931 ",(0,l.kt)("inlineCode",{parentName:"li"},"metatable"),"\uff1b"),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("inlineCode",{parentName:"li"},"conf.response_expr")," \u5bf9\u8c61\u88ab\u66ff\u6362\u4e86\uff0c\u5e76\u5728\u66ff\u6362\u65f6\u4e22\u5931\u4e86 ",(0,l.kt)("inlineCode",{parentName:"li"},"metatable"),"\u3002")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/8.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u57fa\u4e8e\u7b2c\u4e00\u4e2a\u63a8\u6d4b\uff0c\u5206\u6790\u5b8c\u51fd\u6570\u6267\u884c\u8def\u5f84\u540e\uff0c\u786e\u5b9a\u6ca1\u6709\u4efb\u4f55\u5730\u65b9\u4f1a\u4fee\u6539 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\uff0c\u56e0\u4e3a\u8fd9\u4e2a\u5bf9\u8c61\u7684\u4f7f\u7528\u8303\u56f4\u5f88\u5c0f\uff0c\u4e5f\u4e0d\u4f1a\u6cc4\u6f0f\u5230\u5916\u9762\u3002"),(0,l.kt)("p",null,"\u6240\u4ee5\u6211\u4eec\u4e13\u6ce8\u4e8e\u5206\u6790\u7b2c\u4e8c\u70b9\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u662f\u5b58\u5728\u88ab\u66ff\u6362\u53ef\u80fd\u6027\u7684\u3002\u6bd4\u5982\u63d2\u4ef6\u914d\u7f6e\u5408\u5e76\uff0c\u8be5\u64cd\u4f5c\u6d89\u53ca\u5230 Consumer\u3001Service\u3001Route \u7b49\u5bf9\u8c61\u4e0a\u7684\u63d2\u4ef6\u914d\u7f6e\u7684\u5408\u5e76\u3002\u5728\u8fd9\u4e2a\u8fc7\u7a0b\u4e2d\uff0c\u4f1a\u4f7f\u7528\u6838\u5fc3\u5e93\u4e2d\u7684\u7528\u6237 ",(0,l.kt)("inlineCode",{parentName:"p"},"table")," \u64cd\u4f5c\u7684\u6a21\u5757\u4e2d\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"deepcopy")," \u51fd\u6570\u6765\u590d\u5236\u51fa\u65b0\u914d\u7f6e\u3002"),(0,l.kt)("p",null,"\u56e0\u6b64\u6211\u4eec\u53c8\u68c0\u67e5\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"deepcopy")," \u51fd\u6570\uff0c\u53d1\u73b0\u786e\u5b9e\u6ca1\u6709\u5bf9 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u8fdb\u884c\u4efb\u4f55\u64cd\u4f5c\u3002"),(0,l.kt)("h3",{id:"\u5c0f\u5fc3\u6c42\u8bc1"},"\u5c0f\u5fc3\u6c42\u8bc1"),(0,l.kt)("p",null,"\u57fa\u4e8e\u4ee5\u4e0a\u4fe1\u606f\uff0c\u6211\u4eec\u53c8\u5bf9 ",(0,l.kt)("inlineCode",{parentName:"p"},"deepcopy")," \u51fd\u6570\u8fdb\u884c\u4e86\u52a8\u6001\u8c03\u8bd5\uff0c\u4fee\u6539\u540e\u7684\u914d\u7f6e\u5982\u4e0b\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/9.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u7ecf\u8fc7\u65e5\u5fd7\u5206\u6790\u548c\u63d0\u53d6\uff0c\u679c\u7136\u627e\u5230\u4e86\u5f02\u5e38\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"case"),"\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5165\u53c2")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/10.png",alt:"network error/log error.png"})),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u51fa\u53c2")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/11.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"deepcopy")," \u7684\u5165\u53c2\u4e2d\uff0c\u662f\u5b58\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u7684\uff0c\u4f46\u5728\u51fa\u53c2\u4e2d\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u4e22\u5931\u4e86\u3002\u8fd9\u53ef\u4ee5\u9a8c\u8bc1\u5173\u4e8e ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u4e22\u5931\u7684\u63a8\u6d4b\uff0c\u5e76\u8bf4\u660e ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u4e22\u5931\u53d1\u751f\u5728\u63d2\u4ef6\u914d\u7f6e\u5408\u5e76\u4e2d\u3002"),(0,l.kt)("p",null,"\u7b80\u5355\u603b\u7ed3\u4e00\u4e0b\u51fa\u73b0\u8be5\u5f02\u5e38\u7684\u8fc7\u7a0b\u3002\u6bd4\u5982\u6211\u4eec\u521b\u5efa\u4e86\u4e00\u4e2a Consumer \u5e76\u4e14\u914d\u7f6e\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\uff0c\u53e6\u5916\u521b\u5efa\u4e86\u4e00\u6761 URI \u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"/hello")," \u7684\u8def\u7531\uff0c\u5e76\u5728\u8be5\u8def\u7531\u4e0a\u914d\u7f6e\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"kafka-logger")," \u63d2\u4ef6\u3002"),(0,l.kt)("p",null,"\u7b2c\u4e00\u6b21\u53d1\u9001\u4e86\u6ca1\u6709 Consumer header \u7684\u8bf7\u6c42\uff0c\u8be5\u8bf7\u6c42\u547d\u4e2d ",(0,l.kt)("inlineCode",{parentName:"p"},"/hello")," \u8def\u7531\u540e\uff0c\u4f1a\u88ab ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u62e6\u622a\uff0c\u4f46\u662f\u8be5\u8bf7\u6c42\u5e76\u6ca1\u6709\u5b8c\u5168\u9000\u51fa\uff0c\u4ecd\u7136\u6267\u884c\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"kafka-logger")," \u63d2\u4ef6\u7684 body_filter \u9636\u6bb5\uff0c\u4e5f\u5c31\u662f\u6700\u5f00\u59cb\u5f02\u5e38\u65e5\u5fd7\u5bf9\u5e94\u7684\u51fd\u6570\u3002\u8fd9\u5c31\u5bfc\u81f4\u7b2c\u4e00\u6b21\u8bf7\u6c42\u751f\u6210 ",(0,l.kt)("inlineCode",{parentName:"p"},"response_expr")," \u5e76\u5b58\u50a8\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf")," \u4e2d\u3002\u6b64\u65f6\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u5c31\u4e0d\u662f\u7a7a\u503c\u4e86\uff0c\u5e76\u4e14 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response")," \u5bf9\u8c61\u8fd8\u662f\u6709 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u7684\u3002"),(0,l.kt)("p",null,"\u5f53\u7b2c\u4e8c\u6b21\u53d1\u9001\u4e86\u643a\u5e26 Consumer header \u7684\u8bf7\u6c42\uff0c\u7ee7\u7eed\u547d\u4e2d ",(0,l.kt)("inlineCode",{parentName:"p"},"/hello")," \u8def\u7531\uff0c\u4f46\u662f\u7531\u4e8e\u7b2c\u4e8c\u6b21\u7684\u8bf7\u6c42\u662f\u5408\u6cd5\u7684\uff0c\u6240\u4ee5\u5c06 Consumer \u548c Route \u4e0a\u7684\u63d2\u4ef6\u5408\u5e76\u3002\u5728\u8fd9\u4e2a\u8fc7\u7a0b\u4e2d ",(0,l.kt)("inlineCode",{parentName:"p"},"conf.response_expr")," \u5bf9\u8c61\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u5bf9\u8c61\u4e22\u5931\u4e86\u3002\u90a3\u4e48\u6267\u884c\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"kafka-logger")," \u7684\u63d2\u4ef6\u7684\u4ee3\u7801\u4e2d\uff0c\u5c31\u4f1a\u51fa\u73b0\u5f02\u5e38\u65e5\u5fd7\u6240\u663e\u793a\u7684 Bug\u3002"),(0,l.kt)("p",null,"\u7ecf\u8fc7\u5927\u80c6\u63a8\u6d4b\u548c\u5c0f\u5fc3\u6c42\u8bc1\uff0c\u501f\u52a9\u52a8\u6001\u8c03\u8bd5\u6280\u672f\uff0c\u5728\u975e\u5e38\u56f0\u96be\u7684\u8fd0\u884c\u73af\u5883\u4e2d\u6211\u4eec\u5b8c\u6210\u4e86 Bug \u5b9a\u4f4d\u3002"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u6ce8\u610f")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u76ee\u524d\u8be5\u95ee\u9898\u5df2\u88ab\u4fee\u590d\u3002"))),(0,l.kt)("p",null,"\u76f8\u4fe1\u8bfb\u5230\u8fd9\u91cc\uff0c\u4f60\u5df2\u7ecf\u521d\u6b65\u4e86\u89e3 APISIX \u8fd0\u884c\u65f6\u52a8\u6001\u8c03\u8bd5\u5f3a\u5927\u7684\u80fd\u529b\u4e86\uff0c\u90a3\u4e48 APISIX \u662f\u5982\u4f55\u5b9e\u73b0\u8fd9\u4e2a\u529f\u80fd\u5462\uff1f"),(0,l.kt)("h2",{id:"\u529f\u80fd\u5b9e\u73b0"},"\u529f\u80fd\u5b9e\u73b0"),(0,l.kt)("p",null,"\u4e0b\u56fe\u662f APISIX \u8fdb\u884c\u52a8\u6001\u8c03\u8bd5\u65f6\u7684\u6d41\u7a0b\u56fe\u3002\u9996\u5148\uff0cAPISIX \u4f1a\u89e3\u6790 ",(0,l.kt)("inlineCode",{parentName:"p"},"./conf/debug.yaml")," \u914d\u7f6e\u6587\u4ef6\uff0c\u5e76\u627e\u5230\u9700\u8981\u52a8\u6001\u8c03\u8bd5\u7684\u6a21\u5757\uff0c\u7136\u540e\u66ff\u6362\u8fd9\u4e9b\u6a21\u5757\u4e2d\u7684\u51fd\u6570\uff0c\u90a3\u4e48 APISIX \u662f\u5982\u4f55\u66ff\u6362\u51fd\u6570\u7684\u5462\uff1f\u8bf7\u770b\u4e0b\u56fe\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0820/12.png",alt:"network error/log error.png"})),(0,l.kt)("p",null,"\u5728\u9759\u6001\u8bed\u8a00\u4e2d\uff0c\u5982\u679c\u8981\u4fee\u6539\u4ee3\u7801\uff0c\u5c31\u9700\u8981\u91cd\u65b0\u7f16\u8bd1\u4ee3\u7801\uff0c\u4f46\u662f\u5728\u52a8\u6001\u8bed\u8a00 Lua \u4e2d\uff0c\u8fd0\u884c\u65f6\u66ff\u6362\u51fd\u6570\u662f\u975e\u5e38\u7b80\u5355\u7684\u3002"),(0,l.kt)("p",null,"\u5728 OpenResty \u4e16\u754c\u4e2d\uff0c\u6bcf\u4e2a\u6a21\u5757\u5b9e\u9645\u4e0a\u90fd\u662f\u4e00\u4e2a ",(0,l.kt)("inlineCode",{parentName:"p"},"table"),"\uff0cLua \u4e2d\u6709\u7279\u6b8a\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable"),"\uff0c\u4e5f\u5c31\u662f\u5143\u8868\u673a\u5236\uff0c\u4f60\u53ef\u4ee5\u7ed9\u6bcf\u4e2a ",(0,l.kt)("inlineCode",{parentName:"p"},"table")," \u8bbe\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable"),"\u3002\u800c ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable")," \u4e2d\u6709\u4e00\u4e2a\u7279\u6b8a\u7684\u88ab\u79f0\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"_call")," \u7684\u5143\u51fd\u6570\uff0c\u8be5\u5143\u51fd\u6570\u53ef\u4ee5\u8bbe\u7f6e\u6a21\u5757\u4e2d\u51fd\u6570\u88ab\u8c03\u7528\u524d\u540e\u7684\u884c\u4e3a\u3002"),(0,l.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u8c03\u8bd5\u67d0\u4e2a\u6a21\u5757\u65f6\uff0cAPISIX \u5c31\u4f1a\u627e\u5230\u8be5\u6a21\u5757\uff0c\u5e76\u4e14\u7ed9\u8be5\u6a21\u5757\u8bbe\u7f6e\u4e00\u4e2a ",(0,l.kt)("inlineCode",{parentName:"p"},"metatable"),"\uff0c\u5b9a\u4e49 ",(0,l.kt)("inlineCode",{parentName:"p"},"_call")," \u5143\u51fd\u6570\u3002\u901a\u8fc7\u8fd9\u79cd\u65b9\u5f0f\uff0cAPISIX \u5c31\u53ef\u4ee5\u63a7\u5236\u9700\u8981\u88ab\u52a8\u6001\u8c03\u8bd5\u7684\u51fd\u6570\uff0c\u83b7\u53d6\u8fd9\u4e9b\u51fd\u6570\u7684\u53c2\u6570\uff0c\u5728\u8c03\u8bd5\u6a21\u5757\u4e2d\u8fd0\u884c\u8fd9\u4e9b\u51fd\u6570\uff0c\u7136\u540e\u83b7\u5f97\u5b83\u4eec\u7684\u6267\u884c\u7ed3\u679c\uff0c\u8f93\u51fa\u5728\u65e5\u5fd7\u4e2d\uff0c\u5e76\u4e14\u8fd4\u56de\u51fd\u6570\u8c03\u7528\u7ed3\u679c\u3002\u4ee5\u4e0a\u6b65\u9aa4\u76f8\u5f53\u4e8e\u5229\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"_call")," \u5143\u51fd\u6570\u4f5c\u4e3a\u5207\u5165\u70b9\uff0c\u5bf9\u88ab\u8c03\u8bd5\u7684\u51fd\u6570\u8fdb\u884c\u4e86\u5207\u9762\u3002\u66f4\u591a\u7ec6\u8282\uff0c\u8bf7\u53c2\u8003",(0,l.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/f0f5b48a8fbe78051e7ab97b979cc1632b2c9d2a/apisix/debug.lua"},"\u6e90\u7801"),"\u3002"),(0,l.kt)("h2",{id:"\u6700\u4f73\u5b9e\u8df5"},"\u6700\u4f73\u5b9e\u8df5"),(0,l.kt)("p",null,"\u901a\u8fc7\u4ee5\u4e0a\u5185\u5bb9\uff0c\u76f8\u4fe1\u4f60\u5bf9\u52a8\u6001\u8c03\u8bd5\u6709\u4e86\u66f4\u6df1\u523b\u7684\u7406\u89e3\u3002\u4ee5\u4e0b\u662f\u5728\u5b9e\u9645\u4f7f\u7528\u8be5\u529f\u80fd\u7684\u8fc7\u7a0b\u4e2d\u603b\u7ed3\u51fa\u6765\u7684\u7ecf\u9a8c\uff0c\u5e0c\u671b\u5e2e\u52a9\u4f60\u5728\u4f7f\u7528\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u65f6\u66f4\u52a0\u5f97\u5fc3\u5e94\u624b\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("inlineCode",{parentName:"li"},"hook_conf")," \u4e00\u6b21\u53ea\u80fd\u914d\u7f6e 1 \u4e2a\u6a21\u5757\uff0c\u53ef\u4ee5\u914d\u7f6e\u8fd9\u4e2a\u6a21\u5757\u4e0b\u7684\u591a\u4e2a\u51fd\u6570\uff1b"),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("inlineCode",{parentName:"li"},"hook_conf")," \u4f7f\u7528\u7684\u662f Lua \u7684 ",(0,l.kt)("inlineCode",{parentName:"li"},"package")," \u641c\u7d22\u89c4\u5219\uff1a",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u5bf9\u4e8e APISIX \u5185\u7684\u51fd\u6570\u9700\u8981\u52a0\u4e0a ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix")," \u524d\u7f00\uff0c\u6bd4\u5982 ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix/core/table.lua"),"\uff0c\u9700\u8981\u914d\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix.core.table"),"\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u5bf9\u4e8e\u5176\u4ed6\u4f9d\u8d56\u6a21\u5757\u548c OpenResty \u6a21\u5757\uff0c\u6bd4\u5982 OpenResty \u7684 ",(0,l.kt)("inlineCode",{parentName:"li"},"dns resolver")," \u6a21\u5757\uff0c\u914d\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"resty.dns.resolver"),"\u3002"))),(0,l.kt)("li",{parentName:"ol"},"\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u53ea\u80fd\u6253\u5370\u6a21\u5757\u7ea7\u51fd\u6570\uff08\u4e00\u822c\u662f ",(0,l.kt)("inlineCode",{parentName:"li"},"function _M.xxx")," \u5f62\u5f0f\uff09\uff0c\u79c1\u6709\u51fd\u6570\u4e0d\u80fd\u6253\u5370\uff1b"),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("inlineCode",{parentName:"li"},"hook_conf"),"\u53ef\u4ee5\u914d\u7f6e\u591a\u4efd\uff0c\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"li"},"hook_conf.name")," \u6765\u6307\u5b9a\u5177\u4f53\u7684\u67d0\u4e00\u4efd\u914d\u7f6e\uff1b"),(0,l.kt)("li",{parentName:"ol"},"\u79ef\u7d2f\u6210\u719f\u7684 ",(0,l.kt)("inlineCode",{parentName:"li"},"debug.yaml"),"\uff0c\u9700\u8981\u65f6\u76f4\u63a5\u66ff\u6362\u3002")),(0,l.kt)("h2",{id:"\u66f4\u591a\u671f\u5f85"},"\u66f4\u591a\u671f\u5f85"),(0,l.kt)("p",null,"\u6700\u540e\u6211\u4eec\u6765\u770b\u4e00\u4e0b\u76ee\u524d\u5bf9 APISIX \u52a8\u6001\u8c03\u8bd5\u80fd\u529b\u7684\u8bbe\u60f3\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u9700\u8981\u80fd\u591f\u52a8\u6001\u83b7\u53d6\u6307\u5b9a\u51fd\u6570\u7684\u53c2\u6570\u8f93\u51fa\uff08\u5141\u8bb8\u81ea\u7531\u6267\u884c\uff0c\u81ea\u5b9a\u4e49\u4ee3\u7801\uff09",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u83b7\u53d6 CPU\u3001\u5185\u5b58\u3001\u78c1\u76d8\u7b49\u73af\u5883\u4fe1\u606f"),(0,l.kt)("li",{parentName:"ul"},"\u80fd\u591f\u81ea\u7531\u6253\u5370\u51fd\u6570\u7684\u8f93\u5165\u3001\u8f93\u51fa\u53c2\u6570"))),(0,l.kt)("li",{parentName:"ol"},"\u5728 ",(0,l.kt)("inlineCode",{parentName:"li"},"privilege agent")," \u4e0a\u6267\u884c\u7279\u5b9a\u547d\u4ee4\uff0c\u5e76\u83b7\u53d6\u8fd4\u56de\u7ed3\u679c"),(0,l.kt)("li",{parentName:"ol"},"\u8c03\u8bd5\u5de5\u5177\u5177\u5907\u8fd0\u884c\u65f6\u81ea\u8eab\u52a8\u6001\u66f4\u65b0\u7684\u80fd\u529b\uff08\u62c6\u5206 ",(0,l.kt)("inlineCode",{parentName:"li"},"debug")," \u6a21\u5757\u4e3a\u89e3\u6790\u5668\u548c\u8fd0\u884c\u5668\uff09")),(0,l.kt)("p",null,"\u5bf9\u4e8e\u4ee5\u4e0a\u8bbe\u60f3\u53ef\u80fd\u4e0d\u592a\u5bb9\u6613\u7406\u89e3\uff0c\u53ef\u4ee5\u770b\u4e0b\u901a\u8fc7\u4e0a\u8ff0\u63cf\u8ff0\u6a21\u62df\u51fa\u6765\u7684\u914d\u7f6e\u3002\u5b83\u770b\u8d77\u6765\u7a0d\u663e\u590d\u6742\uff0c\u4f46\u662f\u5c55\u73b0\u7684\u6784\u60f3\u6548\u679c\u5374\u662f\u975e\u5e38\u60ca\u8273\u7684\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-lua"},'hook_conf:\n  enable: false\n  log_level: warn\n  is_print_input_args: true\n  is_print_return_value: trueenable_modules:\n    - hook_http_access_phase\n    - hook_plugin_kafka\n  modules:\n    hook_http_access_phase:\n      lua_code_before: |\n        ... ...\n        core.log.error(core.json.encode(conf))\n      apisix:\n        - http_access_phase\n    hook_control_api_status:\n      lua_code_before: |\n        ... ...\n        if ngx.var.uri == " /status" then\n            -- CPU\\disk\\memory\n            ngx.say( \\ "cpu : \\", ...)\n            ngx.exit( 200)\n        end\n      apisix.control-api:\n      - http_access_phase\n    hook_plugin_kafka:\n      lua_code_before:|\n      ... ...\n      core.log.error(core.json.encode(conf))\n    apisix.plugins.kafka-logger:\n      - access\n      - body_filter\n#END\n')),(0,l.kt)("p",null,"\u4ee5\u4e0a\u4ee3\u7801\u91ca\u4e49\u5982\u4e0b\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"hook_http_access_phase"),"\u3001 ",(0,l.kt)("inlineCode",{parentName:"li"},"hook_control_api_status"),"\u3001",(0,l.kt)("inlineCode",{parentName:"li"},"hook_plugin_kafka")," \u662f\u4e0d\u540c\u914d\u7f6e\u5757\u7684\u540d\u5b57\uff0c",(0,l.kt)("inlineCode",{parentName:"li"},"debug")," \u6a21\u5757\u6839\u636e ",(0,l.kt)("inlineCode",{parentName:"li"},"hook_conf.enable_modules")," \u6765\u5bfb\u627e\u4e0b\u65b9\u7684\u5b9a\u4e49\u597d\u7684\u914d\u7f6e\u5757\u3002\n\u6bd4\u5982\u4e0a\u9762 ",(0,l.kt)("inlineCode",{parentName:"li"},"hook_conf.enable_modules")," \u5bf9\u5e94\u7684\u662f ",(0,l.kt)("inlineCode",{parentName:"li"},"hook_plugin_kafka"),"\uff0c\u90a3\u4e48\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u53ea\u4f1a\u5173\u8054\u4e0b\u65b9 ",(0,l.kt)("inlineCode",{parentName:"li"},"hook_plugin_kafka")," \u914d\u7f6e\u5757\u4e2d\u7684\u5185\u5bb9\u3002\n\u8fd9\u6837\u505a\u7684\u597d\u5904\u662f\u6211\u4eec\u53ef\u4ee5\u9884\u5148\u5728 debug.yaml \u4e2d\u5199\u597d\u4e00\u7ec4\u5e38\u7528\u7684\u914d\u7f6e\uff0c\u7136\u540e\u6839\u636e\u9700\u8981\u4fee\u6539 hook_conf.enable_modules \u6765\u5207\u6362\u4e0d\u540c\u7684\u914d\u7f6e\u5757\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"lua_code_before"),"\uff1a\u4e2d\u8868\u793a\u5728\u9700\u8981 ",(0,l.kt)("inlineCode",{parentName:"li"},"hook")," \u7684\u51fd\u6570\u4e4b\u524d\u6267\u884c\u7684\u4ee3\u7801\uff0c\u6bd4\u5982 ",(0,l.kt)("inlineCode",{parentName:"li"},"hook_plugin_kafka")," \u4e2d\u7684\u914d\u7f6e\uff0c\u8868\u793a\u5728\u6267\u884c ",(0,l.kt)("inlineCode",{parentName:"li"},"kafka-logger")," \u63d2\u4ef6\u7684 access \u51fd\u6570\u4e4b\u524d\uff0c\u5148\u6267\u884c",(0,l.kt)("inlineCode",{parentName:"li"},"core.log.error(core.json.encode(conf))")," \u3002\u5f53\u7136\uff0c\u4e5f\u4f1a\u6709 ",(0,l.kt)("inlineCode",{parentName:"li"},"lua_code_after"),"\uff0c\u8868\u793a\u5728\u6267\u884c\u6307\u5b9a ",(0,l.kt)("inlineCode",{parentName:"li"},"hook")," \u7684\u51fd\u6570\u4e4b\u540e\u6267\u884c\u3002")),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"\u672c\u6587\u901a\u8fc7\u5b9e\u9645\u6848\u4f8b\u4e3a\u5927\u5bb6\u4ecb\u7ecd\u4e86\u5982\u4f55\u5728 Apache APISIX \u4e2d\u4f7f\u7528\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\uff0c\u5f53\u7cfb\u7edf\u4e2d\u51fa\u73b0\u4e0d\u660e Bug \u65f6\uff0c\u5229\u7528\u52a8\u6001\u8c03\u8bd5\u529f\u80fd\u53ef\u4ee5\u5e2e\u52a9\u4f60\u5feb\u901f\u5b9a\u4f4d Bug\uff0c\u4ece\u800c\u89e3\u51b3 Bug\u3002\u5982\u679c\u4f60\u5bf9\u52a8\u6001\u8c03\u8bd5\u6709\u66f4\u597d\u7684\u8bbe\u60f3\u548c\u5efa\u8bae\uff0c\u6b22\u8fce\u5230\u793e\u533a\u4e2d\u8fdb\u884c\u8ba8\u8bba\u3002"))}c.isMDXComponent=!0}}]);