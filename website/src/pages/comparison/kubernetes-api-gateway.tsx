import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { kubernetesApiGatewayComparison } from './_components/extendedData';

export default function KubernetesApiGatewayComparisonPage() {
  return <GatewayLandingPage data={kubernetesApiGatewayComparison} />;
}
