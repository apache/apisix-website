(self.webpackChunk=self.webpackChunk||[]).push([[10998],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return g}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=p(n),g=r,f=h["".concat(l,".").concat(g)]||h[g]||u[g]||i;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},12467:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},metadata:function(){return s},toc:function(){return l},default:function(){return c}});var a=n(22122),r=n(19756),i=(n(67294),n(3905)),o={title:"Traffic Split in Apache APISIX Ingress Controller",author:"Chao Zhang",authorURL:"https://github.com/tokers",authorImageURL:"https://avatars.githubusercontent.com/u/10428333?s=460&u=f48ef50c5621a1616a3ede50221547e34270e061&v=4",tags:["technology","practical case"]},s={permalink:"/blog/2021/03/27/traffic-split-in-apache-apisix-ingress-controller",source:"@site/blog/2021-03-27-traffic-split-in-apache-apisix-ingress-controller.md",title:"Traffic Split in Apache APISIX Ingress Controller",description:"@tokers, Apache APISIX Committer from Shenzhen Zhiliu Technology Co.",date:"2021-03-27T00:00:00.000Z",formattedDate:"March 27, 2021",tags:[{label:"technology",permalink:"/blog/tags/technology"},{label:"practical case",permalink:"/blog/tags/practical-case"}],readingTime:4.595,truncated:!0,prevItem:{title:"Apache APISIX 2.6.0-Release \u6b63\u5f0f\u53d1\u5e03",permalink:"/blog/2021/05/25/Apache APISIX 2.6.0-Release \u6b63\u5f0f\u53d1\u5e03"},nextItem:{title:"Get Front-End Test Coverage with Cypress",permalink:"/blog/2021/03/02/get-front-end-test-coverage-with-cypress"}},l=[{value:"Ingress Nginx",id:"ingress-nginx",children:[]},{value:"Kong",id:"kong",children:[]},{value:"Apache APISIX",id:"apache-apisix",children:[{value:"Weight-Based",id:"weight-based",children:[]},{value:"Rules-Based",id:"rules-based",children:[]}]},{value:"Summary",id:"summary",children:[]}],p={toc:l};function c(e){var t=e.components,n=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("a",{parentName:"p",href:"https://github.com/tokers"},"@tokers"),", Apache APISIX Committer from ",(0,i.kt)("a",{parentName:"p",href:"https://www.apiseven.com/"},"Shenzhen Zhiliu Technology Co."))),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Source: ",(0,i.kt)("a",{parentName:"p",href:"https://www.apiseven.com/en/blog/traffic-split-in-apache-apisix-ingress-controller"},"https://www.apiseven.com/en/blog/traffic-split-in-apache-apisix-ingress-controller")),(0,i.kt)("p",{parentName:"blockquote"},"Traffic Split is a feature that splits and deliveries traffic to multiple backend services. Solutions like API Gateway (e.g. ",(0,i.kt)("a",{parentName:"p",href:"http://apisix.apache.org/"},"Apache APISIX")," and ",(0,i.kt)("a",{parentName:"p",href:"https://traefik.io/"},"Traefik"),"), Service Mesh (e.g. ",(0,i.kt)("a",{parentName:"p",href:"https://istio.io/"},"Istio")," and ",(0,i.kt)("a",{parentName:"p",href:"https://linkerd.io/"},"Linkerd"),") are capable of doing traffic splitting and implement functionalities like ",(0,i.kt)("a",{parentName:"p",href:"https://blog.getambassador.io/cloud-native-patterns-canary-release-1cb8f82d371a"},"Canary Release")," and ",(0,i.kt)("a",{parentName:"p",href:"https://martinfowler.com/bliki/BlueGreenDeployment.html"},"Blue-Green Deployment"),".")),(0,i.kt)("p",null,"Traffic split is also a key feature in ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/"},"Ingress Controller"),". As the ingress layer in the ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/"},"Kubernetes")," cluster, it\u2019s desired to reduce the risk due to release a new version of the application by setting up some traffic split rules in the ingress controller, so only a controllable amount of traffic will be routed to newly released instances. In this article, we\u2019ll introduce the traffic split (also called canary release) in ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.github.io/ingress-nginx/"},"Ingress Nginx")," and ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Kong/kubernetes-ingress-controller"},"Kong Ingress Controller"),", and ultimately we explain the traffic split in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller"},"Apache APISIX Ingress Controller"),"."),(0,i.kt)("p",null,'(PS: For the sake of more concise descriptions, we use the term "canary app" to describe the backend service which routed after the canary rules hit, and the term "stable app" to describe the backend service which routed due to the canary rules miss, for instance, the canary and stable app are "foo-canary" and "foo" perspectively in the following diagram.)'),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://lh6.googleusercontent.com/E_qq-RFIcVBbTFsI8-QTNH7Io5vOXapdQUaAzKE2mYlyvtXUlZEoSd8aVMHAppARmXx9_wgHsgP1CWK_R74MfPV58dLQ71kEcU57DooHKz2LuKb6D6TW9B2_C8rLsm8wHTk2_zZt",alt:"1.png"})),(0,i.kt)("h2",{id:"ingress-nginx"},"Ingress Nginx"),(0,i.kt)("p",null,'Ingress Nginx supports the canary release, it\u2019s controlled by an annotation "nginx.ingress.kubernetes.io/canary", and it supports several annotations to customize this feature.'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"nginx.ingress.kubernetes.io/canary-by-header")),(0,i.kt)("p",null,'The destination is decided by whether the value of header (indicated by nginx.ingress.kubernetes.io/canary-by-header), the Canary app will be routed if the value is "always", the otherwise stable app will be routed (value of the header is "never").'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"nginx.ingress.kubernetes.io/canary-by-header-value")),(0,i.kt)("p",null,'This annotation extends nginx.ingress.kubernetes.io/canary-by-header, now the value of the header no longer needs to be "always" or "never".'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"nginx.ingress.kubernetes.io/canary-by-header-pattern")),(0,i.kt)("p",null,"Similar to nginx.ingress.kubernetes.io/canary-by-header, but the value is a ",(0,i.kt)("a",{parentName:"p",href:"https://www.pcre.org/"},"PCRE")," compatible regular expression."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"nginx.ingress.kubernetes.io/canary-by-cookie")),(0,i.kt)("p",null,"Use data field in Cookie header to decide the backend service."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"nginx.ingress.kubernetes.io/canary-weight")),(0,i.kt)("p",null,"Assign weight value between 0 and 100, traffic will be delivered according to this weight, a 0 weight means all traffic will be routed to the canary app and 100 weight will route all traffic to the stable app."),(0,i.kt)("p",null,'The following YAML snippet proxies requests whose URI path is led by "/get" and the User-Agent matches with the ".',(0,i.kt)("em",{parentName:"p"},"Mozilla."),'" pattern to the canary app "foo-canary".'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'apiVersion: networking.k8s.io/v1beta1\nkind: Ingress\nmetadata:\n  annotations:\n      kubernetes.io/ingress.class: nginx\n      nginx.ingress.kubernetes.io/canary: "true"\n      nginx.ingress.kubernetes.io/canary-by-header: "User-Agent"\n      nginx.ingress.kubernetes.io/canary-by-header-pattern:\n".*Mozilla.*"\n  name: ingress-v1beta1\n')),(0,i.kt)("h2",{id:"kong"},"Kong"),(0,i.kt)("p",null,"The Kong Gateway has a ",(0,i.kt)("a",{parentName:"p",href:"https://docs.konghq.com/hub/kong-inc/canary/0.32-x.html"},"canary release plugin")," and exposes this plugin to its ingress controller by ",(0,i.kt)("a",{parentName:"p",href:"https://docs.konghq.com/hub/"},"KongPlugin"),' resource. Administrators/Users need to create a KongPlugin object and fill the canary release rule, injecting an annotation "konghq.com/plugins" to the target ',(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/service/"},"Kubernetes Service"),". Or you can create a ",(0,i.kt)("a",{parentName:"p",href:"https://docs.konghq.com/kubernetes-ingress-controller/1.1.x/guides/using-kongclusterplugin-resource/"},"KongClusterPlugin")," object to let this canary rule effective in the whole cluster."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"apiVersion: configuration.konghq.com/v1\nkind: KongPlugin\nmetadata:\n  name: foo-canary\nconfig:\n  percentage: 30\n  upstream_host: foo.com\n  upstream_fallback: false\n  upstream_port: 80\nplugin: canary\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: foo-canary\n  labels:\n    app: foo\n  annotations:\n    konghq.com/plugins: foo-canary\nspec:\n  ports:\n  - port: 80\n    targetPort: 80\n    protocol: TCP\n    name: http\n  selector:\n      app: foo\n      canary: true\n")),(0,i.kt)("p",null,'The above case marks the service "foo-canary" as "canary", and creates a canary release rule to proxy 30% traffic to this service.'),(0,i.kt)("h2",{id:"apache-apisix"},"Apache APISIX"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org"},"Apache APISIX")," splits traffic with custom rules by its ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/traffic-split"},"traffic-split")," plugin, and Apache APISIX Ingress Controller implements the traffic split feature to ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/ingress-controller/concepts/apisix_route"},"ApisixRoute")," (as the first-class support, without relying on annotations) by this plugin and the flexible route match abilities in ApisixRoute."),(0,i.kt)("h3",{id:"weight-based"},"Weight-Based"),(0,i.kt)("p",null,"By configuring multiple Kubernetes Services, the weight-based canary rule can be applied like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"apiVersion: apisix.apache.org/v2alpha1\nkind: ApisixRoute\nmetadata:\n  name: foo-route\nspec:\n  http:\n  - name: rule1\n    match:\n      hosts:\n      - foo.org\n      paths:\n      - /get*\n    backends:\n    - serviceName: foo-canary\n      servicePort: 80\n      weight: 10\n    - serviceName: foo\n      servicePort: 80\n      weight: 5\n")),(0,i.kt)("p",null,'The above case puts \u2154 requests whose Host is "foo.org" and with URI path prefix "/get" to "foo-canary" service and others to foo.'),(0,i.kt)("p",null,"The weight for canary service can be tiny for the small scale verification, and enlarge the weight by modifying the ApisixRoute until all traffic routed to the canary service, finishing the release totally."),(0,i.kt)("h3",{id:"rules-based"},"Rules-Based"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/blob/master/docs/en/latest/concepts/apisix_route.md#advanced-route-features"},"Exprs")," field in ApisixRoute allows users to configure custom route match rules, on the other hand, multiple route rules can be grouped into a single ApisixRoute object, so there is a seamless way to implement the rules-based traffic split."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'apiVersion: apisix.apache.org/v2alpha1\nkind: ApisixRoute\nmetadata:\n  name: foo-route\nspec:\n  http:\n  - name: rule1\n    priority: 1\n    match:\n      hosts:\n      - foo.org\n      paths:\n      - /get*\n    backends:\n    - serviceName: foo\n      servicePort: 80\n  - name: rule2\n    priority: 2\n    match:\n      hosts:\n      - foo.org\n      paths:\n      - /get*\n      exprs:\n      - subject:\n          scope: Query\n          name: id\n        op: In\n        set:\n        - "3"\n        - "13"\n        - "23"\n        - "33"\n    backends:\n    - serviceName: foo-canary\n      servicePort: 80\n')),(0,i.kt)("p",null,'Requests whose Host is "foo.org", URI path prefix is "/get" will be separated into two parts:'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The id parameter which value is 3, 13, 23 or 33 will hit rule2, and forward to foo-canary;")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Others will hit rule1 and route to foo."))),(0,i.kt)("h2",{id:"summary"},"Summary"),(0,i.kt)("p",null,"Traffic split (Canary release) in Ingress Nginx supports weight-based scheme and header rule-based one, but it relies on annotations, which semantic is weak; The Kong way only supports to configure canary release by weight, the scenarios are somewhat narrow, and the configuring is complicated (you need to configure several resources); In contrast, traffic split in Apache APISIX Ingress Controller is flexible and easy to configure, it works well for both the weight-based and rule-based traffic split scheme."))}c.isMDXComponent=!0}}]);