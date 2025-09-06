// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'moderations',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/moderations',
  operationId: 'moderations_v1_moderations_post',
};

export const tool: Tool = {
  name: 'create_moderations',
  description:
    'The moderations endpoint is a tool you can use to check whether content complies with an LLM Providers policies.\n\nQuick Start\n```\ncurl --location \'http://0.0.0.0:4000/moderations\'     --header \'Content-Type: application/json\'     --header \'Authorization: Bearer sk-1234\'     --data \'{"input": "Sample text goes here", "model": "text-moderation-stable"}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.moderations.create()) as object);
};

export default { metadata, tool, handler };
