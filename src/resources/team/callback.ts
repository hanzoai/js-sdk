// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Callback extends APIResource {
  /**
   * Get the success/failure callbacks and variables for a team
   *
   * Parameters:
   *
   * - team_id (str, required): The unique identifier for the team
   *
   * Example curl:
   *
   * ```
   * curl -X GET 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback'         -H 'Authorization: Bearer sk-1234'
   * ```
   *
   * This will return the callback settings for the team with id
   * dbe2f686-a686-4896-864a-4c3924458709
   *
   * Returns { "status": "success", "data": { "team_id": team_id,
   * "success_callbacks": team_callback_settings_obj.success_callback,
   * "failure_callbacks": team_callback_settings_obj.failure_callback,
   * "callback_vars": team_callback_settings_obj.callback_vars, }, }
   */
  retrieve(teamID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/team/${teamID}/callback`, options);
  }

  /**
   * Add a success/failure callback to a team
   *
   * Use this if if you want different teams to have different success/failure
   * callbacks
   *
   * Parameters:
   *
   * - callback_name (Literal["langfuse", "langsmith", "gcs"], required): The name of
   *   the callback to add
   * - callback_type (Literal["success", "failure", "success_and_failure"],
   *   required): The type of callback to add. One of:
   *   - "success": Callback for successful LLM calls
   *   - "failure": Callback for failed LLM calls
   *   - "success_and_failure": Callback for both successful and failed LLM calls
   * - callback_vars (StandardCallbackDynamicParams, required): A dictionary of
   *   variables to pass to the callback
   *   - langfuse_public_key: The public key for the Langfuse callback
   *   - langfuse_secret_key: The secret key for the Langfuse callback
   *   - langfuse_secret: The secret for the Langfuse callback
   *   - langfuse_host: The host for the Langfuse callback
   *   - gcs_bucket_name: The name of the GCS bucket
   *   - gcs_path_service_account: The path to the GCS service account
   *   - langsmith_api_key: The API key for the Langsmith callback
   *   - langsmith_project: The project for the Langsmith callback
   *   - langsmith_base_url: The base URL for the Langsmith callback
   *
   * Example curl:
   *
   * ```
   * curl -X POST 'http:/localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback'         -H 'Content-Type: application/json'         -H 'Authorization: Bearer sk-1234'         -d '{
   *     "callback_name": "langfuse",
   *     "callback_type": "success",
   *     "callback_vars": {"langfuse_public_key": "pk-lf-xxxx1", "langfuse_secret_key": "sk-xxxxx"}
   *
   * }'
   * ```
   *
   * This means for the team where team_id = dbe2f686-a686-4896-864a-4c3924458709,
   * all LLM calls will be logged to langfuse using the public key pk-lf-xxxx1 and
   * the secret key sk-xxxxx
   */
  add(teamID: string, params: CallbackAddParams, options?: RequestOptions): APIPromise<unknown> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post(path`/team/${teamID}/callback`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export type CallbackRetrieveResponse = unknown;

export type CallbackAddResponse = unknown;

export interface CallbackAddParams {
  /**
   * Body param:
   */
  callback_name: string;

  /**
   * Body param:
   */
  callback_vars: Record<string, string>;

  /**
   * Body param:
   */
  callback_type?: 'success' | 'failure' | 'success_and_failure' | null;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export declare namespace Callback {
  export {
    type CallbackRetrieveResponse as CallbackRetrieveResponse,
    type CallbackAddResponse as CallbackAddResponse,
    type CallbackAddParams as CallbackAddParams,
  };
}
