import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { tykToApisixMigration } from '../comparison/_components/extendedData';

export default function TykToApisixMigrationPage() {
  return <GatewayLandingPage data={tykToApisixMigration} />;
}
