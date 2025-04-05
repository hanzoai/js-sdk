// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'budget',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'settings_budget',
  description:
    'Get list of configurable params + current value for a budget item + description of each field\n\nUsed on Admin UI.\n\nQuery Parameters:\n- budget_id: str - The budget id to get information for',
  inputSchema: {
    type: 'object',
    properties: {
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.budget.settings(body);
};

export default { metadata, tool, handler };
