"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5553],{35318:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var r=n(27378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=l(n),g=a,h=m["".concat(c,".").concat(g)]||m[g]||u[g]||i;return n?r.createElement(h,o(o({ref:t},s),{},{components:n})):r.createElement(h,o({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},98350:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(25773),a=(n(27378),n(35318));const i={title:"Announcing Integration between Apache APISIX and open-appsec WAF",authors:[{name:"Christopher Lutat",title:"Author",url:"https://github.com/ByteSkater",image_url:"https://github.com/ByteSkater.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png"}],keywords:["API gateway","Apache APISIX","WAF","Open-appsec","Machine Learning","API Security","Open Source"],description:"Let's protect your web APIs and applications exposed by Apache APISIX against known and unknown attacks with open-appsec - the automatic, machine learning-based WAF.",tags:["Ecosystem"],image:"https://static.apiseven.com/uploads/2024/10/18/8d1iVJWL_logo%20x%20open-appsec.png"},o=void 0,p={permalink:"/blog/2024/10/22/apisix-integrates-with-open-appsec",source:"@site/blog/2024/10/22/apisix-integrates-with-open-appsec.md",title:"Announcing Integration between Apache APISIX and open-appsec WAF",description:"Let's protect your web APIs and applications exposed by Apache APISIX against known and unknown attacks with open-appsec - the automatic, machine learning-based WAF.",date:"2024-10-22T00:00:00.000Z",formattedDate:"October 22, 2024",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:12.91,truncated:!0,authors:[{name:"Christopher Lutat",title:"Author",url:"https://github.com/ByteSkater",image_url:"https://github.com/ByteSkater.png",imageURL:"https://github.com/ByteSkater.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png",imageURL:"https://github.com/Yilialinn.png"}],prevItem:{title:"Bi-Monthly Report (October 01 - November 30)",permalink:"/blog/2024/11/30/bi-monthly-report"},nextItem:{title:"Release Apache APISIX 3.11.0",permalink:"/blog/2024/10/17/release-apache-apisix-3.11.0"}},c={authorsImageUrls:[void 0,void 0]},l=[],s={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"We are excited to announce a new integration between Apache APISIX and open-appsec WAF, combining the power of a dynamic API gateway with cutting-edge application security.")))}u.isMDXComponent=!0}}]);