// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate a member's role in an organization\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'LLM_OrganizationMembershipTable',\n  description: 'This is the table that track what organizations a user belongs to and users spend within the organization',\n  properties: {\n    created_at: {\n      type: 'string',\n      title: 'Created At',\n      format: 'date-time'\n    },\n    organization_id: {\n      type: 'string',\n      title: 'Organization Id'\n    },\n    updated_at: {\n      type: 'string',\n      title: 'Updated At',\n      format: 'date-time'\n    },\n    user_id: {\n      type: 'string',\n      title: 'User Id'\n    },\n    budget_id: {\n      type: 'string',\n      title: 'Budget Id'\n    },\n    llm_budget_table: {\n      type: 'object',\n      title: 'LLM_BudgetTable',\n      description: 'Represents user-controllable params for a LLM_BudgetTable record',\n      properties: {\n        budget_duration: {\n          type: 'string',\n          title: 'Budget Duration'\n        },\n        max_budget: {\n          type: 'number',\n          title: 'Max Budget'\n        },\n        max_parallel_requests: {\n          type: 'integer',\n          title: 'Max Parallel Requests'\n        },\n        model_max_budget: {\n          type: 'object',\n          title: 'Model Max Budget',\n          additionalProperties: true\n        },\n        rpm_limit: {\n          type: 'integer',\n          title: 'Rpm Limit'\n        },\n        soft_budget: {\n          type: 'number',\n          title: 'Soft Budget'\n        },\n        tpm_limit: {\n          type: 'integer',\n          title: 'Tpm Limit'\n        }\n      }\n    },\n    spend: {\n      type: 'number',\n      title: 'Spend'\n    },\n    user: {\n      type: 'object',\n      title: 'User',\n      additionalProperties: true\n    },\n    user_role: {\n      type: 'string',\n      title: 'User Role'\n    }\n  },\n  required: [    'created_at',\n    'organization_id',\n    'updated_at',\n    'user_id'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['organization_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.organization.updateMember(body)));
};

export default { metadata, tool, handler };
