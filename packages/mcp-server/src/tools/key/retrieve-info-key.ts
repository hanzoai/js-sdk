// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.key.retrieveInfo(body);
};

export default { tool, handler };
