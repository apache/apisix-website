(self.webpackChunk=self.webpackChunk||[]).push([[5186],{3905:function(n,e,t){"use strict";t.d(e,{Zo:function(){return s},kt:function(){return m}});var a=t(67294);function l(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function r(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?r(Object(t),!0).forEach((function(e){l(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function p(n,e){if(null==n)return{};var t,a,l=function(n,e){if(null==n)return{};var t,a,l={},r=Object.keys(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||(l[t]=n[t]);return l}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(l[t]=n[t])}return l}var o=a.createContext({}),u=function(n){var e=a.useContext(o),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},s=function(n){var e=u(n.components);return a.createElement(o.Provider,{value:e},n.children)},c={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(n,e){var t=n.components,l=n.mdxType,r=n.originalType,o=n.parentName,s=p(n,["components","mdxType","originalType","parentName"]),d=u(t),m=l,k=d["".concat(o,".").concat(m)]||d[m]||c[m]||r;return t?a.createElement(k,i(i({ref:e},s),{},{components:t})):a.createElement(k,i({ref:e},s))}));function m(n,e){var t=arguments,l=e&&e.mdxType;if("string"==typeof n||l){var r=t.length,i=new Array(r);i[0]=d;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=n,p.mdxType="string"==typeof n?n:l,i[1]=p;for(var u=2;u<r;u++)i[u]=t[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},40864:function(n,e,t){"use strict";t.r(e),t.d(e,{frontMatter:function(){return i},metadata:function(){return p},toc:function(){return o},default:function(){return s}});var a=t(22122),l=t(19756),r=(t(67294),t(3905)),i={title:"fault-injection"},p={unversionedId:"plugins/fault-injection",id:"version-2.5/plugins/fault-injection",isDocsHomePage:!1,title:"fault-injection",description:"\x3c!--",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-2.5/plugins/fault-injection.md",sourceDirName:"plugins",slug:"/plugins/fault-injection",permalink:"/zh/docs/apisix/2.5/plugins/fault-injection",editUrl:"https://github.com/apache/apisix/edit/master/docs/zh/latest/plugins/fault-injection.md",version:"2.5",frontMatter:{title:"fault-injection"},sidebar:"version-2.5/docs",previous:{title:"grpc-transcode",permalink:"/zh/docs/apisix/2.5/plugins/grpc-transcode"},next:{title:"key-auth",permalink:"/zh/docs/apisix/2.5/plugins/key-auth"}},o=[{value:"\u53c2\u6570",id:"\u53c2\u6570",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u7981\u7528\u63d2\u4ef6",id:"\u7981\u7528\u63d2\u4ef6",children:[]}]}],u={toc:o};function s(n){var e=n.components,t=(0,l.Z)(n,["components"]);return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"\u6545\u969c\u6ce8\u5165\u63d2\u4ef6\uff0c\u8be5\u63d2\u4ef6\u53ef\u4ee5\u548c\u5176\u4ed6\u63d2\u4ef6\u4e00\u8d77\u4f7f\u7528\uff0c\u5e76\u4e14\u4f1a\u5728\u5176\u4ed6\u63d2\u4ef6\u524d\u88ab\u6267\u884c\uff0c\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"abort")," \u53c2\u6570\u5c06\u76f4\u63a5\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef\u6307\u5b9a\u7684\u54cd\u5e94\u7801\u5e76\u4e14\u7ec8\u6b62\u5176\u4ed6\u63d2\u4ef6\u7684\u6267\u884c\uff0c\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"delay")," \u53c2\u6570\u5c06\u5ef6\u8fdf\u67d0\u4e2a\u8bf7\u6c42\uff0c\u5e76\u4e14\u8fd8\u4f1a\u6267\u884c\u914d\u7f6e\u7684\u5176\u4ed6\u63d2\u4ef6\u3002"),(0,r.kt)("h2",{id:"\u53c2\u6570"},"\u53c2\u6570"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"abort.http_status"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5fc5\u9700"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"[200, ...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef\u7684 http \u72b6\u6001\u7801")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"abort.body"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef\u7684\u54cd\u5e94\u6570\u636e\u3002\u652f\u6301\u4f7f\u7528 Nginx \u53d8\u91cf\uff0c\u5982 ",(0,r.kt)("inlineCode",{parentName:"td"},"client addr: $remote_addr\\n"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"abort.percentage"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 100]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5c06\u88ab\u4e2d\u65ad\u7684\u8bf7\u6c42\u5360\u6bd4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"abort.vars"),(0,r.kt)("td",{parentName:"tr",align:null},"array[]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u6267\u884c\u6545\u969c\u6ce8\u5165\u7684\u89c4\u5219\uff0c\u5f53\u89c4\u5219\u5339\u914d\u901a\u8fc7\u540e\u624d\u4f1a\u6267\u884c\u6545\u969c\u6ce8\u3002",(0,r.kt)("inlineCode",{parentName:"td"},"vars")," \u662f\u4e00\u4e2a\u8868\u8fbe\u5f0f\u7684\u5217\u8868\uff0c\u6765\u81ea ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr#operator-list"},"lua-resty-expr"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"delay.duration"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5fc5\u9700"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u5ef6\u8fdf\u65f6\u95f4\uff0c\u53ef\u4ee5\u6307\u5b9a\u5c0f\u6570")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"delay.percentage"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 100]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5c06\u88ab\u5ef6\u8fdf\u7684\u8bf7\u6c42\u5360\u6bd4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"delay.vars"),(0,r.kt)("td",{parentName:"tr",align:null},"array[]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u6267\u884c\u8bf7\u6c42\u5ef6\u8fdf\u7684\u89c4\u5219\uff0c\u5f53\u89c4\u5219\u5339\u914d\u901a\u8fc7\u540e\u624d\u4f1a\u5ef6\u8fdf\u8bf7\u6c42\u3002",(0,r.kt)("inlineCode",{parentName:"td"},"vars")," \u662f\u4e00\u4e2a\u8868\u8fbe\u5f0f\u5217\u8868\uff0c\u6765\u81ea ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr#operator-list"},"lua-resty-expr"),"\u3002")))),(0,r.kt)("p",null,"\u6ce8\uff1a\u53c2\u6570 abort \u548c delay \u81f3\u5c11\u8981\u5b58\u5728\u4e00\u4e2a\u3002"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"vars")," \u662f\u7531 ",(0,r.kt)("inlineCode",{parentName:"p"},"lua-resty-expr")," \u7684\u8868\u8fbe\u5f0f\u7ec4\u6210\u7684\u5217\u8868\uff0c\u5b83\u53ef\u4ee5\u7075\u6d3b\u7684\u5b9e\u73b0\u89c4\u5219\u4e4b\u95f4\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"and/or")," \u5173\u7cfb\uff0c\u793a\u4f8b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'[\n    [\n        [ "arg_name","==","jack" ],\n        [ "arg_age","==",18 ]\n    ],\n    [\n        [ "arg_name2","==","allen" ]\n    ]\n]\n')),(0,r.kt)("p",null,"\u8fd9\u8868\u793a\u524d\u4e24\u4e2a\u8868\u8fbe\u5f0f\u4e4b\u95f4\u7684\u5173\u7cfb\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"and")," \uff0c\u800c\u524d\u4e24\u4e2a\u548c\u7b2c\u4e09\u4e2a\u8868\u8fbe\u5f0f\u4e4b\u95f4\u7684\u5173\u7cfb\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"or"),"\u3002"),(0,r.kt)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),(0,r.kt)("h3",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,"\u793a\u4f8b1\uff1a\u4e3a\u7279\u5b9a\u8def\u7531\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"fault-injection")," \u63d2\u4ef6\uff0c\u5e76\u6307\u5b9a ",(0,r.kt)("inlineCode",{parentName:"p"},"abort")," \u53c2\u6570\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n       "fault-injection": {\n           "abort": {\n              "http_status": 200,\n              "body": "Fault Injection!"\n           }\n       }\n    },\n    "upstream": {\n       "nodes": {\n           "127.0.0.1:1980": 1\n       },\n       "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"\u6d4b\u8bd5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl http://127.0.0.1:9080/hello -i\nHTTP/1.1 200 OK\nDate: Mon, 13 Jan 2020 13:50:04 GMT\nContent-Type: text/plain\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX web server\n\nFault Injection!\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"http status \u8fd4\u56de",(0,r.kt)("inlineCode",{parentName:"p"},"200"),"\u5e76\u4e14\u54cd\u5e94",(0,r.kt)("inlineCode",{parentName:"p"},"body"),"\u4e3a",(0,r.kt)("inlineCode",{parentName:"p"},"Fault Injection!"),"\uff0c\u8868\u793a\u8be5\u63d2\u4ef6\u5df2\u542f\u7528\u3002")),(0,r.kt)("p",null,"\u793a\u4f8b2\uff1a\u4e3a\u7279\u5b9a\u8def\u7531\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"fault-injection")," \u63d2\u4ef6\uff0c\u5e76\u6307\u5b9a ",(0,r.kt)("inlineCode",{parentName:"p"},"delay")," \u53c2\u6570\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n       "fault-injection": {\n           "delay": {\n              "duration": 3\n           }\n       }\n    },\n    "upstream": {\n       "nodes": {\n           "127.0.0.1:1980": 1\n       },\n       "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"\u6d4b\u8bd5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ time curl http://127.0.0.1:9080/hello -i\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\nContent-Length: 6\nConnection: keep-alive\nServer: APISIX web server\nDate: Tue, 14 Jan 2020 14:30:54 GMT\nLast-Modified: Sat, 11 Jan 2020 12:46:21 GMT\n\nhello\n\nreal    0m3.034s\nuser    0m0.007s\nsys     0m0.010s\n")),(0,r.kt)("p",null,"\u793a\u4f8b3\uff1a\u4e3a\u7279\u5b9a\u8def\u7531\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"fault-injection")," \u63d2\u4ef6\uff0c\u5e76\u6307\u5b9a abort \u53c2\u6570\u7684 vars \u89c4\u5219\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n        "fault-injection": {\n            "abort": {\n                    "http_status": 403,\n                    "body": "Fault Injection!\\n",\n                    "vars": [\n                        [\n                            [ "arg_name","==","jack" ]\n                        ]\n                    ]\n            }\n        }\n    },\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1\n        },\n        "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"\u6d4b\u8bd5\uff1a"),(0,r.kt)("p",null,"1\u3001vars \u89c4\u5219\u5339\u914d\u5931\u8d25\uff0c\u8bf7\u6c42\u8fd4\u56de\u4e0a\u6e38\u54cd\u5e94\u6570\u636e\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl "http://127.0.0.1:9080/hello?name=allen" -i\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Wed, 20 Jan 2021 07:21:57 GMT\nServer: APISIX/2.2\n\nhello\n')),(0,r.kt)("p",null,"2\u3001vars \u89c4\u5219\u5339\u914d\u6210\u529f\uff0c\u6267\u884c\u6545\u969c\u6ce8\u5165\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl "http://127.0.0.1:9080/hello?name=jack" -i\nHTTP/1.1 403 Forbidden\nDate: Wed, 20 Jan 2021 07:23:37 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/2.2\n\nFault Injection!\n')),(0,r.kt)("p",null,"\u793a\u4f8b4\uff1a\u4e3a\u7279\u5b9a\u8def\u7531\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"fault-injection")," \u63d2\u4ef6\uff0c\u5e76\u6307\u5b9a delay \u53c2\u6570\u7684 vars \u89c4\u5219\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n        "fault-injection": {\n            "delay": {\n                "duration": 2,\n                "vars": [\n                    [\n                        [ "arg_name","==","jack" ]\n                    ]\n                ]\n            }\n        }\n    },\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1\n        },\n        "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"\u6d4b\u8bd5\uff1a"),(0,r.kt)("p",null,"1\u3001vars \u89c4\u5219\u5339\u914d\u5931\u8d25\uff0c\u4e0d\u5ef6\u8fdf\u8bf7\u6c42\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ time "curl http://127.0.0.1:9080/hello?name=allen" -i\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Wed, 20 Jan 2021 07:26:17 GMT\nServer: APISIX/2.2\n\nhello\n\nreal    0m0.007s\nuser    0m0.003s\nsys     0m0.003s\n')),(0,r.kt)("p",null,"2\u3001vars \u89c4\u5219\u5339\u914d\u6210\u529f\uff0c\u5ef6\u8fdf\u8bf7\u6c42\u4e24\u79d2\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ time curl "http://127.0.0.1:9080/hello?name=jack" -i\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Wed, 20 Jan 2021 07:57:50 GMT\nServer: APISIX/2.2\n\nhello\n\nreal    0m2.009s\nuser    0m0.004s\nsys     0m0.004s\n')),(0,r.kt)("p",null,"\u793a\u4f8b5\uff1a\u4e3a\u7279\u5b9a\u8def\u7531\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"fault-injection")," \u63d2\u4ef6\uff0c\u5e76\u6307\u5b9a abort \u548c delay \u53c2\u6570\u7684 vars \u89c4\u5219\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n        "fault-injection": {\n            "abort": {\n                "http_status": 403,\n                "body": "Fault Injection!\\n",\n                "vars": [\n                    [\n                        [ "arg_name","==","jack" ]\n                    ]\n                ]\n            },\n            "delay": {\n                "duration": 2,\n                "vars": [\n                    [\n                        [ "http_age","==","18" ]\n                    ]\n                ]\n            }\n        }\n    },\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1\n        },\n        "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"\u6d4b\u8bd5\uff1a"),(0,r.kt)("p",null,"1\u3001abort \u548c delay \u7684 vars \u89c4\u5219\u5339\u914d\u5931\u8d25\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ time curl \"http://127.0.0.1:9080/hello?name=allen\" -H 'age: 20' -i\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Wed, 20 Jan 2021 08:01:43 GMT\nServer: APISIX/2.2\n\nhello\n\nreal    0m0.007s\nuser    0m0.003s\nsys     0m0.003s\n")),(0,r.kt)("p",null,"2\u3001abort \u7684 vars \u89c4\u5219\u5339\u914d\u5931\u8d25\uff0c\u4e0d\u6267\u884c\u6545\u969c\u6ce8\u5165\uff0c\u4f46\u5ef6\u8fdf\u8bf7\u6c42\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ time curl \"http://127.0.0.1:9080/hello?name=allen\" -H 'age: 18' -i\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Wed, 20 Jan 2021 08:19:03 GMT\nServer: APISIX/2.2\n\nhello\n\nreal    0m2.009s\nuser    0m0.001s\nsys     0m0.006s\n")),(0,r.kt)("p",null,"3\u3001delay \u7684 vars \u89c4\u5219\u5339\u914d\u5931\u8d25\uff0c\u4e0d\u5ef6\u8fdf\u8bf7\u6c42\uff0c\u4f46\u6267\u884c\u6545\u969c\u6ce8\u5165\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ time curl \"http://127.0.0.1:9080/hello?name=jack\" -H 'age: 20' -i\nHTTP/1.1 403 Forbidden\nDate: Wed, 20 Jan 2021 08:20:18 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/2.2\n\nFault Injection!\n\nreal    0m0.007s\nuser    0m0.002s\nsys     0m0.004s\n")),(0,r.kt)("p",null,"4\u3001abort \u548c delay \u53c2\u6570\u7684 vars \u89c4\u5219\u5339\u914d\u6210\u529f\uff0c\u6267\u884c\u6545\u969c\u6ce8\u5165\uff0c\u5e76\u5ef6\u8fdf\u8bf7\u6c42\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ time curl \"http://127.0.0.1:9080/hello?name=jack\" -H 'age: 18' -i\nHTTP/1.1 403 Forbidden\nDate: Wed, 20 Jan 2021 08:21:17 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/2.2\n\nFault Injection!\n\nreal    0m2.006s\nuser    0m0.001s\nsys     0m0.005s\n")),(0,r.kt)("p",null,"\u793a\u4f8b6\uff1a\u4e3a\u7279\u5b9a\u8def\u7531\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"fault-injection")," \u63d2\u4ef6\uff0c\u5e76\u6307\u5b9a abort \u53c2\u6570\u7684 vars \u89c4\u5219\uff08",(0,r.kt)("inlineCode",{parentName:"p"},"or")," \u7684\u5173\u7cfb\uff09\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n        "fault-injection": {\n            "abort": {\n                "http_status": 403,\n                "body": "Fault Injection!\\n",\n                "vars": [\n                    [\n                        ["arg_name","==","jack"],\n                        ["arg_age","!","<",18]\n                    ],\n                    [\n                        ["http_apikey","==","apisix-key"]\n                    ]\n                ]\n            }\n        }\n    },\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1\n        },\n        "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"\u8868\u793a\u5f53\u8bf7\u6c42\u53c2\u6570 name \u548c age \u540c\u65f6\u6ee1\u8db3 ",(0,r.kt)("inlineCode",{parentName:"p"},'name == "jack"'),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"age >= 18")," \u65f6\uff0c\u6267\u884c\u6545\u969c\u6ce8\u5165\u3002\u6216\u8bf7\u6c42\u5934 apikey \u6ee1\u8db3 ",(0,r.kt)("inlineCode",{parentName:"p"},'apikey == "apisix-key"')," \u65f6\uff0c\u6267\u884c\u6545\u969c\u6ce8\u5165\u3002"),(0,r.kt)("p",null,"\u6d4b\u8bd5\uff1a"),(0,r.kt)("p",null,"1\u3001\u8bf7\u6c42\u53c2\u6570 name \u548c age \u5339\u914d\u6210\u529f\uff0c\u7f3a\u5c11\u8bf7\u6c42\u5934 ",(0,r.kt)("inlineCode",{parentName:"p"},"apikey"),"\uff0c \u6267\u884c\u6545\u969c\u6ce8\u5165\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl "http://127.0.0.1:9080/hello?name=jack&age=19" -i\nHTTP/1.1 403 Forbidden\nDate: Fri, 22 Jan 2021 11:05:46 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/2.2\n\nFault Injection!\n')),(0,r.kt)("p",null,"2\u3001\u8bf7\u6c42\u5934 ",(0,r.kt)("inlineCode",{parentName:"p"},"apikey")," \u5339\u914d\u6210\u529f\uff0c\u7f3a\u5c11\u8bf7\u6c42\u53c2\u6570\uff0c\u6267\u884c\u6545\u969c\u6ce8\u5165\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/hello -H "apikey: apisix-key" -i\nHTTP/1.1 403 Forbidden\nDate: Fri, 22 Jan 2021 11:08:34 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/2.2\n\nFault Injection!\n')),(0,r.kt)("p",null,"3\u3001\u8bf7\u6c42\u53c2\u6570\u4e0e\u8bf7\u6c42\u5934\u90fd\u5339\u914d\u5931\u8d25\uff0c\u4e0d\u6267\u884c\u6545\u969c\u6ce8\u5165\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl http://127.0.0.1:9080/hello -i\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Fri, 22 Jan 2021 11:11:17 GMT\nServer: APISIX/2.2\n\nhello\n")),(0,r.kt)("h3",{id:"\u7981\u7528\u63d2\u4ef6"},"\u7981\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,"\u79fb\u9664\u63d2\u4ef6\u914d\u7f6e\u4e2d\u76f8\u5e94\u7684 JSON \u914d\u7f6e\u53ef\u7acb\u5373\u7981\u7528\u8be5\u63d2\u4ef6\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/hello",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"\u8fd9\u65f6\u8be5\u63d2\u4ef6\u5df2\u88ab\u7981\u7528\u3002"))}s.isMDXComponent=!0}}]);