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
  httpPath: '/global/spend/report',
  operationId: 'get_global_spend_report_global_spend_report_get',
};

export const tool: Tool = {
  name: 'retrieve_report_global_spend',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet Daily Spend per Team, based on specific startTime and endTime. Per team, view usage by each key, model\n[\n    {\n        \"group-by-day\": \"2024-05-10\",\n        \"teams\": [\n            {\n                \"team_name\": \"team-1\"\n                \"spend\": 10,\n                \"keys\": [\n                    \"key\": \"1213\",\n                    \"usage\": {\n                        \"model-1\": {\n                                \"cost\": 12.50,\n                                \"input_tokens\": 1000,\n                                \"output_tokens\": 5000,\n                                \"requests\": 100\n                            },\n                            \"audio-modelname1\": {\n                            \"cost\": 25.50,\n                            \"seconds\": 25,\n                            \"requests\": 50\n                    },\n                    }\n                }\n        ]\n    ]\n}\n\n# Response Schema\n```json\n{\n  type: 'array',\n  title: 'Response 200 Get Global Spend Report Global Spend Report Get',\n  items: {\n    type: 'object',\n    title: 'LLM_SpendLogs',\n    properties: {\n      api_key: {\n        type: 'string',\n        title: 'Api Key'\n      },\n      call_type: {\n        type: 'string',\n        title: 'Call Type'\n      },\n      endTime: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'string',\n            format: 'date-time'\n          }\n        ],\n        title: 'Endtime'\n      },\n      messages: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'array',\n            items: {\n              type: 'object'\n            }\n          },\n          {\n            type: 'object'\n          }\n        ],\n        title: 'Messages'\n      },\n      request_id: {\n        type: 'string',\n        title: 'Request Id'\n      },\n      response: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'array',\n            items: {\n              type: 'object'\n            }\n          },\n          {\n            type: 'object'\n          }\n        ],\n        title: 'Response'\n      },\n      startTime: {\n        anyOf: [          {\n            type: 'string'\n          },\n          {\n            type: 'string',\n            format: 'date-time'\n          }\n        ],\n        title: 'Starttime'\n      },\n      api_base: {\n        type: 'string',\n        title: 'Api Base'\n      },\n      cache_hit: {\n        type: 'string',\n        title: 'Cache Hit'\n      },\n      cache_key: {\n        type: 'string',\n        title: 'Cache Key'\n      },\n      completion_tokens: {\n        type: 'integer',\n        title: 'Completion Tokens'\n      },\n      metadata: {\n        type: 'object',\n        title: 'Metadata'\n      },\n      model: {\n        type: 'string',\n        title: 'Model'\n      },\n      prompt_tokens: {\n        type: 'integer',\n        title: 'Prompt Tokens'\n      },\n      request_tags: {\n        type: 'object',\n        title: 'Request Tags'\n      },\n      requester_ip_address: {\n        type: 'string',\n        title: 'Requester Ip Address'\n      },\n      spend: {\n        type: 'number',\n        title: 'Spend'\n      },\n      total_tokens: {\n        type: 'integer',\n        title: 'Total Tokens'\n      },\n      user: {\n        type: 'string',\n        title: 'User'\n      }\n    },\n    required: [      'api_key',\n      'call_type',\n      'endTime',\n      'messages',\n      'request_id',\n      'response',\n      'startTime'\n    ]\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      api_key: {
        type: 'string',
        title: 'Api Key',
        description: "View spend for a specific api_key. Example api_key='sk-1234",
      },
      customer_id: {
        type: 'string',
        title: 'Customer Id',
        description:
          "View spend for a specific customer_id. Example customer_id='1234. Can be used in conjunction with team_id as well.",
      },
      end_date: {
        type: 'string',
        title: 'End Date',
        description: 'Time till which to view spend',
      },
      group_by: {
        type: 'string',
        title: 'Group By',
        description: 'Group spend by internal team or customer or api_key',
        enum: ['team', 'customer', 'api_key'],
      },
      internal_user_id: {
        type: 'string',
        title: 'Internal User Id',
        description: "View spend for a specific internal_user_id. Example internal_user_id='1234",
      },
      start_date: {
        type: 'string',
        title: 'Start Date',
        description: 'Time from which to start viewing spend',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: "View spend for a specific team_id. Example team_id='1234",
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
  return asTextContentResult(await maybeFilter(args, await client.global.spend.retrieveReport(body)));
};

export default { metadata, tool, handler };
