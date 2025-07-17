// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/organization/member_add',
  operationId: 'organization_member_add_organization_member_add_post',
};

export const tool: Tool = {
  name: 'add_member_organization',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n[BETA]\n\nAdd new members (either via user_email or user_id) to an organization\n\nIf user doesn't exist, new user row will also be added to User Table\n\nOnly proxy_admin or org_admin of organization, allowed to access this endpoint.\n\n# Parameters:\n\n- organization_id: str (required)\n- member: Union[List[Member], Member] (required)\n    - role: Literal[LLMUserRoles] (required)\n    - user_id: Optional[str]\n    - user_email: Optional[str]\n\nNote: Either user_id or user_email must be provided for each member.\n\nExample:\n```\ncurl -X POST 'http://0.0.0.0:4000/organization/member_add'     -H 'Authorization: Bearer sk-1234'     -H 'Content-Type: application/json'     -d '{\n    \"organization_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"member\": {\n        \"role\": \"internal_user\",\n        \"user_id\": \"dev247652@hanzo.ai\"\n    },\n    \"max_budget_in_organization\": 100.0\n}'\n```\n\nThe following is executed in this function:\n\n1. Check if organization exists\n2. Creates a new Internal User if the user_id or user_email is not found in LLM_UserTable\n3. Add Internal User to the `LLM_OrganizationMembership` table\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'OrganizationAddMemberResponse',\n  properties: {\n    organization_id: {\n      type: 'string',\n      title: 'Organization Id'\n    },\n    updated_organization_memberships: {\n      type: 'array',\n      title: 'Updated Organization Memberships',\n      items: {\n        type: 'object',\n        title: 'LLM_OrganizationMembershipTable',\n        description: 'This is the table that track what organizations a user belongs to and users spend within the organization',\n        properties: {\n          created_at: {\n            type: 'string',\n            title: 'Created At',\n            format: 'date-time'\n          },\n          organization_id: {\n            type: 'string',\n            title: 'Organization Id'\n          },\n          updated_at: {\n            type: 'string',\n            title: 'Updated At',\n            format: 'date-time'\n          },\n          user_id: {\n            type: 'string',\n            title: 'User Id'\n          },\n          budget_id: {\n            type: 'string',\n            title: 'Budget Id'\n          },\n          llm_budget_table: {\n            type: 'object',\n            title: 'LLM_BudgetTable',\n            description: 'Represents user-controllable params for a LLM_BudgetTable record',\n            properties: {\n              budget_duration: {\n                type: 'string',\n                title: 'Budget Duration'\n              },\n              max_budget: {\n                type: 'number',\n                title: 'Max Budget'\n              },\n              max_parallel_requests: {\n                type: 'integer',\n                title: 'Max Parallel Requests'\n              },\n              model_max_budget: {\n                type: 'object',\n                title: 'Model Max Budget'\n              },\n              rpm_limit: {\n                type: 'integer',\n                title: 'Rpm Limit'\n              },\n              soft_budget: {\n                type: 'number',\n                title: 'Soft Budget'\n              },\n              tpm_limit: {\n                type: 'integer',\n                title: 'Tpm Limit'\n              }\n            },\n            required: []\n          },\n          spend: {\n            type: 'number',\n            title: 'Spend'\n          },\n          user: {\n            type: 'object',\n            title: 'User'\n          },\n          user_role: {\n            type: 'string',\n            title: 'User Role'\n          }\n        },\n        required: [          'created_at',\n          'organization_id',\n          'updated_at',\n          'user_id'\n        ]\n      }\n    },\n    updated_users: {\n      type: 'array',\n      title: 'Updated Users',\n      items: {\n        type: 'object',\n        title: 'LLM_UserTable',\n        properties: {\n          user_id: {\n            type: 'string',\n            title: 'User Id'\n          },\n          budget_duration: {\n            type: 'string',\n            title: 'Budget Duration'\n          },\n          budget_reset_at: {\n            type: 'string',\n            title: 'Budget Reset At',\n            format: 'date-time'\n          },\n          max_budget: {\n            type: 'number',\n            title: 'Max Budget'\n          },\n          metadata: {\n            type: 'object',\n            title: 'Metadata'\n          },\n          model_max_budget: {\n            type: 'object',\n            title: 'Model Max Budget'\n          },\n          model_spend: {\n            type: 'object',\n            title: 'Model Spend'\n          },\n          models: {\n            type: 'array',\n            title: 'Models',\n            items: {\n              type: 'object'\n            }\n          },\n          organization_memberships: {\n            type: 'array',\n            title: 'Organization Memberships',\n            items: {\n              type: 'object',\n              title: 'LLM_OrganizationMembershipTable',\n              description: 'This is the table that track what organizations a user belongs to and users spend within the organization',\n              properties: {\n                created_at: {\n                  type: 'string',\n                  title: 'Created At',\n                  format: 'date-time'\n                },\n                organization_id: {\n                  type: 'string',\n                  title: 'Organization Id'\n                },\n                updated_at: {\n                  type: 'string',\n                  title: 'Updated At',\n                  format: 'date-time'\n                },\n                user_id: {\n                  type: 'string',\n                  title: 'User Id'\n                },\n                budget_id: {\n                  type: 'string',\n                  title: 'Budget Id'\n                },\n                llm_budget_table: {\n                  type: 'object',\n                  title: 'LLM_BudgetTable',\n                  description: 'Represents user-controllable params for a LLM_BudgetTable record',\n                  properties: {\n                    budget_duration: {\n                      type: 'string',\n                      title: 'Budget Duration'\n                    },\n                    max_budget: {\n                      type: 'number',\n                      title: 'Max Budget'\n                    },\n                    max_parallel_requests: {\n                      type: 'integer',\n                      title: 'Max Parallel Requests'\n                    },\n                    model_max_budget: {\n                      type: 'object',\n                      title: 'Model Max Budget'\n                    },\n                    rpm_limit: {\n                      type: 'integer',\n                      title: 'Rpm Limit'\n                    },\n                    soft_budget: {\n                      type: 'number',\n                      title: 'Soft Budget'\n                    },\n                    tpm_limit: {\n                      type: 'integer',\n                      title: 'Tpm Limit'\n                    }\n                  },\n                  required: []\n                },\n                spend: {\n                  type: 'number',\n                  title: 'Spend'\n                },\n                user: {\n                  type: 'object',\n                  title: 'User'\n                },\n                user_role: {\n                  type: 'string',\n                  title: 'User Role'\n                }\n              },\n              required: [                'created_at',\n                'organization_id',\n                'updated_at',\n                'user_id'\n              ]\n            }\n          },\n          rpm_limit: {\n            type: 'integer',\n            title: 'Rpm Limit'\n          },\n          spend: {\n            type: 'number',\n            title: 'Spend'\n          },\n          sso_user_id: {\n            type: 'string',\n            title: 'Sso User Id'\n          },\n          teams: {\n            type: 'array',\n            title: 'Teams',\n            items: {\n              type: 'string'\n            }\n          },\n          tpm_limit: {\n            type: 'integer',\n            title: 'Tpm Limit'\n          },\n          user_email: {\n            type: 'string',\n            title: 'User Email'\n          },\n          user_role: {\n            type: 'string',\n            title: 'User Role'\n          }\n        },\n        required: [          'user_id'\n        ]\n      }\n    }\n  },\n  required: [    'organization_id',\n    'updated_organization_memberships',\n    'updated_users'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      member: {
        anyOf: [
          {
            type: 'array',
            items: {
              $ref: '#/$defs/org_member',
            },
          },
          {
            $ref: '#/$defs/org_member',
          },
        ],
        title: 'Member',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      max_budget_in_organization: {
        type: 'number',
        title: 'Max Budget In Organization',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    $defs: {
      org_member: {
        type: 'object',
        title: 'OrgMember',
        properties: {
          role: {
            type: 'string',
            title: 'Role',
            enum: ['org_admin', 'internal_user', 'internal_user_viewer'],
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
        required: ['role'],
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.organization.addMember(body)));
};

export default { metadata, tool, handler };
