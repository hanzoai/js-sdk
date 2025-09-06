// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/organization/member_delete',
  operationId: 'organization_member_delete_organization_member_delete_delete',
};

export const tool: Tool = {
  name: 'delete_member_organization',
  description: 'Delete a member from an organization',
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
    },
    required: ['organization_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.organization.deleteMember(body)) as object);
};

export default { metadata, tool, handler };
