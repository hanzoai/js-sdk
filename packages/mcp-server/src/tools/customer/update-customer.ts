// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'customer',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/customer/update',
  operationId: 'update_end_user_customer_update_post',
};

export const tool: Tool = {
  name: 'update_customer',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nExample curl \n\nParameters:\n- user_id: str\n- alias: Optional[str] = None  # human-friendly alias\n- blocked: bool = False  # allow/disallow requests for this end-user\n- max_budget: Optional[float] = None\n- budget_id: Optional[str] = None  # give either a budget_id or max_budget\n- allowed_model_region: Optional[AllowedModelRegion] = (\n    None  # require all user requests to use models in this specific region\n)\n- default_model: Optional[str] = (\n    None  # if no equivalent model in allowed region - default all requests to this model\n)\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"user_id\": \"test-llm-user-4\",\n    \"budget_id\": \"paid_tier\"\n}'\n\nSee below for all params \n```\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
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
  return asTextContentResult((await client.customer.update(body)) as object);
};

export default { metadata, tool, handler };
