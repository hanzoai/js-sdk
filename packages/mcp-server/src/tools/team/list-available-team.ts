// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/team/available',
  operationId: 'list_available_teams_team_available_get',
};

export const tool: Tool = {
  name: 'list_available_team',
  description: 'List Available Teams',
  inputSchema: {
    type: 'object',
    properties: {
      response_model: {
        type: 'object',
        title: 'Response Model',
        additionalProperties: true,
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.team.listAvailable(body)) as object);
};

export default { metadata, tool, handler };
