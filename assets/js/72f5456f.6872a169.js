"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3487,2139],{7956:(e,t,a)=>{a.r(t),a.d(t,{default:()=>P});var n=a(7378),r=a(5562),l=a(8539),i=a(1787),o=a(353),s=a(5361);const c=e=>{(0,n.useEffect)((()=>{e()}),[])},m=(e,t)=>getComputedStyle(e)[t],p=function(e){if(void 0===e&&(e=0),"number"==typeof e)return e;const t=e,a=/[0-9]+/;if(!a.test(t[0])){const[e=0]=t.match(a)||[];return Number(e)}return e.includes("%")?parseFloat(e)/100:parseFloat(e)},d=r.ZP.div.withConfig({displayName:"Affix__AffixContent",componentId:"sc-1rslgfc-0"})([""]),u=e=>{const{style:t,children:a}=e,{top:r=0}=t||{},l=p(r),[i,o]=(0,n.useState)(!0),[s,u]=(0,n.useState)(t),[g,h]=(0,n.useState)(0),[f,w]=(0,n.useState)(0),[b,x]=(0,n.useState)(0),E=()=>{x((()=>window.scrollY))};c((()=>{const e=CSS.supports("position","sticky");return o(e),u(function(e,t){void 0===t&&(t={});const{width:a=0}=t;return{...e?{position:"sticky",marginLeft:"-"+p(a)+"px",display:"inline-block",float:"left"}:{position:"absolute"},...t}}(e,t)),e||window.addEventListener("scroll",E),()=>{window.removeEventListener("scroll",E)}}));return n.createElement(d,{ref:e=>{if(e){var t;const a=null!=(t=e.parentElement)?t:document.body,n=p(m(a,"padding-bottom"));h(e.clientHeight),w(a.clientHeight+a.offsetTop-n)}},style:i?s:f>b+window.innerHeight?{...s,top:b+l}:{...s,top:f-g}},a)},g=r.ZP.h1.withConfig({displayName:"plugins__PageTitle",componentId:"sc-1a0oxlj-0"})(["text-align:center;margin-top:1rem;font-size:3rem;font-weight:700;text-transform:uppercase;"]),h=r.ZP.div.withConfig({displayName:"plugins__PageSubtitle",componentId:"sc-1a0oxlj-1"})(["text-align:center;font-size:1rem;margin-bottom:2rem;font-weight:400;"]),f=r.ZP.div.withConfig({displayName:"plugins__SidebarItem",componentId:"sc-1a0oxlj-2"})(["padding-top:3px;padding-bottom:3px;padding-right:3px;text-align:right;font-size:1rem;font-weight:400;text-transform:capitalize;color:#d0312d;"]),w=r.ZP.div.withConfig({displayName:"plugins__Page",componentId:"sc-1a0oxlj-3"})(["max-width:var(--ifm-container-width);margin:0 auto;padding:2rem var(--ifm-spacing-horizontal);width:100%;flex-wrap:wrap;gridTemplateAreas :\"'SidebarContainer' 'PluginsContainer'\";"]),b=r.ZP.div.withConfig({displayName:"plugins__PluginsContainer",componentId:"sc-1a0oxlj-4"})(["display:grid;margin-left:200px;grid-template-columns:repeat(3,1fr);grid-gap:5px;@media (max-width:1200px){margin-left:0;}@media (max-width:812px){grid-template-columns:repeat(2,1fr);}@media (max-width:576px){grid-template-columns:repeat(1,1fr);}"]),x=r.ZP.div.withConfig({displayName:"plugins__SidebarContainer",componentId:"sc-1a0oxlj-5"})(["display:grid;width:100%;overflow-x:hidden;padding-right:10px;border-style:solid;border-color:#ffffff #efeff5 #ffffff #ffffff;@media (max-width:1200px){display:none;}"]),E=r.ZP.a.withConfig({displayName:"plugins__PluginCard",componentId:"sc-1a0oxlj-6"})(["border-radius:0.75rem;border:1px solid #eee;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05);display:flex;flex-direction:column;align-items:left;text-align:left;padding:1rem;min-width:calc(180px + 5rem);cursor:pointer;height:100%;&:hover{color:inherit;text-decoration:none;}"]),v=r.ZP.div.withConfig({displayName:"plugins__PluginIcon",componentId:"sc-1a0oxlj-7"})(["padding:1rem;display:flex;min-height:200px;align-items:center;justify-content:center;"]),y=r.ZP.div.withConfig({displayName:"plugins__PluginName",componentId:"sc-1a0oxlj-8"})(["display:flex;align-items:center;font-size:1rem;font-weight:600;margin-top:12px;margin-bottom:-4px;line-height:1rem;text-align:left;text-transform:capitalize;"]),_=r.ZP.div.withConfig({displayName:"plugins__PluginDescription",componentId:"sc-1a0oxlj-9"})(["font-size:0.8rem;font-weight:500;margin-top:10px;color :#7e7c7c;text-align:left;"]),C=r.ZP.h2.withConfig({displayName:"plugins__SectionTitle",componentId:"sc-1a0oxlj-10"})(["margin-left:200px;margin-bottom:24px;margin-top:84px;text-transform:uppercase;@media (max-width:1200px){margin-left:0;}"]),k=r.ZP.div.withConfig({displayName:"plugins__SBeta",componentId:"sc-1a0oxlj-11"})(['padding:0.1rem 0.5rem 0.1rem 0.3rem;margin:0 0.5rem;font-size:90%;font-weight:300;border:1px solid #dadde1;border-right:0;position:relative;transition:all 0.2s;::before{content:"";left:100%;transform:translate(-50%,-50%) rotate(45deg);border-left:0 !important;border-bottom:0 !important;width:0.9rem;height:0.9rem;border:1px solid var(--docusaurus-tag-list-border);position:absolute;top:50%;transition:inherit;}::after{content:\'\';right:0;border-radius:50%;height:0.4rem;width:0.4rem;left:90%;transform:translateY(-50%);border:1px solid var(--docusaurus-tag-list-border);content:"";position:absolute;top:50%;transition:inherit;}:hover{color:#e8433e;border-color:#e8433e;::before,::after{border-color:#e8433e;}}']),P=()=>{const{siteConfig:e}=(0,o.Z)(),{plugins:t=[]}=e.customFields,a=t.map((e=>n.createElement(f,{key:e.groupName},n.createElement("a",{className:"sidebar-link",href:"#"+e.groupName},e.groupName)))),r=t.map((e=>{const t=e.plugins.map((e=>{const t=-1!==e.name.indexOf("serverless")?"serverless":e.name;return n.createElement("div",{key:e.name},n.createElement(E,{href:e.beta?"/docs/apisix/next/plugins/"+t:"/docs/apisix/plugins/"+t,target:"_blank"},n.createElement(v,null,e.useDefaultIcon?n.createElement("img",{className:"plugin-logo shadow default",src:"/img/plugin/default-icon.png",alt:e.name}):n.createElement("svg",{className:"plugin-logo shadow","aria-hidden":"true"},n.createElement("use",{xlinkHref:"#icon"+e.name}))),n.createElement(y,null,e.name,e.beta&&n.createElement(k,{title:"This plugin will be supported in the next version of Apache APISIX"},"Beta")),n.createElement(_,null,e.description),n.createElement("span",{className:"read-more-link"},"Read more >")))}));return n.createElement("div",{key:e.groupName},n.createElement(C,{id:e.groupName},e.groupName),n.createElement(b,null,t))}));return n.createElement(l.Z,{title:(0,i.I)({message:"Plugin Hub"})},n.createElement(s.Z,null,n.createElement("script",{src:"/js/plugin-icon.js",defer:!0})),n.createElement(w,null,n.createElement(g,null,n.createElement(i.Z,{id:"plugins.website.title"},"Apache APISIX\xae\ufe0f Plugin Hub")),n.createElement(h,null,n.createElement(i.Z,{id:"plugins.website.subtitle"},"Powerful Plugins and Easy Integrations")),n.createElement(u,{style:{width:250,top:300,left:0,zIndex:1}},n.createElement(x,null,a)),r))}},4058:(e,t,a)=>{a.d(t,{Z:()=>C});var n=a(5773),r=a(7378),l=a(4142),i=a(8948),o=a(8374),s=a(5423),c=a(5519),m=a(7645),p=a(9861);const d={container:"container_MP5Z",linksRow:"linksRow_iwpv",linksCol:"linksCol_a1ec",copyright:"copyright_ZfFh"};var u=a(353),g=a(4338),h=a(4146);const f=JSON.parse('{"$schema":"./event-poster-card-schema.json","show":true,"expire":"2025-04-12","width":400,"config":{"en":{"image":"https://static.api7.ai/uploads/2025/04/09/JBQWKlQv_Group427320331.webp","link":"/docs/general/events/2025-apisix-meetup-shenzhen-best-practices-for-api-and-ai-gateways","description":"Apache APISIX Meetup Shenzhen 2025"},"zh":{"image":"https://static.api7.ai/uploads/2025/04/09/9oPCEega_Group427320332.webp","link":"/zh/docs/general/events/2025-apisix-meetup-shenzhen-best-practices-for-api-and-ai-gateways","description":"Apache APISIX Meetup Shenzhen 2025"}}}'),w="picWrapper_K7bz",b="closeBtn_QOpn",x="SHOW_EVENT_ENTRY",E=e=>{const{config:t,width:a}=e,{i18n:{currentLocale:n}}=(0,u.Z)(),l=(0,r.useMemo)((()=>t[n]),[n]),[,i]=(0,h.Z)(x,!0),[o,s]=(0,g.useSpring)((()=>({from:{x:500,opacity:0}})));(0,r.useEffect)((()=>{s.start({to:{x:0,opacity:1},delay:800})}),[]);const c=(0,r.useCallback)((async()=>Promise.all(s.start({to:{x:500,opacity:0}})).then((()=>i(!1)))),[s]);return!0===(null==l?void 0:l.disable)?null:r.createElement(g.animated.div,{className:w,style:o},r.createElement("button",{className:b,onClick:c,type:"button"},r.createElement("svg",{role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 352 512"},r.createElement("path",{fill:"currentColor",d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"}))),r.createElement("a",{href:l.link,onClick:c,target:"_blank",rel:"noreferrer"},r.createElement(p.LazyLoadImage,{src:l.image,alt:l.description,width:a,style:{maxWidth:"100vw",borderRadius:"2px"}})))},v=()=>{const[e]=(0,h.Z)(x,!0),{show:t,expire:a,...n}=f,l=new Date(a).getTime();return t&&e&&l>Date.now()?r.createElement(E,n):null},y={links:[{title:"ASF",items:[{label:"Foundation",to:"https://www.apache.org/"},{label:"License",to:"https://www.apache.org/licenses/"},{label:"Events",to:"https://www.apache.org/events/"},{label:"Security",to:"https://www.apache.org/security/"},{label:"Sponsorship",to:"https://www.apache.org/foundation/sponsorship.html"},{label:"Thanks",to:"https://www.apache.org/foundation/thanks.html"}]},{title:"Community",items:[{icon:s.Z,label:"GitHub",to:"https://github.com/apache/apisix/issues"},{icon:c.Z,label:"Slack",to:"/docs/general/join"},{icon:"ri:twitter-x-fill",label:"Twitter",to:"https://twitter.com/ApacheAPISIX"},{icon:m.Z,label:"YouTube",to:"https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g"}]},{title:"More",items:[{label:"Blog",to:"/blog/",target:"_parent"},{label:"Showcase",to:"/showcase",target:"_parent"},{label:"Plugin Hub",to:"/plugins",target:"_parent"},{label:"Roadmap",to:"https://github.com/apache/apisix/milestones",target:"_parent"}]}],logo:{alt:"Apache Software Foundation",src:"https://static.apiseven.com/202202/asf_logo_wide_small.png",href:"https://www.apache.org/"},copyright:"Copyright \xa9 2019-"+(new Date).getFullYear()+" The Apache Software Foundation. Apache APISIX, APISIX\xae, Apache, the Apache feather logo, and the Apache APISIX project logo are either registered trademarks or trademarks of the Apache Software Foundation."},_=e=>{let{to:t,icon:a,href:s,label:c,prependBaseUrlToHref:m,...p}=e;const d=(0,i.Z)(t),u=(0,i.Z)(s,{forcePrependBaseUrl:!0}),g=s?{href:m?u:s}:{to:d};return r.createElement(l.Z,(0,n.Z)({},g,p),r.createElement(o.JO,{icon:a}),r.createElement("span",null,c))},C=()=>{const{copyright:e,links:t,logo:a}=y;return y?r.createElement("footer",{className:d.container},t&&t.length>0&&r.createElement("div",{className:d.linksRow},t.map((e=>{let{title:t,items:a}=e;return r.createElement("div",{key:t,className:d.linksCol},r.createElement("div",null,t),r.createElement("ul",null,a.map((e=>r.createElement("li",{key:e.to,className:"footer__item"},r.createElement(_,e))))))}))),r.createElement("div",{className:d.copyright},r.createElement(l.Z,{href:a.href},r.createElement(p.LazyLoadImage,{alt:a.alt,src:a.src,height:"40px",width:"231.25px"})),r.createElement("div",{className:d.text},e)),r.createElement(v,null)):null}},4867:(e,t,a)=>{a.d(t,{Z:()=>u});var n=a(5773),r=a(7378),l=a(3727),i=a(6281),o=a(353),s=a(5013),c=a(9635),m=a(4142);const p="iconLanguage_zID8",d="localizedBlogLink_cE-3",u=e=>{const{mobile:t,dropdownItemsBefore:a,dropdownItemsAfter:u,...g}=e,{i18n:{currentLocale:h,locales:f,localeConfigs:w}}=(0,o.Z)(),b=(0,s.l5)(),{pathname:x}=(0,c.TH)();if(x.startsWith("/zh/blog"))return r.createElement(m.Z,{className:d,isNavLink:!0,autoAddBaseUrl:!1,to:"pathname:///blog",target:"_self"},"English Blog");if(x.startsWith("/blog"))return r.createElement(m.Z,{className:d,isNavLink:!0,autoAddBaseUrl:!1,to:"pathname:///zh/blog",target:"_self"},"\u4e2d\u6587\u535a\u5ba2");function E(e){return w[e].label}const v=[...a,...f.map((e=>{const t="pathname://"+b.createUrl({locale:e,fullyQualified:!1});return{isNavLink:!0,label:E(e),to:t,target:"_self",autoAddBaseUrl:!1,className:e===h?"dropdown__link--active":"",style:{textTransform:"capitalize"}}})),...u],y=t?"Languages":E(h);return r.createElement(l.Z,(0,n.Z)({},g,{href:"#",mobile:t,label:r.createElement("span",null,r.createElement(i.Z,{className:p}),r.createElement("span",null,y)),items:v}))}},5403:(e,t,a)=>{a.d(t,{Z:()=>E});var n=a(5773),r=a(7378),l=a(1542),i=a(353),o=a(8948),s=a(4142),c=a(5361),m=a(9033),p=a(9495),d=a(2492),u=a(7489),g=a(1787);const h="searchBox_fBfG";let f=null;function w(e){let{hit:t,children:a}=e;return r.createElement("a",{href:t.url,target:"_parent"},a)}function b(e){let{state:t,onClose:a}=e;const{generateSearchPageLink:n}=(0,m.Z)();return r.createElement(s.Z,{to:n(t.query),onClick:a,target:"_blank"},"See all ",t.context.nbHits," results")}function x(e){var t,s;let{contextualSearch:m,...x}=e;const{siteMetadata:E}=(0,i.Z)(),v=(0,u.Z)(),y=null!=(t=null==(s=x.searchParameters)?void 0:s.facetFilters)?t:[],_=m?[...v,...y]:y,C={...x.searchParameters,facetFilters:_},{withBaseUrl:k}=(0,o.C)(),P=(0,r.useRef)(null),Z=(0,r.useRef)(null),[S,I]=(0,r.useState)(!1),[N,A]=(0,r.useState)(null),z=(0,r.useCallback)((()=>f?Promise.resolve():Promise.all([a.e(6295).then(a.bind(a,6295)),Promise.all([a.e(532),a.e(9127)]).then(a.bind(a,9127)),Promise.all([a.e(532),a.e(160)]).then(a.bind(a,160))]).then((e=>{let[{DocSearchModal:t}]=e;f=t}))),[]),L=(0,r.useCallback)((()=>{z().then((()=>{P.current=document.createElement("div"),document.body.insertBefore(P.current,document.body.firstChild),I(!0)}))}),[z,I]),B=(0,r.useCallback)((()=>{I(!1),P.current.remove()}),[I]),j=(0,r.useCallback)((e=>{z().then((()=>{I(!0),A(e.key)}))}),[z,I,A]),T=(0,r.useRef)({navigate(e){let{itemUrl:t}=e;location.assign(t)}}).current,F=(0,r.useRef)((e=>e.map((e=>{const t=document.createElement("a");return t.href=e.url,{...e,url:k(""+t.pathname+t.hash)}})))).current,R=(0,r.useMemo)((()=>e=>r.createElement(b,(0,n.Z)({},e,{onClose:B}))),[B]),H=(0,r.useCallback)((e=>(e.addAlgoliaAgent("docusaurus",E.docusaurusVersion),e)),[E.docusaurusVersion]);(0,p.D)({isOpen:S,onOpen:L,onClose:B,onInput:j,searchButtonRef:Z});const M=(0,g.I)({id:"theme.SearchBar.label",message:"Search",description:"The ARIA label and placeholder for search button"});return r.createElement(r.Fragment,null,r.createElement(c.Z,null,r.createElement("link",{rel:"preconnect",href:"https://"+x.appId+"-dsn.algolia.net",crossOrigin:"anonymous"})),r.createElement("div",{className:h},r.createElement(d.a,{onTouchStart:z,onFocus:z,onMouseOver:z,onClick:L,ref:Z,translations:{buttonText:M,buttonAriaLabel:M}})),S&&(0,l.createPortal)(r.createElement(f,(0,n.Z)({onClose:B,initialScrollY:window.scrollY,initialQuery:N,navigator:T,transformItems:F,hitComponent:w,resultsFooterComponent:R,transformSearchClient:H},x,{searchParameters:C})),P.current))}const E=function(){const{siteConfig:e}=(0,i.Z)();return r.createElement(x,e.themeConfig.algolia)}}}]);