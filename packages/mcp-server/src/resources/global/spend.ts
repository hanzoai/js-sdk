// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'list_tags_global_spend',
  description:
    'LLM Enterprise - View Spend Per Request Tag. Used by LLM UI\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```',
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.global.spend.listTags(body);
  },
});

registerApiMethod({
  name: 'reset_global_spend',
  description:
    'ADMIN ONLY / MASTER KEY Only Endpoint\n\nGlobally reset spend for All API Keys and Teams, maintain LLM_SpendLogs\n\n1. LLM_SpendLogs will maintain the logs on spend, no data gets deleted from there\n2. LLM_VerificationTokens spend will be set = 0\n3. LLM_TeamTable spend will be set = 0',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.global.spend.reset();
  },
});

registerApiMethod({
  name: 'retrieve_report_global_spend',
  description:
    'Get Daily Spend per Team, based on specific startTime and endTime. Per team, view usage by each key, model\n[\n    {\n        "group-by-day": "2024-05-10",\n        "teams": [\n            {\n                "team_name": "team-1"\n                "spend": 10,\n                "keys": [\n                    "key": "1213",\n                    "usage": {\n                        "model-1": {\n                                "cost": 12.50,\n                                "input_tokens": 1000,\n                                "output_tokens": 5000,\n                                "requests": 100\n                            },\n                            "audio-modelname1": {\n                            "cost": 25.50,\n                            "seconds": 25,\n                            "requests": 50\n                    },\n                    }\n                }\n        ]\n    ]\n}',
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.global.spend.retrieveReport(body);
  },
});
