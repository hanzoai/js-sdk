// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nGet the success/failure callbacks and variables for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X GET \'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Authorization: Bearer sk-1234\'\n```\n\nThis will return the callback settings for the team with id dbe2f686-a686-4896-864a-4c3924458709\n\nReturns {\n        "status": "success",\n        "data": {\n            "team_id": team_id,\n            "success_callbacks": team_callback_settings_obj.success_callback,\n            "failure_callbacks": team_callback_settings_obj.failure_callback,\n            "callback_vars": team_callback_settings_obj.callback_vars,\n        },\n    }\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
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
  const { team_id, ...body } = args as any;
  return asTextContentResult((await client.team.callback.retrieve(team_id)) as object);
};

export default { metadata, tool, handler };
