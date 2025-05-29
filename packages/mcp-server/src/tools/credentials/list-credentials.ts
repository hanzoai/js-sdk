// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.credentials.list();
};

export default { metadata, tool, handler };
