// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'openai',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/openai/{endpoint}',
  operationId: 'openai_proxy_route_openai__endpoint__patch',
};

export const tool: Tool = {
  name: 'create_openai',
  description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
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
  return client.openai.create(endpoint);
};

export default { metadata, tool, handler };
