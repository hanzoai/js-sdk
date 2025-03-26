// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Gemini extends APIResource {
  /**
   * [Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/gemini/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/gemini/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/gemini/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/gemini/${endpoint}`, options);
  }

  /**
   * [Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/gemini/${endpoint}`, options);
  }
}

export type GeminiCreateResponse = unknown;

export type GeminiRetrieveResponse = unknown;

export type GeminiUpdateResponse = unknown;

export type GeminiDeleteResponse = unknown;

export type GeminiPatchResponse = unknown;

export declare namespace Gemini {
  export {
    type GeminiCreateResponse as GeminiCreateResponse,
    type GeminiRetrieveResponse as GeminiRetrieveResponse,
    type GeminiUpdateResponse as GeminiUpdateResponse,
    type GeminiDeleteResponse as GeminiDeleteResponse,
    type GeminiPatchResponse as GeminiPatchResponse,
  };
}
