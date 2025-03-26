// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Completions extends APIResource {
  /**
   * Follows the exact same API spec as
   * `OpenAI's Completions API https://platform.openai.com/docs/api-reference/completions`
   *
   * ```bash
   * curl -X POST http://localhost:4000/v1/completions
   * -H "Content-Type: application/json"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   *     "model": "gpt-3.5-turbo-instruct",
   *     "prompt": "Once upon a time",
   *     "max_tokens": 50,
   *     "temperature": 0.7
   * }'
   * ```
   */
  create(
    params: CompletionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { model } = params ?? {};
    return this._client.post('/completions', { query: { model }, ...options });
  }
}

export type CompletionCreateResponse = unknown;

export interface CompletionCreateParams {
  model?: string | null;
}

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
  };
}
