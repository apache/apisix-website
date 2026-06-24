import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsTraefik } from './_components/extendedData';

export default function ApisixVsTraefikPage() {
  return <GatewayLandingPage data={apisixVsTraefik} />;
}
