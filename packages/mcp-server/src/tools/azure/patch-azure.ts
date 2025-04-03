// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'azure',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'patch_azure',
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

export const handler = (client: Hanzo, args: any) => {
  const { endpoint } = args;
  return client.azure.patch(endpoint);
};

export default { metadata, tool, handler };
