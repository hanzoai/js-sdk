// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'config.pass_through_endpoint',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/config/pass_through_endpoint/{endpoint_id}',
  operationId: 'update_pass_through_endpoints_config_pass_through_endpoint__endpoint_id__post',
};

export const tool: Tool = {
  name: 'update_config_pass_through_endpoint',
  description: 'Update a pass-through endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
    required: ['endpoint_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { endpoint_id, ...body } = args as any;
  return asTextContentResult((await client.config.passThroughEndpoint.update(endpoint_id)) as object);
};

export default { metadata, tool, handler };
