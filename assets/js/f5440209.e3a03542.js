(self.webpackChunk=self.webpackChunk||[]).push([[90900],{3905:function(e,t,a){"use strict";a.d(t,{Zo:function(){return c},kt:function(){return h}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=l(a),h=r,m=u["".concat(p,".").concat(h)]||u[h]||d[h]||i;return a?n.createElement(m,o(o({ref:t},c),{},{components:a})):n.createElement(m,o({ref:t},c))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=a[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},91820:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return o},metadata:function(){return s},toc:function(){return p},default:function(){return c}});var n=a(22122),r=a(19756),i=(a(67294),a(3905)),o={title:"Getting Started"},s={unversionedId:"getting-started",id:"version-2.8/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"\x3c!--",source:"@site/docs-apisix_versioned_docs/version-2.8/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/docs/apisix/getting-started",editUrl:"https://github.com/apache/apisix/edit/master/docs/en/latest/getting-started.md",version:"2.8",frontMatter:{title:"Getting Started"},sidebar:"version-2.8/docs",previous:{title:"Debug Mode",permalink:"/docs/apisix/architecture-design/debug-mode"},next:{title:"How to build Apache APISIX",permalink:"/docs/apisix/how-to-build"}},p=[{value:"Summary",id:"summary",children:[]},{value:"Pre-requisites",id:"pre-requisites",children:[]},{value:"Step 1: Install Apache APISIX",id:"step-1-install-apache-apisix",children:[]},{value:"Step 2: Create a Route",id:"step-2-create-a-route",children:[{value:"How it works",id:"how-it-works",children:[]},{value:"Create an Upstream",id:"create-an-upstream",children:[]},{value:"Bind the Route to the Upstream",id:"bind-the-route-to-the-upstream",children:[]}]},{value:"Step 3: Validation",id:"step-3-validation",children:[]},{value:"Advanced Operations",id:"advanced-operations",children:[{value:"Add Authentication",id:"add-authentication",children:[]},{value:"Prefixing a Route",id:"prefixing-a-route",children:[]},{value:"APISIX Dashboard",id:"apisix-dashboard",children:[]},{value:"Troubleshooting",id:"troubleshooting",children:[]}]}],l={toc:p};function c(e){var t=e.components,a=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"summary"},"Summary"),(0,i.kt)("p",null,"This article is a quick start guide for Apache APISIX. The Quick Start is divided into the following three steps:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Install Apache APISIX via ",(0,i.kt)("a",{parentName:"li",href:"https://docs.docker.com/compose/"},"Docker Compose"),"."),(0,i.kt)("li",{parentName:"ol"},"Create a route and bind it with a Upstream."),(0,i.kt)("li",{parentName:"ol"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"curl")," command to verify that the results returned after binding are as expected.")),(0,i.kt)("p",null,"In addition, this article provides some advanced operations on how to use Apache APISIX, including adding authentication, prefixing Route, using the APISIX Dashboard, and troubleshooting."),(0,i.kt)("p",null,"We will use the following ",(0,i.kt)("inlineCode",{parentName:"p"},"echo")," endpoint as an example, which will return the parameters we passed."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Request")),(0,i.kt)("p",null,"The request URL consists of these components:"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/requesturl.jpg",alt:"RequestURL"})),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Protocol: the network transport protocol, ",(0,i.kt)("inlineCode",{parentName:"li"},"HTTP")," protocol is used in our example."),(0,i.kt)("li",{parentName:"ul"},"Port: The port, ",(0,i.kt)("inlineCode",{parentName:"li"},"80")," is used in our example."),(0,i.kt)("li",{parentName:"ul"},"Host: The host, ",(0,i.kt)("inlineCode",{parentName:"li"},"httpbin.org")," is used in our example."),(0,i.kt)("li",{parentName:"ul"},"Path: The path, ",(0,i.kt)("inlineCode",{parentName:"li"},"/get")," is used in our example."),(0,i.kt)("li",{parentName:"ul"},"Query Parameters: the query string, two strings ",(0,i.kt)("inlineCode",{parentName:"li"},"foo1")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"foo2")," are listed in our example.")),(0,i.kt)("p",null,"Run the following command to send the request:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl --location --request GET "http://httpbin.org/get?foo1=bar1&foo2=bar2"\n')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Response")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "args": {\n    "foo1": "bar1",\n    "foo2": "bar2"\n  },\n  "headers": {\n    "Accept": "*/*",\n    "Host": "httpbin.org",\n    "User-Agent": "curl/7.29.0",\n    "X-Amzn-Trace-Id": "Root=1-6088fe84-24f39487166cce1f0e41efc9"\n  },\n  "origin": "58.152.81.42",\n  "url": "http://httpbin.org/get?foo1=bar1&foo2=bar2"\n}\n')),(0,i.kt)("h2",{id:"pre-requisites"},"Pre-requisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Installed ",(0,i.kt)("a",{parentName:"p",href:"https://www.docker.com/"},"Docker")," and ",(0,i.kt)("a",{parentName:"p",href:"https://docs.docker.com/compose/"},"Docker Compose component"),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"We use the ",(0,i.kt)("a",{parentName:"p",href:"https://curl.se/docs/manpage.html"},"curl")," command for API testing. You can also use other tools such as ",(0,i.kt)("a",{parentName:"p",href:"https://www.postman.com/"},"Postman")," for testing."))),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"If you already have Apache APISIX installed, please skip Step 1, and go to ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/getting-started#step-2-create-a-route"},"Step 2")," directly."))),(0,i.kt)("h2",{id:"step-1-install-apache-apisix"},"Step 1: Install Apache APISIX"),(0,i.kt)("p",null,"Thanks to Docker, we can start Apache APISIX and enable it by enabling ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/admin-api"},"Admin API"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Download the Docker image of Apache APISIX\ngit clone https://github.com/apache/apisix-docker.git\n# Switch the current directory to the apisix-docker/example path\ncd apisix-docker/example\n# Run the docker-compose command to install Apache APISIX\ndocker-compose -p docker-apisix up -d\n")),(0,i.kt)("p",null,"It will take some time to download all required files, please be patient."),(0,i.kt)("p",null,"Once the download is complete, execute the ",(0,i.kt)("inlineCode",{parentName:"p"},"curl")," command on the host running Docker to access the Admin API, and determine if Apache APISIX was successfully started based on the returned data."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# Note: Please execute the curl command on the host where you are running Docker.\ncurl \"http://127.0.0.1:9080/apisix/admin/services/\" -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1'\n")),(0,i.kt)("p",null,"The following data is returned to indicate that Apache APISIX was successfully started:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "count":1,\n  "action":"get",\n  "node":{\n    "key":"/apisix/services",\n    "nodes":{},\n    "dir":true\n  }\n}\n')),(0,i.kt)("h2",{id:"step-2-create-a-route"},"Step 2: Create a Route"),(0,i.kt)("p",null,"Now we have a running instance of Apache APISIX! Next, let's create a Route."),(0,i.kt)("h3",{id:"how-it-works"},"How it works"),(0,i.kt)("p",null,"Apache APISIX provides users with a powerful ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/admin-api"},"Admin API")," and ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard"},"APISIX Dashboard"),". In this article, we use the Admin API to walk you through the procedures of creating a Route."),(0,i.kt)("p",null,"We can create a ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/architecture-design/route"},"Route")," and connect it to an Upstream service(also known as the ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/architecture-design/upstream"},"Upstream"),"). When a ",(0,i.kt)("inlineCode",{parentName:"p"},"Request")," arrives at Apache APISIX, Apache APISIX knows which Upstream the request should be forwarded to."),(0,i.kt)("p",null,"Because we have configured matching rules for the Route object, Apache APISIX can forward the request to the corresponding Upstream service. The following code is an example of a Route configuration:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "methods": ["GET"],\n  "host": "example.com",\n  "uri": "/services/users/*",\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "httpbin.org:80": 1\n    }\n  }\n}\n')),(0,i.kt)("p",null,"This routing configuration means that all matching inbound requests will be forwarded to the Upstream service ",(0,i.kt)("inlineCode",{parentName:"p"},"httpbin.org:80")," when they meet ",(0,i.kt)("strong",{parentName:"p"},"all")," the rules listed below:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The HTTP method of the request is ",(0,i.kt)("inlineCode",{parentName:"li"},"GET"),"."),(0,i.kt)("li",{parentName:"ul"},"The request header contains the ",(0,i.kt)("inlineCode",{parentName:"li"},"host")," field, and its value is ",(0,i.kt)("inlineCode",{parentName:"li"},"example.com"),"."),(0,i.kt)("li",{parentName:"ul"},"The request path matches ",(0,i.kt)("inlineCode",{parentName:"li"},"/services/users/*"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"*")," means any subpath, for example ",(0,i.kt)("inlineCode",{parentName:"li"},"/services/users/getAll?limit=10"),".")),(0,i.kt)("p",null,"Once this route is created, we can access the Upstream service using the address exposed by Apache APISIX."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i -X GET "http://{APISIX_BASE_URL}/services/users/getAll?limit=10" -H "Host: example.com"\n')),(0,i.kt)("p",null,"This will be forwarded to ",(0,i.kt)("inlineCode",{parentName:"p"},"http://httpbin.org:80/services/users/getAll?limit=10")," by Apache APISIX."),(0,i.kt)("h3",{id:"create-an-upstream"},"Create an Upstream"),(0,i.kt)("p",null,"After reading the previous section, we know that we must set up an ",(0,i.kt)("inlineCode",{parentName:"p"},"Upstream")," for  the ",(0,i.kt)("inlineCode",{parentName:"p"},"Route"),". An Upstream can be created by simply executing the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9080/apisix/admin/upstreams/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n  "type": "roundrobin",\n  "nodes": {\n    "httpbin.org:80": 1\n  }\n}\'\n')),(0,i.kt)("p",null,"We use ",(0,i.kt)("inlineCode",{parentName:"p"},"roundrobin")," as the load balancing mechanism, and set ",(0,i.kt)("inlineCode",{parentName:"p"},"httpbin.org:80")," as our upstream target (Upstream service) with an ID of ",(0,i.kt)("inlineCode",{parentName:"p"},"1"),". For more information on the fields, see ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/admin-api"},"Admin API"),"."),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Creating an Upstream service is not actually necessary, as we can use ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/architecture-design/plugin"},"Plugin")," to intercept the request and then respond directly. However, for the purposes of this guide, we assume that at least one Upstream service needs to be set up."))),(0,i.kt)("h3",{id:"bind-the-route-to-the-upstream"},"Bind the Route to the Upstream"),(0,i.kt)("p",null,"We've just created an Upstream service (referencing our backend service), now let's bind a Route for it!"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9080/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n  "uri": "/get",\n  "host": "httpbin.org",\n  "upstream_id": "1"\n}\'\n')),(0,i.kt)("h2",{id:"step-3-validation"},"Step 3: Validation"),(0,i.kt)("p",null,"We have created the route and the Upstream service and bound them. Now let's access Apache APISIX to test this route."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i -X GET "http://127.0.0.1:9080/get?foo1=bar1&foo2=bar2" -H "Host: httpbin.org"\n')),(0,i.kt)("p",null,"It returns data from our Upstream service (actually ",(0,i.kt)("inlineCode",{parentName:"p"},"httpbin.org"),") and the result is as expected."),(0,i.kt)("h2",{id:"advanced-operations"},"Advanced Operations"),(0,i.kt)("p",null,"This section provides some advanced operations such as adding authentication, prefixing Route, using the APISIX Dashboard, and troubleshooting."),(0,i.kt)("h3",{id:"add-authentication"},"Add Authentication"),(0,i.kt)("p",null,"The route we created in step 2 is public. Thus, ",(0,i.kt)("strong",{parentName:"p"},"anyone")," can access this Upstream service as long as they know the address that Apache APISIX exposes to the outside world. This is unsafe, it creates certain security risks. In a practical application scenario, we need to add authentication to the route."),(0,i.kt)("p",null,"Now we want only a specific user ",(0,i.kt)("inlineCode",{parentName:"p"},"John")," to have access to this Upstream service, and we need to use ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/architecture-design/consumer"},"Consumer")," and ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/architecture-design/plugin"},"Plugin")," to implement authentication."),(0,i.kt)("p",null,"First, let's use ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/plugins/key-auth"},"key-auth")," plugin to create a ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/architecture-design/consumer"},"Consumer")," ",(0,i.kt)("inlineCode",{parentName:"p"},"John"),", we need to provide a specified key."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9080/apisix/admin/consumers" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n  "username": "john",\n  "plugins": {\n    "key-auth": {\n      "key": "key-of-john"\n    }\n  }\n}\'\n')),(0,i.kt)("p",null,"Next, let's bind ",(0,i.kt)("inlineCode",{parentName:"p"},"consumer (John)")," to the route, we just need to ",(0,i.kt)("strong",{parentName:"p"},"enable")," the ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/plugins/key-auth"},"key-auth")," plugin."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9080/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n  "uri": "/get",\n  "host": "httpbin.org",\n  "plugins": {\n    "key-auth": {}\n  },\n  "upstream_id": "1"\n}\'\n')),(0,i.kt)("p",null,"Now when we access the route created in step 2, an ",(0,i.kt)("strong",{parentName:"p"},"Unauthorized Error")," will be triggered."),(0,i.kt)("p",null,"The correct way to access that route is to add a ",(0,i.kt)("inlineCode",{parentName:"p"},"Header")," named ",(0,i.kt)("inlineCode",{parentName:"p"},"apikey")," with the correct key, as shown in the code below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"curl -i -X GET http://127.0.0.1:9080/get -H \"Host: httpbin.org\" -H 'apikey: superSecretAPIKey'\n")),(0,i.kt)("h3",{id:"prefixing-a-route"},"Prefixing a Route"),(0,i.kt)("p",null,"Now, suppose you want to add a prefix to a route (e.g. samplePrefix) and don't want to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"host")," header, then you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"proxy-rewrite")," plugin to do so."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://127.0.0.1:9080/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n  "uri": "/samplePrefix/get",\n  "plugins": {\n    "proxy-rewrite": {\n      "regex_uri": ["^/samplePrefix/get(.*)", "/get$1"]\n    },\n    "key-auth": {}\n  },\n  "upstream_id": "1"\n}\'\n')),(0,i.kt)("p",null,"You can now use the following command to invoke the route:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i -X GET "http://127.0.0.1:9080/samplePrefix/get?param1=foo&param2=bar" -H "apikey: key-of-john"\n')),(0,i.kt)("h3",{id:"apisix-dashboard"},"APISIX Dashboard"),(0,i.kt)("p",null,"Apache APISIX provides a ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard"},"Dashboard")," to make our operation more intuitive and easier."),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/dashboard.jpeg",alt:"Dashboard"})),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"APISIX Dashboard is an experimental feature for now."))),(0,i.kt)("h3",{id:"troubleshooting"},"Troubleshooting"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Make sure that all required ports (",(0,i.kt)("strong",{parentName:"p"},"default 9080/9443/2379"),") are not used by other systems or processes."),(0,i.kt)("p",{parentName:"li"},"  The following are commands to terminate a process that is listening on a specific port (on unix-based systems)."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"sudo fuser -k 9443/tcp\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If the Docker container keeps restarting or failing, log in to the container and observe the logs to diagnose the problem."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"docker logs -f --tail container_id\n")))))}c.isMDXComponent=!0}}]);