/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react';
import React, {
  useState, useCallback, useEffect,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MDXProvider } from '@mdx-js/react';
import renderRoutes from '@docusaurus/renderRoutes';
import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs-types';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import type { DocumentRoute } from '@theme/DocItem';
import type { Props } from '@theme/DocPage';
import IconArrow from '@theme/IconArrow';
import BackToTopButton from '@theme-original/BackToTopButton';
import { matchPath } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeClassNames, docVersionSearchTag } from '@docusaurus/theme-common';
import Head from '@docusaurus/Head';
import type { ImageProps } from 'rc-image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from '@docusaurus/Link';
import NotFound from '../NotFound';

import styles from './styles.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

type DocPageContentProps = {
  readonly currentDocRoute: DocumentRoute;
  readonly versionMetadata: PropVersionMetadata;
  readonly children: ReactNode;
};

const navbarLinkMap = {
  general: 'General',
  apisix: 'Apache APISIX®',
  dashboard: 'Apache APISIX® Dashboard',
  'ingress-controller': 'Apache APISIX® Ingress Controller',
  'helm-chart': 'Apache APISIX® Helm Chart',
  docker: 'Apache APISIX® Docker',
  'java-plugin-runner': 'Apache APISIX® Java Plugin Runner',
  'go-plugin-runner': 'Apache APISIX® Go Plugin Runner',
  'python-plugin-runner': 'Apache APISIX® Python Plugin Runner',
};

const navbarLinkKeys = Object.keys(navbarLinkMap);

const components = (currentPage: string) => ({
  ...MDXComponents,
  a: (props) => {
    const { children, ...others } = props;
    const inCurrent = props.href?.includes(currentPage) || props.href?.startsWith('#');

    return (
      <Link {...others} {...{ target: inCurrent ? null : '_blank' }}>
        {children as any}
      </Link>
    );
  },
  img: (props: ImageProps) => (
    <LazyLoadImage
      effect="blur"
      placeholder={(
        <div>
          <noscript>
            <img alt="placeholder" {...(props as any)} />
          </noscript>
          <div
            style={{
              width: 500,
              height: 300,
              borderRadius: '1rem',
              backgroundColor: '#d2d2d7',
            }}
          />
        </div>
      )}
      {...(props as any)}
    />
  ),
});

const DocPageContent = ({
  currentDocRoute,
  versionMetadata,
  children,
}: DocPageContentProps): JSX.Element => {
  const { pluginId, version } = versionMetadata;
  const sidebarName = currentDocRoute.sidebar;
  const sidebar = sidebarName ? versionMetadata.docsSidebars[sidebarName] : undefined;

  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const pathArr = currentDocRoute.path.split('/').slice(2, 4);
  const currentPage = pathArr.reduce(
    (res, cur) => (navbarLinkKeys.includes(cur) ? cur : res),
    '',
  );

  useEffect(() => {
    const childrenCount = document.querySelector('.navbar__items--right').childElementCount;
    const el = document.querySelector('.navbar__items--right').childNodes[
      childrenCount - 2
    ] as HTMLDivElement;
    el.style.display = window.innerWidth > 745 ? 'block' : 'none';

    const navbarLink = document.querySelectorAll('.navbar__link')[0] as HTMLAnchorElement;
    navbarLink.innerText = navbarLinkMap[currentPage];

    return () => {
      el.style.display = 'none';
    };
  }, []);

  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer(!hiddenSidebarContainer);
  }, [hiddenSidebar]);

  return (
    <Layout
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}
      searchMetadatas={{
        version,
        tag: docVersionSearchTag(pluginId, version),
      }}
    >
      <div className={styles.docPage}>
        <BackToTopButton />

        {sidebar && (
          <aside
            className={clsx(styles.docSidebarContainer, {
              [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
            })}
            onTransitionEnd={(e) => {
              if (!e.currentTarget.classList.contains(styles.docSidebarContainer)) {
                return;
              }

              if (hiddenSidebarContainer) {
                setHiddenSidebar(true);
              }
            }}
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              docsPluginId={pluginId}
            />

            {hiddenSidebar && (
              <div
                className={styles.collapsedDocSidebar}
                title={translate({
                  id: 'theme.docs.sidebar.expandButtonTitle',
                  message: 'Expand sidebar',
                  description:
                    'The ARIA label and title attribute for expand button of doc sidebar',
                })}
                aria-label={translate({
                  id: 'theme.docs.sidebar.expandButtonAriaLabel',
                  message: 'Expand sidebar',
                  description:
                    'The ARIA label and title attribute for expand button of doc sidebar',
                })}
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}
              >
                <IconArrow className={styles.expandSidebarButtonIcon} />
              </div>
            )}
          </aside>
        )}
        <main
          className={clsx(styles.docMainContainer, {
            [styles.docMainContainerEnhanced]: hiddenSidebarContainer || !sidebar,
          })}
        >
          <div
            className={clsx('container padding-top--md padding-bottom--lg', styles.docItemWrapper, {
              [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
            })}
          >
            <MDXProvider components={() => components(currentPage)}>
              {children}
            </MDXProvider>
          </div>
        </main>
      </div>
    </Layout>
  );
};

const DocPage = (props: Props): JSX.Element => {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props;
  const currentDocRoute = docRoutes.find((docRoute) => matchPath(location.pathname, docRoute));
  if (!currentDocRoute) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <NotFound {...props} />;
  }
  return (
    <>
      <Head>
        {/* TODO we should add a core addRoute({htmlClassName}) generic plugin option */}
        {/* eslint-disable-next-line jsx-a11y/html-has-lang */}
        <html className={versionMetadata.className} />
      </Head>
      <DocPageContent currentDocRoute={currentDocRoute} versionMetadata={versionMetadata}>
        {renderRoutes(docRoutes, { versionMetadata })}
      </DocPageContent>
    </>
  );
};

export default DocPage;
