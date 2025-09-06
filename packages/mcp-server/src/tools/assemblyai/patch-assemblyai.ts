// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assemblyai',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/assemblyai/{endpoint}',
  operationId: 'assemblyai_proxy_route_assemblyai__endpoint__patch',
};

export const tool: Tool = {
  name: 'patch_assemblyai',
  description: 'Assemblyai Proxy Route',
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
  return asTextContentResult((await client.assemblyai.patch(endpoint)) as object);
};

export default { metadata, tool, handler };
