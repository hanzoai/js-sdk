// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'budget',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/budget/settings',
  operationId: 'budget_settings_budget_settings_get',
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
    required: ['budget_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.budget.settings(body)) as object);
};

export default { metadata, tool, handler };
