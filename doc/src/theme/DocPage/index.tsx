/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  ReactElement, ReactNode, TableHTMLAttributes,
} from 'react';
import React, {
  useState, useCallback, useEffect, useRef,
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

type AttributeColumnKind =
  | 'name'
  | 'type'
  | 'required'
  | 'encrypted'
  | 'default'
  | 'valid-values'
  | 'description';

const attributeColumnPatterns: ReadonlyArray<{
  kind: AttributeColumnKind;
  pattern: RegExp;
}> = [
  { kind: 'name', pattern: /^(name|field|名称|字段|参数名|属性名称)$/i },
  { kind: 'type', pattern: /^(type|类型)$/i },
  {
    kind: 'required',
    pattern: /^(required|requirement|必选项|要求|是否必需|必需|必填)$/i,
  },
  { kind: 'encrypted', pattern: /^(encrypted|加密)$/i },
  { kind: 'default', pattern: /^(default|default value|默认值|默认)$/i },
  {
    kind: 'valid-values',
    pattern: /^(valid|valid values?|有效值|有效)$/i,
  },
  { kind: 'description', pattern: /^(description|描述)$/i },
];

const fieldTypePattern = /^(?:array|boolean|integer|null|number|object|string)(?:\s*[/|]\s*(?:array|boolean|integer|null|number|object|string))*$/i;

type ElementWithChildren = ReactElement<{
  children?: ReactNode;
  className?: string;
  mdxType?: string;
  originalType?: string;
}>;

const elementType = (element: ElementWithChildren): string | undefined => (
  typeof element.type === 'string'
    ? element.type
    : element.props.mdxType ?? element.props.originalType
);

const elementChildren = (children: ReactNode): ElementWithChildren[] => (
  React.Children.toArray(children).filter(
    (child): child is ElementWithChildren => React.isValidElement(child),
  )
);

const findElement = (children: ReactNode, type: string): ElementWithChildren | undefined => {
  const directMatch = elementChildren(children).find((child) => elementType(child) === type);
  if (directMatch) return directMatch;

  return elementChildren(children)
    .map((child) => findElement(child.props.children, type))
    .find(Boolean);
};

const reactTextContent = (children: ReactNode): string => (
  React.Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (React.isValidElement<{ children?: ReactNode }>(child)) {
      return reactTextContent(child.props.children);
    }
    return '';
  }).join('')
);

const attributeColumnKind = (header: string): AttributeColumnKind | null => (
  attributeColumnPatterns.find(({ pattern }) => pattern.test(header))?.kind ?? null
);

const hasFieldTypeValues = (children: ReactNode): boolean => {
  const body = findElement(children, 'tbody');
  const rows = elementChildren(body?.props.children)
    .filter((row) => elementType(row) === 'tr');
  const typeValues = rows.map((row) => {
    const cells = elementChildren(row.props.children)
      .filter((cell) => elementType(cell) === 'th' || elementType(cell) === 'td');
    return reactTextContent(cells[1]?.props.children)
      .trim()
      .replace(/[\s\u00a0]+/g, ' ');
  });

  return rows.length > 0
    && typeValues.every((value) => fieldTypePattern.test(value));
};

// Header semantics are deliberate: request, metadata, and other field-schema
// tables need the same readable widths even outside an "Attributes" section.
const attributeColumns = (children: ReactNode): AttributeColumnKind[] | null => {
  const head = findElement(children, 'thead');
  const row = findElement(head?.props.children, 'tr');
  const headers = elementChildren(row?.props.children)
    .filter((cell) => elementType(cell) === 'th')
    .map((cell) => reactTextContent(cell.props.children).trim().replace(/[\s\u00a0]+/g, ' '));
  const columns = headers.map(attributeColumnKind);

  if (
    columns.length < 3
    || columns.length > 7
    || columns.some((column) => column === null)
  ) return null;

  const semanticColumns = columns as AttributeColumnKind[];
  const uniqueColumns = new Set(semanticColumns);

  // Name | Type | Description is also used by metric catalogs. Only promote
  // the ambiguous three-column form when its body contains field data types.
  if (
    semanticColumns[0] !== 'name'
    || semanticColumns[semanticColumns.length - 1] !== 'description'
    || uniqueColumns.size !== semanticColumns.length
    || (!uniqueColumns.has('type') && !uniqueColumns.has('required'))
    || (
      semanticColumns.length === 3
      && semanticColumns[1] === 'type'
      && !hasFieldTypeValues(children)
    )
  ) return null;

  return semanticColumns;
};

