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
  name: 'remove_member_team',
  description:
    "[BETA]\n\ndelete members (either via user_email or user_id) from a team\n\nIf user doesn't exist, an exception will be raised\n```\ncurl -X POST 'http://0.0.0.0:8000/team/member_delete' \n-H 'Authorization: Bearer sk-1234' \n-H 'Content-Type: application/json' \n-d '{\n    \"team_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"user_id\": \"dev247652@hanzo.ai\"\n}'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
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

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.team.removeMember(body);
};

export default { metadata, tool, handler };
