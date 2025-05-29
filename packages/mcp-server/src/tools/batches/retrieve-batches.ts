// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'batches',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/batches/{batch_id}',
  operationId: 'retrieve_batch_v1_batches__batch_id__get',
};

export const tool: Tool = {
  name: 'retrieve_batches',
  description:
    'Retrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      batch_id: {
        type: 'string',
        title: 'Batch ID to retrieve',
        description: 'The ID of the batch to retrieve',
      },
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { batch_id, ...body } = args as any;
  return client.batches.retrieve(batch_id, body);
};

export default { metadata, tool, handler };
