(self.webpackChunk=self.webpackChunk||[]).push([[18498],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return k}});var o=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=o.createContext({}),c=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return o.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},s=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=c(n),k=a,g=s["".concat(p,".").concat(k)]||s[k]||m[k]||r;return n?o.createElement(g,i(i({ref:t},u),{},{components:n})):o.createElement(g,i({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=s;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}s.displayName="MDXCreateElement"},95659:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},metadata:function(){return l},toc:function(){return p},default:function(){return u}});var o=n(22122),a=n(19756),r=(n(67294),n(3905)),i={title:"Kong-To-APISIX \u8fc1\u79fb\u5de5\u5177",author:"Yiyiyimu",authorURL:"https://github.com/Yiyiyimu",authorImageURL:"https://avatars.githubusercontent.com/u/34589752?v=4",tags:["technology"]},l={permalink:"/zh/blog/2021/08/05/Kong-to-APISIX",source:"@site/blog/2021-08-05-Kong-to-APISIX.md",title:"Kong-To-APISIX \u8fc1\u79fb\u5de5\u5177",description:"@Yiyiyimu, Apache APISIX committer from Shenzhen Zhiliu Technology Co.",date:"2021-08-05T00:00:00.000Z",formattedDate:"2021\u5e748\u67085\u65e5",tags:[{label:"technology",permalink:"/zh/blog/tags/technology"}],readingTime:1.825,truncated:!0,prevItem:{title:"Apache APISIX \u5728\u79fb\u52a8\u4e91\u7684\u5e94\u7528",permalink:"/zh/blog/2021/08/09/Apache-APISIX-in-China-Mobile-Cloud"},nextItem:{title:"Release Apache APISIX 2.8.0",permalink:"/zh/blog/2021/07/28/release-apache-apisix-2.8-en"}},p=[{value:"\u5de5\u5177\u80fd\u529b",id:"\u5de5\u5177\u80fd\u529b",children:[]},{value:"\u4f7f\u7528\u65b9\u6cd5",id:"\u4f7f\u7528\u65b9\u6cd5",children:[]},{value:"Demo \u6d4b\u8bd5",id:"demo-\u6d4b\u8bd5",children:[]},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[]}],c={toc:p};function u(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/Yiyiyimu"},"@Yiyiyimu"),", Apache APISIX committer from ",(0,r.kt)("a",{parentName:"p",href:"https://www.apiseven.com/"},"Shenzhen Zhiliu Technology Co."))),(0,r.kt)("p",null,"Apache APISIX \u662f\u4e00\u4e2a\u751f\u4ea7\u53ef\u7528\u7684\u5f00\u6e90\u4e03\u5c42\u5168\u6d41\u91cf\u5904\u7406\u5e73\u53f0\uff0c\u53ef\u4f5c\u4e3a API \u7f51\u5173\u5904\u7406\u4e1a\u52a1\u5165\u53e3\u6d41\u91cf\uff0c\u5177\u6709\u6781\u9ad8\u6027\u80fd\u3001\u8d85\u4f4e\u5ef6\u8fdf\uff0c\u5b98\u65b9\u652f\u6301 dashboard \u4ee5\u53ca\u8d85\u8fc7\u4e94\u5341\u79cd\u63d2\u4ef6\u3002\u5982\u679c\u4f60\u6b63\u5728\u4f7f\u7528 Kong\uff0c\u5bf9 APISIX \u611f\u5174\u8da3\u53c8\u82e6\u4e8e\u96be\u4ee5\u4e0a\u624b\uff0c\u4e0d\u59a8\u8bd5\u8bd5\u6211\u4eec\u521a\u5f00\u6e90\u7684\u8fc1\u79fb\u5de5\u5177 Kong-To-APISIX\uff0c\u52a9\u4f60\u4e00\u952e\u5e73\u6ed1\u8fc1\u79fb\u3002"),(0,r.kt)("h2",{id:"\u5de5\u5177\u80fd\u529b"},"\u5de5\u5177\u80fd\u529b"),(0,r.kt)("p",null,"Kong-To-APISIX \u5229\u7528 Kong \u548c APISIX \u7684\u58f0\u660e\u5f0f\u914d\u7f6e\u6587\u4ef6\u5b9e\u73b0\u4e86\u914d\u7f6e\u6570\u636e\u7684\u8fc1\u79fb\uff0c\u5e76\u6839\u636e\u4e24\u4fa7\u67b6\u6784\u548c\u529f\u80fd\u7684\u4e0d\u540c\u505a\u51fa\u76f8\u5e94\u9002\u914d\u3002\u76ee\u524d\u6211\u4eec\u652f\u6301\u4e86 Kong \u4e00\u4fa7 Route\u3001Service\u3001Upstream\u3001Target\uff0cConsumer \u4ee5\u53ca\u4e09\u4e2a\u63d2\u4ef6 Rate Limiting\u3001Proxy Caching \u4ee5\u53ca Key Authentication \u7684\u914d\u7f6e\u8fc1\u79fb\uff0c\u5e76\u4ee5 Kong \u7684 ",(0,r.kt)("a",{parentName:"p",href:"https://docs.konghq.com/getting-started-guide/2.4.x/overview/"},"Getting Started Guide")," \u4e3a\u4f8b\uff0c\u5b8c\u6210\u4e86\u4e00\u4e2a\u6700\u5c0f\u7684 demo\u3002"),(0,r.kt)("h2",{id:"\u4f7f\u7528\u65b9\u6cd5"},"\u4f7f\u7528\u65b9\u6cd5"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"\u4f7f\u7528 Deck \u5bfc\u51fa Kong \u58f0\u660e\u5f0f\u914d\u7f6e\u6587\u4ef6\uff0c\u70b9\u51fb\u67e5\u770b",(0,r.kt)("a",{parentName:"p",href:"https://docs.konghq.com/deck/1.7.x/guides/backup-restore/"},"\u5177\u4f53\u6b65\u9aa4"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"\u4e0b\u8f7d\u4ed3\u5e93\u5e76\u8fd0\u884c\u8fc1\u79fb\u5de5\u5177\uff0c\u8fc1\u79fb\u5de5\u5177\u4f1a\u751f\u6210\u58f0\u660e\u5f0f\u914d\u7f6e\u6587\u4ef6 ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix.yaml")," \u5f85\u4f7f\u7528"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/api7/kong-to-apisix\n\ncd kong-to-apisix\n\nmake build\n\n./bin/kong-to-apisix migrate --input kong.yaml --output apisix.yaml\n\n# migrate succeed\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"li"},"apisix.yaml"),"\u914d\u7f6e APISIX\uff0c \u70b9\u51fb\u67e5\u770b",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/stand-alone"},"\u5177\u4f53\u6b65\u9aa4"),"\u3002")),(0,r.kt)("h2",{id:"demo-\u6d4b\u8bd5"},"Demo \u6d4b\u8bd5"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u786e\u4fdd docker \u6b63\u5e38\u8fd0\u884c\uff0c\u90e8\u7f72\u6d4b\u8bd5\u73af\u5883\uff0c\u4f7f\u7528 docker-compose \u62c9\u8d77 APISIX\u3001Kong")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/apache/apisix-docker\n\ncd kong-to-apisix\n\n./tools/setup.sh\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"\u6839\u636e Kong \u7684 Getting Started Guide\uff0c\u4e3a Kong \u6dfb\u52a0\u914d\u7f6e\u5e76\u8fdb\u884c\u6d4b\u8bd5\uff1a"),(0,r.kt)("p",{parentName:"li"},"a. \u901a\u8fc7 Service \u548c Route \u66b4\u9732\u670d\u52a1\uff0c\u8fdb\u884c\u8def\u7531\u8f6c\u53d1"),(0,r.kt)("p",{parentName:"li"},"b. \u8bbe\u7f6e Rate Limiting \u548c Proxy Caching \u63d2\u4ef6\u505a\u9650\u6d41\u7f13\u5b58"),(0,r.kt)("p",{parentName:"li"},"c. \u8bbe\u7f6e Key Authentication \u63d2\u4ef6\u505a\u8ba4\u8bc1"),(0,r.kt)("p",{parentName:"li"},"d. \u901a\u8fc7 Upstream \u548c Target \u8bbe\u7f6e\u8d1f\u8f7d\u5747\u8861"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"./examples/kong-example.sh\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"\u5bfc\u51fa Kong \u7684\u58f0\u660e\u5f0f\u914d\u7f6e\u6587\u4ef6\u5230 ",(0,r.kt)("inlineCode",{parentName:"li"},"kong.yaml"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"go run ./cmd/dumpkong/main.go\n")),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"\u8fd0\u884c\u8fc1\u79fb\u5de5\u5177\uff0c\u5bfc\u5165 ",(0,r.kt)("inlineCode",{parentName:"li"},"kong.yaml")," \u5e76\u751f\u6210 APISIX \u914d\u7f6e\u6587\u4ef6 ",(0,r.kt)("inlineCode",{parentName:"li"},"apisix.yaml")," \u81f3 docker volumes")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"export EXPORT_PATH=./repos/apisix-docker/example/apisix_conf\n\ngo run ./cmd/kong-to-apisix/main.go\n")),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"\u5728 APISIX \u4e00\u4fa7\u6d4b\u8bd5\u8fc1\u79fb\u8fc7\u540e\u7684\u8def\u7531\u3001\u8d1f\u8f7d\u5747\u8861\u3001\u63d2\u4ef6\u7b49\u662f\u5426\u6b63\u5e38\u8fd0\u884c")),(0,r.kt)("p",null,"a. \u6d4b\u8bd5 key auth \u63d2\u4ef6"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -k -i -m 20 -o /dev/null -s -w %{http_code} http://127.0.0.1:9080/mock\n# output: 401\n")),(0,r.kt)("p",null,"\u200bb. \u6d4b\u8bd5 proxy cache \u63d2\u4ef6"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'# access for the first time\ncurl -k -I -s  -o /dev/null http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"\n# see if got cached\ncurl -I -s -X GET http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"\n# output:\n#   HTTP/1.1 200 OK\n#   ...\n#   Apisix-Cache-Status: HIT\n')),(0,r.kt)("p",null,"\u200bc. \u6d4b\u8bd5 limit count \u63d2\u4ef6"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'for i in {1..5}; do\n    curl -s -o /dev/null -X GET http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"\ndone\ncurl -k -i -m 20 -o /dev/null -s -w %{http_code} http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org"\n# output: 429\n')),(0,r.kt)("p",null,"\u200bd. \u6d4b\u8bd5\u8d1f\u8f7d\u5747\u8861"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'httpbin_num=0\nmockbin_num=0for i in {1..8}; do\n   body=$(curl -k -i -s http://127.0.0.1:9080/mock -H "apikey: apikey" -H "Host: mockbin.org")\n   if [[ $body == *"httpbin"* ]]; then\n      httpbin_num=$((httpbin_num+1))\n   elif [[ $body == *"mockbin"* ]]; then\n      mockbin_num=$((mockbin_num+1))\n   fi\n   sleep 1.5done\necho "httpbin number: "${httpbin_num}", mockbin number: "${mockbin_num}\n# output:\n#   httpbin number: 6, mockbin number: 2\n')),(0,r.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,r.kt)("p",null,"\u8fc1\u79fb\u5de5\u5177\u7684\u540e\u7eed\u5f00\u53d1\u8ba1\u5212\u5df2\u5728 Kong-To-APISIX \u7684 GitHub \u4ed3\u5e93\u7684 Roadmap \u4e2d\u5448\u73b0\uff0c\u6b22\u8fce\u5927\u5bb6\u8bbf\u95ee Kong-To-APISIX \u7684 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/api7/kong-to-apisix"},"GitHub \u4ed3\u5e93\u5730\u5740")," \uff0c\u6d4b\u8bd5\u4e0e\u4f7f\u7528 Kong-To-APISIX\u3002\n\u6b22\u8fce\u4efb\u4f55\u5bf9\u8fd9\u4e2a\u9879\u76ee\u611f\u5174\u8da3\u7684\u4eba\u4e00\u540c\u6765\u4e3a\u8fd9\u4e2a\u9879\u76ee\u4f5c\u8d21\u732e\uff01\u6709\u4efb\u4f55\u95ee\u9898\u90fd\u53ef\u4ee5\u5728\u4ed3\u5e93\u7684 Issues \u533a\u8ba8\u8bba\u3002"))}u.isMDXComponent=!0}}]);