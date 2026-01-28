// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Generations extends APIResource {
  /**
   * Image Generation
   */
  create(
    params: GenerationCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { model } = params ?? {};
    return this._client.post('/v1/images/generations', { query: { model }, ...options });
  }
}

export type GenerationCreateResponse = unknown;

export interface GenerationCreateParams {
  model?: string | null;
}

export declare namespace Generations {
  export {
    type GenerationCreateResponse as GenerationCreateResponse,
    type GenerationCreateParams as GenerationCreateParams,
  };
}
