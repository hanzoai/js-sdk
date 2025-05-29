// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/{provider}/v1/files',
  operationId: 'create_file__provider__v1_files_post',
};

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { provider, ...body } = args as any;
  return client.files.create(provider, body);
};

export default { metadata, tool, handler };
