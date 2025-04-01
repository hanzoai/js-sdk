// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'retrieve_vertex_ai',
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

export const handler = (client: Hanzo, args: any) => {
  const { endpoint } = args;
  return client.vertexAI.retrieve(endpoint);
};

export default { tool, handler };
