// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class VertexAI extends APIResource {
  /**
   * Call LLM proxy via Vertex AI SDK.
   *
   * [Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/vertex_ai/${endpoint}`, options);
  }

  /**
   * Call LLM proxy via Vertex AI SDK.
   *
   * [Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/vertex_ai/${endpoint}`, options);
  }

  /**
   * Call LLM proxy via Vertex AI SDK.
   *
   * [Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/vertex_ai/${endpoint}`, options);
  }

  /**
   * Call LLM proxy via Vertex AI SDK.
   *
   * [Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/vertex_ai/${endpoint}`, options);
  }

  /**
   * Call LLM proxy via Vertex AI SDK.
   *
   * [Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/vertex_ai/${endpoint}`, options);
  }
}

export type VertexAICreateResponse = unknown;

export type VertexAIRetrieveResponse = unknown;

export type VertexAIUpdateResponse = unknown;

export type VertexAIDeleteResponse = unknown;

export type VertexAIPatchResponse = unknown;

export declare namespace VertexAI {
  export {
    type VertexAICreateResponse as VertexAICreateResponse,
    type VertexAIRetrieveResponse as VertexAIRetrieveResponse,
    type VertexAIUpdateResponse as VertexAIUpdateResponse,
    type VertexAIDeleteResponse as VertexAIDeleteResponse,
    type VertexAIPatchResponse as VertexAIPatchResponse,
  };
}
