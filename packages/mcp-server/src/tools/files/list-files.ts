// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/{provider}/v1/files',
  operationId: 'list_files__provider__v1_files_get',
};

export const tool: Tool = {
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
    required: ['provider'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { provider, ...body } = args as any;
  return asTextContentResult((await client.files.list(provider, body)) as object);
};

export default { metadata, tool, handler };
