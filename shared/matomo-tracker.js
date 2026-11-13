/* eslint-disable no-underscore-dangle */
(() => {
  if (window.location.hostname !== 'apisix.apache.org') return;
  const trackerUrl = 'https://analytics.apache.org/';
  window._paq = window._paq || [];
  const queue = window._paq;
  /* tracker methods like "setCustomDimension" should be called before
  "trackPageView" */
  /* We explicitly disable cookie tracking to avoid privacy issues */
  queue.push(['disableCookies']);
  queue.push(['setTrackerUrl', `${trackerUrl}matomo.php`]);
  queue.push(['setSiteId', '17']);
  queue.push(['setCustomUrl', window.location.href]);
  queue.push(['setDocumentTitle', document.title]);
  queue.push(['trackPageView']);
  queue.push(['enableLinkTracking']);

  const loadMatomo = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${trackerUrl}matomo.js`;
    document.head.appendChild(script);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadMatomo, { timeout: 3000 });
  } else {
    window.addEventListener('load', loadMatomo, { once: true });
  }
})();
