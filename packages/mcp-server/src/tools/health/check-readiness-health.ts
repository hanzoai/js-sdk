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
  name: 'check_readiness_health',
  description: 'Unprotected endpoint for checking if worker can receive requests',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.health.checkReadiness();
};

export default { metadata, tool, handler };
