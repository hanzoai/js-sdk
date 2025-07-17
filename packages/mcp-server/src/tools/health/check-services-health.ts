// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'health',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/health/services',
  operationId: 'health_services_endpoint_health_services_get',
};

export const tool: Tool = {
  name: 'check_services_health',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUse this admin-only endpoint to check if the service is healthy.\n\nExample:\n```\ncurl -L -X GET 'http://0.0.0.0:4000/health/services?service=datadog'     -H 'Authorization: Bearer sk-1234'\n```\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.health.checkServices(body)) as object);
};

export default { metadata, tool, handler };
