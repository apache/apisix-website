"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[97901],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return h}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),f=c(r),h=o,d=f["".concat(u,".").concat(h)]||f[h]||p[h]||i;return r?n.createElement(d,a(a({ref:t},l),{},{components:r})):n.createElement(d,a({ref:t},l))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=f;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},8269:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return u},assets:function(){return c},toc:function(){return l},default:function(){return f}});var n=r(87462),o=r(63366),i=(r(67294),r(3905)),a={title:"Apache APISIX's intergration with Azure Serverless",author:"Bisakh Mondal",authorURL:"https://github.com/bisakhmondal",authorImageURL:"https://avatars.githubusercontent.com/u/41498427?v=4",keywords:["Apache APISIX","Azure Functions","Microsoft","Serverless"],description:"This article talks about the recent addition of a new plugin `azure-functions`, and gives detailed instructions on how to integrate Azure Functions, which is a widely used serverless solution, into the Apache APISIX serverless suite.",tags:["Technology"]},s=void 0,u={permalink:"/blog/2021/12/01/apisix-supports-azure-functions",source:"@site/blog/2021/12/01/apisix-supports-azure-functions.md",title:"Apache APISIX's intergration with Azure Serverless",description:"This article talks about the recent addition of a new plugin `azure-functions`, and gives detailed instructions on how to integrate Azure Functions, which is a widely used serverless solution, into the Apache APISIX serverless suite.",date:"2021-12-01T00:00:00.000Z",formattedDate:"December 1, 2021",tags:[{label:"Technology",permalink:"/blog/tags/technology"}],readingTime:6.975,truncated:!0,authors:[{name:"Bisakh Mondal",url:"https://github.com/bisakhmondal",imageURL:"https://avatars.githubusercontent.com/u/41498427?v=4"}],prevItem:{title:"Biweekly Report\uff5c11.15-11.30 Feature Highlights Update in Progress",permalink:"/blog/2021/12/02/weekly-report-1130"},nextItem:{title:"Apache APISIX 2.11.0 is officially released with more new features",permalink:"/blog/2021/12/01/release-apache-apisix-2.11"}},c={authorsImageUrls:[void 0]},l=[],p={toc:l};function f(e){var t=e.components,r=(0,o.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"This article talks about the recent addition of a new plugin ",(0,i.kt)("inlineCode",{parentName:"p"},"azure-functions"),", and gives detailed instructions on how to integrate Azure Functions, which is a widely used serverless solution, into the Apache APISIX serverless suite.")))}f.isMDXComponent=!0}}]);