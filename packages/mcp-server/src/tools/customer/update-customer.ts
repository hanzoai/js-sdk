// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'customer',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_customer',
  description:
    'Example curl \n\nParameters:\n- user_id: str\n- alias: Optional[str] = None  # human-friendly alias\n- blocked: bool = False  # allow/disallow requests for this end-user\n- max_budget: Optional[float] = None\n- budget_id: Optional[str] = None  # give either a budget_id or max_budget\n- allowed_model_region: Optional[AllowedModelRegion] = (\n    None  # require all user requests to use models in this specific region\n)\n- default_model: Optional[str] = (\n    None  # if no equivalent model in allowed region - default all requests to this model\n)\n\nExample curl:\n```\ncurl --location \'http://0.0.0.0:4000/customer/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "user_id": "test-llm-user-4",\n    "budget_id": "paid_tier"\n}\'\n\nSee below for all params \n```',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      alias: {
        type: 'string',
        title: 'Alias',
      },
      allowed_model_region: {
        type: 'string',
        title: 'Allowed Model Region',
        enum: ['eu', 'us'],
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      default_model: {
        type: 'string',
        title: 'Default Model',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.customer.update(body);
};

export default { metadata, tool, handler };
