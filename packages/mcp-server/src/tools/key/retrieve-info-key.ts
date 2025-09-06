// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'key',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/key/info',
  operationId: 'info_key_fn_key_info_get',
};

export const tool: Tool = {
  name: 'retrieve_info_key',
  description:
    'Retrieve information about a key.\nParameters:\n    key: Optional[str] = Query parameter representing the key in the request\n    user_api_key_dict: UserAPIKeyAuth = Dependency representing the user\'s API key\nReturns:\n    Dict containing the key and its associated information\n\nExample Curl:\n```\ncurl -X GET "http://0.0.0.0:4000/key/info?key=sk-02Wr4IAlN3NvPXvL5JVvDA" -H "Authorization: Bearer sk-1234"\n```\n\nExample Curl - if no key is passed, it will use the Key Passed in Authorization Header\n```\ncurl -X GET "http://0.0.0.0:4000/key/info" -H "Authorization: Bearer sk-02Wr4IAlN3NvPXvL5JVvDA"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
        description: 'Key in the request parameters',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.key.retrieveInfo(body)) as object);
};

export default { metadata, tool, handler };
