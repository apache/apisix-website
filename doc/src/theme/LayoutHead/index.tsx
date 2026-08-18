/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import type { FC } from 'react';
import React from 'react';
import Head from '@docusaurus/Head';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: swizzle-wrapper alias has no published types
import OriginalLayoutHead from '@theme-original/LayoutHead';
import { useActivePlugin } from '@theme/hooks/useDocs';
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
const versionedDocPath = /^((?:\/zh)?\/docs\/[\w-]+\/)(?:(?:[\w-]+-)?\d+\.\d+(?:\.\d+)?|next)(\/.*)?$/;

const normalizePath = (value: string) => value.replace(/\/$/, '');

/**
 * Versioned doc pages (/docs/<project>/<version>/) self-canonicalize by
 * default, so Google indexes them as independent pages competing with the
 * version-less "latest" URLs. This wrapper marks them noindex,follow and
 * re-points their canonical to the latest URL only when the same document is
 * present in the newest release. Rendering order keeps the precedence right
 * (react-helmet:
 * last <Head> wins):
 *   1. default self-canonical (original LayoutHead)
 *   2. this wrapper's latest-URL canonical (versioned pages only)
 *   3. canonical embedded in the doc markdown itself, if any
 */
const LayoutHead: FC<{ [key: string]: unknown }> = (props) => {
  const { siteConfig: { url: siteUrl } } = useDocusaurusContext();
  const { pathname } = useLocation();
  const activePlugin = useActivePlugin()?.pluginData;
  const match = pathname.match(versionedDocPath);
  const activeDoc = match ? activePlugin?.versions
    .flatMap(({ docs }) => docs)
    .find(({ path }) => normalizePath(path) === normalizePath(pathname)) : undefined;
  // Docusaurus returns versions newest-first. `current` is the unreleased
  // `next` tree, so the first non-current entry is the latest release that
  // actually owns the version-less Astro routes.
  const latestRelease = activePlugin?.versions.find(({ name }) => name !== 'current');
  const latestDoc = latestRelease?.docs.find(({ id }) => id === activeDoc?.id);
  const latestPath = activePlugin && latestRelease && latestDoc
    && latestDoc.path.startsWith(latestRelease.path)
    ? `${activePlugin.path}${latestDoc.path.slice(latestRelease.path.length)}`
    : null;
  const latestUrl = latestPath ? `${siteUrl}${latestPath}` : null;

  return (
    <>
      <OriginalLayoutHead {...props} />
      {match && (
        <Head>
          <meta name="robots" content="noindex,follow" />
          {latestUrl && <meta property="og:url" content={latestUrl} />}
          {latestUrl && <link rel="canonical" href={latestUrl} />}
        </Head>
      )}
    </>
  );
};

export default LayoutHead;
