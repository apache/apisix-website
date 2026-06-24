import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { graviteeAlternative } from '../comparison/_components/extendedData';

export default function GraviteeAlternativePage() {
  return <GatewayLandingPage data={graviteeAlternative} />;
}
