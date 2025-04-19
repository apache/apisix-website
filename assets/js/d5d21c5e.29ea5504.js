"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[20217],{35318:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(27378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),h=p(n),m=r,g=h["".concat(s,".").concat(m)]||h[m]||c[m]||o;return n?a.createElement(g,i(i({ref:t},u),{},{components:n})):a.createElement(g,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},85912:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(25773),r=(n(27378),n(35318));const o={title:"Release Apache APISIX 3.4.0",authors:[{name:"Xin Rong",title:"Author",url:"https://github.com/AlinsRan",image_url:"https://avatars.githubusercontent.com/u/79972061?v=4"},{name:"Traky Deng",title:"Technical Writer",url:"https://github.com/kayx23",image_url:"https://avatars.githubusercontent.com/u/39619599?v=4"}],keywords:["Apache APISIX","API Gateway","API Management Platform","New Release","Cloud Native"],description:"The Apache APISIX 3.4.0 version is released on June 30, 2023. This version adds a new plugin for Grafana Loki, allows for mTLS connection on the route level, and made performance optimization to continuously enhance the user experience of APISIX.",tags:["Community"]},i=void 0,l={permalink:"/blog/2023/06/30/release-apache-apisix-3.4.0",source:"@site/blog/2023/06/30/release-apache-apisix-3.4.0.md",title:"Release Apache APISIX 3.4.0",description:"The Apache APISIX 3.4.0 version is released on June 30, 2023. This version adds a new plugin for Grafana Loki, allows for mTLS connection on the route level, and made performance optimization to continuously enhance the user experience of APISIX.",date:"2023-06-30T00:00:00.000Z",formattedDate:"June 30, 2023",tags:[{label:"Community",permalink:"/blog/tags/community"}],readingTime:2.335,truncated:!0,authors:[{name:"Xin Rong",title:"Author",url:"https://github.com/AlinsRan",image_url:"https://avatars.githubusercontent.com/u/79972061?v=4",imageURL:"https://avatars.githubusercontent.com/u/79972061?v=4"},{name:"Traky Deng",title:"Technical Writer",url:"https://github.com/kayx23",image_url:"https://avatars.githubusercontent.com/u/39619599?v=4",imageURL:"https://avatars.githubusercontent.com/u/39619599?v=4"}],prevItem:{title:"Connecting IoT Devices to the Cloud with APISIX MQTT Proxy",permalink:"/blog/2023/06/30/apisix-mqtt-proxy"},nextItem:{title:"Biweekly Report (June 06 - June 18)",permalink:"/blog/2023/06/21/weekly-report-en"}},s={authorsImageUrls:[void 0,void 0]},p=[{value:"New Features",id:"new-features",children:[{value:"Support integration with Grafana Loki using the <code>loki-logger</code> plugin",id:"support-integration-with-grafana-loki-using-the-loki-logger-plugin",children:[],level:3},{value:"Support route-level mTLS",id:"support-route-level-mtls",children:[],level:3}],level:2},{value:"Other Updates",id:"other-updates",children:[],level:2},{value:"Changelog",id:"changelog",children:[],level:2}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"We are pleased to present Apache APISIX 3.4.0 with exciting new features and performance improvements."),(0,r.kt)("p",null,"This release provides a new plugin ",(0,r.kt)("inlineCode",{parentName:"p"},"loki-logger")," to forward logs to ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/oss/loki/"},"Grafana Loki"),", and allows for mTLS connection on the route level. In addition, the release also includes many other updates to continuously enhance the user experience of APISIX."),(0,r.kt)("h2",{id:"new-features"},"New Features"),(0,r.kt)("h3",{id:"support-integration-with-grafana-loki-using-the-loki-logger-plugin"},"Support integration with Grafana Loki using the ",(0,r.kt)("inlineCode",{parentName:"h3"},"loki-logger")," plugin"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"loki-logger")," plugin is used to forward logs to ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/oss/loki/"},"Grafana Loki")," for analysis and storage."),(0,r.kt)("p",null,"When the plugin is enabled, APISIX serializes the request context information to ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/docs/loki/latest/api/#push-log-entries-to-loki"},"log entries in JSON")," and submits it to the batch queue. When the maximum batch size is reached, the data in the queue is pushed to Loki."),(0,r.kt)("p",null,"For example, you can enable the ",(0,r.kt)("inlineCode",{parentName:"p"},"loki-logger")," plugin on a specific route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n        "loki-logger": {\n            "endpoint_addrs" : ["http://127.0.0.1:3100"]\n        }\n    },\n    "upstream": {\n       "nodes": {\n           "127.0.0.1:1980": 1\n       },\n       "type": "roundrobin"\n    },\n    "uri": "/hello"\n}\'\n')),(0,r.kt)("p",null,"If successful, APISIX logs should be forwarded to Loki running at ",(0,r.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:3100"),"."),(0,r.kt)("p",null,"For more information about the plugin, see ",(0,r.kt)("inlineCode",{parentName:"p"},"loki-logger")," ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/release/3.4/docs/en/latest/plugins/loki-logger.md"},"plugin doc"),"."),(0,r.kt)("p",null,"PR for this feature could be found here ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/9399"},"#9399"),"."),(0,r.kt)("h3",{id:"support-route-level-mtls"},"Support route-level mTLS"),(0,r.kt)("p",null,"Support configuring mTLS on the route level. The Admin API SSL object now has a new configuration option, ",(0,r.kt)("inlineCode",{parentName:"p"},"client.skip_mtls_uri_regex"),". Users can specify a list of URIs (RegEx supported) in this option, for which the verification of the client certificate should be skipped."),(0,r.kt)("p",null,"For example, you can configure a route-level mTLS such as the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/*",\n    "upstream": {\n        "nodes": {\n            "httpbin.org": 1\n        }\n    }\n}\'\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "cert": "\'"$(path/to/certs/mtls_server.crt)"\'",\n    "key": "\'"$(path/to/certs/mtls_server.key)"\'",\n    "snis": [\n        "*.apisix.dev"\n    ],\n    "client": {\n        "ca": "\'"$(path/to/certs/mtls_ca.crt)"\'",\n        "depth": 10,\n        "skip_mtls_uri_regex": [\n            "/anything.*"\n        ]\n    }\n}\'\n')),(0,r.kt)("p",null,"If the URI of a request is in the ",(0,r.kt)("inlineCode",{parentName:"p"},"skip_mtls_uri_regex")," list, then the client certificate will not be checked. Note that other URIs of the associated SNI will get HTTP 400 response instead of an alert error in the SSL handshake phase, if the client certificate is missing or invalid."),(0,r.kt)("p",null,"For a detailed example, see ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/release/3.4/docs/en/latest/tutorials/client-to-apisix-mtls.md#mtls-bypass-based-on-regular-expression-matching-against-uri"},"Tutorial: mTLS bypass based on regular expression matching against URI"),"."),(0,r.kt)("p",null,"PR for this feature could be found here ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/9322"},"#9322"),"."),(0,r.kt)("h2",{id:"other-updates"},"Other Updates"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Support the use of one HTTP connection to watch the prefix for all etcd resources. This reduces the resource consumption and improved watch performance to be on par with gRPC connections (",(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/9456"},"PR #9456"),")"),(0,r.kt)("li",{parentName:"ul"},"Support multiple RegEx patterns in the ",(0,r.kt)("inlineCode",{parentName:"li"},"proxy_rewrite")," plugin (",(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/9194"},"PR #9194"),")"),(0,r.kt)("li",{parentName:"ul"},"Allow users to configure ",(0,r.kt)("inlineCode",{parentName:"li"},"DEFAULT_BUCKETS")," in the ",(0,r.kt)("inlineCode",{parentName:"li"},"prometheus")," plugin (",(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/9673"},"PR #9673"),")")),(0,r.kt)("h2",{id:"changelog"},"Changelog"),(0,r.kt)("p",null,"For a complete list of new features and bug fixes included in this release, please see ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/CHANGELOG.md"},"CHANGELOG"),"."))}c.isMDXComponent=!0}}]);