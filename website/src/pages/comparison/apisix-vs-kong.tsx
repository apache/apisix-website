import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsKong } from './_components/data';

export default function ApisixVsKongPage() {
  return <GatewayLandingPage data={apisixVsKong} />;
}
