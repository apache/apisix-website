(self.webpackChunk=self.webpackChunk||[]).push([[37553],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return h}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=l(n),h=a,d=m["".concat(c,".").concat(h)]||m[h]||u[h]||s;return n?r.createElement(d,o(o({ref:t},p),{},{components:n})):r.createElement(d,o({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var l=2;l<s;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},45877:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},metadata:function(){return i},toc:function(){return c},default:function(){return p}});var r=n(22122),a=n(19756),s=(n(67294),n(3905)),o={title:"Benchmark"},i={unversionedId:"benchmark",id:"version-2.5/benchmark",isDocsHomePage:!1,title:"Benchmark",description:"\x3c!--",source:"@site/docs-apisix_versioned_docs/version-2.5/benchmark.md",sourceDirName:".",slug:"/benchmark",permalink:"/docs/apisix/2.5/benchmark",editUrl:"https://github.com/apache/apisix/edit/master/docs/en/latest/benchmark.md",version:"2.5",frontMatter:{title:"Benchmark"},sidebar:"version-2.5/docs",previous:{title:"HTTPS",permalink:"/docs/apisix/2.5/https"},next:{title:"Debug Function",permalink:"/docs/apisix/2.5/debug-function"}},c=[{value:"Benchmark Environments",id:"benchmark-environments",children:[]},{value:"Benchmark Test for reverse proxy",id:"benchmark-test-for-reverse-proxy",children:[]},{value:"Benchmark Test for reverse proxy, enabled 2 plugins",id:"benchmark-test-for-reverse-proxy-enabled-2-plugins",children:[]}],l={toc:c};function p(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,s.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"benchmark-environments"},"Benchmark Environments"),(0,s.kt)("p",null,"n1-highcpu-8 (8 vCPUs, 7.2 GB memory) on Google Cloud"),(0,s.kt)("p",null,"But we ",(0,s.kt)("strong",{parentName:"p"},"only")," used 4 cores to run APISIX, and left 4 cores for system and ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/wg/wrk"},"wrk"),",\nwhich is the HTTP benchmarking tool."),(0,s.kt)("h3",{id:"benchmark-test-for-reverse-proxy"},"Benchmark Test for reverse proxy"),(0,s.kt)("p",null,"Only used APISIX as the reverse proxy server, with no logging, limit rate, or other plugins enabled,\nand the response size was 1KB."),(0,s.kt)("h4",{id:"qps"},"QPS"),(0,s.kt)("p",null,"The x-axis means the size of CPU core, and the y-axis is QPS."),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/benchmark-1.jpg",alt:"benchmark-1"})),(0,s.kt)("h4",{id:"latency"},"Latency"),(0,s.kt)("p",null,"Note the y-axis latency in ",(0,s.kt)("strong",{parentName:"p"},"microsecond(\u03bcs)")," not millisecond."),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/latency-1.jpg",alt:"latency-1"})),(0,s.kt)("h4",{id:"flame-graph"},"Flame Graph"),(0,s.kt)("p",null,"The result of Flame Graph:\n",(0,s.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/flamegraph-1.jpg",alt:"flamegraph-1"})),(0,s.kt)("p",null,"And if you want to run the benchmark test in your machine, you should run another Nginx to listen 80 port."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/hello",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:80": 1,\n            "127.0.0.2:80": 1\n        }\n    }\n}\'\n')),(0,s.kt)("p",null,"then run wrk:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"wrk -d 60 --latency http://127.0.0.1:9080/hello\n")),(0,s.kt)("h3",{id:"benchmark-test-for-reverse-proxy-enabled-2-plugins"},"Benchmark Test for reverse proxy, enabled 2 plugins"),(0,s.kt)("p",null,"Only used APISIX as the reverse proxy server, enabled the limit rate and prometheus plugins,\nand the response size was 1KB."),(0,s.kt)("h4",{id:"qps-1"},"QPS"),(0,s.kt)("p",null,"The x-axis means the size of CPU core, and the y-axis is QPS."),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/benchmark-2.jpg",alt:"benchmark-2"})),(0,s.kt)("h4",{id:"latency-1"},"Latency"),(0,s.kt)("p",null,"Note the y-axis latency in ",(0,s.kt)("strong",{parentName:"p"},"microsecond(\u03bcs)")," not millisecond."),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/latency-2.jpg",alt:"latency-2"})),(0,s.kt)("h4",{id:"flame-graph-1"},"Flame Graph"),(0,s.kt)("p",null,"The result of Flame Graph:\n",(0,s.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/flamegraph-2.jpg",alt:"flamegraph-2"})),(0,s.kt)("p",null,"And if you want to run the benchmark test in your machine, you should run another Nginx to listen 80 port."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/hello",\n    "plugins": {\n        "limit-count": {\n            "count": 999999999,\n            "time_window": 60,\n            "rejected_code": 503,\n            "key": "remote_addr"\n        },\n        "prometheus":{}\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:80": 1,\n            "127.0.0.2:80": 1\n        }\n    }\n}\'\n')),(0,s.kt)("p",null,"then run wrk:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"wrk -d 60 --latency http://127.0.0.1:9080/hello\n")))}p.isMDXComponent=!0}}]);