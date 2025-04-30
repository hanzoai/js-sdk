// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'openai',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_openai',
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
  return client.openai.update(endpoint);
};

export default { metadata, tool, handler };
