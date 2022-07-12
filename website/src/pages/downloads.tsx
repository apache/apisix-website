import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Translate, { translate } from '@docusaurus/Translate';
import type { DownloadInfo } from '../components/ProjectCard';
import ProjectCard from '../components/ProjectCard';

const DownloadsPage = styled.div`
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 2rem var(--ifm-spacing-horizontal);
  width: 100%;
`;

const PageTitle = styled.h1`
  margin-top: 2rem;
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const PageSubtitle = styled.div`
  margin-bottom: 4rem;
`;

const Description = styled.div`
  margin-top: 6rem;
  h2 {
    margin-top: 4rem;
    margin-bottom: 0.8rem;
  }
`;

const StyledCodeBlock = styled(CodeBlock)`
  margin-top: 1rem;
`;

const DownloadCards: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const downloads = siteConfig.customFields.downloads as DownloadInfo[] | null;

  if (!downloads?.length) {
    return null;
  }

  return (
    <>
      {downloads.map((project) => <ProjectCard key={project.name} {...project} />)}
    </>
  );
};

const Downloads: FC = () => (
  <Layout title={translate({ message: 'Downloads' })}>
    <DownloadsPage>
      <PageTitle><Translate id="download.website.title">Downloads</Translate></PageTitle>
      <PageSubtitle><Translate id="download.website.subtitle">We love open source.</Translate></PageSubtitle>
      <DownloadCards />
      <Description>
        <h2><Translate id="download.website.history.title">History Versions</Translate></h2>
        <div className="markdown">
          <Translate id="download.website.history.all">Find all APISIX releases in the&nbsp;</Translate>
          <a href="https://archive.apache.org/dist/apisix/" target="_blank" rel="noreferrer">
            <Translate id="download.website.link.archive">Archive repository</Translate>
          </a>
          <Translate id="common.punctuation.anEnd">.</Translate>
          <br />
          <a
            href="https://archive.apache.org/dist/incubator/apisix/"
            target="_blank"
            rel="noreferrer"
          >
            <Translate id="download.website.link.incubator">Incubating Archive repository</Translate>
          </a>
          <Translate id="download.website.history.incubator">
            &nbsp;hosts older releases when APISIX was an incubator project.
          </Translate>
        </div>
        <h2><Translate id="download.website.verify.title">Verify the releases</Translate></h2>
        <div className="markdown">
          <a href="https://downloads.apache.org/apisix/KEYS" target="_blank" rel="noreferrer">
            <Translate id="download.website.link.PGP_KEY">Get PGP signatures KEYS</Translate>
          </a>
          <br />
          <Translate id="download.website.verify.step1">
            It is essential that you verify the integrity of the downloaded
            files using the PGP or SHA signatures. The PGP signatures can be
            verified using GPG or PGP. Please download the KEYS as well as the
            asc signature files for relevant distribution. It is recommended to
            get these files from the main distribution directory and not from
            the mirrors.
          </Translate>
          <br />
          <StyledCodeBlock>
            {`gpg -i KEYS

# or
pgpk -a KEYS

# or
pgp -ka KEYS`}
          </StyledCodeBlock>
          <br />
          <Translate id="download.website.verify.step2">
            To verify the binaries/sources you can download the relevant asc
            files for it from main distribution directory and follow the below
            guide.
          </Translate>
          <StyledCodeBlock>
            {`gpg --verify apache-apisix-********.asc apache-apisix-********

# or
pgpv apache-apisix-********.asc

# or
pgp apache-apisix-********.asc`}
          </StyledCodeBlock>
        </div>
      </Description>
    </DownloadsPage>
  </Layout>
);

export default Downloads;
