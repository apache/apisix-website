import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { openSourceComparison } from './_components/data';

export default function OpenSourceApiGatewayComparisonPage() {
  return <GatewayLandingPage data={openSourceComparison} />;
}
