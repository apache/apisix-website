(self.webpackChunk=self.webpackChunk||[]).push([[97051],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return c},kt:function(){return m}});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=a.createContext({}),d=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=d(e.components);return a.createElement(o.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=d(t),m=r,k=u["".concat(o,".").concat(m)]||u[m]||s[m]||i;return t?a.createElement(k,l(l({ref:n},c),{},{components:t})):a.createElement(k,l({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=u;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var d=2;d<i;d++)l[d]=t[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},13497:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return l},metadata:function(){return p},toc:function(){return o},default:function(){return c}});var a=t(22122),r=t(19756),i=(t(67294),t(3905)),l={title:"\u5e38\u89c1\u95ee\u9898"},p={unversionedId:"FAQ",id:"FAQ",isDocsHomePage:!1,title:"\u5e38\u89c1\u95ee\u9898",description:"\x3c!--",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/current/FAQ.md",sourceDirName:".",slug:"/FAQ",permalink:"/zh/docs/apisix/next/FAQ",editUrl:"https://github.com/apache/apisix/edit/master/docs/zh/latest/FAQ.md",version:"current",frontMatter:{title:"\u5e38\u89c1\u95ee\u9898"},sidebar:"docs",previous:{title:"Control API",permalink:"/zh/docs/apisix/next/control-api"},next:{title:"\u96c6\u6210\u670d\u52a1\u53d1\u73b0\u6ce8\u518c\u4e2d\u5fc3",permalink:"/zh/docs/apisix/next/discovery"}},o=[{value:"\u4e3a\u4ec0\u4e48\u8981\u505a API \u7f51\u5173\uff1f\u4e0d\u662f\u5df2\u7ecf\u6709\u5176\u4ed6\u7684\u5f00\u6e90\u7f51\u5173\u4e86\u5417\uff1f",id:"\u4e3a\u4ec0\u4e48\u8981\u505a-api-\u7f51\u5173\uff1f\u4e0d\u662f\u5df2\u7ecf\u6709\u5176\u4ed6\u7684\u5f00\u6e90\u7f51\u5173\u4e86\u5417\uff1f",children:[]},{value:"APISIX \u548c\u5176\u4ed6\u7684 API \u7f51\u5173\u6709\u4ec0\u4e48\u4e0d\u540c\u4e4b\u5904\uff1f",id:"apisix-\u548c\u5176\u4ed6\u7684-api-\u7f51\u5173\u6709\u4ec0\u4e48\u4e0d\u540c\u4e4b\u5904\uff1f",children:[]},{value:"APISIX \u7684\u6027\u80fd\u600e\u4e48\u6837\uff1f",id:"apisix-\u7684\u6027\u80fd\u600e\u4e48\u6837\uff1f",children:[]},{value:"APISIX \u662f\u5426\u6709\u63a7\u5236\u53f0\u754c\u9762\uff1f",id:"apisix-\u662f\u5426\u6709\u63a7\u5236\u53f0\u754c\u9762\uff1f",children:[]},{value:"\u6211\u53ef\u4ee5\u81ea\u5df1\u5199\u63d2\u4ef6\u5417\uff1f",id:"\u6211\u53ef\u4ee5\u81ea\u5df1\u5199\u63d2\u4ef6\u5417\uff1f",children:[]},{value:"\u6211\u4eec\u4e3a\u4ec0\u4e48\u9009\u62e9 etcd \u4f5c\u4e3a\u914d\u7f6e\u4e2d\u5fc3\uff1f",id:"\u6211\u4eec\u4e3a\u4ec0\u4e48\u9009\u62e9-etcd-\u4f5c\u4e3a\u914d\u7f6e\u4e2d\u5fc3\uff1f",children:[]},{value:"\u4e3a\u4ec0\u4e48\u5728\u7528 Luarocks \u5b89\u88c5 APISIX \u4f9d\u8d56\u65f6\u4f1a\u9047\u5230\u8d85\u65f6\uff0c\u5f88\u6162\u6216\u8005\u4e0d\u6210\u529f\u7684\u60c5\u51b5\uff1f",id:"\u4e3a\u4ec0\u4e48\u5728\u7528-luarocks-\u5b89\u88c5-apisix-\u4f9d\u8d56\u65f6\u4f1a\u9047\u5230\u8d85\u65f6\uff0c\u5f88\u6162\u6216\u8005\u4e0d\u6210\u529f\u7684\u60c5\u51b5\uff1f",children:[]},{value:"\u5982\u4f55\u901a\u8fc7 APISIX \u652f\u6301\u7070\u5ea6\u53d1\u5e03\uff1f",id:"\u5982\u4f55\u901a\u8fc7-apisix-\u652f\u6301\u7070\u5ea6\u53d1\u5e03\uff1f",children:[]},{value:"\u5982\u4f55\u652f\u6301 http \u81ea\u52a8\u8df3\u8f6c\u5230 https\uff1f",id:"\u5982\u4f55\u652f\u6301-http-\u81ea\u52a8\u8df3\u8f6c\u5230-https\uff1f",children:[]},{value:"\u5982\u4f55\u4fee\u6539\u65e5\u5fd7\u7b49\u7ea7",id:"\u5982\u4f55\u4fee\u6539\u65e5\u5fd7\u7b49\u7ea7",children:[]},{value:"\u5982\u4f55\u52a0\u8f7d\u81ea\u5df1\u7f16\u5199\u7684\u63d2\u4ef6",id:"\u5982\u4f55\u52a0\u8f7d\u81ea\u5df1\u7f16\u5199\u7684\u63d2\u4ef6",children:[]},{value:"\u5982\u4f55\u8ba9 APISIX \u5728\u5904\u7406 HTTP \u6216 HTTPS \u8bf7\u6c42\u65f6\u76d1\u542c\u591a\u4e2a\u7aef\u53e3",id:"\u5982\u4f55\u8ba9-apisix-\u5728\u5904\u7406-http-\u6216-https-\u8bf7\u6c42\u65f6\u76d1\u542c\u591a\u4e2a\u7aef\u53e3",children:[]},{value:"APISIX \u5229\u7528 etcd \u5982\u4f55\u5b9e\u73b0\u6beb\u79d2\u7ea7\u522b\u7684\u914d\u7f6e\u540c\u6b65",id:"apisix-\u5229\u7528-etcd-\u5982\u4f55\u5b9e\u73b0\u6beb\u79d2\u7ea7\u522b\u7684\u914d\u7f6e\u540c\u6b65",children:[]},{value:"\u5982\u4f55\u81ea\u5b9a\u4e49 APISIX \u5b9e\u4f8b id",id:"\u5982\u4f55\u81ea\u5b9a\u4e49-apisix-\u5b9e\u4f8b-id",children:[]},{value:"\u4e3a\u4ec0\u4e48 <code>error.log</code> \u4e2d\u4f1a\u6709\u8bb8\u591a\u8bf8\u5982 &quot;failed to fetch data from etcd, failed to read etcd dir, etcd key: xxxxxx&quot; \u7684\u9519\u8bef\uff1f",id:"\u4e3a\u4ec0\u4e48-errorlog-\u4e2d\u4f1a\u6709\u8bb8\u591a\u8bf8\u5982-failed-to-fetch-data-from-etcd-failed-to-read-etcd-dir-etcd-key-xxxxxx-\u7684\u9519\u8bef\uff1f",children:[]},{value:"\u5982\u4f55\u521b\u5efa\u9ad8\u53ef\u7528\u7684 Apache APISIX \u96c6\u7fa4\uff1f",id:"\u5982\u4f55\u521b\u5efa\u9ad8\u53ef\u7528\u7684-apache-apisix-\u96c6\u7fa4\uff1f",children:[]},{value:"\u4e3a\u4ec0\u4e48\u6e90\u7801\u5b89\u88c5\u4e2d\u6267\u884c <code>make deps</code> \u547d\u4ee4\u5931\u8d25\uff1f",id:"\u4e3a\u4ec0\u4e48\u6e90\u7801\u5b89\u88c5\u4e2d\u6267\u884c-make-deps-\u547d\u4ee4\u5931\u8d25\uff1f",children:[]},{value:"\u5982\u4f55\u901a\u8fc7 APISIX \u4ee3\u7406\u8bbf\u95ee APISIX Dashboard",id:"\u5982\u4f55\u901a\u8fc7-apisix-\u4ee3\u7406\u8bbf\u95ee-apisix-dashboard",children:[]},{value:"route \u7684 <code>uri</code> \u5982\u4f55\u8fdb\u884c\u6b63\u5219\u5339\u914d",id:"route-\u7684-uri-\u5982\u4f55\u8fdb\u884c\u6b63\u5219\u5339\u914d",children:[]},{value:"upstream \u8282\u70b9\u662f\u5426\u652f\u6301\u914d\u7f6e FQDN \u5730\u5740?",id:"upstream-\u8282\u70b9\u662f\u5426\u652f\u6301\u914d\u7f6e-fqdn-\u5730\u5740",children:[]},{value:"Admin API \u7684 <code>X-API-KEY</code> \u6307\u7684\u662f\u4ec0\u4e48\uff1f\u662f\u5426\u53ef\u4ee5\u4fee\u6539\uff1f",id:"admin-api-\u7684-x-api-key-\u6307\u7684\u662f\u4ec0\u4e48\uff1f\u662f\u5426\u53ef\u4ee5\u4fee\u6539\uff1f",children:[]},{value:"\u5982\u4f55\u5141\u8bb8\u6240\u6709 IP \u8bbf\u95ee Admin API",id:"\u5982\u4f55\u5141\u8bb8\u6240\u6709-ip-\u8bbf\u95ee-admin-api",children:[]}],d={toc:o};function c(e){var n=e.components,t=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u4e3a\u4ec0\u4e48\u8981\u505a-api-\u7f51\u5173\uff1f\u4e0d\u662f\u5df2\u7ecf\u6709\u5176\u4ed6\u7684\u5f00\u6e90\u7f51\u5173\u4e86\u5417\uff1f"},"\u4e3a\u4ec0\u4e48\u8981\u505a API \u7f51\u5173\uff1f\u4e0d\u662f\u5df2\u7ecf\u6709\u5176\u4ed6\u7684\u5f00\u6e90\u7f51\u5173\u4e86\u5417\uff1f"),(0,i.kt)("p",null,"\u5fae\u670d\u52a1\u9886\u57df\u5bf9 API \u7f51\u5173\u6709\u65b0\u7684\u9700\u6c42\uff1a\u66f4\u9ad8\u7684\u7075\u6d3b\u6027\u3001\u66f4\u9ad8\u7684\u6027\u80fd\u8981\u6c42\uff0c\u4ee5\u53ca\u4e91\u539f\u751f\u7684\u8d34\u5408\u3002"),(0,i.kt)("h2",{id:"apisix-\u548c\u5176\u4ed6\u7684-api-\u7f51\u5173\u6709\u4ec0\u4e48\u4e0d\u540c\u4e4b\u5904\uff1f"},"APISIX \u548c\u5176\u4ed6\u7684 API \u7f51\u5173\u6709\u4ec0\u4e48\u4e0d\u540c\u4e4b\u5904\uff1f"),(0,i.kt)("p",null,"APISIX \u57fa\u4e8e etcd \u6765\u5b8c\u6210\u914d\u7f6e\u7684\u4fdd\u5b58\u548c\u540c\u6b65\uff0c\u800c\u4e0d\u662f postgres \u6216\u8005 MySQL \u8fd9\u7c7b\u5173\u7cfb\u578b\u6570\u636e\u5e93\u3002\n\u8fd9\u6837\u4e0d\u4ec5\u53bb\u6389\u4e86\u8f6e\u8be2\uff0c\u8ba9\u4ee3\u7801\u66f4\u52a0\u7684\u7b80\u6d01\uff0c\u914d\u7f6e\u540c\u6b65\u4e5f\u66f4\u52a0\u5b9e\u65f6\u3002\u540c\u65f6\u7cfb\u7edf\u4e5f\u4e0d\u4f1a\u5b58\u5728\u5355\u70b9\uff0c\u53ef\u7528\u6027\u66f4\u9ad8\u3002"),(0,i.kt)("p",null,"\u53e6\u5916\uff0cAPISIX \u5177\u5907\u52a8\u6001\u8def\u7531\u548c\u63d2\u4ef6\u70ed\u52a0\u8f7d\uff0c\u7279\u522b\u9002\u5408\u5fae\u670d\u52a1\u4f53\u7cfb\u4e0b\u7684 API \u7ba1\u7406\u3002"),(0,i.kt)("h2",{id:"apisix-\u7684\u6027\u80fd\u600e\u4e48\u6837\uff1f"},"APISIX \u7684\u6027\u80fd\u600e\u4e48\u6837\uff1f"),(0,i.kt)("p",null,"APISIX \u8bbe\u8ba1\u548c\u5f00\u53d1\u7684\u76ee\u6807\u4e4b\u4e00\uff0c\u5c31\u662f\u4e1a\u754c\u6700\u9ad8\u7684\u6027\u80fd\u3002\u5177\u4f53\u6d4b\u8bd5\u6570\u636e\u89c1\u8fd9\u91cc\uff1a",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/benchmark"},"benchmark")),(0,i.kt)("p",null,"APISIX \u662f\u5f53\u524d\u6027\u80fd\u6700\u597d\u7684 API \u7f51\u5173\uff0c\u5355\u6838 QPS \u8fbe\u5230 2.3 \u4e07\uff0c\u5e73\u5747\u5ef6\u65f6\u4ec5\u6709 0.6 \u6beb\u79d2\u3002"),(0,i.kt)("h2",{id:"apisix-\u662f\u5426\u6709\u63a7\u5236\u53f0\u754c\u9762\uff1f"},"APISIX \u662f\u5426\u6709\u63a7\u5236\u53f0\u754c\u9762\uff1f"),(0,i.kt)("p",null,"\u662f\u7684\uff0cAPISIX \u5177\u6709\u529f\u80fd\u5f3a\u5927\u7684 Dashboard\u3002APISIX \u4e0e ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard"},"APISIX Dashboard")," \u662f\u76f8\u4e92\u72ec\u7acb\u7684\u9879\u76ee\uff0c\u4f60\u53ef\u4ee5\u90e8\u7f72 ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-dashboard"},"APISIX Dashboard")," \u901a\u8fc7 web \u754c\u9762\u6765\u64cd\u4f5c APISIX\u3002"),(0,i.kt)("h2",{id:"\u6211\u53ef\u4ee5\u81ea\u5df1\u5199\u63d2\u4ef6\u5417\uff1f"},"\u6211\u53ef\u4ee5\u81ea\u5df1\u5199\u63d2\u4ef6\u5417\uff1f"),(0,i.kt)("p",null,"\u5f53\u7136\u53ef\u4ee5\uff0cAPISIX \u63d0\u4f9b\u4e86\u7075\u6d3b\u7684\u81ea\u5b9a\u4e49\u63d2\u4ef6\uff0c\u65b9\u4fbf\u5f00\u53d1\u8005\u548c\u4f01\u4e1a\u7f16\u5199\u81ea\u5df1\u7684\u903b\u8f91\u3002"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/plugin-develop"},"\u5982\u4f55\u5f00\u53d1\u63d2\u4ef6")),(0,i.kt)("h2",{id:"\u6211\u4eec\u4e3a\u4ec0\u4e48\u9009\u62e9-etcd-\u4f5c\u4e3a\u914d\u7f6e\u4e2d\u5fc3\uff1f"},"\u6211\u4eec\u4e3a\u4ec0\u4e48\u9009\u62e9 etcd \u4f5c\u4e3a\u914d\u7f6e\u4e2d\u5fc3\uff1f"),(0,i.kt)("p",null,"\u5bf9\u4e8e\u914d\u7f6e\u4e2d\u5fc3\uff0c\u914d\u7f6e\u5b58\u50a8\u53ea\u662f\u6700\u57fa\u672c\u529f\u80fd\uff0cAPISIX \u8fd8\u9700\u8981\u4e0b\u9762\u51e0\u4e2a\u7279\u6027\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u96c6\u7fa4\u652f\u6301"),(0,i.kt)("li",{parentName:"ol"},"\u4e8b\u52a1"),(0,i.kt)("li",{parentName:"ol"},"\u5386\u53f2\u7248\u672c\u7ba1\u7406"),(0,i.kt)("li",{parentName:"ol"},"\u53d8\u5316\u901a\u77e5"),(0,i.kt)("li",{parentName:"ol"},"\u9ad8\u6027\u80fd")),(0,i.kt)("p",null,"APISIX \u9700\u8981\u4e00\u4e2a\u914d\u7f6e\u4e2d\u5fc3\uff0c\u4e0a\u9762\u63d0\u5230\u7684\u5f88\u591a\u529f\u80fd\u662f\u4f20\u7edf\u5173\u7cfb\u578b\u6570\u636e\u5e93\u548c KV \u6570\u636e\u5e93\u662f\u65e0\u6cd5\u63d0\u4f9b\u7684\u3002\u4e0e etcd \u540c\u7c7b\u8f6f\u4ef6\u8fd8\u6709 Consul\u3001ZooKeeper \u7b49\uff0c\u66f4\u8be6\u7ec6\u6bd4\u8f83\u53ef\u4ee5\u53c2\u8003\u8fd9\u91cc\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/etcd-io/website/blob/master/content/en/docs/next/learning/why.md#comparison-chart"},"etcd why"),"\uff0c\u5728\u5c06\u6765\u4e5f\u8bb8\u4f1a\u652f\u6301\u5176\u4ed6\u914d\u7f6e\u5b58\u50a8\u65b9\u6848\u3002"),(0,i.kt)("h2",{id:"\u4e3a\u4ec0\u4e48\u5728\u7528-luarocks-\u5b89\u88c5-apisix-\u4f9d\u8d56\u65f6\u4f1a\u9047\u5230\u8d85\u65f6\uff0c\u5f88\u6162\u6216\u8005\u4e0d\u6210\u529f\u7684\u60c5\u51b5\uff1f"},"\u4e3a\u4ec0\u4e48\u5728\u7528 Luarocks \u5b89\u88c5 APISIX \u4f9d\u8d56\u65f6\u4f1a\u9047\u5230\u8d85\u65f6\uff0c\u5f88\u6162\u6216\u8005\u4e0d\u6210\u529f\u7684\u60c5\u51b5\uff1f"),(0,i.kt)("p",null,"\u9047\u5230 luarocks \u6162\u7684\u95ee\u9898\uff0c\u6709\u4ee5\u4e0b\u4e24\u79cd\u53ef\u80fd\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"luarocks \u5b89\u88c5\u6240\u4f7f\u7528\u7684\u670d\u52a1\u5668\u4e0d\u80fd\u8bbf\u95ee"),(0,i.kt)("li",{parentName:"ol"},"\u4f60\u6240\u5728\u7684\u7f51\u7edc\u5230 github \u670d\u52a1\u5668\u4e4b\u95f4\u6709\u5730\u65b9\u5bf9 ",(0,i.kt)("inlineCode",{parentName:"li"},"git")," \u534f\u8bae\u8fdb\u884c\u5c01\u9501")),(0,i.kt)("p",null,"\u9488\u5bf9\u7b2c\u4e00\u4e2a\u95ee\u9898\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 https_proxy \u6216\u8005\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"--server")," \u9009\u9879\u6765\u6307\u5b9a\u4e00\u4e2a\u4f60\u53ef\u4ee5\u8bbf\u95ee\u6216\u8005\u8bbf\u95ee\u66f4\u5feb\u7684\nluarocks \u670d\u52a1\u3002 \u8fd0\u884c ",(0,i.kt)("inlineCode",{parentName:"p"},"luarocks config rocks_servers")," \u547d\u4ee4\uff08\u8fd9\u4e2a\u547d\u4ee4\u5728 luarocks 3.0 \u7248\u672c\u540e\u5f00\u59cb\u652f\u6301\uff09\n\u53ef\u4ee5\u67e5\u770b\u6709\u54ea\u4e9b\u53ef\u7528\u670d\u52a1\u3002\u5bf9\u4e8e\u4e2d\u56fd\u5927\u9646\u7528\u6237\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"luarocks.cn")," \u8fd9\u4e00\u4e2a luarocks \u670d\u52a1\u3002"),(0,i.kt)("p",null,"\u6211\u4eec\u5df2\u7ecf\u5c01\u88c5\u597d\u4e86\u9009\u62e9\u670d\u52a1\u5730\u5740\u7684\u64cd\u4f5c\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"LUAROCKS_SERVER=https://luarocks.cn make deps\n")),(0,i.kt)("p",null,"\u5982\u679c\u4f7f\u7528\u4ee3\u7406\u4ecd\u7136\u89e3\u51b3\u4e0d\u4e86\u8fd9\u4e2a\u95ee\u9898\uff0c\u90a3\u53ef\u4ee5\u5728\u5b89\u88c5\u7684\u8fc7\u7a0b\u4e2d\u6dfb\u52a0 ",(0,i.kt)("inlineCode",{parentName:"p"},"--verbose")," \u9009\u9879\u6765\u67e5\u770b\u5177\u4f53\u662f\u6162\u5728\u4ec0\u4e48\u5730\u65b9\u3002\u6392\u9664\u524d\u9762\u7684\n\u7b2c\u4e00\u79cd\u60c5\u51b5\uff0c\u53ea\u53ef\u80fd\u662f\u7b2c\u4e8c\u79cd\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"git")," \u534f\u8bae\u88ab\u5c01\u3002\u8fd9\u4e2a\u65f6\u5019\u53ef\u4ee5\u6267\u884c ",(0,i.kt)("inlineCode",{parentName:"p"},'git config --global url."https://".insteadOf git://')," \u547d\u4ee4\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"https")," \u534f\u8bae\u66ff\u4ee3\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u901a\u8fc7-apisix-\u652f\u6301\u7070\u5ea6\u53d1\u5e03\uff1f"},"\u5982\u4f55\u901a\u8fc7 APISIX \u652f\u6301\u7070\u5ea6\u53d1\u5e03\uff1f"),(0,i.kt)("p",null,"\u6bd4\u5982\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"foo.com/product/index.html?id=204&page=2"),", \u6839\u636e URL \u4e2d query string \u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," \u4f5c\u4e3a\u6761\u4ef6\u6765\u7070\u5ea6\u53d1\u5e03\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"A \u7ec4\uff1aid <= 1000"),(0,i.kt)("li",{parentName:"ol"},"B \u7ec4\uff1aid > 1000")),(0,i.kt)("p",null,"\u6709\u4e24\u79cd\u4e0d\u540c\u7684\u65b9\u6cd5\u6765\u5b9e\u73b0\uff1a"),(0,i.kt)("p",null,"1\u3001\u4f7f\u7528 route \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"vars")," \u5b57\u6bb5\u6765\u5b9e\u73b0"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/index.html",\n    "vars": [\n        ["arg_id", "<=", "1000"]\n    ],\n    "plugins": {\n        "redirect": {\n            "uri": "/test?group_id=1"\n        }\n    }\n}\'\n\ncurl -i http://127.0.0.1:9080/apisix/admin/routes/2 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/index.html",\n    "vars": [\n        ["arg_id", ">", "1000"]\n    ],\n    "plugins": {\n        "redirect": {\n            "uri": "/test?group_id=2"\n        }\n    }\n}\'\n')),(0,i.kt)("p",null,"\u66f4\u591a\u7684 lua-resty-radixtree \u5339\u914d\u64cd\u4f5c\uff0c\u53ef\u67e5\u770b\u64cd\u4f5c\u5217\u8868\uff1a\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/lua-resty-radixtree#operator-list"},"https://github.com/api7/lua-resty-radixtree#operator-list")),(0,i.kt)("p",null,"2\u3001\u901a\u8fc7 traffic-split \u63d2\u4ef6\u6765\u5b9e\u73b0"),(0,i.kt)("p",null,"\u8be6\u7ec6\u4f7f\u7528\u793a\u4f8b\u8bf7\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/plugins/traffic-split"},"traffic-split.md")," \u63d2\u4ef6\u6587\u6863\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u652f\u6301-http-\u81ea\u52a8\u8df3\u8f6c\u5230-https\uff1f"},"\u5982\u4f55\u652f\u6301 http \u81ea\u52a8\u8df3\u8f6c\u5230 https\uff1f"),(0,i.kt)("p",null,"\u6bd4\u5982\uff0c\u5c06 ",(0,i.kt)("inlineCode",{parentName:"p"},"http://foo.com")," \u91cd\u5b9a\u5411\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"https://foo.com")),(0,i.kt)("p",null,"\u6709\u51e0\u79cd\u4e0d\u540c\u7684\u65b9\u6cd5\u6765\u5b9e\u73b0\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u76f4\u63a5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"li"},"redirect")," \u63d2\u4ef6\u7684 ",(0,i.kt)("inlineCode",{parentName:"li"},"http_to_https")," \u529f\u80fd\uff1a")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/hello",\n    "host": "foo.com",\n    "plugins": {\n        "redirect": {\n            "http_to_https": true\n        }\n    }\n}\'\n')),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"\u7ed3\u5408\u9ad8\u7ea7\u8def\u7531\u89c4\u5219 ",(0,i.kt)("inlineCode",{parentName:"li"},"vars")," \u548c ",(0,i.kt)("inlineCode",{parentName:"li"},"redirect")," \u63d2\u4ef6\u4e00\u8d77\u4f7f\u7528\uff1a")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/hello",\n    "host": "foo.com",\n    "vars": [\n        [\n            "scheme",\n            "==",\n            "http"\n        ]\n    ],\n    "plugins": {\n        "redirect": {\n            "uri": "https://$host$request_uri",\n            "ret_code": 301\n        }\n    }\n}\'\n')),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},"\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"li"},"serverless"),"\u63d2\u4ef6\uff1a")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/hello",\n    "plugins": {\n        "serverless-pre-function": {\n            "phase": "rewrite",\n            "functions": ["return function() if ngx.var.scheme == \\"http\\" and ngx.var.host == \\"foo.com\\" then ngx.header[\\"Location\\"] = \\"https://foo.com\\" .. ngx.var.request_uri; ngx.exit(ngx.HTTP_MOVED_PERMANENTLY); end; end"]\n        }\n    }\n}\'\n')),(0,i.kt)("p",null,"\u7136\u540e\u6d4b\u8bd5\u4e0b\u662f\u5426\u751f\u6548\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i -H 'Host: foo.com' http://127.0.0.1:9080/hello\n")),(0,i.kt)("p",null,"\u54cd\u5e94\u4f53\u5e94\u8be5\u662f\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"HTTP/1.1 301 Moved Permanently\nDate: Mon, 18 May 2020 02:56:04 GMT\nContent-Type: text/html\nContent-Length: 166\nConnection: keep-alive\nLocation: https://foo.com/hello\nServer: APISIX web server\n\n<html>\n<head><title>301 Moved Permanently</title></head>\n<body>\n<center><h1>301 Moved Permanently</h1></center>\n<hr><center>openresty</center>\n</body>\n</html>\n")),(0,i.kt)("h2",{id:"\u5982\u4f55\u4fee\u6539\u65e5\u5fd7\u7b49\u7ea7"},"\u5982\u4f55\u4fee\u6539\u65e5\u5fd7\u7b49\u7ea7"),(0,i.kt)("p",null,"\u9ed8\u8ba4\u7684 APISIX \u65e5\u5fd7\u7b49\u7ea7\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"warn"),"\uff0c\u5982\u679c\u9700\u8981\u67e5\u770b",(0,i.kt)("inlineCode",{parentName:"p"},"core.log.info"),"\u7684\u6253\u5370\u7ed3\u679c\u9700\u8981\u5c06\u65e5\u5fd7\u7b49\u7ea7\u8c03\u6574\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"info"),"\u3002"),(0,i.kt)("p",null,"\u5177\u4f53\u6b65\u9aa4\uff1a"),(0,i.kt)("p",null,"1\u3001\u4fee\u6539 conf/config.yaml \u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"nginx_config")," \u914d\u7f6e\u53c2\u6570",(0,i.kt)("inlineCode",{parentName:"p"},'error_log_level: "warn"')," \u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},'error_log_level: "info"'),"\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'nginx_config:\n  error_log_level: "info"\n')),(0,i.kt)("p",null,"2\u3001\u91cd\u542f\u6291\u6216 reload APISIX"),(0,i.kt)("p",null,"\u4e4b\u540e\u4fbf\u53ef\u4ee5\u5728 logs/error.log \u4e2d\u67e5\u770b\u5230 info \u7684\u65e5\u5fd7\u4e86\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u52a0\u8f7d\u81ea\u5df1\u7f16\u5199\u7684\u63d2\u4ef6"},"\u5982\u4f55\u52a0\u8f7d\u81ea\u5df1\u7f16\u5199\u7684\u63d2\u4ef6"),(0,i.kt)("p",null,"Apache APISIX \u7684\u63d2\u4ef6\u652f\u6301\u70ed\u52a0\u8f7d\u3002"),(0,i.kt)("p",null,"\u5177\u4f53\u600e\u4e48\u505a\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/plugins"},"\u63d2\u4ef6")," \u4e2d\u5173\u4e8e\u201c\u70ed\u52a0\u8f7d\u201d\u7684\u90e8\u5206\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u8ba9-apisix-\u5728\u5904\u7406-http-\u6216-https-\u8bf7\u6c42\u65f6\u76d1\u542c\u591a\u4e2a\u7aef\u53e3"},"\u5982\u4f55\u8ba9 APISIX \u5728\u5904\u7406 HTTP \u6216 HTTPS \u8bf7\u6c42\u65f6\u76d1\u542c\u591a\u4e2a\u7aef\u53e3"),(0,i.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0cAPISIX \u5728\u5904\u7406 HTTP \u8bf7\u6c42\u65f6\u53ea\u76d1\u542c 9080 \u7aef\u53e3\u3002\u5982\u679c\u4f60\u60f3\u8ba9 APISIX \u76d1\u542c\u591a\u4e2a\u7aef\u53e3\uff0c\u4f60\u9700\u8981\u4fee\u6539\u914d\u7f6e\u6587\u4ef6\u4e2d\u7684\u76f8\u5173\u53c2\u6570\uff0c\u5177\u4f53\u6b65\u9aa4\u5982\u4e0b\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"\u4fee\u6539 ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u4e2d HTTP \u7aef\u53e3\u76d1\u542c\u7684\u53c2\u6570",(0,i.kt)("inlineCode",{parentName:"p"},"node_listen"),"\uff0c\u793a\u4f8b\uff1a"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"apisix:\n  node_listen:\n    - 9080\n    - 9081\n    - 9082\n")),(0,i.kt)("p",{parentName:"li"},"\u5904\u7406 HTTPS \u8bf7\u6c42\u4e5f\u7c7b\u4f3c\uff0c\u4fee\u6539",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"\u4e2d HTTPS \u7aef\u53e3\u76d1\u542c\u7684\u53c2\u6570",(0,i.kt)("inlineCode",{parentName:"p"},"ssl.listen_port"),"\uff0c\u793a\u4f8b\uff1a"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"apisix:\n  ssl:\n    listen_port:\n      - 9443\n      - 9444\n      - 9445\n")))),(0,i.kt)("p",null,"2.\u91cd\u542f\u6291\u6216 reload APISIX"),(0,i.kt)("h2",{id:"apisix-\u5229\u7528-etcd-\u5982\u4f55\u5b9e\u73b0\u6beb\u79d2\u7ea7\u522b\u7684\u914d\u7f6e\u540c\u6b65"},"APISIX \u5229\u7528 etcd \u5982\u4f55\u5b9e\u73b0\u6beb\u79d2\u7ea7\u522b\u7684\u914d\u7f6e\u540c\u6b65"),(0,i.kt)("p",null,"etcd \u63d0\u4f9b\u8ba2\u9605\u63a5\u53e3\u7528\u4e8e\u76d1\u542c\u6307\u5b9a\u5173\u952e\u5b57\u3001\u76ee\u5f55\u662f\u5426\u53d1\u751f\u53d8\u66f4\uff08\u6bd4\u5982\uff1a ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/lua-resty-etcd/blob/master/api_v3.md#watch"},"watch"),"\u3001",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/lua-resty-etcd/blob/master/api_v3.md#watchdir"},"watchdir"),"\uff09\u3002"),(0,i.kt)("p",null,"APISIX \u4e3b\u8981\u4f7f\u7528 ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/lua-resty-etcd/blob/master/api_v3.md#watchdir"},"etcd.watchdir")," \u76d1\u89c6\u76ee\u5f55\u5185\u5bb9\u53d8\u66f4\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u5982\u679c\u76d1\u542c\u76ee\u5f55\u6ca1\u6709\u6570\u636e\u66f4\u65b0\uff1a\u8be5\u8c03\u7528\u4f1a\u88ab\u963b\u585e\uff0c\u76f4\u5230\u8d85\u65f6\u6216\u5176\u4ed6\u9519\u8bef\u8fd4\u56de\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u5982\u679c\u76d1\u542c\u76ee\u5f55\u6709\u6570\u636e\u66f4\u65b0\uff1aetcd \u5c06\u7acb\u523b\u8fd4\u56de\u8ba2\u9605(\u6beb\u79d2\u7ea7)\u5230\u7684\u65b0\u6570\u636e\uff0cAPISIX \u5c06\u5b83\u66f4\u65b0\u5230\u5185\u5b58\u7f13\u5b58\u3002")),(0,i.kt)("p",null,"\u501f\u52a9 etcd \u589e\u91cf\u901a\u77e5\u6beb\u79d2\u7ea7\u7279\u6027\uff0cAPISIX \u4e5f\u5c31\u5b8c\u6210\u4e86\u6beb\u79d2\u7ea7\u7684\u914d\u7f6e\u540c\u6b65\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u81ea\u5b9a\u4e49-apisix-\u5b9e\u4f8b-id"},"\u5982\u4f55\u81ea\u5b9a\u4e49 APISIX \u5b9e\u4f8b id"),(0,i.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0cAPISIX \u4f1a\u4ece ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/apisix.uid")," \u4e2d\u8bfb\u53d6\u5b9e\u4f8b id\u3002\u5982\u679c\u627e\u4e0d\u5230\uff0c\u4e14\u6ca1\u6709\u914d\u7f6e id\uff0cAPISIX \u4f1a\u751f\u6210\u4e00\u4e2a ",(0,i.kt)("inlineCode",{parentName:"p"},"uuid")," \u4f5c\u4e3a\u5b9e\u4f8b id\u3002"),(0,i.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u6307\u5b9a\u4e00\u4e2a\u6709\u610f\u4e49\u7684 id \u6765\u7ed1\u5b9a APISIX \u5b9e\u4f8b\u5230\u4f60\u7684\u5185\u90e8\u7cfb\u7edf\uff0c\u4f60\u53ef\u4ee5\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u4e2d\u8fdb\u884c\u914d\u7f6e\uff0c\u793a\u4f8b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'```\napisix:\n  id: "your-meaningful-id"\n```\n')),(0,i.kt)("h2",{id:"\u4e3a\u4ec0\u4e48-errorlog-\u4e2d\u4f1a\u6709\u8bb8\u591a\u8bf8\u5982-failed-to-fetch-data-from-etcd-failed-to-read-etcd-dir-etcd-key-xxxxxx-\u7684\u9519\u8bef\uff1f"},"\u4e3a\u4ec0\u4e48 ",(0,i.kt)("inlineCode",{parentName:"h2"},"error.log"),' \u4e2d\u4f1a\u6709\u8bb8\u591a\u8bf8\u5982 "failed to fetch data from etcd, failed to read etcd dir, etcd key: xxxxxx" \u7684\u9519\u8bef\uff1f'),(0,i.kt)("p",null,"\u9996\u5148\u8bf7\u786e\u4fdd APISIX \u548c etcd \u4e4b\u95f4\u4e0d\u5b58\u5728\u7f51\u7edc\u5206\u533a\u7684\u60c5\u51b5\u3002"),(0,i.kt)("p",null,"\u5982\u679c\u7f51\u7edc\u7684\u786e\u662f\u5065\u5eb7\u7684\uff0c\u8bf7\u68c0\u67e5\u4f60\u7684 etcd \u96c6\u7fa4\u662f\u5426\u542f\u7528\u4e86 ",(0,i.kt)("a",{parentName:"p",href:"https://etcd.io/docs/v3.4.0/dev-guide/api_grpc_gateway/"},"gRPC gateway")," \u7279\u6027\u3002\u7136\u800c\uff0c\u5f53\u4f60\u4f7f\u7528\u547d\u4ee4\u884c\u53c2\u6570\u6216\u914d\u7f6e\u6587\u4ef6\u542f\u52a8 etcd \u65f6\uff0c\u6b64\u7279\u6027\u7684\u9ed8\u8ba4\u542f\u7528\u60c5\u51b5\u53c8\u662f\u4e0d\u540c\u7684\u3002"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u5f53\u4f7f\u7528\u547d\u4ee4\u884c\u53c2\u6570\u542f\u52a8 etcd\uff0c\u8be5\u7279\u6027\u9ed8\u8ba4\u88ab\u542f\u7528\uff0c\u76f8\u5173\u9009\u9879\u662f ",(0,i.kt)("inlineCode",{parentName:"li"},"enable-grpc-gateway"),"\u3002")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"etcd --enable-grpc-gateway --data-dir=/path/to/data\n")),(0,i.kt)("p",null,"\u6ce8\u610f\u8be5\u9009\u9879\u5e76\u6ca1\u6709\u5c55\u793a\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"etcd --help")," \u7684\u8f93\u51fa\u4e2d\u3002"),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"\u4f7f\u7528\u914d\u7f6e\u6587\u4ef6\u65f6\uff0c\u8be5\u7279\u6027\u9ed8\u8ba4\u88ab\u5173\u95ed\uff0c\u8bf7\u660e\u786e\u542f\u7528 ",(0,i.kt)("inlineCode",{parentName:"li"},"enable-grpc-gateway")," \u914d\u7f6e\u9879\u3002")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# etcd.json\n{\n    "enable-grpc-gateway": true,\n    "data-dir": "/path/to/data"\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml"},"# etcd.conf.yml\nenable-grpc-gateway: true\n")),(0,i.kt)("p",null,"\u4e8b\u5b9e\u4e0a\u8fd9\u79cd\u5dee\u522b\u5df2\u7ecf\u5728 etcd \u7684 master \u5206\u652f\u4e2d\u6d88\u9664\uff0c\u4f46\u5e76\u6ca1\u6709\u5411\u540e\u79fb\u690d\u5230\u5df2\u7ecf\u53d1\u5e03\u7684\u7248\u672c\u4e2d\uff0c\u6240\u4ee5\u5728\u90e8\u7f72 etcd \u96c6\u7fa4\u65f6\uff0c\u4f9d\u7136\u9700\u8981\u5c0f\u5fc3\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u521b\u5efa\u9ad8\u53ef\u7528\u7684-apache-apisix-\u96c6\u7fa4\uff1f"},"\u5982\u4f55\u521b\u5efa\u9ad8\u53ef\u7528\u7684 Apache APISIX \u96c6\u7fa4\uff1f"),(0,i.kt)("p",null,"APISIX \u7684\u9ad8\u53ef\u7528\u53ef\u5206\u4e3a\u4e24\u4e2a\u90e8\u5206\uff1a"),(0,i.kt)("p",null,"1\u3001Apache APISIX \u7684\u6570\u636e\u5e73\u9762\u662f\u65e0\u72b6\u6001\u7684\uff0c\u53ef\u4ee5\u8fdb\u884c\u968f\u610f\u7684\u5f39\u6027\u4f38\u7f29\uff0c\u524d\u9762\u52a0\u4e00\u5c42 LB \u5373\u53ef\u3002"),(0,i.kt)("p",null,"2\u3001Apache APISIX \u7684\u63a7\u5236\u5e73\u9762\u662f\u4f9d\u8d56\u4e8e ",(0,i.kt)("inlineCode",{parentName:"p"},"etcd cluster")," \u7684\u9ad8\u53ef\u7528\u5b9e\u73b0\u7684\uff0c\u4e0d\u9700\u8981\u4efb\u4f55\u5173\u7cfb\u578b\u6570\u636e\u5e93\u7684\u4f9d\u8d56\u3002"),(0,i.kt)("h2",{id:"\u4e3a\u4ec0\u4e48\u6e90\u7801\u5b89\u88c5\u4e2d\u6267\u884c-make-deps-\u547d\u4ee4\u5931\u8d25\uff1f"},"\u4e3a\u4ec0\u4e48\u6e90\u7801\u5b89\u88c5\u4e2d\u6267\u884c ",(0,i.kt)("inlineCode",{parentName:"h2"},"make deps")," \u547d\u4ee4\u5931\u8d25\uff1f"),(0,i.kt)("p",null,"1\u3001\u5f53\u6267\u884c ",(0,i.kt)("inlineCode",{parentName:"p"},"make deps")," \u547d\u4ee4\u65f6\uff0c\u53d1\u751f\u8bf8\u5982\u4e0b\u9762\u6240\u793a\u7684\u9519\u8bef\u3002\u8fd9\u662f\u7531\u4e8e\u7f3a\u5c11 OpenResty  \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"openssl")," \u5f00\u53d1\u8f6f\u4ef6\u5305\u5bfc\u81f4\u7684\uff0c\u4f60\u9700\u8981\u5148\u5b89\u88c5\u5b83\u3002\u8bf7\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/install-dependencies"},"install dependencies")," \u6587\u6863\u8fdb\u884c\u5b89\u88c5\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ make deps\n......\nError: Failed installing dependency: https://luarocks.org/luasec-0.9-1.src.rock - Could not find header file for OPENSSL\n  No file openssl/ssl.h in /usr/local/include\nYou may have to install OPENSSL in your system and/or pass OPENSSL_DIR or OPENSSL_INCDIR to the luarocks command.\nExample: luarocks install luasec OPENSSL_DIR=/usr/local\nmake: *** [deps] Error 1\n")),(0,i.kt)("h2",{id:"\u5982\u4f55\u901a\u8fc7-apisix-\u4ee3\u7406\u8bbf\u95ee-apisix-dashboard"},"\u5982\u4f55\u901a\u8fc7 APISIX \u4ee3\u7406\u8bbf\u95ee APISIX Dashboard"),(0,i.kt)("p",null,"1\u3001\u4fdd\u6301 APISIX \u4ee3\u7406\u7aef\u53e3\u548c Admin API \u7aef\u53e3\u4e0d\u540c\uff08\u6216\u7981\u7528 Admin API\uff09\u3002\u4f8b\u5982\uff0c\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u4e2d\u505a\u5982\u4e0b\u914d\u7f6e\u3002"),(0,i.kt)("p",null,"Admin API \u4f7f\u7528\u72ec\u7acb\u7aef\u53e3 9180\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  port_admin: 9180            # use a separate port\n")),(0,i.kt)("p",null,"2\u3001\u6dfb\u52a0 APISIX Dashboard \u7684\u4ee3\u7406\u8def\u7531\uff1a"),(0,i.kt)("p",null,"\u6ce8\u610f\uff1a\u8fd9\u91cc\u7684 APISIX Dashboard \u670d\u52a1\u6b63\u5728\u76d1\u542c ",(0,i.kt)("inlineCode",{parentName:"p"},"127.0.0.1:9000"),"\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9180/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uris":[ "/*" ],\n    "name":"apisix_proxy_dashboard",\n    "upstream":{\n        "nodes":[\n            {\n                "host":"127.0.0.1",\n                "port":9000,\n                "weight":1\n            }\n        ],\n        "type":"roundrobin"\n    }\n}\'\n')),(0,i.kt)("h2",{id:"route-\u7684-uri-\u5982\u4f55\u8fdb\u884c\u6b63\u5219\u5339\u914d"},"route \u7684 ",(0,i.kt)("inlineCode",{parentName:"h2"},"uri")," \u5982\u4f55\u8fdb\u884c\u6b63\u5219\u5339\u914d"),(0,i.kt)("p",null,"\u8fd9\u91cc\u901a\u8fc7 route \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"vars")," \u5b57\u6bb5\u6765\u5b9e\u73b0 uri \u7684\u6b63\u5219\u5339\u914d\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/*",\n    "vars": [\n        ["uri", "~~", "^/[a-z]+$"]\n    ],\n    "upstream": {\n            "type": "roundrobin",\n            "nodes": {\n                "127.0.0.1:1980": 1\n            }\n    }\n}\'\n')),(0,i.kt)("p",null,"\u6d4b\u8bd5\u8bf7\u6c42\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# uri \u5339\u914d\u6210\u529f\n$ curl http://127.0.0.1:9080/hello -i\nHTTP/1.1 200 OK\n...\n\n# uri \u5339\u914d\u5931\u8d25\n$ curl http://127.0.0.1:9080/12ab -i\nHTTP/1.1 404 Not Found\n...\n")),(0,i.kt)("p",null,"\u5728 route \u4e2d\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"uri")," \u7ed3\u5408 ",(0,i.kt)("inlineCode",{parentName:"p"},"vars")," \u5b57\u6bb5\u6765\u5b9e\u73b0\u66f4\u591a\u7684\u6761\u4ef6\u5339\u914d\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"vars")," \u7684\u66f4\u591a\u4f7f\u7528\u7ec6\u8282\u8bf7\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/lua-resty-expr"},"lua-resty-expr"),"\u3002"),(0,i.kt)("h2",{id:"upstream-\u8282\u70b9\u662f\u5426\u652f\u6301\u914d\u7f6e-fqdn-\u5730\u5740"},"upstream \u8282\u70b9\u662f\u5426\u652f\u6301\u914d\u7f6e ",(0,i.kt)("a",{parentName:"h2",href:"https://en.wikipedia.org/wiki/Fully_qualified_domain_name"},"FQDN")," \u5730\u5740?"),(0,i.kt)("p",null,"\u8fd9\u662f\u652f\u6301\u7684\uff0c\u4e0b\u9762\u662f\u4e00\u4e2a ",(0,i.kt)("inlineCode",{parentName:"p"},"FQDN")," \u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"httpbin.default.svc.cluster.local"),"(\u4e00\u4e2a Kubernetes Service) \u7684\u793a\u4f8b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "uri": "/ip",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.default.svc.cluster.local": 1\n        }\n    }\n}\'\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u6d4b\u8bd5\u8bf7\u6c42\n$ curl http://127.0.0.1:9080/ip -i\nHTTP/1.1 200 OK\n...\n")),(0,i.kt)("h2",{id:"admin-api-\u7684-x-api-key-\u6307\u7684\u662f\u4ec0\u4e48\uff1f\u662f\u5426\u53ef\u4ee5\u4fee\u6539\uff1f"},"Admin API \u7684 ",(0,i.kt)("inlineCode",{parentName:"h2"},"X-API-KEY")," \u6307\u7684\u662f\u4ec0\u4e48\uff1f\u662f\u5426\u53ef\u4ee5\u4fee\u6539\uff1f"),(0,i.kt)("p",null,"1\u3001Admin API \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"X-API-KEY")," \u6307\u7684\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u6587\u4ef6\u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix.admin_key.key"),"\uff0c\u9ed8\u8ba4\u503c\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"edd1c9f034335f136f87ad84b625c8f1"),"\u3002\u5b83\u662f Admin API \u7684\u8bbf\u95ee token\u3002"),(0,i.kt)("p",null,"\u6ce8\u610f\uff1a\u4f7f\u7528\u9ed8\u8ba4\u7684 API token \u5b58\u5728\u5b89\u5168\u98ce\u9669\uff0c\u5efa\u8bae\u5728\u90e8\u7f72\u5230\u751f\u4ea7\u73af\u5883\u65f6\u5bf9\u5176\u8fdb\u884c\u66f4\u65b0\u3002"),(0,i.kt)("p",null,"2\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"X-API-KEY")," \u662f\u53ef\u4ee5\u4fee\u6539\u7684\u3002"),(0,i.kt)("p",null,"\u4f8b\u5982\uff1a\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u6587\u4ef6\u4e2d\u5bf9 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix.admin_key.key")," \u505a\u5982\u4e0b\u4fee\u6539\u5e76 reload APISIX\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apisix:\n  admin_key\n    -\n      name: "admin"\n      key: abcdefghabcdefgh\n      role: admin\n')),(0,i.kt)("p",null,"\u8bbf\u95ee Admin API\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl -i http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: abcdefghabcdefgh\' -X PUT -d \'\n{\n    "uris":[ "/*" ],\n    "name":"admin-token-test",\n    "upstream":{\n        "nodes":[\n            {\n                "host":"127.0.0.1",\n                "port":1980,\n                "weight":1\n            }\n        ],\n        "type":"roundrobin"\n    }\n}\'\n\nHTTP/1.1 200 OK\n......\n')),(0,i.kt)("p",null,"\u8def\u7531\u521b\u5efa\u6210\u529f\uff0c\u8868\u793a ",(0,i.kt)("inlineCode",{parentName:"p"},"X-API-KEY")," \u4fee\u6539\u751f\u6548\u3002"),(0,i.kt)("h2",{id:"\u5982\u4f55\u5141\u8bb8\u6240\u6709-ip-\u8bbf\u95ee-admin-api"},"\u5982\u4f55\u5141\u8bb8\u6240\u6709 IP \u8bbf\u95ee Admin API"),(0,i.kt)("p",null,"Apache APISIX \u9ed8\u8ba4\u53ea\u5141\u8bb8 ",(0,i.kt)("inlineCode",{parentName:"p"},"127.0.0.0/24")," \u7684 IP \u6bb5\u8303\u56f4\u8bbf\u95ee ",(0,i.kt)("inlineCode",{parentName:"p"},"Admin API"),"\uff0c\u5982\u679c\u4f60\u60f3\u5141\u8bb8\u6240\u6709\u7684 IP \u8bbf\u95ee\uff0c\u90a3\u4e48\u4f60\u53ea\u9700\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u914d\u7f6e\u6587\u4ef6\u4e2d\u6dfb\u52a0\u5982\u4e0b\u7684\u914d\u7f6e\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  allow_admin:\n    - 0.0.0.0/0\n")),(0,i.kt)("p",null,"\u91cd\u542f\u6216 reload APISIX\uff0c\u6240\u6709 IP \u4fbf\u53ef\u4ee5\u8bbf\u95ee ",(0,i.kt)("inlineCode",{parentName:"p"},"Admin API"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"\u6ce8\u610f\uff1a\u60a8\u53ef\u4ee5\u5728\u975e\u751f\u4ea7\u73af\u5883\u4e2d\u4f7f\u7528\u6b64\u65b9\u6cd5\uff0c\u4ee5\u5141\u8bb8\u6240\u6709\u5ba2\u6237\u7aef\u4ece\u4efb\u4f55\u5730\u65b9\u8bbf\u95ee\u60a8\u7684 ",(0,i.kt)("inlineCode",{parentName:"strong"},"Apache APISIX")," \u5b9e\u4f8b\uff0c\u4f46\u662f\u5728\u751f\u4ea7\u73af\u5883\u4e2d\u4f7f\u7528\u5b83\u5e76\u4e0d\u5b89\u5168\u3002\u5728\u751f\u4ea7\u73af\u5883\u4e2d\uff0c\u8bf7\u4ec5\u6388\u6743\u7279\u5b9a\u7684 IP \u5730\u5740\u6216\u5730\u5740\u8303\u56f4\u8bbf\u95ee\u60a8\u7684\u5b9e\u4f8b\u3002")))}c.isMDXComponent=!0}}]);