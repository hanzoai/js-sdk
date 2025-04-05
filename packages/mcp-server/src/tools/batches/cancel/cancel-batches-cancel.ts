// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'batches.cancel',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'cancel_batches_cancel',
  description:
    'Cancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      batch_id: {
        type: 'string',
        title: 'Batch Id',
      },
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { batch_id, ...body } = args;
  return client.batches.cancel.cancel(batch_id, body);
};

export default { metadata, tool, handler };
