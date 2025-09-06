// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization.info',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/organization/info',
  operationId: 'deprecated_info_organization_organization_info_post',
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
    required: ['organizations'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.organization.info.deprecated(body)) as object);
};

export default { metadata, tool, handler };
