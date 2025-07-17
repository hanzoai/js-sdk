// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/member_add',
  operationId: 'team_member_add_team_member_add_post',
};

export const tool: Tool = {
  name: 'add_member_team',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\n[BETA]\n\nAdd new members (either via user_email or user_id) to a team\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or admin of team, allowed to access this endpoint.\n```\n\ncurl -X POST \'http://0.0.0.0:4000/team/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849", "member": {"role": "user", "user_id": "dev247652@hanzo.ai"}}\'\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      member: {
        anyOf: [
          {
            type: 'array',
            items: {
              $ref: '#/$defs/member',
            },
          },
          {
            $ref: '#/$defs/member',
          },
        ],
        title: 'Member',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      max_budget_in_team: {
        type: 'number',
        title: 'Max Budget In Team',
      },
    },
    $defs: {
      member: {
        type: 'object',
        title: 'Member',
        properties: {
          role: {
            type: 'string',
            title: 'Role',
            enum: ['admin', 'user'],
          },
          user_email: {
            type: 'string',
            title: 'User Email',
          },
          user_id: {
            type: 'string',
            title: 'User Id',
          },
        },
        required: ['role'],
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.team.addMember(body));
};

export default { metadata, tool, handler };
