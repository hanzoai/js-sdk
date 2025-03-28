// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_organization',
  description:
    'Allow orgs to own teams\n\nSet org level budgets + model access.\n\nOnly admins can create orgs.\n\n# Parameters\n\n- organization_alias: *str* - The name of the organization.\n- models: *List* - The models the organization has access to.\n- budget_id: *Optional[str]* - The id for a budget (tpm/rpm/max budget) for the organization.\n### IF NO BUDGET ID - CREATE ONE WITH THESE PARAMS ###\n- max_budget: *Optional[float]* - Max budget for org\n- tpm_limit: *Optional[int]* - Max tpm limit for org\n- rpm_limit: *Optional[int]* - Max rpm limit for org\n- max_parallel_requests: *Optional[int]* - [Not Implemented Yet] Max parallel requests for org\n- soft_budget: *Optional[float]* - [Not Implemented Yet] Get a slack alert when this soft budget is reached. Don\'t block requests.\n- model_max_budget: *Optional[dict]* - Max budget for a specific model\n- budget_duration: *Optional[str]* - Frequency of reseting org budget\n- metadata: *Optional[dict]* - Metadata for organization, store information for organization. Example metadata - {"extra_info": "some info"}\n- blocked: *bool* - Flag indicating if the org is blocked or not - will stop all calls from keys with this org_id.\n- tags: *Optional[List[str]]* - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: *Optional[str]* - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n\nCase 1: Create new org **without** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "max_budget": 100\n}\'\n\n\n```\n\nCase 2: Create new org **with** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "budget_id": "428eeaa8-f3ac-4e85-a8fb-7dc8d7aa8689"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      organization_alias: {
        type: 'string',
        title: 'Organization Alias',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
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
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.create(body);
  },
});

registerApiMethod({
  name: 'update_organization',
  description: 'Update an organization',
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.update(body);
  },
});

registerApiMethod({
  name: 'list_organization',
  description:
    "```\ncurl --location --request GET 'http://0.0.0.0:4000/organization/list'         --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.organization.list();
  },
});

registerApiMethod({
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
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.delete(body);
  },
});

registerApiMethod({
  name: 'add_member_organization',
  description:
    '[BETA]\n\nAdd new members (either via user_email or user_id) to an organization\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or org_admin of organization, allowed to access this endpoint.\n\n# Parameters:\n\n- organization_id: str (required)\n- member: Union[List[Member], Member] (required)\n    - role: Literal[LLMUserRoles] (required)\n    - user_id: Optional[str]\n    - user_email: Optional[str]\n\nNote: Either user_id or user_email must be provided for each member.\n\nExample:\n```\ncurl -X POST \'http://0.0.0.0:4000/organization/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{\n    "organization_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",\n    "member": {\n        "role": "internal_user",\n        "user_id": "dev247652@hanzo.ai"\n    },\n    "max_budget_in_organization": 100.0\n}\'\n```\n\nThe following is executed in this function:\n\n1. Check if organization exists\n2. Creates a new Internal User if the user_id or user_email is not found in LLM_UserTable\n3. Add Internal User to the `LLM_OrganizationMembership` table',
  inputSchema: {
    type: 'object',
    properties: {
      member: {
        anyOf: [
          {
            type: 'array',
            items: {
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
          {
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.addMember(body);
  },
});

registerApiMethod({
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
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.deleteMember(body);
  },
});

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.updateMember(body);
  },
});
