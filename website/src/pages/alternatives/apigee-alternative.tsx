import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { apigeeAlternative } from '../comparison/_components/extendedData';

export default function ApigeeAlternativePage() {
  return <GatewayLandingPage data={apigeeAlternative} />;
}
