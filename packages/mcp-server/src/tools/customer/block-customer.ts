// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'customer',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/customer/block',
  operationId: 'block_user_customer_block_post',
};

export const tool: Tool = {
  name: 'block_customer',
  description:
    '[BETA] Reject calls with this end-user id\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to block\n\n    (any /chat/completion call with this user={end-user-id} param, will be rejected.)\n\n    ```\n    curl -X POST "http://0.0.0.0:8000/user/block"\n    -H "Authorization: Bearer sk-1234"\n    -d \'{\n    "user_ids": [<user_id>, ...]\n    }\'\n    ```',
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
  return asTextContentResult((await client.customer.block(body)) as object);
};

export default { metadata, tool, handler };
