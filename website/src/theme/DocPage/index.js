/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useCallback, useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import renderRoutes from "@docusaurus/renderRoutes";
import Layout from "@theme/Layout";
import DocSidebar from "@theme/DocSidebar";
import MDXComponents from "@theme/MDXComponents";
import NotFound from "@theme/NotFound";
import IconArrow from "@theme/IconArrow";
import { matchPath } from "@docusaurus/router";
import clsx from "clsx";
import styles from "./styles.module.css";
import { docVersionSearchTag } from "@docusaurus/theme-common";

function DocPageContent({ currentDocRoute, versionMetadata, children }) {
  const { siteConfig, isClient } = useDocusaurusContext();
  const {
    pluginId,
    permalinkToSidebar,
    docsSidebars,
    version,
  } = versionMetadata;

  const pageId = {
    general : "General",
    apisix : "getting-started",
    apisixDashboard : "dashboard",
    apisixIngressController : "what-is-apisix-ingress-controller",
    apisixHelmChart : "install",
    apisixDocker : "build-an-image-from-source"
  }
  useEffect(() => {
    if(docsSidebars[sidebarName][0].label === pageId.general){
      document.querySelectorAll(".navbar__link--active")[0].text = "General";
    } else if (document.getElementById(pageId.apisix)) {
      document.querySelectorAll(".navbar__link--active")[0].text = "Apache APISIX";
    } else if (document.getElementById(pageId.apisixDashboard)) {
      document.querySelectorAll(".navbar__link--active")[0].text = "Apache APISIX Dashboard";
    } else if (document.getElementById(pageId.apisixIngressController)) {
      document.querySelectorAll(".navbar__link--active")[0].text = "Apache APISIX Ingress Controller";
    } else if (document.getElementById(pageId.apisixHelmChart)) {
      document.querySelectorAll(".navbar__link--active")[0].text = "Apache APISIX™ Helm Chart";
    } else if (document.getElementById(pageId.apisixDocker)) {
      document.querySelectorAll(".navbar__link--active")[0].text = "Apache APISIX™ Docker";
    }
    return () => {
      console.log('\u{1F680} documentation changed')
    }
  }, []);

  const sidebarName = permalinkToSidebar[currentDocRoute.path];
  const sidebar = docsSidebars[sidebarName];
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    setHiddenSidebarContainer(!hiddenSidebarContainer);
  }, [hiddenSidebar]);
  return (
    <Layout
      key={isClient}
      searchMetadatas={{
        version,
        tag: docVersionSearchTag(pluginId, version),
      }}
    >
      <div className={styles.docPage}>
        {sidebar && (
          <div
            className={clsx(styles.docSidebarContainer, {
              [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
            })}
            onTransitionEnd={(e) => {
              if (
                !e.currentTarget.classList.contains(styles.docSidebarContainer)
              ) {
                return;
              }

              if (hiddenSidebarContainer) {
                setHiddenSidebar(true);
              }
            }}
            role="complementary"
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
              sidebarCollapsible={
                siteConfig.themeConfig?.sidebarCollapsible ?? true
              }
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
              docPluginId={pluginId}
            />

            {hiddenSidebar && (
              <div
                className={styles.collapsedDocSidebar}
                title="Expand sidebar"
                aria-label="Expand sidebar"
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}
              >
                <IconArrow aria-label="Expand sidebar" />
              </div>
            )}
          </div>
        )}
        <main className={styles.docMainContainer}>
          <div
            className={clsx(
              "container padding-vert--lg",
              styles.docItemWrapper,
              {
                [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
              }
            )}
          >
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
        </main>
      </div>
    </Layout>
  );
}

function DocPage(props) {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props;
  const currentDocRoute = docRoutes.find((docRoute) =>
    matchPath(location.pathname, docRoute)
  );

  if (!currentDocRoute) {
    return <NotFound {...props} />;
  }

  return (
    <DocPageContent
      currentDocRoute={currentDocRoute}
      versionMetadata={versionMetadata}
    >
      {renderRoutes(docRoutes)}
    </DocPageContent>
  );
}

export default DocPage;
