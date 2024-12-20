'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function ApiDocs() {
  return <SwaggerUI url="/api/docs" />;
}

export default ApiDocs; 