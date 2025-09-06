// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'credentials',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/credentials',
  operationId: 'get_credentials_credentials_get',
};

export const tool: Tool = {
  name: 'list_credentials',
  description: '[BETA] endpoint. This might change unexpectedly.',
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
  return asTextContentResult((await client.credentials.list()) as object);
};

export default { metadata, tool, handler };
