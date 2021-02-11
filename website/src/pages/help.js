const React = require("react");
import Layout from "@theme/Layout";
import ChevronRight from "../assets/icons/chevron-right.svg";

function Help(props) {
  const { config: siteConfig, language = "" } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
  const langPart = `${language ? `${language}/` : ""}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;
  return (
    <div className="container help-page">
      <div className="row">
        <div className="post-header">
          <h1>Need help?</h1>
        </div>
      </div>
      <div className="row">
        This project is maintained by a dedicated group of people.
      </div>
      <div className="row cards">
        <div class="card">
          <div className="header">
            <h2>
              <img src="/img/documents.png" id="documents-icon" />
              Browse Docs
            </h2>
          </div>
          <p>Learn more using the documentation on this site.</p>
          <div className="buttons">
            <a
              href="https://github.com/apache/apisix/tree/master/doc"
              target="_blank"
            >
              Read Documents <ChevronRight />
            </a>
          </div>
        </div>
        <div class="card">
          <div className="header">
            <h2>
              <img src="/img/community.png" />
              Join the community
            </h2>
          </div>
          <p>Ask questions about the documentation and project</p>
          <div className="buttons">
            <a href="https://github.com/apache/apisix/issues" target="_blank">
              GitHub <ChevronRight />
            </a>
            <a
              href="https://join.slack.com/t/the-asf/shared_invite/zt-lcbw4olf-_5s17RLU0Cx8xTvj2bNbjg"
              target="_blank"
            >
              Slack <ChevronRight />
            </a>
            <a href="https://twitter.com/ApacheAPISIX" target="_blank">
              Twitter <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default (props) => (
  <Layout>
    <Help {...props} />
  </Layout>
);
