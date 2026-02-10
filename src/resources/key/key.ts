// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RegenerateAPI from './regenerate';
import { Regenerate, RegenerateKeyRequest } from './regenerate';
import * as TeamAPI from '../team/team';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Key extends APIResource {
  regenerate: RegenerateAPI.Regenerate = new RegenerateAPI.Regenerate(this._client);

  /**
   * Update an existing API key's parameters.
   *
   * Parameters:
   *
   * - key: str - The key to update
   * - key_alias: Optional[str] - User-friendly key alias
   * - user_id: Optional[str] - User ID associated with key
   * - team_id: Optional[str] - Team ID associated with key
   * - budget_id: Optional[str] - The budget id associated with the key. Created by
   *   calling `/budget/new`.
   * - models: Optional[list] - Model_name's a user is allowed to call
   * - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)
   * - enforced_params: Optional[List[str]] - List of enforced params for the key
   *   (Enterprise only).
   *   [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)
   * - spend: Optional[float] - Amount spent by key
   * - max_budget: Optional[float] - Max budget for key
   * - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets
   *   {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}
   * - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
   * - soft_budget: Optional[float] - [TODO] Soft budget limit (warning vs. hard
   *   stop). Will trigger a slack alert when this soft budget is reached.
   * - max_parallel_requests: Optional[int] - Rate limit for parallel requests
   * - metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra",
   *   "app": "app2"}
   * - tpm_limit: Optional[int] - Tokens per minute limit
   * - rpm_limit: Optional[int] - Requests per minute limit
   * - model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100,
   *   "claude-v1": 200}
   * - model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000,
   *   "claude-v1": 200000}
   * - allowed_cache_controls: Optional[list] - List of allowed cache control values
   * - duration: Optional[str] - Key validity duration ("30d", "1h", etc.)
   * - permissions: Optional[dict] - Key-specific permissions
   * - send_invite_email: Optional[bool] - Send invite email to user_id
   * - guardrails: Optional[List[str]] - List of active guardrails for the key
   * - blocked: Optional[bool] - Whether the key is blocked
   * - aliases: Optional[dict] - Model aliases for the key -
   *   [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)
   * - config: Optional[dict] - [DEPRECATED PARAM] Key-specific config.
   * - temp_budget_increase: Optional[float] - Temporary budget increase for the key
   *   (Enterprise only).
   * - temp_budget_expiry: Optional[str] - Expiry time for the temporary budget
   *   increase (Enterprise only).
   *
   * Example:
   *
   * ```bash
   * curl --location 'http://0.0.0.0:4000/key/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "key": "sk-1234",
   *     "key_alias": "my-key",
   *     "user_id": "user-1234",
   *     "team_id": "team-1234",
   *     "max_budget": 100,
   *     "metadata": {"any_key": "any-val"},
   * }'
   * ```
   */
  update(params: KeyUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/key/update', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List all keys for a given user / team / organization.
   *
   * Returns: { "keys": List[str] or List[UserAPIKeyAuth], "total_count": int,
   * "current_page": int, "total_pages": int, }
   */
  list(query: KeyListParams | null | undefined = {}, options?: RequestOptions): APIPromise<KeyListResponse> {
    return this._client.get('/key/list', { query, ...options });
  }

  /**
   * Delete a key from the key management system.
   *
   * Parameters::
   *
   * - keys (List[str]): A list of keys or hashed keys to delete. Example {"keys":
   *   ["sk-QWrxEynunsNpV1zT48HIrw",
   *   "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}
   * - key_aliases (List[str]): A list of key aliases to delete. Can be passed
   *   instead of `keys`.Example {"key_aliases": ["alias1", "alias2"]}
   *
   * Returns:
   *
   * - deleted_keys (List[str]): A list of deleted keys. Example {"deleted_keys":
   *   ["sk-QWrxEynunsNpV1zT48HIrw",
   *   "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}
   *
   * Example:
   *
   * ```bash
   * curl --location 'http://0.0.0.0:4000/key/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "keys": ["sk-QWrxEynunsNpV1zT48HIrw"]
   * }'
   * ```
   *
   * Raises: HTTPException: If an error occurs during key deletion.
   */
  delete(params: KeyDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/key/delete', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Block an Virtual key from making any requests.
   *
   * Parameters:
   *
   * - key: str - The key to block. Can be either the unhashed key (sk-...) or the
   *   hashed key value
   *
   * Example:
   *
   * ```bash
   * curl --location 'http://0.0.0.0:4000/key/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "key": "sk-Fn8Ej39NxjAXrvpUGKghGw"
   * }'
   * ```
   *
   * Note: This is an admin-only endpoint. Only proxy admins can block keys.
   */
  block(params: KeyBlockParams, options?: RequestOptions): APIPromise<KeyBlockResponse | null> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/key/block', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Check the health of the key
   *
   * Checks:
   *
   * - If key based logging is configured correctly - sends a test log
   *
   * Usage
   *
   * Pass the key in the request header
   *
   * ```bash
   * curl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"
   * ```
   *
   * Response when logging callbacks are setup correctly:
   *
   * ```json
   * {
   *   "key": "healthy",
   *   "logging_callbacks": {
   *     "callbacks": ["gcs_bucket"],
   *     "status": "healthy",
   *     "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to ['gcs_bucket']"
   *   }
   * }
   * ```
   *
   * Response when logging callbacks are not setup correctly:
   *
   * ```json
   * {
   *   "key": "unhealthy",
   *   "logging_callbacks": {
   *     "callbacks": ["gcs_bucket"],
   *     "status": "unhealthy",
   *     "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."
   *   }
   * }
   * ```
   */
  checkHealth(options?: RequestOptions): APIPromise<KeyCheckHealthResponse> {
    return this._client.post('/key/health', options);
  }

  /**
   * Generate an API key based on the provided data.
   *
   * Docs: https://docs.hanzo.ai/docs/proxy/virtual_keys
   *
   * Parameters:
   *
   * - duration: Optional[str] - Specify the length of time the token is valid for.
   *   You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days
   *   ("30d").
   * - key_alias: Optional[str] - User defined key alias
   * - key: Optional[str] - User defined key value. If not set, a 16-digit unique
   *   sk-key is created for you.
   * - team_id: Optional[str] - The team id of the key
   * - user_id: Optional[str] - The user id of the key
   * - budget_id: Optional[str] - The budget id associated with the key. Created by
   *   calling `/budget/new`.
   * - models: Optional[list] - Model_name's a user is allowed to call. (if empty,
   *   key is allowed to call all models)
   * - aliases: Optional[dict] - Any alias mappings, on top of anything in the
   *   config.yaml model list. -
   *   https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---upgradedowngrade-models
   * - config: Optional[dict] - any key-specific configs, overrides config in
   *   config.yaml
   * - spend: Optional[int] - Amount spent by key. Default is 0. Will be updated by
   *   proxy whenever key is used.
   *   https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---tracking-spend
   * - send_invite_email: Optional[bool] - Whether to send an invite email to the
   *   user_id, with the generate key
   * - max_budget: Optional[float] - Specify max budget for a given key.
   * - budget_duration: Optional[str] - Budget is reset at the end of specified
   *   duration. If not set, budget is never reset. You can set duration as seconds
   *   ("30s"), minutes ("30m"), hours ("30h"), days ("30d").
   * - max_parallel_requests: Optional[int] - Rate limit a user based on the number
   *   of parallel requests. Raises 429 error, if user's parallel requests > x.
   * - metadata: Optional[dict] - Metadata for key, store information for key.
   *   Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai"
   *   }
   * - guardrails: Optional[List[str]] - List of active guardrails for the key
   * - permissions: Optional[dict] - key-specific permissions. Currently just used
   *   for turning off pii masking (if connected). Example - {"pii": false}
   * - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets
   *   {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}}. IF null or {} then
   *   no model specific budget.
   * - model_rpm_limit: Optional[dict] - key-specific model rpm limit. Example -
   *   {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model
   *   specific rpm limit.
   * - model_tpm_limit: Optional[dict] - key-specific model tpm limit. Example -
   *   {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model
   *   specific tpm limit.
   * - allowed_cache_controls: Optional[list] - List of allowed cache control values.
   *   Example - ["no-cache", "no-store"]. See all values -
   *   https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request
   * - blocked: Optional[bool] - Whether the key is blocked.
   * - rpm_limit: Optional[int] - Specify rpm limit for a given key (Requests per
   *   minute)
   * - tpm_limit: Optional[int] - Specify tpm limit for a given key (Tokens per
   *   minute)
   * - soft_budget: Optional[float] - Specify soft budget for a given key. Will
   *   trigger a slack alert when this soft budget is reached.
   * - tags: Optional[List[str]] - Tags for
   *   [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags)
   *   and/or doing
   *   [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
   * - enforced_params: Optional[List[str]] - List of enforced params for the key
   *   (Enterprise only).
   *   [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)
   *
   * Examples:
   *
   * 1. Allow users to turn on/off pii masking
   *
   * ```bash
   * curl --location 'http://0.0.0.0:4000/key/generate'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{
   *         "permissions": {"allow_pii_controls": true}
   * }'
   * ```
   *
   * Returns:
   *
   * - key: (str) The generated api key
   * - expires: (datetime) Datetime object for when key expires.
   * - user_id: (str) Unique user id - used for tracking spend across multiple keys
   *   for same user id.
   */
  generate(params: KeyGenerateParams, options?: RequestOptions): APIPromise<GenerateKeyResponse> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/key/generate', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Regenerate an existing API key while optionally updating its parameters.
   *
   * Parameters:
   *
   * - key: str (path parameter) - The key to regenerate
   * - data: Optional[RegenerateKeyRequest] - Request body containing optional
   *   parameters to update
   *   - key_alias: Optional[str] - User-friendly key alias
   *   - user_id: Optional[str] - User ID associated with key
   *   - team_id: Optional[str] - Team ID associated with key
   *   - models: Optional[list] - Model_name's a user is allowed to call
   *   - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)
   *   - spend: Optional[float] - Amount spent by key
   *   - max_budget: Optional[float] - Max budget for key
   *   - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets
   *     {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}
   *   - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
   *   - soft_budget: Optional[float] - Soft budget limit (warning vs. hard stop).
   *     Will trigger a slack alert when this soft budget is reached.
   *   - max_parallel_requests: Optional[int] - Rate limit for parallel requests
   *   - metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra",
   *     "app": "app2"}
   *   - tpm_limit: Optional[int] - Tokens per minute limit
   *   - rpm_limit: Optional[int] - Requests per minute limit
   *   - model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100,
   *     "claude-v1": 200}
   *   - model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4":
   *     100000, "claude-v1": 200000}
   *   - allowed_cache_controls: Optional[list] - List of allowed cache control
   *     values
   *   - duration: Optional[str] - Key validity duration ("30d", "1h", etc.)
   *   - permissions: Optional[dict] - Key-specific permissions
   *   - guardrails: Optional[List[str]] - List of active guardrails for the key
   *   - blocked: Optional[bool] - Whether the key is blocked
   *
   * Returns:
   *
   * - GenerateKeyResponse containing the new key and its updated parameters
   *
   * Example:
   *
   * ```bash
   * curl --location --request POST 'http://localhost:4000/key/sk-1234/regenerate'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{
   *     "max_budget": 100,
   *     "metadata": {"team": "core-infra"},
   *     "models": ["gpt-4", "gpt-3.5-turbo"]
   * }'
   * ```
   *
   * Note: This is an Enterprise feature. It requires a premium license to use.
   */
  regenerateByKey(
    pathKey: string,
    params: KeyRegenerateByKeyParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GenerateKeyResponse | null> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params ?? {};
    return this._client.post(path`/key/${pathKey}/regenerate`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieve information about a key. Parameters: key: Optional[str] = Query
   * parameter representing the key in the request user_api_key_dict: UserAPIKeyAuth
   * = Dependency representing the user's API key Returns: Dict containing the key
   * and its associated information
   *
   * Example Curl:
   *
   * ```
   * curl -X GET "http://0.0.0.0:4000/key/info?key=sk-02Wr4IAlN3NvPXvL5JVvDA" -H "Authorization: Bearer sk-1234"
   * ```
   *
   * Example Curl - if no key is passed, it will use the Key Passed in Authorization
   * Header
   *
   * ```
   * curl -X GET "http://0.0.0.0:4000/key/info" -H "Authorization: Bearer sk-02Wr4IAlN3NvPXvL5JVvDA"
   * ```
   */
  retrieveInfo(
    query: KeyRetrieveInfoParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/key/info', { query, ...options });
  }

  /**
   * Unblock a Virtual key to allow it to make requests again.
   *
   * Parameters:
   *
   * - key: str - The key to unblock. Can be either the unhashed key (sk-...) or the
   *   hashed key value
   *
   * Example:
   *
   * ```bash
   * curl --location 'http://0.0.0.0:4000/key/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "key": "sk-Fn8Ej39NxjAXrvpUGKghGw"
   * }'
   * ```
   *
   * Note: This is an admin-only endpoint. Only proxy admins can unblock keys.
   */
  unblock(params: KeyUnblockParams, options?: RequestOptions): APIPromise<unknown> {
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/key/unblock', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface BlockKeyRequest {
  key: string;
}

export interface GenerateKeyResponse {
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

  token_id?: string | null;

  tpm_limit?: number | null;

  updated_by?: string | null;

  user_id?: string | null;
}

export type KeyUpdateResponse = unknown;

export interface KeyListResponse {
  current_page?: number | null;

  keys?: Array<string | KeyListResponse.UserAPIKeyAuth>;

  total_count?: number | null;

  total_pages?: number | null;
}

export namespace KeyListResponse {
  /**
   * Return the row in the db
   */
  export interface UserAPIKeyAuth {
    token?: string | null;

    aliases?: unknown;

    allowed_cache_controls?: Array<unknown> | null;

    allowed_model_region?: 'eu' | 'us' | null;

    api_key?: string | null;

    blocked?: boolean | null;

    budget_duration?: string | null;

    budget_reset_at?: string | null;

    config?: unknown;

    created_at?: string | null;

    created_by?: string | null;

    end_user_id?: string | null;

    end_user_max_budget?: number | null;

    end_user_rpm_limit?: number | null;

    end_user_tpm_limit?: number | null;

    expires?: string | (string & {}) | null;

    key_alias?: string | null;

    key_name?: string | null;

    last_refreshed_at?: number | null;

    llm_budget_table?: unknown | null;

    max_budget?: number | null;

    max_parallel_requests?: number | null;

    metadata?: unknown;

    model_max_budget?: unknown;

    model_spend?: unknown;

    models?: Array<unknown>;

    org_id?: string | null;

    parent_otel_span?: unknown;

    permissions?: unknown;

    rpm_limit?: number | null;

    rpm_limit_per_model?: { [key: string]: number } | null;

    soft_budget?: number | null;

    soft_budget_cooldown?: boolean;

    spend?: number;

    team_alias?: string | null;

    team_blocked?: boolean;

    team_id?: string | null;

    team_max_budget?: number | null;

    team_member?: TeamAPI.Member | null;

    team_member_spend?: number | null;

    team_metadata?: unknown | null;

    team_model_aliases?: unknown | null;

    team_models?: Array<unknown>;

    team_rpm_limit?: number | null;

    team_spend?: number | null;

    team_tpm_limit?: number | null;

    tpm_limit?: number | null;

    tpm_limit_per_model?: { [key: string]: number } | null;

    updated_at?: string | null;

    updated_by?: string | null;

    user_email?: string | null;

    user_id?: string | null;

    /**
     * Admin Roles: PROXY_ADMIN: admin over the platform PROXY_ADMIN_VIEW_ONLY: can
     * login, view all own keys, view all spend ORG_ADMIN: admin over a specific
     * organization, can create teams, users only within their organization
     *
     * Internal User Roles: INTERNAL_USER: can login, view/create/delete their own
     * keys, view their spend INTERNAL_USER_VIEW_ONLY: can login, view their own keys,
     * view their own spend
     *
     * Team Roles: TEAM: used for JWT auth
     *
     * Customer Roles: CUSTOMER: External users -> these are customers
     */
    user_role?:
      | 'proxy_admin'
      | 'proxy_admin_viewer'
      | 'org_admin'
      | 'internal_user'
      | 'internal_user_viewer'
      | 'team'
      | 'customer'
      | null;

    user_rpm_limit?: number | null;

    user_tpm_limit?: number | null;
  }
}

export type KeyDeleteResponse = unknown;

export interface KeyBlockResponse {
  token?: string | null;

  aliases?: unknown;

  allowed_cache_controls?: Array<unknown> | null;

  blocked?: boolean | null;

  budget_duration?: string | null;

  budget_reset_at?: string | null;

  config?: unknown;

  created_at?: string | null;

  created_by?: string | null;

  expires?: string | (string & {}) | null;

  key_alias?: string | null;

  key_name?: string | null;

  llm_budget_table?: unknown | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: unknown;

  model_max_budget?: unknown;

  model_spend?: unknown;

  models?: Array<unknown>;

  org_id?: string | null;

  permissions?: unknown;

  rpm_limit?: number | null;

  soft_budget_cooldown?: boolean;

  spend?: number;

  team_id?: string | null;

  tpm_limit?: number | null;

  updated_at?: string | null;

  updated_by?: string | null;

  user_id?: string | null;
}

export interface KeyCheckHealthResponse {
  key?: 'healthy' | 'unhealthy';

  logging_callbacks?: KeyCheckHealthResponse.LoggingCallbacks | null;
}

export namespace KeyCheckHealthResponse {
  export interface LoggingCallbacks {
    callbacks?: Array<string>;

    details?: string | null;

    status?: 'healthy' | 'unhealthy';
  }
}

export type KeyRetrieveInfoResponse = unknown;

export type KeyUnblockResponse = unknown;

export interface KeyUpdateParams {
  /**
   * Body param
   */
  key: string;

  /**
   * Body param
   */
  aliases?: unknown | null;

  /**
   * Body param
   */
  allowed_cache_controls?: Array<unknown> | null;

  /**
   * Body param
   */
  blocked?: boolean | null;

  /**
   * Body param
   */
  budget_duration?: string | null;

  /**
   * Body param
   */
  budget_id?: string | null;

  /**
   * Body param
   */
  config?: unknown | null;

  /**
   * Body param
   */
  duration?: string | null;

  /**
   * Body param
   */
  enforced_params?: Array<string> | null;

  /**
   * Body param
   */
  guardrails?: Array<string> | null;

  /**
   * Body param
   */
  key_alias?: string | null;

  /**
   * Body param
   */
  max_budget?: number | null;

  /**
   * Body param
   */
  max_parallel_requests?: number | null;

  /**
   * Body param
   */
  metadata?: unknown | null;

  /**
   * Body param
   */
  model_max_budget?: unknown | null;

  /**
   * Body param
   */
  model_rpm_limit?: unknown | null;

  /**
   * Body param
   */
  model_tpm_limit?: unknown | null;

  /**
   * Body param
   */
  models?: Array<unknown> | null;

  /**
   * Body param
   */
  permissions?: unknown | null;

  /**
   * Body param
   */
  rpm_limit?: number | null;

  /**
   * Body param
   */
  spend?: number | null;

  /**
   * Body param
   */
  tags?: Array<string> | null;

  /**
   * Body param
   */
  team_id?: string | null;

  /**
   * Body param
   */
  temp_budget_expiry?: string | null;

  /**
   * Body param
   */
  temp_budget_increase?: number | null;

  /**
   * Body param
   */
  tpm_limit?: number | null;

  /**
   * Body param
   */
  user_id?: string | null;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface KeyListParams {
  /**
   * Include all keys for teams that user is an admin of.
   */
  include_team_keys?: boolean;

  /**
   * Filter keys by key alias
   */
  key_alias?: string | null;

  /**
   * Filter keys by organization ID
   */
  organization_id?: string | null;

  /**
   * Page number
   */
  page?: number;

  /**
   * Return full key object
   */
  return_full_object?: boolean;

  /**
   * Page size
   */
  size?: number;

  /**
   * Filter keys by team ID
   */
  team_id?: string | null;

  /**
   * Filter keys by user ID
   */
  user_id?: string | null;
}

export interface KeyDeleteParams {
  /**
   * Body param
   */
  key_aliases?: Array<string> | null;

  /**
   * Body param
   */
  keys?: Array<string> | null;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface KeyBlockParams {
  /**
   * Body param
   */
  key: string;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface KeyGenerateParams {
  /**
   * Body param
   */
  aliases?: unknown | null;

  /**
   * Body param
   */
  allowed_cache_controls?: Array<unknown> | null;

  /**
   * Body param
   */
  blocked?: boolean | null;

  /**
   * Body param
   */
  budget_duration?: string | null;

  /**
   * Body param
   */
  budget_id?: string | null;

  /**
   * Body param
   */
  config?: unknown | null;

  /**
   * Body param
   */
  duration?: string | null;

  /**
   * Body param
   */
  enforced_params?: Array<string> | null;

  /**
   * Body param
   */
  guardrails?: Array<string> | null;

  /**
   * Body param
   */
  key?: string | null;

  /**
   * Body param
   */
  key_alias?: string | null;

  /**
   * Body param
   */
  max_budget?: number | null;

  /**
   * Body param
   */
  max_parallel_requests?: number | null;

  /**
   * Body param
   */
  metadata?: unknown | null;

  /**
   * Body param
   */
  model_max_budget?: unknown | null;

  /**
   * Body param
   */
  model_rpm_limit?: unknown | null;

  /**
   * Body param
   */
  model_tpm_limit?: unknown | null;

  /**
   * Body param
   */
  models?: Array<unknown> | null;

  /**
   * Body param
   */
  permissions?: unknown | null;

  /**
   * Body param
   */
  rpm_limit?: number | null;

  /**
   * Body param
   */
  send_invite_email?: boolean | null;

  /**
   * Body param
   */
  soft_budget?: number | null;

  /**
   * Body param
   */
  spend?: number | null;

  /**
   * Body param
   */
  tags?: Array<string> | null;

  /**
   * Body param
   */
  team_id?: string | null;

  /**
   * Body param
   */
  tpm_limit?: number | null;

  /**
   * Body param
   */
  user_id?: string | null;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface KeyRegenerateByKeyParams {
  /**
   * Body param
   */
  aliases?: unknown | null;

  /**
   * Body param
   */
  allowed_cache_controls?: Array<unknown> | null;

  /**
   * Body param
   */
  blocked?: boolean | null;

  /**
   * Body param
   */
  budget_duration?: string | null;

  /**
   * Body param
   */
  budget_id?: string | null;

  /**
   * Body param
   */
  config?: unknown | null;

  /**
   * Body param
   */
  duration?: string | null;

  /**
   * Body param
   */
  enforced_params?: Array<string> | null;

  /**
   * Body param
   */
  guardrails?: Array<string> | null;

  /**
   * Body param
   */
  body_key?: string | null;

  /**
   * Body param
   */
  key_alias?: string | null;

  /**
   * Body param
   */
  max_budget?: number | null;

  /**
   * Body param
   */
  max_parallel_requests?: number | null;

  /**
   * Body param
   */
  metadata?: unknown | null;

  /**
   * Body param
   */
  model_max_budget?: unknown | null;

  /**
   * Body param
   */
  model_rpm_limit?: unknown | null;

  /**
   * Body param
   */
  model_tpm_limit?: unknown | null;

  /**
   * Body param
   */
  models?: Array<unknown> | null;

  /**
   * Body param
   */
  new_master_key?: string | null;

  /**
   * Body param
   */
  permissions?: unknown | null;

  /**
   * Body param
   */
  rpm_limit?: number | null;

  /**
   * Body param
   */
  send_invite_email?: boolean | null;

  /**
   * Body param
   */
  soft_budget?: number | null;

  /**
   * Body param
   */
  spend?: number | null;

  /**
   * Body param
   */
  tags?: Array<string> | null;

  /**
   * Body param
   */
  team_id?: string | null;

  /**
   * Body param
   */
  tpm_limit?: number | null;

  /**
   * Body param
   */
  user_id?: string | null;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface KeyRetrieveInfoParams {
  /**
   * Key in the request parameters
   */
  key?: string | null;
}

export interface KeyUnblockParams {
  /**
   * Body param
   */
  key: string;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

Key.Regenerate = Regenerate;

export declare namespace Key {
  export {
    type BlockKeyRequest as BlockKeyRequest,
    type GenerateKeyResponse as GenerateKeyResponse,
    type KeyUpdateResponse as KeyUpdateResponse,
    type KeyListResponse as KeyListResponse,
    type KeyDeleteResponse as KeyDeleteResponse,
    type KeyBlockResponse as KeyBlockResponse,
    type KeyCheckHealthResponse as KeyCheckHealthResponse,
    type KeyRetrieveInfoResponse as KeyRetrieveInfoResponse,
    type KeyUnblockResponse as KeyUnblockResponse,
    type KeyUpdateParams as KeyUpdateParams,
    type KeyListParams as KeyListParams,
    type KeyDeleteParams as KeyDeleteParams,
    type KeyBlockParams as KeyBlockParams,
    type KeyGenerateParams as KeyGenerateParams,
    type KeyRegenerateByKeyParams as KeyRegenerateByKeyParams,
    type KeyRetrieveInfoParams as KeyRetrieveInfoParams,
    type KeyUnblockParams as KeyUnblockParams,
  };

  export { Regenerate as Regenerate, type RegenerateKeyRequest as RegenerateKeyRequest };
}
