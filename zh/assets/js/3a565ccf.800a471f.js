"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[62889],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return k}});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=a.createContext({}),u=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},s=function(e){var n=u(e.components);return a.createElement(o.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=u(t),k=r,m=d["".concat(o,".").concat(k)]||d[k]||c[k]||i;return t?a.createElement(m,l(l({ref:n},s),{},{components:t})):a.createElement(m,l({ref:n},s))}));function k(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=d;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var u=2;u<i;u++)l[u]=t[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},13584:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return o},toc:function(){return u},default:function(){return c}});var a=t(87462),r=t(63366),i=(t(67294),t(3905)),l={title:"\u96c6\u6210\u670d\u52a1\u53d1\u73b0\u6ce8\u518c\u4e2d\u5fc3"},p=void 0,o={unversionedId:"discovery",id:"discovery",isDocsHomePage:!1,title:"\u96c6\u6210\u670d\u52a1\u53d1\u73b0\u6ce8\u518c\u4e2d\u5fc3",description:"\x3c!--",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/current/discovery.md",sourceDirName:".",slug:"/discovery",permalink:"/zh/docs/apisix/next/discovery",editUrl:"https://github.com/apache/apisix/edit/master/docs/zh/latest/discovery.md",tags:[],version:"current",frontMatter:{title:"\u96c6\u6210\u670d\u52a1\u53d1\u73b0\u6ce8\u518c\u4e2d\u5fc3"},sidebar:"docs",previous:{title:"\u5e38\u89c1\u95ee\u9898",permalink:"/zh/docs/apisix/next/FAQ"},next:{title:"DNS",permalink:"/zh/docs/apisix/next/discovery/dns"}},u=[{value:"\u6458\u8981",id:"\u6458\u8981",children:[]},{value:"\u5f53\u524d\u652f\u6301\u7684\u6ce8\u518c\u4e2d\u5fc3",id:"\u5f53\u524d\u652f\u6301\u7684\u6ce8\u518c\u4e2d\u5fc3",children:[]},{value:"\u5982\u4f55\u6269\u5c55\u6ce8\u518c\u4e2d\u5fc3\uff1f",id:"\u5982\u4f55\u6269\u5c55\u6ce8\u518c\u4e2d\u5fc3\uff1f",children:[{value:"\u57fa\u672c\u6b65\u9aa4",id:"\u57fa\u672c\u6b65\u9aa4",children:[]},{value:"\u4ee5 Eureka \u4e3e\u4f8b",id:"\u4ee5-eureka-\u4e3e\u4f8b",children:[]}]},{value:"\u6ce8\u518c\u4e2d\u5fc3\u914d\u7f6e",id:"\u6ce8\u518c\u4e2d\u5fc3\u914d\u7f6e",children:[{value:"\u521d\u59cb\u5316\u670d\u52a1\u53d1\u73b0",id:"\u521d\u59cb\u5316\u670d\u52a1\u53d1\u73b0",children:[]},{value:"Eureka \u7684\u914d\u7f6e",id:"eureka-\u7684\u914d\u7f6e",children:[]}]},{value:"upstream \u914d\u7f6e",id:"upstream-\u914d\u7f6e",children:[]}],s={toc:u};function c(e){var n=e.components,t=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,a.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E6%91%98%E8%A6%81"},"\u6458\u8981")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E5%BD%93%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%B3%A8%E5%86%8C%E4%B8%AD%E5%BF%83"},"\u5f53\u524d\u652f\u6301\u7684\u6ce8\u518c\u4e2d\u5fc3")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E5%A6%82%E4%BD%95%E6%89%A9%E5%B1%95%E6%B3%A8%E5%86%8C%E4%B8%AD%E5%BF%83"},"\u5982\u4f55\u6269\u5c55\u6ce8\u518c\u4e2d\u5fc3\uff1f"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E5%9F%BA%E6%9C%AC%E6%AD%A5%E9%AA%A4"},"\u57fa\u672c\u6b65\u9aa4")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E4%BB%A5-eureka-%E4%B8%BE%E4%BE%8B"},"\u4ee5 Eureka \u4e3e\u4f8b"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E5%AE%9E%E7%8E%B0-eurekalua"},"\u5b9e\u73b0 eureka.lua")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#eureka-%E4%B8%8E-apisix-%E4%B9%8B%E9%97%B4%E6%95%B0%E6%8D%AE%E8%BD%AC%E6%8D%A2%E9%80%BB%E8%BE%91"},"Eureka \u4e0e APISIX \u4e4b\u95f4\u6570\u636e\u8f6c\u6362\u903b\u8f91")))))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E6%B3%A8%E5%86%8C%E4%B8%AD%E5%BF%83%E9%85%8D%E7%BD%AE"},"\u6ce8\u518c\u4e2d\u5fc3\u914d\u7f6e"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0"},"\u521d\u59cb\u5316\u670d\u52a1\u53d1\u73b0")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#eureka-%E7%9A%84%E9%85%8D%E7%BD%AE"},"Eureka \u7684\u914d\u7f6e")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#upstream-%E9%85%8D%E7%BD%AE"},"upstream \u914d\u7f6e"))),(0,i.kt)("h2",{id:"\u6458\u8981"},"\u6458\u8981"),(0,i.kt)("p",null,"\u5f53\u4e1a\u52a1\u91cf\u53d1\u751f\u53d8\u5316\u65f6\uff0c\u9700\u8981\u5bf9\u4e0a\u6e38\u670d\u52a1\u8fdb\u884c\u6269\u7f29\u5bb9\uff0c\u6216\u8005\u56e0\u670d\u52a1\u5668\u786c\u4ef6\u6545\u969c\u9700\u8981\u66f4\u6362\u670d\u52a1\u5668\u3002\u5982\u679c\u7f51\u5173\u662f\u901a\u8fc7\u914d\u7f6e\u6765\u7ef4\u62a4\u4e0a\u6e38\u670d\u52a1\u4fe1\u606f\uff0c\u5728\u5fae\u670d\u52a1\u67b6\u6784\u6a21\u5f0f\u4e0b\uff0c\u5176\u5e26\u6765\u7684\u7ef4\u62a4\u6210\u672c\u53ef\u60f3\u800c\u77e5\u3002\u518d\u8005\u56e0\u4e0d\u80fd\u53ca\u65f6\u66f4\u65b0\u8fd9\u4e9b\u4fe1\u606f\uff0c\u4e5f\u4f1a\u5bf9\u4e1a\u52a1\u5e26\u6765\u4e00\u5b9a\u7684\u5f71\u54cd\uff0c\u8fd8\u6709\u4eba\u4e3a\u8bef\u64cd\u4f5c\u5e26\u6765\u7684\u5f71\u54cd\u4e5f\u4e0d\u53ef\u5ffd\u89c6\uff0c\u6240\u4ee5\u7f51\u5173\u975e\u5e38\u5fc5\u8981\u901a\u8fc7\u670d\u52a1\u6ce8\u518c\u4e2d\u5fc3\u52a8\u6001\u83b7\u53d6\u6700\u65b0\u7684\u670d\u52a1\u5b9e\u4f8b\u4fe1\u606f\u3002\u67b6\u6784\u56fe\u5982\u4e0b\u6240\u793a\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/apache/apisix@master/docs/assets/images/discovery-cn.png",alt:"discovery through service registry"})),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u670d\u52a1\u542f\u52a8\u65f6\u5c06\u81ea\u8eab\u7684\u4e00\u4e9b\u4fe1\u606f\uff0c\u6bd4\u5982\u670d\u52a1\u540d\u3001IP\u3001\u7aef\u53e3\u7b49\u4fe1\u606f\u4e0a\u62a5\u5230\u6ce8\u518c\u4e2d\u5fc3\uff1b\u5404\u4e2a\u670d\u52a1\u4e0e\u6ce8\u518c\u4e2d\u5fc3\u4f7f\u7528\u4e00\u5b9a\u673a\u5236\uff08\u4f8b\u5982\u5fc3\u8df3\uff09\u901a\u4fe1\uff0c\u5982\u679c\u6ce8\u518c\u4e2d\u5fc3\u4e0e\u670d\u52a1\u957f\u65f6\u95f4\u65e0\u6cd5\u901a\u4fe1\uff0c\u5c31\u4f1a\u6ce8\u9500\u8be5\u5b9e\u4f8b\uff1b\u5f53\u670d\u52a1\u4e0b\u7ebf\u65f6\uff0c\u4f1a\u5220\u9664\u6ce8\u518c\u4e2d\u5fc3\u7684\u5b9e\u4f8b\u4fe1\u606f\uff1b"),(0,i.kt)("li",{parentName:"ol"},"\u7f51\u5173\u4f1a\u51c6\u5b9e\u65f6\u5730\u4ece\u6ce8\u518c\u4e2d\u5fc3\u83b7\u53d6\u670d\u52a1\u5b9e\u4f8b\u4fe1\u606f\uff1b"),(0,i.kt)("li",{parentName:"ol"},"\u5f53\u7528\u6237\u901a\u8fc7\u7f51\u5173\u8bf7\u6c42\u670d\u52a1\u65f6\uff0c\u7f51\u5173\u4ece\u6ce8\u518c\u4e2d\u5fc3\u83b7\u53d6\u7684\u5b9e\u4f8b\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u8fdb\u884c\u4ee3\u7406\uff1b")),(0,i.kt)("p",null,"\u5e38\u89c1\u7684\u6ce8\u518c\u4e2d\u5fc3\uff1aEureka, Etcd, Consul, Nacos, Zookeeper \u7b49"),(0,i.kt)("h2",{id:"\u5f53\u524d\u652f\u6301\u7684\u6ce8\u518c\u4e2d\u5fc3"},"\u5f53\u524d\u652f\u6301\u7684\u6ce8\u518c\u4e2d\u5fc3"),(0,i.kt)("p",null,"\u76ee\u524d\u652f\u6301 Eureka / Consul \u548c\u57fa\u4e8e DNS \u7684\u670d\u52a1\u6ce8\u518c\u53d1\u73b0\u3002"),(0,i.kt)("p",null,"\u57fa\u4e8e DNS \u7684\u670d\u52a1\u6ce8\u518c\u53d1\u73b0\u89c1 ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/discovery/dns"},"\u57fa\u4e8e DNS \u7684\u670d\u52a1\u652f\u6301\u53d1\u73b0"),"\u3002"),(0,i.kt)("p",null,"Consul \u7684\u652f\u6301\u89c1 ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/discovery/consul_kv"},"\u57fa\u4e8e Consul \u7684\u670d\u52a1\u652f\u6301\u53d1\u73b0")),(0,i.kt)("p",null,"Nacos \u7684\u652f\u6301\u89c1 ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/discovery/nacos"},"\u57fa\u4e8e Nacos \u7684\u670d\u52a1\u652f\u6301\u53d1\u73b0")),(0,i.kt)("p",null,"Eureka \u7684\u652f\u6301\u65b9\u5f0f\u89c1\u4e0b\u6587\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u6269\u5c55\u6ce8\u518c\u4e2d\u5fc3\uff1f"},"\u5982\u4f55\u6269\u5c55\u6ce8\u518c\u4e2d\u5fc3\uff1f"),(0,i.kt)("h3",{id:"\u57fa\u672c\u6b65\u9aa4"},"\u57fa\u672c\u6b65\u9aa4"),(0,i.kt)("p",null,"APISIX \u8981\u6269\u5c55\u6ce8\u518c\u4e2d\u5fc3\u5176\u5b9e\u662f\u4ef6\u975e\u5e38\u5bb9\u6613\u7684\u4e8b\u60c5\uff0c\u5176\u57fa\u672c\u6b65\u9aa4\u5982\u4e0b\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u5728 ",(0,i.kt)("inlineCode",{parentName:"li"},"apisix/discovery/")," \u76ee\u5f55\u4e2d\u6dfb\u52a0\u6ce8\u518c\u4e2d\u5fc3\u5ba2\u6237\u7aef\u7684\u5b9e\u73b0\uff1b"),(0,i.kt)("li",{parentName:"ol"},"\u5b9e\u73b0\u7528\u4e8e\u521d\u59cb\u5316\u7684 ",(0,i.kt)("inlineCode",{parentName:"li"},"_M.init_worker()")," \u51fd\u6570\u4ee5\u53ca\u7528\u4e8e\u83b7\u53d6\u670d\u52a1\u5b9e\u4f8b\u8282\u70b9\u5217\u8868\u7684 ",(0,i.kt)("inlineCode",{parentName:"li"},"_M.nodes(service_name)")," \u51fd\u6570\uff1b"),(0,i.kt)("li",{parentName:"ol"},"\u5c06\u6ce8\u518c\u4e2d\u5fc3\u6570\u636e\u8f6c\u6362\u4e3a APISIX \u683c\u5f0f\u7684\u6570\u636e\uff1b")),(0,i.kt)("h3",{id:"\u4ee5-eureka-\u4e3e\u4f8b"},"\u4ee5 Eureka \u4e3e\u4f8b"),(0,i.kt)("h4",{id:"\u5b9e\u73b0-eureka-\u5ba2\u6237\u7aef"},"\u5b9e\u73b0 eureka \u5ba2\u6237\u7aef"),(0,i.kt)("p",null,"\u9996\u5148\uff0c\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix/discovery")," \u4e0b\u521b\u5efa ",(0,i.kt)("inlineCode",{parentName:"p"},"eureka")," \u76ee\u5f55\uff1b"),(0,i.kt)("p",null,"\u5176\u6b21\uff0c\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix/discovery/eureka")," \u76ee\u5f55\u4e2d\u6dfb\u52a0 ",(0,i.kt)("a",{parentName:"p",href:"../../../apisix/discovery/eureka/init.lua"},(0,i.kt)("inlineCode",{parentName:"a"},"init.lua")),";"),(0,i.kt)("p",null,"\u7136\u540e\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"init.lua")," \u5b9e\u73b0\u7528\u4e8e\u521d\u59cb\u5316\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"init_worker")," \u51fd\u6570\u4ee5\u53ca\u7528\u4e8e\u83b7\u53d6\u670d\u52a1\u5b9e\u4f8b\u8282\u70b9\u5217\u8868\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"nodes")," \u51fd\u6570\u5373\u53ef\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-lua"},"local _M = {\n    version = 0.1,\n}\n\n\nfunction _M.nodes(service_name)\n    ... ...\nend\n\n\nfunction _M.init_worker()\n    ... ...\nend\n\n\nreturn _M\n")),(0,i.kt)("p",null,"\u6700\u540e\uff0c\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix/discovery/eureka")," \u4e0b\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"schema.lua")," \u91cc\u9762\u63d0\u4f9b YAML \u914d\u7f6e\u7684 schema\u3002"),(0,i.kt)("h4",{id:"eureka-\u4e0e-apisix-\u4e4b\u95f4\u6570\u636e\u8f6c\u6362\u903b\u8f91"},"Eureka \u4e0e APISIX \u4e4b\u95f4\u6570\u636e\u8f6c\u6362\u903b\u8f91"),(0,i.kt)("p",null,"APISIX \u662f\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"upstream.nodes")," \u6765\u914d\u7f6e\u4e0a\u6e38\u670d\u52a1\u7684\uff0c\u6240\u4ee5\u4f7f\u7528\u6ce8\u518c\u4e2d\u5fc3\u540e\uff0c\u901a\u8fc7\u6ce8\u518c\u4e2d\u5fc3\u83b7\u53d6\u670d\u52a1\u7684\u6240\u6709 node \u540e\uff0c\u8d4b\u503c\u7ed9 ",(0,i.kt)("inlineCode",{parentName:"p"},"upstream.nodes")," \u6765\u8fbe\u5230\u76f8\u540c\u7684\u6548\u679c\u3002\u90a3\u4e48 APISIX \u662f\u600e\u4e48\u5c06 Eureka \u7684\u6570\u636e\u8f6c\u6210 node \u7684\u5462\uff1f \u5047\u5982\u4ece Eureka \u83b7\u53d6\u5982\u4e0b\u6570\u636e\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "applications": {\n      "application": [\n          {\n              "name": "USER-SERVICE",                 # \u670d\u52a1\u540d\u79f0\n              "instance": [\n                  {\n                      "instanceId": "192.168.1.100:8761",\n                      "hostName": "192.168.1.100",\n                      "app": "USER-SERVICE",          # \u670d\u52a1\u540d\u79f0\n                      "ipAddr": "192.168.1.100",      # \u5b9e\u4f8b IP \u5730\u5740\n                      "status": "UP",                 # \u72b6\u6001\n                      "overriddenStatus": "UNKNOWN",  # \u8986\u76d6\u72b6\u6001\n                      "port": {\n                          "$": 8761,                  # \u7aef\u53e3\n                          "@enabled": "true"          # \u5f00\u59cb\u7aef\u53e3\n                      },\n                      "securePort": {\n                          "$": 443,\n                          "@enabled": "false"\n                      },\n                      "metadata": {\n                          "management.port": "8761",\n                          "weight": 100               # \u6743\u91cd\uff0c\u9700\u8981\u901a\u8fc7 spring boot \u5e94\u7528\u7684 eureka.instance.metadata-map.weight \u8fdb\u884c\u914d\u7f6e\n                      },\n                      "homePageUrl": "http://192.168.1.100:8761/",\n                      "statusPageUrl": "http://192.168.1.100:8761/actuator/info",\n                      "healthCheckUrl": "http://192.168.1.100:8761/actuator/health",\n                      ... ...\n                  }\n              ]\n          }\n      ]\n  }\n}\n')),(0,i.kt)("p",null,"\u89e3\u6790 instance \u6570\u636e\u6b65\u9aa4\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},'\u9996\u5148\u8981\u9009\u62e9\u72b6\u6001\u4e3a \u201cUP\u201d \u7684\u5b9e\u4f8b\uff1a overriddenStatus \u503c\u4e0d\u4e3a "UNKNOWN" \u4ee5 overriddenStatus \u4e3a\u51c6\uff0c\u5426\u5219\u4ee5 status \u7684\u503c\u4e3a\u51c6\uff1b'),(0,i.kt)("li",{parentName:"ol"},"IP \u5730\u5740\uff1a\u4ee5 ipAddr \u7684\u503c\u4e3a IP; \u5e76\u4e14\u5fc5\u987b\u662f IPv4 \u6216 IPv6 \u683c\u5f0f\u7684\uff1b"),(0,i.kt)("li",{parentName:"ol"},"\u7aef\u53e3\uff1a\u7aef\u53e3\u53d6\u503c\u89c4\u5219\u662f\uff0c\u5982\u679c port",'["@enabled"]',' \u7b49\u4e8e "true" \u90a3\u4e48\u4f7f\u7528 port','["\\$"]'," \u7684\u503c\uff1b\u5982\u679c securePort",'["@enabled"]',' \u7b49\u4e8e "true" \u90a3\u4e48\u4f7f\u7528 securePort','["$"]'," \u7684\u503c\uff1b"),(0,i.kt)("li",{parentName:"ol"},"\u6743\u91cd\uff1a\u6743\u91cd\u53d6\u503c\u987a\u5e8f\u662f\uff0c\u5148\u5224\u65ad ",(0,i.kt)("inlineCode",{parentName:"li"},"metadata.weight")," \u662f\u5426\u6709\u503c\uff0c\u5982\u679c\u6ca1\u6709\uff0c\u5219\u53d6\u914d\u7f6e\u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"li"},"eureka.weight")," \u7684\u503c, \u5982\u679c\u8fd8\u6ca1\u6709\uff0c\u5219\u53d6\u9ed8\u8ba4\u503c",(0,i.kt)("inlineCode",{parentName:"li"},"100"),"\uff1b")),(0,i.kt)("p",null,"\u8fd9\u4e2a\u4f8b\u5b50\u8f6c\u6210 APISIX nodes \u7684\u7ed3\u679c\u5982\u4e0b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "host": "192.168.1.100",\n    "port": 8761,\n    "weight": 100,\n    "metadata": {\n      "management.port": "8761"\n    }\n  }\n]\n')),(0,i.kt)("h2",{id:"\u6ce8\u518c\u4e2d\u5fc3\u914d\u7f6e"},"\u6ce8\u518c\u4e2d\u5fc3\u914d\u7f6e"),(0,i.kt)("h3",{id:"\u521d\u59cb\u5316\u670d\u52a1\u53d1\u73b0"},"\u521d\u59cb\u5316\u670d\u52a1\u53d1\u73b0"),(0,i.kt)("p",null,"\u9996\u5148\u8981\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u6587\u4ef6\u4e2d\u589e\u52a0\u5982\u4e0b\u914d\u7f6e\uff0c\u6dfb\u52a0\u4e0d\u540c\u7684\u670d\u52a1\u53d1\u73b0\u5ba2\u6237\u7aef\uff0c\u4ee5\u4fbf\u5728\u4f7f\u7528\u8fc7\u7a0b\u4e2d\u52a8\u6001\u9009\u62e9\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"discovery:\n  eureka: ...\n")),(0,i.kt)("p",null,"\u6b64\u540d\u79f0\u8981\u4e0e ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix/discovery/")," \u76ee\u5f55\u4e2d\u5b9e\u73b0\u5bf9\u5e94\u6ce8\u518c\u4e2d\u5fc3\u7684\u6587\u4ef6\u540d\u4fdd\u6301\u4e00\u81f4\u3002"),(0,i.kt)("p",null,"\u73b0\u5df2\u652f\u6301\u6ce8\u518c\u4e2d\u5fc3\u6709\uff1aEureka \u3002"),(0,i.kt)("h3",{id:"eureka-\u7684\u914d\u7f6e"},"Eureka \u7684\u914d\u7f6e"),(0,i.kt)("p",null,"\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u589e\u52a0\u5982\u4e0b\u683c\u5f0f\u7684\u914d\u7f6e\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'discovery:\n  eureka:\n    host: # it\'s possible to define multiple eureka hosts addresses of the same eureka cluster.\n      - "http://${username}:${password}@${eureka_host1}:${eureka_port1}"\n      - "http://${username}:${password}@${eureka_host2}:${eureka_port2}"\n    prefix: "/eureka/"\n    fetch_interval: 30 # \u4ece eureka \u4e2d\u62c9\u53d6\u6570\u636e\u7684\u65f6\u95f4\u95f4\u9694\uff0c\u9ed8\u8ba430\u79d2\n    weight: 100 # default weight for node\n    timeout:\n      connect: 2000 # \u8fde\u63a5 eureka \u7684\u8d85\u65f6\u65f6\u95f4\uff0c\u9ed8\u8ba42000ms\n      send: 2000 # \u5411 eureka \u53d1\u9001\u6570\u636e\u7684\u8d85\u65f6\u65f6\u95f4\uff0c\u9ed8\u8ba42000ms\n      read: 5000 # \u4ece eureka \u8bfb\u6570\u636e\u7684\u8d85\u65f6\u65f6\u95f4\uff0c\u9ed8\u8ba45000ms\n')),(0,i.kt)("p",null,"\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"discovery.eureka.host")," \u914d\u7f6e eureka \u7684\u670d\u52a1\u5668\u5730\u5740\u3002"),(0,i.kt)("p",null,"\u5982\u679c eureka \u7684\u5730\u5740\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:8761/")," \uff0c\u5e76\u4e14\u4e0d\u9700\u8981\u7528\u6237\u540d\u548c\u5bc6\u7801\u9a8c\u8bc1\u7684\u8bdd\uff0c\u914d\u7f6e\u5982\u4e0b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'discovery:\n  eureka:\n    host:\n      - "http://127.0.0.1:8761"\n    prefix: "/eureka/"\n')),(0,i.kt)("h2",{id:"upstream-\u914d\u7f6e"},"upstream \u914d\u7f6e"),(0,i.kt)("p",null,"APISIX \u662f\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"upstream.discovery_type")," \u9009\u62e9\u4f7f\u7528\u7684\u670d\u52a1\u53d1\u73b0\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"upstream.service_name"),' \u4e0e\u6ce8\u518c\u4e2d\u5fc3\u7684\u670d\u52a1\u540d\u8fdb\u884c\u5173\u8054\u3002\u4e0b\u9762\u662f\u5c06 URL \u4e3a "/user/',"*",'" \u7684\u8bf7\u6c42\u8def\u7531\u5230\u6ce8\u518c\u4e2d\u5fc3\u540d\u4e3a "USER-SERVICE" \u7684\u670d\u52a1\u4e0a\u4f8b\u5b50\uff1a'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -i -d \'\n{\n    "uri": "/user/*",\n    "upstream": {\n        "service_name": "USER-SERVICE",\n        "type": "roundrobin",\n        "discovery_type": "eureka"\n    }\n}\'\n\nHTTP/1.1 201 Created\nDate: Sat, 31 Aug 2019 01:17:15 GMT\nContent-Type: text/plain\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX web server\n\n{"node":{"value":{"uri":"\\/user\\/*","upstream": {"service_name": "USER-SERVICE", "type": "roundrobin", "discovery_type": "eureka"}},"createdIndex":61925,"key":"\\/apisix\\/routes\\/1","modifiedIndex":61925},"action":"create"}\n')),(0,i.kt)("p",null,"\u56e0\u4e3a\u4e0a\u6e38\u7684\u63a5\u53e3 URL \u53ef\u80fd\u4f1a\u6709\u51b2\u7a81\uff0c\u901a\u5e38\u4f1a\u5728\u7f51\u5173\u901a\u8fc7\u524d\u7f00\u6765\u8fdb\u884c\u533a\u5206\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -i -d \'\n{\n    "uri": "/a/*",\n    "plugins": {\n        "proxy-rewrite" : {\n            "regex_uri": ["^/a/(.*)", "/${1}"]\n        }\n    },\n    "upstream": {\n        "service_name": "A-SERVICE",\n        "type": "roundrobin",\n        "discovery_type": "eureka"\n    }\n}\'\n\n$ curl http://127.0.0.1:9080/apisix/admin/routes/2 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -i -d \'\n{\n    "uri": "/b/*",\n    "plugins": {\n        "proxy-rewrite" : {\n            "regex_uri": ["^/b/(.*)", "/${1}"]\n        }\n    },\n    "upstream": {\n        "service_name": "B-SERVICE",\n        "type": "roundrobin",\n        "discovery_type": "eureka"\n    }\n}\'\n')),(0,i.kt)("p",null,"\u5047\u5982 A-SERVICE \u548c B-SERVICE \u90fd\u63d0\u4f9b\u4e86\u4e00\u4e2a ",(0,i.kt)("inlineCode",{parentName:"p"},"/test")," \u7684\u63a5\u53e3\uff0c\u901a\u8fc7\u4e0a\u9762\u7684\u914d\u7f6e\uff0c\u53ef\u4ee5\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"/a/test")," \u8bbf\u95ee A-SERVICE \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"/test")," \u63a5\u53e3\uff0c\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"/b/test")," \u8bbf\u95ee B-SERVICE \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"/test")," \u63a5\u53e3\u3002"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"\u6ce8\u610f"),"\uff1a\u914d\u7f6e ",(0,i.kt)("inlineCode",{parentName:"p"},"upstream.service_name")," \u540e ",(0,i.kt)("inlineCode",{parentName:"p"},"upstream.nodes")," \u5c06\u4e0d\u518d\u751f\u6548\uff0c\u800c\u662f\u4f7f\u7528\u4ece\u6ce8\u518c\u4e2d\u5fc3\u7684\u6570\u636e\u6765\u66ff\u6362\uff0c\u5373\u4f7f\u6ce8\u518c\u4e2d\u5fc3\u7684\u6570\u636e\u662f\u7a7a\u7684\u3002"))}c.isMDXComponent=!0}}]);