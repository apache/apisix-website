import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsKrakend } from './_components/extendedData';

export default function ApisixVsKrakendPage() {
  return <GatewayLandingPage data={apisixVsKrakend} />;
}
