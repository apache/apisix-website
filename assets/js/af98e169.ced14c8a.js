"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[56617],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),h=p(n),d=r,u=h["".concat(l,".").concat(d)]||h[d]||m[d]||o;return n?a.createElement(u,s(s({ref:t},c),{},{components:n})):a.createElement(u,s({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=h;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},92e3:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=n(87462),r=(n(67294),n(3905));const o={title:"Benchmark"},s=void 0,i={unversionedId:"benchmark",id:"version-3.11/benchmark",isDocsHomePage:!1,title:"Benchmark",description:"n1-highcpu-8 (8 vCPUs, 7.2 GB memory) on Google Cloud",source:"@site/docs-apisix_versioned_docs/version-3.11/benchmark.md",sourceDirName:".",slug:"/benchmark",permalink:"/docs/apisix/3.11/benchmark",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/benchmark.md",tags:[],version:"3.11",frontMatter:{title:"Benchmark"},sidebar:"version-3.11/docs",previous:{title:"Batch Processor",permalink:"/docs/apisix/3.11/batch-processor"},next:{title:"Install Dependencies",permalink:"/docs/apisix/3.11/install-dependencies"}},l=[{value:"Benchmark Environments",id:"benchmark-environments",children:[]},{value:"Benchmark Test for reverse proxy",id:"benchmark-test-for-reverse-proxy",children:[]},{value:"Benchmark Test for reverse proxy, enabled 2 plugins",id:"benchmark-test-for-reverse-proxy-enabled-2-plugins",children:[]}],p={toc:l};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"benchmark-environments"},"Benchmark Environments"),(0,r.kt)("p",null,"n1-highcpu-8 (8 vCPUs, 7.2 GB memory) on Google Cloud"),(0,r.kt)("p",null,"But we ",(0,r.kt)("strong",{parentName:"p"},"only")," used 4 cores to run APISIX, and left 4 cores for system and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/wg/wrk"},"wrk"),",\nwhich is the HTTP benchmarking tool."),(0,r.kt)("h3",{id:"benchmark-test-for-reverse-proxy"},"Benchmark Test for reverse proxy"),(0,r.kt)("p",null,"Only used APISIX as the reverse proxy server, with no logging, limit rate, or other plugins enabled,\nand the response size was 1KB."),(0,r.kt)("h4",{id:"qps"},"QPS"),(0,r.kt)("p",null,"The x-axis means the size of CPU core, and the y-axis is QPS."),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/benchmark-1.jpg",alt:"benchmark-1"})),(0,r.kt)("h4",{id:"latency"},"Latency"),(0,r.kt)("p",null,"Note the y-axis latency in ",(0,r.kt)("strong",{parentName:"p"},"microsecond(\u03bcs)")," not millisecond."),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/latency-1.jpg",alt:"latency-1"})),(0,r.kt)("h4",{id:"flame-graph"},"Flame Graph"),(0,r.kt)("p",null,"The result of Flame Graph:\n",(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/flamegraph-1.jpg",alt:"flamegraph-1"})),(0,r.kt)("p",null,"And if you want to run the benchmark test in your machine, you should run another Nginx to listen 80 port."),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/hello",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:80": 1,\n            "127.0.0.2:80": 1\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"then run wrk:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"wrk -d 60 --latency http://127.0.0.1:9080/hello\n")),(0,r.kt)("h3",{id:"benchmark-test-for-reverse-proxy-enabled-2-plugins"},"Benchmark Test for reverse proxy, enabled 2 plugins"),(0,r.kt)("p",null,"Only used APISIX as the reverse proxy server, enabled the limit rate and prometheus plugins,\nand the response size was 1KB."),(0,r.kt)("h4",{id:"qps-1"},"QPS"),(0,r.kt)("p",null,"The x-axis means the size of CPU core, and the y-axis is QPS."),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/benchmark-2.jpg",alt:"benchmark-2"})),(0,r.kt)("h4",{id:"latency-1"},"Latency"),(0,r.kt)("p",null,"Note the y-axis latency in ",(0,r.kt)("strong",{parentName:"p"},"microsecond(\u03bcs)")," not millisecond."),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/latency-2.jpg",alt:"latency-2"})),(0,r.kt)("h4",{id:"flame-graph-1"},"Flame Graph"),(0,r.kt)("p",null,"The result of Flame Graph:\n",(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/flamegraph-2.jpg",alt:"flamegraph-2"})),(0,r.kt)("p",null,"And if you want to run the benchmark test in your machine, you should run another Nginx to listen 80 port."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/hello",\n    "plugins": {\n        "limit-count": {\n            "count": 999999999,\n            "time_window": 60,\n            "rejected_code": 503,\n            "key": "remote_addr"\n        },\n        "prometheus":{}\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:80": 1,\n            "127.0.0.2:80": 1\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"then run wrk:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"wrk -d 60 --latency http://127.0.0.1:9080/hello\n")),(0,r.kt)("p",null,"For more reference on how to run the benchmark test, you can see this ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/6136"},"PR")," and this ",(0,r.kt)("a",{parentName:"p",href:"https://gist.github.com/membphis/137db97a4bf64d3653aa42f3e016bd01"},"script"),"."),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"If you want to run the benchmark with a large number of connections, You may have to update the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/conf/config.yaml.example#L241"},(0,r.kt)("strong",{parentName:"a"},"keepalive"))," config by adding the configuration to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/conf/config.yaml"},(0,r.kt)("inlineCode",{parentName:"a"},"config.yaml"))," and reload APISIX. Connections exceeding this number will become short connections. You can run the following command to test the benchmark with a large number of connections:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"wrk -t200 -c5000 -d30s http://127.0.0.1:9080/hello\n")),(0,r.kt)("p",{parentName:"div"},"For more details, you can refer to ",(0,r.kt)("a",{parentName:"p",href:"http://nginx.org/en/docs/http/ngx_http_upstream_module.html"},"Module ngx_http_upstream_module"),"."))))}c.isMDXComponent=!0}}]);