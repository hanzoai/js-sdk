// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'add',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/add/allowed_ip',
  operationId: 'add_allowed_ip_add_allowed_ip_post',
};

export const tool: Tool = {
  name: 'add_allowed_ip_add',
  description: 'Add Allowed Ip',
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
  return asTextContentResult((await client.add.addAllowedIP(body)) as object);
};

export default { metadata, tool, handler };
