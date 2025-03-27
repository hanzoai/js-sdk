// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Provider extends APIResource {
  /**
   * Provider Budget Routing - Get Budget, Spend Details
   * https://docs.hanzo.ai/docs/proxy/provider_budget_routing
   *
   * Use this endpoint to check current budget, spend and budget reset time for a
   * provider
   *
   * Example Request
   *
   * ```bash
   * curl -X GET http://localhost:4000/provider/budgets     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"
   * ```
   *
   * Example Response
   *
   * ```json
   * {
   *   "providers": {
   *     "openai": {
   *       "budget_limit": 1e-12,
   *       "time_period": "1d",
   *       "spend": 0.0,
   *       "budget_reset_at": null
   *     },
   *     "azure": {
   *       "budget_limit": 100.0,
   *       "time_period": "1d",
   *       "spend": 0.0,
   *       "budget_reset_at": null
   *     },
   *     "anthropic": {
   *       "budget_limit": 100.0,
   *       "time_period": "10d",
   *       "spend": 0.0,
   *       "budget_reset_at": null
   *     },
   *     "vertex_ai": {
   *       "budget_limit": 100.0,
   *       "time_period": "12d",
   *       "spend": 0.0,
   *       "budget_reset_at": null
   *     }
   *   }
   * }
   * ```
   */
  listBudgets(options?: RequestOptions): APIPromise<ProviderListBudgetsResponse> {
    return this._client.get('/provider/budgets', options);
  }
}

/**
 * Complete provider budget configuration and status. Maps provider names to their
 * budget configs.
 */
export interface ProviderListBudgetsResponse {
  providers?: Record<string, ProviderListBudgetsResponse.Providers>;
}

export namespace ProviderListBudgetsResponse {
  /**
   * Configuration for a single provider's budget settings
   */
  export interface Providers {
    budget_limit: number | null;

    time_period: string | null;

    budget_reset_at?: string | null;

    spend?: number | null;
  }
}

export declare namespace Provider {
  export { type ProviderListBudgetsResponse as ProviderListBudgetsResponse };
}
