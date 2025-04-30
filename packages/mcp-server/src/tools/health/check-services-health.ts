// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'health',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'check_services_health',
  description:
    "Use this admin-only endpoint to check if the service is healthy.\n\nExample:\n```\ncurl -L -X GET 'http://0.0.0.0:4000/health/services?service=datadog'     -H 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      service: {
        anyOf: [
          {
            type: 'string',
            description: 'Specify the service being hit.',
            enum: [
              'slack_budget_alerts',
              'langfuse',
              'slack',
              'openmeter',
              'webhook',
              'email',
              'braintrust',
              'datadog',
            ],
          },
          {
            type: 'string',
          },
        ],
        title: 'Service',
        description: 'Specify the service being hit.',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.health.checkServices(body);
};

export default { metadata, tool, handler };
