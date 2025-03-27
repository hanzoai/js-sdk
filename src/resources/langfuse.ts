// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Langfuse extends APIResource {
  /**
   * Call Langfuse via LLM proxy. Works with Langfuse SDK.
   *
   * [Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/langfuse/${endpoint}`, options);
  }

  /**
   * Call Langfuse via LLM proxy. Works with Langfuse SDK.
   *
   * [Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/langfuse/${endpoint}`, options);
  }

  /**
   * Call Langfuse via LLM proxy. Works with Langfuse SDK.
   *
   * [Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/langfuse/${endpoint}`, options);
  }

  /**
   * Call Langfuse via LLM proxy. Works with Langfuse SDK.
   *
   * [Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/langfuse/${endpoint}`, options);
  }

  /**
   * Call Langfuse via LLM proxy. Works with Langfuse SDK.
   *
   * [Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/langfuse/${endpoint}`, options);
  }
}

export type LangfuseCreateResponse = unknown;

export type LangfuseRetrieveResponse = unknown;

export type LangfuseUpdateResponse = unknown;

export type LangfuseDeleteResponse = unknown;

export type LangfusePatchResponse = unknown;

export declare namespace Langfuse {
  export {
    type LangfuseCreateResponse as LangfuseCreateResponse,
    type LangfuseRetrieveResponse as LangfuseRetrieveResponse,
    type LangfuseUpdateResponse as LangfuseUpdateResponse,
    type LangfuseDeleteResponse as LangfuseDeleteResponse,
    type LangfusePatchResponse as LangfusePatchResponse,
  };
}
