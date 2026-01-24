// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class User extends APIResource {
  /**
   * Use this to create a new INTERNAL user with a budget. Internal Users can access
   * LiteLLM Admin UI to make keys, request access to models. This creates a new user
   * and generates a new api key for the new user. The new api key is returned.
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
   *   `https://github.com/BerriAI/litellm/litellm/proxy/_types.py#L20`
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
   *   [Docs](https://litellm.vercel.app/docs/proxy/virtual_keys#model-aliases)
   * - config: Optional[dict] - [DEPRECATED PARAM] User-specific config.
   * - allowed_cache_controls: Optional[list] - List of allowed cache control values.
   *   Example - ["no-cache", "no-store"]. See all values -
   *   https://docs.litellm.ai/docs/proxy/caching#turn-on--off-caching-per-request-
   * - blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.
   * - guardrails: Optional[List[str]] - [Not Implemented Yet] List of active
   *   guardrails for the user
   * - permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions,
   *   eg. turning off pii masking.
   * - metadata: Optional[dict] - Metadata for user, store information for user.
   *   Example metadata = {"team": "core-infra", "app": "app2", "email":
   *   "ishaan@berri.ai" }
   * - max_parallel_requests: Optional[int] - Rate limit a user based on the number
   *   of parallel requests. Raises 429 error, if user's parallel requests > x.
   * - soft_budget: Optional[float] - Get alerts when user crosses given budget,
   *   doesn't block requests.
   * - model_max_budget: Optional[dict] - Model-specific max budget for user.
   *   [Docs](https://docs.litellm.ai/docs/proxy/users#add-model-specific-budgets-to-keys)
   * - model_rpm_limit: Optional[float] - Model-specific rpm limit for user.
   *   [Docs](https://docs.litellm.ai/docs/proxy/users#add-model-specific-limits-to-keys)
   * - model_tpm_limit: Optional[float] - Model-specific tpm limit for user.
   *   [Docs](https://docs.litellm.ai/docs/proxy/users#add-model-specific-limits-to-keys)
   * - spend: Optional[float] - Amount spent by user. Default is 0. Will be updated
   *   by proxy whenever user is used. You can set duration as seconds ("30s"),
   *   minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").
   * - team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default
   *   is None.
   * - duration: Optional[str] - Duration for the key auto-created on `/user/new`.
   *   Default is None.
   * - key_alias: Optional[str] - Alias for the key auto-created on `/user/new`.
   *   Default is None.
   * - sso_user_id: Optional[str] - The id of the user in the SSO provider.
   * - object_permission: Optional[LiteLLM_ObjectPermissionBase] - internal
   *   user-specific object permission. Example - {"vector_stores":
   *   ["vector_store_1", "vector_store_2"]}. IF null or {} then no object
   *   permission.
   * - prompts: Optional[List[str]] - List of allowed prompts for the user. If
   *   specified, the user will only be able to use these specific prompts.
   * - organizations: List[str] - List of organization id's the user is a member of
   *   Returns:
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
   *     "user_id": "test-litellm-user-4",
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
   * `https://github.com/BerriAI/litellm/litellm/proxy/_types.py#L20` - max_budget:
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
   * [Docs](https://litellm.vercel.app/docs/proxy/virtual_keys#model-aliases) -
   * config: Optional[dict] - [DEPRECATED PARAM] User-specific config. -
   * allowed_cache_controls: Optional[list] - List of allowed cache control values.
   * Example - ["no-cache", "no-store"]. See all values -
   * https://docs.litellm.ai/docs/proxy/caching#turn-on--off-caching-per-request- -
   * blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked. -
   * guardrails: Optional[List[str]] - [Not Implemented Yet] List of active
   * guardrails for the user - permissions: Optional[dict] - [Not Implemented Yet]
   * User-specific permissions, eg. turning off pii masking. - metadata:
   * Optional[dict] - Metadata for user, store information for user. Example metadata
   * = {"team": "core-infra", "app": "app2", "email": "ishaan@berri.ai" } -
   * max_parallel_requests: Optional[int] - Rate limit a user based on the number of
   * parallel requests. Raises 429 error, if user's parallel requests > x. -
   * soft_budget: Optional[float] - Get alerts when user crosses given budget,
   * doesn't block requests. - model_max_budget: Optional[dict] - Model-specific max
   * budget for user.
   * [Docs](https://docs.litellm.ai/docs/proxy/users#add-model-specific-budgets-to-keys) -
   * model_rpm_limit: Optional[float] - Model-specific rpm limit for user.
   * [Docs](https://docs.litellm.ai/docs/proxy/users#add-model-specific-limits-to-keys) -
   * model_tpm_limit: Optional[float] - Model-specific tpm limit for user.
   * [Docs](https://docs.litellm.ai/docs/proxy/users#add-model-specific-limits-to-keys) -
   * spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by
   * proxy whenever user is used. You can set duration as seconds ("30s"), minutes
   * ("30m"), hours ("30h"), days ("30d"), months ("1mo"). - team_id: Optional[str] -
   * [DEPRECATED PARAM] The team id of the user. Default is None. - duration:
   * Optional[str] - [NOT IMPLEMENTED]. - key_alias: Optional[str] - [NOT
   * IMPLEMENTED]. - object_permission: Optional[LiteLLM_ObjectPermissionBase] -
   * internal user-specific object permission. Example - {"vector_stores":
   * ["vector_store_1", "vector_store_2"]}. IF null or {} then no object
   * permission. - prompts: Optional[List[str]] - List of allowed prompts for the
   * user. If specified, the user will only be able to use these specific prompts.
   */
  update(body: UserUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/user/update', { body, ...options });
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
    const { 'litellm-changed-by': litellmChangedBy, ...body } = params;
    return this._client.post('/user/delete', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(litellmChangedBy != null ? { 'litellm-changed-by': litellmChangedBy } : undefined) },
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
   * curl -X GET 'http://localhost:4000/user/info?user_id=krrish7%40berri.ai'     --header 'Authorization: Bearer sk-1234'
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
  key: string;

  token?: string | null;

  aliases?: { [key: string]: unknown } | null;

  allowed_cache_controls?: Array<unknown> | null;

  allowed_passthrough_routes?: Array<unknown> | null;

  allowed_routes?: Array<unknown> | null;

  allowed_vector_store_indexes?: Array<UserCreateResponse.AllowedVectorStoreIndex> | null;

  blocked?: boolean | null;

  budget_duration?: string | null;

  budget_id?: string | null;

  config?: { [key: string]: unknown } | null;

  created_at?: string | null;

  created_by?: string | null;

  duration?: string | null;

  enforced_params?: Array<string> | null;

  expires?: string | null;

  guardrails?: Array<string> | null;

  key_alias?: string | null;

  key_name?: string | null;

  litellm_budget_table?: unknown;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: { [key: string]: unknown } | null;

  model_max_budget?: { [key: string]: unknown } | null;

  model_rpm_limit?: { [key: string]: unknown } | null;

  model_tpm_limit?: { [key: string]: unknown } | null;

  models?: Array<unknown> | null;

  object_permission?: UserCreateResponse.ObjectPermission | null;

  organization_id?: string | null;

  permissions?: { [key: string]: unknown } | null;

  prompts?: Array<string> | null;

  /**
   * Set of params that you can modify via `router.update_settings()`.
   */
  router_settings?: UserCreateResponse.RouterSettings | null;

  rpm_limit?: number | null;

  rpm_limit_type?: 'guaranteed_throughput' | 'best_effort_throughput' | 'dynamic' | null;

  spend?: number | null;

  tags?: Array<string> | null;

  team_id?: string | null;

  teams?: Array<unknown> | null;

  token_id?: string | null;

  tpm_limit?: number | null;

  tpm_limit_type?: 'guaranteed_throughput' | 'best_effort_throughput' | 'dynamic' | null;

  updated_at?: string | null;

  updated_by?: string | null;

  user_alias?: string | null;

  user_email?: string | null;

  user_id?: string | null;

  user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer' | null;
}

