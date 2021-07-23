import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import ProjectCard from "./ProjectCard";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

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

export default (props) => {
  const { siteConfig } = useDocusaurusContext();
  if (!(siteConfig.customFields.downloads || []).length) {
    return null;
  }
  const projects = siteConfig.customFields.downloads.map((project) => {
    return <ProjectCard key={project.name} {...project} />;
  });

  return (
    <Layout>
      <DownloadsPage>
        <PageTitle>Downloads</PageTitle>
        <PageSubtitle>We love open source.</PageSubtitle>
        {projects}
        <Description>
          <h2>History Versions</h2>
          <div className="markdown">
            Find all APISIX releases in the&nbsp;
            <a href="https://archive.apache.org/dist/apisix/" target="_blank">
              Archive repository
            </a>
            .
            <br />
            <a
              href="https://archive.apache.org/dist/incubator/apisix/"
              target="_blank"
            >
              Incubating Archive repository
            </a>
            &nbsp;hosts older releases when APISIX was an incubator project.
          </div>
          <h2>Verify the releases</h2>
          <div className="markdown">
            <a href="https://downloads.apache.org/apisix/KEYS" target="_blank">
              Get PGP signatures KEYS
            </a>
            <br />
            It is essential that you verify the integrity of the downloaded
            files using the PGP or SHA signatures. The PGP signatures can be
            verified using GPG or PGP. Please download the KEYS as well as the
            asc signature files for relevant distribution. It is recommended to
            get these files from the main distribution directory and not from
            the mirrors.
            <br />
            <StyledCodeBlock>{`gpg -i KEYS

# or
pgpk -a KEYS

# or
pgp -ka KEYS`}</StyledCodeBlock>
            <br />
            To verify the binaries/sources you can download the relevant asc
            files for it from main distribution directory and follow the below
            guide.
            <StyledCodeBlock>{`gpg --verify apache-apisix-********.asc apache-apisix-********

# or
pgpv apache-apisix-********.asc

# or
pgp apache-apisix-********.asc`}</StyledCodeBlock>
          </div>
        </Description>
      </DownloadsPage>
    </Layout>
  );
};
