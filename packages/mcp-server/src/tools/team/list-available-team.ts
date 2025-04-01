// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'list_available_team',
  description: 'List Available Teams',
  inputSchema: {
    type: 'object',
    properties: {
      response_model: {
        type: 'object',
        title: 'Response Model',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.team.listAvailable(body);
};

export default { tool, handler };
