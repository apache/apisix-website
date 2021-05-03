(window.webpackJsonp=window.webpackJsonp||[]).push([[174],{240:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var i=n(3),a=n(8),r=(n(0),n(270)),c={title:"HTTPS"},o={unversionedId:"https",id:"https",isDocsHomePage:!1,title:"HTTPS",description:"\x3c!--",source:"@site/docs/apisix/https.md",slug:"/https",permalink:"/docs/apisix/https",editUrl:"https://github.com/apache/apisix/edit/master/docs/en/latest/https.md",version:"current",sidebar:"docs",previous:{title:"Customize Nginx configuration",permalink:"/docs/apisix/customize-nginx-configuration"},next:{title:"Batch Processor",permalink:"/docs/apisix/batch-processor"}},s=[{value:"Single SNI",id:"single-sni",children:[]},{value:"wildcard SNI",id:"wildcard-sni",children:[]},{value:"multiple domain",id:"multiple-domain",children:[]},{value:"multiple certificates for a single domain",id:"multiple-certificates-for-a-single-domain",children:[]}],l={toc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"APISIX")," supports to load multiple SSL certificates by TLS extension Server Name Indication (SNI)."),Object(r.b)("h3",{id:"single-sni"},"Single SNI"),Object(r.b)("p",null,"It is most common for an SSL certificate to contain only one domain. We can create an ",Object(r.b)("inlineCode",{parentName:"p"},"ssl")," object. Here is a simple case, creates a ",Object(r.b)("inlineCode",{parentName:"p"},"ssl")," object and ",Object(r.b)("inlineCode",{parentName:"p"},"route")," object."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"cert"),": PEM-encoded public certificate of the SSL key pair."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"key"),": PEM-encoded private key of the SSL key pair."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"snis"),": Hostname(s) to associate with this certificate as SNIs. To set this attribute this certificate must have a valid private key associated with it.")),Object(r.b)("p",null,"We will use the Python script below to simplify the example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-python"},'#!/usr/bin/env python\n# coding: utf-8\n# save this file as ssl.py\nimport sys\n# sudo pip install requests\nimport requests\n\nif len(sys.argv) <= 3:\n    print("bad argument")\n    sys.exit(1)\nwith open(sys.argv[1]) as f:\n    cert = f.read()\nwith open(sys.argv[2]) as f:\n    key = f.read()\nsni = sys.argv[3]\napi_key = "edd1c9f034335f136f87ad84b625c8f1"\nresp = requests.put("http://127.0.0.1:9080/apisix/admin/ssl/1", json={\n    "cert": cert,\n    "key": key,\n    "snis": [sni],\n}, headers={\n    "X-API-KEY": api_key,\n})\nprint(resp.status_code)\nprint(resp.text)\n')),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell"},'# create SSL object\n./ssl.py t.crt t.key test.com\n\n# create Router object\ncurl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -i -d \'\n{\n    "uri": "/hello",\n    "hosts": ["test.com"],\n    "methods": ["GET"],\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n\n# make a test\n\ncurl --resolve \'test.com:9443:127.0.0.1\' https://test.com:9443/hello  -vvv\n* Added test.com:9443:127.0.0.1 to DNS cache\n* About to connect() to test.com port 9443 (#0)\n*   Trying 127.0.0.1...\n* Connected to test.com (127.0.0.1) port 9443 (#0)\n* Initializing NSS with certpath: sql:/etc/pki/nssdb\n* skipping SSL peer certificate verification\n* SSL connection using TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384\n* Server certificate:\n*   subject: CN=test.com,O=iresty,L=ZhuHai,ST=GuangDong,C=CN\n*   start date: Jun 24 22:18:05 2019 GMT\n*   expire date: May 31 22:18:05 2119 GMT\n*   common name: test.com\n*   issuer: CN=test.com,O=iresty,L=ZhuHai,ST=GuangDong,C=CN\n> GET /hello HTTP/1.1\n> User-Agent: curl/7.29.0\n> Host: test.com:9443\n> Accept: */*\n')),Object(r.b)("h3",{id:"wildcard-sni"},"wildcard SNI"),Object(r.b)("p",null,"Sometimes, one SSL certificate may contain a wildcard domain like ",Object(r.b)("inlineCode",{parentName:"p"},"*.test.com"),",\nthat means it can accept more than one domain, eg: ",Object(r.b)("inlineCode",{parentName:"p"},"www.test.com")," or ",Object(r.b)("inlineCode",{parentName:"p"},"mail.test.com"),"."),Object(r.b)("p",null,"Here is an example, note that the value we pass as ",Object(r.b)("inlineCode",{parentName:"p"},"sni")," is ",Object(r.b)("inlineCode",{parentName:"p"},"*.test.com"),"."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-shell"},'./ssl.py t.crt t.key \'*.test.com\'\n\ncurl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -i -d \'\n{\n    "uri": "/hello",\n    "hosts": ["*.test.com"],\n    "methods": ["GET"],\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n\n# make a test\n\ncurl --resolve \'www.test.com:9443:127.0.0.1\' https://www.test.com:9443/hello  -vvv\n* Added test.com:9443:127.0.0.1 to DNS cache\n* About to connect() to test.com port 9443 (#0)\n*   Trying 127.0.0.1...\n* Connected to test.com (127.0.0.1) port 9443 (#0)\n* Initializing NSS with certpath: sql:/etc/pki/nssdb\n* skipping SSL peer certificate verification\n* SSL connection using TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384\n* Server certificate:\n*   subject: CN=test.com,O=iresty,L=ZhuHai,ST=GuangDong,C=CN\n*   start date: Jun 24 22:18:05 2019 GMT\n*   expire date: May 31 22:18:05 2119 GMT\n*   common name: test.com\n*   issuer: CN=test.com,O=iresty,L=ZhuHai,ST=GuangDong,C=CN\n> GET /hello HTTP/1.1\n> User-Agent: curl/7.29.0\n> Host: test.com:9443\n> Accept: */*\n')),Object(r.b)("h3",{id:"multiple-domain"},"multiple domain"),Object(r.b)("p",null,"If your SSL certificate may contain more than one domain, like ",Object(r.b)("inlineCode",{parentName:"p"},"www.test.com"),"\nand ",Object(r.b)("inlineCode",{parentName:"p"},"mail.test.com"),", then you can add them into the ",Object(r.b)("inlineCode",{parentName:"p"},"snis")," array. For example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-json"},'{\n    "snis": ["www.test.com", "mail.test.com"]\n}\n')),Object(r.b)("h3",{id:"multiple-certificates-for-a-single-domain"},"multiple certificates for a single domain"),Object(r.b)("p",null,"If you want to configure multiple certificate for a single domain, for\ninstance, supporting both the\n",Object(r.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Elliptic-curve_cryptography"},"ECC"),"\nand RSA key-exchange algorithm, then just configure the extra certificates (the\nfirst certificate and private key should be still put in ",Object(r.b)("inlineCode",{parentName:"p"},"cert")," and ",Object(r.b)("inlineCode",{parentName:"p"},"key"),") and\nprivate keys by ",Object(r.b)("inlineCode",{parentName:"p"},"certs")," and ",Object(r.b)("inlineCode",{parentName:"p"},"keys"),"."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"certs"),": PEM-encoded certificate array."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"keys"),": PEM-encoded private key array.")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"APISIX")," will pair certificate and private key with the same indice as a SSL key\npair. So the length of ",Object(r.b)("inlineCode",{parentName:"p"},"certs")," and ",Object(r.b)("inlineCode",{parentName:"p"},"keys")," must be same."))}p.isMDXComponent=!0},270:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return b}));var i=n(0),a=n.n(i);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(n),u=i,b=m["".concat(c,".").concat(u)]||m[u]||d[u]||r;return n?a.a.createElement(b,o(o({ref:t},l),{},{components:n})):a.a.createElement(b,o({ref:t},l))}));function b(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,c=new Array(r);c[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,c[1]=o;for(var l=2;l<r;l++)c[l]=n[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);