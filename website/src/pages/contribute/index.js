import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";
import ContributeCard from "./ContributeCard";

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
  color:rgb(232, 67, 62);
`;

const PageDesc = styled.div`
  margin: 1.25rem auto;
`;

const Contribute = () => {
  const repoList = [{ repoName: 'apache/apisix' }, { repoName: 'apache/apisix-dashboard' }, { repoName: 'apache/apisix-website' }, { repoName: 'apache/apisix-ingress-controller' }]

  const repos = repoList.map((repo) => {
    return <ContributeCard key={repo.repoName} {...repo} />;
  });

  return (
    <Layout>
      <Page>
        <PageTitle>good <PageTitleSpecial>first</PageTitleSpecial> issue</PageTitle>
        <PageDesc>Help new partners to Apache APISIX Community and make first contribution.</PageDesc>
        {repos}
      </Page>
    </Layout>

  );
};

export default Contribute;