"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[56870],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return u}});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=a.createContext({}),g=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=g(e.components);return a.createElement(o.Provider,{value:n},e.children)},k={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},s=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),s=g(t),u=r,d=s["".concat(o,".").concat(u)]||s[u]||k[u]||l;return t?a.createElement(d,i(i({ref:n},c),{},{components:t})):a.createElement(d,i({ref:n},c))}));function u(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=s;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var g=2;g<l;g++)i[g]=t[g];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}s.displayName="MDXCreateElement"},64728:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return p},metadata:function(){return o},assets:function(){return g},toc:function(){return c},default:function(){return s}});var a=t(87462),r=t(63366),l=(t(67294),t(3905)),i={title:"\u5f3a\u5f3a\u8054\u5408\uff01APISIX \u96c6\u6210 SkyWalking \u6253\u9020\u5168\u65b9\u4f4d\u65e5\u5fd7\u5904\u7406",author:"\u5e84\u6d69\u6f6e",authorURL:"https://github.com/dmsolr",authorImageURL:"https://avatars.githubusercontent.com/u/29735230?v=4",keywords:["Apache APISIX","Apache SkyWalking","\u65e5\u5fd7\u5904\u7406","\u63d2\u4ef6\u96c6\u6210"],description:"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u4e86\u4e24\u6b3e Apache APISIX \u96c6\u6210 SkyWalking \u7684\u65e5\u5fd7\u63d2\u4ef6\uff0c\u4e3a\u4e4b\u540e\u5927\u5bb6\u5728 Apache APISIX \u4e2d\u8fdb\u884c\u65e5\u5fd7\u5904\u7406\u63d0\u4f9b\u66f4\u65b9\u4fbf\u7684\u64cd\u4f5c\u4e0e\u73af\u5883\u3002",tags:["Technology"]},p=void 0,o={permalink:"/zh/blog/2021/12/07/apisix-integrate-skywalking-plugin",source:"@site/i18n/zh/docusaurus-plugin-content-blog/2021/12/07/apisix-integrate-skywalking-plugin.md",title:"\u5f3a\u5f3a\u8054\u5408\uff01APISIX \u96c6\u6210 SkyWalking \u6253\u9020\u5168\u65b9\u4f4d\u65e5\u5fd7\u5904\u7406",description:"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u4e86\u4e24\u6b3e Apache APISIX \u96c6\u6210 SkyWalking \u7684\u65e5\u5fd7\u63d2\u4ef6\uff0c\u4e3a\u4e4b\u540e\u5927\u5bb6\u5728 Apache APISIX \u4e2d\u8fdb\u884c\u65e5\u5fd7\u5904\u7406\u63d0\u4f9b\u66f4\u65b9\u4fbf\u7684\u64cd\u4f5c\u4e0e\u73af\u5883\u3002",date:"2021-12-07T00:00:00.000Z",formattedDate:"2021\u5e7412\u67087\u65e5",tags:[{label:"Technology",permalink:"/zh/blog/tags/technology"}],readingTime:2.58,truncated:!0,authors:[{name:"\u5e84\u6d69\u6f6e",url:"https://github.com/dmsolr",imageURL:"https://avatars.githubusercontent.com/u/29735230?v=4"}],prevItem:{title:"Apache APISIX \u643a\u624b RocketMQ \u4e3a\u5b9e\u65f6 API \u65e5\u5fd7\u76d1\u63a7\u529f\u80fd\u518d\u4e0b\u4e00\u57ce",permalink:"/zh/blog/2021/12/08/apisix-integrate-rocketmq-logger-plugin"},nextItem:{title:"\u793e\u533a\u53cc\u5468\u62a5\uff5c11.15-11.30 \u529f\u80fd\u4eae\u70b9\u66f4\u65b0\u8fdb\u884c\u4e2d",permalink:"/zh/blog/2021/12/02/weekly-report-1130"}},g={authorsImageUrls:[void 0]},c=[{value:"\u529f\u80fd\u5f00\u53d1\u80cc\u666f",id:"\u529f\u80fd\u5f00\u53d1\u80cc\u666f",children:[]},{value:"\u5168\u65b0\u65e5\u5fd7\u63d2\u4ef6\u4ecb\u7ecd",id:"\u5168\u65b0\u65e5\u5fd7\u63d2\u4ef6\u4ecb\u7ecd",children:[{value:"SkyWalking Logger \u63d2\u4ef6",id:"skywalking-logger-\u63d2\u4ef6",children:[]},{value:"SkyWalking Error Logger \u63d2\u4ef6",id:"skywalking-error-logger-\u63d2\u4ef6",children:[]}]},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[]}],k={toc:c};function s(e){var n=e.components,t=(0,r.Z)(e,["components"]);return(0,l.kt)("wrapper",(0,a.Z)({},k,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u4e86\u4e24\u6b3e Apache APISIX \u96c6\u6210 SkyWalking \u7684\u65e5\u5fd7\u63d2\u4ef6\uff0c\u4e3a\u4e4b\u540e\u5927\u5bb6\u5728 Apache APISIX \u4e2d\u8fdb\u884c\u65e5\u5fd7\u5904\u7406\u63d0\u4f9b\u66f4\u65b9\u4fbf\u7684\u64cd\u4f5c\u4e0e\u73af\u5883\u3002")),(0,l.kt)("p",null,"\u5728\u53ef\u89c2\u6d4b\u6027\u9886\u57df\uff0c\u901a\u5e38\u91c7\u7528 Metrics\u3001Logger \u4e0e Tracing \u4e09\u5927\u65b9\u5411\u7684\u6570\u636e\u6536\u96c6\u4e0e\u5206\u6790\uff0c\u4ee5\u8fbe\u5230\u6d1e\u5bdf\u5e94\u7528\u8fd0\u884c\u72b6\u6001\u7684\u76ee\u7684\uff0cApache SkyWalking \u7684\u65e5\u5fd7\u5904\u7406\u6b63\u597d\u5177\u5907\u4e86\u4ee5\u4e0a\u4e09\u65b9\u9762\u3002"),(0,l.kt)("p",null,"Apache APISIX \u65e9\u5728 1.4 \u7248\u672c\u5c31\u5df2\u7ecf\u96c6\u6210 Apache SkyWaling Tracing \u80fd\u529b\uff0c\u5e76\u5728\u540e\u7eed\u7248\u672c\u4e2d\u52a0\u5165\u4e86\u9519\u8bef\u65e5\u5fd7\u548c\u8bbf\u95ee\u65e5\u5fd7\u6536\u96c6\u7b49\u529f\u80fd\u3002\u5982\u4eca\u968f\u7740 Apache SkyWalking \u5bf9 Metrics \u7684\u652f\u6301\uff0c\u80fd\u591f\u5e2e\u52a9 Apache APISIX \u5728\u96c6\u6210\u6a21\u5f0f\u4e0b\u5b9e\u73b0\u4e00\u7ad9\u5f0f\u53ef\u89c2\u6d4b\u65b9\u6848\uff0c\u540c\u65f6\u8986\u76d6\u5230\u65e5\u5fd7\u3001\u5ea6\u91cf\u548c\u8c03\u7528\u8ffd\u8e2a\u3002"),(0,l.kt)("h2",{id:"\u529f\u80fd\u5f00\u53d1\u80cc\u666f"},"\u529f\u80fd\u5f00\u53d1\u80cc\u666f"),(0,l.kt)("p",null,"\u719f\u6089 Apache APISIX \u7684\u5c0f\u4f19\u4f34\u5e94\u8be5\u77e5\u9053\uff0cApache APISIX \u5728\u8fd0\u884c\u4e2d\u4f1a\u4ea7\u51fa\u4e24\u79cd\u65e5\u5fd7\uff0c\u5373\u8bbf\u95ee\u65e5\u5fd7\u548c\u9519\u8bef\u65e5\u5fd7\u3002"),(0,l.kt)("p",null,"\u8bbf\u95ee\u65e5\u5fd7\u8bb0\u5f55\u7740\u6bcf\u4e2a\u8bf7\u6c42\u7684\u8be6\u7ec6\u4fe1\u606f\uff0c\u5c5e\u4e8e",(0,l.kt)("strong",{parentName:"p"},"\u8bf7\u6c42\u8303\u56f4"),"\u5185\u4ea7\u751f\u7684\u65e5\u5fd7\uff0c\u56e0\u6b64\u53ef\u4ee5\u76f4\u63a5\u4e0e Tracing \u5173\u8054\u3002\u800c\u9519\u8bef\u65e5\u5fd7\u5219\u662f Apache APISIX ",(0,l.kt)("strong",{parentName:"p"},"\u8fd0\u884c\u65f6"),"\u4ea7\u51fa\u65e5\u5fd7\u4fe1\u606f\uff0c\u662f\u6574\u4e2a\u5e94\u7528\u7ea7\u522b\u65e5\u5fd7\uff0c\u4f46\u65e0\u6cd5\u786e\u4fdd\u80fd\u767e\u5206\u767e\u5173\u8054\u5230\u8bf7\u6c42\u4e0a\u3002"),(0,l.kt)("p",null,"\u76ee\u524d Apache APISIX \u63d0\u4f9b\u4e86\u975e\u5e38\u4e30\u5bcc\u7684\u65e5\u5fd7\u5904\u7406\u63d2\u4ef6\uff0c\u5305\u62ec TCP/HTTP/Kafka \u7b49\u6536\u96c6\u4e0a\u62a5\u63d2\u4ef6\uff0c\u4f46\u5b83\u4eec\u4e0e Tracing \u5173\u8054\u90fd\u6bd4\u8f83\u5f31\u3002\u4ee5 Apache SkyWalking \u4e3a\u4f8b\uff0c\u63d0\u53d6 Apache APISIX \u7aef\u65e5\u5fd7\u8bb0\u5f55\u4e2d\u7684 SkyWalking Tracing Conetxt Header \u5e76\u8f93\u51fa\u5230\u6587\u4ef6\u7cfb\u7edf\uff0c\u4e4b\u540e\u5229\u7528\u65e5\u5fd7\u5904\u7406\u6846\u67b6\uff08fluentbit\uff09\u5c06\u65e5\u5fd7\u8f6c\u6210 SkyWalking \u53ef\u63a5\u53d7\u7684\u65e5\u5fd7\u683c\u5f0f\u3002\u540e\u7eed\u4ece\u4e2d\u89e3\u6790\u63d0\u53d6 Tracing Context\uff0c\u4ece\u800c\u83b7\u5f97 Tracing ID \u8fdb\u800c\u4e0e Trace \u5efa\u7acb\u8054\u7cfb\u3002"),(0,l.kt)("p",null,"\u663e\u7136\uff0c\u4e0a\u8ff0\u65b9\u5f0f\u5904\u7406\u6d41\u7a0b\u6bd4\u8f83\u7e41\u7410\u590d\u6742\uff0c\u8fd8\u9700\u8981\u989d\u5916\u8f6c\u6362\u65e5\u5fd7\u683c\u5f0f\u3002\u4e3a\u6b64\uff0c\u5728 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/5550"},"PR#5500")," \u4e2d\u6211\u4eec\u5b9e\u73b0\u4e86\u5c06 Apache SkyWalking \u8bbf\u95ee\u65e5\u5fd7\u63a5\u5165 Apache APISIX \u63d2\u4ef6\u751f\u6001\uff0c\u65b9\u4fbf\u7528\u6237\u5728\u4f7f\u7528 Apache APISIX \u4e2d\u66f4\u65b9\u4fbf\u5730\u5229\u7528 Apache SkyWalking \u8fdb\u884c\u6536\u96c6\u548c\u5904\u7406\u76f8\u5173\u65e5\u5fd7\u3002"),(0,l.kt)("h2",{id:"\u5168\u65b0\u65e5\u5fd7\u63d2\u4ef6\u4ecb\u7ecd"},"\u5168\u65b0\u65e5\u5fd7\u63d2\u4ef6\u4ecb\u7ecd"),(0,l.kt)("h3",{id:"skywalking-logger-\u63d2\u4ef6"},"SkyWalking Logger \u63d2\u4ef6"),(0,l.kt)("p",null,"SkyWalking Logger \u63d2\u4ef6\u80fd\u591f\u89e3\u6790 SkyWalking Tracing Context Header\uff0c\u5e76\u5c06\u76f8\u5173 Tracing Context \u4fe1\u606f\u6253\u5370\u5230\u65e5\u5fd7\u4e2d\uff0c\u4ece\u800c\u5b9e\u73b0\u65e5\u5fd7\u4e0e\u8c03\u7528\u94fe\u5efa\u7acb\u5173\u8054\u3002"),(0,l.kt)("p",null,"\u901a\u8fc7\u4f7f\u7528\u6b64\u63d2\u4ef6\uff0c\u53ef\u4ee5\u5b9e\u73b0\u5728\u4e0b\u6e38\u5df2\u7ecf\u96c6\u6210 Apache SkyWalking \u7684\u60c5\u51b5\u4e0b\uff0cApache APISIX \u5373\u4fbf\u6ca1\u6709\u6253\u5f00 SkyWalking Tracing \u63d2\u4ef6\u4e5f\u80fd\u83b7\u53d6\u5230 SkyWalking Tracing Context \u5e76\u5b9e\u73b0\u4e0e Tracing \u5173\u8054\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1638781626018-da50a39d-da16-4914-b4f5-8ac9b4312e19.png",alt:"\u65e5\u5fd7\u5185\u5bb9"})),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u4e0a\u56fe Content \u4e3a\u65e5\u5fd7\u5185\u5bb9\uff0c\u8fd9\u91cc\u4f7f\u7528\u4e86 Apache APISIX metadata \u914d\u7f6e\u6765\u6536\u96c6 Request \u76f8\u5173\u4fe1\u606f\u3002\u540e\u7eed\u53ef\u901a\u8fc7 Plugin Metadata \u4fee\u6539 Log Format \u5b9a\u5236\u65e5\u5fd7\u5185\u5bb9\uff0c\u5177\u4f53\u53ef\u4ee5\u53c2\u8003",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/skywalking-logger#metadata"},"\u5b98\u65b9\u6587\u6863"),"\u3002")),(0,l.kt)("h4",{id:"\u4f7f\u7528\u65b9\u6cd5"},"\u4f7f\u7528\u65b9\u6cd5"),(0,l.kt)("p",null,"\u5728\u4f7f\u7528\u8be5\u63d2\u4ef6\u65f6\uff0c\u7531\u4e8e SkyWalking \u63d2\u4ef6\u9ed8\u8ba4\u4e3a\u300c\u4e0d\u5f00\u542f\u300d\uff0c\u6240\u4ee5\u9700\u8981\u624b\u52a8\u4fee\u6539 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf/default-apisix.yaml")," \u6587\u4ef6\u4e2d ",(0,l.kt)("inlineCode",{parentName:"p"},"plugins")," \u7ae0\u8282\u6765\u89e3\u5f00SkyWalking \u6ce8\u91ca\u4ece\u800c\u542f\u7528\u63d2\u4ef6\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"plugins:\n  ...\n  - skywalking\n  ...\n")),(0,l.kt)("p",null,"\u4e4b\u540e\u4fbf\u53ef\u4f7f\u7528 SkyWalking Tracing \u63d2\u4ef6\u76f4\u63a5\u5f97\u5230 Tracing \u6570\u636e\uff0c\u4ee5\u4fbf\u63a5\u4e0b\u6765\u9a8c\u8bc1 Logging \u63d2\u4ef6\u76f8\u5173\u529f\u80fd\u662f\u5426\u80fd\u591f\u6b63\u5e38\u5f00\u542f\u4e0e\u5de5\u4f5c\u3002"),(0,l.kt)("h5",{id:"\u6b65\u9aa4\u4e00\uff1a\u521b\u5efa\u8def\u7531"},"\u6b65\u9aa4\u4e00\uff1a\u521b\u5efa\u8def\u7531"),(0,l.kt)("p",null,"\u63a5\u4e0b\u6765\u521b\u5efa\u4e00\u4e2a\u8def\u7531\uff0c\u5e76\u7ed1\u5b9a SkyWalking Tracing \u63d2\u4ef6\u548c SkyWalking Logging \u63d2\u4ef6\u3002\u5173\u4e8e\u63d2\u4ef6\u5177\u4f53\u914d\u7f6e\u7ec6\u8282\u53ef\u4ee5\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/skywalking-logger"},"Apache APISIX \u5b98\u65b9\u6587\u6863"),"\uff0c\u8fd9\u91cc\u4e0d\u518d\u8d58\u8ff0\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -X PUT \'http://192.168.0.108:9080/apisix/admin/routes/1001\' \\\n-H \'X-API-KEY:  edd1c9f034335f136f87ad84b625c8f1\' \\\n-H \'Content-Type: application/json\' \\\n-d \'{\n    "uri": "/get",\n    "plugins": {\n        "skywalking": {\n            "sample_ratio": 1\n        },\n        "skywalking-logger": {\n            "endpoint_addr": "http://127.0.0.1:12800"\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.org:80": 1\n        }\n    }\n}\'\n')),(0,l.kt)("h5",{id:"\u6b65\u9aa4\u4e8c\uff1a\u65e5\u5fd7\u5904\u7406"},"\u6b65\u9aa4\u4e8c\uff1a\u65e5\u5fd7\u5904\u7406"),(0,l.kt)("p",null,"\u5728 Apache SkyWalking \u4fa7\uff0c\u53ef\u4ee5\u4f7f\u7528 LAL\uff08Logger Analysis Language\uff09\u811a\u672c\u8fdb\u884c\u65e5\u5fd7\u5904\u7406\uff0c\u6bd4\u5982 Tag \u63d0\u53d6\u3001SkyWalking \u5143\u6570\u636e\u4fee\u6b63\u7b49\u3002"),(0,l.kt)("p",null,"\u8fd9\u91cc\u8fdb\u884c Tag \u63d0\u53d6\u4e3b\u8981\u662f\u4e3a\u4e86\u540e\u7eed\u68c0\u7d22\u65b9\u4fbf\uff0c\u4ee5\u53ca\u5728 Metrics \u7edf\u8ba1\u65f6\u6dfb\u52a0\u76f8\u5173\u4f9d\u8d56\u3002\u53ef\u4f7f\u7528\u5982\u4e0b\u4ee3\u7801\u8fdb\u884c SkyWalking LAL \u811a\u672c\u914d\u7f6e\u6765\u5b8c\u6210 Tag \u63d0\u53d6\uff0c\u66f4\u591a\u5173\u4e8e SkyWalking LAL \u811a\u672c\u4f7f\u7528\u65b9\u6cd5\u53ef\u4ee5\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"https://skywalking.apache.org/docs/main/latest/en/concepts-and-designs/lal/"},"Apache SkyWalking \u5b98\u65b9\u6587\u6863"),"\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"# The default LAL script to save all logs, behaving like the versions before 8.5.0.\nrules:\n  - name: default\n    dsl: |\n      filter {\n        json {\n          abortOnFailure false\n        }\n\n        extractor {\n          tag routeId: parsed.route_id\n          tag upstream: parsed.upstream\n          tag clientIp: parsed.client_ip\n          tag latency: parsed.latency\n        }\n\n        sink {\n        }\n      }\n")),(0,l.kt)("p",null,"\u5728 SkyWalking OAP Server \u914d\u7f6e\u4e0a\u8ff0 LAL \u811a\u672c\u540e\u5c06\u663e\u793a\u5982\u4e0b\u65e5\u5fd7\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1638781696137-6ba3a486-08c0-49e1-bc57-e144f95918a2.png",alt:"LAL \u811a\u672c\u65e5\u5fd7\u663e\u793a"})),(0,l.kt)("p",null,"\u5c55\u5f00\u65e5\u5fd7\u8be6\u60c5\u5982\u4e0b\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1638781751540-d597ace7-1de1-4baf-b361-1c136dfe5e05.png",alt:"\u5c55\u5f00\u65e5\u5fd7\u8be6\u60c5"})),(0,l.kt)("p",null,"\u901a\u8fc7\u4e0a\u8ff0\u64cd\u4f5c\u53ef\u4ee5\u770b\u5230\uff0c\u5c06 ",(0,l.kt)("inlineCode",{parentName:"p"},"routeId"),"\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"upstream")," \u548c ",(0,l.kt)("inlineCode",{parentName:"p"},"clientIp")," \u4ee5\u952e\u503c\u5bf9\u5f62\u5f0f\u5c55\u793a\uff0c\u6bd4\u5728\u65e5\u5fd7\u6b63\u6587\u4e2d\u76f4\u63a5\u67e5\u627e\u8981\u65b9\u4fbf\u8bb8\u591a\uff0c\u8fd8\u80fd\u7528\u4e8e MAL \u7edf\u8ba1\u751f\u6210\u76f8\u5173\u7684\u5ea6\u91cf\u6307\u6807\u3002"),(0,l.kt)("h3",{id:"skywalking-error-logger-\u63d2\u4ef6"},"SkyWalking Error Logger \u63d2\u4ef6"),(0,l.kt)("p",null,"\u76ee\u524d error-log-logger \u63d2\u4ef6\u5df2\u652f\u6301 SkyWalking \u65e5\u5fd7\u683c\u5f0f\uff0c\u73b0\u5728\u53ef\u4ee5\u4f7f\u7528 error-log-logger \u63d2\u4ef6\u5c06 Apache APISIX \u9519\u8bef\u65e5\u5fd7\u5feb\u6377\u63a5\u5165\u5230 Apache SkyWalking \u4e2d\u3002\u76ee\u524d\uff0c\u9519\u8bef\u65e5\u5fd7\u8fd8\u65e0\u6cd5\u83b7\u53d6 SkyWalking Tracing Context \u4fe1\u606f\uff0c\u56e0\u6b64\u65e0\u6cd5\u76f4\u63a5\u4e0e SkyWalking Tracing \u4ea7\u751f\u5173\u8054\u3002"),(0,l.kt)("p",null,"\u5173\u4e8e Error Log \u63a5\u5165 SkyWalking \u4e3b\u8981\u662f\u4e3a\u4e86\u80fd\u96c6\u4e2d\u7ba1\u7406 Apache APISIX \u7684\u65e5\u5fd7\u6570\u636e\uff0c\u540c\u65f6\u4e5f\u65b9\u4fbf\u5728 SkyWalking \u5185\u67e5\u770b\u6240\u6709\u53ef\u89c2\u6d4b\u6027\u6570\u636e\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1638781827612-f7d88e0e-0159-44ba-bc1e-b718695bc3b8.png",alt:"SkyWalking \u9762\u677f\u67e5\u770b"})),(0,l.kt)("h4",{id:"\u4f7f\u7528\u65b9\u6cd5-1"},"\u4f7f\u7528\u65b9\u6cd5"),(0,l.kt)("p",null,"\u7531\u4e8e error-log-logger \u63d2\u4ef6\u9ed8\u8ba4\u300c\u4e0d\u5f00\u542f\u300d\uff0c\u6240\u4ee5\u4ecd\u9700\u8981\u4e0a\u6587\u4e2d\u63d0\u5230\u7684\u65b9\u6cd5\u8fdb\u884c\u63d2\u4ef6\u5f00\u542f\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"plugins:\n  ...\n  - error-log-logger\n  ...\n")),(0,l.kt)("h5",{id:"\u6b65\u9aa4\u4e00\uff1a\u7ed1\u5b9a\u8def\u7531"},"\u6b65\u9aa4\u4e00\uff1a\u7ed1\u5b9a\u8def\u7531"),(0,l.kt)("p",null,"\u542f\u7528\u4e4b\u540e\uff0c\u9700\u8981\u5c06\u63d2\u4ef6\u7ed1\u5b9a\u5230\u8def\u7531\u6216\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"global rules")," \u4e0a\uff0c\u8fd9\u91cc\u6211\u4eec\u4ee5\u300c\u7ed1\u5b9a\u8def\u7531\u300d\u4e3a\u4f8b\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -X PUT \'http://192.168.0.108:9080/apisix/admin/plugin_metadata/error-log-logger\' \\\n-H \'X-API-KEY:  edd1c9f034335f136f87ad84b625c8f1\' \\\n-H \'Content-Type: application/json\' \\\n-d \'{\n    "inactive_timeout": 10,\n    "level": "ERROR",\n    "skywalking": {\n        "endpoint_addr": "http://127.0.0.1:12800/v3/logs"\n    }\n}\'\n')),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\u8fd9\u91cc ",(0,l.kt)("inlineCode",{parentName:"p"},"endpoint_addr")," \u662f SkyWalking OAP Server \u5730\u5740\uff0c\u9700\u8981\u5e26\u4e0a URI\uff08\u5373 ",(0,l.kt)("inlineCode",{parentName:"p"},"/v3/logs"),")\u3002")),(0,l.kt)("h5",{id:"\u6b65\u9aa4\u4e8c\uff1alal-\u5904\u7406"},"\u6b65\u9aa4\u4e8c\uff1aLAL \u5904\u7406"),(0,l.kt)("p",null,"\u4e0e Access Log \u5904\u7406\u65b9\u5f0f\u57fa\u672c\u4e00\u6837\uff0c\u65e5\u5fd7\u5728\u9001\u8fbe SkyWalking OAP Server \u65f6\uff0c\u540c\u6837\u4f1a\u7ecf\u8fc7 LAL \u5904\u7406\u3002\u56e0\u6b64\uff0c\u6211\u4eec\u4f9d\u7136\u53ef\u4ee5\u4f7f\u7528 SkyWalking LAL \u811a\u672c\u6765\u5206\u6790\u5904\u7406\u65e5\u5fd7\u4fe1\u606f\u3002"),(0,l.kt)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0cError Log \u65e5\u5fd7\u6d88\u606f\u4f53\u4f7f\u7528\u6587\u672c\u683c\u5f0f\u3002\u5982\u679c\u8fdb\u884c Tags \u63d0\u53d6\uff0c\u5219\u9700\u8981\u4f7f\u7528\u6b63\u5219\u8868\u8fbe\u5f0f\u6765\u5b8c\u6210\u3002\u4e0e Access Log \u5904\u7406\u6d88\u606f\u6b63\u6587\u7684\u65b9\u5f0f\u7565\u6709\u4e0d\u540c\uff0cAcces Log \u4f7f\u7528 JSON \u683c\u5f0f\uff0c\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 JSON \u89e3\u6790\u540e\u5f15\u7528 JSON \u5bf9\u8c61\u7684\u5b57\u6bb5\uff0c\u5176\u4ed6\u5904\u7406\u6d41\u7a0b\u5219\u5927\u4f53\u4e00\u81f4\u3002"),(0,l.kt)("p",null,"\u540c\u65f6\u4e5f\u53ef\u4ee5\u5229\u7528 Tags \u6765\u4f18\u5316\u663e\u793a\u6548\u679c\u4e0e\u68c0\u7d22\uff0c\u65b9\u4fbf\u540e\u7eed\u4f7f\u7528 SkyWalking MAL \u8fdb\u884c Metrics \u8ba1\u7b97\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'rules:\n  - name: apisix-errlog\n    dsl: |\n      filter {\n        text {\n          regexp "(?<datetime>\\\\d{4}/\\\\d{2}/\\\\d{2} \\\\d{2}:\\\\d{2}:\\\\d{2}) \\\\[(?<level>\\\\w+)\\\\] \\\\d+\\\\#\\\\d+:( \\\\*\\\\d+ \\\\[(?<module>\\\\w+)\\\\] (?<position>.*\\\\.lua:\\\\d+): (?<function>\\\\w+\\\\(\\\\)):)* (?<msg>.+)"\n        }\n        extractor {\n          tag level: parsed.level\n          if (parsed?.module) {\n            tag module: parsed.module\n            tag position: parsed.position\n            tag function: parsed.function\n          }\n        }\n        sink {\n        }\n      }\n')),(0,l.kt)("p",null,"\u5728 SkyWalking OAP Server \u4f7f\u7528\u7684 LAL \u811a\u672c\u4e4b\u540e\uff0c\u5c06\u4f1a\u5728\u65e5\u5fd7\u4e2d\u63d0\u53d6\u90e8\u5206 Tags\uff0c\u6548\u679c\u5982\u4e0b\u56fe\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1638781886771-b98c80de-4ea2-4cf3-ad1c-26250da231f7.png",alt:"\u63d0\u53d6 Tags"})),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u4e86\u4e24\u6b3e Apache APISIX \u96c6\u6210 SkyWalking \u7684\u65e5\u5fd7\u63d2\u4ef6\uff0c\u4e3a\u4e4b\u540e\u5927\u5bb6\u5728 Apache APISIX \u4e2d\u8fdb\u884c\u65e5\u5fd7\u5904\u7406\u63d0\u4f9b\u66f4\u65b9\u4fbf\u7684\u64cd\u4f5c\u4e0e\u73af\u5883\u3002\u5e0c\u671b\u901a\u8fc7\u672c\u7bc7\u5185\u5bb9\uff0c\u5927\u5bb6\u53ef\u4ee5\u5bf9\u65b0\u529f\u80fd\u6709\u4e86\u66f4\u5145\u5206\u7684\u7406\u89e3\uff0c\u540e\u7eed\u53ef\u4ee5\u66f4\u65b9\u4fbf\u5730\u5229\u7528 Apache APISIX \u8fdb\u884c\u53ef\u89c2\u6d4b\u6570\u636e\u7684\u96c6\u4e2d\u7ba1\u7406\u3002"))}s.isMDXComponent=!0}}]);