// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Rerank extends APIResource {
  /**
   * Rerank
   */
  create(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/rerank', options);
  }

  /**
   * Rerank
   */
  createV1(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/rerank', options);
  }

  /**
   * Rerank
   */
  createV2(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v2/rerank', options);
  }
}

export type RerankCreateResponse = unknown;

export type RerankCreateV1Response = unknown;

export type RerankCreateV2Response = unknown;

export declare namespace Rerank {
  export {
    type RerankCreateResponse as RerankCreateResponse,
    type RerankCreateV1Response as RerankCreateV1Response,
    type RerankCreateV2Response as RerankCreateV2Response,
  };
}