export namespace UserCreateResponse {
  export interface AllowedVectorStoreIndex {
    index_name: string;

    index_permissions: Array<'read' | 'write'>;
  }

  export interface ObjectPermission {
    agent_access_groups?: Array<string> | null;

    agents?: Array<string> | null;

    mcp_access_groups?: Array<string> | null;

    mcp_servers?: Array<string> | null;

    mcp_tool_permissions?: { [key: string]: Array<string> } | null;

    vector_stores?: Array<string> | null;
  }

  /**
   * Set of params that you can modify via `router.update_settings()`.
   */
  export interface RouterSettings {
    allowed_fails?: number | null;

    context_window_fallbacks?: Array<{ [key: string]: unknown }> | null;

    cooldown_time?: number | null;

    fallbacks?: Array<{ [key: string]: unknown }> | null;

    max_retries?: number | null;

    model_group_alias?: { [key: string]: string | { [key: string]: unknown } } | null;

    model_group_retry_policy?: { [key: string]: unknown } | null;

    num_retries?: number | null;

    retry_after?: number | null;

    routing_strategy?: string | null;

    routing_strategy_args?: { [key: string]: unknown } | null;

    timeout?: number | null;
  }
}

export type UserUpdateResponse = unknown;

export type UserDeleteResponse = unknown;

