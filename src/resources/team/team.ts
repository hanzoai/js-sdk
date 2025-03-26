// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
   * [Detailed Doc on setting team budgets](https://docs.llm.ai/docs/proxy/team_budgets)
   *
   * Parameters:
   *
   * - team_alias: Optional[str] - User defined team alias
   * - team_id: Optional[str] - The team id of the user. If none passed, we'll
   *   generate it.
   * - members_with_roles: List[{"role": "admin" or "user", "user_id":
   *   "<user-id>"}] - A list of users and their roles in the team. Get user_id when
   *   making a new user via `/user/new`.
   * - metadata: Optional[dict] - Metadata for team, store information for team.
   *   Example metadata = {"extra_info": "some info"}
   * - tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team -
   *   all keys with this team_id will have at max this TPM limit
   * - rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team -
   *   all keys associated with this team_id will have at max this RPM limit
   * - max_budget: Optional[float] - The maximum budget allocated to the team - all
   *   keys for this team_id will have at max this max_budget
   * - budget_duration: Optional[str] - The duration of the budget for the team. Doc
   *   [here](https://docs.llm.ai/docs/proxy/team_budgets)
   * - models: Optional[list] - A list of models associated with the team - all keys
   *   for this team_id will have at most, these models. If empty, assumes all models
   *   are allowed.
   * - blocked: bool - Flag indicating if the team is blocked or not - will stop all
   *   calls from keys with this team_id.
   * - members: Optional[List] - Control team members via `/team/member/add` and
   *   `/team/member/delete`.
   * - tags: Optional[List[str]] - Tags for
   *   [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags)
   *   and/or doing
   *   [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
   * - organization_id: Optional[str] - The organization id of the team. Default is
   *   None. Create via `/organization/new`.
   * - model_aliases: Optional[dict] - Model aliases for the team.
   *   [Docs](https://docs.llm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
   * - guardrails: Optional[List[str]] - Guardrails for the team.
   *   [Docs](https://docs.llm.ai/docs/proxy/guardrails) Returns:
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
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/team/new', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
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
   * - metadata: Optional[dict] - Metadata for team, store information for team.
   *   Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai"
   *   }
   * - tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team -
   *   all keys with this team_id will have at max this TPM limit
   * - rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team -
   *   all keys associated with this team_id will have at max this RPM limit
   * - max_budget: Optional[float] - The maximum budget allocated to the team - all
   *   keys for this team_id will have at max this max_budget
   * - budget_duration: Optional[str] - The duration of the budget for the team. Doc
   *   [here](https://docs.llm.ai/docs/proxy/team_budgets)
   * - models: Optional[list] - A list of models associated with the team - all keys
   *   for this team_id will have at most, these models. If empty, assumes all models
   *   are allowed.
   * - blocked: bool - Flag indicating if the team is blocked or not - will stop all
   *   calls from keys with this team_id.
   * - tags: Optional[List[str]] - Tags for
   *   [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags)
   *   and/or doing
   *   [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
   * - organization_id: Optional[str] - The organization id of the team. Default is
   *   None. Create via `/organization/new`.
   * - model_aliases: Optional[dict] - Model aliases for the team.
   *   [Docs](https://docs.llm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
   * - guardrails: Optional[List[str]] - Guardrails for the team.
   *   [Docs](https://docs.llm.ai/docs/proxy/guardrails) Example - update team TPM
   *   Limit
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
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/team/update', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
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
    const { 'llm-changed-by': llmChangedBy, ...body } = params;
    return this._client.post('/team/delete', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(llmChangedBy != null ? { 'llm-changed-by': llmChangedBy } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * [BETA]
   *
   * Add new members (either via user_email or user_id) to a team
   *
   * If user doesn't exist, new user row will also be added to User Table
   *
   * Only proxy_admin or admin of team, allowed to access this endpoint.
   *
   * ```
   *
   * curl -X POST 'http://0.0.0.0:4000/team/member_add'     -H 'Authorization: Bearer sk-1234'     -H 'Content-Type: application/json'     -d '{"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849", "member": {"role": "user", "user_id": "dev247652@hanzo.ai"}}'
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
   *     "user_id": "dev247652@hanzo.ai"
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
  role: 'admin' | 'user';

  user_email?: string | null;

  user_id?: string | null;
}

export interface TeamCreateResponse {
  team_id: string;

  admins?: Array<unknown>;

  blocked?: boolean;

  budget_duration?: string | null;

  budget_reset_at?: string | null;

  created_at?: string | null;

  llm_model_table?: TeamCreateResponse.LlmModelTable | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  members?: Array<unknown>;

  members_with_roles?: Array<Member>;

  metadata?: unknown | null;

  model_id?: number | null;

  models?: Array<unknown>;

  organization_id?: string | null;

  rpm_limit?: number | null;

  spend?: number | null;

  team_alias?: string | null;

  tpm_limit?: number | null;
}

export namespace TeamCreateResponse {
  export interface LlmModelTable {
    created_by: string;

    updated_by: string;

    model_aliases?: unknown | string | null;
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

  llm_model_table?: TeamAddMemberResponse.LlmModelTable | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  members?: Array<unknown>;

  members_with_roles?: Array<Member>;

  metadata?: unknown | null;

  model_id?: number | null;

  models?: Array<unknown>;

  organization_id?: string | null;

  rpm_limit?: number | null;

  spend?: number | null;

  team_alias?: string | null;

  tpm_limit?: number | null;
}

export namespace TeamAddMemberResponse {
  export interface UpdatedTeamMembership {
    budget_id: string;

    /**
     * Represents user-controllable params for a LLM_BudgetTable record
     */
    llm_budget_table: UpdatedTeamMembership.LlmBudgetTable | null;

    team_id: string;

    user_id: string;
  }

  export namespace UpdatedTeamMembership {
    /**
     * Represents user-controllable params for a LLM_BudgetTable record
     */
    export interface LlmBudgetTable {
      budget_duration?: string | null;

      max_budget?: number | null;

      max_parallel_requests?: number | null;

      model_max_budget?: unknown | null;

      rpm_limit?: number | null;

      soft_budget?: number | null;

      tpm_limit?: number | null;
    }
  }

  export interface UpdatedUser {
    user_id: string;

    budget_duration?: string | null;

    budget_reset_at?: string | null;

    max_budget?: number | null;

    metadata?: unknown | null;

    model_max_budget?: unknown | null;

    model_spend?: unknown | null;

    models?: Array<unknown>;

    organization_memberships?: Array<UpdatedUser.OrganizationMembership> | null;

    rpm_limit?: number | null;

    spend?: number;

    sso_user_id?: string | null;

    teams?: Array<string>;

    tpm_limit?: number | null;

    user_email?: string | null;

    user_role?: string | null;
  }

  export namespace UpdatedUser {
    /**
     * This is the table that track what organizations a user belongs to and users
     * spend within the organization
     */
    export interface OrganizationMembership {
      created_at: string;

      organization_id: string;

      updated_at: string;

      user_id: string;

      budget_id?: string | null;

      /**
       * Represents user-controllable params for a LLM_BudgetTable record
       */
      llm_budget_table?: OrganizationMembership.LlmBudgetTable | null;

      spend?: number;

      user?: unknown;

      user_role?: string | null;
    }

    export namespace OrganizationMembership {
      /**
       * Represents user-controllable params for a LLM_BudgetTable record
       */
      export interface LlmBudgetTable {
        budget_duration?: string | null;

        max_budget?: number | null;

        max_parallel_requests?: number | null;

        model_max_budget?: unknown | null;

        rpm_limit?: number | null;

        soft_budget?: number | null;

        tpm_limit?: number | null;
      }
    }
  }

  export interface LlmModelTable {
    created_by: string;

    updated_by: string;

    model_aliases?: unknown | string | null;
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

  user_email?: string | null;
}

export interface TeamCreateParams {
  /**
   * Body param:
   */
  admins?: Array<unknown>;

  /**
   * Body param:
   */
  blocked?: boolean;

  /**
   * Body param:
   */
  budget_duration?: string | null;

  /**
   * Body param:
   */
  guardrails?: Array<string> | null;

  /**
   * Body param:
   */
  max_budget?: number | null;

  /**
   * Body param:
   */
  members?: Array<unknown>;

  /**
   * Body param:
   */
  members_with_roles?: Array<Member>;

  /**
   * Body param:
   */
  metadata?: unknown | null;

  /**
   * Body param:
   */
  model_aliases?: unknown | null;

  /**
   * Body param:
   */
  models?: Array<unknown>;

  /**
   * Body param:
   */
  organization_id?: string | null;

  /**
   * Body param:
   */
  rpm_limit?: number | null;

  /**
   * Body param:
   */
  tags?: Array<unknown> | null;

  /**
   * Body param:
   */
  team_alias?: string | null;

  /**
   * Body param:
   */
  team_id?: string | null;

  /**
   * Body param:
   */
  tpm_limit?: number | null;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface TeamUpdateParams {
  /**
   * Body param:
   */
  team_id: string;

  /**
   * Body param:
   */
  blocked?: boolean | null;

  /**
   * Body param:
   */
  budget_duration?: string | null;

  /**
   * Body param:
   */
  guardrails?: Array<string> | null;

  /**
   * Body param:
   */
  max_budget?: number | null;

  /**
   * Body param:
   */
  metadata?: unknown | null;

  /**
   * Body param:
   */
  model_aliases?: unknown | null;

  /**
   * Body param:
   */
  models?: Array<unknown> | null;

  /**
   * Body param:
   */
  organization_id?: string | null;

  /**
   * Body param:
   */
  rpm_limit?: number | null;

  /**
   * Body param:
   */
  tags?: Array<unknown> | null;

  /**
   * Body param:
   */
  team_alias?: string | null;

  /**
   * Body param:
   */
  tpm_limit?: number | null;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
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
   * Body param:
   */
  team_ids: Array<string>;

  /**
   * Header param: The llm-changed-by header enables tracking of actions performed by
   * authorized users on behalf of other users, providing an audit trail for
   * accountability
   */
  'llm-changed-by'?: string;
}

export interface TeamAddMemberParams {
  member: Array<Member> | Member;

  team_id: string;

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
