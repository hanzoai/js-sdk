// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization.info',
  operation: 'write',
  tags: [],
};

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

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.organization.info.deprecated(body);
};

export default { metadata, tool, handler };
