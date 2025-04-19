"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[81348],{35318:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>h});var r=a(27378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},p=Object.keys(e);for(r=0;r<p.length;r++)a=p[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)a=p[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),c=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=c(e.components);return r.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,p=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(a),h=n,k=m["".concat(o,".").concat(h)]||m[h]||u[h]||p;return a?r.createElement(k,i(i({ref:t},s),{},{components:a})):r.createElement(k,i({ref:t},s))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=a.length,i=new Array(p);i[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var c=2;c<p;c++)i[c]=a[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},70874:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>p,metadata:()=>l,toc:()=>c});var r=a(25773),n=(a(27378),a(35318));const p={title:"\u793e\u533a\u53cc\u5468\u62a5 (12.18 - 12.31)",keywords:["Apache APISIX","API \u7f51\u5173","\u793e\u533a\u5468\u62a5","\u8d21\u732e\u8005"],description:"Apache APISIX \u793e\u533a\u7684\u53cc\u5468\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",tags:["Community"],image:"https://static.apiseven.com/uploads/2024/01/03/pvWf13vV_CHN.png"},i=void 0,l={permalink:"/zh/blog/2024/01/03/bi-weekly-report",source:"@site/blog/2024/01/03/bi-weekly-report.md",title:"\u793e\u533a\u53cc\u5468\u62a5 (12.18 - 12.31)",description:"Apache APISIX \u793e\u533a\u7684\u53cc\u5468\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",date:"2024-01-03T00:00:00.000Z",formattedDate:"2024\u5e741\u67083\u65e5",tags:[{label:"Community",permalink:"/zh/blog/tags/community"}],readingTime:3.465,truncated:!0,authors:[],prevItem:{title:"Apache APISIX 3.8.0 \u6b63\u5f0f\u53d1\u5e03",permalink:"/zh/blog/2024/01/15/release-apache-apisix-3.8.0"},nextItem:{title:"\u793e\u533a\u53cc\u5468\u62a5 (12.04 - 12.17)",permalink:"/zh/blog/2023/12/20/bi-weekly-report"}},o={authorsImageUrls:[]},c=[{value:"\u5bfc\u8bed",id:"\u5bfc\u8bed",children:[],level:2},{value:"\u8d21\u732e\u8005\u7edf\u8ba1",id:"\u8d21\u732e\u8005\u7edf\u8ba1",children:[],level:2},{value:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd",id:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd",children:[],level:2},{value:"\u6700\u65b0\u535a\u5ba2\u901f\u89c8",id:"\u6700\u65b0\u535a\u5ba2\u901f\u89c8",children:[],level:2}],s={toc:c};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u6700\u8fd1\uff0c\u6211\u4eec\u65b0\u589e\u5e76\u6539\u8fdb\u4e86 Apache APISIX \u7684\u90e8\u5206\u529f\u80fd\uff0c\u5982 ",(0,n.kt)("inlineCode",{parentName:"p"},"limit-count")," \u63d2\u4ef6\u914d\u7f6e\u652f\u6301\u73af\u5883\u53d8\u91cf\u3001",(0,n.kt)("inlineCode",{parentName:"p"},"response-rewrite")," \u63d2\u4ef6\u5728\u4f7f\u7528 filters.regex \u9009\u9879\u65f6\u652f\u6301 gzip\u3001\u5347\u7ea7 OpenSSL 1.1.1 \u81f3 OpenSSL 3.0 \u7248\u672c\u3002\u8be6\u60c5\u8bf7\u9605\u8bfb\u672c\u671f\u53cc\u5468\u62a5\u3002")),(0,n.kt)("h2",{id:"\u5bfc\u8bed"},"\u5bfc\u8bed"),(0,n.kt)("p",null,"Apache APISIX \u9879\u76ee\u59cb\u7ec8\u79c9\u627f\u7740\u5f00\u6e90\u793e\u533a\u534f\u4f5c\u7684\u7cbe\u795e\uff0c\u81ea\u95ee\u4e16\u8d77\u4fbf\u5d2d\u9732\u5934\u89d2\uff0c\u5982\u4eca\u5df2\u7ecf\u6210\u4e3a\u5168\u7403\u6700\u6d3b\u8dc3\u7684\u5f00\u6e90 API \u7f51\u5173\u9879\u76ee\u4e4b\u4e00\u3002\u6b63\u5982\u8c1a\u8bed\u6240\u8a00\uff0c\u201c\u4f17\u4eba\u62fe\u67f4\u706b\u7130\u9ad8\u201d\uff0c\u8fd9\u4e00\u8f89\u714c\u6210\u5c31\uff0c\u5f97\u76ca\u4e8e\u6574\u4e2a\u793e\u533a\u4f19\u4f34\u7684\u534f\u540c\u52aa\u529b\u3002"),(0,n.kt)("p",null,"\u4ece 2023.12.18 \u81f3 2023.12.31\uff0c\u6709 18 \u540d\u5f00\u53d1\u8005\u63d0\u4ea4\u4e86 32 \u4e2a commit\uff0c\u4e3a Apache APISIX \u505a\u51fa\u4e86\u91cd\u8981\u8d21\u732e\u3002\u611f\u8c22\u8fd9\u4e9b\u4f19\u4f34\u4eec\u5bf9 Apache APISIX \u7684\u65e0\u79c1\u652f\u6301\uff01\u6b63\u662f\u56e0\u4e3a\u4f60\u4eec\u7684\u4ed8\u51fa\uff0c\u624d\u80fd\u8ba9 Apache APISIX \u9879\u76ee\u4e0d\u65ad\u6539\u8fdb\u3001\u63d0\u5347\u548c\u58ee\u5927\u3002"),(0,n.kt)("p",null,"\u6700\u8fd1\uff0c\u6211\u4eec\u5bf9\u4e00\u4e9b\u529f\u80fd\u8fdb\u884c\u4e86\u65b0\u589e\u548c\u6539\u8fdb\uff0c\u66f4\u65b0\u5185\u5bb9\u603b\u7ed3\u5982\u4e0b\uff1a"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"limit-count")," \u63d2\u4ef6\u914d\u7f6e\u652f\u6301\u73af\u5883\u53d8\u91cf")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"response-rewrite")," \u63d2\u4ef6\u5728\u4f7f\u7528 filters.regex \u9009\u9879\u65f6\u652f\u6301 gzip")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u5347\u7ea7 OpenSSL 1.1.1 \u81f3 OpenSSL 3.0 \u7248\u672c"))),(0,n.kt)("p",null,"Apache APISIX \u793e\u533a\u7684\u53cc\u5468\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002"),(0,n.kt)("h2",{id:"\u8d21\u732e\u8005\u7edf\u8ba1"},"\u8d21\u732e\u8005\u7edf\u8ba1"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2024/01/03/CPoS8MJV_Con.png",alt:"\u8d21\u732e\u8005\u540d\u5355"})),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2024/01/03/Cs8W4P1U_New.png",alt:"\u65b0\u664b\u8d21\u732e\u8005"})),(0,n.kt)("h2",{id:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd"},"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/10607"},(0,n.kt)("inlineCode",{parentName:"a"},"limit-count")," \u63d2\u4ef6\u914d\u7f6e\u652f\u6301\u73af\u5883\u53d8\u91cf"),"\uff08\u8d21\u732e\u8005\uff1a",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ikatlinsky"},"ikatlinsky"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/10637"},(0,n.kt)("inlineCode",{parentName:"a"},"response-rewrite")," \u63d2\u4ef6\u5728\u4f7f\u7528 filters.regex \u9009\u9879\u65f6\u652f\u6301 gzip"),"\uff08\u8d21\u732e\u8005\uff1a",(0,n.kt)("a",{parentName:"p",href:"https://github.com/yuweizzz"},"yuweizzz"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/10724"},"\u5347\u7ea7 OpenSSL 1.1.1 \u81f3 OpenSSL 3.0 \u7248\u672c"),"\uff08\u8d21\u732e\u8005\uff1a",(0,n.kt)("a",{parentName:"p",href:"https://github.com/AlinsRan"},"AlinsRan"),")"))),(0,n.kt)("h2",{id:"\u6700\u65b0\u535a\u5ba2\u901f\u89c8"},"\u6700\u65b0\u535a\u5ba2\u901f\u89c8"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/blog/2023/12/15/high-availability-of-apisix-and-api7/"},"\u501f\u529b APISIX \u7684\u9ad8\u53ef\u7528\uff0c\u5b9e\u73b0\u4f01\u4e1a\u4ebf\u7ea7\u6d41\u91cf")),(0,n.kt)("p",{parentName:"li"},"\u4f5c\u8005\uff1a\u738b\u9662\u751f\uff0c\u652f\u6d41\u79d1\u6280\u8054\u5408\u521b\u59cb\u4eba\u517c CTO\uff0cApache APISIX PMC \u6210\u5458\uff0c\u300aApache APISIX \u5b9e\u6218\u300b\u4f5c\u8005\u3002\u672c\u6587\u6574\u7406\u81ea 2023 \u5e74 11 \u6708\u738b\u9662\u751f\u5728 APISIX \u4e0a\u6d77 Meetup \u7684\u6f14\u8bb2\u3002")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/blog/2023/12/08/zhengcaiyun-uses-apisix/"},"\u653f\u91c7\u4e91 APISIX \u4f18\u5316\u8de8\u7f51 RPC \u6027\u80fd\u5b9e\u8df5")),(0,n.kt)("p",{parentName:"li"},"\u4e3a\u89e3\u51b3\u6570\u636e\u8de8\u7f51\u95ee\u9898\uff0c\u653f\u91c7\u4e91\u642d\u5efa\u4e86\u4e00\u6761\u57fa\u4e8e Dubbo \u7684\u201c\u9ad8\u901f\u516c\u8def\u201d\uff0c\u540c\u65f6\u91c7\u7528\u4e86 APISIX \u4f5c\u4e3a\u4e2d\u5fc3\u7f51\u5173\uff0c\u4e3a\u7f51\u7edc\u8def\u7531\u3001\u516c\u5171\u7279\u6027\u63d0\u4f9b\u652f\u6301\u3002\u672c\u6587\u5c06\u91cd\u70b9\u4ecb\u7ecd\u653f\u91c7\u4e91\u201c\u9ad8\u901f\u516c\u8def\u201d\u5de5\u7a0b\u5efa\u8bbe\u4e2d\u5982\u4f55\u4f18\u5316\u7f51\u5173\u548c\u534f\u8bae\u7684\u6027\u80fd\u4ee5\u5e94\u5bf9\u6311\u6218\u3002")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/blog/2023/12/01/datavisor-uses-apisix/"},"API \u7f51\u5173 APISIX \u5728 DataVisor \u7684\u5e94\u7528\u4e0e\u5b9e\u8df5")),(0,n.kt)("p",{parentName:"li"},"\u4f5c\u8005\uff1a\u8d75\u6653\u5f6a\uff0cDataVisor \u9ad8\u7ea7\u67b6\u6784\u5e08\uff0cApache Kvrocks Committer\uff0cOpenResty \u53ca Apache APISIX Contributor\u3002\u672c\u6587\u6574\u7406\u81ea 2023 \u5e74 11 \u6708\u8d75\u6653\u5f6a\u5728 APISIX \u4e0a\u6d77 Meetup \u7684\u6f14\u8bb2\u3002"))),(0,n.kt)("p",null,"Apache APISIX \u7684\u9879\u76ee\u5b98\u7f51\u548c Github \u4e0a\u7684 Issue \u4e0a\u5df2\u7ecf\u79ef\u7d2f\u4e86\u6bd4\u8f83\u4e30\u5bcc\u7684\u6587\u6863\u6559\u7a0b\u548c\u4f7f\u7528\u7ecf\u9a8c\uff0c\u5982\u679c\u60a8\u9047\u5230\u95ee\u9898\u53ef\u4ee5\u7ffb\u9605\u6587\u6863\uff0c\u7528\u5173\u952e\u8bcd\u5728 Issue \u4e2d\u641c\u7d22\uff0c\u4e5f\u53ef\u4ee5\u53c2\u4e0e Issue \u4e0a\u7684\u8ba8\u8bba\uff0c\u63d0\u51fa\u81ea\u5df1\u7684\u60f3\u6cd5\u548c\u5b9e\u8df5\u7ecf\u9a8c\u3002"))}u.isMDXComponent=!0}}]);