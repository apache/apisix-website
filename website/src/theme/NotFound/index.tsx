/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react';
import React from 'react';
import Layout from '@theme/Layout';
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
        You can also return to
        {' '}
        <Link href="/">
          the home page
        </Link>
        . Or, return to
        {' '}
        <a
          role="button"
          href="#"
          onClick={() => {
            window?.history.back();
          }}
        >
          the source page
        </a>
        .
      </p>
    </main>
  </Layout>
);

export default NotFound;
