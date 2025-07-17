// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/{provider}/v1/files/{file_id}',
  operationId: 'get_file__provider__v1_files__file_id__get',
};

export const tool: Tool = {
  name: 'retrieve_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123         -H \"Authorization: Bearer sk-1234\"\n\n```\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { file_id, ...body } = args as any;
  return asTextContentResult((await client.files.retrieve(file_id, body)) as object);
};

export default { metadata, tool, handler };
