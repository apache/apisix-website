"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[49737],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=p(a),u=r,m=d["".concat(s,".").concat(u)]||d[u]||h[u]||i;return a?n.createElement(m,l(l({ref:t},c),{},{components:a})):n.createElement(m,l({ref:t},c))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8926:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var n=a(87462),r=(a(67294),a(3905));const i={title:"proxy-cache",keywords:["Apache APISIX","API Gateway","Proxy Cache"],description:"The proxy-cache Plugin caches responses based on keys, supporting disk and memory caching for GET, POST, and HEAD requests, enhancing API performance."},l=void 0,o={unversionedId:"plugins/proxy-cache",id:"version-3.12/plugins/proxy-cache",isDocsHomePage:!1,title:"proxy-cache",description:"The proxy-cache Plugin caches responses based on keys, supporting disk and memory caching for GET, POST, and HEAD requests, enhancing API performance.",source:"@site/docs-apisix_versioned_docs/version-3.12/plugins/proxy-cache.md",sourceDirName:"plugins",slug:"/plugins/proxy-cache",permalink:"/docs/apisix/plugins/proxy-cache",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.12/docs/en/latest/plugins/proxy-cache.md",tags:[],version:"3.12",frontMatter:{title:"proxy-cache",keywords:["Apache APISIX","API Gateway","Proxy Cache"],description:"The proxy-cache Plugin caches responses based on keys, supporting disk and memory caching for GET, POST, and HEAD requests, enhancing API performance."},sidebar:"version-3.12/docs",previous:{title:"limit-count",permalink:"/docs/apisix/plugins/limit-count"},next:{title:"request-validation",permalink:"/docs/apisix/plugins/request-validation"}},s=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Static Configurations",id:"static-configurations",children:[]},{value:"Examples",id:"examples",children:[{value:"Cache Data on Disk",id:"cache-data-on-disk",children:[]},{value:"Cache Data in Memory",id:"cache-data-in-memory",children:[]},{value:"Cache Responses Conditionally",id:"cache-responses-conditionally",children:[]},{value:"Retrieve Responses from Cache Conditionally",id:"retrieve-responses-from-cache-conditionally",children:[]},{value:"Cache for 502 and 504 Error Response Code",id:"cache-for-502-and-504-error-response-code",children:[]}]}],p={toc:s};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("head",null,(0,r.kt)("link",{rel:"canonical",href:"https://docs.api7.ai/hub/proxy-cache"})),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin provides the capability to cache responses based on a cache key. The Plugin supports both disk-based and memory-based caching options to cache for ",(0,r.kt)("a",{parentName:"p",href:"https://anything.org/learn/serving-over-http/#get-request"},"GET"),", ",(0,r.kt)("a",{parentName:"p",href:"https://anything.org/learn/serving-over-http/#post-request"},"POST"),", and ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD"},"HEAD")," requests."),(0,r.kt)("p",null,"Responses can be conditionally cached based on request HTTP methods, response status codes, request header values, and more."),(0,r.kt)("h2",{id:"attributes"},"Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_strategy"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"disk"),(0,r.kt)("td",{parentName:"tr",align:null},'["disk","memory"]'),(0,r.kt)("td",{parentName:"tr",align:null},"Caching strategy. Cache on disk or in memory.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_zone"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"disk_cache_one"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Cache zone used with the caching strategy. The value should match one of the cache zones defined in the ",(0,r.kt)("a",{parentName:"td",href:"#static-configurations"},"configuration files")," and should correspond to the caching strategy. For example, when using the in-memory caching strategy, you should use an in-memory cache zone.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_key"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},'["$host", "$request_uri"]'),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Key to use for caching. Support ",(0,r.kt)("a",{parentName:"td",href:"https://nginx.org/en/docs/varindex.html"},"NGINX variables")," and constant strings in values. Variables should be prefixed with a ",(0,r.kt)("inlineCode",{parentName:"td"},"$")," sign.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_bypass"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"One or more parameters to parse value from, such that if any of the values is not empty and is not equal to ",(0,r.kt)("inlineCode",{parentName:"td"},"0"),", response will not be retrieved from cache. Support ",(0,r.kt)("a",{parentName:"td",href:"https://nginx.org/en/docs/varindex.html"},"NGINX variables")," and constant strings in values. Variables should be prefixed with a ",(0,r.kt)("inlineCode",{parentName:"td"},"$")," sign.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_method"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},'["GET", "HEAD"]'),(0,r.kt)("td",{parentName:"tr",align:null},'["GET", "POST", "HEAD"]'),(0,r.kt)("td",{parentName:"tr",align:null},"Request methods of which the response should be cached.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_http_status"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[integer]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"[200, 301, 404]"),(0,r.kt)("td",{parentName:"tr",align:null},"[200, 599]"),(0,r.kt)("td",{parentName:"tr",align:null},"Response HTTP status codes of which the response should be cached.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"hide_cache_headers"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"If true, hide ",(0,r.kt)("inlineCode",{parentName:"td"},"Expires")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"Cache-Control")," response headers.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_control"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"If true, comply with ",(0,r.kt)("inlineCode",{parentName:"td"},"Cache-Control")," behavior in the HTTP specification. Only valid for in-memory strategy.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"no_cache"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"One or more parameters to parse value from, such that if any of the values is not empty and is not equal to ",(0,r.kt)("inlineCode",{parentName:"td"},"0"),", response will not be cached. Support ",(0,r.kt)("a",{parentName:"td",href:"https://nginx.org/en/docs/varindex.html"},"NGINX variables")," and constant strings in values. Variables should be prefixed with a ",(0,r.kt)("inlineCode",{parentName:"td"},"$")," sign.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"cache_ttl"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"300"),(0,r.kt)("td",{parentName:"tr",align:null},">=1"),(0,r.kt)("td",{parentName:"tr",align:null},"Cache time to live (TTL) in seconds when caching in memory. To adjust the TTL when caching on disk, update ",(0,r.kt)("inlineCode",{parentName:"td"},"cache_ttl")," in the ",(0,r.kt)("a",{parentName:"td",href:"#static-configurations"},"configuration files"),". The TTL value is evaluated in conjunction with the values in the response headers  ",(0,r.kt)("a",{parentName:"td",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control"},(0,r.kt)("inlineCode",{parentName:"a"},"Cache-Control"))," and ",(0,r.kt)("a",{parentName:"td",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires"},(0,r.kt)("inlineCode",{parentName:"a"},"Expires"))," received from the Upstream service.")))),(0,r.kt)("h2",{id:"static-configurations"},"Static Configurations"),(0,r.kt)("p",null,"By default, values such as ",(0,r.kt)("inlineCode",{parentName:"p"},"cache_ttl")," when caching on disk and cache ",(0,r.kt)("inlineCode",{parentName:"p"},"zones")," are pre-configured in the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/apisix/cli/config.lua"},"default configuration"),"."),(0,r.kt)("p",null,"To customize these values, add the corresponding configurations to ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml"),". For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apisix:\n  proxy_cache:\n    cache_ttl: 10s  # default cache TTL used when caching on disk, only if none of the `Expires`\n                    # and `Cache-Control` response headers is present, or if APISIX returns\n                    # `502 Bad Gateway` or `504 Gateway Timeout` due to unavailable upstreams\n    zones:\n      - name: disk_cache_one\n        memory_size: 50m\n        disk_size: 1G\n        disk_path: /tmp/disk_cache_one\n        cache_levels: 1:2\n      # - name: disk_cache_two\n      #   memory_size: 50m\n      #   disk_size: 1G\n      #   disk_path: "/tmp/disk_cache_two"\n      #   cache_levels: "1:2"\n      - name: memory_cache\n        memory_size: 50m\n')),(0,r.kt)("p",null,"Reload APISIX for changes to take effect."),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("p",null,"The examples below demonstrate how you can configure ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," for different scenarios."),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("h3",{id:"cache-data-on-disk"},"Cache Data on Disk"),(0,r.kt)("p",null,"On-disk caching strategy offers the advantages of data persistency when system restarts and having larger storage capacity compared to in-memory cache. It is suitable for applications that prioritize durability and can tolerate slightly larger cache access latency."),(0,r.kt)("p",null,"The following example demonstrates how you can use ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin on a Route to cache data on disk."),(0,r.kt)("p",null,"When using the on-disk caching strategy, the cache TTL is determined by value from the response header ",(0,r.kt)("inlineCode",{parentName:"p"},"Expires")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"Cache-Control"),". If none of these headers is present or if APISIX returns ",(0,r.kt)("inlineCode",{parentName:"p"},"502 Bad Gateway")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"504 Gateway Timeout")," due to unavailable Upstreams, the cache TTL defaults to the value configured in the ",(0,r.kt)("a",{parentName:"p",href:"#static-configuration"},"configuration files"),"."),(0,r.kt)("p",null,"Create a Route with the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin to cache data on disk:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "proxy-cache-route",\n    "uri": "/anything",\n    "plugins": {\n      "proxy-cache": {\n        "cache_strategy": "disk"\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"Send a request to the Route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything"\n')),(0,r.kt)("p",null,"You should see an ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response with the following header, showing the Plugin is successfully enabled:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: MISS\n")),(0,r.kt)("p",null,"As there is no cache available before the first response, ",(0,r.kt)("inlineCode",{parentName:"p"},"Apisix-Cache-Status: MISS")," is shown."),(0,r.kt)("p",null,"Send the same request again within the cache TTL window. You should see an ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response with the following headers, showing the cache is hit:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: HIT\n")),(0,r.kt)("p",null,"Wait for the cache to expire after the TTL and send the same request again. You should see an ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response with the following headers, showing the cache has expired:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: EXPIRED\n")),(0,r.kt)("h3",{id:"cache-data-in-memory"},"Cache Data in Memory"),(0,r.kt)("p",null,"In-memory caching strategy offers the advantage of low-latency access to the cached data, as retrieving data from RAM is faster than retrieving data from disk storage. It also works well for storing temporary data that does not need to be persisted long-term, allowing for efficient caching of frequently changing data."),(0,r.kt)("p",null,"The following example demonstrates how you can use ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin on a Route to cache data in memory."),(0,r.kt)("p",null,"Create a Route with ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," and configure it to use memory-based caching:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "proxy-cache-route",\n    "uri": "/anything",\n    "plugins": {\n      "proxy-cache": {\n        "cache_strategy": "memory",\n        "cache_zone": "memory_cache",\n        "cache_ttl": 10\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"Send a request to the Route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything"\n')),(0,r.kt)("p",null,"You should see an ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response with the following header, showing the Plugin is successfully enabled:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: MISS\n")),(0,r.kt)("p",null,"As there is no cache available before the first response, ",(0,r.kt)("inlineCode",{parentName:"p"},"Apisix-Cache-Status: MISS")," is shown."),(0,r.kt)("p",null,"Send the same request again within the cache TTL window. You should see an ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response with the following headers, showing the cache is hit:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: HIT\n")),(0,r.kt)("h3",{id:"cache-responses-conditionally"},"Cache Responses Conditionally"),(0,r.kt)("p",null,"The following example demonstrates how you can configure the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin to conditionally cache responses."),(0,r.kt)("p",null,"Create a Route with the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin and configure the ",(0,r.kt)("inlineCode",{parentName:"p"},"no_cache")," attribute, such that if at least one of the values of the URL parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"no_cache")," and header ",(0,r.kt)("inlineCode",{parentName:"p"},"no_cache")," is not empty and is not equal to ",(0,r.kt)("inlineCode",{parentName:"p"},"0"),", the response will not be cached:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "proxy-cache-route",\n    "uri": "/anything",\n    "plugins": {\n      "proxy-cache": {\n        "no_cache": ["$arg_no_cache", "$http_no_cache"]\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"Send a few requests to the Route with the URL parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"no_cache")," value indicating cache bypass:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?no_cache=1"\n')),(0,r.kt)("p",null,"You should receive ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," responses for all requests and observe the following header every time:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: EXPIRED\n")),(0,r.kt)("p",null,"Send a few other requests to the Route with the URL parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"no_cache")," value being zero:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?no_cache=0"\n')),(0,r.kt)("p",null,"You should receive ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," responses for all requests and start seeing the cache being hit:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: HIT\n")),(0,r.kt)("p",null,"You can also specify the value in the ",(0,r.kt)("inlineCode",{parentName:"p"},"no_cache")," header as such:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything" -H "no_cache: 1"\n')),(0,r.kt)("p",null,"The response should not be cached:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: EXPIRED\n")),(0,r.kt)("h3",{id:"retrieve-responses-from-cache-conditionally"},"Retrieve Responses from Cache Conditionally"),(0,r.kt)("p",null,"The following example demonstrates how you can configure the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin to conditionally retrieve responses from cache."),(0,r.kt)("p",null,"Create a Route with the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin and configure the ",(0,r.kt)("inlineCode",{parentName:"p"},"cache_bypass")," attribute, such that if at least one of the values of the URL parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"bypass")," and header ",(0,r.kt)("inlineCode",{parentName:"p"},"bypass")," is not empty and is not equal to ",(0,r.kt)("inlineCode",{parentName:"p"},"0"),", the response will not be retrieved from the cache:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "proxy-cache-route",\n    "uri": "/anything",\n    "plugins": {\n      "proxy-cache": {\n        "cache_bypass": ["$arg_bypass", "$http_bypass"]\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"Send a request to the Route with the URL parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"bypass")," value indicating cache bypass:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?bypass=1"\n')),(0,r.kt)("p",null,"You should see an ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response with the following header:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: BYPASS\n")),(0,r.kt)("p",null,"Send another request to the Route with the URL parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"bypass")," value being zero:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?bypass=0"\n')),(0,r.kt)("p",null,"You should see an ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response with the following header:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: MISS\n")),(0,r.kt)("p",null,"You can also specify the value in the ",(0,r.kt)("inlineCode",{parentName:"p"},"bypass")," header as such:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything" -H "bypass: 1"\n')),(0,r.kt)("p",null,"The cache should be bypassed:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"Apisix-Cache-Status: BYPASS\n")),(0,r.kt)("h3",{id:"cache-for-502-and-504-error-response-code"},"Cache for 502 and 504 Error Response Code"),(0,r.kt)("p",null,"When the Upstream services return server errors in the 500 range, ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin will cache the responses if and only if the returned status is ",(0,r.kt)("inlineCode",{parentName:"p"},"502 Bad Gateway")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"504 Gateway Timeout"),"."),(0,r.kt)("p",null,"The following example demonstrates the behavior of ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin when the Upstream service returns ",(0,r.kt)("inlineCode",{parentName:"p"},"504 Gateway Timeout"),"."),(0,r.kt)("p",null,"Create a Route with the ",(0,r.kt)("inlineCode",{parentName:"p"},"proxy-cache")," Plugin and configure a dummy Upstream service:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "proxy-cache-route",\n    "uri": "/timeout",\n    "plugins": {\n      "proxy-cache": { }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "12.34.56.78": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"Generate a few requests to the Route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'seq 4 | xargs -I{} curl -I "http://127.0.0.1:9080/timeout"\n')),(0,r.kt)("p",null,"You should see a response similar to the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"HTTP/1.1 504 Gateway Time-out\n...\nApisix-Cache-Status: MISS\n\nHTTP/1.1 504 Gateway Time-out\n...\nApisix-Cache-Status: HIT\n\nHTTP/1.1 504 Gateway Time-out\n...\nApisix-Cache-Status: HIT\n\nHTTP/1.1 504 Gateway Time-out\n...\nApisix-Cache-Status: HIT\n")),(0,r.kt)("p",null,"However, if the Upstream services returns ",(0,r.kt)("inlineCode",{parentName:"p"},"503 Service Temporarily Unavailable"),", the response will not be cached."))}c.isMDXComponent=!0}}]);