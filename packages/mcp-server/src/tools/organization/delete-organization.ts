// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/organization/delete',
  operationId: 'delete_organization_organization_delete_delete',
};

export const tool: Tool = {
  name: 'delete_organization',
  description:
    'Delete an organization\n\n# Parameters:\n\n- organization_ids: List[str] - The organization ids to delete.',
  inputSchema: {
    type: 'object',
    properties: {
      organization_ids: {
        type: 'array',
        title: 'Organization Ids',
        items: {
          type: 'string',
        },
      },
    },
    required: ['organization_ids'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.organization.delete(body));
};

export default { metadata, tool, handler };
