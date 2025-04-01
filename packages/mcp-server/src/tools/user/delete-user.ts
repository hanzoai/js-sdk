// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'delete_user',
  description:
    "delete user and associated user keys\n\n```\ncurl --location 'http://0.0.0.0:4000/user/delete' \n--header 'Authorization: Bearer sk-1234' \n--header 'Content-Type: application/json' \n--data-raw '{\n    \"user_ids\": [\"45e3e396-ee08-4a61-a88e-16b3ce7e0849\"]\n}'\n```\n\nParameters:\n- user_ids: List[str] - The list of user id's to be deleted.",
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
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.user.delete(body);
};

export default { tool, handler };
