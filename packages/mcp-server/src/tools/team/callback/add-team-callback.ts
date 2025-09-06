// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team.callback',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/{team_id}/callback',
  operationId: 'add_team_callbacks_team__team_id__callback_post',
};

export const tool: Tool = {
  name: 'add_team_callback',
  description:
    'Add a success/failure callback to a team\n\nUse this if if you want different teams to have different success/failure callbacks\n\nParameters:\n- callback_name (Literal["langfuse", "langsmith", "gcs"], required): The name of the callback to add\n- callback_type (Literal["success", "failure", "success_and_failure"], required): The type of callback to add. One of:\n    - "success": Callback for successful LLM calls\n    - "failure": Callback for failed LLM calls\n    - "success_and_failure": Callback for both successful and failed LLM calls\n- callback_vars (StandardCallbackDynamicParams, required): A dictionary of variables to pass to the callback\n    - langfuse_public_key: The public key for the Langfuse callback\n    - langfuse_secret_key: The secret key for the Langfuse callback\n    - langfuse_secret: The secret for the Langfuse callback\n    - langfuse_host: The host for the Langfuse callback\n    - gcs_bucket_name: The name of the GCS bucket\n    - gcs_path_service_account: The path to the GCS service account\n    - langsmith_api_key: The API key for the Langsmith callback\n    - langsmith_project: The project for the Langsmith callback\n    - langsmith_base_url: The base URL for the Langsmith callback\n\nExample curl:\n```\ncurl -X POST \'http:/localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Content-Type: application/json\'         -H \'Authorization: Bearer sk-1234\'         -d \'{\n    "callback_name": "langfuse",\n    "callback_type": "success",\n    "callback_vars": {"langfuse_public_key": "pk-lf-xxxx1", "langfuse_secret_key": "sk-xxxxx"}\n    \n}\'\n```\n\nThis means for the team where team_id = dbe2f686-a686-4896-864a-4c3924458709, all LLM calls will be logged to langfuse using the public key pk-lf-xxxx1 and the secret key sk-xxxxx',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      callback_name: {
        type: 'string',
        title: 'Callback Name',
      },
      callback_vars: {
        type: 'object',
        title: 'Callback Vars',
        additionalProperties: true,
      },
      callback_type: {
        type: 'string',
        title: 'Callback Type',
        enum: ['success', 'failure', 'success_and_failure'],
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
    required: ['team_id', 'callback_name', 'callback_vars'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { team_id, ...body } = args as any;
  return asTextContentResult((await client.team.callback.add(team_id, body)) as object);
};

export default { metadata, tool, handler };
