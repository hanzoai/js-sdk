// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Completions extends APIResource {
  /**
   * Follows the exact same API spec as
   * `OpenAI's Chat API https://platform.openai.com/docs/api-reference/chat`
   *
   * ```bash
   * curl -X POST http://localhost:4000/v1/chat/completions
   * -H "Content-Type: application/json"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   *     "model": "gpt-4o",
   *     "messages": [
   *         {
   *             "role": "user",
   *             "content": "Hello!"
   *         }
   *     ]
   * }'
   * ```
   */
  create(
    params: CompletionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { model } = params ?? {};
    return this._client.post('/v1/chat/completions', { query: { model }, ...options });
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
