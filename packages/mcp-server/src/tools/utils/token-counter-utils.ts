// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'utils',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'token_counter_utils',
  description: 'Token Counter',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
      messages: {
        type: 'array',
        title: 'Messages',
        items: {
          type: 'object',
        },
      },
      prompt: {
        type: 'string',
        title: 'Prompt',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.utils.tokenCounter(body);
};

export default { metadata, tool, handler };
