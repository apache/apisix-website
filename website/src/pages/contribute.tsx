import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import ContributeCard from '../components/ContributeCard';
import doc from '../../../config/docs';
import repoInfoList from '../../../config/repos-info.json';

const Page = styled.div`
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 2rem var(--ifm-spacing-horizontal);
  width: 100%;
`;

const PageTitle = styled.h1`
  margin-top: 2rem;
  font-size: 3rem;
  font-weight: 800;
`;

const PageTitleSpecial = styled.span`
  color: rgb(232, 67, 62);
`;

const PageDesc = styled.div`
  margin: 1.25rem auto;
`;

const Contribute: FC = () => {
  const repoList = doc.map((item) => item.githubRepo);

  const repos = repoList.map((repoName) => (
    <ContributeCard
      key={repoName}
      repoName={repoName}
      {...repoInfoList[repoName]}
    />
  ));

  return (
    <Layout>
      <Head>
        <title>
          Good first issue - Apache APISIX® - Cloud-Native API Gateway
        </title>

        <meta
          name="description"
          content="Help new partners to Apache APISIX Community and make first contribution."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Good first issue - Apache APISIX® - Cloud-Native API Gateway"
        />
        <meta
          property="og:site_name"
          content="Apache APISIX® -- Cloud-Native API Gateway"
        />
        <meta
          property="og:description"
          content="Help new partners to Apache APISIX Community and make first contribution."
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Good first issue - Apache APISIX® - Cloud-Native API Gateway"
        />
        <meta
          name="twitter:description"
          content="Help new partners to Apache APISIX Community and make first contribution."
        />
      </Head>
      <Page>
        <PageTitle>
          Good
          {' '}
          <PageTitleSpecial>first</PageTitleSpecial>
          {' '}
          issue
        </PageTitle>
        <PageDesc>
          Help new partners to Apache APISIX Community and make first
          contribution.
        </PageDesc>
        {repos}
      </Page>
    </Layout>
  );
};

export default Contribute;
