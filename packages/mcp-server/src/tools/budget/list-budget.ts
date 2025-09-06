// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'budget',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/budget/list',
  operationId: 'list_budget_budget_list_get',
};

export const tool: Tool = {
  name: 'list_budget',
  description: 'List all the created budgets in proxy db. Used on Admin UI.',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.budget.list()) as object);
};

export default { metadata, tool, handler };
