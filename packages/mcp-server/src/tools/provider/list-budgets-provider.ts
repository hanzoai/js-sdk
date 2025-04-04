// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'provider',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_budgets_provider',
  description:
    'Provider Budget Routing - Get Budget, Spend Details https://docs.hanzo.ai/docs/proxy/provider_budget_routing\n\nUse this endpoint to check current budget, spend and budget reset time for a provider\n\nExample Request\n\n```bash\ncurl -X GET http://localhost:4000/provider/budgets     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"\n```\n\nExample Response\n\n```json\n{\n    "providers": {\n        "openai": {\n            "budget_limit": 1e-12,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "azure": {\n            "budget_limit": 100.0,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "anthropic": {\n            "budget_limit": 100.0,\n            "time_period": "10d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "vertex_ai": {\n            "budget_limit": 100.0,\n            "time_period": "12d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        }\n    }\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.provider.listBudgets();
};

export default { metadata, tool, handler };
