// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'spend',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.spend.listTags(body);
};

export default { metadata, tool, handler };
