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
  name: 'patch_openai',
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

export const handler = (client: Hanzo, args: any) => {
  const { endpoint } = args;
  return client.openai.patch(endpoint);
};

export default { metadata, tool, handler };
