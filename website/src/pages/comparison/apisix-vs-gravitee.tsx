import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsGravitee } from './_components/extendedData';

export default function ApisixVsGraviteePage() {
  return <GatewayLandingPage data={apisixVsGravitee} />;
}
