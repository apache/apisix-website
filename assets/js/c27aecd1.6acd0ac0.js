"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[98403],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var s=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,s,o=function(e,t){if(null==e)return{};var n,s,o={},r=Object.keys(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=s.createContext({}),l=function(e){var t=s.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=l(e.components);return s.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},h=s.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),h=l(n),u=o,S=h["".concat(c,".").concat(u)]||h[u]||d[u]||r;return n?s.createElement(S,a(a({ref:t},p),{},{components:n})):s.createElement(S,a({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=h;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var l=2;l<r;l++)a[l]=n[l];return s.createElement.apply(null,a)}return s.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8524:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var s=n(87462),o=(n(67294),n(3905));const r={title:"SSL Protocol"},a=void 0,i={unversionedId:"ssl-protocol",id:"version-3.11/ssl-protocol",isDocsHomePage:!1,title:"SSL Protocol",description:"APISIX supports set TLS protocol and also supports dynamically specifying different TLS protocol versions for each SNI.",source:"@site/docs-apisix_versioned_docs/version-3.11/ssl-protocol.md",sourceDirName:".",slug:"/ssl-protocol",permalink:"/docs/apisix/3.11/ssl-protocol",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/ssl-protocol.md",tags:[],version:"3.11",frontMatter:{title:"SSL Protocol"},sidebar:"version-3.11/docs",previous:{title:"Configuration based on environments",permalink:"/docs/apisix/3.11/profile"},next:{title:"HTTP/3 Protocol",permalink:"/docs/apisix/3.11/http3"}},c=[{value:"ssl_protocols Configuration",id:"ssl_protocols-configuration",children:[{value:"Static Configuration",id:"static-configuration",children:[]},{value:"Dynamic Configuration",id:"dynamic-configuration",children:[]},{value:"Notes",id:"notes",children:[]}]},{value:"Examples",id:"examples",children:[{value:"How to specify the TLSv1.1 protocol",id:"how-to-specify-the-tlsv11-protocol",children:[]},{value:"Certificates are associated with multiple domains, but different TLS protocols are used between domains",id:"certificates-are-associated-with-multiple-domains-but-different-tls-protocols-are-used-between-domains",children:[]}]}],l={toc:c};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,s.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"APISIX")," supports set TLS protocol and also supports dynamically specifying different TLS protocol versions for each ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Server_Name_Indication"},"SNI"),"."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"For security reasons, the encryption suite used by default in ",(0,o.kt)("inlineCode",{parentName:"strong"},"APISIX")," does not support TLSv1.1 and lower versions."),"\n",(0,o.kt)("strong",{parentName:"p"},"If you need to enable the TLSv1.1 protocol, please add the encryption suite supported by the TLSv1.1 protocol to the configuration item ",(0,o.kt)("inlineCode",{parentName:"strong"},"apisix.ssl.ssl_ciphers")," in ",(0,o.kt)("inlineCode",{parentName:"strong"},"config.yaml"),".")),(0,o.kt)("h2",{id:"ssl_protocols-configuration"},"ssl_protocols Configuration"),(0,o.kt)("h3",{id:"static-configuration"},"Static Configuration"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"ssl_protocols")," parameter in the static configuration ",(0,o.kt)("inlineCode",{parentName:"p"},"config.yaml")," applies to the entire APISIX, but cannot be dynamically modified. It only takes effect when the matching SSL resource does not set ",(0,o.kt)("inlineCode",{parentName:"p"},"ssl_protocols"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  ssl:\n    ssl_protocols: TLSv1.2 TLSv1.3 # default TLSv1.2 TLSv1.3\n")),(0,o.kt)("h3",{id:"dynamic-configuration"},"Dynamic Configuration"),(0,o.kt)("p",null,"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"ssl_protocols")," field in the ",(0,o.kt)("inlineCode",{parentName:"p"},"ssl")," resource to dynamically specify different TLS protocol versions for each SNI."),(0,o.kt)("p",null,"Specify the ",(0,o.kt)("inlineCode",{parentName:"p"},"test.com")," domain uses the TLSv1.2 and TLSv1.3:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'{\n    "cert": "$cert",\n    "key": "$key",\n    "snis": ["test.com"],\n    "ssl_protocols": [\n        "TLSv1.2",\n        "TLSv1.3"\n    ]\n}\n')),(0,o.kt)("h3",{id:"notes"},"Notes"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Dynamic configuration has a higher priority than static configuration. When the ",(0,o.kt)("inlineCode",{parentName:"li"},"ssl_protocols")," configuration item in the ssl resource is not empty, the static configuration will be overridden."),(0,o.kt)("li",{parentName:"ul"},"The static configuration applies to the entire APISIX and requires a reload of APISIX to take effect."),(0,o.kt)("li",{parentName:"ul"},"Dynamic configuration can control the TLS protocol version of each SNI in a fine-grained manner and can be dynamically modified, which is more flexible than static configuration.")),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("h3",{id:"how-to-specify-the-tlsv11-protocol"},"How to specify the TLSv1.1 protocol"),(0,o.kt)("p",null,"While newer products utilize higher security-level TLS protocol versions, there are still legacy clients that rely on the lower-level TLSv1.1 protocol. However, enabling TLSv1.1 for new products presents potential security risks. In order to maintain the security of the API, it is crucial to have the ability to seamlessly switch between different protocol versions based on specific requirements and circumstances.\nFor example, consider two domain names: ",(0,o.kt)("inlineCode",{parentName:"p"},"test.com"),", utilized by legacy clients requiring TLSv1.1 configuration, and ",(0,o.kt)("inlineCode",{parentName:"p"},"test2.com"),", associated with new products that support TLSv1.2 and TLSv1.3 protocols."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"config.yaml")," configuration.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  ssl:\n    ssl_protocols: TLSv1.3\n    # ssl_ciphers is for reference only\n    ssl_ciphers: ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES256-SHA:DHE-DSS-AES256-SHA\n")),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"You can fetch the ",(0,o.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Specify the TLSv1.1 protocol version for the test.com domain.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n     "cert" : "\'"$(cat server.crt)"\'",\n     "key": "\'"$(cat server.key)"\'",\n     "snis": ["test.com"],\n     "ssl_protocols": [\n         "TLSv1.1"\n     ]\n}\'\n')),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Create an SSL object for test.com without specifying the TLS protocol version, which will use the static configuration by default.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n     "cert" : "\'"$(cat server2.crt)"\'",\n     "key": "\'"$(cat server2.key)"\'",\n     "snis": ["test2.com"]\n}\'\n')),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Access Verification")),(0,o.kt)("p",null,"Failed, accessed test.com with TLSv1.3:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl --tls-max 1.3 --tlsv1.3  https://test.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.3 (OUT), TLS handshake, Client hello (1):\n* TLSv1.3 (IN), TLS alert, protocol version (582):\n* error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n* Closing connection 0\ncurl: (35) error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n")),(0,o.kt)("p",null,"Successfully, accessed test.com with TLSv1.1:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl --tls-max 1.1 --tlsv1.1  https://test.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.1 (OUT), TLS handshake, Client hello (1):\n* TLSv1.1 (IN), TLS handshake, Server hello (2):\n* TLSv1.1 (IN), TLS handshake, Certificate (11):\n* TLSv1.1 (IN), TLS handshake, Server key exchange (12):\n* TLSv1.1 (IN), TLS handshake, Server finished (14):\n* TLSv1.1 (OUT), TLS handshake, Client key exchange (16):\n* TLSv1.1 (OUT), TLS change cipher, Change cipher spec (1):\n* TLSv1.1 (OUT), TLS handshake, Finished (20):\n* TLSv1.1 (IN), TLS handshake, Finished (20):\n* SSL connection using TLSv1.1 / ECDHE-RSA-AES256-SHA\n")),(0,o.kt)("p",null,"Successfully, accessed test2.com with TLSv1.3:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl --tls-max 1.3 --tlsv1.3  https://test2.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test2.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.3 (OUT), TLS handshake, Client hello (1):\n* TLSv1.3 (IN), TLS handshake, Server hello (2):\n* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):\n* TLSv1.3 (IN), TLS handshake, Certificate (11):\n* TLSv1.3 (IN), TLS handshake, CERT verify (15):\n* TLSv1.3 (IN), TLS handshake, Finished (20):\n* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):\n* TLSv1.3 (OUT), TLS handshake, Finished (20):\n* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384\n")),(0,o.kt)("p",null,"Failed, accessed test2.com with TLSv1.1:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"curl --tls-max 1.1 --tlsv1.1  https://test2.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test2.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.1 (OUT), TLS handshake, Client hello (1):\n* TLSv1.1 (IN), TLS alert, protocol version (582):\n* error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n* Closing connection 0\ncurl: (35) error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n")),(0,o.kt)("h3",{id:"certificates-are-associated-with-multiple-domains-but-different-tls-protocols-are-used-between-domains"},"Certificates are associated with multiple domains, but different TLS protocols are used between domains"),(0,o.kt)("p",null,"Sometimes, we may encounter a situation where a certificate is associated with multiple domains, but they need to use different TLS protocols to ensure security. For example, the test.com domain needs to use the TLSv1.2 protocol, while the test2.com domain needs to use the TLSv1.3 protocol. In this case, we cannot simply create an SSL object for all domains, but need to create an SSL object for each domain separately and specify the appropriate protocol version. This way, we can perform the correct SSL handshake and encrypted communication based on different domains and protocol versions. The example is as follows:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create an SSL object for test.com using the certificate and specify the TLSv1.2 protocol.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n     "cert" : "\'"$(cat server.crt)"\'",\n     "key": "\'"$(cat server.key)"\'",\n     "snis": ["test.com"],\n     "ssl_protocols": [\n         "TLSv1.2"\n     ]\n}\'\n')),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Use the same certificate as test.com to create an SSL object for test2.com and specify the TLSv1.3 protocol.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'curl http://127.0.0.1:9180/apisix/admin/ssls/2 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n     "cert" : "\'"$(cat server.crt)"\'",\n     "key": "\'"$(cat server.key)"\'",\n     "snis": ["test2.com"],\n     "ssl_protocols": [\n         "TLSv1.3"\n     ]\n}\'\n')),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Access verification")),(0,o.kt)("p",null,"Successfully, accessed test.com with TLSv1.2:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl --tls-max 1.2 --tlsv1.2  https://test.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.2 (OUT), TLS handshake, Client hello (1):\n* TLSv1.2 (IN), TLS handshake, Server hello (2):\n* TLSv1.2 (IN), TLS handshake, Certificate (11):\n* TLSv1.2 (IN), TLS handshake, Server key exchange (12):\n* TLSv1.2 (IN), TLS handshake, Server finished (14):\n* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):\n* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):\n* TLSv1.2 (OUT), TLS handshake, Finished (20):\n* TLSv1.2 (IN), TLS handshake, Finished (20):\n* SSL connection using TLSv1.2 / ECDHE-RSA-AES128-GCM-SHA256\n* ALPN, server accepted to use h2\n* Server certificate:\n*  subject: C=AU; ST=Some-State; O=Internet Widgits Pty Ltd; CN=test.com\n*  start date: Jul 20 15:50:08 2023 GMT\n*  expire date: Jul 17 15:50:08 2033 GMT\n*  issuer: C=AU; ST=Some-State; O=Internet Widgits Pty Ltd; CN=test.com\n*  SSL certificate verify result: EE certificate key too weak (66), continuing anyway.\n* Using HTTP2, server supports multi-use\n* Connection state changed (HTTP/2 confirmed)\n* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0\n* Using Stream ID: 1 (easy handle 0x5608905ee2e0)\n> HEAD / HTTP/2\n> Host: test.com:9443\n> user-agent: curl/7.74.0\n> accept: */*\n\n")),(0,o.kt)("p",null,"Failed, accessed test.com with TLSv1.3:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl --tls-max 1.3 --tlsv1.3  https://test.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.3 (OUT), TLS handshake, Client hello (1):\n* TLSv1.3 (IN), TLS alert, protocol version (582):\n* error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n* Closing connection 0\ncurl: (35) error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n\n")),(0,o.kt)("p",null,"Successfully, accessed test2.com with TLSv1.3:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl --tls-max 1.3 --tlsv1.3  https://test2.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test2.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.3 (OUT), TLS handshake, Client hello (1):\n* TLSv1.3 (IN), TLS handshake, Server hello (2):\n* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):\n* TLSv1.3 (IN), TLS handshake, Certificate (11):\n* TLSv1.3 (IN), TLS handshake, CERT verify (15):\n* TLSv1.3 (IN), TLS handshake, Finished (20):\n* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):\n* TLSv1.3 (OUT), TLS handshake, Finished (20):\n* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384\n* ALPN, server accepted to use h2\n* Server certificate:\n*  subject: C=AU; ST=Some-State; O=Internet Widgits Pty Ltd; CN=test2.com\n*  start date: Jul 20 16:05:47 2023 GMT\n*  expire date: Jul 17 16:05:47 2033 GMT\n*  issuer: C=AU; ST=Some-State; O=Internet Widgits Pty Ltd; CN=test2.com\n*  SSL certificate verify result: EE certificate key too weak (66), continuing anyway.\n* Using HTTP2, server supports multi-use\n* Connection state changed (HTTP/2 confirmed)\n* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0\n* Using Stream ID: 1 (easy handle 0x55569cbe42e0)\n> HEAD / HTTP/2\n> Host: test2.com:9443\n> user-agent: curl/7.74.0\n> accept: */*\n>\n* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):\n* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):\n* old SSL session ID is stale, removing\n")),(0,o.kt)("p",null,"Failed, accessed test2.com with TLSv1.2:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl --tls-max 1.2 --tlsv1.2  https://test2.com:9443 -v -k -I\n*   Trying 127.0.0.1:9443...\n* Connected to test2.com (127.0.0.1) port 9443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* successfully set certificate verify locations:\n*  CAfile: /etc/ssl/certs/ca-certificates.crt\n*  CApath: /etc/ssl/certs\n* TLSv1.2 (OUT), TLS handshake, Client hello (1):\n* TLSv1.2 (IN), TLS alert, protocol version (582):\n* error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n* Closing connection 0\ncurl: (35) error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n")))}p.isMDXComponent=!0}}]);