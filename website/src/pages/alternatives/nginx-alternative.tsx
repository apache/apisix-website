import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { nginxAlternative } from '../comparison/_components/extendedData';

export default function NginxAlternativePage() {
  return <GatewayLandingPage data={nginxAlternative} />;
}
