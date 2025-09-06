// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'rerank',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v2/rerank',
  operationId: 'rerank_v2_rerank_post',
};

export const tool: Tool = {
  name: 'create_v2_rerank',
  description: 'Rerank',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.rerank.createV2()) as object);
};

export default { metadata, tool, handler };
