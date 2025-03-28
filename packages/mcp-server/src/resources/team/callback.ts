// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { team_id } = args;
    return client.team.callback.retrieve(team_id);
  },
});

registerApiMethod({
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
  },
  handler: (client: Hanzo, args: any) => {
    const { team_id, ...body } = args;
    return client.team.callback.add(team_id, body);
  },
});
