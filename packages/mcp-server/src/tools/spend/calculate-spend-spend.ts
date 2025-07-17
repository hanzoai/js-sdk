// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'spend',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/spend/calculate',
  operationId: 'calculate_spend_spend_calculate_post',
};

export const tool: Tool = {
  name: 'calculate_spend_spend',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nAccepts all the params of completion_cost.\n\nCalculate spend **before** making call:\n\nNote: If you see a spend of $0.0 you need to set custom_pricing for your model: https://docs.hanzo.ai/docs/proxy/custom_pricing\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "model": "anthropic.claude-v2",\n    "messages": [{"role": "user", "content": "Hey, how\'\'\'s it going?"}]\n}\'\n```\n\nCalculate spend **after** making call:\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "completion_response": {\n        "id": "chatcmpl-123",\n        "object": "chat.completion",\n        "created": 1677652288,\n        "model": "gpt-3.5-turbo-0125",\n        "system_fingerprint": "fp_44709d6fcb",\n        "choices": [{\n            "index": 0,\n            "message": {\n                "role": "assistant",\n                "content": "Hello there, how may I assist you today?"\n            },\n            "logprobs": null,\n            "finish_reason": "stop"\n        }]\n        "usage": {\n            "prompt_tokens": 9,\n            "completion_tokens": 12,\n            "total_tokens": 21\n        }\n    }\n}\'\n```\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      completion_response: {
        type: 'object',
        title: 'Completion Response',
      },
      messages: {
        type: 'array',
        title: 'Messages',
        items: {
          type: 'object',
        },
      },
      model: {
        type: 'string',
        title: 'Model',
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
  return asTextContentResult((await client.spend.calculateSpend(body)) as object);
};

export default { metadata, tool, handler };
