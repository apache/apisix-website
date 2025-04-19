"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[1673],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>d});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(a),d=n,h=u["".concat(s,".").concat(d)]||u[d]||m[d]||l;return a?r.createElement(h,i(i({ref:t},c),{},{components:a})):r.createElement(h,i({ref:t},c))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,i=new Array(l);i[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:n,i[1]=o;for(var p=2;p<l;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},79130:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var r=a(87462),n=(a(67294),a(3905));const l={title:"prometheus"},i=void 0,o={unversionedId:"plugins/prometheus",id:"version-1.8.0/plugins/prometheus",isDocsHomePage:!1,title:"prometheus",description:"This guide shows how to monitor Apache APISIX Ingress Controller using Prometheus and Grafana.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.8.0/plugins/prometheus.md",sourceDirName:"plugins",slug:"/plugins/prometheus",permalink:"/zh/docs/ingress-controller/plugins/prometheus",editUrl:"/zh/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.8.0/docs/zh/latest/plugins/prometheus.md",tags:[],version:"1.8.0",frontMatter:{title:"prometheus"}},s=[{value:"Enable Prometheus",id:"enable-prometheus",children:[]},{value:"Configure Prometheus Server",id:"configure-prometheus-server",children:[]},{value:"Grafana Dashboard",id:"grafana-dashboard",children:[{value:"Preview",id:"preview",children:[]}]},{value:"Available metrics",id:"available-metrics",children:[]}],p={toc:s};function c(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This guide shows how to monitor Apache APISIX Ingress Controller using Prometheus and Grafana."),(0,n.kt)("h2",{id:"enable-prometheus"},"Enable Prometheus"),(0,n.kt)("p",null,"Use CRD file to enable Prometheus in global configurations. The definition file for custom resources is ",(0,n.kt)("inlineCode",{parentName:"p"},"ApisixClusterConfig"),", so the configuration should be:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixClusterConfig\nmetadata:\n  name: default\nspec:\n  monitoring:\n    prometheus:\n      enable: true\n")),(0,n.kt)("h2",{id:"configure-prometheus-server"},"Configure Prometheus Server"),(0,n.kt)("p",null,"The Prometheus server address should be ",(0,n.kt)("inlineCode",{parentName:"p"},"127.0.0.1:9090")," by default. You can set the target url for ",(0,n.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," manually in ",(0,n.kt)("inlineCode",{parentName:"p"},"prometheus.yml"),".\nFor example:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'...\nscrape_configs:\n  - job_name: "apisix-ingress-controller"\n    static_configs:\n    - targets: ["localhost:9092"]\n')),(0,n.kt)("p",null,"According to the above example, the metrics are exposed in ",(0,n.kt)("inlineCode",{parentName:"p"},"http://localhost:9092/metrics")," now.",(0,n.kt)("br",{parentName:"p"}),"\n","Visit ",(0,n.kt)("inlineCode",{parentName:"p"},"http://localhost:9090")," in your browser, and select ",(0,n.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," in ",(0,n.kt)("inlineCode",{parentName:"p"},"targets"),"\nor visit ",(0,n.kt)("inlineCode",{parentName:"p"},"http://localhost:9092/metrics")," to see the data.\n",(0,n.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/metrics_data.png",alt:"metrics_data.png"})),(0,n.kt)("h2",{id:"grafana-dashboard"},"Grafana Dashboard"),(0,n.kt)("p",null,"Grafana dashboard shows the metrics exposed in Prometheus graphically.",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/#installing-grafana"},"Installing Grafana"),(0,n.kt)("br",{parentName:"p"}),"\n","Visit ",(0,n.kt)("inlineCode",{parentName:"p"},"http://localhost:3000/")," in your browser to access Grafana. The default username and password are ",(0,n.kt)("inlineCode",{parentName:"p"},"admin"),".\nThen create a new dashboard for ",(0,n.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller"),".",(0,n.kt)("br",{parentName:"p"}),"\n",(0,n.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/grafana.png",alt:"grafana.png"}),(0,n.kt)("br",{parentName:"p"}),"\n","Follow the steps to apply the configuration of Grafana Dashboard for ",(0,n.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller"),"."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Add an empty panel, and import via panel json in ",(0,n.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller/docs/assets/other/json/apisix-ingress-controller-grafana.json"),".\n",(0,n.kt)("img",{parentName:"li",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/img.png",alt:"img.png"}),(0,n.kt)("img",{parentName:"li",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/import_via_panel_json.png",alt:"import_via_panel_json.png"})),(0,n.kt)("li",{parentName:"ul"},"Select ",(0,n.kt)("inlineCode",{parentName:"li"},"Prometheus database")," as the datasource. Set the URL according to your Prometheus server configuration.",(0,n.kt)("br",{parentName:"li"}),(0,n.kt)("img",{parentName:"li",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/datasource_1.png",alt:"datasource_1.png"}),(0,n.kt)("img",{parentName:"li",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/datasource_2.png",alt:"datasource_2.png"}))),(0,n.kt)("h3",{id:"preview"},"Preview"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/dashboard_view_1.png",alt:"dashboard_view_1.png"}),"\n",(0,n.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/dashboard_view_2.png",alt:"dashboard_view_2.png"}),"\n",(0,n.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.8.0/docs/assets/images/dashboard_view_3.png",alt:"dashboard_view_3.png"})),(0,n.kt)("h2",{id:"available-metrics"},"Available metrics"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Is leader")," A gauge type metric with value 0 or 1, indicates whether the role of controller instance is leader, for leader is 1 and candidate is 0.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Status codes")," status codes of requests to APISIX.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"),(0,n.kt)("li",{parentName:"ul"},"status_code: the HTTP status code returned by APISIX.  "),(0,n.kt)("li",{parentName:"ul"},"resource"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Latency")," Request latencies with APISIX.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Requests")," Number of requests to APISIX.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"),(0,n.kt)("li",{parentName:"ul"},"resource"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Check cluster health")," Number of cluster health check operations.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"),(0,n.kt)("li",{parentName:"ul"},"name: cluster name."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Sync operation")," Number of sync operations.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"),(0,n.kt)("li",{parentName:"ul"},"resource"),(0,n.kt)("li",{parentName:"ul"},"result: sync success or failure."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Cache sync")," Number of cache sync operations.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"),(0,n.kt)("li",{parentName:"ul"},"result: sync success or failure."))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"Controller events")," Number of events handled by the controller.",(0,n.kt)("br",{parentName:"li"}),"Labels:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"controller_pod"),(0,n.kt)("li",{parentName:"ul"},"controller_namespace"),(0,n.kt)("li",{parentName:"ul"},"resource"),(0,n.kt)("li",{parentName:"ul"},"operation: includes ",(0,n.kt)("inlineCode",{parentName:"li"},"add"),", ",(0,n.kt)("inlineCode",{parentName:"li"},"update"),", ",(0,n.kt)("inlineCode",{parentName:"li"},"delete"),".")))))}c.isMDXComponent=!0}}]);