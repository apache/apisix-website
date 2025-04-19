"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[64243],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||o;return n?a.createElement(h,s(s({ref:t},d),{},{components:n})):a.createElement(h,s({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},87262:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=n(87462),r=(n(67294),n(3905));const o={title:"Debug Function"},s=void 0,i={unversionedId:"debug-function",id:"version-3.11/debug-function",isDocsHomePage:!1,title:"Debug Function",description:"Similar 5xx status codes such as 500, 502, 503, etc., are the status codes in response to a server error. When a request has a 5xx status code; it may come from APISIX or Upstream. How to identify the source of these response status codes is a very meaningful thing. It can quickly help us determine the problem. (When modifying the configuration show_upstream_status_in_response_header in conf/config.yaml to true, all upstream status codes will be returned, not only 5xx status.)",source:"@site/docs-apisix_versioned_docs/version-3.11/debug-function.md",sourceDirName:".",slug:"/debug-function",permalink:"/docs/apisix/3.11/debug-function",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/debug-function.md",tags:[],version:"3.11",frontMatter:{title:"Debug Function"},sidebar:"version-3.11/docs",previous:{title:"Mutual TLS Authentication",permalink:"/docs/apisix/3.11/mtls"},next:{title:"Configuration based on environments",permalink:"/docs/apisix/3.11/profile"}},l=[{value:"<code>5xx</code> response status code",id:"5xx-response-status-code",children:[]},{value:"How to identify the source of the <code>5xx</code> response status code",id:"how-to-identify-the-source-of-the-5xx-response-status-code",children:[]},{value:"Example",id:"example",children:[]}],p={toc:l};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"5xx-response-status-code"},(0,r.kt)("inlineCode",{parentName:"h2"},"5xx")," response status code"),(0,r.kt)("p",null,"Similar ",(0,r.kt)("inlineCode",{parentName:"p"},"5xx")," status codes such as 500, 502, 503, etc., are the status codes in response to a server error. When a request has a ",(0,r.kt)("inlineCode",{parentName:"p"},"5xx")," status code; it may come from ",(0,r.kt)("inlineCode",{parentName:"p"},"APISIX")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"Upstream"),". How to identify the source of these response status codes is a very meaningful thing. It can quickly help us determine the problem. (When modifying the configuration ",(0,r.kt)("inlineCode",{parentName:"p"},"show_upstream_status_in_response_header")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", all upstream status codes will be returned, not only ",(0,r.kt)("inlineCode",{parentName:"p"},"5xx")," status.)"),(0,r.kt)("h2",{id:"how-to-identify-the-source-of-the-5xx-response-status-code"},"How to identify the source of the ",(0,r.kt)("inlineCode",{parentName:"h2"},"5xx")," response status code"),(0,r.kt)("p",null,"In the response header of the request, through the response header of ",(0,r.kt)("inlineCode",{parentName:"p"},"X-APISIX-Upstream-Status"),", we can effectively identify the source of the ",(0,r.kt)("inlineCode",{parentName:"p"},"5xx")," status code. When the ",(0,r.kt)("inlineCode",{parentName:"p"},"5xx")," status code comes from ",(0,r.kt)("inlineCode",{parentName:"p"},"Upstream"),", the response header ",(0,r.kt)("inlineCode",{parentName:"p"},"X-APISIX-Upstream-Status")," can be seen in the response header, and the value of this response header is the response status code. When the ",(0,r.kt)("inlineCode",{parentName:"p"},"5xx")," status code is derived from ",(0,r.kt)("inlineCode",{parentName:"p"},"APISIX"),", there is no response header information of ",(0,r.kt)("inlineCode",{parentName:"p"},"X-APISIX-Upstream-Status")," in the response header. That is, only when the status code of ",(0,r.kt)("inlineCode",{parentName:"p"},"5xx")," is derived from Upstream will the ",(0,r.kt)("inlineCode",{parentName:"p"},"X-APISIX-Upstream-Status")," response header appear."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Example 1: ",(0,r.kt)("inlineCode",{parentName:"p"},"502")," response status code comes from ",(0,r.kt)("inlineCode",{parentName:"p"},"Upstream")," (IP address is not available)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1": 1\n        },\n        "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"Test:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl http://127.0.0.1:9080/hello -v\n......\n< HTTP/1.1 502 Bad Gateway\n< Date: Wed, 25 Nov 2020 14:40:22 GMT\n< Content-Type: text/html; charset=utf-8\n< Content-Length: 154\n< Connection: keep-alive\n< Server: APISIX/2.0\n< X-APISIX-Upstream-Status: 502\n<\n<html>\n<head><title>502 Bad Gateway</title></head>\n<body>\n<center><h1>502 Bad Gateway</h1></center>\n<hr><center>openresty</center>\n</body>\n</html>\n\n")),(0,r.kt)("p",null,"It has a response header of ",(0,r.kt)("inlineCode",{parentName:"p"},"X-APISIX-Upstream-Status: 502"),"."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Example 2: ",(0,r.kt)("inlineCode",{parentName:"p"},"502")," response status code comes from ",(0,r.kt)("inlineCode",{parentName:"p"},"APISIX"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "fault-injection": {\n            "abort": {\n                "http_status": 500,\n                "body": "Fault Injection!\\n"\n            }\n        }\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"Test\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl http://127.0.0.1:9080/hello -v\n......\n< HTTP/1.1 500 Internal Server Error\n< Date: Wed, 25 Nov 2020 14:50:20 GMT\n< Content-Type: text/plain; charset=utf-8\n< Transfer-Encoding: chunked\n< Connection: keep-alive\n< Server: APISIX/2.0\n<\nFault Injection!\n")),(0,r.kt)("p",null,"There is no response header for ",(0,r.kt)("inlineCode",{parentName:"p"},"X-APISIX-Upstream-Status"),"."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Example 3: ",(0,r.kt)("inlineCode",{parentName:"p"},"Upstream")," has multiple nodes, and all nodes are unavailable")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9180/apisix/admin/upstreams/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "nodes": {\n        "127.0.0.3:1": 1,\n        "127.0.0.2:1": 1,\n        "127.0.0.1:1": 1\n    },\n    "retries": 2,\n    "type": "roundrobin"\n}\'\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/hello",\n    "upstream_id": "1"\n}\'\n')),(0,r.kt)("p",null,"Test\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl http://127.0.0.1:9080/hello -v\n< HTTP/1.1 502 Bad Gateway\n< Date: Wed, 25 Nov 2020 15:07:34 GMT\n< Content-Type: text/html; charset=utf-8\n< Content-Length: 154\n< Connection: keep-alive\n< Server: APISIX/2.0\n< X-APISIX-Upstream-Status: 502, 502, 502\n<\n<html>\n<head><title>502 Bad Gateway</title></head>\n<body>\n<center><h1>502 Bad Gateway</h1></center>\n<hr><center>openresty</center>\n</body>\n</html>\n")),(0,r.kt)("p",null,"It has a response header of ",(0,r.kt)("inlineCode",{parentName:"p"},"X-APISIX-Upstream-Status: 502, 502, 502"),"."))}d.isMDXComponent=!0}}]);