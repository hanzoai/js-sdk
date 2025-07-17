// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Customer extends APIResource {
  /**
   * Allow creating a new Customer
   *
   * Parameters:
   *
   * - user_id: str - The unique identifier for the user.
   * - alias: Optional[str] - A human-friendly alias for the user.
   * - blocked: bool - Flag to allow or disallow requests for this end-user. Default
   *   is False.
   * - max_budget: Optional[float] - The maximum budget allocated to the user. Either
   *   'max_budget' or 'budget_id' should be provided, not both.
   * - budget_id: Optional[str] - The identifier for an existing budget allocated to
   *   the user. Either 'max_budget' or 'budget_id' should be provided, not both.
   * - allowed_model_region: Optional[Union[Literal["eu"], Literal["us"]]] - Require
   *   all user requests to use models in this specific region.
   * - default_model: Optional[str] - If no equivalent model in the allowed region,
   *   default all requests to this model.
   * - metadata: Optional[dict] = Metadata for customer, store information for
   *   customer. Example metadata = {"data_training_opt_out": True}
   * - budget_duration: Optional[str] - Budget is reset at the end of specified
   *   duration. If not set, budget is never reset. You can set duration as seconds
   *   ("30s"), minutes ("30m"), hours ("30h"), days ("30d").
   * - tpm_limit: Optional[int] - [Not Implemented Yet] Specify tpm limit for a given
   *   customer (Tokens per minute)
   * - rpm_limit: Optional[int] - [Not Implemented Yet] Specify rpm limit for a given
   *   customer (Requests per minute)
   * - model_max_budget: Optional[dict] - [Not Implemented Yet] Specify max budget
   *   for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0,
   *   "budget_duration": "1d"}}
   * - max_parallel_requests: Optional[int] - [Not Implemented Yet] Specify max
   *   parallel requests for a given customer.
   * - soft_budget: Optional[float] - [Not Implemented Yet] Get alerts when customer
   *   crosses given budget, doesn't block requests.
   *
   * - Allow specifying allowed regions
   * - Allow specifying default model
   *
   * Example curl:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/customer/new'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{
   *         "user_id" : "z-jaff-3",
   *         "allowed_region": "eu",
   *         "budget_id": "free_tier",
   *         "default_model": "azure/gpt-3.5-turbo-eu" <- all calls from this user, use this model?
   *     }'
   *
   *     # return end-user object
   * ```
   *
   * NOTE: This used to be called `/end_user/new`, we will still be maintaining
   * compatibility for /end_user/XXX for these endpoints
   */
  create(body: CustomerCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/customer/new', { body, ...options });
  }

  /**
   * Example curl
   *
   * Parameters:
   *
   * - user_id: str
   * - alias: Optional[str] = None # human-friendly alias
   * - blocked: bool = False # allow/disallow requests for this end-user
   * - max_budget: Optional[float] = None
   * - budget_id: Optional[str] = None # give either a budget_id or max_budget
   * - allowed_model_region: Optional[AllowedModelRegion] = ( None # require all user
   *   requests to use models in this specific region )
   * - default_model: Optional[str] = ( None # if no equivalent model in allowed
   *   region - default all requests to this model )
   *
   * Example curl:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/customer/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "user_id": "test-llm-user-4",
   *     "budget_id": "paid_tier"
   * }'
   *
   * See below for all params
   * ```
   */
  update(body: CustomerUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/customer/update', { body, ...options });
  }

  /**
   * [Admin-only] List all available customers
   *
   * Example curl:
   *
   * ```
   * curl --location --request GET 'http://0.0.0.0:4000/customer/list'         --header 'Authorization: Bearer sk-1234'
   * ```
   */
  list(options?: RequestOptions): APIPromise<CustomerListResponse> {
    return this._client.get('/customer/list', options);
  }

  /**
   * Delete multiple end-users.
   *
   * Parameters:
   *
   * - user_ids (List[str], required): The unique `user_id`s for the users to delete
   *
   * Example curl:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/customer/delete'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{
   *         "user_ids" :["z-jaff-5"]
   * }'
   *
   * See below for all params
   * ```
   */
  delete(body: CustomerDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/customer/delete', { body, ...options });
  }

  /**
   * [BETA] Reject calls with this end-user id
   *
   * Parameters:
   *
   * - user_ids (List[str], required): The unique `user_id`s for the users to block
   *
   *   (any /chat/completion call with this user={end-user-id} param, will be
   *   rejected.)
   *
   *   ```
   *   curl -X POST "http://0.0.0.0:8000/user/block"
   *   -H "Authorization: Bearer sk-1234"
   *   -d '{
   *   "user_ids": [<user_id>, ...]
   *   }'
   *   ```
   */
  block(body: CustomerBlockParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/customer/block', { body, ...options });
  }

  /**
   * Get information about an end-user. An `end_user` is a customer (external user)
   * of the proxy.
   *
   * Parameters:
   *
   * - end_user_id (str, required): The unique identifier for the end-user
   *
   * Example curl:
   *
   * ```
   * curl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4'         -H 'Authorization: Bearer sk-1234'
   * ```
   */
  retrieveInfo(
    query: CustomerRetrieveInfoParams,
    options?: RequestOptions,
  ): APIPromise<CustomerRetrieveInfoResponse> {
    return this._client.get('/customer/info', { query, ...options });
  }

  /**
   * [BETA] Unblock calls with this user id
   *
   * Example
   *
   * ```
   * curl -X POST "http://0.0.0.0:8000/user/unblock"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   * "user_ids": [<user_id>, ...]
   * }'
   * ```
   */
  unblock(body: CustomerUnblockParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/customer/unblock', { body, ...options });
  }
}

