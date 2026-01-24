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
  create(body: EmbeddingCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/embeddings', { body, ...options });
  }
}

export type EmbeddingCreateResponse = unknown;

export interface EmbeddingCreateParams {
  model: string;

  api_base?: string | null;

  api_key?: string | null;

  api_type?: string | null;

  api_version?: string | null;

  caching?: boolean;

  custom_llm_provider?: string | { [key: string]: unknown } | null;

  input?: Array<string>;

  litellm_call_id?: string | null;

  litellm_logging_obj?: { [key: string]: unknown } | null;

  logger_fn?: string | null;

  timeout?: number;

  user?: string | null;
}

export declare namespace Embeddings {
  export {
    type EmbeddingCreateResponse as EmbeddingCreateResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };
}
