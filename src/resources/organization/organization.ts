// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InfoAPI from './info';
import {
  Info,
  InfoDeprecatedParams,
  InfoDeprecatedResponse,
  InfoRetrieveParams,
  InfoRetrieveResponse,
} from './info';
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
   *   [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags)
   *   and/or doing
   *   [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
   * - organization_id: _Optional[str]_ - The organization id of the team. Default is
   *   None. Create via `/organization/new`.
   * - model_aliases: Optional[dict] - Model aliases for the team.
   *   [Docs](https://docs.llm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
   *
   * Case 1: Create new org **without** a budget_id
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
  update(body: OrganizationUpdateParams, options?: RequestOptions): APIPromise<OrganizationUpdateResponse> {
    return this._client.patch('/organization/update', { body, ...options });
  }

  /**
   * ```
   * curl --location --request GET 'http://0.0.0.0:4000/organization/list'         --header 'Authorization: Bearer sk-1234'
   * ```
   */
  list(options?: RequestOptions): APIPromise<OrganizationListResponse> {
    return this._client.get('/organization/list', options);
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
   *   - role: Literal[LLMUserRoles] (required)
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
   *         "user_id": "dev247652@hanzo.ai"
   *     },
   *     "max_budget_in_organization": 100.0
   * }'
   * ```
   *
   * The following is executed in this function:
   *
   * 1. Check if organization exists
   * 2. Creates a new Internal User if the user_id or user_email is not found in
   *    LLM_UserTable
   * 3. Add Internal User to the `LLM_OrganizationMembership` table
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
  ): APIPromise<OrganizationUpdateMemberResponse> {
    return this._client.patch('/organization/member_update', { body, ...options });
  }
}

export interface OrgMember {
  role: 'org_admin' | 'internal_user' | 'internal_user_viewer';

  user_email?: string | null;

  user_id?: string | null;
}

export interface OrganizationCreateResponse {
  budget_id: string;

  created_at: string;

  created_by: string;

  models: Array<string>;

  organization_id: string;

  updated_at: string;

  updated_by: string;

  metadata?: unknown | null;

  organization_alias?: string | null;

  spend?: number;
}

/**
 * Returned by the /organization/info endpoint and /organization/list endpoint
 */
export interface OrganizationUpdateResponse {
  budget_id: string;

  created_at: string;

  created_by: string;

  models: Array<string>;

  updated_at: string;

  updated_by: string;

  /**
   * Represents user-controllable params for a LLM_BudgetTable record
   */
  llm_budget_table?: OrganizationUpdateResponse.LlmBudgetTable | null;

  members?: Array<OrganizationUpdateResponse.Member>;

  metadata?: unknown | null;

  organization_alias?: string | null;

  organization_id?: string | null;

  spend?: number;

  teams?: Array<OrganizationUpdateResponse.Team>;
}

export namespace OrganizationUpdateResponse {
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

  /**
   * This is the table that track what organizations a user belongs to and users
   * spend within the organization
   */
  export interface Member {
    created_at: string;

    organization_id: string;

    updated_at: string;

    user_id: string;

    budget_id?: string | null;

    /**
     * Represents user-controllable params for a LLM_BudgetTable record
     */
    llm_budget_table?: Member.LlmBudgetTable | null;

    spend?: number;

    user?: unknown;

    user_role?: string | null;
  }

  export namespace Member {
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

  export interface Team {
    team_id: string;

    admins?: Array<unknown>;

    blocked?: boolean;

    budget_duration?: string | null;

    budget_reset_at?: string | null;

    created_at?: string | null;

    llm_model_table?: Team.LlmModelTable | null;

    max_budget?: number | null;

    max_parallel_requests?: number | null;

    members?: Array<unknown>;

    members_with_roles?: Array<TeamAPI.Member>;

    metadata?: unknown | null;

    model_id?: number | null;

    models?: Array<unknown>;

    organization_id?: string | null;

    rpm_limit?: number | null;

    spend?: number | null;

    team_alias?: string | null;

    tpm_limit?: number | null;
  }

  export namespace Team {
    export interface LlmModelTable {
      created_by: string;

      updated_by: string;

      model_aliases?: unknown | string | null;
    }
  }
}

export type OrganizationListResponse = Array<OrganizationListResponse.OrganizationListResponseItem>;

export namespace OrganizationListResponse {
  /**
   * Returned by the /organization/info endpoint and /organization/list endpoint
   */
  export interface OrganizationListResponseItem {
    budget_id: string;

    created_at: string;

    created_by: string;

    models: Array<string>;

    updated_at: string;

    updated_by: string;

    /**
     * Represents user-controllable params for a LLM_BudgetTable record
     */
    llm_budget_table?: OrganizationListResponseItem.LlmBudgetTable | null;

    members?: Array<OrganizationListResponseItem.Member>;

    metadata?: unknown | null;

    organization_alias?: string | null;

    organization_id?: string | null;

    spend?: number;

    teams?: Array<OrganizationListResponseItem.Team>;
  }

  export namespace OrganizationListResponseItem {
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

    /**
     * This is the table that track what organizations a user belongs to and users
     * spend within the organization
     */
    export interface Member {
      created_at: string;

      organization_id: string;

      updated_at: string;

      user_id: string;

      budget_id?: string | null;

      /**
       * Represents user-controllable params for a LLM_BudgetTable record
       */
      llm_budget_table?: Member.LlmBudgetTable | null;

      spend?: number;

      user?: unknown;

      user_role?: string | null;
    }

    export namespace Member {
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

    export interface Team {
      team_id: string;

      admins?: Array<unknown>;

      blocked?: boolean;

      budget_duration?: string | null;

      budget_reset_at?: string | null;

      created_at?: string | null;

      llm_model_table?: Team.LlmModelTable | null;

      max_budget?: number | null;

      max_parallel_requests?: number | null;

      members?: Array<unknown>;

      members_with_roles?: Array<TeamAPI.Member>;

      metadata?: unknown | null;

      model_id?: number | null;

      models?: Array<unknown>;

      organization_id?: string | null;

      rpm_limit?: number | null;

      spend?: number | null;

      team_alias?: string | null;

      tpm_limit?: number | null;
    }

    export namespace Team {
      export interface LlmModelTable {
        created_by: string;

        updated_by: string;

        model_aliases?: unknown | string | null;
      }
    }
  }
}

export type OrganizationDeleteResponse = Array<OrganizationDeleteResponse.OrganizationDeleteResponseItem>;

export namespace OrganizationDeleteResponse {
  /**
   * Returned by the /organization/info endpoint and /organization/list endpoint
   */
  export interface OrganizationDeleteResponseItem {
    budget_id: string;

    created_at: string;

    created_by: string;

    models: Array<string>;

    updated_at: string;

    updated_by: string;

    /**
     * Represents user-controllable params for a LLM_BudgetTable record
     */
    llm_budget_table?: OrganizationDeleteResponseItem.LlmBudgetTable | null;

    members?: Array<OrganizationDeleteResponseItem.Member>;

    metadata?: unknown | null;

    organization_alias?: string | null;

    organization_id?: string | null;

    spend?: number;

    teams?: Array<OrganizationDeleteResponseItem.Team>;
  }

  export namespace OrganizationDeleteResponseItem {
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

    /**
     * This is the table that track what organizations a user belongs to and users
     * spend within the organization
     */
    export interface Member {
      created_at: string;

      organization_id: string;

      updated_at: string;

      user_id: string;

      budget_id?: string | null;

      /**
       * Represents user-controllable params for a LLM_BudgetTable record
       */
      llm_budget_table?: Member.LlmBudgetTable | null;

      spend?: number;

      user?: unknown;

      user_role?: string | null;
    }

    export namespace Member {
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

    export interface Team {
      team_id: string;

      admins?: Array<unknown>;

      blocked?: boolean;

      budget_duration?: string | null;

      budget_reset_at?: string | null;

      created_at?: string | null;

      llm_model_table?: Team.LlmModelTable | null;

      max_budget?: number | null;

      max_parallel_requests?: number | null;

      members?: Array<unknown>;

      members_with_roles?: Array<TeamAPI.Member>;

      metadata?: unknown | null;

      model_id?: number | null;

      models?: Array<unknown>;

      organization_id?: string | null;

      rpm_limit?: number | null;

      spend?: number | null;

      team_alias?: string | null;

      tpm_limit?: number | null;
    }

    export namespace Team {
      export interface LlmModelTable {
        created_by: string;

        updated_by: string;

        model_aliases?: unknown | string | null;
      }
    }
  }
}

export interface OrganizationAddMemberResponse {
  organization_id: string;

  updated_organization_memberships: Array<OrganizationAddMemberResponse.UpdatedOrganizationMembership>;

  updated_users: Array<OrganizationAddMemberResponse.UpdatedUser>;
}

export namespace OrganizationAddMemberResponse {
  /**
   * This is the table that track what organizations a user belongs to and users
   * spend within the organization
   */
  export interface UpdatedOrganizationMembership {
    created_at: string;

    organization_id: string;

    updated_at: string;

    user_id: string;

    budget_id?: string | null;

    /**
     * Represents user-controllable params for a LLM_BudgetTable record
     */
    llm_budget_table?: UpdatedOrganizationMembership.LlmBudgetTable | null;

    spend?: number;

    user?: unknown;

    user_role?: string | null;
  }

  export namespace UpdatedOrganizationMembership {
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
}

export type OrganizationDeleteMemberResponse = unknown;

/**
 * This is the table that track what organizations a user belongs to and users
 * spend within the organization
 */
export interface OrganizationUpdateMemberResponse {
  created_at: string;

  organization_id: string;

  updated_at: string;

  user_id: string;

  budget_id?: string | null;

  /**
   * Represents user-controllable params for a LLM_BudgetTable record
   */
  llm_budget_table?: OrganizationUpdateMemberResponse.LlmBudgetTable | null;

  spend?: number;

  user?: unknown;

  user_role?: string | null;
}

export namespace OrganizationUpdateMemberResponse {
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

export interface OrganizationCreateParams {
  organization_alias: string;

  budget_duration?: string | null;

  budget_id?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: unknown | null;

  model_max_budget?: unknown | null;

  models?: Array<unknown>;

  organization_id?: string | null;

  rpm_limit?: number | null;

  soft_budget?: number | null;

  tpm_limit?: number | null;
}

export interface OrganizationUpdateParams {
  budget_id?: string | null;

  metadata?: unknown | null;

  models?: Array<string> | null;

  organization_alias?: string | null;

  organization_id?: string | null;

  spend?: number | null;

  updated_by?: string | null;
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
  role?:
    | 'proxy_admin'
    | 'proxy_admin_viewer'
    | 'org_admin'
    | 'internal_user'
    | 'internal_user_viewer'
    | 'team'
    | 'customer'
    | null;

  user_email?: string | null;

  user_id?: string | null;
}

Organization.Info = Info;

export declare namespace Organization {
  export {
    type OrgMember as OrgMember,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationUpdateResponse as OrganizationUpdateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationDeleteResponse as OrganizationDeleteResponse,
    type OrganizationAddMemberResponse as OrganizationAddMemberResponse,
    type OrganizationDeleteMemberResponse as OrganizationDeleteMemberResponse,
    type OrganizationUpdateMemberResponse as OrganizationUpdateMemberResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationDeleteParams as OrganizationDeleteParams,
    type OrganizationAddMemberParams as OrganizationAddMemberParams,
    type OrganizationDeleteMemberParams as OrganizationDeleteMemberParams,
    type OrganizationUpdateMemberParams as OrganizationUpdateMemberParams,
  };

  export {
    Info as Info,
    type InfoRetrieveResponse as InfoRetrieveResponse,
    type InfoDeprecatedResponse as InfoDeprecatedResponse,
    type InfoRetrieveParams as InfoRetrieveParams,
    type InfoDeprecatedParams as InfoDeprecatedParams,
  };
}
