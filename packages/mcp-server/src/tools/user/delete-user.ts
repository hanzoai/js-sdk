// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/user/delete',
  operationId: 'delete_user_user_delete_post',
};

export const tool: Tool = {
  name: 'delete_user',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\ndelete user and associated user keys\n\n```\ncurl --location 'http://0.0.0.0:4000/user/delete' \n--header 'Authorization: Bearer sk-1234' \n--header 'Content-Type: application/json' \n--data-raw '{\n    \"user_ids\": [\"45e3e396-ee08-4a61-a88e-16b3ce7e0849\"]\n}'\n```\n\nParameters:\n- user_ids: List[str] - The list of user id's to be deleted.\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.user.delete(body)) as object);
};

export default { metadata, tool, handler };
