import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apiGatewayComparison } from './_components/data';

export default function ApiGatewayComparisonPage() {
  return <GatewayLandingPage data={apiGatewayComparison} />;
}
