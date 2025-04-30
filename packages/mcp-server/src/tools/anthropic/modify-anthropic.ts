// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'anthropic',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'modify_anthropic',
  description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
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
  return client.anthropic.modify(endpoint);
};

export default { metadata, tool, handler };
