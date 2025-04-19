"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[5376],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>g});var i=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=i.createContext({}),s=function(e){var n=i.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=s(e.components);return i.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},f=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),f=s(t),g=r,m=f["".concat(p,".").concat(g)]||f[g]||u[g]||o;return t?i.createElement(m,a(a({ref:n},l),{},{components:t})):i.createElement(m,a({ref:n},l))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,a=new Array(o);a[0]=f;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var s=2;s<o;s++)a[s]=t[s];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}f.displayName="MDXCreateElement"},21726:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var i=t(87462),r=(t(67294),t(3905));const o={title:"Customize Nginx configuration"},a=void 0,c={unversionedId:"customize-nginx-configuration",id:"version-3.11/customize-nginx-configuration",isDocsHomePage:!1,title:"Customize Nginx configuration",description:"The Nginx configuration used by APISIX is generated via the template file apisix/cli/ngx_tpl.lua and the parameters in apisix/cli/config.lua and conf/config.yaml.",source:"@site/docs-apisix_versioned_docs/version-3.11/customize-nginx-configuration.md",sourceDirName:".",slug:"/customize-nginx-configuration",permalink:"/docs/apisix/3.11/customize-nginx-configuration",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/customize-nginx-configuration.md",tags:[],version:"3.11",frontMatter:{title:"Customize Nginx configuration"},sidebar:"version-3.11/docs",previous:{title:"gRPC Proxy",permalink:"/docs/apisix/3.11/grpc-proxy"},next:{title:"Certificate",permalink:"/docs/apisix/3.11/certificate"}},p=[],s={toc:p};function l(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,i.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The Nginx configuration used by APISIX is generated via the template file ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix/cli/ngx_tpl.lua")," and the parameters in ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix/cli/config.lua")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"."),(0,r.kt)("p",null,"You can take a look at the generated Nginx configuration in ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/nginx.conf")," after running ",(0,r.kt)("inlineCode",{parentName:"p"},"./bin/apisix start"),"."),(0,r.kt)("p",null,"If you want to customize the Nginx configuration, please read through the ",(0,r.kt)("inlineCode",{parentName:"p"},"nginx_config")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.default.example"),". You can override the default value in the ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),". For instance, you can inject some snippets in the ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/nginx.conf")," via configuring the ",(0,r.kt)("inlineCode",{parentName:"p"},"xxx_snippet")," entries:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'...\n# put this in config.yaml:\nnginx_config:\n    main_configuration_snippet: |\n        daemon on;\n    http_configuration_snippet: |\n        server\n        {\n            listen 45651;\n            server_name _;\n            access_log off;\n\n            location /ysec_status {\n                req_status_show;\n                allow 127.0.0.1;\n                deny all;\n            }\n        }\n\n        chunked_transfer_encoding on;\n\n    http_server_configuration_snippet: |\n        set $my "var";\n    http_admin_configuration_snippet: |\n        log_format admin "$request_time $pipe";\n    http_end_configuration_snippet: |\n        server_names_hash_bucket_size 128;\n    stream_configuration_snippet: |\n        tcp_nodelay off;\n...\n')),(0,r.kt)("p",null,"Pay attention to the indent of ",(0,r.kt)("inlineCode",{parentName:"p"},"nginx_config")," and sub indent of the sub entries, the incorrect indent may cause ",(0,r.kt)("inlineCode",{parentName:"p"},"./bin/apisix start")," to fail to generate Nginx configuration in ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/nginx.conf"),"."))}l.isMDXComponent=!0}}]);