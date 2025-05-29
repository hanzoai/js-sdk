// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/organization/member_update',
  operationId: 'organization_member_update_organization_member_update_patch',
};

export const tool: Tool = {
  name: 'update_member_organization',
  description: "Update a member's role in an organization",
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      max_budget_in_organization: {
        type: 'number',
        title: 'Max Budget In Organization',
      },
      role: {
        type: 'string',
        title: 'LLMUserRoles',
        description:
          'Admin Roles:\nPROXY_ADMIN: admin over the platform\nPROXY_ADMIN_VIEW_ONLY: can login, view all own keys, view all spend\nORG_ADMIN: admin over a specific organization, can create teams, users only within their organization\n\nInternal User Roles:\nINTERNAL_USER: can login, view/create/delete their own keys, view their spend\nINTERNAL_USER_VIEW_ONLY: can login, view their own keys, view their own spend\n\n\nTeam Roles:\nTEAM: used for JWT auth\n\n\nCustomer Roles:\nCUSTOMER: External users -> these are customers',
        enum: [
          'proxy_admin',
          'proxy_admin_viewer',
          'org_admin',
          'internal_user',
          'internal_user_viewer',
          'team',
          'customer',
        ],
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
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.organization.updateMember(body);
};

export default { metadata, tool, handler };
