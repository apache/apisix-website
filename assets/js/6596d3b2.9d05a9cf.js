(self.webpackChunk=self.webpackChunk||[]).push([[33210],{3905:function(e,t,a){"use strict";a.d(t,{Zo:function(){return u},kt:function(){return d}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),h=c(a),d=r,m=h["".concat(l,".").concat(d)]||h[d]||p[d]||i;return a?n.createElement(m,o(o({ref:t},u),{},{components:a})):n.createElement(m,o({ref:t},u))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},78191:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return o},metadata:function(){return s},toc:function(){return l},default:function(){return u}});var n=a(22122),r=a(19756),i=(a(67294),a(3905)),o={title:"Getting Started"},s={unversionedId:"getting-started",id:"version-2.5/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"\x3c!--",source:"@site/docs-apisix_versioned_docs/version-2.5/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/docs/apisix/2.5/getting-started",editUrl:"https://github.com/apache/apisix/edit/master/docs/en/latest/getting-started.md",version:"2.5",frontMatter:{title:"Getting Started"},sidebar:"version-2.5/docs",previous:{title:"Debug Mode",permalink:"/docs/apisix/2.5/architecture-design/debug-mode"},next:{title:"How to build Apache APISIX",permalink:"/docs/apisix/2.5/how-to-build"}},l=[{value:"Quick Start Guide",id:"quick-start-guide",children:[]},{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Step 1: Install APISIX",id:"step-1-install-apisix",children:[]},{value:"Step 2: Create a Route in APISIX",id:"step-2-create-a-route-in-apisix",children:[{value:"Create an Upstream",id:"create-an-upstream",children:[]},{value:"Add a Route to Access the Upstream",id:"add-a-route-to-access-the-upstream",children:[]},{value:"Call APISIX",id:"call-apisix",children:[]}]},{value:"Step 3: Add authentication for the service",id:"step-3-add-authentication-for-the-service",children:[]},{value:"Add a prefix to the route",id:"add-a-prefix-to-the-route",children:[]},{value:"APISIX Dashboard",id:"apisix-dashboard",children:[{value:"Troubleshooting",id:"troubleshooting",children:[]}]}],c={toc:l};function u(e){var t=e.components,a=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"quick-start-guide"},"Quick Start Guide"),(0,i.kt)("p",null,"The goal of this guide is to get started with APISIX and to configure a secured public API with APISIX.\nBy the end of this guide, you will have a working APISIX setup and a new service which will route to a public API, which is secured by an API key."),(0,i.kt)("p",null,"The following GET endpoint will be used for the purpose of this tutorial. This will act as an echo endpoint and will return the parameters which are sent to the API."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'$ curl --location --request GET "https://httpbin.org/get?foo1=bar1&foo2=bar2"\n')),(0,i.kt)("p",null,"Let's deconstruct the above URL."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Scheme: HTTPS"),(0,i.kt)("li",{parentName:"ul"},"Host/Address: httpbin.org"),(0,i.kt)("li",{parentName:"ul"},"Port: 443"),(0,i.kt)("li",{parentName:"ul"},"URI: /get"),(0,i.kt)("li",{parentName:"ul"},"Query Parameters: foo1, foo2")),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"This guide uses docker and docker-compose to setup APISIX. But if you have already installed APISIX in other ways, you can just skip to ",(0,i.kt)("a",{parentName:"li",href:"/docs/apisix/2.5/getting-started#step-2-create-a-route-in-apisix"},"step 2"),"."),(0,i.kt)("li",{parentName:"ul"},"Curl: The guide uses curl command for API testing, but you can also use any other tool of your choice (Eg- Postman).")),(0,i.kt)("h2",{id:"step-1-install-apisix"},"Step 1: Install APISIX"),(0,i.kt)("p",null,"APISIX is available to install in multiple operating environments. The ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/2.5/how-to-build#installation-via-source-release"},"following document")," shows the installation steps in multiple platforms.\nFor the quick start let's use the docker based set up. To start the APISIX server, clone the following ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-docker"},"repository")," and navigate to the example folder and execute the following commands."),(0,i.kt)("p",null,"This command will start the APISIX server and the admin API will be available in 9080 port (HTTPS port: 9443)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ git clone https://github.com/apache/apisix-docker.git\n$ cd apisix-docker/example\n$ docker-compose -p docker-apisix up -d\n")),(0,i.kt)("p",null,"It will take a while to download the source for the first time. But the consequent loads will be very fast.\nAfter the docker containers have started visit the following link to check if you are getting a successful response."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ curl \"http://127.0.0.1:9080/apisix/admin/services/\" -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1'\n")),(0,i.kt)("p",null,"The following will be the response from the Admin API."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "node": {\n        "createdIndex": 6,\n        "modifiedIndex": 6,\n        "key": "/apisix/services",\n        "dir": true\n        },\n    "action": "get"\n}\n')),(0,i.kt)("h2",{id:"step-2-create-a-route-in-apisix"},"Step 2: Create a Route in APISIX"),(0,i.kt)("p",null,"APISIX provides a powerful Admin API and a ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard"},"dashboard")," for configuring the routes/services/plugins.\nThe quickstart guide will use the Admin API for configuring the routes."),(0,i.kt)("p",null,"A micro-service can be configured via APISIX through the relationship between several entities such as routes, services, upstream, and plugins.\nThe route matches the client request and specifies how they are sent to the upstream (backend API/Service) after they reach APISIX.\nServices provide an abstraction to the upstream services. Therefore, you can create a single service and reference it in multiple routes.\nCheck out the architecture document for more information."),(0,i.kt)("p",null,"Technically all this information(upstream or service, plugins) can be included inside a route configuration. The route consists of three main parts."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Matching Rules:"),(0,i.kt)("p",{parentName:"li"},"  Let's take the following scenario.\n",(0,i.kt)("a",{parentName:"p",href:"http://example.com/services/users"},"http://example.com/services/users")),(0,i.kt)("p",{parentName:"li"},"  The URL above hosts all the micro services related to the users(getUser/ GetAllUsers) in the system. For example the GetAllUsers endpoint can be reached via the following URL (",(0,i.kt)("a",{parentName:"p",href:"http://example.com/services/users/GetAllUsers"},"http://example.com/services/users/GetAllUsers"),")\nNow you want to expose all the ",(0,i.kt)("inlineCode",{parentName:"p"},"GET")," endpoints(micro-services) under the ",(0,i.kt)("inlineCode",{parentName:"p"},"users")," path. The following will be the route configuration for matching such request."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "methods": ["GET"],\n    "host": "example.com",\n    "uri": "/services/users/*",\n    ... Additional Configurations\n}\n')),(0,i.kt)("p",{parentName:"li"},"  With the above matching rule you can communicate to APISIX via the following command."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i -X GET "http://{apisix_server.com}:{port}/services/users/getAllUsers?limit=10" -H "Host: example.com"\n'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Upstream information:"),(0,i.kt)("p",{parentName:"li"},"  Upstream is a virtual host abstraction that performs load balancing on a given set of service nodes according to configuration rules.\nThus a single upstream configuration can comprise of multiple servers which offers the same service. Each node will comprise of a key(address/ip : port) and a value(weight of the node).\nThe service can be load balanced through a round robin or consistent hashing (cHash) mechanism."),(0,i.kt)("p",{parentName:"li"},"  When configuring a route you can either set the upstream information or use service abstraction to refer the upstream information.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Plugins"),(0,i.kt)("p",{parentName:"li"},"  Plugins allows you to extend the capabilities of APISIX and to implement arbitrary logic which can interface with the HTTP request/response lifecycle.\nTherefore, if you want to authenticate the API then you can include the Key Auth plugin to enforce authentication for each request."))),(0,i.kt)("h3",{id:"create-an-upstream"},"Create an Upstream"),(0,i.kt)("p",null,"Execute the following command to create an upstream with the id of '50' in APISIX. Let's use the round-robin mechanism for load balancing."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9080/apisix/admin/upstreams/50" -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "type": "roundrobin",\n    "nodes": {\n        "httpbin.org:443": 1\n    }\n}\'\n')),(0,i.kt)("h3",{id:"add-a-route-to-access-the-upstream"},"Add a Route to Access the Upstream"),(0,i.kt)("p",null,"By default APISIX proxies the request via the HTTP protocol. As our backend is hosted in a HTTPS environment, let's use the proxy-rewrite plugin to change the scheme to HTTPS."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9080/apisix/admin/routes/5" -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/get",\n    "host": "httpbin.org",\n    "plugins": {\n        "proxy-rewrite": {\n          "scheme": "https"\n        }\n    },\n    "upstream_id": 50\n}\'\n')),(0,i.kt)("h3",{id:"call-apisix"},"Call APISIX"),(0,i.kt)("p",null,"Now lets call APISIX to test the newly configured route."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i -X GET "http://127.0.0.1:9080/get?foo1=bar1&foo2=bar2" -H "Host: httpbin.org"\n')),(0,i.kt)("p",null,"The API is available via the HTTPs(9443) endpoint as well. If you are using a self signed certificate then use the ",(0,i.kt)("inlineCode",{parentName:"p"},"-k")," parameter to ignore the self-signed certificate error by the curl command."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i -k -X GET "https://127.0.0.1:9443/get?foo1=bar1&foo2=bar2" -H "Host: httpbin.org"\n')),(0,i.kt)("h2",{id:"step-3-add-authentication-for-the-service"},"Step 3: Add authentication for the service"),(0,i.kt)("p",null,"Now lets protect the newly created APISIX endpoint/route as it is currently open to the public.\nExecute the following command to create a user called John with a dedicated api-key."),(0,i.kt)("p",null,"Note: APISIX supports multiple authentication mechanism, view the plugin docs to learn more."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/consumers -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "username": "john",\n    "plugins": {\n        "key-auth": {\n            "key": "superSecretAPIKey"\n        }\n    }\n}\'\n')),(0,i.kt)("p",null,"Now, let's configure our endpoint to include the key-auth plugin."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9080/apisix/admin/routes/5 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/get",\n    "host": "httpbin.org",\n    "plugins": {\n        "proxy-rewrite": {\n          "scheme": "https"\n        },\n        "key-auth": {}\n    },\n    "upstream_id": 50\n}\'\n')),(0,i.kt)("p",null,"As the route is secured by the key-auth plugin the former curl command to access the API will produce an unauthorized access error.\nUse the command below to securely access the endpoint now."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"curl -i -X GET http://127.0.0.1:9080/get -H \"Host: httpbin.org\" -H 'apikey: superSecretAPIKey'\n")),(0,i.kt)("h2",{id:"add-a-prefix-to-the-route"},"Add a prefix to the route"),(0,i.kt)("p",null,"Now lets say you want to add a prefix (eg: samplePrefix) to the route and do not want to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"host")," header then you can use\nthe proxy-rewrite plugin to do it."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9080/apisix/admin/routes/5 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/samplePrefix/get",\n    "plugins": {\n        "proxy-rewrite": {\n          "scheme": "https",\n          "regex_uri": ["^/samplePrefix/get(.*)", "/get$1"]\n        },\n        "key-auth": {}\n    },\n    "upstream_id": 50\n}\'\n')),(0,i.kt)("p",null,"Now you can invoke the route with the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"curl -i -X GET 'http://127.0.0.1:9080/samplePrefix/get?param1=foo&param2=bar' -H 'apikey: superSecretAPIKey'\n")),(0,i.kt)("h2",{id:"apisix-dashboard"},"APISIX Dashboard"),(0,i.kt)("p",null,"As of now the API calls to the APISIX has been orchestrated by using the Admin API. However, APISIX also provides\na web application to perform the similar. The dashboard is available in the following\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix"},"repository"),". The dashboard is intuitive and you can orchestrate the\nsame route configurations via the dashboard as well."),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/dashboard.png",alt:"Dashboard"})),(0,i.kt)("h3",{id:"troubleshooting"},"Troubleshooting"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Make sure the required ports are not being used by other systems/processes (The default ports are: 9080, 9443, 2379).\nThe following is the command to kill a process which is listening to a specific port (in unix based systems)."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"```bash\nsudo fuser -k 9443/tcp\n```\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If the docker container is continuously restarting/failing, login to the container and observe the logs to diagnose the issue."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"docker logs -f --tail container_id\n")))))}u.isMDXComponent=!0}}]);