// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'budget',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/budget/info',
  operationId: 'info_budget_budget_info_post',
};

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
    required: ['budgets'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.budget.info(body)) as object);
};

export default { metadata, tool, handler };
