import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { nginxToApisixMigration } from '../comparison/_components/extendedData';

export default function NginxToApisixMigrationPage() {
  return <GatewayLandingPage data={nginxToApisixMigration} />;
}
