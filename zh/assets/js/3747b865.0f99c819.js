(self.webpackChunk=self.webpackChunk||[]).push([[62803],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return s},kt:function(){return m}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},p=Object.keys(e);for(r=0;r<p.length;r++)t=p[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)t=p[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,p=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=c(t),m=a,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||p;return t?r.createElement(h,i(i({ref:n},s),{},{components:t})):r.createElement(h,i({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var p=t.length,i=new Array(p);i[0]=d;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var c=2;c<p;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},37309:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return i},metadata:function(){return o},toc:function(){return l},default:function(){return s}});var r=t(22122),a=t(19756),p=(t(67294),t(3905)),i={title:"Upstream"},o={unversionedId:"architecture-design/upstream",id:"version-2.8/architecture-design/upstream",isDocsHomePage:!1,title:"Upstream",description:"\x3c!--",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-2.8/architecture-design/upstream.md",sourceDirName:"architecture-design",slug:"/architecture-design/upstream",permalink:"/zh/docs/apisix/architecture-design/upstream",editUrl:"https://github.com/apache/apisix/edit/master/docs/zh/latest/architecture-design/upstream.md",version:"2.8",frontMatter:{title:"Upstream"},sidebar:"version-2.8/docs",previous:{title:"Consumer",permalink:"/zh/docs/apisix/architecture-design/consumer"},next:{title:"Global rule",permalink:"/zh/docs/apisix/architecture-design/global-rule"}},l=[{value:"\u914d\u7f6e\u53c2\u6570",id:"\u914d\u7f6e\u53c2\u6570",children:[]}],c={toc:l};function s(e){var n=e.components,t=(0,a.Z)(e,["components"]);return(0,p.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,p.kt)("p",null,"Upstream \u662f\u865a\u62df\u4e3b\u673a\u62bd\u8c61\uff0c\u5bf9\u7ed9\u5b9a\u7684\u591a\u4e2a\u670d\u52a1\u8282\u70b9\u6309\u7167\u914d\u7f6e\u89c4\u5219\u8fdb\u884c\u8d1f\u8f7d\u5747\u8861\u3002Upstream \u7684\u5730\u5740\u4fe1\u606f\u53ef\u4ee5\u76f4\u63a5\u914d\u7f6e\u5230 ",(0,p.kt)("inlineCode",{parentName:"p"},"Route"),"\uff08\u6216 ",(0,p.kt)("inlineCode",{parentName:"p"},"Service"),") \u4e0a\uff0c\u5f53 Upstream \u6709\u91cd\u590d\u65f6\uff0c\u5c31\u9700\u8981\u7528\u201c\u5f15\u7528\u201d\u65b9\u5f0f\u907f\u514d\u91cd\u590d\u4e86\u3002"),(0,p.kt)("p",null,(0,p.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/upstream-example.png",alt:"Upstream \u793a\u4f8b"})),(0,p.kt)("p",null,"\u5982\u4e0a\u56fe\u6240\u793a\uff0c\u901a\u8fc7\u521b\u5efa Upstream \u5bf9\u8c61\uff0c\u5728 ",(0,p.kt)("inlineCode",{parentName:"p"},"Route")," \u7528 ID \u65b9\u5f0f\u5f15\u7528\uff0c\u5c31\u53ef\u4ee5\u786e\u4fdd\u53ea\u7ef4\u62a4\u4e00\u4e2a\u5bf9\u8c61\u7684\u503c\u4e86\u3002"),(0,p.kt)("p",null,"Upstream \u7684\u914d\u7f6e\u53ef\u4ee5\u88ab\u76f4\u63a5\u7ed1\u5b9a\u5728\u6307\u5b9a ",(0,p.kt)("inlineCode",{parentName:"p"},"Route")," \u4e2d\uff0c\u4e5f\u53ef\u4ee5\u88ab\u7ed1\u5b9a\u5728 ",(0,p.kt)("inlineCode",{parentName:"p"},"Service")," \u4e2d\uff0c\u4e0d\u8fc7 ",(0,p.kt)("inlineCode",{parentName:"p"},"Route")," \u4e2d\u7684\u914d\u7f6e\n\u4f18\u5148\u7ea7\u66f4\u9ad8\u3002\u8fd9\u91cc\u7684\u4f18\u5148\u7ea7\u884c\u4e3a\u4e0e ",(0,p.kt)("inlineCode",{parentName:"p"},"Plugin")," \u975e\u5e38\u76f8\u4f3c"),(0,p.kt)("h3",{id:"\u914d\u7f6e\u53c2\u6570"},"\u914d\u7f6e\u53c2\u6570"),(0,p.kt)("p",null,"APISIX \u7684 Upstream \u9664\u4e86\u57fa\u672c\u7684\u8d1f\u8f7d\u5747\u8861\u7b97\u6cd5\u9009\u62e9\u5916\uff0c\u8fd8\u652f\u6301\u5bf9\u4e0a\u6e38\u505a\u4e3b\u88ab\u52a8\u5065\u5eb7\u68c0\u67e5\u3001\u91cd\u8bd5\u7b49\u903b\u8f91\uff0c\u5177\u4f53\u770b\u8fd9\u4e2a",(0,p.kt)("a",{parentName:"p",href:"/zh/docs/apisix/admin-api#upstream"},"\u94fe\u63a5"),"\u3002"),(0,p.kt)("p",null,"\u521b\u5efa\u4e0a\u6e38\u5bf9\u8c61\u7528\u4f8b\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-json"},'curl http://127.0.0.1:9080/apisix/admin/upstreams/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "type": "chash",\n    "key": "remote_addr",\n    "nodes": {\n        "127.0.0.1:80": 1,\n        "foo.com:80": 2\n    }\n}\'\n')),(0,p.kt)("p",null,"\u4e0a\u6e38\u5bf9\u8c61\u521b\u5efa\u540e\uff0c\u5747\u53ef\u4ee5\u88ab\u5177\u4f53 ",(0,p.kt)("inlineCode",{parentName:"p"},"Route")," \u6216 ",(0,p.kt)("inlineCode",{parentName:"p"},"Service")," \u5f15\u7528\uff0c\u4f8b\u5982\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream_id": 2\n}\'\n')),(0,p.kt)("p",null,"\u4e3a\u4e86\u65b9\u4fbf\u4f7f\u7528\uff0c\u4e5f\u53ef\u4ee5\u76f4\u63a5\u628a\u4e0a\u6e38\u5730\u5740\u76f4\u63a5\u7ed1\u5230\u67d0\u4e2a ",(0,p.kt)("inlineCode",{parentName:"p"},"Route")," \u6216 ",(0,p.kt)("inlineCode",{parentName:"p"},"Service")," \uff0c\u4f8b\u5982\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/index.html",\n    "plugins": {\n        "limit-count": {\n            "count": 2,\n            "time_window": 60,\n            "rejected_code": 503,\n            "key": "remote_addr"\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "39.97.63.215:80": 1\n        }\n    }\n}\'\n')),(0,p.kt)("p",null,"\u4e0b\u9762\u662f\u4e00\u4e2a\u914d\u7f6e\u4e86\u5065\u5eb7\u68c0\u67e5\u7684\u793a\u4f8b\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/index.html",\n    "plugins": {\n        "limit-count": {\n            "count": 2,\n            "time_window": 60,\n            "rejected_code": 503,\n            "key": "remote_addr"\n        }\n    },\n    "upstream": {\n         "nodes": {\n            "39.97.63.215:80": 1\n        }\n        "type": "roundrobin",\n        "retries": 2,\n        "checks": {\n            "active": {\n                "http_path": "/status",\n                "host": "foo.com",\n                "healthy": {\n                    "interval": 2,\n                    "successes": 1\n                },\n                "unhealthy": {\n                    "interval": 1,\n                    "http_failures": 2\n                }\n            }\n        }\n    }\n}\'\n')),(0,p.kt)("p",null,"\u66f4\u591a\u7ec6\u8282\u53ef\u4ee5\u53c2\u8003",(0,p.kt)("a",{parentName:"p",href:"/zh/docs/apisix/health-check"},"\u5065\u5eb7\u68c0\u67e5\u7684\u6587\u6863"),"\u3002"),(0,p.kt)("p",null,"\u4e0b\u9762\u662f\u51e0\u4e2a\u4f7f\u7528\u4e0d\u540c",(0,p.kt)("inlineCode",{parentName:"p"},"hash_on"),"\u7c7b\u578b\u7684\u914d\u7f6e\u793a\u4f8b\uff1a"),(0,p.kt)("h4",{id:"consumer"},"Consumer"),(0,p.kt)("p",null,"\u521b\u5efa\u4e00\u4e2a consumer \u5bf9\u8c61:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/consumers -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "username": "jack",\n    "plugins": {\n    "key-auth": {\n           "key": "auth-jack"\n        }\n    }\n}\'\n')),(0,p.kt)("p",null,"\u65b0\u5efa\u8def\u7531\uff0c\u6253\u5f00",(0,p.kt)("inlineCode",{parentName:"p"},"key-auth"),"\u63d2\u4ef6\u8ba4\u8bc1\uff0c",(0,p.kt)("inlineCode",{parentName:"p"},"upstream"),"\u7684",(0,p.kt)("inlineCode",{parentName:"p"},"hash_on"),"\u7c7b\u578b\u4e3a",(0,p.kt)("inlineCode",{parentName:"p"},"consumer"),"\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "plugins": {\n        "key-auth": {}\n    },\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1,\n            "127.0.0.1:1981": 1\n        },\n        "type": "chash",\n        "hash_on": "consumer"\n    },\n    "uri": "/server_port"\n}\'\n')),(0,p.kt)("p",null,"\u6d4b\u8bd5\u8bf7\u6c42\uff0c\u8ba4\u8bc1\u901a\u8fc7\u540e\u7684",(0,p.kt)("inlineCode",{parentName:"p"},"consumer_name"),"\u5c06\u4f5c\u4e3a\u8d1f\u8f7d\u5747\u8861\u54c8\u5e0c\u7b97\u6cd5\u7684\u54c8\u5e0c\u503c\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/server_port -H "apikey: auth-jack"\n')),(0,p.kt)("h5",{id:"cookie"},"Cookie"),(0,p.kt)("p",null,"\u65b0\u5efa\u8def\u7531\u548c",(0,p.kt)("inlineCode",{parentName:"p"},"Upstream"),"\uff0c",(0,p.kt)("inlineCode",{parentName:"p"},"hash_on"),"\u7c7b\u578b\u4e3a",(0,p.kt)("inlineCode",{parentName:"p"},"cookie"),"\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/hash_on_cookie",\n    "upstream": {\n        "key": "sid",\n        "type ": "chash",\n        "hash_on ": "cookie",\n        "nodes ": {\n            "127.0.0.1:1980": 1,\n            "127.0.0.1:1981": 1\n        }\n    }\n}\'\n')),(0,p.kt)("p",null,"\u5ba2\u6237\u7aef\u8bf7\u6c42\u643a\u5e26",(0,p.kt)("inlineCode",{parentName:"p"},"Cookie"),"\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"}," curl http://127.0.0.1:9080/hash_on_cookie -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -H \"Cookie: sid=3c183a30cffcda1408daf1c61d47b274\"\n")),(0,p.kt)("h5",{id:"header"},"Header"),(0,p.kt)("p",null,"\u65b0\u5efa\u8def\u7531\u548c",(0,p.kt)("inlineCode",{parentName:"p"},"Upstream"),"\uff0c",(0,p.kt)("inlineCode",{parentName:"p"},"hash_on"),"\u7c7b\u578b\u4e3a",(0,p.kt)("inlineCode",{parentName:"p"},"header"),"\uff0c ",(0,p.kt)("inlineCode",{parentName:"p"},"key"),"\u4e3a",(0,p.kt)("inlineCode",{parentName:"p"},"content-type"),"\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/hash_on_header",\n    "upstream": {\n        "key": "content-type",\n        "type ": "chash",\n        "hash_on ": "header",\n        "nodes ": {\n            "127.0.0.1:1980": 1,\n            "127.0.0.1:1981": 1\n        }\n    }\n}\'\n')),(0,p.kt)("p",null,"\u5ba2\u6237\u7aef\u8bf7\u6c42\u643a\u5e26",(0,p.kt)("inlineCode",{parentName:"p"},"content-type"),"\u7684",(0,p.kt)("inlineCode",{parentName:"p"},"header"),"\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-shell"}," curl http://127.0.0.1:9080/hash_on_header -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -H \"Content-Type: application/json\"\n")))}s.isMDXComponent=!0}}]);