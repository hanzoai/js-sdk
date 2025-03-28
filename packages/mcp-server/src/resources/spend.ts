// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'calculate_spend_spend',
  description:
    'Accepts all the params of completion_cost.\n\nCalculate spend **before** making call:\n\nNote: If you see a spend of $0.0 you need to set custom_pricing for your model: https://docs.hanzo.ai/docs/proxy/custom_pricing\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "model": "anthropic.claude-v2",\n    "messages": [{"role": "user", "content": "Hey, how\'\'\'s it going?"}]\n}\'\n```\n\nCalculate spend **after** making call:\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "completion_response": {\n        "id": "chatcmpl-123",\n        "object": "chat.completion",\n        "created": 1677652288,\n        "model": "gpt-3.5-turbo-0125",\n        "system_fingerprint": "fp_44709d6fcb",\n        "choices": [{\n            "index": 0,\n            "message": {\n                "role": "assistant",\n                "content": "Hello there, how may I assist you today?"\n            },\n            "logprobs": null,\n            "finish_reason": "stop"\n        }]\n        "usage": {\n            "prompt_tokens": 9,\n            "completion_tokens": 12,\n            "total_tokens": 21\n        }\n    }\n}\'\n```',
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.spend.calculateSpend(body);
  },
});

registerApiMethod({
  name: 'list_logs_spend',
  description:
    'View all spend logs, if request_id is provided, only logs for that request_id will be returned\n\nExample Request for all logs\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific request_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?request_id=chatcmpl-6dcb2540-d3d7-4e49-bb27-291f863f112e" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific api_key\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?api_key=sk-Fn8Ej39NkBQmUagFEoUWPQ" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific user_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?user_id=z@hanzo.ai" -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      api_key: {
        type: 'string',
        title: 'Api Key',
        description: 'Get spend logs based on api key',
      },
      end_date: {
        type: 'string',
        title: 'End Date',
        description: 'Time till which to view key spend',
      },
      request_id: {
        type: 'string',
        title: 'Request Id',
        description:
          'request_id to get spend logs for specific request_id. If none passed then pass spend logs for all requests',
      },
      start_date: {
        type: 'string',
        title: 'Start Date',
        description: 'Time from which to start viewing key spend',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'Get spend logs based on user_id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.spend.listLogs(body);
  },
});

registerApiMethod({
  name: 'list_tags_spend',
  description:
    'LLM Enterprise - View Spend Per Request Tag\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```',
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.spend.listTags(body);
  },
});
