// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Spend extends APIResource {
  /**
   * Accepts all the params of completion_cost.
   *
   * Calculate spend **before** making call:
   *
   * Note: If you see a spend of $0.0 you need to set custom_pricing for your model:
   * https://docs.hanzo.ai/docs/proxy/custom_pricing
   *
   * ```
   * curl --location 'http://localhost:4000/spend/calculate'
   * --header 'Authorization: Bearer sk-1234'
   * --header 'Content-Type: application/json'
   * --data '{
   *     "model": "anthropic.claude-v2",
   *     "messages": [{"role": "user", "content": "Hey, how'''s it going?"}]
   * }'
   * ```
   *
   * Calculate spend **after** making call:
   *
   * ```
   * curl --location 'http://localhost:4000/spend/calculate'
   * --header 'Authorization: Bearer sk-1234'
   * --header 'Content-Type: application/json'
   * --data '{
   *     "completion_response": {
   *         "id": "chatcmpl-123",
   *         "object": "chat.completion",
   *         "created": 1677652288,
   *         "model": "gpt-3.5-turbo-0125",
   *         "system_fingerprint": "fp_44709d6fcb",
   *         "choices": [{
   *             "index": 0,
   *             "message": {
   *                 "role": "assistant",
   *                 "content": "Hello there, how may I assist you today?"
   *             },
   *             "logprobs": null,
   *             "finish_reason": "stop"
   *         }]
   *         "usage": {
   *             "prompt_tokens": 9,
   *             "completion_tokens": 12,
   *             "total_tokens": 21
   *         }
   *     }
   * }'
   * ```
   */
  calculateSpend(body: SpendCalculateSpendParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/spend/calculate', { body, ...options });
  }

  /**
   * View all spend logs, if request_id is provided, only logs for that request_id
   * will be returned
   *
   * Example Request for all logs
   *
   * ```
   * curl -X GET "http://0.0.0.0:8000/spend/logs" -H "Authorization: Bearer sk-1234"
   * ```
   *
   * Example Request for specific request_id
   *
   * ```
   * curl -X GET "http://0.0.0.0:8000/spend/logs?request_id=chatcmpl-6dcb2540-d3d7-4e49-bb27-291f863f112e" -H "Authorization: Bearer sk-1234"
   * ```
   *
   * Example Request for specific api_key
   *
   * ```
   * curl -X GET "http://0.0.0.0:8000/spend/logs?api_key=sk-Fn8Ej39NkBQmUagFEoUWPQ" -H "Authorization: Bearer sk-1234"
   * ```
   *
   * Example Request for specific user_id
   *
   * ```
   * curl -X GET "http://0.0.0.0:8000/spend/logs?user_id=z@hanzo.ai" -H "Authorization: Bearer sk-1234"
   * ```
   */
  listLogs(
    query: SpendListLogsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SpendListLogsResponse> {
    return this._client.get('/spend/logs', { query, ...options });
  }

  /**
   * LLM Enterprise - View Spend Per Request Tag
   *
   * Example Request:
   *
   * ```
   * curl -X GET "http://0.0.0.0:8000/spend/tags" -H "Authorization: Bearer sk-1234"
   * ```
   *
   * Spend with Start Date and End Date
   *
   * ```
   * curl -X GET "http://0.0.0.0:8000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"
   * ```
   */
  listTags(
    query: SpendListTagsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SpendListTagsResponse> {
    return this._client.get('/spend/tags', { query, ...options });
  }
}

export type SpendCalculateSpendResponse = unknown;

export type SpendListLogsResponse = Array<SpendListLogsResponse.SpendListLogsResponseItem>;

export namespace SpendListLogsResponse {
  export interface SpendListLogsResponseItem {
    api_key: string;

    call_type: string;

    endTime: string | (string & {}) | null;

    messages: string | Array<unknown> | unknown | null;

    request_id: string;

    response: string | Array<unknown> | unknown | null;

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

export type SpendListTagsResponse = Array<SpendListTagsResponse.SpendListTagsResponseItem>;

export namespace SpendListTagsResponse {
  export interface SpendListTagsResponseItem {
    api_key: string;

    call_type: string;

    endTime: string | (string & {}) | null;

    messages: string | Array<unknown> | unknown | null;

    request_id: string;

    response: string | Array<unknown> | unknown | null;

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

export interface SpendCalculateSpendParams {
  completion_response?: unknown | null;

  messages?: Array<unknown> | null;

  model?: string | null;
}

export interface SpendListLogsParams {
  /**
   * Get spend logs based on api key
   */
  api_key?: string | null;

  /**
   * Time till which to view key spend
   */
  end_date?: string | null;

  /**
   * request_id to get spend logs for specific request_id. If none passed then pass
   * spend logs for all requests
   */
  request_id?: string | null;

  /**
   * Time from which to start viewing key spend
   */
  start_date?: string | null;

  /**
   * Get spend logs based on user_id
   */
  user_id?: string | null;
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
}

export declare namespace Spend {
  export {
    type SpendCalculateSpendResponse as SpendCalculateSpendResponse,
    type SpendListLogsResponse as SpendListLogsResponse,
    type SpendListTagsResponse as SpendListTagsResponse,
    type SpendCalculateSpendParams as SpendCalculateSpendParams,
    type SpendListLogsParams as SpendListLogsParams,
    type SpendListTagsParams as SpendListTagsParams,
  };
}
