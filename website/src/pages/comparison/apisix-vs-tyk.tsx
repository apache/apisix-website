import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsTyk } from './_components/data';

export default function ApisixVsTykPage() {
  return <GatewayLandingPage data={apisixVsTyk} />;
}
