// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'langfuse',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/langfuse/{endpoint}',
  operationId: 'langfuse_proxy_route_langfuse__endpoint__patch',
};

export const tool: Tool = {
  name: 'retrieve_langfuse',
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

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { endpoint, ...body } = args as any;
  return client.langfuse.retrieve(endpoint);
};

export default { metadata, tool, handler };
