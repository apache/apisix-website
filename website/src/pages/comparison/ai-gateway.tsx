import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { aiGatewayComparison } from './_components/extendedData';

export default function AiGatewayComparisonPage() {
  return <GatewayLandingPage data={aiGatewayComparison} />;
}
