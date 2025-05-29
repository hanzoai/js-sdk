// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'key',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/key/delete',
  operationId: 'delete_key_fn_key_delete_post',
};

export const tool: Tool = {
  name: 'delete_key',
  description:
    'Delete a key from the key management system.\n\nParameters::\n- keys (List[str]): A list of keys or hashed keys to delete. Example {"keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n- key_aliases (List[str]): A list of key aliases to delete. Can be passed instead of `keys`.Example {"key_aliases": ["alias1", "alias2"]}\n\nReturns:\n- deleted_keys (List[str]): A list of deleted keys. Example {"deleted_keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "keys": ["sk-QWrxEynunsNpV1zT48HIrw"]\n}\'\n```\n\nRaises:\n    HTTPException: If an error occurs during key deletion.',
  inputSchema: {
    type: 'object',
    properties: {
      key_aliases: {
        type: 'array',
        title: 'Key Aliases',
        items: {
          type: 'string',
        },
      },
      keys: {
        type: 'array',
        title: 'Keys',
        items: {
          type: 'string',
        },
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.key.delete(body);
};

export default { metadata, tool, handler };
