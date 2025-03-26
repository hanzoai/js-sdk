// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class User extends APIResource {
  /**
   * Use this to create a new INTERNAL user with a budget. Internal Users can access
   * LLM Admin UI to make keys, request access to models. This creates a new user and
   * generates a new api key for the new user. The new api key is returned.
   *
   * Returns user id, budget + new key.
   *
   * Parameters:
   *
   * - user_id: Optional[str] - Specify a user id. If not set, a unique id will be
   *   generated.
   * - user_alias: Optional[str] - A descriptive name for you to know who this user
   *   id refers to.
   * - teams: Optional[list] - specify a list of team id's a user belongs to.
   * - user_email: Optional[str] - Specify a user email.
   * - send_invite_email: Optional[bool] - Specify if an invite email should be sent.
   * - user_role: Optional[str] - Specify a user role - "proxy_admin",
   *   "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team",
   *   "customer". Info about each role here:
   *   `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`
   * - max_budget: Optional[float] - Specify max budget for a given user.
   * - budget_duration: Optional[str] - Budget is reset at the end of specified
   *   duration. If not set, budget is never reset. You can set duration as seconds
   *   ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").
   * - models: Optional[list] - Model_name's a user is allowed to call. (if empty,
   *   key is allowed to call all models). Set to ['no-default-models'] to block all
   *   model access. Restricting user to only team-based model access.
   * - tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per
   *   minute)
   * - rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per
   *   minute)
   * - auto_create_key: bool - Default=True. Flag used for returning a key as part of
   *   the /user/new response
   * - aliases: Optional[dict] - Model aliases for the user -
   *   [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)
   * - config: Optional[dict] - [DEPRECATED PARAM] User-specific config.
   * - allowed_cache_controls: Optional[list] - List of allowed cache control values.
   *   Example - ["no-cache", "no-store"]. See all values -
   *   https://docs.llm.ai/docs/proxy/caching#turn-on--off-caching-per-request-
   * - blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.
   * - guardrails: Optional[List[str]] - [Not Implemented Yet] List of active
   *   guardrails for the user
   * - permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions,
   *   eg. turning off pii masking.
   * - metadata: Optional[dict] - Metadata for user, store information for user.
   *   Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai"
   *   }
   * - max_parallel_requests: Optional[int] - Rate limit a user based on the number
   *   of parallel requests. Raises 429 error, if user's parallel requests > x.
   * - soft_budget: Optional[float] - Get alerts when user crosses given budget,
   *   doesn't block requests.
   * - model_max_budget: Optional[dict] - Model-specific max budget for user.
   *   [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-budgets-to-keys)
   * - model_rpm_limit: Optional[float] - Model-specific rpm limit for user.
   *   [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys)
   * - model_tpm_limit: Optional[float] - Model-specific tpm limit for user.
   *   [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys)
   * - spend: Optional[float] - Amount spent by user. Default is 0. Will be updated
   *   by proxy whenever user is used. You can set duration as seconds ("30s"),
   *   minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").
   * - team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default
   *   is None.
   * - duration: Optional[str] - Duration for the key auto-created on `/user/new`.
   *   Default is None.
   * - key_alias: Optional[str] - Alias for the key auto-created on `/user/new`.
   *   Default is None.
   *
   * Returns:
   *
   * - key: (str) The generated api key for the user
   * - expires: (datetime) Datetime object for when key expires.
   * - user_id: (str) Unique user id - used for tracking spend across multiple keys
   *   for same user id.
   * - max_budget: (float|None) Max budget for given user.
   *
   * Usage Example
   *
   * ```shell
   *  curl -X POST "http://localhost:4000/user/new"      -H "Content-Type: application/json"      -H "Authorization: Bearer sk-1234"      -d '{
   *      "username": "new_user",
   *      "email": "new_user@example.com"
   *  }'
   * ```
   */
  create(body: UserCreateParams, options?: RequestOptions): APIPromise<UserCreateResponse> {
    return this._client.post('/user/new', { body, ...options });
  }

  /**
   * Example curl
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/user/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "user_id": "test-llm-user-4",
   *     "user_role": "proxy_admin_viewer"
   * }'
   * ```
   *
   * Parameters: - user_id: Optional[str] - Specify a user id. If not set, a unique
   * id will be generated. - user_email: Optional[str] - Specify a user email. -
   * password: Optional[str] - Specify a user password. - user_alias: Optional[str] -
   * A descriptive name for you to know who this user id refers to. - teams:
   * Optional[list] - specify a list of team id's a user belongs to. -
   * send_invite_email: Optional[bool] - Specify if an invite email should be sent. -
   * user_role: Optional[str] - Specify a user role - "proxy_admin",
   * "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team",
   * "customer". Info about each role here:
   * `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20` - max_budget:
   * Optional[float] - Specify max budget for a given user. - budget_duration:
   * Optional[str] - Budget is reset at the end of specified duration. If not set,
   * budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"),
   * hours ("30h"), days ("30d"), months ("1mo"). - models: Optional[list] -
   * Model_name's a user is allowed to call. (if empty, key is allowed to call all
   * models) - tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens
   * per minute) - rpm_limit: Optional[int] - Specify rpm limit for a given user
   * (Requests per minute) - auto_create_key: bool - Default=True. Flag used for
   * returning a key as part of the /user/new response - aliases: Optional[dict] -
   * Model aliases for the user -
   * [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases) - config:
   * Optional[dict] - [DEPRECATED PARAM] User-specific config. -
   * allowed_cache_controls: Optional[list] - List of allowed cache control values.
   * Example - ["no-cache", "no-store"]. See all values -
   * https://docs.llm.ai/docs/proxy/caching#turn-on--off-caching-per-request- -
   * blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked. -
   * guardrails: Optional[List[str]] - [Not Implemented Yet] List of active
   * guardrails for the user - permissions: Optional[dict] - [Not Implemented Yet]
   * User-specific permissions, eg. turning off pii masking. - metadata:
   * Optional[dict] - Metadata for user, store information for user. Example metadata
   * = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" } -
   * max_parallel_requests: Optional[int] - Rate limit a user based on the number of
   * parallel requests. Raises 429 error, if user's parallel requests > x. -
   * soft_budget: Optional[float] - Get alerts when user crosses given budget,
   * doesn't block requests. - model_max_budget: Optional[dict] - Model-specific max
   * budget for user.
   * [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-budgets-to-keys) -
   * model_rpm_limit: Optional[float] - Model-specific rpm limit for user.
   * [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys) -
   * model_tpm_limit: Optional[float] - Model-specific tpm limit for user.
   * [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys) -
   * spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by
   * proxy whenever user is used. You can set duration as seconds ("30s"), minutes
   * ("30m"), hours ("30h"), days ("30d"), months ("1mo"). - team_id: Optional[str] -
   * [DEPRECATED PARAM] The team id of the user. Default is None. - duration:
   * Optional[str] - [NOT IMPLEMENTED]. - key_alias: Optional[str] - [NOT
   * IMPLEMENTED].
   */
  update(body: UserUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/user/update', { body, ...options });
  }

  /**
   * Get a paginated list of users, optionally filtered by role.
   *
   * Used by the UI to populate the user lists.
   *
   * Parameters: role: Optional[str] Filter users by role. Can be one of: -
   * proxy_admin - proxy_admin_viewer - internal_user - internal_user_viewer
   * user_ids: Optional[str] Get list of users by user_ids. Comma separated list of
   * user_ids. page: int The page number to return page_size: int The number of items
   * per page
   *
   * Currently - admin-only endpoint.
   *
   * Example curl:
   *
   * ```
   * http://0.0.0.0:4000/user/list?user_ids=default_user_id,693c1a4a-1cc0-4c7c-afe8-b5d2c8d52e17
   * ```
   */
  list(query: UserListParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/user/get_users', { query, ...options });
  }

  /**
   * delete user and associated user keys
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/user/delete'
   * --header 'Authorization: Bearer sk-1234'
   * --header 'Content-Type: application/json'
   * --data-raw '{
   *     "user_ids": ["45e3e396-ee08-4a61-a88e-16b3ce7e0849"]
   * }'
   * ```
   *
   * Parameters:
   *
   * - user_ids: List[str] - The list of user id's to be deleted.
   */
  delete(params: UserDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/user/delete', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * [10/07/2024] Note: To get all users (+pagination), use `/user/list` endpoint.
   *
   * Use this to get user information. (user row + all user key info)
   *
   * Example request
   *
   * ```
   * curl -X GET 'http://localhost:4000/user/info?user_id=dev7%40hanzo.ai'     --header 'Authorization: Bearer sk-1234'
   * ```
   */
  retrieveInfo(
    query: UserRetrieveInfoParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/user/info', { query, ...options });
  }
}

