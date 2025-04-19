"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[16649],{3905:(e,t,a)=>{a.d(t,{Zo:()=>l,kt:()=>d});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),h=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},l=function(e){var t=h(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=h(a),d=r,m=u["".concat(p,".").concat(d)]||u[d]||c[d]||i;return a?n.createElement(m,o(o({ref:t},l),{},{components:a})):n.createElement(m,o({ref:t},l))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var h=2;h<i;h++)o[h]=a[h];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},83658:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>l,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=a(87462),r=(a(67294),a(3905));const i={title:"Monitor API Health Check with Prometheus",keywords:["API Health Check","Monitoring with Prometheus","API Gateway"],description:"In this tutorial, we'll guide you on how to enable and monitor API health checks using APISIX and Prometheus."},o=void 0,s={unversionedId:"tutorials/monitor-api-health-check",id:"tutorials/monitor-api-health-check",isDocsHomePage:!1,title:"Monitor API Health Check with Prometheus",description:"In this tutorial, we'll guide you on how to enable and monitor API health checks using APISIX and Prometheus.",source:"@site/docs/apisix/tutorials/monitor-api-health-check.md",sourceDirName:"tutorials",slug:"/tutorials/monitor-api-health-check",permalink:"/zh/docs/apisix/next/tutorials/monitor-api-health-check",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/master/docs/zh/latest/tutorials/monitor-api-health-check.md",tags:[],version:"current",frontMatter:{title:"Monitor API Health Check with Prometheus",keywords:["API Health Check","Monitoring with Prometheus","API Gateway"],description:"In this tutorial, we'll guide you on how to enable and monitor API health checks using APISIX and Prometheus."},sidebar:"docs",previous:{title:"\u5065\u5eb7\u68c0\u67e5",permalink:"/zh/docs/apisix/next/tutorials/health-check"},next:{title:"Manage API Consumers",permalink:"/zh/docs/apisix/next/tutorials/manage-api-consumers"}},p=[{value:"Prerequisite(s)",id:"prerequisites",children:[]},{value:"Start the APISIX demo project",id:"start-the-apisix-demo-project",children:[]},{value:"Add health check API endpoints in upstream",id:"add-health-check-api-endpoints-in-upstream",children:[]},{value:"Setting Up Health Checks in APISIX",id:"setting-up-health-checks-in-apisix",children:[]},{value:"Enable the Prometheus Plugin",id:"enable-the-prometheus-plugin",children:[]},{value:"Create a Route",id:"create-a-route",children:[]},{value:"Send validation requests to the route",id:"send-validation-requests-to-the-route",children:[]},{value:"Collecting health check data with the Prometheus plugin",id:"collecting-health-check-data-with-the-prometheus-plugin",children:[]},{value:"Visualize the data in the Prometheus dashboard",id:"visualize-the-data-in-the-prometheus-dashboard",children:[]},{value:"Next Steps",id:"next-steps",children:[{value:"Related resources",id:"related-resources",children:[]},{value:"Recommended content",id:"recommended-content",children:[]}]}],h={toc:p};function l(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/"},"APISIX")," has a ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/tutorials/health-check/"},"health check")," mechanism, which proactively checks the health status of the upstream nodes in your system. Also, APISIX integrates with ",(0,r.kt)("a",{parentName:"p",href:"https://prometheus.io/"},"Prometheus")," through its ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/prometheus/"},"plugin")," that exposes upstream nodes (multiple instances of a backend API service that APISIX manages) health check metrics on the Prometheus metrics endpoint\xa0typically, on URL path ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"/apisix/prometheus/metrics")),"."),(0,r.kt)("p",null,"In this tutorial, we'll guide you on how to ",(0,r.kt)("strong",{parentName:"p"},"enable and monitor API health checks")," using APISIX and Prometheus."),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisite(s)"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Before you start, it is good to have a basic understanding of APISIX. Familiarity with ",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/terminology/api-gateway/"},"API gateway"),", and its key concepts such as\xa0",(0,r.kt)("a",{parentName:"li",href:"https://docs.api7.ai/apisix/key-concepts/routes"},"routes"),",\xa0",(0,r.kt)("a",{parentName:"li",href:"https://docs.api7.ai/apisix/key-concepts/upstreams"},"upstream"),",\xa0",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/admin-api/"},"Admin API"),",\xa0",(0,r.kt)("a",{parentName:"li",href:"https://docs.api7.ai/apisix/key-concepts/plugins"},"plugins"),", and HTTP protocol will also be beneficial."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.docker.com/get-docker/"},"Docker"),"\xa0is used to install the containerized etcd and APISIX."),(0,r.kt)("li",{parentName:"ul"},"Install\xa0",(0,r.kt)("a",{parentName:"li",href:"https://curl.se/"},"cURL"),"\xa0to send requests to the services for validation.")),(0,r.kt)("h2",{id:"start-the-apisix-demo-project"},"Start the APISIX demo project"),(0,r.kt)("p",null,"This project leverages the pre-defined ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-docker/blob/master/example/docker-compose.yml"},"Docker Compose configuration")," file to set up, deploy and run APISIX, etcd, Prometheus, and other services with a single\xa0command. First, clone the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-docker"},"apisix-docker")," repo on GitHub and open it in your favorite editor, navigate to ",(0,r.kt)("inlineCode",{parentName:"p"},"/example")," folder, and start the project by simply running ",(0,r.kt)("inlineCode",{parentName:"p"},"docker compose up")," from the folder."),(0,r.kt)("p",null,"When you start the project, Docker downloads any images it needs to run. You can see the full list of services in\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-docker/blob/master/example/docker-compose.yml"},"docker-compose.yaml"),"\xa0file."),(0,r.kt)("h2",{id:"add-health-check-api-endpoints-in-upstream"},"Add health check API endpoints in upstream"),(0,r.kt)("p",null,"To check API health periodically, APISIX needs an HTTP path of the health endpoint of the upstream service. So, you need first to add ",(0,r.kt)("inlineCode",{parentName:"p"},"/health")," endpoint for your backend service.  From there, you inspect the most relevant metrics for that service such as memory usage, database connectivity, response duration, and more.  Assume that we have two backend REST API services web1 and web2 running using the demo project and each has its ",(0,r.kt)("strong",{parentName:"p"},"own health check")," endpoint at URL path ",(0,r.kt)("inlineCode",{parentName:"p"},"/health"),". At this point, you do not need to make additional configurations. In reality, you can replace them with your backend services."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The simplest and standardized way to validate the status of a service is to define a new\xa0",(0,r.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/draft-inadarei-api-health-check"},"health check"),"\xa0endpoint like\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"/health"),"\xa0or\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"/status"))),(0,r.kt)("h2",{id:"setting-up-health-checks-in-apisix"},"Setting Up Health Checks in APISIX"),(0,r.kt)("p",null,"This process involves checking the operational status of the 'upstream' nodes. APISIX provides two types of health checks: ",(0,r.kt)("strong",{parentName:"p"},"Active checks")," and ",(0,r.kt)("strong",{parentName:"p"},"Passive Checks")," respectively. Read more about Health Checks and how to enable them ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/tutorials/health-check/"},"here"),". Use the ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/admin-api/"},"Admin API")," to create an Upstream object. Here is an example of creating an ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/upstream/"},"Upstream")," object with two nodes (Per each backend service we defined) and configuring the health check parameters in the upstream object:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9180/apisix/admin/upstreams/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n   "nodes":{\n      "web1:80":1,\n      "web2:80":1\n   },\n   "checks":{\n      "active":{\n         "timeout":5,\n         "type":"http",\n         "http_path":"/health",\n         "healthy":{\n            "interval":2,\n            "successes":1\n         },\n         "unhealthy":{\n            "interval":1,\n            "http_failures":2\n         }\n      }\n   }\n}\'\n')),(0,r.kt)("p",null,"This example configures an active health check on the ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"/health"))," endpoint of the node. It considers the node healthy after ",(0,r.kt)("strong",{parentName:"p"},"one successful health check")," and unhealthy ",(0,r.kt)("strong",{parentName:"p"},"after two failed health checks"),"."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Note that sometimes you might need the IP addresses of upstream nodes, not their domains (",(0,r.kt)("inlineCode",{parentName:"p"},"web1")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"web2"),") if you are running services outside docker network. Health check will be started only if the number of nodes (resolved IPs) is bigger than 1.")),(0,r.kt)("h2",{id:"enable-the-prometheus-plugin"},"Enable the Prometheus Plugin"),(0,r.kt)("p",null,"Create a global rule to enable the\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"prometheus"),"\xa0plugin on all routes by adding\xa0",(0,r.kt)("inlineCode",{parentName:"p"},'"prometheus": {}'),"\xa0in the plugins option. APISIX gathers internal runtime metrics and exposes them through port\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"9091"),"\xa0and URI path\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"/apisix/prometheus/metrics"),"\xa0by default that Prometheus can scrape. It is also possible to customize the export port and ",(0,r.kt)("strong",{parentName:"p"},"URI path"),", ",(0,r.kt)("strong",{parentName:"p"},"add")," ",(0,r.kt)("strong",{parentName:"p"},"extra labels, the frequency of these scrapes, and other parameters")," by configuring them in the Prometheus configuration ",(0,r.kt)("inlineCode",{parentName:"p"},"/prometheus_conf/prometheus.yml"),"file."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9180/apisix/admin/global_rules" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n   "id":"rule-for-metrics",\n   "plugins":{\n      "prometheus":{\n      }\n   }\n}\'\n')),(0,r.kt)("h2",{id:"create-a-route"},"Create a Route"),(0,r.kt)("p",null,"Create a ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/route/"},"Route")," object to route incoming requests to upstream nodes:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n   "name":"backend-service-route",\n   "methods":[\n      "GET"\n   ],\n   "uri":"/",\n   "upstream_id":"1"\n}\'\n')),(0,r.kt)("h2",{id:"send-validation-requests-to-the-route"},"Send validation requests to the route"),(0,r.kt)("p",null,"To generate some metrics, you try to send few requests to the route we created in the previous step:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i -X GET "http://localhost:9080/"\n')),(0,r.kt)("p",null,"If you run the above requests a couple of times, you can see from responses that APISIX routes some requests to ",(0,r.kt)("inlineCode",{parentName:"p"},"node1")," and others to ",(0,r.kt)("inlineCode",{parentName:"p"},"node2"),". That\u2019s how Gateway load balancing works!"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"HTTP/1.1 200 OK\nContent-Type: text/plain; charset=utf-8\nContent-Length: 10\nConnection: keep-alive\nDate: Sat, 22 Jul 2023 10:16:38 GMT\nServer: APISIX/3.3.0\n\nhello web2\n\n...\n\nHTTP/1.1 200 OK\nContent-Type: text/plain; charset=utf-8\nContent-Length: 10\nConnection: keep-alive\nDate: Sat, 22 Jul 2023 10:16:39 GMT\nServer: APISIX/3.3.0\n\nhello web1\n")),(0,r.kt)("h2",{id:"collecting-health-check-data-with-the-prometheus-plugin"},"Collecting health check data with the Prometheus plugin"),(0,r.kt)("p",null,"Once the health checks and route are configured in APISIX, you can employ Prometheus to monitor health checks. APISIX ",(0,r.kt)("strong",{parentName:"p"},"automatically exposes health check metrics data")," for your APIs if the health check parameter is enabled for upstream nodes. You will see metrics in the response after fetching them from APISIX:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"curl -i http://127.0.0.1:9091/apisix/prometheus/metrics\n")),(0,r.kt)("p",null,"Example Output:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'# HELP apisix_http_requests_total The total number of client requests since APISIX started\n# TYPE apisix_http_requests_total gauge\napisix_http_requests_total 119740\n# HELP apisix_http_status HTTP status codes per service in APISIX\n# TYPE apisix_http_status counter\napisix_http_status{code="200",route="1",matched_uri="/",matched_host="",service="",consumer="",node="172.27.0.5"} 29\napisix_http_status{code="200",route="1",matched_uri="/",matched_host="",service="",consumer="",node="172.27.0.7"} 12\n# HELP apisix_upstream_status Upstream status from health check\n# TYPE apisix_upstream_status gauge\napisix_upstream_status{name="/apisix/upstreams/1",ip="172.27.0.5",port="443"} 0\napisix_upstream_status{name="/apisix/upstreams/1",ip="172.27.0.5",port="80"} 1\napisix_upstream_status{name="/apisix/upstreams/1",ip="172.27.0.7",port="443"} 0\napisix_upstream_status{name="/apisix/upstreams/1",ip="172.27.0.7",port="80"} 1\n')),(0,r.kt)("p",null,"Health check data is represented with metrics label ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix_upstream_status"),". It has attributes like upstream ",(0,r.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ip")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"port"),". A value of 1 represents healthy and 0 means the upstream node is unhealthy."),(0,r.kt)("h2",{id:"visualize-the-data-in-the-prometheus-dashboard"},"Visualize the data in the Prometheus dashboard"),(0,r.kt)("p",null,"Navigate to http://localhost:9090/ where the Prometheus instance is running in Docker and type ",(0,r.kt)("strong",{parentName:"p"},"Expression")," ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix_upstream_status")," in the search bar. You can also see the output of the health check statuses of upstream nodes on the ",(0,r.kt)("strong",{parentName:"p"},"Prometheus dashboard")," in the table or graph view:"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/07/20/OGBtqbDq_output.png",alt:"Visualize the data in Prometheus dashboard"})),(0,r.kt)("h2",{id:"next-steps"},"Next Steps"),(0,r.kt)("p",null,"You have now learned how to set up and monitor API health checks with Prometheus and APISIX.  APISIX Prometheus plugin is configured to connect ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/"},"Grafana")," automatically to visualize metrics. Keep exploring the data and customize the ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/grafana/dashboards/11719-apache-apisix/"},"Grafana dashboard")," by adding a panel that shows the number of active health checks."),(0,r.kt)("h3",{id:"related-resources"},"Related resources"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://api7.ai/blog/api7-portal-monitor-api-metrics"},"Monitoring API Metrics: How to Ensure Optimal Performance of Your API?")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://api7.ai/blog/introduction-to-monitoring-microservices"},"Monitoring Microservices with Prometheus and Grafana"))),(0,r.kt)("h3",{id:"recommended-content"},"Recommended content"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://dev.to/apisix/implementing-resilient-applications-with-api-gateway-health-check-338c"},"Implementing resilient applications with API Gateway (Health Check)"))))}l.isMDXComponent=!0}}]);