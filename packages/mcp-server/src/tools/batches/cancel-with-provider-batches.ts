// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'batches',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/{provider}/v1/batches/{batch_id}/cancel',
  operationId: 'cancel_batch__provider__v1_batches__batch_id__cancel_post',
};

export const tool: Tool = {
  name: 'cancel_with_provider_batches',
  description:
    'Cancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      batch_id: {
        type: 'string',
        title: 'Batch Id',
      },
    },
    required: ['provider', 'batch_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { batch_id, ...body } = args as any;
  return asTextContentResult((await client.batches.cancelWithProvider(batch_id, body)) as object);
};

export default { metadata, tool, handler };
