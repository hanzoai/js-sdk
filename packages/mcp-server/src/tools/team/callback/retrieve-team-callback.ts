// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team.callback',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/team/{team_id}/callback',
  operationId: 'get_team_callbacks_team__team_id__callback_get',
};

export const tool: Tool = {
  name: 'retrieve_team_callback',
  description:
    'Get the success/failure callbacks and variables for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X GET \'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Authorization: Bearer sk-1234\'\n```\n\nThis will return the callback settings for the team with id dbe2f686-a686-4896-864a-4c3924458709\n\nReturns {\n        "status": "success",\n        "data": {\n            "team_id": team_id,\n            "success_callbacks": team_callback_settings_obj.success_callback,\n            "failure_callbacks": team_callback_settings_obj.failure_callback,\n            "callback_vars": team_callback_settings_obj.callback_vars,\n        },\n    }',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { team_id, ...body } = args as any;
  return client.team.callback.retrieve(team_id);
};

export default { metadata, tool, handler };
