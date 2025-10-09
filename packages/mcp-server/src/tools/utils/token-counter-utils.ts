// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'utils',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/utils/token_counter',
  operationId: 'token_counter_utils_token_counter_post',
};

export const tool: Tool = {
  name: 'token_counter_utils',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nToken Counter\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/util_token_counter_response',\n  $defs: {\n    util_token_counter_response: {\n      type: 'object',\n      title: 'TokenCountResponse',\n      properties: {\n        model_used: {\n          type: 'string',\n          title: 'Model Used'\n        },\n        request_model: {\n          type: 'string',\n          title: 'Request Model'\n        },\n        tokenizer_type: {\n          type: 'string',\n          title: 'Tokenizer Type'\n        },\n        total_tokens: {\n          type: 'integer',\n          title: 'Total Tokens'\n        }\n      },\n      required: [        'model_used',\n        'request_model',\n        'tokenizer_type',\n        'total_tokens'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
      messages: {
        type: 'array',
        title: 'Messages',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      prompt: {
        type: 'string',
        title: 'Prompt',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['model'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.utils.tokenCounter(body)));
};

export default { metadata, tool, handler };
