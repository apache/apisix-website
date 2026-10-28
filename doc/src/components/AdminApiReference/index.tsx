import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-extraneous-dependencies
import scalarTheme from '!!raw-loader!../../../../shared/admin-api-scalar.css';
import { versions as releaseVersions } from '../../../../config/apisix-versions';
import { mountAdminApi } from '../../../../shared/admin-api';
import '../../../../shared/admin-api-toolbar.css';
import './styles.css';

interface Props {
  path: string;
  children: React.ReactNode;
}

// The route owns the version, including during client-side version switching.
const AdminApiReference = ({ path, children }: Props): JSX.Element => {
  const root = useRef<HTMLDivElement>(null);
  const match = path.match(/^(\/zh)?\/docs\/apisix\/([^/]+)\/admin-api\/?$/);
  const prefix = match?.[1] ?? '';
  // Roll out the unreleased master contract first. Release archives remain on
  // Markdown until their branch-specific specifications are merged and wired.
  const supported = ['next'];
  const version = supported.includes(match?.[2]) ? match?.[2] : undefined;
  const zh = prefix === '/zh';
  const specUrl = `/assets/openapi/apisix/${version}/admin-api.json`;
  useEffect(() => {
    if (!version || !root.current) return undefined;
    // SSR leaves Markdown readable without JavaScript. Hide it only while the
    // reference is loading; every failure restores it through the shared code.
    const markdown = root.current.querySelector<HTMLElement>('[data-docs-content]');
    if (markdown) markdown.hidden = true;
    return mountAdminApi(root.current, scalarTheme, version);
  }, [path]);
  if (!version) return children as JSX.Element;
  const versions = [...releaseVersions].reverse().concat('next');
  const latest = releaseVersions[releaseVersions.length - 1];
  const versionLabel = (v: string) => {
    if (v !== 'next') return v;
    return zh ? '开发版 (next)' : 'Next (unreleased)';
  };
  return (
    <div ref={root} className="archived-admin-api">
      <section id="admin-api-openapi">
        <nav className="api-toolbar" aria-label={zh ? 'API 文档导航' : 'API reference navigation'}>
          <div className="api-location">
            <a className="api-back" href={`${prefix}/docs/apisix/${version}/getting-started/README/`}>{zh ? '文档' : 'Docs'}</a>
            <span className="api-separator" aria-hidden="true">/</span>
            <span className="api-page-name" aria-current="page">Admin API</span>
            <details className="api-version">
              <summary aria-label={zh ? `切换版本，当前 ${version}` : `Switch version, current ${version}`}>{version}</summary>
              <ul>
                {versions.map((v) => (
                  <li key={v}><a href={`${prefix}/docs/apisix/${v === latest ? '' : `${v}/`}admin-api/`} aria-current={v === version ? 'page' : undefined}>{versionLabel(v)}</a></li>
                ))}
              </ul>
            </details>
          </div>
          <a className="api-action api-download" href={specUrl} download="apisix-admin-api.json" aria-label={zh ? '下载 OpenAPI' : 'Download OpenAPI'}>
            <span aria-hidden="true">↓</span>
            <span className="api-action-label">{zh ? '下载 OpenAPI' : 'Download OpenAPI'}</span>
          </a>
        </nav>
        <p id="api-reference-loading" className="container" role="status">{zh ? '正在加载 API 参考…' : 'Loading API reference…'}</p>
        <div id="admin-api-reference" data-spec-url={specUrl} hidden />
      </section>
      <noscript><style>{'#admin-api-openapi { display: none; }'}</style></noscript>
      <div id="admin-api-markdown" data-docs-content>{children}</div>
    </div>
  );
};

export default AdminApiReference;
