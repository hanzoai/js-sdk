// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'customer',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/customer/info',
  operationId: 'end_user_info_customer_info_get',
};

export const tool: Tool = {
  name: 'retrieve_info_customer',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet information about an end-user. An `end_user` is a customer (external user) of the proxy.\n\nParameters:\n- end_user_id (str, required): The unique identifier for the end-user\n\nExample curl:\n```\ncurl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4'         -H 'Authorization: Bearer sk-1234'\n```\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/customer_retrieve_info_response',\n  $defs: {\n    customer_retrieve_info_response: {\n      type: 'object',\n      title: 'LLM_EndUserTable',\n      properties: {\n        blocked: {\n          type: 'boolean',\n          title: 'Blocked'\n        },\n        user_id: {\n          type: 'string',\n          title: 'User Id'\n        },\n        alias: {\n          type: 'string',\n          title: 'Alias'\n        },\n        allowed_model_region: {\n          type: 'string',\n          title: 'Allowed Model Region',\n          enum: [            'eu',\n            'us'\n          ]\n        },\n        default_model: {\n          type: 'string',\n          title: 'Default Model'\n        },\n        llm_budget_table: {\n          type: 'object',\n          title: 'LLM_BudgetTable',\n          description: 'Represents user-controllable params for a LLM_BudgetTable record',\n          properties: {\n            budget_duration: {\n              type: 'string',\n              title: 'Budget Duration'\n            },\n            max_budget: {\n              type: 'number',\n              title: 'Max Budget'\n            },\n            max_parallel_requests: {\n              type: 'integer',\n              title: 'Max Parallel Requests'\n            },\n            model_max_budget: {\n              type: 'object',\n              title: 'Model Max Budget',\n              additionalProperties: true\n            },\n            rpm_limit: {\n              type: 'integer',\n              title: 'Rpm Limit'\n            },\n            soft_budget: {\n              type: 'number',\n              title: 'Soft Budget'\n            },\n            tpm_limit: {\n              type: 'integer',\n              title: 'Tpm Limit'\n            }\n          }\n        },\n        spend: {\n          type: 'number',\n          title: 'Spend'\n        }\n      },\n      required: [        'blocked',\n        'user_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      end_user_id: {
        type: 'string',
        title: 'End User Id',
        description: 'End User ID in the request parameters',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['end_user_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.customer.retrieveInfo(body)));
};

export default { metadata, tool, handler };
