// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_files',
  description:
    'Upload a file that can be used across - Assistants API, Batch API \nThis is the equivalent of POST https://api.openai.com/v1/files\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/create\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files         -H "Authorization: Bearer sk-1234"         -F purpose="batch"         -F file="@mydata.jsonl"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      file: {
        type: 'string',
        title: 'File',
      },
      purpose: {
        type: 'string',
        title: 'Purpose',
      },
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { provider, ...body } = args;
    return client.files.create(provider, body);
  },
});

registerApiMethod({
  name: 'retrieve_files',
  description:
    'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123         -H "Authorization: Bearer sk-1234"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      file_id: {
        type: 'string',
        title: 'File Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { file_id, ...body } = args;
    return client.files.retrieve(file_id, body);
  },
});

registerApiMethod({
  name: 'list_files',
  description:
    'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files        -H "Authorization: Bearer sk-1234"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      purpose: {
        type: 'string',
        title: 'Purpose',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { provider, ...body } = args;
    return client.files.list(provider, body);
  },
});

registerApiMethod({
  name: 'delete_files',
  description:
    'Deletes a specified file. that can be used across - Assistants API, Batch API \nThis is the equivalent of DELETE https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/delete\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123     -X DELETE     -H "Authorization: Bearer $OPENAI_API_KEY"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      file_id: {
        type: 'string',
        title: 'File Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { file_id, ...body } = args;
    return client.files.delete(file_id, body);
  },
});
