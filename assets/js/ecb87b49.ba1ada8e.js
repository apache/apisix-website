"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[30328],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=s(n),u=i,k=m["".concat(c,".").concat(u)]||m[u]||d[u]||r;return n?a.createElement(k,l(l({ref:t},p),{},{components:n})):a.createElement(k,l({ref:t},p))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<r;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},71134:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var a=n(87462),i=(n(67294),n(3905));const r={title:"Certificate"},l=void 0,o={unversionedId:"certificate",id:"version-3.12/certificate",isDocsHomePage:!1,title:"Certificate",description:"APISIX supports to load multiple SSL certificates by TLS extension Server Name Indication (SNI).",source:"@site/docs-apisix_versioned_docs/version-3.12/certificate.md",sourceDirName:".",slug:"/certificate",permalink:"/docs/apisix/certificate",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.12/docs/en/latest/certificate.md",tags:[],version:"3.12",frontMatter:{title:"Certificate"},sidebar:"version-3.12/docs",previous:{title:"Customize Nginx configuration",permalink:"/docs/apisix/customize-nginx-configuration"},next:{title:"Batch Processor",permalink:"/docs/apisix/batch-processor"}},c=[{value:"Single SNI",id:"single-sni",children:[]},{value:"wildcard SNI",id:"wildcard-sni",children:[]},{value:"multiple domain",id:"multiple-domain",children:[]},{value:"multiple certificates for a single domain",id:"multiple-certificates-for-a-single-domain",children:[]},{value:"set up multiple CA certificates",id:"set-up-multiple-ca-certificates",children:[]}],s={toc:c};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"APISIX")," supports to load multiple SSL certificates by TLS extension Server Name Indication (SNI)."),(0,i.kt)("h3",{id:"single-sni"},"Single SNI"),(0,i.kt)("p",null,"It is most common for an SSL certificate to contain only one domain. We can create an ",(0,i.kt)("inlineCode",{parentName:"p"},"ssl")," object. Here is a simple case, creates a ",(0,i.kt)("inlineCode",{parentName:"p"},"ssl")," object and ",(0,i.kt)("inlineCode",{parentName:"p"},"route")," object."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"cert"),": PEM-encoded public certificate of the SSL key pair."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"key"),": PEM-encoded private key of the SSL key pair."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"snis"),": Hostname(s) to associate with this certificate as SNIs. To set this attribute this certificate must have a valid private key associated with it.")),(0,i.kt)("p",null,"The following is an example of configuring an SSL certificate with a single SNI in APISIX."),(0,i.kt)("p",null,"Create an SSL object with the certificate and key valid for the SNI:"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"You can fetch the ",(0,i.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,i.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n     "cert" : "\'"$(cat t/certs/apisix.crt)"\'",\n     "key": "\'"$(cat t/certs/apisix.key)"\'",\n     "snis": ["test.com"]\n}\'\n')),(0,i.kt)("p",null,"Create a Router object:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -i -d \'\n{\n    "uri": "/get",\n    "hosts": ["test.com"],\n    "methods": ["GET"],\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.org": 1\n        }\n    }\n}\'\n')),(0,i.kt)("p",null,"Send a request to verify:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl --resolve 'test.com:9443:127.0.0.1' https://test.com:9443/get -k -vvv\n\n* Added test.com:9443:127.0.0.1 to DNS cache\n* About to connect() to test.com port 9443 (#0)\n*   Trying 127.0.0.1...\n* Connected to test.com (127.0.0.1) port 9443 (#0)\n* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384\n* ALPN, server accepted to use h2\n* Server certificate:\n*   subject: C=CN; ST=GuangDong; L=ZhuHai; O=iresty; CN=test.com\n*   start date: Jun 24 22:18:05 2019 GMT\n*   expire date: May 31 22:18:05 2119 GMT\n*   issuer: C=CN; ST=GuangDong; L=ZhuHai; O=iresty; CN=test.com\n*   SSL certificate verify result: self-signed certificate (18), continuing anyway.\n> GET /get HTTP/2\n> Host: test.com:9443\n> user-agent: curl/7.81.0\n> accept: */*\n")),(0,i.kt)("h3",{id:"wildcard-sni"},"wildcard SNI"),(0,i.kt)("p",null,"An SSL certificate could also be valid for a wildcard domain like ",(0,i.kt)("inlineCode",{parentName:"p"},"*.test.com"),", which means it is valid for any domain of that pattern, including ",(0,i.kt)("inlineCode",{parentName:"p"},"www.test.com")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"mail.test.com"),"."),(0,i.kt)("p",null,"The following is an example of configuring an SSL certificate with a wildcard SNI in APISIX."),(0,i.kt)("p",null,"Create an SSL object with the certificate and key valid for the SNI:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/ssls/1 \\\n -H "X-API-KEY: $admin_key" -X PUT -d \'\n {\n      "cert" : "\'"$(cat t/certs/apisix.crt)"\'",\n      "key": "\'"$(cat t/certs/apisix.key)"\'",\n      "snis": ["*.test.com"]\n }\'\n')),(0,i.kt)("p",null,"Create a Router object:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -i -d \'\n{\n    "uri": "/get",\n    "hosts": ["*.test.com"],\n    "methods": ["GET"],\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.org": 1\n        }\n    }\n}\'\n')),(0,i.kt)("p",null,"Send a request to verify:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl --resolve 'www.test.com:9443:127.0.0.1' https://www.test.com:9443/get -k -vvv\n\n* Added www.test.com:9443:127.0.0.1 to DNS cache\n* Hostname www.test.com was found in DNS cache\n*   Trying 127.0.0.1:9443...\n* Connected to www.test.com (127.0.0.1) port 9443 (#0)\n* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384\n* ALPN, server accepted to use h2\n* Server certificate:\n*  subject: C=CN; ST=GuangDong; L=ZhuHai; O=iresty; CN=test.com\n*  start date: Jun 24 22:18:05 2019 GMT\n*  expire date: May 31 22:18:05 2119 GMT\n*  issuer: C=CN; ST=GuangDong; L=ZhuHai; O=iresty; CN=test.com\n*  SSL certificate verify result: self signed certificate (18), continuing anyway.\n> GET /get HTTP/2\n> Host: www.test.com:9443\n> user-agent: curl/7.74.0\n> accept: */*\n")),(0,i.kt)("h3",{id:"multiple-domain"},"multiple domain"),(0,i.kt)("p",null,"If your SSL certificate may contain more than one domain, like ",(0,i.kt)("inlineCode",{parentName:"p"},"www.test.com")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"mail.test.com"),", then you can add them into the ",(0,i.kt)("inlineCode",{parentName:"p"},"snis")," array. For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "snis": ["www.test.com", "mail.test.com"]\n}\n')),(0,i.kt)("h3",{id:"multiple-certificates-for-a-single-domain"},"multiple certificates for a single domain"),(0,i.kt)("p",null,"If you want to configure multiple certificate for a single domain, for\ninstance, supporting both the\n",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Elliptic-curve_cryptography"},"ECC"),"\nand RSA key-exchange algorithm, then just configure the extra certificates (the\nfirst certificate and private key should be still put in ",(0,i.kt)("inlineCode",{parentName:"p"},"cert")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"key"),") and\nprivate keys by ",(0,i.kt)("inlineCode",{parentName:"p"},"certs")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"keys"),"."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"certs"),": PEM-encoded certificate array."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"keys"),": PEM-encoded private key array.")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"APISIX")," will pair certificate and private key with the same indice as a SSL key\npair. So the length of ",(0,i.kt)("inlineCode",{parentName:"p"},"certs")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"keys")," must be same."),(0,i.kt)("h3",{id:"set-up-multiple-ca-certificates"},"set up multiple CA certificates"),(0,i.kt)("p",null,"APISIX currently uses CA certificates in several places, such as ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/mtls#protect-admin-api"},"Protect Admin API"),", ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/mtls#etcd-with-mtls"},"etcd with mTLS"),", and ",(0,i.kt)("a",{parentName:"p",href:"/docs/apisix/deployment-modes"},"Deployment Modes"),"."),(0,i.kt)("p",null,"In these places, ",(0,i.kt)("inlineCode",{parentName:"p"},"ssl_trusted_certificate")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"trusted_ca_cert")," will be used to set up the CA certificate, but these configurations will eventually be translated into ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/openresty/lua-nginx-module#lua_ssl_trusted_certificate"},"lua_ssl_trusted_certificate")," directive in OpenResty."),(0,i.kt)("p",null,"If you need to set up different CA certificates in different places, then you can package these CA certificates into a CA bundle file and point to this file when you need to set up CAs. This will avoid the problem that the generated ",(0,i.kt)("inlineCode",{parentName:"p"},"lua_ssl_trusted_certificate")," has multiple locations and overwrites each other."),(0,i.kt)("p",null,"The following is a complete example to show how to set up multiple CA certificates in APISIX."),(0,i.kt)("p",null,"Suppose we let client and APISIX Admin API, APISIX and ETCD communicate with each other using mTLS protocol, and currently there are two CA certificates, ",(0,i.kt)("inlineCode",{parentName:"p"},"foo_ca.crt")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"bar_ca.crt"),", and use each of these two CA certificates to issue client and server certificate pairs, ",(0,i.kt)("inlineCode",{parentName:"p"},"foo_ca.crt")," and its issued certificate pair are used to protect Admin API, and ",(0,i.kt)("inlineCode",{parentName:"p"},"bar_ca.crt")," and its issued certificate pair are used to protect ETCD."),(0,i.kt)("p",null,"The following table details the configurations involved in this example and what they do:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Configuration"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"foo_ca.crt"),(0,i.kt)("td",{parentName:"tr",align:null},"CA cert"),(0,i.kt)("td",{parentName:"tr",align:null},"Issues the secondary certificate required for the client to communicate with the APISIX Admin API over mTLS.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"foo_client.crt"),(0,i.kt)("td",{parentName:"tr",align:null},"cert"),(0,i.kt)("td",{parentName:"tr",align:null},"A certificate issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"foo_ca.crt")," and used by the client to prove its identity when accessing the APISIX Admin API.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"foo_client.key"),(0,i.kt)("td",{parentName:"tr",align:null},"key"),(0,i.kt)("td",{parentName:"tr",align:null},"Issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"foo_ca.crt"),", used by the client, the key file required to access the APISIX Admin API.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"foo_server.crt"),(0,i.kt)("td",{parentName:"tr",align:null},"cert"),(0,i.kt)("td",{parentName:"tr",align:null},"Issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"foo_ca.crt"),", used by APISIX, corresponding to the ",(0,i.kt)("inlineCode",{parentName:"td"},"admin_api_mtls.admin_ssl_cert")," configuration entry.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"foo_server.key"),(0,i.kt)("td",{parentName:"tr",align:null},"key"),(0,i.kt)("td",{parentName:"tr",align:null},"Issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"foo_ca.crt"),", used by APISIX, corresponding to the ",(0,i.kt)("inlineCode",{parentName:"td"},"admin_api_mtls.admin_ssl_cert_key")," configuration entry.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"admin.apisix.dev"),(0,i.kt)("td",{parentName:"tr",align:null},"doname"),(0,i.kt)("td",{parentName:"tr",align:null},"Common Name used in issuing ",(0,i.kt)("inlineCode",{parentName:"td"},"foo_server.crt")," certificate, through which the client accesses APISIX Admin API")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"bar_ca.crt"),(0,i.kt)("td",{parentName:"tr",align:null},"CA cert"),(0,i.kt)("td",{parentName:"tr",align:null},"Issues the secondary certificate required for APISIX to communicate with ETCD over mTLS.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"bar_etcd.crt"),(0,i.kt)("td",{parentName:"tr",align:null},"cert"),(0,i.kt)("td",{parentName:"tr",align:null},"Issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"bar_ca.crt")," and used by ETCD, corresponding to the ",(0,i.kt)("inlineCode",{parentName:"td"},"-cert-file")," option in the ETCD startup command.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"bar_etcd.key"),(0,i.kt)("td",{parentName:"tr",align:null},"key"),(0,i.kt)("td",{parentName:"tr",align:null},"Issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"bar_ca.crt")," and used by ETCD, corresponding to the ",(0,i.kt)("inlineCode",{parentName:"td"},"--key-file")," option in the ETCD startup command.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"bar_apisix.crt"),(0,i.kt)("td",{parentName:"tr",align:null},"cert"),(0,i.kt)("td",{parentName:"tr",align:null},"Issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"bar_ca.crt"),", used by APISIX, corresponding to the ",(0,i.kt)("inlineCode",{parentName:"td"},"etcd.tls.cert")," configuration entry.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"bar_apisix.key"),(0,i.kt)("td",{parentName:"tr",align:null},"key"),(0,i.kt)("td",{parentName:"tr",align:null},"Issued by ",(0,i.kt)("inlineCode",{parentName:"td"},"bar_ca.crt"),", used by APISIX, corresponding to the ",(0,i.kt)("inlineCode",{parentName:"td"},"etcd.tls.key")," configuration entry.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"etcd.cluster.dev"),(0,i.kt)("td",{parentName:"tr",align:null},"key"),(0,i.kt)("td",{parentName:"tr",align:null},"Common Name used in issuing ",(0,i.kt)("inlineCode",{parentName:"td"},"bar_etcd.crt")," certificate, which is used as SNI when APISIX communicates with ETCD over mTLS. corresponds to ",(0,i.kt)("inlineCode",{parentName:"td"},"etcd.tls.sni")," configuration item.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"apisix.ca-bundle"),(0,i.kt)("td",{parentName:"tr",align:null},"CA bundle"),(0,i.kt)("td",{parentName:"tr",align:null},"Merged from ",(0,i.kt)("inlineCode",{parentName:"td"},"foo_ca.crt")," and ",(0,i.kt)("inlineCode",{parentName:"td"},"bar_ca.crt"),", replacing ",(0,i.kt)("inlineCode",{parentName:"td"},"foo_ca.crt")," and ",(0,i.kt)("inlineCode",{parentName:"td"},"bar_ca.crt"),".")))),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Create CA bundle files")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"cat /path/to/foo_ca.crt /path/to/bar_ca.crt > apisix.ca-bundle\n")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"Start the ETCD cluster and enable client authentication")),(0,i.kt)("p",null,"Start by writing a ",(0,i.kt)("inlineCode",{parentName:"p"},"goreman")," configuration named ",(0,i.kt)("inlineCode",{parentName:"p"},"Procfile-single-enable-mtls"),", the content as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"# Use goreman to run `go get github.com/mattn/goreman`\netcd1: etcd --name infra1 --listen-client-urls https://127.0.0.1:12379 --advertise-client-urls https://127.0.0.1:12379 --listen-peer-urls http://127.0.0.1:12380 --initial-advertise-peer-urls http://127.0.0.1:12380 --initial-cluster-token etcd-cluster-1 --initial-cluster 'infra1=http://127.0.0.1:12380,infra2=http://127.0.0.1:22380,infra3=http://127.0.0.1:32380' --initial-cluster-state new --cert-file /path/to/bar_etcd.crt --key-file /path/to/bar_etcd.key --client-cert-auth --trusted-ca-file /path/to/apisix.ca-bundle\netcd2: etcd --name infra2 --listen-client-urls https://127.0.0.1:22379 --advertise-client-urls https://127.0.0.1:22379 --listen-peer-urls http://127.0.0.1:22380 --initial-advertise-peer-urls http://127.0.0.1:22380 --initial-cluster-token etcd-cluster-1 --initial-cluster 'infra1=http://127.0.0.1:12380,infra2=http://127.0.0.1:22380,infra3=http://127.0.0.1:32380' --initial-cluster-state new --cert-file /path/to/bar_etcd.crt --key-file /path/to/bar_etcd.key --client-cert-auth --trusted-ca-file /path/to/apisix.ca-bundle\netcd3: etcd --name infra3 --listen-client-urls https://127.0.0.1:32379 --advertise-client-urls https://127.0.0.1:32379 --listen-peer-urls http://127.0.0.1:32380 --initial-advertise-peer-urls http://127.0.0.1:32380 --initial-cluster-token etcd-cluster-1 --initial-cluster 'infra1=http://127.0.0.1:12380,infra2=http://127.0.0.1:22380,infra3=http://127.0.0.1:32380' --initial-cluster-state new --cert-file /path/to/bar_etcd.crt --key-file /path/to/bar_etcd.key --client-cert-auth --trusted-ca-file /path/to/apisix.ca-bundle\n")),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"goreman")," to start the ETCD cluster:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"goreman -f Procfile-single-enable-mtls start > goreman.log 2>&1 &\n")),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},"Update ",(0,i.kt)("inlineCode",{parentName:"li"},"config.yaml"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="conf/config.yaml"',title:'"conf/config.yaml"'},'deployment:\n  admin:\n    admin_key\n      - name: admin\n        key: edd1c9f034335f136f87ad84b625c8f1\n        role: admin\n    admin_listen:\n      ip: 127.0.0.1\n      port: 9180\n    https_admin: true\n    admin_api_mtls:\n      admin_ssl_ca_cert: /path/to/apisix.ca-bundle\n      admin_ssl_cert: /path/to/foo_server.crt\n      admin_ssl_cert_key: /path/to/foo_server.key\n\napisix:\n  ssl:\n    ssl_trusted_certificate: /path/to/apisix.ca-bundle\n\ndeployment:\n  role: traditional\n  role_traditional:\n    config_provider: etcd\n  etcd:\n    host:\n      - "https://127.0.0.1:12379"\n      - "https://127.0.0.1:22379"\n      - "https://127.0.0.1:32379"\n    tls:\n      cert: /path/to/bar_apisix.crt\n      key: /path/to/bar_apisix.key\n      sni: etcd.cluster.dev\n')),(0,i.kt)("ol",{start:4},(0,i.kt)("li",{parentName:"ol"},"Test APISIX Admin API")),(0,i.kt)("p",null,"Start APISIX, if APISIX starts successfully and there is no abnormal output in ",(0,i.kt)("inlineCode",{parentName:"p"},"logs/error.log"),", it means that mTLS communication between APISIX and ETCD is normal."),(0,i.kt)("p",null,"Use curl to simulate a client, communicate with APISIX Admin API with mTLS, and create a route:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl -vvv \\\n    --resolve \'admin.apisix.dev:9180:127.0.0.1\' https://admin.apisix.dev:9180/apisix/admin/routes/1 \\\n    --cert /path/to/foo_client.crt \\\n    --key /path/to/foo_client.key \\\n    --cacert /path/to/apisix.ca-bundle \\\n    -H "X-API-KEY: $admin_key" -X PUT -i -d \'\n{\n    "uri": "/get",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.org:80": 1\n        }\n    }\n}\'\n')),(0,i.kt)("p",null,"A successful mTLS communication between curl and the APISIX Admin API is indicated if the following SSL handshake process is output:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"* TLSv1.3 (OUT), TLS handshake, Client hello (1):\n* TLSv1.3 (IN), TLS handshake, Server hello (2):\n* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):\n* TLSv1.3 (IN), TLS handshake, Request CERT (13):\n* TLSv1.3 (IN), TLS handshake, Certificate (11):\n* TLSv1.3 (IN), TLS handshake, CERT verify (15):\n* TLSv1.3 (IN), TLS handshake, Finished (20):\n* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):\n* TLSv1.3 (OUT), TLS handshake, Certificate (11):\n* TLSv1.3 (OUT), TLS handshake, CERT verify (15):\n* TLSv1.3 (OUT), TLS handshake, Finished (20):\n* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384\n")),(0,i.kt)("ol",{start:5},(0,i.kt)("li",{parentName:"ol"},"Verify APISIX proxy")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/get -i\n\nHTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 298\nConnection: keep-alive\nDate: Tue, 26 Jul 2022 16:31:00 GMT\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nServer: APISIX/2.14.1\n\n...\n")),(0,i.kt)("p",null,"APISIX proxied the request to the ",(0,i.kt)("inlineCode",{parentName:"p"},"/get")," path of the upstream ",(0,i.kt)("inlineCode",{parentName:"p"},"httpbin.org")," and returned ",(0,i.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK"),". The whole process is working fine using CA bundle instead of CA certificate."))}p.isMDXComponent=!0}}]);