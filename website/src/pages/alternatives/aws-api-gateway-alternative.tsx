import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { awsApiGatewayAlternative } from '../comparison/_components/extendedData';

export default function AwsApiGatewayAlternativePage() {
  return <GatewayLandingPage data={awsApiGatewayAlternative} />;
}
