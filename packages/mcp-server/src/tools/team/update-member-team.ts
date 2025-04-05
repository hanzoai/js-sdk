// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_member_team',
  description: '[BETA]\n\nUpdate team member budgets and team member role',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      max_budget_in_team: {
        type: 'number',
        title: 'Max Budget In Team',
      },
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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.team.updateMember(body);
};

export default { metadata, tool, handler };
