"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[13952],{35318:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var n=r(27378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},p=Object.keys(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,p=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=i(r),h=a,f=m["".concat(c,".").concat(h)]||m[h]||s[h]||p;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=r.length,o=new Array(p);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var i=2;i<p;i++)o[i]=r[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},61100:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>s,frontMatter:()=>p,metadata:()=>l,toc:()=>i});var n=r(25773),a=(r(27378),r(35318));const p={title:"\u793e\u533a\u6708\u62a5 (05.01 - 05.31)",keywords:["Apache APISIX","API \u7f51\u5173","\u793e\u533a\u6708\u62a5","\u8d21\u732e\u8005"],description:"Apache APISIX \u793e\u533a\u7684\u6708\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",tags:["Community"],image:"https://static.apiseven.com/uploads/2024/05/31/Z09ywV24_may-cover-cn.png"},o=void 0,l={permalink:"/zh/blog/2024/05/31/monthly-report",source:"@site/blog/2024/05/31/monthly-report.md",title:"\u793e\u533a\u6708\u62a5 (05.01 - 05.31)",description:"Apache APISIX \u793e\u533a\u7684\u6708\u62a5\u65e8\u5728\u5e2e\u52a9\u793e\u533a\u6210\u5458\u66f4\u5168\u9762\u5730\u4e86\u89e3\u793e\u533a\u7684\u6700\u65b0\u52a8\u6001\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",date:"2024-05-31T00:00:00.000Z",formattedDate:"2024\u5e745\u670831\u65e5",tags:[{label:"Community",permalink:"/zh/blog/tags/community"}],readingTime:1.76,truncated:!0,authors:[],prevItem:{title:"\u793e\u533a\u6708\u62a5 (06.01 - 06.30)",permalink:"/zh/blog/2024/06/30/monthly-report"},nextItem:{title:"Forward-Auth \u63d2\u4ef6\u80fd\u591f\u53d1\u51fa\u975e\u6cd5 Smuggling \u8bf7\u6c42 (CVE-2024-32638)",permalink:"/zh/blog/2024/05/02/cve-2024-32638"}},c={authorsImageUrls:[]},i=[{value:"\u5bfc\u8bed",id:"\u5bfc\u8bed",children:[],level:2},{value:"\u8d21\u732e\u8005\u7edf\u8ba1",id:"\u8d21\u732e\u8005\u7edf\u8ba1",children:[],level:2},{value:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd",id:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd",children:[],level:2}],u={toc:i};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u6700\u8fd1\uff0c\u6211\u4eec\u65b0\u589e\u5e76\u6539\u8fdb\u4e86 Apache APISIX \u7684\u90e8\u5206\u529f\u80fd\uff0c\u5305\u542b\u5728 HashiCorp Vault \u4e2d\u652f\u6301 hcv namespace \u548c \u5728 OIDC \u63d2\u4ef6\u4e2d\u5141\u8bb8\u5728\u81ea\u7701\u8bf7\u6c42\u4e2d\u8bbe\u7f6e\u6807\u5934\u3002\u6709\u5173\u66f4\u591a\u529f\u80fd\u65b0\u4eae\u70b9\uff0c\u8bf7\u9605\u8bfb\u672c\u671f\u6708\u62a5\u3002")),(0,a.kt)("h2",{id:"\u5bfc\u8bed"},"\u5bfc\u8bed"),(0,a.kt)("p",null,"Apache APISIX \u9879\u76ee\u59cb\u7ec8\u79c9\u627f\u7740\u5f00\u6e90\u793e\u533a\u534f\u4f5c\u7684\u7cbe\u795e\uff0c\u81ea\u95ee\u4e16\u8d77\u4fbf\u5d2d\u9732\u5934\u89d2\uff0c\u5982\u4eca\u5df2\u7ecf\u6210\u4e3a\u5168\u7403\u6700\u6d3b\u8dc3\u7684\u5f00\u6e90 API \u7f51\u5173\u9879\u76ee\u4e4b\u4e00\u3002\u6b63\u5982\u8c1a\u8bed\u6240\u8a00\uff0c\u201c\u4f17\u4eba\u62fe\u67f4\u706b\u7130\u9ad8\u201d\uff0c\u8fd9\u4e00\u8f89\u714c\u6210\u5c31\uff0c\u5f97\u76ca\u4e8e\u6574\u4e2a\u793e\u533a\u4f19\u4f34\u7684\u534f\u540c\u52aa\u529b\u3002"),(0,a.kt)("p",null,"\u4ece 2024.05.01 \u81f3 2024.05.31\uff0c\u6709 7 \u540d\u5f00\u53d1\u8005\u63d0\u4ea4\u4e86 9 \u4e2a commit\uff0c\u4e3a Apache APISIX \u505a\u51fa\u4e86\u91cd\u8981\u8d21\u732e\u3002\u611f\u8c22\u8fd9\u4e9b\u4f19\u4f34\u4eec\u5bf9 Apache APISIX \u7684\u65e0\u79c1\u652f\u6301\uff01\u6b63\u662f\u56e0\u4e3a\u4f60\u4eec\u7684\u4ed8\u51fa\uff0c\u624d\u80fd\u8ba9 Apache APISIX \u9879\u76ee\u4e0d\u65ad\u6539\u8fdb\u3001\u63d0\u5347\u548c\u58ee\u5927\u3002"),(0,a.kt)("h2",{id:"\u8d21\u732e\u8005\u7edf\u8ba1"},"\u8d21\u732e\u8005\u7edf\u8ba1"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2024/06/04/nPBI02x2_may-contributors-list.png",alt:"\u8d21\u732e\u8005\u540d\u5355"})),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2024/05/31/paTYXQAh_new-contributors-may.png",alt:"\u65b0\u664b\u8d21\u732e\u8005"})),(0,a.kt)("h2",{id:"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd"},"\u8fd1\u671f\u4eae\u70b9\u529f\u80fd"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/11277"},"\u5728 HashiCorp Vault \u4e2d\u652f\u6301 hcv namespace"),"\uff08\u8d21\u732e\u8005\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/bzp2010"},"bzp2010"),")")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/11090"},"\u5728 OIDC \u63d2\u4ef6\u4e2d\u5141\u8bb8\u5728\u81ea\u7701\u8bf7\u6c42\u4e2d\u8bbe\u7f6e\u6807\u5934"),"\uff08\u8d21\u732e\u8005\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/yuweizzz"},"yuweizzz"),")"))),(0,a.kt)("p",null,"Apache APISIX \u7684\u9879\u76ee\u5b98\u7f51\u548c Github \u4e0a\u7684 Issue \u4e0a\u5df2\u7ecf\u79ef\u7d2f\u4e86\u6bd4\u8f83\u4e30\u5bcc\u7684\u6587\u6863\u6559\u7a0b\u548c\u4f7f\u7528\u7ecf\u9a8c\uff0c\u5982\u679c\u60a8\u9047\u5230\u95ee\u9898\u53ef\u4ee5\u7ffb\u9605\u6587\u6863\uff0c\u7528\u5173\u952e\u8bcd\u5728 Issue \u4e2d\u641c\u7d22\uff0c\u4e5f\u53ef\u4ee5\u53c2\u4e0e Issue \u4e0a\u7684\u8ba8\u8bba\uff0c\u63d0\u51fa\u81ea\u5df1\u7684\u60f3\u6cd5\u548c\u5b9e\u8df5\u7ecf\u9a8c\u3002"))}s.isMDXComponent=!0}}]);