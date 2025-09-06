// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'health',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/health/readiness',
  operationId: 'health_readiness_health_readiness_get',
};

export const tool: Tool = {
  name: 'check_readiness_health',
  description: 'Unprotected endpoint for checking if worker can receive requests',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.health.checkReadiness()) as object);
};

export default { metadata, tool, handler };
