"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[81356],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>g});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),u=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=u(e.components);return r.createElement(p.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=u(t),g=a,m=d["".concat(p,".").concat(g)]||d[g]||c[g]||i;return t?r.createElement(m,o(o({ref:n},s),{},{components:t})):r.createElement(m,o({ref:n},s))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},46044:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=t(87462),a=(t(67294),t(3905));const i={title:"How it works"},o=void 0,l={unversionedId:"how-it-works",id:"version-0.6.0/how-it-works",isDocsHomePage:!1,title:"How it works",description:"This article explains how apisix-java-plugin-runner collaborate with Apache APISIX to run plugins written in java.",source:"@site/docs-apisix-java-plugin-runner_versioned_docs/version-0.6.0/how-it-works.md",sourceDirName:".",slug:"/how-it-works",permalink:"/docs/java-plugin-runner/how-it-works",editUrl:"/edit#https://github.com/apache/apisix-java-plugin-runner/edit/release/0.6.0/docs/en/latest/how-it-works.md",tags:[],version:"0.6.0",frontMatter:{title:"How it works"},sidebar:"version-0.6.0/docs",previous:{title:"Development",permalink:"/docs/java-plugin-runner/development"},next:{title:"The internal of apisix java plugin runner",permalink:"/docs/java-plugin-runner/the-internal-of-apisix-java-plugin-runner"}},p=[{value:"Overview",id:"overview",children:[]},{value:"Run Mode",id:"run-mode",children:[{value:"Debug",id:"debug",children:[]},{value:"Run",id:"run",children:[]}]}],u={toc:p};function s(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"overview"},"Overview"),(0,a.kt)("p",null,"This article explains how apisix-java-plugin-runner collaborate with ",(0,a.kt)("a",{parentName:"p",href:"https://apisix.apache.org"},"Apache APISIX")," to run plugins written in java."),(0,a.kt)("h2",{id:"run-mode"},"Run Mode"),(0,a.kt)("p",null,"apisix-java-plugin-runner can be run alone or bundled with Apache APISIX.\nIt depends on whether you need to debug it or run it."),(0,a.kt)("h3",{id:"debug"},"Debug"),(0,a.kt)("p",null,"If you are developing a new plugin and need to debug the code, then you can run the main class\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-java-plugin-runner/blob/main/runner-starter/src/main/java/org/apache/apisix/plugin/runner/PluginRunnerApplication.java"},"PluginRunnerApplication"),",\nand before start, you need to set the following two environment variables:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"APISIX_LISTEN_ADDRESS: apisix-java-plugin-runner and APISIX for inter-process communication (Unix Domain Socket) socket type file address.\nAnd do not need to actively create this file, apisix-java-plugin-runner will automatically create this file when it starts."),(0,a.kt)("li",{parentName:"ul"},"APISIX_CONF_EXPIRE_TIME: the time that APISIX's configuration is cached in the apisix-java-plugin-runner process.")),(0,a.kt)("p",null,"For example, if you start apisix-java-plugin-runner as a jar package, pass the environment variables as below"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"java -jar -DAPISIX_LISTEN_ADDRESS=unix:/tmp/runner.sock -DAPISIX_CONF_EXPIRE_TIME=3600 /path/to/apisix-java-plugin-runner.jar\n")),(0,a.kt)("p",null,"Note: Refer to ",(0,a.kt)("a",{parentName:"p",href:"#run"},"apisix-java-plugin-runner.jar")," to get it."),(0,a.kt)("p",null,"and add the following configure in the ",(0,a.kt)("inlineCode",{parentName:"p"},"config.yaml")," file of APISIX"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"ext-plugin:\n  path_for_test: /tmp/runner.sock\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"/tmp/runner.sock")," is the address of the file where apisix-java-plugin-runner\nand APISIX communicate between processes and must be consistent."),(0,a.kt)("p",null,"Note: If you see some error logs like"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"phase_func(): failed to connect to the unix socket unix:/tmp/runner.sock: permission denied\n")),(0,a.kt)("p",null,"in the ",(0,a.kt)("inlineCode",{parentName:"p"},"error.log")," of APISIX, ensure the APISIX user is provided rights on the socket. This can be done\nfor instance by using a common group. Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"groupadd apisix_group\nusermod -aG apisix_group apisix\nusermod -aG apisix_group java_plugin_runner\nchown java_plugin_runner:apisix_group /tmp/runner.sock\nchmod 760 /tmp/runner.sock\n")),(0,a.kt)("p",null,"To get more detailed debugging information, you can modify the output level of the log.\nConfigure the log level in ",(0,a.kt)("inlineCode",{parentName:"p"},"runner-starter/src/main/resources/application.yaml"),", as below\n(any changes to the project files need to be re-executed ",(0,a.kt)("inlineCode",{parentName:"p"},"./mvnw package package"),")"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"logging:\n  level:\n    root: debug\n")),(0,a.kt)("h3",{id:"run"},"Run"),(0,a.kt)("p",null,"No environment variables need to be set in Run mode, execute"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cd /path/to/apisix-java-plugin-runner\n ./mvnw package\n")),(0,a.kt)("p",null,"to built apisix-java-plugin-runner as a jar package, then you will see the ",(0,a.kt)("inlineCode",{parentName:"p"},"dist")," directory, execute"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cd dist\ntar -zxvf apache-apisix-java-plugin-runner-0.1.0-bin.tar.gz\n")),(0,a.kt)("p",null,"the layout of files in the ",(0,a.kt)("inlineCode",{parentName:"p"},"dist")," directory is as below"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"dist\n\u251c\u2500\u2500 apache-apisix-java-plugin-runner-0.1.0-bin.tar.gz\n\u2514\u2500\u2500 apisix-runner-bin\n    \u251c\u2500\u2500 apisix-java-plugin-runner.jar\n    \u251c\u2500\u2500 bin\n    \u2502\xa0\xa0 \u251c\u2500\u2500 shutdown.sh\n    \u2502\xa0\xa0 \u2514\u2500\u2500 startup.sh\n    \u251c\u2500\u2500 LICENSE\n    \u251c\u2500\u2500 NOTICE\n    \u2514\u2500\u2500 README.md\n\n")),(0,a.kt)("p",null,"then add the following configure in the ",(0,a.kt)("inlineCode",{parentName:"p"},"config.yaml")," file of APISIX"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"ext-plugin:\n  cmd: ['java', '-jar', '-Xmx4g', '-Xms4g', '/path/to/apisix-runner-bin/apisix-java-plugin-runner.jar']\n")))}s.isMDXComponent=!0}}]);