/* eslint-disable no-underscore-dangle */
export default {
  onRouteUpdate({ location, previousLocation }) {
    if (typeof window === 'undefined' || !window._paq || !previousLocation) return;
    if (location.pathname === previousLocation.pathname
      && location.search === previousLocation.search) return;

    const url = window.location.href;
    const referrer = `${window.location.origin}${previousLocation.pathname}${previousLocation.search}`;
    window.requestAnimationFrame(() => setTimeout(() => {
      const queue = window._paq;
      queue.push(['setReferrerUrl', referrer]);
      queue.push(['setCustomUrl', url]);
      queue.push(['setDocumentTitle', document.title]);
      queue.push(['trackPageView']);
      queue.push(['enableLinkTracking']);
    }, 0));
  },
};
