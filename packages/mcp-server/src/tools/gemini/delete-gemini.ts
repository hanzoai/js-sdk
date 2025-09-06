// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'gemini',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/gemini/{endpoint}',
  operationId: 'gemini_proxy_route_gemini__endpoint__patch',
};

export const tool: Tool = {
  name: 'delete_gemini',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
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
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { endpoint, ...body } = args as any;
  return asTextContentResult((await client.gemini.delete(endpoint)) as object);
};

export default { metadata, tool, handler };
