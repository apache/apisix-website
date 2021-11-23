"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[36004],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=r.createContext({}),s=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(u.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=s(t),m=a,g=d["".concat(u,".").concat(m)]||d[m]||c[m]||l;return t?r.createElement(g,o(o({ref:n},p),{},{components:t})):r.createElement(g,o({ref:n},p))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=d;var i={};for(var u in n)hasOwnProperty.call(n,u)&&(i[u]=n[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},34953:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return s},default:function(){return c}});var r=t(87462),a=t(63366),l=(t(67294),t(3905)),o={title:"Stand-alone mode"},i=void 0,u={unversionedId:"stand-alone",id:"stand-alone",isDocsHomePage:!1,title:"Stand-alone mode",description:"\x3c!--",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/current/stand-alone.md",sourceDirName:".",slug:"/stand-alone",permalink:"/zh/docs/apisix/next/stand-alone",editUrl:"https://github.com/apache/apisix/edit/master/docs/zh/latest/stand-alone.md",tags:[],version:"current",frontMatter:{title:"Stand-alone mode"},sidebar:"docs",previous:{title:"\u8def\u7531 RadixTree",permalink:"/zh/docs/apisix/next/router-radixtree"},next:{title:"TCP/UDP \u52a8\u6001\u4ee3\u7406",permalink:"/zh/docs/apisix/next/stream-proxy"}},s=[{value:"\u5982\u4f55\u914d\u7f6e\u89c4\u5219",id:"\u5982\u4f55\u914d\u7f6e\u89c4\u5219",children:[]},{value:"\u914d\u7f6e Router",id:"\u914d\u7f6e-router",children:[]},{value:"\u914d\u7f6e Router + Service",id:"\u914d\u7f6e-router--service",children:[]},{value:"\u914d\u7f6e Router + Upstream",id:"\u914d\u7f6e-router--upstream",children:[]},{value:"\u914d\u7f6e Router + Service + Upstream",id:"\u914d\u7f6e-router--service--upstream",children:[]},{value:"\u914d\u7f6e Plugins",id:"\u914d\u7f6e-plugins",children:[]},{value:"\u542f\u7528 SSL",id:"\u542f\u7528-ssl",children:[]},{value:"\u914d\u7f6e global rule",id:"\u914d\u7f6e-global-rule",children:[]},{value:"\u914d\u7f6e consumer",id:"\u914d\u7f6e-consumer",children:[]},{value:"\u914d\u7f6e plugin metadata",id:"\u914d\u7f6e-plugin-metadata",children:[]},{value:"\u914d\u7f6e stream route",id:"\u914d\u7f6e-stream-route",children:[]}],p={toc:s};function c(e){var n=e.components,t=(0,a.Z)(e,["components"]);return(0,l.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"\u5f00\u542f Stand-alone \u6a21\u5f0f\u7684 APISIX \u8282\u70b9\uff0c\u5c06\u4e0d\u518d\u4f7f\u7528\u9ed8\u8ba4\u7684 etcd \u4f5c\u4e3a\u914d\u7f6e\u4e2d\u5fc3\u3002"),(0,l.kt)("p",null,"\u8fd9\u79cd\u65b9\u5f0f\u6bd4\u8f83\u9002\u5408\u4e24\u7c7b\u7528\u6237\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"kubernetes(k8s)\uff1a\u58f0\u660e\u5f0f API \u573a\u666f\uff0c\u901a\u8fc7\u5168\u91cf yaml \u914d\u7f6e\u6765\u52a8\u6001\u66f4\u65b0\u4fee\u6539\u8def\u7531\u89c4\u5219\u3002"),(0,l.kt)("li",{parentName:"ol"},"\u4e0d\u540c\u914d\u7f6e\u4e2d\u5fc3\uff1a\u914d\u7f6e\u4e2d\u5fc3\u7684\u5b9e\u73b0\u6709\u5f88\u591a\uff0c\u6bd4\u5982 Consul \u7b49\uff0c\u4f7f\u7528\u5168\u91cf yaml \u505a\u4e2d\u95f4\u8f6c\u6362\u6865\u6881\u3002")),(0,l.kt)("p",null,"APISIX \u8282\u70b9\u670d\u52a1\u542f\u52a8\u540e\u4f1a\u7acb\u523b\u52a0\u8f7d ",(0,l.kt)("inlineCode",{parentName:"p"},"conf/apisix.yaml")," \u6587\u4ef6\u4e2d\u7684\u8def\u7531\u89c4\u5219\u5230\u5185\u5b58\uff0c\u5e76\u4e14\u6bcf\u95f4\u9694\u4e00\u5b9a\u65f6\u95f4\n\uff08\u9ed8\u8ba4 1 \u79d2\u949f\uff09\uff0c\u90fd\u4f1a\u5c1d\u8bd5\u68c0\u6d4b\u6587\u4ef6\u5185\u5bb9\u662f\u5426\u6709\u66f4\u65b0\uff0c\u5982\u679c\u6709\u66f4\u65b0\u5219\u91cd\u65b0\u52a0\u8f7d\u89c4\u5219\u3002"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"\u6ce8\u610f"),"\uff1a\u91cd\u65b0\u52a0\u8f7d\u89c4\u5219\u5e76\u66f4\u65b0\u65f6\uff0c\u5747\u662f\u5185\u5b58\u70ed\u66f4\u65b0\uff0c\u4e0d\u4f1a\u6709\u5de5\u4f5c\u8fdb\u7a0b\u7684\u66ff\u6362\u8fc7\u7a0b\uff0c\u662f\u4e2a\u70ed\u66f4\u65b0\u8fc7\u7a0b\u3002"),(0,l.kt)("p",null,"\u7531\u4e8e\u76ee\u524d Admin API \u90fd\u662f\u57fa\u4e8e etcd \u914d\u7f6e\u4e2d\u5fc3\u89e3\u51b3\u65b9\u6848\uff0c\u5f53\u5f00\u542f Stand-alone \u6a21\u5f0f\u540e\uff0c\nAdmin API \u5c06\u4e0d\u518d\u88ab\u5141\u8bb8\u4f7f\u7528\u3002"),(0,l.kt)("p",null,"\u901a\u8fc7\u8bbe\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"conf/config.yaml")," \u4e2d\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"apisix.config_center")," \u9009\u9879\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"yaml")," \uff0c\u5e76\u7981\u7528 Admin API \u5373\u53ef\u542f\n\u7528 Stand-alone \u6a21\u5f0f\u3002"),(0,l.kt)("p",null,"\u53c2\u8003\u4e0b\u9762\u793a\u4f8b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  enable_admin: false\n  config_center: yaml\n")),(0,l.kt)("h3",{id:"\u5982\u4f55\u914d\u7f6e\u89c4\u5219"},"\u5982\u4f55\u914d\u7f6e\u89c4\u5219"),(0,l.kt)("p",null,"\u6240\u6709\u7684\u8def\u7531\u89c4\u5219\u5747\u5b58\u653e\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf/apisix.yaml")," \u8fd9\u4e00\u4e2a\u6587\u4ef6\u4e2d\uff0cAPISIX \u4f1a\u4ee5\u6bcf\u79d2\uff08\u9ed8\u8ba4\uff09\u9891\u7387\u68c0\u67e5\u6587\u4ef6\u662f\u5426\u6709\u53d8\u5316\uff0c\u5982\u679c\u6709\u53d8\u5316\uff0c\u5219\u4f1a\u68c0\u67e5\u6587\u4ef6\u672b\u5c3e\u662f\u5426\u80fd\u627e\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"#END")," \u7ed3\u5c3e\uff0c\u627e\u5230\u540e\u5219\u91cd\u65b0\u52a0\u8f7d\u6587\u4ef6\u66f4\u65b0\u5230\u5185\u5b58\u3002"),(0,l.kt)("p",null,"\u4e0b\u9762\u5c31\u662f\u4e2a\u6700\u5c0f\u7684\u793a\u4f8b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'routes:\n  -\n    uri: /hello\n    upstream:\n        nodes:\n            "127.0.0.1:1980": 1\n        type: roundrobin\n#END\n')),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"\u6ce8\u610f"),"\uff1a\u5982\u679c ",(0,l.kt)("inlineCode",{parentName:"p"},"conf/apisix.yaml")," \u672b\u5c3e\u4e0d\u80fd\u627e\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"#END"),"\uff0c\u90a3\u4e48 APISIX \u5c06\u4e0d\u4f1a\u52a0\u8f7d\u8fd9\u4e2a\u6587\u4ef6\u89c4\u5219\u5230\u5185\u5b58\u3002"),(0,l.kt)("h3",{id:"\u914d\u7f6e-router"},"\u914d\u7f6e Router"),(0,l.kt)("p",null,"\u5355\u4e2a Router\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'routes:\n  -\n    uri: /hello\n    upstream:\n        nodes:\n            "127.0.0.1:1980": 1\n        type: roundrobin\n#END\n')),(0,l.kt)("p",null,"\u591a\u4e2a Router\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'routes:\n  -\n    uri: /hello\n    upstream:\n        nodes:\n            "127.0.0.1:1980": 1\n        type: roundrobin\n  -\n    uri: /hello2\n    upstream:\n        nodes:\n            "127.0.0.1:1981": 1\n        type: roundrobin\n#END\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e-router--service"},"\u914d\u7f6e Router + Service"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},'routes:\n    -\n        uri: /hello\n        service_id: 1\nservices:\n    -\n        id: 1\n        upstream:\n            nodes:\n                "127.0.0.1:1980": 1\n            type: roundrobin\n#END\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e-router--upstream"},"\u914d\u7f6e Router + Upstream"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},'routes:\n    -\n        uri: /hello\n        upstream_id: 1\nupstreams:\n    -\n        id: 1\n        nodes:\n            "127.0.0.1:1980": 1\n        type: roundrobin\n#END\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e-router--service--upstream"},"\u914d\u7f6e Router + Service + Upstream"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},'routes:\n    -\n        uri: /hello\n        service_id: 1\nservices:\n    -\n        id: 1\n        upstream_id: 2\nupstreams:\n    -\n        id: 2\n        nodes:\n            "127.0.0.1:1980": 1\n        type: roundrobin\n#END\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e-plugins"},"\u914d\u7f6e Plugins"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},"# \u5217\u51fa\u7684\u63d2\u4ef6\u4f1a\u88ab\u70ed\u52a0\u8f7d\u5e76\u8986\u76d6\u6389\u542f\u52a8\u65f6\u7684\u914d\u7f6e\nplugins:\n  - name: ip-restriction\n  - name: jwt-auth\n  - name: mqtt-proxy\n    stream: true # stream \u63d2\u4ef6\u9700\u8981\u8bbe\u7f6e stream \u5c5e\u6027\u4e3a true\n#END\n")),(0,l.kt)("h3",{id:"\u542f\u7528-ssl"},"\u542f\u7528 SSL"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},'ssl:\n    -\n        cert: |\n            -----BEGIN CERTIFICATE-----\n            MIIDrzCCApegAwIBAgIJAI3Meu/gJVTLMA0GCSqGSIb3DQEBCwUAMG4xCzAJBgNV\n            BAYTAkNOMREwDwYDVQQIDAhaaGVqaWFuZzERMA8GA1UEBwwISGFuZ3pob3UxDTAL\n            BgNVBAoMBHRlc3QxDTALBgNVBAsMBHRlc3QxGzAZBgNVBAMMEmV0Y2QuY2x1c3Rl\n            ci5sb2NhbDAeFw0yMDEwMjgwMzMzMDJaFw0yMTEwMjgwMzMzMDJaMG4xCzAJBgNV\n            BAYTAkNOMREwDwYDVQQIDAhaaGVqaWFuZzERMA8GA1UEBwwISGFuZ3pob3UxDTAL\n            BgNVBAoMBHRlc3QxDTALBgNVBAsMBHRlc3QxGzAZBgNVBAMMEmV0Y2QuY2x1c3Rl\n            ci5sb2NhbDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ/qwxCR7g5S\n            s9+VleopkLi5pAszEkHYOBpwF/hDeRdxU0I0e1zZTdTlwwPy2vf8m3kwoq6fmNCt\n            tdUUXh5Wvgi/2OA8HBBzaQFQL1Av9qWwyES5cx6p0ZBwIrcXQIsl1XfNSUpQNTSS\n            D44TGduXUIdeshukPvMvLWLezynf2/WlgVh/haWtDG99r/Gj3uBdjl0m/xGvKvIv\n            NFy6EdgG9fkwcIalutjrUnGl9moGjwKYu4eXW2Zt5el0d1AHXUsqK4voe0p+U2Nz\n            quDmvxteXWdlsz8o5kQT6a4DUtWhpPIfNj9oZfPRs3LhBFQ74N70kVxMOCdec1lU\n            bnFzLIMGlz0CAwEAAaNQME4wHQYDVR0OBBYEFFHeljijrr+SPxlH5fjHRPcC7bv2\n            MB8GA1UdIwQYMBaAFFHeljijrr+SPxlH5fjHRPcC7bv2MAwGA1UdEwQFMAMBAf8w\n            DQYJKoZIhvcNAQELBQADggEBAG6NNTK7sl9nJxeewVuogCdMtkcdnx9onGtCOeiQ\n            qvh5Xwn9akZtoLMVEdceU0ihO4wILlcom3OqHs9WOd6VbgW5a19Thh2toxKidHz5\n            rAaBMyZsQbFb6+vFshZwoCtOLZI/eIZfUUMFqMXlEPrKru1nSddNdai2+zi5rEnM\n            HCot43+3XYuqkvWlOjoi9cP+C4epFYrxpykVbcrtbd7TK+wZNiK3xtDPnVzjdNWL\n            geAEl9xrrk0ss4nO/EreTQgS46gVU+tLC+b23m2dU7dcKZ7RDoiA9bdVc4a2IsaS\n            2MvLL4NZ2nUh8hAEHiLtGMAV3C6xNbEyM07hEpDW6vk6tqk=\n            -----END CERTIFICATE-----\n        key: |\n            -----BEGIN PRIVATE KEY-----\n            MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCf6sMQke4OUrPf\n            lZXqKZC4uaQLMxJB2DgacBf4Q3kXcVNCNHtc2U3U5cMD8tr3/Jt5MKKun5jQrbXV\n            FF4eVr4Iv9jgPBwQc2kBUC9QL/alsMhEuXMeqdGQcCK3F0CLJdV3zUlKUDU0kg+O\n            Exnbl1CHXrIbpD7zLy1i3s8p39v1pYFYf4WlrQxvfa/xo97gXY5dJv8RryryLzRc\n            uhHYBvX5MHCGpbrY61JxpfZqBo8CmLuHl1tmbeXpdHdQB11LKiuL6HtKflNjc6rg\n            5r8bXl1nZbM/KOZEE+muA1LVoaTyHzY/aGXz0bNy4QRUO+De9JFcTDgnXnNZVG5x\n            cyyDBpc9AgMBAAECggEAatcEtehZPJaCeClPPF/Cwbe9YoIfe4BCk186lHI3z7K1\n            5nB7zt+bwVY0AUpagv3wvXoB5lrYVOsJpa9y5iAb3GqYMc/XDCKfD/KLea5hwfcn\n            BctEn0LjsPVKLDrLs2t2gBDWG2EU+udunwQh7XTdp2Nb6V3FdOGbGAg2LgrSwP1g\n            0r4z14F70oWGYyTQ5N8UGuyryVrzQH525OYl38Yt7R6zJ/44FVi/2TvdfHM5ss39\n            SXWi00Q30fzaBEf4AdHVwVCRKctwSbrIOyM53kiScFDmBGRblCWOxXbiFV+d3bjX\n            gf2zxs7QYZrFOzOO7kLtHGua4itEB02497v+1oKDwQKBgQDOBvCVGRe2WpItOLnj\n            SF8iz7Sm+jJGQz0D9FhWyGPvrN7IXGrsXavA1kKRz22dsU8xdKk0yciOB13Wb5y6\n            yLsr/fPBjAhPb4h543VHFjpAQcxpsH51DE0b2oYOWMmz+rXGB5Jy8EkP7Q4njIsc\n            2wLod1dps8OT8zFx1jX3Us6iUQKBgQDGtKkfsvWi3HkwjFTR+/Y0oMz7bSruE5Z8\n            g0VOHPkSr4XiYgLpQxjbNjq8fwsa/jTt1B57+By4xLpZYD0BTFuf5po+igSZhH8s\n            QS5XnUnbM7d6Xr/da7ZkhSmUbEaMeHONSIVpYNgtRo4bB9Mh0l1HWdoevw/w5Ryt\n            L/OQiPhfLQKBgQCh1iG1fPh7bbnVe/HI71iL58xoPbCwMLEFIjMiOFcINirqCG6V\n            LR91Ytj34JCihl1G4/TmWnsH1hGIGDRtJLCiZeHL70u32kzCMkI1jOhFAWqoutMa\n            7obDkmwraONIVW/kFp6bWtSJhhTQTD4adI9cPCKWDXdcCHSWj0Xk+U8HgQKBgBng\n            t1HYhaLzIZlP/U/nh3XtJyTrX7bnuCZ5FhKJNWrYjxAfgY+NXHRYCKg5x2F5j70V\n            be7pLhxmCnrPTMKZhik56AaTBOxVVBaYWoewhUjV4GRAaK5Wc8d9jB+3RizPFwVk\n            V3OU2DJ1SNZ+W2HBOsKrEfwFF/dgby6i2w6MuAP1AoGBAIxvxUygeT/6P0fHN22P\n            zAHFI4v2925wYdb7H//D8DIADyBwv18N6YH8uH7L+USZN7e4p2k8MGGyvTXeC6aX\n            IeVtU6fH57Ddn59VPbF20m8RCSkmBvSdcbyBmqlZSBE+fKwCliKl6u/GH0BNAWKz\n            r8yiEiskqRmy7P7MY9hDmEbG\n            -----END PRIVATE KEY-----\n        snis:\n            - "yourdomain.com"\n#END\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e-global-rule"},"\u914d\u7f6e global rule"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'global_rules:\n    -\n        id: 1\n        plugins:\n            response-rewrite:\n                body: "hello\\n"\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e-consumer"},"\u914d\u7f6e consumer"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"consumers:\n  - username: jwt\n    plugins:\n        jwt-auth:\n            key: user-key\n            secret: my-secret-key\n")),(0,l.kt)("h3",{id:"\u914d\u7f6e-plugin-metadata"},"\u914d\u7f6e plugin metadata"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'upstreams:\n  - id: 1\n    nodes:\n      "127.0.0.1:1980": 1\n    type: roundrobin\nroutes:\n  -\n    uri: /hello\n    upstream_id: 1\n    plugins:\n        http-logger:\n            batch_max_size: 1\n            uri: http://127.0.0.1:1980/log\nplugin_metadata:\n  - id: http-logger # \u6ce8\u610f id \u662f\u63d2\u4ef6\u540d\u79f0\n    log_format:\n        host: "$host",\n        remote_addr: "$remote_addr"\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e-stream-route"},"\u914d\u7f6e stream route"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'stream_routes:\n  - server_addr: 127.0.0.1\n    server_port: 1985\n    id: 1\n    upstream_id: 1\n    plugins:\n      mqtt-proxy:\n        protocol_name: "MQTT"\n        protocol_level: 4\n        upstream:\n          ip: "127.0.0.1"\n          port: 1995\nupstreams:\n  - nodes:\n      "127.0.0.1:1995": 1\n    type: roundrobin\n    id: 1\n')))}c.isMDXComponent=!0}}]);