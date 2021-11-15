"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[29114],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return g}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=p(r),g=a,f=d["".concat(l,".").concat(g)]||d[g]||s[g]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},87903:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return l},assets:function(){return p},toc:function(){return u},default:function(){return d}});var n=r(87462),a=r(63366),o=(r(67294),r(3905)),i={title:"Cloud Monitoring with Datadog in Apache APISIX",author:"Bisakh Mondal",authorURL:"https://github.com/bisakhmondal",authorImageURL:"https://avatars.githubusercontent.com/u/41498427?v=4",keywords:["Apache APISIX","Datadog","Observability","Cloud Monitoring"],description:"Apache APISIX recently released a new plugin APISIX-Datadog, to provide a deeper integration with Datadog. This article introduces the APISIX-Datadog Plugin and its capabilities.",tags:["Technology"]},c=void 0,l={permalink:"/blog/2021/11/12/apisix-datadog",source:"@site/blog/2021/11/12/apisix-datadog.md",title:"Cloud Monitoring with Datadog in Apache APISIX",description:"Apache APISIX recently released a new plugin APISIX-Datadog, to provide a deeper integration with Datadog. This article introduces the APISIX-Datadog Plugin and its capabilities.",date:"2021-11-12T00:00:00.000Z",formattedDate:"November 12, 2021",tags:[{label:"Technology",permalink:"/blog/tags/technology"}],readingTime:5.685,truncated:!0,authors:[{name:"Bisakh Mondal",url:"https://github.com/bisakhmondal",imageURL:"https://avatars.githubusercontent.com/u/41498427?v=4"}],prevItem:{title:"Weekly Report\uff5c11.1-11.4 Feature Highlights Update in Progress",permalink:"/blog/2021/11/16/weekly-report-1114"},nextItem:{title:"The observability of Apache APISIX",permalink:"/blog/2021/11/04/skywalking"}},p={authorsImageUrls:[void 0]},u=[],s={toc:u};function d(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Apache APISIX recently released a new plugin: ",(0,o.kt)("a",{parentName:"p",href:"http://apisix.apache.org/docs/apisix/next/plugins/datadog"},"APISIX-Datadog"),", to provide a deeper integration with Datadog. This article introduces the APISIX-Datadog Plugin and its capabilities.")))}d.isMDXComponent=!0}}]);