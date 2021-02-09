const React = require("react");
import Layout from "@theme/Layout";

function Help(props) {
  const { config: siteConfig, language = "" } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
  const langPart = `${language ? `${language}/` : ""}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;
  return (
    <div className="container">
      <div className="row">
        <div className="post-header">
          <h1>Need help?</h1>
        </div>
      </div>
      <div className="row">
        This project is maintained by a dedicated group of people.
      </div>
      <div className="row">
        <div class="col col--4">
          <div className="header">
            <h3>Browse Docs</h3>
          </div>
          <p>
            Learn more using the{" "}
            <a href="https://github.com/apache/apisix/tree/master/doc">
              documentation on this site.
            </a>
          </p>
        </div>
        <div class="col col--4">
          <div className="header">
            <h3>Join the community</h3>
          </div>
          <p>Ask questions about the documentation and project</p>
        </div>
        <div class="col col--4">
          <div className="header">
            <h3>Stay up to date</h3>
          </div>
          <p>Find out what's new with this project</p>
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
