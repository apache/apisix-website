import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { kongToApisixMigration } from '../comparison/_components/extendedData';

export default function KongToApisixMigrationPage() {
  return <GatewayLandingPage data={kongToApisixMigration} />;
}
