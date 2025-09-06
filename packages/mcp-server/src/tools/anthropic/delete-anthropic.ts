// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'anthropic',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/anthropic/{endpoint}',
  operationId: 'anthropic_proxy_route_anthropic__endpoint__patch',
};

export const tool: Tool = {
  name: 'delete_anthropic',
  description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
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
  return asTextContentResult((await client.anthropic.delete(endpoint)) as object);
};

export default { metadata, tool, handler };
