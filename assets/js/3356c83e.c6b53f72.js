"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[17535],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=d(n),c=r,h=m["".concat(p,".").concat(c)]||m[c]||u[c]||i;return n?a.createElement(h,l(l({ref:t},s),{},{components:n})):a.createElement(h,l({ref:t},s))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var d=2;d<i;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},19052:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={title:"proxy-rewrite",keywords:["Apache APISIX","API Gateway","Plugin","Proxy Rewrite","proxy-rewrite"],description:"This document contains information about the Apache APISIX proxy-rewrite Plugin."},l=void 0,o={unversionedId:"plugins/proxy-rewrite",id:"version-3.12/plugins/proxy-rewrite",isDocsHomePage:!1,title:"proxy-rewrite",description:"This document contains information about the Apache APISIX proxy-rewrite Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.12/plugins/proxy-rewrite.md",sourceDirName:"plugins",slug:"/plugins/proxy-rewrite",permalink:"/docs/apisix/plugins/proxy-rewrite",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.12/docs/en/latest/plugins/proxy-rewrite.md",tags:[],version:"3.12",frontMatter:{title:"proxy-rewrite",keywords:["Apache APISIX","API Gateway","Plugin","Proxy Rewrite","proxy-rewrite"],description:"This document contains information about the Apache APISIX proxy-rewrite Plugin."},sidebar:"version-3.12/docs",previous:{title:"response-rewrite",permalink:"/docs/apisix/plugins/response-rewrite"},next:{title:"grpc-transcode",permalink:"/docs/apisix/plugins/grpc-transcode"}},p=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Header Priority",id:"header-priority",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Example usage",id:"example-usage",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],d={toc:p};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-rewrite")," Plugin rewrites Upstream proxy information such as ",(0,r.kt)("inlineCode",{parentName:"p"},"scheme"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"uri")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"host"),"."),(0,r.kt)("h2",{id:"attributes"},"Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"uri"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"New Upstream forwarding address. Value supports ",(0,r.kt)("a",{parentName:"td",href:"https://nginx.org/en/docs/http/ngx_http_core_module.html"},"Nginx variables"),". For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"$arg_name"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"method"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},'["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS","MKCOL", "COPY", "MOVE", "PROPFIND", "PROPFIND","LOCK", "UNLOCK", "PATCH", "TRACE"]'),(0,r.kt)("td",{parentName:"tr",align:null},"Rewrites the HTTP method.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"regex_uri"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Regular expressions can be used to match the URL from client. If it matches, the URL template is forwarded to the upstream. Otherwise, the URL from the client is forwarded. When both ",(0,r.kt)("inlineCode",{parentName:"td"},"uri")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"regex_uri")," are configured, ",(0,r.kt)("inlineCode",{parentName:"td"},"uri")," has a higher priority. Multiple regular expressions are currently supported for pattern matching, and the plugin will try to match them one by one until they succeed or all fail. For example: ",(0,r.kt)("inlineCode",{parentName:"td"},'["^/iresty/(. *)/(. *)/(. *)", "/$1-$2-$3", ^/theothers/(. *)/(. *)", "/theothers/$1-$2"]'),", the element with the odd index represents the uri regular expression that matches the request from the client, and the element with the even index represents the ",(0,r.kt)("inlineCode",{parentName:"td"},"uri")," template that is forwarded upstream upon a successful match. Please note that the length of this value must be an ",(0,r.kt)("strong",{parentName:"td"},"even number"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"host"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"New Upstream host address.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"headers"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"headers.add"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Append the new headers. The format is ",(0,r.kt)("inlineCode",{parentName:"td"},'{"name": "value",...}'),". The values in the header can contain Nginx variables like ",(0,r.kt)("inlineCode",{parentName:"td"},"$remote_addr")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"$balancer_ip"),". It also supports referencing the match result of ",(0,r.kt)("inlineCode",{parentName:"td"},"regex_uri")," as a variable like ",(0,r.kt)("inlineCode",{parentName:"td"},"$1-$2-$3"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"headers.set"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Overwrite the headers. If the header does not exist, it will be added. The format is  ",(0,r.kt)("inlineCode",{parentName:"td"},'{"name": "value", ...}'),". The values in the header can contain Nginx variables like ",(0,r.kt)("inlineCode",{parentName:"td"},"$remote_addr")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"$balancer_ip"),". It also supports referencing the match result of ",(0,r.kt)("inlineCode",{parentName:"td"},"regex_uri")," as a variable like ",(0,r.kt)("inlineCode",{parentName:"td"},"$1-$2-$3"),". Note that if you would like to set the ",(0,r.kt)("inlineCode",{parentName:"td"},"Host")," header, use the ",(0,r.kt)("inlineCode",{parentName:"td"},"host")," attribute instead.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"headers.remove"),(0,r.kt)("td",{parentName:"tr",align:null},"array"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Remove the headers. The format is ",(0,r.kt)("inlineCode",{parentName:"td"},'["name", ...]'),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"use_real_request_uri_unsafe"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Use real_request_uri (original $request_uri in nginx) to bypass URI normalization. ",(0,r.kt)("strong",{parentName:"td"},"Enabling this is considered unsafe as it bypasses all URI normalization steps"),".")))),(0,r.kt)("h2",{id:"header-priority"},"Header Priority"),(0,r.kt)("p",null,"Header configurations are executed according to the following priorities:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"add")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"remove")," > ",(0,r.kt)("inlineCode",{parentName:"p"},"set")),(0,r.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,r.kt)("p",null,"The example below enables the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-rewrite")," Plugin on a specific Route:"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/test/index.html",\n    "plugins": {\n        "proxy-rewrite": {\n            "uri": "/test/home.html",\n            "host": "iresty.com",\n            "headers": {\n               "set": {\n                    "X-Api-Version": "v1",\n                    "X-Api-Engine": "apisix",\n                    "X-Api-useless": ""\n                },\n                "add": {\n                    "X-Request-ID": "112233"\n                },\n                "remove":[\n                    "X-test"\n                ]\n            }\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:80": 1\n        }\n    }\n}\'\n')),(0,r.kt)("h2",{id:"example-usage"},"Example usage"),(0,r.kt)("p",null,"Once you have enabled the Plugin as mentioned below, you can test the Route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -X GET http://127.0.0.1:9080/test/index.html\n")),(0,r.kt)("p",null,"Once you send the request, you can check the Upstream ",(0,r.kt)("inlineCode",{parentName:"p"},"access.log")," for its output:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"127.0.0.1 - [26/Sep/2019:10:52:20 +0800] iresty.com GET /test/home.html HTTP/1.1 200 38 - curl/7.29.0 - 0.000 199 107\n")),(0,r.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,r.kt)("p",null,"To remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-rewrite")," Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/test/index.html",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:80": 1\n        }\n    }\n}\'\n')))}s.isMDXComponent=!0}}]);