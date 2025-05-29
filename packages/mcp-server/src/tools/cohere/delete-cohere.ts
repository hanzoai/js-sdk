// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'cohere',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/cohere/{endpoint}',
  operationId: 'cohere_proxy_route_cohere__endpoint__patch',
};

export const tool: Tool = {
  name: 'delete_cohere',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
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
  return client.cohere.delete(endpoint);
};

export default { metadata, tool, handler };