export type UserRetrieveInfoResponse = unknown;

export interface UserCreateParams {
  aliases?: { [key: string]: unknown } | null;

  allowed_cache_controls?: Array<unknown> | null;

  auto_create_key?: boolean;

  blocked?: boolean | null;

  budget_duration?: string | null;

  config?: { [key: string]: unknown } | null;

  duration?: string | null;

  guardrails?: Array<string> | null;

  key_alias?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: { [key: string]: unknown } | null;

  model_max_budget?: { [key: string]: unknown } | null;

  model_rpm_limit?: { [key: string]: unknown } | null;

  model_tpm_limit?: { [key: string]: unknown } | null;

  models?: Array<unknown> | null;

  object_permission?: UserCreateParams.ObjectPermission | null;

  organizations?: Array<string> | null;

  permissions?: { [key: string]: unknown } | null;

  prompts?: Array<string> | null;

  rpm_limit?: number | null;

  send_invite_email?: boolean | null;

  spend?: number | null;

  sso_user_id?: string | null;

  team_id?: string | null;

  teams?: Array<string> | Array<UserCreateParams.UnionMember1> | null;

  tpm_limit?: number | null;

  user_alias?: string | null;

  user_email?: string | null;

  user_id?: string | null;

  user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer' | null;
}

export namespace UserCreateParams {
  export interface ObjectPermission {
    agent_access_groups?: Array<string> | null;

    agents?: Array<string> | null;

    mcp_access_groups?: Array<string> | null;

    mcp_servers?: Array<string> | null;

    mcp_tool_permissions?: { [key: string]: Array<string> } | null;

    vector_stores?: Array<string> | null;
  }

  export interface UnionMember1 {
    team_id: string;

    max_budget_in_team?: number | null;

    user_role?: 'user' | 'admin';
  }
}

export interface UserUpdateParams {
  aliases?: { [key: string]: unknown } | null;

  allowed_cache_controls?: Array<unknown> | null;

  blocked?: boolean | null;

  budget_duration?: string | null;

  config?: { [key: string]: unknown } | null;

  duration?: string | null;

  guardrails?: Array<string> | null;

  key_alias?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: { [key: string]: unknown } | null;

  model_max_budget?: { [key: string]: unknown } | null;

  model_rpm_limit?: { [key: string]: unknown } | null;

  model_tpm_limit?: { [key: string]: unknown } | null;

  models?: Array<unknown> | null;

  object_permission?: UserUpdateParams.ObjectPermission | null;

  password?: string | null;

  permissions?: { [key: string]: unknown } | null;

  prompts?: Array<string> | null;

  rpm_limit?: number | null;

  spend?: number | null;

  team_id?: string | null;

  tpm_limit?: number | null;

  user_alias?: string | null;

  user_email?: string | null;

  user_id?: string | null;

  user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer' | null;
}

export namespace UserUpdateParams {
  export interface ObjectPermission {
    agent_access_groups?: Array<string> | null;

    agents?: Array<string> | null;

    mcp_access_groups?: Array<string> | null;

    mcp_servers?: Array<string> | null;

    mcp_tool_permissions?: { [key: string]: Array<string> } | null;

    vector_stores?: Array<string> | null;
  }
}

export interface UserDeleteParams {
  /**
   * Body param
   */
  user_ids: Array<string>;

  /**
   * Header param: The litellm-changed-by header enables tracking of actions
   * performed by authorized users on behalf of other users, providing an audit trail
   * for accountability
   */
  'litellm-changed-by'?: string;
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
    type UserDeleteResponse as UserDeleteResponse,
    type UserRetrieveInfoResponse as UserRetrieveInfoResponse,
    type UserCreateParams as UserCreateParams,
    type UserUpdateParams as UserUpdateParams,
    type UserDeleteParams as UserDeleteParams,
    type UserRetrieveInfoParams as UserRetrieveInfoParams,
  };
}
