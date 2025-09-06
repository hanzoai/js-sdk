// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'vertex_ai',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/vertex_ai/{endpoint}',
  operationId: 'vertex_proxy_route_vertex_ai__endpoint__patch',
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
    required: ['endpoint'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { endpoint, ...body } = args as any;
  return asTextContentResult((await client.vertexAI.create(endpoint)) as object);
};

export default { metadata, tool, handler };
