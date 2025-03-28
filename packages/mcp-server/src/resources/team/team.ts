// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
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
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.create(body);
  },
});

registerApiMethod({
  name: 'update_team',
  description:
    'Use `/team/member_add` AND `/team/member/delete` to add/remove new team members  \n\nYou can now update team budget / rate limits via /team/update\n\nParameters:\n- team_id: str - The team id of the user. Required param.\n- team_alias: Optional[str] - User defined team alias\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nExample - update team TPM Limit\n\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "tpm_limit": 100\n}\'\n```\n\nExample - Update Team `max_budget` budget\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "max_budget": 10\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
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
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.update(body);
  },
});

registerApiMethod({
  name: 'list_team',
  description:
    "```\ncurl --location --request GET 'http://0.0.0.0:4000/team/list'         --header 'Authorization: Bearer sk-1234'\n```\n\nParameters:\n- user_id: str - Optional. If passed will only return teams that the user_id is a member of.\n- organization_id: str - Optional. If passed will only return teams that belong to the organization_id. Pass 'default_organization' to get all teams without organization_id.",
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: "Only return teams which this 'user_id' belongs to",
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.list(body);
  },
});

registerApiMethod({
  name: 'delete_team',
  description:
    'delete team and associated team keys\n\nParameters:\n- team_ids: List[str] - Required. List of team IDs to delete. Example: ["team-1234", "team-5678"]\n\n```\ncurl --location \'http://0.0.0.0:4000/team/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_ids": ["8d916b1c-510d-4894-a334-1c16a93344f5"]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      team_ids: {
        type: 'array',
        title: 'Team Ids',
        items: {
          type: 'string',
        },
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.delete(body);
  },
});

registerApiMethod({
  name: 'add_member_team',
  description:
    '[BETA]\n\nAdd new members (either via user_email or user_id) to a team\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or admin of team, allowed to access this endpoint.\n```\n\ncurl -X POST \'http://0.0.0.0:4000/team/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849", "member": {"role": "user", "user_id": "dev247652@hanzo.ai"}}\'\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      member: {
        anyOf: [
          {
            type: 'array',
            items: {
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
          {
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
        ],
        title: 'Member',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      max_budget_in_team: {
        type: 'number',
        title: 'Max Budget In Team',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.addMember(body);
  },
});

registerApiMethod({
  name: 'block_team',
  description:
    "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to block.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```\n\nReturns:\n- The updated team record with blocked=True",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.block(body);
  },
});

registerApiMethod({
  name: 'disable_logging_team',
  description:
    "Disable all logging callbacks for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X POST 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/disable_logging'         -H 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { team_id } = args;
    return client.team.disableLogging(team_id);
  },
});

registerApiMethod({
  name: 'list_available_team',
  description: 'List Available Teams',
  inputSchema: {
    type: 'object',
    properties: {
      response_model: {
        type: 'object',
        title: 'Response Model',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.listAvailable(body);
  },
});

registerApiMethod({
  name: 'remove_member_team',
  description:
    "[BETA]\n\ndelete members (either via user_email or user_id) from a team\n\nIf user doesn't exist, an exception will be raised\n```\ncurl -X POST 'http://0.0.0.0:8000/team/member_delete' \n-H 'Authorization: Bearer sk-1234' \n-H 'Content-Type: application/json' \n-d '{\n    \"team_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"user_id\": \"dev247652@hanzo.ai\"\n}'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.removeMember(body);
  },
});

registerApiMethod({
  name: 'retrieve_info_team',
  description:
    "get info on team + related keys\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to get info on.\n\n```\ncurl --location 'http://localhost:4000/team/info?team_id=your_team_id_here'     --header 'Authorization: Bearer your_api_key_here'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: 'Team ID in the request parameters',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'unblock_team',
  description:
    "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to unblock.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.unblock(body);
  },
});

registerApiMethod({
  name: 'update_member_team',
  description: '[BETA]\n\nUpdate team member budgets and team member role',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      max_budget_in_team: {
        type: 'number',
        title: 'Max Budget In Team',
      },
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
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.team.updateMember(body);
  },
});
