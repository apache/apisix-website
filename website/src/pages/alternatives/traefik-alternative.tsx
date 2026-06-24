import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { traefikAlternative } from '../comparison/_components/extendedData';

export default function TraefikAlternativePage() {
  return <GatewayLandingPage data={traefikAlternative} />;
}
