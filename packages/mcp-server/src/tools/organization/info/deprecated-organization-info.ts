// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'deprecated_organization_info',
  description: 'DEPRECATED: Use GET /organization/info instead',
  inputSchema: {
    type: 'object',
    properties: {
      organizations: {
        type: 'array',
        title: 'Organizations',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.organization.info.deprecated(body);
};

export default { tool, handler };
