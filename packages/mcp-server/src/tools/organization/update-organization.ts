// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.organization.update(body);
};

export default { tool, handler };
