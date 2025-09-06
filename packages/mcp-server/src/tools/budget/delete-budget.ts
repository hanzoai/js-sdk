// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'budget',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/budget/delete',
  operationId: 'delete_budget_budget_delete_post',
};

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
    required: ['id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.budget.delete(body)) as object);
};

export default { metadata, tool, handler };
