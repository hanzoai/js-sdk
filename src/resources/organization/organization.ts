// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrganizationAPI from './organization';
import * as InfoAPI from './info';
import { Info, InfoDeprecatedParams, InfoDeprecatedResponse, InfoRetrieveParams } from './info';
import * as TeamAPI from '../team/team';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Organization extends APIResource {
  info: InfoAPI.Info = new InfoAPI.Info(this._client);

  /**
   * Allow orgs to own teams
   *
   * Set org level budgets + model access.
   *
   * Only admins can create orgs.
   *
   * # Parameters
   *
   * - organization_alias: _str_ - The name of the organization.
   * - models: _List_ - The models the organization has access to.
   * - budget_id: _Optional[str]_ - The id for a budget (tpm/rpm/max budget) for the
   *   organization.
   *
   * ### IF NO BUDGET ID - CREATE ONE WITH THESE PARAMS
   *
   * - max_budget: _Optional[float]_ - Max budget for org
   * - tpm_limit: _Optional[int]_ - Max tpm limit for org
   * - rpm_limit: _Optional[int]_ - Max rpm limit for org
   * - model_rpm_limit: _Optional[Dict[str, int]]_ - The RPM (Requests Per Minute)
   *   limit per model for this organization.
   * - model_tpm_limit: _Optional[Dict[str, int]]_ - The TPM (Tokens Per Minute)
   *   limit per model for this organization.
   * - max_parallel_requests: _Optional[int]_ - [Not Implemented Yet] Max parallel
   *   requests for org
   * - soft_budget: _Optional[float]_ - [Not Implemented Yet] Get a slack alert when
   *   this soft budget is reached. Don't block requests.
   * - model_max_budget: _Optional[dict]_ - Max budget for a specific model
   * - budget_duration: _Optional[str]_ - Frequency of reseting org budget
   * - metadata: _Optional[dict]_ - Metadata for organization, store information for
   *   organization. Example metadata - {"extra_info": "some info"}
   * - blocked: _bool_ - Flag indicating if the org is blocked or not - will stop all
   *   calls from keys with this org_id.
   * - tags: _Optional[List[str]]_ - Tags for
   *   [tracking spend](https://litellm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags)
   *   and/or doing
   *   [tag-based routing](https://litellm.vercel.app/docs/proxy/tag_routing).
   * - organization_id: _Optional[str]_ - The organization id of the team. Default is
   *   None. Create via `/organization/new`.
   * - model_aliases: Optional[dict] - Model aliases for the team.
   *   [Docs](https://docs.litellm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
   * - object_permission: Optional[LiteLLM_ObjectPermissionBase] -
   *   organization-specific object permission. Example - {"vector_stores":
   *   ["vector_store_1", "vector_store_2"]}. IF null or {} then no object
   *   permission. Case 1: Create new org **without** a budget_id
   *
   * ```bash
   * curl --location 'http://0.0.0.0:4000/organization/new'
   * --header 'Authorization: Bearer sk-1234'
   * --header 'Content-Type: application/json'
   * --data '{
   *     "organization_alias": "my-secret-org",
   *     "models": ["model1", "model2"],
   *     "max_budget": 100
   * }'
   *
   *
   * ```
   *
   * Case 2: Create new org **with** a budget_id
   *
   * ```bash
   * curl --location 'http://0.0.0.0:4000/organization/new'
   * --header 'Authorization: Bearer sk-1234'
   * --header 'Content-Type: application/json'
   * --data '{
   *     "organization_alias": "my-secret-org",
   *     "models": ["model1", "model2"],
   *     "budget_id": "428eeaa8-f3ac-4e85-a8fb-7dc8d7aa8689"
   * }'
   * ```
   */
  create(body: OrganizationCreateParams, options?: RequestOptions): APIPromise<OrganizationCreateResponse> {
    return this._client.post('/organization/new', { body, ...options });
  }

  /**
   * Update an organization
   */
  update(options?: RequestOptions): APIPromise<OrganizationTableWithMembers> {
    return this._client.patch('/organization/update', options);
  }

  /**
   * Get a list of organizations with optional filtering.
   *
   * Parameters: org_id: Optional[str] Filter organizations by exact organization_id
   * match org_alias: Optional[str] Filter organizations by partial
   * organization_alias match (case-insensitive)
   *
   * Example:
   *
   * ```
   * curl --location --request GET 'http://0.0.0.0:4000/organization/list?org_alias=my-org'         --header 'Authorization: Bearer sk-1234'
   * ```
   *
   * Example with org_id:
   *
   * ```
   * curl --location --request GET 'http://0.0.0.0:4000/organization/list?org_id=123e4567-e89b-12d3-a456-426614174000'         --header 'Authorization: Bearer sk-1234'
   * ```
   */
  list(
    query: OrganizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationListResponse> {
    return this._client.get('/organization/list', { query, ...options });
  }

  /**
   * Delete an organization
   *
   * # Parameters:
   *
   * - organization_ids: List[str] - The organization ids to delete.
   */
  delete(body: OrganizationDeleteParams, options?: RequestOptions): APIPromise<OrganizationDeleteResponse> {
    return this._client.delete('/organization/delete', { body, ...options });
  }

  /**
   * [BETA]
   *
   * Add new members (either via user_email or user_id) to an organization
   *
   * If user doesn't exist, new user row will also be added to User Table
   *
   * Only proxy_admin or org_admin of organization, allowed to access this endpoint.
   *
   * # Parameters:
   *
   * - organization_id: str (required)
   * - member: Union[List[Member], Member] (required)
   *   - role: Literal[LitellmUserRoles] (required)
   *   - user_id: Optional[str]
   *   - user_email: Optional[str]
   *
   * Note: Either user_id or user_email must be provided for each member.
   *
   * Example:
   *
   * ```
   * curl -X POST 'http://0.0.0.0:4000/organization/member_add'     -H 'Authorization: Bearer sk-1234'     -H 'Content-Type: application/json'     -d '{
   *     "organization_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",
   *     "member": {
   *         "role": "internal_user",
   *         "user_id": "krrish247652@berri.ai"
   *     },
   *     "max_budget_in_organization": 100.0
   * }'
   * ```
   *
   * The following is executed in this function:
   *
   * 1. Check if organization exists
   * 2. Creates a new Internal User if the user_id or user_email is not found in
   *    LiteLLM_UserTable
   * 3. Add Internal User to the `LiteLLM_OrganizationMembership` table
   */
  addMember(
    body: OrganizationAddMemberParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationAddMemberResponse> {
    return this._client.post('/organization/member_add', { body, ...options });
  }

  /**
   * Delete a member from an organization
   */
  deleteMember(body: OrganizationDeleteMemberParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete('/organization/member_delete', { body, ...options });
  }

  /**
   * Update a member's role in an organization
   */
  updateMember(
    body: OrganizationUpdateMemberParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationMembershipTable> {
    return this._client.patch('/organization/member_update', { body, ...options });
  }
}

/**
 * Represents user-controllable params for a LiteLLM_BudgetTable record
 */
export interface BudgetTable {
  budget_duration?: string | null;

  budget_id?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  model_max_budget?: { [key: string]: unknown } | null;

  rpm_limit?: number | null;

  soft_budget?: number | null;

  tpm_limit?: number | null;
}

export interface OrgMember {
  role: 'org_admin' | 'internal_user' | 'internal_user_viewer';

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

/**
 * This is the table that track what organizations a user belongs to and users
 * spend within the organization
 */
export interface OrganizationMembershipTable {
  created_at: string;

  organization_id: string;

  updated_at: string;

  user_id: string;

  budget_id?: string | null;

  /**
   * Represents user-controllable params for a LiteLLM_BudgetTable record
   */
  litellm_budget_table?: BudgetTable | null;

  spend?: number;

  user?: unknown;

  user_role?: string | null;
}

/**
 * Returned by the /organization/info endpoint and /organization/list endpoint
 */
export interface OrganizationTableWithMembers {
  budget_id: string;

  created_at: string;

  created_by: string;

  models: Array<string>;

  updated_at: string;

  updated_by: string;

  /**
   * Represents user-controllable params for a LiteLLM_BudgetTable record
   */
  litellm_budget_table?: BudgetTable | null;

  members?: Array<OrganizationMembershipTable>;

  metadata?: { [key: string]: unknown } | null;

  /**
   * Represents a LiteLLM_ObjectPermissionTable record
   */
  object_permission?: OrganizationTableWithMembers.ObjectPermission | null;

  object_permission_id?: string | null;

  organization_alias?: string | null;

  organization_id?: string | null;

  spend?: number;

  teams?: Array<OrganizationTableWithMembers.Team>;

  users?: Array<OrganizationTableWithMembers.User> | null;
}

export namespace OrganizationTableWithMembers {
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

  export interface Team {
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

    members_with_roles?: Array<TeamAPI.Member>;

    metadata?: { [key: string]: unknown } | null;

    model_id?: number | null;

    models?: Array<unknown>;

    /**
     * Represents a LiteLLM_ObjectPermissionTable record
     */
    object_permission?: Team.ObjectPermission | null;

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

  export namespace Team {
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

  export interface User {
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
    object_permission?: User.ObjectPermission | null;

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

  export namespace User {
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
}

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
export type UserRoles =
  | 'proxy_admin'
  | 'proxy_admin_viewer'
  | 'org_admin'
  | 'internal_user'
  | 'internal_user_viewer'
  | 'team'
  | 'customer';

export interface OrganizationCreateResponse {
  budget_id: string;

  created_at: string;

  created_by: string;

  models: Array<string>;

  organization_id: string;

  updated_at: string;

  updated_by: string;

  /**
   * Represents user-controllable params for a LiteLLM_BudgetTable record
   */
  litellm_budget_table?: BudgetTable | null;

  metadata?: { [key: string]: unknown } | null;

  /**
   * Represents a LiteLLM_ObjectPermissionTable record
   */
  object_permission?: OrganizationCreateResponse.ObjectPermission | null;

  object_permission_id?: string | null;

  organization_alias?: string | null;

  spend?: number;

  users?: Array<OrganizationCreateResponse.User> | null;
}

export namespace OrganizationCreateResponse {
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

  export interface User {
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
    object_permission?: User.ObjectPermission | null;

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

  export namespace User {
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
}

export type OrganizationListResponse = Array<OrganizationTableWithMembers>;

export type OrganizationDeleteResponse = Array<OrganizationTableWithMembers>;

export interface OrganizationAddMemberResponse {
  organization_id: string;

  updated_organization_memberships: Array<OrganizationMembershipTable>;

  updated_users: Array<OrganizationAddMemberResponse.UpdatedUser>;
}

export namespace OrganizationAddMemberResponse {
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
}

export type OrganizationDeleteMemberResponse = unknown;

export interface OrganizationCreateParams {
  organization_alias: string;

  budget_duration?: string | null;

  budget_id?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: { [key: string]: unknown } | null;

  model_max_budget?: { [key: string]: unknown } | null;

  model_rpm_limit?: { [key: string]: number } | null;

  model_tpm_limit?: { [key: string]: number } | null;

  models?: Array<unknown>;

  object_permission?: OrganizationCreateParams.ObjectPermission | null;

  organization_id?: string | null;

  rpm_limit?: number | null;

  soft_budget?: number | null;

  tpm_limit?: number | null;
}

export namespace OrganizationCreateParams {
  export interface ObjectPermission {
    agent_access_groups?: Array<string> | null;

    agents?: Array<string> | null;

    mcp_access_groups?: Array<string> | null;

    mcp_servers?: Array<string> | null;

    mcp_tool_permissions?: { [key: string]: Array<string> } | null;

    vector_stores?: Array<string> | null;
  }
}

export interface OrganizationListParams {
  /**
   * Filter organizations by partial organization_alias match. Supports
   * case-insensitive search.
   */
  org_alias?: string | null;

  /**
   * Filter organizations by exact organization_id match
   */
  org_id?: string | null;
}

export interface OrganizationDeleteParams {
  organization_ids: Array<string>;
}

export interface OrganizationAddMemberParams {
  member: Array<OrgMember> | OrgMember;

  organization_id: string;

  max_budget_in_organization?: number | null;
}

export interface OrganizationDeleteMemberParams {
  organization_id: string;

  user_email?: string | null;

  user_id?: string | null;
}

export interface OrganizationUpdateMemberParams {
  organization_id: string;

  max_budget_in_organization?: number | null;

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
  role?: UserRoles | null;

  user_email?: string | null;

  user_id?: string | null;
}

Organization.Info = Info;

export declare namespace Organization {
  export {
    type BudgetTable as BudgetTable,
    type OrgMember as OrgMember,
    type OrganizationMembershipTable as OrganizationMembershipTable,
    type OrganizationTableWithMembers as OrganizationTableWithMembers,
    type UserRoles as UserRoles,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationDeleteResponse as OrganizationDeleteResponse,
    type OrganizationAddMemberResponse as OrganizationAddMemberResponse,
    type OrganizationDeleteMemberResponse as OrganizationDeleteMemberResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationListParams as OrganizationListParams,
    type OrganizationDeleteParams as OrganizationDeleteParams,
    type OrganizationAddMemberParams as OrganizationAddMemberParams,
    type OrganizationDeleteMemberParams as OrganizationDeleteMemberParams,
    type OrganizationUpdateMemberParams as OrganizationUpdateMemberParams,
  };

  export {
    Info as Info,
    type InfoDeprecatedResponse as InfoDeprecatedResponse,
    type InfoRetrieveParams as InfoRetrieveParams,
    type InfoDeprecatedParams as InfoDeprecatedParams,
  };
}
