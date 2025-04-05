// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'langfuse',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
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
  return client.langfuse.delete(endpoint);
};

export default { metadata, tool, handler };
