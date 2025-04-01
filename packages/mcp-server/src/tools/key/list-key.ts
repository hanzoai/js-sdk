// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'list_key',
  description:
    'List all keys for a given user / team / organization.\n\nReturns:\n    {\n        "keys": List[str] or List[UserAPIKeyAuth],\n        "total_count": int,\n        "current_page": int,\n        "total_pages": int,\n    }',
  inputSchema: {
    type: 'object',
    properties: {
      include_team_keys: {
        type: 'boolean',
        title: 'Include Team Keys',
        description: 'Include all keys for teams that user is an admin of.',
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
        description: 'Filter keys by key alias',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
        description: 'Filter keys by organization ID',
      },
      page: {
        type: 'integer',
        title: 'Page',
        description: 'Page number',
      },
      return_full_object: {
        type: 'boolean',
        title: 'Return Full Object',
        description: 'Return full key object',
      },
      size: {
        type: 'integer',
        title: 'Size',
        description: 'Page size',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: 'Filter keys by team ID',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'Filter keys by user ID',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.key.list(body);
};

export default { tool, handler };
