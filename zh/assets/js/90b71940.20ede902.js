"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[85587],{3905:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>s});var a=n(67294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),d=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=d(t.components);return a.createElement(p.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},c=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),c=d(n),s=r,g=c["".concat(p,".").concat(s)]||c[s]||m[s]||l;return n?a.createElement(g,i(i({ref:e},u),{},{components:n})):a.createElement(g,i({ref:e},u))}));function s(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=c;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},19303:(t,e,n)=>{n.r(e),n.d(e,{contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const l={title:"brotli",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","brotli"],description:"\u8fd9\u4e2a\u6587\u6863\u5305\u542b\u6709\u5173 Apache APISIX brotli \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002"},i=void 0,o={unversionedId:"plugins/brotli",id:"version-3.10/plugins/brotli",isDocsHomePage:!1,title:"brotli",description:"\u8fd9\u4e2a\u6587\u6863\u5305\u542b\u6709\u5173 Apache APISIX brotli \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.10/plugins/brotli.md",sourceDirName:"plugins",slug:"/plugins/brotli",permalink:"/zh/docs/apisix/3.10/plugins/brotli",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.10/docs/zh/latest/plugins/brotli.md",tags:[],version:"3.10",frontMatter:{title:"brotli",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","brotli"],description:"\u8fd9\u4e2a\u6587\u6863\u5305\u542b\u6709\u5173 Apache APISIX brotli \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002"},sidebar:"version-3.10/docs",previous:{title:"gzip",permalink:"/zh/docs/apisix/3.10/plugins/gzip"},next:{title:"real-ip",permalink:"/zh/docs/apisix/3.10/plugins/real-ip"}},p=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u524d\u63d0\u6761\u4ef6",id:"\u524d\u63d0\u6761\u4ef6",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],d={toc:p};function u(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"brotli")," \u63d2\u4ef6\u53ef\u4ee5\u52a8\u6001\u7684\u8bbe\u7f6e Nginx \u4e2d\u7684 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/google/ngx_brotli"},"brotli")," \u7684\u884c\u4e3a\u3002"),(0,r.kt)("h2",{id:"\u524d\u63d0\u6761\u4ef6"},"\u524d\u63d0\u6761\u4ef6"),(0,r.kt)("p",null,"\u8be5\u63d2\u4ef6\u4f9d\u8d56 brotli \u5171\u4eab\u5e93\u3002"),(0,r.kt)("p",null,"\u5982\u4e0b\u662f\u6784\u5efa\u548c\u5b89\u88c5 brotli \u5171\u4eab\u5e93\u7684\u793a\u4f8b\u811a\u672c\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'wget https://github.com/google/brotli/archive/refs/tags/v1.1.0.zip\nunzip v1.1.0.zip\ncd brotli-1.1.0 && mkdir build && cd build\ncmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local/brotli ..\nsudo cmake --build . --config Release --target install\nsudo sh -c "echo /usr/local/brotli/lib >> /etc/ld.so.conf.d/brotli.conf"\nsudo ldconfig\n')),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"types"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]",' or "*"'),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},'["text/html"]'),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a8\u6001\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"td"},"brotli_types")," \u6307\u4ee4\u3002\u7279\u6b8a\u503c ",(0,r.kt)("inlineCode",{parentName:"td"},'"*"')," \u7528\u4e8e\u5339\u914d\u4efb\u610f\u7684 MIME \u7c7b\u578b\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"min_length"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"20"),(0,r.kt)("td",{parentName:"tr",align:null},">= 1"),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a8\u6001\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"td"},"brotli_min_length")," \u6307\u4ee4\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"comp_level"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"6"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 11]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a8\u6001\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"td"},"brotli_comp_level")," \u6307\u4ee4\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"mode"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 2]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a8\u6001\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"td"},"brotli decompress mode"),"\uff0c\u66f4\u591a\u4fe1\u606f\u53c2\u8003 ",(0,r.kt)("a",{parentName:"td",href:"https://tools.ietf.org/html/rfc7932"},"RFC 7932"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"lgwin"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"19"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 10-24]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a8\u6001\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"td"},"brotli sliding window size"),"\uff0c",(0,r.kt)("inlineCode",{parentName:"td"},"lgwin")," \u662f\u6ed1\u52a8\u7a97\u53e3\u5927\u5c0f\u7684\u4ee5 2 \u4e3a\u5e95\u7684\u5bf9\u6570\uff0c\u5c06\u5176\u8bbe\u7f6e\u4e3a 0 \u4f1a\u8ba9\u538b\u7f29\u5668\u81ea\u884c\u51b3\u5b9a\u6700\u4f73\u503c\uff0c\u66f4\u591a\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"td",href:"https://tools.ietf.org/html/rfc7932"},"RFC 7932"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"lgblock"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 16-24]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a8\u6001\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"td"},"brotli input block size"),"\uff0c",(0,r.kt)("inlineCode",{parentName:"td"},"lgblock")," \u662f\u6700\u5927\u8f93\u5165\u5757\u5927\u5c0f\u7684\u4ee5 2 \u4e3a\u5e95\u7684\u5bf9\u6570\uff0c\u5c06\u5176\u8bbe\u7f6e\u4e3a 0 \u4f1a\u8ba9\u538b\u7f29\u5668\u81ea\u884c\u51b3\u5b9a\u6700\u4f73\u503c\uff0c\u66f4\u591a\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"td",href:"https://tools.ietf.org/html/rfc7932"},"RFC 7932"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"http_version"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"1.1"),(0,r.kt)("td",{parentName:"tr",align:null},"1.1, 1.0"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e0e ",(0,r.kt)("inlineCode",{parentName:"td"},"gzip_http_version")," \u6307\u4ee4\u7c7b\u4f3c\uff0c\u7528\u4e8e\u8bc6\u522b http \u7684\u534f\u8bae\u7248\u672c\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"vary"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e0e ",(0,r.kt)("inlineCode",{parentName:"td"},"gzip_vary")," \u6307\u4ee4\u7c7b\u4f3c\uff0c\u7528\u4e8e\u542f\u7528\u6216\u7981\u7528 ",(0,r.kt)("inlineCode",{parentName:"td"},"Vary: Accept-Encoding")," \u54cd\u5e94\u5934\u3002")))),(0,r.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5982\u4e0b\u793a\u4f8b\u4e2d\uff0c\u5728\u6307\u5b9a\u7684\u8def\u7531\u4e0a\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"brotli")," \u63d2\u4ef6\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/",\n    "plugins": {\n        "brotli": {\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.org": 1\n        }\n    }\n}\'\n')),(0,r.kt)("h2",{id:"\u4f7f\u7528\u793a\u4f8b"},"\u4f7f\u7528\u793a\u4f8b"),(0,r.kt)("p",null,"\u901a\u8fc7\u4e0a\u8ff0\u547d\u4ee4\u542f\u7528\u63d2\u4ef6\u540e\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u65b9\u6cd5\u6d4b\u8bd5\u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/ -i -H "Accept-Encoding: br"\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Tue, 05 Dec 2023 03:06:49 GMT\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nServer: APISIX/3.6.0\nContent-Encoding: br\n\nWarning: Binary output can mess up your terminal. Use "--output -" to tell\nWarning: curl to output it to your terminal anyway, or consider "--output\nWarning: <FILE>" to save to a file.\n')),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u60a8\u9700\u8981\u7981\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"brotli")," \u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.org": 1\n        }\n    }\n}\'\n')))}u.isMDXComponent=!0}}]);