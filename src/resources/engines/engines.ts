// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChatAPI from './chat';
import { Chat, ChatCompleteParams, ChatCompleteResponse } from './chat';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Engines extends APIResource {
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);

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
   *
   * @example
   * ```ts
   * const response = await client.engines.complete('model');
   * ```
   */
  complete(model: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/engines/${model}/completions`, options);
  }

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
   *
   * @example
   * ```ts
   * const response = await client.engines.embed('model', {
   *   body_model: 'model',
   * });
   * ```
   */
  embed(pathModel: string, body: EngineEmbedParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/engines/${pathModel}/embeddings`, { body, ...options });
  }
}

export type EngineCompleteResponse = unknown;

export type EngineEmbedResponse = unknown;

export interface EngineEmbedParams {
  body_model: string;

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

Engines.Chat = Chat;

export declare namespace Engines {
  export {
    type EngineCompleteResponse as EngineCompleteResponse,
    type EngineEmbedResponse as EngineEmbedResponse,
    type EngineEmbedParams as EngineEmbedParams,
  };

  export {
    Chat as Chat,
    type ChatCompleteResponse as ChatCompleteResponse,
    type ChatCompleteParams as ChatCompleteParams,
  };
}
