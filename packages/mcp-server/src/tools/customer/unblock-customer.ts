// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'customer',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/customer/unblock',
  operationId: 'unblock_user_customer_unblock_post',
};

export const tool: Tool = {
  name: 'unblock_customer',
  description:
    '[BETA] Unblock calls with this user id\n\nExample\n```\ncurl -X POST "http://0.0.0.0:8000/user/unblock"\n-H "Authorization: Bearer sk-1234"\n-d \'{\n"user_ids": [<user_id>, ...]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
    },
    required: ['user_ids'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.customer.unblock(body)) as object);
};

export default { metadata, tool, handler };
