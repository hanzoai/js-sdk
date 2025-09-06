// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'provider',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/provider/budgets',
  operationId: 'provider_budgets_provider_budgets_get',
};

export const tool: Tool = {
  name: 'list_budgets_provider',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nProvider Budget Routing - Get Budget, Spend Details https://docs.hanzo.ai/docs/proxy/provider_budget_routing\n\nUse this endpoint to check current budget, spend and budget reset time for a provider\n\nExample Request\n\n```bash\ncurl -X GET http://localhost:4000/provider/budgets     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"\n```\n\nExample Response\n\n```json\n{\n    "providers": {\n        "openai": {\n            "budget_limit": 1e-12,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "azure": {\n            "budget_limit": 100.0,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "anthropic": {\n            "budget_limit": 100.0,\n            "time_period": "10d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "vertex_ai": {\n            "budget_limit": 100.0,\n            "time_period": "12d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        }\n    }\n}\n```\n\n# Response Schema\n```json\n{\n  type: \'object\',\n  title: \'ProviderBudgetResponse\',\n  description: \'Complete provider budget configuration and status.\\nMaps provider names to their budget configs.\',\n  properties: {\n    providers: {\n      type: \'object\',\n      title: \'Providers\',\n      additionalProperties: true\n    }\n  }\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.provider.listBudgets()));
};

export default { metadata, tool, handler };
