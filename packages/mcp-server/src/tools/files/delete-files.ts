// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/{provider}/v1/files/{file_id}',
  operationId: 'delete_file__provider__v1_files__file_id__delete',
};

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { file_id, ...body } = args as any;
  return client.files.delete(file_id, body);
};

export default { metadata, tool, handler };
