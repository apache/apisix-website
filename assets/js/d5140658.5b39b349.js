"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[12240],{35318:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>d});var r=a(27378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),h=p(a),d=n,m=h["".concat(s,".").concat(d)]||h[d]||c[d]||o;return a?r.createElement(m,i(i({ref:t},u),{},{components:a})):r.createElement(m,i({ref:t},u))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var p=2;p<o;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}h.displayName="MDXCreateElement"},57285:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=a(25773),n=(a(27378),a(35318));const o={title:"Advanced URL rewriting with Apache APISIX",authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258"}],keywords:["APISIX","URL","URL rewriting"],description:"I spoke at Swiss PgDay in Switzerland in late June. The talk was about how to create a no-code API with the famous PostgreSQL database, the related PostgREST, and Apache APISIX, of course. I already wrote about the idea in a previous post. However, I wanted to improve it, if only slightly. PostgREST offers a powerful `SELECT` mechanism. To list all entities with a column equal to a value, you need the following command: curl /products?id=eq.1.\n",tags:["Ecosystem"],image:"https://static.apiseven.com/uploads/2024/07/11/zFguMrgf_notebook-1840276.jpg"},i=void 0,l={permalink:"/blog/2024/07/18/advanced-url-rewrite-apisix",source:"@site/blog/2024/07/18/advanced-url-rewrite-apisix.md",title:"Advanced URL rewriting with Apache APISIX",description:"I spoke at Swiss PgDay in Switzerland in late June. The talk was about how to create a no-code API with the famous PostgreSQL database, the related PostgREST, and Apache APISIX, of course. I already wrote about the idea in a previous post. However, I wanted to improve it, if only slightly. PostgREST offers a powerful `SELECT` mechanism. To list all entities with a column equal to a value, you need the following command: curl /products?id=eq.1.\n",date:"2024-07-18T00:00:00.000Z",formattedDate:"July 18, 2024",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:2.295,truncated:!0,authors:[{name:"Nicolas Fr\xe4nkel",title:"Author",url:"https://github.com/nfrankel",image_url:"https://avatars.githubusercontent.com/u/752258",imageURL:"https://avatars.githubusercontent.com/u/752258"}],prevItem:{title:"Differentiating rate limits in Apache APISIX",permalink:"/blog/2024/07/25/different-rate-limits-apisix"},nextItem:{title:"Dynamic watermarking with imgproxy and Apache APISIX",permalink:"/blog/2024/07/11/watermarking-infrastructure"}},s={authorsImageUrls:[void 0]},p=[{value:"Conclusion",id:"conclusion",children:[],level:2}],u={toc:p};function c(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("head",null,(0,n.kt)("link",{rel:"canonical",href:"https://blog.frankel.ch/advanced-url-rewrite-apisix/"})),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"I spoke at ",(0,n.kt)("a",{parentName:"p",href:"https://www.pgday.ch/2024/#schedule"},"Swiss PgDay")," in Switzerland in late June. The talk was about how to create a no-code API with the famous ",(0,n.kt)("a",{parentName:"p",href:"https://www.postgresql.org/"},"PostgreSQL")," database, the related ",(0,n.kt)("a",{parentName:"p",href:"https://postgrest.org/"},"PostgREST"),", and ",(0,n.kt)("a",{parentName:"p",href:"https://apisix.apache.org"},"Apache APISIX"),", of course. I already wrote about the idea in a ",(0,n.kt)("a",{parentName:"p",href:"https://blog.frankel.ch/poor-man-api/"},"previous post"),". However, I wanted to improve it, if only slightly."),(0,n.kt)("p",{parentName:"blockquote"},"PostgREST offers a powerful ",(0,n.kt)("inlineCode",{parentName:"p"},"SELECT")," mechanism. To list all entities with a column equal to a value, you need the following command:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"curl /products?id=eq.1\n")),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},"id")," is the column"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},"eq.1")," corresponds to the ",(0,n.kt)("inlineCode",{parentName:"li"},"WHERE")," clause")),(0,n.kt)("p",null,"In this case, the generated query is ",(0,n.kt)("inlineCode",{parentName:"p"},"SELECT * FROM products WHERE id=1"),"."),(0,n.kt)("p",null,"The ",(0,n.kt)("a",{parentName:"p",href:"https://postgrest.org/en/v12/references/api/tables_views.html#get-and-head"},"query syntax")," is powerful and allows you to express complex queries. However, as an API designer, I want to avoid exposing users to this complexity. For example, a regular API can manage entities by their ID, ",(0,n.kt)("em",{parentName:"p"},"e.g."),", ",(0,n.kt)("inlineCode",{parentName:"p"},"/products/1"),". In turn, you'd expect PostgREST to be able to do the same with primary keys. Unfortunately, it doesn't treat primary keys any differently than regular columns. Apache APISIX to the rescue."),(0,n.kt)("p",null,"One of APISIX's best features is to rewrite requests, ",(0,n.kt)("em",{parentName:"p"},"i.e."),", exposing ",(0,n.kt)("inlineCode",{parentName:"p"},"/products/1")," and forwarding ",(0,n.kt)("inlineCode",{parentName:"p"},"/products?id=eq.1")," to PostgREST. Let's do it."),(0,n.kt)("p",null,"First, we need to capture the ID of the path parameter. For this, we need to replace the regular radix tree router with the radix tree with a parameter router."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n    router:\n        http: radixtree_uri_with_parameter\n")),(0,n.kt)("p",null,"The next step is to rewrite the URL. We use the ",(0,n.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/proxy-rewrite/"},"proxy-rewrite")," plugin for this on a ",(0,n.kt)("inlineCode",{parentName:"p"},"/products/:id")," route. Unfortunately, using the ",(0,n.kt)("inlineCode",{parentName:"p"},":id")," parameter above in the regular expression is impossible. We need to copy it to a place that is accessible. To do that, before the rewriting, we can leverage the ",(0,n.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/serverless/"},"serverless-pre-function"),". With the plugin, you can write Lua code directly. It's an excellent alternative to a full-fledged plugin for short, straightforward snippets."),(0,n.kt)("p",null,"Here's the configuration:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'curl -i http://localhost:9180/apisix/admin/plugin_configs/1 -X PUT -d \'\n{\n  "plugins": {\n    "serverless-pre-function": {\n      "phase": "rewrite",\n      "functions" : [\n        "return function(_, ctx)\n          ctx.var.product_id = ctx.curr_req_matched.id;         #1\n        end"\n      ]\n    },\n    "proxy-rewrite": {\n      "uri": "/products?id=eq.$product_id"                      #2\n    }\n  }\n}\'\n')),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Copy the captured ",(0,n.kt)("inlineCode",{parentName:"li"},"id")," variable to a place accessible to other plugins later on"),(0,n.kt)("li",{parentName:"ol"},"Use it!")),(0,n.kt)("p",null,"Thanks to my colleague ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/bzp2010"},"Zeping")," for pointing out the solution to me!"),(0,n.kt)("p",null,"You can expose the ",(0,n.kt)("inlineCode",{parentName:"p"},"/products/1")," REST-friendly URL and let APISIX rewrite it for PostgREST."),(0,n.kt)("h2",{id:"conclusion"},"Conclusion"),(0,n.kt)("p",null,"I've described using the ",(0,n.kt)("inlineCode",{parentName:"p"},"proxy-rewrite")," plugin with a path variable in this post. You can reuse the same technique with multiple variables. Keep also in mind that the ",(0,n.kt)("inlineCode",{parentName:"p"},"serverless")," plugin is a hidden jewel; it can help you with small Lua snippets before moving to a full-fledged plugin."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"To go further:")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://postgrest.org/en/v12/references"},"PostgREST")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://postgrest.org/en/v12/references/api/tables_views.html"},"PostgREST tables and views")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/plugins/serverless/"},"APISIX serverless plugin"))))}c.isMDXComponent=!0}}]);