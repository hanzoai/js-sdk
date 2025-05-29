// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
    'Get a paginated list of users, optionally filtered by role.\n\nUsed by the UI to populate the user lists.\n\nParameters:\n    role: Optional[str]\n        Filter users by role. Can be one of:\n        - proxy_admin\n        - proxy_admin_viewer\n        - internal_user\n        - internal_user_viewer\n    user_ids: Optional[str]\n        Get list of users by user_ids. Comma separated list of user_ids.\n    page: int\n        The page number to return\n    page_size: int\n        The number of items per page\n\nCurrently - admin-only endpoint.\n\nExample curl:\n```\nhttp://0.0.0.0:4000/user/list?user_ids=default_user_id,693c1a4a-1cc0-4c7c-afe8-b5d2c8d52e17\n```',
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
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.user.list(body);
};

export default { metadata, tool, handler };
