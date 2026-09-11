export const versionedDocPath = /^((?:\/zh)?\/docs\/[\w-]+\/)(?:(?:[\w-]+-)?\d+\.\d+(?:\.\d+)?|next)(\/.*)?$/;

export function getVersionedDocSignals(pathname, siteUrl, latestPath) {
  if (!versionedDocPath.test(pathname)) return null;
  const canonicalUrl = latestPath
    ? `${siteUrl}${latestPath.replace(/\/?$/, '/')}`
    : `${siteUrl}${pathname}`;
  return { canonicalUrl, robots: 'noindex,follow' };
}
