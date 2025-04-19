"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[51649],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=s(n),u=a,k=c["".concat(l,".").concat(u)]||c[u]||d[u]||o;return n?r.createElement(k,p(p({ref:t},m),{},{components:n})):r.createElement(k,p({ref:t},m))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=c;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var s=2;s<o;s++)p[s]=n[s];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},20335:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>p,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var r=n(87462),a=(n(67294),n(3905));const o={title:"TCP/UDP \u52a8\u6001\u4ee3\u7406"},p=void 0,i={unversionedId:"stream-proxy",id:"version-3.11/stream-proxy",isDocsHomePage:!1,title:"TCP/UDP \u52a8\u6001\u4ee3\u7406",description:"\u4f17\u591a\u7684\u95fb\u540d\u7684\u5e94\u7528\u548c\u670d\u52a1\uff0c\u50cf LDAP\u3001MYSQL \u548c RTMP\uff0c\u9009\u62e9 TCP \u4f5c\u4e3a\u901a\u4fe1\u534f\u8bae\u3002\u4f46\u662f\u50cf DNS\u3001syslog \u548c RADIUS \u8fd9\u7c7b\u975e\u4e8b\u52a1\u6027\u7684\u5e94\u7528\uff0c\u4ed6\u4eec\u9009\u62e9\u4e86 UDP \u534f\u8bae\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.11/stream-proxy.md",sourceDirName:".",slug:"/stream-proxy",permalink:"/zh/docs/apisix/3.11/stream-proxy",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.11/docs/zh/latest/stream-proxy.md",tags:[],version:"3.11",frontMatter:{title:"TCP/UDP \u52a8\u6001\u4ee3\u7406"},sidebar:"version-3.11/docs",previous:{title:"\u8def\u7531 RadixTree",permalink:"/zh/docs/apisix/3.11/router-radixtree"},next:{title:"gRPC \u4ee3\u7406",permalink:"/zh/docs/apisix/3.11/grpc-proxy"}},l=[{value:"\u5982\u4f55\u5f00\u542f Stream \u4ee3\u7406",id:"\u5982\u4f55\u5f00\u542f-stream-\u4ee3\u7406",children:[]},{value:"\u5982\u4f55\u8bbe\u7f6e route",id:"\u5982\u4f55\u8bbe\u7f6e-route",children:[]},{value:"\u66f4\u591a route \u5339\u914d\u9009\u9879",id:"\u66f4\u591a-route-\u5339\u914d\u9009\u9879",children:[]},{value:"\u63a5\u6536 TLS over TCP \u8fde\u63a5",id:"\u63a5\u6536-tls-over-tcp-\u8fde\u63a5",children:[]},{value:"\u4ee3\u7406\u5230 TLS over TCP \u4e0a\u6e38",id:"\u4ee3\u7406\u5230-tls-over-tcp-\u4e0a\u6e38",children:[]}],s={toc:l};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u4f17\u591a\u7684\u95fb\u540d\u7684\u5e94\u7528\u548c\u670d\u52a1\uff0c\u50cf LDAP\u3001MYSQL \u548c RTMP\uff0c\u9009\u62e9 TCP \u4f5c\u4e3a\u901a\u4fe1\u534f\u8bae\u3002\u4f46\u662f\u50cf DNS\u3001syslog \u548c RADIUS \u8fd9\u7c7b\u975e\u4e8b\u52a1\u6027\u7684\u5e94\u7528\uff0c\u4ed6\u4eec\u9009\u62e9\u4e86 UDP \u534f\u8bae\u3002"),(0,a.kt)("p",null,"APISIX \u53ef\u4ee5\u5bf9 TCP/UDP \u534f\u8bae\u8fdb\u884c\u4ee3\u7406\u5e76\u5b9e\u73b0\u52a8\u6001\u8d1f\u8f7d\u5747\u8861\u3002\u5728 nginx \u4e16\u754c\uff0c\u79f0 TCP/UDP \u4ee3\u7406\u4e3a stream \u4ee3\u7406\uff0c\u5728 APISIX \u8fd9\u91cc\u6211\u4eec\u4e5f\u9075\u5faa\u4e86\u8fd9\u4e2a\u58f0\u660e\u3002"),(0,a.kt)("h2",{id:"\u5982\u4f55\u5f00\u542f-stream-\u4ee3\u7406"},"\u5982\u4f55\u5f00\u542f Stream \u4ee3\u7406"),(0,a.kt)("p",null,"\u8981\u542f\u7528\u8be5\u9009\u9879\uff0c\u8bf7\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"apisix.proxy_mode")," \u8bbe\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"stream")," \u6216 ",(0,a.kt)("inlineCode",{parentName:"p"},"http&stream"),"\uff0c\u5177\u4f53\u53d6\u51b3\u4e8e\u60a8\u662f\u53ea\u9700\u8981\u6d41\u4ee3\u7406\u8fd8\u662f\u9700\u8981 http \u548c\u6d41\u3002\u7136\u540e\u5728 conf/config.yaml \u4e2d\u6dfb\u52a0 apisix.stream_proxy \u9009\u9879\u5e76\u6307\u5b9a APISIX \u5e94\u5145\u5f53\u6d41\u4ee3\u7406\u5e76\u4fa6\u542c\u4f20\u5165\u8bf7\u6c42\u7684\u5730\u5740\u5217\u8868\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apisix:\n  stream_proxy: # TCP/UDP proxy\n    tcp: # TCP proxy address list\n      - 9100\n      - "127.0.0.1:9101"\n    udp: # UDP proxy address list\n      - 9200\n      - "127.0.0.1:9211"\n')),(0,a.kt)("h2",{id:"\u5982\u4f55\u8bbe\u7f6e-route"},"\u5982\u4f55\u8bbe\u7f6e route"),(0,a.kt)("p",null,"\u7b80\u4f8b\u5982\u4e0b\uff1a"),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,a.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,a.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "remote_addr": "127.0.0.1",\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,a.kt)("p",null,"\u4f8b\u5b50\u4e2d APISIX \u5bf9\u5ba2\u6237\u7aef IP \u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"127.0.0.1")," \u7684\u8bf7\u6c42\u4ee3\u7406\u8f6c\u53d1\u5230\u4e0a\u6e38\u4e3b\u673a ",(0,a.kt)("inlineCode",{parentName:"p"},"127.0.0.1:1995"),"\u3002\n\u66f4\u591a\u7528\u4f8b\uff0c\u8bf7\u53c2\u7167 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/t/stream-node/sanity.t"},"test case"),"\u3002"),(0,a.kt)("h2",{id:"\u66f4\u591a-route-\u5339\u914d\u9009\u9879"},"\u66f4\u591a route \u5339\u914d\u9009\u9879"),(0,a.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u6dfb\u52a0\u66f4\u591a\u7684\u9009\u9879\u6765\u5339\u914d route\u3002\u76ee\u524d Stream Route \u914d\u7f6e\u652f\u6301 3 \u4e2a\u5b57\u6bb5\u8fdb\u884c\u8fc7\u6ee4\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"server_addr: \u63a5\u53d7 Stream Route \u8fde\u63a5\u7684 APISIX \u670d\u52a1\u5668\u7684\u5730\u5740\u3002"),(0,a.kt)("li",{parentName:"ul"},"server_port: \u63a5\u53d7 Stream Route \u8fde\u63a5\u7684 APISIX \u670d\u52a1\u5668\u7684\u7aef\u53e3\u3002"),(0,a.kt)("li",{parentName:"ul"},"remote_addr: \u53d1\u51fa\u8bf7\u6c42\u7684\u5ba2\u6237\u7aef\u5730\u5740\u3002")),(0,a.kt)("p",null,"\u4f8b\u5982"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "server_addr": "127.0.0.1",\n    "server_port": 2000,\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,a.kt)("p",null,"\u4f8b\u5b50\u4e2d APISIX \u4f1a\u628a\u670d\u52a1\u5668\u5730\u5740\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"127.0.0.1"),", \u7aef\u53e3\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"2000")," \u4ee3\u7406\u5230\u4e0a\u6e38\u5730\u5740 ",(0,a.kt)("inlineCode",{parentName:"p"},"127.0.0.1:1995"),"\u3002"),(0,a.kt)("p",null,"\u8ba9\u6211\u4eec\u518d\u4e3e\u4e00\u4e2a\u5b9e\u9645\u573a\u666f\u7684\u4f8b\u5b50\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5c06\u6b64\u914d\u7f6e\u653e\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apisix:\n  stream_proxy: # TCP/UDP proxy\n    tcp: # TCP proxy address list\n      - 9100 # by default uses 0.0.0.0\n      - "127.0.0.10:9101"\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u73b0\u5728\u8fd0\u884c\u4e00\u4e2a mysql docker \u5bb9\u5668\u5e76\u5c06\u7aef\u53e3 3306 \u66b4\u9732\u7ed9\u4e3b\u673a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=toor -p 3306:3306 -d mysql mysqld --default-authentication-plugin=mysql_native_password\n# check it using a mysql client that it works\n$ mysql --host=127.0.0.1 --port=3306 -u root -p\nEnter password:\nWelcome to the MySQL monitor.  Commands end with ; or \\g.\nYour MySQL connection id is 25\n...\nmysql>\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u73b0\u5728\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a\u5e26\u6709\u670d\u52a1\u5668\u8fc7\u6ee4\u7684 stream \u8def\u7531\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "server_addr": "127.0.0.10",\n    "server_port": 9101,\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:3306": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,a.kt)("p",{parentName:"li"},"\u6bcf\u5f53 APISIX \u670d\u52a1\u5668 ",(0,a.kt)("inlineCode",{parentName:"p"},"127.0.0.10")," \u548c\u7aef\u53e3 ",(0,a.kt)("inlineCode",{parentName:"p"},"9101")," \u6536\u5230\u8fde\u63a5\u65f6\uff0c\u5b83\u53ea\u4f1a\u5c06\u8bf7\u6c42\u8f6c\u53d1\u5230 mysql \u4e0a\u6e38\u3002\u8ba9\u6211\u4eec\u6d4b\u8bd5\u4e00\u4e0b\uff1a")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5411 ",(0,a.kt)("inlineCode",{parentName:"p"},"9100")," \u53d1\u51fa\u8bf7\u6c42\uff08\u5728 config.yaml \u4e2d\u542f\u7528 stream \u4ee3\u7406\u7aef\u53e3\uff09\uff0c\u8fc7\u6ee4\u5668\u5339\u914d\u5931\u8d25\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ mysql --host=127.0.0.1 --port=9100 -u root -p\nEnter password:\nERROR 2013 (HY000): Lost connection to MySQL server at 'reading initial communication packet', system error: 2\n")),(0,a.kt)("p",{parentName:"li"},"\u4e0b\u9762\u7684\u8bf7\u6c42\u5339\u914d\u5230\u4e86 stream \u8def\u7531\uff0c\u6240\u4ee5\u5b83\u53ef\u4ee5\u6b63\u5e38\u4ee3\u7406\u5230 mysql\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"mysql --host=127.0.0.10 --port=9101 -u root -p\nEnter password:\nWelcome to the MySQL monitor.  Commands end with ; or \\g.\nYour MySQL connection id is 26\n...\nmysql>\n")))),(0,a.kt)("p",null,"\u5b8c\u6574\u7684\u5339\u914d\u9009\u9879\u5217\u8868\u53c2\u89c1 ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/admin-api#stream-route"},"Admin API \u7684 Stream Route"),"\u3002"),(0,a.kt)("h2",{id:"\u63a5\u6536-tls-over-tcp-\u8fde\u63a5"},"\u63a5\u6536 TLS over TCP \u8fde\u63a5"),(0,a.kt)("p",null,"APISIX \u652f\u6301\u63a5\u6536 TLS over TCP \u8fde\u63a5\u3002"),(0,a.kt)("p",null,"\u9996\u5148\uff0c\u6211\u4eec\u9700\u8981\u7ed9\u5bf9\u5e94\u7684 TCP \u5730\u5740\u542f\u7528 TLS\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  stream_proxy: # TCP/UDP proxy\n    tcp: # TCP proxy address list\n      - addr: 9100\n        tls: true\n")),(0,a.kt)("p",null,"\u63a5\u7740\uff0c\u6211\u4eec\u9700\u8981\u4e3a\u7ed9\u5b9a\u7684 SNI \u914d\u7f6e\u8bc1\u4e66\u3002\n\u5177\u4f53\u6b65\u9aa4\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/admin-api#ssl"},"Admin API \u7684 SSL"),"\u3002\nmTLS \u4e5f\u662f\u652f\u6301\u7684\uff0c\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/mtls#%E4%BF%9D%E6%8A%A4%E8%B7%AF%E7%94%B1"},"\u4fdd\u62a4\u8def\u7531"),"\u3002"),(0,a.kt)("p",null,"\u7136\u540e\uff0c\u6211\u4eec\u9700\u8981\u914d\u7f6e\u4e00\u4e2a route\uff0c\u5339\u914d\u8fde\u63a5\u5e76\u4ee3\u7406\u5230\u4e0a\u6e38\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,a.kt)("p",null,"\u5f53\u8fde\u63a5\u4e3a TLS over TCP \u65f6\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7 SNI \u6765\u5339\u914d\u8def\u7531\uff0c\u6bd4\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "sni": "a.test.com",\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:5991": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,a.kt)("p",null,"\u5728\u8fd9\u91cc\uff0c\u63e1\u624b\u65f6\u53d1\u9001 SNI ",(0,a.kt)("inlineCode",{parentName:"p"},"a.test.com")," \u7684\u8fde\u63a5\u4f1a\u88ab\u4ee3\u7406\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"127.0.0.1:5991"),"\u3002"),(0,a.kt)("h2",{id:"\u4ee3\u7406\u5230-tls-over-tcp-\u4e0a\u6e38"},"\u4ee3\u7406\u5230 TLS over TCP \u4e0a\u6e38"),(0,a.kt)("p",null,"APISIX \u8fd8\u652f\u6301\u4ee3\u7406\u5230 TLS over TCP \u4e0a\u6e38\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "upstream": {\n        "scheme": "tls",\n        "nodes": {\n            "127.0.0.1:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,a.kt)("p",null,"\u901a\u8fc7\u8bbe\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"scheme")," \u4e3a tls\uff0cAPISIX \u5c06\u4e0e\u4e0a\u6e38\u8fdb\u884c TLS \u63e1\u624b\u3002"),(0,a.kt)("p",null,'\u5f53\u5ba2\u6237\u7aef\u4e5f\u4f7f\u7528 TLS over TCP\uff0c\u5ba2\u6237\u7aef\u53d1\u9001\u7684 SNI \u5c06\u4f20\u9012\u7ed9\u4e0a\u6e38\u3002\u5426\u5219\uff0c\u5c06\u4f7f\u7528\u4e00\u4e2a\u5047\u7684 SNI "apisix_backend"\u3002'))}m.isMDXComponent=!0}}]);