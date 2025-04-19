"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[56380],{35318:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>k});var n=a(27378);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var o=n.createContext({}),c=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},u=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,i=e.originalType,o=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),s=c(a),k=l,h=s["".concat(o,".").concat(k)]||s[k]||m[k]||i;return a?n.createElement(h,p(p({ref:t},u),{},{components:a})):n.createElement(h,p({ref:t},u))}));function k(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=a.length,p=new Array(i);p[0]=s;var r={};for(var o in t)hasOwnProperty.call(t,o)&&(r[o]=t[o]);r.originalType=e,r.mdxType="string"==typeof e?e:l,p[1]=r;for(var c=2;c<i;c++)p[c]=a[c];return n.createElement.apply(null,p)}return n.createElement.apply(null,a)}s.displayName="MDXCreateElement"},88693:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>m,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var n=a(25773),l=(a(27378),a(35318));const i={title:"\u57fa\u4e8e Apache APISIX \u7684\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0",authors:[{name:"\u9648\u5e86",title:"Author",url:"https://github.com/chenqing24",image_url:"https://avatars.githubusercontent.com/u/3502467?v=4"},{name:"\u97e9\u98de",title:"Technical Writer",url:"https://github.com/hf400159",image_url:"https://github.com/hf400159.png"}],keywords:["Apache APISIX","API \u7f51\u5173","\u81ea\u52a8\u5316","\u8fd0\u7ef4","\u5fae\u670d\u52a1","\u6743\u9650"],description:"\u672c\u6587\u7531\u524d\u540c\u7a0b\u6570\u79d1\u8fd0\u7ef4\u7ecf\u7406\u9648\u5e86\u4ecb\u7ecd\u4e86\u5982\u4f55\u57fa\u4e8e Apache APISIX \u5b9e\u73b0\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\uff0c\u5e76\u4ece\u7528\u6237\u767b\u5f55\u53ca\u9274\u6743\u573a\u666f\uff0c\u5e26\u6765\u66f4\u591a\u7ec6\u8282\u5c55\u793a\u3002",tags:["Case Studies"],image:"https://static.apiseven.com/2022/blog/0817/%E5%90%8C%E7%A8%8B%E6%95%B0%E7%A7%91.png"},p=void 0,r={permalink:"/zh/blog/2022/06/14/automated-operation-base-apache-apisix",source:"@site/blog/2022/06/14/automated-operation-base-apache-apisix.md",title:"\u57fa\u4e8e Apache APISIX \u7684\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0",description:"\u672c\u6587\u7531\u524d\u540c\u7a0b\u6570\u79d1\u8fd0\u7ef4\u7ecf\u7406\u9648\u5e86\u4ecb\u7ecd\u4e86\u5982\u4f55\u57fa\u4e8e Apache APISIX \u5b9e\u73b0\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\uff0c\u5e76\u4ece\u7528\u6237\u767b\u5f55\u53ca\u9274\u6743\u573a\u666f\uff0c\u5e26\u6765\u66f4\u591a\u7ec6\u8282\u5c55\u793a\u3002",date:"2022-06-14T00:00:00.000Z",formattedDate:"2022\u5e746\u670814\u65e5",tags:[{label:"Case Studies",permalink:"/zh/blog/tags/case-studies"}],readingTime:17.425,truncated:!0,authors:[{name:"\u9648\u5e86",title:"Author",url:"https://github.com/chenqing24",image_url:"https://avatars.githubusercontent.com/u/3502467?v=4",imageURL:"https://avatars.githubusercontent.com/u/3502467?v=4"},{name:"\u97e9\u98de",title:"Technical Writer",url:"https://github.com/hf400159",image_url:"https://github.com/hf400159.png",imageURL:"https://github.com/hf400159.png"}],prevItem:{title:"\u793e\u533a\u53cc\u5468\u62a5\uff086.01 - 6.15\uff09",permalink:"/zh/blog/2022/06/21/weekly-report-0621"},nextItem:{title:"APISIX \u52a9\u529b\u4e2d\u4e1c\u793e\u4ea4\u8f6f\u4ef6\uff0c\u5b9e\u73b0\u672c\u5730\u5316\u90e8\u7f72",permalink:"/zh/blog/2022/06/14/beeto-with-apache-apisix"}},o={authorsImageUrls:[void 0,void 0]},c=[{value:"\u9879\u76ee\u80cc\u666f",id:"\u9879\u76ee\u80cc\u666f",children:[],level:2},{value:"\u4e3a\u4ec0\u4e48\u9009\u62e9 Apache APISIX",id:"\u4e3a\u4ec0\u4e48\u9009\u62e9-apache-apisix",children:[],level:2},{value:"\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u67b6\u6784",id:"\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u67b6\u6784",children:[],level:2},{value:"\u5e73\u53f0\u4f7f\u7528\u7684\u7ec4\u4ef6",id:"\u5e73\u53f0\u4f7f\u7528\u7684\u7ec4\u4ef6",children:[],level:2},{value:"\u4e1a\u52a1\u573a\u666f",id:"\u4e1a\u52a1\u573a\u666f",children:[{value:"\u7528\u6237\u767b\u5f55\u53ca\u6743\u9650\u9a8c\u8bc1",id:"\u7528\u6237\u767b\u5f55\u53ca\u6743\u9650\u9a8c\u8bc1",children:[],level:3},{value:"\u65b0\u4e1a\u52a1\u5fae\u670d\u52a1\u63a5\u5165",id:"\u65b0\u4e1a\u52a1\u5fae\u670d\u52a1\u63a5\u5165",children:[],level:3}],level:2},{value:"\u6280\u672f\u7ec6\u8282",id:"\u6280\u672f\u7ec6\u8282",children:[],level:2},{value:"\u81ea\u5b9a\u4e49\u63d2\u4ef6 <code>acl-plugin.lua</code>",id:"\u81ea\u5b9a\u4e49\u63d2\u4ef6-acl-pluginlua",children:[],level:2},{value:"Auth \u670d\u52a1",id:"auth-\u670d\u52a1",children:[],level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[],level:2}],u={toc:c};function m(e){let{components:t,...a}=e;return(0,l.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u7531\u524d\u540c\u7a0b\u6570\u79d1\u8fd0\u7ef4\u7ecf\u7406\u9648\u5e86\u4ecb\u7ecd\u4e86\u5982\u4f55\u57fa\u4e8e Apache APISIX \u5b9e\u73b0\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u3002")),(0,l.kt)("h2",{id:"\u9879\u76ee\u80cc\u666f"},"\u9879\u76ee\u80cc\u666f"),(0,l.kt)("p",null,"2019 \u5e74\u5e95\uff0c\u56e0\u4e3a\u516c\u53f8\u5728\u4e1a\u52a1\u7814\u53d1\u7684\u8fc7\u7a0b\u4e2d\uff0c\u9047\u5230\u4e86\u4e00\u4e9b\u4e1a\u52a1\u75db\u70b9\uff0c\u6bd4\u5982\uff1a\u516c\u53f8\u7684\u5f00\u53d1\u6280\u672f\u6808\u662f Java \u76f8\u5173\u7684\uff0c\u800c\u8fd0\u7ef4\u5de5\u7a0b\u5e08\u64c5\u957f\u7684\u5219\u662f Shell \u548c Python \u811a\u672c\uff0c\u65e0\u6cd5\u76f4\u63a5\u5bf9\u63a5\uff1b\u516c\u53f8\u672c\u8eab\u6b63\u5904\u4e8e\u5feb\u901f\u589e\u957f\u671f\uff0c\u5f00\u53d1\u5de5\u7a0b\u5e08\u4eba\u529b\u4e0d\u8db3\uff0c\u65e0\u6cd5\u652f\u63f4\u65e5\u5e38\u7684\u8fd0\u7ef4\u5de5\u4f5c\u53ca\u8fd0\u7ef4\u5e73\u53f0\u7684\u5f00\u53d1\uff1b\u5728\u73b0\u6709\u7684\u8fd0\u7ef4\u5e73\u53f0\u4e2d\uff0c\u4f7f\u7528\u4e86\u591a\u79cd\u5f00\u6e90\u5de5\u5177\uff0c\u800c\u4e14\u6ca1\u6709\u6574\u5408\uff0c\u8f83\u96be\u7ba1\u7406\u3002\u56e0\u6b64\u6211\u53d1\u8d77\u4e86\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u7684\u9879\u76ee\uff0c\u5e0c\u671b\u901a\u8fc7\u8be5\u8fd0\u7ef4\u5e73\u53f0\u5b9e\u73b0\u5feb\u901f\u4e0a\u624b\u7684\u5f00\u53d1\u6a21\u578b\uff0c\u53ef\u4ee5\u5b9e\u73b0\u8fd0\u7ef4\u5de5\u7a0b\u5e08\u81ea\u5df1\u5f00\u53d1\u4e1a\u52a1\uff0c\u5e76\u8fdb\u884c\u5feb\u901f\u7684\u8fed\u4ee3\u670d\u52a1\u3002"),(0,l.kt)("h2",{id:"\u4e3a\u4ec0\u4e48\u9009\u62e9-apache-apisix"},"\u4e3a\u4ec0\u4e48\u9009\u62e9 Apache APISIX"),(0,l.kt)("p",null,"\u5728\u8fdb\u884c\u7f51\u5173\u9009\u578b\u65f6\uff0c\u6211\u4eec\u8fdb\u884c\u4e86\u5b9e\u9645\u7684\u6d4b\u8bd5\u3002\u76f8\u5bf9\u4e8e\u5176\u4ed6\u7f51\u5173\uff0cAPISIX \u57fa\u672c\u4e0a\u53ef\u4ee5\u8fbe\u5230 NGINX 90% \u7684\u529f\u80fd\uff0c\u5e76\u4e14\u652f\u6301\u4e86\u591a\u79cd\u8d1f\u8f7d\u5747\u8861\u7b56\u7565\u4ee5\u53ca\u652f\u6301\u591a\u8bed\u8a00\u63d2\u4ef6\u7684\u673a\u5236\uff0c\u540c\u65f6\u652f\u6301\u4e86\u8f6f WAF\uff0c\u53ef\u4ee5\u8986\u76d6\u6211\u4eec95% \u7684\u5b89\u5168\u4e1a\u52a1\u573a\u666f\u3002\u4f5c\u4e3a\u4e91\u539f\u751f API \u7f51\u5173\uff0cAPISIX \u4e5f\u63d0\u4f9b\u4e86\u5f3a\u5927\u7684\u65e5\u5fd7\u529f\u80fd\uff0c\u652f\u6301\u81ea\u5b9a\u4e49\u65e5\u5fd7\u683c\u5f0f\uff0c\u56e0\u6b64\u53ef\u4ee5\u76f4\u63a5\u8ba9 access log \u5bf9\u63a5 ELK\u3002\u7531\u4e8e APISIX \u4e5f\u652f\u6301\u81ea\u5b9a\u4e49\u63d2\u4ef6\u7684\u5f00\u53d1\uff0c\u53ef\u4ee5\u6839\u636e\u6211\u4eec\u7684\u9700\u6c42\u7075\u6d3b\u6269\u5c55\u3002\u5f97\u76ca\u4e8e APISIX \u7684\u57fa\u7840\u529f\u80fd\u548c\u5f3a\u5927\u7684\u63d2\u4ef6\u4f53\u7cfb\uff0c\u53ef\u4ee5\u6709\u6548\u964d\u4f4e\u5f00\u53d1\u6210\u672c\u3002"),(0,l.kt)("h2",{id:"\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u67b6\u6784"},"\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u67b6\u6784"),(0,l.kt)("p",null,"\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u6574\u4f53\u67b6\u6784\u56fe\u5982\u4e0b\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/06/blog/1/173292289-2986c1b4-3704-4d34-a30a-df4ee6f09da7.png",alt:"\u67b6\u6784\u56fe"})),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5b58\u50a8\u5c42\uff1a\u6838\u5fc3\u662f CMDB\uff0c\u4e3b\u8981\u529f\u80fd\u662f\u8bb0\u5f55\u548c\u7ba1\u7406\u7ec4\u7ec7\u4e1a\u52a1\u548c IT \u8d44\u6e90\u7684\u5c5e\u6027\uff0c\u4ee5\u53ca\u5176\u5b83\u4eec\u4e4b\u95f4\u7684\u5173\u7cfb\u3002\u4e0d\u4f46\u8d1f\u8d23\u6240\u6709\u4e1a\u52a1\u53d8\u66f4\u7684\u8d77\u59cb\u72b6\u6001\u67e5\u8be2\uff0c\u800c\u4e14\u6240\u6709\u7684\u4e1a\u52a1\u8d44\u6e90\u7684\u53d8\u66f4\u90fd\u8981\u53cd\u9988\u8bb0\u5f55\u5728\u5176\u4e2d\uff0c\u5b9e\u73b0\u4e1a\u52a1\u6807\u51c6\u89c4\u8303\u7684\u7ba1\u63a7\u3002\u5b58\u50a8\u5c42\u4e5f\u5305\u542b\u4e00\u4e9b\u6743\u9650\u7ba1\u7406\u7684\u6570\u636e\u3001\u4e1a\u52a1\u5de5\u5355\u7684\u6d41\u8f6c\u6570\u636e\u4ee5\u53ca\u76d1\u63a7\u544a\u8b66\u7684\u65f6\u5e8f\u6570\u636e\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u516c\u5171\u57fa\u7840\u670d\u52a1\u5c42\uff1a\u63d0\u4f9b\u539f\u5b50\u4e1a\u52a1\u7684 API\uff0c\u4e5f\u53ef\u4ee5\u8ba4\u4e3a\u662f\u57fa\u7840\u4e2d\u53f0\uff0c\u590d\u7528\u4e86\u5927\u91cf\u7684\u5f00\u6e90\u5de5\u5177\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u4e1a\u52a1\u7f16\u6392\u5c42\uff1a\u9700\u8981\u6839\u636e\u5b9e\u9645\u4e1a\u52a1\u8fdb\u884c\u8bbe\u8ba1\uff0c\u5de5\u7a0b\u5e08\u7684\u5de5\u4f5c\u5c31\u662f\u628a\u539f\u5b50\u4e1a\u52a1 API \u6309\u9700\u6c42\u8fdb\u884c\u62a5\u6587\u9002\u914d\u3001\u6d41\u7a0b\u7ec4\u5408\u3001\u6570\u636e\u8bfb\u5199\uff0c\u5e76\u6253\u5305\u6210\u4e3a\u63a5\u53e3\u4f9b\u524d\u7aef\u8c03\u7528\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u7f51\u5173\u5c42\uff1aAPISIX \u6240\u5728\u7684\u5c42\uff0c\u662f\u540e\u53f0\u670d\u52a1\u7684\u4e1a\u52a1\u8fb9\u754c\uff0c\u8d1f\u8d23\u8d1f\u8f7d\u5747\u8861\u3001\u670d\u52a1\u6ce8\u518c\u4e0e\u53d1\u73b0\u3001\u7528\u6237\u9274\u6743\u3001\u57fa\u7840\u7f51\u7edc\u62a5\u6587\u6570\u636e\u8f6c\u7801\u3001\u5185\u5916\u4ea4\u4e92\u65e5\u5fd7\u7684\u7edf\u4e00\u8bb0\u5f55\u3001\u90e8\u5206\u5b89\u5168\u7ba1\u63a7\u7b49\u7b49\u3002\u4e0e\u4e1a\u52a1\u65e0\u5173\u5e76\u4e14\u901a\u7528\u7684\u670d\u52a1\u7edf\u4e00\u653e\u7f6e\u5230\u672c\u5c42\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5c55\u793a\u5c42\uff1a\u4ece\u7528\u6237\u89d2\u5ea6\u51fa\u53d1\uff0c\u8bbe\u8ba1\u4fbf\u5229\u7684\u4ea4\u4e92\u754c\u9762\u3002\u6b64\u5904\u4f7f\u7528\u4e86\u4e00\u4e2a\u5f00\u6e90\u7684\u524d\u7aef\u5168\u54cd\u5e94\u5f0f admin \u7f51\u9875\u6a21\u677f\uff0c\u5373\u4f7f\u5f00\u53d1\u8005\uff08\u8fd0\u7ef4\uff09\u4e0d\u719f\u6089 JavaScript \uff0c\u4e5f\u53ef\u4ee5\u81ea\u5df1\u5b9e\u73b0\u57fa\u672c\u7684\u8868\u5355\u548c\u62a5\u8868\u3002"))),(0,l.kt)("h2",{id:"\u5e73\u53f0\u4f7f\u7528\u7684\u7ec4\u4ef6"},"\u5e73\u53f0\u4f7f\u7528\u7684\u7ec4\u4ef6"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6838\u5fc3\u7f51\u5173 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix"},"Apache APISIX"),"\uff1a\u4e3b\u8981\u8d1f\u8d23\u65e5\u5fd7\u8bb0\u5f55\u3001\u7f51\u7edc\u5b89\u5168\u4ee5\u53ca\u8d1f\u8f7d\u5747\u8861\u3002\u53e6\u5916\u6211\u4eec\u4e0d\u4f46\u901a\u8fc7\u81ea\u5b9a\u4e49\u63d2\u4ef6\u5b9e\u73b0\u4e86\u9ad8\u7ea7\u4e1a\u52a1\u7f51\u5173\u7684\u90e8\u5206\u529f\u80fd\uff0c\u800c\u4e14\u8fd8\u901a\u8fc7 API \u80fd\u65b9\u4fbf\u7684\u548c\u5176\u4ed6\u670d\u52a1\u6574\u5408\uff0c\u5feb\u901f\u5b9e\u73b0\u5404\u79cd\u6307\u5b9a\u529f\u80fd\uff0c\u6709\u6548\u964d\u4f4e\u5f00\u53d1\u6210\u672c\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"API \u7ba1\u7406\u5de5\u5177 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/ymfe/yapi"},"YAPI"),"\uff1a\u8d1f\u8d23\u5bf9\u63a5\u53e3\u7684\u89c4\u8303\u5b9a\u4e49\uff0c\u6d4b\u8bd5\u7528\u4f8b\u7f16\u5199\u548c\u4f5c\u4e3a ACL \u7684\u6570\u636e\u6e90\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u8bbf\u95ee\u63a7\u5236\u7ec4\u4ef6 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/casbin/casbin"},"Casbin"),"\uff1a\u8f7b\u91cf\u7ea7\u3001\u591a\u6a21\u5f0f\u3001\u5f3a\u8303\u5f0f\u7684\u8de8\u8bed\u8a00\u5f00\u6e90\u8bbf\u95ee\u63a7\u5236\u6846\u67b6\uff0c\u6211\u4eec\u4f7f\u7528\u7684\u662f\u57fa\u4e8eRESTful \u7684 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/casbin/pycasbin"},"PyCasbin"),"\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6570\u636e\u5b58\u50a8\uff1aMySQL 5.7\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u81ea\u7814 Web \u6846\u67b6 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/chenqing24/mug-skeleton"},"mug-skeleton"),"\uff1a\u4f7f\u7528\u81ea\u7814\u7684 Web \u6846\u67b6\uff0c\u4e3b\u8981\u662f\u4e3a\u4e86\u66f4\u6df1\u5c42\u6b21\u7684\u6280\u672f\u63a7\u5236\u80fd\u529b\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5bf9\u63a5\u7684\u7b2c\u4e09\u65b9\u5e73\u53f0\u76f8\u5173\u7ec4\u4ef6"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"CMDB\uff08\u81ea\u7814\uff09\uff1a\u5728\u5f00\u6e90\u7684 CMDBuild \u5916\u5305\u4e86\u4e00\u5c42 RESTful \u7684 API\uff0c\u65b9\u4fbf\u4ea4\u4e92\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"OpenLDAP\uff1a\u7528\u4e8e\u7528\u6237\u7684\u8d26\u53f7\u9a8c\u8bc1\uff0c\u4e0d\u8d1f\u8d23\u9274\u6743\uff1b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5de5\u4f5c\u6d41 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/Activiti/Activiti"},"Activiti"),"\uff1a\u4f7f\u7528\u5b98\u65b9\u7684 RestAPI \u670d\u52a1\uff0c\u7531\u4e8e\u662f\u5904\u4e8e\u5728\u7f51\u5173\u540e\u65b9\uff0c\u56e0\u6b64\u4e0d\u9700\u8981\u8003\u8651\u5b89\u5168\u95ee\u9898\u3002"))))),(0,l.kt)("h2",{id:"\u4e1a\u52a1\u573a\u666f"},"\u4e1a\u52a1\u573a\u666f"),(0,l.kt)("h3",{id:"\u7528\u6237\u767b\u5f55\u53ca\u6743\u9650\u9a8c\u8bc1"},"\u7528\u6237\u767b\u5f55\u53ca\u6743\u9650\u9a8c\u8bc1"),(0,l.kt)("p",null,"\u5bf9\u4e8e\u6240\u6709\u7684 Web \u6846\u67b6\uff0c\u7528\u6237\u767b\u5f55\u662f\u4e00\u4e2a\u5fc5\u9009\u9879\uff0c\u63a5\u4e0b\u6765\u6211\u5c06\u4e3a\u5927\u5bb6\u4ecb\u7ecd\u6b64\u573a\u666f\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/06/blog/1/173294822-ade65508-842e-450c-bcda-d8400e102f7a.png",alt:"\u7528\u6237\u767b\u5f55"})),(0,l.kt)("p",null,"\u9996\u5148\uff0c\u6211\u4eec\u9700\u8981\u4e86\u89e3\u4e0b\u573a\u666f\u4e2d\uff0c\u6211\u4eec\u7684\u4f7f\u7528\u7684\u76f8\u5173\u7ec4\u4ef6\uff0c\u7b2c\u4e00\u4e2a\u5c31\u662f\u8bbf\u95ee\u7684\u524d\u7aef\uff0c\u8fd9\u4e2a\u662f\u5728\u7f51\u5173\u4e4b\u5916\u7684\uff0c\u5176\u6b21\u4f7f\u7528 APISIX \u4e91\u539f\u751f API \u7f51\u5173\u4f5c\u4e3a\u4e1a\u52a1\u8fb9\u754c\u3002\u518d\u4e4b\u540e\u7684 Auth \u670d\u52a1\uff0c\u5b83\u662f\u81ea\u5b9a\u4e49\u5f00\u53d1\u7684\u5fae\u670d\u52a1\uff0c\u4f5c\u7528\u662f\u6821\u9a8c\u524d\u7aef\u7684 URL \u8bf7\u6c42\u548c\u7528\u6237\u767b\u5f55\u8bf7\u6c42\uff0c\u5e76\u5bf9\u901a\u8fc7\u8ba4\u8bc1\u7684\u7528\u6237\u53d1\u653e Token\u3002LDAP \u4e2d\u5b58\u653e\u7684\u662f\u516c\u53f8\u5185\u90e8\u7684\u5bc6\u7801\u4fe1\u606f\u3002CMDB \u5b58\u50a8\u7684\u662f\u4e00\u4e9b\u4e1a\u52a1\u7684\u76f8\u5173\u4fe1\u606f\uff0c\u5305\u62ec\u7ec4\u7ec7\u7ed3\u6784\uff0c\u53ef\u4ee5\u8bbf\u95ee\u7684\u6743\u9650\u7684\u4e00\u4e9b\u7ec4\u7ec7\u4fe1\u606f\uff0c\u6700\u540e\u662f\u524d\u7aef\u9700\u8981\u8bbf\u95ee\u7684\u9875\u9762\u3002"),(0,l.kt)("p",null,"\u4e86\u89e3\u5b8c\u4ee5\u4e0a\u7ec4\u4ef6\u540e\uff0c\u63a5\u4e0b\u6765\uff0c\u4e3a\u5927\u5bb6\u4ecb\u7ecd\u6574\u4f53\u6d41\u7a0b\uff1a"),(0,l.kt)("p",null,"\u7528\u6237\u767b\u5f55\u7684\u65f6\u5019\uff0c\u9996\u5148\u9700\u8981\u901a\u8fc7\u7f51\u5173\u67e5\u8be2\uff0c\u8bbf\u95ee\u7684\u9875\u9762\u662f\u5426\u5728\u767d\u540d\u5355\u4e2d\u3002\u56e0\u4e3a\u90e8\u5206\u9875\u9762\u662f\u4e0d\u9700\u8981\u6743\u9650\u9a8c\u8bc1\u7684\uff0c\u6bd4\u5982\uff1a\u9ed8\u8ba4\u9875\u9762\u6216\u8005\u4e00\u4e9b\u9519\u8bef\u9875\u9762\u3002\u5982\u679c\u8bbf\u95ee\u7684\u9875\u9762\u662f\u9700\u8981\u9a8c\u8bc1\u767b\u5f55\u7684\uff0c\u90a3\u4e48\u8fd9\u4e9b\u8bf7\u6c42\u5c31\u4f1a\u901a\u8fc7\u76f8\u5173\u63d2\u4ef6\uff0c\u8f6c\u53d1\u5230\u6743\u9650\u8ba4\u8bc1\u670d\u52a1\u3002"),(0,l.kt)("p",null,"\u5728\u6743\u9650\u8ba4\u8bc1\u4e2d\uff0c\u9274\u6743\u670d\u52a1\u4f1a\u6839\u636e\u4f20\u5165\u7684\u201c\u7528\u6237\u540d\u201d\u548c\u201c\u5bc6\u7801\u201d\uff0c\u4ece LDAP \u4e2d\u67e5\u8be2\u8d26\u53f7\u662f\u5426\u6b63\u786e\u3002\u5982\u679c\u6b63\u786e\uff0c\u5c31\u4f1a\u901a\u8fc7 CMDB \u67e5\u8be2\u8be5\u7528\u6237\u662f\u5c5e\u4e8e\u54ea\u4e2a\u7ec4\u7ec7\u3001\u53ef\u4ee5\u67e5\u770b\u54ea\u4e9b\u529f\u80fd\u6a21\u5757\uff1b\u5f97\u5230\u7ed3\u679c\u540e\uff0c\u4f7f\u7528 APISIX \u7684 JWT \u63d2\u4ef6\uff0c\u6839\u636e\u7528\u6237\u4fe1\u606f\u751f\u6210\u4e00\u4e2a Token\uff0c\u5e76\u6dfb\u52a0\u8fc7\u671f\u65f6\u95f4\uff0c\u8fd4\u56de\u7ed9\u524d\u7aef\uff1b\u7528\u6237\u901a\u8fc7 Cookie \u7684\u65b9\u5f0f\u8fdb\u884cToken\u5b58\u50a8\u3002\u8be5\u7528\u6237\u540e\u7eed\u5982\u679c\u7ee7\u7eed\u8bbf\u95ee\uff0c\u7f51\u5173\u4f1a\u4ece Cookie \u4e2d\u628a\u4e4b\u524d\u5b58\u50a8\u7684 Token \u8c03\u51fa\u6765\uff0c\u9a8c\u8bc1\u5f53\u524d\u7528\u6237\u662f\u5426\u53ef\u4ee5\u7ee7\u7eed\u8bbf\u95ee\u540e\u9762\u7684\u9875\u9762\u3002"),(0,l.kt)("p",null,"\u5728\u8fd9\u91cc\uff0c\u6211\u4eec\u4f7f\u7528\u4e86 APISIX \u7684 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/docs/apisix/plugins/consumer-restriction/"},(0,l.kt)("inlineCode",{parentName:"a"},"consumer-restriction"))," \u63d2\u4ef6\uff0c\u4e0a\u8ff0\u6240\u8bb2\u7684\u6743\u9650\u8ba4\u8bc1\uff0c\u5b9e\u9645\u4e0a\u5c31\u662f\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"consumer-restriction")," \u63d2\u4ef6\u6765\u5b8c\u6210\u7684\uff0c\u4e0d\u9700\u8981\u6211\u4eec\u5728\u540e\u53f0\u591a\u6b21\u53cd\u590d\u8ba4\u8bc1\u3002"),(0,l.kt)("p",null,"\u901a\u8fc7\u4e0a\u8ff0\u7684\u63cf\u8ff0\uff0c\u76f8\u4fe1\u5927\u5bb6\u5df2\u7ecf\u5bf9\u6b63\u5e38\u7684\u8bf7\u6c42\u6d41\u7a0b\u6709\u4e86\u4e00\u5b9a\u7684\u7406\u89e3\uff0c\u63a5\u4e0b\u6765\u5c06\u4e3a\u5927\u5bb6\u4ecb\u7ecd\u4e0b\u5982\u4f55\u5224\u65ad\u8fd9\u4e9b\u7528\u6237\u6743\u9650\u4e0d\u8db3\u7684\u573a\u666f\u3002\u5728\u8fd0\u7ef4\u5e73\u53f0\u4e2d\uff0c\u5982\u679c\u6709\u6d89\u53ca\u5230\u6570\u636e\u53d8\u66f4\u7684\u64cd\u4f5c\uff0c\u5fc5\u987b\u8981\u643a\u5e26 Token\uff0c\u5f53\u8fd9\u4e2a Token \u88ab ACL \u7684\u63a5\u53e3\u9a8c\u8bc1\u65e0\u6743\u8bbf\u95ee\u540e\uff0c\u5c31\u4f1a\u76f4\u63a5\u8fd4\u56de\u4e00\u4e2a\u7981\u6b62\u8bbf\u95ee\u7684\u9875\u9762\uff0c\u8ba9\u524d\u7aef\u8fdb\u884c\u5904\u7406\u3002\u4ee5\u4e0b\u662f\u7528\u6237\u767b\u5f55\u53ca\u6743\u9650\u9a8c\u8bc1\u573a\u666f\u7684\u5177\u4f53\u6d41\u7a0b\u548c\u5176\u4e2d\u66f4\u4f7f\u7528\u7684\u76f8\u5173\u7ec4\u4ef6\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/06/blog/1/173295581-983d945f-76da-4cc1-b9f3-5531f60e9af3.png",alt:"\u6d41\u7a0b\u56fe"})),(0,l.kt)("h3",{id:"\u65b0\u4e1a\u52a1\u5fae\u670d\u52a1\u63a5\u5165"},"\u65b0\u4e1a\u52a1\u5fae\u670d\u52a1\u63a5\u5165"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/06/blog/1/173296472-4048d0fc-247c-4855-a407-3d270d366a52.png",alt:"\u5fae\u670d\u52a1\u63a5\u5165"})),(0,l.kt)("p",null,"\u5728\u65e5\u5e38\u5de5\u4f5c\uff0c\u6211\u4eec\u7ecf\u5e38\u4f1a\u4e0a\u7ebf\u4e00\u4e9b\u5fae\u670d\u52a1\uff0c\u90a3\u4e48\u5982\u4f55\u8ba9\u8fd9\u4e2a\u5fae\u670d\u52a1\u63a5\u5165\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u5462\uff1f"),(0,l.kt)("p",null,"\u6211\u4eec\u5185\u90e8\u4f1a\u89c4\u5b9a\u65e0\u8bba\u5de5\u7a0b\u5e08\u4f7f\u7528\u54ea\u79cd\u8bed\u8a00\u5f00\u53d1\u5fae\u670d\u52a1\uff0c\u90fd\u9700\u8981\u4f7f\u7528 YAPI \u5bf9 API \u8fdb\u884c\u5b9a\u4e49\u3002\u56e0\u6b64 YAPI \u5bf9\u6211\u4eec\u6240\u6709\u53ef\u8bbf\u95ee\u7684\u90a3\u4e9b URL \u8fdb\u884c\u7ba1\u63a7\uff0c\u7edf\u4e00\u4e00\u4e2a\u5165\u53e3\u5728\u8fd9\u8fb9\u3002\u56e0\u4e3a YAPI \u652f\u6301\u5b9a\u4e49\u5404\u79cd\u73af\u5883\uff0c\u6240\u4ee5\u6211\u4eec\u5728 YAPI \u4e2d\u5b9a\u4e49\u4e86\u4e0d\u540c\u8fd0\u884c\u73af\u5883\u3002\u6700\u5178\u578b\u7684\u793a\u4f8b\u5c31\u662f\uff1a\u5728\u751f\u4ea7\u73af\u5883\u4e2d\uff0c\u6211\u4eec\u4f1a\u4f7f\u7528\u57df\u540d\u8bbf\u95ee\uff1b\u800c\u5728\u5f00\u53d1\u73af\u5883\uff0c\u5c31\u76f4\u63a5\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"127.0.0.1")," \u8fdb\u884c\u8bbf\u95ee\u3002\u5b8c\u6210 YAPI \u7684\u5b9a\u4e49\u540e\uff0c\u5b83\u5c31\u53ef\u4ee5\u901a\u8fc7 mock \u7684\u65b9\u5f0f\uff0c\u751f\u6210\u4e00\u7cfb\u5217\u8bf7\u6c42\u7528\u4f8b\uff0c\u975e\u5e38\u6709\u5229\u4e8e\u540e\u7eed\u8fdb\u884c\u751f\u4ea7\u73af\u5883\u7684\u6d4b\u8bd5\u3002\u6240\u6709\u7684\u5fae\u670d\u52a1\u63a5\u53e3\uff0c\u90fd\u53ef\u4ee5\u901a\u8fc7 HTTP \u8bf7\u6c42\u7684\u65b9\u5f0f\u8fdb\u884c mock \u8c03\u7528\u3002"),(0,l.kt)("p",null,"\u63a5\u4e0b\u6765\uff0c\u5c31\u662f\u6743\u9650\u7ba1\u7406\u670d\u52a1\uff0c\u8fd9\u91cc\u6240\u6709\u7684\u64cd\u4f5c\u90fd\u662f\u81ea\u52a8\u7684\uff1a\u5b83\u4f1a\u4ece YAPI \u4e2d\u8bfb\u53d6 API \u7684\u5b9a\u4e49\uff0c\u7136\u540e\u751f\u6210\u4e00\u7cfb\u5217\u7684 ACL \u89c4\u5219\u3002\u5bf9\u4e8e\u6743\u9650\u7684\u7ba1\u7406\uff0c\u6211\u4eec\u5728\u5e73\u53f0\u4e2d\u4f7f\u7528\u4e86\u4e00\u4e2a\u7ba1\u7406\u9875\u9762\uff1a\u7ba1\u7406\u5458\u53ef\u4ee5\u901a\u8fc7\u8be5\u9875\u9762\u7ba1\u7406 URL \u7684\u8bbf\u95ee\u89c4\u5219\uff0c\u8bbe\u7f6e\u5b8c\u6210\u540e\uff0c\u8868\u5355\u6570\u636e\u5c31\u4f1a\u53d8\u66f4\u4e3a\u4e00\u7cfb\u5217\u7684 ACL \u6743\u9650\u5b9a\u4e49\uff0c\u5b58\u5165\u6570\u636e\u5e93\u4e2d\u3002\u5728\u670d\u52a1\u542f\u52a8\u7684\u8fc7\u7a0b\u4e2d\uff0c\u5e73\u53f0\u4f7f\u7528\u7684 cachebin \u7684\u8bbf\u95ee\u6a21\u578b\u5c31\u4f1a\u76f4\u63a5\u4ece\u6570\u636e\u5e93\u4e2d\uff0c\u628a\u8fd9\u4e9b\u89c4\u5219\u52a0\u8f7d\u5230\u5185\u5b58\u91cc\uff0c\u7136\u540e\u751f\u6210\u4e00\u7cfb\u5217 APISIX \u7684 Consumer \u7684\u5b9a\u4e49\u53ca\u8def\u7531\u8868\uff0c\u5199\u5165 APISIX \u7684 etcd \u4e2d\u3002\u5b8c\u6210\u4e0a\u8ff0\u64cd\u4f5c\u540e\uff0c\u5f53\u7528\u6237\u8bbf\u95ee\u7684\u65f6\u5019\uff0c\u5e73\u53f0\u5c31\u53ef\u4ee5\u76f4\u63a5\u901a\u8fc7 APISIX \u8fdb\u884c\u4e00\u4e2a\u6743\u9650\u7ba1\u7406\u3002"),(0,l.kt)("p",null,"\u8be5\u6a21\u578b\u4e0d\u4f46\u9002\u7528\u4e8e\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\uff0c\u4e5f\u540c\u6837\u9002\u7528\u4e8e\u5404\u79cd\u4e2d\u5c0f\u578b\u4e1a\u52a1\u4f53\u7cfb\u3002"),(0,l.kt)("h2",{id:"\u6280\u672f\u7ec6\u8282"},"\u6280\u672f\u7ec6\u8282"),(0,l.kt)("p",null,"\u901a\u8fc7\u4e0a\u8ff0\u7684\u573a\u666f\u63cf\u8ff0\uff0c\u76f8\u4fe1\u5927\u5bb6\u5df2\u7ecf\u5bf9\u6574\u5957\u4f53\u7cfb\u6709\u4e86\u5927\u6982\u7684\u8ba4\u8bc6\uff0c\u63a5\u4e0b\u6765\u4e3a\u5927\u5bb6\u4ecb\u7ecd\u4e0b\u90e8\u5206\u6280\u672f\u7ec6\u8282\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/06/blog/1/173297301-6ee14d6e-8398-4b34-80ce-4b04ce053bad.png",alt:"\u6280\u672f\u7ec6\u8282"})),(0,l.kt)("p",null,"\u56e0\u4e3a APISIX \u662f\u57fa\u4e8e NGINX + Lua \u5b9e\u73b0\u7684\uff0c\u6240\u4ee5\u90e8\u5206\u529f\u80fd\u9700\u8981\u901a\u8fc7 NGINX \u7684\u5e93\u6765\u5b9e\u73b0\u3002\u4ece\u4e0a\u56fe\u4e2d\uff0c\u6211\u4eec\u53ef\u4ee5\u770b\u5230\u5404\u79cd Lua \u811a\u672c\u53ef\u4ee5\u5728\u54ea\u4e9b\u70b9\u5207\u5165\u5230 NGINX \u5f53\u4e2d\u3002\u5728\u672c\u6587\u4e2d\uff0c\u4e3b\u8981\u662f\u4e3a\u5927\u5bb6\u4ecb\u7ecd Rewrite/Access \u4ee5\u53ca Content \u9636\u6bb5\u53ef\u4ee5\u8fdb\u884c\u7684\u64cd\u4f5c\u3002"),(0,l.kt)("p",null,"\u56e0\u4e3a\u5728 Rewrite/Access \u9636\u6bb5\uff0c\u62a5\u6587\u8fd8\u6ca1\u6709\u8f6c\u7ed9 Upstream\uff0c\u6240\u4ee5\u53ef\u4ee5\u5728\u8be5\u9636\u6bb5\u8fdb\u884c\u5404\u79cd\u5404\u6837\u7684\u6570\u636e\u9884\u5904\u7406\u3002\u4ece\u4e0a\u56fe\u4e2d\u6211\u4eec\u53ef\u4ee5\u770b\u5230\u6709\u4e2a ",(0,l.kt)("inlineCode",{parentName:"p"},"access_by_lua"),"\uff0c\u5728\u8be5\u9636\u6bb5\uff0c\u53ef\u4ee5\u4f7f\u7528 deny \u547d\u4ee4\u8fdb\u884c\u6743\u9650\u7684\u7ba1\u7406\uff0c\u5305\u62ec\u63a5\u53e3\u6743\u9650\u4ee5\u53ca IP \u51c6\u5165\u767d\u540d\u5355\u90fd\u53ef\u4ee5\u5728\u8be5\u9636\u6bb5\u5b9e\u73b0\u3002\u540e\u6587\u6240\u4ecb\u7ecd\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"acl_plugin.lua")," \u7684\u63d2\u4ef6\u5c31\u662f\u5728\u8be5\u9636\u6bb5\u5b9e\u73b0\u7684\u3002"),(0,l.kt)("p",null,"\u5176\u6b21\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"access")," \u8fd9\u4e2a\u9636\u6bb5\uff0c\u5e38\u7528\u4e8e\u5728\u8bf7\u6c42\u8bbf\u95ee\u65f6\uff0c\u989d\u5916\u7684\u5728 HTTP \u8bf7\u6c42\u5934\u63d2\u5165\u4e00\u4e9b ",(0,l.kt)("inlineCode",{parentName:"p"},"key:value"),"\uff0c\u4f9b\u540e\u7eed\u4f7f\u7528\u3002\u4f8b\u5982\uff0c\u5f53\u9700\u8981\u6211\u4eec\u7ebf\u4e0a\u7070\u5ea6\u53d1\u5e03\u65f6\uff0c\u5c31\u53ef\u4ee5\u5728\u7528\u6237\u7684\u8bf7\u6c42\u5934\u4e2d\u52a0\u5165\u6807\u5fd7\u4f4d\uff0c\u901a\u8fc7\u8fd9\u4e9b\u6807\u5fd7\u4f4d\uff0c\u5c31\u53ef\u4ee5\u63a7\u5236\u8fd9\u4e9b\u8bf7\u6c42\u8f6c\u53d1\u54ea\u4e9b\u540e\u7aef\u670d\u52a1\uff0c\u4ece\u800c\u5b9e\u73b0\u7070\u5ea6\u53d1\u5e03\u3002\u5f53\u7136\u6211\u4eec\u4e5f\u53ef\u4ee5\u4f7f\u7528 APISIX \u7684 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/docs/apisix/plugins/traffic-split"},(0,l.kt)("inlineCode",{parentName:"a"},"traffic-split"))," \u63d2\u4ef6\u5b9e\u73b0\u7070\u5ea6\u53d1\u5e03\u3002"),(0,l.kt)("p",null,"\u6700\u540e\u5c31\u662f ",(0,l.kt)("inlineCode",{parentName:"p"},"log_by_lua")," \u9636\u6bb5\uff0c\u5728\u8be5\u9636\u6bb5\uff0c\u6211\u4eec\u53ef\u4ee5\u628a\u4e00\u4e9b trace \u4fe1\u606f\u6216\u8005\u4e00\u4e9b\u6545\u969c\u4fe1\u606f\u53ef\u4ee5\u76f4\u63a5\u8f93\u5165\u5230 log \u6587\u4ef6\u4e2d\u3002\u540c\u6837\u7684\uff0c\u9488\u5bf9 ",(0,l.kt)("inlineCode",{parentName:"p"},"Loggers"),"\uff0cAPISIX \u4e5f\u63d0\u4f9b\u4e86\u975e\u5e38\u591a\u7684\u63d2\u4ef6\uff0c\u5305\u62ec ",(0,l.kt)("inlineCode",{parentName:"p"},"skywalking-logger"),"\u3001",(0,l.kt)("inlineCode",{parentName:"p"},"kafka-logger"),"\u3001",(0,l.kt)("inlineCode",{parentName:"p"},"rocketmq-logger")," \u7b49\u7b49\u3002"),(0,l.kt)("h2",{id:"\u81ea\u5b9a\u4e49\u63d2\u4ef6-acl-pluginlua"},"\u81ea\u5b9a\u4e49\u63d2\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"h2"},"acl-plugin.lua")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"acl-plugin.lua")," \u63d2\u4ef6\u7684\u5b9e\u73b0\u975e\u5e38\u7b80\u5355\u3002\u9996\u5148\u5f53\u7528\u6237\u5728\u8bf7\u6c42\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6211\u4eec\u4f1a\u7ed9\u7528\u6237\u6dfb\u52a0\u76f8\u5173\u7684  JWT token \u5b58\u50a8\u5728 cookie \u91cc\u9762\uff0c\u4e4b\u540e\u8be5\u7528\u6237\u4f1a\u4ece\u8bbf\u95ee\u7684 cookie \u4e2d\u63d0\u53d6 JWT token\uff0c\u7136\u540e\u5bf9\u8be5 token\u8fdb\u884c\u89e3\u7801\u5e76\u83b7\u53d6\u7528\u6237\u4fe1\u606f\u3002"),(0,l.kt)("p",null,"\u5728 Rewrite \u9636\u6bb5\uff0c\u901a\u8fc7\u4f7f\u7528\u7528\u6237 ID\u3001method\u53ca URI\uff0c\u5411\u540e\u53f0 ACL \u63a5\u53e3\u53d1\u8d77\u8bf7\u6c42\u8fdb\u884c\u6743\u9650\u9a8c\u8bc1\u3002\u5982\u679c\u901a\u8fc7\u4e86\uff0c\u5c31\u4f1a\u628a\u76f8\u5173\u4fe1\u606f\u8bb0\u5f55\u5230 log \u4e2d\uff0c\u4f9b\u4ee5\u540e\u7684\u5b89\u5168\u8ba4\u8bc1\u4f7f\u7528\u3002\u5982\u679c\u5931\u8d25\u4e86\uff0c\u5c31\u76f4\u63a5\u8fd4\u56de\u4e00\u4e2a\u9519\u8bef\u72b6\u6001\u7801\u5e76\u8bb0\u5f55\u5230 error log \u4e2d\u3002"),(0,l.kt)("p",null,"\u5728 APISIX 1.1 \u7248\u672c\u4e2d\uff0c\u5f53\u65f6 ",(0,l.kt)("inlineCode",{parentName:"p"},"cors")," \u63d2\u4ef6\u8fd8\u6ca1\u6709\u53d1\u5e03\uff0c\u56e0\u6b64\u5bf9\u4e8e\u8de8\u57df\u8bf7\u6c42\uff0c\u6211\u4eec\u4e5f\u662f\u901a\u8fc7\u8be5\u63d2\u4ef6\u8fdb\u884c\u5b9e\u73b0\uff0c\u5f53\u8bf7\u6c42\u4f7f\u7528 GET \u548c POST \u7684\u8bf7\u6c42\u65b9\u6cd5\u65f6\uff0c\u4f1a\u8fdb\u884c\u76f8\u5173\u7684\u5904\u7406\u3002\u5982\u679c\u662f\u5176\u4ed6\u8bf7\u6c42\uff0c\u5219\u4f1a\u76f4\u63a5\u901a\u8fc7\uff0c\u800c\u73b0\u5728\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 APISIX \u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"cors")," \u63d2\u4ef6\u5b9e\u73b0\u3002APISIX \u73b0\u5728\u4e5f\u53ef\u4ee5\u4f7f\u7528\u591a\u79cd\u8bed\u8a00\u8fdb\u884c\u63d2\u4ef6\u7684\u5f00\u53d1\uff0c \u4e0d\u4ec5\u4ec5\u662f Lua\uff0c\u8be6\u7ec6\u4fe1\u606f\u53ef\u53c2\u8003\uff1a",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/docs/apisix/plugin-develop%E3%80%82"},"https://apisix.apache.org/zh/docs/apisix/plugin-develop\u3002")),(0,l.kt)("h2",{id:"auth-\u670d\u52a1"},"Auth \u670d\u52a1"),(0,l.kt)("p",null,"Auth \u670d\u52a1\u662f\u4e0e ",(0,l.kt)("inlineCode",{parentName:"p"},"acl-plugin.lua")," \u63d2\u4ef6\u914d\u5957\u7684\u8ba4\u8bc1\u670d\u52a1\u3002\u8be5\u670d\u52a1\u5b9e\u73b0\u7684\u529f\u80fd\u975e\u5e38\u7b80\u5355\uff0c\u4e3b\u8981\u662f\u8bfb\u53d6\u8bf7\u6c42\u62a5\u6587\u4e2d\u7684\u4fe1\u606f\uff0c\u7136\u540e\u89e3\u7801\u51fa\u6240\u9700\u7684\u8ba4\u8bc1\u5143\u7d20\uff0c\u4e4b\u540e\u518d\u628a\u5b83\u8f6c\u53d1\u5230\u76f8\u5173\u7684\u670d\u52a1\u63a5\u53e3\u4e2d\u3002\u670d\u52a1\u63a5\u53e3\u4f1a\u6839\u636e\u8ba4\u8bc1\u4fe1\u606f\u8fd4\u56de\u76f8\u5e94\u7684\u7ed3\u679c\uff0cAPISIX \u4f1a\u6839\u636e\u7ed3\u679c\u62d2\u7edd\u6216\u901a\u8fc7\u8be5\u8bf7\u6c42\u3002"),(0,l.kt)("p",null,"Auth \u670d\u52a1\u4e2d\u6700\u6838\u5fc3\u7684\u529f\u80fd\u5c31\u662f\u4ece\u6570\u636e\u5e93\u4e2d\u628a ACL \u89c4\u5219\u52a0\u8f7d\u5230\u5185\u5b58\u91cc\u9762\u3002\u4e3b\u8981\u529f\u80fd\u5206\u4e3a\u4e24\u90e8\u5206\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u9996\u5148 ",(0,l.kt)("inlineCode",{parentName:"li"},"account")," \u63a5\u53e3\u3002\u8be5\u63a5\u53e3\u4e3b\u8981\u4f5c\u7528\u5c31\u662f\uff1a\u7528\u6237\u8bbf\u95ee\u7684\u65f6\u5019\uff0c\u5982\u679c\u9700\u8981\u6743\u9650\u8ba4\u8bc1\uff0c\u5219\u4f1a\u901a\u8fc7\u5411 LDAP \u670d\u52a1\u53d1\u9001\u7528\u6237\u7684\u76f8\u5173\u4fe1\u606f\uff0c\u8fdb\u884c\u8ba4\u8bc1\u3002\u5982\u679c\u8ba4\u8bc1\u901a\u8fc7\uff0c\u5219\u4f1a\u4ece CMDB \u4e2d\u67e5\u8be2\u51fa\u7528\u6237\u53ef\u8bbf\u95ee\u7684\u76f8\u5173\u4fe1\u606f\uff0c\u7136\u540e\u548c\u7528\u6237\u89d2\u8272\u3001\u8fc7\u671f\u65f6\u95f4\u7b49\u5143\u7d20\uff0c\u4e00\u8d77\u7ec4\u6210 JWT Token\uff0c\u5e76\u751f\u6210\u4e00\u4e2a Cookie \u8fd4\u56de\u7ed9\u7528\u6237\uff0c\u5e76\u4e14\u540c\u65f6\u628a\u8be5\u7528\u6237\u4fe1\u606f\u5728 APISIX \u4e2d\u6ce8\u518c\u4e00\u4e2a Consumer \u3002\u8be5\u63a5\u53e3\u8fd8\u5b9e\u73b0\u4e86\u4e00\u4e2a ",(0,l.kt)("inlineCode",{parentName:"li"},"acl_check")," \u7684\u529f\u80fd\uff0c\u8d1f\u8d23\u5bf9\u7528\u6237\u8ba4\u8bc1\u4fe1\u606f\u9a8c\u8bc1\uff0c\u5224\u65ad\u8be5\u8ba4\u8bc1\u662f\u6210\u529f\u8fd8\u662f\u5931\u8d25\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u5176\u6b21\u662f ",(0,l.kt)("inlineCode",{parentName:"li"},"yapi")," \u63a5\u53e3\u3002\u8be5\u63a5\u53e3\u7684\u4e3b\u8981\u4f5c\u7528\u662f\u4e0e YAPI \u8fdb\u884c\u4ea4\u4e92\u3002\u56e0\u4e3a YAPI \u4e2d\u6709\u4e00\u4e2a\u662f\u4f9b\u9879\u76ee\u8bbf\u95ee\u7684token\uff0c\u5e26\u7740\u8fd9\u4e2a token\uff0c\u5c31\u53ef\u4ee5\u8bfb\u53d6\u5230\u8fd9\u4e2a\u9879\u76ee\u6240\u6709\u7684 API\u5b9a\u4e49\u3002\u56e0\u6b64\u8be5\u63a5\u53e3\u7684\u4e3b\u8981\u529f\u80fd\uff0c\u5c31\u662f\u4ece YAPI \u4e2d\u8bfb\u53d6 API \u7684 HTTP \u63a5\u53e3\u5b9a\u4e49\uff0c\u5b58\u50a8\u5230\u6570\u636e\u5e93\u4e2d\uff0c\u7136\u540e\u548c\u6743\u9650\u7ba1\u7406\u7684\u9875\u9762\u8fdb\u884c\u4e00\u4e2a\u8868\u5355\u4ea4\u4e92\uff0c\u7ec4\u5408\u6210 ACL \u8868\uff0c\u6700\u540e\u751f\u6210\u4e00\u7cfb\u5217 Casbin \u7684\u89c4\u5219\u5b58\u5230\u6570\u636e\u5e93\u4e2d\u3002")),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"\u4ee5\u4e0a\u5c31\u662f\u540c\u7a0b\u6570\u79d1\u57fa\u4e8e Apache APISIX \u7684\u81ea\u52a8\u5316\u8fd0\u7ef4\u5e73\u53f0\u7684\u67b6\u6784\u53ca\u90e8\u5206\u573a\u666f\u7684\u4ecb\u7ecd\u3002\u73b0\u5728\uff0cAPISIX \u7684\u529f\u80fd\u8d8a\u6765\u8d8a\u5f3a\u5927\uff0c\u5df2\u7ecf\u652f\u6301\u4f7f\u7528 Wasm \u548c Python \u8fdb\u884c\u63d2\u4ef6\u5f00\u53d1\u3002Apache APISIX \u7684\u751f\u6001\u4e5f\u975e\u5e38\u5f3a\u5927\uff0c\u5982\u679c\u5927\u5bb6\u6709\u4efb\u4f55\u95ee\u9898\u6b22\u8fce\u5230\u793e\u533a\u4e2d\u8fdb\u884c\u4ea4\u6d41\u8ba8\u8bba\u3002"))}m.isMDXComponent=!0}}]);