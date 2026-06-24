import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsApigee } from './_components/extendedData';

export default function ApisixVsApigeePage() {
  return <GatewayLandingPage data={apisixVsApigee} />;
}
