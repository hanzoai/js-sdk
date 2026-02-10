// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TeamAPI from '../team/team';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Info extends APIResource {
  /**
   * Get the org specific information
   */
  retrieve(query: InfoRetrieveParams, options?: RequestOptions): APIPromise<InfoRetrieveResponse> {
    return this._client.get('/organization/info', { query, ...options });
  }

  /**
   * DEPRECATED: Use GET /organization/info instead
   */
  deprecated(body: InfoDeprecatedParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/organization/info', { body, ...options });
  }
}

/**
 * Returned by the /organization/info endpoint and /organization/list endpoint
 */
export interface InfoRetrieveResponse {
  budget_id: string;

  created_at: string;

  created_by: string;

  models: Array<string>;

  updated_at: string;

  updated_by: string;

  /**
   * Represents user-controllable params for a LLM_BudgetTable record
   */
  llm_budget_table?: InfoRetrieveResponse.LlmBudgetTable | null;

  members?: Array<InfoRetrieveResponse.Member>;

  metadata?: unknown | null;

  organization_alias?: string | null;

  organization_id?: string | null;

  spend?: number;

  teams?: Array<InfoRetrieveResponse.Team>;
}

export namespace InfoRetrieveResponse {
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

export type InfoDeprecatedResponse = unknown;

export interface InfoRetrieveParams {
  organization_id: string;
}

export interface InfoDeprecatedParams {
  organizations: Array<string>;
}

export declare namespace Info {
  export {
    type InfoRetrieveResponse as InfoRetrieveResponse,
    type InfoDeprecatedResponse as InfoDeprecatedResponse,
    type InfoRetrieveParams as InfoRetrieveParams,
    type InfoDeprecatedParams as InfoDeprecatedParams,
  };
}
