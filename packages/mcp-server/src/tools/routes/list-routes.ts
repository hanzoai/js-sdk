// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'routes',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_routes',
  description: 'Get a list of available routes in the FastAPI application.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.routes.list();
};

export default { metadata, tool, handler };
