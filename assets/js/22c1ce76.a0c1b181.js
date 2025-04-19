"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[4307],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),l=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=l(n),u=r,h=c["".concat(p,".").concat(u)]||c[u]||d[u]||o;return n?a.createElement(h,i(i({ref:t},m),{},{components:n})):a.createElement(h,i({ref:t},m))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=c;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},13834:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const o={title:"Stream Proxy"},i=void 0,s={unversionedId:"stream-proxy",id:"version-3.10/stream-proxy",isDocsHomePage:!1,title:"Stream Proxy",description:"A stream proxy operates at the transport layer, handling stream-oriented traffic based on TCP and UDP protocols. TCP is used for many applications and services, such as LDAP, MySQL, and RTMP. UDP is used for many popular non-transactional applications, such as DNS, syslog, and RADIUS.",source:"@site/docs-apisix_versioned_docs/version-3.10/stream-proxy.md",sourceDirName:".",slug:"/stream-proxy",permalink:"/docs/apisix/3.10/stream-proxy",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.10/docs/en/latest/stream-proxy.md",tags:[],version:"3.10",frontMatter:{title:"Stream Proxy"},sidebar:"version-3.10/docs",previous:{title:"router-radixtree",permalink:"/docs/apisix/3.10/router-radixtree"},next:{title:"gRPC Proxy",permalink:"/docs/apisix/3.10/grpc-proxy"}},p=[{value:"How to enable stream proxy?",id:"how-to-enable-stream-proxy",children:[]},{value:"How to set a route?",id:"how-to-set-a-route",children:[]},{value:"More stream route filtering options",id:"more-stream-route-filtering-options",children:[]},{value:"Accept TLS over TCP connection",id:"accept-tls-over-tcp-connection",children:[]},{value:"Proxy to TLS over TCP upstream",id:"proxy-to-tls-over-tcp-upstream",children:[]}],l={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"A stream proxy operates at the transport layer, handling stream-oriented traffic based on TCP and UDP protocols. TCP is used for many applications and services, such as LDAP, MySQL, and RTMP. UDP is used for many popular non-transactional applications, such as DNS, syslog, and RADIUS."),(0,r.kt)("p",null,"APISIX can serve as a stream proxy, in addition to being an application layer proxy."),(0,r.kt)("h2",{id:"how-to-enable-stream-proxy"},"How to enable stream proxy?"),(0,r.kt)("p",null,"By default, stream proxy is disabled."),(0,r.kt)("p",null,"To enable this option, set ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix.proxy_mode")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"stream")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"http&stream"),", depending on whether you want stream proxy only or both http and stream. Then add the ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix.stream_proxy")," option in ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," and specify the list of addresses where APISIX should act as a stream proxy and listen for incoming requests."),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},'This "apisix.stream_proxy" option has only been added in versions after 3.2.1.'))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apisix:\n  stream_proxy:\n    tcp:\n      - 9100 # listen on 9100 ports of all network interfaces for TCP requests\n      - "127.0.0.1:9101"\n    udp:\n      - 9200 # listen on 9200 ports of all network interfaces for UDP requests\n      - "127.0.0.1:9211"\n')),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix.stream_proxy")," is undefined in ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),", you will encounter an error similar to the following and not be able to add a stream route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'{"error_msg":"stream mode is disabled, can not add stream routes"}\n')),(0,r.kt)("h2",{id:"how-to-set-a-route"},"How to set a route?"),(0,r.kt)("p",null,"You can create a stream route using the Admin API ",(0,r.kt)("inlineCode",{parentName:"p"},"/stream_routes")," endpoint. For example:"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "remote_addr": "192.168.5.3",\n    "upstream": {\n        "nodes": {\n            "192.168.4.10:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,r.kt)("p",null,"With this configuration, APISIX would only forward the request to the upstream service at ",(0,r.kt)("inlineCode",{parentName:"p"},"192.168.4.10:1995")," if and only if the request is sent from ",(0,r.kt)("inlineCode",{parentName:"p"},"192.168.5.3"),". See the next section to learn more about filtering options."),(0,r.kt)("p",null,"More examples can be found in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/t/stream-node/sanity.t"},"test cases"),"."),(0,r.kt)("h2",{id:"more-stream-route-filtering-options"},"More stream route filtering options"),(0,r.kt)("p",null,"Currently there are three attributes in stream routes that can be used for filtering requests:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"server_addr"),": The address of the APISIX server that accepts the L4 stream connection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"server_port"),": The port of the APISIX server that accepts the L4 stream connection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"remote_addr"),": The address of client from which the request has been made.")),(0,r.kt)("p",null,"Here is an example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "server_addr": "127.0.0.1",\n    "server_port": 2000,\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,r.kt)("p",null,"It means APISIX will proxy the request to ",(0,r.kt)("inlineCode",{parentName:"p"},"127.0.0.1:1995")," when the server address is ",(0,r.kt)("inlineCode",{parentName:"p"},"127.0.0.1")," and the server port is equal to ",(0,r.kt)("inlineCode",{parentName:"p"},"2000"),"."),(0,r.kt)("p",null,"Here is an example with MySQL:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Put this config inside ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apisix:\n  stream_proxy: # TCP/UDP proxy\n    tcp: # TCP proxy address list\n      - 9100 # by default uses 0.0.0.0\n      - "127.0.0.10:9101"\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Now run a mysql docker container and expose port 3306 to the host"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=toor -p 3306:3306 -d mysql mysqld --default-authentication-plugin=mysql_native_password\n# check it using a mysql client that it works\n$ mysql --host=127.0.0.1 --port=3306 -u root -p\nEnter password:\nWelcome to the MySQL monitor.  Commands end with ; or \\g.\nYour MySQL connection id is 25\n...\nmysql>\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Now we are going to create a stream route with server filtering:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "server_addr": "127.0.0.10",\n    "server_port": 9101,\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:3306": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,r.kt)("p",{parentName:"li"},"It only forwards the request to the mysql upstream whenever a connection is received at APISIX server ",(0,r.kt)("inlineCode",{parentName:"p"},"127.0.0.10")," and port ",(0,r.kt)("inlineCode",{parentName:"p"},"9101"),". Let's test that behaviour:")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Making a request to 9100 (stream proxy port enabled inside config.yaml), filter matching fails."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ mysql --host=127.0.0.1 --port=9100 -u root -p\nEnter password:\nERROR 2013 (HY000): Lost connection to MySQL server at 'reading initial communication packet', system error: 2\n\n")),(0,r.kt)("p",{parentName:"li"},"Instead making a request to the APISIX host and port where the filter matching succeeds:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"mysql --host=127.0.0.10 --port=9101 -u root -p\nEnter password:\nWelcome to the MySQL monitor.  Commands end with ; or \\g.\nYour MySQL connection id is 26\n...\nmysql>\n")))),(0,r.kt)("p",null,"Read ",(0,r.kt)("a",{parentName:"p",href:"/docs/apisix/3.10/admin-api#stream-route"},"Admin API's Stream Route section")," for the complete options list."),(0,r.kt)("h2",{id:"accept-tls-over-tcp-connection"},"Accept TLS over TCP connection"),(0,r.kt)("p",null,"APISIX can accept TLS over TCP connection."),(0,r.kt)("p",null,"First of all, we need to enable TLS for the TCP address:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  stream_proxy: # TCP/UDP proxy\n    tcp: # TCP proxy address list\n      - addr: 9100\n        tls: true\n")),(0,r.kt)("p",null,"Second, we need to configure certificate for the given SNI.\nSee ",(0,r.kt)("a",{parentName:"p",href:"/docs/apisix/3.10/admin-api#ssl"},"Admin API's SSL section")," for how to do.\nmTLS is also supported, see ",(0,r.kt)("a",{parentName:"p",href:"/docs/apisix/3.10/mtls#protect-route"},"Protect Route")," for how to do."),(0,r.kt)("p",null,"Third, we need to configure a stream route to match and proxy it to the upstream:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,r.kt)("p",null,"When the connection is TLS over TCP, we can use the SNI to match a route, like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "sni": "a.test.com",\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:5991": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,r.kt)("p",null,"In this case, a connection handshaked with SNI ",(0,r.kt)("inlineCode",{parentName:"p"},"a.test.com")," will be proxied to ",(0,r.kt)("inlineCode",{parentName:"p"},"127.0.0.1:5991"),"."),(0,r.kt)("h2",{id:"proxy-to-tls-over-tcp-upstream"},"Proxy to TLS over TCP upstream"),(0,r.kt)("p",null,"APISIX also supports proxying to TLS over TCP upstream."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "upstream": {\n        "scheme": "tls",\n        "nodes": {\n            "127.0.0.1:1995": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,r.kt)("p",null,"By setting the ",(0,r.kt)("inlineCode",{parentName:"p"},"scheme"),' to "tls", APISIX will do TLS handshake with the upstream.'),(0,r.kt)("p",null,'When the client is also speaking TLS over TCP, the SNI from the client will pass through to the upstream. Otherwise, a dummy SNI "apisix_backend" will be used.'))}m.isMDXComponent=!0}}]);