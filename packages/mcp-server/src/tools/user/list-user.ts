// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/user/get_users',
  operationId: 'get_users_user_get_users_get',
};

export const tool: Tool = {
  name: 'list_user',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a paginated list of users, optionally filtered by role.\n\nUsed by the UI to populate the user lists.\n\nParameters:\n    role: Optional[str]\n        Filter users by role. Can be one of:\n        - proxy_admin\n        - proxy_admin_viewer\n        - internal_user\n        - internal_user_viewer\n    user_ids: Optional[str]\n        Get list of users by user_ids. Comma separated list of user_ids.\n    page: int\n        The page number to return\n    page_size: int\n        The number of items per page\n\nCurrently - admin-only endpoint.\n\nExample curl:\n```\nhttp://0.0.0.0:4000/user/list?user_ids=default_user_id,693c1a4a-1cc0-4c7c-afe8-b5d2c8d52e17\n```\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        title: 'Page',
        description: 'Page number',
      },
      page_size: {
        type: 'integer',
        title: 'Page Size',
        description: 'Number of items per page',
      },
      role: {
        type: 'string',
        title: 'Role',
        description: 'Filter users by role',
      },
      user_ids: {
        type: 'string',
        title: 'User Ids',
        description: 'Get list of users by user_ids',
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
  return asTextContentResult((await client.user.list(body)) as object);
};

export default { metadata, tool, handler };
