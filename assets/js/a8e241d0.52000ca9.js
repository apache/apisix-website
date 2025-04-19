"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[84316],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>c});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=d(n),c=i,g=u["".concat(p,".").concat(c)]||u[c]||m[c]||r;return n?a.createElement(g,l(l({ref:t},s),{},{components:n})):a.createElement(g,l({ref:t},s))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},49749:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>s,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var a=n(87462),i=(n(67294),n(3905));const r={title:"gzip",keywords:["Apache APISIX","API Gateway","Plugin","gzip"],description:"This document contains information about the Apache APISIX gzip Plugin."},l=void 0,o={unversionedId:"plugins/gzip",id:"version-3.12/plugins/gzip",isDocsHomePage:!1,title:"gzip",description:"This document contains information about the Apache APISIX gzip Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.12/plugins/gzip.md",sourceDirName:"plugins",slug:"/plugins/gzip",permalink:"/docs/apisix/plugins/gzip",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.12/docs/en/latest/plugins/gzip.md",tags:[],version:"3.12",frontMatter:{title:"gzip",keywords:["Apache APISIX","API Gateway","Plugin","gzip"],description:"This document contains information about the Apache APISIX gzip Plugin."},sidebar:"version-3.12/docs",previous:{title:"echo",permalink:"/docs/apisix/plugins/echo"},next:{title:"brotli",permalink:"/docs/apisix/plugins/brotli"}},p=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Example usage",id:"example-usage",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],d={toc:p};function s(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"description"},"Description"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"gzip")," Plugin dynamically sets the behavior of ",(0,i.kt)("a",{parentName:"p",href:"https://docs.nginx.com/nginx/admin-guide/web-server/compression/"},"gzip in Nginx"),".\nWhen the ",(0,i.kt)("inlineCode",{parentName:"p"},"gzip")," plugin is enabled, the client needs to include ",(0,i.kt)("inlineCode",{parentName:"p"},"Accept-Encoding: gzip")," in the request header to indicate support for gzip compression. Upon receiving the request, APISIX dynamically determines whether to compress the response content based on the client's support and server configuration. If the conditions are met, ",(0,i.kt)("inlineCode",{parentName:"p"},"APISIX")," adds the ",(0,i.kt)("inlineCode",{parentName:"p"},"Content-Encoding: gzip")," header to the response, indicating that the response content has been compressed using gzip. Upon receiving the response, the client uses the corresponding decompression algorithm based on the ",(0,i.kt)("inlineCode",{parentName:"p"},"Content-Encoding")," header to decompress the response content and obtain the original response content."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"IMPORTANT")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This Plugin requires APISIX to run on ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/FAQ#how-do-i-build-the-apisix-runtime-environment"},"APISIX-Runtime"),"."))),(0,i.kt)("h2",{id:"attributes"},"Attributes"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Required"),(0,i.kt)("th",{parentName:"tr",align:null},"Default"),(0,i.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"types"),(0,i.kt)("td",{parentName:"tr",align:null},"array","[string]",' or "*"'),(0,i.kt)("td",{parentName:"tr",align:null},"False"),(0,i.kt)("td",{parentName:"tr",align:null},'["text/html"]'),(0,i.kt)("td",{parentName:"tr",align:null}),(0,i.kt)("td",{parentName:"tr",align:null},"Dynamically sets the ",(0,i.kt)("inlineCode",{parentName:"td"},"gzip_types")," directive. Special value ",(0,i.kt)("inlineCode",{parentName:"td"},'"*"')," matches any MIME type.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"min_length"),(0,i.kt)("td",{parentName:"tr",align:null},"integer"),(0,i.kt)("td",{parentName:"tr",align:null},"False"),(0,i.kt)("td",{parentName:"tr",align:null},"20"),(0,i.kt)("td",{parentName:"tr",align:null},">= 1"),(0,i.kt)("td",{parentName:"tr",align:null},"Dynamically sets the ",(0,i.kt)("inlineCode",{parentName:"td"},"gzip_min_length")," directive.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"comp_level"),(0,i.kt)("td",{parentName:"tr",align:null},"integer"),(0,i.kt)("td",{parentName:"tr",align:null},"False"),(0,i.kt)("td",{parentName:"tr",align:null},"1"),(0,i.kt)("td",{parentName:"tr",align:null},"[1, 9]"),(0,i.kt)("td",{parentName:"tr",align:null},"Dynamically sets the ",(0,i.kt)("inlineCode",{parentName:"td"},"gzip_comp_level")," directive.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"http_version"),(0,i.kt)("td",{parentName:"tr",align:null},"number"),(0,i.kt)("td",{parentName:"tr",align:null},"False"),(0,i.kt)("td",{parentName:"tr",align:null},"1.1"),(0,i.kt)("td",{parentName:"tr",align:null},"1.1, 1.0"),(0,i.kt)("td",{parentName:"tr",align:null},"Dynamically sets the ",(0,i.kt)("inlineCode",{parentName:"td"},"gzip_http_version")," directive.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"buffers.number"),(0,i.kt)("td",{parentName:"tr",align:null},"integer"),(0,i.kt)("td",{parentName:"tr",align:null},"False"),(0,i.kt)("td",{parentName:"tr",align:null},"32"),(0,i.kt)("td",{parentName:"tr",align:null},">= 1"),(0,i.kt)("td",{parentName:"tr",align:null},"Dynamically sets the ",(0,i.kt)("inlineCode",{parentName:"td"},"gzip_buffers")," directive parameter ",(0,i.kt)("inlineCode",{parentName:"td"},"number"),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"buffers.size"),(0,i.kt)("td",{parentName:"tr",align:null},"integer"),(0,i.kt)("td",{parentName:"tr",align:null},"False"),(0,i.kt)("td",{parentName:"tr",align:null},"4096"),(0,i.kt)("td",{parentName:"tr",align:null},">= 1"),(0,i.kt)("td",{parentName:"tr",align:null},"Dynamically sets the ",(0,i.kt)("inlineCode",{parentName:"td"},"gzip_buffers")," directive parameter ",(0,i.kt)("inlineCode",{parentName:"td"},"size"),". The unit is in bytes.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"vary"),(0,i.kt)("td",{parentName:"tr",align:null},"boolean"),(0,i.kt)("td",{parentName:"tr",align:null},"False"),(0,i.kt)("td",{parentName:"tr",align:null},"false"),(0,i.kt)("td",{parentName:"tr",align:null}),(0,i.kt)("td",{parentName:"tr",align:null},"Dynamically sets the ",(0,i.kt)("inlineCode",{parentName:"td"},"gzip_vary")," directive.")))),(0,i.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,i.kt)("p",null,"The example below enables the ",(0,i.kt)("inlineCode",{parentName:"p"},"gzip")," Plugin on the specified Route:"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"You can fetch the ",(0,i.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,i.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "plugins": {\n        "gzip": {\n            "buffers": {\n                "number": 8\n            }\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,i.kt)("h2",{id:"example-usage"},"Example usage"),(0,i.kt)("p",null,"Once you have configured the Plugin as shown above, you can make a request as shown below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/index.html -i -H "Accept-Encoding: gzip"\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'HTTP/1.1 404 Not Found\nContent-Type: text/html; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nDate: Wed, 21 Jul 2021 03:52:55 GMT\nServer: APISIX/2.7\nContent-Encoding: gzip\n\nWarning: Binary output can mess up your terminal. Use "--output -" to tell\nWarning: curl to output it to your terminal anyway, or consider "--output\nWarning: <FILE>" to save to a file.\n')),(0,i.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,i.kt)("p",null,"To remove the ",(0,i.kt)("inlineCode",{parentName:"p"},"gzip")," Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}s.isMDXComponent=!0}}]);