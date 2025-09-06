// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'key',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/key/unblock',
  operationId: 'unblock_key_key_unblock_post',
};

export const tool: Tool = {
  name: 'unblock_key',
  description:
    "Unblock a Virtual key to allow it to make requests again.\n\nParameters:\n- key: str - The key to unblock. Can be either the unhashed key (sk-...) or the hashed key value\n\nExample:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can unblock keys.",
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
    required: ['key'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.key.unblock(body)) as object);
};

export default { metadata, tool, handler };
