// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Spend extends APIResource {
  /**
   * LiteLLM Enterprise - View Spend Per Request Tag. Used by LiteLLM UI
   *
   * Example Request:
   *
   * ```
   * curl -X GET "http://0.0.0.0:4000/spend/tags" -H "Authorization: Bearer sk-1234"
   * ```
   *
   * Spend with Start Date and End Date
   *
   * ```
   * curl -X GET "http://0.0.0.0:4000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"
   * ```
   */
  listTags(
    query: SpendListTagsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SpendListTagsResponse> {
    return this._client.get('/global/spend/tags', { query, ...options });
  }

  /**
   * ADMIN ONLY / MASTER KEY Only Endpoint
   *
   * Globally reset spend for All API Keys and Teams, maintain LiteLLM_SpendLogs
   *
   * 1. LiteLLM_SpendLogs will maintain the logs on spend, no data gets deleted from
   *    there
   * 2. LiteLLM_VerificationTokens spend will be set = 0
   * 3. LiteLLM_TeamTable spend will be set = 0
   */
  reset(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/global/spend/reset', options);
  }

  /**
   * Get Daily Spend per Team, based on specific startTime and endTime. Per team,
   * view usage by each key, model [ { "group-by-day": "2024-05-10", "teams": [ {
   * "team_name": "team-1" "spend": 10, "keys": [ "key": "1213", "usage": {
   * "model-1": { "cost": 12.50, "input_tokens": 1000, "output_tokens": 5000,
   * "requests": 100 }, "audio-modelname1": { "cost": 25.50, "seconds": 25,
   * "requests": 50 }, } } ] ] }
   */
  retrieveReport(
    query: SpendRetrieveReportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SpendRetrieveReportResponse> {
    return this._client.get('/global/spend/report', { query, ...options });
  }
}

export type SpendListTagsResponse = Array<SpendListTagsResponse.SpendListTagsResponseItem>;

export namespace SpendListTagsResponse {
  export interface SpendListTagsResponseItem {
    api_key: string;

    call_type: string;

    endTime: string | (string & {}) | null;

    messages: string | Array<unknown> | { [key: string]: unknown } | null;

    request_id: string;

    response: string | Array<unknown> | { [key: string]: unknown } | null;

    startTime: string | (string & {}) | null;

    api_base?: string | null;

    cache_hit?: string | null;

    cache_key?: string | null;

    completion_tokens?: number | null;

    metadata?: unknown;

    model?: string | null;

    prompt_tokens?: number | null;

    request_tags?: unknown;

    requester_ip_address?: string | null;

    spend?: number | null;

    total_tokens?: number | null;

    user?: string | null;
  }
}

export type SpendResetResponse = unknown;

export type SpendRetrieveReportResponse = Array<SpendRetrieveReportResponse.SpendRetrieveReportResponseItem>;

export namespace SpendRetrieveReportResponse {
  export interface SpendRetrieveReportResponseItem {
    api_key: string;

    call_type: string;

    endTime: string | (string & {}) | null;

    messages: string | Array<unknown> | { [key: string]: unknown } | null;

    request_id: string;

    response: string | Array<unknown> | { [key: string]: unknown } | null;

    startTime: string | (string & {}) | null;

    api_base?: string | null;

    cache_hit?: string | null;

    cache_key?: string | null;

    completion_tokens?: number | null;

    metadata?: unknown;

    model?: string | null;

    prompt_tokens?: number | null;

    request_tags?: unknown;

    requester_ip_address?: string | null;

    spend?: number | null;

    total_tokens?: number | null;

    user?: string | null;
  }
}

export interface SpendListTagsParams {
  /**
   * Time till which to view key spend
   */
  end_date?: string | null;

  /**
   * Time from which to start viewing key spend
   */
  start_date?: string | null;

  /**
   * comman separated tags to filter on
   */
  tags?: string | null;
}

export interface SpendRetrieveReportParams {
  /**
   * View spend for a specific api_key. Example api_key='sk-1234
   */
  api_key?: string | null;

  /**
   * View spend for a specific customer_id. Example customer_id='1234. Can be used in
   * conjunction with team_id as well.
   */
  customer_id?: string | null;

  /**
   * Time till which to view spend
   */
  end_date?: string | null;

  /**
   * Group spend by internal team or customer or api_key
   */
  group_by?: 'team' | 'customer' | 'api_key' | null;

  /**
   * View spend for a specific internal_user_id. Example internal_user_id='1234
   */
  internal_user_id?: string | null;

  /**
   * Time from which to start viewing spend
   */
  start_date?: string | null;

  /**
   * View spend for a specific team_id. Example team_id='1234
   */
  team_id?: string | null;
}

export declare namespace Spend {
  export {
    type SpendListTagsResponse as SpendListTagsResponse,
    type SpendResetResponse as SpendResetResponse,
    type SpendRetrieveReportResponse as SpendRetrieveReportResponse,
    type SpendListTagsParams as SpendListTagsParams,
    type SpendRetrieveReportParams as SpendRetrieveReportParams,
  };
}
