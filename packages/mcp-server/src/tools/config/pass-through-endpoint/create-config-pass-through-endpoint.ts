// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'create_config_pass_through_endpoint',
  description: 'Create new pass-through endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      headers: {
        type: 'object',
        title: 'Headers',
        description:
          'Key-value pairs of headers to be forwarded with the request. You can set any key value pair here and it will be forwarded to your target endpoint',
      },
      path: {
        type: 'string',
        title: 'Path',
        description: 'The route to be added to the LLM Proxy Server.',
      },
      target: {
        type: 'string',
        title: 'Target',
        description: 'The URL to which requests for this path should be forwarded.',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.config.passThroughEndpoint.create(body);
};

export default { tool, handler };
