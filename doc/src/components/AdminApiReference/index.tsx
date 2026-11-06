import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-extraneous-dependencies
import scalarTheme from '!!raw-loader!../../../../shared/admin-api-scalar.css';
import { versions as releaseVersions } from '../../../../config/apisix-versions';
import { mountApiReference } from '../../../../shared/admin-api';
import '../../../../shared/admin-api-toolbar.css';
import './styles.css';

interface Props {
  path: string;
  children: React.ReactNode;
}

// The route owns the version, including during client-side version switching.
const ApiReference = ({ path, children }: Props): JSX.Element => {
  const root = useRef<HTMLDivElement>(null);
  const match = path.match(/^(\/zh)?\/docs\/apisix\/([^/]+)\/(admin-api|control-api)\/?$/);
  const prefix = match?.[1] ?? '';
  // Enable only versions with merged, branch-specific API contracts.
  // Other archives keep their existing Markdown reference.
  const supported = ['3.16', '3.17', '3.18', 'next'];
  const version = supported.includes(match?.[2]) ? match?.[2] : undefined;
  const apiId = match?.[3];
  const zh = prefix === '/zh';
  const pageName = apiId === 'admin-api' ? 'Admin API' : 'Control API';
  const specUrl = `/assets/openapi/apisix/${version}/${apiId}.json`;
  useEffect(() => {
    if (!version || !apiId || !root.current) return undefined;
    // SSR leaves Markdown readable without JavaScript. Hide it immediately
    // when the client starts so the full reference does not flash before the
    // loading shell. Every failure restores it through the shared renderer.
    const markdown = root.current.querySelector<HTMLElement>('[data-docs-content]');
    if (markdown) markdown.hidden = true;
    return mountApiReference(root.current, scalarTheme, version);
  }, [path]);
  if (!version || !apiId) return children as JSX.Element;
  const versions = [...releaseVersions].reverse().concat('next');
  const latest = releaseVersions[releaseVersions.length - 1];
  const versionLabel = (v: string) => {
    if (v !== 'next') return v;
    return zh ? '开发版 (next)' : 'Next (unreleased)';
  };
  return (
    <div ref={root} className="archived-api-reference">
      <section id="api-reference-openapi">
        <nav className="api-toolbar" aria-label={zh ? 'API 文档导航' : 'API reference navigation'}>
          <div className="api-location">
            <a className="api-back" href={`${prefix}/docs/apisix/${version}/getting-started/README/`}>{zh ? '文档' : 'Docs'}</a>
            <span className="api-separator" aria-hidden="true">/</span>
            <span className="api-page-name" aria-current="page">{pageName}</span>
            <details className="api-version">
              <summary aria-label={zh ? `切换版本，当前 ${version}` : `Switch version, current ${version}`}>{version}</summary>
              <ul>
                {versions.map((v) => (
                  <li key={v}><a href={`${prefix}/docs/apisix/${v === latest ? '' : `${v}/`}${apiId}/`} aria-current={v === version ? 'page' : undefined}>{versionLabel(v)}</a></li>
                ))}
              </ul>
            </details>
          </div>
          <a className="api-action api-download" href={specUrl} download={`apisix-${apiId}.json`} aria-label={zh ? '下载 OpenAPI' : 'Download OpenAPI'}>
            <span aria-hidden="true">↓</span>
            <span className="api-action-label">{zh ? '下载 OpenAPI' : 'Download OpenAPI'}</span>
          </a>
        </nav>
        <p id="api-reference-loading" className="container" role="status">{zh ? '正在加载 API 参考…' : 'Loading API reference…'}</p>
        <div id="api-reference-container" data-api-id={apiId} data-spec-url={specUrl} hidden />
      </section>
      <noscript><style>{'#api-reference-openapi { display: none; }'}</style></noscript>
      <div id="api-reference-markdown" data-docs-content>{children}</div>
    </div>
  );
};

export default ApiReference;
