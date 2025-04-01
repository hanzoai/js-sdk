// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'delete_budget',
  description: 'Delete budget\n\nParameters:\n- id: str - The budget id to delete',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.budget.delete(body);
};

export default { tool, handler };
