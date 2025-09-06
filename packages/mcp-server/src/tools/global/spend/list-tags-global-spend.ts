// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'global.spend',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/global/spend/tags',
  operationId: 'global_view_spend_tags_global_spend_tags_get',
};

export const tool: Tool = {
  name: 'list_tags_global_spend',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLLM Enterprise - View Spend Per Request Tag. Used by LLM UI\n\nExample Request:\n```\ncurl -X GET \"http://0.0.0.0:4000/spend/tags\" -H \"Authorization: Bearer sk-1234\"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET \"http://0.0.0.0:4000/spend/tags?start_date=2022-01-01&end_date=2022-02-01\" -H \"Authorization: Bearer sk-1234\"\n```\n\n# Response Schema\n```json\n{\n  type: 'array',\n  title: 'Response 200 Global View Spend Tags Global Spend Tags Get',\n  items: {\n    type: 'object',\n    title: 'LLM_SpendLogs',\n    properties: {\n      api_key: {\n        type: 'string',\n        title: 'Api Key'\n      },\n      call_type: {\n        type: 'string',\n        title: 'Call Type'\n      },\n      endTime: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'string',\n            format: 'date-time'\n          }\n        ],\n        title: 'Endtime'\n      },\n      messages: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'array',\n            items: {\n              type: 'object',\n              additionalProperties: true\n            }\n          },\n          {\n            type: 'object',\n            additionalProperties: true\n          }\n        ],\n        title: 'Messages'\n      },\n      request_id: {\n        type: 'string',\n        title: 'Request Id'\n      },\n      response: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'array',\n            items: {\n              type: 'object',\n              additionalProperties: true\n            }\n          },\n          {\n            type: 'object',\n            additionalProperties: true\n          }\n        ],\n        title: 'Response'\n      },\n      startTime: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'string',\n            format: 'date-time'\n          }\n        ],\n        title: 'Starttime'\n      },\n      api_base: {\n        type: 'string',\n        title: 'Api Base'\n      },\n      cache_hit: {\n        type: 'string',\n        title: 'Cache Hit'\n      },\n      cache_key: {\n        type: 'string',\n        title: 'Cache Key'\n      },\n      completion_tokens: {\n        type: 'integer',\n        title: 'Completion Tokens'\n      },\n      metadata: {\n        type: 'object',\n        title: 'Metadata',\n        additionalProperties: true\n      },\n      model: {\n        type: 'string',\n        title: 'Model'\n      },\n      prompt_tokens: {\n        type: 'integer',\n        title: 'Prompt Tokens'\n      },\n      request_tags: {\n        type: 'object',\n        title: 'Request Tags',\n        additionalProperties: true\n      },\n      requester_ip_address: {\n        type: 'string',\n        title: 'Requester Ip Address'\n      },\n      spend: {\n        type: 'number',\n        title: 'Spend'\n      },\n      total_tokens: {\n        type: 'integer',\n        title: 'Total Tokens'\n      },\n      user: {\n        type: 'string',\n        title: 'User'\n      }\n    },\n    required: [      'api_key',\n      'call_type',\n      'endTime',\n      'messages',\n      'request_id',\n      'response',\n      'startTime'\n    ]\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      end_date: {
        type: 'string',
        title: 'End Date',
        description: 'Time till which to view key spend',
      },
      start_date: {
        type: 'string',
        title: 'Start Date',
        description: 'Time from which to start viewing key spend',
      },
      tags: {
        type: 'string',
        title: 'Tags',
        description: 'comman separated tags to filter on',
      },
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
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.global.spend.listTags(body)));
};

export default { metadata, tool, handler };
