// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'spend',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/spend/logs',
  operationId: 'view_spend_logs_spend_logs_get',
};

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.spend.listLogs(body);
};

export default { metadata, tool, handler };
