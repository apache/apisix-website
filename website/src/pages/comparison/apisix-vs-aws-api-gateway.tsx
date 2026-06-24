import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsAwsApiGateway } from './_components/extendedData';

export default function ApisixVsAwsApiGatewayPage() {
  return <GatewayLandingPage data={apisixVsAwsApiGateway} />;
}
