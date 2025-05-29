// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'bedrock',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/bedrock/{endpoint}',
  operationId: 'bedrock_proxy_route_bedrock__endpoint__patch',
};

export const tool: Tool = {
  name: 'retrieve_bedrock',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
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
  return client.bedrock.retrieve(endpoint);
};

export default { metadata, tool, handler };
