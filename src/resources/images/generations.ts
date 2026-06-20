// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Generations extends APIResource {
  /**
   * Image Generation
   */
  create(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/images/generations', options);
  }
}

export type GenerationCreateResponse = unknown;

export declare namespace Generations {
  export { type GenerationCreateResponse as GenerationCreateResponse };
}
