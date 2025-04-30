// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'vertex_ai',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_vertex_ai',
  description:
    'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
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
  return client.vertexAI.create(endpoint);
};

export default { metadata, tool, handler };
