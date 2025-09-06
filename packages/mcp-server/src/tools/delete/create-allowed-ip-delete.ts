// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'delete',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/delete/allowed_ip',
  operationId: 'delete_allowed_ip_delete_allowed_ip_post',
};

export const tool: Tool = {
  name: 'create_allowed_ip_delete',
  description: 'Delete Allowed Ip',
  inputSchema: {
    type: 'object',
    properties: {
      ip: {
        type: 'string',
        title: 'Ip',
      },
    },
    required: ['ip'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.delete.createAllowedIP(body)) as object);
};

export default { metadata, tool, handler };
