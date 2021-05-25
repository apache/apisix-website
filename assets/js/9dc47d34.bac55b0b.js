(self.webpackChunk=self.webpackChunk||[]).push([[98091],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return p},kt:function(){return h}});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(r),h=i,m=d["".concat(s,".").concat(h)]||d[h]||u[h]||o;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},76797:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return a},metadata:function(){return l},toc:function(){return s},default:function(){return p}});var n=r(22122),i=r(19756),o=(r(67294),r(3905)),a={title:"FAQ"},l={unversionedId:"FAQ",id:"FAQ",isDocsHomePage:!1,title:"FAQ",description:"\x3c!--",source:"@site/docs/apisix-ingress-controller/FAQ.md",sourceDirName:".",slug:"/FAQ",permalink:"/docs/ingress-controller/FAQ",editUrl:"https://github.com/apache/apisix-ingress-controller/edit/master/docs/en/latest/FAQ.md",version:"current",frontMatter:{title:"FAQ"},sidebar:"docs",previous:{title:"Contributing to apisix-ingress-controller",permalink:"/docs/ingress-controller/contribute"}},s=[],c={toc:s};function p(e){var t=e.components,r=(0,i.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"How to bind Service and Upstream?")),(0,o.kt)("p",null,"All resource objects are uniquely determined by the namespace / name / port combination Id. If the combined Id is the same, the ",(0,o.kt)("inlineCode",{parentName:"p"},"service")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"upstream")," will be considered as a binding relationship."),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"When modifying a CRD, how do other binding objects perceive it?")),(0,o.kt)("p",null,"This is a cascading update problem, see for details ",(0,o.kt)("a",{parentName:"p",href:"/docs/ingress-controller/design"},"apisix-ingress-controller Design ideas")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Can I mix CRDs and admin api to define routing rules?")),(0,o.kt)("p",null,"No, currently we are implementing one-way synchronization, that is, CRDs file -> Apache AIPSIX. If the configuration is modified separately through admin api, it will not be synchronized to CRDs in Kubernetes."),(0,o.kt)("p",null,"This is because CRDs are generally declared in the file system, and Apply to enter Kubernetes etcd, we follow the definition of CRDs and synchronize to Apache Apisix Data Plane, but the reverse will make the situation more complicated."),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},'Why there are some error logs like "list upstreams failed, err: http get failed, url: blahblahblah, err: status: 401"?')),(0,o.kt)("p",null,"So far apisix-ingress-controller doesn't support set admin_key for Apache APISIX, so when you deploy your APISIX cluster, admin_key should be removed from config."),(0,o.kt)("p",null,"Note since APISIX have two configuration files, the first is config.yaml, which contains the user specified configs, the other is config-default.yaml, which has all default items, config items in these two files will be merged. So admin_key in both files should be removed. You can customize these two configuration files and mount them to APISIX deployment."),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},"Failed to create route with ",(0,o.kt)("inlineCode",{parentName:"li"},"ApisixRoute"),"?")),(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," creates a route with CRD, it checks the ",(0,o.kt)("inlineCode",{parentName:"p"},"Endpoint")," resources in Kubernetes (matched by namespace_name_port). If the corresponding endpoint information is not found, the route will not be created and wait for the next retry."),(0,o.kt)("p",null,"Tips: The failure caused by empty upstream nodes is a limitation of Apache APISIX, related ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/3072"},"issue")),(0,o.kt)("ol",{start:6},(0,o.kt)("li",{parentName:"ol"},"What is the retry rule of ",(0,o.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller"),"?")),(0,o.kt)("p",null,"If an error occurs during the process of ",(0,o.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," parsing CRD and distributing the configuration to APISIX, a retry will be triggered."),(0,o.kt)("p",null,"The delayed retry method is adopted. After the first failure, it is retried once per second. After 5 retries are triggered, the slow retry strategy will be enabled, and the retry will be performed every 1 minute until it succeeds."),(0,o.kt)("ol",{start:7},(0,o.kt)("li",{parentName:"ol"},"What if the CRDs need to be updated when you upgrading apisix-ingress-controller?")),(0,o.kt)("p",null,"CRDs upgrading is special as helm chart will skip to apply these resources when they already exist."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"With the arrival of Helm 3, we removed the old crd-install hooks for a more simple methodology. There is now a special directory called crds that you can create in your chart to hold your CRDs. These CRDs are not templated, but will be installed by default when running a helm install for the chart. If the CRD already exists, it will be skipped with a warning. If you wish to skip the CRD installation step, you can pass the --skip-crds flag.")),(0,o.kt)("p",null,"In such a case, you may need to apply these CRDs by yourself."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -k samples/deploy/crd/\n")))}p.isMDXComponent=!0}}]);