// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'model',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/model/delete',
  operationId: 'delete_model_model_delete_post',
};

export const tool: Tool = {
  name: 'delete_model',
  description: 'Allows deleting models in the model list in the config.yaml',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Id',
      },
    },
    required: ['id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.model.delete(body)) as object);
};

export default { metadata, tool, handler };
