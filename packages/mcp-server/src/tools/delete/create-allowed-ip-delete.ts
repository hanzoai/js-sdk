// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.delete.createAllowedIP(body);
};

export default { tool, handler };
