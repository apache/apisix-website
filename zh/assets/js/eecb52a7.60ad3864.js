(self.webpackChunk=self.webpackChunk||[]).push([[86213],{3905:function(n,e,t){"use strict";t.d(e,{Zo:function(){return s},kt:function(){return m}});var r=t(67294);function i(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function a(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){i(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function c(n,e){if(null==n)return{};var t,r,i=function(n,e){if(null==n)return{};var t,r,i={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var p=r.createContext({}),u=function(n){var e=r.useContext(p),t=e;return n&&(t="function"==typeof n?n(e):a(a({},e),n)),t},s=function(n){var e=u(n.components);return r.createElement(p.Provider,{value:e},n.children)},l={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},f=r.forwardRef((function(n,e){var t=n.components,i=n.mdxType,o=n.originalType,p=n.parentName,s=c(n,["components","mdxType","originalType","parentName"]),f=u(t),m=i,g=f["".concat(p,".").concat(m)]||f[m]||l[m]||o;return t?r.createElement(g,a(a({ref:e},s),{},{components:t})):r.createElement(g,a({ref:e},s))}));function m(n,e){var t=arguments,i=e&&e.mdxType;if("string"==typeof n||i){var o=t.length,a=new Array(o);a[0]=f;var c={};for(var p in e)hasOwnProperty.call(e,p)&&(c[p]=e[p]);c.originalType=n,c.mdxType="string"==typeof n?n:i,a[1]=c;for(var u=2;u<o;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},25855:function(n,e,t){"use strict";t.r(e),t.d(e,{frontMatter:function(){return a},metadata:function(){return c},toc:function(){return p},default:function(){return s}});var r=t(22122),i=t(19756),o=(t(67294),t(3905)),a={title:"Customize Nginx configuration"},c={unversionedId:"customize-nginx-configuration",id:"version-2.6/customize-nginx-configuration",isDocsHomePage:!1,title:"Customize Nginx configuration",description:"\x3c!--",source:"@site/docs-apisix_versioned_docs/version-2.6/customize-nginx-configuration.md",sourceDirName:".",slug:"/customize-nginx-configuration",permalink:"/zh/docs/apisix/customize-nginx-configuration",editUrl:"https://github.com/apache/apisix/edit/master/docs/zh/latest/customize-nginx-configuration.md",version:"2.6",frontMatter:{title:"Customize Nginx configuration"},sidebar:"version-2.6/docs",previous:{title:"gRPC Proxy",permalink:"/zh/docs/apisix/grpc-proxy"},next:{title:"HTTPS",permalink:"/zh/docs/apisix/https"}},p=[],u={toc:p};function s(n){var e=n.components,t=(0,i.Z)(n,["components"]);return(0,o.kt)("wrapper",(0,r.Z)({},u,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The Nginx configuration used by APISIX is generated via the template file ",(0,o.kt)("inlineCode",{parentName:"p"},"apisix/ngx_tpl.lua")," and the options from ",(0,o.kt)("inlineCode",{parentName:"p"},"conf/config-default.yaml")," / ",(0,o.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"."),(0,o.kt)("p",null,"You can take a look at the generated Nginx configuration in ",(0,o.kt)("inlineCode",{parentName:"p"},"conf/nginx.conf")," after running ",(0,o.kt)("inlineCode",{parentName:"p"},"./bin/apisix start"),"."),(0,o.kt)("p",null,"If you want to customize the Nginx configuration, please read through the ",(0,o.kt)("inlineCode",{parentName:"p"},"nginx_config")," in ",(0,o.kt)("inlineCode",{parentName:"p"},"conf/config-default.yaml"),". You can override the default value in the ",(0,o.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),". For instance, you can inject some snippets in the ",(0,o.kt)("inlineCode",{parentName:"p"},"conf/nginx.conf")," via configuring the ",(0,o.kt)("inlineCode",{parentName:"p"},"xxx_snippet")," entries:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'...\n# put this in config.yaml:\nnginx_config:\n    main_configuration_snippet: |\n        daemon on;\n    http_configuration_snippet: |\n        server\n        {\n            listen 45651;\n            server_name _;\n            access_log off;\n\n            location /ysec_status {\n                req_status_show;\n                allow 127.0.0.1;\n                deny all;\n            }\n        }\n\n        chunked_transfer_encoding on;\n\n    http_server_configuration_snippet: |\n        set $my "var";\n    http_admin_configuration_snippet: |\n        log_format admin "$request_time $pipe";\n    http_end_configuration_snippet: |\n        server_names_hash_bucket_size 128;\n    stream_configuration_snippet: |\n        tcp_nodelay off;\n...\n')))}s.isMDXComponent=!0}}]);