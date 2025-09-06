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
  httpPath: '/organization/update',
  operationId: 'update_organization_organization_update_patch',
};

export const tool: Tool = {
  name: 'update_organization',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate an organization\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'LLM_OrganizationTableWithMembers',\n  description: 'Returned by the /organization/info endpoint and /organization/list endpoint',\n  properties: {\n    budget_id: {\n      type: 'string',\n      title: 'Budget Id'\n    },\n    created_at: {\n      type: 'string',\n      title: 'Created At',\n      format: 'date-time'\n    },\n    created_by: {\n      type: 'string',\n      title: 'Created By'\n    },\n    models: {\n      type: 'array',\n      title: 'Models',\n      items: {\n        type: 'string'\n      }\n    },\n    updated_at: {\n      type: 'string',\n      title: 'Updated At',\n      format: 'date-time'\n    },\n    updated_by: {\n      type: 'string',\n      title: 'Updated By'\n    },\n    llm_budget_table: {\n      type: 'object',\n      title: 'LLM_BudgetTable',\n      description: 'Represents user-controllable params for a LLM_BudgetTable record',\n      properties: {\n        budget_duration: {\n          type: 'string',\n          title: 'Budget Duration'\n        },\n        max_budget: {\n          type: 'number',\n          title: 'Max Budget'\n        },\n        max_parallel_requests: {\n          type: 'integer',\n          title: 'Max Parallel Requests'\n        },\n        model_max_budget: {\n          type: 'object',\n          title: 'Model Max Budget',\n          additionalProperties: true\n        },\n        rpm_limit: {\n          type: 'integer',\n          title: 'Rpm Limit'\n        },\n        soft_budget: {\n          type: 'number',\n          title: 'Soft Budget'\n        },\n        tpm_limit: {\n          type: 'integer',\n          title: 'Tpm Limit'\n        }\n      }\n    },\n    members: {\n      type: 'array',\n      title: 'Members',\n      items: {\n        type: 'object',\n        title: 'LLM_OrganizationMembershipTable',\n        description: 'This is the table that track what organizations a user belongs to and users spend within the organization',\n        properties: {\n          created_at: {\n            type: 'string',\n            title: 'Created At',\n            format: 'date-time'\n          },\n          organization_id: {\n            type: 'string',\n            title: 'Organization Id'\n          },\n          updated_at: {\n            type: 'string',\n            title: 'Updated At',\n            format: 'date-time'\n          },\n          user_id: {\n            type: 'string',\n            title: 'User Id'\n          },\n          budget_id: {\n            type: 'string',\n            title: 'Budget Id'\n          },\n          llm_budget_table: {\n            type: 'object',\n            title: 'LLM_BudgetTable',\n            description: 'Represents user-controllable params for a LLM_BudgetTable record',\n            properties: {\n              budget_duration: {\n                type: 'string',\n                title: 'Budget Duration'\n              },\n              max_budget: {\n                type: 'number',\n                title: 'Max Budget'\n              },\n              max_parallel_requests: {\n                type: 'integer',\n                title: 'Max Parallel Requests'\n              },\n              model_max_budget: {\n                type: 'object',\n                title: 'Model Max Budget',\n                additionalProperties: true\n              },\n              rpm_limit: {\n                type: 'integer',\n                title: 'Rpm Limit'\n              },\n              soft_budget: {\n                type: 'number',\n                title: 'Soft Budget'\n              },\n              tpm_limit: {\n                type: 'integer',\n                title: 'Tpm Limit'\n              }\n            }\n          },\n          spend: {\n            type: 'number',\n            title: 'Spend'\n          },\n          user: {\n            type: 'object',\n            title: 'User',\n            additionalProperties: true\n          },\n          user_role: {\n            type: 'string',\n            title: 'User Role'\n          }\n        },\n        required: [          'created_at',\n          'organization_id',\n          'updated_at',\n          'user_id'\n        ]\n      }\n    },\n    metadata: {\n      type: 'object',\n      title: 'Metadata',\n      additionalProperties: true\n    },\n    organization_alias: {\n      type: 'string',\n      title: 'Organization Alias'\n    },\n    organization_id: {\n      type: 'string',\n      title: 'Organization Id'\n    },\n    spend: {\n      type: 'number',\n      title: 'Spend'\n    },\n    teams: {\n      type: 'array',\n      title: 'Teams',\n      items: {\n        type: 'object',\n        title: 'LLM_TeamTable',\n        properties: {\n          team_id: {\n            type: 'string',\n            title: 'Team Id'\n          },\n          admins: {\n            type: 'array',\n            title: 'Admins',\n            items: {\n              type: 'object',\n              additionalProperties: true\n            }\n          },\n          blocked: {\n            type: 'boolean',\n            title: 'Blocked'\n          },\n          budget_duration: {\n            type: 'string',\n            title: 'Budget Duration'\n          },\n          budget_reset_at: {\n            type: 'string',\n            title: 'Budget Reset At',\n            format: 'date-time'\n          },\n          created_at: {\n            type: 'string',\n            title: 'Created At',\n            format: 'date-time'\n          },\n          llm_model_table: {\n            type: 'object',\n            title: 'LLM_ModelTable',\n            properties: {\n              created_by: {\n                type: 'string',\n                title: 'Created By'\n              },\n              updated_by: {\n                type: 'string',\n                title: 'Updated By'\n              },\n              model_aliases: {\n                anyOf: [                  {\n                    type: 'object',\n                    additionalProperties: true\n                  },\n                  {\n                    type: 'string'\n                  }\n                ],\n                title: 'Model Aliases'\n              }\n            },\n            required: [              'created_by',\n              'updated_by'\n            ]\n          },\n          max_budget: {\n            type: 'number',\n            title: 'Max Budget'\n          },\n          max_parallel_requests: {\n            type: 'integer',\n            title: 'Max Parallel Requests'\n          },\n          members: {\n            type: 'array',\n            title: 'Members',\n            items: {\n              type: 'object',\n              additionalProperties: true\n            }\n          },\n          members_with_roles: {\n            type: 'array',\n            title: 'Members With Roles',\n            items: {\n              $ref: '#/$defs/member'\n            }\n          },\n          metadata: {\n            type: 'object',\n            title: 'Metadata',\n            additionalProperties: true\n          },\n          model_id: {\n            type: 'integer',\n            title: 'Model Id'\n          },\n          models: {\n            type: 'array',\n            title: 'Models',\n            items: {\n              type: 'object',\n              additionalProperties: true\n            }\n          },\n          organization_id: {\n            type: 'string',\n            title: 'Organization Id'\n          },\n          rpm_limit: {\n            type: 'integer',\n            title: 'Rpm Limit'\n          },\n          spend: {\n            type: 'number',\n            title: 'Spend'\n          },\n          team_alias: {\n            type: 'string',\n            title: 'Team Alias'\n          },\n          tpm_limit: {\n            type: 'integer',\n            title: 'Tpm Limit'\n          }\n        },\n        required: [          'team_id'\n        ]\n      }\n    }\n  },\n  required: [    'budget_id',\n    'created_at',\n    'created_by',\n    'models',\n    'updated_at',\n    'updated_by'\n  ],\n  $defs: {\n    member: {\n      type: 'object',\n      title: 'Member',\n      properties: {\n        role: {\n          type: 'string',\n          title: 'Role',\n          enum: [            'admin',\n            'user'\n          ]\n        },\n        user_email: {\n          type: 'string',\n          title: 'User Email'\n        },\n        user_id: {\n          type: 'string',\n          title: 'User Id'\n        }\n      },\n      required: [        'role'\n      ]\n    }\n  }\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.organization.update(body)));
};

export default { metadata, tool, handler };
