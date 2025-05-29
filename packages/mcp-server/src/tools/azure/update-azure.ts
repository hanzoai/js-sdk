// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'azure',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/azure/{endpoint}',
  operationId: 'azure_proxy_route_azure__endpoint__patch',
};

export const tool: Tool = {
  name: 'update_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { endpoint, ...body } = args as any;
  return client.azure.update(endpoint);
};

export default { metadata, tool, handler };
