// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'retrieve_info_customer',
  description:
    "Get information about an end-user. An `end_user` is a customer (external user) of the proxy.\n\nParameters:\n- end_user_id (str, required): The unique identifier for the end-user\n\nExample curl:\n```\ncurl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4'         -H 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      end_user_id: {
        type: 'string',
        title: 'End User Id',
        description: 'End User ID in the request parameters',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.customer.retrieveInfo(body);
};

export default { tool, handler };
