import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { envoyAlternative } from '../comparison/_components/extendedData';

export default function EnvoyAlternativePage() {
  return <GatewayLandingPage data={envoyAlternative} />;
}
