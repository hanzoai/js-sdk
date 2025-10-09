// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/organization/update',
  operationId: 'update_organization_organization_update_patch',
};

export const tool: Tool = {
  name: 'update_organization',
  description: 'Update an organization',
  inputSchema: {
    type: 'object',
    properties: {
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
        additionalProperties: true,
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'string',
        },
      },
      organization_alias: {
        type: 'string',
        title: 'Organization Alias',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      updated_by: {
        type: 'string',
        title: 'Updated By',
      },
    },
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.organization.update(body));
};

export default { metadata, tool, handler };
