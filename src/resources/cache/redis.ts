// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Redis extends APIResource {
  /**
   * Endpoint for getting /redis/info
   */
  retrieveInfo(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/cache/redis/info', options);
  }
}

export type RediRetrieveInfoResponse = unknown;

export declare namespace Redis {
  export { type RediRetrieveInfoResponse as RediRetrieveInfoResponse };
}
