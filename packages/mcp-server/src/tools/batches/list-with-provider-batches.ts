// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'batches',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/{provider}/v1/batches',
  operationId: 'list_batches__provider__v1_batches_get',
};

export const tool: Tool = {
  name: 'list_with_provider_batches',
  description:
    'Lists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      after: {
        type: 'string',
        title: 'After',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { provider, ...body } = args as any;
  return client.batches.listWithProvider(provider, body);
};

export default { metadata, tool, handler };
