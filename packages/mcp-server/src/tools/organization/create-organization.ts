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
  httpPath: '/organization/new',
  operationId: 'new_organization_organization_new_post',
};

export const tool: Tool = {
  name: 'create_organization',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAllow orgs to own teams\n\nSet org level budgets + model access.\n\nOnly admins can create orgs.\n\n# Parameters\n\n- organization_alias: *str* - The name of the organization.\n- models: *List* - The models the organization has access to.\n- budget_id: *Optional[str]* - The id for a budget (tpm/rpm/max budget) for the organization.\n### IF NO BUDGET ID - CREATE ONE WITH THESE PARAMS ###\n- max_budget: *Optional[float]* - Max budget for org\n- tpm_limit: *Optional[int]* - Max tpm limit for org\n- rpm_limit: *Optional[int]* - Max rpm limit for org\n- max_parallel_requests: *Optional[int]* - [Not Implemented Yet] Max parallel requests for org\n- soft_budget: *Optional[float]* - [Not Implemented Yet] Get a slack alert when this soft budget is reached. Don't block requests.\n- model_max_budget: *Optional[dict]* - Max budget for a specific model\n- budget_duration: *Optional[str]* - Frequency of reseting org budget\n- metadata: *Optional[dict]* - Metadata for organization, store information for organization. Example metadata - {\"extra_info\": \"some info\"}\n- blocked: *bool* - Flag indicating if the org is blocked or not - will stop all calls from keys with this org_id.\n- tags: *Optional[List[str]]* - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: *Optional[str]* - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n\nCase 1: Create new org **without** a budget_id\n\n```bash\ncurl --location 'http://0.0.0.0:4000/organization/new' \n--header 'Authorization: Bearer sk-1234' \n--header 'Content-Type: application/json' \n--data '{\n    \"organization_alias\": \"my-secret-org\",\n    \"models\": [\"model1\", \"model2\"],\n    \"max_budget\": 100\n}'\n\n\n```\n\nCase 2: Create new org **with** a budget_id\n\n```bash\ncurl --location 'http://0.0.0.0:4000/organization/new' \n--header 'Authorization: Bearer sk-1234' \n--header 'Content-Type: application/json' \n--data '{\n    \"organization_alias\": \"my-secret-org\",\n    \"models\": [\"model1\", \"model2\"],\n    \"budget_id\": \"428eeaa8-f3ac-4e85-a8fb-7dc8d7aa8689\"\n}'\n```\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'NewOrganizationResponse',\n  properties: {\n    budget_id: {\n      type: 'string',\n      title: 'Budget Id'\n    },\n    created_at: {\n      type: 'string',\n      title: 'Created At',\n      format: 'date-time'\n    },\n    created_by: {\n      type: 'string',\n      title: 'Created By'\n    },\n    models: {\n      type: 'array',\n      title: 'Models',\n      items: {\n        type: 'string'\n      }\n    },\n    organization_id: {\n      type: 'string',\n      title: 'Organization Id'\n    },\n    updated_at: {\n      type: 'string',\n      title: 'Updated At',\n      format: 'date-time'\n    },\n    updated_by: {\n      type: 'string',\n      title: 'Updated By'\n    },\n    metadata: {\n      type: 'object',\n      title: 'Metadata'\n    },\n    organization_alias: {\n      type: 'string',\n      title: 'Organization Alias'\n    },\n    spend: {\n      type: 'number',\n      title: 'Spend'\n    }\n  },\n  required: [    'budget_id',\n    'created_at',\n    'created_by',\n    'models',\n    'organization_id',\n    'updated_at',\n    'updated_by'\n  ]\n}\n```",
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
  return asTextContentResult(await maybeFilter(args, await client.organization.create(body)));
};

export default { metadata, tool, handler };
