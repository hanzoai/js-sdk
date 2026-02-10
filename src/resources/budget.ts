// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Budget extends APIResource {
  /**
   * Create a new budget object. Can apply this to teams, orgs, end-users, keys.
   *
   * Parameters:
   *
   * - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
   * - budget_id: Optional[str] - The id of the budget. If not provided, a new id
   *   will be generated.
   * - max_budget: Optional[float] - The max budget for the budget.
   * - soft_budget: Optional[float] - The soft budget for the budget.
   * - max_parallel_requests: Optional[int] - The max number of parallel requests for
   *   the budget.
   * - tpm_limit: Optional[int] - The tokens per minute limit for the budget.
   * - rpm_limit: Optional[int] - The requests per minute limit for the budget.
   * - model_max_budget: Optional[dict] - Specify max budget for a given model.
   *   Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d",
   *   "tpm_limit": 100000, "rpm_limit": 100000}}
   */
  create(body: BudgetCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/budget/new', { body, ...options });
  }

  /**
   * Update an existing budget object.
   *
   * Parameters:
   *
   * - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
   * - budget_id: Optional[str] - The id of the budget. If not provided, a new id
   *   will be generated.
   * - max_budget: Optional[float] - The max budget for the budget.
   * - soft_budget: Optional[float] - The soft budget for the budget.
   * - max_parallel_requests: Optional[int] - The max number of parallel requests for
   *   the budget.
   * - tpm_limit: Optional[int] - The tokens per minute limit for the budget.
   * - rpm_limit: Optional[int] - The requests per minute limit for the budget.
   * - model_max_budget: Optional[dict] - Specify max budget for a given model.
   *   Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d",
   *   "tpm_limit": 100000, "rpm_limit": 100000}}
   */
  update(body: BudgetUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/budget/update', { body, ...options });
  }

  /**
   * List all the created budgets in proxy db. Used on Admin UI.
   */
  list(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/budget/list', options);
  }

  /**
   * Delete budget
   *
   * Parameters:
   *
   * - id: str - The budget id to delete
   */
  delete(body: BudgetDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/budget/delete', { body, ...options });
  }

  /**
   * Get the budget id specific information
   *
   * Parameters:
   *
   * - budgets: List[str] - The list of budget ids to get information for
   */
  info(body: BudgetInfoParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/budget/info', { body, ...options });
  }

  /**
   * Get list of configurable params + current value for a budget item + description
   * of each field
   *
   * Used on Admin UI.
   *
   * Query Parameters:
   *
   * - budget_id: str - The budget id to get information for
   */
  settings(query: BudgetSettingsParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/budget/settings', { query, ...options });
  }
}

export interface BudgetNew {
  /**
   * Max duration budget should be set for (e.g. '1hr', '1d', '28d')
   */
  budget_duration?: string | null;

  /**
   * The unique budget id.
   */
  budget_id?: string | null;

  /**
   * Requests will fail if this budget (in USD) is exceeded.
   */
  max_budget?: number | null;

  /**
   * Max concurrent requests allowed for this budget id.
   */
  max_parallel_requests?: number | null;

  /**
   * Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001',
   * 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})
   */
  model_max_budget?: { [key: string]: BudgetNew.ModelMaxBudget } | null;

  /**
   * Max requests per minute, allowed for this budget id.
   */
  rpm_limit?: number | null;

  /**
   * Requests will NOT fail if this is exceeded. Will fire alerting though.
   */
  soft_budget?: number | null;

  /**
   * Max tokens per minute, allowed for this budget id.
   */
  tpm_limit?: number | null;
}

export namespace BudgetNew {
  export interface ModelMaxBudget {
    budget_duration?: string | null;

    max_budget?: number | null;

    rpm_limit?: number | null;

    tpm_limit?: number | null;
  }
}

export type BudgetCreateResponse = unknown;

export type BudgetUpdateResponse = unknown;

export type BudgetListResponse = unknown;

export type BudgetDeleteResponse = unknown;

export type BudgetInfoResponse = unknown;

export type BudgetSettingsResponse = unknown;

export interface BudgetCreateParams {
  /**
   * Max duration budget should be set for (e.g. '1hr', '1d', '28d')
   */
  budget_duration?: string | null;

  /**
   * The unique budget id.
   */
  budget_id?: string | null;

  /**
   * Requests will fail if this budget (in USD) is exceeded.
   */
  max_budget?: number | null;

  /**
   * Max concurrent requests allowed for this budget id.
   */
  max_parallel_requests?: number | null;

  /**
   * Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001',
   * 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})
   */
  model_max_budget?: { [key: string]: BudgetCreateParams.ModelMaxBudget } | null;

  /**
   * Max requests per minute, allowed for this budget id.
   */
  rpm_limit?: number | null;

  /**
   * Requests will NOT fail if this is exceeded. Will fire alerting though.
   */
  soft_budget?: number | null;

  /**
   * Max tokens per minute, allowed for this budget id.
   */
  tpm_limit?: number | null;
}

export namespace BudgetCreateParams {
  export interface ModelMaxBudget {
    budget_duration?: string | null;

    max_budget?: number | null;

    rpm_limit?: number | null;

    tpm_limit?: number | null;
  }
}

export interface BudgetUpdateParams {
  /**
   * Max duration budget should be set for (e.g. '1hr', '1d', '28d')
   */
  budget_duration?: string | null;

  /**
   * The unique budget id.
   */
  budget_id?: string | null;

  /**
   * Requests will fail if this budget (in USD) is exceeded.
   */
  max_budget?: number | null;

  /**
   * Max concurrent requests allowed for this budget id.
   */
  max_parallel_requests?: number | null;

  /**
   * Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001',
   * 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})
   */
  model_max_budget?: { [key: string]: BudgetUpdateParams.ModelMaxBudget } | null;

  /**
   * Max requests per minute, allowed for this budget id.
   */
  rpm_limit?: number | null;

  /**
   * Requests will NOT fail if this is exceeded. Will fire alerting though.
   */
  soft_budget?: number | null;

  /**
   * Max tokens per minute, allowed for this budget id.
   */
  tpm_limit?: number | null;
}

export namespace BudgetUpdateParams {
  export interface ModelMaxBudget {
    budget_duration?: string | null;

    max_budget?: number | null;

    rpm_limit?: number | null;

    tpm_limit?: number | null;
  }
}

export interface BudgetDeleteParams {
  id: string;
}

export interface BudgetInfoParams {
  budgets: Array<string>;
}

export interface BudgetSettingsParams {
  budget_id: string;
}

export declare namespace Budget {
  export {
    type BudgetNew as BudgetNew,
    type BudgetCreateResponse as BudgetCreateResponse,
    type BudgetUpdateResponse as BudgetUpdateResponse,
    type BudgetListResponse as BudgetListResponse,
    type BudgetDeleteResponse as BudgetDeleteResponse,
    type BudgetInfoResponse as BudgetInfoResponse,
    type BudgetSettingsResponse as BudgetSettingsResponse,
    type BudgetCreateParams as BudgetCreateParams,
    type BudgetUpdateParams as BudgetUpdateParams,
    type BudgetDeleteParams as BudgetDeleteParams,
    type BudgetInfoParams as BudgetInfoParams,
    type BudgetSettingsParams as BudgetSettingsParams,
  };
}
