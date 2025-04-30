// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'batches',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_with_provider_batches',
  description:
    'Create large batches of API requests for asynchronous processing.\nThis is the equivalent of POST https://api.openai.com/v1/batch\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d \'{\n        "input_file_id": "file-abc123",\n        "endpoint": "/v1/chat/completions",\n        "completion_window": "24h"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { provider, ...body } = args as any;
  return client.batches.createWithProvider(provider);
};

export default { metadata, tool, handler };
