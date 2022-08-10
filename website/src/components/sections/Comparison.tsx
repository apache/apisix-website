import type { FC } from 'react';
import React from 'react';

import Translate from '@docusaurus/Translate';

import Cross from '../../assets/icons/cross.svg';
import Tick from '../../assets/icons/tick.svg';

import '../../css/landing-sections/comparison.scss';

const Comparison: FC = () => (
  <div className="compare">
    <div>
      <h3 className="compare-head">
        <Translate id="comparison.component.title">Among the best, and always improving</Translate>
      </h3>
    </div>
    <div className="compare-subtitle">
      <p>
        <Translate id="comparison.component.subtitle">
          Apache APISIX Gateway is open source and ever-evolving.
          Here&apos;s a general comparison of APISIX with other API Gateway options,
          choose your right API Gateway.
        </Translate>
      </p>
    </div>
    <div>
      <table className="table">
        <thead>
          <tr className="table-head">
            <th scope="col" style={{ fontWeight: '900' }}>Feature</th>
            <th scope="col" style={{ background: '#FF90A3' }}>
              APISIX
            </th>
            <th scope="col" style={{ background: '#EBEBEB' }}>
              Other API Gateways
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Single-core CPU, QPS (enable limit-count and prometheus plugins)</th>
            <td>18000</td>
            <td>~1700</td>
          </tr>
          <tr>
            <th scope="row">Latency</th>
            <td>0.2 ms</td>
            <td>2 ms</td>
          </tr>
          <tr>
            <th scope="row">Dubbo, MQTT, Tengine and REST API to gRPC transcoding</th>
            <td><Tick /></td>
            <td><Cross /></td>
          </tr>
          <tr>
            <th scope="row">Configuration rollback</th>
            <td><Tick /></td>
            <td><Cross /></td>
          </tr>
          <tr>
            <th scope="row">Custom Load Balancing and routing</th>
            <td><Tick /></td>
            <td><Cross /></td>
          </tr>
          <tr>
            <th scope="row">Plugin hot loading</th>
            <td><Tick /></td>
            <td><Cross /></td>
          </tr>
          <tr>
            <th scope="row">Dashboard</th>
            <td><Tick /></td>
            <td><Cross /></td>
          </tr>
          <tr>
            <th scope="row">Support any NGINX variable as routing condition</th>
            <td><Tick /></td>
            <td><Cross /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Comparison;
