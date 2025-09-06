// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/user/info',
  operationId: 'user_info_user_info_get',
};

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
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.user.retrieveInfo(body)) as object);
};

export default { metadata, tool, handler };
