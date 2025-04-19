"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[95497],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),c=u(n),m=l,g=c["".concat(o,".").concat(m)]||c[m]||d[m]||r;return n?a.createElement(g,i(i({ref:t},s),{},{components:n})):a.createElement(g,i({ref:t},s))}));function m(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=c;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:l,i[1]=p;for(var u=2;u<r;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},77405:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>s,frontMatter:()=>r,metadata:()=>p,toc:()=>o});var a=n(87462),l=(n(67294),n(3905));const r={title:"splunk-hec-logging",keywords:["Apache APISIX","API \u7f51\u5173","\u63d2\u4ef6","Splunk","\u65e5\u5fd7"],description:"API \u7f51\u5173 Apache APISIX \u7684 splunk-hec-logging \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u8bf7\u6c42\u65e5\u5fd7\u8f6c\u53d1\u5230 Splunk HTTP \u4e8b\u4ef6\u6536\u96c6\u5668\uff08HEC\uff09\u4e2d\u8fdb\u884c\u5206\u6790\u548c\u5b58\u50a8\u3002"},i=void 0,p={unversionedId:"plugins/splunk-hec-logging",id:"version-3.9/plugins/splunk-hec-logging",isDocsHomePage:!1,title:"splunk-hec-logging",description:"API \u7f51\u5173 Apache APISIX \u7684 splunk-hec-logging \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u8bf7\u6c42\u65e5\u5fd7\u8f6c\u53d1\u5230 Splunk HTTP \u4e8b\u4ef6\u6536\u96c6\u5668\uff08HEC\uff09\u4e2d\u8fdb\u884c\u5206\u6790\u548c\u5b58\u50a8\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.9/plugins/splunk-hec-logging.md",sourceDirName:"plugins",slug:"/plugins/splunk-hec-logging",permalink:"/zh/docs/apisix/3.9/plugins/splunk-hec-logging",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.9/docs/zh/latest/plugins/splunk-hec-logging.md",tags:[],version:"3.9",frontMatter:{title:"splunk-hec-logging",keywords:["Apache APISIX","API \u7f51\u5173","\u63d2\u4ef6","Splunk","\u65e5\u5fd7"],description:"API \u7f51\u5173 Apache APISIX \u7684 splunk-hec-logging \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u8bf7\u6c42\u65e5\u5fd7\u8f6c\u53d1\u5230 Splunk HTTP \u4e8b\u4ef6\u6536\u96c6\u5668\uff08HEC\uff09\u4e2d\u8fdb\u884c\u5206\u6790\u548c\u5b58\u50a8\u3002"},sidebar:"version-3.9/docs",previous:{title:"google-cloud-logging",permalink:"/zh/docs/apisix/3.9/plugins/google-cloud-logging"},next:{title:"file-logger",permalink:"/zh/docs/apisix/3.9/plugins/file-logger"}},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[{value:"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b",id:"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b",children:[]}]},{value:"\u63d2\u4ef6\u5143\u6570\u636e",id:"\u63d2\u4ef6\u5143\u6570\u636e",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],u={toc:o};function s(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"splunk-hec-logging")," \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u8bf7\u6c42\u65e5\u5fd7\u8f6c\u53d1\u5230 Splunk HTTP \u4e8b\u4ef6\u6536\u96c6\u5668\uff08HEC\uff09\u4e2d\u8fdb\u884c\u5206\u6790\u548c\u5b58\u50a8\u3002"),(0,l.kt)("p",null,"\u542f\u7528\u8be5\u63d2\u4ef6\u540e\uff0cAPISIX \u5c06\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"Log Phase")," \u83b7\u53d6\u8bf7\u6c42\u4e0a\u4e0b\u6587\u4fe1\u606f\uff0c\u5e76\u5c06\u5176\u5e8f\u5217\u5316\u4e3a ",(0,l.kt)("a",{parentName:"p",href:"https://docs.splunk.com/Documentation/Splunk/latest/Data/FormateventsforHTTPEventCollector#Event_metadata"},"Splunk Event Data \u683c\u5f0f")," \u540e\u63d0\u4ea4\u5230\u6279\u5904\u7406\u961f\u5217\u4e2d\uff0c\u5f53\u89e6\u53d1\u6279\u5904\u7406\u961f\u5217\u6bcf\u6279\u6b21\u6700\u5927\u5904\u7406\u5bb9\u91cf\u6216\u5237\u65b0\u7f13\u51b2\u533a\u7684\u6700\u5927\u65f6\u95f4\u65f6\u4f1a\u5c06\u961f\u5217\u4e2d\u7684\u6570\u636e\u63d0\u4ea4\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"Splunk HEC")," \u4e2d\u3002"),(0,l.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"endpoint"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Splunk HEC \u7aef\u70b9\u914d\u7f6e\u4fe1\u606f\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"endpoint.uri"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Splunk HEC \u4e8b\u4ef6\u6536\u96c6 API\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"endpoint.token"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Splunk HEC \u8eab\u4efd\u4ee4\u724c\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"endpoint.channel"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Splunk HEC \u53d1\u9001\u6e20\u9053\u6807\u8bc6\uff0c\u66f4\u591a\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,l.kt)("a",{parentName:"td",href:"https://docs.splunk.com/Documentation/Splunk/8.2.3/Data/AboutHECIDXAck"},"About HTTP Event Collector Indexer Acknowledgment"),"\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"endpoint.timeout"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"10"),(0,l.kt)("td",{parentName:"tr",align:null},"Splunk HEC \u6570\u636e\u63d0\u4ea4\u8d85\u65f6\u65f6\u95f4\uff08\u4ee5\u79d2\u4e3a\u5355\u4f4d\uff09\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"ssl_verify"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u542f\u7528 ",(0,l.kt)("inlineCode",{parentName:"td"},"SSL")," \u9a8c\u8bc1\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"log_format"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u4ee5 JSON \u683c\u5f0f\u7684\u952e\u503c\u5bf9\u6765\u58f0\u660e\u65e5\u5fd7\u683c\u5f0f\u3002\u5bf9\u4e8e\u503c\u90e8\u5206\uff0c\u4ec5\u652f\u6301\u5b57\u7b26\u4e32\u3002\u5982\u679c\u662f\u4ee5 ",(0,l.kt)("inlineCode",{parentName:"td"},"$")," \u5f00\u5934\uff0c\u5219\u8868\u660e\u662f\u8981\u83b7\u53d6 ",(0,l.kt)("a",{parentName:"td",href:"/zh/docs/apisix/3.9/apisix-variable"},"APISIX \u53d8\u91cf")," \u6216 ",(0,l.kt)("a",{parentName:"td",href:"http://nginx.org/en/docs/varindex.html"},"NGINX \u5185\u7f6e\u53d8\u91cf"),"\u3002")))),(0,l.kt)("p",null,"\u672c\u63d2\u4ef6\u652f\u6301\u4f7f\u7528\u6279\u5904\u7406\u5668\u6765\u805a\u5408\u5e76\u6279\u91cf\u5904\u7406\u6761\u76ee\uff08\u65e5\u5fd7\u548c\u6570\u636e\uff09\u3002\u8fd9\u6837\u53ef\u4ee5\u907f\u514d\u8be5\u63d2\u4ef6\u9891\u7e41\u5730\u63d0\u4ea4\u6570\u636e\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u6bcf ",(0,l.kt)("inlineCode",{parentName:"p"},"5")," \u79d2\u949f\u6216\u961f\u5217\u4e2d\u7684\u6570\u636e\u8fbe\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"1000")," \u6761\u65f6\uff0c\u6279\u5904\u7406\u5668\u4f1a\u81ea\u52a8\u63d0\u4ea4\u6570\u636e\uff0c\u5982\u9700\u4e86\u89e3\u66f4\u591a\u4fe1\u606f\u6216\u81ea\u5b9a\u4e49\u914d\u7f6e\uff0c\u8bf7\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.9/batch-processor#%E9%85%8D%E7%BD%AE"},"Batch-Processor"),"\u3002"),(0,l.kt)("h3",{id:"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b"},"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "sourcetype": "_json",\n  "time": 1704513555.392,\n  "event": {\n    "upstream": "127.0.0.1:1980",\n    "request_url": "http://localhost:1984/hello",\n    "request_query": {},\n    "request_size": 59,\n    "response_headers": {\n      "content-length": "12",\n      "server": "APISIX/3.7.0",\n      "content-type": "text/plain",\n      "connection": "close"\n    },\n    "response_status": 200,\n    "response_size": 118,\n    "latency": 108.00004005432,\n    "request_method": "GET",\n    "request_headers": {\n      "connection": "close",\n      "host": "localhost"\n    }\n  },\n  "source": "apache-apisix-splunk-hec-logging",\n  "host": "localhost"\n}\n')),(0,l.kt)("h2",{id:"\u63d2\u4ef6\u5143\u6570\u636e"},"\u63d2\u4ef6\u5143\u6570\u636e"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"log_format"),(0,l.kt)("td",{parentName:"tr",align:null},"object"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u4ee5 JSON \u683c\u5f0f\u7684\u952e\u503c\u5bf9\u6765\u58f0\u660e\u65e5\u5fd7\u683c\u5f0f\u3002\u5bf9\u4e8e\u503c\u90e8\u5206\uff0c\u4ec5\u652f\u6301\u5b57\u7b26\u4e32\u3002\u5982\u679c\u662f\u4ee5 ",(0,l.kt)("inlineCode",{parentName:"td"},"$")," \u5f00\u5934\u3002\u5219\u8868\u660e\u83b7\u53d6 ",(0,l.kt)("a",{parentName:"td",href:"/zh/docs/apisix/3.9/apisix-variable"},"APISIX \u53d8\u91cf")," \u6216 ",(0,l.kt)("a",{parentName:"td",href:"http://nginx.org/en/docs/varindex.html"},"NGINX \u5185\u7f6e\u53d8\u91cf"),"\u3002")))),(0,l.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"\u6ce8\u610f")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u8be5\u8bbe\u7f6e\u5168\u5c40\u751f\u6548\u3002\u5982\u679c\u6307\u5b9a\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"log_format"),"\uff0c\u5219\u6240\u6709\u7ed1\u5b9a ",(0,l.kt)("inlineCode",{parentName:"p"},"splunk-hec-logging")," \u7684\u8def\u7531\u6216\u670d\u52a1\u90fd\u5c06\u4f7f\u7528\u8be5\u65e5\u5fd7\u683c\u5f0f\u3002"))),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u901a\u8fc7 Admin API \u914d\u7f6e\u63d2\u4ef6\u5143\u6570\u636e\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/splunk-hec-logging \\\n-H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "log_format": {\n        "host": "$host",\n        "@timestamp": "$time_iso8601",\n        "client_ip": "$remote_addr"\n    }\n}\'\n')),(0,l.kt)("p",null,"\u914d\u7f6e\u5b8c\u6210\u540e\uff0c\u4f60\u5c06\u5728\u65e5\u5fd7\u7cfb\u7edf\u4e2d\u770b\u5230\u5982\u4e0b\u7c7b\u4f3c\u65e5\u5fd7\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'[{"time":1673976669.269,"source":"apache-apisix-splunk-hec-logging","event":{"host":"localhost","client_ip":"127.0.0.1","@timestamp":"2023-01-09T14:47:25+08:00","route_id":"1"},"host":"DESKTOP-2022Q8F-wsl","sourcetype":"_json"}]\n')),(0,l.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u5728\u6307\u5b9a\u8def\u7531\u4e0a\u542f\u7528\u8be5\u63d2\u4ef6\uff1a"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u5b8c\u6574\u914d\u7f6e")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins":{\n        "splunk-hec-logging":{\n            "endpoint":{\n                "uri":"http://127.0.0.1:8088/services/collector",\n                "token":"BD274822-96AA-4DA6-90EC-18940FB2414C",\n                "channel":"FE0ECFAD-13D5-401B-847D-77833BD77131",\n                "timeout":60\n            },\n            "buffer_duration":60,\n            "max_retry_count":0,\n            "retry_delay":1,\n            "inactive_timeout":2,\n            "batch_max_size":10\n        }\n    },\n    "upstream":{\n        "type":"roundrobin",\n        "nodes":{\n            "127.0.0.1:1980":1\n        }\n    },\n    "uri":"/splunk.do"\n}\'\n')),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u6700\u5c0f\u5316\u914d\u7f6e")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins":{\n        "splunk-hec-logging":{\n            "endpoint":{\n                "uri":"http://127.0.0.1:8088/services/collector",\n                "token":"BD274822-96AA-4DA6-90EC-18940FB2414C"\n            }\n        }\n    },\n    "upstream":{\n        "type":"roundrobin",\n        "nodes":{\n            "127.0.0.1:1980":1\n        }\n    },\n    "uri":"/splunk.do"\n}\'\n')),(0,l.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,l.kt)("p",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5411 APISIX \u53d1\u51fa\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/splunk.do?q=hello\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"HTTP/1.1 200 OK\n...\nhello, world\n")),(0,l.kt)("p",null,"\u8bbf\u95ee\u6210\u529f\u540e\uff0c\u4f60\u53ef\u4ee5\u767b\u5f55 Splunk \u63a7\u5236\u53f0\u68c0\u7d22\u67e5\u770b\u65e5\u5fd7\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.9/docs/assets/images/plugin/splunk-hec-admin-cn.png",alt:"splunk hec search view"})),(0,l.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,l.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u5220\u9664\u8be5\u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/hello",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}s.isMDXComponent=!0}}]);