"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[77746],{35318:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(27378);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=c(r),f=o,b=m["".concat(l,".").concat(f)]||m[f]||u[f]||a;return r?n.createElement(b,s(s({ref:t},p),{},{components:r})):n.createElement(b,s({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},30352:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(25773),o=(r(27378),r(35318));const a={title:"Apache APISIX loves Rust!",authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258"}],keywords:["API gateway","Apache APISIX","Rust","WebAssembly"],description:"This article shows the steps to perform to develop and deploy WebAssembly plugins from Rust.",tags:["Ecosystem"],image:"https://static.apiseven.com/2022/10/08/634113b161cce.png"},s=void 0,i={permalink:"/blog/2022/09/28/rust-loves-apisix",source:"@site/blog/2022/09/28/rust-loves-apisix.md",title:"Apache APISIX loves Rust!",description:"This article shows the steps to perform to develop and deploy WebAssembly plugins from Rust.",date:"2022-09-28T00:00:00.000Z",formattedDate:"September 28, 2022",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:5.48,truncated:!0,authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258",imageURL:"https://avatars.githubusercontent.com/u/752258"}],prevItem:{title:"Rewriting the Apache APISIX response-rewrite plugin in Rust",permalink:"/blog/2022/10/05/rust-apisix"},nextItem:{title:"Building event-driven API services using CQRS, API Gateway and Serverless",permalink:"/blog/2022/09/23/build-event-driven-api"}},l={authorsImageUrls:[void 0]},c=[],p={toc:c};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"This article shows the steps to perform to develop and deploy WebAssembly plugins from Rust.")))}u.isMDXComponent=!0}}]);