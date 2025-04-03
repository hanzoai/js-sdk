// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'moderations',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_moderations',
  description:
    'The moderations endpoint is a tool you can use to check whether content complies with an LLM Providers policies.\n\nQuick Start\n```\ncurl --location \'http://0.0.0.0:4000/moderations\'     --header \'Content-Type: application/json\'     --header \'Authorization: Bearer sk-1234\'     --data \'{"input": "Sample text goes here", "model": "text-moderation-stable"}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.moderations.create();
};

export default { metadata, tool, handler };
