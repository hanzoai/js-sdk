// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'list_batches',
  description:
    'Lists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      after: {
        type: 'string',
        title: 'After',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
      },
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.batches.list(body);
};

export default { tool, handler };
