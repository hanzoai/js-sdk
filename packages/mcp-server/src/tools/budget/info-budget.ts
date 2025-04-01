// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'info_budget',
  description:
    'Get the budget id specific information\n\nParameters:\n- budgets: List[str] - The list of budget ids to get information for',
  inputSchema: {
    type: 'object',
    properties: {
      budgets: {
        type: 'array',
        title: 'Budgets',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.budget.info(body);
};

export default { tool, handler };
