"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[34106],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return m}});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=l(t),m=o,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||i;return t?r.createElement(f,a(a({ref:n},s),{},{components:t})):r.createElement(f,a({ref:n},s))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=d;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},86272:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return a},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return l},default:function(){return u}});var r=t(87462),o=t(63366),i=(t(67294),t(3905)),a={title:"Example"},c=void 0,p={unversionedId:"example",id:"version-apisix-2.9.0/example",isDocsHomePage:!1,title:"Example",description:"\x3c!--",source:"@site/docs-apisix-docker_versioned_docs/version-apisix-2.9.0/example.md",sourceDirName:".",slug:"/example",permalink:"/docs/docker/apisix-2.9.0/example",editUrl:"https://github.com/apache/apisix-docker/edit/release/apisix-2.9.0/docs/en/latest/example.md",tags:[],version:"apisix-2.9.0",frontMatter:{title:"Example"},sidebar:"version-apisix-2.9.0/docs",previous:{title:"Deploy Apache APISIX with Docker",permalink:"/docs/docker/apisix-2.9.0/manual"}},l=[{value:"Run",id:"run",children:[]},{value:"Configure",id:"configure",children:[]},{value:"Test",id:"test",children:[]},{value:"Clean",id:"clean",children:[]}],s={toc:l};function u(e){var n=e.components,t=(0,o.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"This example is used for functional verification and is not recommended for performance testing. For performance testing, please refer to ",(0,i.kt)("a",{parentName:"strong",href:"https://github.com/apache/apisix#benchmark"},"benchmark"),".")),(0,i.kt)("h3",{id:"run"},"Run"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"$ docker-compose -p docker-apisix up -d\n")),(0,i.kt)("h3",{id:"configure"},"Configure"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'curl http://127.0.0.1:9080/apisix/admin/services/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "172.18.5.12:80": 1\n        }\n    }\n}\'\n\ncurl http://127.0.0.1:9080/apisix/admin/services/2 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "172.18.5.13:80": 1\n        }\n    }\n}\'\n\ncurl http://127.0.0.1:9080/apisix/admin/routes/12 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/*",\n    "host": "web1.lvh.me",\n    "service_id": "1"\n}\'\n\ncurl http://127.0.0.1:9080/apisix/admin/routes/22 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/*",\n    "host": "web2.lvh.me",\n    "service_id": "2"\n}\'\n\ncurl http://127.0.0.1:9080/apisix/admin/ssl/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d "\n{\n    \\"cert\\": \\"$( cat \'./mkcert/lvh.me+1.pem\')\\",\n    \\"key\\": \\"$( cat \'./mkcert/lvh.me+1-key.pem\')\\",\n    \\"sni\\": \\"lvh.me\\"\n}"\n\ncurl http://127.0.0.1:9080/apisix/admin/ssl/2 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d "\n{\n    \\"cert\\": \\"$( cat \'./mkcert/lvh.me+1.pem\')\\",\n    \\"key\\": \\"$( cat \'./mkcert/lvh.me+1-key.pem\')\\",\n    \\"sni\\": \\"*.lvh.me\\"\n}"\n')),(0,i.kt)("h3",{id:"test"},"Test"),(0,i.kt)("p",null,"When testing subdomains, using localhost is not a good option. Due to this, lets use ",(0,i.kt)("a",{parentName:"p",href:"http://lvh.me/"},"http://lvh.me/"),"\nfree service to resolve itself along with all subdomains to localhost."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"curl http://web1.lvh.me:9080/hello -v # hello web1\n\ncurl http://web2.lvh.me:9080/hello -v # hello web2\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"curl https://web1.lvh.me:9443/ -v --cacert ./mkcert/rootCA.pem\n")),(0,i.kt)("h3",{id:"clean"},"Clean"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"$ docker-compose -p docker-apisix down\n\n$ sudo rm -rf etcd_data/member\n\n$ rm -rf apisix_log/*.log\n")))}u.isMDXComponent=!0}}]);