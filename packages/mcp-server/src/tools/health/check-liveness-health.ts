// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'health',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'check_liveness_health',
  description: 'Unprotected endpoint for checking if worker is alive',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.health.checkLiveness();
};

export default { metadata, tool, handler };
