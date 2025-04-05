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
  name: 'list_budget',
  description: 'List all the created budgets in proxy db. Used on Admin UI.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.budget.list();
};

export default { metadata, tool, handler };
