import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { kubernetesIngressControllerComparison } from './_components/extendedData';

export default function KubernetesIngressControllerComparisonPage() {
  return <GatewayLandingPage data={kubernetesIngressControllerComparison} />;
}