export interface UserCreateResponse {
  expires: string | null;

  key: string;

  token?: string | null;

  aliases?: unknown | null;

  allowed_cache_controls?: Array<unknown> | null;

  blocked?: boolean | null;

  budget_duration?: string | null;

  budget_id?: string | null;

  config?: unknown | null;

  created_by?: string | null;

  duration?: string | null;

  enforced_params?: Array<string> | null;

  guardrails?: Array<string> | null;

  key_alias?: string | null;

  key_name?: string | null;

  llm_budget_table?: unknown;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: unknown | null;

  model_max_budget?: unknown | null;

  model_rpm_limit?: unknown | null;

  model_tpm_limit?: unknown | null;

  models?: Array<unknown> | null;

  permissions?: unknown | null;

  rpm_limit?: number | null;

  spend?: number | null;

  tags?: Array<string> | null;

  team_id?: string | null;

  teams?: Array<unknown> | null;

  token_id?: string | null;

  tpm_limit?: number | null;

  updated_by?: string | null;

  user_alias?: string | null;

  user_email?: string | null;

  user_id?: string | null;

  user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer' | null;
}

export type UserUpdateResponse = unknown;

export type UserListResponse = unknown;

export type UserDeleteResponse = unknown;

export type UserRetrieveInfoResponse = unknown;

