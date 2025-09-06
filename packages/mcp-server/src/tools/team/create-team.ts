// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/new',
  operationId: 'new_team_team_new_post',
};

export const tool: Tool = {
  name: 'create_team',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAllow users to create a new team. Apply user permissions to their team.\n\n👉 [Detailed Doc on setting team budgets](https://docs.hanzo.ai/docs/proxy/team_budgets)\n\n\nParameters:\n- team_alias: Optional[str] - User defined team alias\n- team_id: Optional[str] - The team id of the user. If none passed, we'll generate it.\n- members_with_roles: List[{\"role\": \"admin\" or \"user\", \"user_id\": \"<user-id>\"}] - A list of users and their roles in the team. Get user_id when making a new user via `/user/new`.\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {\"extra_info\": \"some info\"}\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- members: Optional[List] - Control team members via `/team/member/add` and `/team/member/delete`. \n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nReturns:\n- team_id: (str) Unique team id - used for tracking spend across multiple keys for same team id.\n\n_deprecated_params:\n- admins: list - A list of user_id's for the admin role\n- users: list - A list of user_id's for the user role\n\nExample Request:\n```\ncurl --location 'http://0.0.0.0:4000/team/new'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n  \"team_alias\": \"my-new-team_2\",\n  \"members_with_roles\": [{\"role\": \"admin\", \"user_id\": \"user-1234\"},\n    {\"role\": \"user\", \"user_id\": \"user-2434\"}]\n}'\n\n```\n\n ```\ncurl --location 'http://0.0.0.0:4000/team/new'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n            \"team_alias\": \"QA Prod Bot\", \n            \"max_budget\": 0.000000001, \n            \"budget_duration\": \"1d\"\n        }'\n```\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'LLM_TeamTable',\n  properties: {\n    team_id: {\n      type: 'string',\n      title: 'Team Id'\n    },\n    admins: {\n      type: 'array',\n      title: 'Admins',\n      items: {\n        type: 'object',\n        additionalProperties: true\n      }\n    },\n    blocked: {\n      type: 'boolean',\n      title: 'Blocked'\n    },\n    budget_duration: {\n      type: 'string',\n      title: 'Budget Duration'\n    },\n    budget_reset_at: {\n      type: 'string',\n      title: 'Budget Reset At',\n      format: 'date-time'\n    },\n    created_at: {\n      type: 'string',\n      title: 'Created At',\n      format: 'date-time'\n    },\n    llm_model_table: {\n      type: 'object',\n      title: 'LLM_ModelTable',\n      properties: {\n        created_by: {\n          type: 'string',\n          title: 'Created By'\n        },\n        updated_by: {\n          type: 'string',\n          title: 'Updated By'\n        },\n        model_aliases: {\n          anyOf: [            {\n              type: 'object',\n              additionalProperties: true\n            },\n            {\n              type: 'string'\n            }\n          ],\n          title: 'Model Aliases'\n        }\n      },\n      required: [        'created_by',\n        'updated_by'\n      ]\n    },\n    max_budget: {\n      type: 'number',\n      title: 'Max Budget'\n    },\n    max_parallel_requests: {\n      type: 'integer',\n      title: 'Max Parallel Requests'\n    },\n    members: {\n      type: 'array',\n      title: 'Members',\n      items: {\n        type: 'object',\n        additionalProperties: true\n      }\n    },\n    members_with_roles: {\n      type: 'array',\n      title: 'Members With Roles',\n      items: {\n        $ref: '#/$defs/member'\n      }\n    },\n    metadata: {\n      type: 'object',\n      title: 'Metadata',\n      additionalProperties: true\n    },\n    model_id: {\n      type: 'integer',\n      title: 'Model Id'\n    },\n    models: {\n      type: 'array',\n      title: 'Models',\n      items: {\n        type: 'object',\n        additionalProperties: true\n      }\n    },\n    organization_id: {\n      type: 'string',\n      title: 'Organization Id'\n    },\n    rpm_limit: {\n      type: 'integer',\n      title: 'Rpm Limit'\n    },\n    spend: {\n      type: 'number',\n      title: 'Spend'\n    },\n    team_alias: {\n      type: 'string',\n      title: 'Team Alias'\n    },\n    tpm_limit: {\n      type: 'integer',\n      title: 'Tpm Limit'\n    }\n  },\n  required: [    'team_id'\n  ],\n  $defs: {\n    member: {\n      type: 'object',\n      title: 'Member',\n      properties: {\n        role: {\n          type: 'string',\n          title: 'Role',\n          enum: [            'admin',\n            'user'\n          ]\n        },\n        user_email: {\n          type: 'string',\n          title: 'User Email'\n        },\n        user_id: {\n          type: 'string',\n          title: 'User Id'\n        }\n      },\n      required: [        'role'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      admins: {
        type: 'array',
        title: 'Admins',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      members: {
        type: 'array',
        title: 'Members',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      members_with_roles: {
        type: 'array',
        title: 'Members With Roles',
        items: {
          $ref: '#/$defs/member',
        },
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
        additionalProperties: true,
      },
      model_aliases: {
        type: 'object',
        title: 'Model Aliases',
        additionalProperties: true,
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      team_alias: {
        type: 'string',
        title: 'Team Alias',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
    $defs: {
      member: {
        type: 'object',
        title: 'Member',
        properties: {
          role: {
            type: 'string',
            title: 'Role',
            enum: ['admin', 'user'],
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
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.team.create(body)));
};

export default { metadata, tool, handler };
