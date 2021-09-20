"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[903],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},p=Object.keys(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),o=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=o(e.components);return a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,p=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=o(n),h=r,I=d["".concat(l,".").concat(h)]||d[h]||s[h]||p;return n?a.createElement(I,c(c({ref:t},u),{},{components:n})):a.createElement(I,c({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=n.length,c=new Array(p);c[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var o=2;o<p;o++)c[o]=n[o];return a.createElement.apply(null,c)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},23375:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return l},assets:function(){return o},toc:function(){return u},default:function(){return d}});var a=n(87462),r=n(63366),p=(n(67294),n(3905)),c={title:"Apache APISIX \u5728\u817e\u8baf\u4e91\u667a\u80fd\u949b\u5e73\u53f0\u4e2d\u7684\u843d\u5730\u5b9e\u8df5",author:"\u5201\u5bff\u94a7",keywords:["Apache APISIX","\u817e\u8baf\u4e91","Kong","Nginx"],description:"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u4e86\u817e\u8baf\u4e91\u667a\u80fd\u949b\u5e73\u53f0\u4f7f\u7528 Apache APISIX \u7684\u4f01\u4e1a\u6848\u4f8b\uff0c\u4ee5\u53ca\u4f7f\u7528 Apache APISIX \u4f5c\u4e3a\u4ea7\u54c1\u6d41\u91cf\u7f51\u5173\u7684\u5177\u4f53\u4f8b\u5b50\u3002",tags:["Practical Case"]},i=void 0,l={permalink:"/zh/blog/2021/09/16/tencent-cloud",source:"@site/blog/2021-09-16-tencent-cloud.md",title:"Apache APISIX \u5728\u817e\u8baf\u4e91\u667a\u80fd\u949b\u5e73\u53f0\u4e2d\u7684\u843d\u5730\u5b9e\u8df5",description:"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u4e86\u817e\u8baf\u4e91\u667a\u80fd\u949b\u5e73\u53f0\u4f7f\u7528 Apache APISIX \u7684\u4f01\u4e1a\u6848\u4f8b\uff0c\u4ee5\u53ca\u4f7f\u7528 Apache APISIX \u4f5c\u4e3a\u4ea7\u54c1\u6d41\u91cf\u7f51\u5173\u7684\u5177\u4f53\u4f8b\u5b50\u3002",date:"2021-09-16T00:00:00.000Z",formattedDate:"2021\u5e749\u670816\u65e5",tags:[{label:"Practical Case",permalink:"/zh/blog/tags/practical-case"}],readingTime:1.145,truncated:!0,authors:[{name:"\u5201\u5bff\u94a7"}],prevItem:{title:"Apache APISIX \u52a9\u529b\u4fbf\u5229\u5145\u7535\u521b\u9886\u8005\u5c0f\u7535\uff0c\u5b9e\u73b0\u4e91\u539f\u751f\u65b9\u6848",permalink:"/zh/blog/2021/09/18/xiaodian-usercase"},nextItem:{title:"\u793e\u533a\u5468\u62a5\uff5c\u65b0\u664b committer \u4e24\u4f4d\uff0c\u529f\u80fd\u4eae\u70b9\u66f4\u65b0\u8fdb\u884c\u4e2d",permalink:"/zh/blog/2021/09/15/weekly-report"}},o={authorsImageUrls:[void 0]},u=[{value:"\u80cc\u666f\u4ecb\u7ecd",id:"\u80cc\u666f\u4ecb\u7ecd",children:[]},{value:"\u4ea7\u54c1\u9700\u6c42",id:"\u4ea7\u54c1\u9700\u6c42",children:[]},{value:"\u8c03\u7814\u5bf9\u6bd4",id:"\u8c03\u7814\u5bf9\u6bd4",children:[{value:"\u4e3a\u4ec0\u4e48\u9009\u62e9\u4e86 Apache APISIX\uff1f",id:"\u4e3a\u4ec0\u4e48\u9009\u62e9\u4e86-apache-apisix\uff1f",children:[]}]},{value:"\u57fa\u4e8e Apache APISIX \u7684\u67b6\u6784\u8c03\u6574",id:"\u57fa\u4e8e-apache-apisix-\u7684\u67b6\u6784\u8c03\u6574",children:[]},{value:"\u5b9e\u4f8b\u5206\u4eab",id:"\u5b9e\u4f8b\u5206\u4eab",children:[{value:"\u53cd\u76f4\u89c9\u7684 Nginx \u914d\u7f6e",id:"\u53cd\u76f4\u89c9\u7684-nginx-\u914d\u7f6e",children:[]},{value:"\u6d4b\u8bd5\u7528\u4f8b\u5373\u6587\u6863",id:"\u6d4b\u8bd5\u7528\u4f8b\u5373\u6587\u6863",children:[]}]},{value:"\u601d\u8003\u4e0e\u5c55\u671b",id:"\u601d\u8003\u4e0e\u5c55\u671b",children:[]},{value:"\u4e2a\u4eba\u671f\u671b",id:"\u4e2a\u4eba\u671f\u671b",children:[]}],s={toc:u};function d(e){var t=e.components,n=(0,r.Z)(e,["components"]);return(0,p.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u4e86\u817e\u8baf\u4e91\u667a\u80fd\u949b\u5e73\u53f0\u4f7f\u7528 Apache APISIX \u7684\u4f01\u4e1a\u6848\u4f8b\uff0c\u4ee5\u53ca\u4f7f\u7528 Apache APISIX \u4f5c\u4e3a\u4ea7\u54c1\u6d41\u91cf\u7f51\u5173\u7684\u5177\u4f53\u4f8b\u5b50\u3002")),(0,p.kt)("h2",{id:"\u80cc\u666f\u4ecb\u7ecd"},"\u80cc\u666f\u4ecb\u7ecd"),(0,p.kt)("p",null,"\u817e\u8baf\u4e91\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\uff08TI-ONE\uff09\u662f\u4e3a AI \u5de5\u7a0b\u5e08\u6253\u9020\u7684\u4e00\u7ad9\u5f0f\u673a\u5668\u5b66\u4e60\u670d\u52a1\u5e73\u53f0\uff0c\u4e3a\u7528\u6237\u63d0\u4f9b\u4ece\u6570\u636e\u9884\u5904\u7406\u3001\u6a21\u578b\u6784\u5efa\u3001\u6a21\u578b\u8bad\u7ec3\u5230\u6a21\u578b\u8bc4\u4f30\u7684\u5168\u6d41\u7a0b\u5f00\u53d1\u652f\u6301\u3002\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u5185\u7f6e\u4e30\u5bcc\u7684\u7b97\u6cd5\u7ec4\u4ef6\uff0c\u652f\u6301\u591a\u79cd\u7b97\u6cd5\u6846\u67b6\uff0c\u6ee1\u8db3\u591a\u79cd AI \u5e94\u7528\u573a\u666f\u7684\u9700\u6c42\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1631781110822-39c59a83-aa18-4934-a2ef-43cd58866878.jpg",alt:"\u817e\u8baf\u4e91\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u67b6\u6784\u56fe"})),(0,p.kt)("h2",{id:"\u4ea7\u54c1\u9700\u6c42"},"\u4ea7\u54c1\u9700\u6c42"),(0,p.kt)("p",null,"\u6211\u4eec\u5c06\u9700\u6c42\u5206\u4e3a\u4e24\u5927\u7c7b\uff1a\u6280\u672f\u9700\u6c42\uff0c\u5373\u7814\u53d1\u56e2\u961f\u5bf9\u4e8e API \u7f51\u5173\u7684\u9700\u6c42\uff1b\u4e1a\u52a1\u9700\u6c42\uff0c\u5373\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u4f7f\u7528\u8005\u5bf9\u4e8e API \u7f51\u5173\u7684\u9700\u6c42\u3002"),(0,p.kt)("p",null,"\u6280\u672f\u5c42\u9762\u4e3b\u8981\u9700\u6c42\u4e3a\u5177\u5907\u8de8\u6a2a\u5207\u9762\u529f\u80fd\u3002\u5177\u4f53\u6765\u8bf4\uff0c\u662f\u5c06\u9274\u6743\u3001\u9650\u6d41\u3001\u65e5\u5fd7\u3001\u76d1\u63a7\u7b49\u8de8\u6a2a\u5207\u9762\u7684\u529f\u80fd\u5185\u805a\u5230 API \u7f51\u5173\uff0c\u5bf9\u540e\u7aef\u670d\u52a1\u8fdb\u884c\u89e3\u8026\uff0c\u4f7f\u7814\u53d1\u805a\u7126\u529f\u80fd\u5f00\u53d1\uff0c\u5e76\u4e14\u964d\u4f4e\u7ef4\u62a4\u6210\u672c\u3002"),(0,p.kt)("p",null,"\u8003\u8651\u5230\u540e\u7eed\u4e1a\u52a1\u5bf9\u63a5\u817e\u8baf\u4e91\u7684\u9700\u6c42\uff0cAPI \u7f51\u5173\u5fc5\u987b\u652f\u6301\u817e\u8baf\u5b9a\u5236\u7684\u9274\u6743\u548c\u767b\u5f55\u673a\u5236\u4ee5\u53ca\u9075\u5b88\u817e\u8baf\u4e91 API 3.0 \u7684\u683c\u5f0f\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1632067141398-816af366-f7d5-47ad-ad85-3df534ada734.58",alt:"\u817e\u8baf\u4e91\u7f51\u5173\u6280\u672f\u9700\u6c42"})),(0,p.kt)("p",null,"\u4e1a\u52a1\u5c42\u9762\u5219\u4e3b\u8981\u8003\u8651\u4f7f\u7528\u8005\u611f\u53d7\u3002\u5e73\u53f0\u8fdb\u884c\u5f00\u53d1\u65f6\uff0cAI \u548c\u7b97\u6cd5\u540c\u4e8b\u9700\u8981\u4ea4\u4e92\u5f0f\u7f16\u7a0b\u73af\u5883\uff0c\u90a3\u4e48\u5c31\u9700\u8981 API \u7f51\u5173\u652f\u6301 Notebook\u3002\u5b8c\u6210\u90e8\u7f72\u540e\uff0cAPI \u7f51\u5173\u9700\u8981\u5177\u6709\u6d41\u91cf\u5206\u914d\u529f\u80fd\u548c\u8db3\u591f\u9ad8\u7684\u6027\u80fd\uff0c\u6ee1\u8db3\u591a\u7528\u6237\u76f4\u63a5\u8c03\u7528\u63a5\u53e3\u7684\u573a\u666f\u3002\u8fd8\u9700\u652f\u6301\u8bf7\u6c42\u7ea7\u522b\u7684\u76d1\u63a7\uff0c\u5305\u62ec\u65e5\u5fd7\uff08Logging\uff09\u76d1\u63a7\u548c\u6307\u6807\uff08Metrics\uff09\u76d1\u63a7\u3002"),(0,p.kt)("p",null,"\u7efc\u5408\u4ee5\u4e0a\u9700\u6c42\uff0c\u6211\u4eec\u8fdb\u884c\u4e86\u76f8\u5173\u7f51\u5173\u4ea7\u54c1\u7684\u8c03\u7814\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1631781748143-8e30a89c-99b8-45ed-b6e6-1dddaa838342.jpg",alt:"\u817e\u8baf\u4e91\u7f51\u5173\u9009\u578b\u8003\u91cf"})),(0,p.kt)("h2",{id:"\u8c03\u7814\u5bf9\u6bd4"},"\u8c03\u7814\u5bf9\u6bd4"),(0,p.kt)("p",null,"\u8fdb\u5165\u6211\u4eec\u8003\u5bdf\u540d\u5355\u7684\u6709\uff1aEnvoy\u3001Kong \u4ee5\u53ca Apache APISIX\u3002\u6211\u4eec\u4ece\u591a\u7ef4\u5ea6\u5bf9\u4e0a\u8ff0\u4e09\u4e2a\u4ea7\u54c1\u8fdb\u884c\u4e86\u5bf9\u6bd4\uff0c\u7ed3\u679c\u5982\u4e0b\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1631781764958-a2cadf83-80b4-4b50-ba42-76b21d0d211a.jpg",alt:"\u7ade\u54c1\u5206\u6790\u4e0e\u5bf9\u6bd4"})),(0,p.kt)("p",null,"\u56e0\u4e3a Envoy \u7684\u6280\u672f\u6808\u662f C++\uff0c\u9700\u8981\u5b9a\u4f4d\u95ee\u9898\u65f6\uff0c\u5f88\u53ef\u80fd\u8981\u53bb\u770b C++ \u7684\u6e90\u4ee3\u7801\u3002\u8fd9\u79cd\u5b9a\u4f4d\u95ee\u9898\u53ef\u80fd\u4f1a\u5bf9\u6211\u4eec\u9020\u6210\u4e00\u5b9a\u7684\u5f71\u54cd\uff0c\u6240\u4ee5 Envoy \u8fd9\u4e2a\u65b9\u6848\u5426\u51b3\u5f97\u6bd4\u8f83\u65e9\u3002"),(0,p.kt)("p",null,"Kong \u548c Apache APISIX \u6240\u4f7f\u7528\u7684\u6280\u672f\u6808\u76f8\u540c\uff0c\u90fd\u662f OpenResty\u3002\u4f46\u662f\u5728\u5b58\u50a8\u4f9d\u8d56\u8fd9\u4e00\u680f\uff0cKong \u4f9d\u8d56\u7684\u662f\u5173\u7cfb\u578b\u6570\u636e\u5e93 PostgreSQL\u3002\u5728\u8f6f\u4ef6\u884c\u4e1a\uff0c\u6570\u636e\u5e93\u7684\u9ad8\u53ef\u7528\u914d\u7f6e\u662f\u975e\u5e38\u590d\u6742\u7684\u3002\u4e0d\u4ec5\u9700\u8981\u914d\u5907\u4e13\u95e8\u7684 DBA\uff0c\u800c\u4e14\u5b9e\u65bd\u96be\u5ea6\u4e5f\u975e\u5e38\u5927\u3002\u5173\u7cfb\u578b\u6570\u636e\u5e93\u592a\u91cd\u4e86\uff0c\u6211\u4eec\u5e76\u4e0d\u9700\u8981\u4f7f\u7528\u5173\u7cfb\u578b\u6570\u636e\u5e93\u6765\u4fdd\u8bc1 ACID \u548c MVCC\u3002"),(0,p.kt)("h3",{id:"\u4e3a\u4ec0\u4e48\u9009\u62e9\u4e86-apache-apisix\uff1f"},"\u4e3a\u4ec0\u4e48\u9009\u62e9\u4e86 Apache APISIX\uff1f"),(0,p.kt)("p",null,"Apache APISIX \u5728\u5b58\u50a8\u4f9d\u8d56\u548c\u8def\u7531\u89c4\u5219\u8fd9\u4e24\u65b9\u9762\u505a\u7684\u975e\u5e38\u597d\uff0c\u5f88\u9002\u5408\u6211\u4eec\u7684\u4e1a\u52a1\u573a\u666f\u3002\u6211\u4eec\u7684\u4e1a\u52a1\u6bd4\u8f83\u770b\u91cd\u8def\u7531\u7075\u6d3b\u5ea6\u548c\u8def\u7531\u5339\u914d\u7b97\u6cd5\u3002\u76ee\u524d\u5df2\u63a5\u5165 50 \u591a\u4e2a\u4e0a\u6e38\u548c\u6570\u767e\u6761\u8def\u7531\u89c4\u5219\uff0c\u6240\u4ee5\u6211\u4eec\u5e0c\u671b\u8def\u7531\u5339\u914d\u7684\u6027\u80fd\u8d8a\u9ad8\u8d8a\u597d\u3002Apache APISIX \u8def\u7531\u5339\u914d\u7b97\u6cd5\u590d\u6742\u5ea6\u660e\u663e\u4f18\u4e8e Kong\uff0c\u4e14\u914d\u7f6e\u751f\u6548\u65f6\u95f4\u5c0f\u4e8e 1ms\uff0c\u5355\u6838 QPS \u8fdc\u9ad8\u4e8e Kong\u3002\u7efc\u5408\u4ee5\u4e0a\u6280\u672f\u548c\u64cd\u4f5c\u5c42\u9762\uff0c\u6211\u4eec\u6700\u7ec8\u9009\u62e9\u4e86 Apache APISIX\u3002"),(0,p.kt)("h2",{id:"\u57fa\u4e8e-apache-apisix-\u7684\u67b6\u6784\u8c03\u6574"},"\u57fa\u4e8e Apache APISIX \u7684\u67b6\u6784\u8c03\u6574"),(0,p.kt)("p",null,"\u63a5\u5165 Apache APISIX \u540e\uff0c\u6211\u4eec\u5b8c\u6210\u4e86\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u7f51\u5173\u65b9\u9762\u7684\u529f\u80fd\uff0c\u89e3\u51b3\u4e86\u4e4b\u524d\u5173\u4e8e\u6280\u672f\u548c\u4e1a\u52a1\u5c42\u9762\u7684\u9700\u6c42\u3002"),(0,p.kt)("p",null,"\u4ece\u8fd9\u5f20\u56fe\u53ef\u4ee5\u770b\u5230\uff0c Apache APISIX \u652f\u6301 http+pb\u3001http+json\u3001gRPC\u3001WebSocket \u7b49\u6d41\u91cf\u3002\u8fd9\u4e9b\u6d41\u91cf\u7ecf\u8fc7\u4e86 Apache APISIX \u4e4b\u540e\uff0c\u4f1a\u8d70\u5411\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u5b9a\u5236\u5f00\u53d1\u7684\u4e00\u4e9b\u7ec4\u4ef6\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1631781850656-4235a4e8-2792-48ae-9c98-b4d75628a476.jpg",alt:"\u7f51\u5173\u67b6\u6784"})),(0,p.kt)("p",null,"\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u7684\u4e1a\u52a1\u90e8\u7f72\u5728\u817e\u8baf\u4e91 TKE \u5e73\u53f0\u4e0a\u3002\u4e3a\u4e86\u63d0\u9ad8\u5b83\u7684\u53ef\u7528\u6027\uff0c\u7f51\u5173\u3001 etcd \u7b49\u90fd\u662f\u96c6\u7fa4\u5316\u7684\u90e8\u7f72\u3002\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u6ca1\u6709\u4f7f\u7528 Apache APISIX \u7684 dashboard\uff0c\u800c\u662f\u76f4\u63a5\u901a\u8fc7 Admin API \u8fdb\u884c\u4ea4\u4e92\uff0c\u76f4\u63a5\u5199\u5230 etcd \u91cc\u9762\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1631781876752-faf1b7d0-abbb-4313-879c-e00d2b28334a.jpg",alt:"\u589e\u52a0\u63d2\u4ef6\u5904\u7406"})),(0,p.kt)("h2",{id:"\u5b9e\u4f8b\u5206\u4eab"},"\u5b9e\u4f8b\u5206\u4eab"),(0,p.kt)("p",null,"\u5728\u5b9e\u6218\u8fc7\u7a0b\u4e2d\uff0c\u6211\u4eec\u603b\u7ed3\u4e86\u4e00\u4e9b\u4f7f\u7528 Nginx \u7684\u5751\uff0c\u4e5f\u53d1\u73b0\u4e86\u4e00\u4e9b APISIX \u7684\u4f18\u70b9\uff0c\u5728\u6b64\u7b80\u5355\u5206\u4eab\u4e00\u4e0b\u3002"),(0,p.kt)("h3",{id:"\u53cd\u76f4\u89c9\u7684-nginx-\u914d\u7f6e"},"\u53cd\u76f4\u89c9\u7684 Nginx \u914d\u7f6e"),(0,p.kt)("p",null,"\u4ee5\u524d\u4f7f\u7528 Nginx \u7684\u65f6\u5019\uff0c\u611f\u89c9 Nginx \u662f\u4e00\u4e2a\u914d\u7f6e\u9a71\u52a8\u7684\u4ea7\u54c1\u3002\u53ef\u80fd\u4f1a\u9020\u6210\u7ba1\u7406\u56f0\u96be\u3001\u7ef4\u62a4\u6210\u672c\u9ad8\u7b49\u56f0\u6270\u3002Nginx \u5728\u914d\u7f6e\u7ba1\u7406\u7684\u65f6\u5019\uff0c\u5e38\u5e38\u4f1a\u6709\u4e00\u4e9b\u53cd\u76f4\u89c9\u7684\u4e8b\u60c5\u3002\u5728\u8fd9\u6b21\u5b9e\u6218\u8fc7\u7a0b\u4e2d\uff0c\u6211\u7684\u540c\u4e8b\u5c31\u9047\u5230\u8fd9\u4e48\u4e00\u4e2a\u53cd\u76f4\u89c9\u7684\u5751\uff1a"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1631781909354-0fada4fa-1154-4974-ae3d-292ab46e5889.jpg",alt:"Nginx \u914d\u7f6e\u9519\u8bef"})),(0,p.kt)("p",null,"\u5bf9\u4e8e\u63a5\u89e6 Nginx \u6bd4\u8f83\u5c11\u7684\u4eba\u6765\u8bf4\uff0c\u8fd9\u4e24\u884c\u547d\u4ee4\u52a0\u5728 ",(0,p.kt)("inlineCode",{parentName:"p"},"if")," \u524d\u9762\uff0c\u4e14 ",(0,p.kt)("inlineCode",{parentName:"p"},"if")," \u91cc\u9762\u5e76\u6ca1\u6709\u5176\u4ed6\u547d\u4ee4\u8986\u76d6\u8fd9\u4e24\u884c\u547d\u4ee4\uff0c\u90a3\u4e48\u5b83\u4eec\u662f\u5fc5\u7136\u4f1a\u88ab\u6267\u884c\u7684\u3002\u719f\u6089 Nginx \u7684\u4eba\u90fd\u77e5\u9053\uff0c",(0,p.kt)("inlineCode",{parentName:"p"},"if")," \u91cc\u9762\u7684\u547d\u4ee4\u4f1a\u8986\u76d6\u6389\u5916\u9762\u7684\u547d\u4ee4\uff0c\u4f46\u8fd9\u975e\u5e38\u53cd\u76f4\u89c9\u3002"),(0,p.kt)("h3",{id:"\u6d4b\u8bd5\u7528\u4f8b\u5373\u6587\u6863"},"\u6d4b\u8bd5\u7528\u4f8b\u5373\u6587\u6863"),(0,p.kt)("p",null,"\u5728\u5b9e\u8df5\u4f7f\u7528 Apache APISIX \u5b9e\u8df5\u7684\u8fc7\u7a0b\u4e2d\uff0cApache APISIX \u9879\u76ee\u7684\u6d4b\u8bd5\u7528\u4f8b\u5199\u7684\u975e\u5e38\u8be6\u7ec6\u3002\u5373\u4f7f\u6ca1\u6709\u6df1\u5165\u4e86\u89e3\u8fc7\u5982\u4f55\u5728 Apache APISIX \u4e2d\u8c03\u7528\u67d0\u4e9b\u51fd\u6570\uff0c\u4e5f\u5f80\u5f80\u80fd\u5728\u6d4b\u8bd5\u7528\u4f8b\u4e2d\u627e\u5230\u7b54\u6848\u3002\u540e\u6765\u518d\u9047\u5230\u4e00\u4e9b OpenResty \u7684\u95ee\u9898\u7684\u65f6\u5019\uff0c\u6211\u5c31\u4f1a\u5230\u8fd9\u4e9b\u6d4b\u8bd5\u7528\u4f8b\u91cc\u9762\u627e\u4e00\u627e\u6709\u6ca1\u6709\u76f8\u5173\u7684\u4ee3\u7801\uff0c\u6bcf\u6b21\u90fd\u80fd\u89e3\u51b3\u95ee\u9898\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1631781920390-a504ce7c-1ccd-4fb8-99a2-09d74be6bb7e.jpg",alt:"\u8be6\u7ec6\u7684\u6d4b\u8bd5\u7528\u4f8b"})),(0,p.kt)("h2",{id:"\u601d\u8003\u4e0e\u5c55\u671b"},"\u601d\u8003\u4e0e\u5c55\u671b"),(0,p.kt)("p",null,"\u5728\u6280\u672f\u9009\u578b\u7684\u521d\u671f\uff0c\u9664\u4e86 Envoy\u3001Kong \u548c Apache APISIX \u5916\uff0c\u4e5f\u6709\u540c\u4e8b\u63d0\u5230\u4e86 Service Mesh\u3002\u6709\u4e86 Service Mesh\uff0c\u4e3a\u4ec0\u4e48\u6211\u4eec\u8fd8\u8981\u9009\u62e9 Apache APISIX\uff0c\u8fd9\u96be\u9053\u4e0d\u662f\u5728\u6280\u672f\u4e0a\u5012\u9000\u5417\uff1f\u5173\u4e8e\u8fd9\u4e2a\u95ee\u9898\uff0c\u6211\u7684\u89c2\u70b9\u662f\u8fd9\u6837\u7684\uff1a"),(0,p.kt)("ol",null,(0,p.kt)("li",{parentName:"ol"},"API \u7f51\u5173\u5728\u7cfb\u7edf\u8fb9\u754c\uff0c\u8d1f\u8d23\u5904\u7406\u5357\u5317\u5411\u6d41\u91cf\uff1bService Mesh \u5728\u96c6\u7fa4\u5185\u90e8\uff0c\u8d1f\u8d23\u5904\u7406\u4e1c\u897f\u5411\u6d41\u91cf\u3002\u4e24\u8005\u7684\u529f\u80fd\u4e0d\u540c\uff0c\u65e0\u6cd5\u76f4\u63a5\u6bd4\u8f83\u3002"),(0,p.kt)("li",{parentName:"ol"},"\u5b9e\u8df5\u8bc1\u660e Service Mesh \u5b58\u5728\u4e00\u4e9b\u6027\u80fd\u635f\u8017\u3002\u4f46\u662f\u4e5f\u6709\u4e00\u79cd\u58f0\u97f3\u8bf4\uff0c\u4e0a\u4e91\u4e86\uff0c\u8fd9\u70b9\u635f\u8017\u53ef\u80fd\u5e76\u4e0d\u662f\u4e1a\u52a1\u7684\u6027\u80fd\u74f6\u9888\uff0c\u6240\u4ee5\u8fd9\u70b9\u662f\u89c1\u4ec1\u89c1\u667a\u7684\u3002"),(0,p.kt)("li",{parentName:"ol"},"\u5f97\u76ca\u4e8e OpenResty \u548c Lua \u7b80\u5355\u6613\u4e0a\u624b\u7684\u7279\u6027\uff0cApache APISIX \u7684\u5b9a\u5236\u7814\u53d1\u6548\u7387\u66f4\u9ad8\u3002 \u5373\u4f7f\u5f00\u53d1\u56e2\u961f\u5148\u524d\u6ca1\u6709\u4f7f\u7528 OpenResty \u6216\u8005 Lua \u7684\u5f00\u53d1\u7ecf\u9a8c\uff0c\u4ecd\u7136\u80fd\u5728\u5f88\u77ed\u7684\u65f6\u95f4\u5185\u5b8c\u6210\u4e86\u4e1a\u52a1\u7684\u5b9a\u5236\u5f00\u53d1\u9700\u6c42\u3002"),(0,p.kt)("li",{parentName:"ol"},"Apache APISIX \u7684\u4ea4\u4ed8\u6210\u672c\u8981\u4f4e\u4e8e Service Mesh\u3002\u56e0\u4e3a Istio \u793e\u533a\u975e\u5e38\u6d3b\u8dc3\uff0c\u7248\u672c\u8fed\u4ee3\u901f\u5ea6\u975e\u5e38\u5feb\uff0c\u5bfc\u81f4 Istio \u7684\u5404\u4e2a\u7248\u672c\u548c Kubernetes \u7684\u5404\u4e2a\u7248\u672c\u4e4b\u95f4\u6709\u4e0d\u517c\u5bb9\u7684\u95ee\u9898\u3002\u5728\u5ba2\u6237\u7684\u751f\u4ea7\u73af\u5883\u4e2d\uff0c \u4e00\u4e9b Kubernetes \u96c6\u7fa4\u53ef\u80fd\u6709\u7248\u672c\u5dee\u5f02\uff0c\u800c\u8fd9\u4e9b Kubernetes \u96c6\u7fa4\u65e0\u6cd5\u5171\u7528\u4e00\u4e2a\u7248\u672c\u7684 Istio\uff0c\u8fd9\u5728\u5b9e\u9645\u4ea4\u4ed8\u7684\u8fc7\u7a0b\u4e2d\u662f\u4f1a\u9020\u6210\u4e00\u4e9b\u56f0\u6270\u3002")),(0,p.kt)("h2",{id:"\u4e2a\u4eba\u671f\u671b"},"\u4e2a\u4eba\u671f\u671b"),(0,p.kt)("p",null,"\u611f\u8c22 Apache APISIX \u521b\u9020\u4e86\u4e00\u6b3e\u6027\u80fd\u6781\u81f4\u800c\u4e14\u6613\u4e8e\u4e0a\u624b\u7684\u5f00\u6e90 API \u7f51\u5173\u4ea7\u54c1\u3002\u5728\u667a\u80fd\u949b\u673a\u5668\u5b66\u4e60\u5e73\u53f0\u7f51\u7684\u5f00\u53d1\u8fc7\u7a0b\u4e2d\uff0c\u5e0c\u671b\u540e\u7eed\u53ef\u4ee5\u5728\u5b9e\u8df5\u4e2d\u603b\u7ed3\u51fa\u66f4\u591a\u7684\u4f7f\u7528\u5fc3\u5f97\uff0c\u53cd\u9988\u7ed9 Apache APISIX \u793e\u533a\u3002"))}d.isMDXComponent=!0}}]);