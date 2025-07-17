// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/update',
  operationId: 'update_team_team_update_post',
};

export const tool: Tool = {
  name: 'update_team',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nUse `/team/member_add` AND `/team/member/delete` to add/remove new team members  \n\nYou can now update team budget / rate limits via /team/update\n\nParameters:\n- team_id: str - The team id of the user. Required param.\n- team_alias: Optional[str] - User defined team alias\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nExample - update team TPM Limit\n\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "tpm_limit": 100\n}\'\n```\n\nExample - Update Team `max_budget` budget\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "max_budget": 10\n}\'\n```\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.team.update(body)) as object);
};

export default { metadata, tool, handler };
