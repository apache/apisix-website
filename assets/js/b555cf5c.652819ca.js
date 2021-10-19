"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3646],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return m}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},p=Object.keys(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),c=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,p=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),h=c(a),m=r,k=h["".concat(o,".").concat(m)]||h[m]||s[m]||p;return a?n.createElement(k,i(i({ref:t},u),{},{components:a})):n.createElement(k,i({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=a.length,i=new Array(p);i[0]=h;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<p;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},6001:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return o},assets:function(){return c},toc:function(){return u},default:function(){return h}});var n=a(87462),r=a(63366),p=(a(67294),a(3905)),i={title:"\u793e\u533a\u5468\u62a5\uff5c10.1-10.14 \u529f\u80fd\u4eae\u70b9\u66f4\u65b0\u8fdb\u884c\u4e2d",keywords:["Apache APISIX","\u793e\u533a\u5468\u62a5","APISIX","API Gateway","\u8d21\u732e\u8005"],description:"\u201c\u72ec\u884c\u8005\u901f\uff0c\u4f17\u884c\u8005\u8fdc\u201d\u3002Apache APISIX \u793e\u533a\u5468\u62a5\u5e0c\u671b\u53ef\u4ee5\u5e2e\u52a9\u793e\u533a\u5c0f\u4f19\u4f34\u4eec\u66f4\u597d\u5730\u638c\u63e1 Apache APISIX \u793e\u533a\u7684\u6bcf\u5468\u8fdb\u5c55\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",tags:["Events"]},l=void 0,o={permalink:"/blog/2021/10/14/weekly-report-1014",source:"@site/blog/2021/10/14/weekly-report-1014.md",title:"\u793e\u533a\u5468\u62a5\uff5c10.1-10.14 \u529f\u80fd\u4eae\u70b9\u66f4\u65b0\u8fdb\u884c\u4e2d",description:"\u201c\u72ec\u884c\u8005\u901f\uff0c\u4f17\u884c\u8005\u8fdc\u201d\u3002Apache APISIX \u793e\u533a\u5468\u62a5\u5e0c\u671b\u53ef\u4ee5\u5e2e\u52a9\u793e\u533a\u5c0f\u4f19\u4f34\u4eec\u66f4\u597d\u5730\u638c\u63e1 Apache APISIX \u793e\u533a\u7684\u6bcf\u5468\u8fdb\u5c55\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002",date:"2021-10-14T00:00:00.000Z",formattedDate:"October 14, 2021",tags:[{label:"Events",permalink:"/blog/tags/events"}],readingTime:.89,truncated:!0,authors:[],prevItem:{title:"\u76f4\u64ad\u9884\u544a | Apache APISIX \xd7 Apache SkyWalking \u7ebf\u4e0a\u5206\u4eab",permalink:"/blog/2021/10/18/meetup"},nextItem:{title:"Apache APISIX \u793e\u533a\u65b0\u91cc\u7a0b\u7891\u2014\u2014\u5168\u7403\u8d21\u732e\u8005\u7a81\u7834 300 \u4f4d\uff01",permalink:"/blog/2021/10/13/celebrating-300-contributors-of-apisix"}},c={authorsImageUrls:[]},u=[{value:"\u5bfc\u8bed",id:"\u5bfc\u8bed",children:[]},{value:"\u8d21\u732e\u8005\u7edf\u8ba1",id:"\u8d21\u732e\u8005\u7edf\u8ba1",children:[]},{value:"Good first issue",id:"good-first-issue",children:[{value:"Issue #5165",id:"issue-5165",children:[]},{value:"Issue #5192",id:"issue-5192",children:[]}]},{value:"\u672c\u5468\u529f\u80fd\u7279\u6027\u4eae\u70b9",id:"\u672c\u5468\u529f\u80fd\u7279\u6027\u4eae\u70b9",children:[]},{value:"\u672c\u5468\u535a\u6587\u63a8\u8350",id:"\u672c\u5468\u535a\u6587\u63a8\u8350",children:[]}],s={toc:u};function h(e){var t=e.components,a=(0,r.Z)(e,["components"]);return(0,p.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"\u4ece 10.1 \u5230 10.14, \u6709 27 \u4f4d\u5f00\u53d1\u8005\u4e3a Apache APISIX \u63d0\u4ea4\u4e86 67 \u4e2a commits\u3002\u611f\u8c22\u8fd9\u4e9b\u5c0f\u4f19\u4f34\u4e3a Apache APISIX \u6dfb\u7816\u52a0\u74e6\uff0c\u662f\u4f60\u4eec\u7684\u65e0\u79c1\u4ed8\u51fa\uff0c\u8ba9 Apache APISIX \u9879\u76ee\u53d8\u5f97\u66f4\u597d\uff01")),(0,p.kt)("h2",{id:"\u5bfc\u8bed"},"\u5bfc\u8bed"),(0,p.kt)("p",null,"Apache APISIX \u4ece\u5f00\u6e90\u7b2c\u4e00\u5929\u5c31\u4ee5\u793e\u533a\u65b9\u5f0f\u6210\u957f\uff0c\u8fc5\u901f\u6210\u4e3a\u5168\u4e16\u754c\u6700\u6d3b\u8dc3\u7684\u5f00\u6e90 API \u7f51\u5173\u9879\u76ee\u3002\u8fd9\u4e9b\u6210\u5c31\uff0c\u79bb\u4e0d\u5f00\u793e\u533a\u5c0f\u4f19\u4f34\u4eec\u7684\u5171\u540c\u594b\u6597\u3002"),(0,p.kt)("p",null,"\u201c\u72ec\u884c\u8005\u901f\uff0c\u4f17\u884c\u8005\u8fdc\u201d\u3002Apache APISIX \u793e\u533a\u5468\u62a5\u5e0c\u671b\u53ef\u4ee5\u5e2e\u52a9\u793e\u533a\u5c0f\u4f19\u4f34\u4eec\u66f4\u597d\u5730\u638c\u63e1 Apache APISIX \u793e\u533a\u7684\u6bcf\u5468\u8fdb\u5c55\uff0c\u65b9\u4fbf\u5927\u5bb6\u53c2\u4e0e\u5230 Apache APISIX \u793e\u533a\u4e2d\u6765\u3002"),(0,p.kt)("p",null,"\u6211\u4eec\u8fd8\u6574\u7406\u4e86\u4e00\u4e9b\u9002\u5408\u65b0\u6765\u793e\u533a\u7684\u5c0f\u4f19\u4f34\u4eec\u53c2\u52a0\u7684 issue\uff01\u611f\u5174\u8da3\u7684\u540c\u5b66\u4eec\uff0c\u8d70\u8fc7\u8def\u8fc7\u4e0d\u8981\u9519\u8fc7\uff01"),(0,p.kt)("h2",{id:"\u8d21\u732e\u8005\u7edf\u8ba1"},"\u8d21\u732e\u8005\u7edf\u8ba1"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1634183939241-a87516e5-cb52-4532-87e2-306c09155a70.png",alt:"\u672c\u5468\u8d21\u732e\u8005\u540d\u5355"})),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1634183019951-bcf250cd-e5b5-443e-afc4-3cfdef0d6eab.jpg",alt:"\u672c\u5468\u65b0\u664b\u8d21\u732e\u8005"})),(0,p.kt)("h2",{id:"good-first-issue"},"Good first issue"),(0,p.kt)("h3",{id:"issue-5165"},"Issue #5165"),(0,p.kt)("p",null,(0,p.kt)("strong",{parentName:"p"},"\u94fe\u63a5"),"\uff1a",(0,p.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/5165"},"https://github.com/apache/apisix/issues/5165")),(0,p.kt)("p",null,(0,p.kt)("strong",{parentName:"p"},"\u95ee\u9898\u63cf\u8ff0"),"\uff1a"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"\u5f53\u6d4f\u89c8\u5668\u8de8\u57df\u53d1\u5e03\u7136\u540e\u663e\u793a CORS error \u65f6\uff0c",(0,p.kt)("inlineCode",{parentName:"p"},"wolf-rbac")," \u63d2\u4ef6\u7684\u767b\u5f55 ",(0,p.kt)("inlineCode",{parentName:"p"},"url/apisix/plugin/wolf-rbac/login")," \u4f1a\u8fd4\u56de ",(0,p.kt)("inlineCode",{parentName:"p"},"json")," \u683c\u5f0f\uff0c\u4f46\u662f ",(0,p.kt)("inlineCode",{parentName:"p"},"header")," \u7ed9\u51fa\u7684\u5185\u5bb9\u7c7b\u578b\u662f ",(0,p.kt)("inlineCode",{parentName:"p"},"text/plain"),"\uff0c\u8bf7\u4fee\u6539\u63d2\u4ef6\u767b\u5f55\u540e\u7684\u5185\u5bb9\u7c7b\u578b\u4e3a ",(0,p.kt)("inlineCode",{parentName:"p"},"application/json"),"\u3002")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("inlineCode",{parentName:"p"},"wolf-rabc")," \u7684\u767b\u5f55 ",(0,p.kt)("inlineCode",{parentName:"p"},"uri/apisix/plugin/wolf-rbac/login")," \u4f1a\u5931\u53bb\u6dfb\u52a0\u5934\u7684 CORS \u63d2\u4ef6\u3002"))),(0,p.kt)("h3",{id:"issue-5192"},"Issue #5192"),(0,p.kt)("p",null,(0,p.kt)("strong",{parentName:"p"},"\u94fe\u63a5"),"\uff1a",(0,p.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/5192"},"https://github.com/apache/apisix/issues/5192")),(0,p.kt)("p",null,(0,p.kt)("strong",{parentName:"p"},"\u95ee\u9898\u63cf\u8ff0"),"\uff1a\u5b89\u88c5 APISIX \u4f9d\u8d56\u7684\u65f6\u5019\uff0c\u4e0d\u540c\u7684 Linux \u53d1\u884c\u7248\u4f1a\u6709\u4e0d\u540c\u7684\u6267\u884c\u3002\u662f\u5426\u53ef\u4ee5\u5c06\u8fd9\u4e9b\u4e0d\u540c\u7684\u6267\u884c\u5408\u5e76\u5230 \u201cinstall-dependencise.sh\u201d \u4e2d\uff0c\u8fd9\u6837\u7528\u6237\u5728\u5b89\u88c5\u4f9d\u8d56\u65f6\u4f1a\u66f4\u52a0\u65b9\u4fbf\u3002"),(0,p.kt)("h2",{id:"\u672c\u5468\u529f\u80fd\u7279\u6027\u4eae\u70b9"},"\u672c\u5468\u529f\u80fd\u7279\u6027\u4eae\u70b9"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard/pull/2149"},"Dashboard \u652f\u6301\u914d\u7f6e Service \u4e2d host \u5b57\u6bb5\u63d0\u4f9b\u8def\u7531\u9ed8\u8ba4\u503c"),"\uff08\u8d21\u732e\u8005\uff1a",(0,p.kt)("a",{parentName:"p",href:"https://github.com/bzp2010"},"bzp2010"),"\uff09")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/5171"},"APISIX \u652f\u6301\u6d4b\u8bd5\u914d\u7f6e\u6587\u4ef6"),"\uff08\u8d21\u732e\u8005\uff1a",(0,p.kt)("a",{parentName:"p",href:"https://github.com/nic-chen"},"nic-chen"),"\uff09")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/3894"},"APISIX \u65b0\u589e ldap-auth \u63d2\u4ef6"),"\uff08\u8d21\u732e\u8005\uff1a",(0,p.kt)("a",{parentName:"p",href:"https://github.com/jp-gouin"},"jp-gouin"),"\uff09"))),(0,p.kt)("h2",{id:"\u672c\u5468\u535a\u6587\u63a8\u8350"},"\u672c\u5468\u535a\u6587\u63a8\u8350"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/blog/2021/10/13/celebrating-300-contributors-of-apisix"},"Apache APISIX \u793e\u533a\u65b0\u91cc\u7a0b\u7891\u2014\u2014\u5168\u7403\u8d21\u732e\u8005\u7a81\u7834 300 \u4f4d\uff01"),"\uff1a"),(0,p.kt)("p",{parentName:"li"},"Apache APISIX \u793e\u533a\u8fbe\u6210\u65b0\u7684\u91cc\u7a0b\u7891\uff0c\u4e0e Apache APISIX \u76f8\u5173\u7684\u9879\u76ee\u5168\u7403\u8d21\u732e\u8005\u7a81\u7834 300 \u4f4d\uff01 \u8ddd\u79bb Apache APISIX \u4e3b\u5e93\u8fbe\u5230 200 \u4f4d\u8d21\u732e\u8005\u91cc\u7a0b\u7891\uff0c\u4ec5\u4ec5\u95f4\u9694 3 \u4e2a\u6708\uff01\u611f\u8c22\u793e\u533a\u8d21\u732e\u8005\u4eec\u5728\u4ee3\u7801\u3001\u6587\u6863\u3001\u8fd0\u8425\u7b49\u65b9\u65b9\u9762\u9762\u505a\u51fa\u7684\u5353\u8d8a\u8d21\u732e\u3002")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/blog/2021/10/01/openEuler"},"Apache APISIX \u793e\u533a\u6210\u5458\u52a9\u529b openEuler \u53d1\u5e03\u7b2c\u4e00\u4e2a\u793e\u533a\u521b\u65b0\u7248")),(0,p.kt)("p",{parentName:"li"},"\u6765\u81ea Apache APISIX \u793e\u533a\u7684\u7f57\u6cfd\u8f69\u548c\u6e29\u94ed\u5728 openEuler 9 \u6708 30 \u65e5\u53d1\u5e03\u7684\u7b2c\u4e00\u4e2a\u793e\u533a\u521b\u65b0\u7248\uff08 openEuler 21.09 \uff09\u4e2d\uff0c\u4e3a OpenResty \u8fc1\u79fb\u5de5\u4f5c\u4e2d\u505a\u4e86\u975e\u5e38\u591a\u7684\u8d21\u732e\uff0c\u8ba9 OpenResty \u53ef\u4ee5\u5728\u6b27\u62c9\u5f00\u6e90\u64cd\u4f5c\u7cfb\u7edf\u4e0a\u5e73\u7a33\u9ad8\u6548\u7684\u8fd0\u884c\u3002OpenResty \u7684\u7a33\u5b9a\u8fd0\u884c\u4e5f\u610f\u5473\u7740 Apache APISIX \u53ef\u4ee5\u987a\u7545\u5730\u8fd0\u884c\u5728 openEuler \u7cfb\u7edf\u4e0a\uff0cApache APISIX \u5e95\u5c42\u57fa\u4e8e OpenResty \u505a\u4e86\u4e00\u5b9a\u5f00\u53d1\u3002")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/blog/2021/09/29/release-apache-apisix-2.10"},"Apache APISIX 2.10.0 \u6b63\u5f0f\u53d1\u5e03\uff0c\u5e26\u6765\u7b2c\u4e00\u4e2a LTS \u7248\u672c\uff01")),(0,p.kt)("p",{parentName:"li"},"Apache APISIX 2.10 \u7248\u672c\u6b63\u5f0f\u53d1\u5e03\uff01\ud83c\udf89 \u8fd9\u662f Apache APISIX \u9996\u4e2a LTS \u7248\u672c\uff0c\u540c\u65f6\u652f\u6301 10+ \u4e2a\u65b0\u529f\u80fd\u548c\u65b0\u63d2\u4ef6\u3002\u5feb\u901f\u9605\u8bfb\u4e86\u89e3 2.10 \u7248\u672c\u7684\u65b0\u7279\u6027\u5427\uff01"))))}h.isMDXComponent=!0}}]);