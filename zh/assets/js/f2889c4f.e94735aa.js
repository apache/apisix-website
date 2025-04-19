"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[79530],{35318:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>u});var n=a(27378);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},p=Object.keys(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),c=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,p=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(a),u=r,k=m["".concat(o,".").concat(u)]||m[u]||h[u]||p;return a?n.createElement(k,i(i({ref:t},s),{},{components:a})):n.createElement(k,i({ref:t},s))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=a.length,i=new Array(p);i[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<p;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},70173:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>p,metadata:()=>l,toc:()=>c});var n=a(25773),r=(a(27378),a(35318));const p={title:"\u793e\u533a\u6708\u62a5 (09.01 - 09.30)",keywords:["Apache APISIX","API \u7f51\u5173","\u793e\u533a\u6708\u62a5","\u8d21\u732e\u8005"],description:"Apache APISIX \u793e\u533a\u7684\u6708\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",tags:["Community"],image:"https://static.apiseven.com/uploads/2024/09/30/InojHYaL_sep-cover-cn.png"},i=void 0,l={permalink:"/zh/blog/2024/09/30/monthly-report",source:"@site/blog/2024/09/30/monthly-report.md",title:"\u793e\u533a\u6708\u62a5 (09.01 - 09.30)",description:"Apache APISIX \u793e\u533a\u7684\u6708\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",date:"2024-09-30T00:00:00.000Z",formattedDate:"2024\u5e749\u670830\u65e5",tags:[{label:"Community",permalink:"/zh/blog/tags/community"}],readingTime:3.465,truncated:!0,authors:[],prevItem:{title:"Apache APISIX 3.11.0 \u6b63\u5f0f\u53d1\u5e03",permalink:"/zh/blog/2024/10/17/release-apache-apisix-3.11.0"},nextItem:{title:"\u793e\u533a\u6708\u62a5 (08.01 - 08.31)",permalink:"/zh/blog/2024/08/31/monthly-report"}},o={authorsImageUrls:[]},c=[{value:"\u5bfc\u8bed",id:"\u5bfc\u8bed",children:[],level:2},{value:"\u8d21\u732e\u8005\u7edf\u8ba1",id:"\u8d21\u732e\u8005\u7edf\u8ba1",children:[],level:2},{value:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd",id:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd",children:[],level:2}],s={toc:c};function h(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u6700\u8fd1\uff0c\u6211\u4eec\u65b0\u589e\u5e76\u6539\u8fdb\u4e86 Apache APISIX \u7684\u90e8\u5206\u529f\u80fd\uff0c\u5305\u62ec\u65b0\u589e ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-proxy"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"ai-prompt-decorator"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"attach-consumer-label")," \u63d2\u4ef6\u548c\u652f\u6301 GCP Secret Manager \u7b49\u3002\u6709\u5173\u66f4\u591a\u529f\u80fd\u65b0\u4eae\u70b9\uff0c\u8bf7\u9605\u8bfb\u672c\u671f\u6708\u62a5\u3002")),(0,r.kt)("h2",{id:"\u5bfc\u8bed"},"\u5bfc\u8bed"),(0,r.kt)("p",null,"Apache APISIX \u9879\u76ee\u59cb\u7ec8\u79c9\u627f\u7740\u5f00\u6e90\u793e\u533a\u534f\u4f5c\u7684\u7cbe\u795e\uff0c\u81ea\u95ee\u4e16\u8d77\u4fbf\u5d2d\u9732\u5934\u89d2\uff0c\u5982\u4eca\u5df2\u7ecf\u6210\u4e3a\u5168\u7403\u6700\u6d3b\u8dc3\u7684\u5f00\u6e90 API \u7f51\u5173\u9879\u76ee\u4e4b\u4e00\u3002\u6b63\u5982\u8c1a\u8bed\u6240\u8a00\uff0c\u201c\u4f17\u4eba\u62fe\u67f4\u706b\u7130\u9ad8\u201d\uff0c\u8fd9\u4e00\u8f89\u714c\u6210\u5c31\uff0c\u5f97\u76ca\u4e8e\u6574\u4e2a\u793e\u533a\u4f19\u4f34\u7684\u534f\u540c\u52aa\u529b\u3002"),(0,r.kt)("p",null,"\u4ece 2024.09.01 \u81f3 2024.09.30\uff0c\u6709 10 \u540d\u5f00\u53d1\u8005\u63d0\u4ea4\u4e86 21 \u4e2a commits\uff0c\u4e3a Apache APISIX \u505a\u51fa\u4e86\u91cd\u8981\u8d21\u732e\u3002\u611f\u8c22\u8fd9\u4e9b\u4f19\u4f34\u4eec\u5bf9 Apache APISIX \u7684\u65e0\u79c1\u652f\u6301\uff01\u6b63\u662f\u56e0\u4e3a\u4f60\u4eec\u7684\u4ed8\u51fa\uff0c\u624d\u80fd\u8ba9 Apache APISIX \u9879\u76ee\u4e0d\u65ad\u6539\u8fdb\u3001\u63d0\u5347\u548c\u58ee\u5927\u3002"),(0,r.kt)("h2",{id:"\u8d21\u732e\u8005\u7edf\u8ba1"},"\u8d21\u732e\u8005\u7edf\u8ba1"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2024/09/30/LeOeANHk_Group%20427319848.png",alt:"\u8d21\u732e\u8005\u540d\u5355"})),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2024/09/30/BjHKV34C_sep-new-contributors.png",alt:"\u65b0\u664b\u8d21\u732e\u8005"})),(0,r.kt)("h2",{id:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd"},"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/11604"},"\u65b0\u589e ",(0,r.kt)("inlineCode",{parentName:"a"},"attach-consumer-label")," \u63d2\u4ef6"),"\uff08\u8d21\u732e\u8005\uff1a",(0,r.kt)("a",{parentName:"li",href:"https://github.com/dspo"},"dspo"),")")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"attach-consumer-label")," \u63d2\u4ef6\u5728\u8ba4\u8bc1\u8bf7\u6c42\u4e2d\u9644\u52a0\u81ea\u5b9a\u4e49\u6d88\u8d39\u8005\u76f8\u5173\u6807\u7b7e\uff0c\u4fbf\u4e8e\u4e0a\u6e38\u670d\u52a1\u533a\u5206\u6d88\u8d39\u8005\u5e76\u5b9e\u73b0\u989d\u5916\u7684\u903b\u8f91\u3002"),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/11597"},"\u65b0\u589e ",(0,r.kt)("inlineCode",{parentName:"a"},"ai-prompt-decorator")," \u63d2\u4ef6"),"\uff08\u8d21\u732e\u8005\uff1a",(0,r.kt)("a",{parentName:"li",href:"https://github.com/shreemaan-abhishek"},"shreemaan-abhishek"),")")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ai-prompt-decorator")," \u63d2\u4ef6\u901a\u8fc7\u5728\u8bf7\u6c42\u4e2d\u6dfb\u52a0\u6216\u9884\u7f6e\u63d0\u793a\uff0c\u7b80\u5316\u4e86\u5bf9 LLM \u63d0\u4f9b\u5546\uff08\u5982 OpenAI \u548c Anthropic\uff09\u53ca\u5176\u6a21\u578b\u7684\u8bbf\u95ee\u3002"),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/11499"},"\u65b0\u589e ",(0,r.kt)("inlineCode",{parentName:"a"},"ai-proxy")," \u63d2\u4ef6"),"\uff08\u8d21\u732e\u8005\uff1a",(0,r.kt)("a",{parentName:"li",href:"https://github.com/shreemaan-abhishek"},"shreemaan-abhishek"),")")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ai-proxy")," \u63d2\u4ef6\u901a\u8fc7\u5b9a\u4e49\u6807\u51c6\u8bf7\u6c42\u683c\u5f0f\uff0c\u5141\u8bb8\u5728\u63d2\u4ef6\u914d\u7f6e\u4e2d\u5d4c\u5165\u5173\u952e\u5b57\u6bb5\u5230\u8bf7\u6c42\u4e2d\uff0c\u7b80\u5316\u4e86\u5bf9 LLM \u63d0\u4f9b\u5546\u548c\u6a21\u578b\u7684\u8bbf\u95ee\u3002"),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/11436"},"\u652f\u6301 GCP Secret Manager"),"\uff08\u8d21\u732e\u8005\uff1a",(0,r.kt)("a",{parentName:"li",href:"https://github.com/HuanXin-Chen"},"HuanXin-Chen"),")")),(0,r.kt)("p",null,"\u6b64 PR \u5411\u539f\u6709\u7684 Secret \u6a21\u5757\u6dfb\u52a0\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},"gcp.lua")," \u6587\u4ef6\uff0c\u4f7f\u7528\u6237\u80fd\u591f\u4fdd\u6301\u4e0e\u4e4b\u524d\u76f8\u540c\u7684\u5f15\u7528\u65b9\u5f0f\uff0c\u5c06\u5176 Secret \u4fe1\u606f\u5b58\u50a8\u5728 GCP \u4e0a\u3002"),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/11601"},"\u65b0\u589e credential \u6982\u5ff5\u53ca\u7528\u6cd5"),"\uff08\u8d21\u732e\u8005\uff1a",(0,r.kt)("a",{parentName:"li",href:"https://github.com/dspo"},"dspo"),")")),(0,r.kt)("p",null,"\u51ed\u8bc1\u662f\u6301\u6709\u6d88\u8d39\u8005\u51ed\u8bc1\u914d\u7f6e\u7684\u5bf9\u8c61\u3002\u6d88\u8d39\u8005\u53ef\u4ee5\u4f7f\u7528\u591a\u79cd\u4e0d\u540c\u7c7b\u578b\u7684\u51ed\u8bc1\uff0c\u5305\u62ec ",(0,r.kt)("inlineCode",{parentName:"p"},"basic-auth"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"hmac-auth"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"jwt-auth")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth"),"\u3002"),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/11581"},"\u91cd\u6784 ",(0,r.kt)("inlineCode",{parentName:"a"},"hmac-auth")," \u63d2\u4ef6"),"\uff08\u8d21\u732e\u8005\uff1a",(0,r.kt)("a",{parentName:"li",href:"https://github.com/Revolyssup"},"Revolyssup"),")")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"hmac-auth")," \u63d2\u4ef6\u6709\u8bb8\u591a\u9700\u8981\u914d\u7f6e\u7684\u8bf7\u6c42\u5934\uff0c\u8fd9\u4f7f\u5f97\u4f7f\u7528\u8be5\u63d2\u4ef6\u53d8\u5f97\u590d\u6742\u3002\u6b64 PR \u5bf9 HMAC \u8ba4\u8bc1\u63d2\u4ef6\u8fdb\u884c\u4e86\u91cd\u6784\uff0c\u4ee5\u63d0\u9ad8\u5176\u53ef\u7528\u6027\u5e76\u9075\u5faa RFC \u6807\u51c6\u3002"),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/11597"},"\u53d6\u6d88\u53d1\u653e JWT \u4ee4\u724c\u4ee5\u589e\u5f3a\u5b89\u5168\u6027"),"\uff08\u8d21\u732e\u8005\uff1a",(0,r.kt)("a",{parentName:"li",href:"https://github.com/dspo"},"dspo"),")")),(0,r.kt)("p",null,"\u51fa\u4e8e\u5b89\u5168\u539f\u56e0\uff0cAPI \u7f51\u5173\u4e0d\u5e94\u63a5\u53d7\u7528\u6237\u79c1\u94a5\u7684\u4e0a\u4f20\u4ee5\u53d1\u653e JWT \u4ee4\u724c\uff0c\u5e76\u4e14\u4e0d\u518d\u63d0\u4f9b\u53d1\u653e JWT \u4ee4\u724c\u7684 API\u3002\u6b64 PR \u79fb\u9664\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},"/apisix/plugin/jwt/sign")," API\u3002"),(0,r.kt)("p",null,"Apache APISIX \u7684\u9879\u76ee",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/"},"\u5b98\u7f51"),"\u548c Github \u4e0a\u7684 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues"},"Issues")," \u4e0a\u5df2\u7ecf\u79ef\u7d2f\u4e86\u6bd4\u8f83\u4e30\u5bcc\u7684\u6587\u6863\u6559\u7a0b\u548c\u4f7f\u7528\u7ecf\u9a8c\uff0c\u5982\u679c\u60a8\u9047\u5230\u95ee\u9898\u53ef\u4ee5\u7ffb\u9605\u6587\u6863\uff0c\u7528\u5173\u952e\u8bcd\u5728 Issues \u4e2d\u641c\u7d22\uff0c\u4e5f\u53ef\u4ee5\u53c2\u4e0e Issues \u4e0a\u7684\u8ba8\u8bba\uff0c\u63d0\u51fa\u81ea\u5df1\u7684\u60f3\u6cd5\u548c\u5b9e\u8df5\u7ecf\u9a8c\u3002"))}h.isMDXComponent=!0}}]);