// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'rerank',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_v2_rerank',
  description: 'Rerank',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.rerank.createV2();
};

export default { metadata, tool, handler };
