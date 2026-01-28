// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrganizationAPI from '../organization/organization';
import * as CallbackAPI from './callback';
import { Callback, CallbackAddParams, CallbackAddResponse, CallbackRetrieveResponse } from './callback';
import * as ModelAPI from './model';
import { Model, ModelAddParams, ModelAddResponse, ModelRemoveParams, ModelRemoveResponse } from './model';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Team extends APIResource {
  model: ModelAPI.Model = new ModelAPI.Model(this._client);
  callback: CallbackAPI.Callback = new CallbackAPI.Callback(this._client);

  /**
   * Allow users to create a new team. Apply user permissions to their team.
   *
   * 👉
   * [Detailed Doc on setting team budgets](https://docs.litellm.ai/docs/proxy/team_budgets)
   *
   * Parameters:
   *
   * - team_alias: Optional[str] - User defined team alias
   * - team_id: Optional[str] - The team id of the user. If none passed, we'll
   *   generate it.
   * - members_with_roles: List[{"role": "admin" or "user", "user_id":
   *   "<user-id>"}] - A list of users and their roles in the team. Get user_id when
   *   making a new user via `/user/new`.
   * - team_member_permissions: Optional[List[str]] - A list of routes that non-admin
   *   team members can access. example: ["/key/generate", "/key/update",
   *   "/key/delete"]
   * - metadata: Optional[dict] - Metadata for team, store information for team.
   *   Example metadata = {"extra_info": "some info"}
   * - model_rpm_limit: Optional[Dict[str, int]] - The RPM (Requests Per Minute)
   *   limit for this team - applied across all keys for this team.
   * - model_tpm_limit: Optional[Dict[str, int]] - The TPM (Tokens Per Minute) limit
   *   for this team - applied across all keys for this team.
   * - tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team -
   *   all keys with this team_id will have at max this TPM limit
   * - rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team -
   *   all keys associated with this team_id will have at max this RPM limit
   * - rpm_limit_type: Optional[Literal["guaranteed_throughput",
   *   "best_effort_throughput"]] - The type of RPM limit enforcement. Use
   *   "guaranteed_throughput" to raise an error if overallocating RPM, or
   *   "best_effort_throughput" for best effort enforcement.
   * - tpm_limit_type: Optional[Literal["guaranteed_throughput",
   *   "best_effort_throughput"]] - The type of TPM limit enforcement. Use
   *   "guaranteed_throughput" to raise an error if overallocating TPM, or
   *   "best_effort_throughput" for best effort enforcement.
   * - max_budget: Optional[float] - The maximum budget allocated to the team - all
   *   keys for this team_id will have at max this max_budget
   * - budget_duration: Optional[str] - The duration of the budget for the team. Doc
   *   [here](https://docs.litellm.ai/docs/proxy/team_budgets)
   * - models: Optional[list] - A list of models associated with the team - all keys
   *   for this team_id will have at most, these models. If empty, assumes all models
   *   are allowed.
   * - blocked: bool - Flag indicating if the team is blocked or not - will stop all
   *   calls from keys with this team_id.
   * - members: Optional[List] - Control team members via `/team/member/add` and
   *   `/team/member/delete`.
   * - tags: Optional[List[str]] - Tags for
   *   [tracking spend](https://litellm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags)
   *   and/or doing
   *   [tag-based routing](https://litellm.vercel.app/docs/proxy/tag_routing).
   * - prompts: Optional[List[str]] - List of prompts that the team is allowed to
   *   use.
   * - organization_id: Optional[str] - The organization id of the team. Default is
   *   None. Create via `/organization/new`.
   * - model_aliases: Optional[dict] - Model aliases for the team.
   *   [Docs](https://docs.litellm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
   * - guardrails: Optional[List[str]] - Guardrails for the team.
   *   [Docs](https://docs.litellm.ai/docs/proxy/guardrails)
   * - disable_global_guardrails: Optional[bool] - Whether to disable global
   *   guardrails for the key.
   * - object_permission: Optional[LiteLLM_ObjectPermissionBase] - team-specific
   *   object permission. Example - {"vector_stores": ["vector_store_1",
   *   "vector_store_2"], "agents": ["agent_1", "agent_2"], "agent_access_groups":
   *   ["dev_group"]}. IF null or {} then no object permission.
   * - team_member_budget: Optional[float] - The maximum budget allocated to an
   *   individual team member.
   * - team_member_rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for
   *   individual team members.
   * - team_member_tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for
   *   individual team members.
   * - team_member_key_duration: Optional[str] - The duration for a team member's
   *   key. e.g. "1d", "1w", "1mo"
   * - allowed_passthrough_routes: Optional[List[str]] - List of allowed pass through
   *   routes for the team.
   * - allowed_vector_store_indexes: Optional[List[dict]] - List of allowed vector
   *   store indexes for the key. Example - [{"index_name": "my-index",
   *   "index_permissions": ["write", "read"]}]. If specified, the key will only be
   *   able to use these specific vector store indexes. Create index, using
   *   `/v1/indexes` endpoint.
   * - secret_manager_settings: Optional[dict] - Secret manager settings for the
   *   team. [Docs](https://docs.litellm.ai/docs/secret_managers/overview)
   * - router_settings: Optional[UpdateRouterConfig] - team-specific router settings.
   *   Example - {"model_group_retry_policy": {"max_retries": 5}}. IF null or {} then
   *   no router settings.
   *
   * Returns:
   *
   * - team_id: (str) Unique team id - used for tracking spend across multiple keys
   *   for same team id.
   *
   * \_deprecated_params:
   *
   * - admins: list - A list of user_id's for the admin role
   * - users: list - A list of user_id's for the user role
   *
   * Example Request:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/new'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *   "team_alias": "my-new-team_2",
   *   "members_with_roles": [{"role": "admin", "user_id": "user-1234"},
   *     {"role": "user", "user_id": "user-2434"}]
   * }'
   *
   * ```
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/new'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *            "team_alias": "QA Prod Bot",
   *            "max_budget": 0.000000001,
   *            "budget_duration": "1d"
   *        }'
   * ```
   */
  create(params: TeamCreateParams, options?: RequestOptions): APIPromise<TeamCreateResponse> {
    const { 'litellm-changed-by': litellmChangedBy, ...body } = params;
    return this._client.post('/team/new', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(litellmChangedBy != null ? { 'litellm-changed-by': litellmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Use `/team/member_add` AND `/team/member/delete` to add/remove new team members
   *
   * You can now update team budget / rate limits via /team/update
   *
   * Parameters:
   *
   * - team_id: str - The team id of the user. Required param.
   * - team_alias: Optional[str] - User defined team alias
   * - team_member_permissions: Optional[List[str]] - A list of routes that non-admin
   *   team members can access. example: ["/key/generate", "/key/update",
   *   "/key/delete"]
   * - metadata: Optional[dict] - Metadata for team, store information for team.
   *   Example metadata = {"team": "core-infra", "app": "app2", "email":
   *   "ishaan@berri.ai" }
   * - tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team -
   *   all keys with this team_id will have at max this TPM limit
   * - rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team -
   *   all keys associated with this team_id will have at max this RPM limit
   * - max_budget: Optional[float] - The maximum budget allocated to the team - all
   *   keys for this team_id will have at max this max_budget
   * - budget_duration: Optional[str] - The duration of the budget for the team. Doc
   *   [here](https://docs.litellm.ai/docs/proxy/team_budgets)
   * - models: Optional[list] - A list of models associated with the team - all keys
   *   for this team_id will have at most, these models. If empty, assumes all models
   *   are allowed.
   * - prompts: Optional[List[str]] - List of prompts that the team is allowed to
   *   use.
   * - blocked: bool - Flag indicating if the team is blocked or not - will stop all
   *   calls from keys with this team_id.
   * - tags: Optional[List[str]] - Tags for
   *   [tracking spend](https://litellm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags)
   *   and/or doing
   *   [tag-based routing](https://litellm.vercel.app/docs/proxy/tag_routing).
   * - organization_id: Optional[str] - The organization id of the team. Default is
   *   None. Create via `/organization/new`.
   * - model_aliases: Optional[dict] - Model aliases for the team.
   *   [Docs](https://docs.litellm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
   * - guardrails: Optional[List[str]] - Guardrails for the team.
   *   [Docs](https://docs.litellm.ai/docs/proxy/guardrails)
   * - disable_global_guardrails: Optional[bool] - Whether to disable global
   *   guardrails for the key.
   * - object_permission: Optional[LiteLLM_ObjectPermissionBase] - team-specific
   *   object permission. Example - {"vector_stores": ["vector_store_1",
   *   "vector_store_2"], "agents": ["agent_1", "agent_2"], "agent_access_groups":
   *   ["dev_group"]}. IF null or {} then no object permission.
   * - team_member_budget: Optional[float] - The maximum budget allocated to an
   *   individual team member.
   * - team_member_budget_duration: Optional[str] - The duration of the budget for
   *   the team member. Doc [here](https://docs.litellm.ai/docs/proxy/team_budgets)
   * - team_member_rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for
   *   individual team members.
   * - team_member_tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for
   *   individual team members.
   * - team_member_key_duration: Optional[str] - The duration for a team member's
   *   key. e.g. "1d", "1w", "1mo"
   * - allowed_passthrough_routes: Optional[List[str]] - List of allowed pass through
   *   routes for the team.
   * - model_rpm_limit: Optional[Dict[str, int]] - The RPM (Requests Per Minute)
   *   limit per model for this team. Example: {"gpt-4": 100, "gpt-3.5-turbo": 200}
   * - model_tpm_limit: Optional[Dict[str, int]] - The TPM (Tokens Per Minute) limit
   *   per model for this team. Example: {"gpt-4": 10000, "gpt-3.5-turbo": 20000}
   *   Example - update team TPM Limit
   * - allowed_vector_store_indexes: Optional[List[dict]] - List of allowed vector
   *   store indexes for the key. Example - [{"index_name": "my-index",
   *   "index_permissions": ["write", "read"]}]. If specified, the key will only be
   *   able to use these specific vector store indexes. Create index, using
   *   `/v1/indexes` endpoint.
   * - secret_manager_settings: Optional[dict] - Secret manager settings for the
   *   team. [Docs](https://docs.litellm.ai/docs/secret_managers/overview)
   * - router_settings: Optional[UpdateRouterConfig] - team-specific router settings.
   *   Example - {"model_group_retry_policy": {"max_retries": 5}}. IF null or {} then
   *   no router settings.
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{
   *     "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",
   *     "tpm_limit": 100
   * }'
   * ```
   *
   * Example - Update Team `max_budget` budget
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{
   *     "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",
   *     "max_budget": 10
   * }'
   * ```
   */
  update(params: TeamUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    const { 'litellm-changed-by': litellmChangedBy, ...body } = params;
    return this._client.post('/team/update', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(litellmChangedBy != null ? { 'litellm-changed-by': litellmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * ```
   * curl --location --request GET 'http://0.0.0.0:4000/team/list'         --header 'Authorization: Bearer sk-1234'
   * ```
   *
   * Parameters:
   *
   * - user_id: str - Optional. If passed will only return teams that the user_id is
   *   a member of.
   * - organization_id: str - Optional. If passed will only return teams that belong
   *   to the organization_id. Pass 'default_organization' to get all teams without
   *   organization_id.
   */
  list(query: TeamListParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/team/list', { query, ...options });
  }

  /**
   * delete team and associated team keys
   *
   * Parameters:
   *
   * - team_ids: List[str] - Required. List of team IDs to delete. Example:
   *   ["team-1234", "team-5678"]
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{
   *     "team_ids": ["8d916b1c-510d-4894-a334-1c16a93344f5"]
   * }'
   * ```
   */
  delete(params: TeamDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    const { 'litellm-changed-by': litellmChangedBy, ...body } = params;
    return this._client.post('/team/delete', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(litellmChangedBy != null ? { 'litellm-changed-by': litellmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Add new members (either via user_email or user_id) to a team
   *
   * If user doesn't exist, new user row will also be added to User Table
   *
   * Only proxy_admin or admin of team, allowed to access this endpoint.
   *
   * ```
   *
   * curl -X POST 'http://0.0.0.0:4000/team/member_add'     -H 'Authorization: Bearer sk-1234'     -H 'Content-Type: application/json'     -d '{"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849", "member": {"role": "user", "user_id": "krrish247652@berri.ai"}}'
   *
   * ```
   */
  addMember(body: TeamAddMemberParams, options?: RequestOptions): APIPromise<TeamAddMemberResponse> {
    return this._client.post('/team/member_add', { body, ...options });
  }

  /**
   * Blocks all calls from keys with this team id.
   *
   * Parameters:
   *
   * - team_id: str - Required. The unique identifier of the team to block.
   *
   * Example:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "team_id": "team-1234"
   * }'
   * ```
   *
   * Returns:
   *
   * - The updated team record with blocked=True
   */
  block(body: TeamBlockParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/team/block', { body, ...options });
  }

  /**
   * Disable all logging callbacks for a team
   *
   * Parameters:
   *
   * - team_id (str, required): The unique identifier for the team
   *
   * Example curl:
   *
   * ```
   * curl -X POST 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/disable_logging'         -H 'Authorization: Bearer sk-1234'
   * ```
   */
  disableLogging(teamID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/team/${teamID}/disable_logging`, options);
  }

  /**
   * List Available Teams
   */
  listAvailable(
    query: TeamListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/team/available', { query, ...options });
  }

  /**
   * [BETA]
   *
   * delete members (either via user_email or user_id) from a team
   *
   * If user doesn't exist, an exception will be raised
   *
   * ```
   * curl -X POST 'http://0.0.0.0:8000/team/member_delete'
   * -H 'Authorization: Bearer sk-1234'
   * -H 'Content-Type: application/json'
   * -d '{
   *     "team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",
   *     "user_id": "krrish247652@berri.ai"
   * }'
   * ```
   */
  removeMember(body: TeamRemoveMemberParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/team/member_delete', { body, ...options });
  }

  /**
   * get info on team + related keys
   *
   * Parameters:
   *
   * - team_id: str - Required. The unique identifier of the team to get info on.
   *
   * ```
   * curl --location 'http://localhost:4000/team/info?team_id=your_team_id_here'     --header 'Authorization: Bearer your_api_key_here'
   * ```
   */
  retrieveInfo(
    query: TeamRetrieveInfoParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/team/info', { query, ...options });
  }

  /**
   * Blocks all calls from keys with this team id.
   *
   * Parameters:
   *
   * - team_id: str - Required. The unique identifier of the team to unblock.
   *
   * Example:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "team_id": "team-1234"
   * }'
   * ```
   */
  unblock(body: TeamUnblockParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/team/unblock', { body, ...options });
  }

  /**
   * [BETA]
   *
   * Update team member budgets and team member role
   */
  updateMember(body: TeamUpdateMemberParams, options?: RequestOptions): APIPromise<TeamUpdateMemberResponse> {
    return this._client.post('/team/member_update', { body, ...options });
  }
}

export interface BlockTeamRequest {
  team_id: string;
}

export interface Member {
  /**
   * The role of the user within the team. 'admin' users can manage team settings and
   * members, 'user' is a regular team member
   */
  role: 'admin' | 'user';

  /**
   * The email address of the user to add. Either user_id or user_email must be
   * provided
   */
  user_email?: string | null;

  /**
   * The unique ID of the user to add. Either user_id or user_email must be provided
   */
  user_id?: string | null;
}

export interface TeamCreateResponse {
  team_id: string;

  admins?: Array<unknown>;

  blocked?: boolean;

  budget_duration?: string | null;

  budget_reset_at?: string | null;

  created_at?: string | null;

  litellm_model_table?: unknown;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  members?: Array<unknown>;

  members_with_roles?: Array<Member>;

  metadata?: { [key: string]: unknown } | null;

  model_id?: number | null;

  models?: Array<unknown>;

  /**
   * Represents a LiteLLM_ObjectPermissionTable record
   */
  object_permission?: TeamCreateResponse.ObjectPermission | null;

  object_permission_id?: string | null;

  organization_id?: string | null;

  router_settings?: { [key: string]: unknown } | null;

  rpm_limit?: number | null;

  spend?: number | null;

  team_alias?: string | null;

  team_member_permissions?: Array<string> | null;

  tpm_limit?: number | null;

  updated_at?: string | null;
}

export namespace TeamCreateResponse {
  /**
   * Represents a LiteLLM_ObjectPermissionTable record
   */
  export interface ObjectPermission {
    object_permission_id: string;

    agent_access_groups?: Array<string> | null;

    agents?: Array<string> | null;

    mcp_access_groups?: Array<string> | null;

    mcp_servers?: Array<string> | null;

    mcp_tool_permissions?: { [key: string]: Array<string> } | null;

    vector_stores?: Array<string> | null;
  }
}

export type TeamUpdateResponse = unknown;

export type TeamListResponse = unknown;

export type TeamDeleteResponse = unknown;

export interface TeamAddMemberResponse {
  team_id: string;

  updated_team_memberships: Array<TeamAddMemberResponse.UpdatedTeamMembership>;

  updated_users: Array<TeamAddMemberResponse.UpdatedUser>;

  admins?: Array<unknown>;

  blocked?: boolean;

  budget_duration?: string | null;

  budget_reset_at?: string | null;

  created_at?: string | null;

  litellm_model_table?: TeamAddMemberResponse.LitellmModelTable | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  members?: Array<unknown>;

  members_with_roles?: Array<Member>;

  metadata?: { [key: string]: unknown } | null;

  model_id?: number | null;

  models?: Array<unknown>;

  /**
   * Represents a LiteLLM_ObjectPermissionTable record
   */
  object_permission?: TeamAddMemberResponse.ObjectPermission | null;

  object_permission_id?: string | null;

  organization_id?: string | null;

  router_settings?: { [key: string]: unknown } | null;

  rpm_limit?: number | null;

  spend?: number | null;

  team_alias?: string | null;

  team_member_permissions?: Array<string> | null;

  tpm_limit?: number | null;

  updated_at?: string | null;
}

export namespace TeamAddMemberResponse {
  export interface UpdatedTeamMembership {
    /**
     * Represents user-controllable params for a LiteLLM_BudgetTable record
     */
    litellm_budget_table: OrganizationAPI.BudgetTable | null;

    team_id: string;

    user_id: string;

    budget_id?: string | null;

    spend?: number | null;
  }

  export interface UpdatedUser {
    user_id: string;

    budget_duration?: string | null;

    budget_reset_at?: string | null;

    created_at?: string | null;

    max_budget?: number | null;

    metadata?: { [key: string]: unknown } | null;

    model_max_budget?: { [key: string]: unknown } | null;

    model_spend?: { [key: string]: unknown } | null;

    models?: Array<unknown>;

    /**
     * Represents a LiteLLM_ObjectPermissionTable record
     */
    object_permission?: UpdatedUser.ObjectPermission | null;

    organization_memberships?: Array<OrganizationAPI.OrganizationMembershipTable> | null;

    rpm_limit?: number | null;

    spend?: number;

    sso_user_id?: string | null;

    teams?: Array<string>;

    tpm_limit?: number | null;

    updated_at?: string | null;

    user_alias?: string | null;

    user_email?: string | null;

    user_role?: string | null;
  }

  export namespace UpdatedUser {
    /**
     * Represents a LiteLLM_ObjectPermissionTable record
     */
    export interface ObjectPermission {
      object_permission_id: string;

      agent_access_groups?: Array<string> | null;

      agents?: Array<string> | null;

      mcp_access_groups?: Array<string> | null;

      mcp_servers?: Array<string> | null;

      mcp_tool_permissions?: { [key: string]: Array<string> } | null;

      vector_stores?: Array<string> | null;
    }
  }

  export interface LitellmModelTable {
    created_by: string;

    updated_by: string;

    id?: number | null;

    model_aliases?: { [key: string]: unknown } | string | null;

    team?: unknown;
  }

  /**
   * Represents a LiteLLM_ObjectPermissionTable record
   */
  export interface ObjectPermission {
    object_permission_id: string;

    agent_access_groups?: Array<string> | null;

    agents?: Array<string> | null;

    mcp_access_groups?: Array<string> | null;

    mcp_servers?: Array<string> | null;

    mcp_tool_permissions?: { [key: string]: Array<string> } | null;

    vector_stores?: Array<string> | null;
  }
}

export type TeamBlockResponse = unknown;

export type TeamDisableLoggingResponse = unknown;

export type TeamListAvailableResponse = unknown;

export type TeamRemoveMemberResponse = unknown;

export type TeamRetrieveInfoResponse = unknown;

export type TeamUnblockResponse = unknown;

export interface TeamUpdateMemberResponse {
  team_id: string;

  user_id: string;

  max_budget_in_team?: number | null;

  rpm_limit?: number | null;

  tpm_limit?: number | null;

  user_email?: string | null;
}

export interface TeamCreateParams {
  /**
   * Body param
   */
  admins?: Array<unknown>;

  /**
   * Body param
   */
  allowed_passthrough_routes?: Array<unknown> | null;

  /**
   * Body param
   */
  allowed_vector_store_indexes?: Array<TeamCreateParams.AllowedVectorStoreIndex> | null;

  /**
   * Body param
   */
  blocked?: boolean;

  /**
   * Body param
   */
  budget_duration?: string | null;

  /**
   * Body param
   */
  guardrails?: Array<string> | null;

  /**
   * Body param
   */
  max_budget?: number | null;

  /**
   * Body param
   */
  members?: Array<unknown>;

  /**
   * Body param
   */
  members_with_roles?: Array<Member>;

  /**
   * Body param
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  model_aliases?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  model_rpm_limit?: { [key: string]: number } | null;

  /**
   * Body param
   */
  model_tpm_limit?: { [key: string]: number } | null;

  /**
   * Body param
   */
  models?: Array<unknown>;

  /**
   * Body param
   */
  object_permission?: TeamCreateParams.ObjectPermission | null;

  /**
   * Body param
   */
  organization_id?: string | null;

  /**
   * Body param
   */
  prompts?: Array<string> | null;

  /**
   * Body param
   */
  router_settings?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  rpm_limit?: number | null;

  /**
   * Body param
   */
  rpm_limit_type?: 'guaranteed_throughput' | 'best_effort_throughput' | null;

  /**
   * Body param
   */
  secret_manager_settings?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  tags?: Array<unknown> | null;

  /**
   * Body param
   */
  team_alias?: string | null;

  /**
   * Body param
   */
  team_id?: string | null;

  /**
   * Body param
   */
  team_member_budget?: number | null;

  /**
   * Body param
   */
  team_member_key_duration?: string | null;

  /**
   * Body param
   */
  team_member_permissions?: Array<string> | null;

  /**
   * Body param
   */
  team_member_rpm_limit?: number | null;

  /**
   * Body param
   */
  team_member_tpm_limit?: number | null;

  /**
   * Body param
   */
  tpm_limit?: number | null;

  /**
   * Body param
   */
  tpm_limit_type?: 'guaranteed_throughput' | 'best_effort_throughput' | null;

  /**
   * Header param: The litellm-changed-by header enables tracking of actions
   * performed by authorized users on behalf of other users, providing an audit trail
   * for accountability
   */
  'litellm-changed-by'?: string;
}

export namespace TeamCreateParams {
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
}

export interface TeamUpdateParams {
  /**
   * Body param
   */
  team_id: string;

  /**
   * Body param
   */
  allowed_passthrough_routes?: Array<unknown> | null;

  /**
   * Body param
   */
  allowed_vector_store_indexes?: Array<TeamUpdateParams.AllowedVectorStoreIndex> | null;

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
  guardrails?: Array<string> | null;

  /**
   * Body param
   */
  max_budget?: number | null;

  /**
   * Body param
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  model_aliases?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  model_rpm_limit?: { [key: string]: number } | null;

  /**
   * Body param
   */
  model_tpm_limit?: { [key: string]: number } | null;

  /**
   * Body param
   */
  models?: Array<unknown> | null;

  /**
   * Body param
   */
  object_permission?: TeamUpdateParams.ObjectPermission | null;

  /**
   * Body param
   */
  organization_id?: string | null;

  /**
   * Body param
   */
  prompts?: Array<string> | null;

  /**
   * Body param
   */
  router_settings?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  rpm_limit?: number | null;

  /**
   * Body param
   */
  secret_manager_settings?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  tags?: Array<unknown> | null;

  /**
   * Body param
   */
  team_alias?: string | null;

  /**
   * Body param
   */
  team_member_budget?: number | null;

  /**
   * Body param
   */
  team_member_budget_duration?: string | null;

  /**
   * Body param
   */
  team_member_key_duration?: string | null;

  /**
   * Body param
   */
  team_member_rpm_limit?: number | null;

  /**
   * Body param
   */
  team_member_tpm_limit?: number | null;

  /**
   * Body param
   */
  tpm_limit?: number | null;

  /**
   * Header param: The litellm-changed-by header enables tracking of actions
   * performed by authorized users on behalf of other users, providing an audit trail
   * for accountability
   */
  'litellm-changed-by'?: string;
}

export namespace TeamUpdateParams {
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
}

export interface TeamListParams {
  organization_id?: string | null;

  /**
   * Only return teams which this 'user_id' belongs to
   */
  user_id?: string | null;
}

export interface TeamDeleteParams {
  /**
   * Body param
   */
  team_ids: Array<string>;

  /**
   * Header param: The litellm-changed-by header enables tracking of actions
   * performed by authorized users on behalf of other users, providing an audit trail
   * for accountability
   */
  'litellm-changed-by'?: string;
}

export interface TeamAddMemberParams {
  /**
   * Member object or list of member objects to add. Each member must include either
   * user_id or user_email, and a role
   */
  member: Array<Member> | Member;

  /**
   * The ID of the team to add the member to
   */
  team_id: string;

  /**
   * Maximum budget allocated to this user within the team. If not set, user has
   * unlimited budget within team limits
   */
  max_budget_in_team?: number | null;
}

export interface TeamBlockParams {
  team_id: string;
}

export interface TeamListAvailableParams {
  response_model?: unknown;
}

export interface TeamRemoveMemberParams {
  team_id: string;

  user_email?: string | null;

  user_id?: string | null;
}

export interface TeamRetrieveInfoParams {
  /**
   * Team ID in the request parameters
   */
  team_id?: string;
}

export interface TeamUnblockParams {
  team_id: string;
}

export interface TeamUpdateMemberParams {
  team_id: string;

  max_budget_in_team?: number | null;

  role?: 'admin' | 'user' | null;

  /**
   * Requests per minute limit for this team member
   */
  rpm_limit?: number | null;

  /**
   * Tokens per minute limit for this team member
   */
  tpm_limit?: number | null;

  user_email?: string | null;

  user_id?: string | null;
}

Team.Model = Model;
Team.Callback = Callback;

export declare namespace Team {
  export {
    type BlockTeamRequest as BlockTeamRequest,
    type Member as Member,
    type TeamCreateResponse as TeamCreateResponse,
    type TeamUpdateResponse as TeamUpdateResponse,
    type TeamListResponse as TeamListResponse,
    type TeamDeleteResponse as TeamDeleteResponse,
    type TeamAddMemberResponse as TeamAddMemberResponse,
    type TeamBlockResponse as TeamBlockResponse,
    type TeamDisableLoggingResponse as TeamDisableLoggingResponse,
    type TeamListAvailableResponse as TeamListAvailableResponse,
    type TeamRemoveMemberResponse as TeamRemoveMemberResponse,
    type TeamRetrieveInfoResponse as TeamRetrieveInfoResponse,
    type TeamUnblockResponse as TeamUnblockResponse,
    type TeamUpdateMemberResponse as TeamUpdateMemberResponse,
    type TeamCreateParams as TeamCreateParams,
    type TeamUpdateParams as TeamUpdateParams,
    type TeamListParams as TeamListParams,
    type TeamDeleteParams as TeamDeleteParams,
    type TeamAddMemberParams as TeamAddMemberParams,
    type TeamBlockParams as TeamBlockParams,
    type TeamListAvailableParams as TeamListAvailableParams,
    type TeamRemoveMemberParams as TeamRemoveMemberParams,
    type TeamRetrieveInfoParams as TeamRetrieveInfoParams,
    type TeamUnblockParams as TeamUnblockParams,
    type TeamUpdateMemberParams as TeamUpdateMemberParams,
  };

  export {
    Model as Model,
    type ModelAddResponse as ModelAddResponse,
    type ModelRemoveResponse as ModelRemoveResponse,
    type ModelAddParams as ModelAddParams,
    type ModelRemoveParams as ModelRemoveParams,
  };

  export {
    Callback as Callback,
    type CallbackRetrieveResponse as CallbackRetrieveResponse,
    type CallbackAddResponse as CallbackAddResponse,
    type CallbackAddParams as CallbackAddParams,
  };
}
