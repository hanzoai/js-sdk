// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'customer',
  operation: 'write',
  tags: [],
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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.customer.unblock(body);
};

export default { metadata, tool, handler };
