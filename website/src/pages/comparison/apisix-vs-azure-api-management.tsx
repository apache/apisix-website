import React from 'react';

import GatewayLandingPage from './_components/GatewayLandingPage';
import { apisixVsAzureApiManagement } from './_components/extendedData';

export default function ApisixVsAzureApiManagementPage() {
  return <GatewayLandingPage data={apisixVsAzureApiManagement} />;
}
