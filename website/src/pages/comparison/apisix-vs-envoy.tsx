import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsEnvoy } from './_components/extendedData';

export default function ApisixVsEnvoyPage() {
  return <GatewayLandingPage data={apisixVsEnvoy} />;
}
