module.exports = {
  ssrTemplate: `<!DOCTYPE html>
  <html <%~ it.htmlAttributes %>>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="ahrefs-site-verification" content="c2f7370ecf46173f4fb25f114e74c97e0a2976d4f02f61c9b00a9d7d34e34698">
      <meta name="generator" content="Docusaurus v<%= it.version %>">
      <% if (it.noIndex) { %>
        <meta name="robots" content="noindex, nofollow" />
      <% } %>
      <%~ it.headTags %>
      <% it.metaAttributes.forEach((metaAttribute) => { %>
        <%~ metaAttribute %>
      <% }); %>
      <link rel="preload" href="https://static.apiseven.com/202202/MaisonNeue-Medium.otf" as="font" type="font/otf" crossorigin>
      <link rel="preload" href="https://static.apiseven.com/202202/MaisonNeue-Bold.otf" as="font" type="font/otf" crossorigin>
      <link rel="preload" href="https://static.apiseven.com/202202/MaisonNeue-Light.otf" as="font" type="font/otf" crossorigin>
      <link rel="preload" href="https://static.apiseven.com/202202/MaisonNeue-Demi.otf"  as="font" type="font/otf" crossorigin>
      <link rel="preload" href="https://static.apiseven.com/202202/MaisonNeue-ExtraBold.otf" as="font" type="font/otf" crossorigin>
      <% it.scripts.forEach((script) => { %>
        <link rel="preload" href="<%= process.env.preview ? '' : 'https://apisix-website-static.apiseven.com' %><%= it.baseUrl %><%= script %>" as="script">
      <% }); %>
      <% it.stylesheets.forEach((stylesheet) => { %>
        <link rel="stylesheet" href="<%= process.env.preview ? '' : 'https://apisix-website-static.apiseven.com' %><%= it.baseUrl %><%= stylesheet %>" />
      <% }); %>
      <!-- Matomo from the ASF -->
      <script>
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before
      "trackPageView" */
        /* We explicitly disable cookie tracking to avoid privacy issues */
        _paq.push(['disableCookies']);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="https://analytics.apache.org/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '17']);
          var d=document, g=d.createElement('script'),
      s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      </script>
      <!-- End Matomo Code -->
    </head>
    <body <%~ it.bodyAttributes %>>
      <%~ it.preBodyTags %>
      <div id="__docusaurus">
        <%~ it.appHtml %>
      </div>
      <% it.scripts.forEach((script) => { %>
        <script src="<%= process.env.preview ? '' : 'https://apisix-website-static.apiseven.com' %><%= it.baseUrl %><%= script %>"></script>
      <% }); %>
      <%~ it.postBodyTags %>
    </body>
    <% if(process.env.preview) { %>
      <script>
        window.onload = function() {
          if (window.location.host.endsWith(".netlify.app")) {
            var dom = document.querySelector("#__docusaurus");
            dom.insertAdjacentHTML('afterend', '<div style="text-align: right;padding: 48px 32px 48px 0;">This site is powered by <a href="https://www.netlify.com/" target="_blank">Netlify</a></div>');
          }
        }
      </script>
    <% } %>
  </html>`,
};
