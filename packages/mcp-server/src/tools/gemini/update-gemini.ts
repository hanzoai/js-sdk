// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'gemini',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_gemini',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
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
  return client.gemini.update(endpoint);
};

export default { metadata, tool, handler };
