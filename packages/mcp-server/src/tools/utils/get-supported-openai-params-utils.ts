// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'utils',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'get_supported_openai_params_utils',
  description:
    "Returns supported openai params for a given llm model name\n\ne.g. `gpt-4` vs `gpt-3.5-turbo`\n\nExample curl:\n```\ncurl -X GET --location 'http://localhost:4000/utils/supported_openai_params?model=gpt-3.5-turbo-16k'         --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.utils.getSupportedOpenAIParams(body);
};

export default { metadata, tool, handler };
