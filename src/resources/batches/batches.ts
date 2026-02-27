// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CancelAPI from './cancel';
import { Cancel, CancelCancelParams, CancelCancelResponse } from './cancel';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Batches extends APIResource {
  cancel: CancelAPI.Cancel = new CancelAPI.Cancel(this._client);

  /**
   * Create large batches of API requests for asynchronous processing. This is the
   * equivalent of POST https://api.openai.com/v1/batch Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/batch
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d '{
   *         "input_file_id": "file-abc123",
   *         "endpoint": "/v1/chat/completions",
   *         "completion_window": "24h"
   * }'
   * ```
   */
  create(params: BatchCreateParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    const { provider } = params ?? {};
    return this._client.post('/v1/batches', { query: { provider }, ...options });
  }

  /**
   * Retrieves a batch. This is the equivalent of GET
   * https://api.openai.com/v1/batches/{batch_id} Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/batch/retrieve
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
   * ```
   */
  retrieve(
    batchID: string,
    query: BatchRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/v1/batches/${batchID}`, { query, ...options });
  }

  /**
   * Lists This is the equivalent of GET https://api.openai.com/v1/batches/ Supports
   * Identical Params as: https://platform.openai.com/docs/api-reference/batch/list
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
   * ```
   */
  list(query: BatchListParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/batches', { query, ...options });
  }

  /**
   * Cancel a batch. This is the equivalent of POST
   * https://api.openai.com/v1/batches/{batch_id}/cancel
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/batch/cancel
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST
   *
   * ```
   */
  cancelWithProvider(
    batchID: string,
    params: BatchCancelWithProviderParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { provider } = params;
    return this._client.post(path`/${provider}/v1/batches/${batchID}/cancel`, options);
  }

  /**
   * Create large batches of API requests for asynchronous processing. This is the
   * equivalent of POST https://api.openai.com/v1/batch Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/batch
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d '{
   *         "input_file_id": "file-abc123",
   *         "endpoint": "/v1/chat/completions",
   *         "completion_window": "24h"
   * }'
   * ```
   */
  createWithProvider(provider: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/${provider}/v1/batches`, options);
  }

  /**
   * Lists This is the equivalent of GET https://api.openai.com/v1/batches/ Supports
   * Identical Params as: https://platform.openai.com/docs/api-reference/batch/list
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
   * ```
   */
  listWithProvider(
    provider: string,
    query: BatchListWithProviderParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/${provider}/v1/batches`, { query, ...options });
  }

  /**
   * Retrieves a batch. This is the equivalent of GET
   * https://api.openai.com/v1/batches/{batch_id} Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/batch/retrieve
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
   * ```
   */
  retrieveWithProvider(
    batchID: string,
    params: BatchRetrieveWithProviderParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { provider } = params;
    return this._client.get(path`/${provider}/v1/batches/${batchID}`, options);
  }
}

export type BatchCreateResponse = unknown;

export type BatchRetrieveResponse = unknown;

export type BatchListResponse = unknown;

export type BatchCancelWithProviderResponse = unknown;

export type BatchCreateWithProviderResponse = unknown;

export type BatchListWithProviderResponse = unknown;

export type BatchRetrieveWithProviderResponse = unknown;

export interface BatchCreateParams {
  provider?: string | null;
}

export interface BatchRetrieveParams {
  provider?: string | null;
}

export interface BatchListParams {
  after?: string | null;

  limit?: number | null;

  provider?: string | null;
}

export interface BatchCancelWithProviderParams {
  provider: string;
}

export interface BatchListWithProviderParams {
  after?: string | null;

  limit?: number | null;
}

export interface BatchRetrieveWithProviderParams {
  provider: string;
}

Batches.Cancel = Cancel;

export declare namespace Batches {
  export {
    type BatchCreateResponse as BatchCreateResponse,
    type BatchRetrieveResponse as BatchRetrieveResponse,
    type BatchListResponse as BatchListResponse,
    type BatchCancelWithProviderResponse as BatchCancelWithProviderResponse,
    type BatchCreateWithProviderResponse as BatchCreateWithProviderResponse,
    type BatchListWithProviderResponse as BatchListWithProviderResponse,
    type BatchRetrieveWithProviderResponse as BatchRetrieveWithProviderResponse,
    type BatchCreateParams as BatchCreateParams,
    type BatchRetrieveParams as BatchRetrieveParams,
    type BatchListParams as BatchListParams,
    type BatchCancelWithProviderParams as BatchCancelWithProviderParams,
    type BatchListWithProviderParams as BatchListWithProviderParams,
    type BatchRetrieveWithProviderParams as BatchRetrieveWithProviderParams,
  };

  export {
    Cancel as Cancel,
    type CancelCancelResponse as CancelCancelResponse,
    type CancelCancelParams as CancelCancelParams,
  };
}
