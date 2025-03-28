// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_batches',
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.batches.create(body);
  },
});

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { batch_id, ...body } = args;
    return client.batches.retrieve(batch_id, body);
  },
});

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.batches.list(body);
  },
});

registerApiMethod({
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
  },
  handler: (client: Hanzo, args: any) => {
    const { batch_id, ...body } = args;
    return client.batches.cancelWithProvider(batch_id, body);
  },
});

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { provider } = args;
    return client.batches.createWithProvider(provider);
  },
});

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { provider, ...body } = args;
    return client.batches.listWithProvider(provider, body);
  },
});

registerApiMethod({
  name: 'retrieve_with_provider_batches',
  description:
    'Retrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      batch_id: {
        type: 'string',
        title: 'Batch ID to retrieve',
        description: 'The ID of the batch to retrieve',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { batch_id, ...body } = args;
    return client.batches.retrieveWithProvider(batch_id, body);
  },
});
