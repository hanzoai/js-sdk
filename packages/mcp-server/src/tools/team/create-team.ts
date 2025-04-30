// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_team',
  description:
    'Allow users to create a new team. Apply user permissions to their team.\n\n👉 [Detailed Doc on setting team budgets](https://docs.hanzo.ai/docs/proxy/team_budgets)\n\n\nParameters:\n- team_alias: Optional[str] - User defined team alias\n- team_id: Optional[str] - The team id of the user. If none passed, we\'ll generate it.\n- members_with_roles: List[{"role": "admin" or "user", "user_id": "<user-id>"}] - A list of users and their roles in the team. Get user_id when making a new user via `/user/new`.\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"extra_info": "some info"}\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- members: Optional[List] - Control team members via `/team/member/add` and `/team/member/delete`. \n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nReturns:\n- team_id: (str) Unique team id - used for tracking spend across multiple keys for same team id.\n\n_deprecated_params:\n- admins: list - A list of user_id\'s for the admin role\n- users: list - A list of user_id\'s for the user role\n\nExample Request:\n```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n  "team_alias": "my-new-team_2",\n  "members_with_roles": [{"role": "admin", "user_id": "user-1234"},\n    {"role": "user", "user_id": "user-2434"}]\n}\'\n\n```\n\n ```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n            "team_alias": "QA Prod Bot", \n            "max_budget": 0.000000001, \n            "budget_duration": "1d"\n        }\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      admins: {
        type: 'array',
        title: 'Admins',
        items: {
          type: 'object',
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
      },
      model_aliases: {
        type: 'object',
        title: 'Model Aliases',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
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
    },
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
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.team.create(body);
};

export default { metadata, tool, handler };
