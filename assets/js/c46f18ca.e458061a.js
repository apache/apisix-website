(self.webpackChunk=self.webpackChunk||[]).push([[92559],{3905:function(e,t,a){"use strict";a.d(t,{Zo:function(){return c},kt:function(){return m}});var r=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,i=function(e,t){if(null==e)return{};var a,r,i={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var u=r.createContext({}),o=function(e){var t=r.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},c=function(e){var t=o(e.components);return r.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var a=e.components,i=e.mdxType,n=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=o(a),m=i,f=h["".concat(u,".").concat(m)]||h[m]||s[m]||n;return a?r.createElement(f,p(p({ref:t},c),{},{components:a})):r.createElement(f,p({ref:t},c))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=a.length,p=new Array(n);p[0]=h;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:i,p[1]=l;for(var o=2;o<n;o++)p[o]=a[o];return r.createElement.apply(null,p)}return r.createElement.apply(null,a)}h.displayName="MDXCreateElement"},12804:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return p},metadata:function(){return l},toc:function(){return u},default:function(){return c}});var r=a(22122),i=a(19756),n=(a(67294),a(3905)),p={title:"Release Apache APISIX 2.9",tags:["APISIX"]},l={permalink:"/releases/2021/08/27/release-apache-apisix-2.9",source:"@site/releases/2021-8-27-release-apache-apisix-2.9.md",title:"Release Apache APISIX 2.9",description:"Change",date:"2021-08-27T00:00:00.000Z",formattedDate:"August 27, 2021",tags:[{label:"APISIX",permalink:"/releases/tags/apisix"}],readingTime:1.125,truncated:!1,prevItem:{title:"Release Apache APISIX Go Plugin Runner 0.2.0",permalink:"/releases/2021/09/03/release-apache-apisix-go-plugin-runner-0.2.0"},nextItem:{title:"Release Apache APISIX Ingress Controller 1.2.0",permalink:"/releases/2021/08/17/release-apache-apisix-ingress-controller-1.2.0"}},u=[{value:"Change",id:"change",children:[]},{value:"Core",id:"core",children:[]},{value:"Plugin",id:"plugin",children:[]},{value:"Bugfix",id:"bugfix",children:[]}],o={toc:u};function c(e){var t=e.components,a=(0,i.Z)(e,["components"]);return(0,n.kt)("wrapper",(0,r.Z)({},o,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h3",{id:"change"},"Change"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"change: rename plugin's balancer method to before_proxy ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4697"},"#4697"))),(0,n.kt)("h3",{id:"core"},"Core"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat: increase timers limitation ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4843"},"#4843")),(0,n.kt)("li",{parentName:"ul"},'\ud83c\udf05 feat: make A/B test APISIX easier by removing "additionalProperties = false" ',(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4797"},"#4797")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat: support dash in args (#4519) ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4676"},"#4676")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat(admin): reject invalid proto ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4750"},"#4750"))),(0,n.kt)("h3",{id:"plugin"},"Plugin"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat(ext-plugin): support ExtraInfo ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4835"},"#4835")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat(gzip): support special * to match any type ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4817"},"#4817")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat(real-ip): implement the first version ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4813"},"#4813")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat(limit-*): add custom reject-message for traffic control ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4808"},"#4808")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat: Request-ID plugin add snowflake algorithm ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4559"},"#4559")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat: Added authz-casbin plugin and doc and tests for it ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4710"},"#4710")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat: add error log skywalking reporter ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4633"},"#4633")),(0,n.kt)("li",{parentName:"ul"},"\ud83c\udf05 feat(ext-plugin): send the idempotent key when preparing conf ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4736"},"#4736"))),(0,n.kt)("h3",{id:"bugfix"},"Bugfix"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"fix: the issue that plugins in global rule may be cached to route ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4867"},"#4867")),(0,n.kt)("li",{parentName:"ul"},"fix(grpc-transcode): support converting nested message ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4859"},"#4859")),(0,n.kt)("li",{parentName:"ul"},"fix(authz-keycloak): set permissions as empty table when lazy_load_path is false ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4845"},"#4845")),(0,n.kt)("li",{parentName:"ul"},"fix(proxy-cache): keep cache_method same with nginx's proxy_cache_methods ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4814"},"#4814")),(0,n.kt)("li",{parentName:"ul"},"fix(admin): inject updatetime when the requst is PATCH with sub path ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4765"},"#4765")),(0,n.kt)("li",{parentName:"ul"},"fix(admin): check username for updating consumer ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4756"},"#4756")),(0,n.kt)("li",{parentName:"ul"},"fix(error-log-logger): avoid sending stale error log ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4690"},"#4690")),(0,n.kt)("li",{parentName:"ul"},"fix(grpc-transcode): handle enum type ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4706"},"#4706")),(0,n.kt)("li",{parentName:"ul"},"fix: when a request caused a 500 error, the status was converted to 405 ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/pull/4696"},"#4696"))))}c.isMDXComponent=!0}}]);