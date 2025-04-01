// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'retrieve_info_user',
  description:
    "[10/07/2024]\nNote: To get all users (+pagination), use `/user/list` endpoint.\n\n\nUse this to get user information. (user row + all user key info)\n\nExample request\n```\ncurl -X GET 'http://localhost:4000/user/info?user_id=dev7%40hanzo.ai'     --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'User ID in the request parameters',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.user.retrieveInfo(body);
};

export default { tool, handler };
