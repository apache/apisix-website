/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react';
import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import style from './styles.module.scss';
import Fitty from './Fitty';

const NotFound: FC = () => {
  useEffect(() => {
    // The site is rebuilt and republished frequently, and each build replaces the
    // previous one's content-hashed chunks. A page still open from an older build
    // can client-navigate to a route that is missing from its stale route manifest
    // and land here, even though the server serves that page fine. Recover with a
    // single hard reload so the current build is fetched.
    //
    // Only do this when the 404 surfaced during a client-side navigation, not on
    // the document the server returned directly — that is a genuine 404 and is
    // left untouched. A per-path guard reloads at most once as a safety backstop.
    try {
      if (typeof window === 'undefined' || !window.performance) {
        return;
      }
      const [nav] = window.performance.getEntriesByType('navigation');
      const { pathname } = window.location;
      if (!nav || new URL(nav.name).pathname === pathname) {
        return;
      }
      const guardKey = `apisix-404-reload:${pathname}`;
      if (window.sessionStorage.getItem(guardKey)) {
        return;
      }
      window.sessionStorage.setItem(guardKey, '1');
      window.location.reload();
    } catch {
      // performance / sessionStorage / URL unavailable — leave the 404 as-is.
    }
  }, []);

  return (
    <Layout
      title={translate({
        id: 'theme.NotFound.title',
        message: 'Page Not Found',
      })}
    >
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <main className={style.container}>
        <section>
          <Fitty tagName="h1" contentEditable>404</Fitty>
          <Fitty tagName="h2">
            Page Not Found
          </Fitty>
        </section>
        <p>
          We could not find what you were looking for.
        </p>
        <p>
          If you think this link should not be broken, please
          {' '}
          <Link href="https://github.com/apache/apisix-website/issues/new/choose" target="_blank" rel="noreferrer">submit an Issue</Link>
          .
        </p>
        <p>
          You can also open the
          {' '}
          <Link to="/">home page</Link>
          ,
          {' '}
          <Link to="/docs/">documentation</Link>
          ,
          {' '}
          <Link to="/blog/">blog</Link>
          , or
          {' '}
          <a
            role="button"
            href="#"
            onClick={() => {
              window?.history.back();
            }}
          >
            return to the source page
          </a>
          .
        </p>
      </main>
    </Layout>
  );
};

export default NotFound;
