"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[75159],{35318:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>h});var r=a(27378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(a),h=n,f=m["".concat(s,".").concat(h)]||m[h]||u[h]||o;return a?r.createElement(f,i(i({ref:t},p),{},{components:a})):r.createElement(f,i({ref:t},p))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=a[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},51802:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=a(25773),n=(a(27378),a(35318));const o={title:"Advanced URL rewriting with Apache APISIX",authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258"}],keywords:["APISIX","URL","URL rewriting"],description:"I spoke at Swiss PgDay in Switzerland in late June. The talk was about how to create a no-code API with the famous PostgreSQL database, the related PostgREST, and Apache APISIX, of course. I already wrote about the idea in a previous post. However, I wanted to improve it, if only slightly. PostgREST offers a powerful `SELECT` mechanism. To list all entities with a column equal to a value, you need the following command: curl /products?id=eq.1.\n",tags:["Ecosystem"],image:"https://static.apiseven.com/uploads/2024/07/11/zFguMrgf_notebook-1840276.jpg"},i=void 0,l={permalink:"/blog/2024/07/18/advanced-url-rewrite-apisix",source:"@site/blog/2024/07/18/advanced-url-rewrite-apisix.md",title:"Advanced URL rewriting with Apache APISIX",description:"I spoke at Swiss PgDay in Switzerland in late June. The talk was about how to create a no-code API with the famous PostgreSQL database, the related PostgREST, and Apache APISIX, of course. I already wrote about the idea in a previous post. However, I wanted to improve it, if only slightly. PostgREST offers a powerful `SELECT` mechanism. To list all entities with a column equal to a value, you need the following command: curl /products?id=eq.1.\n",date:"2024-07-18T00:00:00.000Z",formattedDate:"July 18, 2024",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:2.295,truncated:!0,authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258",imageURL:"https://avatars.githubusercontent.com/u/752258"}],prevItem:{title:"Differentiating rate limits in Apache APISIX",permalink:"/blog/2024/07/25/different-rate-limits-apisix"},nextItem:{title:"Dynamic watermarking with imgproxy and Apache APISIX",permalink:"/blog/2024/07/11/watermarking-infrastructure"}},s={authorsImageUrls:[void 0]},c=[],p={toc:c};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("head",null,(0,n.kt)("link",{rel:"canonical",href:"https://blog.frankel.ch/advanced-url-rewrite-apisix/"})),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"I spoke at ",(0,n.kt)("a",{parentName:"p",href:"https://www.pgday.ch/2024/#schedule"},"Swiss PgDay")," in Switzerland in late June. The talk was about how to create a no-code API with the famous ",(0,n.kt)("a",{parentName:"p",href:"https://www.postgresql.org/"},"PostgreSQL")," database, the related ",(0,n.kt)("a",{parentName:"p",href:"https://postgrest.org/"},"PostgREST"),", and ",(0,n.kt)("a",{parentName:"p",href:"https://apisix.apache.org"},"Apache APISIX"),", of course. I already wrote about the idea in a ",(0,n.kt)("a",{parentName:"p",href:"https://blog.frankel.ch/poor-man-api/"},"previous post"),". However, I wanted to improve it, if only slightly."),(0,n.kt)("p",{parentName:"blockquote"},"PostgREST offers a powerful ",(0,n.kt)("inlineCode",{parentName:"p"},"SELECT")," mechanism. To list all entities with a column equal to a value, you need the following command:")))}u.isMDXComponent=!0}}]);