const decorateRowCells = (
  children: ReactNode,
  columns: AttributeColumnKind[],
): ReactNode => {
  let cellIndex = 0;

  return React.Children.map(children, (child) => {
    if (!React.isValidElement<{ className?: string }>(child)) return child;
    if (elementType(child) !== 'th' && elementType(child) !== 'td') return child;

    const column = columns[cellIndex];
    cellIndex += 1;
    if (!column) return child;

    return React.cloneElement(child, {
      className: clsx(child.props.className, `docs-table__col--${column}`),
    });
  });
};

const decorateTableRows = (
  children: ReactNode,
  columns: AttributeColumnKind[],
): ReactNode => React.Children.map(children, (child) => {
  if (!React.isValidElement<{ children?: ReactNode }>(child)) return child;

  if (elementType(child) === 'tr') {
    return React.cloneElement(child, {
      children: decorateRowCells(child.props.children, columns),
    });
  }

  if (child.props.children === undefined) return child;

  return React.cloneElement(child, {
    children: decorateTableRows(child.props.children, columns),
  });
});

const tableLabel = (frame: HTMLElement): string => {
  const markdown = frame.closest('.markdown');
  if (!markdown) return 'Documentation table';

  let label = 'Documentation table';
  markdown.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    if (
      !heading.closest('.admonition')
      && heading.compareDocumentPosition(frame) === Node.DOCUMENT_POSITION_FOLLOWING
    ) {
      label = heading.textContent?.trim() || label;
    }
  });
  return label;
};

const DocsTable = ({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableElement>): JSX.Element => {
  // Classify from React children so the SSR HTML has stable semantic widths
  // before hydration, including when JavaScript is unavailable.
  const columns = attributeColumns(children);
  const attributes = columns !== null;
  const tableChildren = columns ? decorateTableRows(children, columns) : children;
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [state, setState] = useState<{
    overflow: boolean | null;
    atStart: boolean;
    atEnd: boolean;
    label: string;
  }>({
    overflow: null,
    atStart: true,
    atEnd: false,
    label: 'Documentation table',
  });

  useEffect(() => {
    const frame = frameRef.current;
    const scroller = scrollerRef.current;
    const table = tableRef.current;
    if (!frame || !scroller || !table) return undefined;

    const update = () => {
      const next = {
        overflow: scroller.scrollWidth > scroller.clientWidth + 1,
        atStart: scroller.scrollLeft <= 1,
        atEnd: scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1,
        label: tableLabel(frame),
      };
      setState((current) => (
        current.overflow === next.overflow
        && current.atStart === next.atStart
        && current.atEnd === next.atEnd
        && current.label === next.label
          ? current
          : next
      ));
    };

    scroller.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    observer.observe(table);
    update();

    return () => {
      scroller.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={clsx('table-shell', {
        'table-shell--attributes': attributes,
      })}
      data-overflow={state.overflow ?? 'unknown'}
      data-at-start={state.atStart}
      data-at-end={state.atEnd}
    >
      <div
        ref={scrollerRef}
        className="table-scroll"
        role={state.overflow === false ? undefined : 'region'}
        aria-label={state.overflow === false ? undefined : state.label}
        // A focusable region is the keyboard fallback for native horizontal scrolling.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={state.overflow === false ? -1 : 0}
      >
        <table
          {...props}
          ref={tableRef}
          className={clsx('docs-table', {
            'docs-table--attributes': attributes,
          }, className)}
        >
          {tableChildren}
        </table>
      </div>
    </div>
  );
};

const components = (currentPage: string) => ({
  ...MDXComponents,
  table: DocsTable,
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
              maxWidth: '100%',
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
    const navbarLink = document.querySelectorAll('.navbar__link')[0] as HTMLAnchorElement;
    navbarLink.innerText = navbarLinkMap[currentPage];
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
