"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[29877],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),h=c(r),m=a,d=h["".concat(p,".").concat(m)]||h[m]||l[m]||o;return r?n.createElement(d,i(i({ref:t},u),{},{components:r})):n.createElement(d,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=h;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},60618:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return p},assets:function(){return c},toc:function(){return u},default:function(){return h}});var n=r(87462),a=r(63366),o=(r(67294),r(3905)),i={title:"Weekly Report\uff5c10.15-10.31 Feature Highlights Update in Progress",keywords:["Apache APISIX","Weekly Report","Contributor","APISIX","API Gateway","Apache"],description:"The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.",tags:["Events"]},s=void 0,p={permalink:"/blog/2021/11/02/weekly-report-1031",source:"@site/blog/2021/11/02/weekly-report-1031.md",title:"Weekly Report\uff5c10.15-10.31 Feature Highlights Update in Progress",description:"The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.",date:"2021-11-02T00:00:00.000Z",formattedDate:"November 2, 2021",tags:[{label:"Events",permalink:"/blog/tags/events"}],readingTime:3.605,truncated:!0,authors:[],nextItem:{title:"Apache APISIX Extensions Guide",permalink:"/blog/2021/10/29/Extension-guide"}},c={authorsImageUrls:[]},u=[{value:"Introduction",id:"introduction",children:[]},{value:"Contributor Statistics",id:"contributor-statistics",children:[]},{value:"Good first issue",id:"good-first-issue",children:[{value:"Issue #686",id:"issue-686",children:[]},{value:"Issue #5305",id:"issue-5305",children:[]},{value:"Issue #5342",id:"issue-5342",children:[]},{value:"Issue #5343",id:"issue-5343",children:[]}]},{value:"Highlights of Recent Features",id:"highlights-of-recent-features",children:[]},{value:"Recent Blog Recommendations",id:"recent-blog-recommendations",children:[]}],l={toc:u};function h(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"From 10.15 to 10.31, 31 contributors submitted 93 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!")),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners."),(0,o.kt)("p",null,'"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.'),(0,o.kt)("p",null,"We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!"),(0,o.kt)("h2",{id:"contributor-statistics"},"Contributor Statistics"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1635733917401-732f84d0-24a1-4c31-acea-4e45f5e56816.png",alt:"Contributors List"})),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1635735281818-c6cb23ce-4242-44ee-a569-38a46b607253.31eng",alt:"New Contributors"})),(0,o.kt)("h2",{id:"good-first-issue"},"Good first issue"),(0,o.kt)("h3",{id:"issue-686"},"Issue #686"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Link"),": ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-website/issues/686"},"https://github.com/apache/apisix-website/issues/686")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Issue description"),": In order to speed up the loading speed of pictures/images on the Apache APISIX official website, we need to migrate all pictures/images to CDN."),(0,o.kt)("h3",{id:"issue-5305"},"Issue #5305"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Link"),": ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/5305"},"https://github.com/apache/apisix/issues/5305")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Issue description"),":"),(0,o.kt)("p",null,'Currently I has test the proxy-mirror plugin in apisix, but I find that the feature of this plugin is different from the ngx_http_mirror_module in nginx. The mirror moudle of nginx can add the uri behind the host in "proxy_pass" directive, for example:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-Groovy"},"location / {\nmirror /mirror;\nproxy_pass http://backend;\n}\n\nlocation = /mirror {\ninternal;\nproxy_pass http://test_backend$request_uri;\n}\n")),(0,o.kt)("p",null,"But when I test the proxy-mirror plugin in apisix dashboard, it prompts a message that the blank cannot be filled with URI. Will the proxy-mirror plugin be optimized to support the URI?"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1635734126653-8fe4c1e7-5b9a-4e78-b747-fb30cbae7f36.png",alt:"Issue Screenshot"})),(0,o.kt)("h3",{id:"issue-5342"},"Issue #5342"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Link"),": ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/5342"},"https://github.com/apache/apisix/issues/5342")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Issue description"),": Share limit counter between routes."),(0,o.kt)("p",null,"To do this, you need to specify the key of the route's corresponding limit-count in lrucache so that the same limit object is shared across multiple routes. lrucache keys (hereafter called groups to distinguish them from limit keys) are currently generated automatically, ensuring that each route's group is independent. For this change, we need to be able to specify the group in the limit-count."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'"limit-count": {\n        "group": "group_id_blah"\n        "count": 2,\n        "time_window": 60,\n        "rejected_code": 503,\n        "key": "remote_addr"\n}\n')),(0,o.kt)("p",null,"Note that the configuration of the same group needs to be the same, which currently needs to be guaranteed by the caller, otherwise the limit object obtained by the group will be different from the configuration."),(0,o.kt)("h3",{id:"issue-5343"},"Issue #5343"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Link"),": ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/issues/5343"},"https://github.com/apache/apisix/issues/5343")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Issue description"),": Add a request_body switch to the schema, and each body can be used by expr to decide whether to log or not. Without this switch, the body is not logged."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'"kafka-logger": {\n   "broker_list":{\n       "127.0.0.1":9092\n    },\n   "kafka_topic" : "test2",\n   "request_body": {\n       "expr": [\n          ["request_length", "<", "1024"],\n       ]\n   },\n   "key" : "key1",\n   "batch_max_size": 1,\n   "name": "kafka logger"\n}\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"expr")," can be evaluated by lua-resty-expr. request body can be fetched by core.request.get_body."),(0,o.kt)("h2",{id:"highlights-of-recent-features"},"Highlights of Recent Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/pull/698"},"APISIX Ingress introduces custom resources of ApisixRoute v2beta2 version, and discards the backend field"),"\uff08Contributor: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tao12345666333"},"tao12345666333"),"\uff09")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/pull/697"},"APISIX Ingress upgraded the CRD resource version to v1 to better support K8s v1.22 and above"),"\uff08Contributor: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tao12345666333"},"tao12345666333"),"\uff09")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/pull/699"},"APISIX Ingress adds documentation on how to use gRPC proxy"),"\uff08Contributor: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/gxthrj"},"gxthrj"),"\uff09")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard/pull/2099"},"APISIX Dashboard supports proto management API"),"\uff08Contributor: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/bzp2010"},"bzp2010"),"\uff09")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard/pull/2178"},"APISIX Dashboard supports transferring dashboard static resources as gzip"),"\uff08Contributor: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/nic-6443"},"nic-6443"),"\uff09"))),(0,o.kt)("p",null,"The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience."),(0,o.kt)("h2",{id:"recent-blog-recommendations"},"Recent Blog Recommendations"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"http://apisix.apache.org/blog/2021/10/29/Extension-guide"},"Apache APISIX Extensions Guide"),"\uff1a"),(0,o.kt)("p",{parentName:"li"},"This article provides an extension guide for Apache APISIX, aiming to provide users with some ideas for extending Apache APISIX.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/blog/2021/10/26/APISIX-Ingress/"},"From 0 to 1, How APISIX Ingress Has Grown and Gained Since Joining The Community"),"\uff1a"),(0,o.kt)("p",{parentName:"li"},"This article describes the growth of APISIX Ingress and the details of the enhancements and community help that APISIX Ingress has received since joining the community.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/blog/2021/10/22/cert-manager-in-ingress/"},"Tutorial: How to use Cert Manager to manage certificates in Apache APISIX Ingress Controller"),"\uff1a"),(0,o.kt)("p",{parentName:"li"},"This article shows how to create a certificate and pair it with Apache APISIX Ingress Controller via the Cert Manager."))))}h.isMDXComponent=!0}}]);