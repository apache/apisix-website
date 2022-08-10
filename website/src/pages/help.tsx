import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';
import Layout from '@theme/Layout';

import Translate, { translate } from '@docusaurus/Translate';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import ChevronRight from '../assets/icons/chevron-right.svg';
import '../css/help.scss';

const PageTitle = styled.h1`
  margin-top: 2rem;
  font-size: 3rem;
  font-weight: 800;
`;

const PageSubtitle = styled.div`
  margin-bottom: 3rem;
`;

const Page = styled.div`
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 2rem var(--ifm-spacing-horizontal);
  width: 100%;
`;

const Help: FC = () => (
  <Layout title={translate({ message: 'Help' })}>
    <Page className="help-page">
      <PageTitle><Translate id="help.website.title">NEED HELP?</Translate></PageTitle>
      <PageSubtitle>
        <Translate id="help.website.subtitle">This project is maintained by a dedicated group of people.</Translate>
      </PageSubtitle>
      <div className="row cards">
        <div className="card">
          <div className="header">
            <h2>
              <LazyLoadImage
                src="/img/documents.png"
                id="documents-icon"
                alt="documents icon"
              />
              <Translate id="help.website.docs.title">Browse Docs</Translate>
            </h2>
          </div>
          <p><Translate id="help.website.docs.tips">Learn more using the documentation on this site.</Translate></p>
          <div className="buttons">
            <a
              href="/docs/"
              target="_blank"
              rel="noreferrer"
            >
              <Translate id="help.website.link.docs">Read Documents</Translate>
              <ChevronRight />
            </a>
          </div>
        </div>
        <div className="card">
          <div className="header">
            <h2>
              <LazyLoadImage src="/img/community.png" alt="community icon" />
              <Translate id="help.website.community.title">Join Community</Translate>
            </h2>
          </div>
          <p><Translate id="help.website.community.tips">Ask questions about the documentation and project</Translate></p>
          <div className="buttons">
            <a href="https://github.com/apache/apisix/issues" target="_blank" rel="noreferrer">
              GitHub
              <ChevronRight />
            </a>
            <a
              href="/docs/general/join"
              target="_blank"
              rel="noreferrer"
            >
              Slack
              <ChevronRight />
            </a>
            <a href="https://twitter.com/ApacheAPISIX" target="_blank" rel="noreferrer">
              Twitter
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </Page>
  </Layout>
);

export default Help;
