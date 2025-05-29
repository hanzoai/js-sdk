// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assemblyai',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/assemblyai/{endpoint}',
  operationId: 'assemblyai_proxy_route_assemblyai__endpoint__patch',
};

export const tool: Tool = {
  name: 'update_assemblyai',
  description: 'Assemblyai Proxy Route',
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
  return client.assemblyai.update(endpoint);
};

export default { metadata, tool, handler };
