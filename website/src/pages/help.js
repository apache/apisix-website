import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";
import ChevronRight from "../assets/icons/chevron-right.svg";

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

function Help(props) {
  const { config: siteConfig, language = "" } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
  const langPart = `${language ? `${language}/` : ""}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;
  return (
    <Page className="help-page">
      <PageTitle>NEED HELP?</PageTitle>
      <PageSubtitle>
        This project is maintained by a dedicated group of people.
      </PageSubtitle>
      <div className="row cards">
        <div className="card">
          <div className="header">
            <h2>
              <img
                src="/img/documents.png"
                id="documents-icon"
                alt="documents icon"
              />
              Browse Docs
            </h2>
          </div>
          <p>Learn more using the documentation on this site.</p>
          <div className="buttons">
            <a
              href="https://apisix.apache.org/docs/"
              target="_blank"
            >
              Read Documents
              <ChevronRight />
            </a>
          </div>
        </div>
        <div className="card">
          <div className="header">
            <h2>
              <img src="/img/community.png" alt="community icon" />
              Join Community
            </h2>
          </div>
          <p>Ask questions about the documentation and project</p>
          <div className="buttons">
            <a href="https://github.com/apache/apisix/issues" target="_blank">
              GitHub
              <ChevronRight />
            </a>
            <a
              href="https://join.slack.com/t/the-asf/shared_invite/zt-lcbw4olf-_5s17RLU0Cx8xTvj2bNbjg"
              target="_blank"
            >
              Slack
              <ChevronRight />
            </a>
            <a href="https://twitter.com/ApacheAPISIX" target="_blank">
              Twitter
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default (props) => (
  <Layout>
    <Help {...props} />
  </Layout>
);
