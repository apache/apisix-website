(self.webpackChunk=self.webpackChunk||[]).push([[75863],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return o},kt:function(){return c}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),k=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},o=function(e){var t=k(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),m=k(n),c=r,g=m["".concat(s,".").concat(c)]||m[c]||u[c]||l;return n?a.createElement(g,i(i({ref:t},o),{},{components:n})):a.createElement(g,i({ref:t},o))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var k=2;k<l;k++)i[k]=n[k];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},80954:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},metadata:function(){return p},toc:function(){return s},default:function(){return o}});var a=n(22122),r=n(19756),l=(n(67294),n(3905)),i={title:"skywalking"},p={unversionedId:"plugins/skywalking",id:"version-2.8/plugins/skywalking",isDocsHomePage:!1,title:"skywalking",description:"\x3c!--",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-2.8/plugins/skywalking.md",sourceDirName:"plugins",slug:"/plugins/skywalking",permalink:"/zh/docs/apisix/plugins/skywalking",editUrl:"https://github.com/apache/apisix/edit/master/docs/zh/latest/plugins/skywalking.md",version:"2.8",frontMatter:{title:"skywalking"},sidebar:"version-2.8/docs",previous:{title:"zipkin",permalink:"/zh/docs/apisix/plugins/zipkin"},next:{title:"node-status",permalink:"/zh/docs/apisix/plugins/node-status"}},s=[{value:"\u76ee\u5f55",id:"\u76ee\u5f55",children:[]},{value:"\u540d\u5b57",id:"\u540d\u5b57",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u5982\u4f55\u542f\u7528",id:"\u5982\u4f55\u542f\u7528",children:[]},{value:"\u5982\u4f55\u8bbe\u7f6e endpoint",id:"\u5982\u4f55\u8bbe\u7f6e-endpoint",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[{value:"\u8fd0\u884c Skywalking \u5b9e\u4f8b",id:"\u8fd0\u884c-skywalking-\u5b9e\u4f8b",children:[]}]},{value:"\u7981\u7528\u63d2\u4ef6",id:"\u7981\u7528\u63d2\u4ef6",children:[]},{value:"\u4e0a\u6e38\u670d\u52a1\u662f java \u7684 SpringBoot \u793a\u4f8b\u4ee3\u7801",id:"\u4e0a\u6e38\u670d\u52a1\u662f-java-\u7684-springboot-\u793a\u4f8b\u4ee3\u7801",children:[]}],k={toc:s};function o(e){var t=e.components,n=(0,r.Z)(e,["components"]);return(0,l.kt)("wrapper",(0,a.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u76ee\u5f55"},"\u76ee\u5f55"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#%E5%90%8D%E5%AD%97"},"\u540d\u5b57")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#%E5%B1%9E%E6%80%A7"},"\u5c5e\u6027")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#%E5%A6%82%E4%BD%95%E5%90%AF%E7%94%A8"},"\u5982\u4f55\u542f\u7528")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#%E6%B5%8B%E8%AF%95%E6%8F%92%E4%BB%B6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#%E8%BF%90%E8%A1%8C-Skywalking-%E5%AE%9E%E4%BE%8B"},"\u8fd0\u884c Skywalking \u5b9e\u4f8b")))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#%E7%A6%81%E7%94%A8%E6%8F%92%E4%BB%B6"},"\u7981\u7528\u63d2\u4ef6")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#%E4%B8%8A%E6%B8%B8%E6%9C%8D%E5%8A%A1%E6%98%AFjava%E7%9A%84SpringBoot%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81"},"\u4e0a\u6e38\u670d\u52a1\u662fjava\u7684SpringBoot\u793a\u4f8b\u4ee3\u7801"))),(0,l.kt)("h2",{id:"\u540d\u5b57"},"\u540d\u5b57"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"Skywalking"),"(",(0,l.kt)("a",{parentName:"p",href:"https://github.com/apache/skywalking"},"https://github.com/apache/skywalking"),") \u4f7f\u7528\u5176\u539f\u751f\u7684 Nginx LUA tracer\uff0c\u63d0\u4f9b\u5206\u5e03\u5f0f\u8ffd\u8e2a\u3001\u62d3\u6251\u5206\u6790\u4ee5\u53ca\u670d\u52a1\u548c URI \u7ea7\u522b\u7684 metrics \u4fe1\u606f\u3002"),(0,l.kt)("p",null,"\u670d\u52a1\u7aef\u76ee\u524d\u652f\u6301http\u548cgrpc\u4e24\u79cd\u534f\u8bae\uff0c\u5728apisix\u4e2d\u76ee\u524d\u53ea\u652f\u6301http\u534f\u8bae"),(0,l.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"sample_ratio"),(0,l.kt)("td",{parentName:"tr",align:null},"number"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5fc5\u987b"),(0,l.kt)("td",{parentName:"tr",align:null},"1"),(0,l.kt)("td",{parentName:"tr",align:null},"[0.00001, 1]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u76d1\u542c\u7684\u6bd4\u4f8b")))),(0,l.kt)("h2",{id:"\u5982\u4f55\u542f\u7528"},"\u5982\u4f55\u542f\u7528"),(0,l.kt)("p",null,"\u9996\u5148\uff0c\u4f60\u9700\u8981\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u91cc\u9762\u542f\u7528 Skywalking \u63d2\u4ef6\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"# \u52a0\u5230 config.yaml\nplugins:\n  - ... # plugin you need\n  - skywalking\n")),(0,l.kt)("p",null,"\u7136\u540e\u91cd\u8f7d APISIX\uff0c\u8fd9\u6837\u4f1a\u521b\u5efa\u4e00\u4e2a\u540e\u53f0\u5b9a\u65f6\u5668\uff0c\u5411 skywalking \u670d\u52a1\u5668\u5b9a\u671f\u4e0a\u62a5\u6570\u636e\u3002"),(0,l.kt)("p",null,"\u4e0b\u9762\u662f\u4e00\u4e2a\u793a\u4f8b\uff0c\u5728\u6307\u5b9a\u7684 route \u4e0a\u5f00\u542f\u4e86 skywalking \u63d2\u4ef6:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uris": [\n        "/uid/*"\n    ],\n    "plugins": {\n        "skywalking": {\n            "sample_ratio": 1\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "10.110.149.175:8089": 1\n        }\n    }\n}\'\n')),(0,l.kt)("p",null,"\u4f60\u53ef\u4ee5\u4f7f\u7528\u6d4f\u89c8\u5668\u6253\u5f00 dashboard\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:9080/apisix/dashboard/"),"\uff0c\u901a\u8fc7 web \u754c\u9762\u6765\u5b8c\u6210\u4e0a\u9762\u7684\u64cd\u4f5c\uff0c\u5148\u589e\u52a0\u4e00\u4e2a route\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/plugin/skywalking-1.png",alt:"plugin_skywalking"})),(0,l.kt)("p",null,"\u7136\u540e\u5728 route \u9875\u9762\u4e2d\u6dfb\u52a0 skywalking \u63d2\u4ef6\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/plugin/skywalking-2.png",alt:"plugin_skywalking"})),(0,l.kt)("h2",{id:"\u5982\u4f55\u8bbe\u7f6e-endpoint"},"\u5982\u4f55\u8bbe\u7f6e endpoint"),(0,l.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u6307\u5b9a ",(0,l.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u4e2d\u7684\u914d\u7f6e\u6765\u6307\u5b9a endpoint\uff1a"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"service_name"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},'"APISIX"'),(0,l.kt)("td",{parentName:"tr",align:null},"skywalking \u4e0a\u62a5\u7684 service \u540d\u79f0")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"service_instance_name"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},'"APISIX Instance Name"'),(0,l.kt)("td",{parentName:"tr",align:null},"skywalking \u4e0a\u62a5\u7684 service \u5b9e\u4f8b\u540d, \u5982\u679c\u671f\u671b\u76f4\u63a5\u83b7\u53d6\u672c\u673a\u4e3b\u673a\u540d\u5219\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"$hostname"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"endpoint_addr"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},'"',(0,l.kt)("a",{parentName:"td",href:"http://127.0.0.1:12800%22"},'http://127.0.0.1:12800"')),(0,l.kt)("td",{parentName:"tr",align:null},"Skywalking \u7684 HTTP endpoint \u5730\u5740\uff0c\u4f8b\u5982\uff1a",(0,l.kt)("a",{parentName:"td",href:"http://127.0.0.1:12800"},"http://127.0.0.1:12800"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"report_interval"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4f7f\u7528 skywalking \u5ba2\u6237\u7aef\u5185\u7f6e\u7684\u503c"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e0a\u62a5\u65f6\u95f4\u95f4\u9694\uff0c\u5355\u4f4d\u662f\u79d2")))),(0,l.kt)("p",null,"\u914d\u7f6e\u793a\u4f8b:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'plugin_attr:\n  skywalking:\n    service_name: APISIX\n    service_instance_name: "APISIX Instance Name"\n    endpoint_addr: http://127.0.0.1:12800\n')),(0,l.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,l.kt)("h3",{id:"\u8fd0\u884c-skywalking-\u5b9e\u4f8b"},"\u8fd0\u884c Skywalking \u5b9e\u4f8b"),(0,l.kt)("h4",{id:"\u4f8b\u5b50"},"\u4f8b\u5b50"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u542f\u52a8 Skywalking Server:"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u9ed8\u8ba4\u4f7f\u7528 H2 \u5b58\u50a8\uff0c\u76f4\u63a5\u542f\u52a8 skywalking \u5373\u53ef"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"sudo docker run --name skywalking -d -p 1234:1234 -p 11800:11800 -p 12800:12800 --restart always apache/skywalking-oap-server:8.3.0-es6\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5982\u679c\u4f7f\u7528 Elasticsearch \u5b58\u50a8"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5219\u9700\u8981\u5148\u5b89\u88c5 Elasticsearch:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'sudo docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 --restart always -e "discovery.type=single-node" elasticsearch:6.7.2\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5b89\u88c5 ElasticSearch \u7ba1\u7406\u754c\u9762 elasticsearch-hq"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"sudo docker run -d --name elastic-hq -p 5000:5000 --restart always elastichq/elasticsearch-hq\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u542f\u52a8 skywalking\uff1a"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"sudo docker run --name skywalking -d -p 1234:1234 -p 11800:11800 -p 12800:12800 --restart always --link elasticsearch:elasticsearch -e SW_STORAGE=elasticsearch -e SW_STORAGE_ES_CLUSTER_NODES=elasticsearch:9200 apache/skywalking-oap-server:8.3.0-es6\n"))))))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Skywalking \u7ba1\u7406\u7cfb\u7edf\uff1a"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u542f\u52a8\u7ba1\u7406\u7cfb\u7edf\uff1a"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"sudo docker run --name skywalking-ui -d -p 8080:8080 --link skywalking:skywalking -e SW_OAP_ADDRESS=skywalking:12800 --restart always apache/skywalking-ui\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u6253\u5f00\u7ba1\u7406\u9875\u9762\n\u5728\u6d4f\u89c8\u5668\u91cc\u9762\u8f93\u5165 ",(0,l.kt)("a",{parentName:"p",href:"http://10.110.149.175:8080%EF%BC%8C%E5%87%BA%E7%8E%B0%E4%BA%86%E5%A6%82%E4%B8%8B%E7%95%8C%E9%9D%A2%EF%BC%8C%E5%88%99%E8%A1%A8%E7%A4%BA%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F"},"http://10.110.149.175:8080\uff0c\u51fa\u73b0\u4e86\u5982\u4e0b\u754c\u9762\uff0c\u5219\u8868\u793a\u5b89\u88c5\u6210\u529f")),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/plugin/skywalking-3.png",alt:"plugin_skywalking"}))))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u6d4b\u8bd5\u793a\u4f8b:"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u901a\u8fc7\u8bbf\u95eeapisix\uff0c\u8bbf\u95ee\u4e0a\u6e38\u670d\u52a1"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ curl -v http://10.110.149.192:9080/uid/12\nHTTP/1.1 200 OK\nOK\n...\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6253\u5f00\u6d4f\u89c8\u5668\uff0c\u8bbf\u95ee Skywalking \u7684 web \u9875\u9762\uff1a"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"http://10.110.149.175:8080/\n")),(0,l.kt)("p",{parentName:"li"},"  \u53ef\u4ee5\u770b\u5230\u8bbf\u95ee\u62d3\u6251\u56fe\\\n",(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/plugin/skywalking-4.png",alt:"plugin_skywalking"}),"\\\n\u53ef\u4ee5\u770b\u5230\u670d\u52a1\u8ffd\u8e2a\u56fe\\\n",(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/plugin/skywalking-5.png",alt:"plugin_skywalking"})))))),(0,l.kt)("h2",{id:"\u7981\u7528\u63d2\u4ef6"},"\u7981\u7528\u63d2\u4ef6"),(0,l.kt)("p",null,"\u5f53\u4f60\u60f3\u53bb\u6389\u8def\u7531\u4e0a\u7684\u63d2\u4ef6\u89c4\u5219\u7684\u65f6\u5019\uff0c\u5f88\u7b80\u5355\uff0c\u5728\u63d2\u4ef6\u7684\u914d\u7f6e\u4e2d\u628a\u5bf9\u5e94\u7684 json \u914d\u7f6e\u5220\u9664\u5373\u53ef\uff0c\u65e0\u987b\u91cd\u542f\u670d\u52a1\uff0c\u5373\u523b\u751f\u6548\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:2379/v2/keys/apisix/routes/1  -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d value=\'\n{\n    "methods": ["GET"],\n    "uris": [\n        "/uid/*"\n    ],\n    "plugins": {\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "10.110.149.175:8089": 1\n        }\n    }\n}\'\n')),(0,l.kt)("p",null,"\u73b0\u5728\u5c31\u5df2\u7ecf\u79fb\u9664\u4e86 Skywalking \u63d2\u4ef6\u4e86\u3002\u5176\u4ed6\u63d2\u4ef6\u7684\u5f00\u542f\u548c\u79fb\u9664\u4e5f\u662f\u540c\u6837\u7684\u65b9\u6cd5\u3002"),(0,l.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u5b8c\u5168\u7981\u7528 skywalking \u63d2\u4ef6\uff0c\u6bd4\u5982\u505c\u6389\u540e\u53f0\u4e0a\u62a5\u6570\u636e\u7684\u5b9a\u65f6\u5668\uff0c\u9700\u8981\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"config.yaml"),"\n\u91cc\u628a\u63d2\u4ef6\u6ce8\u91ca\u6389\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"plugins:\n  - ... # plugin you need\n  #- skywalking\n")),(0,l.kt)("p",null,"\u7136\u540e\u91cd\u8f7d APISIX\u3002"),(0,l.kt)("h2",{id:"\u4e0a\u6e38\u670d\u52a1\u662f-java-\u7684-springboot-\u793a\u4f8b\u4ee3\u7801"},"\u4e0a\u6e38\u670d\u52a1\u662f java \u7684 SpringBoot \u793a\u4f8b\u4ee3\u7801"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-java"},'package com.lenovo.ai.controller;\n\nimport org.springframework.web.bind.annotation.PathVariable;\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RestController;\nimport javax.servlet.http.HttpServletRequest;\n\n/**\n * @author cyxinda\n * @create 2020-05-29 14:02\n * @desc skywalking\u6d4b\u8bd5\u4e2d\u592e\u63a7\u5236\u5c42\n **/\n@RestController\npublic class TestController {\n    @RequestMapping("/uid/{count}")\n    public String getUidList(@PathVariable("count") String countStr, HttpServletRequest request) {\n        System.out.println("counter:::::"+countStr);\n       return "OK";\n    }\n}\n\n')),(0,l.kt)("p",null,"\u542f\u52a8\u670d\u52a1\u7684\u65f6\u5019\uff0c\u9700\u8981\u914d\u7f6eskywalking agent,\n\u4fee\u6539agent/config/agent.config\u4e2d\u7684\u914d\u7f6e"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"agent.service_name=yourservername\ncollector.backend_service=10.110.149.175:11800\n")),(0,l.kt)("p",null,"\u542f\u52a8\u670d\u52a1\u811a\u672c\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"nohup java -javaagent:/root/skywalking/app/agent/skywalking-agent.jar \\\n-jar /root/skywalking/app/app.jar \\\n--server.port=8089 \\\n2>&1 > /root/skywalking/app/logs/nohup.log &\n")))}o.isMDXComponent=!0}}]);