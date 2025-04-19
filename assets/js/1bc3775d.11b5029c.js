"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[96598],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,i=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=l,g=d["".concat(o,".").concat(m)]||d[m]||u[m]||i;return n?a.createElement(g,r(r({ref:t},c),{},{components:n})):a.createElement(g,r({ref:t},c))}));function m(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=n.length,r=new Array(i);r[0]=d;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:l,r[1]=s;for(var p=2;p<i;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},14849:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>o});var a=n(87462),l=(n(67294),n(3905));const i={title:"ocsp-stapling",keywords:["Apache APISIX","Plugin","ocsp-stapling"],description:"This document contains information about the Apache APISIX ocsp-stapling Plugin."},r=void 0,s={unversionedId:"plugins/ocsp-stapling",id:"version-3.11/plugins/ocsp-stapling",isDocsHomePage:!1,title:"ocsp-stapling",description:"This document contains information about the Apache APISIX ocsp-stapling Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.11/plugins/ocsp-stapling.md",sourceDirName:"plugins",slug:"/plugins/ocsp-stapling",permalink:"/docs/apisix/3.11/plugins/ocsp-stapling",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/plugins/ocsp-stapling.md",tags:[],version:"3.11",frontMatter:{title:"ocsp-stapling",keywords:["Apache APISIX","Plugin","ocsp-stapling"],description:"This document contains information about the Apache APISIX ocsp-stapling Plugin."},sidebar:"version-3.11/docs",previous:{title:"inspect",permalink:"/docs/apisix/3.11/plugins/inspect"},next:{title:"ai-prompt-decorator",permalink:"/docs/apisix/3.11/plugins/ai-prompt-decorator"}},o=[{value:"Description",id:"description",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Example usage",id:"example-usage",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],p={toc:o};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"description"},"Description"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"ocsp-stapling")," Plugin dynamically sets the behavior of ",(0,l.kt)("a",{parentName:"p",href:"https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_stapling"},"OCSP stapling")," in Nginx."),(0,l.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,l.kt)("p",null,"This Plugin is disabled by default. Modify the config file to enable the plugin:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="./conf/config.yaml"',title:'"./conf/config.yaml"'},"plugins:\n  - ...\n  - ocsp-stapling\n")),(0,l.kt)("p",null,"After modifying the config file, reload APISIX or send an hot-loaded HTTP request through the Admin API to take effect:"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"You can fetch the ",(0,l.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,l.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,l.kt)("pre",{parentName:"div"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/plugins/reload -H "X-API-KEY: $admin_key" -X PUT\n')),(0,l.kt)("h2",{id:"attributes"},"Attributes"),(0,l.kt)("p",null,"The attributes of this plugin are stored in specific field ",(0,l.kt)("inlineCode",{parentName:"p"},"ocsp_stapling")," within SSL Resource."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Required"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"enabled"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Like the ",(0,l.kt)("inlineCode",{parentName:"td"},"ssl_stapling")," directive, enables or disables OCSP stapling feature.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"skip_verify"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Like the ",(0,l.kt)("inlineCode",{parentName:"td"},"ssl_stapling_verify")," directive, enables or disables verification of OCSP responses.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"cache_ttl"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"3600"),(0,l.kt)("td",{parentName:"tr",align:null},">= 60"),(0,l.kt)("td",{parentName:"tr",align:null},"Specifies the expired time of OCSP response cache.")))),(0,l.kt)("h2",{id:"example-usage"},"Example usage"),(0,l.kt)("p",null,"You should create an SSL Resource first, and the certificate of the server certificate issuer should be known. Normally the fullchain certificate works fine."),(0,l.kt)("p",null,"Create an SSL Resource as such:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "cert" : "\'"$(cat server.crt)"\'",\n    "key": "\'"$(cat server.key)"\'",\n    "snis": ["test.com"],\n    "ocsp_stapling": {\n        "enabled": true\n    }\n}\'\n')),(0,l.kt)("p",null,"Next, establish a secure connection to the server, request the SSL/TLS session status, and display the output from the server:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'echo -n "Q" | openssl s_client -status -connect localhost:9443 -servername test.com 2>&1 | cat\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"...\nCONNECTED(00000003)\nOCSP response:\n======================================\nOCSP Response Data:\n    OCSP Response Status: successful (0x0)\n...\n")),(0,l.kt)("p",null,"To disable OCSP stapling feature, you can make a request as shown below:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "cert" : "\'"$(cat server.crt)"\'",\n    "key": "\'"$(cat server.key)"\'",\n    "snis": ["test.com"],\n    "ocsp_stapling": {\n        "enabled": false\n    }\n}\'\n')),(0,l.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,l.kt)("p",null,"Make sure all your SSL Resource doesn't contains ",(0,l.kt)("inlineCode",{parentName:"p"},"ocsp_stapling")," field anymore. To remove this field, you can make a request as shown below:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PATCH -d \'\n{\n    "ocsp_stapling": null\n}\'\n')),(0,l.kt)("p",null,"Modify the config file ",(0,l.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," to disable the plugin:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="./conf/config.yaml"',title:'"./conf/config.yaml"'},"plugins:\n  - ...\n  # - ocsp-stapling\n")),(0,l.kt)("p",null,"After modifying the config file, reload APISIX or send an hot-loaded HTTP request through the Admin API to take effect:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/plugins/reload -H "X-API-KEY: $admin_key" -X PUT\n')))}c.isMDXComponent=!0}}]);