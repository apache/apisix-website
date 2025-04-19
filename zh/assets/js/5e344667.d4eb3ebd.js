"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[81480],{3905:(t,n,e)=>{e.d(n,{Zo:()=>u,kt:()=>g});var a=e(67294);function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function l(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,a)}return e}function i(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?l(Object(e),!0).forEach((function(n){r(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):l(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function p(t,n){if(null==t)return{};var e,a,r=function(t,n){if(null==t)return{};var e,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)e=l[a],n.indexOf(e)>=0||(r[e]=t[e]);return r}(t,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)e=l[a],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(r[e]=t[e])}return r}var d=a.createContext({}),o=function(t){var n=a.useContext(d),e=n;return t&&(e="function"==typeof t?t(n):i(i({},n),t)),e},u=function(t){var n=o(t.components);return a.createElement(d.Provider,{value:n},t.children)},m={inlineCode:"code",wrapper:function(t){var n=t.children;return a.createElement(a.Fragment,{},n)}},k=a.forwardRef((function(t,n){var e=t.components,r=t.mdxType,l=t.originalType,d=t.parentName,u=p(t,["components","mdxType","originalType","parentName"]),k=o(e),g=r,N=k["".concat(d,".").concat(g)]||k[g]||m[g]||l;return e?a.createElement(N,i(i({ref:n},u),{},{components:e})):a.createElement(N,i({ref:n},u))}));function g(t,n){var e=arguments,r=n&&n.mdxType;if("string"==typeof t||r){var l=e.length,i=new Array(l);i[0]=k;var p={};for(var d in n)hasOwnProperty.call(n,d)&&(p[d]=n[d]);p.originalType=t,p.mdxType="string"==typeof t?t:r,i[1]=p;for(var o=2;o<l;o++)i[o]=e[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,e)}k.displayName="MDXCreateElement"},10061:(t,n,e)=>{e.r(n),e.d(n,{contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>d});var a=e(87462),r=(e(67294),e(3905));const l={title:"chaitin-waf",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","WAF"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `chaitin-waf` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},i=void 0,p={unversionedId:"plugins/chaitin-waf",id:"version-3.9/plugins/chaitin-waf",isDocsHomePage:!1,title:"chaitin-waf",description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `chaitin-waf` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.9/plugins/chaitin-waf.md",sourceDirName:"plugins",slug:"/plugins/chaitin-waf",permalink:"/zh/docs/apisix/3.9/plugins/chaitin-waf",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.9/docs/zh/latest/plugins/chaitin-waf.md",tags:[],version:"3.9",frontMatter:{title:"chaitin-waf",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","WAF"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `chaitin-waf` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},sidebar:"version-3.9/docs",previous:{title:"GM",permalink:"/zh/docs/apisix/3.9/plugins/gm"},next:{title:"limit-req",permalink:"/zh/docs/apisix/3.9/plugins/limit-req"}},d=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u54cd\u5e94\u5934",id:"\u54cd\u5e94\u5934",children:[]},{value:"\u63d2\u4ef6\u5143\u6570\u636e",id:"\u63d2\u4ef6\u5143\u6570\u636e",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],o={toc:d};function u(t){let{components:n,...e}=t;return(0,r.kt)("wrapper",(0,a.Z)({},o,e,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,"\u5728\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"chaitin-waf")," \u63d2\u4ef6\u540e\uff0c\u6d41\u91cf\u5c06\u88ab\u8f6c\u53d1\u7ed9\u957f\u4ead WAF \u670d\u52a1\uff0c\u7528\u4ee5\u68c0\u6d4b\u548c\u9632\u6b62\u5404\u79cd Web \u5e94\u7528\u7a0b\u5e8f\u653b\u51fb\uff0c\u4ee5\u4fdd\u62a4\u5e94\u7528\u7a0b\u5e8f\u548c\u7528\u6237\u6570\u636e\u7684\u5b89\u5168\u3002"),(0,r.kt)("h2",{id:"\u54cd\u5e94\u5934"},"\u54cd\u5e94\u5934"),(0,r.kt)("p",null,"\u6839\u636e\u63d2\u4ef6\u914d\u7f6e\uff0c\u53ef\u4ee5\u9009\u62e9\u662f\u5426\u9644\u52a0\u989d\u5916\u7684\u54cd\u5e94\u5934\u3002"),(0,r.kt)("p",null,"\u54cd\u5e94\u5934\u7684\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF"),"\uff1aAPISIX \u662f\u5426\u5c06\u8bf7\u6c42\u8f6c\u53d1\u7ed9 WAF \u670d\u52a1\u5668\u3002",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"yes\uff1a\u8f6c\u53d1"),(0,r.kt)("li",{parentName:"ul"},"no\uff1a\u4e0d\u8f6c\u53d1"),(0,r.kt)("li",{parentName:"ul"},"unhealthy\uff1a\u7b26\u5408\u5339\u914d\u6761\u4ef6\uff0c\u4f46\u6ca1\u6709\u53ef\u7528\u7684 WAF \u670d\u52a1\u5668"),(0,r.kt)("li",{parentName:"ul"},"err\uff1a\u63d2\u4ef6\u6267\u884c\u8fc7\u7a0b\u4e2d\u51fa\u9519\u3002\u6b64\u65f6\u4f1a\u9644\u5e26 ",(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF-ERROR")," \u8bf7\u6c42\u5934"),(0,r.kt)("li",{parentName:"ul"},"waf-err\uff1a\u4e0e WAF \u670d\u52a1\u5668\u4ea4\u4e92\u65f6\u51fa\u9519\u3002\u6b64\u65f6\u4f1a\u9644\u5e26 ",(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF-ERROR")," \u8bf7\u6c42\u5934"),(0,r.kt)("li",{parentName:"ul"},"timeout\uff1a\u4e0e WAF \u670d\u52a1\u5668\u7684\u4ea4\u4e92\u8d85\u65f6"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF-ERROR"),"\uff1a\u8c03\u8bd5\u7528\u54cd\u5e94\u5934\u3002APISIX \u4e0e WAF \u4ea4\u4e92\u65f6\u7684\u9519\u8bef\u4fe1\u606f\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF-TIME"),"\uff1aAPISIX \u4e0e WAF \u4ea4\u4e92\u6240\u8017\u8d39\u7684\u65f6\u95f4\uff0c\u5355\u4f4d\u662f\u6beb\u79d2\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF-STATUS"),"\uff1aWAF \u670d\u52a1\u5668\u8fd4\u56de\u7ed9 APISIX \u7684\u72b6\u6001\u7801\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF-ACTION"),"\uff1aWAF \u670d\u52a1\u5668\u8fd4\u56de\u7ed9 APISIX \u7684\u5904\u7406\u7ed3\u679c\u3002",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"pass\uff1a\u8bf7\u6c42\u5408\u6cd5"),(0,r.kt)("li",{parentName:"ul"},"reject\uff1a\u8bf7\u6c42\u88ab WAF \u670d\u52a1\u5668\u62d2\u7edd"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"X-APISIX-CHAITIN-WAF-SERVER"),"\uff1a\u8c03\u8bd5\u7528\u54cd\u5e94\u5934\u3002\u6240\u4f7f\u7528\u7684 WAF \u670d\u52a1\u5668\u3002")),(0,r.kt)("h2",{id:"\u63d2\u4ef6\u5143\u6570\u636e"},"\u63d2\u4ef6\u5143\u6570\u636e"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"nodes"),(0,r.kt)("td",{parentName:"tr",align:null},"array(object)"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5fc5\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u4ead WAF \u7684\u5730\u5740\u5217\u8868\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"nodes","[0]",".host"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5fc5\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u4ead WAF \u7684\u5730\u5740\uff0c\u652f\u6301 IPV4\u3001IPV6\u3001Unix Socket \u7b49\u914d\u7f6e\u65b9\u5f0f\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"nodes","[0]",".port"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009"),(0,r.kt)("td",{parentName:"tr",align:null},"80"),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u4ead WAF \u7684\u7aef\u53e3\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u4ead WAF \u670d\u52a1\u7684\u914d\u7f6e\u53c2\u6570\u503c\u3002\u5f53\u8def\u7531\u6ca1\u6709\u914d\u7f6e\u65f6\u5c06\u4f7f\u7528\u8fd9\u91cc\u6240\u914d\u7f6e\u7684\u53c2\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.connect_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"1000"),(0,r.kt)("td",{parentName:"tr",align:null},"connect timeout, \u6beb\u79d2")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.send_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"1000"),(0,r.kt)("td",{parentName:"tr",align:null},"send timeout, \u6beb\u79d2")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.read_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"1000"),(0,r.kt)("td",{parentName:"tr",align:null},"read timeout, \u6beb\u79d2")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.req_body_size"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"1024"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u4f53\u5927\u5c0f\uff0c\u5355\u4f4d\u4e3a KB")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.keepalive_size"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"256"),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u4ead WAF \u670d\u52a1\u7684\u6700\u5927\u5e76\u53d1\u7a7a\u95f2\u8fde\u63a5\u6570")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.keepalive_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"60000"),(0,r.kt)("td",{parentName:"tr",align:null},"\u7a7a\u95f2\u94fe\u63a5\u8d85\u65f6\uff0c\u6beb\u79d2")))),(0,r.kt)("p",null,"\u4e00\u4e2a\u5178\u578b\u7684\u793a\u4f8b\u914d\u7f6e\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/chaitin-waf -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n  "nodes":[\n     {\n       "host": "unix:/path/to/safeline/resources/detector/snserver.sock",\n       "port": 8000\n     }\n  ]\n}\'\n')),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"match"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[object]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u89c4\u5219\u5217\u8868\uff0c\u9ed8\u8ba4\u4e3a\u7a7a\u4e14\u89c4\u5219\u5c06\u88ab\u65e0\u6761\u4ef6\u6267\u884c\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"match.vars"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[array]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u7531\u4e00\u4e2a\u6216\u591a\u4e2a ",(0,r.kt)("inlineCode",{parentName:"td"},"{var, operator, val}")," \u5143\u7d20\u7ec4\u6210\u7684\u5217\u8868\uff0c\u4f8b\u5982\uff1a",(0,r.kt)("inlineCode",{parentName:"td"},'{"arg_name", "==", "json"}'),"\uff0c\u8868\u793a\u5f53\u524d\u8bf7\u6c42\u53c2\u6570 ",(0,r.kt)("inlineCode",{parentName:"td"},"name")," \u662f ",(0,r.kt)("inlineCode",{parentName:"td"},"json"),"\u3002\u8fd9\u91cc\u7684 ",(0,r.kt)("inlineCode",{parentName:"td"},"var")," \u4e0e NGINX \u5185\u90e8\u81ea\u8eab\u53d8\u91cf\u547d\u540d\u662f\u4fdd\u6301\u4e00\u81f4\uff0c\u6240\u4ee5\u4e5f\u53ef\u4ee5\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"td"},"request_uri"),"\u3001",(0,r.kt)("inlineCode",{parentName:"td"},"host")," \u7b49\uff1b\u5bf9\u4e8e\u5df2\u652f\u6301\u7684\u8fd0\u7b97\u7b26\uff0c\u5177\u4f53\u7528\u6cd5\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr#operator-list"},"lua-resty-expr")," \u7684 ",(0,r.kt)("inlineCode",{parentName:"td"},"operator-list")," \u90e8\u5206\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"append_waf_resp_header"),(0,r.kt)("td",{parentName:"tr",align:null},"bool"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"true"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f\u5426\u6dfb\u52a0\u54cd\u5e94\u5934")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"append_waf_debug_header"),(0,r.kt)("td",{parentName:"tr",align:null},"bool"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f\u5426\u6dfb\u52a0\u8c03\u8bd5\u7528\u54cd\u5e94\u5934\uff0c",(0,r.kt)("inlineCode",{parentName:"td"},"add_header")," \u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\u624d\u751f\u6548")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u4ead WAF \u670d\u52a1\u7684\u914d\u7f6e\u53c2\u6570\u503c\u3002\u5f53\u8def\u7531\u6ca1\u6709\u914d\u7f6e\u65f6\u5c06\u4f7f\u7528\u5143\u6570\u636e\u91cc\u6240\u914d\u7f6e\u7684\u53c2\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.connect_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"connect timeout, \u6beb\u79d2")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.send_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"send timeout, \u6beb\u79d2")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.read_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"read timeout, \u6beb\u79d2")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.req_body_size"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u4f53\u5927\u5c0f\uff0c\u5355\u4f4d\u4e3a KB")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.keepalive_size"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u4ead WAF \u670d\u52a1\u7684\u6700\u5927\u5e76\u53d1\u7a7a\u95f2\u8fde\u63a5\u6570")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"config.keepalive_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u7a7a\u95f2\u94fe\u63a5\u8d85\u65f6\uff0c\u6beb\u79d2")))),(0,r.kt)("p",null,"\u4e00\u4e2a\u5178\u578b\u7684\u793a\u4f8b\u914d\u7f6e\u5982\u4e0b\uff0c\u8fd9\u91cc\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"httpbun.org")," \u4f5c\u4e3a\u793a\u4f8b\u540e\u7aef\uff0c\u53ef\u4ee5\u6309\u9700\u66ff\u6362\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n   "uri": "/*",\n   "plugins": {\n       "chaitin-waf": {\n           "match": [\n                {\n                    "vars": [\n                        ["http_waf","==","true"]\n                    ]\n                }\n            ]\n       }\n    },\n   "upstream": {\n       "type": "roundrobin",\n       "nodes": {\n           "httpbun.org:80": 1\n       }\n   }\n}\'\n')),(0,r.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,r.kt)("p",null,"\u4ee5\u4e0a\u8ff0\u7684\u793a\u4f8b\u914d\u7f6e\u4e3a\u4f8b\u8fdb\u884c\u6d4b\u8bd5\u3002"),(0,r.kt)("p",null,"\u4e0d\u6ee1\u8db3\u5339\u914d\u6761\u4ef6\u65f6\uff0c\u8bf7\u6c42\u53ef\u4ee5\u6b63\u5e38\u89e6\u8fbe\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -H "Host: httpbun.org" http://127.0.0.1:9080/get -i\n\nHTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 408\nConnection: keep-alive\nX-APISIX-CHAITIN-WAF: no\nDate: Wed, 19 Jul 2023 09:30:42 GMT\nX-Powered-By: httpbun/3c0dc05883dd9212ac38b04705037d50b02f2596\nServer: APISIX/3.3.0\n\n{\n  "args": {},\n  "headers": {\n    "Accept": "*/*",\n    "Connection": "close",\n    "Host": "httpbun.org",\n    "User-Agent": "curl/8.1.2",\n    "X-Forwarded-For": "127.0.0.1",\n    "X-Forwarded-Host": "httpbun.org",\n    "X-Forwarded-Port": "9080",\n    "X-Forwarded-Proto": "http",\n    "X-Real-Ip": "127.0.0.1"\n  },\n  "method": "GET",\n  "origin": "127.0.0.1, 122.231.76.178",\n  "url": "http://httpbun.org/get"\n}\n')),(0,r.kt)("p",null,"\u9762\u5bf9\u6f5c\u5728\u7684\u6ce8\u5165\u8bf7\u6c42\u4e5f\u539f\u6837\u8f6c\u53d1\u5e76\u9047\u5230 404 \u9519\u8bef\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -H "Host: httpbun.org" http://127.0.0.1:9080/getid=1%20AND%201=1 -i\n\nHTTP/1.1 404 Not Found\nContent-Type: text/plain; charset=utf-8\nContent-Length: 19\nConnection: keep-alive\nX-APISIX-CHAITIN-WAF: no\nDate: Wed, 19 Jul 2023 09:30:28 GMT\nX-Content-Type-Options: nosniff\nX-Powered-By: httpbun/3c0dc05883dd9212ac38b04705037d50b02f2596\nServer: APISIX/3.3.0\n\n404 page not found\n')),(0,r.kt)("p",null,"\u5f53\u6ee1\u8db3\u5339\u914d\u6761\u4ef6\u65f6\uff0c\u6b63\u5e38\u8bf7\u6c42\u4f9d\u7136\u53ef\u4ee5\u89e6\u8fbe\u4e0a\u6e38\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -H "Host: httpbun.org" -H "waf: true" http://127.0.0.1:9080/get -i\n\nHTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 427\nConnection: keep-alive\nX-APISIX-CHAITIN-WAF-TIME: 2\nX-APISIX-CHAITIN-WAF-STATUS: 200\nX-APISIX-CHAITIN-WAF: yes\nX-APISIX-CHAITIN-WAF-ACTION: pass\nDate: Wed, 19 Jul 2023 09:29:58 GMT\nX-Powered-By: httpbun/3c0dc05883dd9212ac38b04705037d50b02f2596\nServer: APISIX/3.3.0\n\n{\n  "args": {},\n  "headers": {\n    "Accept": "*/*",\n    "Connection": "close",\n    "Host": "httpbun.org",\n    "User-Agent": "curl/8.1.2",\n    "Waf": "true",\n    "X-Forwarded-For": "127.0.0.1",\n    "X-Forwarded-Host": "httpbun.org",\n    "X-Forwarded-Port": "9080",\n    "X-Forwarded-Proto": "http",\n    "X-Real-Ip": "127.0.0.1"\n  },\n  "method": "GET",\n  "origin": "127.0.0.1, 122.231.76.178",\n  "url": "http://httpbun.org/get"\n}\n')),(0,r.kt)("p",null,"\u800c\u6f5c\u5728\u7684\u653b\u51fb\u8bf7\u6c42\u5c06\u4f1a\u88ab\u62e6\u622a\u5e76\u8fd4\u56de 403 \u9519\u8bef\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -H "Host: httpbun.org" -H "waf: true" http://127.0.0.1:9080/getid=1%20AND%201=1 -i\n\nHTTP/1.1 403 Forbidden\nDate: Wed, 19 Jul 2023 09:29:06 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nX-APISIX-CHAITIN-WAF: yes\nX-APISIX-CHAITIN-WAF-TIME: 2\nX-APISIX-CHAITIN-WAF-ACTION: reject\nX-APISIX-CHAITIN-WAF-STATUS: 403\nServer: APISIX/3.3.0\nSet-Cookie: sl-session=UdywdGL+uGS7q8xMfnJlbQ==; Domain=; Path=/; Max-Age=86400\n\n{"code": 403, "success":false, "message": "blocked by Chaitin SafeLine Web Application Firewall", "event_id": "51a268653f2c4189bfa3ec66afbcb26d"}\n')),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u5220\u9664\u8be5\u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'$ curl http://127.0.0.1:9180/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n   "uri": "/*",\n   "upstream": {\n       "type": "roundrobin",\n       "nodes": {\n           "httpbun.org:80": 1\n       }\n   }\n}\'\n')))}u.isMDXComponent=!0}}]);