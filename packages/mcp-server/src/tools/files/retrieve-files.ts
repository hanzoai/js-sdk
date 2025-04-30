// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { file_id, ...body } = args as any;
  return client.files.retrieve(file_id, body);
};

export default { metadata, tool, handler };
