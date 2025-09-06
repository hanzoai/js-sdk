// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'eu_assemblyai',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/eu.assemblyai/{endpoint}',
  operationId: 'assemblyai_proxy_route_eu_assemblyai__endpoint__patch',
};

export const tool: Tool = {
  name: 'update_eu_assemblyai',
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
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { endpoint, ...body } = args as any;
  return asTextContentResult((await client.euAssemblyai.update(endpoint)) as object);
};

export default { metadata, tool, handler };
