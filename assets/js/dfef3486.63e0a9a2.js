"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[27934],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),h=u(r),d=i,b=h["".concat(s,".").concat(d)]||h[d]||c[d]||a;return r?n.createElement(b,o(o({ref:t},p),{},{components:r})):n.createElement(b,o({ref:t},p))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var u=2;u<a;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},48193:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return s},assets:function(){return u},toc:function(){return p},default:function(){return h}});var n=r(87462),i=r(63366),a=(r(67294),r(3905)),o={title:"Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)",author:"Sylvia",authorURL:"https://github.com/SylviaBABY",authorImageURL:"https://avatars.githubusercontent.com/u/39793568?v=4",keywords:["APISIX","Apache APISIX","Ingress Controller","Request_uri"],description:'In versions prior to Apache APISIX 2.10.2, there was a problem of "bypassing partial restrictions" that caused the risk of path penetration by using the $request_uri variable in Apache APISIX Ingress Controller.',tags:["Security"]},l=void 0,s={permalink:"/blog/2021/11/23/cve-2021-43557",source:"@site/blog/2021/11/23/cve-2021-43557.md",title:"Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)",description:'In versions prior to Apache APISIX 2.10.2, there was a problem of "bypassing partial restrictions" that caused the risk of path penetration by using the $request_uri variable in Apache APISIX Ingress Controller.',date:"2021-11-23T00:00:00.000Z",formattedDate:"November 23, 2021",tags:[{label:"Security",permalink:"/blog/tags/security"}],readingTime:1.54,truncated:!0,authors:[{name:"Sylvia",url:"https://github.com/SylviaBABY",imageURL:"https://avatars.githubusercontent.com/u/39793568?v=4"}],prevItem:{title:"Apache APISIX Path traversal in request_uri variable(CVE-2021-43557)",permalink:"/blog/2021/11/23/cve-2021-43557-research-report"},nextItem:{title:"Developing APISIX Ingress Controller with Nocalhost in Kubernetes",permalink:"/blog/2021/11/22/develop-apisix-ingress-with-nocalhost-in-kubernetes"}},u={authorsImageUrls:[void 0]},p=[{value:"Problem Description",id:"problem-description",children:[]},{value:"Affected Versions",id:"affected-versions",children:[]},{value:"Solution",id:"solution",children:[]},{value:"Vulnerability details",id:"vulnerability-details",children:[]},{value:"Contributor Profile",id:"contributor-profile",children:[]}],c={toc:p};function h(e){var t=e.components,r=(0,i.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},'In versions prior to Apache APISIX 2.10.2, there was a problem of "bypassing partial restrictions" that caused the risk of path penetration by using the $request_uri variable in Apache APISIX Ingress Controller.')),(0,a.kt)("h2",{id:"problem-description"},"Problem Description"),(0,a.kt)("p",null,'In versions prior to Apache APISIX 2.10.2, there was a problem of "bypassing partial restrictions" that caused the risk of path penetration by using the $request_uri variable in Apache APISIX Ingress Controller.'),(0,a.kt)("p",null,"When using the ",(0,a.kt)("inlineCode",{parentName:"p"},"uri-blocker")," plug-in to test the scenario, we found that:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'$ ./apisix_request.sh "/public-service/public"\nDefaulted container "apisix" out of: apisix, wait-etcd (init)\n{"data":"public data"}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'$ ./apisix_request.sh "/protected-service/protected"\nDefaulted container "apisix" out of: apisix, wait-etcd (init)\n<html>\n<head><title>403 Forbidden</title></head>\n<body>\n<center><h1>403 Forbidden</h1></center>\n<hr><center>openresty</center>\n</body>\n</html>\n')),(0,a.kt)("p",null,"In both scenarios, ",(0,a.kt)("inlineCode",{parentName:"p"},"public-service")," is available and ",(0,a.kt)("inlineCode",{parentName:"p"},"protected-service")," is blocked by plug-ins. After the verification and testing of the above scenarios, it is found that both cases can bypass the limitations of Uri."),(0,a.kt)("p",null,"Due to the improper use of ",(0,a.kt)("inlineCode",{parentName:"p"},"ctx.var.require_uri")," variables by the ",(0,a.kt)("inlineCode",{parentName:"p"},"uri-blocker")," plug-in, the following results:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Attacker can bypass access control restrictions and perform successful access to routes that shouldn\u2019t be able to;"),(0,a.kt)("li",{parentName:"ul"},"Developers of custom plugins have no knowledge that ",(0,a.kt)("inlineCode",{parentName:"li"},"ngx.var.request_uri")," variable is untrusted.")),(0,a.kt)("h2",{id:"affected-versions"},"Affected Versions"),(0,a.kt)("p",null,"All versions of Apache APISIX prior to 2.10.2 (excluding 2.10.2)"),(0,a.kt)("h2",{id:"solution"},"Solution"),(0,a.kt)("p",null,"This issue has been resolved in version ",(0,a.kt)("a",{parentName:"p",href:"http://apisix.apache.org/downloads/"},"2.10.2")," +, please update to the relevant version as soon as possible."),(0,a.kt)("p",null,"In case of custom plugins, we suggest to do path normalization before using ",(0,a.kt)("inlineCode",{parentName:"p"},"ngx.var.request_uri")," variable. There are also two other variables, high probably normalized, to check ",(0,a.kt)("inlineCode",{parentName:"p"},"ctx.var.upstream_uri")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"ctx.var.uri"),"."),(0,a.kt)("h2",{id:"vulnerability-details"},"Vulnerability details"),(0,a.kt)("p",null,"Vulnerability public date: November 22, 2021\nCVE details: ",(0,a.kt)("a",{parentName:"p",href:"https://nvd.nist.gov/vuln/detail/CVE-2021-43557"},"https://nvd.nist.gov/vuln/detail/CVE-2021-43557")),(0,a.kt)("h2",{id:"contributor-profile"},"Contributor Profile"),(0,a.kt)("p",null,"The vulnerability was discovered by community user Marcin Niemiec (GitHub",(0,a.kt)("a",{parentName:"p",href:"https://github.com/xvnpw"},"@xvnpw"),") and reported to the Apache Software Foundation in a timely manner."),(0,a.kt)("p",null,"Thanks to Marcin Niemiec for his contribution to the Apache APISIX community."))}h.isMDXComponent=!0}}]);