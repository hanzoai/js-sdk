// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'routes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/routes',
  operationId: 'get_routes_routes_get',
};

export const tool: Tool = {
  name: 'list_routes',
  description: 'Get a list of available routes in the FastAPI application.',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.routes.list()) as object);
};

export default { metadata, tool, handler };
