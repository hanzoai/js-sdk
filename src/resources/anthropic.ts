// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Anthropic extends APIResource {
  /**
   * [Docs](https://docs.llm.ai/docs/anthropic_completion)
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/anthropic/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/anthropic_completion)
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/anthropic/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/anthropic_completion)
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/anthropic/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/anthropic_completion)
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/anthropic/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/anthropic_completion)
   */
  modify(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/anthropic/${endpoint}`, options);
  }
}

export type AnthropicCreateResponse = unknown;

export type AnthropicRetrieveResponse = unknown;

export type AnthropicUpdateResponse = unknown;

export type AnthropicDeleteResponse = unknown;

export type AnthropicModifyResponse = unknown;

export declare namespace Anthropic {
  export {
    type AnthropicCreateResponse as AnthropicCreateResponse,
    type AnthropicRetrieveResponse as AnthropicRetrieveResponse,
    type AnthropicUpdateResponse as AnthropicUpdateResponse,
    type AnthropicDeleteResponse as AnthropicDeleteResponse,
    type AnthropicModifyResponse as AnthropicModifyResponse,
  };
}
