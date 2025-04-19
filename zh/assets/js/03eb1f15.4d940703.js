"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[81571],{3905:(e,n,t)=>{t.d(n,{Zo:()=>o,kt:()=>m});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},o=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,s=e.originalType,p=e.parentName,o=l(e,["components","mdxType","originalType","parentName"]),d=c(t),m=i,g=d["".concat(p,".").concat(m)]||d[m]||u[m]||s;return t?r.createElement(g,a(a({ref:n},o),{},{components:t})):r.createElement(g,a({ref:n},o))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var s=t.length,a=new Array(s);a[0]=d;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var c=2;c<s;c++)a[c]=t[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},40151:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>o,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var r=t(87462),i=(t(67294),t(3905));const s={title:"GM",keywords:["Apache APISIX","Plugin","GM"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX gm \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},a=void 0,l={unversionedId:"plugins/gm",id:"version-3.11/plugins/gm",isDocsHomePage:!1,title:"GM",description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX gm \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.11/plugins/gm.md",sourceDirName:"plugins",slug:"/plugins/gm",permalink:"/zh/docs/apisix/3.11/plugins/gm",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.11/docs/zh/latest/plugins/gm.md",tags:[],version:"3.11",frontMatter:{title:"GM",keywords:["Apache APISIX","Plugin","GM"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX gm \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},sidebar:"version-3.11/docs",previous:{title:"public-api",permalink:"/zh/docs/apisix/3.11/plugins/public-api"},next:{title:"chaitin-waf",permalink:"/zh/docs/apisix/3.11/plugins/chaitin-waf"}},p=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],c={toc:p};function o(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"gm")," \u63d2\u4ef6\u80fd\u542f\u7528\u56fd\u5bc6\u76f8\u5173\u7684\u529f\u80fd\u3002\u76ee\u524d\u652f\u6301\u901a\u8fc7\u8be5\u63d2\u4ef6\u52a8\u6001\u914d\u7f6e\u56fd\u5bc6\u53cc\u8bc1\u4e66\u3002"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u76f8\u5173\u4ecb\u7ecd")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u56fd\u5bc6\u5c31\u662f\u56fd\u4ea7\u5316\u7684\u5bc6\u7801\u7b97\u6cd5\u3002\u5728\u6211\u4eec\u65e5\u5e38\u5f00\u53d1\u8fc7\u7a0b\u4e2d\u4f1a\u63a5\u89e6\u5230\u5404\u79cd\u5404\u6837\u7684\u5bc6\u7801\u7b97\u6cd5\uff0c\u5982 RSA\u3001SHA256 \u7b49\u7b49\u3002\u4e3a\u4e86\u8fbe\u5230\u66f4\u9ad8\u7684\u5b89\u5168\u7b49\u7ea7\uff0c\u8bb8\u591a\u5927\u516c\u53f8\u548c\u56fd\u5bb6\u4f1a\u5236\u5b9a\u81ea\u5df1\u7684\u5bc6\u7801\u7b97\u6cd5\u3002\u56fd\u5bc6\u5c31\u662f\u8fd9\u6837\u4e00\u7ec4\u7531\u4e2d\u56fd\u56fd\u5bb6\u5bc6\u7801\u7ba1\u7406\u5c40\u5236\u5b9a\u7684\u5bc6\u7801\u7b97\u6cd5\u3002\u5728\u56fd\u9645\u5f62\u52bf\u8d8a\u53d1\u590d\u6742\u591a\u53d8\u7684\u4eca\u5929\uff0c\u5bc6\u7801\u7b97\u6cd5\u7684\u56fd\u4ea7\u5316\u66ff\u4ee3\uff0c\u5728\u4e00\u4e9b\u9886\u57df\u5df2\u7ecf\u6210\u4e3a\u4e86\u4e00\u80a1\u52bf\u4e0d\u53ef\u6321\u7684\u6f6e\u6d41\u3002"))),(0,i.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"\u8be5\u63d2\u4ef6\u8981\u6c42 Apache APISIX \u8fd0\u884c\u5728\u7f16\u8bd1\u4e86 Tongsuo \u7684 APISIX-Runtime \u4e0a\u3002")),(0,i.kt)("p",null,"\u9996\u5148\uff0c\u6211\u4eec\u9700\u8981\u5b89\u88c5 Tongsuo\uff08\u6b64\u5904\u6211\u4eec\u9009\u62e9\u7f16\u8bd1\u51fa Tongsuo \u7684\u52a8\u6001\u94fe\u63a5\u5e93\uff09\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"# TODO: use a fixed release once they have created one.\n# See https://github.com/Tongsuo-Project/Tongsuo/issues/318\ngit clone https://github.com/api7/tongsuo --depth 1\npushd tongsuo\n./config shared enable-ntls -g --prefix=/usr/local/tongsuo\nmake -j2\nsudo make install_sw\n")),(0,i.kt)("p",null,"\u5176\u6b21\uff0c\u6211\u4eec\u9700\u8981\u6784\u5efa APISIX-Runtime\uff0c\u8ba9\u5b83\u4f7f\u7528 Tongsuo \u4f5c\u4e3a SSL \u5e93\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'export OR_PREFIX=/usr/local/openresty\nexport openssl_prefix=/usr/local/tongsuo\nexport zlib_prefix=$OR_PREFIX/zlib\nexport pcre_prefix=$OR_PREFIX/pcre\n\nexport cc_opt="-DNGX_LUA_ABORT_AT_PANIC -I${zlib_prefix}/include -I${pcre_prefix}/include -I${openssl_prefix}/include"\nexport ld_opt="-L${zlib_prefix}/lib -L${pcre_prefix}/lib -L${openssl_prefix}/lib64 -Wl,-rpath,${zlib_prefix}/lib:${pcre_prefix}/lib:${openssl_prefix}/lib64"\n./build-apisix-runtime.sh\n')),(0,i.kt)("p",null,"\u8be5\u63d2\u4ef6\u9ed8\u8ba4\u662f\u7981\u7528\u72b6\u6001\uff0c\u4f60\u9700\u8981\u5c06\u5176\u6dfb\u52a0\u5230\u914d\u7f6e\u6587\u4ef6\uff08",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml"),"\uff09\u4e2d\u624d\u53ef\u4ee5\u542f\u7528\u5b83\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"plugins:\n  - ...\n  - gm\n")),(0,i.kt)("p",null,"\u7531\u4e8e APISIX \u7684\u9ed8\u8ba4 cipher \u4e2d\u4e0d\u5305\u542b\u56fd\u5bc6 cipher\uff0c\u6240\u4ee5\u6211\u4eec\u8fd8\u9700\u8981\u5728\u914d\u7f6e\u6587\u4ef6\uff08",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml"),"\uff09\u4e2d\u8bbe\u7f6e cipher\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  ...\n  ssl:\n    ...\n    # \u53ef\u6309\u5b9e\u9645\u60c5\u51b5\u8c03\u6574\u3002\u9519\u8bef\u7684 cipher \u4f1a\u5bfc\u81f4\u201cno shared cipher\u201d\u6216\u201cno ciphers available\u201d\u62a5\u9519\u3002\n    ssl_ciphers: HIGH:!aNULL:!MD5\n\n")),(0,i.kt)("p",null,"\u914d\u7f6e\u5b8c\u6210\u540e\uff0c\u91cd\u65b0\u52a0\u8f7d APISIX\uff0c\u6b64\u65f6 APISIX \u5c06\u4f1a\u542f\u7528\u56fd\u5bc6\u76f8\u5173\u7684\u903b\u8f91\u3002"),(0,i.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,i.kt)("p",null,"\u5728\u6d4b\u8bd5\u63d2\u4ef6\u4e4b\u524d\uff0c\u6211\u4eec\u9700\u8981\u51c6\u5907\u597d\u56fd\u5bc6\u53cc\u8bc1\u4e66\u3002Tongsuo \u63d0\u4f9b\u4e86\u751f\u6210",(0,i.kt)("a",{parentName:"p",href:"https://www.yuque.com/tsdoc/ts/sulazb"},"SM2 \u53cc\u8bc1\u4e66"),"\u7684\u6559\u7a0b\u3002"),(0,i.kt)("p",null,"\u5728\u4e0b\u9762\u7684\u4f8b\u5b50\u4e2d\uff0c\u6211\u4eec\u5c06\u7528\u5230\u5982\u4e0b\u7684\u8bc1\u4e66\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"# \u5ba2\u6237\u7aef\u52a0\u5bc6\u8bc1\u4e66\u548c\u5bc6\u94a5\nt/certs/client_enc.crt\nt/certs/client_enc.key\n# \u5ba2\u6237\u7aef\u7b7e\u540d\u8bc1\u4e66\u548c\u5bc6\u94a5\nt/certs/client_sign.crt\nt/certs/client_sign.key\n# CA \u548c\u4e2d\u95f4 CA \u6253\u5305\u5728\u4e00\u8d77\u7684\u6587\u4ef6\uff0c\u7528\u4e8e\u8bbe\u7f6e\u53d7\u4fe1\u4efb\u7684 CA\nt/certs/gm_ca.crt\n# \u670d\u52a1\u7aef\u52a0\u5bc6\u8bc1\u4e66\u548c\u5bc6\u94a5\nt/certs/server_enc.crt\nt/certs/server_enc.key\n# \u670d\u52a1\u7aef\u7b7e\u540d\u8bc1\u4e66\u548c\u5bc6\u94a5\nt/certs/server_sign.crt\nt/certs/server_sign.key\n")),(0,i.kt)("p",null,"\u6b64\u5916\uff0c\u6211\u4eec\u8fd8\u9700\u8981\u51c6\u5907 Tongsuo \u547d\u4ee4\u884c\u5de5\u5177\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"./config enable-ntls -static\nmake -j2\n# \u751f\u6210\u7684\u547d\u4ee4\u884c\u5de5\u5177\u5728 apps \u76ee\u5f55\u4e0b\nmv apps/openssl ..\n")),(0,i.kt)("p",null,"\u4f60\u4e5f\u53ef\u4ee5\u91c7\u7528\u975e\u9759\u6001\u7f16\u8bd1\u7684\u65b9\u5f0f\uff0c\u4e0d\u8fc7\u5c31\u9700\u8981\u6839\u636e\u5177\u4f53\u73af\u5883\uff0c\u81ea\u5df1\u89e3\u51b3\u52a8\u6001\u94fe\u63a5\u5e93\u7684\u8def\u5f84\u95ee\u9898\u4e86\u3002"),(0,i.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u5728\u6307\u5b9a\u57df\u540d\u4e2d\u542f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"gm")," \u63d2\u4ef6\uff1a"),(0,i.kt)("p",null,"\u521b\u5efa\u5bf9\u5e94\u7684 SSL \u5bf9\u8c61\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'#!/usr/bin/env python\n# coding: utf-8\n\nimport sys\n# sudo pip install requests\nimport requests\n\nif len(sys.argv) <= 3:\n    print("bad argument")\n    sys.exit(1)\nwith open(sys.argv[1]) as f:\n    enc_cert = f.read()\nwith open(sys.argv[2]) as f:\n    enc_key = f.read()\nwith open(sys.argv[3]) as f:\n    sign_cert = f.read()\nwith open(sys.argv[4]) as f:\n    sign_key = f.read()\napi_key = "edd1c9f034335f136f87ad84b625c8f1"\nresp = requests.put("http://127.0.0.1:9180/apisix/admin/ssls/1", json={\n    "cert": enc_cert,\n    "key": enc_key,\n    "certs": [sign_cert],\n    "keys": [sign_key],\n    "gm": True,\n    "snis": ["localhost"],\n}, headers={\n    "X-API-KEY": api_key,\n})\nprint(resp.status_code)\nprint(resp.text)\n')),(0,i.kt)("p",null,"\u5c06\u4e0a\u9762\u7684\u811a\u672c\u4fdd\u5b58\u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"./create_gm_ssl.py"),"\uff0c\u8fd0\u884c\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"./create_gm_ssl.py t/certs/server_enc.crt  t/certs/server_enc.key t/certs/server_sign.crt t/certs/server_sign.key\n")),(0,i.kt)("p",null,"\u8f93\u51fa\u7ed3\u679c\u5982\u4e0b\u6240\u793a\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'200\n{"key":"\\/apisix\\/ssls\\/1","value":{"keys":["Yn...\n')),(0,i.kt)("p",null,"\u5b8c\u6210\u4e0a\u8ff0\u51c6\u5907\u540e\uff0c\u53ef\u4ee5\u4f7f\u7528\u5982\u4e0b\u547d\u4ee4\u6d4b\u8bd5\u63d2\u4ef6\u662f\u5426\u542f\u7528\u6210\u529f\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"./openssl s_client -connect localhost:9443 -servername localhost -cipher ECDHE-SM2-WITH-SM4-SM3 -enable_ntls -ntls -verifyCAfile t/certs/gm_ca.crt -sign_cert t/certs/client_sign.crt -sign_key t/certs/client_sign.key -enc_cert t/certs/client_enc.crt -enc_key t/certs/client_enc.key\n")),(0,i.kt)("p",null,"\u8fd9\u91cc ",(0,i.kt)("inlineCode",{parentName:"p"},"./openssl")," \u662f\u524d\u9762\u5f97\u5230\u7684 Tongsuo \u547d\u4ee4\u884c\u5de5\u5177\u30029443 \u662f APISIX \u9ed8\u8ba4\u7684 HTTPS \u7aef\u53e3\u3002"),(0,i.kt)("p",null,"\u5982\u679c\u4e00\u5207\u6b63\u5e38\uff0c\u53ef\u4ee5\u770b\u5230\u8fde\u63a5\u5efa\u7acb\u4e86\u8d77\u6765\uff0c\u5e76\u8f93\u51fa\u5982\u4e0b\u4fe1\u606f\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"...\nNew, NTLSv1.1, Cipher is ECDHE-SM2-SM4-CBC-SM3\n...\n")),(0,i.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,i.kt)("p",null,"\u5982\u679c\u4e0d\u518d\u4f7f\u7528\u6b64\u63d2\u4ef6\uff0c\u53ef\u5c06 ",(0,i.kt)("inlineCode",{parentName:"p"},"gm")," \u63d2\u4ef6\u4ece ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u914d\u7f6e\u6587\u4ef6\u4e2d\u79fb\u9664\uff0c\u7136\u540e\u91cd\u542f APISIX \u6216\u8005\u901a\u8fc7\u63d2\u4ef6\u70ed\u52a0\u8f7d\u7684\u63a5\u53e3\u89e6\u53d1\u63d2\u4ef6\u7684\u5378\u8f7d\u3002"))}o.isMDXComponent=!0}}]);