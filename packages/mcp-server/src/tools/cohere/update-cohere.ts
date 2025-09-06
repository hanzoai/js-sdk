// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'cohere',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/cohere/{endpoint}',
  operationId: 'cohere_proxy_route_cohere__endpoint__patch',
};

export const tool: Tool = {
  name: 'update_cohere',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
    required: ['endpoint'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { endpoint, ...body } = args as any;
  return asTextContentResult((await client.cohere.update(endpoint)) as object);
};

export default { metadata, tool, handler };
