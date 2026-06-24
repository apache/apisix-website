import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsWso2ApiManager } from './_components/extendedData';

export default function ApisixVsWso2ApiManagerPage() {
  return <GatewayLandingPage data={apisixVsWso2ApiManager} />;
}
