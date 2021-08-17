(self.webpackChunk=self.webpackChunk||[]).push([[86989],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||r;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},48040:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},metadata:function(){return o},toc:function(){return s},default:function(){return c}});var a=n(22122),i=n(19756),r=(n(67294),n(3905)),l={title:"How to build Apache APISIX"},o={unversionedId:"how-to-build",id:"version-2.5/how-to-build",isDocsHomePage:!1,title:"How to build Apache APISIX",description:"\x3c!--",source:"@site/docs-apisix_versioned_docs/version-2.5/how-to-build.md",sourceDirName:".",slug:"/how-to-build",permalink:"/docs/apisix/2.5/how-to-build",editUrl:"https://github.com/apache/apisix/edit/master/docs/en/latest/how-to-build.md",version:"2.5",frontMatter:{title:"How to build Apache APISIX"},sidebar:"version-2.5/docs",previous:{title:"Getting Started",permalink:"/docs/apisix/2.5/getting-started"},next:{title:"batch-requests",permalink:"/docs/apisix/2.5/plugins/batch-requests"}},s=[{value:"1. Install dependencies",id:"1-install-dependencies",children:[]},{value:"2. Install Apache APISIX",id:"2-install-apache-apisix",children:[{value:"Installation via source release",id:"installation-via-source-release",children:[]},{value:"Installation via RPM package (CentOS 7)",id:"installation-via-rpm-package-centos-7",children:[]},{value:"Installation via Luarocks (macOS not supported)",id:"installation-via-luarocks-macos-not-supported",children:[]}]},{value:"3. Manage (start/stop) APISIX Server",id:"3-manage-startstop-apisix-server",children:[]},{value:"4. Test",id:"4-test",children:[{value:"Troubleshoot Testing",id:"troubleshoot-testing",children:[]}]},{value:"5. Update Admin API token to protect Apache APISIX",id:"5-update-admin-api-token-to-protect-apache-apisix",children:[]},{value:"6. Build OpenResty for APISIX",id:"6-build-openresty-for-apisix",children:[]}],p={toc:s};function c(e){var t=e.components,n=(0,i.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"1-install-dependencies"},"1. Install dependencies"),(0,r.kt)("p",null,"The runtime environment for Apache APISIX requires Nginx and etcd."),(0,r.kt)("p",null,"So before installation, please follow the different operating systems ",(0,r.kt)("a",{parentName:"p",href:"/docs/apisix/2.5/install-dependencies"},"install Dependencies"),"."),(0,r.kt)("h2",{id:"2-install-apache-apisix"},"2. Install Apache APISIX"),(0,r.kt)("p",null,"You can install Apache APISIX in a variety of ways, including source code packages, Docker, and Luarocks."),(0,r.kt)("h3",{id:"installation-via-source-release"},"Installation via source release"),(0,r.kt)("p",null,"You need to download the Apache source release first:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ mkdir apisix-2.5\n$ wget https://downloads.apache.org/apisix/2.5/apache-apisix-2.5-src.tgz\n$ tar zxvf apache-apisix-2.5-src.tgz -C apisix-2.5\n")),(0,r.kt)("p",null,"Install the Lua libraries that the runtime depends on:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"cd apisix-2.5\nmake deps\n")),(0,r.kt)("h3",{id:"installation-via-rpm-package-centos-7"},"Installation via RPM package (CentOS 7)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"sudo yum install -y https://github.com/apache/apisix/releases/download/2.5/apisix-2.5-0.x86_64.rpm\n")),(0,r.kt)("h3",{id:"installation-via-luarocks-macos-not-supported"},"Installation via Luarocks (macOS not supported)"),(0,r.kt)("p",null,"Execute the following command in the terminal to complete the installation of APISIX (only recommended for developers):"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Install the code for the master branch via a script")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'sudo sh -c "$(curl -fsSL https://raw.githubusercontent.com/apache/apisix/master/utils/install-apisix.sh)"\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Install the specified version via Luarocks:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"# Install version 2.5\nsudo luarocks install --lua-dir=/path/openresty/luajit apisix 2.5\n\n# old luarocks not support the `lua-dir` parameter, you can remove this option\nsudo luarocks install apisix 2.5\n")),(0,r.kt)("h2",{id:"3-manage-startstop-apisix-server"},"3. Manage (start/stop) APISIX Server"),(0,r.kt)("p",null,"We can start the APISIX server by command ",(0,r.kt)("inlineCode",{parentName:"p"},"make run")," in APISIX home folder,\nor we can stop APISIX server by command ",(0,r.kt)("inlineCode",{parentName:"p"},"make stop"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"# init nginx config file and etcd\n$ make init\n\n# start APISIX server\n$ make run\n\n# stop APISIX server\n$ make stop\n\n# more actions find by `help`\n$ make help\nMakefile rules:\n\n    help:             Show Makefile rules\n    deps:             Installation dependencies\n    utils:            Installation tools\n    lint:             Lint Lua source code\n    init:             Initialize the runtime environment\n    run:              Start the apisix server\n    stop:             Stop the apisix server\n    verify:           Verify the configuration of apisix server\n    clean:            Remove generated files\n    reload:           Reload the apisix server\n    install:          Install the apisix (only for luarocks)\n    test:             Run the test case\n    license-check:    Check Lua source code for Apache License\n")),(0,r.kt)("p",null,"Environment variable can be used to configure APISIX. Please take a look at ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," to\nsee how to do it."),(0,r.kt)("h2",{id:"4-test"},"4. Test"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Install perl's package manager ",(0,r.kt)("inlineCode",{parentName:"li"},"cpanminus")," first"),(0,r.kt)("li",{parentName:"ol"},"Then install ",(0,r.kt)("inlineCode",{parentName:"li"},"test-nginx"),"'s dependencies via ",(0,r.kt)("inlineCode",{parentName:"li"},"cpanm"),":\uff1a",(0,r.kt)("inlineCode",{parentName:"li"},"sudo cpanm --notest Test::Nginx IPC::Run > build.log 2>&1 || (cat build.log && exit 1)")),(0,r.kt)("li",{parentName:"ol"},"Clone source code\uff1a",(0,r.kt)("inlineCode",{parentName:"li"},"git clone https://github.com/iresty/test-nginx.git"),". Note that we should use our fork."),(0,r.kt)("li",{parentName:"ol"},"Load the ",(0,r.kt)("inlineCode",{parentName:"li"},"test-nginx")," library with perl's ",(0,r.kt)("inlineCode",{parentName:"li"},"prove")," command and run the test cases in the ",(0,r.kt)("inlineCode",{parentName:"li"},"/t")," directory:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Set PERL5LIB for perl module: ",(0,r.kt)("inlineCode",{parentName:"li"},"export PERL5LIB=.:$PERL5LIB")),(0,r.kt)("li",{parentName:"ul"},"Run the test cases: ",(0,r.kt)("inlineCode",{parentName:"li"},"make test")),(0,r.kt)("li",{parentName:"ul"},"To set the path of nginx to run the test cases: ",(0,r.kt)("inlineCode",{parentName:"li"},"TEST_NGINX_BINARY=/usr/local/bin/openresty prove -Itest-nginx/lib -r t"))))),(0,r.kt)("h3",{id:"troubleshoot-testing"},"Troubleshoot Testing"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Set Nginx Path")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If you run in to an issue ",(0,r.kt)("inlineCode",{parentName:"li"},'Error unknown directive "lua_package_path" in /API_ASPIX/apisix/t/servroot/conf/nginx.conf'),"\nmake sure to set openresty as default nginx. And export the path as below.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"export PATH=/usr/local/openresty/nginx/sbin:$PATH",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Linux default installation path:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"export PATH=/usr/local/openresty/nginx/sbin:$PATH"))),(0,r.kt)("li",{parentName:"ul"},"OSx default installation path via homebrew:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"export PATH=/usr/local/opt/openresty/nginx/sbin:$PATH")))))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Run Individual Test Cases")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Use the following command to run test cases constrained to a file:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"prove -Itest-nginx/lib -r t/plugin/openid-connect.t")))),(0,r.kt)("h2",{id:"5-update-admin-api-token-to-protect-apache-apisix"},"5. Update Admin API token to protect Apache APISIX"),(0,r.kt)("p",null,"Changes the ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix.admin_key")," in the file ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," and restart the service.\nHere is an example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apisix:\n  # ... ...\n  admin_key\n    -\n      name: "admin"\n      key: abcdefghabcdefgh\n      role: admin\n')),(0,r.kt)("p",null,"When calling the Admin API, ",(0,r.kt)("inlineCode",{parentName:"p"},"key")," can be used as a token."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/apisix/admin/routes?api_key=abcdefghabcdefgh -i\nHTTP/1.1 200 OK\nDate: Fri, 28 Feb 2020 07:48:04 GMT\nContent-Type: text/plain\n... ...\n{"node":{...},"action":"get"}\n\n$ curl http://127.0.0.1:9080/apisix/admin/routes?api_key=abcdefghabcdefgh-invalid -i\nHTTP/1.1 401 Unauthorized\nDate: Fri, 28 Feb 2020 08:17:58 GMT\nContent-Type: text/html\n... ...\n{"node":{...},"action":"get"}\n')),(0,r.kt)("h2",{id:"6-build-openresty-for-apisix"},"6. Build OpenResty for APISIX"),(0,r.kt)("p",null,"Some features require you to build OpenResty with extra Nginx modules.\nIf you need those features, you can build OpenResty with\n",(0,r.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/api7/apisix-build-tools/master/build-apisix-openresty.sh"},"this build script"),"."))}c.isMDXComponent=!0}}]);