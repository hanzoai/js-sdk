// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'ping_test',
  description:
    "[DEPRECATED] use `/health/liveliness` instead.\n\nA test endpoint that pings the proxy server to check if it's healthy.\n\nParameters:\n    request (Request): The incoming request.\n\nReturns:\n    dict: A dictionary containing the route of the request URL.",
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.test.ping();
};

export default { tool, handler };
