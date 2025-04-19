"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[43991],{35318:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var o=r(27378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,a=function(e,t){if(null==e)return{};var r,o,a={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=o.createContext({}),c=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),h=c(r),m=a,d=h["".concat(s,".").concat(m)]||h[m]||u[m]||n;return r?o.createElement(d,i(i({ref:t},p),{},{components:r})):o.createElement(d,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,i=new Array(n);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<n;c++)i[c]=r[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}h.displayName="MDXCreateElement"},53009:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>n,metadata:()=>l,toc:()=>c});var o=r(25773),a=(r(27378),r(35318));const n={title:"Hardening Apache APISIX with the OWASP's Coraza and Core Ruleset",authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258"}],keywords:["APISIX","OWASP","Coraza"],description:"The Open Worldwide Application Security Project is an online community that produces freely available articles, methodologies, documentation, tools, and technologies in the fields of IoT, system software and web application security. The OWASP provides free and open resources. It is led by a non-profit called The OWASP Foundation. The OWASP Top 10 - 2021 is the published result of recent research based on comprehensive data compiled from over 40 partner organizations. The OWASP regularly publishes a Top 10 vulnerability report. The report targets vulnerabilities in web applications. In this post, I'd like to describe how to fix some of them via the Apache APISIX API Gateway.\n",tags:["Ecosystem"],image:"https://static.apiseven.com/uploads/2024/02/10/vVlFQu7C_img-HDlf4Xx9m1iqS0Ico3oBZ.png"},i=void 0,l={permalink:"/blog/2024/02/13/apisix-owasp-coraza-core-ruleset",source:"@site/blog/2024/02/13/apisix-owasp-coraza-core-ruleset.md",title:"Hardening Apache APISIX with the OWASP's Coraza and Core Ruleset",description:"The Open Worldwide Application Security Project is an online community that produces freely available articles, methodologies, documentation, tools, and technologies in the fields of IoT, system software and web application security. The OWASP provides free and open resources. It is led by a non-profit called The OWASP Foundation. The OWASP Top 10 - 2021 is the published result of recent research based on comprehensive data compiled from over 40 partner organizations. The OWASP regularly publishes a Top 10 vulnerability report. The report targets vulnerabilities in web applications. In this post, I'd like to describe how to fix some of them via the Apache APISIX API Gateway.\n",date:"2024-02-13T00:00:00.000Z",formattedDate:"February 13, 2024",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:5.61,truncated:!0,authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258",imageURL:"https://avatars.githubusercontent.com/u/752258"}],prevItem:{title:"Secure your API with these 16 Practices with Apache APISIX - part 1",permalink:"/blog/2024/02/20/secure-api-practices-apisix-1"},nextItem:{title:"Unlock All-in-One Observability for APISIX with DeepFlow",permalink:"/blog/2024/02/07/unlock-observability-for-apisix-with-deepflow"}},s={authorsImageUrls:[void 0]},c=[],p={toc:c};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("head",null,(0,a.kt)("link",{rel:"canonical",href:"https://blog.frankel.ch/apisix-owasp-coraza-core-ruleset/"})),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"In this post, I'd like to describe how to fix some of them via the ",(0,a.kt)("a",{parentName:"p",href:"https://apisix.apache.org/"},"Apache APISIX API Gateway"),".")))}u.isMDXComponent=!0}}]);