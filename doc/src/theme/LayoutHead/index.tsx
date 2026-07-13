/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import type { FC } from 'react';
import React from 'react';
import Head from '@docusaurus/Head';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: swizzle-wrapper alias has no published types
import OriginalLayoutHead from '@theme-original/LayoutHead';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

/**
 * Matches the version segment of versioned doc URLs, e.g.
 *   /docs/apisix/3.10/plugins/cors/          -> 3.10
 *   /docs/ingress-controller/2.0.0/...       -> 2.0.0
 *   /docs/docker/apisix-2.10.0/...           -> apisix-2.10.0
 *   /docs/apisix/next/...                    -> next
 * Keeps the same version-segment pattern as scripts/update-sitemap-loc.js.
 */
const versionedDocPath = /^((?:\/zh)?\/docs\/[\w-]+\/)(?:(?:[\w-]+-)?\d+\.\d+(?:\.\d+)?|next)(\/.+)$/;

/**
 * Versioned doc pages (/docs/<project>/<version>/) self-canonicalize by
 * default, so Google indexes them as independent pages competing with the
 * version-less "latest" URLs. This wrapper re-points their canonical to the
 * latest URL. Rendering order keeps the precedence right (react-helmet:
 * last <Head> wins):
 *   1. default self-canonical (original LayoutHead)
 *   2. this wrapper's latest-URL canonical (versioned pages only)
 *   3. canonical embedded in the doc markdown itself, if any
 */
const LayoutHead: FC<{ [key: string]: unknown }> = (props) => {
  const { siteConfig: { url: siteUrl } } = useDocusaurusContext();
  const { pathname } = useLocation();
  const match = pathname.match(versionedDocPath);
  const latestUrl = match ? `${siteUrl}${match[1].replace(/\/$/, '')}${match[2]}` : null;

  return (
    <>
      <OriginalLayoutHead {...props} />
      {latestUrl && (
        <Head>
          <meta property="og:url" content={latestUrl} />
          <link rel="canonical" href={latestUrl} />
        </Head>
      )}
    </>
  );
};

export default LayoutHead;
