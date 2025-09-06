// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'test',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/test',
  operationId: 'test_endpoint_test_get',
};

export const tool: Tool = {
  name: 'ping_test',
  description:
    "[DEPRECATED] use `/health/liveliness` instead.\n\nA test endpoint that pings the proxy server to check if it's healthy.\n\nParameters:\n    request (Request): The incoming request.\n\nReturns:\n    dict: A dictionary containing the route of the request URL.",
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
  return asTextContentResult((await client.test.ping()) as object);
};

export default { metadata, tool, handler };
