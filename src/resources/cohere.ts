// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Cohere extends APIResource {
  /**
   * [Docs](https://docs.litellm.ai/docs/pass_through/cohere)
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/cohere/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.litellm.ai/docs/pass_through/cohere)
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/cohere/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.litellm.ai/docs/pass_through/cohere)
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/cohere/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.litellm.ai/docs/pass_through/cohere)
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/cohere/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.litellm.ai/docs/pass_through/cohere)
   */
  modify(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/cohere/${endpoint}`, options);
  }
}

export type CohereCreateResponse = unknown;

export type CohereRetrieveResponse = unknown;

export type CohereUpdateResponse = unknown;

export type CohereDeleteResponse = unknown;

export type CohereModifyResponse = unknown;

export declare namespace Cohere {
  export {
    type CohereCreateResponse as CohereCreateResponse,
    type CohereRetrieveResponse as CohereRetrieveResponse,
    type CohereUpdateResponse as CohereUpdateResponse,
    type CohereDeleteResponse as CohereDeleteResponse,
    type CohereModifyResponse as CohereModifyResponse,
  };
}
