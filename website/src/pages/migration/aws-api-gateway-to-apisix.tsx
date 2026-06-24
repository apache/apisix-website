import React from 'react';

import GatewayLandingPage from '../comparison/_components/GatewayLandingPage';
import { awsApiGatewayToApisixMigration } from '../comparison/_components/extendedData';

export default function AwsApiGatewayToApisixMigrationPage() {
  return <GatewayLandingPage data={awsApiGatewayToApisixMigration} />;
}
