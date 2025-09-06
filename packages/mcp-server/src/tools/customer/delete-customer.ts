// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'customer',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/customer/delete',
  operationId: 'delete_end_user_customer_delete_post',
};

export const tool: Tool = {
  name: 'delete_customer',
  description:
    "Delete multiple end-users.\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to delete\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/delete'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{\n        \"user_ids\" :[\"z-jaff-5\"]\n}'\n\nSee below for all params \n```",
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
  return asTextContentResult((await client.customer.delete(body)) as object);
};

export default { metadata, tool, handler };
