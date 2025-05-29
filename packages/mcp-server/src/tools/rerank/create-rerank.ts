// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'rerank',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/rerank',
  operationId: 'rerank_rerank_post',
};

export const tool: Tool = {
  name: 'create_rerank',
  description: 'Rerank',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.rerank.create();
};

export default { metadata, tool, handler };
