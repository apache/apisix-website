"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[31776],{3905:(t,e,n)=>{n.d(e,{Zo:()=>m,kt:()=>g});var a=n(67294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var d=a.createContext({}),o=function(t){var e=a.useContext(d),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},m=function(t){var e=o(t.components);return a.createElement(d.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},s=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,d=t.parentName,m=p(t,["components","mdxType","originalType","parentName"]),s=o(n),g=r,k=s["".concat(d,".").concat(g)]||s[g]||u[g]||l;return n?a.createElement(k,i(i({ref:e},m),{},{components:n})):a.createElement(k,i({ref:e},m))}));function g(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=s;var p={};for(var d in e)hasOwnProperty.call(e,d)&&(p[d]=e[d]);p.originalType=t,p.mdxType="string"==typeof t?t:r,i[1]=p;for(var o=2;o<l;o++)i[o]=n[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},62245:(t,e,n)=>{n.r(e),n.d(e,{contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>d});var a=n(87462),r=(n(67294),n(3905));const l={title:"syslog",keywords:["APISIX","API \u7f51\u5173","Plugin","syslog"],description:"API \u7f51\u5173 Apache APISIX syslog \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u65e5\u5fd7\u63a8\u9001\u5230 Syslog \u670d\u52a1\u5668\u3002"},i=void 0,p={unversionedId:"plugins/syslog",id:"version-3.10/plugins/syslog",isDocsHomePage:!1,title:"syslog",description:"API \u7f51\u5173 Apache APISIX syslog \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u65e5\u5fd7\u63a8\u9001\u5230 Syslog \u670d\u52a1\u5668\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.10/plugins/syslog.md",sourceDirName:"plugins",slug:"/plugins/syslog",permalink:"/zh/docs/apisix/3.10/plugins/syslog",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.10/docs/zh/latest/plugins/syslog.md",tags:[],version:"3.10",frontMatter:{title:"syslog",keywords:["APISIX","API \u7f51\u5173","Plugin","syslog"],description:"API \u7f51\u5173 Apache APISIX syslog \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u65e5\u5fd7\u63a8\u9001\u5230 Syslog \u670d\u52a1\u5668\u3002"},sidebar:"version-3.10/docs",previous:{title:"clickhouse-logger",permalink:"/zh/docs/apisix/3.10/plugins/clickhouse-logger"},next:{title:"log-rotate",permalink:"/zh/docs/apisix/3.10/plugins/log-rotate"}},d=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[{value:"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b",id:"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b",children:[]}]},{value:"\u63d2\u4ef6\u5143\u6570\u636e",id:"\u63d2\u4ef6\u5143\u6570\u636e",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],o={toc:d};function m(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},o,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"syslog")," \u63d2\u4ef6\u53ef\u7528\u4e8e\u5c06\u65e5\u5fd7\u63a8\u9001\u5230 Syslog \u670d\u52a1\u5668\u3002"),(0,r.kt)("p",null,"\u8be5\u63d2\u4ef6\u8fd8\u5b9e\u73b0\u4e86\u5c06\u65e5\u5fd7\u6570\u636e\u4ee5 JSON \u683c\u5f0f\u53d1\u9001\u5230 Syslog \u670d\u52a1\u7684\u80fd\u529b\u3002"),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"host"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"IP \u5730\u5740\u6216\u4e3b\u673a\u540d\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"port"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u76ee\u6807\u4e0a\u6e38\u7aef\u53e3\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},'"sys logger"'),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u6807\u8bc6 logger \u7684\u552f\u4e00\u6807\u8bc6\u7b26\u3002\u5982\u679c\u60a8\u4f7f\u7528 Prometheus \u76d1\u89c6 APISIX \u6307\u6807\uff0c\u540d\u79f0\u5c06\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"td"},"apisix_batch_process_entries")," \u5bfc\u51fa\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"3000"),(0,r.kt)("td",{parentName:"tr",align:null},"[1, ...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e0a\u6e38\u53d1\u9001\u6570\u636e\u8d85\u65f6\uff08\u4ee5\u6beb\u79d2\u4e3a\u5355\u4f4d\uff09\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"tls"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\u6267\u884c SSL \u9a8c\u8bc1\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"flush_limit"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"4096"),(0,r.kt)("td",{parentName:"tr",align:null},"[1, ...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5982\u679c\u7f13\u51b2\u7684\u6d88\u606f\u7684\u5927\u5c0f\u52a0\u4e0a\u5f53\u524d\u6d88\u606f\u7684\u5927\u5c0f\u8fbe\u5230\uff08> =\uff09\u6b64\u9650\u5236\uff08\u4ee5\u5b57\u8282\u4e3a\u5355\u4f4d\uff09\uff0c\u5219\u7f13\u51b2\u7684\u65e5\u5fd7\u6d88\u606f\u5c06\u88ab\u5199\u5165\u65e5\u5fd7\u670d\u52a1\u5668\uff0c\u9ed8\u8ba4\u4e3a 4096\uff084KB\uff09\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"drop_limit"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"1048576"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u5982\u679c\u7f13\u51b2\u7684\u6d88\u606f\u7684\u5927\u5c0f\u52a0\u4e0a\u5f53\u524d\u6d88\u606f\u7684\u5927\u5c0f\u5927\u4e8e\u6b64\u9650\u5236\uff08\u4ee5\u5b57\u8282\u4e3a\u5355\u4f4d\uff09\uff0c\u5219\u7531\u4e8e\u7f13\u51b2\u533a\u5927\u5c0f\u6709\u9650\uff0c\u5f53\u524d\u7684\u65e5\u5fd7\u6d88\u606f\u5c06\u88ab\u4e22\u5f03\uff0c\u9ed8\u8ba4\u4e3a 1048576\uff081MB\uff09\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sock_type"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},'"tcp"'),(0,r.kt)("td",{parentName:"tr",align:null},'["tcp","udp"]'),(0,r.kt)("td",{parentName:"tr",align:null},"\u7528\u4e8e\u4f20\u8f93\u5c42\u7684 IP \u534f\u8bae\u7c7b\u578b\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"max_retry_count"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"[1, ...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8fde\u63a5\u5230\u65e5\u5fd7\u670d\u52a1\u5668\u5931\u8d25\u6216\u5c06\u65e5\u5fd7\u6d88\u606f\u53d1\u9001\u5230\u65e5\u5fd7\u670d\u52a1\u5668\u5931\u8d25\u540e\u7684\u6700\u5927\u91cd\u8bd5\u6b21\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"retry_delay"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"[0, ...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u91cd\u8bd5\u8fde\u63a5\u5230\u65e5\u5fd7\u670d\u52a1\u5668\u6216\u91cd\u8bd5\u5411\u65e5\u5fd7\u670d\u52a1\u5668\u53d1\u9001\u65e5\u5fd7\u6d88\u606f\u4e4b\u524d\u7684\u65f6\u95f4\u5ef6\u8fdf\uff08\u4ee5\u6beb\u79d2\u4e3a\u5355\u4f4d\uff09\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"pool_size"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"5"),(0,r.kt)("td",{parentName:"tr",align:null},"[5, ...]"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"sock\uff1akeepalive")," \u4f7f\u7528\u7684 Keepalive \u6c60\u5927\u5c0f\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"log_format"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u4ee5 JSON \u683c\u5f0f\u7684\u952e\u503c\u5bf9\u6765\u58f0\u660e\u65e5\u5fd7\u683c\u5f0f\u3002\u5bf9\u4e8e\u503c\u90e8\u5206\uff0c\u4ec5\u652f\u6301\u5b57\u7b26\u4e32\u3002\u5982\u679c\u662f\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"td"},"$")," \u5f00\u5934\uff0c\u5219\u8868\u660e\u662f\u8981\u83b7\u53d6 ",(0,r.kt)("a",{parentName:"td",href:"/zh/docs/apisix/3.10/apisix-variable"},"APISIX \u53d8\u91cf")," \u6216 ",(0,r.kt)("a",{parentName:"td",href:"http://nginx.org/en/docs/varindex.html"},"NGINX \u5185\u7f6e\u53d8\u91cf"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"include_req_body"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null},"[false, true]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\u5305\u62ec\u8bf7\u6c42\u4f53\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"include_req_body_expr"),(0,r.kt)("td",{parentName:"tr",align:null},"array"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53 ",(0,r.kt)("inlineCode",{parentName:"td"},"include_req_body")," \u5c5e\u6027\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\u7684\u8fc7\u6ee4\u5668\u3002\u53ea\u6709\u5f53\u6b64\u5904\u8bbe\u7f6e\u7684\u8868\u8fbe\u5f0f\u6c42\u503c\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u624d\u4f1a\u8bb0\u5f55\u8bf7\u6c42\u4f53\u3002\u6709\u5173\u66f4\u591a\u4fe1\u606f\uff0c\u8bf7\u53c2\u9605 ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr"},"lua-resty-expr")," \u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"include_resp_body"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null},"[false, true]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u5305\u542b\u54cd\u5e94\u4f53\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"include_resp_body_expr"),(0,r.kt)("td",{parentName:"tr",align:null},"array"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53 ",(0,r.kt)("inlineCode",{parentName:"td"},"include_resp_body")," \u5c5e\u6027\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\u8fdb\u884c\u8fc7\u6ee4\u54cd\u5e94\u4f53\uff0c\u5e76\u4e14\u53ea\u6709\u5f53\u6b64\u5904\u8bbe\u7f6e\u7684\u8868\u8fbe\u5f0f\u8ba1\u7b97\u7ed3\u679c\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u624d\u4f1a\u8bb0\u5f55\u54cd\u5e94\u4f53\u3002\u66f4\u591a\u4fe1\u606f\uff0c\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr"},"lua-resty-expr"),"\u3002")))),(0,r.kt)("p",null,"\u8be5\u63d2\u4ef6\u652f\u6301\u4f7f\u7528\u6279\u5904\u7406\u5668\u6765\u805a\u5408\u5e76\u6279\u91cf\u5904\u7406\u6761\u76ee\uff08\u65e5\u5fd7/\u6570\u636e\uff09\u3002\u8fd9\u6837\u53ef\u4ee5\u907f\u514d\u63d2\u4ef6\u9891\u7e41\u5730\u63d0\u4ea4\u6570\u636e\uff0c\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u6279\u5904\u7406\u5668\u6bcf ",(0,r.kt)("inlineCode",{parentName:"p"},"5")," \u79d2\u949f\u6216\u961f\u5217\u4e2d\u7684\u6570\u636e\u8fbe\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"1000")," \u6761\u65f6\u63d0\u4ea4\u6570\u636e\uff0c\u5982\u9700\u4e86\u89e3\u6279\u5904\u7406\u5668\u76f8\u5173\u53c2\u6570\u8bbe\u7f6e\uff0c\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/batch-processor#%E9%85%8D%E7%BD%AE"},"Batch-Processor"),"\u3002"),(0,r.kt)("h3",{id:"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b"},"\u9ed8\u8ba4\u65e5\u5fd7\u683c\u5f0f\u793a\u4f8b"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'"<46>1 2024-01-06T02:30:59.145Z 127.0.0.1 apisix 82324 - - {\\"response\\":{\\"status\\":200,\\"size\\":141,\\"headers\\":{\\"content-type\\":\\"text/plain\\",\\"server\\":\\"APISIX/3.7.0\\",\\"transfer-encoding\\":\\"chunked\\",\\"connection\\":\\"close\\"}},\\"route_id\\":\\"1\\",\\"server\\":{\\"hostname\\":\\"baiyundeMacBook-Pro.local\\",\\"version\\":\\"3.7.0\\"},\\"request\\":{\\"uri\\":\\"/opentracing\\",\\"url\\":\\"http://127.0.0.1:1984/opentracing\\",\\"querystring\\":{},\\"method\\":\\"GET\\",\\"size\\":155,\\"headers\\":{\\"content-type\\":\\"application/x-www-form-urlencoded\\",\\"host\\":\\"127.0.0.1:1984\\",\\"user-agent\\":\\"lua-resty-http/0.16.1 (Lua) ngx_lua/10025\\"}},\\"upstream\\":\\"127.0.0.1:1982\\",\\"apisix_latency\\":100.99999809265,\\"service_id\\":\\"\\",\\"upstream_latency\\":1,\\"start_time\\":1704508259044,\\"client_ip\\":\\"127.0.0.1\\",\\"latency\\":101.99999809265}\\n"\n')),(0,r.kt)("h2",{id:"\u63d2\u4ef6\u5143\u6570\u636e"},"\u63d2\u4ef6\u5143\u6570\u636e"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"log_format"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u4ee5 JSON \u683c\u5f0f\u7684\u952e\u503c\u5bf9\u6765\u58f0\u660e\u65e5\u5fd7\u683c\u5f0f\u3002\u5bf9\u4e8e\u503c\u90e8\u5206\uff0c\u4ec5\u652f\u6301\u5b57\u7b26\u4e32\u3002\u5982\u679c\u662f\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"td"},"$")," \u5f00\u5934\u3002\u5219\u8868\u660e\u83b7\u53d6 ",(0,r.kt)("a",{parentName:"td",href:"https://apisix.apache.org/docs/apisix/apisix-variable"},"APISIX \u53d8\u91cf")," \u6216 ",(0,r.kt)("a",{parentName:"td",href:"http://nginx.org/en/docs/varindex.html"},"NGINX \u5185\u7f6e\u53d8\u91cf"),"\u3002")))),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"\u91cd\u8981")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u8be5\u8bbe\u7f6e\u5168\u5c40\u751f\u6548\u3002\u5982\u679c\u6307\u5b9a\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},"log_format"),"\uff0c\u5219\u6240\u6709\u7ed1\u5b9a ",(0,r.kt)("inlineCode",{parentName:"p"},"syslog")," \u7684\u8def\u7531\u6216\u670d\u52a1\u90fd\u5c06\u4f7f\u7528\u8be5\u65e5\u5fd7\u683c\u5f0f\u3002"))),(0,r.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5728\u6307\u5b9a\u8def\u7531\u4e2d\u542f\u7528\u8be5\u63d2\u4ef6\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "syslog": {\n            "host" : "127.0.0.1",\n            "port" : 5044,\n            "flush_limit" : 1\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,r.kt)("p",null,"\u73b0\u5728\u4f60\u53ef\u4ee5\u5411 APISIX \u53d1\u8d77\u8bf7\u6c42\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/hello\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"HTTP/1.1 200 OK\n...\nhello, world\n")),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u5220\u9664\u8be5\u63d2\u4ef6\u65f6\uff0c\u53ef\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/hello",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}m.isMDXComponent=!0}}]);