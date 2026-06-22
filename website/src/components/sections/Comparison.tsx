import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';

import Cross from '../../assets/icons/cross.svg';
import Tick from '../../assets/icons/tick.svg';

import '../../css/landing-sections/comparison.scss';

interface Row {
  feature: JSX.Element;
  apisix: JSX.Element | string;
  other: JSX.Element | string;
}

const ROWS: Row[] = [
  {
    feature: <Translate id="comparison.row.throughput">Single-core throughput</Translate>,
    apisix: '18,000 QPS',
    other: '~1,700 QPS',
  },
  {
    feature: <Translate id="comparison.row.latency">Added latency</Translate>,
    apisix: '0.2 ms',
    other: '~2 ms',
  },
  {
    feature: <Translate id="comparison.row.ai">AI gateway / LLM proxy</Translate>,
    apisix: <Tick title="Supported" />,
    other: <Cross title="Not supported" />,
  },
  {
    feature: <Translate id="comparison.row.oss">Fully open-source, no paywalled features</Translate>,
    apisix: <Tick title="Supported" />,
    other: <Cross title="Not supported" />,
  },
  {
    feature: <Translate id="comparison.row.dynamic">Dynamic, real-time configuration</Translate>,
    apisix: <Tick title="Supported" />,
    other: <Cross title="Not supported" />,
  },
  {
    feature: <Translate id="comparison.row.hotreload">Hot plugin reload, no restart</Translate>,
    apisix: <Tick title="Supported" />,
    other: <Cross title="Not supported" />,
  },
];

const Comparison: FC = () => (
  <section className="compare">
    <h2 className="compare-head">
      <Translate id="comparison.component.title">Among the best, and always improving</Translate>
    </h2>
    <p className="compare-subtitle">
      <Translate id="comparison.component.subtitle">
        Apache APISIX is an open-source API gateway and AI gateway — here is how it compares on
        performance and core capabilities.
      </Translate>
    </p>
    <div className="compare-table-wrap">
      <table className="compare-table">
        <thead>
          <tr>
            <th className="compare-col-feature">
              <Translate id="comparison.col.feature">Feature</Translate>
            </th>
            <th className="compare-col-apisix">Apache APISIX</th>
            <th className="compare-col-other">
              <Translate id="comparison.col.other">Other gateways</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, index) => (
            <tr key={index}>
              <th scope="row" className="compare-col-feature">
                {row.feature}
              </th>
              <td className="compare-apisix-cell">{row.apisix}</td>
              <td className="compare-other-cell">{row.other}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default Comparison;
