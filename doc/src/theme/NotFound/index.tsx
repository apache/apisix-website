/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react';
import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import style from './styles.module.scss';
import Fitty from './Fitty';

const NotFound: FC = () => (
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

export default NotFound;
