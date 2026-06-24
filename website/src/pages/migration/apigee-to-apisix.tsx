import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { apigeeToApisixMigration } from '../comparison/_components/extendedData';

export default function ApigeeToApisixMigrationPage() {
  return <GatewayLandingPage data={apigeeToApisixMigration} />;
}