export interface UserCreateParams {
  aliases?: unknown | null;

  allowed_cache_controls?: Array<unknown> | null;

  auto_create_key?: boolean;

  blocked?: boolean | null;

  budget_duration?: string | null;

  config?: unknown | null;

  duration?: string | null;

  guardrails?: Array<string> | null;

  key_alias?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: unknown | null;

  model_max_budget?: unknown | null;

  model_rpm_limit?: unknown | null;

  model_tpm_limit?: unknown | null;

  models?: Array<unknown> | null;

  permissions?: unknown | null;

  rpm_limit?: number | null;

  send_invite_email?: boolean | null;

  spend?: number | null;

  team_id?: string | null;

  teams?: Array<unknown> | null;

  tpm_limit?: number | null;

  user_alias?: string | null;

  user_email?: string | null;

  user_id?: string | null;

  user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer' | null;
}

export interface UserUpdateParams {
  aliases?: unknown | null;

  allowed_cache_controls?: Array<unknown> | null;

  blocked?: boolean | null;

  budget_duration?: string | null;

  config?: unknown | null;

  duration?: string | null;

  guardrails?: Array<string> | null;

  key_alias?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: unknown | null;

  model_max_budget?: unknown | null;

  model_rpm_limit?: unknown | null;

  model_tpm_limit?: unknown | null;

  models?: Array<unknown> | null;

  password?: string | null;

  permissions?: unknown | null;

  rpm_limit?: number | null;

  spend?: number | null;

  team_id?: string | null;

  tpm_limit?: number | null;

  user_email?: string | null;

  user_id?: string | null;

  user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer' | null;
}

export interface UserListParams {
  /**
   * Page number
   */
  page?: number;

  /**
   * Number of items per page
   */
  page_size?: number;

  /**
   * Filter users by role
   */
  role?: string | null;

  /**
   * Get list of users by user_ids
   */
  user_ids?: string | null;
}

export interface UserDeleteParams {
  /**
   * Body param:
   */
  user_ids: Array<string>;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface UserRetrieveInfoParams {
  /**
   * User ID in the request parameters
   */
  user_id?: string | null;
}

export declare namespace User {
  export {
    type UserCreateResponse as UserCreateResponse,
    type UserUpdateResponse as UserUpdateResponse,
    type UserListResponse as UserListResponse,
    type UserDeleteResponse as UserDeleteResponse,
    type UserRetrieveInfoResponse as UserRetrieveInfoResponse,
    type UserCreateParams as UserCreateParams,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserRetrieveInfoParams as UserRetrieveInfoParams,
  };
}
