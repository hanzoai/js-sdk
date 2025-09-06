// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'health',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/health',
  operationId: 'health_endpoint_health_get',
};

export const tool: Tool = {
  name: 'check_all_health',
  description:
    '🚨 USE `/health/liveliness` to health check the proxy 🚨\n\nSee more 👉 https://docs.hanzo.ai/docs/proxy/health\n\n\nCheck the health of all the endpoints in config.yaml\n\nTo run health checks in the background, add this to config.yaml:\n```\ngeneral_settings:\n    # ... other settings\n    background_health_checks: True\n```\nelse, the health checks will be run on models when /health is called.',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
        description: 'Specify the model name (optional)',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.health.checkAll(body)) as object);
};

export default { metadata, tool, handler };
