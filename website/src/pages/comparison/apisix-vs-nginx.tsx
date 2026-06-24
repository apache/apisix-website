import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsNginx } from './_components/extendedData';

export default function ApisixVsNginxPage() {
  return <GatewayLandingPage data={apisixVsNginx} />;
}
