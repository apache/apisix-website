const React = require("react");
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

function Users() {
  const { siteConfig } = useDocusaurusContext();

  if ((siteConfig.customFields.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.customFields.users
    .filter((user) => user.pinned)
    .map((user) => (
      <a href={user.infoLink} key={user.infoLink}>
        <img
          className="logo"
          src={user.image}
          alt={user.caption}
          title={user.caption}
        />
      </a>
    ));

  return (
    <Layout>
      <div className="hero text--center">
        <div className="container">
          <div className="product-showcase-section">
            <h1>Who is Using This?</h1>
          </div>
          <p>This project is used by many folks</p>
          <div className="logos">{showcase}</div>
          {siteConfig.customFields.repoUrl && (
            <React.Fragment>
              <p>Are you using this project?</p>
              <Link
                to="https://github.com/apache/apisix/blob/master/doc/powered-by.md"
                className="button button--primary button--outline "
              >
                ADD YOUR COMPANY
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Users;
