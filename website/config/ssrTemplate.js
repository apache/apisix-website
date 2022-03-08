const CDN_URL = 'https://cdn.jsdelivr.net/gh/apache/apisix-website@asf-site'

module.exports = {
  ssrTemplate: `<!DOCTYPE html>
  <html <%~ it.htmlAttributes %>>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="generator" content="Docusaurus v<%= it.version %>">
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K24PRPS');</script>
      <% if (it.noIndex) { %>
        <meta name="robots" content="noindex, nofollow" />
      <% } %>
      <%~ it.headTags %>
      <% it.metaAttributes.forEach((metaAttribute) => { %>
        <%~ metaAttribute %>
      <% }); %>
      <% it.stylesheets.forEach((stylesheet) => { %>
        <link rel="stylesheet" href="${CDN_URL}<%= it.baseUrl %><%= stylesheet %>" />
      <% }); %>
      <% it.scripts.forEach((script) => { %>
        <link rel="preload" href="${CDN_URL}<%= it.baseUrl %><%= script %>" as="script">
      <% }); %>
    </head>
    <body <%~ it.bodyAttributes %>>
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K24PRPS" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <%~ it.preBodyTags %>
      <div id="__docusaurus">
        <%~ it.appHtml %>
      </div>
      <% it.scripts.forEach((script) => { %>
        <script src="<%= it.baseUrl %><%= script %>"></script>
      <% }); %>
      <%~ it.postBodyTags %>
    </body>
    <script>
      window.onload = function() {
        if (window.location.host.endsWith(".netlify.app")) {
          var dom = document.querySelector("#__docusaurus");
          dom.insertAdjacentHTML('afterend', '<div style="text-align: right;padding: 48px 32px 48px 0;">This site is powered by <a href="https://www.netlify.com/" target="_blank">Netlify</a></div>');
        }
      }
    </script>
  </html>`
}
