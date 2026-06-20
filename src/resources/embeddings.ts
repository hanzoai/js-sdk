// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Embeddings extends APIResource {
  /**
   * Follows the exact same API spec as
   * `OpenAI's Embeddings API https://platform.openai.com/docs/api-reference/embeddings`
   *
   * ```bash
   * curl -X POST http://localhost:4000/v1/embeddings
   * -H "Content-Type: application/json"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   *     "model": "text-embedding-ada-002",
   *     "input": "The quick brown fox jumps over the lazy dog"
   * }'
   * ```
   */
  create(
    params: EmbeddingCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { model } = params ?? {};
    return this._client.post('/embeddings', { query: { model }, ...options });
  }
}

export type EmbeddingCreateResponse = unknown;

export interface EmbeddingCreateParams {
  model?: string | null;
}

export declare namespace Embeddings {
  export {
    type EmbeddingCreateResponse as EmbeddingCreateResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };
}
