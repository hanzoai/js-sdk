// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'global.spend',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.global.spend.retrieveReport(body);
};

export default { metadata, tool, handler };