export interface BlockUsers {
  user_ids: Array<string>;
}

export type CustomerCreateResponse = unknown;

export type CustomerUpdateResponse = unknown;

export type CustomerListResponse = Array<CustomerListResponse.CustomerListResponseItem>;

export namespace CustomerListResponse {
  export interface CustomerListResponseItem {
    blocked: boolean;

    user_id: string;

    alias?: string | null;

    allowed_model_region?: 'eu' | 'us' | null;

    default_model?: string | null;

    /**
     * Represents user-controllable params for a LLM_BudgetTable record
     */
    llm_budget_table?: CustomerListResponseItem.LlmBudgetTable | null;

    spend?: number;
  }

  export namespace CustomerListResponseItem {
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

export type CustomerDeleteResponse = unknown;

export type CustomerBlockResponse = unknown;

export interface CustomerRetrieveInfoResponse {
  blocked: boolean;

  user_id: string;

  alias?: string | null;

  allowed_model_region?: 'eu' | 'us' | null;

  default_model?: string | null;

  /**
   * Represents user-controllable params for a LLM_BudgetTable record
   */
  llm_budget_table?: CustomerRetrieveInfoResponse.LlmBudgetTable | null;

  spend?: number;
}

export namespace CustomerRetrieveInfoResponse {
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

export type CustomerUnblockResponse = unknown;

export interface CustomerCreateParams {
  user_id: string;

  alias?: string | null;

  allowed_model_region?: 'eu' | 'us' | null;

  blocked?: boolean;

  /**
   * Max duration budget should be set for (e.g. '1hr', '1d', '28d')
   */
  budget_duration?: string | null;

  budget_id?: string | null;

  default_model?: string | null;

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
  model_max_budget?: { [key: string]: CustomerCreateParams.ModelMaxBudget } | null;

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

export namespace CustomerCreateParams {
  export interface ModelMaxBudget {
    budget_duration?: string | null;

    max_budget?: number | null;

    rpm_limit?: number | null;

    tpm_limit?: number | null;
  }
}

export interface CustomerUpdateParams {
  user_id: string;

  alias?: string | null;

  allowed_model_region?: 'eu' | 'us' | null;

  blocked?: boolean;

  budget_id?: string | null;

  default_model?: string | null;

  max_budget?: number | null;
}

export interface CustomerDeleteParams {
  user_ids: Array<string>;
}

export interface CustomerBlockParams {
  user_ids: Array<string>;
}

export interface CustomerRetrieveInfoParams {
  /**
   * End User ID in the request parameters
   */
  end_user_id: string;
}

export interface CustomerUnblockParams {
  user_ids: Array<string>;
}

export declare namespace Customer {
  export {
    type BlockUsers as BlockUsers,
    type CustomerCreateResponse as CustomerCreateResponse,
    type CustomerUpdateResponse as CustomerUpdateResponse,
    type CustomerListResponse as CustomerListResponse,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerBlockResponse as CustomerBlockResponse,
    type CustomerRetrieveInfoResponse as CustomerRetrieveInfoResponse,
    type CustomerUnblockResponse as CustomerUnblockResponse,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerDeleteParams as CustomerDeleteParams,
    type CustomerBlockParams as CustomerBlockParams,
    type CustomerRetrieveInfoParams as CustomerRetrieveInfoParams,
    type CustomerUnblockParams as CustomerUnblockParams,
  };
}
