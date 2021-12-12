"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[27400],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=u(n),f=o,h=m["".concat(c,".").concat(f)]||m[f]||p[f]||a;return n?r.createElement(h,i(i({ref:t},l),{},{components:n})):r.createElement(h,i({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},39919:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return u},toc:function(){return l},default:function(){return m}});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),i={title:"Run Ingress APISIX on Amazon EKS",author:"Chao Zhang",authorURL:"https://github.com/tokers",authorImageURL:"https://avatars0.githubusercontent.com/u/10428333?s=60&v=4",keywords:["API Gateway","APISIX","Apache APISIX","Ingress","Amazon EKS"],description:"Amazon EKS provides flexibility to start, run, and scale Kubernetes applications in the AWS cloud or on-premises. This article explains how to run Ingress APISIX on it.This article explains how to run Ingress APISIX on Amazon EKS.",tags:["Practical Case"]},s=void 0,c={permalink:"/zh/blog/2021/01/21/run-ingress-apisix-on-amazon-eks",source:"@site/blog/2021/01/21/run-ingress-apisix-on-amazon-eks.md",title:"Run Ingress APISIX on Amazon EKS",description:"Amazon EKS provides flexibility to start, run, and scale Kubernetes applications in the AWS cloud or on-premises. This article explains how to run Ingress APISIX on it.This article explains how to run Ingress APISIX on Amazon EKS.",date:"2021-01-21T00:00:00.000Z",formattedDate:"2021\u5e741\u670821\u65e5",tags:[{label:"Practical Case",permalink:"/zh/blog/tags/practical-case"}],readingTime:4.225,truncated:!0,authors:[{name:"Chao Zhang",url:"https://github.com/tokers",imageURL:"https://avatars0.githubusercontent.com/u/10428333?s=60&v=4"}],prevItem:{title:"Stable Product Delivery with Cypress",permalink:"/zh/blog/2021/02/08/stable-product-delivery-with-cypress"},nextItem:{title:"Apache APISIX \u8d21\u732e\u8005\u4e13\u8bbf | \u666e\u534e\u6c38\u9053\u534e\u5357\u6570\u636e\u5b89\u5168\u4e0e\u9690\u79c1\u4fdd\u62a4\u56e2\u961f\u9ad8\u7ea7\u5b89\u5168\u987e\u95ee\u738b\u9e4f\u8bda",permalink:"/zh/blog/2021/01/11/interview-Apache-APISIX-contributor-Wang-Pengcheng-Senior-Security-Advisor-of-PwC-South-China-Data-Security-and-Privacy-Protection-Team"}},u={authorsImageUrls:[void 0]},l=[],p={toc:l};function m(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Amazon EKS provides flexibility to start, run, and scale Kubernetes applications in the AWS cloud or on-premises. This article explains how to run Ingress APISIX on it.This article explains how to run Ingress APISIX on Amazon EKS.")))}m.isMDXComponent=!0}}]);