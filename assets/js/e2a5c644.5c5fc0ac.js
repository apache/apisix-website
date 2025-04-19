"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[11483],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=c(n),h=i,u=m["".concat(l,".").concat(h)]||m[h]||d[h]||r;return n?a.createElement(u,s(s({ref:t},p),{},{components:n})):a.createElement(u,s({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},97574:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var a=n(87462),i=(n(67294),n(3905));const r={title:"Configure mTLS for client to APISIX",keywords:["mTLS","API Gateway","Apache APISIX"],description:"This article describes how to configure mutual authentication (mTLS) between the client and Apache APISIX."},s=void 0,o={unversionedId:"tutorials/client-to-apisix-mtls",id:"tutorials/client-to-apisix-mtls",isDocsHomePage:!1,title:"Configure mTLS for client to APISIX",description:"This article describes how to configure mutual authentication (mTLS) between the client and Apache APISIX.",source:"@site/docs/apisix/tutorials/client-to-apisix-mtls.md",sourceDirName:"tutorials",slug:"/tutorials/client-to-apisix-mtls",permalink:"/docs/apisix/next/tutorials/client-to-apisix-mtls",editUrl:"/edit#https://github.com/apache/apisix/edit/master/docs/en/latest/tutorials/client-to-apisix-mtls.md",tags:[],version:"current",frontMatter:{title:"Configure mTLS for client to APISIX",keywords:["mTLS","API Gateway","Apache APISIX"],description:"This article describes how to configure mutual authentication (mTLS) between the client and Apache APISIX."},sidebar:"docs",previous:{title:"Add multiple API versions",permalink:"/docs/apisix/next/tutorials/add-multiple-api-versions"},next:{title:"WebSocket Authentication",permalink:"/docs/apisix/next/tutorials/websocket-authentication"}},l=[{value:"Configuration",id:"configuration",children:[{value:"Generate certificates",id:"generate-certificates",children:[]},{value:"Configure the certificate in APISIX",id:"configure-the-certificate-in-apisix",children:[]},{value:"Configure the route in APISIX",id:"configure-the-route-in-apisix",children:[]},{value:"Test",id:"test",children:[]}]},{value:"MTLS bypass based on regular expression matching against URI",id:"mtls-bypass-based-on-regular-expression-matching-against-uri",children:[{value:"Timing diagram",id:"timing-diagram",children:[]},{value:"Example",id:"example",children:[]}]},{value:"Conclusion",id:"conclusion",children:[]}],c={toc:l};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"mTLS is a method for mutual authentication. Suppose in your network environment, only trusted clients are required to access the server. In that case, you can enable mTLS to verify the client's identity and ensure the server API's security. This article mainly introduces how to configure mutual authentication (mTLS) between the client and Apache APISIX."),(0,i.kt)("h2",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"This example includes the following procedures:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Generate certificates;"),(0,i.kt)("li",{parentName:"ol"},"Configure the certificate in APISIX;"),(0,i.kt)("li",{parentName:"ol"},"Create and configure routes in APISIX;"),(0,i.kt)("li",{parentName:"ol"},"Test verification.")),(0,i.kt)("p",null,"To make the test results clearer, the examples mentioned in this article pass some information about the client credentials upstream, including: ",(0,i.kt)("inlineCode",{parentName:"p"},"serial"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"fingerprint")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"common name"),"."),(0,i.kt)("h3",{id:"generate-certificates"},"Generate certificates"),(0,i.kt)("p",null,"We need to generate three test certificates: the root, server, and client. Just use the following command to generate the test certificates we need via ",(0,i.kt)("inlineCode",{parentName:"p"},"OpenSSL"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'# For ROOT CA\nopenssl genrsa -out ca.key 2048\nopenssl req -new -sha256 -key ca.key -out ca.csr -subj "/CN=ROOTCA"\nopenssl x509 -req -days 36500 -sha256 -extensions v3_ca -signkey ca.key -in ca.csr -out ca.cer\n\n# For server certificate\nopenssl genrsa -out server.key 2048\n# Note: The `test.com` in the CN value is the domain name/hostname we want to test\nopenssl req -new -sha256 -key server.key -out server.csr -subj "/CN=test.com"\nopenssl x509 -req -days 36500 -sha256 -extensions v3_req  -CA  ca.cer -CAkey ca.key  -CAserial ca.srl  -CAcreateserial -in server.csr -out server.cer\n\n# For client certificate\nopenssl genrsa -out client.key 2048\nopenssl req -new -sha256 -key client.key  -out client.csr -subj "/CN=CLIENT"\nopenssl x509 -req -days 36500 -sha256 -extensions v3_req  -CA  ca.cer -CAkey ca.key  -CAserial ca.srl  -CAcreateserial -in client.csr -out client.cer\n\n# Convert client certificate to pkcs12 for Windows usage (optional)\nopenssl pkcs12 -export -clcerts -in client.cer -inkey client.key -out client.p12\n')),(0,i.kt)("h3",{id:"configure-the-certificate-in-apisix"},"Configure the certificate in APISIX"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"curl")," command to request APISIX Admin API to set up SSL for specific SNI."),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Note that the newline character in the certificate needs to be replaced with its escape character ",(0,i.kt)("inlineCode",{parentName:"p"},"\\n"),"."))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -X PUT \'http://127.0.0.1:9180/apisix/admin/ssls/1\' \\\n--header \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "sni": "test.com",\n    "cert": "<content of server.cer>",\n    "key": "<content of server.key>",\n    "client": {\n        "ca": "<content of ca.cer>"\n    }\n}\'\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sni"),": Specify the domain name (CN) of the certificate. When the client tries to handshake with APISIX via TLS, APISIX will match the SNI data in ",(0,i.kt)("inlineCode",{parentName:"li"},"ClientHello")," with this field and find the corresponding server certificate for handshaking."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"cert"),": The server certificate."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"key"),": The private key of the server certificate."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"client.ca"),": The CA (certificate authority) file to verfiy the client certificate. For demonstration purposes, the same ",(0,i.kt)("inlineCode",{parentName:"li"},"CA")," is used here.")),(0,i.kt)("h3",{id:"configure-the-route-in-apisix"},"Configure the route in APISIX"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"curl")," command to request the APISIX Admin API to create a route."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -X PUT \'http://127.0.0.1:9180/apisix/admin/routes/1\' \\\n--header \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "uri": "/anything",\n    "plugins": {\n        "proxy-rewrite": {\n            "headers": {\n                "X-Ssl-Client-Fingerprint": "$ssl_client_fingerprint",\n                "X-Ssl-Client-Serial": "$ssl_client_serial",\n                "X-Ssl-Client-S-DN": "$ssl_client_s_dn"\n            }\n        }\n    },\n    "upstream": {\n        "nodes": {\n            "httpbin.org":1\n        },\n        "type":"roundrobin"\n    }\n}\'\n')),(0,i.kt)("p",null,"APISIX automatically handles the TLS handshake based on the SNI and the SSL resource created in the previous step, so we do not need to specify the hostname in the route (but it is possible to specify the hostname if you need it)."),(0,i.kt)("p",null,"Also, in the ",(0,i.kt)("inlineCode",{parentName:"p"},"curl")," command above, we enabled the ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/next/plugins/proxy-rewrite"},"proxy-rewrite")," plugin, which will dynamically update the request header information. The source of the variable values in the example are the ",(0,i.kt)("inlineCode",{parentName:"p"},"NGINX")," variables, and you can find them here: ",(0,i.kt)("a",{parentName:"p",href:"http://nginx.org/en/docs/http/ngx_http_ssl_module.html#variables"},"http://nginx.org/en/docs/http/ngx_http_ssl_module.html#variables"),"."),(0,i.kt)("h3",{id:"test"},"Test"),(0,i.kt)("p",null,"Since we are using the domain ",(0,i.kt)("inlineCode",{parentName:"p"},"test.com")," as the test domain, we have to add the test domain to your DNS or local ",(0,i.kt)("inlineCode",{parentName:"p"},"hosts")," file before we can start the verification."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"If we don't use ",(0,i.kt)("inlineCode",{parentName:"li"},"hosts")," and just want to test the results, then you can do so directly using the following command.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'curl --resolve "test.com:9443:127.0.0.1" https://test.com:9443/anything -k --cert ./client.cer --key ./client.key\n')),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"If you need to modify ",(0,i.kt)("inlineCode",{parentName:"li"},"hosts"),", please read the following example (for Ubuntu).")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Modify the ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/hosts")," file"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# 127.0.0.1 localhost\n127.0.0.1 test.com\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Verify that the test domain name is valid"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"ping test.com\n\nPING test.com (127.0.0.1) 56(84) bytes of data.\n64 bytes from localhost.localdomain (127.0.0.1): icmp_seq=1 ttl=64 time=0.028 ms\n64 bytes from localhost.localdomain (127.0.0.1): icmp_seq=2 ttl=64 time=0.037 ms\n64 bytes from localhost.localdomain (127.0.0.1): icmp_seq=3 ttl=64 time=0.036 ms\n64 bytes from localhost.localdomain (127.0.0.1): icmp_seq=4 ttl=64 time=0.031 ms\n^C\n--- test.com ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3080ms\nrtt min/avg/max/mdev = 0.028/0.033/0.037/0.003 ms\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Test results"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl https://test.com:9443/anything -k --cert ./client.cer --key ./client.key\n")),(0,i.kt)("p",{parentName:"li"},"You will then receive the following response body."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'{\n  "args": {},\n  "data": "",\n  "files": {},\n  "form": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "test.com",\n    "User-Agent": "curl/7.81.0",\n    "X-Amzn-Trace-Id": "Root=1-63256343-17e870ca1d8f72dc40b2c5a9",\n    "X-Forwarded-Host": "test.com",\n    "X-Ssl-Client-Fingerprint": "c1626ce3bca723f187d04e3757f1d000ca62d651",\n    "X-Ssl-Client-S-Dn": "CN=CLIENT",\n    "X-Ssl-Client-Serial": "5141CC6F5E2B4BA31746D7DBFE9BA81F069CF970"\n  },\n  "json": null,\n  "method": "GET",\n  "origin": "127.0.0.1",\n  "url": "http://test.com/anything"\n}\n')))),(0,i.kt)("p",null,"Since we configured the ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/next/plugins/proxy-rewrite"},"proxy-rewrite")," plugin in the example, we can see that the response body contains the request body received upstream, containing the correct data."),(0,i.kt)("h2",{id:"mtls-bypass-based-on-regular-expression-matching-against-uri"},"MTLS bypass based on regular expression matching against URI"),(0,i.kt)("p",null,"APISIX allows configuring an URI whitelist to bypass MTLS.\nIf the URI of a request is in the whitelist, then the client certificate will not be checked.\nNote that other URIs of the associated SNI will get HTTP 400 response\ninstead of alert error in the SSL handshake phase, if the client certificate is missing or invalid."),(0,i.kt)("h3",{id:"timing-diagram"},"Timing diagram"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/master/docs/assets/images/skip-mtls.png",alt:"skip mtls"})),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"You can fetch the ",(0,i.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,i.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Configure route and ssl via admin API")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/*",\n    "upstream": {\n        "nodes": {\n            "httpbin.org": 1\n        }\n    }\n}\'\n\ncurl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "cert": "\'"$(<t/certs/mtls_server.crt)"\'",\n    "key": "\'"$(<t/certs/mtls_server.key)"\'",\n    "snis": [\n        "*.apisix.dev"\n    ],\n    "client": {\n        "ca": "\'"$(<t/certs/mtls_ca.crt)"\'",\n        "depth": 10,\n        "skip_mtls_uri_regex": [\n            "/anything.*"\n        ]\n    }\n}\'\n')),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"If the client certificate is missing and the URI is not in the whitelist,\nthen you'll get HTTP 400 response.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'curl https://admin.apisix.dev:9443/uuid -v \\\n--resolve \'admin.apisix.dev:9443:127.0.0.1\' --cacert t/certs/mtls_ca.crt\n* Added admin.apisix.dev:9443:127.0.0.1 to DNS cache\n* Hostname admin.apisix.dev was found in DNS cache\n*   Trying 127.0.0.1:9443...\n* TCP_NODELAY set\n* Connected to admin.apisix.dev (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*   CAfile: t/certs/mtls_ca.crt\n  CApath: /etc/ssl/certs\n* TLSv1.3 (OUT), TLS handshake, Client hello (1):\n* TLSv1.3 (IN), TLS handshake, Server hello (2):\n* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):\n* TLSv1.3 (IN), TLS handshake, Request CERT (13):\n* TLSv1.3 (IN), TLS handshake, Certificate (11):\n* TLSv1.3 (IN), TLS handshake, CERT verify (15):\n* TLSv1.3 (IN), TLS handshake, Finished (20):\n* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):\n* TLSv1.3 (OUT), TLS handshake, Certificate (11):\n* TLSv1.3 (OUT), TLS handshake, Finished (20):\n* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384\n* ALPN, server accepted to use h2\n* Server certificate:\n*  subject: C=cn; ST=GuangDong; L=ZhuHai; CN=admin.apisix.dev; OU=ops\n*  start date: Dec  1 10:17:24 2022 GMT\n*  expire date: Aug 18 10:17:24 2042 GMT\n*  subjectAltName: host "admin.apisix.dev" matched cert\'s "admin.apisix.dev"\n*  issuer: C=cn; ST=GuangDong; L=ZhuHai; CN=ca.apisix.dev; OU=ops\n*  SSL certificate verify ok.\n* Using HTTP2, server supports multi-use\n* Connection state changed (HTTP/2 confirmed)\n* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0\n* Using Stream ID: 1 (easy handle 0x56246de24e30)\n> GET /uuid HTTP/2\n> Host: admin.apisix.dev:9443\n> user-agent: curl/7.68.0\n> accept: */*\n>\n* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):\n* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):\n* old SSL session ID is stale, removing\n* Connection state changed (MAX_CONCURRENT_STREAMS == 128)!\n< HTTP/2 400\n< date: Fri, 21 Apr 2023 07:53:23 GMT\n< content-type: text/html; charset=utf-8\n< content-length: 229\n< server: APISIX/3.2.0\n<\n<html>\n<head><title>400 Bad Request</title></head>\n<body>\n<center><h1>400 Bad Request</h1></center>\n<hr><center>openresty</center>\n<p><em>Powered by <a href="https://apisix.apache.org/">APISIX</a>.</em></p></body>\n</html>\n* Connection #0 to host admin.apisix.dev left intact\n')),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},"Although the client certificate is missing, but the URI is in the whitelist,\nyou get successful response.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"curl https://admin.apisix.dev:9443/anything/foobar -i \\\n--resolve 'admin.apisix.dev:9443:127.0.0.1' --cacert t/certs/mtls_ca.crt\nHTTP/2 200\ncontent-type: application/json\ncontent-length: 416\ndate: Fri, 21 Apr 2023 07:58:28 GMT\naccess-control-allow-origin: *\naccess-control-allow-credentials: true\nserver: APISIX/3.2.0\n...\n")),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"If you don't want to use curl or test on windows, you can read this gist for more details. ",(0,i.kt)("a",{parentName:"p",href:"https://gist.github.com/bzp2010/6ce0bf7c15c191029ed54724547195b4"},"APISIX mTLS for client to APISIX"),"."),(0,i.kt)("p",null,"For more information about the mTLS feature of Apache APISIX, you can read ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/next/mtls"},"Mutual TLS Authentication"),"."))}p.isMDXComponent=!0}}]);