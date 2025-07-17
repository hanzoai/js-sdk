// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'budget',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/budget/update',
  operationId: 'update_budget_budget_update_post',
};

export const tool: Tool = {
  name: 'update_budget',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nUpdate an existing budget object.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
        description: "Max duration budget should be set for (e.g. '1hr', '1d', '28d')",
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
        description: 'The unique budget id.',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
        description: 'Requests will fail if this budget (in USD) is exceeded.',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
        description: 'Max concurrent requests allowed for this budget id.',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
        description:
          "Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})",
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
        description: 'Max requests per minute, allowed for this budget id.',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
        description: 'Requests will NOT fail if this is exceeded. Will fire alerting though.',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
        description: 'Max tokens per minute, allowed for this budget id.',
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
  return asTextContentResult((await client.budget.update(body)) as object);
};

export default { metadata, tool, handler };
