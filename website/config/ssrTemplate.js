const CDN_URL = 'https://cdn.jsdelivr.net/gh/apache/apisix-website@asf-site'

module.exports = {
  ssrTemplate: `<!DOCTYPE html>
  <html <%~ it.htmlAttributes %>>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="generator" content="Docusaurus v<%= it.version %>">
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
          var footerDOM = document.querySelector('footer');
          footerDOM.insertAdjacentHTML('afterend', '<div style="text-align: right;padding: 16px 0;">This site is powered by <a href="https://www.netlify.com/" target="_blank">Netlify</a></div>');
        }
      }
    </script>
  </html>`
}
